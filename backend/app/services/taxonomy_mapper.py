# ponytail: Deterministic cross-walk mapper between ONMC attributes and Shell MESC / UNSPSC / GeM taxonomies.
# Upgrade path: add automated GeM API catalog category sync.

from typing import Any, Dict


class TaxonomyMapper:
    """
    Bi-directional cross-walk mapper resolving:
    - Shell MESC 10-digit code (XX.XX.XX.XXX.X)
    - Shell MESC SPE Engineering Specification standard
    - UNSPSC 8-digit international taxonomy code
    - GeM Category ID (Rule 149 GFR compliance)
    """

    # Exact canonical cross-walk fixtures defined in PRD.md Section 4.2
    CANONICAL_LOOKUP = {
        ("BALL_VALVE", 2.0, 150): {
            "shell_mesc_code": "74.16.01.015.1",
            "mesc_spe_spec": "SPE 77/300",
            "unspsc_code": "40141607",
            "gem_category_id": "GeM-CAT-VLV-BALL-01",
            "category_name": "Valves - Ball Valves Flanged",
        },
        ("GATE_VALVE", 4.0, 300): {
            "shell_mesc_code": "74.12.03.020.1",
            "mesc_spe_spec": "SPE 77/200",
            "unspsc_code": "40141611",
            "gem_category_id": "GeM-CAT-VLV-GATE-02",
            "category_name": "Valves - Gate Valves Flanged",
        },
        ("WELD_NECK_FLANGE", 6.0, 150): {
            "shell_mesc_code": "76.22.11.025.1",
            "mesc_spe_spec": "SPE 74/019",
            "unspsc_code": "40141720",
            "gem_category_id": "GeM-CAT-FLG-WNRF-01",
            "category_name": "Piping - Weld Neck Raised Face Flanges",
        },
        ("SPIRAL_WOUND_GASKET", 2.0, 150): {
            "shell_mesc_code": "76.44.02.015.1",
            "mesc_spe_spec": "SPE 76/100",
            "unspsc_code": "31181502",
            "gem_category_id": "GeM-CAT-GSK-SPWD-01",
            "category_name": "Gaskets - Metallic Spiral Wound",
        },
        ("LINE_PIPE", 4.0, None): {
            "shell_mesc_code": "74.00.01.020.1",
            "mesc_spe_spec": "SPE 74/001",
            "unspsc_code": "40171501",
            "gem_category_id": "GeM-CAT-PIP-SMLS-01",
            "category_name": "Piping - Seamless Carbon Steel Line Pipe",
        },
    }

    # Shell MESC Group hierarchy rules:
    # Group 74: Valves & Piping
    # Group 76: Flanges & Gaskets
    # Group 60: Instrumentation
    # Group 27: Electrical
    MESC_GROUP_MAP = {
        "BALL_VALVE": ("74.16", "SPE 77/300", "40141607", "GeM-CAT-VLV-BALL-01"),
        "GATE_VALVE": ("74.12", "SPE 77/200", "40141611", "GeM-CAT-VLV-GATE-02"),
        "GLOBE_VALVE": ("74.14", "SPE 77/200", "40141608", "GeM-CAT-VLV-GLOBE-01"),
        "CHECK_VALVE": ("74.24", "SPE 77/100", "40141604", "GeM-CAT-VLV-CHECK-01"),
        "BUTTERFLY_VALVE": ("74.30", "SPE 77/134", "40141619", "GeM-CAT-VLV-BTFLY-01"),
        "PLUG_VALVE": ("74.40", "SPE 77/130", "40141620", "GeM-CAT-VLV-PLUG-01"),
        "WELD_NECK_FLANGE": ("76.22", "SPE 74/019", "40141720", "GeM-CAT-FLG-WNRF-01"),
        "SLIP_ON_FLANGE": ("76.20", "SPE 74/019", "40141720", "GeM-CAT-FLG-SORF-01"),
        "BLIND_FLANGE": ("76.26", "SPE 74/019", "40141720", "GeM-CAT-FLG-BLND-01"),
        "SOCKET_WELD_FLANGE": ("76.24", "SPE 74/019", "40141720", "GeM-CAT-FLG-SWRF-01"),
        "SPIRAL_WOUND_GASKET": ("76.44", "SPE 76/100", "31181502", "GeM-CAT-GSK-SPWD-01"),
        "RING_JOINT_GASKET": ("76.46", "SPE 76/100", "31181502", "GeM-CAT-GSK-RTJ-01"),
        "LINE_PIPE": ("74.00", "SPE 74/001", "40171501", "GeM-CAT-PIP-SMLS-01"),
        "PIPE_FITTING_ELBOW": ("74.60", "SPE 74/020", "40141753", "GeM-CAT-FIT-ELB-01"),
        "PIPE_FITTING_TEE": ("74.62", "SPE 74/020", "40141755", "GeM-CAT-FIT-TEE-01"),
        "PIPE_FITTING_REDUCER": ("74.64", "SPE 74/020", "40141700", "GeM-CAT-FIT-RED-01"),
    }

    def map_taxonomy(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        """
        Maps normalized material attributes to Shell MESC, UNSPSC, and GeM codes.
        """
        item_class = attrs.get("item_class", "UNKNOWN")
        size_inch = attrs.get("size_inch")
        pressure_class = attrs.get("pressure_class")

        # 1. Check exact canonical match
        key = (item_class, size_inch, pressure_class)
        if key in self.CANONICAL_LOOKUP:
            return dict(self.CANONICAL_LOOKUP[key])

        # Also check pipe without pressure requirement
        pipe_key = (item_class, size_inch, None)
        if pipe_key in self.CANONICAL_LOOKUP:
            return dict(self.CANONICAL_LOOKUP[pipe_key])

        # 2. Algorithmic fallback derivation based on item_class
        if item_class in self.MESC_GROUP_MAP:
            mesc_prefix, spe_spec, unspsc, gem_cat = self.MESC_GROUP_MAP[item_class]

            # Format sub-code and size sequence: e.g. 01.015.1
            sub_group = "01"
            size_seq = f"{int(size_inch * 10):03d}" if size_inch else "000"
            sub_type = "1"
            computed_mesc = f"{mesc_prefix}.{sub_group}.{size_seq}.{sub_type}"

            return {
                "shell_mesc_code": computed_mesc,
                "mesc_spe_spec": spe_spec,
                "unspsc_code": unspsc,
                "gem_category_id": gem_cat,
                "category_name": f"Industrial Equipment - {item_class.replace('_', ' ').title()}",
            }

        # 3. Default generic mapping for unidentified components
        return {
            "shell_mesc_code": "00.00.00.000.0",
            "mesc_spe_spec": "SPE GENERAL",
            "unspsc_code": "40141600",
            "gem_category_id": "GeM-CAT-GEN-01",
            "category_name": "General Oil & Gas Engineering Spare",
        }


# Singleton default mapper instance
default_taxonomy_mapper = TaxonomyMapper()
