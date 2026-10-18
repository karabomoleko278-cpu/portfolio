const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureNexis() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const outDir = path.join(__dirname, '..', 'assets', 'screenshots', 'nexis');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('[1/4] Capturing nexis-01-loan-calculator.png...');
  const page1 = await context.newPage();
  await page1.goto('https://nexis-capital-core.web.app/borrower/calculator', { waitUntil: 'networkidle', timeout: 30000 });
  await page1.waitForTimeout(2000);
  await page1.screenshot({ path: path.join(outDir, 'nexis-01-loan-calculator.png') });
  await page1.close();

  console.log('[2/4] Capturing nexis-02-amortization-schedule.png...');
  const page2 = await context.newPage();
  await page2.goto('https://nexis-capital-core.web.app/borrower/calculator', { waitUntil: 'networkidle', timeout: 30000 });
  await page2.waitForTimeout(2000);
  await page2.evaluate(() => window.scrollBy(0, 520));
  await page2.waitForTimeout(1000);
  await page2.screenshot({ path: path.join(outDir, 'nexis-02-amortization-schedule.png') });
  await page2.close();

  console.log('[3/4] Capturing nexis-03-underwriting-rules.png...');
  const page3 = await context.newPage();
  await page3.goto('https://nexis-capital-core.web.app/underwriter/queue', { waitUntil: 'networkidle', timeout: 30000 });
  await page3.waitForTimeout(2000);
  await page3.screenshot({ path: path.join(outDir, 'nexis-03-underwriting-rules.png') });
  await page3.close();

  console.log('[4/4] Capturing nexis-04-firestore-ledger.png...');
  const page4 = await context.newPage();
  await page4.goto('https://nexis-capital-core.web.app/compliance/dashboard', { waitUntil: 'networkidle', timeout: 30000 });
  await page4.waitForTimeout(2000);
  await page4.screenshot({ path: path.join(outDir, 'nexis-04-firestore-ledger.png') });
  await page4.close();

  await browser.close();
  console.log('Nexis capture complete!');
}

captureNexis().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
