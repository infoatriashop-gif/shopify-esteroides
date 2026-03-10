# Team Build — Construcción Paralela por Módulos

Lanza un equipo de agentes para construir múltiples módulos del proyecto en paralelo.

## Instrucciones

Crea un Agent Team para implementar módulos en paralelo. El Architect actúa como lead coordinando a los demás.

### Fase de Planning (secuencial):
1. **Architect** define la estructura del proyecto, schema de DB, y asigna módulos
2. Todos los teammates leen y aprueban el plan antes de empezar

### Fase de Build (paralelo):
- **UX Lead**: Implementa los componentes frontend — formulario COD, upsells, product page, thank you page
- **Backend Engineer**: Implementa APIs — Dropi integration, pixel tracking server-side, fraud engine, webhooks
- **Architect**: Implementa el core — DB schema, auth, settings, middleware, Docker config

### Fase de Review (secuencial):
- **Devil's Advocate**: Revisa todo el código generado buscando problemas
- **QA Tester**: Diseña y ejecuta test suite para flujos críticos
- **Product Analyst**: Valida que las features cumplan objetivos de negocio

### Reglas de coordinación:
- Cada teammate trabaja en archivos distintos (sin conflictos)
- El Architect define interfaces/tipos compartidos PRIMERO
- Si un teammate necesita algo de otro, lo comunica al lead
- Require plan approval antes de cambios en schema o arquitectura
