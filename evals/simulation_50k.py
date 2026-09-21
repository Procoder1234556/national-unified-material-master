#!/usr/bin/env python3
"""
NUMM Enterprise Pilot Simulation Runner: 50,000 Real-World CPSE Catalog Items
Evaluates ingestion throughput, indexing efficiency, and sub-50ms query latency under load.
SIH 26099 - National Unified Material Master (NUMM) Framework
"""

import json
import os
import sys
import time

# Ensure workspace root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app.services.simulation_service import default_simulation_service


def run_50k_simulation():
    print("=" * 80)
    print("      NUMM ENTERPRISE PILOT SIMULATION: 50,000 CPSE CATALOG ROWS")
    print("=" * 80)
    print("Generating 50,000 realistic CPSE inventory records across 10 PSUs...")
    t0 = time.time()
    gen_stats = default_simulation_service.generate_50k_catalog()
    time.time() - t0

    print(f"-> Generated {gen_stats['total_items']:,} items in {gen_stats['generation_time_seconds']}s")
    print(f"-> Throughput: {gen_stats['throughput_items_per_second']:,} items/sec")
    print(f"-> Parametric index buckets created: {gen_stats['distinct_index_buckets']}")
    print(f"-> Participating CPSEs: {gen_stats['participating_orgs']}")
    print("-" * 80)

    print("Executing 300 diverse multi-parameter search queries to measure latency...")
    bench_results = default_simulation_service.benchmark_search_queries(num_queries=300)

    print(f"-> Queries Executed       : {bench_results['queries_executed']}")
    print(f"-> Catalog Size           : {bench_results['catalog_size']:,} rows")
    print(f"-> Median (p50) Latency   : {bench_results['p50_latency_ms']:.3f} ms")
    print(f"-> 90th percentile (p90)  : {bench_results['p90_latency_ms']:.3f} ms")
    print(f"-> 95th percentile (p95)  : {bench_results['p95_latency_ms']:.3f} ms")
    print(f"-> 99th percentile (p99)  : {bench_results['p99_latency_ms']:.3f} ms")
    print(f"-> Query Throughput (QPS) : {bench_results['qps']} queries/sec")
    print("-" * 80)

    sub_50ms = bench_results["sub_50ms_verified"]
    status_label = "PROVEN (PASS)" if sub_50ms else "FAILED"
    print(f"VERIFICATION GATE: Sub-50ms query latency under load: {status_label}")
    print(f"(Observed p95 latency: {bench_results['p95_latency_ms']:.3f} ms vs target < 50.0 ms)")
    print("=" * 80)

    report = {
        "framework": "National Unified Material Master (NUMM)",
        "standard": "One Nation, One Material Code (ONMC)",
        "version": "2.2.0",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "generation_metrics": gen_stats,
        "benchmark_metrics": bench_results,
    }

    report_path = os.path.join(os.path.dirname(__file__), "simulation_50k_report.json")
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print(f"Simulation report written to {report_path}")
    assert sub_50ms, f"FATAL: Query latency {bench_results['p95_latency_ms']}ms exceeded 50ms ceiling!"
    return report


if __name__ == "__main__":
    run_50k_simulation()
