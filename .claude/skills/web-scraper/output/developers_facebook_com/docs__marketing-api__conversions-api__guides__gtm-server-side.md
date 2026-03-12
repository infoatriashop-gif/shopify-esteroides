# API de conversiones para Google Tag Manager - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/guides/gtm-server-side

---

API de conversiones para Google Tag Manager - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# API de conversiones para Google Tag Manager del lado del servidor (GTM)

La API de conversiones se diseñó para crear una conexión directa entre tus datos de marketing y los sistemas que ayudan a optimizar la segmentación de anuncios, reducir el costo por acción y medir los resultados en las tecnologías de Meta. Puedes ajustar la configuración de un servidor que configuraste en Google Cloud Platform (GCP) o cualquier otro proveedor en la nube para enviar datos clave de eventos web y sin conexión mediante la API de conversiones. Si realizas este paso y configuraste la etiqueta web de Google Analytics 4 (GA4), puedes enviar los datos a tu propio servidor alojado en Google Cloud Platform (GCP) y, en última instancia, a Meta mediante la API de conversiones.

Meta escribe y mantiene la etiqueta de la API de conversiones en función de la plantilla de etiquetas personalizada de Google. Ponte en contacto con Google si tienes alguna pregunta sobre cómo configurar sus productos, o bien consulta la documentación para desarrolladores de Google.

En este documento, se describe lo siguiente:

 - Requisitos previos, incluso cómo crear un contenedor de servidor
- Cómo configurar el contenedor para que sea compatible con la implementación de la etiqueta web de GA4
- Cómo enviar datos del sitio web al servidor de GCP
- Cómo compartir esos datos con Meta mediante la API de conversiones
- Preguntas frecuentes
 

## Requisitos previos

Antes de seguir con esta integración, te recomendamos los siguiente:

 - Familiarízate con la integración de la API de conversiones y las prácticas recomendadas de configuración.
- Conoce bien el etiquetado del lado del servidor y la plantilla de etiquetas personalizada.
 Si tu sistema usa una versión anterior a GA4, deberás actualizar la configuración previa del administrador de etiquetas para poder usar GA4 antes de continuar con la integración.

 

## Integración


### Crear un contenedor de servidor de GTM

Esto te permite administrar y almacenar etiquetas de seguimiento y marketing. También te ayuda a registrar cómo los usuarios interactúan con tu sitio web.

Deberás configurar un contenedor de servidor y un contenedor web:

 - Contenedor web: si es la primera vez que usas GTM, comienza por instalar un contenedor web en tu cuenta. Obtén más información aquí.
- Contenedor de servidor: deberás crear un contenedor de servidor en tu portal de GTM para configurar una URL de servidor de etiquetado. Obtén más información sobre este paso.
 Visita el sitio web de Google Tag Manager.


#### Crear un nuevo contenedor

Si ya tienes una cuenta, selecciónala. De lo contrario, crea una nueva cuenta de GTM.

 - Haz clic en Crear contenedor.
- Asigna un nombre a tu servidor y selecciona "Servidor" como plataforma de destino.
- Haz clic en Crear.
 Para configurar un contenedor de servidor, debes configurar un servidor de etiquetado. La implementación predeterminada de GCP se puede completar con la configuración del contenedor del servidor. Consulta las siguientes instrucciones. Para obtener información sobre los demás proveedores en la nube (por ejemplo, AWS o Microsoft Azure), consulta la guía de configuración manual del servidor.

Configurar contenedores web y de servidor

 - En el contenedor web, crea los siguientes artefactos:

Configuración de GA4 para establecer tu URL de servidor de etiquetado.
- Evento de GA4 para configurar el esquema de eventos que se entregará al servidor.
 - En tu contenedor de servidor, crea los siguientes artefactos:

Cliente GA4, una función de captura del evento que activa el evento en Meta.
- Etiqueta de la API de conversiones de Meta, una etiqueta del lado del servidor que convierte el modelo de evento estándar del cliente GA4 en esquemas de eventos de la API de conversiones y los envía a graph.facebook.com.
 

