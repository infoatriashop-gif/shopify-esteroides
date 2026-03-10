/**
 * browser-debug/capture.mjs
 * Playwright browser capture script for visual debugging.
 * Usage: node capture.mjs --url <url> [options]
 */

import { mkdir } from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Load playwright from project root's node_modules
const projectRoot = resolve(__dirname, '../../../..');
const require = createRequire(join(projectRoot, 'package.json'));
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('Playwright not found. Installing...');
  console.error('Run: pnpm add -D playwright && npx playwright install chromium');
  process.exit(1);
}

// ─── Parse args ───────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};
const hasFlag = (flag) => args.includes(flag);

const BASE_URL = 'http://localhost:2000';
const url = getArg('--url') || (args[0] && !args[0].startsWith('--') ? args[0] : BASE_URL);
const waitMs = parseInt(getArg('--wait') || '2000');
const clickSelector = getArg('--click');
const doLogin = hasFlag('--login');
const fullPage = hasFlag('--full');
const isMobile = hasFlag('--mobile');
const outputDir = resolve(projectRoot, 'debug-screenshots');

// ─── Setup output dir ──────────────────────────────────────────
await mkdir(outputDir, { recursive: true });

const timestamp = Date.now();
const screenshotPath = join(outputDir, `capture-${timestamp}.png`);

// ─── Browser launch ────────────────────────────────────────────
const browser = await chromium.launch({ headless: true });

const viewport = isMobile
  ? { width: 390, height: 844 }
  : { width: 1280, height: 800 };

const context = await browser.newContext({
  viewport,
  userAgent: isMobile
    ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
    : undefined,
});

const page = await context.newPage();

// ─── Capture collectors ────────────────────────────────────────
const consoleErrors = [];
const networkErrors = [];
const httpErrors = [];

page.on('console', (msg) => {
  if (msg.type() === 'error') {
    consoleErrors.push({ text: msg.text(), location: msg.location() });
  }
});

page.on('pageerror', (err) => {
  consoleErrors.push({ text: err.message, stack: err.stack });
});

page.on('requestfailed', (req) => {
  networkErrors.push({ url: req.url(), method: req.method(), failure: req.failure()?.errorText });
});

page.on('response', (res) => {
  if (res.status() >= 400) {
    httpErrors.push({ url: res.url(), method: res.request().method(), status: res.status() });
  }
});

// ─── Login flow ────────────────────────────────────────────────
if (doLogin) {
  console.error('[debug] Performing login...');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
  await page.fill('input[type="email"]', 'admin@vireonlabs.online');
  await page.fill('input[type="password"]', 'Admin1234');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/admin**', { timeout: 8000 }).catch(() =>
    console.error('[debug] Login redirect timeout')
  );
}

// ─── Navigate ─────────────────────────────────────────────────
console.error(`[debug] Navigating to: ${url}`);
await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 }).catch((e) => {
  console.error(`[debug] Navigation timeout: ${e.message}`);
});

// ─── Optional click ───────────────────────────────────────────
if (clickSelector) {
  await page.click(clickSelector).catch((e) => console.error(`[debug] Click failed: ${e.message}`));
  await page.waitForTimeout(1000);
}

if (waitMs > 0) await page.waitForTimeout(waitMs);

// ─── Screenshot ───────────────────────────────────────────────
await page.screenshot({ path: screenshotPath, fullPage });
await browser.close();

// ─── Output ───────────────────────────────────────────────────
console.log(`SCREENSHOT: ${screenshotPath}`);
console.log(`URL: ${url}`);
console.log(`VIEWPORT: ${viewport.width}x${viewport.height}`);

if (consoleErrors.length > 0) {
  console.log(`\nCONSOLE_ERRORS:\n${JSON.stringify(consoleErrors, null, 2)}`);
}
if (httpErrors.length > 0) {
  console.log(`\nHTTP_ERRORS:\n${JSON.stringify(httpErrors, null, 2)}`);
}
if (networkErrors.length > 0) {
  console.log(`\nFAILED_REQUESTS:\n${JSON.stringify(networkErrors, null, 2)}`);
}
if (!consoleErrors.length && !httpErrors.length && !networkErrors.length) {
  console.log('\n✅ No errors detected');
}
