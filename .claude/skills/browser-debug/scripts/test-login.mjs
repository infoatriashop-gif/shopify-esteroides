import { mkdir } from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = resolve(__dirname, '../../../..');
const require = createRequire(join(projectRoot, 'package.json'));
const { chromium } = require('playwright');

const outputDir = resolve(projectRoot, 'debug-screenshots');
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();

const consoleMessages = [];
const networkLogs = [];

page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));
page.on('response', res => {
  if (res.url().includes('/api/')) {
    networkLogs.push({ url: res.url(), status: res.status() });
  }
});

// 1. Go to login
await page.goto('http://localhost:2000/login', { waitUntil: 'networkidle' });
const ts1 = Date.now();
await page.screenshot({ path: join(outputDir, `login-1-initial-${ts1}.png`) });
console.log(`STEP1_SCREENSHOT: ${join(outputDir, `login-1-initial-${ts1}.png`)}`);

// 2. Fill credentials
await page.fill('input[type="email"]', 'admin@vireonlabs.online');
await page.fill('input[type="password"]', 'Admin1234');
const ts2 = Date.now();
await page.screenshot({ path: join(outputDir, `login-2-filled-${ts2}.png`) });
console.log(`STEP2_SCREENSHOT: ${join(outputDir, `login-2-filled-${ts2}.png`)}`);

// 3. Click submit and wait
await page.click('button[type="submit"]');
await page.waitForTimeout(3000);

const ts3 = Date.now();
await page.screenshot({ path: join(outputDir, `login-3-after-submit-${ts3}.png`) });
console.log(`STEP3_SCREENSHOT: ${join(outputDir, `login-3-after-submit-${ts3}.png`)}`);
console.log(`FINAL_URL: ${page.url()}`);
console.log(`CONSOLE_LOGS: ${JSON.stringify(consoleMessages, null, 2)}`);
console.log(`NETWORK_LOGS: ${JSON.stringify(networkLogs, null, 2)}`);

await browser.close();
