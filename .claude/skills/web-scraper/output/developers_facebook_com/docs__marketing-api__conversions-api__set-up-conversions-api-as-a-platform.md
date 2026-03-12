# La API de conversiones como plataforma - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform

---

La API de conversiones como plataforma - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Configurar la API de conversiones como plataforma

Si ofreces la configuración del píxel de Meta como parte de tus servicios de administración de etiquetas, es posible que desees considerar agregar funcionalidades de la API de conversiones. La integración con la API de conversiones permite a tus clientes enviar eventos web a Meta directamente, sin tener que confiar en los eventos del píxel del navegador.

 

## Eventos del servidor en comparación con los eventos del navegador

Antes de comenzar, es importante entender la relación existente entre los eventos del servidor y el píxel de Meta. Los eventos del servidor se envían mediante la API de conversiones y se usan en la medición, en la creación de informes y en la optimización de la misma manera que los eventos de píxel del navegador.

Si enviar eventos del píxel del navegador se compara a enviar correo por correo aéreo, enviar eventos del servidor es comparable con enviar correo a través de un flete. Ambos son mecanismos para transportar el paquete (datos sobre un evento) a una dirección de destino (un identificador del píxel). Por lo tanto, recomendamos que realices la integración de la API de conversiones en tu plataforma como una extensión de tu oferta actual del píxel de Meta (en lugar de un complemento o servicio separado), por las siguientes razones:

 - Los eventos del servidor usan el identificador del píxel como destino
- Los eventos del servidor se procesan de la misma manera que los eventos del navegador del píxel se envían una vez a Facebook
- La deduplicación será más fácil de implementar
- Facilidad de uso para los clientes. Por ejemplo, los eventos del servidor se pueden enviar de forma predeterminada junto con los eventos del navegador.
 Una vez que tu plataforma esté integrada con la API de conversiones, recomendamos enviar los mismos eventos web mediante el navegador y el servidor. Esta redundancia ayuda a asegurar la confiabilidad de la señal. Los eventos que previamente podrían haberse perdido del lado del navegador, por una variedad de razones relacionadas con la red, ahora se capturan a través de la API de conversiones.

Para enviar eventos a través del navegador y el servidor, debes configurar correctamente el mismo event_id para los eventos correspondientes. Esto permite a Facebook deduplicar adecuadamente tus eventos.

 

## Requisitos previos

 - Una plataforma web capaz de compartir eventos en Facebook. Por ejemplo, administrador de sitios web, administrador de etiquetas o plataforma AdTech.
- El aviso adecuado a los usuarios y el consentimiento apropiado otorgado por ellos para compartir datos de los eventos con Facebook, según lo requerido por las condiciones de las herramientas empresariales de Facebook.
- Un representante de Facebook
- Los requisitos previos estándar de la integración de la API de conversiones: 

El Administrador comercial
- Una app de Meta
- El píxel de Meta
- Un token de acceso
 Para empezar a ofrecer la API de conversiones como plataforma, tu app necesita pasar por la revisión de la app. Durante ese proceso, debes solicitar el nivel de acceso, la función y los permisos que se detallan a continuación:

 - Nivel de acceso: Acceso avanzado
- Función: Acceso estándar a la administración de anuncios
- Permisos: ads_management, pages_read_engagement y ads_read
 

## Primeros pasos

Si esta es la primera vez que usas la API de conversiones, sigue estos pasos para crear un negocio, una app de Meta, un píxel de Meta y un usuario del sistema. Entonces, podrás usar el token de acceso de usuario del sistema para enviar eventos del servidor mediante la API de conversiones.


### Paso 1: Crear un negocio.


### Paso 2: Crear una app de Meta en tu negocio recién creado.


### Paso 3: Crear un píxel de Meta en el negocio recién creado:

 - Ir al administrador de eventos.
- Selecciona Agregar nuevo origen de datos.
 

### Paso 4: Generar un token de acceso de usuario del sistema.


### Paso 5: Enviar un evento del servidor a tu píxel de Meta.

 

## Enviar eventos en nombre de los clientes

Una vez que haya enviado con éxito un evento del servidor a tu propio píxel de Meta, tienes opciones relacionadas con cómo enviar eventos en nombre de tus clientes.


### En relación con los píxeles de Meta que son propiedad o están administrados por el administrador comercial del socio

 - En administrador comercial, ve a la sección Usuarios y selecciona la pestaña Usuario del sistema. Haz clic en el usuario específico del sistema que usas para la API de conversiones.
- Ve al cuadro de diálogo Asignar activo y elige Píxeles. A continuación, selecciona los píxeles para los que deseas enviar eventos "On Behalf Of".
- En relación con los píxeles, selecciona el permiso Gestionar píxel y haz clic en Guardar cambios.
- Vuelve a la página de detalles de tu usuario del sistema. Verifica que los píxeles seleccionados se puedan ver allí.
 

### En relación con los píxeles de Meta que no administra el socio

Debes solicitar autorización para enviar eventos en nombre de tus clientes. Tienes las siguientes opciones de autenticación:


#### Extensión de Facebook para empresas (recomendado)

Con esta opción, la extensión de Facebook para empresas (FBE) devuelve toda la información necesaria para enviar eventos en nombre del cliente mediante el siguiente proceso. La FBE proporciona un punto de conexión para recuperar los tokens de acceso de los usuarios del sistema que se crearon en el administrador comercial del cliente. Este proceso incluye permisos para enviar eventos del servidor y se lleva a cabo de manera automática y segura.

