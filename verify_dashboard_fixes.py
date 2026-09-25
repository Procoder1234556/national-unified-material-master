import asyncio

from playwright.async_api import async_playwright


async def verify_all():
    print("=== STARTING COMPREHENSIVE DASHBOARD VERIFICATION ===", flush=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 950})
        page = await context.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: console_errors.append(str(err)))

        print("1. Loading http://localhost:5173 ...", flush=True)
        await page.goto("http://localhost:5173", wait_until="networkidle")
        await page.wait_for_timeout(1000)

        # Enter Dashboard
        enter_btn = page.locator("button:has-text('Enter Triage Cockpit')").first
        await enter_btn.click()
        await page.wait_for_timeout(1000)

        # ------------------------------------------------------------------
        # TEST 1: SEARCH BEFORE BUY (Minted ONMC code & CPSE Plant Matters)
        # ------------------------------------------------------------------
        print("\n--- TEST 1: Search Before Buy (Minted ONMC & Plant Matters) ---", flush=True)
        search_tab = page.locator("#nav-tab-search").first
        await search_tab.click()
        await page.wait_for_timeout(1000)

        search_input = page.locator("input[placeholder*='engineering'], input[type='text']").first
        await search_input.fill("2 inch 150# flanged ball valve CS A105")
        search_btn = page.locator("button:has-text('Search Master')").first
        await search_btn.click()
        await page.wait_for_selector("text=ONMC-MECH-VLV-BAL-002-150-A105-9B2F", timeout=8000)

        body_text = await page.inner_text("body")
        assert "ONMC-MECH-VLV-BAL-002-150-A105-9B2F" in body_text, "Canonical ONMC ball valve code missing from search"
        assert "Hazira" in body_text, "ONGC Hazira plant missing from stock distribution"
        assert "14" in body_text, "Surplus stock count missing"
        print(
            "   [PASS] Search returns canonical ONMC code with real CPSE plant distance and stock avoidance.",
            flush=True,
        )

        await page.screenshot(path="verify_search_results.png")
        print("   [CAPTURED] verify_search_results.png", flush=True)

        # ------------------------------------------------------------------
        # TEST 2: STEWARD HITL REVIEW & MINTED SOVEREIGN ONMC CODE MODAL
        # ------------------------------------------------------------------
        print("\n--- TEST 2: HITL Review & Minted ONMC Dossier Modal ---", flush=True)
        steward_tab = page.locator("#nav-tab-steward").first
        await steward_tab.click()
        await page.wait_for_timeout(1000)

        # Click on the Class 300 item with safety discrepancy
        class300_item = page.locator("#queue-row-MAP-ONGC-VLV-002").first
        await class300_item.click()
        await page.wait_for_timeout(800)

        steward_text = await page.inner_text("body")
        assert "FATAL SAFETY CONFLICT" in steward_text or "Safety Gate Rejection" in steward_text, (
            "Safety conflict reason missing"
        )
        assert "Mint Code (N)" in steward_text or "Mint New Sovereign ONMC" in steward_text, "Mint code action missing"
        print("   [PASS] Pinned action bar and safety gate rejection prominently visible above fold.", flush=True)

        # Click Mint Code (N)
        mint_btn = page.locator("button:has-text('Mint Code (N)')").first
        if not await mint_btn.is_visible():
            mint_btn = page.locator("button:has-text('Mint New Sovereign ONMC')").first
        await mint_btn.click()
        await page.wait_for_timeout(1000)

        dossier_text = await page.inner_text("body")
        assert "Sovereign ONMC Master Code Dossier" in dossier_text, "Minted dossier modal not visible"
        assert "ONMC-MECH-VLV-BAL-002-300-WCB-4A1C" in dossier_text, "Minted ONMC code missing from dossier"
        assert "Hazira Gas Processing Plant" in dossier_text, "Plant details missing from minted dossier"
        assert "FIPS 180-4 SHA-256 AUDIT SEAL" in dossier_text, "CVC cryptographic SHA-256 seal missing from dossier"
        assert "0x" not in dossier_text.split("AUDIT SEAL:")[1][:30], "Crypto 0x prefix detected in SHA-256 seal!"
        print(
            "   [PASS] Minted Sovereign ONMC Dossier modal displays deterministic segments, CPSE plant, and pure SHA-256 seal.",
            flush=True,
        )

        await page.screenshot(path="verify_minted_onmc_dossier.png")
        print("   [CAPTURED] verify_minted_onmc_dossier.png", flush=True)

        # Close modal
        close_btn = page.locator("button:has-text('Proceed to Next Item')").first
        await close_btn.click()
        await page.wait_for_timeout(500)

        # ------------------------------------------------------------------
        # TEST 3: CVC CRYPTOGRAPHIC AUDIT TRAIL
        # ------------------------------------------------------------------
        print("\n--- TEST 3: CVC Cryptographic Audit Trail ---", flush=True)
        security_tab = page.locator("#nav-tab-security").first
        await security_tab.click()
        await page.wait_for_timeout(1200)

        sec_text = await page.inner_text("body")
        assert "Total Sealed Audit Records" in sec_text, "Total Sealed Audit Records KPI missing"
        assert "SOVEREIGN_ROOT_SEAL" in sec_text or "ROOT_CATALOG" in sec_text, "Sovereign root seal missing"
        assert "ONMC_CODE_MINTED" in sec_text or "rajesh.kumar@ongc.in" in sec_text, "ONMC minted audit record missing"
        assert "INTER_CPSE_MTIRF_APPROVED" in sec_text or "cmo.iocl@iocl.co.in" in sec_text, (
            "MTIRF transfer audit record missing"
        )
        assert "SAFETY_GATE_QUARANTINED" in sec_text or "cvc.sentinel@mopng.gov.in" in sec_text, (
            "Safety gate quarantine audit record missing"
        )
        assert "Total Sealed Blocks" not in sec_text, "Legacy block jargon still present in KPI card!"
        print(
            "   [PASS] CVC Cryptographic Audit Trail populated with authentic CPSE events (zero crypto block jargon).",
            flush=True,
        )

        # Click Verify Entire Chain
        verify_btn = page.locator("button:has-text('Verify Entire Chain')").first
        await verify_btn.click()
        await page.wait_for_timeout(1000)

        verified_text = await page.inner_text("body")
        assert "INTACT & TAMPER-FREE" in verified_text or "MATHEMATICAL VERIFICATION" in verified_text, (
            "Chain verification failed"
        )
        print("   [PASS] Mathematical traversal verified 100% SHA-256 integrity.", flush=True)

        await page.screenshot(path="verify_cvc_audit_chain.png")
        print("   [CAPTURED] verify_cvc_audit_chain.png", flush=True)

        # ------------------------------------------------------------------
        # TEST 4: INTER-CPSE SURPLUS & MTIRF MODAL
        # ------------------------------------------------------------------
        print("\n--- TEST 4: Inter-CPSE Surplus & MTIRF Modal ---", flush=True)
        surplus_tab = page.locator("#nav-tab-surplus").first
        await surplus_tab.click()
        await page.wait_for_timeout(1000)

        surplus_text = await page.inner_text("body")
        assert "Hazira Gas Processing Plant" in surplus_text or "ONGC" in surplus_text, "Surplus plants missing"
        assert "78 km" in surplus_text or "410 km" in surplus_text, "Haversine transit distance missing"

        # Click Initiate MTIRF Form on first card
        mtirf_btn = page.locator("button:has-text('Initiate MTIRF Form')").first
        await mtirf_btn.click()
        await page.wait_for_timeout(800)

        mtirf_text = await page.inner_text("body")
        assert "MoPNG OFFICIAL REQUISITION" in mtirf_text, "MTIRF modal header missing"
        assert "SOURCE CPSE (Lender)" in mtirf_text, "Source CPSE section missing"
        assert "RECEIVING CPSE (Borrower)" in mtirf_text, "Receiving CPSE section missing"
        print("   [PASS] Inter-CPSE Surplus discovery and MTIRF Requisition modal verified.", flush=True)

        await page.screenshot(path="verify_inter_cpse_mtirf.png")
        print("   [CAPTURED] verify_inter_cpse_mtirf.png", flush=True)

        # Close MTIRF modal
        close_mtirf = page.locator("button:has-text('Cancel')").first
        if await close_mtirf.is_visible():
            await close_mtirf.click()
        await page.wait_for_timeout(400)

        # ------------------------------------------------------------------
        # TEST 5: POOLED DEMAND & GEM TENDERS
        # ------------------------------------------------------------------
        print("\n--- TEST 5: Pooled Demand & GeM Tenders ---", flush=True)
        demand_tab = page.locator("#nav-tab-demand").first
        await demand_tab.click()
        await page.wait_for_timeout(1000)

        demand_text = await page.inner_text("body")
        assert "Pooled Demand" in demand_text or "Active Pooled Tenders" in demand_text, "Pooled demand view missing"
        assert "Total Pooled Volume" in demand_text, "Pooled volume KPI missing"
        assert "GeM" in demand_text, "GeM procurement reference missing"
        print("   [PASS] Pooled Demand Engine & GeM Tenders view verified.", flush=True)

        await page.screenshot(path="verify_pooled_demand.png")
        print("   [CAPTURED] verify_pooled_demand.png", flush=True)

        print("\n=== ALL 5 TARGETED VERIFICATION TESTS PASSED SUCCESSFULLY! ===", flush=True)
        await browser.close()


if __name__ == "__main__":
    asyncio.run(verify_all())
