const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureSmartX() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });

  const outDir = path.join(__dirname, '..', 'assets', 'screenshots', 'smartx');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const targets = [
    {
      route: '/triage',
      file: 'smartx-01-triage-dashboard.png',
      desc: 'Triage Dashboard'
    },
    {
      route: '/hierarchy',
      file: 'smartx-02-mesh-hierarchy.png',
      desc: 'Mesh Hierarchy'
    },
    {
      route: '/telemetry',
      file: 'smartx-03-telemetry-ingest.png',
      desc: 'Telemetry Ingest'
    },
    {
      route: '/vault',
      file: 'smartx-04-file-vault.png',
      desc: 'File Vault'
    }
  ];

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    console.log(`[${i + 1}/4] Capturing ${t.desc} (${t.file}) from http://localhost:5255${t.route}...`);
    const page = await context.newPage();
    try {
      await page.goto(`http://localhost:5255${t.route}`, { waitUntil: 'networkidle', timeout: 30000 });
      // Allow Blazor WASM components and animations to stabilize
      await page.waitForTimeout(4000);
      await page.screenshot({ path: path.join(outDir, t.file) });
      console.log(`[OK] Saved ${t.file}`);
    } catch (err) {
      console.warn(`[WARN] Standard load failed for ${t.route}: ${err.message}. Retrying with DOM load...`);
      await page.goto(`http://localhost:5255${t.route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(4000);
      await page.screenshot({ path: path.join(outDir, t.file) });
      console.log(`[OK] Saved ${t.file} on retry`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('SmartX capture completed successfully!');
}

captureSmartX().catch(err => {
  console.error('SmartX capture error:', err);
  process.exit(1);
});
