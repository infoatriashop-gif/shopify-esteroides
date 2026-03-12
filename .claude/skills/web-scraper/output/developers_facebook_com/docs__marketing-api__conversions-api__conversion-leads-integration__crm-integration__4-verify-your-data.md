# 4: Verifica tus datos - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/4-verify-your-data

---

4: Verifica tus datos - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# 4: Verifica tus datos

Hay dos fases de validación de datos:

 - Fase Conecta tu CRM
- Fase Configura tu embudo de ventas
 

## Fase Conecta tu CRM

 - Después de conectarte a la API de conversiones, consulta la pestaña "Información general" de tu conjunto de datos en el administrador de eventos de Meta para ver el estado de la integración.

- El sistema comprobará si enviaste al menos un evento válido desde tu integración. Un evento con la carga útil adecuada que se envía a través de tu CRM utilizando CAPI y puede atribuirse a un cliente potencial se considera un evento válido.
 

## Fase Configura tu embudo de ventas

Cuando configuras tu embudo, permites que Meta analice y optimice su rendimiento, lo que brinda mejores resultados para tus campañas de clientes potenciales. Para lograrlo, los datos que compartes con Meta deben cumplir algunos requisitos

 - Después de enviar todos los eventos, consulta la pestaña "Información general" de tu conjunto de datos en el administrador de eventos de Meta para ver el estado de la integración. Podrás configurar tu embudo. Si configuras tu embudo, podremos comprender los datos que envías y realizar un análisis detallado basado en el cumplimiento de los requisitos de los datos. Consulta el documento Configura tu embudo de ventas para obtener más información.

- Los datos enviados a Meta deben cumplir estos requisitos: 

 Mantener la campaña de clientes potenciales mientras se generan 200 clientes potenciales por mes.
- Tu cobertura de clientes potenciales es de al menos 60%. La cobertura de clientes potenciales se define como el porcentaje de clientes potenciales que subieron eventos coincidentes a Meta. La mejor manera de aumentar tu cobertura de clientes potenciales es incluir el identificador de cliente potencial de Meta en tu carga útil y subir el evento de cliente potencial sin procesar que representa todos los clientes potenciales generados en Meta y descargados en tu CRM. Puedes ver tu cobertura actual de clientes potenciales haciendo clic en el botón Ver informes en la pestaña Configuración de tu píxel de CRM.
- Los datos tienen todos los parámetros obligatorios y están en el formato correcto. Consulta la sección "Especificaciones de carga útil" para obtener más información.
 Nota : Si el sistema detecta algún error en tu integración, te lo haremos saber en la pestaña Configuración de tu píxel de CRM. También puedes ver los errores en la pestaña Diagnóstico junto con instrucciones sobre cómo corregirlos.
 
 ← Anterior 3: Implementing the CRM Integration (Developer) → Siguiente 5: Configure Your Sales Funnel 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
