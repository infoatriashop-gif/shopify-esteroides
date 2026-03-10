# Ralph Prompt — Plataforma Dropshipping COD (Next.js)

## Instrucciones para usar este prompt

### Paso 1: Copia este archivo a la raíz de tu proyecto
```bash
cp RALPH-PROMPT.md /ruta/a/tu/proyecto/RALPH-PROMPT.md
```

### Paso 2: Ejecuta fase por fase (RECOMENDADO)
Ve a la sección "PROMPTS INDIVIDUALES POR FASE" al final de este documento.

### Paso 3 (alternativa): Ejecuta todo de una vez
```bash
/ralph-loop "<PEGAR CONTENIDO ENTRE --- INICIO PROMPT --- y --- FIN PROMPT --->" --completion-promise "ALL_PHASES_COMPLETE" --max-iterations 150
```

---

## PROMPT COMPLETO (TODAS LAS FASES)

--- INICIO PROMPT ---

Eres un desarrollador senior trabajando en una plataforma de dropshipping COD con Next.js (App Router), TypeScript y Tailwind CSS. El proyecto ya tiene avances: dashboard, productos, dominios. Tu trabajo es completar las funcionalidades faltantes de forma iterativa siguiendo TDD.

## Stack Tecnológico
- Framework: Next.js 14+ (App Router)
- Lenguaje: TypeScript estricto
- Estilos: Tailwind CSS + CSS variables (dark/light mode)
- Estado: React Context (theme), useState/useReducer local
- Almacenamiento actual: JSON en archivos (.data/) — preparar para migración a PostgreSQL
- API: Route Handlers de Next.js (/api/*)
- Integración externa: Dropi API (https://app.dropi.co / https://dev.dropi.co)
- Runtime: Node.js, puerto 2000
- Tests: Vitest + React Testing Library

## REGLAS GENERALES (aplican a TODAS las fases)

### 1. Metodología TDD (Test-Driven Development)
Para cada funcionalidad nueva:
1. Escribe un test que falle (describe qué debería hacer el componente/función)
2. Implementa el código mínimo para que pase
3. Corre los tests: `npx vitest run --reporter=verbose 2>&1 | tail -30`
4. Si alguno falla, debug y fix. NO avances con tests rotos
5. Refactoriza si es necesario
6. Repite

Setup de tests (si no existe, créalo en la primera iteración):
- Instalar: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- Config: `vitest.config.ts` con environment jsdom
- Tests en: `src/__tests__/` o junto al componente como `Component.test.tsx`
- Mínimo 1 test por componente nuevo, 1 test por API route nueva

### 2. Rendimiento ultra rápido
- Usar `next/dynamic` con `ssr: false` para componentes pesados (editor, preview)
- Implementar `loading.tsx` en cada ruta del App Router
- Usar `next/image` con `priority` en imágenes above-the-fold, lazy loading en el resto
- Comprimir imágenes al subir (sharp o canvas API, max 500KB, WebP preferido)
- Implementar skeleton loaders en vez de spinners
- Code splitting agresivo: cada sección del editor es un chunk separado
- Memoizar componentes con `React.memo` y hooks con `useMemo`/`useCallback`
- Prefetch de rutas con `<Link prefetch>`
- Cache de API responses con `revalidate` en fetch o SWR/React Query

### 3. Dark mode con buen contraste
- Cada componente nuevo DEBE funcionar en dark y light mode
- Verificar ratios de contraste WCAG AA mínimo (4.5:1 texto normal, 3:1 texto grande)
- Usar variables CSS: `--bg-primary`, `--bg-secondary`, `--text-primary`, `--text-secondary`, `--border`, `--accent`
- Colores dark mode: fondos no más oscuros que #0a0a0a, textos no más claros que #e5e5e5
- Borders visibles en ambos modos: usar `border-gray-200 dark:border-gray-700`
- Inputs, selects, textareas: `bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`
- NUNCA usar colores hardcodeados sin su variante dark

### 4. Arquitectura de código
- Componentes en `/src/components/[feature]/`
- Hooks en `/src/hooks/`
- Types en `/src/types/`
- Utils en `/src/lib/`
- API routes en `/src/app/api/[feature]/route.ts`
- Cada archivo < 300 líneas. Si crece, refactorizar en módulos

### 5. Tracking de progreso (OBLIGATORIO)
Mantén actualizado el archivo `PROGRESS.md` en la raíz del proyecto. Formato:

```markdown
# Progreso del Proyecto

## Fase actual: [1|2|3|4|5]
## Iteración: [N]
## Último update: [fecha/hora]

### FASE 1: Formulario + Preview
- [x] Item completado (iteración 3)
- [ ] Item pendiente
...

### FASE 2: Editor Elementor
- [ ] Item pendiente
...
```

Actualiza PROGRESS.md al FINAL de cada iteración con lo que completaste.

## ═══════════════════════════════════════════
## FASE 1: FORMULARIO CONFIGURABLE + LIVE PREVIEW
## ═══════════════════════════════════════════

### Objetivo
Crear un sistema de formularios de checkout COD (Cash on Delivery) configurable por tienda o por producto, con preview en tiempo real al lado del editor.

### Layout
Pantalla dividida (split view):
- **Izquierda (60%):** Panel de configuración del formulario
- **Derecha (40%):** Preview en vivo del formulario tal como lo verá el cliente final

### Campos configurables del formulario
Cada campo tiene: `id`, `label`, `type`, `required`, `visible`, `order`, `placeholder`, `validation`

Campos base (siempre presentes, configurables):
- Nombre completo (text, required)
- Teléfono (tel, required, validación por país)
- Email (email, optional)
- País (select, auto-detectado según config de Dropi)
- Departamento/Estado/Provincia (select, dinámico según país)
- Ciudad (select, dinámico según departamento)
- Dirección (text, required)
- Dirección complementaria (text, optional)
- Notas del pedido (textarea, optional)

### Países soportados (donde opera Dropi)
Colombia, México, Panamá, Ecuador, Perú, Chile, Paraguay, Venezuela, Argentina, Guatemala, España, Portugal, Costa Rica, República Dominicana.

Cada país tiene su propia estructura de divisiones administrativas:
- Colombia: Departamento → Ciudad
- México: Estado → Ciudad
- Chile: Región → Comuna
- España: Comunidad Autónoma → Provincia → Municipio
- etc.

Crear un archivo `/src/data/countries.ts` con la estructura de cada país y sus validaciones de teléfono (regex por país).

### Configuración del formulario
- **Global (tienda):** Configuración base que aplica a todos los productos
- **Por producto:** Override que permite personalizar campos para un producto específico
- Herencia: producto hereda de global, puede activar/desactivar campos o cambiar orden
- Guardar en `.data/form-configs/{store-id}.json` y `.data/form-configs/products/{product-id}.json`

### Personalización visual del formulario
- Color primario del botón
- Color de fondo del formulario
- Border radius (none, sm, md, lg, xl, full)
- Font family (Inter, Poppins, Roboto, Open Sans, system)
- Tamaño del botón de submit (sm, md, lg)
- Texto del botón (ej: "Hacer pedido", "Comprar ahora", "Pedir con pago contra entrega")
- Mostrar/ocultar resumen del producto en el formulario
- Logo de la tienda arriba del formulario (optional)
- Indicadores de seguridad/confianza (badges opcionales)

### Modo Popup
- El formulario puede configurarse como popup/modal
- Se activa con un botón trigger (configurable texto y estilo)
- Animación de entrada: slide-up, fade, scale
- Overlay oscuro detrás
- Cerrar con X, click fuera, o tecla Escape
- El botón trigger es un componente reutilizable que se generará para usar en el editor de producto (Fase 2)

### Live Preview
- Actualización en tiempo real (debounce 150ms) mientras se editan campos
- Preview muestra el formulario exactamente como lo verá el cliente
- Toggle para ver preview en: Desktop / Tablet / Mobile
- Toggle para ver preview en: Light / Dark mode
- Toggle para ver preview como: Inline / Popup
- El preview se renderiza en un iframe o componente aislado para no contaminar estilos

### Tests requeridos Fase 1:
- Test: FormBuilder renderiza todos los campos configurados
- Test: cambiar un campo en config actualiza el preview
- Test: validación de teléfono rechaza formatos inválidos por país
- Test: configuración por producto hereda de global correctamente
- Test: modo popup se abre y cierra correctamente
- Test: API route `/api/form-config` guarda y carga configuraciones

### Checklist de completitud Fase 1:
- [ ] Split view funciona responsive (en mobile se apilan)
- [ ] Todos los campos se configuran y reflejan en preview al instante
- [ ] Configuración global funciona
- [ ] Override por producto funciona y hereda de global
- [ ] Los 14 países cargan sus divisiones administrativas correctamente
- [ ] Validación de teléfono funciona por país
- [ ] Modo popup funciona con animaciones
- [ ] Preview responde a cambios de responsive (desktop/tablet/mobile)
- [ ] Preview responde a toggle dark/light
- [ ] Dark mode del panel de configuración tiene buen contraste
- [ ] TODOS los tests de Fase 1 pasan: `npx vitest run`
- [ ] Build sin errores: `npm run build` pasa limpio
- [ ] Commit con mensaje descriptivo
- [ ] PROGRESS.md actualizado

## ═══════════════════════════════════════════
## FASE 2: EDITOR DE PRODUCTO TIPO ELEMENTOR
## ═══════════════════════════════════════════

### Objetivo
Crear un editor visual drag-and-drop para las landing pages de producto, similar a Elementor/GemPages pero optimizado para dropshipping COD.

### Arquitectura del editor
- Sistema de bloques (blocks/widgets) arrastrables
- Cada bloque tiene: `id`, `type`, `props`, `order`, `children?`
- Layout por secciones → filas → columnas → bloques
- Guardar estado del editor en `.data/pages/{product-id}.json`

### Bloques disponibles (v1)
1. **Hero Image/Video** — Imagen o video principal del producto (jpg, png, webp, gif, mp4, youtube embed, overlay de texto opcional)
2. **Texto enriquecido** — Editor WYSIWYG básico (bold, italic, underline, listas, links, colores, headings h1-h4, alineación)
3. **Galería de imágenes** — Carousel/grid (modos: carousel, grid 2x2, grid 3x3, slider, lightbox, lazy loading)
4. **Video** — Embed (YouTube, Vimeo, MP4 directo, autoplay opcional, muted default, lazy load con thumbnail)
5. **Testimonios** — Reviews/testimonios (cards con foto, nombre, estrellas, texto. Layouts: grid, carousel, lista)
6. **Beneficios/Features** — Características (icono + título + descripción. Layouts: horizontal, vertical, grid)
7. **Countdown Timer** — Urgencia/escasez (fecha fija o X horas desde visita. Estilos: inline, banner, floating)
8. **Precio** — Display de precio (precio tachado + actual, badge descuento %, moneda por país)
9. **Botón CTA** — Llamada a acción (texto, color, tamaño, icono. Acciones: scroll to form, abrir popup formulario, link externo. Animación: pulse, shake, glow)
10. **Separador** — Divisoria/espacio (tipos: línea, espacio, wave, zigzag)
11. **FAQ/Acordeón** — Preguntas frecuentes (expandible/colapsable, schema markup SEO)
12. **HTML personalizado** — Código libre (embeds, scripts tracking, widgets externos)
13. **Garantía/Trust badges** — Señales de confianza (templates: envío gratis, garantía, pago seguro. Personalizable)

### Sistema Drag & Drop
- Sidebar izquierda: paleta de bloques disponibles
- Centro: canvas del editor (área de edición)
- Sidebar derecha: panel de propiedades del bloque seleccionado
- Drag desde paleta al canvas para agregar
- Drag dentro del canvas para reordenar
- Click en bloque para seleccionar y editar propiedades
- Usar librería: `@dnd-kit/core` y `@dnd-kit/sortable`

### Subida de multimedia
- Drag & drop de archivos al editor
- Upload a `/public/uploads/products/{product-id}/`
- Compresión automática de imágenes (WebP, max 500KB)
- Thumbnails generados automáticamente
- Videos: solo embed URLs (YouTube/Vimeo) o link a archivo externo para v1

### Preview del editor
- Toggle: Editor / Preview
- Preview muestra la página exactamente como la verá el cliente
- Responsive preview: Desktop / Tablet / Mobile
- El formulario de checkout (Fase 1) se integra al final de la página o como popup

### Tests requeridos Fase 2:
- Test: cada uno de los 13 bloques renderiza correctamente con props default
- Test: agregar bloque al canvas incrementa la lista de bloques
- Test: reordenar bloques cambia el orden en el estado
- Test: editar propiedades de un bloque actualiza el renderizado
- Test: guardar y cargar estado del editor mantiene la estructura
- Test: el botón CTA con acción "abrir popup" dispara el modal del formulario

### Checklist de completitud Fase 2:
- [ ] Todos los 13 bloques funcionan y se renderizan correctamente
- [ ] Drag & drop funciona fluido (sin lag perceptible)
- [ ] Propiedades de cada bloque se editan en sidebar derecha
- [ ] Subida de imágenes funciona con compresión
- [ ] Preview mode muestra la página completa
- [ ] Responsive preview funciona (3 breakpoints)
- [ ] El formulario de Fase 1 se integra como bloque inline o popup
- [ ] Los botones CTA pueden configurarse para abrir el popup del formulario
- [ ] Guardar/cargar estado del editor funciona
- [ ] Dark mode del editor tiene buen contraste
- [ ] Performance: el editor carga en < 2 segundos
- [ ] TODOS los tests de Fase 2 pasan: `npx vitest run`
- [ ] Build sin errores
- [ ] Commit con mensaje descriptivo
- [ ] PROGRESS.md actualizado

## ═══════════════════════════════════════════
## FASE 3: INTEGRACIÓN DROPI API + PEDIDOS
## ═══════════════════════════════════════════

### Objetivo
Conectar la plataforma con la API de Dropi para sincronizar productos y enviar pedidos automáticamente.

### Información de la API de Dropi
- Base URL: `https://app.dropi.co` (producción), `https://dev.dropi.co` (desarrollo/docs)
- Autenticación: JWT Bearer token en header `Authorization`
- Token se configura en settings de la app
- El token JWT contiene: `integration_type: "WOOCOMMERCE"`, `integration_url`, `wb_id`, `sub` (user ID)
- Content-Type: application/json

### Endpoints conocidos (investigar en dev.dropi.co para confirmar):
- `POST /api/v1/orders` — Crear orden
- `GET /api/v1/orders` — Listar órdenes
- `GET /api/v1/orders/{id}` — Detalle de orden
- `GET /api/v1/products` — Listar productos del catálogo
- `GET /api/v1/locations/departments/{country_id}` — Departamentos por país
- `GET /api/v1/locations/cities/{department_id}` — Ciudades por departamento
- `GET /api/v1/shipping/calculate` — Calcular costo de envío

### Flujo de creación de orden
1. Cliente llena formulario COD en la landing del producto
2. Frontend envía datos al API route `/api/orders` de nuestra app
3. Nuestro backend transforma los datos al formato de Dropi
4. Nuestro backend envía la orden a la API de Dropi
5. Dropi responde con confirmación y número de orden
6. Guardamos la orden localmente con referencia a Dropi
7. Cliente ve pantalla de confirmación

### Datos de la orden para Dropi (estructura típica COD)
```json
{
  "product_id": "dropi_product_id",
  "quantity": 1,
  "customer": {
    "full_name": "string",
    "phone": "string",
    "email": "string (optional)",
    "country_id": "number",
    "department_id": "number",
    "city_id": "number",
    "address": "string",
    "address_complement": "string (optional)",
    "notes": "string (optional)"
  },
  "payment_method": "COD",
  "total_price": "number",
  "shipping_cost": "number"
}
```

### Panel de órdenes
- Vista de tabla con todas las órdenes
- Columnas: #, Fecha, Cliente, Producto, Total, Estado Dropi, Acciones
- Filtros: por fecha, estado, producto
- Estados de Dropi: Pendiente Confirmación → Confirmado → Guía Generada → En camino → Entregado / Devuelto
- Sincronización de estados: webhook o polling cada 5 min
- Detalle de orden: modal o página con toda la info

### Manejo de errores de API
- Si Dropi no responde: guardar orden como "pendiente_sync" y reintentar con cron
- Si el token es inválido: mostrar alerta en dashboard para reconectar
- Si no hay cobertura: mostrar al cliente antes de enviar
- Logging de todas las llamadas a Dropi en `.data/logs/dropi/`

### Verificación de conexión
- Endpoint `/api/dropi/test-connection` que:
  1. Hace GET a Dropi con el token guardado
  2. Verifica que el token sea válido y no esté expirado
  3. Retorna: status, user info, integration info
  4. Si falla: mensaje claro del error

### Tests requeridos Fase 3:
- Test: test-connection retorna status correcto con token válido/inválido (mock fetch)
- Test: crear orden transforma datos correctamente al formato Dropi
- Test: orden fallida se guarda como pendiente_sync
- Test: panel de órdenes renderiza tabla con datos mock
- Test: filtros de órdenes funcionan

### Checklist de completitud Fase 3:
- [ ] Test de conexión con Dropi funciona y muestra estado claro
- [ ] Listar productos de Dropi funciona
- [ ] Crear orden en Dropi funciona end-to-end
- [ ] Panel de órdenes muestra datos correctos
- [ ] Filtros de órdenes funcionan
- [ ] Sincronización de estados funciona (polling)
- [ ] Manejo de errores: token inválido muestra alerta
- [ ] Manejo de errores: orden pendiente se reintenta
- [ ] Locations (departamentos/ciudades) cargan desde Dropi por país
- [ ] Dark mode del panel de órdenes tiene buen contraste
- [ ] TODOS los tests de Fase 3 pasan: `npx vitest run`
- [ ] Build sin errores
- [ ] Commit con mensaje descriptivo
- [ ] PROGRESS.md actualizado

## ═══════════════════════════════════════════
## FASE 4: SISTEMA DE AUTENTICACIÓN
## ═══════════════════════════════════════════

### Objetivo
Implementar autenticación completa para proteger el dashboard y la API.

### Stack de auth
- Usar `next-auth` (Auth.js v5) con App Router
- Providers: Credentials (email/password)
- Passwords: hash con bcrypt (salt rounds 12)
- Sessions: JWT stored en httpOnly cookie
- Almacenamiento: `.data/users.json` (preparado para PostgreSQL)

### Páginas
- `/login` — Login con email y password
- `/register` — Registro (solo si es primera vez o invitación)
- `/forgot-password` — Recuperar contraseña (muestra token en consola para v1)
- Redirect automático: si no autenticado → `/login`

### Protección
- Middleware de Next.js que protege `/dashboard/*` y `/api/*` (excepto `/api/public/*`)
- Landing pages de productos son públicas (`/p/{slug}`)
- Formulario de checkout es público
- Endpoint crear orden es público pero con rate limiting

### Roles (v1 simple)
- `admin` — Acceso total
- `viewer` — Solo lectura

### Rate limiting
- Login: max 5 intentos por IP en 15 min
- API pública (crear orden): max 10 requests por IP por minuto
- Implementar con in-memory store (Map) para v1

### Tests requeridos Fase 4:
- Test: login con credenciales correctas retorna sesión
- Test: login con credenciales incorrectas retorna error
- Test: ruta protegida sin auth retorna 401
- Test: ruta pública funciona sin auth
- Test: rate limiter bloquea después de N intentos

### Checklist de completitud Fase 4:
- [ ] Login funciona con email/password
- [ ] Registro funciona
- [ ] Sesión persiste al recargar página
- [ ] Logout funciona y limpia la sesión
- [ ] Rutas protegidas redirigen a /login
- [ ] API routes protegidas retornan 401 sin auth
- [ ] Landing pages y formulario son públicos
- [ ] Rate limiting funciona en login y API pública
- [ ] Dark mode en páginas de login/register tiene buen contraste
- [ ] TODOS los tests de Fase 4 pasan: `npx vitest run`
- [ ] Build sin errores
- [ ] Commit con mensaje descriptivo
- [ ] PROGRESS.md actualizado

## ═══════════════════════════════════════════
## FASE 5: VERIFICACIÓN DNS + MEJORAS GENERALES
## ═══════════════════════════════════════════

### Verificación DNS real
Implementar en `/api/domains/verify-dns`:
1. Usar `dns.promises.resolve()` de Node.js (módulo nativo `dns`)
2. Verificar registros:
   - **CNAME**: El dominio debe apuntar a nuestro servidor
   - **A record**: Alternativa, puede apuntar la IP
   - **TXT record**: Verificación de propiedad con token único
3. Flujo:
   - Usuario agrega dominio en dashboard
   - Sistema genera token TXT único: `dropi-verify=abc123xyz`
   - Usuario agrega registro TXT en su DNS
   - Sistema verifica periódicamente (cada 5 min) o bajo demanda
   - Cuando TXT es encontrado: dominio verificado
   - Luego verifica CNAME o A record
4. UI: Badge de estado (Pendiente → DNS Verificado → Activo → Error)
5. Instrucciones claras por proveedor (GoDaddy, Namecheap, Cloudflare)

### Mejoras de rendimiento global
- `next/font` con font subsetting
- `<meta>` tags SEO en landing pages de producto
- Open Graph tags dinámicos por producto
- Service Worker para cache offline de assets estáticos
- Compression middleware (gzip/brotli)
- Analizar bundle con `@next/bundle-analyzer` y reducir chunks > 100KB

### Mejoras UX sugeridas
- Onboarding wizard (conectar Dropi → crear producto → configurar formulario → publicar)
- Notificaciones in-app para nuevas órdenes
- Dashboard con métricas: ventas hoy, órdenes pendientes, tasa de conversión
- Exportar órdenes a CSV/Excel
- Duplicar producto (clonar con un click)
- Preview link compartible de la landing page

### Tests requeridos Fase 5:
- Test: verificación DNS detecta TXT record correcto (mock dns)
- Test: verificación DNS detecta CNAME correcto (mock dns)
- Test: meta tags se generan correctamente por producto
- Test: exportar órdenes genera CSV válido

### Checklist de completitud Fase 5:
- [ ] Verificación DNS funciona con registros TXT
- [ ] Verificación DNS funciona con CNAME
- [ ] UI muestra estado claro del dominio
- [ ] Instrucciones de DNS claras para al menos 3 proveedores
- [ ] Performance: Lighthouse score > 90 en landing pages
- [ ] SEO: meta tags y Open Graph generados por producto
- [ ] Al menos 2 mejoras UX implementadas
- [ ] Dark mode revisado en TODA la aplicación (audit completo)
- [ ] TODOS los tests de Fase 5 pasan: `npx vitest run`
- [ ] Build sin errores
- [ ] Commit con mensaje descriptivo
- [ ] PROGRESS.md actualizado

## ═══════════════════════════════════════════
## COMPORTAMIENTO POR ITERACIÓN
## ═══════════════════════════════════════════

En CADA iteración, sigue este orden exacto:

### Paso 1 — Diagnóstico (SIEMPRE primero)
```bash
git log --oneline -10
cat PROGRESS.md 2>/dev/null || echo "No existe PROGRESS.md, crear uno"
npm run build 2>&1 | tail -15
npx vitest run --reporter=verbose 2>&1 | tail -20
```

### Paso 2 — Decidir qué hacer
- Lee PROGRESS.md para saber la fase actual y el último checkbox completado
- Si hay errores de build → arreglar PRIMERO
- Si hay tests fallando → arreglar PRIMERO
- Si todo está limpio → avanzar al siguiente checkbox pendiente

### Paso 3 — Implementar con TDD
1. Escribe el test para la funcionalidad que vas a implementar
2. Corre `npx vitest run` → debe fallar (red)
3. Implementa la funcionalidad
4. Corre `npx vitest run` → debe pasar (green)
5. Refactoriza si es necesario
6. Corre `npm run build` → debe pasar

### Paso 4 — Guardar progreso
```bash
git add -A && git commit -m "feat(faseN): descripción concreta del cambio"
```
Actualiza PROGRESS.md marcando el checkbox como completado con el número de iteración.

### Paso 5 — Evaluar terminación
- ¿TODOS los checkboxes de TODAS las fases están marcados en PROGRESS.md?
- ¿`npm run build` pasa sin errores?
- ¿`npx vitest run` pasa TODOS los tests?

Si las 3 condiciones se cumplen → output: <promise>ALL_PHASES_COMPLETE</promise>
Si no → continúa a la siguiente iteración.

## SI TE ATASCAS
Si llevas más de 5 iteraciones en el MISMO problema:
1. Documenta en `BLOCKERS.md`: qué problema, qué intentaste, qué error da
2. Pasa al siguiente item y márcalo como skip
3. Vuelve a los skips cuando termines lo demás
4. Si después de 120 iteraciones no se completa todo:
   - Asegura que build y tests pasen para lo que SÍ está implementado
   - Documenta estado final en PROGRESS.md
   - Output: <promise>ALL_PHASES_COMPLETE</promise>

--- FIN PROMPT ---

---

## PROMPTS INDIVIDUALES POR FASE (Recomendado)

Ejecutar fase por fase te da más control. Entre fases puedes revisar el código y ajustar.

### Fase 1 — Formulario + Preview
```bash
/ralph-loop "Lee el archivo RALPH-PROMPT.md en la raíz del proyecto. Ejecuta SOLO la FASE 1 (Formulario Configurable + Live Preview). Sigue TODAS las REGLAS GENERALES incluyendo TDD y tracking en PROGRESS.md. En cada iteración: 1) diagnóstico (git log, PROGRESS.md, build, tests), 2) implementar siguiente checkbox con TDD, 3) commit, 4) actualizar PROGRESS.md. NO outputees el promise hasta que TODOS los checkboxes de Fase 1 estén completados Y build pase Y tests pasen. Output <promise>PHASE1_COMPLETE</promise> cuando todo esté verificado." --completion-promise "PHASE1_COMPLETE" --max-iterations 40
```

### Fase 2 — Editor tipo Elementor
```bash
/ralph-loop "Lee el archivo RALPH-PROMPT.md en la raíz del proyecto. Ejecuta SOLO la FASE 2 (Editor de Producto tipo Elementor). Sigue TODAS las REGLAS GENERALES incluyendo TDD y tracking en PROGRESS.md. Asume Fase 1 completa. En cada iteración: 1) diagnóstico, 2) implementar siguiente checkbox con TDD, 3) commit, 4) actualizar PROGRESS.md. NO outputees el promise hasta que TODOS los checkboxes de Fase 2 estén completados Y build pase Y tests pasen. Output <promise>PHASE2_COMPLETE</promise> cuando todo esté verificado." --completion-promise "PHASE2_COMPLETE" --max-iterations 40
```

### Fase 3 — Integración Dropi
```bash
/ralph-loop "Lee el archivo RALPH-PROMPT.md en la raíz del proyecto. Ejecuta SOLO la FASE 3 (Integración Dropi API + Pedidos). Sigue TODAS las REGLAS GENERALES incluyendo TDD y tracking en PROGRESS.md. Asume Fases 1-2 completas. En cada iteración: 1) diagnóstico, 2) implementar siguiente checkbox con TDD, 3) commit, 4) actualizar PROGRESS.md. NO outputees el promise hasta que TODOS los checkboxes de Fase 3 estén completados Y build pase Y tests pasen. Output <promise>PHASE3_COMPLETE</promise> cuando todo esté verificado." --completion-promise "PHASE3_COMPLETE" --max-iterations 30
```

### Fase 4 — Autenticación
```bash
/ralph-loop "Lee el archivo RALPH-PROMPT.md en la raíz del proyecto. Ejecuta SOLO la FASE 4 (Sistema de Autenticación). Sigue TODAS las REGLAS GENERALES incluyendo TDD y tracking en PROGRESS.md. Asume Fases 1-3 completas. En cada iteración: 1) diagnóstico, 2) implementar siguiente checkbox con TDD, 3) commit, 4) actualizar PROGRESS.md. NO outputees el promise hasta que TODOS los checkboxes de Fase 4 estén completados Y build pase Y tests pasen. Output <promise>PHASE4_COMPLETE</promise> cuando todo esté verificado." --completion-promise "PHASE4_COMPLETE" --max-iterations 25
```

### Fase 5 — DNS + Mejoras
```bash
/ralph-loop "Lee el archivo RALPH-PROMPT.md en la raíz del proyecto. Ejecuta SOLO la FASE 5 (Verificación DNS + Mejoras Generales). Sigue TODAS las REGLAS GENERALES incluyendo TDD y tracking en PROGRESS.md. Asume Fases 1-4 completas. En cada iteración: 1) diagnóstico, 2) implementar siguiente checkbox con TDD, 3) commit, 4) actualizar PROGRESS.md. NO outputees el promise hasta que TODOS los checkboxes de Fase 5 estén completados Y build pase Y tests pasen. Output <promise>PHASE5_COMPLETE</promise> cuando todo esté verificado." --completion-promise "PHASE5_COMPLETE" --max-iterations 25
```

**Total iteraciones por fases: 40 + 40 + 30 + 25 + 25 = 160 iteraciones máximo**

---

## Notas sobre Dropi API

Tu token JWT actual tiene `integration_type: "WOOCOMMERCE"` y está asociado a `vireonlabs.online`. Si la conexión falla, verifica:

1. **Token expirado:** Genera uno nuevo en Dropi → Mis Integraciones.
2. **URL de integración:** Debe coincidir con tu dominio actual.
3. **Tipo de integración:** Tu token es tipo WooCommerce. Para integración custom contacta soporte Dropi.
4. **Documentación:** Revisa `https://dev.dropi.co` para endpoints actualizados.
5. **Endpoints de ubicaciones:** Críticos para el formulario. Ciudades/departamentos desde Dropi coinciden con coberturas de transportadoras.

Contacta soporte de Dropi vía WhatsApp desde su panel si necesitas otro tipo de token.
