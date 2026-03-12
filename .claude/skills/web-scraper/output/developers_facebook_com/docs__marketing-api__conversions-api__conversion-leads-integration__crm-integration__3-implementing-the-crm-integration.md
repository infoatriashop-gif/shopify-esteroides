# 3: Implementación por desarrolladores - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/3-implementing-the-crm-integration

---

3: Implementación por desarrolladores - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# 3: Implementación por desarrolladores

Esta página brinda información sobre la integración manual y trata los siguientes temas:

 - Construir la carga útil para la integración de CRM
- Generar un token de acceso y preparar una llamada a la API
- Enviar una carga útil de prueba
- Enviar datos de producción
 Esta sección solo se aplica si decides completar esta integración usando una integración manual y recursos para desarrolladores. En cambio, si decides completar esta integración usando un socio, sigue las instrucciones respectivas del socio para realizar la integración. Puedes omitir la sección 4: Verificar tus datos de esta guía una vez que se complete la integración con socios.

Necesitarás acceso de administrador en el administrador comercial para completar estos pasos de integración. Puedes obtener acceso desde el correo electrónico que se te envió si te invitaron como desarrollador. De lo contrario, ponte en contacto con un administrador del administrador comercial para solicitar acceso.

 

## Paso 1: Crear una carga útil

Este paso mostrará las especificaciones de la carga útil relativa a la integración de CRM de la API de conversiones y proporcionará algunas recomendaciones sobre cómo enviarla desde tu servidor.

 - Abre la guía de integración de CRM desde la pestaña Configuración de tu píxel del CRM para empezar.

- Revisa la guía de desarrolladores de la API de conversión para entender cómo funciona la API de conversión.

- Recomendamos usar el asistente de carga útil para crear tu carga útil. El asistente de carga útil dará formato a tu carga útil y comprobará si hay errores. Una vez resueltos todos los errores de la carga útil, haz clic en el botón Obtener código dentro del asistente de carga útil para generar una plantilla de código para tu lenguaje de programación.

- Aquí encontrarás la lista de parámetros obligatorios. Revisa la integración de clientes potenciales de conversión - Guía de especificaciones de la carga útil para consultar la descripción completa de cada parámetro. Esta especificación de carga útil solo deberá usarse para eventos de optimización de clientes potenciales de conversión. Esto significa que los eventos solo deben pertenecer a los anuncios para clientes potenciales de Meta. No uses esta especificación de carga útil para otros tipos de eventos, como los clientes potenciales de sitios web. Parámetros obligatoriosNombreDescripciónevent_name
 cadena
 Campo sin formato para capturar las etapas de cliente potencial que usas en el CRM.El parámetro event_name deberá indicar que un cliente potencial recorre el embudo de ventas de tu CRM. Asegúrate de enviar todas las etapas a medida que se actualizan, incluso los clientes potenciales sin procesar.event_time
 entero
 Una marca de tiempo de UNIX en segundos que indica cuándo tu CRM actualiza el evento de actualización de la etapa de cliente potencial. La marca de tiempo debe darse después del tiempo de generación de clientes potenciales o, de lo contrario, el evento puede descartarse.action_source
 cadena
 Valor:system_generated(Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos).user_data
 objeto
 Mapa que contiene información de los clientes. Consulta Parámetros de información de los clientes para ver las opciones. Consulta Coincidencias avanzadas para obtener información sobre las opciones comparables disponibles en caso de que se envíen los datos mediante el píxel de Meta.lead_event_source
 cadena
 El nombre del CRM de donde provienen los eventos.event_source
 cadena
 Valor:crmParámetros de información de los clientes La información de los clientes permite que Meta empareje eventos de tu servidor con cuentas de Meta. Enviar información sobre tantos de los siguientes parámetros como sea posible puede generar datos de eventos más precisos y un mejor rendimiento de los anuncios.Nota: Debes enviar al menos un parámetro de información del cliente.Si envías lead_id, usa un lead_id válido o el sistema rechazará el evento. Si decides enviar un correo electrónico o número de teléfono, los datos deben estar cifrados. Por el momento, el identificador de clic no cuenta con un error de rechazo en la API, pero una gran cantidad de click_id inválidos desencadenarán una alerta en el sistema.ParámetroPrioridadDescripciónIdentificador de clientes potenciales (recomendado) Cómo encontrar el identificador de clientes potencialesPrincipalEl identificador generado por Facebook para cada cliente potencial. Es un número de 15 a 17 dígitos que se obtiene del campo leadgen_id del webhook de generación de clientes potenciales y se incluye en el parámetro user_data.Consulta Encontrar el identificador de clientes potenciales para obtener más información.Identificador de clicPrincipalCorreo electrónico cifradoPrincipalNúmero de teléfono cifradoAltaOtra información de contacto cifradaMediaNota: Además de los parámetros de correo electrónico y número de teléfono cifrados, puedes enviarle a Meta parámetros cifrados de género, fecha de nacimiento, apellido, nombre, ciudad, estado y código postal, entre otros.Ejemplo Un ejemplo de carga útil puede tener este aspecto. 
 

