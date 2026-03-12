# Encontrar el identificador de cliente potencial - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/how-to-find-the-lead-id

---

Encontrar el identificador de cliente potencial - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Cómo encontrar el identificador de cliente potencial de Meta

El lead_id es un campo obligatorio que se utiliza para integrar el CRM de clientes potenciales de conversión que vuelve a subir eventos a Meta para ayudar a optimizar los clientes potenciales de mayor calidad, según se detalla en la especificación de carga útil. Es un número único entre 15 y 17 dígitos que se asigna a los clientes potenciales generados en Meta y que puede presentarse en diferentes campos en función de cómo descargues el cliente potencial. Esta sección proporcionará algunos ejemplos de dónde puede estar ubicado el identificador de cliente potencial de Meta relacionados con los métodos comunes de descarga de clientes potenciales, de modo que puedas almacenarlo en tu CRM y, luego, usarlo para subir eventos a Meta.

 El identificador de cliente potencial de Meta debe asignarse a un campo en tu CRM antes de que puedas usarlo para volver a subir eventos a Meta.

 

## Webhook o lectura masiva de la API Graph

El identificador de cliente potencial de Meta se almacenará en el campo id del nodo de clientes potenciales si los descargas usando un webhook o la API Graph.

 También puedes obtener el identificador de cliente potencial de Meta del campo leadgen_id en la respuesta de webhook de generación de clientes potenciales.

 Consulta la guía de integración del CRM de webhooks y la guía de desarrolladores de lectura masiva para obtener más información sobre estas integraciones.

 

## Integraciones con socios


### Zapier

El identificador de cliente potencial de Meta se almacenará en el campo id cuando se descarguen clientes potenciales usando la app de activación de anuncios para clientes potenciales de Facebook de Zapier. Podrás ver esto primero en una activación de prueba en la que Zapier obtiene un cliente potencial de Meta.

 En la app de acción de Zapier, almacena el identificador de cliente potencial de Meta asignándolo al campo de identificador de cliente potencial en tu CRM o a un campo personalizado si dicho campo no existe.

 

### LeadsBridge

El identificador de cliente potencial de Meta se almacenará en el campo id al descargar clientes potenciales usando la app de anuncios para clientes potenciales de Facebook de LeadsBridge. En la sección Asignación de campos, almacena el identificador de cliente potencial de Meta asignándolo al campo de identificador de cliente potencial estándar en tu CRM o en un campo personalizado si dicho campo no existe.

 

### Make (Integromat)

El identificador de cliente potencial de Meta se almacenará en el campo Lead ID al descargar clientes potenciales usando el escenario de los anuncios para clientes potenciales de Facebook de Make. En la sección Propiedades, almacena el identificador de cliente potencial de Meta asignándolo al campo de identificador de cliente potencial estándar en tu CRM o a un campo personalizado si dicho campo no existe.

 

## Integraciones con CRM directas


### Salesforce: captura de clientes potenciales

El identificador de cliente potencial de Meta se almacenará en el campo Lead ID al descargar clientes potenciales usando la función de captura de clientes potenciales de Salesforce Advertising Studio. En la sección Configurar campos, almacena el identificador de cliente potencial de Meta usando un campo personalizado que hayas creado a tal fin.

 

### Hubspot: sincronización de clientes potenciales

La integración de la sincronización de clientes potenciales de Hubspot no almacena el identificador de cliente potencial de Meta. Descarga tus clientes potenciales usando un webhook o una integración con socios para que puedas subir eventos para clientes potenciales de conversión. De manera alternativa, puedes sincronizar tus eventos usando la sincronización de etapa de ciclo de vida (solo la versión profesional y empresarial).


### CRM de Zoho: social

La integración social del CRM de Zoho no almacena el identificador de cliente potencial de Meta. Descarga tus clientes potenciales usando un webhook o una integración con socios para que puedas subir eventos para clientes potenciales de conversión.


### Microsoft Dynamics 365

Microsoft Dynamics 365 no admite la integración de clientes potenciales. Descarga tus clientes potenciales usando un webhook o una integración con socios para que puedas subir eventos para clientes potenciales de conversión.

 

## Descarga manual de archivos

El identificador de cliente potencial de Meta será la primera columna del archivo etiquetado id en el archivo .csv cuando descargues manualmente tus clientes potenciales desde el administrador de anuncios o Business Suite. Es posible que necesites quitar la etiqueta principal antes de usarla como clave de coincidencia.

 Nota: No se recomienda usar este método de descarga de clientes potenciales para realizar integraciones.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