## Paso 1: Configuración de GA4. Configura la URL del servidor de etiquetado

Configura el contenedor web para enviar los datos de tu sitio web al servidor de etiquetado que se creó. Obtén más información sobre cómo configurar Google Analytics: etiqueta de configuración de GA4.

 - Si seleccionas Enviar al contenedor de servidor, configura la URL del contenedor de servidor como la URL del servidor de etiquetado.
- Si no seleccionas Enviar al servidor de contenedor, en Campos para configurar, haz clic en Agregar fila y configura lo siguiente:

Nombre del campo: transport_url
- Valor del campo: la URL del servidor de etiquetado
 Puedes configurar más campos para cualquier otro parámetro que quieras enviar para todos los eventos.

 - Configura la marca "first_party_collection" en "true". Debes hacerlo para poder pasar los parámetros user_data al GTM del lado del servidor. En Campos para configurar, haz clic en Agregar fila y configura lo siguiente:

Nombre del campo: first_party_collection
- Valor del campo: true
 

### Usar una etiqueta de configuración de GA4 preexistente

Si ya tienes una configuración de GA4, puedes modificarla o crear una etiqueta de configuración adicional para el GTM del lado del servidor.

Si es la primera vez que configuras el GTM del lado del servidor, al agregar la URL del contenedor de servidor, tu tráfico comenzará a enviarse a este contenedor. Si quieres continuar enviando datos a GA4, deberás agregar la etiqueta de GA4 del lado del servidor al contenedor de servidor y asegurarte de que se active en todos los eventos. Es posible que debas crear etiquetas de evento de GA4 adicionales o modificar las actuales para asegurarte de que se complete la asignación a los eventos del píxel de Meta.


### Enviar identificadores del navegador y de clics de Meta

Si configuraste un dominio personalizado y el dominio de tu servidor de etiquetado de GTM es de origen, los identificadores del navegador y de clics de Meta se envían de forma automática.

Si usas el dominio predeterminado que se proporciona o notas que los campos "Identificador del navegador" e "Identificador de clics" no se están enviando en el administrador de eventos, puedes configurarlos de la siguiente manera:

 - Navega a la sección de variables y crea una nueva variable definida por el usuario, tanto para el identificador del navegador como para el identificador de clics de Meta. Usa el tipo de variable "Cookie de origen".

En el identificador del navegador de Meta, configura el nombre de la cookie como _fbp
- En el identificador de clics de Meta, configura el nombre de la cookie como _fbc
 - Guarda estas variables.
- En la etiqueta de configuración de GA4, en Campos para configurar, haz clic en Agregar fila y configura lo siguiente:

Nombre del campo: x-fb-ck-fbp
- Valor del campo: tu variable del identificador del navegador de Meta
 - Agrega una fila para el identificador de clics:
- Nombre del campo: x-fb-ck-fbc
- Valor del campo: tu variable del identificador de clics de Meta
 Crea una variable de capa de datos para cada uno de los parámetros del esquema de eventos comunes de user_data. Obtén información sobre cómo configurar variables de capas de datos. Por ejemplo, para pasar una dirección de correo electrónico al GTM del lado del servidor, crea una variable (por ejemplo, user_data_email_address) que se pueda asignar al nombre de la variable de la capa de datos, eventModel.user_data.email_address.

Si no usas la capa de datos, configura variables para cada parámetro, como se indica a continuación, y úsalas en su lugar. A continuación, se muestra una lista de todas las asignaciones de los parámetros "user_data" de Meta y GTM, y su prioridad general en relación con la mejora de la calidad de coincidencias de eventos. A fin de aprovechar los anuncios de Meta al máximo, te sugerimos que sigas las prácticas recomendadas de uso de la API de conversiones cuando configures una integración. Si ya configuraste la API de conversiones, te sugerimos que tengas en cuenta estas prácticas recomendadas para mejorar la configuración preexistente. Estas prácticas recomendadas de uso de la API de conversiones te pueden ayudar a mejorar el rendimiento de los anuncios y a reducir el costo por acción.

 Parámetro de la API de conversiones de Meta Nombre del campo de GA4 Nombre de la variable de la capa de datos de GTM Prioridad Correo electrónico