El punto de conexión requiere un token de acceso del usuario como parámetro de entrada. En el caso de usuarios nuevos de la FBE, llama a este punto de conexión para recuperar el token de acceso del usuario del sistema cuando termines de configurar la FBE. Los usuarios preexistentes deben solicitar una nueva autenticación antes de llamar al nuevo punto de conexión de la API.


#### Tokens de acceso del usuario del sistema del cliente

Con esta opción, es necesario que pidas a tu cliente que cree manualmente un token de acceso del usuario del sistema mediante la API de conversiones dentro de la configuración del píxel. Luego, puedes enviar eventos al píxel del anunciante con ese token.

Un usuario o un administrador del sistema debe instalar la app que se usará para generar el token de acceso. Con esta configuración, la app puede hacer llamadas a la API en nombre de ese usuario o administrador del sistema.

Sigue nuestra documentación Primeros pasos y solicita un token de usuario del sistema a tu anunciante. Recuerda usar tu propio píxel de Meta y token de acceso para realizar las pruebas.


#### Compartir a través de un cliente un píxel de Meta con el administrador comercial del socio

Con esta opción, el cliente comparte su píxel de Meta con el socio mediante la configuración del administrador comercial o mediante la API. Entonces, puedes asignar el usuario del sistema socio al píxel del cliente y generar un token de acceso para enviar eventos del servidor.

 

## Atribuir eventos a tu plataforma con el campo partner_agent

Para atribuir eventos de la API de conversiones a tu plataforma, usa el campo partner_agent. De esta manera, puedes configurar el identificador de tu plataforma cuando envías eventos en nombre de un cliente. Trabaja con tu representante de Facebook para acordar un identificador para tu plataforma. Luego, envíalo con cada evento del servidor.


#### Carga útil de eventos de ejemplo

Si tu identificador de plataforma es datapartner, será un ejemplo de la carga útil del evento de compra enviada en nombre de tu cliente:

&#123;
 "data": [
 &#123;
 "user_data": &#123;
 "em": "8159ea0e33c51a774b83104ee562784f9b1836c852102046e4bd8385706fe7ca"
 &#125;,
 "event_name": "PageView",
 "event_time": 1579645238
 &#125;,
 &#123;
 "user_data": &#123;
 "em": "8159ea0e33c51a774b83104ee562784f9b1836c852102046e4bd8385706fe7ca"
 &#125;,
 "custom_data": &#123;
 "currency": "USD",
 "value": "50"
 &#125;,
 "event_name": "Purchase",
 "event_time": 1579645238
 &#125;
 ],
 "partner_agent": "datapartner"
&#125;


## Preguntas frecuentes

Why should we make the effort to integrate with the Conversions API if we already support the Meta Pixel?Sending events sent via the Conversions API is just like sending events via the Meta Pixel. The only difference is that the event is sent via the server, instead of the browser. So, why make an effort to integrate with the Conversions API? Here are some important use cases:


#### Capture offline and down-funnel events


If someone uses an advertisers’ website to sign up for a credit card, they can send events such as ViewContent, Application Start, and Application Submit via the browser to the Meta Pixel. However, the end user still needs to be approved for this credit card. The Approval event happens offline and cannot be sent via browser. To register this final step, the advertiser can send the Approval via the Conversions API.


#### Signal resiliency


Browser side events can be lost for many reasons:


 
- The user might navigate away before the page has finished loading.

- Ad blockers could prevent the event from firing.

- The changing internet landscape might change the way inter-domain messages are sent.

 

These examples can all be mitigated by sending events via the Conversions API.


#### Sensitive data


Many advertisers have expressed concerns about sharing data via the browser when that data could be seen or inspected. This can be mitigated by sending data via the Conversions API.


For example, advertisers may want to send data like profit margin or lifetime value (LTV) along with a purchase event. This way, ads can be optimized towards a specific type of customer.


 Enlace permanente As a platform, which of my data sources should support integration with the Conversions API? Since browser events are always vulnerable to obstacles, we recommend that you only send events collected from the Conversions API sources. For example, if:


 
- One of the ways your customer ingests data into your platform is via a browser JavaScript tag, or

- You send that data to Meta via the Conversions API

 

the data is open to the browser-side risks.


To take full advantage of the Conversions API, no part of the data flow should be reliant on the browser.


 Enlace permanente How can an advertiser tell if the connection to their Meta Pixel was successful? We recommend that you provide advertisers with a way to test this connection on your own platform.


 
- Send a test event via the Conversions API to the advertiser’s pixel. Look for a 200 return code.

- Update the status of the connection appropriately.

 
 Enlace permanente Will events sent by browser and Conversions API to a Meta Pixel be counted twice? Meta tries to deduplicate identical events sent through the Meta Pixel and the Conversions API. We determine if events are identical based on their event_id and event_name. For more information, see Handling Duplicate Pixel and Conversions API Events.


 Enlace permanente What is the external_id parameter and how is it used? The external_id parameter is a string that represents a user on an advertiser&#039;s system. These IDs help improve ads attribution and create audiences.


You can send external_ids via browser or the Conversions API, but you must be consistent across channels. For example, if you send a browser pixel event with external_id set to 123, your server event for that same user should also have external_id set to 123.


 Enlace permanente 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
