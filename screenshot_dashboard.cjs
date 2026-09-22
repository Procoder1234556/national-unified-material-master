const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(3000);

  // Click "Launch Enterprise Platform" button
  await page.click('button:has-text("Launch Enterprise")');
  await page.waitForTimeout(2500);

  // Screenshot dashboard
  await page.screenshot({ path: 'dashboard.png' });
  console.log('Dashboard screenshot saved');
  await browser.close();
})();
