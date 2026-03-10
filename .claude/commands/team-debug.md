# Team Debug — Investigación de Bug Multi-Ángulo

Lanza un equipo de agentes para investigar un bug o problema desde múltiples hipótesis simultáneamente.

## Instrucciones

Crea un Agent Team para investigar el problema reportado. Usa el patrón de "hipótesis competidoras":

1. **Backend Engineer**: Investiga si el problema es del lado del servidor — APIs, DB queries, integrations, webhooks
2. **UX Lead**: Investiga si el problema es del lado del cliente — rendering, state management, form validation, browser compatibility
3. **Devil's Advocate**: Investiga hipótesis no obvias — race conditions, timezone issues, encoding, edge cases en datos LATAM
4. **QA Tester**: Reproduce el bug sistemáticamente, identifica los pasos exactos, y verifica el fix

Los teammates deben comunicarse entre sí para descartar hipótesis y converger en la causa raíz. El que encuentre la causa propone el fix, y los demás lo validan.
