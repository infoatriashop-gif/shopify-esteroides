#!/usr/bin/env node
/**
 * web-scraper/scripts/crawl.mjs
 * Crawls a documentation site and saves all content as markdown.
 *
 * Usage:
 *   node .claude/skills/web-scraper/scripts/crawl.mjs <url> [options]
 *
 * Options:
 *   --depth <n>       Max crawl depth (default: 4)
 *   --max <n>         Max pages to crawl (default: 200)
 *   --out <dir>       Output directory (default: .claude/skills/web-scraper/output)
 *   --include <path>  Only crawl URLs that contain this path prefix
 *   --delay <ms>      Delay between requests in ms (default: 200)
 *   --js              Use Playwright for JS-rendered pages
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { URL } from "url";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Args parsing ─────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const startUrl = args.find((a) => !a.startsWith("--"));

if (!startUrl) {
  console.error("Usage: node crawl.mjs <url> [--depth 4] [--max 200] [--include /docs] [--js]");
  process.exit(1);
}

function getArg(flag, def) {
  const i = args.indexOf(flag);
  if (i === -1) return def;
  let val = args[i + 1];
  // Fix: Git bash on Windows converts /docs/... to C:/Program Files/Git/docs/...
  // Detect and strip the git bash prefix
  val = val.replace(/^[A-Z]:\/Program Files\/Git/, "");
  return val;
}

const MAX_DEPTH   = parseInt(getArg("--depth", "4"), 10);
const MAX_PAGES   = parseInt(getArg("--max", "200"), 10);
const DELAY_MS    = parseInt(getArg("--delay", "200"), 10);
const INCLUDE     = getArg("--include", null);
const USE_JS      = args.includes("--js");
const OUT_DIR_ARG = getArg("--out", null);

const BASE         = new URL(startUrl);
const DOMAIN       = BASE.hostname;
const OUT_DIR      = OUT_DIR_ARG
  ? OUT_DIR_ARG
  : join(__dirname, "..", "output", DOMAIN.replace(/\./g, "_"));

// ── HTML utilities ────────────────────────────────────────────────────────────

function extractTitle(html) {
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  if (og) return og[1].trim();
  const t = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return t ? t[1].replace(/\s+/g, " ").trim() : "Untitled";
}

function extractHeadings(html) {
  const headings = [];
  const re = /<h([1-3])[^>]*>([\s\S]*?)<\/h[1-3]>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, "").trim();
    if (text) headings.push({ level: parseInt(m[1]), text });
  }
  return headings;
}

function extractMainContent(html) {
  // Try to grab main content area — prefer <main>, <article>, [role=main], .content, #content
  const selectors = [
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /role=["']main["'][^>]*>([\s\S]*?)<\/\w+>/i,
    /<div[^>]+(?:class|id)=["'][^"']*(?:content|docs|documentation|main|prose)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
  ];

  for (const re of selectors) {
    const m = html.match(re);
    if (m && m[1].length > 500) {
      return htmlToText(m[1]);
    }
  }

  // Fallback: strip nav/header/footer/aside and use body
  const body = html
    .replace(/<(script|style|nav|header|footer|aside|noscript)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<(svg)[^>]*>[\s\S]*?<\/svg>/gi, "");

  return htmlToText(body);
}

function htmlToText(html) {
  return html
    .replace(/<(h[1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/gi, (_, tag, content) => {
      const level = parseInt(tag[1]);
      const hashes = "#".repeat(level);
      return `\n\n${hashes} ${content.replace(/<[^>]+>/g, "").trim()}\n\n`;
    })
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `- ${c.replace(/<[^>]+>/g, "").trim()}\n`)
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, c) => `${c.replace(/<[^>]+>/g, "").trim()}\n\n`)
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, c) => `\`\`\`\n${c.replace(/<[^>]+>/g, "").trim()}\n\`\`\`\n\n`)
    .replace(/<code[^>]*>([^<]+)<\/code>/gi, (_, c) => `\`${c.trim()}\``)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function extractLinks(html, pageUrl) {
  const links = new Set();
  const re = /href=["']([^"'#?][^"']*?)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const url = new URL(m[1], pageUrl);
      // Same domain only
      if (url.hostname !== DOMAIN) continue;
      // Strip hash and query
      url.hash = "";
      // Apply path filter
      if (INCLUDE && !url.pathname.startsWith(INCLUDE)) continue;
      // Skip non-HTML resources
      if (/\.(png|jpg|jpeg|gif|svg|ico|pdf|zip|css|js|woff|ttf|mp4|webm)(\?|$)/i.test(url.pathname)) continue;
      links.add(url.href.replace(/\?.*$/, ""));
    } catch {}
  }
  return [...links];
}

function urlToFilename(url) {
  const u = new URL(url);
  let path = u.pathname.replace(/^\/|\/$/g, "").replace(/\//g, "__") || "index";
  path = path.replace(/[^a-z0-9_\-\.]/gi, "_").slice(0, 120);
  return path + ".md";
}

// ── Fetch strategies ──────────────────────────────────────────────────────────

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; DocCrawler/1.0)",
      "Accept": "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("html")) throw new Error(`Not HTML: ${ct}`);
  return await res.text();
}

async function fetchWithPlaywright(url) {
  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
  const html = await page.content();
  await browser.close();
  return html;
}

async function getHtml(url) {
  if (USE_JS) return fetchWithPlaywright(url);
  return fetchHtml(url);
}

// ── Crawl ─────────────────────────────────────────────────────────────────────

async function crawl() {
  mkdirSync(OUT_DIR, { recursive: true });

  const queue   = [{ url: startUrl, depth: 0 }];
  const visited = new Set();
  const pages   = []; // { url, title, filename, headings }
  let   allText = "";

  console.log(`\n🕷️  Crawling: ${startUrl}`);
  console.log(`   Domain   : ${DOMAIN}`);
  console.log(`   Max depth: ${MAX_DEPTH} | Max pages: ${MAX_PAGES}`);
  if (INCLUDE) console.log(`   Path filter: ${INCLUDE}`);
  if (USE_JS)  console.log(`   Mode: Playwright (JS rendering)`);
  console.log(`   Output   : ${OUT_DIR}\n`);

  while (queue.length > 0 && visited.size < MAX_PAGES) {
    const { url, depth } = queue.shift();
    const normalized = url.replace(/\/$/, "");

    if (visited.has(normalized)) continue;
    visited.add(normalized);

    process.stdout.write(`[${visited.size}/${MAX_PAGES}] ${normalized.slice(0, 80)}...`);

    let html;
    try {
      html = await getHtml(url);
      process.stdout.write(" ✓\n");
    } catch (err) {
      process.stdout.write(` ✗ (${err.message})\n`);
      continue;
    }

    const title    = extractTitle(html);
    const content  = extractMainContent(html);
    const headings = extractHeadings(html);
    const filename = urlToFilename(url);

    // Save individual page
    const pageMarkdown = `# ${title}\n\n> Source: ${url}\n\n---\n\n${content}\n`;
    writeFileSync(join(OUT_DIR, filename), pageMarkdown, "utf-8");

    pages.push({ url, title, filename, headings });
    allText += `\n\n---\n# ${title}\n> ${url}\n\n${content}`;

    // Queue child links
    if (depth < MAX_DEPTH) {
      const links = extractLinks(html, url);
      for (const link of links) {
        const norm = link.replace(/\/$/, "");
        if (!visited.has(norm)) {
          queue.push({ url: link, depth: depth + 1 });
        }
      }
    }

    if (DELAY_MS > 0) await new Promise((r) => setTimeout(r, DELAY_MS));
  }

  // ── Save combined file ──────────────────────────────────────────────────────
  const combinedPath = join(OUT_DIR, "_ALL_CONTENT.md");
  writeFileSync(combinedPath, allText.trim(), "utf-8");

  // ── Save index ──────────────────────────────────────────────────────────────
  const indexLines = [
    `# Documentation Index — ${DOMAIN}`,
    ``,
    `Crawled: ${new Date().toISOString()}`,
    `Pages: ${pages.length}`,
    `Start URL: ${startUrl}`,
    ``,
    `---`,
    ``,
    `## Pages`,
    ``,
  ];

  for (const p of pages) {
    indexLines.push(`### [${p.title}](${p.url})`);
    indexLines.push(`File: \`${p.filename}\``);
    if (p.headings.length > 0) {
      for (const h of p.headings.slice(0, 6)) {
        indexLines.push(`${"  ".repeat(h.level - 1)}- ${h.text}`);
      }
    }
    indexLines.push(``);
  }

  writeFileSync(join(OUT_DIR, "_INDEX.md"), indexLines.join("\n"), "utf-8");

  // ── Summary ─────────────────────────────────────────────────────────────────
  console.log(`\n✅ Done!`);
  console.log(`   Pages crawled : ${pages.length}`);
  console.log(`   Output dir    : ${OUT_DIR}`);
  console.log(`   Combined file : ${combinedPath}`);
  console.log(`   Index file    : ${join(OUT_DIR, "_INDEX.md")}`);
  console.log(`\nTo read all content at once:`);
  console.log(`   _ALL_CONTENT.md (${Math.round(allText.length / 1024)} KB)`);

  // Print list of output files for Claude to read
  console.log(`\nOUTPUT_DIR: ${OUT_DIR}`);
  console.log(`COMBINED_FILE: ${combinedPath}`);
  console.log(`INDEX_FILE: ${join(OUT_DIR, "_INDEX.md")}`);
  console.log(`PAGES_COUNT: ${pages.length}`);
}

crawl().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
