# Evaluation Task Spec: NUMM Catalog Harmonization Verifier (evals/Task.md)

_Task specification conforming to `.agents/skills/eval-engineering`_

---

## 1. Goal & Task Summary

Evaluate the National Unified Material Master (NUMM) AI harmonization and physical safety gating engine against a ground-truth benchmark catalog of authentic and synthetic Central Public Sector Enterprise (CPSE) procurement line items.

### Primary Verifier Objectives:

1. **Physical Safety Invariance (Hard Gate)**: 0.0% False Positives on mismatched pressure ratings (e.g. Class 150 vs Class 300) or mismatched nominal bore pipe sizes.
2. **Catalog Harmonization Precision**: Achieve $\ge 92.0\%$ Precision and $\ge 90.0\%$ Recall across equivalent cross-CPSE commodity descriptions.
3. **Confusion Matrix Generation**: Automatically compute and output a 2x2 confusion matrix (TP, FP, TN, FN) alongside Macro and Weighted F1-scores.
4. **Per-Class Granular Breakdown**: Measure performance across 7 distinct Oil & Gas commodity families:
   - `BALL_VALVE`
   - `GATE_VALVE`
   - `GLOBE_VALVE`
   - `CHECK_VALVE`
   - `WELD_NECK_FLANGE`
   - `SPIRAL_WOUND_GASKET`
   - `LINE_PIPE`

---

## 2. Benchmark Dataset Specification

The ground-truth dataset consists of 50 curated pairwise comparisons categorized into four distinct test classes:

| Test Class                                       | Expected Ground Truth | Description                                                                                | Count |
| ------------------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------ | ----- |
| **Equivalence (Positive Pairs)**                 | `MATCH`               | Identical physical equipment described using conflicting shorthand across different CPSEs. | 25    |
| **Pressure Conflict (Negative Pairs)**           | `REJECT`              | Identical equipment and size but conflicting ASME pressure ratings (e.g., 150# vs 300#).   | 10    |
| **Size Conflict (Negative Pairs)**               | `REJECT`              | Identical equipment and rating but differing nominal bore dimensions (e.g., 2" vs 3").     | 8     |
| **Metallurgy / Class Conflict (Negative Pairs)** | `REJECT`              | Incompatible metallurgy (Carbon Steel vs Stainless Steel 316) or different item classes.   | 7     |

---

## 3. Mathematical Metric Definitions

$$\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}$$

$$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}$$

$$\text{F1-Score} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$

$$\text{Safety Compliance Rate} = 1.0 - \frac{\text{FP}_{\text{safety\_critical}}}{\text{Total Negative Pairs}} \quad (\text{Mandatory target: } 100.0\%)$$

---

## 4. Execution & Verification Command

```powershell
python evals/evaluate_benchmark.py
```

Expected output:

- Zero safety violations (`FP = 0`).
- Macro F1 $\ge 0.90$.
- Detailed Markdown table summarizing TP, FP, TN, FN per commodity group.
