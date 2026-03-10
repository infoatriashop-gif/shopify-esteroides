# Skill: browser-debug

## Description
Use when something doesn't work in the browser or frontend. Activates when the user says:
- "no funciona", "no pasa nada", "no carga", "se rompe", "hay un error", "error en el navegador"
- "toma una captura", "captura de pantalla", "screenshot", "mira el error"
- "debug visual", "qué está pasando en la página"

## Instructions

When invoked as `/debug [url]` or when a frontend bug is reported:

### Step 1: Run the browser debug script

```bash
node .claude/skills/browser-debug/scripts/capture.mjs [URL] [opciones]
```

**URL por defecto:** `http://localhost:2000`

**Opciones:**
- `--url <url>` — URL a capturar
- `--path <ruta>` — Ruta específica dentro del app (ej: `/login`, `/admin`)
- `--click <selector>` — CSS selector a hacer click antes de la captura
- `--wait <ms>` — Milliseconds to wait before screenshot
- `--login` — Login automático como admin antes de capturar
- `--full` — Captura de página completa (full page)
- `--mobile` — Simular viewport mobile (390x844)

**Ejemplos:**
```bash
# Captura simple del login
node .claude/skills/browser-debug/scripts/capture.mjs --url http://localhost:2000/login

# Debug del admin con login automático
node .claude/skills/browser-debug/scripts/capture.mjs --url http://localhost:2000/admin --login

# Simular móvil
node .claude/skills/browser-debug/scripts/capture.mjs --url http://localhost:2000/comprar/mi-producto --mobile

# Captura de página completa
node .claude/skills/browser-debug/scripts/capture.mjs --url http://localhost:2000 --full
```

### Step 2: Read the screenshot

After running the script, read the generated screenshot file using the Read tool. The script outputs the path.

```bash
# Output example:
# SCREENSHOT: C:\Users\sebas\...\debug-screenshots\capture-1234567890.png
# CONSOLE_ERRORS: [...]
# NETWORK_ERRORS: [...]
```

Use the Read tool with the screenshot path to see the image visually.

### Step 3: Analyze and fix

1. Look at the screenshot visually
2. Read the console errors and network errors from the JSON output
3. Identify the root cause
4. Fix the code

### Automated debug flow

When a bug is reported without a specific URL, always:
1. Run capture on the reported page
2. Read the screenshot
3. Check console errors
4. Check network requests (especially failed ones)
5. Identify and fix the issue
6. Run capture again to verify the fix

### Reading screenshots

Always use the `Read` tool to view the generated PNG file. Claude can see images directly.

### Common patterns to look for in screenshots:

- **Blank page** → JavaScript error, check console errors
- **401/403 errors** → Auth issue, check cookies/middleware
- **Network failed** → API down or wrong URL
- **Hydration mismatch** → SSR vs client mismatch
- **Style broken** → CSS not loaded, Tailwind class issue
- **Infinite loader** → API promise not resolving
- **Form not submitting** → JS error on submit handler
- **Redirect loop** → Middleware loop

### Login credentials for auto-login

```
Email: admin@vireonlabs.online
Password: Admin1234
```

These are used automatically when `--login` flag is passed.
