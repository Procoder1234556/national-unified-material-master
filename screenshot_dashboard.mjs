import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5173/');
await page.waitForTimeout(3000);

// Click "Launch Enterprise Platform" button
const launchBtn = page.locator('button', { hasText: /Launch Enterprise/i }).first();
await launchBtn.click();
await page.waitForTimeout(2000);

// Screenshot dashboard
await page.screenshot({ path: 'dashboard.png', fullPage: false });
console.log('Dashboard screenshot saved');
await browser.close();
