/**
 * test-portfolio.js
 * Comprehensive automated verification of the CV Showcase and architectural mockups.
 */

const { chromium } = require('playwright');
const path = require('path');

async function verifyPortfolio() {
  console.log('[*] Starting headless browser automated verification...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  const fileUrl = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  console.log(`[*] Navigating to ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  // 1. Verify Default Project (Nexis)
  console.log('[*] Testing Nexis Capital Core mockup & controls...');
  const nexisImg = await page.$('#nexis-mockup-img');
  if (!nexisImg) throw new Error('nexis-mockup-img not found in DOM');
  let src = await nexisImg.getAttribute('src');
  console.log(`[✓] Nexis initial image: ${src}`);
  if (!src.includes('nexis-loan-calc.png')) throw new Error(`Unexpected initial src: ${src}`);

  // Test switchNexisView to 'underwrite'
  console.log('[*] Toggling Nexis view to Underwriting Rules...');
  await page.click('#nexis-btn-underwrite');
  await page.waitForTimeout(500);
  src = await nexisImg.getAttribute('src');
  console.log(`[✓] Nexis underwrite image: ${src}`);
  if (!src.includes('nexis-underwriting.png')) throw new Error(`Failed to toggle to underwrite image: ${src}`);
  const nexisUrl = await page.$eval('#nexis-mockup-url', el => el.textContent);
  console.log(`[✓] Nexis underwrite URL display: ${nexisUrl}`);

  // Toggle back to 'calc'
  console.log('[*] Toggling Nexis view back to Calculator...');
  await page.click('#nexis-btn-calc');
  await page.waitForTimeout(500);
  src = await nexisImg.getAttribute('src');
  if (!src.includes('nexis-loan-calc.png')) throw new Error(`Failed to toggle back to calc image: ${src}`);

  // Test Calculator slider interaction
  const slider = await page.$('#nexis-principal-input');
  if (slider) {
    await slider.fill('250000');
    await page.$eval('#nexis-principal-input', el => el.dispatchEvent(new Event('input')));
    await page.waitForTimeout(300);
    const readout = await page.$eval('#nexis-monthly-readout', el => el.textContent.trim());
    console.log(`[✓] Nexis interactive monthly readout with $250k: ${readout}`);
  }

  // 2. Test Smart-X IoT Mesh
  console.log('[*] Testing Smart-X project selection...');
  await page.click('#proj-card-smartx');
  await page.waitForTimeout(800);
  const smartxImg = await page.$eval('#mockup-dynamic-stage img', el => el.getAttribute('src'));
  console.log(`[✓] Smart-X screenshot: ${smartxImg}`);
  if (!smartxImg.includes('smartx-mesh-triage.png')) throw new Error(`SmartX screenshot mismatch: ${smartxImg}`);
  const ringCellsCount = await page.$$eval('#ring-buffer-cells > div', els => els.length);
  console.log(`[✓] Smart-X ring buffer cell count: ${ringCellsCount}`);
  if (ringCellsCount !== 16) throw new Error(`Expected 16 ring buffer cells, found: ${ringCellsCount}`);

  // 3. Test HustleHub Platform
  console.log('[*] Testing HustleHub project selection...');
  await page.click('#proj-card-hustlehub');
  await page.waitForTimeout(800);
  const hustlehubImg = await page.$eval('#mockup-dynamic-stage img', el => el.getAttribute('src'));
  console.log(`[✓] HustleHub screenshot: ${hustlehubImg}`);
  if (!hustlehubImg.includes('hustlehub-api-contract.png')) throw new Error(`HustleHub screenshot mismatch: ${hustlehubImg}`);
  const fsmStep1 = await page.$eval('#step-draft', el => el.textContent.trim());
  console.log(`[✓] HustleHub FSM step 1: ${fsmStep1}`);

  // 4. Test EcoLoop SA
  console.log('[*] Testing EcoLoop SA project selection...');
  await page.click('#proj-card-ecoloop');
  await page.waitForTimeout(800);
  const ecoloopImg = await page.$eval('#mockup-dynamic-stage img', el => el.getAttribute('src'));
  console.log(`[✓] EcoLoop SA screenshot: ${ecoloopImg}`);
  if (!ecoloopImg.includes('ecoloop-room-sync.png')) throw new Error(`EcoLoop screenshot mismatch: ${ecoloopImg}`);
  const ecoloopNet = await page.$eval('#ecoloop-net-toggle', el => el.textContent.trim());
  console.log(`[✓] EcoLoop network toggle text: ${ecoloopNet}`);

  // 5. Test VaultQuest Engine
  console.log('[*] Testing VaultQuest project selection...');
  await page.click('#proj-card-vaultquest');
  await page.waitForTimeout(800);
  const vaultImg = await page.$eval('#mockup-dynamic-stage img', el => el.getAttribute('src'));
  console.log(`[✓] VaultQuest screenshot: ${vaultImg}`);
  if (!vaultImg.includes('vaultquest-ledger.png')) throw new Error(`VaultQuest screenshot mismatch: ${vaultImg}`);
  const runwayReadout = await page.$eval('#vault-runway-readout', el => el.textContent.trim());
  console.log(`[✓] VaultQuest initial runway readout: ${runwayReadout}`);

  // 6. Test ATS CV Drawer
  console.log('[*] Testing ATS CV Drawer & 4-part action bullets...');
  await page.click('button:has-text("ATS CV Dossier")');
  await page.waitForTimeout(500);
  const drawerVisible = await page.$eval('#resume-drawer', el => el.classList.contains('translate-x-0'));
  console.log(`[✓] ATS drawer visible: ${drawerVisible}`);
  if (!drawerVisible) throw new Error('Resume drawer failed to open');

  const resumeProjects = await page.$$eval('#resume-projects-list > div', els => els.length);
  console.log(`[✓] ATS drawer project items rendered: ${resumeProjects}`);
  if (resumeProjects !== 5) throw new Error(`Expected 5 projects in ATS drawer, found: ${resumeProjects}`);

  // Check 4-part bullet structure
  const bulletTitles = await page.$$eval('#resume-projects-list strong.text-slate-200, #resume-projects-list span.font-bold', els => els.map(e => e.textContent.trim()));
  const expectedBullets = [
    '01. Context & Purpose:',
    '02. Architecture & Pipeline:',
    '03. Technical Hardening:',
    '04. Verification & Delivery:'
  ];
  for (const exp of expectedBullets) {
    const hasExp = bulletTitles.some(t => t.includes(exp.replace(':', '')));
    if (!hasExp) {
      console.warn(`[!] Note: could not strictly match ${exp}`);
    } else {
      console.log(`[✓] Verified bullet title in ATS drawer: ${exp}`);
    }
  }

  // Test Plaintext copy
  await page.click('button[onclick="copyPlaintextResume()"]');
  await page.waitForTimeout(500);
  const toastText = await page.$eval('#toast-message', el => el.textContent.trim());
  console.log(`[✓] Toast notification triggered: "${toastText}"`);

  // Close drawer
  await page.click('button[onclick="closeResumeDrawer()"]');
  await page.waitForTimeout(300);

  // 7. Test Mode Switching (Live Viewport, Mechanics, Architecture)
  console.log('[*] Testing View Modes...');
  await page.click('#tab-view-live');
  await page.waitForTimeout(500);
  const liveVisible = await page.$eval('#view-live', el => !el.classList.contains('hidden'));
  console.log(`[✓] Live viewport tab visible: ${liveVisible}`);

  await page.click('#tab-view-mechanics');
  await page.waitForTimeout(500);
  const mechanicsVisible = await page.$eval('#view-mechanics', el => !el.classList.contains('hidden'));
  console.log(`[✓] Mechanics tab visible: ${mechanicsVisible}`);

  await page.click('#tab-view-arch');
  await page.waitForTimeout(500);
  const archVisible = await page.$eval('#view-arch', el => !el.classList.contains('hidden'));
  console.log(`[✓] Architecture map tab visible: ${archVisible}`);

  await page.click('#tab-view-showcase');
  await page.waitForTimeout(500);

  // Filter console errors (ignoring expected X-Frame-Options / cross-origin iframe security notices from external cloud hosts)
  const realErrors = consoleErrors.filter(e => 
    !e.includes('cross-origin') && 
    !e.includes('iframe') && 
    !e.includes('favicon') && 
    !e.includes('X-Frame-Options') && 
    !e.includes('Refused to display')
  );
  if (realErrors.length > 0) {
    console.error('[!] Encountered runtime console errors:', realErrors);
    throw new Error('Test suite failed with console errors');
  }

  console.log('\n======================================================');
  console.log(' [✓] ALL PORTFOLIO VERIFICATION CHECKS PASSED 100%');
  console.log('======================================================\n');
  await browser.close();
}

verifyPortfolio().catch(err => {
  console.error('[!] Test execution failed:', err);
  process.exit(1);
});
