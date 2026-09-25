from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    print("Navigating to index.html...")
    page.goto("http://localhost:5173/gentelella/dist/production/index.html")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="screenshot_index.png", full_page=True)
    print("Index page title:", page.title())
    print("Main title:", page.locator(".page-title").first.text_content())

    print("Clicking Stewardship Queue link...")
    # Click the stewardship link
    page.click('a[href="kanban.html"]')
    page.wait_for_load_state("networkidle")
    page.screenshot(path="screenshot_kanban.png", full_page=True)
    print("Kanban page title:", page.title())
    print("Main title:", page.locator(".page-title").first.text_content())

    print("Clicking CVC Audit Chain link...")
    # Open sidebar menu if it closed, or just navigate to projects.html directly if not visible
    page.goto("http://localhost:5173/gentelella/dist/production/projects.html")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="screenshot_projects.png", full_page=True)
    print("Projects page title:", page.title())
    print("Main title:", page.locator(".page-title").first.text_content())

    browser.close()
    print("Browser testing completed.")
