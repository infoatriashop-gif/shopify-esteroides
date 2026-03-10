/**
 * Tests the upload API with auth cookie
 */
import { fileURLToPath } from 'url';
import { resolve, join } from 'path';
import { createRequire } from 'module';
import { readFileSync } from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = resolve(__dirname, '../../../..');
const require = createRequire(join(projectRoot, 'package.json'));
const { chromium } = require('playwright');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

// Login
await page.goto('http://localhost:2000/login', { waitUntil: 'networkidle' });
await page.fill('input[type="email"]', 'admin@vireonlabs.online');
await page.fill('input[type="password"]', 'Admin1234');
await page.click('button[type="submit"]');
await page.waitForURL('**/admin**', { timeout: 8000 });
console.error('[test] Logged in');

// Upload a real test image via fetch in browser context
const result = await page.evaluate(async () => {
  // Create a small canvas image as PNG blob
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#4f46e5';
  ctx.fillRect(0, 0, 100, 100);
  ctx.fillStyle = '#ffffff';
  ctx.font = '20px sans-serif';
  ctx.fillText('TEST', 20, 55);

  const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
  const formData = new FormData();
  formData.append('files', blob, 'test-image.png');

  try {
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const text = await res.text();
    return { status: res.status, body: text };
  } catch (e) {
    return { error: e.message };
  }
});

console.log('UPLOAD_STATUS:', result.status);
console.log('UPLOAD_RESPONSE:', result.body || result.error);

await browser.close();
