# 6: Pasos de seguimiento - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/6-follow-up-steps

---

6: Pasos de seguimiento - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
- Uso de la API
- Verificación de la configuración
- Parámetros
- Biblioteca del administrador de parámetros
- API de conversiones para eventos de la app
- API de conversiones para eventos offline
- API de conversiones para mensajes comerciales
- Integración de clientes potenciales de conversión
- Dataset Quality API
- Manejo de eventos duplicados
- Guías
- Asistente de carga
- Prácticas recomendadas
- Solución de problemas
 

# 6: Pasos de seguimiento

Esta guía incluye lo siguiente:

 - Permitir que el sistema analice y se entrene con los datos
- Compartir el píxel de Meta con tus cuentas publicitarias
 

## Análisis del embudo y período de aprendizaje

¡Felicidades! Completaste los pasos principales de la API de conversiones para la integración con CRM. El sistema se encargará de los próximos pasos. No tienes que hacer nada más, a menos que el sistema detecte un problema en los datos. No cambies píxeles después de este paso. La modificación de píxeles iniciará una nueva integración y reiniciará el proceso de formación.


### Análisis de embudo

Una vez completada la configuración del embudo, el sistema analizará tus datos de nuevo para determinar si coinciden con el embudo que indicaste. La extensión de este proceso dependerá de la extensión del intervalo de la conversión de clientes potenciales. Si la conversión de un cliente normalmente tarda 14 días, necesitaríamos al menos esa cantidad de días de buenos datos subidos. Recuerda que tu evento de conversión debe ocurrir dentro de los 28 días posteriores a la generación de clientes potenciales y tener una tasa de conversión del 1% al 40%.

Revisa la pestaña de diagnóstico en el administrador de eventos para encontrar errores y las instrucciones para solucionarlos. Puedes comenzar confirmando que tus datos se ajusten a los requisitos antes mencionados.

 

### Fase de aprendizaje

Una vez completada tu integración y superado el análisis del embudo, hay una fase de aprendizaje de 2 a 4 semanas antes de que el modelo termine de entrenarse con tus datos. Puedes activar la optimización de clientes potenciales de conversión en el menú de optimización y entrega del administrador de anuncios durante este período, pero es posible que no veas todas las mejoras de rendimiento hasta después del período de entrenamiento. Si observas un rendimiento inferior con los clientes potenciales de conversión, recomendamos esperar a que termine la fase de aprendizaje antes de activar la optimización.

Una vez completada la integración, aparecerá un cuadro de diálogo de confirmación para comunicar que el proceso se completó.

 

## Compartir el píxel con tus cuentas publicitarias

 - Asegúrate de que tus cuentas publicitarias tengan acceso al píxel al ejecutar una campaña de clientes potenciales de conversión. En la pestaña de Configuración, en el administrador de eventos, haz clic en el botón Compartir con una cuenta publicitaria. Con esto, accederás a la configuración del negocio. También se puede acceder directamente en el administrador comercial.

- Para agregar una cuenta publicitaria de manera que tenga acceso al píxel, selecciona Añadir recursos en la pestaña Recursos conectados de tu píxel.
 ← Anterior 5: Configure Your Sales Funnel 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
