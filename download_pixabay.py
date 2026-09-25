import os
import urllib.request

out_dir = r"d:\oil\frontend\public\images"
os.makedirs(out_dir, exist_ok=True)

# Curated direct Pixabay CDN images for Oil & Gas Petroleum Master Data project
images = {
    # 1. Main Hero background: Vast illuminated oil refinery cracking plant at dusk
    "hero-refinery.jpg": "https://cdn.pixabay.com/photo/2018/08/17/18/36/refinery-3613526_1280.jpg",
    # 2. Ingestion / Multi-CPSE parsing: Refinery process towers and distillation infrastructure
    "refinery-plant.jpg": "https://cdn.pixabay.com/photo/2018/09/30/11/38/oil-refinery-3713276_1280.jpg",
    # 3. Rule Gate / Zero Mismatches: Heavy high-pressure pipeline flanged valve manifold
    "pipeline-valves.jpg": "https://cdn.pixabay.com/photo/2018/05/13/14/34/pipeline-3396640_1280.jpg",
    # 4. Lineage / Cross-walk mapping: Seamless high pressure pipeline tubes and flanges
    "industrial-piping.jpg": "https://cdn.pixabay.com/photo/2020/03/30/20/15/pipe-4985362_1280.jpg",
    # 5. Surplus Stock Pooling: Refinery heavy pumps, motors and fluid handling machinery
    "refinery-pumps.jpg": "https://cdn.pixabay.com/photo/2014/11/02/14/21/refinery-514010_1280.jpg",
    # 6. Sovereign Cloud / NIC MeghRaj: High-reliability secure server rack / data infrastructure
    "datacenter-cloud.jpg": "https://cdn.pixabay.com/photo/2017/03/23/09/34/artificial-intelligence-2167835_1280.jpg",
    # 7. GeM Sync & CVC Compliance: Certified pipeline engineers inspecting welded joints
    "pipeline-inspection.jpg": "https://cdn.pixabay.com/photo/2017/07/23/06/12/oil-workers-2530672_1280.jpg",
    # 8. IOCL Success Story: Modern refinery catalytic cracker with flare tower
    "iocl-refinery.jpg": "https://cdn.pixabay.com/photo/2018/05/14/14/01/refinery-3400043_1280.jpg",
    # 9. ONGC Success Story: Massive offshore oil & gas production platform
    "ongc-platform.jpg": "https://cdn.pixabay.com/photo/2020/05/28/17/50/oil-rig-5232047_1280.jpg",
    # 10. Secondary Hero: Deepwater hydrocarbon marine port and crude manifold at dusk
    "oil-port-sunset.jpg": "https://cdn.pixabay.com/photo/2016/10/31/14/25/oil-port-1785693_1280.jpg",
    # 11. Material Master MRO: Heavy industrial precision machining and metal parts
    "mro-machinery.jpg": "https://cdn.pixabay.com/photo/2022/05/26/10/51/industry-7222521_1280.jpg",
}

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

print(f"Downloading {len(images)} Pixabay images to {out_dir}...")

for filename, url in images.items():
    filepath = os.path.join(out_dir, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            with open(filepath, "wb") as f:
                f.write(data)
            print(f"  [OK] {filename} ({len(data):,} bytes)")
    except Exception as e:
        print(f"  [FAIL] {filename} failed: {e}")

print("Download complete.")
