# Dataset Quality API para eventos offline - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/dataset-quality-api/offline-events

---

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
