import asyncio

from playwright.async_api import async_playwright


async def capture_all_views():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        await page.goto("http://localhost:5173", wait_until="networkidle")
        # Enter dashboard
        enter_btn = page.locator("button:has-text('Enter Triage Cockpit')").first
        await enter_btn.click()
        await page.wait_for_timeout(1000)

        # 1. Overview
        await page.screenshot(path="d:/oil/view_overview.png", full_page=False)

        # 2. Steward Queue (HITL Review)
        await page.locator("div:has-text('Steward Queue')").last.click()
        await page.wait_for_timeout(800)
        await page.screenshot(path="d:/oil/view_steward_hitl.png", full_page=False)

        # 3. Search Before Buy (Minted ONMC code)
        await page.locator("div:has-text('Search Before Buy')").last.click()
        await page.wait_for_timeout(800)
        await page.screenshot(path="d:/oil/view_search_onmc.png", full_page=False)

        # 4. Surplus (Inter-CPSE)
        await page.locator("div:has-text('Surplus')").last.click()
        await page.wait_for_timeout(800)
        await page.screenshot(path="d:/oil/view_surplus_inter_cpse.png", full_page=False)

        # 5. Security (CVC Cryptographic Audit Trail)
        await page.locator("div:has-text('Security Vault')").last.click()
        await page.wait_for_timeout(800)
        await page.screenshot(path="d:/oil/view_security_audit.png", full_page=False)

        await browser.close()
        print("Screenshots captured successfully.")


if __name__ == "__main__":
    asyncio.run(capture_all_views())
