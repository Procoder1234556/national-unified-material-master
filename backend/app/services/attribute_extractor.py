# ponytail: Parametric regex attribute extractor with bidirectional unit conversion.
# Upgrade path: add OCR geometry parsing for scanned legacy piping isometrics.

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.app.services.domain_normalizer import DomainNormalizer, default_normalizer

# Comprehensive Metric (DN / mm) to Imperial (NPS / inches) lookup table
METRIC_TO_INCH_TABLE: Dict[int, float] = {
    10: 0.375,
    15: 0.5,
    20: 0.75,
    25: 1.0,
    32: 1.25,
    40: 1.5,
    50: 2.0,
    65: 2.5,
    80: 3.0,
    90: 3.5,
    100: 4.0,
    125: 5.0,
    150: 6.0,
    200: 8.0,
    250: 10.0,
    300: 12.0,
    350: 14.0,
    400: 16.0,
    450: 18.0,
    500: 20.0,
    600: 24.0,
    700: 28.0,
    750: 30.0,
    800: 32.0,
    900: 36.0,
    1000: 40.0,
    1050: 42.0,
    1200: 48.0,
}

# Reverse lookup table from Imperial (NPS / inches) to Metric (DN / mm)
INCH_TO_METRIC_TABLE: Dict[float, int] = {v: k for k, v in METRIC_TO_INCH_TABLE.items()}

# European PN ratings to ASME Class ratings equivalent
PN_TO_CLASS_TABLE: Dict[int, int] = {
    10: 150,
    16: 150,
    20: 150,
    25: 300,
    40: 300,
    50: 300,
    64: 600,
    100: 600,
    150: 900,
    250: 1500,
    420: 2500,
}

# Fractional inch pattern matching (e.g. 1/2, 3/4, 1-1/2, 2 1/2)
FRACTION_MAP: Dict[str, float] = {
    "1/8": 0.125,
    "1/4": 0.25,
    "3/8": 0.375,
    "1/2": 0.5,
    "3/4": 0.75,
}