email_address(em)

 user_data.email_address

 eventModel.user_data.email_address

 Alta

 Identificador de clic

fbc

 x-fb-ck-fbc

 N/D

 Alta

 Identificador del inicio de sesión con Facebook fb_login_id

 user_data.fb_login_id

 N/D

 Media

 Fecha de nacimiento

db

 x-fb-ud-db

 N/D

 Media

 País

country(country)

 user_data.address.country

 eventModel.user_data.address.country

 Media

 Número de teléfono

phone_number(ph)

 user_data.phone_number

 eventModel.user_data.phone_number

 Media

 Identificador externo

external_id

 x-fb-ud-external_id

 N/D

 Media

 Identificador de navegador

fbp

 x-fb-ck-fbp

 N/D

 Media

 Estado

state(st)

 user_data.address.region

 eventModel.user_data.address.region

 Media

 Género

ge

 x-fb-ud-ge

 N/D

 Media

 Nombre

first_name(fn)

 user_data.address.first_name

 eventModel.user_data.address.first_name

 Baja

 Apellido

last_name(ln)

 user_data.address.last_name

 eventModel.user_data.address.last_name

 Baja

 Ciudad

city(ct)

 user_data.address.city

 eventModel.user_data.address.city

 Baja

 Código postal postal_code(zip)

 user_data.address.postal_code

 eventModel.user_data.address.postal_code

 Baja

 


## Paso 2: Evento de GA4. Configura el esquema de eventos que se entregará al servidor

 - Configura el contenedor web para enviar los datos de tu sitio web al servidor de etiquetado que se creó para agregar Google Analytics. Obtén más información sobre cómo configurar Google Analytics: etiqueta de configuración de GA4.
- Agrega Google Analytics: etiqueta de evento de GA4 a Workspace desde la galería de plantillas:Configura un nombre de evento para la etiqueta. Puedes configurarlo como valor estático o para que lea desde una variable. En algunos eventos estándar, asignaremos eventos estándar de Google Analytics a equivalentes de Meta. En estos eventos, puedes usar el nombre del evento de Google Analytics o de Meta. En el resto de los eventos estándar, usa el nombre de evento de Meta. En los eventos personalizados, usa el nombre del evento personalizado. Más información.
 Nombre del evento estándar de Meta Nombre del evento de Google Analytics AddPaymentInfo

 add_payment_info

 AddToCart

 add_to_cart

 AddToWishlist

 add_to_wishlist

 PageView

 gtm.dom

 PageView

 page_view

 Purchase

 purchase

 Search

 search

 InitiateCheckout

 begin_checkout

 Lead

 generate_lead

 ViewContent

 view_item

 CompleteRegistration

 sign_up

 
 - En la sección de parámetros de eventos:Si usas el píxel de Meta, agrega el parámetro de identificador de evento. Usa event_id como nombre del parámetro y la variable creada para el identificador del evento como valor del parámetro. Consulta la sección Deduplicación para obtener consejos sobre cómo crear la variable del identificador del evento y modificar el píxel de Meta.
- Asigna cada parámetro que quieras configurar. El nombre de la variable se leerá desde el evento usando un esquema de evento común. Por ejemplo, para configurar el correo electrónico como parámetro de evento, debes definirlo con el nombre de parámetro user_data.email_address y configurar el valor como nombre de variable que lea la email_address (definida previamente en la sección 1).
- Para ver la lista completa, consulta la sección Parámetros de datos personalizados, a continuación.
 

## Paso 3: Crea una función de escucha para el evento que activa el evento en Meta

