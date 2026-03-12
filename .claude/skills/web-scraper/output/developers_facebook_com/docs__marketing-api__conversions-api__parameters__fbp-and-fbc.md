# Parámetros fbp y fbc - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc

---

Parámetros fbp y fbc - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# ClickID y los parámetros fbp y fbc

En esta guía, se proporciona información sobre el ClickID de Meta y los parámetros _fbc y _fbp. Los parámetros _fbc y _fbp representan los valores de cookies del navegador y los puedes enviar con tus eventos de servidor. Consulta Información sobre la configuración de cookies del píxel de Meta.

Recomendamos que siempre envíes los valores de cookies _fbc y _fbp en los parámetros de eventos fbc y fbp, respectivamente, si están disponibles. Estos valores pueden cambiar entre distintas sesiones del navegador, por lo que recomendamos actualizar el perfil de un usuario con el valor más reciente, siempre que sea posible.

 

## ¿Qué es el ClickID de Meta?

ClickID es un parámetro generado por Meta que se pasa con la URL del sitio web de un anunciante cuando un usuario hace clic en un anuncio en Facebook y/o Instagram. Compartir el ClickID puede ayudarte a atribuir más conversiones y alcanzar a más personas, lo que puede mejorar el rendimiento del anuncio. La fijación automática del ClickID no afecta los otros parámetros de seguimiento personalizados que tienes activados.

Ejemplo de URL con ClickID: https://example.com/?fbclid=IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk


### Beneficios de ClickID

 - Aumenta el volumen de las conversiones
- Mejora la atribución y optimización de las campañas
- Mejora el rendimiento de los anuncios
 

## 1. Recuperar ClickID de Meta


### Recuperación desde el parámetro de consulta de URL fbclid

Siempre que se encuentre en los parámetros de búsqueda de la URL, intenta obtener el parámetro del lado del servidor leyéndolo desde la cadena de búsqueda de la URL de solicitud HTTP.

Ejemplo:

GET /?fbclid=IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk 
HTTP/2.0
Host: www.example.orgNota: El valor de ClickID distingue entre mayúsculas y minúsculas. No apliques ninguna modificación antes del uso, como cambiar las minúsculas o mayúsculas.

 

### Recuperación desde la cookie _fbc

El valor de ClickID está disponible dentro de la cookie _fbc en 2 casos:

 - El píxel de Meta está instalado en el sitio web. En este caso, el píxel de Meta almacena automáticamente el valor de ClickID en la cookie del navegador _fbc, una vez que está disponible.
- Ya lo tienes almacenado en la cookie desde el servidor o en almacenamiento de backend, y sigues las prácticas recomendadas enumeradas en la sección "Almacenar ClickID".
 En ambos casos, el ClickID formateado se puede obtener desde la cookie _fbc leyendo los encabezados de cookie de la solicitud HTTP. En la sección "Dar formato al ClickID", a continuación, encontrarás información sobre cómo formatear correctamente el ClickID.

 

## 2. Dar formato al ClickID

Si la cookie _fbc no está disponible porque no se ejecuta ningún píxel de Meta en el sitio web, puedes enviar el parámetro de evento fbc con el evento de la API de conversiones si hay un parámetro de consulta fbclid en la URL de la solicitud de la página actual.

El valor formateado del ClickID debe tener la forma version.subdomainIndex.creationTime.<fbclid>, donde:

 - version es el prefijo fb.
- subdomainIndex indica en qué dominio se define la cookie ("com" = 0, "ejemplo.com" = 1, "www.ejemplo.com" = 2).
- creationTime es la marca de tiempo UNIX en milisegundos desde el período en que se guardó la cookie _fbc. Si no guardas la cookie _fbc, usa la marca de tiempo la primera vez que observaste o recibiste este valor de fbclid.
- <fbclid> es el valor del parámetro fbclid de consulta en la URL de la página.
 Nota: Si usas la biblioteca del administrador de parámetros para formar fbc, el formato incluirá un apéndice al final. Para obtener más información, consulta la página de la página de la biblioteca del administrador de parámetros.

Este es un ejemplo de cómo podría ser el valor del parámetro fbc resultante (ten en cuenta que la parte <fbclid> no es válida):

fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890

## 3. Almacenar el ClickID

Nota: Antes de almacenar el ClickID, es fundamental darle formato como se describe más arriba, en la sección "Dar formato al ClickID", ya que así te asegurarás de que se envíe un valor válido a Meta a través de la API de conversiones.

 

### Configurar el ClickID formateado en la cookie _fbc de la respuesta HTTP

Se recomienda configurar _fbc de la siguiente manera:

 - Como cookie HTTP en los encabezados de la respuesta HTTP
