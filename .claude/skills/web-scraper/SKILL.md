# Skill: web-scraper

## Description
Use when the user wants to read, understand, or study an entire website or documentation. Activates when the user says things like:
- "lee la documentación de X"
- "scrapea / crawlea esta web"
- "quiero que entiendas toda la doc de Y"
- "estudia esta página"
- "necesito que leas todo el sitio de Z"

## Instructions

When invoked, follow these steps exactly:

### Step 1 — Run the crawler

```bash
node .claude/skills/web-scraper/scripts/crawl.mjs <URL> [options]
```

**Options:**

| Flag | Default | Description |
|------|---------|-------------|
| `--depth <n>` | 4 | Max link depth from start URL |
| `--max <n>` | 200 | Max pages to crawl |
| `--include <path>` | — | Only follow URLs that start with this path (e.g. `/docs`) |
| `--delay <ms>` | 200 | Milliseconds between requests |
| `--js` | off | Use Playwright for JS-rendered sites (SPAs, React docs, etc.) |
| `--out <dir>` | auto | Custom output directory |

**Examples:**

```bash
# Simple documentation site
node .claude/skills/web-scraper/scripts/crawl.mjs https://developers.facebook.com/docs/marketing-api/conversions-api --include /docs/marketing-api/conversions-api --max 80

# JS-rendered SPA (e.g. React-based docs)
node .claude/skills/web-scraper/scripts/crawl.mjs https://docs.example.com --js --depth 3

# Focused crawl on a specific section
node .claude/skills/web-scraper/scripts/crawl.mjs https://developers.facebook.com/docs/commerce-platform/catalog --include /docs/commerce-platform/catalog --max 50 --depth 3
```

### Step 2 — Read the output

After the script runs, it outputs:
```
OUTPUT_DIR: <path>
COMBINED_FILE: <path>/_ALL_CONTENT.md
INDEX_FILE: <path>/_INDEX.md
PAGES_COUNT: <n>
```

1. First read `_INDEX.md` to see the structure
2. Then read `_ALL_CONTENT.md` for full content (or individual `.md` files for specific pages)

```
Read tool → _INDEX.md       (overview + structure)
Read tool → _ALL_CONTENT.md (everything, use offset/limit for large files)
```

### Step 3 — Analyze and answer

After reading, synthesize the documentation and answer the user's question, implement the feature, or explain the concepts.

---

## Output structure

```
.claude/skills/web-scraper/output/<domain>/
├── _INDEX.md           ← Table of contents with all pages
├── _ALL_CONTENT.md     ← Everything combined in one file
├── index.md            ← Home page
├── docs__section.md    ← Individual pages (URL path → filename)
└── ...
```

---

## When to use --js flag

Use `--js` when:
- The site is a React/Vue/Angular SPA
- Regular fetch returns empty or minimal content
- The URL has `#` routes (hash-based routing)
- Examples: React docs, Next.js docs, some API portals

Requires Playwright to be installed (already available via browser-debug skill).

---

## Tips for Meta/Facebook documentation

Facebook docs often require login for some sections. Use these focused crawls:

```bash
# Conversions API
node .claude/skills/web-scraper/scripts/crawl.mjs \
  https://developers.facebook.com/docs/marketing-api/conversions-api \
  --include /docs/marketing-api/conversions-api \
  --max 60 --depth 3

# Catalog / Commerce
node .claude/skills/web-scraper/scripts/crawl.mjs \
  https://developers.facebook.com/docs/commerce-platform \
  --include /docs/commerce-platform \
  --max 80 --depth 3

# Pixel
node .claude/skills/web-scraper/scripts/crawl.mjs \
  https://developers.facebook.com/docs/facebook-pixel \
  --include /docs/facebook-pixel \
  --max 50 --depth 3
```
