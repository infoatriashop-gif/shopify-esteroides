# API de conversiones para mensajes comerciales - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/business-messaging

---

API de conversiones para mensajes comerciales - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# API de conversiones para mensajes comerciales: guía de registro

La API de conversiones es una herramienta empresarial de Meta que permite que los socios de mensajes comerciales compartan los datos de los clientes (quienes les otorgaron permisos) directamente desde sus servidores. Esta API está diseñada para cumplir de forma automática con los controles de privacidad del usuario de Meta. Así, los socios de mensajes comerciales pueden enviar de manera confiable los datos referidos a las valiosas interacciones con los clientes en chats comerciales con el fin de comprender y mejorar el rendimiento de los anuncios de los clientes de clic a WhatsApp, Messenger o Instagram. Al hacerlo, se mejora la eficiencia operativa y crecen las empresas.

Esta guía está diseñada para brindar ayuda a los socios de mensajes comerciales a la hora de completar la integración comercial de la API de conversiones de WhatsApp, Messenger o Instagram en nombre de sus clientes. La guía trata los siguientes temas:

 - Requisitos previos a la integración
- Pasos de integración
- Enviar eventos mediante la API de conversiones
- Verificar eventos con el administrador de eventos
 Nota: La API de conversiones también permite a los anunciantes enviar eventos de sitio web, de la app, offline (incluso de las tiendas físicas) y de CRM a Meta. Actualmente, es necesario que los socios de mensajes comerciales que hayan integrado la API de conversiones para utilizarla en otros casos de uso realicen los siguientes pasos a fin de integrarla para los mensajes comerciales.

 

## Anuncios de clic a Messenger


### Requisitos previos a la integración

Antes de empezar con cualquier integración, es necesario asegurarse de que se establezcan las bases técnicas adecuadas y que se conceda el acceso correspondiente a recursos y plataformas específicos.


#### Crear una app para desarrolladores de Facebook

Si aún no tienes una, sigue las instrucciones para crearla.


#### Integrar con la API de Messenger


#### Contar con acceso avanzado a los siguientes elementos:

 - Permiso page_eventsNecesitarás solicitar acceso avanzado al permiso page_events en la sección "Permisos y características" del panel de apps para desarrolladores. Si ya cuentas con acceso avanzado al permiso pages_messaging, tu app se debería aprobar de manera automática para el permiso page_events después de que envíes la solicitud.
 - La función de "Acceso estándar de administración de anuncios". Aquí encontrarás información adicional.

Para cumplir con los requisitos de la función de acceso avanzado, necesitas hacer un total de 1.500 llamadas satisfactorias a la API de marketing, con una tasa de error inferior al 10% en los últimos 15 días. Aquí se incluyen las llamadas que hizo un usuario con un rol en la app mediante la API de conversiones.
 

### Pasos de integración

1. Obtener token de acceso

Para poder llamar a la API de conjuntos de datos y a la API de conversiones, necesitas un token de acceso que cuente con los permisos necesarios:

 - page_events
 Reutiliza el token generado desde tu inicio de sesión con Facebook para empresas.

2. Obtener page_id

Asegúrate de conocer el identificador de la página en relación con la que quieres reportar eventos.

3. Configurar conjunto de datos

Al compartir datos de eventos con Meta mediante la API de conversiones, Meta necesita saber el origen vinculado a dichos eventos. Los conjuntos de datos te permiten conectar y administrar en un solo lugar datos de eventos provenientes de distintos orígenes, como un sitio web, una app para celulares, una tienda física o chats con negocios. Puedes obtener más información sobre los conjuntos de datos aquí.

Los conjuntos de datos se crean mediante una plataforma de socios o directamente en el administrador de eventos. El negocio es propietario del conjunto de datos. Si dicho negocio trabaja con un socio, se otorgará al socio acceso al conjunto de datos.

Utiliza el page_id y el access_token para crear un conjunto de datos realizando una llamada POST a la API de conjuntos de datos. Si ya existe un dataset_id asociado a la página, se devolverá dicho identificador. A continuación, se muestra un ejemplo de llamada:

https://graph.facebook.com/v16.0/&#123;PAGE_ID&#125;/dataset?access_token=&#123;TOKEN&#125;
La respuesta será un identificador, que representa el dataset_id. Si utilizas ese indicador y el token de acceso que recibiste del inicio de sesión con Facebook para empresas, ahora puedes llamar a la API de conversiones para enviar eventos de mensaje a Meta.

Nota: Si la página está asociada a una cuenta de empresa y se otorga a esa cuenta el permiso business_management, el conjunto de datos se muestra en dicha cuenta. De lo contrario, se le oculta al anunciante.

4. Recuperar el identificador de la página (PSID)

El identificador de la página (PSID) es un identificador que representa al usuario en una conversación entre el usuario y la empresa. Este identificador se expone mediante el webhook de mensajes y se usa en toda la API de envío y recepción. También se usa en la API de conversiones cuando se envían eventos de conversión asignados a un usuario específico (PSID).

Asegúrate de conocer el PSID de la página para la que quieres reportar señales.


### Enviar eventos mediante la API de conversiones

En la etapa final de la integración, ahora es posible enviar eventos mediante la API de conversiones con toda la información (access_token, page_id, dataset_id y PSID) que se obtuvo en los pasos anteriores.

Durante el período de la campaña, como los eventos se producen en tiempo real, notifica a Meta estos eventos mediante la API de conversiones usando dataset_id y access_token. Realiza una solicitud POST a la API:

https://graph.facebook.com/v16.0/&#123;DATASET_ID&#125;/events?access_token=&#123;TOKEN&#125;
A continuación, se muestra una llamada a la API de ejemplo para un evento de compra única.

&#123;
 "data": [
 &#123;
 "event_name": "Purchase",
 "event_time": 1675999999,
 "action_source": "business_messaging",
 "messaging_channel": "messenger",
 "user_data": &#123;
 "page_id": <PAGE_ID>,
 "page_scoped_user_id": <PSID>
 &#125;,
 "custom_data": &#123;
 "currency": "USD",
 "value": 123
 &#125;
 &#125;
 ],
 "partner_agent": "<PARTNER_NAME>"
&#125;


### Verificar eventos con el administrador de eventos

Después de que se haya enviado correctamente un evento a Meta mediante la API de conversiones, deberías poder ver ese evento reflejado en el administrador de eventos del conjunto de datos específico. Puedes obtener más información sobre el administrador de eventos y su uso aquí.

 Nota: Si eres socio, necesitarás brindar a tu anunciante información de cómo acceder al conjunto de datos en el administrador de eventos, con el fin de verificar que se recibieron los eventos.

 

## Anuncios de clic a WhatsApp


### Requisitos previos a la integración

Antes de empezar con cualquier integración, es necesario asegurarse de que se establezcan las bases técnicas adecuadas y que se conceda el acceso correspondiente a recursos y plataformas específicos.


#### Crear una app para desarrolladores de Facebook

Si aún no tienes una, sigue las instrucciones para crearla.


#### Contar con acceso avanzado a los siguientes elementos:

 - Permiso whatsapp_business_management
- Permiso whatsapp_business_manage_eventsNecesitarás solicitar acceso avanzado al permiso whatsapp_business_manage_events en la sección "Permisos y características" del panel de apps para desarrolladores. Si ya cuentas con acceso avanzado al permiso whatsapp_business_messaging, tu app se debería aprobar de manera automática para el permiso whatsapp_business_manage_events después de que envíes la solicitud.
 - La función "Acceso estándar a administración de anuncios" permite que tu app acceda a la API de marketing. Aquí encontrarás información adicional.

Para cumplir con los requisitos de la función de acceso avanzado, necesitas hacer un total de 1.500 llamadas satisfactorias a la API de marketing, con una tasa de error inferior al 10% en los últimos 15 días. Aquí se incluyen las llamadas que hizo un usuario con un rol en la app mediante la API de conversiones.
 

#### Integración realizada con alguna de las dos opciones de integración que ofrece la plataforma de WhatsApp Business:

 - API de la nube, alojada por Meta (recomendado)
