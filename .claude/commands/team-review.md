# Team Review — Revisión Multi-Perspectiva

Lanza un equipo de agentes para revisar la propuesta o código actual desde múltiples ángulos simultáneamente.

## Instrucciones

Crea un Agent Team con los siguientes teammates:

1. **UX Lead**: Usa el agente `ux-lead`. Revisa la experiencia de usuario, mobile-first, accesibilidad, y conversión del checkout COD. Enfócate en el formulario de compra y los upsells.

2. **Architect**: Usa el agente `architect`. Evalúa las decisiones de stack, estructura del proyecto, diseño de base de datos, y estrategia de deployment. Verifica que la arquitectura soporte los requisitos.

3. **Backend Engineer**: Usa el agente `backend-integrations`. Revisa las integraciones con Dropi API, Facebook CAPI, TikTok Events API, webhooks, y el motor de fraude. Valida payloads y error handling.

4. **Devil's Advocate**: Usa el agente `devils-advocate`. Cuestiona cada decisión, encuentra edge cases, vulnerabilidades de seguridad, y escenarios de fallo. Mínimo 5 problemas por área.

5. **Product Analyst**: Usa el agente `product-analyst`. Evalúa las features desde perspectiva de negocio COD LATAM: métricas, conversión, pricing, y experiencia del cliente.

Cada teammate debe:
- Leer el PROMPT-NUEVO-PROYECTO.md para contexto
- Revisar el código/propuesta actual
- Generar un reporte con findings categorizados (CRÍTICO / RIESGO / MEJORA)
- Proponer soluciones concretas

El lead debe consolidar todos los reportes en un resumen ejecutivo con las acciones prioritarias.
