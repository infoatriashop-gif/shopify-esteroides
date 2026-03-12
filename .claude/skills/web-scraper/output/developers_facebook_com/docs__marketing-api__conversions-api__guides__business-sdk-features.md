# Funciones del SDK para empresas de la API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/guides/business-sdk-features

---

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
