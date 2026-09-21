# ponytail: Deterministic sovereign One Nation, One Material Code (ONMC) generator with SHA-256 hash.
# Upgrade path: add multi-discipline electrical (ELEC) and instrumentation (INST) category tables.

import hashlib
from typing import Any, Dict


class ONMCMinter:
    """
    Deterministic Minter for One Nation, One Material Code (ONMC) standard.
    Architecture:
    ONMC - [DISCIPLINE] - [CATEGORY] - [TYPE] - [SIZE] - [RATING] - [ALLOY] - [HASH4]
    """

    CLASS_MAPPINGS = {
        "BALL_VALVE": ("MECH", "VLV", "BAL"),
        "GATE_VALVE": ("MECH", "VLV", "GAT"),
        "GLOBE_VALVE": ("MECH", "VLV", "GLB"),
        "CHECK_VALVE": ("MECH", "VLV", "CHK"),
        "BUTTERFLY_VALVE": ("MECH", "VLV", "BFT"),
        "PLUG_VALVE": ("MECH", "VLV", "PLG"),
        "WELD_NECK_FLANGE": ("MECH", "FLG", "WNR"),
        "SPIRAL_WOUND_GASKET": ("MECH", "GSK", "SPW"),
        "LINE_PIPE": ("MECH", "PIP", "SML"),
    }

    METALLURGY_CLEAN = {
        "ASTM_A105": "A105",
        "ASTM_A216_WCB": "WCB",
        "ASTM_A106_GR_B": "A106",
        "ASTM_A350_LF2": "LF2",
        "ASTM_A182_F316": "SS316",
        "SS316": "SS316",
        "SS304": "SS304",
        "CARBON_STEEL": "CS",
        "FORGED_STEEL": "FS",
    }

    def mint_base_code(self, attrs: Dict[str, Any]) -> str:
        """Generates 6-segment base ONMC code without trailing hash."""
        item_class = attrs.get("item_class", "GEN-GEN")
        disc, cat, typ = self.CLASS_MAPPINGS.get(item_class, ("MECH", "GEN", "GEN"))

        # Format Size (3-digit NPS or DN)
        size_inch = attrs.get("size_inch")
        if size_inch is not None:
            size_str = f"{int(round(size_inch)):03d}"
        else:
            size_str = "000"

        # Format Pressure Rating
        pressure = attrs.get("pressure_class")
        if pressure is not None:
            rating_str = str(pressure)
        elif item_class == "LINE_PIPE":
            params = attrs.get("parametric_attributes") or {}
            sch = params.get("schedule", "STD")
            rating_str = sch.replace("SCH ", "")
        else:
            rating_str = "000"

        # Format Metallurgy Alloy
        raw_metal = attrs.get("metallurgy") or "STD"
        if raw_metal in self.METALLURGY_CLEAN:
            alloy_str = self.METALLURGY_CLEAN[raw_metal]
        else:
            cleaned_m = raw_metal.replace("ASTM_", "").replace("_", "")
            alloy_str = cleaned_m[:4] if cleaned_m else "STD"

        return f"ONMC-{disc}-{cat}-{typ}-{size_str}-{rating_str}-{alloy_str}"

    def compute_verification_hash(self, base_code: str) -> str:
        """Computes deterministic 4-character uppercase hex validation hash."""
        return hashlib.sha256(base_code.encode("utf-8")).hexdigest()[:4].upper()

    def mint_canonical_code(self, attrs: Dict[str, Any], include_hash: bool = True) -> str:
        """
        Mints complete sovereign ONMC code.
        If include_hash=True: returns ONMC-...-HASH4
        If include_hash=False: returns ONMC-... (6-segment base)
        """
        base = self.mint_base_code(attrs)
        if include_hash:
            h4 = self.compute_verification_hash(base)
            return f"{base}-{h4}"
        return base

    def mint(self, attrs: Dict[str, Any], include_hash: bool = False) -> str:
        """Compatibility wrapper defaulting to 6-segment base or full hash."""
        return self.mint_canonical_code(attrs, include_hash=include_hash)


default_onmc_minter = ONMCMinter()