Todos los contenedores del lado del servidor de GTM incluyen un cliente GA4 predeterminado para escuchar los eventos que se configuraron desde la etiqueta web de GA4. El cliente GA4 escucha la ruta /g/collect en la URL de tu servidor de etiquetado y envía el eventModel a la etiqueta inmediatamente inferior. Si el cliente GA4 predeterminado ya está instalado en el contenedor de servidor, en la sección "Clientes", puedes continuar con el paso 4.

 

## Paso 4: Crea una etiqueta de la API de conversiones de Meta, una etiqueta del lado del servidor que convierte el modelo de evento estándar del cliente GA4 en esquemas de eventos de la API de conversiones y los envía a graph.facebook.com.

Para enviar el evento a la API de conversiones, debes instalar la etiqueta de la API de conversiones de Meta desde la galería de plantillas. El repositorio facebookincubator denomina Etiqueta de API de conversiones a la plantilla de la etiqueta. Se puede configurar esta etiqueta para que se active con los eventos que recibe el cliente GA4 del paso anterior y para que los envíe a la API de conversiones. Para instalar la etiqueta de la API de conversiones de Meta, deberás disponer de un identificador del píxel y un token de acceso, y especificar el origen de acción como "sitio web". Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos.

 

## Probar la integración

Recomendamos usar el modo de vista previa de Google Tag Manager para probar las integraciones antes de publicar cambios. Tanto los contenedores web como los contenedores de servidor tienen modos de vista previa, y puedes ejecutar ambos al mismo tiempo.

 Si cambias la configuración en el modo de vista previa, no olvides reiniciar el modo para asegurarte de que los cambios se reflejen durante la prueba.

 Puedes usar la función "Probar eventos" del administrador de eventos para verificar que los eventos del servidor se reciban correctamente. Para encontrar la herramienta, ve a Administrador de eventos > Orígenes de datos > Tú píxel > Probar eventos.

La herramienta "Probar eventos" genera un identificador de prueba. Envía el identificador de prueba como un parámetro test_event_code en la etiqueta de la API de conversiones para empezar a ver la actividad del evento en la ventana de la herramienta "Probar eventos". No olvides eliminarlo antes de publicar cualquier cambio.

La herramienta "Probar eventos" te permite ver si los eventos se reciben y se deduplican correctamente. Si no ves eventos después de uno o dos minutos, revisa el depurador del lado del servidor de GTM para asegurarte de que la solicitud se haya enviado:

 - En el depurador del lado del servidor, elige el evento relevante que quieras revisar en el menú de la izquierda.
- Confirma que la etiqueta aparezca en la sección de etiquetas activadas. Si es así, verás "Etiqueta de la API de conversiones: correcta" o "Etiqueta de la API de conversiones: incorrecta".

Etiqueta no activada: revisa el activador de la etiqueta de la API de conversiones y el activador del evento de GA4 correspondiente en el contenedor web. Confirma que el evento de GA4 se haya activado en el depurador web.
- Etiqueta activada correctamente: haz clic en la etiqueta y comprueba que el código para probar eventos sea correcto. Actualiza el código de evento de prueba si es necesario y reinicia el modo de vista previa.
- Error al activar la etiqueta: abre la pestaña de solicitud y haz clic en la solicitud que se envió a https://graph.facebook.com. Revisa la respuesta en la parte inferior de los detalles de la solicitud para ver cuál fue el error y actualiza la integración según corresponda. Recuerda reiniciar el modo de vista previa después de haber hecho cambios.
 Cuando los eventos se muestren, verifica que los identificadores de cada evento se envíen correctamente y que todas las claves de coincidencia y los parámetros de datos personalizados esperados también se muestren correctamente. La herramienta para probar eventos te mostrará si los eventos se deduplican correctamente. Si los identificadores del evento son diferentes, asegúrate de que las etiquetas de GA4 y del píxel de Meta se activen con el mismo activador y revisa la implementación de tu variable de identificador del evento.

 