- API de instalaciones locales (*versión comercial de la API: 2.45.1): el valor ctwa_clid, que representa un campo obligatorio para enviar eventos mediante la API de conversiones, solo está disponible en el webhook de mensajes en las versiones comerciales de la API 2.45.1 y posteriores. Nota: La plataforma de WhatsApp Business se encontrará en pleno proceso de transición a nuestra API de la nube de última generación durante los próximos 2 años. La última versión admitida del cliente de la API de instalaciones locales caducará el 23 de octubre de 2025. Más información.
 

#### Integración realizada con una solución de inicio de sesión relacionada con la autenticación y la autorización (registro insertado, inicio de sesión con Facebook para empresas)


### Pasos de integración

1. Obtener token de acceso

Para poder llamar a la API de conjuntos de datos y a la API de conversiones, necesitas un token de acceso que cuente con el permiso necesario:

 - whatsapp_business_management
- whatsapp_business_manage_events
 Si cuentas con una integración con el registro insertado, te recomendamos volver a usar el token que se generó a partir del proceso de registro insertado. De manera alternativa, puedes usar un token de acceso del usuario del sistema de integración comercial, un token de acceso del usuario del sistema o un token de acceso del usuario, siempre que contenga los permisos necesarios.

2. Recuperar el identificador de la cuenta de WhatsApp Business

El identificador de la cuenta de WhatsApp Business (waba_id) puede obtenerse una vez que se completa el proceso de registro insertado. Ver detalles.

3. Configurar la API de conjuntos de datos

Al compartir datos de eventos con Meta mediante la API de conversiones, Meta necesita saber el origen vinculado a dichos eventos. Los conjuntos de datos permiten a los socios de soluciones comerciales de Meta conectar y administrar en un solo lugar datos de eventos provenientes de distintos orígenes, como un sitio web, una app para celulares, una tienda física o chats con negocios del cliente. Puedes obtener más información sobre los conjuntos de datos aquí. El cliente es el propietario de los conjuntos de datos, y los socios de soluciones comerciales de Meta pueden acceder a estos conjuntos de datos si cuentan con los permisos necesarios.

Puedes utilizar whatsapp_business_account_id y access_token para crear un conjunto de datos si realizas una llamada POST a la API de conjuntos de datos. Si ya existe un dataset_id asociado a la cuenta de WhatsApp Business, se devolverá dicho identificador. A continuación, se muestra un ejemplo de llamada:

https://graph.facebook.com/v16.0/&#123;WHATSAPP_BUSINESS_ACCOUNT_ID&#125;/dataset?access_token=&#123;TOKEN&#125;
Para recuperar el dataset_id, necesitas hacer una llamada GET a la API de conjuntos de datos con el whatsapp_business_account_id y el access_token. A continuación, se muestra un ejemplo de llamada:

https://graph.facebook.com/v16.0/&#123;WHATSAPP_BUSINESS_ACCOUNT_ID&#125;/dataset?access_token=&#123;TOKEN&#125;
La respuesta será un identificador, que representa el dataset_id. Ahora el conjunto de datos está configurado y listo para usarse. Luego, necesitarás recuperar el ctwa_clid, que es obligatorio para hacer una llamada a la API de conversiones y enviar un evento.

4. Recuperar el identificador de clic a WhatsApp

El identificador de clic a WhatsApp (ctwa_clid) es un identificador personal, único por medio de clic, que está expuesto al negocio cuando el usuario ingresa a la conversación que se originó a partir del anuncio de clic a WhatsApp. Este identificador debe devolverse a Meta mediante la llamada a la API de conversiones (consultar la sección que se encuentra a continuación para obtener referencias).

El campo ctwa_cli se obtiene a partir del objeto de referencia en el webhook de mensajes (API de la nube | de instalaciones locales).

Cuando recibas ctwa_clid, almacénalo con la conversación. Si de produjo una conversión dentro de una conversación, envía el ctwa_clid correspondiente mediante la API de conversiones. A continuación, verás un ejemplo de un mensaje recibido con un objeto de referencia que contiene un ctwa_clid:

&#123;
 "data": [
 &#123;
 "contacts": [
 &#123;
 "profile": &#123;
 "name": "Kerry Fisher "
 &#125;,
 "wa_id": "16315551234"
 &#125;
 ],
 "messages": [
 &#123;
 "from": "12345678",
 "id": "ABGGFlA5FpafAgo6tHcNmNjXmuSf",
 "referral": &#123;
 "body": "This is a great product",
 "ctwa_clid": "ARAkLkA8rmlFeiCktEJQ-QTwRiyYHAFDLMNDBH0CD3qpjd0HR4irJ6LEkR7JwFF4XvnO2E4Nx0-eM-GABDLOPaOdRMv-_zfUQ2a", // <CLICK_TO_WHATSAPP_CLICK_ID>
 "headline": "Our new product",
 "image": &#123;
 "id": "e144be57-12b1-4035-a520-703fcc87ef45"
 &#125;,
 "source_id": "1234567890",
 "source_type": "ad",
 "source_url": "https://fb.me/AAAAA"
 &#125;,
 "text": &#123;
 "body": "Can I learn more about your business?"
 &#125;,
 "timestamp": "1678189586",
 "type": "text"
 &#125;
 ]
&#125;


### Enviar eventos mediante la API de conversiones

En la etapa final de la integración, ahora es posible enviar eventos mediante la API de conversiones con toda la información (waba_id, dataset_id, ctwa_clid) que se obtuvo en los pasos anteriores.

Durante el período de campaña del anunciante, los eventos se producen en tiempo real. Notifica a Meta estos eventos mediante la API de conversiones usando dataset_id y el token de acceso. Realiza una solicitud POST a la API:

https://graph.facebook.com/v16.0/&#123;DATASET_ID&#125;/events?access_token=&#123;TOKEN&#125;
A continuación, se muestra una llamada a la API de ejemplo para un evento de compra única.

&#123;
 "data": [
 &#123;
 "data": [
 &#123;
 "event_name": "Purchase",
 "event_time": 1675999999,
 "action_source": "business_messaging",
 "messaging_channel": "whatsapp",
 "user_data": &#123;
 "whatsapp_business_account_id": <WHATSAPP_BUSINESS_ACCOUNT_ID>,
 "ctwa_clid": "ARAkLkA8rmlFeiCktEJQ-QTwRiyYHAFDLMNDBH0CD3qpjd0HR4irJ6LEkR7JwFF4XvnO2E4Nx0-eM-GABDLOPaOdRMv-_zfUQ2a", // <CLICK_TO_WHATSAPP_CLICK_ID>
 &#125;,
 "custom_data": &#123;
 "currency": "USD",
 "value": 123
 &#125;
 &#125;
 ],
 "partner_agent": "<PARTNER_NAME>"
&#125;


### Verificar eventos con el administrador de eventos

Después de que se haya enviado correctamente un evento a Meta mediante la API de conversiones, deberías poder ver ese evento reflejado en el administrador de eventos del conjunto de datos específico. Puedes obtener más información sobre el administrador de eventos y su uso aquí.

 Nota: Si eres socio, necesitarás brindar a tu anunciante información de cómo acceder al conjunto de datos en el administrador de eventos, con el fin de verificar que se recibieron los eventos.

 

## Anuncios de clic a Instagram Direct


### Requisitos previos a la integración

Antes de empezar con cualquier integración, es necesario asegurarse de que se establezcan las bases técnicas adecuadas y que se conceda el acceso correspondiente a recursos y plataformas específicos.


#### Crear una app para desarrolladores de Facebook

Si aún no tienes una, sigue las instrucciones para crearla.


#### Integrar con la API de Messenger


#### Contar con acceso avanzado a los siguientes elementos:

 - Permiso instagram_manage_eventsNecesitarás solicitar acceso avanzado al permiso instagram_manage_events en la sección "Permisos y características" del panel de apps para desarrolladores. Si ya cuentas con acceso avanzado al permiso instagram_manage_messages, tu app se debería aprobar de manera automática en relación con el permiso instagram_manage_events.
 - La función de "Acceso estándar de administración de anuncios". Aquí encontrarás información adicional.

Para cumplir con los requisitos de la función de acceso avanzado, necesitas hacer un total de 1.500 llamadas satisfactorias a la API de marketing, con una tasa de error inferior al 10% en los últimos 15 días. Aquí se incluyen las llamadas que hizo un usuario con un rol en la app mediante la API de conversiones.
 

### Pasos de integración

1. Obtener token de acceso

Para poder llamar a la API de conjuntos de datos y a la API de conversiones, necesitas un token de acceso que cuente con los permisos necesarios:

 - instagram_manage_events
 Reutiliza el token generado desde tu inicio de sesión con Facebook para empresas.

2. Obtener instagram_user_id

Asegúrate de conocer el instagram_user_id de la cuenta de Instagram en relación con la que quieres reportar eventos.

3. Configurar conjunto de datos

Al compartir datos de eventos con Meta mediante la API de conversiones, Meta necesita saber el origen vinculado a dichos eventos. Los conjuntos de datos te permiten conectar y administrar en un solo lugar datos de eventos provenientes de distintos orígenes, como un sitio web, una app para celulares, una tienda física o chats con negocios. Puedes obtener más información sobre los conjuntos de datos aquí.

Los conjuntos de datos se crean mediante una plataforma de socios o directamente en el administrador de eventos. El negocio es propietario del conjunto de datos. Si dicho negocio trabaja con un socio, se otorgará al socio acceso al conjunto de datos.

Utiliza instagram_user_id y access_token para crear un conjunto de datos realizando una llamada POST a la API de conjuntos de datos. Si ya existe un dataset_id asociado al usuario de IG, se devolverá dicho identificador. A continuación, se muestra un ejemplo de llamada:

https://graph.facebook.com/v16.0/&#123;IG_USER_ID&#125;/dataset?access_token=&#123;TOKEN&#125;
La respuesta será un identificador, que representa el dataset_id. Si utilizas ese indicador y el token de acceso que recibiste del inicio de sesión con Facebook para empresas, ahora puedes llamar a la API de conversiones para enviar eventos de mensaje a Meta.

4. Recuperar el identificador de la página (PSID)

El identificador de Instagram (IGSID) es un identificador que representa al usuario en una conversación entre el usuario y la empresa. Este identificador se expone mediante el webhook de mensajes y se usa en toda la API de envío y recepción. También se usa en la API de conversiones cuando se envían eventos de conversión asignados a un usuario específico, IGSID (ver la siguiente sección para obtener más información).

Asegúrate de conocer el IGSID de la cuenta de Instagram en relación con la que quieres reportar eventos.


### Enviar eventos mediante la API de conversiones

En la etapa final de la integración, ahora es posible enviar eventos mediante la API de conversiones con toda la información (dataset_id, token de acceso, instagram_user_id y IGSID) que se obtuvo en los pasos anteriores.

Durante el período de la campaña, como los eventos se producen en tiempo real, notifica a Meta estos eventos mediante la API de conversiones usando dataset_id y el token de acceso. Realiza una solicitud POST a la API:

https://graph.facebook.com/v16.0/&#123;DATASET_ID&#125;/events?access_token=&#123;TOKEN&#125;
A continuación, se muestra una llamada a la API de ejemplo para un evento de compra única.

&#123; 
 "data": [
 &#123;
 "event_name": "Purchase",
 "event_time": 1675999999,
 "action_source": "business_messaging",
 "messaging_channel": "instagram",
 "user_data": &#123;
 "instagram_business_account_id": <instagram_business_account_id>,
 "ig_sid": <IGSID>
 &#125;,
 "custom_data": &#123;
 "currency": "USD",
 "value": 123
 &#125;
 &#125;
 ],
 "partner_agent": "<PARTNER_NAME>"
&#125;


### Verificar eventos con el administrador de eventos

Después de que se haya enviado correctamente un evento a Meta mediante la API de conversiones, deberías poder ver ese evento reflejado en el administrador de eventos del conjunto de datos específico. Puedes obtener más información sobre el administrador de eventos y su uso aquí.

 Nota: Si eres socio, necesitarás brindar a tu anunciante información de cómo acceder al conjunto de datos en el administrador de eventos, con el fin de verificar que se recibieron los eventos.

 

## Preguntas frecuentes

¿Qué tipo de eventos de mensajes admite la API de conversiones para mensajes comerciales?

R: la API de conversiones para mensajes comerciales ahora solo admite los siguientes tipos de eventos para mensajes comerciales:

 - Purchase
- LeadSubmitted
- InitiateCheckout
- AddToCart
- ViewContent
- OrderCreated
- OrderShipped
- OrderDelivered
- OrderCanceled
- OrderReturned
- CartAbandoned
- QualifiedLead
- RatingProvided
- ReviewProvided
 Ten en cuenta que los eventos de mensajes solo deben representar las interacciones de los clientes que ocurren en el hilo de mensajes, pero no las conversiones que ocurren en otros canales, como sitios web. Puedes distinguir fácilmente tus eventos si eliges el origen de la acción correspondiente durante el proceso de integración.

¿Hay alguna orientación por parte de Meta para mantener la misma app o usar distintas apps para realizar diferentes integraciones de API de conversiones?

R: es una práctica recomendada que un socio use una app para que Meta pueda identificar todos los eventos que envió el socio. Si eres socio y ya tienes múltiples apps, asegúrate de que el valor partner_agent esté configurado en el nombre de agente del socio que se te asignó. Habla con tu representante de Meta si no estás seguro.

Si una conversión se produce fuera del hilo de mensajes (por ejemplo, en mi sitio web o app), ¿cómo pasamos los eventos a Meta?

R: incluso si una conversión se produce fuera del hilo de mensajes, deberás devolver ese evento a Meta mediante el producto correspondiente de la API de conversión. Por ejemplo, si se produce una conversión en tu sitio web, usa la API de conversiones para la web. Si la conversión se produce en tu app, usa la API de conversiones para los eventos de la app. Se seguirá asignando el evento al identificador del clic de la API de conversiones para la web. La lista completa de parámetros se puede encontrar aquí.

¿La API de conversiones permite optimizar anuncios que hacen clic para enviar mensajes?

R: la API de conversiones solo activa el acceso a la optimización de compras de anuncios de clic a Messenger y anuncios de clic a WhatsApp, pero no está disponible para la optimización de anuncios de Instagram en este momento. En relación con los anuncios de clic a Instagram, puedes optimizar tus campañas publicitarias para impulsar más conversaciones.

¿Puedo reutilizar el conjunto de datos anterior para la API de conversiones para mensajes comerciales?

R: sí. Admitimos la posibilidad de vincular con conjuntos de datos anteriores. Puedes consultar las opciones disponibles y decidir qué opción es la correcta para tu negocio.

Si en estos momentos estoy usando la API de conversiones para el sitio web, ¿agregar mensajes comerciales a la misma integración interferirá con mi integración previa?

A: no hay riesgo al agregar mensajes comerciales a tu actual integración de la CAPI. La atribución se basa en el identificador de la página o del conjunto de datos y no está relacionada con el identificador de la app.

¿Cuántos conjuntos de datos se pueden vincular a una página?

R: solo puedes vincular un conjunto de datos a una página.

¿Necesito deduplicar los eventos antes de enviarlos mediante la API de conversiones para mensajes comerciales?

R: Meta no ayuda a deduplicar eventos para la API de conversiones para mensajes comerciales, por lo que recomendamos a los anunciantes realizar la deduplicación antes de enviarlos mediante la API de conversiones para mensajes comerciales.

 

## Más información

 - Información general de la API de conversiones
- Uso de la API de conversiones
- Parámetros de la API de conversiones
- Prácticas recomendadas
- Plataforma de WhatsApp Business (Instalaciones locales o API de la nube) con las versiones 2.45.1 y superiores de la API del negocio.
- API de mensajes de Instagram
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