class AttributeExtractor:
    """
    Parametric regex attribute extractor resolving physical engineering parameters:
    - item_class
    - size_inch and size_mm (bidirectional conversion)
    - pressure_class (ANSI classes & PN equivalents)
    - metallurgy (ASTM, AISI, Exotic grades)
    - standards (API, ASME, NACE, ASTM)
    - end_connection
    - parametric_attributes (schedule, bore type, operator, sour service, trim)
    """

    def __init__(self, normalizer: Optional[DomainNormalizer] = None):
        self.normalizer = normalizer or default_normalizer

    def extract(self, raw_text: str) -> Dict[str, Any]:
        """
        Takes raw legacy text and returns normalized parametric attributes.
        """
        cleaned = self.normalizer.clean_text(raw_text)
        upper_raw = raw_text.upper()

        attrs: Dict[str, Any] = {
            "clean_text": cleaned,
            "item_class": self._extract_item_class(cleaned, upper_raw),
            "size_inch": None,
            "size_mm": None,
            "pressure_class": self._extract_pressure_class(cleaned, upper_raw),
            "metallurgy": self._extract_metallurgy(cleaned, upper_raw),
            "end_connection": self._extract_end_connection(cleaned, upper_raw),
            "standards": self._extract_standards(cleaned, upper_raw),
            "parametric_attributes": {},
        }

        # Size extraction with metric-imperial harmonization
        size_inch, size_mm = self._extract_size(cleaned, upper_raw)
        attrs["size_inch"] = size_inch
        attrs["size_mm"] = size_mm

        # Parametric attributes enrichment
        attrs["parametric_attributes"] = self._extract_parametric_details(cleaned, upper_raw)

        return attrs

    def _extract_item_class(self, text: str, raw: str) -> str:
        """Determines item equipment class."""
        # 1. Valves
        if "BALL VALVE" in text or ("BALL" in text and "VALVE" in text):
            return "BALL_VALVE"
        if "GATE VALVE" in text or ("GATE" in text and "VALVE" in text):
            return "GATE_VALVE"
        if "GLOBE VALVE" in text or ("GLOBE" in text and "VALVE" in text):
            return "GLOBE_VALVE"
        if "CHECK VALVE" in text or "NON RETURN VALVE" in text or ("CHECK" in text and "VALVE" in text):
            return "CHECK_VALVE"
        if "BUTTERFLY VALVE" in text or ("BUTTERFLY" in text and "VALVE" in text):
            return "BUTTERFLY_VALVE"
        if "PLUG VALVE" in text or ("PLUG" in text and "VALVE" in text):
            return "PLUG_VALVE"
        if "CONTROL VALVE" in text:
            return "CONTROL_VALVE"
        if "SAFETY VALVE" in text or "RELIEF VALVE" in text:
            return "SAFETY_VALVE"

        # 2. Flanges
        if "WELD NECK" in text or re.search(r"\bWNRF\b|\bWN\b", raw):
            return "WELD_NECK_FLANGE"
        if "SLIP ON" in text or re.search(r"\bSORF\b|\bSO\b", raw):
            return "SLIP_ON_FLANGE"
        if "BLIND" in text and ("FLANGE" in text or "FLANGED" in text or "BLRF" in raw):
            return "BLIND_FLANGE"
        if "SOCKET WELD" in text and ("FLANGE" in text or "FLANGED" in text or "SWRF" in raw):
            return "SOCKET_WELD_FLANGE"
        if "FLANGE" in text or "FLANGED" in text:
            return "FLANGE"

        # 3. Gaskets
        if "SPIRAL WOUND" in text or "SPWD" in raw or "SWG" in raw or ("GASKET" in text and "SPIRAL" in text):
            return "SPIRAL_WOUND_GASKET"
        if "RING JOINT GASKET" in text or "RTJ GASKET" in text:
            return "RING_JOINT_GASKET"
        if "GASKET" in text:
            return "GASKET"

        # 4. Piping & Fittings
        if "LINE PIPE" in text or re.search(r"\bPIPE\b", text):
            return "LINE_PIPE"
        if "ELBOW" in text or re.search(r"\bELB\b|\bELL\b", raw):
            return "PIPE_FITTING_ELBOW"
        if "TEE" in text:
            return "PIPE_FITTING_TEE"
        if "REDUCER" in text or re.search(r"\bRED\b", raw):
            return "PIPE_FITTING_REDUCER"

        return "UNKNOWN"

    def _extract_size(self, text: str, raw: str) -> Tuple[Optional[float], Optional[int]]:
        """
        Extracts nominal pipe size and converts bidirectionally between mm (NB/DN) and inches (NPS).
        """
        # Check composite fraction inch e.g. "1-1/2 INCH", "2 1/2\"", "1/2 IN"
        frac_match = re.search(r"(\d+)?(?:\s*[- ]\s*)?(1/8|1/4|3/8|1/2|3/4)\s*(?:INCH|IN|\"|\bIN\b)?", raw)
        if frac_match and frac_match.group(2):
            whole = float(frac_match.group(1)) if frac_match.group(1) else 0.0
            frac_val = FRACTION_MAP.get(frac_match.group(2), 0.0)
            inch_val = whole + frac_val
            if 0.1 <= inch_val <= 64.0:
                mm_val = INCH_TO_METRIC_TABLE.get(inch_val, round(inch_val * 25.4))
                return inch_val, mm_val

        # Decimal inch e.g. "2 INCH", "2.0\"", "2 IN", "2\"", "0.5 INCH"
        inch_match = re.search(
            r"(?:SIZE\s*)?(\d+(?:\.\d+)?)\s*(?:INCH|IN|\"|\bIN\b)",
            text,
        )
        if inch_match:
            try:
                inch_val = float(inch_match.group(1))
                if 0.1 <= inch_val <= 64.0:
                    mm_val = INCH_TO_METRIC_TABLE.get(inch_val, round(inch_val * 25.4))
                    return inch_val, mm_val
            except ValueError:
                pass

        # Metric mm / NB / DN e.g. "50MM NB", "50 MM", "DN 50", "DN50", "50MM"
        mm_match = re.search(
            r"(?:DN\s*(\d+))|(\d+)\s*(?:MM\s*NB|MM|MILLIMETER|NB)",
            raw,
        )
        if mm_match:
            try:
                mm_str = mm_match.group(1) or mm_match.group(2)
                mm_val = int(mm_str)
                if 10 <= mm_val <= 1600:
                    inch_val = METRIC_TO_INCH_TABLE.get(mm_val, round(mm_val / 25.4, 3))
                    return inch_val, mm_val
            except ValueError:
                pass

        return None, None

    def _extract_pressure_class(self, text: str, raw: str) -> Optional[int]:
        """
        Extracts pressure class rating (e.g. 150#, 300#, 600#, 800#, 900#, 1500#, 2500#)
        or converts European PN ratings to ASME equivalent.
        """
        # Look for standard ANSI ratings: 150, 300, 600, 800, 900, 1500, 2500, 4500
        # Prefix pattern: CL 150, CLASS 150, #150, 150#, ASME 150, ANSI 150
        pattern = re.search(
            r"(?:(?:CL|CLASS|#|LB|LBS|RATING|ASME|ANSI)\s*(\d{3,4}))|(?:(\d{3,4})\s*(?:#|LB|LBS|CLASS|CL))",
            raw,
            re.IGNORECASE,
        )
        if pattern:
            rating_str = pattern.group(1) or pattern.group(2)
            try:
                rating = int(rating_str)
                if rating in (150, 300, 600, 800, 900, 1500, 2500, 4500):
                    return rating
            except ValueError:
                pass

        # Look for PN ratings: PN 16, PN 20, PN 40, PN 100
        pn_match = re.search(r"\bPN\s*(\d{2,3})\b", raw)
        if pn_match:
            try:
                pn_val = int(pn_match.group(1))
                if pn_val in PN_TO_CLASS_TABLE:
                    return PN_TO_CLASS_TABLE[pn_val]
            except ValueError:
                pass

        # Direct token check in normalized text
        for rating in [2500, 1500, 900, 800, 600, 300, 150]:
            if f"{rating}#" in text or f"CLASS {rating}" in text or f"{rating} POUND" in text:
                return rating

        return None

    def _extract_metallurgy(self, text: str, raw: str) -> Optional[str]:
        """
        Extracts metallurgy specification conforming to ASTM/AISI standards.
        """
        # Forged / Cast Carbon Steels
        if re.search(r"\bA105N\b", raw):
            return "ASTM_A105_NORMALIZED"
        if re.search(r"\bA105\b|\bA-105\b", raw):
            return "ASTM_A105"
        if re.search(r"\bA216\s*WCB\b|\bWCB\b", raw):
            return "ASTM_A216_WCB"
        if re.search(r"\bA216\s*WCC\b|\bWCC\b", raw):
            return "ASTM_A216_WCC"
        if re.search(r"\bA350\s*LF2\b|\bLF2\b", raw):
            return "ASTM_A350_LF2"

        # Seamless & Welded Pipe Carbon Steels
        if re.search(r"\bA106\s*GR\s*B\b|\bA106-B\b|\bA106B\b", raw):
            return "ASTM_A106_GR_B"
        if re.search(r"\bA333\s*GR\s*6\b|\bA333-6\b", raw):
            return "ASTM_A333_GR_6"
        if re.search(r"\bA53\s*GR\s*B\b|\bA53-B\b|\bA53B\b", raw):
            return "ASTM_A53_GR_B"
        if re.search(r"\bA516\s*GR\s*70\b|\bA516-70\b", raw):
            return "ASTM_A516_GR_70"

        # Stainless Steels
        if re.search(r"\bA182\s*F316L\b|\bF316L\b|\bSS316L\b|\b316LSS\b", raw):
            return "ASTM_A182_F316L"
        if re.search(r"\bA182\s*F316\b|\bF316\b|\bSS316\b|\b316SS\b|\b316\b", raw):
            return "ASTM_A182_F316"
        if re.search(r"\bA182\s*F304L\b|\bF304L\b|\bSS304L\b", raw):
            return "ASTM_A182_F304L"
        if re.search(r"\bA182\s*F304\b|\bF304\b|\bSS304\b|\b304SS\b|\b304\b", raw):
            return "ASTM_A182_F304"
        if re.search(r"\bA312\s*TP316L\b|\bTP316L\b", raw):
            return "ASTM_A312_TP316L"
        if re.search(r"\bA312\s*TP316\b|\bTP316\b", raw):
            return "ASTM_A312_TP316"
        if re.search(r"\bA351\s*CF8M\b|\bCF8M\b", raw):
            return "ASTM_A351_CF8M"
        if re.search(r"\bA351\s*CF8\b|\bCF8\b", raw):
            return "ASTM_A351_CF8"

        # Duplex & Super Duplex (Super Duplex checked first to avoid substring collision)
        if re.search(r"\bF53\b|\bF55\b|\b2507\b|\bSUPER\s*DUPLEX\b|\bSDSS\b", raw, re.IGNORECASE):
            return "ASTM_A182_F53_SUPER_DUPLEX"
        if re.search(r"\bF51\b|\b2205\b|(?<!SUPER\s)\bDUPLEX\b|\bDSS\b", raw, re.IGNORECASE):
            return "ASTM_A182_F51_DUPLEX"

        # Nickel Alloys & Titanium
        if re.search(r"\bINCONEL\s*625\b|\bINC\s*625\b|\bN06625\b", raw):
            return "INCONEL_625"
        if re.search(r"\bMONEL\s*400\b|\bMONEL\b|\bN04400\b", raw):
            return "MONEL_400"
        if re.search(r"\bHASTELLOY\s*C276\b|\bHAST\s*C276\b|\bN10276\b", raw):
            return "HASTELLOY_C276"
        if re.search(r"\bTITANIUM\b|\bTI\b", raw):
            return "TITANIUM_GR2"

        # Broad fallbacks
        if "CARBON STEEL" in text:
            return "CARBON_STEEL"
        if "STAINLESS STEEL" in text:
            return "STAINLESS_STEEL"
        if "ALLOY STEEL" in text:
            return "ALLOY_STEEL"

        return None

    def _extract_standards(self, text: str, raw: str) -> List[str]:
        """Extracts all governing standards referenced."""
        standards = []
        std_patterns = [
            (r"\bAPI\s*6D\b", "API 6D"),
            (r"\bAPI\s*600\b", "API 600"),
            (r"\bAPI\s*602\b", "API 602"),
            (r"\bAPI\s*594\b", "API 594"),
            (r"\bAPI\s*598\b", "API 598"),
            (r"\bAPI\s*609\b", "API 609"),
            (r"\bAPI\s*5L\b", "API 5L"),
            (r"\bASME\s*B16\.5\b", "ASME B16.5"),
            (r"\bASME\s*B16\.34\b", "ASME B16.34"),
            (r"\bASME\s*B16\.20\b", "ASME B16.20"),
            (r"\bASME\s*B16\.47\b", "ASME B16.47"),
            (r"\bASME\s*B16\.9\b", "ASME B16.9"),
            (r"\bASME\s*B16\.11\b", "ASME B16.11"),
            (r"\bASME\s*B31\.3\b", "ASME B31.3"),
            (r"\bMR0175\b|\bMR-0175\b|\bNACE\s*MR0175\b", "NACE MR0175"),
            (r"\bMR0103\b|\bMR-0103\b|\bNACE\s*MR0103\b", "NACE MR0103"),
            (r"\bOISD-STD-118\b|\bOISD\s*118\b", "OISD-STD-118"),
            (r"\bISO\s*10423\b", "ISO 10423"),
            (r"\bBS\s*1868\b", "BS 1868"),
            (r"\bBS\s*1873\b", "BS 1873"),
        ]
        for pattern, std_name in std_patterns:
            if re.search(pattern, raw, re.IGNORECASE):
                standards.append(std_name)
        return standards

    def _extract_end_connection(self, text: str, raw: str) -> Optional[str]:
        """Resolves mechanical end connection geometry."""
        if re.search(r"\bRTJ\b|\bRING\s*TYPE\s*JOINT\b|\bWNRTJ\b", raw):
            return "FLANGED_RTJ"
        if re.search(r"\bFLG\s*RF\b|\bFLANGED\s*RF\b|\bWNRF\b|\bSORF\b|\bRF\b|\bRAISED\s*FACE\b", raw):
            return "FLANGED_RF"
        if re.search(r"\bFLAT\s*FACE\b|\bFF\b|\bWNFF\b|\bSOFF\b", raw):
            return "FLANGED_FF"
        if re.search(r"\bBUTTWELD\b|\bBW\b|\bBWE\b|\bBEVEL\s*END\b|\bBE\b", raw):
            return "BUTTWELD"
        if re.search(r"\bSOCKET\s*WELD\b|\bSW\b|\bSWE\b|\bSWRF\b", raw):
            return "SOCKET_WELD"
        if re.search(r"\bTHREADED\b|\bTHD\b|\bNPT\b|\bBSPT\b|\bSCREWED\b", raw):
            return "THREADED_NPT"
        if re.search(r"\bWAFER\b", raw):
            return "WAFER"
        if re.search(r"\bLUG\b", raw):
            return "LUG"
        if "FLANGED" in text:
            return "FLANGED_RF"
        return None

    def _extract_parametric_details(self, text: str, raw: str) -> Dict[str, Any]:
        """Extracts supplementary engineering attributes for JSONB storage."""
        params: Dict[str, Any] = {}

        # Pipe Schedule / Wall thickness
        sch_match = re.search(
            r"\bSCH(?:EDULE)?\s*(\d+|STD|XS|XXS)\b|\b(STD|XS|XXS)\s*WALL\b",
            raw,
            re.IGNORECASE,
        )
        if sch_match:
            val = sch_match.group(1) or sch_match.group(2)
            params["schedule"] = f"SCH {val.upper()}"

        # Bore Type
        if re.search(r"\bFULL\s*BORE\b|\bFB\b|\bFULL\s*PORT\b|\bFP\b", raw):
            params["bore_type"] = "FULL_BORE"
        elif re.search(r"\bREDUCED\s*BORE\b|\bRB\b|\bREDUCED\s*PORT\b|\bRP\b", raw):
            params["bore_type"] = "REDUCED_BORE"

        # Actuation / Operator
        if re.search(r"\bLEVER\b|\bLVR\b", raw):
            params["operator"] = "LEVER"
        elif re.search(r"\bGEAR\b|\bGO\b|\bWORM\b", raw):
            params["operator"] = "GEAR"
        elif re.search(r"\bACTUATED\b|\bACT\b|\bPNEUMATIC\b", raw):
            params["operator"] = "ACTUATOR"

        # Sour Service compliance
        if "MR0175" in raw or "MR0103" in raw or "SOUR" in text or "H2S" in raw or "NACE" in text:
            params["sour_service"] = True
        else:
            params["sour_service"] = False

        # Trim Metallurgy
        trim_match = re.search(
            r"\bTRIM\s*(316|316L|304|13CR|STELLITE|MONEL)\b",
            raw,
            re.IGNORECASE,
        )
        if trim_match:
            params["trim"] = trim_match.group(1).upper()

        return params


# Singleton default extractor instance
default_extractor = AttributeExtractor()
