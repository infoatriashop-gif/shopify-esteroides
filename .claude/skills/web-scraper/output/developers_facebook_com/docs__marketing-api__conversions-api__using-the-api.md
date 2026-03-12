# Uso de la API - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api

---

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