## Deduplicación

Te recomendamos usar una configuración de eventos redundantes y compartir los mismos eventos desde la API de conversiones y tu píxel de Meta. Asegúrate de que ambos eventos usen el mismo event_name y de que se incluya event_id o una combinación de external_id y fbp.

Esto ayudará a Meta a deduplicar eventos y reducir la generación de informes dobles de eventos idénticos. Obtén más información sobre la deduplicación, cuándo es necesaria y cómo configurarla. "external_id" y "fbp" son soluciones alternativas de deduplicación, que también ayudan a mejorar la calidad de la configuración. Te recomendamos incluir estos tres parámetros, si es posible.

GTM tiene distintas maneras de configurar un parámetro con los mismos valores en una etiqueta de servidor y una etiqueta de navegador. Una consiste en usar el mismo evento GA4 para activar tu evento de etiqueta del píxel de Meta y tu evento de servidor. Para lograrlo, haz lo siguiente:

 - Usa el mismo activador en tu etiqueta HTML personalizada del píxel de Meta y tu etiqueta de evento de GA4. Por ejemplo, podrías definir una condición de activación basada en la URL de la página de confirmación del pedido.
- Usa el mismo event_id en ambas etiquetas:
 Configura un identificador único desde el cliente: establece un parámetro personalizado (x-fb-event_id) desde el evento "gtag". Genera un identificador único (por evento) en el sitio web usando un método javascript (o la variable javascript personalizada del Google Tag Manager) y fija el valor del evento de esta manera:
gtag(&#039;event&#039;, &#039;purchase&#039;, &#123;
 &#039;x-fb-event_id&#039;: generateEventId(),
...:...

 &#125;);
 
 
 Puedes crear una variable que redirija a la variable javascript personalizada que se mostró con anterioridad. Cuando se haga referencia a la variable, la variable javascript se cargará en línea:
 function() &#123;
var gtmData = window.google_tag_manager[&#123;&#123;Container ID&#125;&#125;].dataLayer.get(&#039;gtm&#039;);
return gtmData.start + &#039;.&#039; + gtmData.uniqueEventId;
&#125;- Crea y completa una variable de capa de datos: puedes crear tu propia variable en el contenedor web para leer el valor de event_id. Puedes hacerlo creando una nueva variable de capa de datos, por ejemplo, FBEventIdVar con el nombre de la variable como eventModel.event_id.
- Una vez configurada la variable, podrás usarla para conectarte al evento web en tu etiqueta HTML personalizada, y el evento de servidor como parámetro de evento GA4 adicional.
- En la web, puedes configurar tu etiqueta de Meta en los contenedores web de Google Tag Manager para leer event_id desde una variable.
fbq(&#039;track&#039;, Purchase, &#123;..&#125;, &#123;eventID: FBEventIDVar &#125;);
 Configura el evento GA4 para enviar un parámetro extra, denominado event_id, configurado en la variable FBEventIdVar. 
 


## Parámetros de datos personalizados

Para enviar datos personalizados, usa las siguientes asignaciones en las etiquetas de tu evento de GA4:

 Nombre del parámetro de Meta Nombre del parámetro de GA4 value

 value

 currency

 currency

 search_string

 search_term

 order_id

 transaction_id

 content_ids

 x-fb-cd-content_ids

 content_type

 x-fb-cd-content_type

 content_name

 x-fb-cd-content_name

 content_category

 x-fb-cd-content_category

 contents*

 items O x-fb-cd-contents

 num_items

 x-fb-cd-num_items

 predicted_ltv

 x-fb-cd-predicted_ltv

 status

 x-fb-cd-status

 delivery_category

 x-fb-cd-delivery_category

 custom_properties*

 custom_properties

 Usa JSON.stringify x-fb-cd-contents y custom_properties antes del envío, ya que son parámetros JSON definidos por Meta.

 

## Enviar datos del sitio web a tu servidor de GCP

Después de configurar los contenedores web y de servidor, puedes enviar un evento de muestra desde tu sitio web para verificar el evento de servidor. Un evento de muestra con los parámetros configurados puede tener el siguiente aspecto:

gtag(&#039;event&#039;, &#039;purchase&#039;, 
 &#123;
 &#039;event_id&#039;: generateEventId(),
 &#039;transaction_id&#039;: &#039;t_12345&#039;,
 &#039;currency&#039;: &#039;USD&#039;,
 &#039;value&#039;: 1.23,
 user_data: &#123;
 email_address: &#039;<HASHED_DATA>&#039;,
 phone_number: &#039;<HASHED_DATA>&#039;,
 address: &#123;
 first_name: &#039;<HASHED_DATA>&#039;,
 last_name: &#039;<HASHED_DATA>&#039;,
 city: &#039;<HASHED DATA>&#039;,
 region: &#039;<HASHED_DATA>&#039;,
 postal_code: &#039;<HASHED_DATA>&#039;,
 country: &#039;<HASHED_DATA>&#039; 
 &#125;, 
 &#125;,
 items: [
 &#123;
 item_id: &#039;1&#039;,
 item_name: &#039;foo&#039;,
 quantity: 5,
 price: 123.45,
 item_category: &#039;bar&#039;,
 item_brand: &#039;baz&#039; 
 &#125;
 ], 
 &#125;); 
 Una vez que el evento se active, deberías ver que se envió una solicitud, por ejemplo, a www.analytics.example.com/g/collect (enlace de ejemplo), con los parámetros configurados. Puedes agregar código de evento de prueba a la etiqueta de la API de conversiones de Meta para verificar eventos enviados a la API de conversiones. El código de evento de prueba solo debe usarse para pruebas. Es necesario que lo elimines cuando envías tu carga útil de producción.

Después de haber publicado los cambios, usa la página Verificar la configuración para asegurarte de que los eventos se envíen correctamente. Para hacerlo, verifica la configuración de la API de conversiones y comprueba que la integración de calidad cumpla nuestras prácticas recomendadas.

 

## Preguntas frecuentes

¿Se planea agregar la función de envío de parámetros personalizados? De ser así, ¿cuándo estará disponible?R: Agregamos asignaciones para la mayoría de los parámetros personalizados estándar de la API de conversiones que se admiten en el esquema de GTM. También proporcionamos asignación personalizada. Consulta aquí para obtener más información.

¿Puede un solo servidor o un grupo ejecutar varios contenedores?R: En estos momentos, GTM solo admite una asignación de 1:1. Lee las recomendaciones sobre cómo organizar tus contenedores.

¿El GTM del lado del servidor requiere una etiqueta que se puede usar en el navegador para emitir eventos?R: Sí.

¿Es posible mantener GA4 por separado con la integración del lado servidor?A: Para mantener una integración separada de GA4 y de GTM del lado del servidor, puedes crear un identificador de medición adicional en Google Analytics. Sigue los pasos anteriores para crear una etiqueta de configuración de GA4 separada para el GTM del lado del servidor con el identificador de medición. En este caso, tu etiqueta de configuración de GA4 preexistente continuará enviando tráfico de GA por medio del contenedor web, mientras que la nueva etiqueta de configuración enviará datos al contenedor de servidor. Crea etiquetas de eventos de GA4 adicionales como se especifica en el paso 2 para enviar eventos del lado del servidor con la nueva etiqueta de configuración.

¿Funciona la integración de la API de conversiones de GTM con otras soluciones de alojamiento en la nube diferentes a GCP?R: Se espera que la integración de la API de conversiones de GTM funcione con GCP y con cualquier otra plataforma que elijas. Obtén más información aquí sobre el aprovisionamiento manual.

 

## Más información

 - API de conversiones
- Deduplicación de eventos del píxel de Meta y la API de conversiones
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
