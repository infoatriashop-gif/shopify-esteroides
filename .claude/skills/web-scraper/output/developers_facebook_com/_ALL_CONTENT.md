---
# API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api

API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# API de conversiones

La API de conversiones está diseñada para crear una conexión entre los datos de marketing de un anunciante (como los eventos del sitio web, de la app y de mensajes comerciales y conversiones offline) provenientes del servidor, la plataforma del sitio web, la app para celulares o el sistema CRM del anunciante, y los sistemas de Meta que optimizan la segmentación de los anuncios, reducen el costo por resultado y miden los resultados.

En lugar de mantener puntos de conexión separados por cada origen de datos, los anunciantes pueden aprovechar la API de conversiones para enviar múltiples tipos de eventos y simplificar su pila de tecnología. En el caso de integraciones directas, esto implica establecer una conexión entre el servidor del anunciante y el extremo de la API de conversiones de Meta.

Los eventos del servidor se vinculan a un identificador de conjunto de datos y se procesan como eventos enviados a través del píxel de Meta, el SDK de Facebook para iOS o Android, el SDK del socio de mediciones para celulares, el conjunto de eventos offline o la carga de un archivo .csv. Esto significa que los eventos del servidor se pueden usar en la medición, la creación de informes o la optimización de manera similar a como se lo hace en otros canales de conexión. Los eventos offline se pueden usar para la medición de eventos offline atribuidos, la creación de públicos personalizados offline o la medición.

Para lograr un rendimiento y una medición óptimos de los anuncios, recomendamos que los anunciantes sigan las prácticas recomendadas de la API de conversiones.


### Pasos recomendados

 - Primeros pasos: selecciona el método de integración que mejor se adapte a tus necesidades, consulta los requisitos para usar la API y averigua por dónde empezar.
- Implementa la API y empieza a enviar solicitudes: comienza a hacer solicitudes POST y obtén más información sobre los eventos omitidos, las solicitudes por lotes y la fecha de transacción del evento.
- Verifica la configuración: asegúrate de que hayamos recibido los eventos y de que dichos eventos están deduplicados y asociados correctamente.
 

## Documentación

 

### Parámetros de la API

Parámetros obligatorios y opcionales que puedes usar para mejorar la atribución de los anuncios y la optimización de la entrega.

 

### Asistente de carga

Obtén información sobre cómo estructurar la carga al enviarla a Facebook desde tu servidor.

 

### Solución de problemas

Descubre cómo gestionar los códigos de error que devuelve la API de conversiones.

 

## Recursos

 

### Eventos de píxel de Meta

Obtén más información sobre los eventos estándar y los eventos personalizados del píxel de Meta.

 

### Servicio de ayuda para empresas

En el servicio de ayuda, consulta Información sobre la API de conversiones y Probar eventos del servidor.

 

### Manual

Consulta el Manual de integración directa para desarrolladores (PDF).

 

### Opciones de procesamiento de datos

Obtén más información sobre la función de uso limitado de datos y cómo implementarla para la API de conversiones.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Empezar - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/get-started

Empezar - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Empezar

En esta página, se describe el proceso de implementación de la API de conversiones y se detallan los requisitos previos para la implementación. Si eres un socio externo que ofrece las funcionalidades de la API de conversiones a los anunciantes, tienes diferentes requisitos para empezar

 Si tu empresa tiene un firewall de solicitudes salientes, consulta Direcciones IP del rastreador y agentes de usuario para obtener las direcciones IP de Facebook. Ten presente que la lista de direcciones cambia con frecuencia.

 Los eventos de la web, las apps y los negocios físicos compartidos mediante la API de conversiones requieren parámetros específicos. La lista de parámetros obligatorios está disponible aquí.

 

## Información general del proceso

El proceso de configuración de una integración de la API de conversiones consta de los siguientes pasos de alto nivel:

 - Elegir el método de integración adecuado para tu caso.
- Completar los requisitos previos necesarios para ese método de implementación.
- Realizar la implementación siguiendo ese método de integración.
- Verificar la configuración y seguir las prácticas recomendadas que ayuden a mejorar el rendimiento del anuncio.
 

## Métodos de integración

Existen varios métodos de integración con la API de conversiones, que varían según el nivel de esfuerzo, el costo y las funciones que permiten activar. Consulta este artículo para obtener información sobre las opciones de configuración de la API de conversiones.

El enfoque principal de esta documentación para desarrolladores es compilar integraciones directas.

 

## Requisitos


### Identificador del píxel

Debes obtener un identificador del píxel para usar la API de conversiones. Si ya configuraste un píxel en tu sitio web, te recomendamos que uses el mismo identificador del píxel para tu navegador y los eventos del servidor.


### Administrador comercial

Para usar la API, también necesitas un administrador comercial. El administrador comercial ayuda a los anunciantes a integrar sus iniciativas de marketing de Facebook en sus empresas y con socios externos. Consulta el artículo del servicio de ayuda sobre cómo crear un administrador comercial si aún no tienes uno.


### Token de acceso

Para usar la API de conversiones, necesitas un token de acceso. Puedes obtener el token de acceso de dos maneras:

 - Usar el administrador de eventos (recomendado)
- Usar tu propia app
 

#### Usar el administrador de eventos (recomendado)

Para usar la API de conversiones, debes generar un token de acceso, que se pasa como un parámetro en cada llamada a la API. En el administrador de eventos, sigue estos pasos:

Paso 1: elige el píxel que quieres implementar.

Paso 2: selecciona la pestaña "Configuración".

 
Paso 3. busca la sección de la API de conversiones y haz clic en Generar token de acceso en "Configurar manualmente" y sigue las instrucciones de la ventana emergente:

Nota: El enlace para generar el token de acceso solo está visible para los usuarios de la empresa que tienen privilegios de desarrollador. No se muestra el enlace a otros usuarios.

 
Una vez que tengas el token, haz clic en el botón Administrar integraciones en la pestaña "Resumen" del administrador de eventos. En la pantalla de la ventana emergente, haz clic en el botón Administrar, que se ubica al lado de la API de conversiones. Esto crea automáticamente una app de la API de conversiones y un usuario del sistema de la API de conversiones para ti. No es necesario realizar una revisión de la app ni solicitar permisos.

 


#### Usar tu propia app

Si ya tienes tu propia app y tu propio usuario en el sistema, puedes generar el token en el administrador comercial. Sigue estos pasos:

Paso 1: accede a la Configuración de tu negocio.

Paso 2: asigna un píxel a tu usuario del sistema (también tienes la opción de crear un usuario del sistema nuevo en esta etapa).

Paso 3: selecciona el usuario del sistema asignado y haz clic en Generar token.

No es necesario someter tu app a revisión. No necesitas solicitar ningún permiso.

 Los tokens de acceso que se generaron en la pestaña de configuración de la API de conversiones en el administrador de eventos dejaron de estar restringidos a usarlos con la versión más nuevas de la API Graph que estaba disponible al momento de generarse el token. A partir de la versión 12.0, se pueden usar los tokens de acceso recientemente creados con todas las versiones de la API Graph disponibles.

 

## Recursos

 - Servicio de ayuda para empresas: Información sobre el administrador comercial
- Servicio de ayuda para empresas: Información sobre el Píxel de Meta
- Meta Blueprint: primeros pasos con la API de conversiones
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Uso de la API - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api

Uso de la API - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Uso de la API

Cuando cumplas con los requisitos de la página Empezar, consulta esta página para saber cómo enviar eventos y usar la herramienta para probar eventos. Cuando hayas enviado un evento, verifica tu configuración.

La API de conversiones se basa en la API de marketing de Facebook, que, a su vez, se creó a partir de nuestra API Graph. Las API Graph y de marketing tienen diferentes calendarios de obsolescencia según las versiones. Nuestro ciclo de lanzamiento está alineado con la API Graph, para que todas las versiones sean compatibles al menos durante dos años. Esta excepción solo es válida para la API de conversiones.

 Información general de la API de conversiones Parámetros 

 Los eventos de la web, las apps y los negocios físicos compartidos mediante la API de conversiones requieren parámetros específicos. Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos. La lista de parámetros obligatorios está disponible aquí.

 

## Enviar solicitudes

Para enviar eventos nuevos, haz una solicitud POST al perímetro /events de la API desde esta ruta: https://graph.facebook.com/&#123;API_VERSION&#125;/&#123;PIXEL_ID&#125;/events?access_token=&#123;TOKEN&#125;. Cuando realizas una publicación en este perímetro, Facebook crea nuevos eventos del servidor.

curl -X POST \ -F &#039;data=[ &#123; "event_name": "Purchase", "event_time": 1762902353, "user_data": &#123; "em": [ "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd" ], "ph": [ "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4", "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6" ], "client_ip_address": "123.123.123.123", "client_user_agent": "$CLIENT_USER_AGENT", "fbc": "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890", "fbp": "fb.1.1558571054389.1098115397" &#125;, "custom_data": &#123; "currency": "usd", "value": 123.45, "contents": [ &#123; "id": "product123", "quantity": 1, "delivery_category": "home_delivery" &#125; ] &#125;, "event_source_url": "http://jaspers-market.com/product/123", "action_source": "website" &#125; ]&#039; \ -F &#039;access_token=<ACCESS_TOKEN>&#039; \ https://graph.facebook.com/v25.0/<PIXEL_ID>/events
Adjunta el token de acceso seguro que generaste usando el parámetro de consulta access_token. También puedes usar el explorador de la API Graph para realizar la solicitud POST en el punto de conexión /<pixel_id>/events.

El cuerpo de una solicitud de ejemplo tiene este aspecto:

&#123;
 "data": [
 &#123;
 "event_name": "Purchase",
 "event_time": 1633552688,
 "event_id": "event.id.123",
 "event_source_url": "http:\/\/jaspers-market.com\/product\/123", 
 "action_source": "website",
 "user_data": &#123;
 "client_ip_address": "192.19.9.9",
 "client_user_agent": "test ua",
 "em": [
 "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"
 ],
 "ph": [
 "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
 "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6"
 ],
 "fbc": "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
 "fbp": "fb.1.1558571054389.1098115397"
 &#125;,
 "custom_data": &#123;
 "value": 100.2,
 "currency": "USD",
 "content_ids": [
 "product.id.123"
 ],
 "content_type": "product"
 &#125;,
 "opt_out": false
 &#125;,
 &#123;
 "event_name": "Purchase",
 "event_time": 1633552688,
 "user_data": &#123;
 "client_ip_address": "192.88.9.9",
 "client_user_agent": "test ua2"
 &#125;,
 "custom_data": &#123;
 "value": 50.5,
 "currency": "USD"
 &#125;,
 "opt_out": false
 &#125;
 ]
&#125;

### Fecha/hora de subida en comparación con la hora de transacción del evento

event_time es la fecha de transacción del evento. Se debe enviar como una marca de tiempo Unix en segundos que indique el momento en que ocurrió el evento. El tiempo especificado puede ser anterior al momento en que se envió el evento a Facebook. Esto permite procesar por lotes y optimizar el rendimiento del servidor.

event_time puede ser hasta 7 días antes de que envíes un evento a Meta. Si un event_time en data excede los 7 días pasados, devolvemos un error para toda la solicitud y no procesamos ningún evento. En el caso de los eventos offline y de tienda física con physical_store como action_source, debes subir las transacciones dentro de los 62 días posteriores a la conversión.

 Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos.

 

### Solicitudes por lotes

Puedes enviar hasta 1,000 eventos en data. Sin embargo, para un rendimiento óptimo, te recomendamos que envíes los eventos cuando se produzcan, e idealmente dentro de la hora posterior al momento en que ocurran. Si alguno de los eventos que envías en un lote no es válido, rechazaremos todo el lote.


### Cifrado

Consulta nuestra página parámetros de información de los clientes para ver qué parámetros deben cifrarse antes de enviarlos a Facebook. Si estás usando uno de nuestros SDK para empresas, el SDK realiza el cifrado por ti.


### Funciones del SDK para empresas para la API de conversiones

Obtén más información sobre tres funciones específicas del SDK para empresas diseñadas especialmente para usuarios de la API de conversiones: Solicitudes asincrónicas, Creación simultánea de lotes e Interfaz de servicio HTTP. La versión mínima requerida para usar estas características es la siguiente:

 - PHP >= 7.2
- Node.js >= 7.6.0
- Java >= 8
- Python >= 2.7
- Ruby >= 2
 El SDK para empresas dejó de ser compatible con PHP 5 desde enero de 2019. Para usar el SDK para empresas, actualiza a PHP 7.

 Parámetros de la API de conversiones 

## Verificar eventos

Después de enviar tus eventos, confirma haberlos recibido en el administrador de eventos:

 - En la página de orígenes de datos, haz clic en el píxel correspondiente al PIXEL_ID de tu solicitud POST. Para obtener más información, consulta Servicio de ayuda para empresas: Explorar el administrador de eventos.
- Luego, haz clic en Información general. Verás el número de fila, los eventos con coincidencias y los eventos atribuidos que recibimos. En Método de conexión, puedes ver el canal a través del que se envió el evento.
 - Puedes hacer clic en cada evento para obtener información más específica.
 - Cuando empiezas a enviar eventos, debes poder verificarlos en un plazo máximo de 20 minutos. Ya puedes empezar a enviar eventos desde tu servidor.
 

## Herramienta "Probar eventos"

Puedes verificar que Facebook haya recibido correctamente los eventos de tu servidor mediante la función "Probar eventos" en el administrador de eventos. Para encontrar la herramienta, ve a Events Manager > Data Sources > Your Pixel > Test Events.

La herramienta "Probar eventos" genera un identificador de prueba. Envía el identificador de prueba como un parámetro test_event_code para empezar a ver la actividad del evento en la ventana de la herramienta "Probar eventos".

 Nota: El campo test_event_code solo debe usarse para realizar pruebas. Es necesario que lo elimines cuando envías tu carga de producción.

Los eventos que envías con test_event_code no se omiten. Ingresan en el administrador de eventos y se usan para segmentar y medir anuncios.

 Este es un ejemplo de cómo se debe estructurar la solicitud:

&#123;
 "data": [
 &#123;
 "event_name": "ViewContent",
 "event_time": 1764975551,
 "event_id": "event.id.123",
 "event_source_url": "http:\/\/jaspers-market.com",
 "user_data": &#123;
 "client_ip_address": "1.2.3.4",
 "client_user_agent": "test user agent"
 &#125;
 &#125;
 ],
 "test_event_code": "TEST123"
&#125;
Este es un ejemplo de cómo aparece la solicitud en el explorador de la API Graph:

 Puedes generar esta carga de prueba usando el asistente de cargas. Ten en cuenta que el código del evento de prueba solo es válido para la carga de prueba.

 Los eventos de tu servidor aparecen en la ventana "Probar eventos" una vez que se envía la solicitud.

 

## Opciones de procesamiento de datos para usuarios de EE. UU.

 En estas dos API, implementa opciones de procesamiento de datos agregando data_processing_options, data_processing_options_country y data_processing_options_state en cada evento dentro del parámetro de datos de los eventos.

Nota: Ya no se recomiendan las API de eventos de la app y de conversiones offline para realizar las nuevas integraciones. En cambio, sí se recomienda que uses la API de conversiones, porque ahora admite eventos offline, de la web y de la app. Consulta la API de conversiones de eventos de la app y la API de conversiones de eventos offline para obtener más información.

Si no deseas activar el uso limitado de datos (LDU), especifica una matriz vacía relacionada con los eventos o, simplemente, elimina el campo en la carga útil:

&#123;
 "data": [
 &#123;
 "event_name": "Purchase",
 "event_time": <EVENT_TIME>,
 "user_data": &#123;
 "em": "<EMAIL>"
 &#125;,
 "custom_data": &#123;
 "currency": "<CURRENCY>",
 "value": "<VALUE>"
 &#125;,
 "data_processing_options": []
 &#125;
 ]
&#125;Para activar el LDU y que Meta realice la geolocalización:

&#123;
 "data": [
 &#123;
 "event_name": "Purchase",
 "event_time": <EVENT_TIME>,
 "user_data": &#123;
 "em": "<EMAIL>",
 "client_ip_address": "256.256.256.256"
 &#125;,
 "custom_data": &#123;
 "currency": "<CURRENCY>",
 "value": "<VALUE>"
 &#125;,
 "data_processing_options": ["LDU"],
 "data_processing_options_country": 0,
 "data_processing_options_state": 0
 &#125;
 ]
&#125;Para activar el LDU y especificar manualmente la ubicación, por ejemplo, California:

&#123;
 "data": [
 &#123;
 "event_name": "Purchase",
 "event_time": <EVENT_TIME>,
 "user_data": &#123;
 "em": "<EMAIL>"
 &#125;,
 "custom_data": &#123;
 "currency": "<CURRENCY>",
 "value": "<VALUE>"
 &#125;,
 "data_processing_options": ["LDU"],
 "data_processing_options_country": 1,
 "data_processing_options_state": 1000
 &#125;
 ]
&#125;

#### UI de subida manual

La API de conversiones offline ofrece la opción de subir los eventos de forma manual desde un archivo .csv. En este caso, las opciones de procesamiento de datos, el país de procesamiento de datos y el estado de procesamiento de datos se agregan como columnas en el archivo. Puedes obtener más información al respecto en la interfaz de usuario de subida.

 
Obtén más información sobre las opciones de procesamiento de datos.

 

## Límites de la API

La API de marketing posee una lógica de limitación de frecuencia propia y es independiente de todas las limitaciones de frecuencia de la API Graph. Por lo tanto, si realizas una llamada a la API de marketing, no se tomará en cuenta para la limitación de la API Graph.

La API de conversiones no tiene un límite de frecuencia específico. Las llamadas a la API de conversiones se consideran como llamadas a la API de marketing. La única limitación es que puedes enviarnos hasta 1.000 eventos a la vez. Consulta Enviar solicitudes para obtener más información.

 Limitación de frecuencia de la API de marketing 

## Uso de la API del SDK para empresas en el gateway de la API de conversiones

Esta guía te ayudará a explorar las funciones avanzadas del SDK de Meta para empresas, que se diseñaron específicamente para los usuarios del gateway de la API de conversiones. Para obtener información sobre el uso básico del gateway de la API de conversiones, consulta la documentación de este gateway.


### Enviar eventos a la instancia del gateway de la API de conversiones


#### Requisitos

Para poder usar cualquiera de las funciones que se enumeran a continuación, debes tener instalado el SDK de Meta para empresas. Consulta Primeros pasos con el SDK de Meta para empresas o sigue las instrucciones del archivo README, que se enumeran aquí:

 - PHP: facebook-php-business-sdk
- Node.js: facebook-nodejs-business-sdk
- Java: facebook-java-business-sdk
- Python: facebook-python-business-sdk
- Ruby: facebook-ruby-business-sdk
 Por el momento, estas funciones solo están disponibles en el SDK para empresas de PHP y Java. Los otros lenguajes se implementarán a finales de 2023.

 Las versiones de lenguaje mínimas obligatorias para usar estas funciones son las siguientes:

PHP >= 7.2

Java >= 8

Nota: Para deduplicar eventos en el punto de conexión de la API de conversiones, pasa el eventId en tu solicitud. Esto evitará que se muestren eventos deduplicados si se activó la publicación de la API de conversiones.


### Formato de los parámetros CAPIGatewayIngressRequest

 Parámetro Descripción `endpointUrl` cadena El punto de conexión del gateway de la API de conversiones al que se envían los eventos. No se realizará ninguna validación previa, pero sí se verificará si la URL es válida.


Ejemplo: https://test.example.com


 `accessKey` cadena La clave de acceso del gateway de la API de conversiones. Esta clave se necesita para enviar eventos al punto de conexión de eventos del gateway de la API de conversiones. Estas son las instrucciones que debes seguir para generarla.

 

### Los configuradores de CAPIGatewayIngressRequest

 Parámetro Descripción `setSendToDestinationOnly` Booleano Indicador booleano que determina si los eventos se envían únicamente al punto de conexión seleccionado.


Valor predeterminado: False


 `setFilter` Función CustomEndpointRequest.Filter() Función de filtro que procesa cada evento. Si la lógica de filtrado es verdadera, se pasa el evento. De lo contrario, el evento se cancela. Debes implementar la función shouldSendEvent en la interfaz que tiene el parámetro Event.


Valor predeterminado: Null

 


#### Ejemplo de migración: PHP

En el caso de los sistemas que ya utilizan el SDK para empresas, solo debes consultar la nueva CAPIGatewayIngressRequest y adjuntarla al objeto customEndpoint de eventRequest.

// this is the standard event request that we attach events to
$event_request = new EventRequest($this->pixel_id);
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$event_request->setCustomEndpoint($capiIngressRequest);
// pass the events to this event Request object
$event_request->setEvents($events);
$event_request->execute()

#### Ejemplo de migración: Java

En el caso de los sistemas que ya utilizan el SDK para empresas, solo debes consultar la nueva CAPIGatewayIngressRequest y adjuntarla al objeto customEndpoint de eventRequest.

 // this is the standard event request that we attach events to


EventRequest eventRequest = new EventRequest(PIXEL_ID, context);


CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
eventRequest.setCustomEndpoint(capiSyncRequest);
eventRequest.addDataItem(testEvent);
eventRequest.execute(); 

### Opción sincrónica


#### Ejemplo de código de PHP

 $api = Api::init(null, null, $this->access_token);
