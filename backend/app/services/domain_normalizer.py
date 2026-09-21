# ponytail: Precompiled regex dictionary for 250+ Oil & Gas domain abbreviations.
# Upgrade path: add multi-lingual CPSE local vernacular aliases (Hindi transliterations).

import re
from typing import Dict, List, Tuple

# Comprehensive 250+ Oil & Gas acronym expansion dictionary
# Categorized into Equipment, Piping, Metallurgy, Grades, Units, Connections, Operations, Standards
OIL_GAS_ABBREVIATIONS: Dict[str, str] = {
    # 1. Equipment & Valve Types (40 items)
    r"\bVLV\b": "VALVE",
    r"\bVALV\b": "VALVE",
    r"\bBL\b": "BALL",
    r"\bBAL\b": "BALL",
    r"\bGT\b": "GATE",
    r"\bGAT\b": "GATE",
    r"\bGLB\b": "GLOBE",
    r"\bGL\b": "GLOBE",
    r"\bCHK\b": "CHECK",
    r"\bCK\b": "CHECK",
    r"\bNRV\b": "NON RETURN VALVE",
    r"\bBFV\b": "BUTTERFLY VALVE",
    r"\bBFT\b": "BUTTERFLY",
    r"\bPLG\b": "PLUG",
    r"\bPLGV\b": "PLUG VALVE",
    r"\bPSV\b": "PRESSURE SAFETY VALVE",
    r"\bPRV\b": "PRESSURE REDUCING VALVE",
    r"\bDBB\b": "DOUBLE BLOCK AND BLEED",
    r"\bSDV\b": "SHUTDOWN VALVE",
    r"\bESDV\b": "EMERGENCY SHUTDOWN VALVE",
    r"\bMOV\b": "MOTOR OPERATED VALVE",
    r"\bPCV\b": "PRESSURE CONTROL VALVE",
    r"\bFCV\b": "FLOW CONTROL VALVE",
    r"\bLCV\b": "LEVEL CONTROL VALVE",
    r"\bTCV\b": "TEMPERATURE CONTROL VALVE",
    r"\bTSV\b": "TEMPERATURE SAFETY VALVE",
    r"\bBDV\b": "BLOWDOWN VALVE",
    r"\bRO\b": "RESTRICTION ORIFICE",
    r"\bFO\b": "FLOW ORIFICE",
    r"\bSTR\b": "STRAINER",
    r"\bSTRN\b": "STRAINER",
    r"\bFLTR\b": "FILTER",
    r"\bTRP\b": "STEAM TRAP",
    r"\bSTRP\b": "STEAM TRAP",
    r"\bEXCH\b": "HEAT EXCHANGER",
    r"\bVES\b": "VESSEL",
    r"\bPMP\b": "PUMP",
    r"\bCOMP\b": "COMPRESSOR",
    r"\bTK\b": "TANK",
    r"\bDRM\b": "DRUM",
    # 2. Piping Components & Fittings (50 items)
    r"\bFLG\b": "FLANGED",
    r"\bFLGD\b": "FLANGED",
    r"\bFLANGE\b": "FLANGE",
    r"\bWNRF\b": "WELD NECK RAISED FACE",
    r"\bWN\b": "WELD NECK",
    r"\bWNFF\b": "WELD NECK FLAT FACE",
    r"\bWNRTJ\b": "WELD NECK RING TYPE JOINT",
    r"\bSORF\b": "SLIP ON RAISED FACE",
    r"\bSOFF\b": "SLIP ON FLAT FACE",
    r"\bSO\b": "SLIP ON",
    r"\bBLRF\b": "BLIND RAISED FACE",
    r"\bBLND\b": "BLIND",
    r"\bBLFF\b": "BLIND FLAT FACE",
    r"\bSWRF\b": "SOCKET WELD RAISED FACE",
    r"\bSWFF\b": "SOCKET WELD FLAT FACE",
    r"\bTHRF\b": "THREADED RAISED FACE",
    r"\bLJRF\b": "LAP JOINT RAISED FACE",
    r"\bLJF\b": "LAP JOINT FLANGE",
    r"\bLJ\b": "LAP JOINT",
    r"\bGSK\b": "GASKET",
    r"\bGSKT\b": "GASKET",
    r"\bSPWD\b": "SPIRAL WOUND",
    r"\bSPW\b": "SPIRAL WOUND",
    r"\bSWG\b": "SPIRAL WOUND GASKET",
    r"\bCAF\b": "COMPRESSED ASBESTOS FIBRE",
    r"\bCNAF\b": "COMPRESSED NON ASBESTOS FIBRE",
    r"\bRTJ\b": "RING TYPE JOINT",
    r"\bSMLS\b": "SEAMLESS",
    r"\bSML\b": "SEAMLESS",
    r"\bSM\b": "SEAMLESS",
    r"\bERW\b": "ELECTRIC RESISTANCE WELDED",
    r"\bSAW\b": "SUBMERGED ARC WELDED",
    r"\bLSAW\b": "LONGITUDINAL SUBMERGED ARC WELDED",
    r"\bHSAW\b": "HELICAL SUBMERGED ARC WELDED",
    r"\bELB\b": "ELBOW",
    r"\bELL\b": "ELBOW",
    r"\bTEE\b": "TEE",
    r"\bRED\b": "REDUCER",
    r"\bCONC\b": "CONCENTRIC",
    r"\bECC\b": "ECCENTRIC",
    r"\bCPLG\b": "COUPLING",
    r"\bHCPLG\b": "HALF COUPLING",
    r"\bNIP\b": "NIPPLE",
    r"\bUN\b": "UNION",
    r"\bWOL\b": "WELDOLET",
    r"\bSOL\b": "SOCKOLET",
    r"\bTOL\b": "THREADOLET",
    r"\bEOL\b": "ELBOLET",
    r"\bCOL\b": "COUPOLET",
    r"\bLAT\b": "LATERAL",
    # 3. Metallurgy & Base Materials (35 items)
    r"\bCS\b": "CARBON STEEL",
    r"\bFS\b": "FORGED STEEL",
    r"\bMS\b": "MILD STEEL",
    r"\bAS\b": "ALLOY STEEL",
    r"\bSS\b": "STAINLESS STEEL",
    r"\b304SS\b|\bSS304\b": "STAINLESS STEEL 304",
    r"\b304LSS\b|\bSS304L\b": "STAINLESS STEEL 304L",
    r"\b316SS\b|\bSS316\b": "STAINLESS STEEL 316",
    r"\b316LSS\b|\bSS316L\b": "STAINLESS STEEL 316L",
    r"\b321SS\b|\bSS321\b": "STAINLESS STEEL 321",
    r"\b347SS\b|\bSS347\b": "STAINLESS STEEL 347",
    r"\bDSS\b": "DUPLEX STAINLESS STEEL",
    r"\bSDSS\b": "SUPER DUPLEX STAINLESS STEEL",
    r"\bLTCS\b": "LOW TEMPERATURE CARBON STEEL",
    r"\bHTCS\b": "HIGH TEMPERATURE CARBON STEEL",
    r"\bCI\b": "CAST IRON",
    r"\bDI\b": "DUCTILE IRON",
    r"\bBRZ\b": "BRONZE",
    r"\bALBRZ\b": "ALUMINUM BRONZE",
    r"\bINC\b|\bINCONEL\b": "INCONEL",
    r"\bMONEL\b": "MONEL",
    r"\bHAST\b|\bHASTELLOY\b": "HASTELLOY",
    r"\bTI\b|\bTITAN\b": "TITANIUM",
    r"\bPTFE\b": "POLYTETRAFLUOROETHYLENE",
    r"\bCFT\b": "CARBON FILLED TEFLON",
    r"\bGFT\b": "GLASS FILLED TEFLON",
    r"\bGRAF\b|\bGRPH\b": "GRAPHITE",
    r"\bNBR\b": "NITRILE BUTADIENE RUBBER",
    r"\bFKM\b|\bVITON\b": "VITON FLUOROELASTOMER",
    r"\bEPDM\b": "ETHYLENE PROPYLENE DIENE MONOMER",
    r"\bNEO\b": "NEOPRENE",
    r"\bSTL\b|\bSTELLITE\b": "STELLITE",
    r"\b13CR\b|\bCR13\b": "13 PERCENT CHROME",
    r"\bNICU\b": "NICKEL COPPER",
    r"\bNICR\b": "NICKEL CHROMIUM",
    # 4. Material Grades & ASTM Specifications (35 items)
    r"\bA105N\b": "ASTM A105 NORMALIZED",
    r"\bA105\b": "ASTM A105",
    r"\bA-105\b": "ASTM A105",
    r"\bA216\s*WCB\b|\bWCB\b": "ASTM A216 WCB",
    r"\bA216\s*WCC\b|\bWCC\b": "ASTM A216 WCC",
    r"\bA217\s*WC6\b|\bWC6\b": "ASTM A217 WC6",
    r"\bA217\s*WC9\b|\bWC9\b": "ASTM A217 WC9",
    r"\bA217\s*C5\b|\bC5\b": "ASTM A217 C5",
    r"\bA217\s*C12\b|\bC12\b": "ASTM A217 C12",
    r"\bA352\s*LCB\b|\bLCB\b": "ASTM A352 LCB",
    r"\bA352\s*LCC\b|\bLCC\b": "ASTM A352 LCC",
    r"\bA350\s*LF2\b|\bLF2\b": "ASTM A350 LF2",
    r"\bA182\s*F316L\b|\bF316L\b": "ASTM A182 F316L",
    r"\bA182\s*F316\b|\bF316\b": "ASTM A182 F316",
    r"\bA182\s*F304L\b|\bF304L\b": "ASTM A182 F304L",
    r"\bA182\s*F304\b|\bF304\b": "ASTM A182 F304",
    r"\bA182\s*F11\b|\bF11\b": "ASTM A182 F11",
    r"\bA182\s*F22\b|\bF22\b": "ASTM A182 F22",
    r"\bA182\s*F51\b|\bF51\b": "ASTM A182 F51 DUPLEX",
    r"\bA182\s*F53\b|\bF53\b": "ASTM A182 F53 SUPER DUPLEX",
    r"\bA182\s*F55\b|\bF55\b": "ASTM A182 F55 SUPER DUPLEX",
    r"\bA106\s*GR\s*B\b|\bA106-B\b|\bA106B\b": "ASTM A106 GR B",
    r"\bA106\b": "ASTM A106",
    r"\bA53\s*GR\s*B\b|\bA53-B\b|\bA53B\b": "ASTM A53 GR B",
    r"\bA53\b": "ASTM A53",
    r"\bA333\s*GR\s*6\b|\bA333-6\b": "ASTM A333 GR 6",
    r"\bA312\s*TP316L\b|\bTP316L\b": "ASTM A312 TP316L",
    r"\bA312\s*TP316\b|\bTP316\b": "ASTM A312 TP316",
    r"\bA312\s*TP304L\b|\bTP304L\b": "ASTM A312 TP304L",
    r"\bA312\s*TP304\b|\bTP304\b": "ASTM A312 TP304",
    r"\bA516\s*GR\s*70\b|\bA516-70\b": "ASTM A516 GR 70",
    r"\bA516\s*GR\s*60\b|\bA516-60\b": "ASTM A516 GR 60",
    r"\bA351\s*CF8M\b|\bCF8M\b": "ASTM A351 CF8M",
    r"\bA351\s*CF8\b|\bCF8\b": "ASTM A351 CF8",
    r"\bA351\s*CF3M\b|\bCF3M\b": "ASTM A351 CF3M",
    # 5. Dimensions, Sizes & Thickness (25 items)
    r"\bNB\b": "NOMINAL BORE",
    r"\bDN\b": "DIAMETRE NOMINAL",
    r"\bNPS\b": "NOMINAL PIPE SIZE",
    r"\bOD\b": "OUTSIDE DIAMETER",
    r"\bID\b": "INSIDE DIAMETER",
    r"\bWT\b": "WALL THICKNESS",
    r"\bTHK\b": "THICKNESS",
    r"\bSCH\b": "SCHEDULE",
    r"\bSTD\b": "STANDARD WALL",
    r"\bXS\b": "EXTRA STRONG",
    r"\bXXS\b": "DOUBLE EXTRA STRONG",
    r"\bIN\b": "INCH",
    r"\bINCH\b": "INCH",
    r"\bMM\b": "MILLIMETER",
    r"\bCM\b": "CENTIMETER",
    r"\bMTR\b": "METER",
    r"\bFT\b": "FEET",
    r"\bLBS\b": "POUNDS",
    r"\bLB\b": "POUND",
    r"\bKGS\b": "KILOGRAMS",
    r"\bKG\b": "KILOGRAM",
    r"\bDEG\s*C\b": "CELSIUS",
    r"\bDEG\s*F\b": "FAHRENHEIT",
    r"\bLR\b": "LONG RADIUS",
    r"\bSR\b": "SHORT RADIUS",
    # 6. Pressure Ratings & Classes (20 items)
    r"\bCL\b": "CLASS",
    r"\bCLS\b": "CLASS",
    r"\bCLASS\b": "CLASS",
    r"\bPN\b": "PRESSURE NOMINAL",
    r"\bBAR\b": "BAR",
    r"\bPSI\b": "PSI",
    r"\bPSIG\b": "PSIG",
    r"\bPSIA\b": "PSIA",
    r"\bKPA\b": "KILOPASCAL",
    r"\bMPA\b": "MEGAPASCAL",
    r"\bWOG\b": "WATER OIL GAS",
    r"\bCWP\b": "COLD WORKING PRESSURE",
    r"\bMWP\b": "MAXIMUM WORKING PRESSURE",
    r"\bMAWP\b": "MAXIMUM ALLOWABLE WORKING PRESSURE",
    r"\b150#\b|\b150LB\b|\b150LBS\b": "150#",
    r"\b300#\b|\b300LB\b|\b300LBS\b": "300#",
    r"\b600#\b|\b600LB\b|\b600LBS\b": "600#",
    r"\b800#\b|\b800LB\b|\b800LBS\b": "800#",
    r"\b900#\b|\b900LB\b|\b900LBS\b": "900#",
    r"\b1500#\b|\b1500LB\b|\b1500LBS\b": "1500#",
    r"\b2500#\b|\b2500LB\b|\b2500LBS\b": "2500#",
    # 7. End Connections, Facings & Trims (30 items)
    r"\bBE\b|\bBWE\b": "BEVEL END",
    r"\bPE\b": "PLAIN END",
    r"\bTE\b": "THREADED END",
    r"\bSWE\b|\bSW\b": "SOCKET WELD",
    r"\bBW\b": "BUTTWELD",
    r"\bNPT\b": "NATIONAL PIPE TAPER",
    r"\bBSPT\b": "BRITISH STANDARD PIPE TAPER",
    r"\bBSPP\b": "BRITISH STANDARD PIPE PARALLEL",
    r"\bRF\b": "RAISED FACE",
    r"\bFF\b": "FLAT FACE",
    r"\bRJ\b": "RING JOINT",
    r"\bFB\b": "FULL BORE",
    r"\bRB\b": "REDUCED BORE",
    r"\bFP\b": "FULL PORT",
    r"\bRP\b": "REDUCED PORT",
    r"\bBB\b": "BOLTED BONNET",
    r"\bWB\b": "WELDED BONNET",
    r"\bPSB\b": "PRESSURE SEAL BONNET",
    r"\bUB\b": "UNION BONNET",
    r"\bSB\b": "SCREWED BONNET",
    r"\bOS&Y\b|\bOSY\b": "OUTSIDE SCREW AND YOKE",
    r"\bRS\b": "RISING STEM",
    r"\bNRS\b": "NON RISING STEM",
    r"\bISRS\b": "INSIDE SCREW RISING STEM",
    r"\bTRIM\b": "TRIM",
    r"\bSTELL\b": "STELLITE",
    r"\bMONEL\s*TRIM\b": "MONEL TRIM",
    r"\bSS\s*TRIM\b": "STAINLESS STEEL TRIM",
    r"\bSOFT\s*SEAT\b": "SOFT SEATED",
    r"\bMETAL\s*SEAT\b": "METAL SEATED",
    # 8. Actuation & Operation (15 items)
    r"\bLVR\b|\bLEVER\b": "LEVER OPERATED",
    r"\bLEVER\s*OP\b": "LEVER OPERATED",
    r"\bGO\b|\bGR\b": "GEAR OPERATED",
    r"\bGEAR\s*OP\b": "GEAR OPERATED",
    r"\bACT\b": "ACTUATED",
    r"\bPNEUM\b": "PNEUMATIC ACTUATED",
    r"\bHYD\b": "HYDRAULIC ACTUATED",
    r"\bELEC\b": "ELECTRIC MOTOR OPERATED",
    r"\bSOV\b": "SOLENOID VALVE",
    r"\bPOS\b": "POSITIONER",
    r"\bLS\b": "LIMIT SWITCH",
    r"\bHW\b": "HANDWHEEL",
    r"\bHANDWHEEL\b": "HANDWHEEL",
    r"\bCHAIN\b": "CHAIN OPERATED",
    r"\bWORM\s*GEAR\b": "WORM GEAR OPERATED",
    # 9. Standards, Codes & Authorities (20 items)
    r"\bAPI\b": "API",
    r"\bASME\b": "ASME",
    r"\bASTM\b": "ASTM",
    r"\bANSI\b": "ANSI",
    r"\bBS\b": "BRITISH STANDARD",
    r"\bDIN\b": "DIN",
    r"\bISO\b": "ISO",
    r"\bMSS\b": "MSS",
    r"\bNACE\b": "NACE",
    r"\bOISD\b": "OISD",
    r"\bIBR\b": "INDIAN BOILER REGULATIONS",
    r"\bEIL\b": "ENGINEERS INDIA LIMITED",
    r"\bCVC\b": "CENTRAL VIGILANCE COMMISSION",
    r"\bCAG\b": "COMPTROLLER AND AUDITOR GENERAL",
    r"\bMoPNG\b": "MINISTRY OF PETROLEUM AND NATURAL GAS",
    r"\bONMC\b": "ONE NATION ONE MATERIAL CODE",
    r"\bMESC\b": "SHELL MESC",
    r"\bUNSPSC\b": "UNSPSC",
    r"\bGeM\b": "GOVERNMENT E MARKETPLACE",
    r"\bAPI\s*6D\b": "API 6D",
    # 10. Service Conditions, Treatment & Inspection (15 items)
    r"\bMR0175\b|\bMR-0175\b": "NACE MR0175 SOUR SERVICE",
    r"\bMR0103\b|\bMR-0103\b": "NACE MR0103 SOUR SERVICE",
    r"\bH2S\b": "HYDROGEN SULFIDE SERVICE",
    r"\bSOUR\b": "SOUR SERVICE",
    r"\bSWEET\b": "SWEET SERVICE",
    r"\bCRYO\b": "CRYOGENIC SERVICE",
    r"\bHT\b": "HIGH TEMPERATURE",
    r"\bLT\b": "LOW TEMPERATURE",
    r"\bPWHT\b": "POST WELD HEAT TREATMENT",
    r"\bNDE\b|\bNDT\b": "NON DESTRUCTIVE TESTING",
    r"\bRT\b": "RADIOGRAPHIC TESTING",
    r"\bUT\b": "ULTRASONIC TESTING",
    r"\bMPT\b|\bMPI\b": "MAGNETIC PARTICLE INSPECTION",
    r"\bDPT\b|\bDP\b": "DYE PENETRANT TESTING",
    r"\bPMI\b": "POSITIVE MATERIAL IDENTIFICATION",
}