&#123;
 "data": [
 &#123;
 "event_name": "Lead",
 "event_time": 1664577963,
 "action_source": "system_generated",
 "user_data": &#123;
 "lead_id": 1234567890123456,
 "em": [
 "973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b"
 ],
 "ph": [
 "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b"
 ]
 &#125;,
 "custom_data": &#123;
 "lead_event_source": "Your CRM",
 "event_source": "crm"
 &#125;
 &#125;
 ]
&#125;

- Si los eventos no siguen la especificación de la carga útil o no coinciden con un anuncio de clientes potenciales de Meta, la integración no los reconocerá y no se usarán para entrenar al modelo. Por ejemplo, la API de conversiones aceptará la carga útil web y aparecerá en el administrador de eventos, pero esta integración no la reconocerá. También, debes usar un lead_id válido o el sistema rechazará el evento.Nota: Debes enviar al menos un parámetro de información del cliente. Si envías lead_id, usa un lead_id válido o el sistema rechazará el evento. Si decides enviar un correo electrónico o número de teléfono, los datos deben estar cifrados. Por el momento, el identificador de clic no cuenta con un error de rechazo en la API, pero una gran cantidad de click_id inválidos desencadenarán una alerta en el sistema.Solo la carga útil de clientes potenciales de conversión se reconocerá para la integración y se usará durante el entrenamiento.
 

## Paso 2: Crear un token de acceso y una llamada a la API

Una vez que configures lo que vas a enviar, el siguiente paso es configurar a dónde enviar los datos.

Este paso te ayudará a generar un token de acceso a tu píxel de Meta, que, luego, se usará para establecer una conexión entre tu servidor y la API de conversiones.

 - Puedes volver a consultar la guía de integración con CRM desde la pestaña Configuración de tu píxel del CRM.

- Desplázate hacia abajo hasta la sección Crear punto de conexión y haz clic en el botón Generar token de acceso. El token de acceso se usará para crear tu llamada a la API. Puedes generar un nuevo token de acceso si vuelves a la guía de integración, o bien desde la pestaña Configuración en el administrador de eventos, si vas a la sección API de conversiones y haces clic en el enlace Generar token de acceso.

- El resto de esta guía variará en función de si usas el SDK de Meta. Se recomienda usar el SDK de Meta para empresas, porque proporciona mejores mensajes de error y diagnóstico. Necesitarás tu identificador del píxel y token de acceso para hacer la llamada a la API mediante el SDK de Meta para empresas. Puedes obtener el token de acceso si haces clic en Copiar token del acceso en la guía de integración con CRM y lo guardas. Es posible consultar ejemplos de llamadas a la API del SDK en la guía para desarrolladores de la API de conversión o en la funcionalidad Obtener código dentro del asistente de carga útil de Meta.

- Este es el formato del punto de conexión para hacer una solicitud POST a la API de conversiones sin el SDK. Puedes obtener el punto de conexión completo haciendo clic en Copiar punto de conexión en la guía de integración con CRM y guardándolo. 

https://graph.facebook.com/API_VERSION/PIXEL_ID/events?access_token=ACCESS_TOKENAPI_VERSION: La versión actual de la API de marketing
- PIXEL_ID: El identificador del píxel se puede obtener en el administrador de eventos de los píxeles
- ACCESS_TOKEN: El token de acceso generado arriba
 - Puedes ver las fechas de lanzamiento y caducidad de la API de marketing en la documentación de la versión de la API. Asegúrate de actualizar la versión de la API o el SDK de Meta para empresas en tu código antes de la fecha de caducidad de la API de marketing. Usar una versión obsoleta en tu código podría generar errores, y es posible que el sistema descarte tus eventos.
 

## Paso 3: Probar una carga útil (opcional)

En este punto, es posible que desees enviar una carga útil de prueba a tu píxel antes de implementar el código en tu servidor. Puede hacerlo usando la pestaña Probar eventos en el administrador de eventos.

 - En la sección Probar eventos del servidor, haz clic en el enlace del explorador de la API Graph. Con este enlace único, se completará información de tu píxel (también puedes acceder directamente al explorador de la API Graph si lo deseas). Toma nota del valor test_event_code, que puede cambiar con el tiempo.

- Completa lo siguiente en la herramienta del explorador de la API Graph:
 Asegúrate de estar en modo POST.
- Comprueba que tu versión de la API y el identificador del píxel sean correctos.
- Cámbiate a la vista de JSON.
- Introduce tu carga útil. Esto se puede crear o generar manualmente usando el asistente de carga útil. Asegúrate de incluir el parámetro test_event_code del paso anterior y un lead_id válido.
 - Introduce tu token de acceso al píxel y haz clic en el botón Enviar.

- Si tu carga útil no contiene ningún error de sintaxis ni de la API, deberías recibir un mensaje de transacción correcta con un fbtrace_id.

- El evento de prueba debe aparecer en la pestaña Probar eventos en el administrador de eventos después de un corto tiempo.
 

## Paso 4: Enviar datos de producción

