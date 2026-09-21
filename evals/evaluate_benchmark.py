#!/usr/bin/env python3
"""
NUMM Benchmark Evaluation Verifier
Calculates Confusion Matrix, Precision, Recall, and F1-score against Ground Truth.
Conforms to .agents/skills/eval-engineering
"""

import json
import os
import sys
from typing import Any, Dict

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Add parent directory to path to import POC verification logic
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from verify_poc_and_tests import evaluate_match


def run_evaluation(dataset_path: str) -> Dict[str, Any]:
    with open(dataset_path, "r", encoding="utf-8") as f:
        dataset = json.load(f)

    tp = 0
    fp = 0
    tn = 0
    fn = 0
    safety_violations = 0

    per_class_stats: Dict[str, Dict[str, int]] = {}
    detailed_failures = []

    for item in dataset:
        pair_id = item["id"]
        cls = item["item_class"]
        raw_a = item["item_a"]
        raw_b = item["item_b"]
        expected = item["ground_truth"]
        category = item["category"]

        if cls not in per_class_stats:
            per_class_stats[cls] = {"tp": 0, "fp": 0, "tn": 0, "fn": 0}

        score, gate_passed, explanation = evaluate_match(raw_a, raw_b)

        # Decision threshold: Match requires gate_passed is True AND composite score >= 0.70
        predicted = "MATCH" if (gate_passed and score >= 0.70) else "REJECT"

        if expected == "MATCH":
            if predicted == "MATCH":
                tp += 1
                per_class_stats[cls]["tp"] += 1
            else:
                fn += 1
                per_class_stats[cls]["fn"] += 1
                detailed_failures.append(
                    {
                        "id": pair_id,
                        "expected": expected,
                        "predicted": predicted,
                        "score": score,
                        "gate_passed": gate_passed,
                        "category": category,
                        "item_a": raw_a,
                        "item_b": raw_b,
                        "explanation": explanation,
                    }
                )
        else:  # expected == "REJECT"
            if predicted == "REJECT":
                tn += 1
                per_class_stats[cls]["tn"] += 1
            else:  # Fatal false positive
                fp += 1
                per_class_stats[cls]["fp"] += 1
                if category in ("PRESSURE_CONFLICT", "SIZE_CONFLICT"):
                    safety_violations += 1
                detailed_failures.append(
                    {
                        "id": pair_id,
                        "expected": expected,
                        "predicted": predicted,
                        "score": score,
                        "gate_passed": gate_passed,
                        "category": category,
                        "item_a": raw_a,
                        "item_b": raw_b,
                        "explanation": explanation,
                    }
                )

    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0.0
    specificity = tn / (tn + fp) if (tn + fp) > 0 else 0.0
    accuracy = (tp + tn) / len(dataset) if len(dataset) > 0 else 0.0

    results = {
        "total_evaluated": len(dataset),
        "confusion_matrix": {"true_positives": tp, "false_positives": fp, "true_negatives": tn, "false_negatives": fn},
        "metrics": {
            "accuracy": round(accuracy, 4),
            "precision": round(precision, 4),
            "recall": round(recall, 4),
            "f1_score": round(f1, 4),
            "specificity": round(specificity, 4),
            "safety_critical_violations": safety_violations,
            "safety_compliance_rate": 1.0 if safety_violations == 0 else round(1.0 - (safety_violations / 18.0), 4),
        },
        "per_class": per_class_stats,
        "failures": detailed_failures,
    }

    return results


def print_report(res: Dict[str, Any]):
    cm = res["confusion_matrix"]
    m = res["metrics"]

    print("=" * 80)
    print("      NUMM AI HARMONIZATION BENCHMARK VERIFIER REPORT")
    print("=" * 80)
    print(f"Total Test Pairs Evaluated : {res['total_evaluated']}")
    print(f"Overall Accuracy           : {m['accuracy'] * 100:.2f}%")
    print(f"Harmonization Precision    : {m['precision'] * 100:.2f}%")
    print(f"Harmonization Recall       : {m['recall'] * 100:.2f}%")
    print(f"Harmonization F1-Score     : {m['f1_score'] * 100:.2f}%")
    print(
        f"Physical Safety Compliance : {m['safety_compliance_rate'] * 100:.2f}% (Violations: {m['safety_critical_violations']})"
    )
    print("-" * 80)
    print("\nCONFUSION MATRIX (2x2):")
    print("┌──────────────────────────┬──────────────────────────┬──────────────────────────┐")
    print("│                          │ Predicted MATCH          │ Predicted REJECT         │")
    print("├──────────────────────────┼──────────────────────────┼──────────────────────────┤")
    print(f"│ Actual MATCH (25)        │ TP: {cm['true_positives']:<20} │ FN: {cm['false_negatives']:<20} │")
    print(f"│ Actual REJECT (25)       │ FP: {cm['false_positives']:<20} │ TN: {cm['true_negatives']:<20} │")
    print("└──────────────────────────┴──────────────────────────┴──────────────────────────┘")

    print("\nPER-COMMODITY CLASS BREAKDOWN:")
    print(
        f"{'Item Class':<24} | {'TP':<4} | {'FP':<4} | {'TN':<4} | {'FN':<4} | {'Precision':<10} | {'Recall':<10} | {'F1':<10}"
    )
    print("-" * 80)
    for cls, s in sorted(res["per_class"].items()):
        c_p = s["tp"] / (s["tp"] + s["fp"]) if (s["tp"] + s["fp"]) > 0 else 0.0
        c_r = s["tp"] / (s["tp"] + s["fn"]) if (s["tp"] + s["fn"]) > 0 else 0.0
        c_f1 = 2 * (c_p * c_r) / (c_p + c_r) if (c_p + c_r) > 0 else 0.0
        print(
            f"{cls:<24} | {s['tp']:<4} | {s['fp']:<4} | {s['tn']:<4} | {s['fn']:<4} | {c_p * 100:<9.1f}% | {c_r * 100:<9.1f}% | {c_f1 * 100:<9.1f}%"
        )
    print("-" * 80)

    if res["failures"]:
        print(f"\nDiscrepancies ({len(res['failures'])}):")
        for f in res["failures"]:
            print(
                f"- [{f['id']}] Expected {f['expected']}, got {f['predicted']} (Score: {f['score']}, Gate: {f['gate_passed']})"
            )
    else:
        print("\nCONVERGENCE PROVEN: ZERO DISCREPANCIES ACROSS ALL 50 BENCHMARK PAIRS.")
    print("=" * 80)


if __name__ == "__main__":
    dataset_file = os.path.join(os.path.dirname(__file__), "benchmark_dataset.json")
    results = run_evaluation(dataset_file)
    print_report(results)

    out_file = os.path.join(os.path.dirname(__file__), "benchmark_results.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

    # Hard assert on safety gate
    assert results["metrics"]["safety_critical_violations"] == 0, "FATAL: Physical safety gate violated!"
    assert results["metrics"]["f1_score"] >= 0.90, f"F1 score {results['metrics']['f1_score']} below threshold 0.90"
