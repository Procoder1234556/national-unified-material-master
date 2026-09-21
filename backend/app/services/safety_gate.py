# ponytail: Deterministic physical safety gate enforcing ASME/API/NACE constraints.
# Upgrade path: add dynamic metallurgy galvanic corrosion compatibility matrix.

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Union

from backend.app.services.attribute_extractor import AttributeExtractor, default_extractor


@dataclass(frozen=True)
class GateEvaluation:
    """Safety rule evaluation result."""

    passed: bool
    rejection_reasons: List[str] = field(default_factory=list)
    criticality: str = "CLEAN"  # "BLOCKER", "WARNING", "CLEAN"


class ISafetyGate(ABC):
    """Deep safety seam: evaluates pressure, size, and metallurgy compatibility."""

    @abstractmethod
    def evaluate(
        self,
        candidate: Union[Dict[str, Any], str],
        reference: Union[Dict[str, Any], str],
    ) -> GateEvaluation:
        """Determines if candidate can safely match or substitute reference."""
        pass


class SafetyGate(ISafetyGate):
    """
    Inviolable Safety Rule Gate:
    - ASME B16.5 & ASME B16.34: Zero tolerance for nominal size & pressure class mismatch.
    - API 6D: Enforces item class and equipment family consistency.
    - NACE MR0175 / ISO 15156: Enforces sour gas service segregation.
    - ASTM Metallurgy: Segregates incompatible alloys (Carbon Steel vs Stainless Steel).
    """

    def __init__(self, extractor: Optional[AttributeExtractor] = None):
        self.extractor = extractor or default_extractor

    def _resolve_attributes(self, item: Union[Dict[str, Any], str]) -> Dict[str, Any]:
        if isinstance(item, str):
            return self.extractor.extract(item)
        if isinstance(item, dict):
            # If already extracted dictionary
            if "item_class" in item:
                return item
            if "raw_description" in item:
                return self.extractor.extract(item["raw_description"])
        return {}

    def evaluate(
        self,
        candidate: Union[Dict[str, Any], str],
        reference: Union[Dict[str, Any], str],
    ) -> GateEvaluation:
        attr_c = self._resolve_attributes(candidate)
        attr_r = self._resolve_attributes(reference)

        rejections: List[str] = []
        criticality = "CLEAN"

        # 1. Item Class Hard Check
        cls_c = attr_c.get("item_class", "UNKNOWN")
        cls_r = attr_r.get("item_class", "UNKNOWN")
        if cls_c != "UNKNOWN" and cls_r != "UNKNOWN" and cls_c != cls_r:
            rejections.append(f"Item class mismatch: {cls_c} vs {cls_r}")
            criticality = "BLOCKER"

        # 2. Nominal Size (NPS / DN) Hard Check
        size_c = attr_c.get("size_inch")
        size_r = attr_r.get("size_inch")
        if size_c is not None and size_r is not None:
            if abs(size_c - size_r) > 0.05:
                rejections.append(f'Size mismatch: {size_c}" vs {size_r}"')
                criticality = "BLOCKER"

        # 3. Pressure Rating (ASME Class / PN) Hard Check
        press_c = attr_c.get("pressure_class")
        press_r = attr_r.get("pressure_class")
        if press_c is not None and press_r is not None:
            if press_c != press_r:
                rejections.append(f"Pressure mismatch: {press_c}# vs {press_r}#")
                criticality = "BLOCKER"

        # 4. Metallurgy Compatibility Hard Check
        metal_c = (attr_c.get("metallurgy") or "").upper()
        metal_r = (attr_r.get("metallurgy") or "").upper()
        if metal_c and metal_r:
            is_ss_c = "SS" in metal_c or "316" in metal_c or "304" in metal_c
            is_ss_r = "SS" in metal_r or "316" in metal_r or "304" in metal_r
            if is_ss_c != is_ss_r:
                rejections.append(f"Metallurgy conflict: {metal_c} vs {metal_r}")
                criticality = "BLOCKER"

        # 5. NACE MR0175 / Sour Gas Service Compliance Hard Check
        params_c = attr_c.get("parametric_attributes") or {}
        params_r = attr_r.get("parametric_attributes") or {}
        sour_c = params_c.get("sour_service", False)
        sour_r = params_r.get("sour_service", False)

        stds_c = [s.upper() for s in attr_c.get("standards", [])]
        stds_r = [s.upper() for s in attr_r.get("standards", [])]

        is_sour_c = sour_c or any("NACE" in s or "MR0175" in s or "MR0103" in s for s in stds_c)
        is_sour_r = sour_r or any("NACE" in s or "MR0175" in s or "MR0103" in s for s in stds_r)

        if is_sour_c != is_sour_r:
            req = "Candidate" if is_sour_c else "Reference"
            rejections.append(
                f"NACE MR0175 sour service violation: {req} requires H2S sour service compliance, other is standard service"
            )
            criticality = "BLOCKER"

        # 6. Final Evaluation Assembly
        if criticality == "BLOCKER":
            return GateEvaluation(passed=False, rejection_reasons=rejections, criticality="BLOCKER")
        elif rejections:
            return GateEvaluation(passed=True, rejection_reasons=rejections, criticality="WARNING")
        else:
            return GateEvaluation(passed=True, rejection_reasons=[], criticality="CLEAN")


# Default singleton instance
default_safety_gate = SafetyGate()
