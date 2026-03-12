# API de conversiones para eventos de la app - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/app-events

---

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
