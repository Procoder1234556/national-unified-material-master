import time

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    print("Navigating to index.html...")
    page.goto("http://localhost:5173/gentelella/dist/production/index.html", wait_until="domcontentloaded")
    time.sleep(2)  # Give it 2 seconds instead of waiting for full networkidle
    page.screenshot(path="screenshot_index.png", full_page=True)
    print("Index page title:", page.title())

    print("Navigating to kanban.html...")
    page.goto("http://localhost:5173/gentelella/dist/production/kanban.html", wait_until="domcontentloaded")
    time.sleep(2)
    page.screenshot(path="screenshot_kanban.png", full_page=True)
    print("Kanban page title:", page.title())

    browser.close()
    print("Browser testing completed.")
