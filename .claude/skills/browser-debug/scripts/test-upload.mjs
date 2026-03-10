/**
 * Tests the image upload flow in the editor
 */
import { mkdir, writeFile } from 'fs/promises';
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
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

const consoleLogs = [];
const networkLogs = [];

page.on('console', msg => consoleLogs.push({ type: msg.type(), text: msg.text() }));
page.on('response', async res => {
  if (res.url().includes('/api/')) {
    let body = '';
    try { body = await res.text(); } catch {}
    networkLogs.push({ url: res.url(), status: res.status(), body: body.slice(0, 300) });
  }
});

// 1. Login
console.error('[test] Logging in...');
await page.goto('http://localhost:2000/login', { waitUntil: 'networkidle' });
await page.fill('input[type="email"]', 'admin@vireonlabs.online');
await page.fill('input[type="password"]', 'Admin1234');
await page.click('button[type="submit"]');
await page.waitForURL('**/admin**', { timeout: 8000 });

// 2. Go to editor (need a product first)
console.error('[test] Going to productos...');
await page.goto('http://localhost:2000/admin/productos', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

const ts = Date.now();
await page.screenshot({ path: join(outputDir, `upload-1-productos-${ts}.png`) });
console.log(`STEP1: ${join(outputDir, `upload-1-productos-${ts}.png`)}`);

// Find editor link
const editorLinks = await page.$$('a[href*="/editor/"]');
console.log(`EDITOR_LINKS_FOUND: ${editorLinks.length}`);

if (editorLinks.length > 0) {
  await editorLinks[0].click();
  await page.waitForTimeout(2000);

  const ts2 = Date.now();
  await page.screenshot({ path: join(outputDir, `upload-2-editor-${ts2}.png`) });
  console.log(`STEP2_EDITOR: ${join(outputDir, `upload-2-editor-${ts2}.png`)}`);

  // Find image upload zone
  const uploadZone = await page.$('[class*="border-dashed"]');
  console.log(`UPLOAD_ZONE_FOUND: ${!!uploadZone}`);

  if (uploadZone) {
    // Create a small test PNG in memory
    // Simple 1x1 red pixel PNG
    const pngBytes = Buffer.from(
      '89504e470d0a1a0a0000000d494844520000000100000001080200000090' +
      '77533800000000c4944415478016360f8cfc00000000200016e21bc330000000049454e44ae426082',
      'hex'
    );
    const testImgPath = join(outputDir, 'test-pixel.png');
    await writeFile(testImgPath, pngBytes);

    // Set file on the hidden input
    const fileInput = await page.$('input[type="file"][accept="image/*"]');
    if (fileInput) {
      console.error('[test] Found file input, uploading test image...');
      await fileInput.setInputFiles(testImgPath);
      await page.waitForTimeout(4000);

      const ts3 = Date.now();
      await page.screenshot({ path: join(outputDir, `upload-3-after-upload-${ts3}.png`) });
      console.log(`STEP3_AFTER_UPLOAD: ${join(outputDir, `upload-3-after-upload-${ts3}.png`)}`);
    } else {
      console.log('FILE_INPUT_NOT_FOUND');
    }
  }
}

console.log('\nCONSOLE_ERRORS:');
consoleLogs.filter(l => l.type === 'error').forEach(l => console.log(' ', l.text));

console.log('\nAPI_CALLS:');
networkLogs.forEach(l => console.log(`  ${l.status} ${l.url}\n     ${l.body}`));

await browser.close();
