# Parámetros de eventos del servidor - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event

---

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
