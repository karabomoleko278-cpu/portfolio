const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureHustleHub() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const outDir = path.join(__dirname, '..', 'assets', 'screenshots', 'hustlehub');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Auth & Login screen (hustlehub-01-auth-jwt.png)
  console.log('[1/4] Capturing hustlehub-01-auth-jwt.png...');
  const page1 = await context.newPage();
  await page1.goto('http://localhost:5173/login', { waitUntil: 'networkidle', timeout: 20000 });
  await page1.waitForTimeout(2000);
  await page1.screenshot({ path: path.join(outDir, 'hustlehub-01-auth-jwt.png') });
  await page1.close();

  // 2. Marketplace catalog with compound filtering (hustlehub-02-gig-catalog.png)
  console.log('[2/4] Capturing hustlehub-02-gig-catalog.png...');
  const page2 = await context.newPage();
  await page2.goto('http://localhost:5173/marketplace', { waitUntil: 'networkidle', timeout: 20000 });
  await page2.waitForTimeout(2500);
  await page2.screenshot({ path: path.join(outDir, 'hustlehub-02-gig-catalog.png') });
  await page2.close();

  // 3. Client Bookings State-Machine (hustlehub-03-booking-pipeline.png)
  console.log('[3/4] Capturing hustlehub-03-booking-pipeline.png...');
  const page3 = await context.newPage();
  await page3.goto('http://localhost:5173/login', { waitUntil: 'networkidle', timeout: 20000 });
  await page3.fill('input[type="email"]', 's.jenkins@enterprise.acme.com');
  await page3.fill('input[type="password"]', 'ClientPass123!');
  await page3.click('button[type="submit"]');
  await page3.waitForTimeout(3000);
  // Navigate to client bookings if not auto-redirected
  if (!page3.url().includes('/dashboard/client')) {
    await page3.goto('http://localhost:5173/dashboard/client', { waitUntil: 'networkidle', timeout: 20000 });
  }
  await page3.waitForTimeout(2500);
  await page3.screenshot({ path: path.join(outDir, 'hustlehub-03-booking-pipeline.png') });
  await page3.close();

  // 4. Freelancer Financial Ledger & Transaction Audit (hustlehub-04-transaction-audit.png)
  console.log('[4/4] Capturing hustlehub-04-transaction-audit.png...');
  const page4 = await context.newPage();
  await page4.goto('http://localhost:5173/login', { waitUntil: 'networkidle', timeout: 20000 });
  await page4.fill('input[type="email"]', 'devin.vance@enterprise.acme.com');
  await page4.fill('input[type="password"]', 'FreelancerPass123!');
  await page4.click('button[type="submit"]');
  await page4.waitForTimeout(3000);
  if (!page4.url().includes('/dashboard/freelancer')) {
    await page4.goto('http://localhost:5173/dashboard/freelancer', { waitUntil: 'networkidle', timeout: 20000 });
  }
  await page4.waitForTimeout(2500);
  await page4.screenshot({ path: path.join(outDir, 'hustlehub-04-transaction-audit.png') });
  await page4.close();

  await browser.close();
  console.log('HustleHub capture completed successfully!');
}

captureHustleHub().catch(err => {
  console.error('HustleHub capture error:', err);
  process.exit(1);
});