$api->setLogger(new CurlLogger());
$event_request = new EventRequest($this->pixel_id);
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$event_request->setCustomEndpoint($capiIngressRequest);
$user_data = (new UserData())
 ->setEmails(array(&#039;joe&#064;eg.com&#039;))
 ->setPhones(array(&#039;12345678901&#039;, &#039;14251234567&#039;))
 ->setFbc(&#039;fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890&#039;)
 ->setFbp(&#039;fb.1.1558571054389.1098115397&#039;);
$event1 = (new Event())
 ->setEventName(&#039;Purchase&#039;)
 ->setEventId(&#039;125&#039;)
 ->setEventTime(time())
 ->setEventSourceUrl(&#039;http://jaspers-market.com/product/123&#039;)
 ->setUserData($user_data);
$events = array($event1, $event2);
$event_request->setEvents($events);
$response = $event_request->execute();
print($response->__toString()); 

#### Ejemplo de código de Java

 EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
UserData userData = new UserData()
 .email("abc&#064;eg.com");
CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
eventRequest.setCustomEndpoint(capiSyncRequest);
Event testEvent = new Event();
testEvent.eventId("125").eventName("Purchase")
 .eventTime(System.currentTimeMillis() / 1000L)
 .userData(userData)
 .dataProcessingOptions(new String[]&#123;&#125;).setEventId("134423232");
eventRequest.namespaceId("11")
 .uploadId("22222")
 .uploadTag("upload-tag-4")
 .uploadSource("upload-source-4")
 .testEventCode("test-event-code-5")
 .partnerAgent("partner-agent-6");
eventRequest.addDataItem(testEvent);
eventRequest.execute(); 

### Opción asincrónica


#### Ejemplo de código de PHP

 $api = Api::init(null, null, $this->access_token);
$api->setLogger(new CurlLogger());
$event_request = new EventRequestAsync($this->pixel_id);
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$capiIngressRequest->setSendToDestinationOnly(true);
$event_request->setCustomEndpoint($capiIngressRequest);
$event1 = (new Event())
 ->setEventName(&#039;test Async Event&#039;)
 ->setEventId(&#039;134423232&#039;)
 ->setEventTime(time())
 ->setEventSourceUrl(&#039;http://jaspers-market.com/product/123&#039;);
$events = array($event1, $event2);
$event_request->setEvents($events);
$response = $event_request->execute()->wait(); 

#### Ejemplo de código de Java

 EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
UserData userData = new UserData()
 .email("abc&#064;eg.com");
CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
capiSyncRequest.setSendToDestinationOnly(true);
eventRequest.setCustomEndpoint(capiSyncRequest);
Event testEvent = new Event();
testEvent.eventName("test Async Event")
 .eventTime(System.currentTimeMillis() / 1000L)
 .userData(userData)
 .dataProcessingOptions(new String[]&#123;&#125;).setEventId("134423232");
eventRequest.namespaceId("11222")
 .uploadId("22222")
 .uploadTag("upload-tag-4")
 .uploadSource("upload-source-4")
 .testEventCode("test-event-code-5")
 .partnerAgent("partner-agent-6");
eventRequest.addDataItem(testEvent);
eventRequest.executeAsync(); 

### Funcionalidad de filtrado


#### Ejemplo de código de PHP

 lass APIFilter implements Filter &#123;
 public function shouldSendEvent(Event $event): bool
 &#123;
 if ($event->getEventId() === &#039;125&#039;) &#123;
 return false;
 &#125;
 return true;
 &#125;
&#125;
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$event_request->setCustomEndpoint($capiIngressRequest);
$capiIngressRequest->setFilter(new APIFilter()); 

#### Ejemplo de código de Java

 CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
eventRequest.setCustomEndpoint(capiSyncRequest);


capiSyncRequest.setFilter(new CustomEndpointRequest.Filter() &#123;
 &#064;Override
 public boolean shouldSendEvent(Event event) &#123;
 if (event.getEventId().equals("125")) &#123;
 return true;
 &#125;
 return false;
&#125;
&#125;); 

## Más información

 - Gateway de la API de conversiones
- Gateway de la API de conversiones para varias cuentas
- Parámetros de la API de conversiones
- Prácticas recomendadas
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Verificación de la configuración - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/verifying-setup

Verificación de la configuración - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Verificar tu configuración

Esta página detalla formas de verificar que tu configuración funcione correctamente y está diseñada para ayudarte a mejorar el rendimiento de las publicidades. El proceso para verificar tu configuración consiste en lo siguiente:

 - Verificar que los eventos se reciben correctamente
- Verificar que los eventos se envíen lo más cercano al tiempo real como sea posible
- Verificar que los eventos se dedupliquen correctamente
- Verificar que los eventos se corresponden con usuarios con alta precisión
 

## Verificar que los eventos se reciben correctamente


### Eventos de supervisión recibidos

Después de que envía tus eventos, confirmamos que los recibimos en el administrador de eventos. Puedes verificarlos dentro de los 20 minutos después de enviarlos.

 Curso de Meta Blueprint: Configurar, implementar y verificar la API de conversiones

 Para supervisar eventos recibidos en el administrador de eventos, en la página "Orígenes de datos", haz clic en el píxel que corresponde al PIXEL_ID de tu solicitud POST. Para obtener más información, consulta el Servicio de ayuda para empresas: Navegar por el administrador de eventos.

Luego, haz clic en Información general. Aquí verás el número de eventos que recibimos antes de deduplicarlos, descartarlos debido a controles de consentimiento y por aplicación de otras políticas, o procesarlos. En Método de conexión, puedes ver el canal a través del que se envió el evento. Puedes hacer clic en el tipo de evento para obtener información más específica.


### Supervisar la actualización de eventos

Para ayudar a Facebook a optimizar tus anuncios, recomendamos que minimices el tiempo que transcurre entre que se produce un evento (representado por el parámetro event_time) y se comparte con Facebook, para que sea lo más cercano al tiempo real posible.

Puedes utilizar el administrador de eventos para supervisar la actualización de los eventos. En la página de Información general de un píxel determinado, haz clic en el botón Detalles del evento para obtener información más específica sobre el evento. En esta página, ve a la pestaña de Actualización de eventos. En esta pestaña, puedes ver el tiempo de retraso promedio de los eventos en una escala de tiempo real a semanal.

 

## Verificar que los eventos se dedupliquen correctamente

Para lograr un rendimiento óptimo de los anuncios, recomendamos a los anunciantes que implementen la API de conversiones junto con el píxel de Meta. Si los anunciantes lo hacen de esta manera, es necesario que configuren un método de deduplicación que permita garantizar que el sistema de entrega de anuncios es capaz de diferenciar entre eventos diferentes y superpuestos. Obtén más información sobre deduplicación.

Puedes utilizar el administrador de eventos para supervisar el porcentaje de eventos que se deduplicaron. En la página de Información general de un píxel determinado, haz clic en el botón de Detalles del evento para obtener información más específica sobre el tipo de evento. En esta página, ve a la pestaña de Deduplicación de eventos.

Esta pestaña muestra la siguiente información:

 - Tasa de eventos deduplicados: este es el porcentaje de eventos que se deduplicaron de los orígenes de eventos. A mayor porcentaje, mejor es, y se mostrará una advertencia cuando tu tasa de deduplicación sea demasiado baja. Puede mejorar las tasas de deduplicación agregando más parámetros de deduplicación al evento.
- Tasa de uso de claves de deduplicación: este es el porcentaje de eventos de cada origen que contenían cada clave de deduplicación. "Superposición" es el porcentaje de eventos con una clave de deduplicación determinada que se reciben de ambos orígenes (como un porcentaje del origen con la menor cantidad de eventos recibidos). Tener una "superposición" bajo significa que la implementación envía claves de deduplicación no únicas desde un origen o algún origen, o bien envía eventos con una clave de deduplicación desde un solo origen.
 

## Verificar que los eventos se corresponden con usuarios con alta precisión

Cuando tus eventos se corresponden con personas con una cuenta de Facebook, tus eventos se pueden usar mejor atribuir y optimizar anuncios. En el administrador de eventos, puedes supervisar la calidad de las coincidencias de eventos, una medida que indica qué tan eficaces son los parámetros de la información del cliente relacionada con el evento del servidor a la hora de asociarla con una cuenta de Facebook.

La puntuación de calidad de las coincidencias de eventos va del 1 al 10. Puedes supervisar la calidad de las coincidencias de eventos de dos maneras:

 - Ir a la página Información general de un píxel de Meta determinado con la API de conversiones
- Usar la API de calidad de configuración
 Tener una puntuación de calidad alta de las coincidencias de eventos puede ayudar a disminuir tu costo por acción. Cuando sea posible, recomendamos que intentes obtener una puntuación de calidad de las coincidencias de eventos de 6,0 o superior. Puedes hacer clic en el puntaje de calidad de las coincidencias de eventos para ver detalles adicionales y recomendaciones para mejorar la calidad de las coincidencias de eventos. Obtén más información sobre las prácticas recomendadas en relación con la calidad de las coincidencias de eventos.

 

## Consulta también

 - API de calidad de configuración
- Meta Blueprint: Configurar, implementar y verificar la API de conversiones
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Parámetros - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameters

Parámetros - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros

Incluyen todos los parámetros de datos de eventos obligatorios y los parámetros de datos adicionales que la API de conversiones necesita utilizar para la optimización de la entrega de anuncios o la atribución de anuncios.

 Ahora, la API de conversiones admite eventos del sitio web, de la app, offline y de mensajes comerciales.

Los eventos de sitios web compartidos con la API de conversiones requieren los parámetros client_user_agent, action_source y event_source_url, mientras que los eventos que no corresponden a sitios web requieren únicamente action_source. Estos parámetros mejoran la calidad de los eventos que se utilizan para entregar anuncios y pueden mejorar el rendimiento de las campañas.

Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos.

 

### Parámetros principales del cuerpo

 - data
- test_event_code
 

### Parámetros de información de los clientes

 - em: Correo electrónico — Se debe aplicar formato hash.
- ph: Número de teléfono — Se debe aplicar formato hash.
- fn: Nombre — Se debe aplicar formato hash.
- ln: Apellido — Se debe aplicar formato hash.
- ge: Género — Se debe aplicar formato hash.
- db: Fecha de nacimiento — Se debe aplicar formato hash.
- ct: Ciudad — Se debe aplicar formato hash.
- st: Estado — Se debe aplicar formato hash.
- zp: Código postal — Se debe aplicar formato hash.
- country: País — Se debe aplicar formato hash.
- external_id: Identificador externo — Se recomienda aplicar formato hash.
- client_ip_address: Dirección IP del cliente — No aplicar formato hash.
- client_user_agent: Agente de usuario del cliente — No aplicar formato hash.
- fbc: Identificador de clic — No aplicar formato hash.
- fbp: Identificador de navegador — No aplicar formato hash.
- subscription_id: Identificador de suscripción — No aplicar formato hash.
- fb_login_id: Identificador de inicio de sesión con Facebook — No aplicar formato hash.
- lead_id: Identificador de cliente potencial — No aplicar formato hash.
- anon_id: Identificador de instalación — No aplicar formato hash. (Nota: Este parámetro solo se aplica a eventos de la app).
- madid: Identificador de anunciante en celulares — No aplicar formato hash. (Nota: Este parámetro solo se aplica a eventos de la app).
- page_id: Identificador de la página — No aplicar formato hash.
- page_scoped_user_id: identificador de usuario específico de la página — No aplicar formato hash.
- ctwa_clid: Identificador de clic a WhatsApp — No aplicar formato hash.
- ig_account_id: Identificador de la cuenta de Instagram — No aplicar formato hash.
- ig_sid: Identificador de clic a Instagram — No aplicar formato hash.
 

### Parámetros de eventos del servidor

 - event_name
- event_time
- user_data
- custom_data
- event_source_url
- opt_out
- event_id
- action_source
- data_processing_options
- data_processing_options_country
- data_processing_options_state
- referrer_url
- customer_segmentation
 

### Parámetros de datos de la app

 - advertiser_tracking_enabled
- application_tracking_enabled
- extinfo
- campaign_ids
- install_referrer
- installer_package
- url_schemes
- windows_attribution_id
- anon_id
- madid
- vendor_id
 Nota: Consulta el documento API de conversiones para eventos de la app si necesitas orientación sobre cómo integrar los eventos de la app.


### Parámetros estándar

Consulta una lista de todos los parámetros estándar que los usuarios pueden enviar a Meta.


### Parámetros de datos de eventos originales

 - event_name
- event_time
- order_id
- event_id
 


### API de conversiones para la optimización de clientes potenciales

Si integras tu sistema de administración de relaciones con los clientes (CRM) con la API de conversiones para los eventos de clientes potenciales, consulta la guía de integración de CRM para obtener más información sobre los campos obligatorios.


### Más información

 - Información general: parámetros fbp y fbc
 

## Más información

 - API de conversiones: documentación
- Uso de la API de conversiones
- Guía sobre privacidad y uso de datos de Meta
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Biblioteca del administrador de parámetros - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameter-builder-library

Biblioteca del administrador de parámetros - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Biblioteca del administrador de parámetros

La biblioteca del administrador de parámetros es una lista de SDK tanto en el lado del cliente (JavaScript del navegador) como en el lado del servidor (PHP, Java, Python, NodeJS, Ruby). Puedes implementar la biblioteca del administrador de parámetros para mejorar la calidad de la integración de la API de conversiones. La biblioteca puede ayudarte a crear, administrar y enviar determinados parámetros de información de los clientes, lo que puede generar mejoras en el rendimiento a través de mayores puntuaciones de calidad de coincidencia de eventos (EMQ). La biblioteca optimiza la administración de parámetros de eventos mediante lo siguiente:

 - Maximizar la calidad de coincidencia: genera automáticamente claves de coincidencia de la API de conversión de alta prioridad según las prácticas recomendadas de Meta.
- Mejorar la cobertura de parámetros: aumenta la cobertura de parámetros de eventos importantes, como fbc (identificador de clic de Meta), fbp (identificador de navegador de Meta) y direcciones IP.
- Garantizar un formato correcto: garantiza que la información de los clientes que compartes, como el correo electrónico y el número de teléfono, tenga el formato correcto para maximizar la probabilidad de coincidencia con los usuarios de Meta.
- Reducir el esfuerzo manual: minimiza el trabajo manual y el potencial de errores asociados a la administración de los parámetros de eventos por cuenta propia.
 

## Información general sobre las bibliotecas

Lado del cliente: la biblioteca y los eventos residen en el front-end del lado del navegador. Las bibliotecas se implementan en JavaScript. Los desarrolladores pueden integrarlas directamente en su página web.

Lado del servidor: las bibliotecas y los eventos residen en el back-end del lado del servidor. Según el lenguaje que se use en el back-end, Meta proporciona bibliotecas en diferentes lenguajes (PHP, Java, Python, NodeJS y Ruby).

 

## Funciones admitidas

Los parámetros admitidos son los siguientes:

 Parámetro admitido SDK admitido Descripción `fbc` (identificador de clic) cadena JavaScript en el lado del cliente

PHP

NodeJS

Java

Python

Ruby

 El valor del identificador de clics de Meta se almacena en la cookie del navegador _fbc en tu dominio. Consulta Administrar los parámetros fbc y fbp para averiguar cómo obtener o generar este valor a partir de un parámetro de consulta fbclid.

El formato es: fb.$&#123;subdomain_index&#125;.$&#123;creation_time&#125;.$&#123;fbclid&#125;.$&#123;appendix&#125;

Ejemplo: fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890.ABcDEFGh

 `fbp` (identificador de navegador) cadena JavaScript en el lado del cliente

PHP

NodeJS

Java

Python

Ruby

 El valor del identificador del navegador de Meta se almacena en la cookie del navegador _fbp en tu dominio. Consulta Administrar los parámetros fbc y fbp para obtener información sobre cómo obtener o generar este valor.

El formato es: fb.$&#123;subdomain_index&#125;.$&#123;creation_time&#125;.$&#123;random_number&#125;.$&#123;appendix&#125;

Ejemplo: fb.1.1596403881668.1116446470.ABcDEFGh

 `client_ip_address` (dirección IP del cliente) cadena

 JavaScript en el lado del cliente

PHP

NodeJS

Java (próximamente)

Python (próximamente)

Ruby (próximamente)

 La dirección IP del navegador correspondiente al evento debe ser una dirección IPV4 o IPV6 válida. En el caso de los usuarios que pueden usar una dirección IPV6, esta es preferible a la IPV4. El parámetro de datos de usuario client_ip_address nunca debe estar en formato hash.

Ejemplo:

IPV4: 168.212.226.204.ABcDEFGh

IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.ABcDEFGh

 Parámetros normalizados

 cadena - Correo electrónico (em)
- Número de teléfono (ph)
- Nombre (fn)
- Apellido (ln)
- Fecha de nacimiento (db)
- Género (ge)
- Ciudad (ct)
- Estado (st)
- Código postal (zp)
- País (country)
- Identificador externo (external_id)
 JavaScript en el lado del cliente

PHP

NodeJS

Java (próximamente)

Python (próximamente)

Ruby (próximamente)

 La dirección IP del navegador correspondiente al evento debe ser una dirección IPV4 o IPV6 válida. En el caso de los usuarios que pueden usar una dirección IPV6, esta es preferible a la IPV4. El parámetro de datos de usuario client_ip_address nunca debe estar en formato hash.

Ejemplo:

IPV4: 168.212.226.204.ABcDEFGh

IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.ABcDEFGh

 

## Formato admitido

Para todos los parámetros procesados por el administrador de parámetros, Meta agregará un campo de apéndice al final de cada parámetro para ayudar a evaluar el rendimiento de la biblioteca. El campo del apéndice tiene 8 caracteres que incluyen (1) la versión del SDK, (2) la incrementalidad y (3) el idioma del SDK.

Consulta Github para obtener información sobre la implementación. (ejemplo PHP)

Nota: Si ves el apéndice con solo dos caracteres, es un apéndice antiguo que solo contiene el idioma del SDK. Te recomendamos actualizar a la versión más reciente.

 

## Prácticas recomendadas

 - Implementar en todas las superficies: asegúrate de que las bibliotecas se apliquen a todas las superficies, como dispositivos móviles, computadoras y navegadores, y dominios de los que quieras hacer seguimiento.
- Bibliotecas del lado del cliente y del lado del servidor:

La biblioteca en el servidor es para la integración back-end del servidor. La biblioteca en el lado del servidor admite diferentes lenguajes (PHP, Java, Python, NodeJS y Ruby)
- La biblioteca en el lado del cliente se utiliza para la integración front-end en el navegador. Ten en cuenta que el lado del cliente solo está disponible en JavaScript.
 - Administración de cookies:

Captura las cookies cuanto antes. Asegúrate de guardar las cookies _fbp y _fbc cuanto antes en el recorrido del cliente en tu página web. Lo ideal sería obtener las cookies _fbp y _fbc cuando cargue la página de destino. No se recomienda recuperarlas solo de eventos de retención/fidelización o cuando se activan determinados eventos.
- Preserva el formato del valor de la cookie: no reemplaces ni modifiques las cookies _fbc ni _fbp. _fbc distingue mayúsculas de minúsculas, por lo que no hay que normalizar ni dar formato a _fbc en minúsculas.
 - Manejo de direcciones IP:

Prioriza el uso de IPv6 para getIpFn. Al implementar la funcionalidad getIpFn, recomendamos obtener primero la dirección IPv6 y, luego, recurrir a la dirección IPv4 si la capacidad de recuperación de la dirección IPv6 no está disponible en el lado del cliente del usuario.
- Se recomienda que integres tanto el administrador de parámetros en el lado del cliente como en el lado del servidor para lograr un rendimiento óptimo.

Usa el administrador de parámetros en el lado del cliente para recuperar el valor de client_ip_address y guardarlo en una cookie primero.
- Luego, usa el administrador de parámetros en el lado del servidor para obtener el mejor valor de "client_ip_address" disponible tanto de una cookie como de una solicitud para enviar a Meta usando la API de conversiones.
 - Normalización y hashing de datos:

Normaliza y hashea una sola vez. Recomendamos aplicar normalización y hashing a los parámetros de información de los clientes solo una vez, ya sea en el lado del cliente o en el lado del servidor, antes de enviarlos a Meta a través de la API de conversiones.
- El valor del parámetro distingue entre mayúsculas y minúsculas. Todos los valores de los campos de parámetros de información de los clientes que devuelve el administrador de parámetros distinguen entre mayúsculas y minúsculas. Puedes enviar estos valores a Meta a través de la API de conversiones sin realizar ninguna normalización (por ejemplo, uso de minúscula), ya que el SDK del administrador de parámetros lo hace automáticamente durante el proceso.
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# API de conversiones para eventos de la app - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/app-events

API de conversiones para eventos de la app - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# API de conversiones para eventos de la app

La API de conversiones permite a los anunciantes enviar eventos web, de la app, de la tienda física y de mensajes comerciales a Meta a través de un único punto de conexión en lugar de hacerlo a través de orígenes múltiples. Esta consolidación puede simplificar la pila de tecnología de un anunciante y crear una vista más completa dentro del administrador de eventos de Meta si se utilizan conjuntos de datos.

Esta documentación proporciona orientación para integrar eventos de la app en la API de conversiones.

 

## Requisitos previos


### 1. Conjunto de datos

Los eventos de la app enviados mediante la API de conversiones deben estar asociados a un conjunto de datos.

 Datasets allow advertisers to connect and manage event data from web, app, store and business messaging event sources to the Conversions API. Datasets may show event data from any of these integrations that you choose to set up:

 
- Meta Pixel (website events)

- App Events API (app events, including Facebook SDK for iOS or Android, mobile measurement partners (MMPs))

- Offline Conversions API (Meta’s legacy API for offline events)

- Messaging Events API (messaging events)

 

Datasets enable you to view all customer activities from a single interface. They also allow you to reduce the effort to build and maintain multiple API integrations.


In Events Manager, advertisers have different options to create a dataset depending on their starting point. Or you can create a brand new dataset in Events Manager by linking during offline event set creation or through an existing mobile app or during messaging event set creation information. Note that linking a dataset to an application is required before sending mobile app events to the Conversions API and only one application can be linked to a dataset. See more details and instructions here.


 Puedes realizar la llamada GET a https://graph.facebook.com/v16.0/&#123;ads-pixel-id&#125;/is_consolidated_container con el fin de detectar si el conjunto de datos del anunciante está consolidado y, por lo tanto, cumple los requisitos para pasar eventos offline con la API de conversiones.


### 2. Permisos

 - Si deseas implementar una integración directa como anunciante, sigue las instrucciones que se encuentran aquí para obtener los requisitos y permisos.
- Si deseas implementar una integración de la plataforma de socios, sigue las instrucciones que se encuentran aquí para obtener información sobre los requisitos y permisos.
 

## Configuración


### Enviar eventos de la app a la API de conversiones

a. Vincular el identificador del conjunto de datos y el identificador de la app

En el administrador de eventos, hay dos formas posibles de vincular tu app con un conjunto de datos:

 - Selecciona la pestaña "Orígenes de datos", busca la pestaña "Configuración" de tu app y realiza la vinculación.
- Selecciona la pestaña "Orígenes de datos" en la pestaña "Información general" de tu app, utiliza el botón "Vincular con el conjunto de datos" en la sección "Toda la actividad".
 Una vez que completes la vinculación, el conjunto de datos incluirá la app conectada.


 
b. Campos obligatorios

Puedes hacer referencia aquí al conjunto de parámetros actuales que se pueden enviar a través de la API de conversiones. Para enviar eventos de la app, es posible compartir el siguiente valor server_event fields en la carga útil:

 - El parámetro action_source debe contener el valor app de los eventos de la app.
- El event_id es obligatorio en el caso de configurar la deduplicación.
- app_data fields
- user_data fields
- custom_data fields
 

### Campos de datos de la app

 Parameter Description `advertiser_tracking_enabled` boolean Required for app events


Use this field to specify ATT permission on an iOS 14.5+ device. Set to 0 for disabled or 1 for enabled.


 `application_tracking_enabled` boolean Required for app events


A person can choose to enable ad tracking on an app level. Your SDK should allow an app developer to put an opt-out setting into their app. Use this field to specify the person&#039;s choice. Use 0 for disabled, 1 for enabled.


 `extinfo` object Please use the down arrow to the right to see the list of extinfo values.


 Required for app events


Extended device information, such as screen width and height. This parameter is an array and values are separated by commas. When using extinfo, all values are required and must be in the order indexed below. If a value is missing, fill with an empty string as a placeholder.


Note:


 
- version must be a2 for Android

- version must be i2 for iOS

 
 0


 string Required


extinfo version


Example: i2


 1


 string app package name


Example: com.facebook.sdk.samples.hellofacebook


 2


 string short version (int or string)


Example: 1.0


 3


 string long version


Example: 1.0 long


 4


 string Required


OS version


Example: 13.4.1


 5


 string device model name


Example: iPhone5,1


 6


 string locale


Example: En_US


 7


 string timezone abbreviation


Example: PDT


 8


 string carrier


Example: AT&T


 9


 string screen width


Example: 320


 10


 string screen height


Example: 568


 11


 string screen density


Example: 2


 12


 string CPU cores


Example: 2


 13


 string external storage size in GB


Example: 13


 14


 string free space on external storage in GB


Example: 8


 15


 string device timezone


Example: USA/New York


 `campaign_ids` string Optional


An encrypted string and non-user metadata appended to the outbound URL (for example, ad_destination_url) or deep link (for App Aggregated Event Measurement) when a user clicked on a link from Facebook.


Graph API definition: Parameter passed via the deep link for Mobile App Engagement campaigns.


 `install_referrer` string Optional
Third party install referrer, currently available for Android only, see here for more.


 `installer_package` string Optional


Used internally by the Android SDKs


 `url_schemes` array Optional


Used internally by the iOS and Android SDKs.


 `vendor_id` string Optional


Vendor ID.


 `windows_attribution_id` string Optional


Attribution token used for Windows 10.


 

### Parámetros de información del cliente

 Parámetro Descripción `anon_id` Cadena No aplicar formato hash. El identificador de instalación. Este campo representa instancias de instalación de la app únicas.

 `client_ip_address` Cadena No aplicar formato hash. La dirección IP del navegador correspondiente al evento debe ser una dirección IPV4 o IPV6 válida. En el caso de los usuarios que pueden usar una dirección IPV6, esta es preferible a la IPV4. El parámetro de datos de usuario client_ip_address nunca se debe proteger con una función hash. Tampoco se deben incluir espacios. Proporciona siempre la dirección IP real para asegurarte de que los informes de eventos sean correctos.Nota: Esta información se agrega de forma automática a eventos enviados a través del navegador, pero se debe configurar manualmente en el caso de los eventos enviados a través del servidor.

 Ejemplo:IPV4: 168.212.226.204IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

 `madid` Cadena No aplicar formato hash. Tu identificador del anunciante en dispositivos móviles o el identificador de publicidad de un dispositivo Android o Apple (IDFA).

 

### Datos personalizados

 Parámetro Descripción `description` Cadena Opcional. Cadena, descripción de evento, personalizada.

 `level` Cadena Opcional. Cadena, nivel de un juego, personalizado.

 `max_rating_value` Opcional. Largo, límites superiores de una escala de calificación, por ejemplo 5 en una escala de 5 estrellas, personalizado.

 `success` Booleano Opcional.1 para sí, 0 para no, personalizado.

 
En resumen, los eventos de la app que se comparten utilizando la API de conversiones requerirán los siguientes parámetros de datos:

 - action_source: debe configurarse en "app". (si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos).
- event_id: obligatorio si se desea configurar la deduplicación. Ver detalles en la sección "Configurar la deduplicación de varios canales".
- advertiser_tracking_enabled
- application_tracking_enabled
- extinfo
 A continuación, se presenta un ejemplo de extinfo. Asegúrate de que todos los siguientes subparámetros estén completos y en orden secuencial. Si falta alguno, usa una cadena vacía para reemplazarlo.

 Nombre del subparámetro Obligatorio Tipo de datos Ejemplo Versión de extinfo

 Sí

 Cadena

 i2 (la versión debe ser a2 para Android e i2 para iOS)

 app package name

 No

 Cadena

 com.facebook.sdk.samples.hellofacebook

 short version

 No

 Cadena

 1.0

 long version

 No

 Cadena

 1.0 long

 os version

 Sí

 Cadena

 13.4.1

 device model name

 No

 Cadena

 iPhone5,1

 locale

 No

 Cadena

 En_US

 timezone abbr

 No

 Cadena

 PDT

 carrier

 No

 Cadena

 AT&T

 screen width

 No

 Cadena

 320

 screen height

 No

 Cadena

 568

 screen density

 No

 Cadena

 2

 cpu core

 No

 Cadena

 2

 external storage size

 No

 Cadena

 13

 free space in external storage size

 No

 Cadena

 8

 device time zone

 No

 Cadena

 USA/New York

 
c. Configurar la deduplicación de varios canales

El mecanismo de deduplicación será obligatorio si se desea eliminar el tráfico de eventos duplicados entre la integración de la API de conversiones y todas las demás integraciones anteriores que tengas con eventos de la app, entre los que se incluyen SDK, MMP y API de eventos de la app.

En relación con los eventos de la app, aplicamos la misma funcionalidad de deduplicación que existe para eventos web. La lógica utiliza la deduplicación basada en el campo event_id y event_name (API de conversiones y SDK / Eventos de la API de eventos de la app presentan el mismo event_id). El parámetro event_id es un identificador que puede distinguir de manera única entre eventos similares. Los identificadores de eventos imprecisos pueden hacer que la deduplicación de tu conversación sea incorrecta y afectar, además, los informes sobre conversiones y el rendimiento de las campañas.

Puedes consultar la siguiente documentación para desarrolladores para implementar la configuración de la deduplicación:

 - Cómo configurar eventos de la app
- Ejemplo de configuración de la deduplicación
 Aquí hay un ejemplo de cómo registrar un evento personalizado. Para hacerlo, pasa el nombre del evento como AppEvents.Name en el SDK para iOS:

AppEvents.shared.logEvent(.achievedLevel, parameters: [AppEvents.ParameterName(rawValue: "event_id"): "123"])En relación con los eventos de instalación de apps, ya existe un mecanismo de deduplicación que asegura que solo se atribuya una instalación en un intervalo anterior de los 90 días. Mantenemos el primer evento y soltamos los posteriores sin tener en cuenta el origen de acción del que provengan. No es obligatorio implementar la deduplicación de eventos de la app relacionados con los eventos de instalación.

d. Enviar eventos

Para enviar nuevos eventos, realiza una solicitud POST a la API de conversiones desde esta ruta: https://graph.facebook.com/&#123;API_VERSION&#125;/&#123;DATASET_ID&#125;/events?access_token=&#123;TOKEN&#125;

Cuando publicas en este perímetro, Meta crea nuevos eventos de servidor de la app. Para obtener más detalles, consulta el siguiente documento para desarrolladores.

A continuación, encontrarás un ejemplo de cómo insertar los parámetros en el esquema general de una carga útil de evento de Compra:

&#123;
 "data": [
 &#123;
 "event_name": "Purchase",
 "event_time": 1684389752,
 "action_source": "app",
 "user_data": &#123;
 "client_ip_address": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
 "em": [
 "30a79640dfd8293d4f4965ec11821f640ca77979ca0a6b365f06372f81a3f602"
 ],
 "ph": [
 "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b",
 "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
 ],
 "madid": "38400000-8cf0-11bd-b23e-10b96e40000d",
 "anon_id": "12345340-1234-3456-1234-123456789012"
 &#125;,
 "custom_data": &#123;
 "currency": "USD",
 "value": "142.52"
 &#125;,
 "app_data": &#123;
 "advertiser_tracking_enabled": 1,
 "application_tracking_enabled": 1,
 "campaign_ids": "abcd1234",
 "extinfo": [
 "a2",
 "com.some.app",
 "771",
 "Version 7.7.1",
 "10.1.1",
 "OnePlus6",
 "en_US",
 "GMT-1",
 "TMobile",
 "1920",
 "1080",
 "2.00",
 "2",
 "128",
 "8",
 "USA/New York"
 ]
 &#125;
 &#125;
 ]
&#125;A continuación, encontrarás un ejemplo de cómo insertar los parámetros en el esquema general de una carga útil de evento de Instalación:

&#123;
 "data": [
 &#123;
 "event_name": "MobileAppInstall",
 "event_time": 1684389252,
 "action_source": "app",
 "user_data": &#123;
 "client_ip_address": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
 "madid": "38400000-8cf0-11bd-b23e-10b96e40000d",
 "anon_id": "12345340-1234-3456-1234-123456789012"
 &#125;,
 "app_data": &#123;
 "advertiser_tracking_enabled": 1,
 "application_tracking_enabled": 1,
 "extinfo": [
 "a2",
 "com.some.app",
 "771",
 "Version 7.7.1",
 "10.1.1",
 "OnePlus6",
 "en_US",
 "GMT-1",
 "TMobile",
 "1920",
 "1080",
 "2.00",
 "2",
 "128",
 "8",
 "USA/New York"
 ]
 &#125;
 &#125;
 ]
&#125;

## Solución de problemas

Puedes usar la herramienta de ayuda de carga para generar datos de carga:

 - Elige el origen de acción app si corresponde.
- Rellena la información de los eventos que se enviarán a Meta.
- Se generará la carga útil del evento, que se puede utilizar como plantilla para integrar la API de conversiones.
 Utiliza la herramienta "Probar eventos" en el administrador de eventos para realizar pruebas.

 

## Más información

 - Información general de la API de conversiones
- Uso de la API de conversiones
- Parámetros de la API de conversiones
- Prácticas recomendadas
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# API de conversiones para eventos offline - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/offline-events

API de conversiones para eventos offline - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Enviar eventos offline utilizando la API de conversiones

La API de conversiones es el método de integración recomendado por Meta para enviar eventos offline y de tienda física a Meta para que los use para realizar mediciones, atribuciones y segmentaciones. En esta página, se detalla cómo enviar eventos offline cuando se realiza una integración directa o con socios de la API de conversiones.

 

## Requisitos previos


### Conjunto de datos

Los eventos offline que se envían a través de la API de conversiones deben estar asociados con un conjunto de datos.

 Datasets allow advertisers to connect and manage event data from web, app, store and business messaging event sources to the Conversions API. Datasets may show event data from any of these integrations that you choose to set up:

 
- Meta Pixel (website events)

- App Events API (app events, including Facebook SDK for iOS or Android, mobile measurement partners (MMPs))

- Offline Conversions API (Meta’s legacy API for offline events)

- Messaging Events API (messaging events)

 

Datasets enable you to view all customer activities from a single interface. They also allow you to reduce the effort to build and maintain multiple API integrations.


In Events Manager, advertisers have different options to create a dataset depending on their starting point. Or you can create a brand new dataset in Events Manager by linking during offline event set creation or through an existing mobile app or during messaging event set creation information. Note that linking a dataset to an application is required before sending mobile app events to the Conversions API and only one application can be linked to a dataset. See more details and instructions here.


 Puedes hacer la llamada GET a https://graph.facebook.com/v16.0/&#123;ads-pixel-id&#125;/?fields=is_consolidated_container con el fin de detectar si el conjunto de datos del anunciante está consolidado y, por lo tanto, cumple los requisitos para pasar eventos offline con la API de conversiones.


### Permisos

 - Si deseas implementar una integración directa como anunciante, sigue las instrucciones que se encuentran aquí para obtener los requisitos y permisos.
- Si deseas implementar una integración de la plataforma de socios, sigue las instrucciones que se encuentran aquí para obtener información sobre los requisitos y permisos.
 

## Configuración


### 1. Configurar parámetros de eventos offline

Los anunciantes pueden utilizar la configuración indicada aquí y hacer referencia al conjunto de parámetros actuales que se pueden enviar a través de la API de conversiones. Para enviar eventos offline y almacenar eventos, es posible compartir los siguientes campos en la carga útil:

 - Los anunciantes necesitan enviar action_source como physical_store en relación con todos los eventos offline y en tiendas. Ten en cuenta que este parámetro es obligatorio para todos los tipos de eventos del servidor. Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos.
- Todos los campos de evento del servidor obligatorios de la API de conversiones deben respetarse.
- Parámetros de información del cliente (ver a continuación para consultar la lista de parámetros adecuada de los eventos offline y en tiendas).
- Parámetros de datos personalizados (ver a continuación para consultar la lista de parámetros adecuada de los eventos offline y en tiendas).
- Parámetro opcional: el parámetro upload_tag aún se admite para subidas de eventos offline de anunciantes que utilizan la API de eventos offline heredada.
 

### Parámetros de información del cliente

La siguiente lista contiene parámetros de información del clientes que se suelen utilizan en relación con los eventos offline y en tiendas:

 
 Nombres de los parámetros
 
 Parámetro
 
 c &#123; "entityMap": [object Object], "blockMap": OrderedMap &#123; "eaien": c &#123; "key": "eaien", "type": "unstyled", "text": "Se debe convertir a formato hash", "characterList": List [ b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125;, b &#123; "style": OrderedSet &#123;&#125;, "entity": null &#125; ], "depth": 0, "data": Map &#123;&#125; &#125; &#125;, "selectionBefore": b &#123; "anchorKey": "eaien", "anchorOffset": 0, "focusKey": "eaien", "focusOffset": 1972, "isBackward": false, "hasFocus": true &#125;, "selectionAfter": b &#123; "anchorKey": "eaien", "anchorOffset": 32, "focusKey": "eaien", "focusOffset": 32, "isBackward": false, "hasFocus": true &#125; &#125;
 Direcciones de correo electrónico

 email

 SÍ

 Números de teléfono

 phone

 SÍ

 Género

 gen

 SÍ

 Fecha de nacimiento

 db

 SÍ

 Apellido

 ln

 SÍ

 Nombre

 fn

 SÍ

 Ciudad

 ct

 SÍ

 Estados de los EE. UU.

 st

 SÍ

 Códigos postales

 zip

 SÍ

 País

 country

 SÍ

 Identificador de publicidad de Apple

 madid

 SÍ

 Identificador de publicidad de Android

 madid

 SÍ

 Identificador de usuario de terceros

 external_id

 Muy recomendado

 Identificador del cliente potencial a partir de los anuncios para clientes potenciales

 lead_id

 NO convertir a formato hash

 

### Parámetros de datos personalizados

La siguiente sección contiene parámetros personalizados comunes que utilizan los eventos offline y en tiendas. Para obtener más campos de datos personalizados, consulta en el siguiente enlace la lista completa que admitimos para la API de conversiones.

 Parámetro Descripción event_time

Tipo: entero

 Obligatorio

La marca de tiempo UNIX del evento de conversión.

 Ejemplo:&#039;1456870055&#039;


 event_name

Tipo: cadena

 Obligatorio

Tipo de evento.

 Ejemplo:ViewContent, Search, AddToCart, AddToWishlist, InitiateCheckout, AddPaymentInfo, Purchase, Lead, Other


 store_data

Tipo: diccionario JSON

 Opcional

Almacena datos de ubicación sobre el evento de conversión.

 Ejemplo:

"store_data":
 &#123;
 "store_page_id": 8576093908, // FBID
 "brand_page_id": 10236898932// FBID
 "store_code": "64CharacterAlphaNumericString" // String
 &#125;currency

Tipo: cadena

 Obligatorio

Código de divisa ISO de tres letras de este evento de conversión. Obligatorio en el caso de eventos de Purchase.

 Ejemplo:USD


 value

Tipo: doble

 Obligatorio

Valor del evento de conversión. Obligatorio en el caso de eventos de Purchase.

 Ejemplo:16.00


 content_type

Tipo: cadena

 Opcional

Los anuncios del catálogo Advantage+content_type válidos.

 Ejemplo:product


 contents

Tipo: matriz JSON

 Opcional. Obligatorio si integras tus anuncios con un catálogo.

Obligatorio: id, quantity

Recomendado: price, brand, category

Obligatorio: [ &#123;id: "A", quantity: 1&#125;, &#123;id: "B", quantity: 2&#125;, &#123;id: "C", quantity: 1&#125;]

Recomendado: [ &#123;id: "A", quantity: 1, brand: "Brand_A", category: "", price: 10.0&#125;]


 custom_data

Tipo: diccionario JSON

 Opcional.

Información sobre este evento de conversión.

Ejemplo: &#123;category: &#039;ICECREAM&#039;&#125;


 order_id

Tipo: cadena

 Opcional.

Identificador único para cada transacción o pedido en un conjunto de eventos offline. Por ejemplo, en el caso del sector minorista, puede ser un identificador de recibo.

Ejemplo: ATN10001, 123456


 item_number

Tipo: cadena

 Opcional.

Identificador único para distinguir eventos dentro del mismo pedido o transacción.

Ejemplo: 1, a


 


### 2. Enviar eventos

Para enviar nuevos eventos, realiza una solicitud POST a la API de conversiones desde esta ruta: https://graph.facebook.com/&#123;API_VERSION&#125;/&#123;DATASET_ID&#125;/events?access_token=&#123;TOKEN&#125;

Cuando se publica en este perímetro, Meta crea nuevos eventos offline y de la tienda. Para obtener más detalles, consulta el siguiente documento para desarrolladores.

Aquí información general de cómo encajan los parámetros en el esquema general de la carga útil:

curl -X POST \
 -F &#039;data=[
 &#123;
 "event_name": "Purchase",
 "event_time": 1674000041,
 "user_data": &#123;
 "em": [
 "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"
 ],
 "ph": [
 "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
 "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6"
 ]
 &#125;,
 "custom_data": &#123;
 "currency": "usd",
 "value": 123.45,
 "contents": [&#123;
 "id": "product123",
 "quantity": 1
 &#125;]
 &#125;,
 "action_source": "physical_store"
&#125;
]&#039; \
 -F &#039;access_token=<ACCESS_TOKEN>&#039; \
 https://graph.facebook.com/v15.0/<DATASET_ID>/eventsRecomendamos realizar subidas en tiempo real o a diario para obtener buenos resultados de optimización. De esta manera, es posible hacer coincidir de forma efectiva los datos offline en relación con el desempeño de cualquier anuncio que publiques.

event_time puede ser hasta 7 días antes de que envíes un evento a Meta. Si un event_time en data excede los 7 días pasados, devolvemos un error para toda la solicitud y no procesamos ningún evento. En el caso de los eventos offline y en tiendas física con physical_store como action_source, debes subir las transacciones dentro de los 62 días posteriores a la conversión.

Como los datos que subes se procesan en tiempo real, suele ser posible ver los resultados en cuanto termines de agregarlos. Puedes consultar el documento del servicio de ayuda sobre prácticas recomendadas relacionadas con los datos de eventos offline.


### 3. Configurar deduplicación

A diferencia de la deduplicación configurada en los eventos de la API de conversiones y del píxel de Meta, los eventos offline solo pueden deduplicarse en comparación con otros eventos offline. Admitimos dos métodos de deduplicación: el método basado en order_id o el método basado en user. La deduplicación utiliza la combinación de campos: dataset_id, event_time, event_name y item_number y el campo clave que se basa en el método de la correspondiente carga útil del evento.

La deduplicación predeterminada utiliza order_id con una combinación de los campos anteriores. Si order_id no está disponible en la carga útil, se utilizará la lógica de deduplicación basada en user.

Por ejemplo, en caso de que haya dos órdenes con event_time idénticos, donde event_name tiene el mismo order_id o el mismo conjunto de parámetros de información del cliente sin order_id, consideraremos que son eventos duplicados y tomaremos el primer evento. El método de deduplicación basado en user solo funciona con los mismos campos de los parámetros de información del cliente en las dos cargas útiles.

El intervalo de deduplicación máximo es de 7 días.


### 4. Solución de problemas en eventos

Puedes usar la herramienta de ayuda de carga útil para generar datos de carga útil:

 - Elige un origen de acción physical_store si corresponde. Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos.
- Rellena la información de los eventos que se enviarán a Meta.
- Se generará la carga útil del evento, que se puede utilizar como plantilla para integrar la API de conversiones.
 Utiliza la herramienta "Probar eventos" en el administrador de eventos para realizar pruebas.

 

## Más información

 - Dataset Quality API para eventos offline
- Guía de configuración óptima de Omni: prácticas recomendadas y requisitos
- Información general de la API de conversiones
- Uso de la API de conversiones
- Parámetros de la API de conversiones
- Prácticas recomendadas
 

### Artículos del servicio de ayuda para empresas

 - Crear un conjunto de datos durante la creación de un conjunto de eventos offline
- Prácticas recomendadas relacionadas con los datos de eventos offline
- Cómo los anunciantes pueden utilizar las conversiones offline
- Cómo ver los resultados de las campañas asignadas a un conjunto de datos específico
- Cómo funciona la deduplicación de eventos offline
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# API de conversiones para mensajes comerciales - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/business-messaging

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

---
# Integración de clientes potenciales de conversión - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration

Integración de clientes potenciales de conversión - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Integración de API de conversiones para CRM

Es posible que ya tengas configurada la API de conversiones de Meta para que el negocio pueda cargar los eventos de servidor de tu tráfico web. Si usas Facebook o Instagram para generar clientes potenciales a fin de que tu negocio convierta ventas, también puedes usar la API de conversiones para cargar eventos offline desde tu sistema de administración de relaciones con los clientes (CRM). Generalmente, se trata de una integración distinta de la configuración actual de la API de conversiones, porque los parámetros obligatorios son diferentes y los datos provienen del sistema de CRM, en vez de los servidores web.

Si integras el CRM y usas el objetivo de rendimiento de clientes potenciales de conversión, puedes obtener clientes potenciales de mayor calidad y con mayores probabilidades de conversión. Por el momento, este objetivo de optimización solo es compatible con los anuncios para clientes potenciales de Facebook e Instagram (formularios instantáneos).

Es necesario que ya cuentes con una integración establecida para descargar clientes potenciales de Meta en tu CRM (se resaltan en verde en la imagen que se muestra a continuación). En esta guía completa, se explica el proceso de integración de CRM para volver a enviar datos de eventos de la porción inferior del embudo de CRM a Meta (se resaltan en rojo en la imagen que se muestra a continuación).

 

## Comprueba si tu negocio es una buena opción

Antes de comenzar a trabajar en la integración de la API de conversiones para CRM, debes comprobar si el negocio se adaptará bien al modelo de optimización. A continuación, encontrarás algunas normas que deberán cumplir las integraciones.

 - Usa los anuncios para clientes potenciales (formularios instantáneos) de Facebook/Instagram.
- Para obtener mejores resultados, asegúrate de que el identificador de clientes potenciales de Meta de entre 15 y 17 dígitos esté almacenado en tu CRM. Se recomienda enviar identificadores de clientes potenciales para cada evento. Si no tienes uno, sugerimos que envíes parámetros del cliente, como identificador de clic, número de teléfono o correo electrónico.
- Genera al menos 200 clientes potenciales por mes.
- La integración debe poder cargar datos con regularidad, al menos una vez al día.
- La etapa de cliente potencial que deseas optimizar se produce en un plazo de 28 días desde que se genera el cliente potencial.
- La etapa de cliente potencial que deseas optimizar tiene un porcentaje de conversiones que oscila entre 1% y 40%.
 

## Planifica la línea de tiempo del proyecto

Si crees que tu negocio se adapta bien a la optimización, puedes usar esta línea de tiempo estimada para planificar el proyecto. El tiempo estimado para evaluar el proyecto es, según los datos históricos, de 1 mes. Sin embargo, el calendario real puede variar para todos los anunciantes. La línea de tiempo dependerá de los recursos disponibles en lo que respecta a la toma de decisiones y la resolución de problemas en el marco de la integración.

 Sección Descripción Propietario de la tarea Duración estimada 1: Conectar el CRM con los anuncios para clientes potenciales

 Descargar automáticamente clientes potenciales de Facebook

 Anunciante

 Requisitos previos

 2: Primeros pasos con la integración del CRM

 Crear o seleccionar un píxel de Meta para los eventos del CRM

 Anunciante

 <1 día

 3: Implementar la integración de CRM (desarrollador)

 Conectar el CRM mediante la API de conversiones

 Anunciante

 Meta Business Partner <1 día

Entre 3 y 4 semanas﹡

 4: Verificar tus datos (no requiere acción del anunciante)

 Esperar la validación de los datos

 Meta

 Aprox. 1 a 2 días

 5: Configurar el embudo de ventas

 Configurar los eventos del embudo de ventas dentro del CRM

 Anunciante

 <1 día

 6: Fase de aprendizaje (no requiere acción del anunciante)

 Esperar el análisis del embudo y el período de entrenamiento ﹡﹡

 Meta

 2 a 4 semanas

 —

 Ejecutar campañas de optimización de clientes potenciales de conversión a pleno rendimiento

 Anunciante

 Tiempo total

 Aprox. 3 a 4 semanas

 ﹡ Se puede reducir la duración de este paso si se utiliza la integración con socios. ﹡﹡ Es posible realizar campañas de rendimiento de clientes potenciales durante el período de entrenamiento, pero no se verá el aumento del rendimiento hasta que el entrenamiento haya finalizado.

 

## Roles y responsabilidades

A continuación, se describen los roles que deben incluirse en el proyecto. Ten en cuenta que algunos roles pueden consolidarse o dividirse según la organización.

 Rol Responsabilidades Equipo de ventas y marketing

 - Suele ser el rol que inicia el proyecto e identifica el personal que requiere la organización para finalizar la integración.
- Tiene conocimiento detallado del proceso de ventas y de marketing, lo que le permite definir el embudo.
- Cuenta con los permisos necesarios para realizar las tareas en el administrador de anuncios y el administrador de eventos de Meta.
- Crea la integración entre el CRM y Meta, si se incluye una integración con socios, como Zapier.
 Administrador del CRM

 - Tiene conocimiento detallado de los campos y las funciones del CRM.
- Crea nuevos campos y procesos dentro del CRM, de ser necesario.
- Brinda asistencia a los especialistas en marketing y desarrolladores durante todo el proceso de integración.
 Desarrollador

 - Crea la integración entre el CRM y Meta, si se incluye una integración manual.
- Se asegura de que la integración manual funcione correctamente.
 → Siguiente 1: Connecting Your CRM With Lead Ads 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Dataset Quality API - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/dataset-quality-api

Dataset Quality API - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 Volver al documento en español Se actualizó este documento.
La traducción en español no está disponible todavía. Actualización del documento en inglés: 8 dic. 2025 
Actualización del documento en español: 20 oct. 2025 

# Dataset Quality API


Advertisers that share server events using the Conversions API can see the event match quality score in Meta Events Manager. However, this only works on an individual basis and is difficult to scale in cases where a Tech Provider partner, agency partner or advertiser is managing hundreds and thousands of Meta Pixels for their businesses. The Dataset Quality (formerly known as Integration Quality) API can help solve this problem by consolidating dataset quality metrics programmatically at scale.


 

## What’s New


As of May 28th, 2025, the following additional metrics have been added to the API for querying.


 
- Additional Conversions Reported

- Additional Conversions Reported per parameter

- Additional Conversions Reported for per event

- Additional Conversions Reported for event coverage

- Event Coverage

- Event Deduplication

- Data Freshness

- Event Match Quality Diagnostics

 

Also, the Dataset Quality API for Offline Events, currently under beta, and new metrics are now available.


 

## Common Use Cases


Partners and agencies may use the Dataset Quality API to provide a quality dashboard and insights, while helping their advertisers to enhance and optimize their integrations. Partners may also use this integration to monitor the stability of their Conversions API integration. Advertisers may use this endpoint to aggregate dataset quality data to incorporate in their monitoring.


 

## Setup Requirements


### Ownership and Access


#### Advertiser Authentication Using Meta Business Manager


 
- In Business Manager, go to the Users section and select the System User tab. Click on the specific system user you are using for the Conversions API.

- Go to the Assign Asset dialog and choose Pixels. Then, select the pixels you want to send events on behalf of.

- For each pixel, select the Manage Pixel permission, and click Save Changes.

- Go back to your system user&#039;s details page. Verify that the selected pixels are visible there.

- To generate the access token, follow instructions here.

 


#### Partner Platform Authentication


You must first request authorization to send events on behalf of your clients. You have the following authentication options:


##### Facebook Login for Business (Recommended)


Facebook Login for Business is the preferred authentication and authorization solution for Tech Providers and business app developers who need access to their business clients&#039; assets. It allows you to specify the access token type, types of assets, and permissions your app needs, and save it as a set (configuration). You can then present the set to your business clients to complete the flow and grant your app access to their business assets.


##### Meta Business Extension (Recommended)


With this option, Meta Business Extension (MBE) returns all the necessary information needed to send events on behalf of the client. MBE provides an endpoint to retrieve system user access tokens created in the client’s Business Manager. This process includes permissions to send server events and is done automatically and securely. MBE is currently under beta. Please contact your Meta representative for access.


The endpoint requires a user access token as an input parameter. If you are a new MBE user, call this endpoint to fetch the system user access token after you have finished setting up MBE. Existing users need to ask for re-authentication before calling the new API endpoint.


##### Client Shares Meta Pixel to Partner’s Business Manager


With this option, the client shares their Meta Pixel to the partner using Business Manager settings or by the API. Then, the partner can assign the partner system user to the client pixel and generate an access token to send server events.


##### Client Generates Token Manually Using Events Manager


Advertisers can generate access tokens in Events Manager to set up the Conversions API and access the Dataset Quality API. You can configure a direct integration or share the generated access token with your partners to send events to Meta. You can copy and save this new token. Note that Meta will not store these tokens. The generated token will be able to fetch quality data and send events using the Conversions API.


 


#### User Permission


 
- The user or system user used to make the API call requires (at minimum) the following user permission: Partial access -> Use events dataset

- User access may be granted (in bulk) by using the instructions provided here.

 


#### App Permission


 
- Basic: If you manage a small number of Meta datasets and/or wish to test the Dataset Quality API, then the following app permissions are required: ads_read and (ads_management or business_management).

- Advanced: If you manage a high number of Meta datasets on behalf of other businesses and/or require higher rate limits, then the advanced level of the ads_management app permission and app feature Ads Management Standard Access is required. Advanced level app permissions and features require app review.

 
 

## Retrieving Dataset Quality Information


### Endpoint


https://graph.facebook.com/v25.0/dataset_quality

### Parameters


ParameterDescriptiondataset_idintegerRequired.
The ID of dataset (Pixel) to retrieve quality data.


 `access_token` string Required.
Valid (unexpired) access token for given dataset (Pixel) ID. We recommend setting up a long-lived system user access token. 
Read more about different types of access tokens in our dedicated guide.


 `agent_name` string Optional.
The normalized value of the partner_agent field is used to filter only events sent with partner_agent param in /&#123;pixel_id&#125;/events POST request (see attributing your events best practices here and here).


For example, if your partner_agent value is [partner_name]_[majorversion]_[minorVersion], your normalized agent string value will be partner_name in lowercase.


The agent_name allows you to set your own platform identifier when sending events on behalf of a client. If you are a managed partner/agency, work with your Meta representative to agree on an identifier for your platform.


If you are an advertiser, most of the time you should not worry about agent_name attribution.


If you do not provide an agent_name, all events regardless of whether they were sent by an agent or not, will be included in the EMQ calculation.


 

### Fields


 Field Description `web` array This field denotes a structured set of data related to website events. The filter is an array containing event_name and its metrics. This field is required by default in this API. See example section.


 `event_name` string A standard event or custom event name.


 `event_match_quality` [AdsPixelCAPIEMQ(/docs/marketing-api/reference/ads-pixel-capiemq)]


 Event Match Quality indicates how effective the customer information sent from your server may be at matching event instances to a Facebook account.


See more details here.


 `event_potential_aly_acr_increase` AdsPixelCAPIEventALYACR


 Additional Conversions Reported (ACR) for Conversions API Event is a metric that estimates how many conversions (for example, purchases or link clicks) are measured as a result of an advertiser’s Conversions API setup.


See more details here.


 `acr` AdsDatasetCAPIACR


 Additional Conversions Reported (ACR) is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. It also can help you determine if you can improve your Conversions API setup to measure more reported conversions. More reported conversions can help you decrease your cost per result and show your ads to people that find them relevant.


See more details here.


 `event_coverage` AdsDatasetEventCoverage


 Event coverage is the 7-day average percent of Pixel events that are covered by the Conversions API, and share deduplication keys with events from the Conversions API.


See more details here.


 `dedup_key_feedback` AdsDatasetDedupKeyFeedback


 Deduplication is a process used to prevent our system from counting the same event twice. In order for you to have a high event coverage, covered events must have a proper deduplication setup.


Deduplication key feedback helps to identify any active issues with deduplication.


See more details here.


 `data_freshness` AdsDatasetDataFreshness


 Data freshness tells you how current your data is. Use this information to understand the delay between the time the event occurred and when we received it.


See more details here.


 Tip: Look inside the node (follow hyperlink to the separate developers page) to find out all fields and child nodes for fields in the table above.


 

## EMQ


### About Event Match Quality


#### Event Match Quality


Event match quality (EMQ) is a score (out of 10) that indicates how effective the customer information sent from your server may be at matching event instances to a Meta account. High quality event matching may improve ads attribution and performance.


#### How It&#039;s Calculated


Event match quality is calculated by looking at which customer information parameters are received from your server using a Conversions API integration, the quality of the information received and the percent of event instances that are matched to a Meta account.


#### How It&#039;s Used


Event match quality is used to assess whether you&#039;re sending through the Conversions API the right customer information to match your events to a Meta account, and whether you have set up your customer information parameters correctly. Customer information parameters help match your events to a Meta account so you can attribute conversions to your ads and deliver them to people who are most likely to convert.
Event match quality is calculated in real time. Learn more about EMQ best practices here.


EMQ is currently available only for web events. For other event types such as offline and physical store events, app events, conversion leads or any integration under alpha or beta stages, contact your Meta representative for guidance on improving match quality.


Use case: Monitor event match quality score per event, along with match keys being sent, build an EMQ trendline or historical extracts, then hook up alerts/delectors for EMQ score and match keys drops.


Documentation: All fields available for EMQ diagnostics can be found on this developer&#039;s page.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_match_quality,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_match_quality,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_match_quality": &#123;
 "composite_score": 6.2,
 "match_key_feedback": [
 &#123;
 "identifier": "user_agent",
 "coverage": &#123;
 "percentage": 100
 &#125;
 &#125;,
 &#123;
 "identifier": "external_id",
 "coverage": &#123;
 "percentage": 100
 &#125;
 &#125;
 ] 
 &#125;,
 "event_name": "pLTVPurchase"
 &#125;,
 &#123;
 "event_match_quality": &#123;
 "composite_score": 7.2,
 "match_key_feedback": [
 &#123;
 "identifier": "email",
 "coverage": &#123;
 "percentage": 100
 &#125;
 &#125;,
 &#123;
 "identifier": "ip_address",
 "coverage": &#123;
 "percentage": 99.9
 &#125;
 &#125;,
 ]
 &#125;,
 "event_name": "CompleteRegistration"
 &#125;
 ]
 &#125;
 

## Additional Conversions Reported (ACR) for Event Match Quality parameters


Additional Conversions Reported (ACR) is a metric that estimates how many conversions (e.g. purchases or link clicks) are measured as a result of an advertiser’s Conversions API setup.


To learn more about this metric, see the About ACR article and the Learn More section.


Use case: For events connected to the Conversions API that have an EMQ score, monitor the uplift in additional conversions which the Conversions API is able to add when sending more and/or higher quality match keys.


Documentation: All fields available for ACR EMQ parameters can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_match_quality&#123;match_key_feedback&#123;identifier,potential_aly_acr_increase&#123;percentage,description&#125;&#125;&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_match_quality&#123;match_key_feedback&#123;identifier,potential_aly_acr_increase&#123;percentage,description&#125;&#125;&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_match_quality":
 "match_key_feedback": [
 &#123;
 "identifier": "email",
 "potential_aly_acr_increase": &#123;
 "percentage": 58.96,
 "description": "Similar advertisers who sent valid Email for Purchase saw a 58.96% median increase in their existing additional conversions reported."
 &#125;
 &#125;,
 &#123;
 "identifier": "ip_address",
 "potential_aly_acr_increase": &#123;
 "percentage": 20.65,
 "description": "Similar advertisers who sent valid Ip Address for Purchase saw a 20.65% median increase in their existing additional conversions reported."
 &#125;
 &#125;,
 ]
 &#125;
 "event_name": "Purchase"
 &#125;,
 ]
&#125;
 

## EMQ Diagnostics


Event match quality diagnostics are issues we’ve identified with your Conversions API integration. Follow the provided recommendations to send higher quality match keys, optimize your ad performance and improve your EMQ score.


Use case: Extract and store EMQ diagnostics in your environment, set up notifications using channels like email, messenger or in-app notifications in order to resolve issues reactively.


Documentation: All fields available for EMQ diagnostics can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_match_quality&#123;diagnostics&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_match_quality&#123;diagnostics&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_match_quality": &#123;
 "diagnostics": [
 &#123;
 "name": "Update your IPv4 IP addresses to IPv6 IP addresses",
 "description": "Your server is sending IPV4 IP addresses through the Conversions API. We recommend updating to IPV6 IP addresses because this is the industry standard and offers better durability for this integration.",
 "solution": "You can update your web server and DNS provider configuration to support IPv6. In your server payload, send the client_ip_address retrieved from customer interactions. Use the payload helper to see how this value should be structured when it&#039;s sent to Meta. If this issue is not applicable or actionable, you can ignore it.",
 "percentage": 59.5,
 "affected_event_count": 18930,
 "total_event_count": 31830
 &#125;,
 &#123;
 "name": "Server sending mismatched IP addresses",
 "description": "Your server is sending client IP addresses that do not match those from Meta Pixel. This may impact the attribution and optimization of your ad campaigns.",
 "solution": "In your server payload, send the client_ip_address retrieved from customer interactions. Use the payload helper to see how this value should be structured when it&#039;s sent to Meta.",
 "percentage": 61.5,
 "affected_event_count": 19567,
 "total_event_count": 31830
 &#125;
 ]
 &#125;
 "event_name": "Purchase"
 &#125;,
 ]
&#125;
 

## Event Coverage


Event coverage is the 7-day average percentage of Meta Pixel events that are covered by the Conversions API, and share deduplication keys with events from the Conversions API.


Learn more about event coverage best practices by reading this Business Help Center article.


Use case: Evaluate the events which are connected by server versus those which are not. For example, if an advertiser has three events, ViewContent, AddToCart and Purchase, but only Purchase is sent by server, the event coverage will be 33%.


Documentation: All fields available for event coverage can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_coverage&#123;percentage,goal_percentage,description&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_coverage&#123;percentage,goal_percentage,description&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123; 
 "web": [
 &#123;
 "event_coverage": &#123;
 "percentage": 34.1,
 "goal_percentage": 75,
 "description": "The percentage of events received from your Conversions API compared to unique browser events from the Meta Pixel."
 &#125;,
 "event_name": "B2B Purchase"
 &#125;,
 ]
&#125;

 

## Additional Conversions Reported (ACR) for Event Coverage


Additional Conversions Reported (ACR) for Event Coverage is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. For event coverage, you can see the potential improvement in additional conversions reported if the event coverage and deduplication both meet the best practices.


To learn more about additional conversions reported, see the About ACR article and the Learn More section.


Use case: For events connected to the Conversions API that have event coverage below 75% threshold, monitor the uplift in additional conversions which the Conversions API is able to add when covering more events (increasing server versus browser ratio).


Documentation: All fields available for ACR for Event Coverage can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_coverage&#123;potential_aly_acr_increase&#123;percentage,description&#125;&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_coverage&#123;potential_aly_acr_increase&#123;percentage,description&#125;&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_coverage": &#123;
 "potential_aly_acr_increase": &#123;
 "percentage": 35.8,
 "description": "Similar advertisers who send the same AddToCart pixel events with matching deduplication keys through Conversions API saw a median of 35.8% additional conversions reported versus those that only used Meta Pixel."
 &#125;
 &#125;,
 "event_name": "AddToCart"
 &#125;,
 ]
&#125;
 

## Event Deduplication


The Meta Pixel and the Conversions API enable you to share standard and custom events with Meta so you can measure and optimize ad performance. The Pixel enables you to share web events from a web browser, while the Conversions API enables you to share web events directly from your server.


If you connect website activity using both the Pixel and the Conversions API, we may receive the same events from the browser and the server. If we know that the events are the same and therefore redundant, we can keep one and discard the rest. This is called deduplication.


The deduplication key feedback shows the percentages of events from the Pixel and the Conversions API that were received with each deduplication key. We recommend sharing deduplication keys for all of your events – the higher the percentage, the better.


To learn more about deduplication best practices, see the Business Help Center article.


Use case: Monitor the rate of deduplication between browser and server events to help to increase event coverage rate for your Conversions API-connected events.


Documentation: All fields available for dedupe key feedback can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;dedupe_key_feedback&#123;dedupe_key,browser_events_with_dedupe_key&#123;percentage,description&#125;,server_events_with_dedupe_key&#123;percentage,description&#125;,overall_browser_coverage_from_dedupe_key&#123;percentage,description&#125;&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;dedupe_key_feedback&#123;dedupe_key,browser_events_with_dedupe_key&#123;percentage,description&#125;,server_events_with_dedupe_key&#123;percentage,description&#125;,overall_browser_coverage_from_dedupe_key&#123;percentage,description&#125;&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123; 
 "web": [
 &#123;
 "dedupe_key_feedback": [
 &#123;
 "dedupe_key": "event_id",
 "browser_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of browser events that contain this dedupe key."
 &#125;,
 "server_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of server events that contain this dedupe key."
 &#125;,
 "overall_browser_coverage_from_dedupe_key": &#123;
 "percentage": 14.8,
 "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
 &#125;
 &#125;,
 &#123;
 "dedupe_key": "external_id",
 "browser_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of browser events that contain this dedupe key."
 &#125;,
 "server_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of server events that contain this dedupe key."
 &#125;,
 "overall_browser_coverage_from_dedupe_key": &#123;
 "percentage": 15.96,
 "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
 &#125;
 &#125;,
 &#123;
 "dedupe_key": "fbp",
 "browser_events_with_dedupe_key": &#123;
 "percentage": 0,
 "description": "The percentage of browser events that contain this dedupe key."
 &#125;,
 "server_events_with_dedupe_key": &#123;
 "percentage": 0,
 "description": "The percentage of server events that contain this dedupe key."
 &#125;,
 "overall_browser_coverage_from_dedupe_key": &#123;
 "percentage": 0,
 "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
 &#125;
 &#125;
 ],
 "event_name": "AddToCart"
 &#125;,
 ]
&#125;
 

## Data Freshness


Data freshness indicates the delay between the time the event occurred and when we received it. Best practice is to share your events in real time, or as close to real time as possible


The Meta Pixel defaults to sending web browser events in real time. To get the most value from your events, we recommend you send them in real time or as close to real time as possible. Events sent with a delay may impact how effectively your ads can be delivered to the right audiences.


To learn more about data freshness best practices, see the Business Help Center article.


Use case: Evaluate how quickly events are received from server versus browser. Improve frequency to real_time when possible to get the most value from your event data.


Documentation: All fields available for data freshness can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;data_freshness&#123;upload_frequency,description&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;data_freshness&#123;upload_frequency,description&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123; 
 "web": [
 &#123;
 "data_freshness": &#123;
 "upload_frequency": "real_time",
 "description": "The average frequency with which instances of this event are received through the Conversions API."
 &#125;,
 "event_name": "ViewContent"
 &#125;,
 &#123;
 "data_freshness": &#123;
 "upload_frequency": "hourly",
 "description": "The average frequency with which instances of this event are received through the Conversions API."
 &#125;,
 "event_name": "Lead"
 &#125;,
 ]
&#125;
 

## Additional Conversions Reported (ACR) for Conversions API Event


Additional Conversions Reported (ACR) for Conversions API Event is a metric that estimates how many conversions (for example, purchases or link clicks) are measured as a result of an advertiser’s Conversions API setup.


To learn more about additional conversions reported, see the About ACR article and the Learn More section.


Use case: For Meta Pixels not connected to the Conversions API, extract the additional conversions reported metric to estimate the impact a Conversions API integration may have.


Documentation: All fields available for ACR for Conversion API event can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_potential_aly_acr_increase&#123;description,percentage&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_potential_aly_acr_increase&#123;description,percentage&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_potential_aly_acr_increase": &#123;
 "description": "Similar advertisers who set up Conversions API for Search events saw a median of 32.9% additional conversions reported versus those that only used Meta Pixel.",
 "percentage": 32.9
 &#125;,
 "event_name": "Search"
 &#125;,
 &#123;
 "event_potential_aly_acr_increase": &#123;
 "description": "Similar advertisers who set up Conversions API for PageView events saw a median of 30.1% additional conversions reported versus those that only used Meta Pixel.",
 "percentage": 30.1
 &#125;,
 "event_name": "PageView"
 &#125;
 ]
&#125;
 

## Additional Conversions Reported (ACR)


Additional Conversions Reported (ACR) is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. It also can help you determine if you can improve your Conversions API setup to measure more reported conversions. More reported conversions can help you decrease your cost per result and show your ads to people that find them relevant.


To learn more about additional conversions reported, see the About ACR article and the Learn More section.


Use case: For events connected to the Conversions API and have an EMQ score, monitor the uplift in additional conversions which the Conversions API is able to drive.


Documentation: All fields available for ACR can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;acr&#123;description,percentage&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;acr&#123;description,percentage&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "acr": &#123;
 "description": "In the last 7 days, you saw about 37.9% more conversions reported for Search events by using the Conversions API alongside the Meta Pixel.",
 "percentage": 37.9
 &#125;,
 "event_name": "Search"
 &#125;,
 &#123;
 "acr": &#123;
 "description": "In the last 7 days, you saw about 45.5% more conversions reported for Page View events by using the Conversions API alongside the Meta Pixel..",
 "percentage": 45.5
 &#125;,
 "event_name": "PageView"
 &#125;
 ]
&#125;
 

## FAQs


What Is the Dataset Quality API?Advertisers that share server events using the Conversions API can see the event match quality score in Events Manager. However, this only works on an individual basis and is difficult to scale in cases where a tech provider partner, agency partner or advertiser is managing hundreds and thousands of Meta Pixels for their businesses. The Dataset Quality (formerly known as Integration Quality) API can help solve this problem by consolidating dataset quality metrics programmatically at scale.


 Enlace permanente What is the access token used for? The access token is used when partners send signal events or access the Setup Quality API on behalf of advertisers. The client system user access token onboarding method is not compatible with the EMQ API at the moment.


 Enlace permanente How should the partner_agent field be formatted? The partner_agent value in your API GET request should be a normalized lowercase format. This field is now optional.


 Enlace permanente Can an Access Token Generated Using Events Manager Prior to July 2025 Access the Dataset Quality API Directly? The advertiser will need to go to Events Manager to accept by using the instructions in the Client Generates Token Manually Using Events Manager section explained above. Once the advertiser completes the opt-in process, both the new token and existing generated tokens by the same user will be able to send events or access the Dataset Quality API.


 Enlace permanente 

## Learn More


 
- Conversions API Best Practices.

- Drive performance with an optimized Conversions API setup.

- Optimizing your setup can help unlock the potential of your marketing performance.

- Best practices to onboard the Conversions API for partners.

- Conversions API dataset quality guidance in the Business Help Center:

 

 
- Best practices for Conversions API to help improve ad performance. These Conversions API best practices can help businesses improve their ad performance by lowering their cost per action. We suggest following these best practices upon initial setup, but they can also be used to update existing setups.

- View server event details in Meta Events Manager. After businesses set up the Conversions API, they can use this article to learn how to monitor events and parameters to make sure their setup is working effectively and identify opportunities for improvement. Businesses can use this article to learn how to use server event details (Event Match Quality, Data Freshness, Event Overview and Event Deduplication) in Events Manager to improve their Conversions API setup.

 

 
- Additional Conversions Reported:

 

 
- About additional conversions reported.

- Troubleshoot reasons why your additional reported conversions are not available.

- How to interpret additional conversions reported

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Manejo de eventos duplicados - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events

Manejo de eventos duplicados - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Manejo de eventos de píxel y de API de conversiones duplicados

Para lograr un rendimiento óptimo de los anuncios, recomendamos a los anunciantes que implementen la API de conversiones junto con el píxel de Meta. Podrás encontrar aquí detalles y más información sobre este enfoque recomendado que denominamos "configuración redundante".

Cuando los anunciantes usan una configuración redundante, deben configurar un método de deduplicación para garantizar que el sistema de entrega de anuncios pueda diferenciar entre eventos diferentes y superpuestos. En este documento se describen varias opciones de métodos de deduplicación que ayudan a Facebook a deduplicar eventos.

Los anunciantes que no envían el mismo evento dos veces a través de la API de conversiones y el píxel de Meta no necesitan configurar la deduplicación para esos eventos.

 La API de conversiones ahora permite a los anunciantes enviar eventos de tiendas web, de apps y físicas a Meta a través de un único punto de conexión en lugar de varios. Obtén más información sobre la API de conversiones.

 

## Opciones de deduplicación de eventos

Facebook intenta deduplicar los eventos idénticos enviados mediante el píxel de Meta y la API de conversiones. Podemos deduplicar los eventos de dos maneras:


### Identificador del evento y nombre del evento (recomendada)


#### Parámetros obligatorios

En este enfoque, se agrega el parámetro event_id a los eventos desde la API de conversiones y el píxel del navegador. El parámetro event_id es un identificador que puede distinguir con precisión eventos similares. Obtén más información sobre el parámetro event_id.


#### Descripción del enfoque

Determinamos si los eventos son idénticos en función del identificador y el nombre. Entonces, para que se deduplique un evento:

 - En los eventos correspondientes, el valor de eventID del píxel de Meta debe coincidir con el valor de event_id de la API de conversiones.
- En los eventos correspondientes, el valor de event del píxel de Meta debe coincidir con el valor de event_name de la API de conversiones.
 Una vez que se reciben los eventos, empleamos una serie de estrategias para la desduplicación entre los eventos que pueden ayudar a mejorar la optimización y la medición. Si los contenidos de los eventos del servidor y del navegador no difieren considerablemente, por lo general preferimos el evento que se recibe primero.

Ten en cuenta que el parámetro eventID del píxel es el cuarto argumento de la llamada de seguimiento fbq.

Ejemplo

fbq(&#039;track&#039;, &#039;Purchase&#039;, &#123;value: 12, currency: &#039;USD&#039;&#125;, &#123;eventID: &#039;EVENT_ID&#039;&#125;);


### FBP o identificador externo


#### Parámetros obligatorios

En este enfoque, debes usar event_name, fbp y/o external_id de manera coherente en los eventos de navegador y servidor. Consulta Parámetros de información de los clientes para obtener más detalles sobre los parámetros external_id y fbp.


#### Descripción del enfoque

Si configuraste los parámetros external_id y/o fbp para que se pasen a través del navegador y el servidor, nos ocuparemos de eliminar automáticamente los eventos duplicados. El proceso funciona del siguiente modo:

 - Nos envías un evento de navegador con event_name, fbp y/o external_id.
- Luego, nos envías un evento de servidor con event_name, fbp y/o external_id.
- Comparamos el evento de servidor con el evento de navegador que enviaste primero. Más específicamente, comparamos las combinaciones de event_name y fbp y/o external_id.
- Empleamos una serie de estrategias para la desduplicación entre los eventos que pueden ayudar a mejorar la optimización y la medición. Si los contenidos de los eventos del servidor y del navegador no difieren considerablemente, por lo general preferimos el evento que se recibe primero.
 

#### Límites del enfoque

Este método de deduplicación tiene las siguientes características:

 - Generalmente, solo funciona para desduplicar eventos enviados primero desde el navegador y luego a través del servidor. No se descartan eventos de servidor si no se recibió un evento de navegador en las últimas 48 horas, incluso si se recibe un evento de navegador idéntico después del evento de servidor.
- No deduplica eventos cuando se utiliza un solo origen de eventos, es decir, solo de navegador o solo de servidor. Si nos envías dos eventos de navegador consecutivos con la misma información, no descartamos ninguno. Si nos envías dos eventos de servidor consecutivos con la misma información, no descartamos ninguno.
 

## Configuración de deduplicación en el píxel del navegador

Para mejorar las coincidencias, necesitamos información precisa de tus eventos provenientes tanto del píxel de Meta como de la API de conversiones:

 - El valor de eventID dentro del parámetro opcional eventData debe ser único. Según la implementación del píxel de Meta, puedes usar lo siguiente:
 track: envía el evento de todos los píxeles de la página
 fbq(&#039;track&#039;, &#039;Purchase&#039;, &#123;value: 12, currency: &#039;USD&#039;&#125;, &#123;eventID: &#039;EVENT_ID&#039;&#125;);
- trackSingle: envía el evento de un píxel
 fbq(&#039;trackSingle&#039;, &#039;SPECIFIC_PIXEL_ID&#039;, &#039;Purchase&#039;, &#123;value: 12, currency: &#039;USD&#039;&#125;, &#123;eventID: &#039;EVENT_ID&#039;&#125;);
- Una etiqueta de píxel de imagen con el parámetro eid<img src="https://www.facebook.com/tr?id=PIXEL_ID&ev=Purchase&eid=EVENT_ID"/>
 
 
 Si el evento que compartes no contiene parámetros como valor y divisa, puedes configurarlo de la siguiente manera:
 
 fbq(&#039;track&#039;, &#039;Lead&#039;, &#123;&#125;, &#123;eventID: &#039;EVENT_ID&#039;&#125;);- El valor de eventID del píxel de Meta debe coincidir con el valor de event_id en el evento correspondiente proveniente de la API de conversiones.
- Si detectamos que se envió la misma combinación de clave de servidor (event_id y event_name) y de clave de navegador (eventID y event) al mismo identificador del píxel en un plazo de 48 horas, descartamos los eventos subsiguientes.
- Si nos envías tus eventos a través del navegador y de la API de conversiones junto con event_ids similares, ten en cuenta que los eventos solo se deduplican si se reciben dentro de un plazo de 48 horas después de que recibimos el primer evento con un event_id determinado.


## Verificar la configuración de deduplicación

Obtén información sobre cómo verificar la configuración de deduplicación y combinación de eventos en la documentación sobre cómo verificar la configuración.

 

## Más información

 - Parámetros
- Asistente de carga
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Guías - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides

Guías - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Guías

Usa estas guías para ayudarte a realizar las acciones comunes de la API de conversiones.

 

### Enviar solicitudes y verificar eventos

Obtén información sobre cómo enviar eventos a la API de conversiones, manejar solicitudes por lotes y eventos omitidos, y confirmar que se recibieron tus eventos.


### Configurar la API de conversiones como plataforma

Si ofreces el píxel de Meta a tus clientes, es posible que desees considerar agregar funcionalidades de la API de conversiones. Obtén información sobre cómo configurar nuestros eventos de servidor como parte de tu plataforma.


### Integración de Zapier

Aprovecha la plataforma de automatización de Zapier para enviar eventos a nuestra API de conversiones. Usa la app de Zapier de Facebook para enviar eventos automáticamente cada vez que algo cambie en tu origen de datos.


### API de conversiones para Google Tag Manager

La API de conversiones se puede usar para recopilar datos de eventos web y sin conexión claves de un servidor que configures en Google Cloud Platform. Obtén información sobre cómo realizar la implementación.


### Características del SDK de Meta para empresas para la API de conversiones

Obtén más información sobre tres funciones avanzadas del SDK para empresas diseñadas especialmente para los usuarios de la API de conversiones: solicitudes asincrónicas, creación simultánea de lotes e interfaz de servicio HTTP.

 

### Implementación de extremo a extremo

Guía paso a paso para implementar la API de conversiones. Instrucciones para la integración directa e integración como plataforma.


### Gateway de la API de conversiones

Un resumen y una guía paso a paso para configurar e implementar el gateway de la API de conversiones. También incluye instrucciones para solucionar problemas y supervisar.


### Gateway de la API de conversiones: AWS App Runner

Guía paso a paso para implementar una configuración del gateway de la API de conversiones con AWS App Runner.


### Gateway de la API de conversiones para varias cuentas

Guía paso a paso para conectar orígenes de datos administrados por diferentes cuentas empresariales de Meta a la misma instancia de gateway de la API de conversiones.


### Gateway de la API de conversiones para la API de plano de control de varias cuentas

Esta API permite a los desarrolladores administrar de forma programática cuentas, orígenes de datos y otros valores de configuración de una instancia del gateway.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Asistente de carga - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/payload-helper

Asistente de carga - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Asistente de carga

Completa los campos de datos de los parámetros recomendados para ver cómo debe estructurarse la carga cuando se envía a Facebook desde tu servidor.

 Los eventos de la web, las apps y los negocios físicos compartidos mediante la API de conversiones requieren parámetros específicos. La lista de parámetros obligatorios está disponible aquí.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Prácticas recomendadas - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices

Prácticas recomendadas - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Prácticas recomendadas: API de conversiones

Sigue estas prácticas recomendadas a fin de integrar correctamente la API de conversiones. Estas recomendaciones están diseñadas para ayudarte a usar la API de conversiones de la forma más efectiva. Sigue las recomendaciones de implementación y posimplementación para asegurarte de que la integración sea fluida y de obtener resultados óptimos cuando compartes datos con Meta.

Además de las siguientes prácticas recomendadas, te recomendamos que mires este video para ver un tutorial práctico sobre cómo usar la API de conversiones. En este video, aprenderás lo siguiente:

 - Enviar solicitudes
- Manejar eventos omitidos, fechas de transacción del evento y solicitudes por lotes
- Verificar eventos
- Usar la herramienta "Probar eventos"
 Los eventos de la web, las apps y los negocios físicos compartidos mediante la API de conversiones requieren parámetros específicos. La lista de parámetros obligatorios está disponible aquí.

 

## Implementación

Al configurar tu campaña, simplifica la estructura de la cuenta y utiliza las siguientes prácticas recomendadas establecidas para campañas:

 - Implementa las prácticas recomendadas de la fase de aprendizaje
- Evita realizar ediciones de campaña significativas
- Minimiza la superposición en la subasta
- Selecciona ubicaciones automáticas y optimización del presupuesto de la campaña
- Elige la estrategia de puja adecuada según tus objetivos comerciales
 

### Configurar eventos redundantes

Recomendamos que uses la API de conversiones además del píxel de Meta y que compartas los mismos eventos con ambas herramientas. A esta acción la denominamos configuración de evento redundante. Por ejemplo: si compartes los eventos Purchase, Initiate Checkout y Contact con el píxel de Meta, también deberías compartir esos mismos eventos desde tu servidor con la API de conversiones.

La API de conversiones te permite compartir eventos del sitio web que el píxel puede haber perdido por problemas de conectividad de la red o por errores que se produjeron al cargar la página. También se puede utilizar la API de conversiones para compartir otros tipos de información o eventos importantes que se producen offline o con posterioridad y que no se pueden compartir con el píxel.


### Asegurarse de duplicar los eventos redundantes

Al enviar eventos redundantes mediante el píxel de Meta y la API de conversiones, asegúrate de que ambos eventos tengan el mismo event_name y de incluir el event_id o una combinación de external_id y fbp. Recomendamos incluir todos estos parámetros para ayudar a que Meta deduplique de manera correcta los eventos y que reduzca los informes duplicados de eventos idénticos. Obtén más información sobre la deduplicación, cuándo es necesaria y cómo configurarla.


### Enviar parámetros requeridos y recomendados

Se requieren los siguientes parámetros para el evento del servidor y para la información del cliente:

 Parámetro Tipo Cuando se requiere action_source

 Evento del servidor

 Todos los eventos

 event_source_url

 Evento del servidor

 Todos los eventos del sitio web

 client_user_agent

 Información de clientes

 Todos los eventos del sitio web

 Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos. También recomendamos incluir los parámetros external_id y event_id en todos los eventos.

Enviar parámetros de información del cliente adicionales puede ayudar a aumentar la calidad de coincidencias de eventos. Solo se pueden utilizar eventos coincidentes para la atribución y la optimización de la entrega de los anuncios y, cuanto mayor sea la calidad de la coincidencia, mejor. Aunque no se puedan utilizar los eventos no coincidentes para la atribución y la optimización de la entrega de los anuncios, sí pueden usarse para mediciones básicas. Ejemplos de parámetros de información del cliente de alta calidad:

 - dirección de correo electrónico (em)
- dirección IP (client_ip_address)
- nombre (fn y ln)
- número de teléfono (ph)
 

### Requisitos de referencia para las coincidencias

Después del lanzamiento de la versión 13.0 de la API Graph, actualizaremos los requisitos de referencia sobre qué combinaciones de parámetros de información de los clientes se consideran válidas en un evento de la API de conversiones. Estos cambios nos ayudarán a brindar mejores comentarios cuando un evento tenga una combinación de parámetros de información de los clientes tan amplia que sea poco probable que sirva para mostrar coincidencias.

Un evento se considera no válido si solo incluye parámetros de información de los clientes que consisten en una de las siguientes combinaciones (o un subconjunto de ellas).

 - ct + country + st + zp + ge + client_user_agent
- db + client_user_agent
- fn + ge
- ln + ge
 Por ejemplo, si un evento tuviera solo los parámetros de información de los clientes ge, ct, st y country (que podrían corresponder a un hombre en Menlo Park, California, EE. UU.), se rechazaría porque esos parámetros de información de los clientes son un subconjunto de una de las combinaciones anteriores.


### Asegurarse de actualizar los parámetros fbp y fbc

Los parámetros fbp y fbc son valores de cookie que se establecen normalmente en los navegadores de los visitantes del sitio junto con la solución de cookies de origen de Meta, y pueden sufrir cambios. Si los envías como parámetros de usuarios, deberías actualizar con frecuencia los valores.

Estos valores se configurarán como cookies de origen cuando el píxel de Meta esté implementado en tu sitio web y pueden recuperarse para usarse en las solicitudes de la API de conversiones.


### Compartir eventos casi en tiempo real

Compartir eventos cuando ocurren puede contribuir a que tus campañas obtengan los mejores resultados. Puedes compartir eventos del servidor si utilizas la API de conversiones en tiempo real o en lotes casi en tiempo real.


### Utilizar "Probar eventos"

Recomendamos utilizar la herramienta "Probar eventos" para validar la conexión de la API de conversiones. En general, los desarrolladores deben utilizar sus propios parámetros de información del cliente (por ejemplo, nombre, dirección de correo electrónico, número de teléfono) para probar eventos, ya que es posible que se descarten dichos eventos si no coinciden con una cuenta de Facebook o Meta.

Puedes usar la herramienta "Probar eventos" para hacer lo siguiente:

 - Verificar que hayas configurado correctamente los eventos del servidor y que los hayamos recibido.
- Comprobar que hayas deduplicado correctamente los eventos. Para ello, debes ver qué eventos se procesaron y cuáles se deduplicaron.
- Depurar la actividad inusual.
 Obtén información acerca de cómo probar tus eventos del servidor con la herramienta "Probar eventos".


### Usar el Asistente de carga

Completa los campos de parámetros de datos recomendados y requeridos en la herramienta Asistente de carga a fin de ver cómo debería estructurarse tu carga para obtener recomendaciones de qué parámetros incluir.


### Usar nuestro SDK para empresas

Los ejemplos de código que se encuentran en nuestra documentación incluyen ejemplos de SDK para empresas en Python, Java, Ruby, PHP y Node. Pueden ayudar a ahorrar un poco de esfuerzo a la hora de desarrollar, por ejemplo, a la hora de convertir los parámetros de usuario a formato hash, lo que se hace de manera automática en el SDK para empresas.

 Si no estás pensando en usar el SDK para empresas, te recomendamos que implementes la conversión a formato hash.

 

### Usar la API de conversiones para eventos offline

La API de conversiones es compatible con todos los eventos offline y debería usarse como contenedor global para esos tipos de eventos. Ejemplos: ventas en tiendas físicas, llamadas telefónicas, acciones realizadas en dispositivos (como televisores inteligentes o consolas de juegos) y suscripciones offline.

Al enviar eventos offline, asegúrate de incluir el parámetro de evento action_source y selecciona el valor apropiado (en caso de que no sea website). Se requiere el origen de la acción a fin de determinar los objetivos de la campaña para la que se prevé el evento.

 Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos.

 

## Prácticas recomendadas para socios adicionales


### Agencias: enviar cadena partner_agent

Los socios o las agencias que comparten eventos en nombre de sus anunciantes deberían enviar una cadena partner_agent única, incluso el nombre de la plataforma como se señala en el documento. Si corresponde, trabaja con el representante específico de Meta para decidir cuál es la cadena de agente indicada.


### Plataformas de sitios web: anunciantes dedicados al registro

De forma predeterminada, los socios de la plataforma del sitio web pueden decidir si ofrecer API de conversiones de manera selectiva o activar anunciantes. El píxel de Meta y la API de conversiones comparten las mismas condiciones. Te recomendamos que actives tus clientes para compartir también sus datos usando la API de conversiones cuando configuren el píxel de Meta. Aunque consideremos que usar ambas herramientas te ayudará a fortalecer y asegurar el uso compartido de datos a largo plazo, también te sugerimos que les proporciones a tus clientes información sobre la API de conversiones y el píxel de Meta para que puedan tomar una decisión informada.

 

## Posimplementación


### Verificar la calidad de coincidencias de eventos

Si compartes eventos del servidor mediante la API de conversiones, puedes ver la calidad de coincidencias de eventos (EMQ) para cada evento en el administrador de eventos. La puntuación de la EMQ (sobre una base de 10) indica qué tan eficaz puede ser la información del cliente relacionada con el evento del servidor a la hora de asociarla con una cuenta de Facebook o Meta. Obtén más información sobre las prácticas recomendadas EMQ aquí.

La calidad de las coincidencias de eventos actualmente se encuentra disponible solo para eventos web. Para otros tipos de eventos, como los eventos offline y en tiendas físicas, los clientes potenciales de conversiones o cualquier integración en etapa alfa o beta, comunícate con tu representante de Meta a fin de recibir orientación sobre cómo mejorar la calidad de coincidencia de eventos.


### Realizar una prueba

Cuando uses la API de conversiones, te recomendamos que realices una prueba de la estrategia publicitaria de Meta y que la optimices. Las siguientes son algunas de las opciones de prueba:

 - Estudio del aumento de conversiones: entender el impacto incremental del rendimiento al usar eventos del servidor.
- Pruebas A/B: entender qué estrategia de campaña logra el mejor resultado y el más eficiente para optimizar el rendimiento.
 

## Más información

 - API de conversiones
- Implementación de extremo a extremo de la API de conversiones
- Parámetros fbp y fbc, API de conversiones
- Asistente de carga, API de conversiones
- Parámetros, API de conversiones
- API de conversiones offline
- Cadena partner_agent de la API de conversiones
- Deduplicación de eventos del píxel de Meta y de la API de conversiones, servicio de ayuda
- Solicitudes por lotes
- Probar eventos del servidor con la herramienta "Probar eventos", Servicio de ayuda
- SDK de Meta para empresas
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Solución de problemas - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/support

Solución de problemas - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Solución de problemas

Todas las API de Facebook comparten la misma infraestructura. Si buscas en el sitio web de los desarrolladores de Facebook, puedes encontrar información más relevante que se relacione con tu situación específica. También puedes visitar la página de ayuda para desarrolladores, verificar abrir errores y consultar el foro de la comunidad de desarrolladores de Facebook.

 

## Depuración

La API de conversiones devuelve datos mínimos para conservar el ancho de banda de la red. Si la carga útil del evento es válida, se devuelve un código de respuesta 2xx HTTP. Si no es válido, se devuelve un código de respuesta 4xx HTTP, con detalles mínimos del error en el cuerpo de respuesta.

 

## Errores de la API

Los errores de red o las solicitudes con formato incorrecto pueden provocar que se omitan los eventos. Recomendamos volver a realizar la solicitud en los casos en los que la respuesta indique un error no relacionado con el cliente, como tiempo de espera. A fin de considerar los diversos retrasos en la red, recomendamos configurar un tiempo de espera de 1.500 milisegundos en la solicitud. Para la mayoría de las solicitudes, el tiempo de respuesta será inferior a 600 milisegundos.

 

## Servicio de ayuda para empresas

 - Prácticas recomendadas relacionadas con la API de conversiones
 

## Meta Blueprint

 - Solucionar problemas de la API de conversiones
 

## Más información

 - Preguntas frecuentes y prácticas recomendadas del administrador comercial
- Extensión para Chrome del asistente para píxeles
- Preguntas frecuentes para desarrolladores
- Grupo de la comunidad de desarrolladores de Facebook
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# La API de conversiones como plataforma - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/set-up-conversions-api-as-a-platform

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

---
# Parámetros de eventos del servidor - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event

Parámetros de eventos del servidor - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros de eventos del servidor

 Parámetro Descripción `event_name` cadena Obligatorio. Nombre del evento estándar o evento personalizado. Se usa este campo para deduplicar los eventos que enviaron la página web (a través del píxel de Meta) o la app (a través del SDK o API de eventos de la app) y la API de conversiones. El parámetro event_id también se usa para la deduplicación.

Para la misma acción del cliente, el valor de event del evento del navegador o de la app debe coincidir con el valor de event_name del evento del servidor. Si encontramos una coincidencia entre los eventos enviados en un lapso de 48 horas, solo consideraremos el primero. Si un evento del servidor y un evento del navegador o de la app llegan aproximadamente al mismo tiempo (con una diferencia de 5 minutos), damos prioridad al evento del navegador o de la app. Obtén información sobre cómo deduplicar los eventos del píxel y del servidor.

 `event_time` entero Obligatorio. Marca de tiempo Unix en segundos que indica cuándo ocurrió realmente el evento. La hora especificada puede ser anterior a la hora a la que envías el evento a Facebook. De esta manera, es posible procesar por lotes y optimizar el rendimiento del servidor. Debes enviar esta fecha en la zona horaria GMT.

El valor de event_time puede ser hasta siete días antes que el momento en que envías el evento a Facebook. Si un event_time en data excede los 7 últimos días, devolvemos un error para toda la solicitud y no procesamos ningún evento.

 `user_data` objeto Obligatorio. Mapa que contiene información de los clientes. Consulta Parámetros de información de los clientes para ver las opciones. Consulta Coincidencias avanzadas para obtener información sobre las opciones comparables disponibles en caso de que se envíen los datos mediante el píxel de Meta.

 `custom_data` objeto Opcional. Mapa que incluye datos comerciales adicionales sobre el evento. Consulta Parámetros de datos personalizados para obtener más información.

 `event_source_url` cadena Opcional. La URL del navegador en el que ocurrió el evento. La URL deberá coincidir con el dominio verificado.


Nota: Se requiere event_source_url para los eventos de sitios web que se comparten mediante la API de conversiones.

 `opt_out` Booleano Opcional. Marca que indica que no se debe usar el evento para optimizar la entrega de anuncios. Si está configurado como true, el evento solo se usa para la atribución.

 `event_id` cadena Opcional. Este identificador puede ser cualquier cadena única que haya elegido el anunciante. Los parámetros event_id y event_name se usan para deduplicar los eventos que enviaron la página web (a través del píxel de Meta) o la app (a través del SDK o API de eventos de la app) y la API de conversiones. Ten en cuenta que, si bien event_id está marcado como opcional, se recomienda usarlo para deduplicar eventos.

A los fines de la deduplicación, el valor eventID del evento del navegador o de la app debe coincidir con el valor event_id del evento del servidor correspondiente. Obtén más información acerca del Manejo de eventos de píxel y de API de conversiones duplicados.

Se pueden usar como identificadores potenciales de event_id un número de orden o un identificador de la transacción. Por ejemplo, si un cliente realiza dos compras en el sitio web con los números de orden 123 y 456, las llamadas a la API de conversiones deberán incluir el correspondiente número de orden en el parámetro event_id. Esto nos permite distinguir correctamente estos dos eventos de compra como pedidos distintos. Es necesario que los dos eventos de compra correspondientes del píxel del navegador también envíen los mismos números de pedido en el parámetro eventID para que podamos comprender que solo ocurrieron dos eventos y no cuatro compras distintas.

En cuanto a los otros eventos que no cuentan con un número de identificación intrínseco, se puede usar un número aleatorio (siempre que el mismo número aleatorio se haya enviado entre el navegador y los eventos del servidor).

 `action_source` cadena Obligatorio. Este campo te permite especificar el lugar en el que se dan las conversiones. Saber dónde tuvieron lugar tus eventos ayuda a garantizar que lleguen a las personas indicadas. Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos.

Los valores que puedes enviar en el campo action_source son los siguientes:

 - email: la conversión se realizó por correo electrónico.
- website: la conversión se realizó en el sitio web.
- app: la conversión se realizó en la app para celulares.
- phone_call: la conversión se realizó por teléfono.
- chat: la conversión se realizó a través de una app de mensajes, un SMS o una función de mensajes online.
- physical_store: la conversión se realizó personalmente en la tienda física.
- system_generated: la conversión se produjo de forma automática; por ejemplo, la renovación de una suscripción configurada en pago automático mensual.
- business_messaging: la conversión se realizó a partir de anuncios de clic a Messenger, Instagram o WhatsApp.
- other: la conversión se produjo de una forma que no se enmarca en ninguna de las opciones anteriores.
 Nota : Todos los valores del origen de acción activan las funciones de medición de anuncios y creación de públicos personalizados. Todos los orígenes de acción activan las funciones de optimización de anuncios. `data_processing_options` matriz Opcional. Las opciones de procesamiento que deseas activar para un evento específico. El valor que se acepta actualmente con respecto al uso limitado de datos es LDU. Es posible enviar una matriz vacía para especificar de forma explícita que el evento no debe procesarse con las restricciones del uso limitado de datos. Obtén más información sobre las opciones de procesamiento de datos. Consulta los ejemplos de la implementación de la API de conversiones.

 `data_processing_options_country` entero Obligatorio si envías LDU en data_processing_options. Un país que deseas asociar a esta opción de procesamiento de datos. Los valores que se admiten actualmente son 1, para los Estados Unidos de América, o 0, para solicitar que geolocalicemos el evento. Obtén más información sobre las opciones de procesamiento de datos. Consulta los ejemplos de la implementación de la API de conversiones.

 `data_processing_options_state` entero Obligatorio en algunos casos. (Consulta la nota que aparece a continuación para obtener información detallada). Un estado que deseas asociar a esta opción de procesamiento de datos. Los valores que se admiten actualmente son 1000, para California, o 0, para solicitar que geolocalicemos el evento.

Nota:

 - Si defines un país, también debes definir un estado. De lo contrario, aplicamos la lógica de geolocalización a todo el evento.
- Este campo es obligatorio si envías LDU en data_processing_options y no proporcionas una dirección IP.
 Obtén más información sobre las opciones de procesamiento de datos. Consulta los ejemplos de la implementación de la API de conversiones.

 app_data

 objeto Obligatorio en el caso de los eventos de la app

Parámetro para compartir datos de la app e información de los dispositivos con la API de conversiones.

 extinfo es un subparámetro de app_data.

 extinfo

 objeto Obligatorio en el caso de los eventos de la app Información de los dispositivos ampliada, como ancho y altura de la pantalla. Este parámetro es una matriz e incluye valores separados por comas. Si se usa información ampliada, son obligatorios todos los valores y deben estar en el orden indexado que se muestra a continuación. Si falta un valor, complétalo con una cadena vacía como marcador de posición.

Nota:

 - version debe ser a2 si se trata de un dispositivo Android
- version debe ser i2 si se trata de un dispositivo iOS
 0

 cadena Obligatorio

versión extinfo


Ejemplo: i2

 1

 cadena Nombre del paquete de apps


Ejemplo: com.facebook.sdk.samples.hellofacebook

 2

 cadena Versión corta (entero o cadena)


Ejemplo: 1.0

 3

 cadena Versión larga


Ejemplo: 1.0 long

 4

 cadena Obligatorio

Versión del SO


Ejemplo: 13.4.1

 5

 cadena Nombre del modelo del dispositivo


Ejemplo: iPhone5,1

 6

 cadena Configuración regional


Ejemplo: En_US

 7

 cadena Abreviatura de la zona horaria


Ejemplo: PDT

 8

 cadena Operador


Ejemplo: AT&T

 9

 int64 Ancho de la pantalla


Ejemplo: 320

 10

 int64 Altura de la pantalla


Ejemplo: 568

 11

 cadena Densidad de la pantalla


Ejemplo: 2

 12

 int64 Núcleos de CPU


Ejemplo: 2

 13

 int64 Tamaño de almacenamiento externo en GB


Ejemplo: 13

 14

 int64 Espacio libre o almacenamiento externo en GB


Ejemplo: 8

 15

 cadena Zona horaria del dispositivo


Ejemplo: USA/New York

 `referrer_url` cadena Opcional. El encabezado de referencia HTTP observado por la página que activa el evento de la API de conversiones o del píxel de Meta. Por lo general, es la página anterior en el navegador.

 `original_event_data` objeto Opcional. Todos los campos de metadatos que los anunciantes pueden usar para especificar cómo un evento "retrasado" se debería asociar con un evento de adquisición pasado.

Recomendamos usar original_event_data cuando hay un retraso entre el momento en que se envía un evento y un evento de adquisición pasado con el que se debería asociar. Consulta Parámetros de datos de eventos originales para obtener más información.

 `customer_segmentation` enumeración Opcional. Les permite a los anunciantes especificar el segmento de usuario al que pertenece el usuario que realiza el evento. Puede usarse para proporcionar más contexto sobre la relación del usuario con la empresa.

Este campo acepta uno de los siguientes valores de enumeración predefinidos:

 - new_customer_to_business: el usuario es un cliente nuevo de la empresa.
- new_customer_to_business_line: el usuario es un cliente nuevo de una línea de negocio específica (por ejemplo, un producto o servicio).
- new_customer_to_product_area: el usuario es un cliente nuevo de un área de producto específica (por ejemplo, comercio electrónico, finanzas).
- new_customer_to_medium: el usuario es un cliente nuevo de un medio de marketing específico (por ejemplo, medios sociales, correo electrónico).
- existing_customer_to_business: el usuario es un cliente existente de la empresa.
- existing_customer_to_business_line: el usuario es un cliente existente de una línea de negocio específica (por ejemplo, un producto o servicio).
- existing_customer_to_product_area: el usuario es un cliente existente de un área de producto específica (por ejemplo, comercio electrónico, finanzas).
- existing_customer_to_medium: el usuario es un cliente existente de un medio de marketing específico (por ejemplo, medios sociales, correo electrónico).
- customer_in_loyalty_program: el usuario es parte de un programa de fidelización.
 Ejemplo de una carga útil JSON

 &#123;
 "event_name": "Purchase",
 "event_time": 1643723400,
 "user_data": &#123;
 "em": "user&#064;example.com"
 &#125;,
 "custom_data": &#123;
 "currency": "USD",
 "value": 100.00,
 "customer_segmentation": "new_customer_to_business"
 &#125;
&#125; 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Funciones del SDK para empresas de la API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides/business-sdk-features

Funciones del SDK para empresas de la API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Características del SDK de Meta para empresas de la API de conversiones

Esta guía te ayudará a explorar las funciones avanzadas del SDK de Meta para empresas, que se diseñaron específicamente para los usuarios de la API de conversiones. Las solicitudes asincrónica, los lotes simultáneos y la interfaz de servicio HTTP están disponibles PHP, NodeJS, Java, Python y en los SDK para Ruby. Para obtener información sobre el uso básico de la API de conversiones, consulte la documentación de la API de conversión.

 El SDK de Meta para empresas te brinda acceso a nuestro conjunto de API comerciales, lo que te permite crear soluciones únicas y personalizadas para tus empresas y clientes. Una de las API disponibles para los usuarios del SDK es la API de conversiones.

 

## Requisitos

Para poder usar cualquiera de las funciones que se enumeran a continuación, debes tener instalado el SDK de Meta para empresas. Consulta Primeros pasos con el SDK de Meta para empresas o sigue las instrucciones README, que se enumeran aquí:

 - PHP: facebook-php-business-sdk
- Nodo. js: facebook-nodejs-business-sdk
- Java: facebook-java-business-sdk
- Python: facebook-python-business-sdk
- Ruby: facebook-ruby-business-sdk
 La versión mínima requerida para usar estas características es la siguiente:

 - PHP >= 7.2
- Node.js >= 7.6.0
- Java >= 8
- Python >= 2.7
- Ruby >= 2
 

## Solicitudes asincrónicas

Usa esta característica si no quieres bloquear la ejecución de tu programa para esperar que se complete una solicitud. Con este enfoque, realizas la solicitud y recibes una señal del servidor cuando se completa. Mientras esperas la respuesta, el programa puede seguir ejecutándose.

Las solicitudes asincrónicas te permiten usar tus recursos de manera más eficiente, lo que disminuye el tiempo de respuesta del servidor. Esta acción también te permite tener más control sobre la forma en que el programa maneja los errores provenientes del servidor e integrar fácilmente el SDK en el código que ya se ejecuta de manera asincrónica.

Para implementar solicitudes asincrónicas, consulta las muestras de código en los siguientes idiomas:

 PHP SDK Python SDK Node.js SDK Java SDK Ruby SDK use FacebookAds\Api;
use FacebookAds\Object\ServerSide\CustomData;
use FacebookAds\Object\ServerSide\Event;
use FacebookAds\Object\ServerSide\EventRequest;
use FacebookAds\Object\ServerSide\EventRequestAsync;
use FacebookAds\Object\ServerSide\UserData;

use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Promise;

$pixel_id = getenv(&#039;PIXEL_ID&#039;);
$access_token = getenv(&#039;ACCESS_TOKEN&#039;);

if (empty($pixel_id) || empty($access_token)) &#123;
 throw new Exception(&#039;Missing required test config. Got pixel_id: "&#039; . $pixel_id . &#039;", access_token: "&#039; . $access_token . &#039;"&#039;);
&#125;

Api::init(null, null, $access_token, false);

function create_events($num) &#123;
 $user_data = (new UserData())
 ->setEmail(&#039;joe&#039; . $num . &#039;&#064;eg.com&#039;)
 ->setClientIpAddress($_SERVER[&#039;REMOTE_ADDR&#039;])
 ->setClientUserAgent($_SERVER[&#039;HTTP_USER_AGENT&#039;]);

 $custom_data = (new CustomData())
 ->setCurrency(&#039;usd&#039;)
 ->setValue(123.45);

 $event = (new Event())
 ->setEventName(&#039;Purchase&#039;)
 ->setEventTime(time())
 ->setEventSourceUrl(&#039;http://jaspers-market.com/product/123&#039;)
 ->setUserData($user_data)
 ->setCustomData($custom_data)
 ->setActionSource(ActionSource::WEBSITE);

 return array($event);
&#125;

function create_async_request($pixel_id, $num) &#123;
 $async_request = (new EventRequestAsync($pixel_id))
 ->setEvents(create_events($num));
 return $async_request->execute()
 ->then(
 null,
 function (RequestException $e) &#123;
 print(
 "Error!!!\n" .
 $e->getMessage() . "\n" .
 $e->getRequest()->getMethod() . "\n"
 );
 &#125;
 );
&#125;


// Async request:
$promise = create_async_request($pixel_id, 2);

print("Request 1 state: " . $promise->getState() . "\n");
print("Async request - OK.\n");


// Async request with wait:
$promise = create_async_request($pixel_id, 3);

$response2 = $promise->wait();
print("Request 2: " . $response2->getBody() . "\n");
print("Async request with wait - OK.\n");


// Multiple async requests:
$promises = [
 "Request 3" => create_async_request($pixel_id, 4),
 "Request 4" => create_async_request($pixel_id, 5),
];

$response3 = Promise\unwrap($promises);
foreach ($response3 as $request_name => $response) &#123;
 print($request_name . ": " . $response->getBody()."\n");
&#125;
print("Async - Multiple async requests OK.\n");import asyncio
import time
import pprint
import os
import sys
repo_dir = os.path.join(os.path.dirname(__file__), os.pardir, os.pardir)
sys.path.insert(1, repo_dir)

from facebook_business.adobjects.serverside.custom_data import CustomData
from facebook_business.adobjects.serverside.event import Event
from facebook_business.adobjects.serverside.event_request import EventRequest
from facebook_business.adobjects.serverside.event_request_async import EventRequestAsync
from facebook_business.adobjects.serverside.user_data import UserData
from facebook_business.api import FacebookAdsApi


def create_events(num):
 user_data = UserData(
 email="joe%s&#064;eg.com" % num,
 client_ip_address=request.META.get(&#039;REMOTE_ADDR&#039;),
 client_user_agent=request.headers[&#039;User-Agent&#039;]
 )
 custom_data = CustomData(currency="usd", value=123.45, item_number="itemnumber-123")
 event = Event(
 event_name="Purchase",
 event_time=int(time.time()),
 user_data=user_data,
 custom_data=custom_data,
 data_processing_options=[],
 event_source_url=&#039;http://jaspers-market.com/product/123&#039;,
 action_source=ActionSource.WEBSITE
 )
 return [event]

async def execute_async_request(pixel_id, num):
 event_request_async = EventRequestAsync(
 events=create_events(num),
 pixel_id=pixel_id
 )
 return await event_request_async.execute()

async def run_tasks(pixel_id):
 tasks = []
 for i in range(1,3):
 tasks.append(execute_async_request(pixel_id, i))

 completed = await asyncio.gather(*tasks)
 pp = pprint.PrettyPrinter(indent=4)
 pp.pprint(completed)

if __name__ == &#039;__main__&#039;:
 pixel_id = os.getenv("PIXEL_ID")
 access_token = os.getenv("ACCESS_TOKEN")
 if not (pixel_id and access_token):
 raise Exception("Missing required test config. Got pixel_id: &#039;&#123;pixel_id&#125;&#039;, access_token: &#039;&#123;access_token&#125;&#039;".format(
 pixel_id=pixel_id,
 access_token=access_token
 ))
 FacebookAdsApi.init(access_token=access_token, crash_log=False)

 asyncio.run(run_tasks(pixel_id))
 print("Create EventRequest Async - OK.")const bizSdk = require(&#039;facebook-nodejs-business-sdk&#039;);
const process = require(&#039;process&#039;);
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;

const access_token = process.env.ACCESS_TOKEN;
const pixel_id = process.env.PIXEL_ID;
void async function() &#123;
 try &#123;
 if (access_token === undefined || pixel_id === undefined) &#123;
 throw new Error(`"Missing required test config. Got pixel_id: &#039;$&#123;pixel_id&#125;&#039;, access_token: &#039;$&#123;access_token&#125;&#039;"`)
 &#125;
 const api = bizSdk.FacebookAdsApi.init(access_token);

 let current_timestamp = Math.floor(new Date() / 1000);

 const userData1 = (new UserData())
 .setEmail(&#039;joe1&#064;eg.com&#039;)
 .setClientIpAddress(request.connection.remoteAddress)
 .setClientUserAgent(request.headers[&#039;user-agent&#039;]);

 const customData1 = (new CustomData())
 .setCurrency(&#039;usd&#039;)
 .setCustomProperties(&#123;custom1: &#039;value2&#039;&#125;)
 .setValue(123.45);

 const serverEvent1 = (new ServerEvent())
 .setEventName(&#039;Purchase&#039;)
 .setEventTime(current_timestamp)
 .setUserData(userData1)
 .setCustomData(customData1)
 .setEventSourceUrl(&#039;http://jaspers-market.com/product/123&#039;)
 .setActionSource(&#039;website&#039;);

 const eventRequest1 = (new EventRequest(access_token, pixel_id))
 .setEvents([serverEvent1]);

 const userData2 = (new UserData())
 .setEmail(&#039;joe2&#064;eg.com&#039;)
 .setClientIpAddress(request.connection.remoteAddress)
 .setClientUserAgent(request.headers[&#039;user-agent&#039;]);

 const customData2 = (new CustomData())
 .setCurrency(&#039;usd&#039;)
 .setCustomProperties(&#123;custom1: &#039;value2&#039;&#125;)
 .setValue(123.45);

 const serverEvent2 = (new ServerEvent())
 .setEventName(&#039;Purchase&#039;)
 .setEventTime(current_timestamp)
 .setUserData(userData2)
 .setCustomData(customData2)
 .setEventSourceUrl(&#039;http://jaspers-market.com/product/123&#039;)
 .setActionSource(&#039;website&#039;);

 const eventRequest2 = (new EventRequest(access_token, pixel_id))
 .setEvents([serverEvent2]);

 Promise.all([
 eventRequest1.execute(),
 eventRequest2.execute()
 ]).then(response => &#123;
 console.log(&#039;Execute 2 Requests OK. Response: &#039;, response);
 &#125;, err => &#123;
 console.log(&#039;Error: &#039;, err);
 &#125;);
 &#125; catch(error) &#123;
 console.log(error);
 process.exit(1);
 &#125;
&#125;();import com.facebook.ads.sdk.APIContext;
import com.facebook.ads.sdk.serverside.Event;
import com.facebook.ads.sdk.serverside.EventRequest;
import com.facebook.ads.sdk.serverside.EventResponse;
import com.facebook.ads.sdk.serverside.UserData;
import com.facebook.ads.sdk.serverside.CustomData;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class CONVERSIONS_API_EVENT_CREATE_ASYNC &#123;
 public static final String ACCESS_TOKEN = System.getenv("ACCESS_TOKEN");
 public static final String PIXEL_ID = System.getenv("PIXEL_ID");

 private static EventRequest getEventRequest(APIContext context, int num) &#123;
 UserData userData = new UserData()
 .email(String.format("joe%s&#064;eg.com", num))
 .clientIpAddress(clientIpAddress)
 .clientUserAgent(clientUserAgent);

 HashMap<String,String> customProperties = new HashMap<>();
 customProperties.put("custom1", "value2");

 CustomData customData = new CustomData()
 .currency("usd")
 .customProperties(customProperties)
 .value(123.45F);

 Event pageViewEvent = new Event();
 pageViewEvent.eventName("Purchase")
 .eventTime(System.currentTimeMillis() / 1000L)
 .userData(userData)
 .customData(customData)
 .eventSourceUrl("http://jaspers-market.com/product/123")
 .actionSource(ActionSource.website);

 EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
 eventRequest.addDataItem(pageViewEvent);

 return eventRequest;
 &#125;

 private static void run() throws Exception &#123;
 if (ACCESS_TOKEN == null || PIXEL_ID == null) &#123;
 throw new Exception(String.format("Missing required test config. Got pixel_id: &#039;%s&#039;, access_token: &#039;%s&#039;", PIXEL_ID, ACCESS_TOKEN));
 &#125;
 APIContext context = new APIContext(ACCESS_TOKEN);
 context.setLogger(System.out);

 EventRequest asyncRequest = getEventRequest(context, 1);
 final ListenableFuture<EventResponse> requestFuture = asyncRequest.executeAsync();
 EventResponse asyncResponse = requestFuture.get();
 System.out.println(String.format("Async Request - OK: %s", asyncResponse));

 List<ListenableFuture<EventResponse>> eventFutures = new ArrayList<>();
 eventFutures.add(getEventRequest(context, 2).executeAsync());
 eventFutures.add(getEventRequest(context, 3).executeAsync());
 eventFutures.add(getEventRequest(context, 4).executeAsync());
 List<EventResponse>require &#039;concurrent&#039;
require &#039;facebook_ads&#039;
require &#039;pp&#039;

ACCESS_TOKEN = ENV[&#039;ACCESS_TOKEN&#039;]
PIXEL_ID = ENV[&#039;PIXEL_ID&#039;]
unless ACCESS_TOKEN && PIXEL_ID
 raise Exception.new("Missing required test config. Got pixel_id: &#039;#&#123;PIXEL_ID&#125;&#039;, access_token: &#039;#&#123;ACCESS_TOKEN&#125;&#039;")
end

FacebookAds.configure do |config|
 config.access_token = ACCESS_TOKEN
end

def get_events(num)
 user_data = FacebookAds::ServerSide::UserData.new(
 email: &#039;joe#&#123;num&#125;&#064;eg.com&#039;,
 client_ip_address: request.remote_ip,
 client_user_agent: request.user_agent
 )

 custom_data = FacebookAds::ServerSide::CustomData.new(
 currency: &#039;usd&#039;,
 value: 123.45
 )

 event = FacebookAds::ServerSide::Event.new(
 event_name: &#039;Purchase&#039;,
 event_time: Time.now.to_i,
 user_data: user_data,
 custom_data: custom_data,
 event_source_url: &#039;http://jaspers-market.com/product/123&#039;,
 action_source: &#039;website&#039;
 )

 [event]
end

def get_event_request_async(num)
 FacebookAds::ServerSide::EventRequestAsync.new(
 pixel_id: PIXEL_ID,
 events: get_events(num)
 )
end

def main
 request = get_event_request_async(1)
 response = request.execute.value!
 print "Response: #&#123;response&#125;\n"
 print "EventRequest async single - OK.\n"

 promises = (2..3).map &#123;|num| get_event_request_async(num).execute &#125;
 responses = Concurrent::Promise.zip(*promises)
 .execute
 .value!
 print "Responses:\n"
 pp responses
 print "EventRequest async multi - OK.\n"
end

main

## Lote simultáneo

Los lotes simultáneos utilizan solicitudes asincrónicas para aumentar el rendimiento, ya que utiliza los recursos de manera más eficiente. Puedes crear solicitudes por lotes para admitir casos de uso como trabajadores de solicitudes de eventos, tareas de cron, y más.

Puedes elegir los siguientes métodos BatchProcessor:

 Método Cuándo se recomienda su uso processEvents

 Úsalo para procesar eventos que tienen los mismos campos EventRequest destacados, como namespace_id y upload_tag.

 processEventsGenerator

 Este es el generador subyacente de processEvents.


También se puede usar para procesar eventos que tienen los mismos campos de EventRequest destacados, como namespace_id y upload_tag.

 processEventRequests

 Úsalo para procesar EventRequests de forma simultánea si deseas especificar diferentes campos EventRequest por medio de una solicitud.

 processEventRequestsGenerator

 Este es el generador subyacente de processEventRequests.


También se puede usar para procesar EventRequests simultáneamente si quieres especificar diferentes campos EventRequest por medio de una solicitud.

 Al utilizar lotes simultáneos, los eventos deben enviarse lo más cerca posible del tiempo real. Para obtener más información, consultar Compartir frecuencia.

Si usas PHP, Python o el SDK para Ruby, los métodos anteriores requieren objetos EventRequestAsync en vez de EventRequesT.

Para implementar lotes simultáneos, consulta las muestras de código en los siguientes idiomas:

 PHP SDK Python SDK Node.js SDK Java SDK Ruby SDK use FacebookAds\Api;
use FacebookAds\Object\ServerSide\BatchProcessor;
use FacebookAds\Object\ServerSide\CustomData;
use FacebookAds\Object\ServerSide\Event;
use FacebookAds\Object\ServerSide\EventRequestAsync;
use FacebookAds\Object\ServerSide\UserData;

use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Promise;

$pixel_id = getenv(&#039;PIXEL_ID&#039;);
$access_token = getenv(&#039;ACCESS_TOKEN&#039;);

if (empty($pixel_id) || empty($access_token)) &#123;
 throw new Exception(&#039;Missing required test config. Got pixel_id: "&#039; . $pixel_id . &#039;", access_token: "&#039; . $access_token . &#039;"&#039;);
&#125;

$api = Api::init(null, null, $access_token, false);

function create_event($i) &#123;
 $user_data = (new UserData())
 ->setEmail(&#039;joe&#039; . $i . &#039;&#064;eg.com&#039;)
 ->setClientIpAddress($_SERVER[&#039;REMOTE_ADDR&#039;])
 ->setClientUserAgent($_SERVER[&#039;HTTP_USER_AGENT&#039;]);

 $custom_data = (new CustomData())
 ->setCurrency(&#039;usd&#039;)
 ->setValue(123.45);

 return (new Event())
 ->setEventName(&#039;Purchase&#039;)
 ->setEventTime(time())
 ->setEventSourceUrl(&#039;http://jaspers-market.com/product/&#039; . $i)
 ->setUserData($user_data)
 ->setCustomData($custom_data)
 ->setActionSource(ActionSource::WEBSITE);
&#125;

function create_events($num) &#123;
 $events = [];

 for ($i = 0; $i < $num; $i++) &#123;
 $events[] = create_event($i);
 &#125;

 return $events;
&#125;

function create_async_requests($pixel_id, $num) &#123;
 $requests = [];

 for ($i = 0; $i < $num; $i++) &#123;
 $requests[] = (new EventRequestAsync($pixel_id))
 ->setUploadTag(&#039;test-tag-2&#039;)
 ->setEvents([create_event($i)]);
 &#125;

 return $requests;
&#125;

function run($pixel_id) &#123;
 print("Started CONVERSIONS_API_EVENT_CREATE_BATCH...\n");
 $batch_processor = new BatchProcessor($pixel_id, 2, 2);

 // processEvents
 $events = create_events(11);
 $batch_processor->processEvents(array(&#039;upload_tag&#039; => &#039;test-tag-1&#039;), $events);

 // processEventRequests
 $requests = create_async_requests($pixel_id, 5);
 $batch_processor->processEventRequests($requests);

 // processEventsGenerator
 $process_events_generator = $batch_processor->processEventsGenerator(array(&#039;upload_tag&#039; => &#039;test-tag-1&#039;), $events);
 foreach ($process_events_generator as $promises) &#123;
 try &#123;
 Promise\unwrap($promises);
 &#125; catch (RequestException $e) &#123;
 print(&#039;RequestException: &#039; . $e->getResponse()->getBody()->getContents() . "\n");
 throw $e;
 &#125; catch (\Exception $e) &#123;
 print("Exception:\n");
 print_r($e);
 throw $e;
 &#125;
 &#125;

 // processEventRequestsGenerator
 $requests = create_async_requests($pixel_id, 5);
 $process_event_requests_generator = $batch_processor->processEventRequestsGenerator($requests);
 foreach ($process_event_requests_generator as $promises) &#123;
 try &#123;
 Promise\unwrap($promises);
 &#125; catch (RequestException $e) &#123;
 print(&#039;RequestException: &#039; . $e->getResponse()->getBody()->getContents() . "\n");
 throw $e;
 &#125; catch (\Exception $e) &#123;
 print("Exception:\n");
 print_r($e);
 throw $e;
 &#125;
 &#125;
 print("Finished CONVERSIONS_API_EVENT_CREATE_BATCH with no errors.\n");
&#125;

run($pixel_id);import asyncio
import time
import os
import sys
repo_dir = os.path.join(os.path.dirname(__file__), os.pardir, os.pardir)
sys.path.insert(1, repo_dir)

from facebook_business.adobjects.serverside.batch_processor import BatchProcessor
from facebook_business.adobjects.serverside.custom_data import CustomData
from facebook_business.adobjects.serverside.event import Event
from facebook_business.adobjects.serverside.event_request_async import EventRequestAsync
from facebook_business.adobjects.serverside.user_data import UserData
from facebook_business.api import FacebookAdsApi


def get_event(num):
 user_data = UserData(
 email="joe%s&#064;eg.com" % num,
 client_ip_address=request.META.get(&#039;REMOTE_ADDR&#039;),
 client_user_agent=request.headers[&#039;User-Agent&#039;]
 )
 custom_data = CustomData(currency="usd", value=123.45, item_number="itemnumber-123")
 event = Event(
 event_name="Purchase",
 event_time=int(time.time()),
 user_data=user_data,
 custom_data=custom_data,
 data_processing_options=[],
 event_source_url=&#039;http://jaspers-market.com/product/123&#039;,
 action_source=ActionSource.WEBSITE
 )
 return event

def get_events(num):
 events = []
 for i in range(num):
 events.append(get_event(num))
 return events

def get_event_requests_async(num):
 event_requests_async = []
 for i in range(num):
 event_requests_async.append(
 EventRequestAsync(
 events=[get_event(i)],
 pixel_id=pixel_id
 )
 )
 return event_requests_async

def run_process_event_requests():
 batch_processor = BatchProcessor(2, 2)
 event_requests_async = get_event_requests_async(3)
 batch_processor.process_event_requests(event_requests_async)

async def run_process_event_requests_generator():
 batch_processor = BatchProcessor(3, 2)
 event_requests_async = get_event_requests_async(7)
 generator = batch_processor.process_event_requests_generator(event_requests_async)
 async for batch_responses in generator:
 print(batch_responses)

def run_process_events():
 batch_processor = BatchProcessor(2, 2)
 event_request_async_to_clone = EventRequestAsync(pixel_id=pixel_id, events=[])
 events = get_events(3)
 batch_processor.process_events(event_request_async_to_clone, events)

async def run_process_events_generator():
 batch_processor = BatchProcessor(3, 2)
 event_request_async_to_clone = EventRequestAsync(pixel_id=pixel_id, events=[])
 events = get_events(10)
 generator = batch_processor.process_events_generator(event_request_async_to_clone, events)
 async for batch_responses in generator:
 print(batch_responses)

if __name__ == &#039;__main__&#039;:
 pixel_id = os.getenv("PIXEL_ID")
 access_token = os.getenv("ACCESS_TOKEN")
 if not (pixel_id and access_token):
 raise Exception("Missing required test config. Got pixel_id: &#039;&#123;pixel_id&#125;&#039;, access_token: &#039;&#123;access_token&#125;&#039;".format(
 pixel_id=pixel_id,
 access_token=access_token
 ))
 FacebookAdsApi.init(access_token=access_token, crash_log=False)

 run_process_event_requests()
 print("BatchProcessor process_event_requests - OK.")

 asyncio.run(run_process_event_requests_generator())
 print("BatchProcessor process_event_requests_generator - OK.")

 run_process_events()
 print("BatchProcessor process_events - OK.")

 asyncio.run(run_process_events_generator())
 print("BatchProcessor process_events_generator - OK.")const bizSdk = require(&#039;facebook-nodejs-business-sdk&#039;);
const process = require(&#039;process&#039;);
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;
const BatchProcessor = bizSdk.BatchProcessor;

const access_token = process.env.ACCESS_TOKEN;
const pixel_id = process.env.PIXEL_ID;

function createEvents(num) &#123;
 let events = [];
 for (let i = 0; i < num; i++) &#123;
 let current_timestamp = Math.floor(new Date() / 1000);

 const user_data = (new UserData())
 .setEmail(`joe$&#123;i&#125;&#064;eg.com`)
 .setClientIpAddress(request.connection.remoteAddress)
 .setClientUserAgent(request.headers[&#039;user-agent&#039;]);

 const custom_data = (new CustomData())
 .setCurrency(&#039;usd&#039;)
 .setCustomProperties(&#123;custom1: &#039;value2&#039;&#125;)
 .setValue(123.45);

 const server_event = (new ServerEvent())
 .setEventName(&#039;Purchase&#039;)
 .setEventTime(current_timestamp)
 .setUserData(user_data)
 .setCustomData(custom_data)
 .setEventSourceUrl(&#039;http://jaspers-market.com/product/123&#039;)
 .setActionSource(&#039;website&#039;);

 events.push(server_event);
 &#125;

 return events;
&#125;

function createEventRequests(num, access_token, pixel_id) &#123;
 let event_requests = [];
 for (let i = 0; i < num; i++) &#123;
 const events = createEvents(2);
 const event_request = (new EventRequest(access_token, pixel_id))
 .setEvents(events);
 event_requests.push(event_request);
 &#125;

 return event_requests;
&#125;

void async function() &#123;
 try &#123;
 if (access_token === undefined || pixel_id === undefined) &#123;
 throw new Error(`"Missing required test config. Got pixel_id: &#039;$&#123;pixel_id&#125;&#039;, access_token: &#039;$&#123;access_token&#125;&#039;"`)
 &#125;
 const api = bizSdk.FacebookAdsApi.init(access_token);

 const batch_processor = new BatchProcessor(2, 2);

 // processEvents
 const events1 = createEvents(5);
 const event_request = (new EventRequest(access_token, pixel_id));
 batch_processor.processEvents(event_request, events1);
 console.log(&#039;BatchProcessor.processEvents - OK.&#039;);

 // processEventRequests
 const event_requests1 = createEventRequests(3, access_token, pixel_id);
 batch_processor.processEventRequests(event_requests1);
 console.log(&#039;BatchProcessor.processEventRequests - OK.&#039;);

 // processEventsGenerator
 const events2 = createEvents(5);
 const eventsGenerator = batch_processor.processEventsGenerator(event_request, events2);
 while (true) &#123;
 const batch = eventsGenerator.next().value;
 if (!batch || batch.length === 0) &#123;
 eventsGenerator.return();
 break;
 &#125;

 await Promise.all(batch).then(response => &#123;
 console.log(&#039;processEventsGenerator Events Received: &#039;, response.map(r => r.events_received))
 &#125;).catch(response => &#123;
 console.log(&#039;processEventsGenerator Error: &#039;, response);
 &#125;);
 &#125;

 // processEventRequestsGenerator
 const event_requests2 = createEventRequests(3, access_token, pixel_id);
 const eventRequestsGenerator = batch_processor.processEventRequestsGenerator(event_requests2);
 while (true) &#123;
 const batch = eventRequestsGenerator.next().value;
 if (!batch || batch.length === 0) &#123;
 eventRequestsGenerator.return();
 break;
 &#125;

 await Promise.all(batch).then(response => &#123;
 console.log(&#039;processEventRequestsGenerator Events Received: &#039;, response.map(r => r.events_received))
 &#125;).catch(response => &#123;
 console.log(&#039;processEventRequestsGenerator Error: &#039;, response);
 &#125;);
 &#125;
 &#125; catch(error) &#123;
 console.log(error);
 process.exit(1);
 &#125;
&#125;();import com.facebook.ads.sdk.APIContext;
import com.facebook.ads.sdk.serverside.*;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

class CONVERSIONS_API_EVENT_CREATE_BATCH &#123;
 public static final String ACCESS_TOKEN = System.getenv("ACCESS_TOKEN");
 public static final String PIXEL_ID = System.getenv("PIXEL_ID");

 public static void run() throws Exception &#123;
 if (ACCESS_TOKEN == null || PIXEL_ID == null) &#123;
 throw new Exception(String.format("Missing required test config. Got pixel_id: &#039;%s&#039;, access_token: &#039;%s&#039;", PIXEL_ID, ACCESS_TOKEN));
 &#125;

 APIContext context = new APIContext(ACCESS_TOKEN);
 context.setLogger(System.out);

 BatchProcessor batchProcessor = new BatchProcessor(2, 3);

 Listrequire &#039;concurrent&#039;
require &#039;facebook_ads&#039;

def get_event(num)
 user_data = FacebookAds::ServerSide::UserData.new(
 email: &#039;joe#&#123;num&#125;&#064;eg.com&#039;,
 client_ip_address: request.remote_ip,
 client_user_agent: request.user_agent
 )

 custom_data = FacebookAds::ServerSide::CustomData.new(
 currency: &#039;usd&#039;,
 value: 123.45
 )

 FacebookAds::ServerSide::Event.new(
 event_name: &#039;Purchase&#039;,
 event_time: Time.now.to_i,
 user_data: user_data,
 custom_data: custom_data,
 event_source_url: &#039;http://jaspers-market.com/product/123&#039;,
 action_source: &#039;website&#039;
 )
end

def get_events(num)
 num.times.map do |i|
 get_event(i)
 end
end

def get_event_request_async(pixel_id, num)
 FacebookAds::ServerSide::EventRequestAsync.new(
 pixel_id: pixel_id,
 events: [get_event(num)]
 )
end

def get_event_requests_async(pixel_id, num)
 num.times.map do |i|
 get_event_request_async(pixel_id, i)
 end
end

def run_process_event_requests(pixel_id)
 batch_processor = FacebookAds::ServerSide::BatchProcessor.new(2, 2)
 event_requests_async = get_event_requests_async(pixel_id, 3)
 batch_processor.process_event_requests(event_requests_async)
end

def run_process_event_requests_generator(pixel_id)
 batch_processor = FacebookAds::ServerSide::BatchProcessor.new(3, 2)
 event_requests_async = get_event_requests_async(pixel_id, 7)
 generator = batch_processor.process_event_requests_generator(event_requests_async)
 generator.each do |batch|
 responses = Concurrent::Promise.zip(*batch).execute.value!
 print "#&#123;responses&#125;\n"
 end
end

def run_process_events(pixel_id)
 batch_processor = FacebookAds::ServerSide::BatchProcessor.new(2, 2)
 event_request_async_to_clone = FacebookAds::ServerSide::EventRequestAsync.new(pixel_id: pixel_id)
 events = get_events(3)
 batch_processor.process_events(event_request_async_to_clone, events)
end

def run_process_events_generator(pixel_id)
 batch_processor = FacebookAds::ServerSide::BatchProcessor.new(3, 2)
 event_request_async_to_clone = FacebookAds::ServerSide::EventRequestAsync.new(pixel_id: pixel_id)
 events = get_events(10)
 generator = batch_processor.process_events_generator(event_request_async_to_clone, events)
 generator.each do |batch|
 responses = Concurrent::Promise.zip(*batch).execute.value!
 print "#&#123;responses&#125;\n"
 end
end

def main
 access_token = ENV[&#039;ACCESS_TOKEN&#039;]
 pixel_id = ENV[&#039;PIXEL_ID&#039;]
 unless access_token && pixel_id
 raise Exception.new("Missing required test config. Got pixel_id: &#039;#&#123;pixel_id&#125;&#039;, access_token: &#039;#&#123;access_token&#125;&#039;")
 end

 FacebookAds.configure do |config|
 config.access_token = access_token
 end

 run_process_event_requests(pixel_id)
 print "BatchProcessor process_event_requests - OK.\n"

 run_process_event_requests_generator(pixel_id)
 print "BatchProcessor process_event_requests_generator - OK.\n"

 run_process_events(pixel_id)
 print "BatchProcessor process_events - OK.\n"

 run_process_events_generator(pixel_id)
 print "BatchProcessor process_events_generator - OK.\n"
end

main

## Interfaz de servicio HTTP

Usa la interfaz de servicio HTTP si tienes un conjunto específico de requisitos en relación con la capa de servicio HTTP. Con esta característica, puedes anular el servicio HTTP predeterminado del SDK para empresas e implementar tu propio servicio personalizado con tu método o biblioteca preferido.

Para implementar tu propia interfaz de servicio HTTP, consulta las muestras de código en los siguientes idiomas:

 PHP SDK Python SDK Node.js SDK Java SDK Ruby SDK require __DIR__ . &#039;/../vendor/autoload.php&#039;;

use FacebookAds\Api;
use FacebookAds\Object\ServerSide\CustomData;
use FacebookAds\Object\ServerSide\Event;
use FacebookAds\Object\ServerSide\EventRequest;
use FacebookAds\Object\ServerSide\EventRequestAsync;
use FacebookAds\Object\ServerSide\HttpServiceClientConfig;
use FacebookAds\Object\ServerSide\UserData;

// Imports used by the TestHttpClient class
use FacebookAds\Object\ServerSide\HttpServiceInterface;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Handler\CurlHandler;
use GuzzleHttp\Psr7\MultipartStream;
use GuzzleHttp\Psr7\Request;

$pixel_id = getenv(&#039;PIXEL_ID&#039;);
$access_token = getenv(&#039;ACCESS_TOKEN&#039;);

if (empty($pixel_id) || empty($access_token)) &#123;
 throw new Exception(&#039;Missing required test config. Got pixel_id: "&#039; . $pixel_id . &#039;", access_token: "&#039; . $access_token . &#039;"&#039;);
&#125;

function run($access_token, $pixel_id) &#123;
 Api::init(null, null, $access_token, false);

 $request1 = getEventRequest($pixel_id, 1);
 $request1->setHttpClient(new TestHttpClient());

 $response1 = $request1->execute();

 print("Response: " . $response1->getBody() . "\n");
 print("Custom HTTP Service Request 1 - OK.\n");

 // Alternatively, you can set the access_token and the HTTP Client on the HttpServiceClientConfig
 Api::init(null, null, null, false);
 HttpServiceClientConfig::getInstance()->setClient(new TestHttpClient());
 HttpServiceClientConfig::getInstance()->setAccessToken($access_token);

 $request2 = getEventRequest($pixel_id, 2);

 $response2 = $request2->execute();

 print("Response: " . $response2->getBody() . "\n");
 print("Custom HTTP Service Request 2 - OK.\n");
&#125;

function getEventRequest($pixel_id, $num) &#123;
 $user_data = (new UserData())
 ->setEmail(&#039;joe&#039; . $num . &#039;&#064;eg.com&#039;)
 ->setClientIpAddress($_SERVER[&#039;REMOTE_ADDR&#039;])
 ->setClientUserAgent($_SERVER[&#039;HTTP_USER_AGENT&#039;]);

 $custom_data = (new CustomData())
 ->setCurrency(&#039;usd&#039;)
 ->setValue(123.45);

 $event = (new Event())
 ->setEventName(&#039;Purchase&#039;)
 ->setEventTime(time())
 ->setEventSourceUrl(&#039;http://jaspers-market.com/product/123&#039;)
 ->setUserData($user_data)
 ->setCustomData($custom_data)
 ->setActionSource(ActionSource::WEBSITE);

 return (new EventRequest($pixel_id))
 ->setEvents(array($event));
&#125;

class TestHttpClient implements HttpServiceInterface &#123;
 public function executeRequest($url, $method, array $curl_options, array $headers, array $params) &#123;
 $multipart_contents = [];

 foreach ($params as $key => $value) &#123;
 if ($key === &#039;data&#039;) &#123;
 $multipart_contents[] = [
 &#039;name&#039; => $key,
 &#039;contents&#039; => \GuzzleHttp\json_encode($value),
 &#039;headers&#039; => array(&#039;Content-Type&#039; => &#039;multipart/form-data&#039;),
 ];
 &#125; else &#123;
 $multipart_contents[] = [
 &#039;name&#039; => $key,
 &#039;contents&#039; => $value,
 &#039;headers&#039; => array(&#039;Content-Type&#039; => &#039;multipart/form-data&#039;),
 ];
 &#125;
 &#125;

 $body = new MultipartStream($multipart_contents);
 $request = new Request($method, $url, $headers, $body);

 $handler_stack = HandlerStack::create(
 new CurlHandler([&#039;options&#039; => $curl_options])
 );

 $client = new Client([&#039;handler&#039; => $handler_stack]);
 return $client->send($request);
 &#125;
&#125;

run($access_token, $pixel_id);import time
import os
import sys
repo_dir = os.path.join(os.path.dirname(__file__), os.pardir, os.pardir)
sys.path.insert(1, repo_dir)

from facebook_business.adobjects.serverside.custom_data import CustomData
from facebook_business.adobjects.serverside.event import Event
from facebook_business.adobjects.serverside.event_request import EventRequest
from facebook_business.adobjects.serverside.http_service_interface import HttpServiceInterface
from facebook_business.adobjects.serverside.user_data import UserData
from facebook_business.api import FacebookAdsApi


def run(pixel_id, access_token):
 user_data = UserData(
 email="joe&#064;eg.com",
 client_ip_address=request.META.get(&#039;REMOTE_ADDR&#039;),
 client_user_agent=request.headers[&#039;User-Agent&#039;]
 )
 custom_data = CustomData(currency="usd", value=123.45, item_number="itemnumber-123")
 event = Event(
 event_name="Purchase",
 event_time=int(time.time()),
 user_data=user_data,
 custom_data=custom_data,
 data_processing_options=[],
 event_source_url=&#039;http://jaspers-market.com/product/123&#039;,
 action_source=ActionSource.WEBSITE
 )
 custom_http_client = CustomHttpClient()
 event_request = EventRequest(
 events=[event],
 pixel_id=pixel_id,
 http_client=custom_http_client,
 access_token=access_token
 )

 event_response = event_request.execute()
 print(event_response)
 print("Custom HTTP Service Request - OK.")

class CustomHttpClient(HttpServiceInterface):
 def execute(self, url, method, request_options, headers, params):
 import requests
 from facebook_business.adobjects.serverside.event_response import EventResponse

 response = requests.request(method, url, json=params, headers=headers).json()
 return EventResponse(
 events_received=response[&#039;events_received&#039;],
 fbtrace_id=response[&#039;fbtrace_id&#039;],
 messages=response[&#039;messages&#039;]
 )

if __name__ == &#039;__main__&#039;:
 pixel_id = os.getenv("PIXEL_ID")
 access_token = os.getenv("ACCESS_TOKEN")
 if not (pixel_id and access_token):
 raise Exception("Missing required test config. Got pixel_id: &#039;&#123;pixel_id&#125;&#039;, access_token: &#039;&#123;access_token&#125;&#039;".format(
 pixel_id=pixel_id,
 access_token=access_token
 ))

 run(pixel_id, access_token)const bizSdk = require(&#039;facebook-nodejs-business-sdk&#039;);
const https = require(&#039;https&#039;);
const process = require(&#039;process&#039;);
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const EventResponse = bizSdk.EventResponse;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;

const access_token = process.env.ACCESS_TOKEN;
const pixel_id = process.env.PIXEL_ID;

// Implements the HttpServiceInterface
class E2EHttpService &#123;
 executeRequest(url, method, headers, params) &#123;
 return new Promise((resolve, reject) => &#123;
 const options = &#123;
 port: 443,
 method,
 headers,
 &#125;
 let body = &#039;&#039;;
 const request = https.request(url, options, response => &#123;
 response.on(&#039;data&#039;, chunk => &#123;
 body += chunk.toString();
 &#125;);
 response.on(&#039;end&#039;, () => &#123;
 return resolve(body);
 &#125;);
 &#125;).on(&#039;error&#039;, reject);

 request.write(JSON.stringify(params));
 request.end();
 &#125;);
 &#125;
&#125;

void async function() &#123;
 try &#123;
 if (access_token === undefined || pixel_id === undefined) &#123;
 throw new Error(`"Missing required test config. Got pixel_id: &#039;$&#123;pixel_id&#125;&#039;, access_token: &#039;$&#123;access_token&#125;&#039;"`)
 &#125;
 const userData = (new UserData())
 .setEmail(&#039;joe&#064;eg.com&#039;)
 .setClientIpAddress(request.connection.remoteAddress)
 .setClientUserAgent(request.headers[&#039;user-agent&#039;]);

 const customData = (new CustomData())
 .setCurrency(&#039;usd&#039;)
 .setCustomProperties(&#123;custom1: &#039;value2&#039;&#125;)
 .setValue(123.45);

 const serverEvent = (new ServerEvent())
 .setEventName(&#039;Purchase&#039;)
 .setEventTime(Math.floor(new Date() / 1000))
 .setUserData(userData)
 .setCustomData(customData)
 .setEventSourceUrl(&#039;http://jaspers-market.com/product/123&#039;)
 .setActionSource(&#039;website&#039;);

 const eventsData = [serverEvent];
 const eventRequest = (new EventRequest(access_token, pixel_id))
 .setHttpService(new E2EHttpService())
 .setEvents(eventsData);

 eventRequest.execute().then(response => &#123;
 console.log(&#039;Custom HTTP Service Request OK. Response: &#039;, response);
 &#125;, err => &#123;
 console.log(&#039;Error: &#039;, err);
 &#125;);
 &#125; catch(error) &#123;
 console.log(error);
 process.exit(1);
 &#125;
&#125;();import com.facebook.ads.sdk.APIContext;
import com.facebook.ads.sdk.serverside.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class CONVERSIONS_API_EVENT_CREATE_CUSTOM_HTTP_SERVICE &#123;
 public static final String ACCESS_TOKEN = System.getenv("ACCESS_TOKEN");
 public static final String PIXEL_ID = System.getenv("PIXEL_ID");

 public static void run() throws Exception &#123;
 if (ACCESS_TOKEN == null || PIXEL_ID == null) &#123;
 throw new Exception(String.format("Missing required test config. Got pixel_id: &#039;%s&#039;, access_token: &#039;%s&#039;", PIXEL_ID, ACCESS_TOKEN));
 &#125;

 APIContext context = new APIContext(ACCESS_TOKEN).enableDebug(true);
 context.setLogger(System.out);

 UserData userData = new UserData()
 .email("joe&#064;eg.com")
 .clientIpAddress(clientIpAddress)
 .clientUserAgent(clientUserAgent);

 HashMap<String, String> customProperties = new HashMap<>();
 customProperties.put("item_number", "456");

 CustomData customData = new CustomData()
 .currency("usd")
 .customProperties(customProperties)
 .value(123.45F);

 Event pageViewEvent = new Event();
 pageViewEvent.eventName("Purchase")
 .eventTime(System.currentTimeMillis() / 1000L)
 .userData(userData)
 .customData(customData)
 .eventSourceUrl("http://jaspers-market.com/product/123")
 .actionSource(ActionSource.website);

 EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
 eventRequest.addDataItem(pageViewEvent);

 // Set the Custom HTTP Service Client
 HttpServiceInterface httpServiceClient = new E2EHttpServiceClient();
 eventRequest.setHttpServiceClient(httpServiceClient);

 EventResponse eventResponse = eventRequest.execute();
 System.out.println("Request was successful:");
 System.out.println(eventResponse);
 &#125;

 public static void main(String[] args) &#123;
 try &#123;
 run();
 &#125; catch (Exception e) &#123;
 e.printStackTrace();
 System.out.println(e.toString());
 System.exit(1);
 &#125;
 System.exit(0);
 &#125;

 private static class E2EHttpServiceClient implements HttpServiceInterface &#123;
 &#064;Override
 public EventResponse executeRequest(String url, HttpMethodEnum httpMethod, Map<String, String> headers, HttpServiceParams params) &#123;
 EventResponse eventResponse = null;
 try &#123;
 Gson gson = new GsonBuilder()
 .disableHtmlEscaping()
 .create();
 URL requestUrl = new URL(url);

 HttpURLConnection connection = (HttpURLConnection) requestUrl.openConnection();
 connection.setRequestMethod(httpMethod.toString());
 connection.setDoOutput(true);
 connection.setRequestProperty("Content-Type", "application/json");

 DataOutputStream out = new DataOutputStream(connection.getOutputStream());
 out.writeBytes(gson.toJson(params));
 out.flush();
 out.close();

 BufferedReader in = new BufferedReader(
 new InputStreamReader(connection.getInputStream())
 );
 String responseLine = in.readLine();
 StringBuffer response = new StringBuffer();
 while (responseLine != null) &#123;
 response.append(responseLine);
 responseLine = in.readLine();
 &#125;
 in.close();
 String responseString = response.toString();

 eventResponse = gson.fromJson(responseString, EventResponse.class);
 &#125; catch (Exception e) &#123;
 e.printStackTrace();
 System.exit(1);
 &#125;
 return eventResponse;
 &#125;
 &#125;
&#125;require &#039;facebook_ads&#039;

class CustomHttpClient < FacebookAds::ServerSide::HttpServiceInterface
 def execute(url, request_method, headers, params)
 require &#039;faraday&#039;
 require &#039;json&#039;

 raise Exception.new("Incorrect HTTP method: #&#123;request_method&#125;") if request_method != FacebookAds::ServerSide::HttpMethod::POST

 response = Faraday.post(url) do |request|
 headers.each do |key, value|
 request[key] = value
 end
 request.headers[&#039;Content-Type&#039;] = &#039;application/json&#039;
 request.body = params.to_json
 end

 parsed_response = JSON.load(response.body)

 return FacebookAds::ServerSide::EventResponse.new(
 events_received: parsed_response[&#039;events_received&#039;],
 messages: parsed_response[&#039;messages&#039;],
 fbtrace_id: parsed_response[&#039;fbtrace_id&#039;]
 )
 end
end

def main
 access_token = ENV[&#039;ACCESS_TOKEN&#039;]
 pixel_id = ENV[&#039;PIXEL_ID&#039;]
 unless access_token && pixel_id
 raise Exception.new("Missing required test config. Got pixel_id: &#039;#&#123;pixel_id&#125;&#039;, access_token: &#039;#&#123;access_token&#125;&#039;")
 end

 FacebookAds.configure do |config|
 config.access_token = access_token
 end

 user_data = FacebookAds::ServerSide::UserData.new(
 email: &#039;joe&#064;eg.com&#039;,
 client_ip_address: request.remote_ip,
 client_user_agent: request.user_agent
 )

 custom_data = FacebookAds::ServerSide::CustomData.new(
 currency: &#039;usd&#039;,
 value: 123.45
 )

 event = FacebookAds::ServerSide::Event.new(
 event_name: &#039;Purchase&#039;,
 event_time: Time.now.to_i,
 user_data: user_data,
 custom_data: custom_data,
 event_source_url: &#039;http://jaspers-market.com/product/123&#039;,
 action_source: &#039;website&#039;
 )

 request = FacebookAds::ServerSide::EventRequest.new(
 pixel_id: pixel_id,
 events: [event],
 http_service_client: CustomHttpClient.new
 )

 response = request.execute
 print "Response: #&#123;response&#125;\n"
 print "Custom HTTP Service Request - OK."
end

main

## Prueba tus solicitudes de eventos

Puedes probar tus solicitudes de eventos con el parámetro test_event_code. Localiza el código de prueba que se ubica en la herramienta de prueba de la pestaña Administrador de eventos en Orígenes de datos > Tu píxel > Eventos de prueba.

Nota: Debes reemplazar el valor de muestra en el código de abajo (por ejemplo, TEST12345) con el código de prueba que obtiene de la pestaña Eventos de prueba.

 PHP SDK Python SDK Node.js SDK Java SDK Ruby SDK ...
$request = (new EventRequest($pixel_id))
 ->setTestEventCode(&#039;TEST12345&#039;)
 ->setEvents($events);

$response = $request->execute();...
event_request = EventRequest(
 events=[event],
 test_event_code=&#039;TEST12345&#039;,
 pixel_id=pixel_id
)

result = event_request.execute()...
 const eventRequest = (new EventRequest(access_token, pixel_id))
 .setTestEventCode(&#039;TEST12345&#039;)
 .setEvents(eventsData);

 eventRequest.execute().then(response => &#123;
 console.log(&#039;Execute Request OK. Response: &#039;, response);
 &#125;, err => &#123;
 console.log(&#039;Error: &#039;, err);
 &#125;);...
 EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
 eventRequest.addDataItem(purchaseEvent);
 eventRequest.setTestEventCode("TEST12345");

 EventResponse response = eventRequest.execute();...
request = FacebookAds::ServerSide::EventRequest.new(
 pixel_id: PIXEL_ID,
 test_event_code: &#039;TEST12345&#039;,
 events: [event]
)

response = request.execute

## Limitaciones

Actualmente, no admitimos la posibilidad de configurar una interfaz de servicio HTTP personalizada al realizar solicitudes simultáneas por lotes o solicitudes asincrónicas.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->

---
# Gateway de la API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides/gateway

Gateway de la API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

## El contenido cambió de lugar.

Movimos este contenido a la sección Productos de gateway del sitio.

 - Ve a: Gateway de la API de conversiones
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Compatibilidad de la API con eventos del servidor fuera de la web - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides/gateway/non-web-server-events

Compatibilidad de la API con eventos del servidor fuera de la web - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

## El contenido cambió de lugar.

Movimos este contenido a la sección Productos de gateway del sitio.

 - Ir a Enviar eventos directamente desde un servidor.
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Gateway de la API de conversiones para varias cuentas - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides/gateway-multiple-accounts

Gateway de la API de conversiones para varias cuentas - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

## El contenido cambió de lugar.

Movimos este contenido a la sección Productos de gateway del sitio.

 - Ir a Gateway de la API de conversiones y Signals Gateway: registro de organizadores de AWS.
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Dataset Quality API - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/setup-quality-api

Dataset Quality API - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 Volver al documento en español Se actualizó este documento.
La traducción en español no está disponible todavía. Actualización del documento en inglés: 8 dic. 2025 
Actualización del documento en español: 20 oct. 2025 

# Dataset Quality API


Advertisers that share server events using the Conversions API can see the event match quality score in Meta Events Manager. However, this only works on an individual basis and is difficult to scale in cases where a Tech Provider partner, agency partner or advertiser is managing hundreds and thousands of Meta Pixels for their businesses. The Dataset Quality (formerly known as Integration Quality) API can help solve this problem by consolidating dataset quality metrics programmatically at scale.


 

## What’s New


As of May 28th, 2025, the following additional metrics have been added to the API for querying.


 
- Additional Conversions Reported

- Additional Conversions Reported per parameter

- Additional Conversions Reported for per event

- Additional Conversions Reported for event coverage

- Event Coverage

- Event Deduplication

- Data Freshness

- Event Match Quality Diagnostics

 

Also, the Dataset Quality API for Offline Events, currently under beta, and new metrics are now available.


 

## Common Use Cases


Partners and agencies may use the Dataset Quality API to provide a quality dashboard and insights, while helping their advertisers to enhance and optimize their integrations. Partners may also use this integration to monitor the stability of their Conversions API integration. Advertisers may use this endpoint to aggregate dataset quality data to incorporate in their monitoring.


 

## Setup Requirements


### Ownership and Access


#### Advertiser Authentication Using Meta Business Manager


 
- In Business Manager, go to the Users section and select the System User tab. Click on the specific system user you are using for the Conversions API.

- Go to the Assign Asset dialog and choose Pixels. Then, select the pixels you want to send events on behalf of.

- For each pixel, select the Manage Pixel permission, and click Save Changes.

- Go back to your system user&#039;s details page. Verify that the selected pixels are visible there.

- To generate the access token, follow instructions here.

 


#### Partner Platform Authentication


You must first request authorization to send events on behalf of your clients. You have the following authentication options:


##### Facebook Login for Business (Recommended)


Facebook Login for Business is the preferred authentication and authorization solution for Tech Providers and business app developers who need access to their business clients&#039; assets. It allows you to specify the access token type, types of assets, and permissions your app needs, and save it as a set (configuration). You can then present the set to your business clients to complete the flow and grant your app access to their business assets.


##### Meta Business Extension (Recommended)


With this option, Meta Business Extension (MBE) returns all the necessary information needed to send events on behalf of the client. MBE provides an endpoint to retrieve system user access tokens created in the client’s Business Manager. This process includes permissions to send server events and is done automatically and securely. MBE is currently under beta. Please contact your Meta representative for access.


The endpoint requires a user access token as an input parameter. If you are a new MBE user, call this endpoint to fetch the system user access token after you have finished setting up MBE. Existing users need to ask for re-authentication before calling the new API endpoint.


##### Client Shares Meta Pixel to Partner’s Business Manager


With this option, the client shares their Meta Pixel to the partner using Business Manager settings or by the API. Then, the partner can assign the partner system user to the client pixel and generate an access token to send server events.


##### Client Generates Token Manually Using Events Manager


Advertisers can generate access tokens in Events Manager to set up the Conversions API and access the Dataset Quality API. You can configure a direct integration or share the generated access token with your partners to send events to Meta. You can copy and save this new token. Note that Meta will not store these tokens. The generated token will be able to fetch quality data and send events using the Conversions API.


 


#### User Permission


 
- The user or system user used to make the API call requires (at minimum) the following user permission: Partial access -> Use events dataset

- User access may be granted (in bulk) by using the instructions provided here.

 


#### App Permission


 
- Basic: If you manage a small number of Meta datasets and/or wish to test the Dataset Quality API, then the following app permissions are required: ads_read and (ads_management or business_management).

- Advanced: If you manage a high number of Meta datasets on behalf of other businesses and/or require higher rate limits, then the advanced level of the ads_management app permission and app feature Ads Management Standard Access is required. Advanced level app permissions and features require app review.

 
 

## Retrieving Dataset Quality Information


### Endpoint


https://graph.facebook.com/v25.0/dataset_quality

### Parameters


ParameterDescriptiondataset_idintegerRequired.
The ID of dataset (Pixel) to retrieve quality data.


 `access_token` string Required.
Valid (unexpired) access token for given dataset (Pixel) ID. We recommend setting up a long-lived system user access token. 
Read more about different types of access tokens in our dedicated guide.


 `agent_name` string Optional.
The normalized value of the partner_agent field is used to filter only events sent with partner_agent param in /&#123;pixel_id&#125;/events POST request (see attributing your events best practices here and here).


For example, if your partner_agent value is [partner_name]_[majorversion]_[minorVersion], your normalized agent string value will be partner_name in lowercase.


The agent_name allows you to set your own platform identifier when sending events on behalf of a client. If you are a managed partner/agency, work with your Meta representative to agree on an identifier for your platform.


If you are an advertiser, most of the time you should not worry about agent_name attribution.


If you do not provide an agent_name, all events regardless of whether they were sent by an agent or not, will be included in the EMQ calculation.


 

### Fields


 Field Description `web` array This field denotes a structured set of data related to website events. The filter is an array containing event_name and its metrics. This field is required by default in this API. See example section.


 `event_name` string A standard event or custom event name.


 `event_match_quality` [AdsPixelCAPIEMQ(/docs/marketing-api/reference/ads-pixel-capiemq)]


 Event Match Quality indicates how effective the customer information sent from your server may be at matching event instances to a Facebook account.


See more details here.


 `event_potential_aly_acr_increase` AdsPixelCAPIEventALYACR


 Additional Conversions Reported (ACR) for Conversions API Event is a metric that estimates how many conversions (for example, purchases or link clicks) are measured as a result of an advertiser’s Conversions API setup.


See more details here.


 `acr` AdsDatasetCAPIACR


 Additional Conversions Reported (ACR) is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. It also can help you determine if you can improve your Conversions API setup to measure more reported conversions. More reported conversions can help you decrease your cost per result and show your ads to people that find them relevant.


See more details here.


 `event_coverage` AdsDatasetEventCoverage


 Event coverage is the 7-day average percent of Pixel events that are covered by the Conversions API, and share deduplication keys with events from the Conversions API.


See more details here.


 `dedup_key_feedback` AdsDatasetDedupKeyFeedback


 Deduplication is a process used to prevent our system from counting the same event twice. In order for you to have a high event coverage, covered events must have a proper deduplication setup.


Deduplication key feedback helps to identify any active issues with deduplication.


See more details here.


 `data_freshness` AdsDatasetDataFreshness


 Data freshness tells you how current your data is. Use this information to understand the delay between the time the event occurred and when we received it.


See more details here.


 Tip: Look inside the node (follow hyperlink to the separate developers page) to find out all fields and child nodes for fields in the table above.


 

## EMQ


### About Event Match Quality


#### Event Match Quality


Event match quality (EMQ) is a score (out of 10) that indicates how effective the customer information sent from your server may be at matching event instances to a Meta account. High quality event matching may improve ads attribution and performance.


#### How It&#039;s Calculated


Event match quality is calculated by looking at which customer information parameters are received from your server using a Conversions API integration, the quality of the information received and the percent of event instances that are matched to a Meta account.


#### How It&#039;s Used


Event match quality is used to assess whether you&#039;re sending through the Conversions API the right customer information to match your events to a Meta account, and whether you have set up your customer information parameters correctly. Customer information parameters help match your events to a Meta account so you can attribute conversions to your ads and deliver them to people who are most likely to convert.
Event match quality is calculated in real time. Learn more about EMQ best practices here.


EMQ is currently available only for web events. For other event types such as offline and physical store events, app events, conversion leads or any integration under alpha or beta stages, contact your Meta representative for guidance on improving match quality.


Use case: Monitor event match quality score per event, along with match keys being sent, build an EMQ trendline or historical extracts, then hook up alerts/delectors for EMQ score and match keys drops.


Documentation: All fields available for EMQ diagnostics can be found on this developer&#039;s page.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_match_quality,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_match_quality,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_match_quality": &#123;
 "composite_score": 6.2,
 "match_key_feedback": [
 &#123;
 "identifier": "user_agent",
 "coverage": &#123;
 "percentage": 100
 &#125;
 &#125;,
 &#123;
 "identifier": "external_id",
 "coverage": &#123;
 "percentage": 100
 &#125;
 &#125;
 ] 
 &#125;,
 "event_name": "pLTVPurchase"
 &#125;,
 &#123;
 "event_match_quality": &#123;
 "composite_score": 7.2,
 "match_key_feedback": [
 &#123;
 "identifier": "email",
 "coverage": &#123;
 "percentage": 100
 &#125;
 &#125;,
 &#123;
 "identifier": "ip_address",
 "coverage": &#123;
 "percentage": 99.9
 &#125;
 &#125;,
 ]
 &#125;,
 "event_name": "CompleteRegistration"
 &#125;
 ]
 &#125;
 

## Additional Conversions Reported (ACR) for Event Match Quality parameters


Additional Conversions Reported (ACR) is a metric that estimates how many conversions (e.g. purchases or link clicks) are measured as a result of an advertiser’s Conversions API setup.


To learn more about this metric, see the About ACR article and the Learn More section.


Use case: For events connected to the Conversions API that have an EMQ score, monitor the uplift in additional conversions which the Conversions API is able to add when sending more and/or higher quality match keys.


Documentation: All fields available for ACR EMQ parameters can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_match_quality&#123;match_key_feedback&#123;identifier,potential_aly_acr_increase&#123;percentage,description&#125;&#125;&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_match_quality&#123;match_key_feedback&#123;identifier,potential_aly_acr_increase&#123;percentage,description&#125;&#125;&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_match_quality":
 "match_key_feedback": [
 &#123;
 "identifier": "email",
 "potential_aly_acr_increase": &#123;
 "percentage": 58.96,
 "description": "Similar advertisers who sent valid Email for Purchase saw a 58.96% median increase in their existing additional conversions reported."
 &#125;
 &#125;,
 &#123;
 "identifier": "ip_address",
 "potential_aly_acr_increase": &#123;
 "percentage": 20.65,
 "description": "Similar advertisers who sent valid Ip Address for Purchase saw a 20.65% median increase in their existing additional conversions reported."
 &#125;
 &#125;,
 ]
 &#125;
 "event_name": "Purchase"
 &#125;,
 ]
&#125;
 

## EMQ Diagnostics


Event match quality diagnostics are issues we’ve identified with your Conversions API integration. Follow the provided recommendations to send higher quality match keys, optimize your ad performance and improve your EMQ score.


Use case: Extract and store EMQ diagnostics in your environment, set up notifications using channels like email, messenger or in-app notifications in order to resolve issues reactively.


Documentation: All fields available for EMQ diagnostics can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_match_quality&#123;diagnostics&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_match_quality&#123;diagnostics&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_match_quality": &#123;
 "diagnostics": [
 &#123;
 "name": "Update your IPv4 IP addresses to IPv6 IP addresses",
 "description": "Your server is sending IPV4 IP addresses through the Conversions API. We recommend updating to IPV6 IP addresses because this is the industry standard and offers better durability for this integration.",
 "solution": "You can update your web server and DNS provider configuration to support IPv6. In your server payload, send the client_ip_address retrieved from customer interactions. Use the payload helper to see how this value should be structured when it&#039;s sent to Meta. If this issue is not applicable or actionable, you can ignore it.",
 "percentage": 59.5,
 "affected_event_count": 18930,
 "total_event_count": 31830
 &#125;,
 &#123;
 "name": "Server sending mismatched IP addresses",
 "description": "Your server is sending client IP addresses that do not match those from Meta Pixel. This may impact the attribution and optimization of your ad campaigns.",
 "solution": "In your server payload, send the client_ip_address retrieved from customer interactions. Use the payload helper to see how this value should be structured when it&#039;s sent to Meta.",
 "percentage": 61.5,
 "affected_event_count": 19567,
 "total_event_count": 31830
 &#125;
 ]
 &#125;
 "event_name": "Purchase"
 &#125;,
 ]
&#125;
 

## Event Coverage


Event coverage is the 7-day average percentage of Meta Pixel events that are covered by the Conversions API, and share deduplication keys with events from the Conversions API.


Learn more about event coverage best practices by reading this Business Help Center article.


Use case: Evaluate the events which are connected by server versus those which are not. For example, if an advertiser has three events, ViewContent, AddToCart and Purchase, but only Purchase is sent by server, the event coverage will be 33%.


Documentation: All fields available for event coverage can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_coverage&#123;percentage,goal_percentage,description&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_coverage&#123;percentage,goal_percentage,description&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123; 
 "web": [
 &#123;
 "event_coverage": &#123;
 "percentage": 34.1,
 "goal_percentage": 75,
 "description": "The percentage of events received from your Conversions API compared to unique browser events from the Meta Pixel."
 &#125;,
 "event_name": "B2B Purchase"
 &#125;,
 ]
&#125;

 

## Additional Conversions Reported (ACR) for Event Coverage


Additional Conversions Reported (ACR) for Event Coverage is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. For event coverage, you can see the potential improvement in additional conversions reported if the event coverage and deduplication both meet the best practices.


To learn more about additional conversions reported, see the About ACR article and the Learn More section.


Use case: For events connected to the Conversions API that have event coverage below 75% threshold, monitor the uplift in additional conversions which the Conversions API is able to add when covering more events (increasing server versus browser ratio).


Documentation: All fields available for ACR for Event Coverage can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_coverage&#123;potential_aly_acr_increase&#123;percentage,description&#125;&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_coverage&#123;potential_aly_acr_increase&#123;percentage,description&#125;&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_coverage": &#123;
 "potential_aly_acr_increase": &#123;
 "percentage": 35.8,
 "description": "Similar advertisers who send the same AddToCart pixel events with matching deduplication keys through Conversions API saw a median of 35.8% additional conversions reported versus those that only used Meta Pixel."
 &#125;
 &#125;,
 "event_name": "AddToCart"
 &#125;,
 ]
&#125;
 

## Event Deduplication


The Meta Pixel and the Conversions API enable you to share standard and custom events with Meta so you can measure and optimize ad performance. The Pixel enables you to share web events from a web browser, while the Conversions API enables you to share web events directly from your server.


If you connect website activity using both the Pixel and the Conversions API, we may receive the same events from the browser and the server. If we know that the events are the same and therefore redundant, we can keep one and discard the rest. This is called deduplication.


The deduplication key feedback shows the percentages of events from the Pixel and the Conversions API that were received with each deduplication key. We recommend sharing deduplication keys for all of your events – the higher the percentage, the better.


To learn more about deduplication best practices, see the Business Help Center article.


Use case: Monitor the rate of deduplication between browser and server events to help to increase event coverage rate for your Conversions API-connected events.


Documentation: All fields available for dedupe key feedback can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;dedupe_key_feedback&#123;dedupe_key,browser_events_with_dedupe_key&#123;percentage,description&#125;,server_events_with_dedupe_key&#123;percentage,description&#125;,overall_browser_coverage_from_dedupe_key&#123;percentage,description&#125;&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;dedupe_key_feedback&#123;dedupe_key,browser_events_with_dedupe_key&#123;percentage,description&#125;,server_events_with_dedupe_key&#123;percentage,description&#125;,overall_browser_coverage_from_dedupe_key&#123;percentage,description&#125;&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123; 
 "web": [
 &#123;
 "dedupe_key_feedback": [
 &#123;
 "dedupe_key": "event_id",
 "browser_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of browser events that contain this dedupe key."
 &#125;,
 "server_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of server events that contain this dedupe key."
 &#125;,
 "overall_browser_coverage_from_dedupe_key": &#123;
 "percentage": 14.8,
 "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
 &#125;
 &#125;,
 &#123;
 "dedupe_key": "external_id",
 "browser_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of browser events that contain this dedupe key."
 &#125;,
 "server_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of server events that contain this dedupe key."
 &#125;,
 "overall_browser_coverage_from_dedupe_key": &#123;
 "percentage": 15.96,
 "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
 &#125;
 &#125;,
 &#123;
 "dedupe_key": "fbp",
 "browser_events_with_dedupe_key": &#123;
 "percentage": 0,
 "description": "The percentage of browser events that contain this dedupe key."
 &#125;,
 "server_events_with_dedupe_key": &#123;
 "percentage": 0,
 "description": "The percentage of server events that contain this dedupe key."
 &#125;,
 "overall_browser_coverage_from_dedupe_key": &#123;
 "percentage": 0,
 "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
 &#125;
 &#125;
 ],
 "event_name": "AddToCart"
 &#125;,
 ]
&#125;
 

## Data Freshness


Data freshness indicates the delay between the time the event occurred and when we received it. Best practice is to share your events in real time, or as close to real time as possible


The Meta Pixel defaults to sending web browser events in real time. To get the most value from your events, we recommend you send them in real time or as close to real time as possible. Events sent with a delay may impact how effectively your ads can be delivered to the right audiences.


To learn more about data freshness best practices, see the Business Help Center article.


Use case: Evaluate how quickly events are received from server versus browser. Improve frequency to real_time when possible to get the most value from your event data.


Documentation: All fields available for data freshness can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;data_freshness&#123;upload_frequency,description&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;data_freshness&#123;upload_frequency,description&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123; 
 "web": [
 &#123;
 "data_freshness": &#123;
 "upload_frequency": "real_time",
 "description": "The average frequency with which instances of this event are received through the Conversions API."
 &#125;,
 "event_name": "ViewContent"
 &#125;,
 &#123;
 "data_freshness": &#123;
 "upload_frequency": "hourly",
 "description": "The average frequency with which instances of this event are received through the Conversions API."
 &#125;,
 "event_name": "Lead"
 &#125;,
 ]
&#125;
 

## Additional Conversions Reported (ACR) for Conversions API Event


Additional Conversions Reported (ACR) for Conversions API Event is a metric that estimates how many conversions (for example, purchases or link clicks) are measured as a result of an advertiser’s Conversions API setup.


To learn more about additional conversions reported, see the About ACR article and the Learn More section.


Use case: For Meta Pixels not connected to the Conversions API, extract the additional conversions reported metric to estimate the impact a Conversions API integration may have.


Documentation: All fields available for ACR for Conversion API event can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_potential_aly_acr_increase&#123;description,percentage&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_potential_aly_acr_increase&#123;description,percentage&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_potential_aly_acr_increase": &#123;
 "description": "Similar advertisers who set up Conversions API for Search events saw a median of 32.9% additional conversions reported versus those that only used Meta Pixel.",
 "percentage": 32.9
 &#125;,
 "event_name": "Search"
 &#125;,
 &#123;
 "event_potential_aly_acr_increase": &#123;
 "description": "Similar advertisers who set up Conversions API for PageView events saw a median of 30.1% additional conversions reported versus those that only used Meta Pixel.",
 "percentage": 30.1
 &#125;,
 "event_name": "PageView"
 &#125;
 ]
&#125;
 

## Additional Conversions Reported (ACR)


Additional Conversions Reported (ACR) is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. It also can help you determine if you can improve your Conversions API setup to measure more reported conversions. More reported conversions can help you decrease your cost per result and show your ads to people that find them relevant.


To learn more about additional conversions reported, see the About ACR article and the Learn More section.


Use case: For events connected to the Conversions API and have an EMQ score, monitor the uplift in additional conversions which the Conversions API is able to drive.


Documentation: All fields available for ACR can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;acr&#123;description,percentage&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;acr&#123;description,percentage&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "acr": &#123;
 "description": "In the last 7 days, you saw about 37.9% more conversions reported for Search events by using the Conversions API alongside the Meta Pixel.",
 "percentage": 37.9
 &#125;,
 "event_name": "Search"
 &#125;,
 &#123;
 "acr": &#123;
 "description": "In the last 7 days, you saw about 45.5% more conversions reported for Page View events by using the Conversions API alongside the Meta Pixel..",
 "percentage": 45.5
 &#125;,
 "event_name": "PageView"
 &#125;
 ]
&#125;
 

## FAQs


What Is the Dataset Quality API?Advertisers that share server events using the Conversions API can see the event match quality score in Events Manager. However, this only works on an individual basis and is difficult to scale in cases where a tech provider partner, agency partner or advertiser is managing hundreds and thousands of Meta Pixels for their businesses. The Dataset Quality (formerly known as Integration Quality) API can help solve this problem by consolidating dataset quality metrics programmatically at scale.


 Enlace permanente What is the access token used for? The access token is used when partners send signal events or access the Setup Quality API on behalf of advertisers. The client system user access token onboarding method is not compatible with the EMQ API at the moment.


 Enlace permanente How should the partner_agent field be formatted? The partner_agent value in your API GET request should be a normalized lowercase format. This field is now optional.


 Enlace permanente Can an Access Token Generated Using Events Manager Prior to July 2025 Access the Dataset Quality API Directly? The advertiser will need to go to Events Manager to accept by using the instructions in the Client Generates Token Manually Using Events Manager section explained above. Once the advertiser completes the opt-in process, both the new token and existing generated tokens by the same user will be able to send events or access the Dataset Quality API.


 Enlace permanente 

## Learn More


 
- Conversions API Best Practices.

- Drive performance with an optimized Conversions API setup.

- Optimizing your setup can help unlock the potential of your marketing performance.

- Best practices to onboard the Conversions API for partners.

- Conversions API dataset quality guidance in the Business Help Center:

 

 
- Best practices for Conversions API to help improve ad performance. These Conversions API best practices can help businesses improve their ad performance by lowering their cost per action. We suggest following these best practices upon initial setup, but they can also be used to update existing setups.

- View server event details in Meta Events Manager. After businesses set up the Conversions API, they can use this article to learn how to monitor events and parameters to make sure their setup is working effectively and identify opportunities for improvement. Businesses can use this article to learn how to use server event details (Event Match Quality, Data Freshness, Event Overview and Event Deduplication) in Events Manager to improve their Conversions API setup.

 

 
- Additional Conversions Reported:

 

 
- About additional conversions reported.

- Troubleshoot reasons why your additional reported conversions are not available.

- How to interpret additional conversions reported

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Parámetros de información del cliente - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters

Parámetros de información del cliente - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros de información del cliente

Los parámetros de información del cliente son un conjunto de identificadores de usuario que se comparten con la información de eventos. Para obtener más información sobre los parámetros obligatorios y recomendados, consulta Prácticas recomendadas; API de conversiones: Enviar parámetros requeridos y recomendados.

 En la API Graph v13.0, hay nuevos requisitos relacionados con las combinaciones de parámetros de información del cliente que se consideran válidos. Repasa las prácticas recomendadas para asegurarte de que no se interrumpan las integraciones de la API de conversiones.

 Consulta la Guía sobre privacidad y uso de datos de Meta para conocer qué datos se envían cuando se usa la API de conversiones.

Nuestros sistemas están diseñados para no admitir datos de clientes que representen información de contacto sin cifrar, excepto en los casos que se indican a continuación. La información de contacto es información que identifica a las personas, como nombres, direcciones de correo electrónico y números de teléfono, y que usamos únicamente con el fin de buscar coincidencias. Si usas el SDK de Meta para empresas, el formato hash se aplica automáticamente.

 

## Diferencias con el píxel

Puedes enviar muchos de los parámetros de información del cliente a través del píxel de Meta, aunque algunos (p. ej., client_user_agent) se envían de forma automática como parte del mecanismo de funcionamiento de internet. Por ejemplo, para enviar external_id a través del píxel, usa el siguiente código:

fbq(&#039;init&#039;, &#039;PIXEL_ID&#039;, &#123;&#039;external_id&#039;: 12345&#125;);Lee sobre los demás parámetros que puedes pasar con el píxel en la Documentación sobre coincidencias avanzadas.

A la inversa, asegúrate de aplicar al servidor el mismo conjunto de parámetros de información del cliente que tu sistema comparte con el navegador.

 

## Formato de los parámetros user_data

En tu solicitud, debes proporcionar al menos uno de los siguientes parámetros user_data con el formato correcto.

Nota: Si usas la biblioteca del administrador de parámetros, el formato contendrá un apéndice adicional al final de cada parámetro. Para obtener más información, consulta la página de la biblioteca del administrador de parámetros.

 Descarga este archivo CSV para ver ejemplos de datos normalizados y en formato hash de los parámetros que se indican a continuación.

 

 Descargar (hacer clic con el botón derecho > Guardar enlace como) Parámetro Descripción `em` Correo electrónico

 Cadena o lista <string> Se debe aplicar una función hash. Elimina los espacios iniciales y finales. Convierte todos los caracteres en minúsculas.

Ejemplo:

Entrada: John_Smith&#064;gmail.comFormato normalizado: john_smith&#064;gmail.comSalida de SHA256 esperada: 62a14e44f765419d10fea99367361a727c12365e2520f32218d505ed9aa0f62f

 `ph` Número de teléfono

 Cadena o lista <string> Se debe aplicar formato hash. Elimina los símbolos, las letras y los ceros iniciales. Los números de teléfono tienen que incluir un código de país para que podamos usarlos en la búsqueda de coincidencias (p. ej., si se trata de un número de teléfono de Estados Unidos, se debe anteponer un 1). Incluye siempre el código de país de los números de teléfono de los clientes aunque todos los datos correspondan al mismo país.

Ejemplo:

Entrada: Número de teléfono de EE. UU. (650)555-1212Formato normalizado: 16505551212Salida de SHA256 esperada:

e323ec626319ca94ee8bff2e4c87cf613be6ea19919ed1364124e16807ab3176

 `fn` Nombre

 Cadena o lista <string> Se debe usar cifrado. Se recomienda usar caracteres de la "a" a la "z" del alfabeto romano. No se pueden usar mayúsculas ni signos de puntuación. Si usas caracteres especiales, el texto se debe codificar en formato UTF-8.

Ejemplo:Entrada: MaryFormato normalizado: marySalida de SHA256 esperada: 6915771be1c5aa0c886870b6951b03d7eafc121fea0e80a5ea83beb7c449f4ec


Entrada: 정Formato normalizado: Carácter UTF-8 "정"Salida de SHA256 esperada: 8fa8cd9c440be61d0151429310034083132b35975c4bea67fdd74158eb51db14


Entrada: ValéryFormato normalizado: valérySalida de SHA256 esperada: 08e1996b5dd49e62a4b4c010d44e4345592a863bb9f8e3976219bac29417149c

 `ln` Apellido

 Cadena o lista <string> Se debe usar cifrado. Se recomienda usar caracteres de la "a" a la "z" del alfabeto romano. No se pueden usar mayúsculas ni signos de puntuación. Si usas caracteres especiales, el texto se debe codificar en formato UTF-8.


Consulta la sección sobre el parámetro "Nombre" (fn) para hallar ejemplos.

 `db` Fecha de nacimiento

 Cadena o lista <string> Se debe aplicar formato hash. Usamos el formato AAAAMMDD para unificar distintas combinaciones de mes, día y año con o sin puntuación.

 - Año: usa el formato AAAA desde 1900 hasta el año actual.
- Mes: usa el formato MM (del 01 al 12).
- Fecha: usa el formato DD (del 01 al 31).
 Ejemplo:

Entrada: 16/2/1997Formato normalizado: 19970216Salida de SHA256 esperada: 01acdbf6ec7b4f478a225f1a246e5d6767eeab1a7ffa17f025265b5b94f40f0c

 `ge` Género

 Cadena o lista <string> Se debe aplicar una función hash. Se debe indicar solo la inicial categoría de sexo, en minúscula.

Ejemplo:

 - "f" para femenino
- "m" para masculino
 `ct` Ciudad

 Cadena o lista <string> Se debe aplicar una función hash. Se recomienda usar caracteres de la "a" a la "z" del alfabeto romano. Solo puede contener minúsculas, no signos de puntuación, caracteres especiales ni espacios. Si usas caracteres especiales, el texto se debe codificar en formato UTF-8.

Ejemplo: paris london newyork

 `st` Estado

 Cadena o lista <string> Se debe aplicar formato hash. Usa el código de abreviatura ANSI de 2 caracteres, en minúscula. Normaliza los estados fuera de los EE. UU. en minúscula, sin puntuación, caracteres especiales ni espacios.

Ejemplo: az ca

 `zp` Código postal

 Cadena o lista <string> Se debe aplicar formato hash. Usa minúsculas sin espacios ni guion. Si se trata de un código postal de EE. UU., usa solo los 5 primeros dígitos. En el caso del Reino Unido, usa el formato de área, distrito y sector

Ejemplo: Código postal de EE. UU.: 94035 Código postal de Australia: 1987 Código postal de Francia: 75018 Código postal del Reino Unido: m11ae

 `country` País

 Cadena o lista <string> Se debe aplicar formato hash. Usa los códigos de país de 2 letras, en minúscula, en ISO 3166-1 alpha-2.Nota importante: Incluye siempre los países de tus clientes, incluso si todos los códigos son del mismo país. Buscamos coincidencias en una escala global, y este sencillo paso nos ayuda a asociar la mayor cantidad de cuentas del centro de cuentas posible de tu lista.

Ejemplo:Entrada: Estados UnidosFormato normalizado: usSalida de SHA256 esperada: 79adb2a2fce5c6ba215fe5f27f532d4e7edbac4b6a5e09e1ef3a08084a904621

 `external_id` Identificador externo

 Cadena o lista <string> Se recomienda aplicar formato hash. Cualquier identificador único del anunciante, como identificadores de membresías de fidelidad, identificadores de usuarios e identificadores de cookies externas. Puedes enviar uno o más identificadores externos para un evento determinado. Si un identificador externo se envía a través de otros canales, debe tener el mismo formato que cuando se envió a través de la API de conversiones.

 `client_ip_address` Dirección IP del cliente

 Cadena No aplicar formato hash. La dirección IP del navegador correspondiente al evento debe ser una dirección IPV4 o IPV6 válida. En el caso de los usuarios que pueden usar una dirección IPV6, esta es preferible a la IPV4. El parámetro de datos de usuario client_ip_address nunca se debe proteger con una función hash. Tampoco se deben incluir espacios. Proporciona siempre la dirección IP real para asegurarte de que los informes de eventos sean correctos.Nota: Esta información se agrega de forma automática a eventos enviados a través del navegador, pero se debe configurar manualmente en el caso de los eventos enviados a través del servidor.

Ejemplo:IPV4: 168.212.226.204IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

 `client_user_agent` Agente de usuario del cliente

 Cadena No se debe cifrar. Agente de usuario del navegador correspondiente al evento. El parámetro client_user_agent es obligatorio si se trata de eventos de sitios web que se comparten mediante la API de conversiones.

Enviar los parámetros client_ip_address y client_user_agent para todos los eventos que envías a través de la API de conversiones podría ayudar a mejorar la coincidencia de eventos y también la entrega de anuncios de las campañas de anuncios, optimizando así los eventos que envías a través de la API de conversiones.Nota: Esta información se agrega de forma automática a eventos que se envían a través del navegador, pero se debe configurar manualmente para eventos que se envían a través del servidor.

Ejemplo: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36

 `fbc` Identificador de clic

 Cadena No se debe aplicar formato hash. El valor del identificador de clics de Facebook se almacena en la cookie del navegador _fbc en tu dominio. Consulta Administrar los parámetros fbc y fbp para averiguar cómo obtener o generar este valor a partir de un parámetro de consulta fbclid.

El formato es: fb.$&#123;subdomain_index&#125;.$&#123;creation_time&#125;.$&#123;fbclid&#125;.

Nota: Si usas la biblioteca del administrador de parámetros, el formato contendrá un apéndice adicional al final de cada parámetro. Para obtener más información, consulta la página de la biblioteca del administrador de parámetros.

Ejemplo:fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890

 `fbp` Identificador de navegador

 Cadena No se debe aplicar formato hash. El valor del identificador del navegador de Facebook se almacena en la cookie del navegador _fbc en tu dominio. Consulta Administrar los parámetros fbc y fbp para averiguar cómo obtener este valor.

El formato es fb.$&#123;subdomain_index&#125;.$&#123;creation_time&#125;.$&#123;fbclid&#125;.

Nota: Si usas la biblioteca del administrador de parámetros, el formato contendrá un apéndice adicional al final de cada parámetro. Para obtener más información, consulta la página de la biblioteca del administrador de parámetros.

Ejemplo: fb.1.1596403881668.1116446470

 `subscription_id` Identificador de suscripción

 Cadena No se debe cifrar. El identificador de suscripción del usuario de esta transacción; es similar al identificador del pedido de un producto.

 `fb_login_id` Identificador de inicio de sesión con Facebook

 Número entero No se debe aplicar formato hash. El identificador emitido por Meta cuando una persona inicia sesión por primera vez en una instancia de una app. También se conoce como identificador específico de la app.

 `lead_id` Identificador del cliente potencial

 Número entero No se debe aplicar formato hash. El identificador asociado a un cliente potencial generado por anuncios para clientes potenciales de Meta.

 `anon_id` Cadena No aplicar formato hash. El identificador de instalación. Este campo representa instancias de instalación de la app únicas.


Note: Este parámetro solo se usa en eventos de la app

 `madid` Cadena Tu identificador del anunciante y el identificador de publicidad de un dispositivo Android o el identificador de publicidad (IDFA) de un dispositivo Apple.

 `page_id` Cadena No se debe aplicar formato hash. El identificador de tu página. Especifica el identificador de la página asociado con el evento. Usa el identificador de la página de Facebook de la página asociada con el bot.

 `page_scoped_user_id` Cadena No se debe aplicar formato hash. Especifica el identificador de usuario específico de la página asociado con el bot de mensajes que registra el evento. Usa el identificador de usuario específico de la página suministrado a tu webhook.

 `ctwa_clid` Cadena No se debe aplicar formato hash. Identificador de clic generado por Meta para anuncios de clic a WhatsApp.

 `ig_account_id` Cadena No se debe aplicar formato hash.Identificador de la cuenta de Instagram que está asociada con el negocio.

 `ig_sid` Cadena No se debe aplicar formato hash. Los usuarios que interactúan con Instagram se identifican por identificadores de usuario específicos de Instagram (IGSID). El IGSID se puede obtener de este webhook.

 

## Más información

 - Parámetros de datos personalizados
- Guía sobre privacidad y uso de datos de Meta
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Parámetros principales del cuerpo - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/main-body

Parámetros principales del cuerpo - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros principales del cuerpo

 Parámetro Descripción `data` Matriz <object> Obligatorio. Una matriz de objetos de eventos del servidor. Consulta Parámetros del evento del servidor para obtener más información.

 `test_event_code` Cadena Opcional. Código utilizado para verificar que Facebook recibe correctamente los eventos de tu servidor. Usa este código para probar los eventos de tu servidor en la característica de eventos de prueba en el administrador de eventos. Consulta herramienta de eventos de prueba para obtener un ejemplo.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Parámetros de datos de la app - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/app-data

Parámetros de datos de la app - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros de datos de la app

Usa estos parámetros para compartir datos de la app e información de los dispositivos con la API de conversiones.

Consulta el documento API de conversiones para eventos de la app si necesitas orientación sobre cómo integrar los eventos de la app.


 Parameter Description `advertiser_tracking_enabled` boolean Required for app events


Use this field to specify ATT permission on an iOS 14.5+ device. Set to 0 for disabled or 1 for enabled.


 `application_tracking_enabled` boolean Required for app events


A person can choose to enable ad tracking on an app level. Your SDK should allow an app developer to put an opt-out setting into their app. Use this field to specify the person&#039;s choice. Use 0 for disabled, 1 for enabled.


 `extinfo` object Please use the down arrow to the right to see the list of extinfo values.


 Required for app events


Extended device information, such as screen width and height. This parameter is an array and values are separated by commas. When using extinfo, all values are required and must be in the order indexed below. If a value is missing, fill with an empty string as a placeholder.


Note:


 
- version must be a2 for Android

- version must be i2 for iOS

 
 0


 string Required


extinfo version


Example: i2


 1


 string app package name


Example: com.facebook.sdk.samples.hellofacebook


 2


 string short version (int or string)


Example: 1.0


 3


 string long version


Example: 1.0 long


 4


 string Required


OS version


Example: 13.4.1


 5


 string device model name


Example: iPhone5,1


 6


 string locale


Example: En_US


 7


 string timezone abbreviation


Example: PDT


 8


 string carrier


Example: AT&T


 9


 string screen width


Example: 320


 10


 string screen height


Example: 568


 11


 string screen density


Example: 2


 12


 string CPU cores


Example: 2


 13


 string external storage size in GB


Example: 13


 14


 string free space on external storage in GB


Example: 8


 15


 string device timezone


Example: USA/New York


 `campaign_ids` string Optional


An encrypted string and non-user metadata appended to the outbound URL (for example, ad_destination_url) or deep link (for App Aggregated Event Measurement) when a user clicked on a link from Facebook.


Graph API definition: Parameter passed via the deep link for Mobile App Engagement campaigns.


 `install_referrer` string Optional
Third party install referrer, currently available for Android only, see here for more.


 `installer_package` string Optional


Used internally by the Android SDKs


 `url_schemes` array Optional


Used internally by the iOS and Android SDKs.


 `vendor_id` string Optional


Vendor ID.


 `windows_attribution_id` string Optional


Attribution token used for Windows 10.


 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Parámetros estándar - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data

Parámetros estándar - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros estándar

En esta tabla, figuran todos los parámetros estándar que los usuarios pueden enviar a Meta.

 Parámetros estándar del sitio web Parámetros estándar de la app Parámetros estándar offline Descripción availability

 fb_availability

 availability

 El valor debe ser available_soon, for_rent, for_sale, off_market, recently_sold o sale_pending.

 body_style

 fb_body_style

 body_style

 Estilo de carrocería del vehículo: CONVERTIBLE, COUPE, HATCHBACK, MINIVAN, TRUCK, SUV, SEDAN, VAN, WAGON, CROSSOVER y OTHER.

 checkin_date

 fb_checkin_date

 checkin_date

 Fecha en que el usuario desea registrar su llegada al hotel, en la zona horaria del hotel. Aceptamos fechas en los formatos YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD y YYYY-MM-DDThh:mm:ssTZD.

 city

 fb_city

 city

 Proporciona la ciudad de la ubicación a partir de la intención del usuario.

 condition_of_vehicle

 fb_condition_of_vehicle

 condition_of_vehicle

 Condición del vehículo.

 content_ids

 fb_content_ids

 content_ids

 Los identificadores de contenido asociados con el evento, como los SKU de los artículos de un evento AddToCart.

 content_type

 fb_content_type

 content_type

 Deberá configurarse en product o product_group:

 - Utiliza product si las claves que envías representan productos. Las claves que envías pueden ser content_ids o contents.
- Utiliza product_group si las claves que envías en content_ids representan grupos de productos. Los grupos de productos se utilizan para distinguir productos que son idénticos salvo por diferencias de color, material, tamaño o diseño.
 contents

 fb_contents

 contents

 Una lista de objetos JSON que contiene los identificadores del producto asociados con el evento y, además, información sobre los productos. Campos disponibles: id, quantity, item_price y delivery_category.

 country

 fb_country

 country

 Proporciona el país de la ubicación a partir de la intención del usuario.

 currency

 fb_currency

 currency

 Obligatorio para los eventos de compra. La divisa del value especificado, si corresponde. La divisa debe ser un código de divisa válido de tres dígitos según ISO 4217.

 delivery_category

 fb_delivery_category

 delivery_category

 Opcional para los eventos de compra. Tipo de entrega de un evento de compra. Los valores admitidos son los siguientes:

 - in_store: el cliente debe ingresar a la tienda para obtener el producto comprado.
- curbside: el cliente recoge su pedido conduciendo a un establecimiento y esperando dentro de su vehículo.
- home_delivery: la compra se entrega en el hogar del cliente.
 departing_arrival_date

 fb_departing_arrival_date

 departing_arrival_date

 Fecha y hora de la llegada al destino del trayecto de salida.

 departing_departure_date

 fb_departing_departure_date

 departing_departure_date

 Fecha y hora del inicio del trayecto de salida.

 destination_airport

 fb_destination_airport

 destination_airport

 Utiliza el código oficial de aeropuerto de destino de la IATA.

 destination_ids

 fb_destination_ids

 destination_ids

 Si tienes un catálogo de destinos, puedes asociar uno o más destinos del catálogo con un evento de hotel en particular.

 dma_code

 fb_dma_code

 dma_code

 El código de Designated Market Area (DMA) en el que el usuario busca ofertas.

 drivetrain

 fb_drivetrain

 drivetrain

 Tracción del vehículo: 4X2, 4X4, AWD, FWD, RWD, OTHER y NONE.

 exterior_color

 fb_exterior_color

 exterior_color

 Color exterior.

 fuel_type

 fb_fuel_type

 fuel_type

 Tipo de combustible del vehículo: DIESEL, ELECTRIC, FLEX, GASOLINE, HYBRID, PETROL, PLUGIN_HYBRID, OTHER y NONE.

 hotel_score

 fb_hotel_score

 hotel_score

 Indicador que representa el valor relativo de este hotel para el anunciante, en comparación con sus otros hoteles.

 interior_color

 fb_interior_color

 interior_color

 Color interior.

 lead_event_source

 lead_event_source

 lead_event_source

 Origen del evento de clientes potenciales.

 lease_end_date

 fb_lease_end_date

 lease_end_date

 Se especifica con el formato de fecha ISO 8601: YYYY-MM-DD.

 lease_start_date

 fb_lease_start_date

 lease_start_date

 Te permite recomendar propiedades según su disponibilidad de fechas (usando available_dates_price_config en el catálogo), y mejorar la experiencia del usuario en la página de destino (usando etiquetas de plantilla).

 listing_type

 fb_listing_type

 listing_type

 El valor debe ser for_rent_by_agent, for_rent_by_owner, for_sale_by_agent, for_sale_by_owner, foreclosed, new_construction o new_listing.

 make

 fb_make

 make

 Marca o fabricante del vehículo.

 mileage.unit

 fb_mileage.unit

 mileage.unit

 Unidad de kilometraje.

 mileage.value

 fb_mileage.value

 mileage.value

 Valor del kilometraje.

 model

 fb_model

 model

 Modelo del vehículo.

 neighborhood

 fb_neighborhood

 neighborhood

 Comunidad local de interés.

 net_revenue

 net_revenue

 net_revenue

 El valor del margen de un evento de conversión.

 num_adults

 fb_num_adults

 num_adults

 Número de adultos que se hospedarán.

 num_children

 fb_num_children

 num_children

 Número de niños que se hospedarán.

 num_infants

 fb_num_infants

 num_infants

 Número de bebés que se hospedarán.

 num_items

 fb_num_items

 num_items

 Se utiliza solo con eventos InitiateCheckout. El número de artículos que un usuario desea comprar durante la finalización de compra.

 order_id

 fb_order_id

 order_id

 El identificador del pedido de esta transacción como cadena.

 origin_airport

 fb_origin_airport

 origin_airport

 Se utiliza el código oficial de la IATA del aeropuerto de salida.

 postal_code

 fb_postal_code

 postal_code

 Código postal.

 predicted_ltv

 predicted_ltv

 predicted_ltv

 El valor a largo plazo predicho de un evento de conversión.

 preferred_baths_range

 fb_preferred_baths_range

 preferred_baths_range

 Número de baños seleccionado, expresado como un intervalo.

 preferred_beds_range

 fb_preferred_beds_range

 preferred_beds_range

 Número de habitaciones seleccionado, expresado como un intervalo.

 preferred_neighborhoods

 fb_preferred_neighborhoods

 preferred_neighborhoods

 Comunidades preferidas.

 preferred_num_stops

 fb_preferred_num_stops

 preferred_num_stops

 Indica el número preferido de paradas que busca el usuario.

 preferred_price_range

 fb_preferred_price_range

 preferred_price_range

 Rango de precio preferido para el vehículo. Mín/máx., hasta 2 decimales.

 preferred_star_ratings

 fb_preferred_star_ratings

 preferred_star_ratings

 Conjunto de calificaciones de hotel mínimas y máximas que filtra el usuario.

 price

 fb_price

 price

 Costo y divisa del vehículo. El formato del precio debe ser el costo seguido por el código de divisa ISO, con un espacio entre el costo y la divisa.

 product_catalog_id

 product_catalog_id

 product_catalog_id

 Identificador del catálogo de productos.

 property_type

 fb_property_type

 property_type

 Debe ser apartment, condo, house, land, manufactured, other o townhouse.

 region

 fb_region

 region

 Estado, distrito o región de interés.

 returning_arrival_date

 fb_returning_arrival_date

 returning_arrival_date

 Fecha y hora en que se completa el trayecto de regreso.

 returning_departure_date

 fb_returning_departure_date

 returning_departure_date

 Fecha y hora del inicio del trayecto de regreso.

 search_string

 fb_search_string

 search_string

 Se utiliza solo con el evento Search. Una consulta de búsqueda que realiza un usuario.

 state_of_vehicle

 fb_state_of_vehicle

 state_of_vehicle

 Estado del vehículo.

 suggested_destinations

 fb_suggested_destinations

 suggested_destinations

 Destinos sugeridos.

 suggested_home_listings

 fb_suggested_home_listings

 suggested_home_listings

 Sugerencias de anuncios de viviendas.

 suggested_hotels

 fb_suggested_hotels

 suggested_hotels

 Hoteles sugeridos.

 suggested_jobs

 fb_suggested_jobs

 suggested_jobs

 Empleos sugeridos.

 suggested_local_service_businesses

 fb_suggested_local_service_businesses

 suggested_local_service_businesses

 Servicios comerciales locales sugeridos.

 suggested_location_based_items

 fb_suggested_location_based_items

 suggested_location_based_items

 Artículos sugeridos basados en la ubicación.

 suggested_vehicles

 fb_suggested_vehicles

 suggested_vehicles

 Vehículos sugeridos.

 transmission

 fb_transmission

 transmission

 Transmisión del vehículo: AUTOMATIC, MANUAL, OTHER y NONE.

 travel_class

 fb_travel_class

 travel_class

 Debe ser economy, premium, business o first.

 travel_end

 fb_travel_end

 travel_end

 Fecha de finalización de viaje.

 travel_start

 fb_travel_start

 travel_start

 Fecha de inicio de viaje.

 trim

 fb_trim

 trim

 Máximo de caracteres: 50.

 user_bucket

 fb_user_bucket

 user_bucket

 Grupo de usuarios.

 value

 _valueToSum

 value

 Obligatorio en el caso de los eventos de compras o cualquier evento que utilice la optimización de valores.

Un valor numérico asociado con el evento. Debe representar un importe monetario.

 vin

 fb_vin

 vin

 Número de VIN.

 year

 fb_year

 year

 Año de lanzamiento del vehículo en formato yyyy.

 item_number

 Identificador único para distinguir eventos dentro del mismo pedido o transacción.

 ad_type

 Tipo de anuncio.

 fb_content

 Una lista de objetos JSON que contiene el número de artículo internacional (EAN), si corresponde, u otros identificadores de producto o contenido, además de las cantidades y los precios de los productos. Obligatorio: id, quantity.


Ejemplo: "[&#123;\"id\": \"1234\", \"quantity\": 2,&#125;, &#123;\"id\": \"5678\", \"quantity\": 1,&#125;]".

 fb_content_id

 Número de artículo internacional (EAN), si corresponde, u otros identificadores del producto o del contenido. Si hay varios identificadores de producto, puede ser, por ejemplo: "[\"1234\",\"5678\"]".

 fb_description

 La descripción de una cadena.

 fb_level

 Nivel de un juego.

 fb_max_rating_value

 Límites superiores de una escala de calificación, por ejemplo 5 en una escala de 5 estrellas.

 fb_payment_info_available

 1 indica sí, 0 indica no.

 fb_registration_method

 Facebook, correo electrónico, Twitter, etc.

 fb_success

 1 indica sí, 0 indica no.

 _valueToSum

 Valor numérico del evento individual que se debe sumar al informe.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Datos de eventos originales - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/original-event

Datos de eventos originales - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros de datos de eventos originales

Usa estos parámetros para compartir información de eventos originales que quieras asociar con la API de conversiones.

 Parámetro Descripción `event_name` Cadena Obligatorio. Nombre del evento estándar o del evento personalizado.

 `event_time` Número entero Obligatorio. Marca de tiempo UNIX en segundos que indica cuándo ocurrió realmente el evento. La hora especificada puede ser anterior a la hora a la que envías el evento a Facebook. Debes enviar esta fecha en la zona horaria GMT.

 `order_id` Cadena Opcional. El identificador del pedido de esta transacción, expresado como cadena.

 `event_id` Cadena Opcional. Este indicador puede ser cualquier cadena única que haya elegido el anunciante. Los parámetros event_id y event_name se usan para deduplicar los eventos que enviaron tanto la página web (a través del píxel de Meta) o la app (a través del SDK o API de eventos de la app) como la API de conversiones. Ten en cuenta que, si bien event_id está marcado como opcional, se recomienda usarlo para deduplicar eventos.

A los fines de la deduplicación, el valor eventID del evento del navegador o de la app debe coincidir con el valor de event_id del evento correspondiente del servidor. Obtén más información acerca del Manejo de eventos de píxel y de API de conversiones duplicados.

Se pueden usar como identificadores potenciales de event_id un número de orden o un identificador de la transacción. Por ejemplo, si un cliente realiza dos compras en el sitio web con los números de orden 123 y 456, las llamadas a la API de conversiones deberán incluir el correspondiente número de orden en el parámetro event_id. Esto nos permite distinguir correctamente estos dos eventos de compra como pedidos distintos. Es necesario que los dos eventos de compra correspondientes del píxel del navegador también envíen los mismos números de pedido en el parámetro eventID para que podamos comprender que solo ocurrieron dos eventos y no cuatro compras distintas.

En cuanto a los otros eventos que no cuentan con un número de identificación intrínseco, se puede usar un número aleatorio (siempre que se envíe el mismo número aleatorio en el evento del navegador y en el del servidor).

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Integración de clientes potenciales de conversión - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides/crm-integration

Integración de clientes potenciales de conversión - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Integración de API de conversiones para CRM

Es posible que ya tengas configurada la API de conversiones de Meta para que el negocio pueda cargar los eventos de servidor de tu tráfico web. Si usas Facebook o Instagram para generar clientes potenciales a fin de que tu negocio convierta ventas, también puedes usar la API de conversiones para cargar eventos offline desde tu sistema de administración de relaciones con los clientes (CRM). Generalmente, se trata de una integración distinta de la configuración actual de la API de conversiones, porque los parámetros obligatorios son diferentes y los datos provienen del sistema de CRM, en vez de los servidores web.

Si integras el CRM y usas el objetivo de rendimiento de clientes potenciales de conversión, puedes obtener clientes potenciales de mayor calidad y con mayores probabilidades de conversión. Por el momento, este objetivo de optimización solo es compatible con los anuncios para clientes potenciales de Facebook e Instagram (formularios instantáneos).

Es necesario que ya cuentes con una integración establecida para descargar clientes potenciales de Meta en tu CRM (se resaltan en verde en la imagen que se muestra a continuación). En esta guía completa, se explica el proceso de integración de CRM para volver a enviar datos de eventos de la porción inferior del embudo de CRM a Meta (se resaltan en rojo en la imagen que se muestra a continuación).

 

## Comprueba si tu negocio es una buena opción

Antes de comenzar a trabajar en la integración de la API de conversiones para CRM, debes comprobar si el negocio se adaptará bien al modelo de optimización. A continuación, encontrarás algunas normas que deberán cumplir las integraciones.

 - Usa los anuncios para clientes potenciales (formularios instantáneos) de Facebook/Instagram.
- Para obtener mejores resultados, asegúrate de que el identificador de clientes potenciales de Meta de entre 15 y 17 dígitos esté almacenado en tu CRM. Se recomienda enviar identificadores de clientes potenciales para cada evento. Si no tienes uno, sugerimos que envíes parámetros del cliente, como identificador de clic, número de teléfono o correo electrónico.
- Genera al menos 200 clientes potenciales por mes.
- La integración debe poder cargar datos con regularidad, al menos una vez al día.
- La etapa de cliente potencial que deseas optimizar se produce en un plazo de 28 días desde que se genera el cliente potencial.
- La etapa de cliente potencial que deseas optimizar tiene un porcentaje de conversiones que oscila entre 1% y 40%.
 

## Planifica la línea de tiempo del proyecto

Si crees que tu negocio se adapta bien a la optimización, puedes usar esta línea de tiempo estimada para planificar el proyecto. El tiempo estimado para evaluar el proyecto es, según los datos históricos, de 1 mes. Sin embargo, el calendario real puede variar para todos los anunciantes. La línea de tiempo dependerá de los recursos disponibles en lo que respecta a la toma de decisiones y la resolución de problemas en el marco de la integración.

 Sección Descripción Propietario de la tarea Duración estimada 1: Conectar el CRM con los anuncios para clientes potenciales

 Descargar automáticamente clientes potenciales de Facebook

 Anunciante

 Requisitos previos

 2: Primeros pasos con la integración del CRM

 Crear o seleccionar un píxel de Meta para los eventos del CRM

 Anunciante

 <1 día

 3: Implementar la integración de CRM (desarrollador)

 Conectar el CRM mediante la API de conversiones

 Anunciante

 Meta Business Partner <1 día

Entre 3 y 4 semanas﹡

 4: Verificar tus datos (no requiere acción del anunciante)

 Esperar la validación de los datos

 Meta

 Aprox. 1 a 2 días

 5: Configurar el embudo de ventas

 Configurar los eventos del embudo de ventas dentro del CRM

 Anunciante

 <1 día

 6: Fase de aprendizaje (no requiere acción del anunciante)

 Esperar el análisis del embudo y el período de entrenamiento ﹡﹡

 Meta

 2 a 4 semanas

 —

 Ejecutar campañas de optimización de clientes potenciales de conversión a pleno rendimiento

 Anunciante

 Tiempo total

 Aprox. 3 a 4 semanas

 ﹡ Se puede reducir la duración de este paso si se utiliza la integración con socios. ﹡﹡ Es posible realizar campañas de rendimiento de clientes potenciales durante el período de entrenamiento, pero no se verá el aumento del rendimiento hasta que el entrenamiento haya finalizado.

 

## Roles y responsabilidades

A continuación, se describen los roles que deben incluirse en el proyecto. Ten en cuenta que algunos roles pueden consolidarse o dividirse según la organización.

 Rol Responsabilidades Equipo de ventas y marketing

 - Suele ser el rol que inicia el proyecto e identifica el personal que requiere la organización para finalizar la integración.
- Tiene conocimiento detallado del proceso de ventas y de marketing, lo que le permite definir el embudo.
- Cuenta con los permisos necesarios para realizar las tareas en el administrador de anuncios y el administrador de eventos de Meta.
- Crea la integración entre el CRM y Meta, si se incluye una integración con socios, como Zapier.
 Administrador del CRM

 - Tiene conocimiento detallado de los campos y las funciones del CRM.
- Crea nuevos campos y procesos dentro del CRM, de ser necesario.
- Brinda asistencia a los especialistas en marketing y desarrolladores durante todo el proceso de integración.
 Desarrollador

 - Crea la integración entre el CRM y Meta, si se incluye una integración manual.
- Se asegura de que la integración manual funcione correctamente.
 → Siguiente 1: Connecting Your CRM With Lead Ads 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Implementación de extremo a extremo - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides/end-to-end-implementation

Implementación de extremo a extremo - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 Volver al documento en español Se actualizó este documento.
La traducción en español no está disponible todavía. Actualización del documento en inglés: Ayer 
Actualización del documento en español: 26 may. 2025 

# Conversions API End-to-End Implementation


The Conversions API supports advertisers’ efforts to provide consumers with appropriate data transparency and control while also helping them to continue providing personal experiences. With the API, you can share data directly from your server, rather than through a browser.


### Benefits of Integration


 
- Deeper-Funnel Visibility: The Conversions API allows you to share a wider array of data when compared to the Meta Pixel. With the API, you can make decisions taking into account more information, such as CRM data, lower funnel events (including qualified leads), and multi-site conversion paths across a website and a physical location.

- Data Control: When used via a Server-Only implementation (for example, without the Meta Pixel), the Conversions API gives you added control over what data you share. You can choose to append insights to your events, providing data such as product margins or historical information, like customer value scores.

- Signal Reliability and Resiliency: Data sharing through the Conversions API may be more reliable than browser-based methods alone, like the Meta Pixel. The API is designed to be less susceptible to issues like a browser crash or connectivity problems. New industry data transmission restrictions may limit the efficacy of cookies and Pixel tracking, so the Conversions API helps you have control on sharing signals that may no longer be captured by the Pixel.

 
 Additional Resources: View the Conversions API Direct Integration Playbook for Developers (PDF) and Direct Integration Webinar for Developers


 

## Overview


You can think about your Conversions API integration in two main stages:


 
- Preparation — Select which type of integration makes sense for you, define which events to send, and review available optimization options.

- Execution — Learn how to implement the API. For this stage, you can also use a partner integration.

 

The following is a snapshot of the complete integration process:


 Requirements Full Integration Optimization Select events to share with Meta with user consent (if any).


Set up your business’ assets: Meta Pixel, Meta Application, Business Manager, Server Connection, System User.


 Step 1: One event - Sending any event, manually or automated using the system user&#039;s token. Completing this step means you have correctly set up authentication.


Step 2: Fully Integrated - You need to be sending some automated events to be considered integrated. Completing this milestone means you are able to optimize for Conversions API even in the event that you stop using the Pixel or the Pixel is blocked.


 Once you are fully integrated, send enough automated funnel events to be considered fully onboarded. Then, optimize your match rate based on guidance from Event Match Quality.


Make sure:


 
- The events can be sent via either channel (browser or server) and it is not being double-counted.

- The events are being sent as close to real-time as possible.

- Provide customer information parameters to be used for identity matching.

 
 

### Existing Pixel Users


If you have an existing Meta Pixel integration, the Conversion API integration should be built as an extension of the Pixel integration, instead of as an entirely different connection.


### General Consent


If you have logic for controlling consent with respect to sharing Pixel data, use the same logic with respect to sharing data via Conversions API.


### Alternatives


 
- If you want to optimize your ads for app events, please use the App Events API.

 
 

## Preparation


### Pick Your Integration Type


To start, select the integration option you would like to implement:


 Setup Approach Description Redundant Setup (Recommended)


 Send all events via both Pixel and Conversions API. This is the recommended setup for those who would like to keep the Pixel on their website, and are able to fully adopt the Conversions API.


To succeed, you must be able to generate a persistent event_id for both Pixel and Conversions API events. This means sending the same event_name and event_id on both the Pixel and the Conversions API event, in order to deduplicate identical events.


This setup provides performance on par or better than using only the browser Pixel. The server can capture events that may not be tracked by the browser, such as purchases that occur on a separate website, lead conversions, or phone calls.


 Split Setup


 Send different types of events via Pixel and Conversions API. For example, you could send PageView and ViewContent via Pixel, and Lead or Purchase via Conversions API.


While this option is not as optimal as a redundant setup, you may consider it if you do not want to use a fully redundant setup. Take into consideration that you may need to complete additional work as browser changes are implemented.


 Server-Only Implementation


 Only send events through the Conversions API, instead of through the browser. We recommend implementing either a redundant setup or a split setup before switching to this approach.


 

### Define Events to Send


Once you have chosen your integration approach, you can define which events you want to send. Signals are most useful if they are matched to Meta user IDs, so it is important to think through what parameters you are sending us with an event and how often you would like to send them.


#### Event Options


Send events that are most relevant to your business. See a full list of supported standard and custom Meta events.


#### Event Parameters


You can send multiple parameters inside each event. See parameters used by Conversions API to learn more about those fields.


You can add multiple types of IDs to your events, including event_id, external_id and order_id. It’s important to know the difference between these parameters:


 ID Description How It Is Used External ID


 Your unique ID for a specific customer.


 Learn more about External ID.


 Event ID


 A unique ID for a given event.


 Used on event deduplication. This field is very important if you are sending events via both browser Pixel and conversions API.


 Order ID


 A unique ID for a given order. This parameter only works for purchase events and expects an order_id field in custom_data.


 This implementation is limited to select Meta partners. Contact your Meta representative for access.


Used on purchase event deduplication, if you send events via both browser Pixel and conversions API.


 
- Once you sent us your first order, we discard the second one if:

- You send a second event with the same order_id within a specific time window, and
We resolve that the same user completed both orders.

 

You can deduplicate purchase events within two windows: 48 hours (recommended) or 28 days. This is the window between the first and second instances of the same event.


 

#### Data Freshness


We recommend that you send events in real time or in batches based on a specific timeline via the Conversions API. Sending your events in real time or within 1 hour helps ensure that they can be used for attribution and optimized for ad delivery.


Sending your events more than 2 hours after they occurred can cause a significant decrease in performance for ads optimized for those events. Events sent with a delay of 24 hours or more may experience significant issues with attribution and optimized ad delivery.


If you’re sending events with long conversion windows, send the event as close to real time as possible from the point at which the full conversion is completed.


Move on to the next step once you have:


 
- A list of events to send.

- The specific fields you want to send with each event.

- Defined how frequently you will send events.

 


### Available Optimization Types


The Conversions API offers the following optimization types:


 Optimization Option Description Conversions Optimization


 Optimize ad delivery to show ads to people most likely to make a conversion.


 Value Optimization (also known as Return on Ads Spend Optimization)


 Optimize ad delivery to show ads to people most likely to make a conversion of a specified value, such as purchases over $50.


 Dynamic Product Ads


 Optimize ad delivery to show ads for specific products to people most likely to purchase those specific products.


 

## Execution


There are two ways to implement your integration:


 
- Direct Integration — You, as an advertiser, directly implement conversions API.

- Integration as a Platform — You, as a marketing partner, offer conversions API as a service to your clients.

 
 Advertisers using conversions API through one of our marketing partners should follow our partner’s implementation guidelines.


 

## Direct Integration


### Step 1: Set Up Requirements


Prior to using the Conversions API, set up the following assets:


 Asset Description Meta Pixel


 When you send events through the Conversions API, they’re processed and stored in the same way as the events you send through your Pixel. When you implement the Conversions API, you select which Pixel you want to send your events to.


Sending your Conversions API events to a Pixel lets you use your Conversions API events in the same way you use your browser-based Pixel events for measurement, attribution, and ad delivery optimization. We recommend sending events from the browser and your server to the same Meta Pixel ID.


 Business Manager


 You need a Business Manager to use the API. Business Manager helps advertisers integrate Meta marketing efforts across their business and with external partners. If you don&#039;t have a Business Manager, see the Help Center article on how to Create a Business Manager.


 Access Token


 To use the Conversions API, you need an access token. There are two ways of getting your access token:


 
- Via Events Manager (Recommended)

- Using Your Own App

 
 Move on to Implement the API once you have the assets ready. Remember to save IDs for your assets, since you use those on your API calls.


### Step 2: Implement the API


Once you are done with the requirements, start the implementation process. While building on the Conversions API, always check the developer documentation.


#### Test Calls (Optional)


If this is your first time using the API, start with a test call. To do that, you need a payload and a method for making API calls. After the call is completed, check Events Manager to verify the call worked as expected.


 Payload API Call Method Use the Payload Helper to generate a sample payload to be sent with your call. Follow the instructions listed on the tool. Your payload should look something like this:


&#123;
 "data": [
 &#123;
 "event_name": "Purchase",
 "event_time": 1601673450,
 "user_data": &#123;
 "em": "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068",
 "ph": null
 &#125;,
 "custom_data": &#123;
 "currency": "USD",
 "value": "142.52"
 &#125;
 &#125;
 ]
&#125;
If you want to test your payload from the Payload Helper, add your Pixel ID under Test this Payload and click on Send to Test Events. You should be able to see the event on Events Manager > Your Pixel > Test Events. Learn more about the Test Events Tool.


 Once you are satisfied with your payload, decide how you want to make your call. You can use our Graph API Explorer (see Guide) or your own servers. If you are using your servers, you can use CURL or the Meta Business SDK—We highly recommend using the Meta Business SDK.


Independently on your call method, you should call the /&#123;pixel_id&#125;/events endpoint and attach the JSON data generated by the Payload Helper. Once you make the call, you should get a response like this:


&#123;
 "events_received": 1,
 "messages": [],
 "fbtrace_id": <FB-TRACE-ID>
&#125;
After you complete your first call, verify your events on Events Manager > Your Pixel > Overview.


Move on to Send and Verify Events once you have checked your test events in Events Manager.


#### Send and Verify Events


To start sending events, make a POST request to the API’s /events edge. Attach a payload to your call —if you need help generating your payload, visit the Payload Helper. See the following resources for more information and code samples:


 
- Using the API > Send requests

- Dropped Events

- Upload Time versus Event Transaction Time

- Batch Requests

- Hashing

 

After you start sending events, go to Events Manager and confirm that we have received the events you sent. Learn how to Verify Your Events.


If your implementation is complementary to a browser Pixel, move on to deduplication settings. Otherwise, you are all set! Check Support if you still have questions.


### Step 3: Add Parameters for Deduplication


If you’re sending identical events from your Pixel and through the Conversions API, you need to set up deduplication for your events sent via both channels. First, read developer documentation to understand the deduplication logic.


#### Event-based deduplication


If we find the same server key combination (event_id, event_name) and browser key combination (eventID, event) sent to the same Pixel ID within 48 hours, we discard the later sent duplicate events.


To help ensure your events are deduplicated:


 
- For the corresponding events, make sure the following parameters are set to the same value:


event_id from your server event and eventID from your browser event

- event_name from your server and browser events

 
- After you send duplicate events, check Events Manager to see if the correct events are being dropped.

- Ensure that each unique event sent via both Pixel and Conversions API has its own event_id. This ID should not be shared with other events.

 


#### Alternative to event-based deduplication


While Event ID will always be the best way to deduplicate events, it&#039;s a fairly complex implementation. You can leverage alternative solutions by using external_id or fbp parameters. If you have configured the external_id or fbp parameters to be passed via both browser and server, we will deduplicate events automatically if we see the same event with same external_id or fbp parameters within 48 hours.


### Optional Step 4: Explore Business SDK Features


The Meta Business SDK has advanced features designed especially for Conversions API users:


 
- Asynchronous Requests — Use this feature if you do not want to block your program’s execution to wait for a request to be completed. With this approach, you make your request and get a signal back from the server once it has been completed. While you wait for the response, the program can keep executing.

- Concurrent Batching — Leverage asynchronous requests to increase throughput by utilizing resources more efficiently. Create batched requests to support use cases like event request workers, cron jobs, and more.

- HTTP Service Interface — Override the Business SDK’s default HTTP service and implement your own custom service with your preferred method or library.

 
 

## Integration as a Platform


The following instructions are for partners offering conversions API as a service to advertisers.


### Step 1: Set Up Requirements


Your app should get the following features and permissions:


 
- Access Level: advanced access

- Feature: Ads Management Standard Access

- Permissions: ads_management or business_management and pages_read_engagement and ads_read.

 


### Step 2: Send Events on Behalf of Clients


#### 1. Facebook Login for Business (Recommended for partners)


Facebook Login for Business is the preferred authentication and authorization solution for Tech Providers and business app developers who need access to their business clients&#039; assets. It allows you to specify the access token type, types of assets, and permissions your app needs, and save it as a set (configuration). You can then present the set to your business clients who can complete the flow and grant your app access to their business assets.


#### 2. Meta Business Extension


Meta Business Extension returns all the necessary information needed to send events on behalf of the client via the following process. Meta Business Extension provides an endpoint to retrieve system user access tokens created in the client’s Business Manager. This process includes permissions to send server events and is done automatically and in a secured way.


The endpoint requires the user access token as input parameter. For new Meta Business Extension users, call this endpoint the endpoint to fetch the system user access token after you finish setting up Meta Business Extension. Existing users need to ask for re-authentication before calling the new API endpoint.


 Actualmente, la extensión Facebook Business (FBE) solo está disponible para los socios aprobados. Si te interesa convertirte en socio, ponte en contacto con tu representante de Meta para obtener acceso.

 


#### 3. Business On behalf Of: Client shares dataset to the partner’s Business Manager


The client shares their dataset to the partner via Business Manager settings, see ‘Client system user’s access token’ section or via API through the On Behalf Of onboarding method. You can assign the partner system user to the client pixel and generate an access token to send server events by manually creating a System User Access Token. This can be done via the Conversions API inside the pixel settings above. On the API side, you need to request access to the client’s ad account managing the dataset and proceed sharing pixels via API.


#### 4. Client system user’s access token


This is the similar onboarding flow for direct integration. You will have your client manually create a System User Access Token via the Conversions API inside the dataset settings. Then, you can send events to the advertiser’s dataset with that token. A system user or an admin system user must install the app that will be used to generate the access token. With this setup, your app is allowed to call APIs on behalf of this system user or admin system user.


 Note: If the partner system leverages this method, their token will be limited to sending data only to Meta. The token can’t be used to run API GET data requests.


 

### Step 3: Attribute Events to Your Platform


To attribute conversions API events to your platform, use the partner_agent field. This allows you to set your own platform identifier when sending events on behalf of a client. If you are a managed partner, work with your Meta Representative to agree on an identifier for your platform. This value should be in a format that is less than 23 characters and includes at least two alphabetical characters. Then, send it with each server event.


 Always provide an up-to-date setup guide for advertisers looking to activate the integration on your platform.


 

## Support


### For All Partners


See information about debugging and Business Help Center articles.


### For Managed Partners


Provide the following information to your Meta Representative, so they can help with testing integrations and troubleshooting: Business Manager ID, App ID, Pixel IDs.


 

## API Documentation


 
- Get started - Test the API from your own Business Manager

- Using the API

- Best Practices - Conversions API

- Set Up Conversions API as a Platform

- Standard Meta Events

- Custom Meta Events

- Parameters

- Payload Helper

- Data Processing Options for Conversions API and Offline Conversions API

- If you want to optimize for app events, use App Event API

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Dataset Quality API para eventos offline - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/dataset-quality-api/offline-events

Dataset Quality API para eventos offline - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Dataset Quality API para eventos offline

Dataset Quality API para eventos offline proporciona un desglose de las puntuaciones y recomendaciones según distintas dimensiones de calidad, incluida la cobertura de claves de coincidencia, frecuencia y actualización. Una configuración de eventos óptima facilita la recopilación de datos de alta calidad, que es esencial para el rendimiento del sistema de anuncios.

Una configuración multicanal de alta calidad de la API de conversiones les permitirá a los anunciantes usar anuncios omnicanal, la solución que permite impulsar las ventas en las tiendas y en sitios web con una sola campaña de ventas.

 

## Common Use Cases


Partners and agencies may use the Dataset Quality API to provide a quality dashboard and insights, while helping their advertisers to enhance and optimize their integrations. Partners may also use this integration to monitor the stability of their Conversions API integration. Advertisers may use this endpoint to aggregate dataset quality data to incorporate in their monitoring.


## Setup Requirements


### Ownership and Access


#### Advertiser Authentication Using Business Manager


 
- In Business Manager, go to the Users section and select the System User tab. Click on the specific system user you are using for the Conversions API.

- Go to the Assign Asset dialog and choose Pixels. Then, select the pixels you want to send events on behalf of.

- For each pixel, select the Manage Pixel permission, and click Save Changes.

- Go back to your system user&#039;s details page. Verify that the selected pixels are visible there.

- To generate the access token, follow instructions here.

 


#### Partner Platform Authentication


You must first request authorization to send events on behalf of your clients. You have the following authentication options:


##### Facebook Login for Business (Recommended)


Facebook Login for Business is the preferred authentication and authorization solution for tech providers and business app developers who need access to their business clients&#039; assets. It allows you to specify the access token type, types of assets, and permissions your app needs, and save it as a set (configuration). You can then present the set to your business clients to complete the flow and grant your app access to their business assets.


##### Meta Business Extension (Recommended)


With this option, Meta Business Extension (MBE) returns all the necessary information needed to send events on behalf of the client. MBE provides an endpoint to retrieve system user access tokens created in the client’s Business Manager. This process includes permissions to send server events and is done automatically and securely. MBE is currently under beta. Please contact your Meta representative for access.


The endpoint requires a user access token as an input parameter. If you are a new MBE user, call this endpoint to fetch the system user access token after you have finished setting up MBE. Existing users need to ask for re-authentication before calling the new API endpoint.


##### Client Sharing of a Meta Pixel to Partner’s Business Manager


With this option, the client shares their Meta Pixel to the partner using Business Manager settings or by the API. Then, the partner can assign the partner system user to the client pixel and generate an access token to send server events.


#### User Permission


 
- The user or system user used to make the API call requires (at minimum) the following user permission: Partial access -> Use events dataset

- User access may be granted (in bulk) by using the instructions provided here.

 


#### App Permission


 
- Basic: If you manage a small number of Meta datasets and/or wish to test the Dataset Quality API, then the following app permissions are required: ads_read and (ads_management or business_management).

- Advanced: If you manage a high number of Meta datasets on behalf of other businesses and/or require higher rate limits, then the Advanced Level of the ads_management app permission and app feature Ads Management Standard Access is required. Advanced Level app permissions and features require app review.

 
 

## Recuperar la información de calidad para eventos offline

Puedes supervisar la puntuación de la calidad de los datos por evento offline, junto con las claves de coincidencia que se envían, mediante el punto de conexión de la API, los parámetros y los campos que se indican a continuación:


### Llamada a la API

Punto de conexión: https://graph.facebook.com/v23.0/dataset_quality

Para obtener métricas de calidad del conjunto de datos, haz una solicitud GET al punto de conexión dataset_quality con los siguientes parámetros:


### Parámetros

 Parámetro Descripción `dataset_id` entero Obligatorio. El identificador del conjunto de datos (píxel) para recuperar los datos de la calidad.

 `access_token` cadena Obligatorio. Token de acceso válido (no caducado) para un determinado identificador de conjunto de datos (píxel). Recomendamos configurar un token de acceso de usuario del sistema de larga duración. Obtén más información sobre los distintos tipos de tokens de acceso en nuestra guía dedicada.

 `agent_name` cadena Opcional. Se usa el valor normalizado del campo partner_agent para filtrar solo los eventos que se envían con el parámetro partner_agent en la solicitud POST /&#123;pixel_id&#125;/events (consulta cómo atribuir las prácticas recomendadas de los eventos aquí y aquí).

Por ejemplo, si el valor de partner_agent es [partner_name]_[majorversion]_[minorVersion], el valor normalizado de la cadena del agente será partner_name en minúscula.

El agent_name te permite configurar el propio identificador de tu plataforma cuando envías eventos en nombre de un cliente. Si eres una agencia o un socio administrado, trabaja con tu representante de Meta para definir de mutuo acuerdo un identificador para tu plataforma.

Si eres anunciante, por lo general, no deberías preocuparte por la atribución de agent_name.

Si no proporcionas un agent_name, todos los eventos se incluirán en el cálculo de la EMQ, sin importar si los envió un agente.

 

### Campos

 Campo Descripción `offline` matriz Este campo denota un conjunto de datos estructurado relacionado con los eventos offline. El filtro es una matriz que contiene el event_name y sus métricas. En esta API, el campo es obligatorio de manera predeterminada. Consulta la sección de ejemplos.

 `event_name` cadena Un evento estándar o evento personalizado.

 `composite` Valor en punto flotante La puntuación de calidad de los datos para los eventos offline compuesta. Para calcular la puntuación de calidad de los datos, se consideran factores como la actualización, frecuencia y atribución de los datos durante los últimos 28 días. Estos factores, cada uno con una ponderación diferente, se combinan para dar una puntuación sobre 10. Nota: Una puntuación compuesta de 8.5 o superior permite acceder al uso de los anuncios omnicanal y así garantizar que los anuncios alcancen al público correcto en el momento indicado.

 `match_key` entero La puntuación match_key ofrece recomendaciones para mejorar esa puntuación y la cobertura de claves de coincidencia para correo electrónico y teléfono. Otorga una puntuación sobre 10.

 `frequency` entero La métrica de puntuación de frecuencia mide con qué frecuencia envías datos y recomienda cómo mejorarla. Otorga una puntuación sobre 10.

 `freshness` entero La puntuación de actualización muestra qué tan actualizados están tus datos y comparte recomendaciones sobre cómo mejorarla.

 

### Ejemplo

Explorador de la API Graph

GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&fields=offlinecURL

curl -X GET \ https://graph.facebook.com/v23.0/dataset_quality?dataset_id=<DATASET_ID> \ -F &#039;agent_name="My Agent Name"&#039;\ -F &#039;fields="offline"&#039;\ -F &#039;access_token=<ACCESS_TOKEN>&#039; Ejemplo de respuesta

&#123;
 "offline": [
 &#123;
 "event_name": "Purchase",
 "composite": &#123;
 "score": 6.6,
 "recommendation": "Your offline data quality score is ok, but could be improved."
 &#125;,
 "match_key": &#123;
 "score": 5.6,
 "recommendation": "Sending email and phone number parameters can help improve your match key score."
 &#125;,
 "frequency": &#123;
 "score": 4.6,
 "recommendation": "Sharing your offline data more often can help improve your frequency score and help you get better ad outcomes."
 &#125;,
 "freshness": &#123;
 "score": 2.2,
 "recommendation": "Sending your most recent offline conversion data sooner can help improve your score and help you get better ad outcomes."
 &#125;
 &#125;
 ],
&#125;
 

### Ejemplo

Situación: solo quieres los nombres de los eventos y las puntuaciones compuestas de cada evento.

Explorador de la API Graph

GET/v23.0/dataset_quality?dataset_id=<DATASET_ID>&fields=offline&#123;event_name, composite&#125;Ejemplo de respuesta

&#123;
 "offline": [
 &#123;
 "event_name": "Purchase",
 "composite": &#123;
 "score": 6.6,
 "recommendation": "Your offline data quality score is ok, but could be improved."
 &#125;,
 &#125;
 ],
&#125;
 

### Ejemplo

Situación: solo quieres los nombres de los eventos y las puntuaciones de claves de coincidencia, recomendaciones y coberturas de cada evento.

Explorador de la API Graph

GET/v23.0/dataset_quality?dataset_id=<DATASET_ID>&fields=offline&#123;event_name, match_key&#125;Ejemplo de respuesta

&#123;
 "offline": [
 &#123;
 "event_name": "Purchase",
 "match_key": &#123;
 "score": 6.6,
 "recommendation": "Send email and phone parameters to help improve your match key score." &#125;,
 "coverage" : &#123;
 "email": 100.0
 "phone": 90.0 
 &#125;
 &#125;
 &#125;
 ]
&#125;
 

## Códigos de error

Se pueden generar los siguientes códigos de error al crear un conjunto de datos:

 Código de error Descripción 2044055

 El dataset_id que se ingresó no existe.

 10

 La aplicación no tiene permiso para esta acción.

 

## Otros recursos

 - Dataset Quality API
- Anuncios omnicanal
- Guía de configuración técnica óptima para anuncios omnicanal
- API de conversiones para eventos offline
- Artículos del servicio de ayuda para empresas:

Información sobre los conjuntos de datos en el administrador de eventos de Meta
- Información sobre la calidad de conjunto de datos offline
- Cómo crear conjuntos de datos en el administrador de eventos de Meta
 - Otros recursos:

Resumen de la GraphAPI
- Permisos y acceso a los anuncios
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# 1: Conectar tu CRM para descargar clientes potenciales - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/1-connecting-your-crm-with-lead-ads

1: Conectar tu CRM para descargar clientes potenciales - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 Volver al documento en español Se actualizó este documento.
La traducción en español no está disponible todavía. Actualización del documento en inglés: 8 dic. 2025 
Actualización del documento en español: 4 abr. 2025 

# 1: Connecting Your CRM to Download Leads


This guide will help you connect your customer relationship management (CRM) system and ensure it is downloading your leads from Meta.


 

## Connect your CRM to Meta


As mentioned in the introduction, this guide assumes that you already have an integration to automatically download your leads from Meta to your CRM system (highlighted in green in the figure below). This section will provide an overview of the Meta to CRM integration methods for Lead Ads. For each of these integration methods, ensure that the 15-17 digit Meta Lead ID is included in the downloaded data. Refer to About CRM System Integrations for Lead Ads for more information.


 

### Partner integrations


Learn how to integrate your CRM with Meta to optimize the quality of your lead ads. 
 
 
 This is a good method to download your leads data if your CRM system or third-party vendor is supported. You can check if your preferred partner is supported by searching the Available CRM System Integrations for Lead Ads help center article.

 - Follow the directions in the Available CRM System Integrations for Lead Ads help center article or the general directions in the Connect Your CRM System to Facebook help center article.
- If you decide to remove or change partner integrations for any reason, follow the directions in the Remove Your CRM System Integration from Facebook help center article.
 

### Webhooks Custom Integration


You may also create a custom Webhooks integration to automatically receive new leads if your CRM system is not supported or you would prefer more control over the integration. Developer resources will be required for this method.


This method will require your developer to create a Webhook endpoint, a Meta developer app ID, and a subscription to your app, then link it to your Page.


Refer to the Webhooks CRM integration guide for more information on implementing this method. You can also refer to the Lead Ads Webhook code sample on GitHub to get started.


### Graph API Bulk Read


Similarly as with Webhooks, you can use the Graph API to download leads from Meta. Developer resources will be required for this method.


The main difference between the two integrations is that Webhooks is a push/pull method that can give you leads close to real time, whereas the Graph API bulk read is a pull method that will give you lead data upon a call from your code. There are also rate limits for these API calls.

Refer to the Retrieving Leads: Bulk Read documentation for more information on implementing this method.


### Manual Download (not recommended)


This method is not recommended, especially if you have a CRM system and are intending to implement a CRM integration to upload events. However, this could be used as a temporary solution if any of the previous methods have issues.


 ← Anterior Introduction → Siguiente Getting Started With the CRM 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->

---
# 2: Comenzar con la integración - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/2-getting-started-with-integration

2: Comenzar con la integración - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# 2: Comenzar con la integración del CRM

Esta guía incluye lo siguiente:

 - Crear una nueva campaña de anuncios para clientes potenciales
- Crear un nuevo píxel de CRM de Meta o convertir un píxel existente
- Elegir un método de integración
 

## Paso 1: Crear una campaña de anuncios para clientes potenciales (opcional)

Esta sección es opcional si ya tienes campañas de anuncios para clientes potenciales existentes. Ten en cuenta que el objetivo de optimización no se puede cambiar en las campañas publicadas, pero puede duplicar las campañas existentes, y, luego, cambiar el objetivo de la optimización.

 - Inicia sesión en tu cuenta comercial del administrador de anuncios. (Los clientes potenciales de conversión no están disponibles a través de cuentas publicitarias personales ni a través de interfaces simplificadas).

- Haz clic en el botón + Crear para crear una nueva campaña. En la ventana Elegir un objetivo de campaña, selecciona el objetivo Clientes potenciales y, luego, haz clic en Continuar.

- En la configuración de nivel del conjunto de anuncios, selecciona formularios instantáneos en Ubicación de conversión.

- En Optimización y entrega del conjunto de anuncios, haz clic en el botón Editar para Optimizar para la entrega de anuncios y elige el objetivo Conversión de clientes potenciales en el menú desplegable. La API de conversiones para integración de CRM no es un requisito para empezar a ejecutar campañas con el objetivo de rendimiento de clientes potenciales de conversión. Sin embargo, verás mejores resultados si dicho objetivo está completamente integrado.
 

## Paso 2: Crear un conjunto de datos del CRM de Meta

Esta sección te mostrará píxel de Meta para tu CRM.

Nota: Necesitarás tener acceso de administrador para crear o convertir un píxel.

 - En el administrador de eventos, haz clic en Conectar orígenes de datos para conectar una nueva fuente de datos.

- Selecciona CRM y, luego, haz clic en Conectar.

- Puedes crear un conjunto de datos completamente nuevo o convertir uno existente. Tu decisión dependerá de cómo quieres organizar tus eventos y administrar el acceso de las cuentas publicitarias a los conjuntos de datos. Recomendamos crear un nuevo conjunto de datos para que los eventos de CRM no se superpongan con los eventos de conjuntos de datos actuales en el administrador de eventos, lo que facilitará la solución de problemas. Si conviertes un conjunto de datos preexistente, recomendamos dar a los eventos de CRM un nombre diferente en lugar de reutilizar los nombres de eventos que ya existen, ya que esto podría generar confusión entre los diferentes tipos de eventos. Convertir un conjunto de datos web actual no afectará los otros eventos que se subieron allí. Un conjunto de datos del CRM permite a Meta saber que los eventos de CRM se subirán allí y agrega el flujo de trabajo relacionado a la integración de la optimización de clientes potenciales de conversión al conjunto de datos.

 Para crear un nuevo conjunto de datos: haz clic en el enlace Crear un nuevo conjunto de datos y nombra el conjunto de datos en consecuencia.
- Para convertir un conjunto de datos: selecciona el conjunto de datos actual al que te gustaría subir eventos de CRM. Convertir un conjunto de datos web actual no afectará los otros eventos que se suban allí.
 - Asegúrate de que el ícono de tu conjunto de datos de CRM se haya actualizado. De no ser así, repite este paso.
 Nota: La integración se basa en píxeles. No cambies las integraciones completadas a un píxel diferente.


 

 
 

## Paso 3: Elegir un método de integración

Tendrás la opción de completar la configuración usando la integración manual o una integración con socios. Una integración manual es una gran opción para las empresas que tienen disponibles recursos de desarrolladores, acceso al código base de servidor y necesitan contar con la posibilidad de personalizar su configuración. De manera alternativa, las empresas que necesitan una integración con CRM más simple pueden usar alguna de las integraciones con socios disponibles.

 - Ingresa tu CRM en el cuadro de búsqueda. 
 Si una integración con socios admite tu CRM, puedes elegir la opción Usar un socio y seguir las instrucciones mencionadas en ese flujo de trabajo. 
 Selecciona tu socio preferido.
- Haz clic en Instrucciones abiertas para que el respectivo socio obtenga instrucciones para ese flujo de trabajo.
- Haz clic en Ir al socio para proceder al socio y comenzar la integración.

 
 - De lo contrario, pasa a elegir la opción código Manual o la opción Invitar a un desarrollador, y, luego, haz clic en Continuar.
 Nota: El desarrollador que realiza la integración necesitará acceso de administrador al administrador comercial para completar el proceso.
 ← Anterior 1: Connecting Your CRM With Lead Ads → Siguiente 3: Developer Implementation 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# 3: Implementación por desarrolladores - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/3-implementing-the-crm-integration

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

---
# 4: Verifica tus datos - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/4-verify-your-data

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

---
# 5. Configurar el embudo de ventas - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/5-configure-your-sales-funnel

5. Configurar el embudo de ventas - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# 5. Configurar el embudo de ventas

En esta guía, encontrarás instrucciones sobre cómo configurar el embudo de ventas, lo que proporcionará al sistema información sobre tu embudo de ventas y qué etapa de cliente potencial optimizar. Debes tener acceso de administrador para completar esta sección.

Paso 1. Después de conectarte a la API de conversiones, consulta la pestaña "Información general" de tu conjunto de datos en el administrador de eventos para ver el estado de la integración. Un widget de la integración con CRM mostrará el estado de la integración, te guiará durante todo el proceso y te notificará cuando se complete.

 
Paso 2. Cuando tus datos del CRM aprueben los controles de verificación, podrás configurar el embudo de ventas.

Paso 3. Si compartes una cantidad adecuada de etapas de eventos, es posible que Meta use IA para generar un embudo de ventas para ti. Luego, podrás revisar, editar y confirmar las etapas que se seguirán.

Paso 4. Los eventos de clientes potenciales que compartas del CRM se mostrarán como etapas del embudo en el administrador de eventos. Elimina los eventos que no correspondan y ordena el resto para reflejar el orden del embudo de ventas según dos categorías.

 - Etapas positivas: los eventos que representan clientes potenciales de calidad, por ejemplo, "clientes potenciales calificados en marketing" o "agregar al carrito".
- Otras etapas: los eventos que no representan un cliente potencial de calidad, por ejemplo, eventos de prueba o eventos subidos de otro sistema por accidente.

Es posible eliminar los eventos que indiquen clientes potenciales negativos o que no pertenezcan a tu embudo de ventas haciendo clic en el botón de menos (-) ubicado al lado de cada evento. Estos podrían ser clientes potenciales que recibieron una llamada telefónica, pero que decidieron no convertirla en una venta.
 
Paso 5. En el mismo paso, ordena tus eventos para que reflejen el orden real de tu embudo de ventas.

Paso 6. En la etapa del objetivo de optimización, selecciona la etapa de cliente potencial más temprana que deseas optimizar. No necesariamente tiene que ser la etapa final del embudo. El sistema también se optimizará para todas las etapas siguientes del embudo.

 
Nota: El sistema puede ajustar y optimizar una etapa de cliente potencial diferente a la seleccionada si se puede lograr un mejor rendimiento.

 ← Anterior 4: Verify Your Data → Siguiente 6: Follow-up Steps 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# 6: Pasos de seguimiento - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/6-follow-up-steps

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

---
# Integración de Zapier - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides/zapier-integration

Integración de Zapier - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Integración de Zapier

Puedes aprovechar la plataforma de automatización de Zapier para enviar eventos a nuestra API de conversiones. Usa la app de Zapier de Facebook para enviar eventos automáticamente cada vez que algo cambie en tu origen de datos.

 

## Información general

Zapier es una herramienta de automatización en línea que puedes usar para conectar dos o más apps. En este caso, estamos conectando dos apps. Seleccionas en la primera app un evento de activación que hace que un evento de acción suceda en la segunda app. La primera app puede ser cualquier origen de datos que uses. La segunda app debe ser conversiones de Facebook.

Una vez configurada la conexión, cada vez que se activa tu origen de datos, nuestra app envía un evento a la API de conversiones. Por ejemplo, cuando se agrega una nueva compra a tu origen de datos, este evento se publica en nuestra API.

 

## Cómo se usa


#### Paso 1:

Visita zapier.com. Luego, regístrate o inicia sesión con las credenciales creadas anteriormente. En el menú del lado izquierdo, haz clic en Hacer un Zap.


#### Paso 2: Selecciona el origen de datos y el activador

A continuación, Zapier te pide que configures tu activador. En Cuando esto suceda, elige App y Evento de activación.

En este caso, la app es el origen de datos. Un ejemplo de esto sería Hojas de cálculo de Google.

El evento de activación se refiere a la acción que debe ocurrir en tu origen de datos para que se active la automatización. Volviendo al ejemplo de Hojas de cálculo de Google, algunos de los posibles activadores de Zapier son los siguientes:

 - Fila de hoja de cálculo nueva: se activa cuando se agrega una nueva fila a la parte inferior de una hoja de cálculo.
- Fila de hoja de cálculo nueva o actualizada: se activa cuando se agrega o se modifica una nueva fila en una hoja de cálculo.
 Selecciona el evento de activación de Zapier que tenga más sentido en función de tus necesidades publicitarias.

 Debes configurar tu origen de datos para que coincida con el esquema de eventos de Facebook. En lo que respecta a las hojas de cálculo de Google, configura los campos de la hoja de cálculo para que se correspondan a nuestros campos de eventos.

 

#### Paso 3: Selecciona los eventos que deseas publicar

Después de haber terminado con Cuando esto suceda, puedes configurar la segunda parte de la automatización en Hacer esto. De nuevo, debes seleccionar App y Evento de acción.

Aquí, la app debería ser conversiones de Facebook. Aquí es donde quieres enviar la información que viene de tu origen de datos.

Los eventos de acción son aquellos que quieres enviar a nuestra API. Algunos ejemplos de eventos de acción son compra, clientes potenciales y otros eventos. Aquí encuentras una lista de eventos estándar del píxel de Meta; también puedes enviarnos eventos personalizados.


#### Paso 4: Activa Zap

Ahora puedes activar tu Zap. Una vez hecho esto, es necesario publicar un evento en la API de conversiones cada vez que se produzca de tu parte un evento de activación.

Para finalizar el ejemplo de hojas de cálculo de Google, considera que creamos un Zap con estas características:

 - Usa hojas de cálculo de Google como fuente de datos.
- Tiene "Fila de hojas de cálculo nueva" como evento activador.
- Tiene Purchase como evento de acción.
 Una vez activado este Zap, se publica un evento de compra en nuestra API cada vez que se agrega una nueva fila a la hoja de cálculo de origen.

 

## Recursos

 - Primeros pasos con Zapier
- Consejos relativos a la app de Zapier
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->

---
# Dataset Quality API - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/integration-quality-api

Dataset Quality API - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 Volver al documento en español Se actualizó este documento.
La traducción en español no está disponible todavía. Actualización del documento en inglés: 8 dic. 2025 
Actualización del documento en español: 20 oct. 2025 

# Dataset Quality API


Advertisers that share server events using the Conversions API can see the event match quality score in Meta Events Manager. However, this only works on an individual basis and is difficult to scale in cases where a Tech Provider partner, agency partner or advertiser is managing hundreds and thousands of Meta Pixels for their businesses. The Dataset Quality (formerly known as Integration Quality) API can help solve this problem by consolidating dataset quality metrics programmatically at scale.


 

## What’s New


As of May 28th, 2025, the following additional metrics have been added to the API for querying.


 
- Additional Conversions Reported

- Additional Conversions Reported per parameter

- Additional Conversions Reported for per event

- Additional Conversions Reported for event coverage

- Event Coverage

- Event Deduplication

- Data Freshness

- Event Match Quality Diagnostics

 

Also, the Dataset Quality API for Offline Events, currently under beta, and new metrics are now available.


 

## Common Use Cases


Partners and agencies may use the Dataset Quality API to provide a quality dashboard and insights, while helping their advertisers to enhance and optimize their integrations. Partners may also use this integration to monitor the stability of their Conversions API integration. Advertisers may use this endpoint to aggregate dataset quality data to incorporate in their monitoring.


 

## Setup Requirements


### Ownership and Access


#### Advertiser Authentication Using Meta Business Manager


 
- In Business Manager, go to the Users section and select the System User tab. Click on the specific system user you are using for the Conversions API.

- Go to the Assign Asset dialog and choose Pixels. Then, select the pixels you want to send events on behalf of.

- For each pixel, select the Manage Pixel permission, and click Save Changes.

- Go back to your system user&#039;s details page. Verify that the selected pixels are visible there.

- To generate the access token, follow instructions here.

 


#### Partner Platform Authentication


You must first request authorization to send events on behalf of your clients. You have the following authentication options:


##### Facebook Login for Business (Recommended)


Facebook Login for Business is the preferred authentication and authorization solution for Tech Providers and business app developers who need access to their business clients&#039; assets. It allows you to specify the access token type, types of assets, and permissions your app needs, and save it as a set (configuration). You can then present the set to your business clients to complete the flow and grant your app access to their business assets.


##### Meta Business Extension (Recommended)


With this option, Meta Business Extension (MBE) returns all the necessary information needed to send events on behalf of the client. MBE provides an endpoint to retrieve system user access tokens created in the client’s Business Manager. This process includes permissions to send server events and is done automatically and securely. MBE is currently under beta. Please contact your Meta representative for access.


The endpoint requires a user access token as an input parameter. If you are a new MBE user, call this endpoint to fetch the system user access token after you have finished setting up MBE. Existing users need to ask for re-authentication before calling the new API endpoint.


##### Client Shares Meta Pixel to Partner’s Business Manager


With this option, the client shares their Meta Pixel to the partner using Business Manager settings or by the API. Then, the partner can assign the partner system user to the client pixel and generate an access token to send server events.


##### Client Generates Token Manually Using Events Manager


Advertisers can generate access tokens in Events Manager to set up the Conversions API and access the Dataset Quality API. You can configure a direct integration or share the generated access token with your partners to send events to Meta. You can copy and save this new token. Note that Meta will not store these tokens. The generated token will be able to fetch quality data and send events using the Conversions API.


 


#### User Permission


 
- The user or system user used to make the API call requires (at minimum) the following user permission: Partial access -> Use events dataset

- User access may be granted (in bulk) by using the instructions provided here.

 


#### App Permission


 
- Basic: If you manage a small number of Meta datasets and/or wish to test the Dataset Quality API, then the following app permissions are required: ads_read and (ads_management or business_management).

- Advanced: If you manage a high number of Meta datasets on behalf of other businesses and/or require higher rate limits, then the advanced level of the ads_management app permission and app feature Ads Management Standard Access is required. Advanced level app permissions and features require app review.

 
 

## Retrieving Dataset Quality Information


### Endpoint


https://graph.facebook.com/v25.0/dataset_quality

### Parameters


ParameterDescriptiondataset_idintegerRequired.
The ID of dataset (Pixel) to retrieve quality data.


 `access_token` string Required.
Valid (unexpired) access token for given dataset (Pixel) ID. We recommend setting up a long-lived system user access token. 
Read more about different types of access tokens in our dedicated guide.


 `agent_name` string Optional.
The normalized value of the partner_agent field is used to filter only events sent with partner_agent param in /&#123;pixel_id&#125;/events POST request (see attributing your events best practices here and here).


For example, if your partner_agent value is [partner_name]_[majorversion]_[minorVersion], your normalized agent string value will be partner_name in lowercase.


The agent_name allows you to set your own platform identifier when sending events on behalf of a client. If you are a managed partner/agency, work with your Meta representative to agree on an identifier for your platform.


If you are an advertiser, most of the time you should not worry about agent_name attribution.


If you do not provide an agent_name, all events regardless of whether they were sent by an agent or not, will be included in the EMQ calculation.


 

### Fields


 Field Description `web` array This field denotes a structured set of data related to website events. The filter is an array containing event_name and its metrics. This field is required by default in this API. See example section.


 `event_name` string A standard event or custom event name.


 `event_match_quality` [AdsPixelCAPIEMQ(/docs/marketing-api/reference/ads-pixel-capiemq)]


 Event Match Quality indicates how effective the customer information sent from your server may be at matching event instances to a Facebook account.


See more details here.


 `event_potential_aly_acr_increase` AdsPixelCAPIEventALYACR


 Additional Conversions Reported (ACR) for Conversions API Event is a metric that estimates how many conversions (for example, purchases or link clicks) are measured as a result of an advertiser’s Conversions API setup.


See more details here.


 `acr` AdsDatasetCAPIACR


 Additional Conversions Reported (ACR) is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. It also can help you determine if you can improve your Conversions API setup to measure more reported conversions. More reported conversions can help you decrease your cost per result and show your ads to people that find them relevant.


See more details here.


 `event_coverage` AdsDatasetEventCoverage


 Event coverage is the 7-day average percent of Pixel events that are covered by the Conversions API, and share deduplication keys with events from the Conversions API.


See more details here.


 `dedup_key_feedback` AdsDatasetDedupKeyFeedback


 Deduplication is a process used to prevent our system from counting the same event twice. In order for you to have a high event coverage, covered events must have a proper deduplication setup.


Deduplication key feedback helps to identify any active issues with deduplication.


See more details here.


 `data_freshness` AdsDatasetDataFreshness


 Data freshness tells you how current your data is. Use this information to understand the delay between the time the event occurred and when we received it.


See more details here.


 Tip: Look inside the node (follow hyperlink to the separate developers page) to find out all fields and child nodes for fields in the table above.


 

## EMQ


### About Event Match Quality


#### Event Match Quality


Event match quality (EMQ) is a score (out of 10) that indicates how effective the customer information sent from your server may be at matching event instances to a Meta account. High quality event matching may improve ads attribution and performance.


#### How It&#039;s Calculated


Event match quality is calculated by looking at which customer information parameters are received from your server using a Conversions API integration, the quality of the information received and the percent of event instances that are matched to a Meta account.


#### How It&#039;s Used


Event match quality is used to assess whether you&#039;re sending through the Conversions API the right customer information to match your events to a Meta account, and whether you have set up your customer information parameters correctly. Customer information parameters help match your events to a Meta account so you can attribute conversions to your ads and deliver them to people who are most likely to convert.
Event match quality is calculated in real time. Learn more about EMQ best practices here.


EMQ is currently available only for web events. For other event types such as offline and physical store events, app events, conversion leads or any integration under alpha or beta stages, contact your Meta representative for guidance on improving match quality.


Use case: Monitor event match quality score per event, along with match keys being sent, build an EMQ trendline or historical extracts, then hook up alerts/delectors for EMQ score and match keys drops.


Documentation: All fields available for EMQ diagnostics can be found on this developer&#039;s page.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_match_quality,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_match_quality,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_match_quality": &#123;
 "composite_score": 6.2,
 "match_key_feedback": [
 &#123;
 "identifier": "user_agent",
 "coverage": &#123;
 "percentage": 100
 &#125;
 &#125;,
 &#123;
 "identifier": "external_id",
 "coverage": &#123;
 "percentage": 100
 &#125;
 &#125;
 ] 
 &#125;,
 "event_name": "pLTVPurchase"
 &#125;,
 &#123;
 "event_match_quality": &#123;
 "composite_score": 7.2,
 "match_key_feedback": [
 &#123;
 "identifier": "email",
 "coverage": &#123;
 "percentage": 100
 &#125;
 &#125;,
 &#123;
 "identifier": "ip_address",
 "coverage": &#123;
 "percentage": 99.9
 &#125;
 &#125;,
 ]
 &#125;,
 "event_name": "CompleteRegistration"
 &#125;
 ]
 &#125;
 

## Additional Conversions Reported (ACR) for Event Match Quality parameters


Additional Conversions Reported (ACR) is a metric that estimates how many conversions (e.g. purchases or link clicks) are measured as a result of an advertiser’s Conversions API setup.


To learn more about this metric, see the About ACR article and the Learn More section.


Use case: For events connected to the Conversions API that have an EMQ score, monitor the uplift in additional conversions which the Conversions API is able to add when sending more and/or higher quality match keys.


Documentation: All fields available for ACR EMQ parameters can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_match_quality&#123;match_key_feedback&#123;identifier,potential_aly_acr_increase&#123;percentage,description&#125;&#125;&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_match_quality&#123;match_key_feedback&#123;identifier,potential_aly_acr_increase&#123;percentage,description&#125;&#125;&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_match_quality":
 "match_key_feedback": [
 &#123;
 "identifier": "email",
 "potential_aly_acr_increase": &#123;
 "percentage": 58.96,
 "description": "Similar advertisers who sent valid Email for Purchase saw a 58.96% median increase in their existing additional conversions reported."
 &#125;
 &#125;,
 &#123;
 "identifier": "ip_address",
 "potential_aly_acr_increase": &#123;
 "percentage": 20.65,
 "description": "Similar advertisers who sent valid Ip Address for Purchase saw a 20.65% median increase in their existing additional conversions reported."
 &#125;
 &#125;,
 ]
 &#125;
 "event_name": "Purchase"
 &#125;,
 ]
&#125;
 

## EMQ Diagnostics


Event match quality diagnostics are issues we’ve identified with your Conversions API integration. Follow the provided recommendations to send higher quality match keys, optimize your ad performance and improve your EMQ score.


Use case: Extract and store EMQ diagnostics in your environment, set up notifications using channels like email, messenger or in-app notifications in order to resolve issues reactively.


Documentation: All fields available for EMQ diagnostics can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_match_quality&#123;diagnostics&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_match_quality&#123;diagnostics&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_match_quality": &#123;
 "diagnostics": [
 &#123;
 "name": "Update your IPv4 IP addresses to IPv6 IP addresses",
 "description": "Your server is sending IPV4 IP addresses through the Conversions API. We recommend updating to IPV6 IP addresses because this is the industry standard and offers better durability for this integration.",
 "solution": "You can update your web server and DNS provider configuration to support IPv6. In your server payload, send the client_ip_address retrieved from customer interactions. Use the payload helper to see how this value should be structured when it&#039;s sent to Meta. If this issue is not applicable or actionable, you can ignore it.",
 "percentage": 59.5,
 "affected_event_count": 18930,
 "total_event_count": 31830
 &#125;,
 &#123;
 "name": "Server sending mismatched IP addresses",
 "description": "Your server is sending client IP addresses that do not match those from Meta Pixel. This may impact the attribution and optimization of your ad campaigns.",
 "solution": "In your server payload, send the client_ip_address retrieved from customer interactions. Use the payload helper to see how this value should be structured when it&#039;s sent to Meta.",
 "percentage": 61.5,
 "affected_event_count": 19567,
 "total_event_count": 31830
 &#125;
 ]
 &#125;
 "event_name": "Purchase"
 &#125;,
 ]
&#125;
 

## Event Coverage


Event coverage is the 7-day average percentage of Meta Pixel events that are covered by the Conversions API, and share deduplication keys with events from the Conversions API.


Learn more about event coverage best practices by reading this Business Help Center article.


Use case: Evaluate the events which are connected by server versus those which are not. For example, if an advertiser has three events, ViewContent, AddToCart and Purchase, but only Purchase is sent by server, the event coverage will be 33%.


Documentation: All fields available for event coverage can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_coverage&#123;percentage,goal_percentage,description&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_coverage&#123;percentage,goal_percentage,description&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123; 
 "web": [
 &#123;
 "event_coverage": &#123;
 "percentage": 34.1,
 "goal_percentage": 75,
 "description": "The percentage of events received from your Conversions API compared to unique browser events from the Meta Pixel."
 &#125;,
 "event_name": "B2B Purchase"
 &#125;,
 ]
&#125;

 

## Additional Conversions Reported (ACR) for Event Coverage


Additional Conversions Reported (ACR) for Event Coverage is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. For event coverage, you can see the potential improvement in additional conversions reported if the event coverage and deduplication both meet the best practices.


To learn more about additional conversions reported, see the About ACR article and the Learn More section.


Use case: For events connected to the Conversions API that have event coverage below 75% threshold, monitor the uplift in additional conversions which the Conversions API is able to add when covering more events (increasing server versus browser ratio).


Documentation: All fields available for ACR for Event Coverage can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_coverage&#123;potential_aly_acr_increase&#123;percentage,description&#125;&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_coverage&#123;potential_aly_acr_increase&#123;percentage,description&#125;&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_coverage": &#123;
 "potential_aly_acr_increase": &#123;
 "percentage": 35.8,
 "description": "Similar advertisers who send the same AddToCart pixel events with matching deduplication keys through Conversions API saw a median of 35.8% additional conversions reported versus those that only used Meta Pixel."
 &#125;
 &#125;,
 "event_name": "AddToCart"
 &#125;,
 ]
&#125;
 

## Event Deduplication


The Meta Pixel and the Conversions API enable you to share standard and custom events with Meta so you can measure and optimize ad performance. The Pixel enables you to share web events from a web browser, while the Conversions API enables you to share web events directly from your server.


If you connect website activity using both the Pixel and the Conversions API, we may receive the same events from the browser and the server. If we know that the events are the same and therefore redundant, we can keep one and discard the rest. This is called deduplication.


The deduplication key feedback shows the percentages of events from the Pixel and the Conversions API that were received with each deduplication key. We recommend sharing deduplication keys for all of your events – the higher the percentage, the better.


To learn more about deduplication best practices, see the Business Help Center article.


Use case: Monitor the rate of deduplication between browser and server events to help to increase event coverage rate for your Conversions API-connected events.


Documentation: All fields available for dedupe key feedback can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;dedupe_key_feedback&#123;dedupe_key,browser_events_with_dedupe_key&#123;percentage,description&#125;,server_events_with_dedupe_key&#123;percentage,description&#125;,overall_browser_coverage_from_dedupe_key&#123;percentage,description&#125;&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;dedupe_key_feedback&#123;dedupe_key,browser_events_with_dedupe_key&#123;percentage,description&#125;,server_events_with_dedupe_key&#123;percentage,description&#125;,overall_browser_coverage_from_dedupe_key&#123;percentage,description&#125;&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123; 
 "web": [
 &#123;
 "dedupe_key_feedback": [
 &#123;
 "dedupe_key": "event_id",
 "browser_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of browser events that contain this dedupe key."
 &#125;,
 "server_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of server events that contain this dedupe key."
 &#125;,
 "overall_browser_coverage_from_dedupe_key": &#123;
 "percentage": 14.8,
 "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
 &#125;
 &#125;,
 &#123;
 "dedupe_key": "external_id",
 "browser_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of browser events that contain this dedupe key."
 &#125;,
 "server_events_with_dedupe_key": &#123;
 "percentage": 100,
 "description": "The percentage of server events that contain this dedupe key."
 &#125;,
 "overall_browser_coverage_from_dedupe_key": &#123;
 "percentage": 15.96,
 "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
 &#125;
 &#125;,
 &#123;
 "dedupe_key": "fbp",
 "browser_events_with_dedupe_key": &#123;
 "percentage": 0,
 "description": "The percentage of browser events that contain this dedupe key."
 &#125;,
 "server_events_with_dedupe_key": &#123;
 "percentage": 0,
 "description": "The percentage of server events that contain this dedupe key."
 &#125;,
 "overall_browser_coverage_from_dedupe_key": &#123;
 "percentage": 0,
 "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
 &#125;
 &#125;
 ],
 "event_name": "AddToCart"
 &#125;,
 ]
&#125;
 

## Data Freshness


Data freshness indicates the delay between the time the event occurred and when we received it. Best practice is to share your events in real time, or as close to real time as possible


The Meta Pixel defaults to sending web browser events in real time. To get the most value from your events, we recommend you send them in real time or as close to real time as possible. Events sent with a delay may impact how effectively your ads can be delivered to the right audiences.


To learn more about data freshness best practices, see the Business Help Center article.


Use case: Evaluate how quickly events are received from server versus browser. Improve frequency to real_time when possible to get the most value from your event data.


Documentation: All fields available for data freshness can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web&#123;data_freshness&#123;upload_frequency,description&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;data_freshness&#123;upload_frequency,description&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;agent_name=<AGENT_NAME>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123; 
 "web": [
 &#123;
 "data_freshness": &#123;
 "upload_frequency": "real_time",
 "description": "The average frequency with which instances of this event are received through the Conversions API."
 &#125;,
 "event_name": "ViewContent"
 &#125;,
 &#123;
 "data_freshness": &#123;
 "upload_frequency": "hourly",
 "description": "The average frequency with which instances of this event are received through the Conversions API."
 &#125;,
 "event_name": "Lead"
 &#125;,
 ]
&#125;
 

## Additional Conversions Reported (ACR) for Conversions API Event


Additional Conversions Reported (ACR) for Conversions API Event is a metric that estimates how many conversions (for example, purchases or link clicks) are measured as a result of an advertiser’s Conversions API setup.


To learn more about additional conversions reported, see the About ACR article and the Learn More section.


Use case: For Meta Pixels not connected to the Conversions API, extract the additional conversions reported metric to estimate the impact a Conversions API integration may have.


Documentation: All fields available for ACR for Conversion API event can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;event_potential_aly_acr_increase&#123;description,percentage&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;event_potential_aly_acr_increase&#123;description,percentage&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "event_potential_aly_acr_increase": &#123;
 "description": "Similar advertisers who set up Conversions API for Search events saw a median of 32.9% additional conversions reported versus those that only used Meta Pixel.",
 "percentage": 32.9
 &#125;,
 "event_name": "Search"
 &#125;,
 &#123;
 "event_potential_aly_acr_increase": &#123;
 "description": "Similar advertisers who set up Conversions API for PageView events saw a median of 30.1% additional conversions reported versus those that only used Meta Pixel.",
 "percentage": 30.1
 &#125;,
 "event_name": "PageView"
 &#125;
 ]
&#125;
 

## Additional Conversions Reported (ACR)


Additional Conversions Reported (ACR) is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. It also can help you determine if you can improve your Conversions API setup to measure more reported conversions. More reported conversions can help you decrease your cost per result and show your ads to people that find them relevant.


To learn more about additional conversions reported, see the About ACR article and the Learn More section.


Use case: For events connected to the Conversions API and have an EMQ score, monitor the uplift in additional conversions which the Conversions API is able to drive.


Documentation: All fields available for ACR can be found in the developer documentation here.


### Example


Graph API Explorer


GET/v25.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web&#123;acr&#123;description,percentage&#125;,event_name&#125;cURL


curl -X GET -G \
 -d &#039;fields=web&#123;acr&#123;description,percentage&#125;,event_name&#125;&#039; \
 -d &#039;dataset_id=<DATASET_ID>&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/<LATEST_VERSION>/dataset_qualityAPI Response


&#123;
 "web": [
 &#123;
 "acr": &#123;
 "description": "In the last 7 days, you saw about 37.9% more conversions reported for Search events by using the Conversions API alongside the Meta Pixel.",
 "percentage": 37.9
 &#125;,
 "event_name": "Search"
 &#125;,
 &#123;
 "acr": &#123;
 "description": "In the last 7 days, you saw about 45.5% more conversions reported for Page View events by using the Conversions API alongside the Meta Pixel..",
 "percentage": 45.5
 &#125;,
 "event_name": "PageView"
 &#125;
 ]
&#125;
 

## FAQs


What Is the Dataset Quality API?Advertisers that share server events using the Conversions API can see the event match quality score in Events Manager. However, this only works on an individual basis and is difficult to scale in cases where a tech provider partner, agency partner or advertiser is managing hundreds and thousands of Meta Pixels for their businesses. The Dataset Quality (formerly known as Integration Quality) API can help solve this problem by consolidating dataset quality metrics programmatically at scale.


 Enlace permanente What is the access token used for? The access token is used when partners send signal events or access the Setup Quality API on behalf of advertisers. The client system user access token onboarding method is not compatible with the EMQ API at the moment.


 Enlace permanente How should the partner_agent field be formatted? The partner_agent value in your API GET request should be a normalized lowercase format. This field is now optional.


 Enlace permanente Can an Access Token Generated Using Events Manager Prior to July 2025 Access the Dataset Quality API Directly? The advertiser will need to go to Events Manager to accept by using the instructions in the Client Generates Token Manually Using Events Manager section explained above. Once the advertiser completes the opt-in process, both the new token and existing generated tokens by the same user will be able to send events or access the Dataset Quality API.


 Enlace permanente 

## Learn More


 
- Conversions API Best Practices.

- Drive performance with an optimized Conversions API setup.

- Optimizing your setup can help unlock the potential of your marketing performance.

- Best practices to onboard the Conversions API for partners.

- Conversions API dataset quality guidance in the Business Help Center:

 

 
- Best practices for Conversions API to help improve ad performance. These Conversions API best practices can help businesses improve their ad performance by lowering their cost per action. We suggest following these best practices upon initial setup, but they can also be used to update existing setups.

- View server event details in Meta Events Manager. After businesses set up the Conversions API, they can use this article to learn how to monitor events and parameters to make sure their setup is working effectively and identify opportunities for improvement. Businesses can use this article to learn how to use server event details (Event Match Quality, Data Freshness, Event Overview and Event Deduplication) in Events Manager to improve their Conversions API setup.

 

 
- Additional Conversions Reported:

 

 
- About additional conversions reported.

- Troubleshoot reasons why your additional reported conversions are not available.

- How to interpret additional conversions reported

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# API de conversiones para Google Tag Manager - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides/gtm-server-side

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

---
# Gateway de la API de conversiones: AWS App Runner - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides/gateway-aws-app-runner

Gateway de la API de conversiones: AWS App Runner - Documentación - Meta for Developers - API de conversionesEmpezar
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
 Volver al documento en español Se actualizó este documento.
La traducción en español no está disponible todavía. Actualización del documento en inglés: 23 de ene. 
Actualización del documento en español: 11 feb. 2025 

## This content has moved!


We have moved this content to the "Gateway Products" section of the site.


 
- Go to: Conversions API Gateway and Signals Gateway: AWS ECS Express

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Gateway de la API de conversiones para varias cuentas en la API de plano de control - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/guides/gateway-control-plane-api

Gateway de la API de conversiones para varias cuentas en la API de plano de control - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

## El contenido cambió de lugar.

Movimos este contenido a la sección Productos de gateway del sitio.

 - Ir a API de plano de control de Signals Gateway y de gateway de la API de conversiones
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Parámetros fbp y fbc - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc

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

---
# Biblioteca del administrador de parámetros - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameter-builder-feature-library/

Biblioteca del administrador de parámetros - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Biblioteca del administrador de parámetros

La biblioteca del administrador de parámetros es una lista de SDK tanto en el lado del cliente (JavaScript del navegador) como en el lado del servidor (PHP, Java, Python, NodeJS, Ruby). Puedes implementar la biblioteca del administrador de parámetros para mejorar la calidad de la integración de la API de conversiones. La biblioteca puede ayudarte a crear, administrar y enviar determinados parámetros de información de los clientes, lo que puede generar mejoras en el rendimiento a través de mayores puntuaciones de calidad de coincidencia de eventos (EMQ). La biblioteca optimiza la administración de parámetros de eventos mediante lo siguiente:

 - Maximizar la calidad de coincidencia: genera automáticamente claves de coincidencia de la API de conversión de alta prioridad según las prácticas recomendadas de Meta.
- Mejorar la cobertura de parámetros: aumenta la cobertura de parámetros de eventos importantes, como fbc (identificador de clic de Meta), fbp (identificador de navegador de Meta) y direcciones IP.
- Garantizar un formato correcto: garantiza que la información de los clientes que compartes, como el correo electrónico y el número de teléfono, tenga el formato correcto para maximizar la probabilidad de coincidencia con los usuarios de Meta.
- Reducir el esfuerzo manual: minimiza el trabajo manual y el potencial de errores asociados a la administración de los parámetros de eventos por cuenta propia.
 

## Información general sobre las bibliotecas

Lado del cliente: la biblioteca y los eventos residen en el front-end del lado del navegador. Las bibliotecas se implementan en JavaScript. Los desarrolladores pueden integrarlas directamente en su página web.

Lado del servidor: las bibliotecas y los eventos residen en el back-end del lado del servidor. Según el lenguaje que se use en el back-end, Meta proporciona bibliotecas en diferentes lenguajes (PHP, Java, Python, NodeJS y Ruby).

 

## Funciones admitidas

Los parámetros admitidos son los siguientes:

 Parámetro admitido SDK admitido Descripción `fbc` (identificador de clic) cadena JavaScript en el lado del cliente

PHP

NodeJS

Java

Python

Ruby

 El valor del identificador de clics de Meta se almacena en la cookie del navegador _fbc en tu dominio. Consulta Administrar los parámetros fbc y fbp para averiguar cómo obtener o generar este valor a partir de un parámetro de consulta fbclid.

El formato es: fb.$&#123;subdomain_index&#125;.$&#123;creation_time&#125;.$&#123;fbclid&#125;.$&#123;appendix&#125;

Ejemplo: fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890.ABcDEFGh

 `fbp` (identificador de navegador) cadena JavaScript en el lado del cliente

PHP

NodeJS

Java

Python

Ruby

 El valor del identificador del navegador de Meta se almacena en la cookie del navegador _fbp en tu dominio. Consulta Administrar los parámetros fbc y fbp para obtener información sobre cómo obtener o generar este valor.

El formato es: fb.$&#123;subdomain_index&#125;.$&#123;creation_time&#125;.$&#123;random_number&#125;.$&#123;appendix&#125;

Ejemplo: fb.1.1596403881668.1116446470.ABcDEFGh

 `client_ip_address` (dirección IP del cliente) cadena

 JavaScript en el lado del cliente

PHP

NodeJS

Java (próximamente)

Python (próximamente)

Ruby (próximamente)

 La dirección IP del navegador correspondiente al evento debe ser una dirección IPV4 o IPV6 válida. En el caso de los usuarios que pueden usar una dirección IPV6, esta es preferible a la IPV4. El parámetro de datos de usuario client_ip_address nunca debe estar en formato hash.

Ejemplo:

IPV4: 168.212.226.204.ABcDEFGh

IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.ABcDEFGh

 Parámetros normalizados

 cadena - Correo electrónico (em)
- Número de teléfono (ph)
- Nombre (fn)
- Apellido (ln)
- Fecha de nacimiento (db)
- Género (ge)
- Ciudad (ct)
- Estado (st)
- Código postal (zp)
- País (country)
- Identificador externo (external_id)
 JavaScript en el lado del cliente

PHP

NodeJS

Java (próximamente)

Python (próximamente)

Ruby (próximamente)

 La dirección IP del navegador correspondiente al evento debe ser una dirección IPV4 o IPV6 válida. En el caso de los usuarios que pueden usar una dirección IPV6, esta es preferible a la IPV4. El parámetro de datos de usuario client_ip_address nunca debe estar en formato hash.

Ejemplo:

IPV4: 168.212.226.204.ABcDEFGh

IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.ABcDEFGh

 

## Formato admitido

Para todos los parámetros procesados por el administrador de parámetros, Meta agregará un campo de apéndice al final de cada parámetro para ayudar a evaluar el rendimiento de la biblioteca. El campo del apéndice tiene 8 caracteres que incluyen (1) la versión del SDK, (2) la incrementalidad y (3) el idioma del SDK.

Consulta Github para obtener información sobre la implementación. (ejemplo PHP)

Nota: Si ves el apéndice con solo dos caracteres, es un apéndice antiguo que solo contiene el idioma del SDK. Te recomendamos actualizar a la versión más reciente.

 

## Prácticas recomendadas

 - Implementar en todas las superficies: asegúrate de que las bibliotecas se apliquen a todas las superficies, como dispositivos móviles, computadoras y navegadores, y dominios de los que quieras hacer seguimiento.
- Bibliotecas del lado del cliente y del lado del servidor:

La biblioteca en el servidor es para la integración back-end del servidor. La biblioteca en el lado del servidor admite diferentes lenguajes (PHP, Java, Python, NodeJS y Ruby)
- La biblioteca en el lado del cliente se utiliza para la integración front-end en el navegador. Ten en cuenta que el lado del cliente solo está disponible en JavaScript.
 - Administración de cookies:

Captura las cookies cuanto antes. Asegúrate de guardar las cookies _fbp y _fbc cuanto antes en el recorrido del cliente en tu página web. Lo ideal sería obtener las cookies _fbp y _fbc cuando cargue la página de destino. No se recomienda recuperarlas solo de eventos de retención/fidelización o cuando se activan determinados eventos.
- Preserva el formato del valor de la cookie: no reemplaces ni modifiques las cookies _fbc ni _fbp. _fbc distingue mayúsculas de minúsculas, por lo que no hay que normalizar ni dar formato a _fbc en minúsculas.
 - Manejo de direcciones IP:

Prioriza el uso de IPv6 para getIpFn. Al implementar la funcionalidad getIpFn, recomendamos obtener primero la dirección IPv6 y, luego, recurrir a la dirección IPv4 si la capacidad de recuperación de la dirección IPv6 no está disponible en el lado del cliente del usuario.
- Se recomienda que integres tanto el administrador de parámetros en el lado del cliente como en el lado del servidor para lograr un rendimiento óptimo.

Usa el administrador de parámetros en el lado del cliente para recuperar el valor de client_ip_address y guardarlo en una cookie primero.
- Luego, usa el administrador de parámetros en el lado del servidor para obtener el mejor valor de "client_ip_address" disponible tanto de una cookie como de una solicitud para enviar a Meta usando la API de conversiones.
 - Normalización y hashing de datos:

Normaliza y hashea una sola vez. Recomendamos aplicar normalización y hashing a los parámetros de información de los clientes solo una vez, ya sea en el lado del cliente o en el lado del servidor, antes de enviarlos a Meta a través de la API de conversiones.
- El valor del parámetro distingue entre mayúsculas y minúsculas. Todos los valores de los campos de parámetros de información de los clientes que devuelve el administrador de parámetros distinguen entre mayúsculas y minúsculas. Puedes enviar estos valores a Meta a través de la API de conversiones sin realizar ninguna normalización (por ejemplo, uso de minúscula), ya que el SDK del administrador de parámetros lo hace automáticamente durante el proceso.
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Identificador externo - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/external-id

Identificador externo - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Identificador externo

Tipo de objeto: cadena o matriz de cadenas | Se recomienda cifrado

El identificador externo es una cadena que representa a un usuario en el sistema de un anunciante, como identificadores de programa de fidelización, identificadores de usuario e identificadores de cookies externos. Puedes enviar uno o varios external_id para un evento determinado, y tratamos de encontrar una coincidencia con alguien en Facebook.

Los identificadores externos se pueden enviar a través de varios canales, incluso el píxel del navegador, la API de conversiones y la API de conversiones offline (OCAPI). Debes ser consistente entre los distintos canales. Por ejemplo, si envías un evento de píxel del navegador con external_id configurado en 123, tu evento de la API de conversiones del mismo usuario también debe tener external_id configurado en 123.

Para verificar los external_id enviados por medio del píxel del navegador, busca el asistente del píxel en los Parámetros de coincidencias avanzadas enviados. Los external_id no están disponibles en la herramienta "Probar eventos".

 

## Por qué debes usar este recurso

Como anunciante, ya puedes asignar tu propio identificador a los usuarios que visitan tus propiedades. El campo external_id te permite aprovechar estos identificadores para lo siguiente:

 - Escala tu negocio: una vez que proporciones external_id, se puede utilizar de nuevo en diferentes canales y para crear diferentes públicos. Por tu parte, solo asigna external_id a tu sistema de identidad interna y ya no necesitas administrar una gran cantidad de información de identificación personal.
- Mejora el porcentaje de coincidencias y aprovecha las coincidencias en todos los canales: mejora los porcentajes de coincidencias en los canales en los que no tienes acceso a ciertos identificadores, y utiliza la información que proviene de otro canal. Consulta Ejemplo: utilizar el tipo de coincidencia en canales.
- Crear tus propios públicos: consulta Creación del público.
- Aumenta la seguridad y la privacidad: en lugar de subir varias veces información de identificación personal cifrada, puedes enviar tus external_id con la información de identificación personal una sola vez y puedes volver a utilizar esa coincidencia.
 

## Cómo funciona


### Paso 1

Nos envías un evento con external_id y varios otros parámetros de información de cliente. El evento puede enviarse a través de diferentes canales, incluso el píxel del navegador, la API de conversiones y la API de conversiones offline.


### Paso 2

Por nuestra parte, buscamos una coincidencia, para lo que usamos toda la información que nos proporcionaste. Si encontramos una coincidencia, asociamos el external_id que proporcionaste con ese usuario específico.


### Paso 3

En los eventos siguientes, puedes enviarnos un evento que contenga solo external_id. Por nuestra parte, mantenemos la asociación previamente configurada entre tu external_id y el usuario de Facebook con el que hubo coincidencia.

El external_id del usuario específico caduca periódicamente. Se recomienda que lo refresques tan seguido como sea posible.


### Ejemplo: utilizar el tipo de coincidencia en canales

 - Tienes un sitio web con el píxel del navegador.
- Un usuario ve un producto específico en tu sitio web.
- Nos envías un evento ViewContent mediante el píxel del navegador con información de cliente cifrada. Incluye el correo electrónico y el identificador externo de ese usuario, ambos cifrados. El píxel incluye automáticamente información de cookies.
- Usamos el correo electrónico cifrado para encontrar una coincidencia. Recordamos la asignación de external_id con dicho usuario de Facebook.
- Un par de días después, el mismo usuario realiza una compra en tu sitio web.
- Nos envías un nuevo evento. Esta vez, utilizas la API de conversiones. En el evento, incluye external_id.
- Recibimos tu external_id. Vemos que se estableció una coincidencia con los datos que se enviaron mediante el píxel. Podemos aprovechar la asignación previa en la API de conversiones.
 

### Ejemplo: caso de uso de socios

Utiliza external_id para reportar conversiones que ocurren en el sitio web de un socio. En ese caso, el proceso se ve así:

 - El usuario se encuentra en tu sitio web y hace clic en el sitio web del socio.
- Envías un evento de píxel y un external_id a Facebook. Envías a tu socio una solicitud de redireccionamiento que incluye external_id.
- El usuario completa una conversión en el sitio web del socio.
- Tu socio te envía información de conversión, que incluye external_id. Tu socio no debe compartir información confidencial.
- Nos envías otro evento, que incluye la nueva información de conversión y el external_id correspondiente.
 

## Creación de públicos

Es imperativo que seas coherente en el uso de los external_id entre el píxel del navegador, la API de conversiones y la API de conversiones offline y los eventos de la app. De esta manera, puedes utilizar los external_id para crear los siguientes tipos de públicos:

 - Públicos personalizados de sitio web
- Públicos personalizados de apps para celulares
- Públicos personalizados offline
- Públicos similares entrenados en públicos personalizados de sitio web, públicos personalizados de apps para celulares y públicos personalizados offline
 Ten en cuenta que los públicos personalizados de un archivo del cliente no figuran aquí. Este tipo de público utiliza políticas diferentes y no se puede crear únicamente con external_id ni extern_id a partir de los datos recibidos mediante la API de conversiones.

 

## Parámetro de FBP

Deberías agregar external_id a tus eventos siempre que puedas. Sin embargo, si tu sistema no está configurado para hacerlo, podemos solucionar el problema utilizando el parámetro fbp como identificador externo. Más información sobre el parámetro fbp.

 Situación Cómo se manejan los datos El evento incluye fbp, pero no external_id

 Usamos fbp como external_id, e intentamos encontrar una coincidencia. Como fbp es una cookie del navegador, tiene fecha de caducidad.

 El evento incluye fbp y external_id

 Guardamos ambos campos e intentamos encontrar una coincidencia. Siempre se prefiere external_id, ya que ofrece mejor rendimiento.

 El evento incluye external_id, pero no fbp

 Se procesa como evento regular que incluye external_id.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Especificación de la carga útil - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/payload-specification

Especificación de la carga útil - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Especificación de la carga útil

Integrar el sistema CRM con la API de conversiones de Meta y usar el objetivo de optimización para la conversión de clientes potenciales ofrece resultados de mejor calidad. En estos momentos, esta optimización solo admite anuncios para clientes potenciales nativos (formularios instantáneos) que se generan en Facebook o Instagram.

 Esta guía proporciona la especificación de carga de los eventos del CRM que se subieron solo con el fin de optimizar los clientes potenciales de conversión. No uses esta especificación si se trata de eventos que no estén relacionados con esta optimización.

 Consulta la documentación sobre la API de conversiones para obtener más información sobre cómo empezar a usar la API y otros recursos útiles.

 

## Carga útil de evento


### Parámetros obligatorios

 Nombre Descripción user_data

 objeto Mapa que contiene información de los clientes. Consulta Parámetros de información de los clientes para ver las opciones. Consulta Coincidencias avanzadas para obtener información sobre las opciones comparables disponibles en caso de que se envíen los datos mediante el píxel de Meta.

 event_name

 cadena Obligatorio. Campo sin formato para capturar las etapas que usas en el CRM. Asegúrate de enviar todas las etapas, porque se actualizaron, incluso la etapa inicial de clientes potenciales. Por ejemplo, es posible que tus etapas incluyan los siguientes tipos. Si un cliente potencial llega a la etapa "Convertido", es necesario que ya se hayan enviado todas las etapas anteriores.

 - Cliente inicial de Facebook
- Cliente potencial calificado en marketing
- Oportunidad de venta
- Convertido
 Usa una variable para pasarlas en las etapas de tu CRM. De manera alternativa, puedes realizar una llamada a la API separada por cada etapa.

 event_time

 entero Obligatorio. Una marca de tiempo Unix en segundos que indica cuándo tu CRM actualiza el evento de actualización de la etapa de cliente potencial. Usa una variable para pasar los valores de la marca de tiempo Unix de tu base de datos. Nota: El valor del parámetro event_time puede ser de hasta 7 días antes de enviar un evento a Meta. Además, la marca de tiempo debe ocurrir después de la hora de generación del cliente potencial, de lo contrario, el evento podría ser descartado.

 action_source

 cadena Obligatorio. Configura este parámetro al valor system_generated para todos los eventos de conversión de clientes potenciales. En el caso de las integraciones de clientes potenciales de conversión, esto especifica dónde se generan las conversiones del sistema.

 lead_event_source

 cadena Obligatorio. Configura este parámetro con el nombre de la herramienta de la que provienen los clientes potenciales (por ejemplo, Hubspot, SAP, Oracle, Dynamics, CRM propio, etc.), que se incluye en el parámetro custom_data.

 event_source

 cadena Obligatorio. Configura este parámetro en el valor crm para todos los eventos de conversiones de clientes potenciales. En el caso de la integración de clientes potenciales de conversión, esto especifica el origen del evento como tu CRM en el parámetro custom_data.

 

### Parámetros de información del cliente

La información de los clientes permite que Meta coordine los eventos de tu servidor con las cuentas de Meta. Si se envían varios de estos parámetros, se pueden obtener datos de eventos más precisos y un mejor rendimiento publicitario.

Nota: Debes enviar al menos un parámetro de información del cliente. Si envías lead_id, usa un lead_id válido o el sistema rechazará el evento. Si decides enviar un correo electrónico o número de teléfono, los datos deben estar cifrados. Por el momento, el identificador de clic no cuenta con un error de rechazo en la API, pero una gran cantidad de click_id inválidos desencadenarán una alerta en el sistema.

 Parámetro Prioridad Descripción Identificador de clientes potenciales (recomendado) Cómo encontrar el identificador de clientes potenciales

 Principal

 El identificador generado por Facebook para cada cliente potencial. Es un número de 15 a 17 dígitos que se obtiene del campo leadgen_id del webhook de generación de clientes potenciales y se incluye en el parámetro user_data.

Consulta Encontrar el identificador de clientes potenciales para obtener más información.

 Identificador de clic

 Principal

 Correo electrónico cifrado

 Principal

 Número de teléfono cifrado

 Alta

 Otra información de contacto cifrada

 Media

 Nota: Además de los parámetros de correo electrónico y número de teléfono cifrados, puedes enviarle a Meta parámetros cifrados de género, fecha de nacimiento, apellido, nombre, ciudad, estado y código postal, entre otros.

 

### Ejemplo:

El siguiente ejemplo brinda información sobre el formato de la carga del evento que se envía en la llamada a la API.

 
&#123;
 "event_name": "my lead stage",
 "event_time": 1617693833,
 "user_data": &#123;
 "lead_id": 1234567890123456
 &#125;,
 "action_source": "system_generated",
 "custom_data": &#123;
 "lead_event_source": "Salesforce",
 "event_source": "crm"
 &#125;
&#125;
 

## Más información

 - Servicio de ayuda para empresas: Configurar tu CRM para la optimización "Clientes potenciales de conversión"
- Servicio de ayuda para empresas: Información sobre la optimización de la entrega de anuncios para clientes potenciales
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->

---
# Encontrar el identificador de cliente potencial - API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/how-to-find-the-lead-id

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