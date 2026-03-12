# API de conversiones para eventos offline - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/offline-events

---

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