Los datos de producción deben estar en el mismo formato que la carga útil generada en el paso 3, excepto que los datos provengan directamente de tu servidor. Este paso variará según la integración, por lo que esta sección brindará normas en vez de un recorrido.

 - Envía el parámetro lead_id (recomendado) y otros parámetros de información del cliente adicionales para el emparejamiento.

- Asegúrate de enviar todas las etapas de clientes potenciales a medida que se actualizan, incluso el evento de los clientes potenciales sin procesar que representa a todos los clientes potenciales generados en Meta y descargados en tu CRM. A continuación, encontrarás un embudo de ejemplo. Los anunciantes son quienes definen los nombres y las etapas de los eventos para que no tengan la necesidad de ajustarse a este ejemplo.
 
 
 Si tus campañas generan 100 clientes potenciales, esperaremos contar con 100 eventos de "de clientes potenciales sin procesar" subidos para representar la primera etapa de cliente potencial. Al enviarse la primera etapa de cliente potencial, el sistema sabrá que se recibieron y procesaron los clientes potenciales. A medida que los clientes potenciales avancen por el embudo de ventas, se espera que se suban 70 etapas de "clientes potenciales calificados en marketing", 30 etapas de "oportunidades de venta" y 15 etapas de "convertidos". Para recapitular: se generan 100 clientes potenciales a partir de las campañas, pero esperamos que se suban 215 eventos en esta situación de ejemplo.

- Crea una función que recupere actualizaciones de la API o base de datos de tu CRM cada vez que se actualice el estado de clientes potenciales. Luego, envía tu carga útil a la API de conversiones de Meta usando una función personalizada o el SDK de Meta para empresas. Qué es lo que tiene más sentido para tu integración dependerá de tu CRM y de la configuración de tu base de datos. Se recomiendan variables para lo siguiente: 
 lead_id
- event_name
- event_time
 
 Por ejemplo, una carga útil que establece explícitamente los valores de los parámetros puede tener este aspecto:
 
 
&#123;
 "event_name": "initial_lead",
 "event_time": 1628294742,
 "user_data": &#123;
 "lead_id": 1234567890123456
 &#125;,
 "action_source": "system_generated",
 "custom_data:" &#123;
 "lead_event_source": "Salesforce",
 "event_source": "crm"
 &#125;
&#125;
 
 
 Una carga útil que pasa valores de tu base de datos usando variables puede tener este aspecto:
 
 
&#123;
 "event_name": lead_stage // "initial_lead"
 "event_time": unix_time // 1628294742
 "user_data": &#123;
 "lead_id": fb_lead_id // 1234567890123456
 &#125;,
 "action_source": "system_generated",
 "custom_data:" &#123;
 "lead_event_source": "Salesforce",
 "event_source": "crm"
 &#125;
&#125;
 
- Sube datos al menos una vez al día. Idealmente, las llamadas a tu CRM deberán hacerse en tiempo real, pero puedes emplear métodos de creación de lotes por hora o por día si no es factible una integración en tiempo real. Si eliges los métodos de lote, asegúrate de capturar el historial de cambios de estado de los clientes potenciales en lugar de una versión de los clientes potenciales cuando crean lotes. Por ejemplo, si el estado de un cliente potencial se actualiza 3 veces entre lotes, esperaríamos 3 eventos para este cliente potencial en lugar de solo la actualización final. Nota: Cada lote puede incluir hasta 1.000 eventos. Si hay un error en el lote, todo el lote se descartará, por lo que recomendamos ALTAMENTE emplear lotes más pequeños y agregar lógica para volver a intentarlo.

- Opcional. Recomendamos registrar los mensajes de error de la llamada de la API de conversiones y crear alertas en caso de que haya problemas. También resulta una buena idea manejar las excepciones de estos errores.

- Puedes rellenar tus datos hasta de los últimos 7 días. La diferencia horaria se calcula entre event_time y upload_time. Rellenar algunos datos puede acelerar el proceso de entrenamiento.

 ADVERTENCIA: No intentes llenar más de 7 días de datos modificando los valores event_time. El modelo se basa en una marca de tiempo precisa para optimizarlo. Hacerlo puede provocar que todos tus datos rellenados se desechen.
- Asegúrate de que tus valores event_time vayan después de la marca de tiempo de generación de clientes potenciales. De lo contrario, es posible que se descarten tus eventos.

- Deberías empezar a ver los eventos en el administrador de eventos de tu píxel en una hora si tu integración está subiendo eventos a Meta. Recuerda usar un lead_id válido en tus cargas útiles para que aparezcan los eventos. Abre los eventos que se enviaron a la integración del CRM de clientes potenciales de conversión en el administrador de eventos y revisa que tengan los parámetros personalizados lead_event_source y event_source completos. Si el evento no tiene estos parámetros, no se registrará como evento de clientes potenciales de conversión.
- El sistema verificará si alguno de tus eventos son eventos de conversión de clientes potenciales válidos. Después de 1 día, aparecerá una marca verde junto al paso de la integración Enviar un evento de CRM si se detecta un evento válido.
 ← Anterior 2: Getting Started With the CRM Integration → Siguiente 4: Verify Your Data 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
