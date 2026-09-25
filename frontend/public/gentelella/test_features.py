import time

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    print("Navigating to form_upload.html...")
    page.goto("http://localhost:5173/gentelella/dist/production/form_upload.html", wait_until="domcontentloaded")
    time.sleep(2)
    page.screenshot(path="screenshot_firecrawl.png", full_page=True)

    print("Navigating to orders.html...")
    page.goto("http://localhost:5173/gentelella/dist/production/orders.html", wait_until="domcontentloaded")
    time.sleep(2)
    page.screenshot(path="screenshot_groq.png", full_page=True)

    browser.close()
