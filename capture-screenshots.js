/**
 * capture-screenshots.js
 * Headless high-DPI capture suite for portfolio assets.
 * Prerequisites: npm install playwright
 * Run: node capture-screenshots.js
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'assets', 'screenshots');

const TARGETS = [
  {
    id: 'nexis-loan-calc',
    url: 'https://nexis-capital-core.web.app/borrower/calculator',
    fallbackUrl: 'https://nexis-capital-core.web.app/',
    viewport: { width: 1440, height: 900 },
    waitForSelector: 'body',
    delayMs: 3000,
    action: async (page) => {
      // Look for slider inputs and ensure dynamic calculation renders
      const slider = await page.$('input[type="range"]');
      if (slider) {
        await slider.fill('35000');
        await page.waitForTimeout(1000);
      }
    }
  },
  {
    id: 'nexis-underwriting',
    url: 'https://nexis-capital-core.web.app/underwriter/queue',
    fallbackUrl: 'https://nexis-capital-core.web.app/',
    viewport: { width: 1440, height: 900 },
    waitForSelector: 'body',
    delayMs: 2500,
    action: async (page) => {
      await page.waitForTimeout(1000);
    }
  }
];

const LOCAL_ASSETS_MAP = [
  {
    source: 'D:/PROG7312-Part1/src/SmartX.Client/wwwroot/images/stitch/screen.png',
    fallbackSource: 'D:/Summative project/workspaces/summative_project/assets/SCREEN_2_LIBRARY_FEEDBACK.png',
    target: 'smartx-mesh-triage.png'
  },
  {
    source: 'C:/Users/Dineo Lebese/.gemini/antigravity/brain/28229ca7-b3a9-4823-b30c-3cd1dc96ccaa/.user_uploaded/media_1791813498667_ee598df9.png',
    fallbackSource: 'D:/Summative project/workspaces/summative_project/assets/SCREEN_4_COMPONENTS_CONSISTENCY.png',
    target: 'hustlehub-api-contract.png'
  },
  {
    source: 'D:/Summative project/workspaces/summative_project/assets/SCREEN_1_HOME_VISIBILITY.png',
    target: 'ecoloop-room-sync.png'
  },
  {
    source: 'D:/Summative project/workspaces/summative_project/assets/SCREEN_3_ACCOUNT_CONSTRAINTS.png',
    target: 'vaultquest-ledger.png'
  }
];

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`[+] Created directory: ${OUTPUT_DIR}`);
  }

  // 1. Process Local / Mapped Assets First
  console.log('[*] Mapping local architectural component screenshots...');
  for (const asset of LOCAL_ASSETS_MAP) {
    const dest = path.join(OUTPUT_DIR, asset.target);
    let srcToCopy = null;
    if (fs.existsSync(asset.source)) {
      srcToCopy = asset.source;
    } else if (asset.fallbackSource && fs.existsSync(asset.fallbackSource)) {
      srcToCopy = asset.fallbackSource;
    }

    if (srcToCopy) {
      fs.copyFileSync(srcToCopy, dest);
      const stat = fs.statSync(dest);
      console.log(`[✓] Mapped ${asset.target} (${(stat.size / 1024).toFixed(1)} KB) from ${srcToCopy}`);
    } else {
      console.warn(`[!] Source file not found for ${asset.target}`);
    }
  }

  // 2. Playwright Live Browser Capture
  console.log('[*] Launching headless browser for live cloud targets...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 2, // 2x Retina resolution
  });

  for (const target of TARGETS) {
    console.log(`[*] Capturing: ${target.id} from ${target.url}...`);
    try {
      const page = await context.newPage();
      await page.setViewportSize(target.viewport);
      try {
        await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30000 });
      } catch (e) {
        if (target.fallbackUrl) {
          console.log(`[!] Primary url timed out, trying fallback: ${target.fallbackUrl}`);
          await page.goto(target.fallbackUrl, { waitUntil: 'networkidle', timeout: 30000 });
        } else {
          throw e;
        }
      }

      if (target.waitForSelector) {
        await page.waitForSelector(target.waitForSelector, { timeout: 10000 });
      }

      if (target.action) {
        await target.action(page);
      }

      if (target.delayMs) {
        await page.waitForTimeout(target.delayMs);
      }

      const filePath = path.join(OUTPUT_DIR, `${target.id}.png`);
      await page.screenshot({ path: filePath, fullPage: false });

      const stat = fs.statSync(filePath);
      console.log(`[✓] Saved: ${filePath} (${(stat.size / 1024).toFixed(1)} KB)`);
      await page.close();
    } catch (err) {
      console.error(`[!] Failed capturing ${target.id}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('[✓] Screenshot capture sequence complete.');
}

run().catch((err) => {
  console.error('[!] Fatal error in capture script:', err);
  process.exit(1);
});