class DomainNormalizer:
    """
    High-performance Oil & Gas domain text normalizer.
    Expands 250+ abbreviations and eliminates unstructured formatting noise.
    """

    def __init__(self, custom_abbrevs: Dict[str, str] = None):
        self.abbreviations = dict(OIL_GAS_ABBREVIATIONS)
        if custom_abbrevs:
            self.abbreviations.update(custom_abbrevs)
        # Precompile regex patterns for sub-millisecond throughput
        self._compiled_patterns: List[Tuple[re.Pattern, str]] = [
            (re.compile(pat, re.IGNORECASE), repl) for pat, repl in self.abbreviations.items()
        ]

    def expand_abbreviations(self, text: str) -> str:
        """Expands all matching Oil & Gas domain acronyms."""
        result = text
        for pattern, replacement in self._compiled_patterns:
            result = pattern.sub(replacement, result)
        return result

    def clean_text(self, text: str) -> str:
        """
        Full cleansing pipeline:
        1. Uppercasing
        2. Domain abbreviation expansion
        3. Punctuation harmonization (preserves #, ", /, -, .)
        4. Whitespace consolidation
        """
        if not text:
            return ""

        normalized = text.upper()
        normalized = self.expand_abbreviations(normalized)

        # Keep alphanumeric, spaces, and critical engineering symbols: . - " # /
        normalized = re.sub(r"[^\w\s\.\-\"\#\/]", " ", normalized)
        # Consolidate multiple spaces
        normalized = re.sub(r"\s+", " ", normalized).strip()
        return normalized

    @property
    def abbreviation_count(self) -> int:
        """Total number of registered domain acronym expansions."""
        return len(self.abbreviations)


# Singleton default normalizer instance
default_normalizer = DomainNormalizer()
