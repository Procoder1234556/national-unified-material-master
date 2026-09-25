import requests

API_KEY = "fc-97b7b6702407420a827da94351939e03"
headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

queries = [
    "Shell MESC material codes examples for valves and pipes",
    "UNSPSC 8-digit codes for industrial valves and flanges",
    "Indian CPSE material catalog data examples",
]

results = []

for q in queries:
    print(f"Searching for: {q}")
    # We will try both firecrawl search endpoint and fallback to duckduckgo if key is invalid
    try:
        response = requests.post("https://api.firecrawl.dev/v1/search", headers=headers, json={"query": q, "limit": 2})
        if response.status_code == 200:
            data = response.json()
            results.append({"query": q, "data": data.get("data", [])})
        else:
            print(f"Firecrawl API error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error: {e}")

with open("d:/oil/research.md", "w") as f:
    f.write("# NUMM Material Data Research\n\n")
    for r in results:
        f.write(f"## {r['query']}\n\n")
        for item in r.get("data", []):
            f.write(f"### {item.get('title', 'No Title')}\n")
            f.write(f"{item.get('description', '')}\n\n")
            f.write(f"URL: {item.get('url', '')}\n\n")
            f.write(f"Content snippet: {item.get('markdown', '')[:500]}...\n\n")