- Con tiempo de caducidad de 90 días.
 Esto se debe hacer después de recuperarla del parámetro fbclid de la consulta de la URL o la cookie _fbc del navegador.

Ten en cuenta que solo debes configurar la cookie en estos casos:

 - Si la cookie _fbc no existe y ClickID se recuperó del parámetro fbclid de consulta de la URL
- Si fbclid en el parámetro de consulta de la URL no es igual al valor correspondiente en la cookie _fbc. En la cookie, fbclid corresponde a la cadena posterior al último "." del valor de la cookie.
 Ejemplo:

HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie:
_fbc=fb.1.1709136167115.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk; Expires=Thu, 21 Oct 2021 07:28:00 GMT;

### Almacenar el ClickID formateado en el servidor

Como alternativa a la opción de la cookie que se describe arriba, puedes almacenar y administrar el valor del ClickID en tu almacenamiento de backend. En este caso, deberás asegurarte de almacenar y enviar el valor más reciente que obtuviste del parámetro de consulta de la URL, si está presente.

 

## 4. Enviar el parámetro fbc con eventos de la API de conversiones

Después de obtener el valor del ClickID, debes darle el formato correcto antes de enviarlo con un evento a través de la API de conversiones (consulta las instrucciones a continuación). Te recomendamos enviar el parámetro fbc con cada evento que envíes a la API de conversiones.

Nombre del parámetro: fbc

Valor del parámetro: debe tener la forma version.subdomainIndex.creationTime.fbclid, donde:

 - version siempre es este prefijo: fb.
- subdomainIndex indica en qué dominio se define la cookie ("com" = 0, "ejemplo.com" = 1, "www.ejemplo.com" = 2). Si generas este campo en un servidor y no guardas una cookie _fbc, usa el valor 1.
- creationTime es la marca de tiempo del momento en que se guardó la cookie _fbc, expresada en milisegundos desde la época UNIX. Si no guardas la cookie _fbc, usa la marca de tiempo de la primera vez que observaste o recibiste este valor de fbclid.
- fbclid es el valor del parámetro fbclid de consulta en la URL de la página.
 Valor (ejemplo):

fb.1.1554763741205.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgkEjemplo de carga de la API de conversiones:

&#123;
 "data": [
 &#123;
 "event_name": "Purchase",
 "event_time": 1712248396,
 "action_source": "website",
 "user_data": &#123;

 "fbc": "fb.1.1554763741205.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk",

 "em": ["7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"],
 "ph": ["6069d14bf122fdfd931dc7beb58e5dfbba395b1faf05bdcd42d12358d63d8599"],
 &#125;,
 "custom_data": &#123;
 "currency": "USD",
 "value": "142.52"
 &#125;
 &#125;
 ]
&#125;

## Asistentes de integración


### Asistente de carga útil

El asistente de carga útil es una herramienta que te permite construir la carga útil de la solicitud de la API de conversiones a fin de asegurarte de que se envíen a Meta datos con el formato correcto. Además, incluye el SDK para empresas en diferentes lenguajes de programación, que puedes usar para la integración con la API de conversiones. Están disponibles cuando haces clic en el botón "Obtener código" dentro de la sección "Generar código".

 

## fbp

Cuando el píxel de Meta está instalado en un sitio web y utiliza cookies de origen, el píxel guarda automáticamente un identificador único en una cookie _fbp en relación con el dominio del sitio web, si dicho dominio aún no existe.

El valor del parámetro fbp del evento debe tener la forma version.subdomainIndex.creationTime.randomnumber, donde:

 - version es siempre este prefijo: fb
- subdomainIndex es en qué dominio se define la cookie ("com" = 0, "ejemplo.com" = 1, "www.ejemplo.com" = 2). Si generas este campo en un servidor y no guardas una cookie _fbp, usa el valor 1.
- creationTime es la marca de tiempo del momento cuando se guardó la cookie _fbp, expresada en milisegundos desde la época UNIX. Si no guardas la cookie _fbp, usa la marca de tiempo de la primera vez que observaste o recibiste este valor fbp.
- El SDK del píxel de Meta genera Randomnumber para asegurar que cada cookie _fbp sea única.
 Nota: Si usas la biblioteca del administrador de parámetros para formar fbc, el formato incluirá un apéndice al final. Para obtener más información, consulta la página de la página de la biblioteca del administrador de parámetros.

Aquí hay un ejemplo de cómo podría ser el valor fbp:

 
fb.1.1596403881668.1116446470
 

## Más información

 - Consulta la guía de compatibilidad del píxel en relación con cualquier problema vinculado con los parámetros de consulta que faltan o las redirecciones rotas.
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
