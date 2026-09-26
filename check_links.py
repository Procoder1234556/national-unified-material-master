import sys
import urllib.parse

from playwright.sync_api import sync_playwright


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: console_errors.append(str(err)))

        base_url = "http://localhost:5173/gentelella/dist/production/"
        target = f"{base_url}projects.html"

        print(f"Loading {target} ...", flush=True)
        page.goto(target, wait_until="load")

        # Get all links
        hrefs = page.eval_on_selector_all("a[href]", "elements => elements.map(e => e.getAttribute('href'))")

        html_links = set()
        for href in hrefs:
            if not href:
                continue
            if href.startswith("#") or href.startswith("http"):
                continue

            # Resolve relative URLs
            if href.endswith(".html") or href == "/" or href == "index.html":
                # For our check we just want to verify they load correctly
                if href == "/":
                    html_links.add("http://localhost:5173/")
                else:
                    html_links.add(urllib.parse.urljoin(base_url, href))

        print(f"Found {len(html_links)} associated HTML links to check.", flush=True)

        all_ok = True
        for link in html_links:
            console_errors.clear()
            print(f"Checking {link} ...", flush=True)
            response = page.goto(link, wait_until="load")

            if response and not response.ok:
                print(f"  [ERROR] Status {response.status}", flush=True)
                all_ok = False
            else:
                real_errors = [
                    e
                    for e in console_errors
                    if "favicon" not in e.lower() and "failed to load resource" not in e.lower()
                ]
                if real_errors:
                    print(f"  [WARNING] Console errors: {real_errors}", flush=True)
                    # We might not fail on some warnings, but let's note them
                print(f"  [OK] {link}", flush=True)

        browser.close()

        if not all_ok:
            sys.exit(1)


if __name__ == "__main__":
    run()
