---
# Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel

Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Píxel de Meta

El píxel de Meta es un fragmento de código JavaScript que te permite realizar un seguimiento de la actividad de los visitantes de tu sitio web. Funciona cargando una pequeña biblioteca de funciones que puedes usar cuando un visitante del sitio realiza una acción (denominada evento) a la que quieres hacer un seguimiento (denominada conversión). Las conversiones seguidas aparecen en el administrador de anuncios, donde se pueden utilizar con el objetivo de medir la efectividad de tus anuncios, definir públicos personalizados para segmentar anuncios, realizar campañas de anuncios del catálogo Advantage+ y analizar la efectividad de los embudos de conversión de tu sitio web.

El píxel de Meta puede recopilar los siguientes datos:

 - Encabezados HTTP: todo lo que suele estar presente en encabezados HTTP, un protocolo web estándar que se envía entre cualquier solicitud del navegador y cualquier servidor en internet. Incluyen datos como direcciones IP, información sobre el navegador web, la ubicación de la página, el documento, el origen de referencia y la persona que está usando el sitio web.
- Datos específicos del píxel: incluyen el identificador del píxel y la cookie de Facebook.
- Datos de clics en botones: incluye los botones en los que los visitantes del sitio hacen clic, las etiquetas de esos botones y las páginas que se visitan como resultado de esos clics.
- Valores opcionales: los desarrolladores y los anunciantes tienen la opción de elegir enviar información adicional acerca de la visita mediante eventos de datos personalizados. Algunos ejemplos de eventos de datos personalizados son valor de conversión, tipo de página y más.
- Nombres de campos de formularios: incluye los nombres de los campos del sitio web, como email, address, quantity, etc. para los casos en los que compras un producto o servicio. No capturamos los valores de los campos, a menos que los incluyas como parte de las coincidencias avanzadas o los valores opcionales.
 

## Contenido de la documentación

 

### Primeros pasos

Un breve tutorial sobre cómo agregar el código base del píxel a tus páginas web.

 

### Guías

Guías basadas en casos de uso que te ayudan a realizar acciones específicas.

 

### Referencias

Especificaciones de productos y referencias de puntos de conexión.

 

### Ayuda

Soluciones a problemas comunes, consejos para solucionar problemas y herramientas.

 

## Más información

 - Hacer seguimiento de la actividad del usuario en una app para celulares con eventos de la app de Facebook
- Requisitos de iOS 14 de Apple para Píxel de Meta
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Seguimiento de conversiones - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking

Seguimiento de conversiones - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Seguimiento de conversiones

Puedes usar el píxel de Meta para hacer seguimiento de las acciones de los visitantes de tu sitio web, lo que se conoce como "seguimiento de las conversiones". Las conversiones registradas aparecen en el administrador de anuncios de Facebook y en el administrador de eventos de Facebook, donde se pueden usar para analizar la eficacia de tu embudo de conversión y medir el retorno de tu inversión en publicidad. También puedes usar las conversiones de las que se hace un seguimiento para definir públicos personalizados y así optimizar los anuncios y las campañas de anuncios del catálogo de Advantage+. Una vez que defines públicos personalizados, podemos usarlos para identificar a otros usuarios de Facebook con probabilidades de realizar una conversión y dirigirles tus anuncios.

Existen tres métodos para realizar un seguimiento de conversiones con el píxel:

 - Eventos estándar, que son acciones de visitantes que nosotros definimos y que tú informas llamando a una función del píxel
- Eventos personalizados, que son acciones de visitantes que tú definiste y que informas llamando a una función del píxel
- Conversiones personalizadas, que son acciones de visitantes de las que se realiza un seguimiento automático mediante el análisis de las URL de referencia de tu sitio web
 A partir del 2 de septiembre de 2025, comenzaremos a implementar restricciones más proactivas en las conversiones personalizadas que pueden sugerir información que no está permitida según las disposiciones de nuestras condiciones. Por ejemplo, toda conversión personalizada que sugiera condiciones de salud concretas (por ejemplo, "artritis", "diabetes") o estado financiero (por ejemplo "puntuación crediticia", "altos ingresos") se marcará y se evitará que se utilice para poner en circulación campañas publicitarias.

Cómo se ven afectadas tus campañas por estas restricciones:

 - No podrás usar conversiones personalizadas marcadas al crear nuevas campañas.
- Si tienes una campaña activa en la que se usan conversiones personalizadas marcadas, deberías crear una nueva campaña o duplicar esa campaña y usar una conversión personalizada no afectada para evitar problemas de rendimiento y optimización.
 Para desarrolladores de API:

 - A partir del 2 de septiembre de 2025, el campo is_unavailable devolverá true para señalar si sus conversiones personalizadas se marcaron.
 Podrás ver más información sobre esta actualización y cómo resolver las conversiones personalizadas marcadas aquí.

 

### Requisitos

El código base del píxel ya debe estar instalado en todas las páginas en las que quieras realizar un seguimiento de las conversiones.

 

## Eventos estándar

Los eventos estándar son acciones predefinidas de los visitantes que corresponden a actividades comunes y relacionadas con la conversión, como buscar, ver o comprar un producto. Los eventos estándar admiten parámetros, que te permiten incluir un objeto con información adicional acerca de un evento, como identificadores de productos, categorías y el número de productos comprados.

Para obtener una lista de todos los eventos estándar, consulta la referencia de eventos estándar del píxel. Obtén más información sobre el seguimiento de las conversiones y los eventos estándar con Blueprint.


### Seguimiento de eventos estándar

Para hacer el seguimiento de todos los eventos estándar, se llama a la función fbq(&#039;track&#039;) del píxel, con el nombre del evento y, opcionalmente, un objeto JSON como parámetro. Por ejemplo, esta es una llamada de función para registrar que un visitante completó un evento de compra, que incluye como parámetro la divisa y el valor:

fbq(&#039;track&#039;, &#039;Purchase&#039;, &#123;currency: "USD", value: 30.00&#125;);Si llamas a esa función, se registra como un evento de compra en el administrador de eventos:

 Puedes colocar la llamada de función fbq(&#039;track&#039;) en cualquier lugar entre las etiquetas <body> de apertura y cierre de tu página web, ya sea cuando se carga la página o cuando un visitante completa una acción, como hacer clic en un botón.

Por ejemplo, si quieres realizar un seguimiento de un evento de compra estándar después de que un visitante completa la compra, puedes colocar la llamada a la función fbq(&#039;track&#039;) en tu página de confirmación de compra, de esta forma:

<body>
 ...
 <script>
 fbq(&#039;track&#039;, &#039;Purchase&#039;, &#123;currency: "USD", value: 30.00&#125;);
 </script>
 ...
</body>Si, por el contrario, quieres realizar un seguimiento de un evento de compra estándar cuando el visitante hace clic en el botón Comprar, puedes vincular la llamada de la función fbq(&#039;track&#039;) al botón Comprar en tu página de pago, de la siguiente manera:

<button id="addToCartButton">Purchase</button>
<script type="text/javascript">
 $(&#039;#addToCartButton&#039;).click(function() &#123;
 fbq(&#039;track&#039;, &#039;Purchase&#039;, &#123;currency: "USD", value: 30.00&#125;);
 &#125;);
</script>Ten en cuenta que, en el ejemplo anterior, se usa jQuery para activar la llamada a la función, pero puedes activarla usando el método que desees.

 

## Eventos personalizados

Si nuestros eventos estándar predefinidos no satisfacen tus necesidades, puedes realizar un seguimiento de tus propios eventos personalizados, que, además, se pueden usar para definir públicos personalizados con el objetivo de optimizar los anuncios. Los eventos personalizados también admiten parámetros, que puedes incluir para brindar información adicional acerca de cada evento personalizado.

Obtén más información sobre el seguimiento de las conversiones y los eventos personalizados con Blueprint.


### Seguimiento de eventos personalizados

Puedes realizar un seguimiento de los eventos personalizados llamando a la función fbq(&#039;trackCustom&#039;) del píxel, con el nombre de tu evento personalizado y, opcionalmente, un objeto JSON como parámetros. Al igual que en el caso de los eventos estándar, puedes colocar una llamada a la función fbq(&#039;trackCustom&#039;) en cualquier lugar entre las etiquetas <body> de apertura y cierre de tu sitio web, ya sea cuando se carga la página o cuando un visitante realiza una acción, como hacer clic en un botón.

Por ejemplo, imagina que quieres realizar un seguimiento de los visitantes que comparten una promoción para obtener un descuento. Puedes registrarlos mediante un evento personalizado, de la siguiente manera:

fbq(&#039;trackCustom&#039;, &#039;ShareDiscount&#039;, &#123;promotion: &#039;share_discount_10%&#039;&#125;);Los nombres de los eventos personalizados deben ser cadenas y no pueden tener más de 50 caracteres.

 

## Conversiones personalizadas

Cada vez que se carga el píxel, este llama automáticamente a fbq(&#039;track&#039;, &#039;PageView&#039;) para rastrear un evento estándar PageView. Los eventos estándar PageView registran la URL de referencia de la página que activó la llamada a la función. Puedes utilizar estas URL registradas en el administrador de eventos para definir las acciones de los visitantes de las que deseas realizar un seguimiento.

Por ejemplo, imagina que diriges a los visitantes que se suscriben a tu lista de correo hacia una página de agradecimiento. Puedes configurar una conversión personalizada que realice un seguimiento de los visitantes del sitio web que hayan visto cualquier página que tenga /thank-you en su URL. Si tu página de agradecimiento es la única que tiene /thank-you en su URL e instalaste el píxel en esa página, se realizará un seguimiento de todas las personas que la vean, mediante la conversión personalizada.

Una vez que se ha realizado un seguimiento de las conversiones personalizadas, estas se pueden usar para optimizar tus campañas publicitarias, definir públicos personalizados y precisar aún más los públicos personalizados que dependen de eventos estándar o personalizados. Obtén más información sobre las conversiones personalizadas con Blueprint.

Dado que las conversiones personalizadas dependen de URL completas o parciales, tienes que asegurarte de poder definir las acciones de los visitantes exclusivamente en función de cadenas únicas de las URL de tu sitio web.


### Creación de conversiones personalizadas

Las conversiones personalizadas se crean en su totalidad dentro del administrador de eventos. Para obtener información sobre cómo hacerlo, consulta nuestro documento de ayuda para anunciantes.


### Conversiones personalizadas basadas en reglas

Crea optimizaciones para acciones y regístralas sin agregar nada al código base del píxel de Meta. Puedes hacerlo de forma adicional a los 17 eventos estándares.

 - Crea una conversión personalizada en /&#123;AD_ACCOUNT_ID&#125;/customconversions.
- Especifica una URL o una URL parcial que represente un evento en pixel_rule. Por ejemplo, thankyou.html es una página que aparece después de la compra.
 De la siguiente manera, puedes registrar una conversión de PURCHASE cuando se muestra &#039;thankyou.html&#039;:

 Luego, puedes crear tu campaña con el objetivo CONVERSIONS.

En el nivel del conjunto de anuncios, especifica la misma conversión personalizada (pixel_id, pixel_rule, custom_event_type) en promoted_object.


### Estadísticas de conversiones personalizadas

Estadísticas de anuncios muestra información sobre las conversiones personalizadas:

curl -i -G \
-d &#039;fields=actions,action_values&#039; \
-d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/v2.7/<AD_ID>/insightsMuestra conversiones estándar y personalizadas:

&#123;
 "data": [
 &#123;
 "actions": [
 &#123;
 "action_type": "offsite_conversion.custom.17067367629523",
 "value": 1225
 &#125;,
 &#123;
 "action_type": "offsite_conversion.fb_pixel_purchase",
 "value": 205
 &#125;
 ],
 "action_values": [
 &#123;
 "action_type": "offsite_conversion.custom.1706736762929507",
 "value": 29390.89
 &#125;,
 &#123;
 "action_type": "offsite_conversion.fb_pixel_purchase",
 "value": 29390.89
 &#125;
 ],
 "date_start": "2016-07-28",
 "date_stop": "2016-08-26"
 &#125;
 ],
 "paging": &#123;
 "cursors": &#123;
 "before": "MAZDZD",
 "after": "MjQZD"
 &#125;,
 "next": "https://graph.facebook.com/v2.7/<AD_ID>/insights?access_token=<ACCESS_TOKEN> pretty=0 fields=actions%2Caction_values date_preset=last_30_days level=adset limit=25 after=MjQZD"
 &#125;
&#125;Las conversiones personalizadas tienen identificadores únicos; efectúa una consulta al respecto para realizar una conversión específica, p. ej., una basada en reglas:

curl -i -G \
-d &#039;fields=name,pixel,pixel_aggregation_rule&#039; \
-d &#039;access_token=ACCESS-TOKEN&#039; \
https://graph.facebook.com/v2.7/<CUSTOM_CONVERSION_ID>

### Limitaciones de las conversiones personalizadas

El número máximo de conversiones personalizadas por cuenta publicitaria es 100. Si utilizas la API de estadísticas de anuncios para obtener métricas sobre las conversiones personalizadas:

 - No se admite la obtención de desgloses del identificador del producto.
- No se admite la obtención de recuentos de acciones únicas.
 

### Conversiones personalizadas marcadas

Si se marca una conversión personalizada, el campo is_unavailable se configurará en true.

&#123; "is_unavailable": true, "id": "30141209892193360" &#125;


#### Cómo solucionar problemas de conversiones personalizadas marcadas

Si alguna de tus conversiones personalizadas queda marcada por sugerir información que no está permitida según las disposiciones de nuestras condiciones, puedes considerar las siguientes opciones:

Para solucionar el problema de una conversión personalizada marcada al crear una nueva campaña:

 - Crea una nueva conversión personalizada: usa una conversión personalizada nueva y asegúrate de que no incluya información que no esté permitida según las disposiciones de nuestras condiciones.
- Elige una conversión personalizada diferente: selecciona una conversión personalizada diferente y asegúrate de que no incluya información que no esté permitida según las disposiciones de nuestras condiciones.
 Para solucionar problemas de conversión personalizada marcada en una campaña actual:

 - Duplica la campaña y selecciona una conversión personalizada existente: si tienes una campaña en circulación y queda marcada debido a una conversión personalizada, considera duplicar la campaña y seleccionar una conversión personalizada diferente que no esté marcada antes de publicar la nueva campaña duplicada. Nota: Cuando se publique la campaña, no podrás eliminar ni seleccionar una conversión personalizada diferente.
 

#### Solicitar una revisión

Si crees que tu conversión personalizada se marcó por error y no incluye información no permitida, puedes solicitar una revisión en el administrador de anuncios (debajo de la tabla de campañas) o en el administrador de eventos (en de la página de conversiones personalizadas).

 

## Seguimiento de las conversiones fuera del sitio

Haz un seguimiento de las conversiones con tus píxeles agregando el campo fb_pixel al parámetro tracking_spec del anuncio. Más información.

 

## Parámetros

Los parámetros son objetos opcionales con formato JSON que puedes incluir al hacer un seguimiento de eventos estándar y personalizados. Te permiten brindar información adicional sobre las acciones de los visitantes de tu sitio web. Una vez rastreados, los parámetros se pueden utilizar para definir mejor los públicos personalizados que creas. Obtén más información sobre los parámetros con Blueprint.

Para incluir un objeto de parámetro con un evento estándar o personalizado, otorga a tus datos de parámetro un formato de objeto JSON y luego inclúyelo como el tercer parámetro de función al llamar a la función fbq(&#039;track&#039;) o fbq(&#039;trackCustom&#039;).

Por ejemplo, imagina que deseas realizar un seguimiento de un visitante que compró varios productos como resultado de tu promoción. Puedes hacer lo siguiente:

fbq(&#039;track&#039;, &#039;Purchase&#039;,
 // begin parameter object data
 &#123;
 value: 115.00,
 currency: &#039;USD&#039;,
 contents: [
 &#123;
 id: &#039;301&#039;,
 quantity: 1
 &#125;,
 &#123;
 id: &#039;401&#039;,
 quantity: 2
 &#125;],
 content_type: &#039;product&#039;
 &#125;
 // end parameter object data
);Ten en cuenta que, si quieres utilizar datos incluidos en los parámetros del evento al definir los públicos personalizados, los valores clave no deben contener espacios.


### Propiedades del objeto

Puedes incluir las siguientes propiedades de objeto predefinidas con cualquier evento personalizado y con cualquier evento estándar que las admita. Da formato a tus datos de objeto de parámetro usando JSON.

 Clave de propiedad Tipo de valor Descripción del parámetro content_category

 Cadena

 Categoría de la página o del producto.

 content_ids

 matriz de enteros o cadenas

 Identificadores de producto asociados al evento, como SKU. Ejemplo: [&#039;ABC123&#039;, &#039;XYZ789&#039;].

 content_name

 Cadena

 Nombre de la página o del producto.

 content_type

 Cadena

 Puede ser product o product_group según qué content_ids o contents se pasen. Si los identificadores que se pasan en el parámetro content_ids o contents son identificadores de productos, el valor debe ser product. Si se pasan identificadores de grupos de productos, el valor debe ser product_group.

 contents

 matriz de objetos

 Una matriz de objetos JSON que contiene el número de artículo internacional (EAN), cuando corresponde, u otros identificadores de productos o contenidos asociados con el evento, además de las cantidades y los precios de los productos. Obligatorios: id y quantity.

Ejemplo: [&#123;&#039;id&#039;: &#039;ABC123&#039;, &#039;quantity&#039;: 2&#125;, &#123;&#039;id&#039;: &#039;XYZ789&#039;, &#039;quantity&#039;: 2&#125;]

 currency

 Cadena

 Divisa para el value especificado.

 delivery_category

 Cadena

 Categoría de la entrega. Valores admitidos:

 - in_store: la compra requiere que el cliente ingrese a la tienda.
- curbside: la compra requiere servicio de recolección.
- home_delivery: la compra se entrega al cliente.
 num_items

 Número entero

 Cantidad de artículos cuando se inició el pago. Se utiliza con el evento InitiateCheckout.

 predicted_ltv

 entero, float

 Valor previsto a largo plazo de un suscriptor de acuerdo con la definición del anunciante y expresado como un valor exacto.

 search_string

 Cadena

 Cadena que ingresa el usuario para la búsqueda. Se utiliza con el evento Search.

 status

 Booleano

 Se utiliza con el evento CompleteRegistration para mostrar el estado del registro.

 value

 número entero o valor flotante

 Obligatorio para eventos de compras o cualquier evento que utiliza la optimización de valores. Un valor numérico asociado con el evento. Debe representar un importe monetario.

 

### Propiedades personalizadas

Si nuestras propiedades de objeto predefinidas no satisfacen tus necesidades, puedes incluir tus propias propiedades personalizadas. Las propiedades personalizadas se pueden utilizar con eventos estándar y personalizados, y te pueden ayudar a definir mejor los públicos personalizados.

Por ejemplo, imagina que deseas realizar un seguimiento de un visitante que compró varios productos después de compararlos con otros. Puedes hacer lo siguiente:

fbq(&#039;track&#039;, &#039;Purchase&#039;,
 // begin parameter object data
 &#123;
 value: 115.00,
 currency: &#039;USD&#039;,
 contents: [
 &#123;
 id: &#039;301&#039;,
 quantity: 1
 &#125;,
 &#123;
 id: &#039;401&#039;,
 quantity: 2
 &#125;],
 content_type: &#039;product&#039;,
 compared_product: &#039;recommended-banner-shoes&#039;, // custom property
 delivery_category: &#039;in_store&#039;
 &#125;
 // end parameter object data
);

## Próximos pasos

Ahora que realizas un seguimiento de conversiones, te recomendamos que las uses para definir públicos personalizados a fin de optimizar tus anuncios para las conversiones del sitio web.

 

## Más información

 - Obtén más información sobre el seguimiento de las conversiones con Blueprint.
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Públicos personalizados - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/implementation/custom-audiences

Públicos personalizados - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Públicos personalizados

Si estás realizando un seguimiento de las conversiones, puedes segmentar a los visitantes de tu sitio web en grupos según las acciones que realizaron en el sitio. Estos grupos se denominan públicos personalizados. Una vez que hayas definido un público personalizado, puedes optimizar tus conjuntos de anuncios para dirigirte a otros usuarios de Facebook que coinciden con los criterios de ese público.


### Requisitos

 - Es necesario que el código base esté instalado y haciendo un seguimiento de eventos estándar, eventos personalizados o conversiones personalizadas.
- Debes tener acceso al administrador de anuncios de Facebook.
 

## Definir públicos personalizados

Antes de poder definir un público personalizado, asegúrate de que el administrador de eventos está realizando un seguimiento correcto de tus eventos o conversiones personalizadas; de lo contrario, no podrás seleccionarlos en el administrador de eventos al configurar un público personalizado.


### Eventos estándar y personalizados

Para definir un público personalizado a partir de un evento estándar o personalizado, sigue las instrucciones de nuestro documento de ayuda del administrador comercial Información sobre los públicos personalizados a partir del sitio web.


### Conversiones personalizadas

Para crear un público a partir de una conversión personalizada, sigue las instrucciones de nuestro documento de ayuda del administrador comercial Información sobre los públicos personalizados a partir del sitio web, pero selecciona Personas que visitaron páginas web específicas en el paso 4. Usa los mismos criterios de URL que utilizaste para definir la conversión personalizada.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Pixel for Advantage+ Catalog Ads - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/implementation/dynamic-ads

Pixel for Advantage+ Catalog Ads - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Meta Pixel for Advantage+ Catalog Ads


Advantage+ catalog ads are dynamically created by populating an ad template with product information found in a data feed. This allows you to create thousands of ads without having to configure each of them individually. You can also use Advantage+ catalog ads to target visitors based on how they have interacted with your website in the past.


The general steps for creating Advantage+ catalog ads are:


 
- Set up conversion tracking for the specific standard events and their parameter object properties listed below, then

- Use the Commerce Manager to set up a Advantage+ catalog ad set that targets those events

 


### Requirements


 
- You must have a Facebook Page for the business that your Advantage+ catalog ads will apply to.

- The Pixel base code must already be installed.

- You must have access to the Facebook Ads Manager.

 

Learn more about connecting your Pixel to a commerce catalog with Blueprint.


 

## Standard Events


Before you can set up Advantage+ catalog ads, you must first be tracking the following standard events. You must also include a parameter object with specific object properties with each tracked event.


 Required Event Required Object Properties AddToCart


 Either content_ids or contents


 Purchase


 Either content_ids or contents


 ViewContent


 Either content_ids or contents


 Refer to the Object Properties section below to learn what values to assign to the required object properties.


 

## Object Properties


### content_ids


If you are using the content_ids property in your parameter object, its value should correspond to the product ID or product IDs associated with the action. IDs must match the IDs found in your product catalog. Values can be either single IDs, or an array of IDs.


For example, here&#039;s how to track a visitor who has added products with the IDs 201 and 301 to a shopping cart. The IDs match the IDs for those products in the product catalog.


fbq(&#039;track&#039;, &#039;AddToCart&#039;,
 // begin required parameter object
 &#123;
 value: .5,
 currency: &#039;USD&#039;,
 content_ids: [&#039;201&#039;, &#039;301&#039;] // required property, if not using &#039;contents&#039; property
 &#125;
 // end required parameter object
);

### contents


If you are using the contents property in your parameter object, in a sub-object, you must include the id property, with the product ID or product IDs as its value, and include the quantity property with a number of product items being added to cart or purchased. IDs must match the IDs found in your product catalog. contents property value must be an array of objects.


For example, here&#039;s how to track a visitor who has added a product with the ID 301, and two products with the ID 401, to a shopping cart. The IDs match the IDs for those products in the product catalog.


fbq(&#039;track&#039;, &#039;AddToCart&#039;, &#123;
 value: .5,
 currency: &#039;USD&#039;,
 contents: [
 &#123;
 id: &#039;301&#039;,
 quantity: 1
 &#125;,
 &#123;
 id: &#039;401&#039;,
 quantity: 2
 &#125;],
&#125;);

## Commerce Manager


Once you have confirmed that the Events Manager is tracking your standard events correctly, use the Commerce Manager to set up your product catalog and Advantage+ catalog ad template, and target the standard events. Follow our Create an Advantage+ Catalog Ad help document to do this.


After you complete all of the steps outlined in the document, be sure to use the Commerce Manager to verify that your catalog recognizes your Pixel&#039;s events as a data source.


Note that it can take up to 24 hours for the Commerce Manager&#039;s Events Data Sources tab to recognize your tracked events.


 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->

---
# Coincidencias avanzadas - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching

Coincidencias avanzadas - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Coincidencias avanzadas

En este documento, se explica cómo implementar manualmente las coincidencias avanzadas para los eventos de conversión registrados con el píxel de Meta.

Visita la Guía para el uso de los datos y la privacidad a fin de conocer qué datos se envían cuando se usa el píxel de Meta.

Para implementar automáticamente las coincidencias avanzadas, usa el administrador de eventos.

 

## Implementación

Para usar las coincidencias avanzadas, formatea los datos del visitante como un objeto JSON e inclúyelos en la llamada a la función fbq(&#039;init&#039;) del código base de tu píxel como tercer parámetro.

Asegúrate de incluir los parámetros de las coincidencias avanzadas en el código base del píxel. Caso contrario, no se tratarán los valores como valores de coincidencias avanzadas manuales.

Por ejemplo, si el identificador del píxel es 283859598862258, puedes hacer lo siguiente:

fbq(&#039;init&#039;, &#039;283859598862258&#039;, &#123;
 em: &#039;email&#064;email.com&#039;, //Values will be hashed automatically by the pixel using SHA-256
 fn: &#039;first_name&#039;, 
 ln: &#039;last_name&#039; 
 ...
&#125;);Nota: Aceptamos en tus llamadas a la función direcciones de correo electrónico en minúscula sin formato hash, o bien normalizadas y convertidas a formato hash SHA-256.


#### Enviar más valores en formato hash

Puedes usar la etiqueta <img> para pasar tus propios datos de visitante si les das formato y los conviertes a formato hash SHA-256.

El siguiente es un ejemplo de cómo pasar el correo electrónico, el nombre y el apellido del usuario en formato hash:

<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr/?id=PIXEL_ID ev=Purchase
 ud[em]=f1904cf1a9d73a55fa5de0ac823c4403ded71afd4c3248d00bdcd0866552bb79
 ud[fn]=4ca6f6d5a544bf57c323657ad33aae1a019c775518cf4414beedb86962aea7c1
 ud[ln]=41f3e15ff8a4e4117da46465954304497ef29bdf35afaa9e36d527864d24c266
 cd[value]=0.00
 cd[currency]=USD" /> 

## Referencias

Datos del usuarioParámetroFormatoEjemploCorreo electrónico

 em

 Sin formato hash en minúscula, o bien en formato hash SHA-256

 jsmith&#064;example.com o 6e3913852f512d76acff15d1e402c7502a5bbe6101745a7120a2a4833ebd2350

 Nombre

 fn

 Letras en minúscula

 john

 Apellido

 ln

 Letras en minúscula

 smith

 Teléfono

 ph

 Dígitos que solo incluyen el código de país y el código de área

 16505554444

 Identificador externo

 external_id

 Cualquier identificador único del anunciante, como un identificador de membresía de fidelidad, un identificador de usuario o un identificador de cookies externas

 a&#064;example.com

 Sexo

 ge

 Una sola letra minúscula, f o m, si no se sabe, dejar en blanco

 f

 Fecha de nacimiento

 db

 Solo dígitos que indiquen el año, el mes y el día de nacimiento

 19910526 para el 26 de mayo de 1991.

 Ciudad

 ct

 Minúscula sin espacios

 menlopark

 Estado o provincia

 st

 Código de provincia o estado de dos letras minúsculas

 ca

 Código postal

 zp

 Cadena

 94025

 País

 country

 Código de país de dos letras minúsculas

 us

 

## Más información

 - Curso de Meta Blueprint: Coincidencias avanzadas en sitios web.
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Get Started - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/get-started

Get Started - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Get Started


The Meta Pixel is a snippet of JavaScript code that loads a small library of functions you can use to track Facebook ad-driven visitor activity on your website. It relies on Facebook cookies, which enable us to match your website visitors to their respective Facebook User accounts. Once matched, we can tally their actions in the Facebook Ads Manager so you can use the data to analyze your website&#039;s conversion flows and optimize your ad campaigns.


By default, the Pixel will track URLs visited, domains visited, and the devices your visitors use. In addition, you can use the Pixel&#039;s library of functions to:


 
- track conversions, so you can measure ad effectiveness

- define custom audiences, so you can target visitors who are more likely to convert

- set up Advantage+ catalog ads campaigns

 


### Requirements


In order to implement the Pixel, you will need:


 
- access to your website&#039;s code base

- your Pixel&#039;s base code or its ID

- access to the Facebook Ads Manager

 

In addition, depending on where you conduct business, you may have to comply with General Data Protection Regulation.


Ready? Let&#039;s get started.


 

## Base Code


Before you can install the Pixel, you will need your Pixel&#039;s base code, which you can find in the Ads Manager > Events Manager. If you have not created a Pixel, follow these instructions to create one — all you will need is the Pixel&#039;s base code (step 1).


The base Pixel code contains your Pixel&#039;s ID in two places and looks like this:


<!-- Facebook Pixel Code -->
<script>
 !function(f,b,e,v,n,t,s)
 &#123;if(f.fbq)return;n=f.fbq=function()&#123;n.callMethod?
 n.callMethod.apply(n,arguments):n.queue.push(arguments)&#125;;
 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=&#039;2.0&#039;;
 n.queue=[];t=b.createElement(e);t.async=!0;
 t.src=v;s=b.getElementsByTagName(e)[0];
 s.parentNode.insertBefore(t,s)&#125;(window, document,&#039;script&#039;,
 &#039;https://connect.facebook.net/en_US/fbevents.js&#039;);
 fbq(&#039;init&#039;, &#039;&#123;your-pixel-id-goes-here&#125;&#039;);
 fbq(&#039;track&#039;, &#039;PageView&#039;);
</script>
<noscript>
 <img height="1" width="1" style="display:none" 
 src="https://www.facebook.com/tr?id=&#123;your-pixel-id-goes-here&#125;&ev=PageView&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->When run, this code will download a library of functions which you can then use for conversion tracking. It also automatically tracks a single PageView conversion by calling the fbq() function each time it loads. We recommend that you leave this function call intact.


 

## Installing The Pixel


To install the Pixel, we highly recommend that you add its base code between the opening and closing <head> tags on every page where you will be tracking website visitor actions. Most developers add it to their website&#039;s persistent header, so it can be used on all pages.


Placing the code within your <head> tags reduces the chances of browsers or third-party code blocking the Pixel&#039;s execution. It also executes the code sooner, increasing the chance that your visitors are tracked before they leave your page.


Once you have added it to your website, load a page that has the Pixel. This should call fbq(&#039;track&#039;, &#039;PageView&#039;), which will be tracked as a PageView event in the Events Manager.


 Verify that this event was tracked by going to your Events Manager. Locate your Pixel and click its details — if you see a new PageView event, you have successfully installed the Pixel. If you do not see it, wait a few minutes and refresh the page. If your Pixel is still not working, use the Pixel Helper to track down the problem.


### Installing Using a Tag Manager


Although we recommend adding the Pixel directly to your website&#039;s <head> tags, the Pixel will work in most tag management and tag container solutions. For specific advice on implementing the Pixel using your tag manager, please refer to your tag manager&#039;s documentation.


### Installing Using an IMG Tag


Although not recommended, you can alternately install the Pixel using an <img> tag.


### Mobile Websites


If your mobile website is separate from your desktop website, we recommend that you add the Pixel to both. This will allow you to easily remarket to your mobile visitors, exclude them, or create lookalikes audiences.


 

## Pixel Helper


We highly recommend that you install our Pixel Helper Chrome extension. The Pixel Helper provides extremely valuable feedback that can help you verify that your Pixel is working correctly, especially when you start tracking conversions, where you can easily encounter formatting errors.


 

## Next Steps


Once you have verified that the Pixel is installed and tracking the PageView event correctly, you can use the Pixel to:


 
- track conversions

- create custom audiences

- set up Advantage+ catalog ads

 

Learn more about implementing the Pixel with Blueprint.


 

## Resources


 
- Meta Blueprint: Learn more about implementing the pixel

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Guías - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/guides

Guías - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Guías del píxel de Meta

Una lista de guías referidas al uso del píxel de Meta.

 - Públicos personalizados
- RGPD
- Opciones de procesamiento de datos para Uusuarios de EE. UU.
- SPA de etiquetado
- Seguimiento preciso de eventos
- Uso compartido del píxel entre agencias
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Referencia - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/reference

Referencia - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Referencia

 

## Eventos estándar

Puedes usar la función fbq(&#039;track&#039;) del píxel de Meta para realizar un seguimiento de los siguientes eventos estándar. Los eventos estándar también admiten objetos de parámetros con propiedades de objeto específicas, que te permiten incluir información detallada acerca de un evento.

Si implementas el píxel de Meta junto con la API de conversiones, te recomendamos que incluyas el parámetro eventID como un cuarto parámetro de la función fbq(‘track’). Consulta la documentación Deduplicar los eventos del píxel y del servidor para obtener más información.

 Nombre del evento Descripción del evento Propiedades del objeto Valor custom_event_type del objeto promocionado AddPaymentInfo

 Cuando se agrega la información de pago al proceso de pago.

 Una persona hace clic en el botón para guardar la información de facturación. content_ids, contents, currency, value

 Opcional. ADD_PAYMENT_INFO

 AddToCart

 Cuando se agrega un producto al carrito de compras.

 Una persona hace clic en el botón "Agregar al carrito". content_ids, content_type, contents, currency, value

 Opcional. Obligatorio en el caso de los anuncios del catálogo Advantage+: contents

 ADD_TO_CART

 AddToWishlist

 Cuando se agrega un producto a la lista de deseos.

 Una persona hace clic en el botón "Agregar a la lista de deseos". content_ids, contents, currency, value

 Opcional. ADD_TO_WISHLIST

 CompleteRegistration

 Cuando se completa un formulario de registro.

 Una persona envía un formulario de suscripción o registro completo. currency, value

 Opcional. COMPLETE_REGISTRATION

 Contact

 Cuando una persona inicia un contacto con tu empresa por teléfono, SMS, correo electrónico, chat, etc.

 Una persona envía una pregunta acerca de un producto. Opcional. CONTACT

 CustomizeProduct

 Cuando una persona personaliza un producto.

 Una persona selecciona el color de una camiseta. Opcional. CUSTOMIZE_PRODUCT

 Donate

 Cuando una persona dona fondos a tu organización o causa.

 Una persona agrega a su carrito una donación para Humane Society. Opcional. FindLocation

 Cuando una persona busca dónde está ubicada tu tienda en un sitio web o app, con la intención de visitar el lugar.

 Una persona quiere encontrar un producto específico en una tienda local. Opcional. FIND_LOCATION

 InitiateCheckout

 Cuando una persona ingresa al proceso de pago antes de completarlo.

 Una persona hace clic en un botón de pago. content_ids, contents, currency, num_items, value

 Opcional. INITIATE_CHECKOUT

 Lead

 Cuando se completa un registro.

 Una persona hace clic en los precios. currency, value

 Opcional. LEAD

 Purchase

 Cuando se realiza una compra o se completa el proceso de pago.

 Una persona finaliza la compra o el proceso de pago y llega a la página de confirmación o agradecimiento. content_ids, content_type, contents, currency, num_items, value

Obligatorios: currency y value

Obligatorio en el caso de los anuncios del catálogo de Advantage+: contents o content_ids

 PURCHASE

 Schedule

 Cuando una persona concierta una cita para visitar alguna de tus ubicaciones.

 Una persona selecciona una fecha y hora para una clase de tenis. Opcional. SCHEDULE

 Search

 Cuando se realiza una búsqueda.

 Una persona busca un producto en tu sitio web. content_ids, content_type, contents, currency, search_string, value

 Opcional. Obligatorio en el caso de los anuncios del catálogo de Advantage+: contents o content_ids

 SEARCH

 StartTrial

 Cuando una persona inicia una prueba gratuita de un producto o servicio que ofreces.

 Una persona selecciona una semana gratis de tu juego. currency, predicted_ltv, value

 Opcional. START_TRIAL

 SubmitApplication

 Cuando una persona solicita un producto, un servicio o un programa que ofreces.

 Una persona solicita una tarjeta de crédito, un programa educativo o un empleo. Opcional. SUBMIT_APPLICATION

 Subscribe

 Cuando una persona solicita iniciar una suscripción pagada a un producto o servicio que ofreces.

 Una persona se suscribe a tu servicio de streaming. currency, predicted_ltv, value

 Opcional. SUBSCRIBE

 ViewContent

 Visitar una página de contenido que te interesa, como una página de producto o de destino. ViewContent indica si alguien visita la URL de una página web, pero no lo que mira o hace en esa página.

 Una persona ingresa a la página de detalles de un producto. content_ids, content_type, contents, currency, value

 Opcional. Obligatorio en el caso de los anuncios del catálogo de Advantage+: contents o content_ids

 VIEW_CONTENT

 

## Propiedades de los objetos

Puedes incluir las siguientes propiedades de objeto predefinidas con cualquier evento personalizado y con cualquier evento estándar que las admita. Da formato a tus datos de objeto de parámetro usando JSON. Obtén más información sobre los parámetros del evento con Blueprint.

 Clave de propiedad Tipo de valor Descripción del parámetro content_category

 Cadena

 Categoría de la página o el producto.

 Opcional. content_ids

 Matriz de enteros o cadenas

 Identificadores de producto asociados con el evento, como SKU (p. ej., [&#039;ABC123&#039;, &#039;XYZ789&#039;]).

 content_name

 Cadena

 Nombre de la página o del producto.

 Opcional. content_type

 Cadena

 Puede ser product o product_group según qué content_ids o contents se pasen. Si los identificadores que se pasan en el parámetro content_ids o contents son identificadores de productos, el valor debe ser product. Si se pasan identificadores de grupos de productos, el valor debe ser product_group.


Si no se proporciona ningún content_type, Meta hará que el evento coincida con todos los elementos que tengan el mismo identificador, independientemente del tipo.

 contents

 Matriz de objetos

 Una matriz de objetos JSON que contiene la cantidad y el número de artículo internacional (EAN), cuando corresponde, u otros identificadores de productos o contenidos. id y quantity son los campos obligatorios, por ej., [&#123;&#039;id&#039;: &#039;ABC123&#039;, &#039;quantity&#039;: 2&#125;, &#123;&#039;id&#039;: &#039;XYZ789&#039;, &#039;quantity&#039;: 2&#125;].

 currency

 Cadena

 La divisa para el value especificado.

 num_items

 Entero

 Se utiliza con el evento InitiateCheckout. El número de artículos cuando se inició el pago.

 predicted_ltv

 Entero, float

 Valor previsto de un suscriptor a largo plazo de acuerdo con la definición del anunciante, que se expresa como un valor exacto.

 search_string

 Cadena

 Se utiliza con el evento Search. La cadena que ingresa el usuario para la búsqueda.

 status

 Booleano

 Se utiliza con el evento CompleteRegistration para mostrar el estado del registro.

 Opcional. value

 Entero o float

 El valor de un usuario que realiza este evento para el negocio.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Support - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/support

Support - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Support


 

## Pixel Helper


If you are new to the Meta Pixel, or are having trouble tracking conversions, use our Pixel Helper chrome extension to help you with debugging.


 

## FAQs


### Why does my URL show a 404 browser error instead of redirecting to the correct webpage when the ClickID is added?


 
- When using URL Shortener Services and vanity URL&#039;s, the click ID is added to the URL, however, the "&" is changed to a "?", &fbclid=&#123;facebook-click-id&#125; to ?fbclid=&#123;facebook-click-id&#125;, or vice versa causing the URL to break.

 


### Why are my query string parameters, such as Click ID, missing in the URL?


 
- The webpage does not accept URL parameters.

- The webpage does not accept unexpected URL parameters that have been appended to the URL.

 

Because these issues are happening on the webpage outside of Facebook, please work with the appropriate website management resources to handle missing query parameters or to ignore the fbclid to get the redirect to work as expected.


### Does the Meta Pixel impact website performance?


The Meta Pixel is loaded asynchronously and does not block the display of the web page. Because all advertisers use the same Pixel script, the Pixel code will be already be in the browser’s cache If a user has visited any website with the Pixel installed.


 

## Learn More


 
- Meta Blueprint course: Optimize and Troubleshoot the Meta Pixel

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Get Started - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/implementation

Get Started - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Get Started


The Meta Pixel is a snippet of JavaScript code that loads a small library of functions you can use to track Facebook ad-driven visitor activity on your website. It relies on Facebook cookies, which enable us to match your website visitors to their respective Facebook User accounts. Once matched, we can tally their actions in the Facebook Ads Manager so you can use the data to analyze your website&#039;s conversion flows and optimize your ad campaigns.


By default, the Pixel will track URLs visited, domains visited, and the devices your visitors use. In addition, you can use the Pixel&#039;s library of functions to:


 
- track conversions, so you can measure ad effectiveness

- define custom audiences, so you can target visitors who are more likely to convert

- set up Advantage+ catalog ads campaigns

 


### Requirements


In order to implement the Pixel, you will need:


 
- access to your website&#039;s code base

- your Pixel&#039;s base code or its ID

- access to the Facebook Ads Manager

 

In addition, depending on where you conduct business, you may have to comply with General Data Protection Regulation.


Ready? Let&#039;s get started.


 

## Base Code


Before you can install the Pixel, you will need your Pixel&#039;s base code, which you can find in the Ads Manager > Events Manager. If you have not created a Pixel, follow these instructions to create one — all you will need is the Pixel&#039;s base code (step 1).


The base Pixel code contains your Pixel&#039;s ID in two places and looks like this:


<!-- Facebook Pixel Code -->
<script>
 !function(f,b,e,v,n,t,s)
 &#123;if(f.fbq)return;n=f.fbq=function()&#123;n.callMethod?
 n.callMethod.apply(n,arguments):n.queue.push(arguments)&#125;;
 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=&#039;2.0&#039;;
 n.queue=[];t=b.createElement(e);t.async=!0;
 t.src=v;s=b.getElementsByTagName(e)[0];
 s.parentNode.insertBefore(t,s)&#125;(window, document,&#039;script&#039;,
 &#039;https://connect.facebook.net/en_US/fbevents.js&#039;);
 fbq(&#039;init&#039;, &#039;&#123;your-pixel-id-goes-here&#125;&#039;);
 fbq(&#039;track&#039;, &#039;PageView&#039;);
</script>
<noscript>
 <img height="1" width="1" style="display:none" 
 src="https://www.facebook.com/tr?id=&#123;your-pixel-id-goes-here&#125;&ev=PageView&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->When run, this code will download a library of functions which you can then use for conversion tracking. It also automatically tracks a single PageView conversion by calling the fbq() function each time it loads. We recommend that you leave this function call intact.


 

## Installing The Pixel


To install the Pixel, we highly recommend that you add its base code between the opening and closing <head> tags on every page where you will be tracking website visitor actions. Most developers add it to their website&#039;s persistent header, so it can be used on all pages.


Placing the code within your <head> tags reduces the chances of browsers or third-party code blocking the Pixel&#039;s execution. It also executes the code sooner, increasing the chance that your visitors are tracked before they leave your page.


Once you have added it to your website, load a page that has the Pixel. This should call fbq(&#039;track&#039;, &#039;PageView&#039;), which will be tracked as a PageView event in the Events Manager.


 Verify that this event was tracked by going to your Events Manager. Locate your Pixel and click its details — if you see a new PageView event, you have successfully installed the Pixel. If you do not see it, wait a few minutes and refresh the page. If your Pixel is still not working, use the Pixel Helper to track down the problem.


### Installing Using a Tag Manager


Although we recommend adding the Pixel directly to your website&#039;s <head> tags, the Pixel will work in most tag management and tag container solutions. For specific advice on implementing the Pixel using your tag manager, please refer to your tag manager&#039;s documentation.


### Installing Using an IMG Tag


Although not recommended, you can alternately install the Pixel using an <img> tag.


### Mobile Websites


If your mobile website is separate from your desktop website, we recommend that you add the Pixel to both. This will allow you to easily remarket to your mobile visitors, exclude them, or create lookalikes audiences.


 

## Pixel Helper


We highly recommend that you install our Pixel Helper Chrome extension. The Pixel Helper provides extremely valuable feedback that can help you verify that your Pixel is working correctly, especially when you start tracking conversions, where you can easily encounter formatting errors.


 

## Next Steps


Once you have verified that the Pixel is installed and tracking the PageView event correctly, you can use the Pixel to:


 
- track conversions

- create custom audiences

- set up Advantage+ catalog ads

 

Learn more about implementing the Pixel with Blueprint.


 

## Resources


 
- Meta Blueprint: Learn more about implementing the pixel

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# General Data Protection Regulation - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/implementation/gdpr

General Data Protection Regulation - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# General Data Protection Regulation


The General Data Protection Regulation (GDPR) creates consistent data protection rules across Europe. It applies to companies (regardless of where they are based) who process personal data about individuals in the EU.


While many of the principles build on current EU data protection rules, the GDPR has a wider scope, more prescriptive standards and substantial fines. For example, it requires a higher standard of consent for using some types of data and broadens individuals&#039; rights with respect to accessing and porting their data.


Businesses who advertise with the Facebook companies can continue to use Facebook platforms and solutions in the same way they do today. Each company is responsible for ensuring their own compliance with the GDPR, just as they are responsible for compliance with the laws that apply to them today.


## Cookie Consent


Businesses may want to implement code that creates a banner and requires affirmative consent (for example, an “I agree” checkbox at the top of the page) to use the Pixel. If you already have a system in place that addresses this need, such as a tag manager, you can make this code optional.


Use the following API to pause sending Pixel fires to Facebook, and once cookie consent is granted, send Pixel fires to Facebook. You need to call revoke on every page.


fbq(&#039;consent&#039;, &#039;revoke&#039;);
fbq(&#039;consent&#039;, &#039;grant&#039;);For example:


// Revoke consent before &#039;init&#039; is called
fbq(&#039;consent&#039;, &#039;revoke&#039;);
fbq(&#039;init&#039;, &#039;<your pixel ID>&#039;);
fbq(&#039;track&#039;, &#039;PageView&#039;);// Once affirmative consent has been granted
fbq(&#039;consent&#039;, &#039;grant&#039;);See our Cookie Policy for details about the cookies used and the data received. The Meta Pixel receives these types of data:


 
- Http Headers – Anything that is generally present in HTTP headers, a standard web protocol sent between any browser request and any server on the internet. This information may include data like IP addresses, information about the web browser, page location, document, referrer and person using the website.

- Pixel-specific Data – Includes Pixel ID and the Facebook Cookie.

- Button Click Data – Includes any buttons clicked by site visitors, the labels of those buttons and any pages visited as a result of the button clicks.

- Optional Values – Developers and marketers can optionally choose to send additional information about the visit through conversion tracking. Example custom data events are conversion value, page type, and more.

- Form Field Names – Includes website field names like ‘email’, ‘address’, ‘quantity’ for when you purchase a product or service. We don&#039;t capture field values unless you include them as part of Advanced Matching, or conversion tracking.

 
 

## Learn more


 
- Advertiser Help

- Facebook&#039;s GDPR microsite

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Avanzado - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/advanced

Avanzado - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Avanzado

Sugerencias para implementaciones alternativas, usando el píxel con apps web de una sola página y seguimiento de las conversiones con clics en botones y desplazamiento de página.

 

## Reglamento General de Protección de Datos

Si realizas negocios en países sujetos al Reglamento General de Protección de Datos (RGPD), consulta nuestro documento RGPD para aprender a cumplir.

 

## Instala el píxel usando una etiqueta IMG

 Aunque puedes usar la etiqueta IMG para instalar los píxeles, te recomendamos que consultes nuestra guía de implementación para buscar alternativas.

 Si necesitas instalar el píxel mediante una implementación ligera, puedes instalarlo con una etiqueta <img>. Para hacer esto, agrega el código a continuación entre una etiqueta de apertura y una de cierre <noscript> dentro del encabezado o el cuerpo de tu sitio web y reemplaza &#123;pixel-id&#125; con tu identificador del píxel &#123;standard-event&#125; con un evento estándar.

<img src="https://www.facebook.com/tr?id=&#123;pixel-id&#125; ev=&#123;standard-event&#125;" height="1" width="1" style="display:none"/>Los píxeles instalados con una etiqueta <img> también admiten parámetros, que puedes incluir en la cadena de consultas. Por ejemplo:

<img src="https://www.facebook.com/tr?id=12345
 ev=ViewContent
 cd[content_name]=ABC%20Leather%20Sandal
 cd[content_category]=Shoes
 cd[content_type]=product
 cd[content_ids]=1234
 cd[value]=0.50
 cd[currency]=USD" height="1" width="1" style="display:none"/>

### Limitaciones

- No se puede disparar varias veces en cada carga de página
- No se pueden rastrear eventos estándar o personalizados activados por interacciones de la interfaz de usuario (por ejemplo, un clic en un botón)
- Sujeto a los límites HTTP GET en el envío de datos personalizados o URL largas
- No se puede cargar de forma asincrónica


### Ejemplo de instalación de etiquetas IMG

A continuación, se muestra un ejemplo de la instalación de la etiqueta IMG del píxel de Meta en páginas clave de un sitio web ficticio utilizando un identificador de píxel ficticio (12345) y parámetros personalizados (por ejemplo cd[currency]=USD).

En la página del producto, un píxel para rastrear un evento PageView y otro para rastrear un evento ViewContent:

<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=12345&ev=PageView"/> <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=12345&ev=ViewContent"/> En la página de agregar al carrito, un píxel para rastrear un evento PageView y otro para rastrear un evento AddToCard con datos personalizados:

<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=12345&ev=PageView"/> <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=12345&ev=AddToCart&cd[currency]=USD&cd[value]=0.00"/> En la página de compra, un píxel para rastrear un evento PageView y otro para rastrear un evento Purchase con datos sobre la compra:

<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=12345&ev=PageView"/> <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=12345&ev=Purchase&cd[currency]=USD&cd[value]=0.00"/> 

## Píxel IMG de medición de eventos agrupados para iOS 14.5+

La medición de eventos agrupados de Meta es un protocolo que permite medir los eventos web y de la app correspondientes a personas que usan dispositivos con iOS 14.5 o versiones posteriores. Es posible usar un modelo estadístico, que se diseñó para proporcionar una vista de resultados más completa cuando faltan datos o están incompletos.

Te recomendamos seguir la sección de instalación del píxel con una etiqueta IMG de este documento al utilizar la etiqueta IMG de píxeles o dejar de utilizar la etiqueta IMG y seguir nuestra guía de implementación.


### Faltan datos de píxel IMG


#### JavaScript en tiempo de ejecución

Si configuras tu píxel de IMG con JavaScript en tiempo de ejecución para generar una clase de imagen de JavaScript sin agregar esa clase de imagen al árbol DOM del sitio web, por ejemplo, utilizando bibliotecas de JavaScript de terceros para enviar el píxel de IMG, debes agregar el siguiente código o Meta no recibirá los datos de tu píxel de IMG.

var nativeBridge = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.receiveImgPixel;
if (nativeBridge) &#123;
 const postObj = &#123;
 id: &#123;pixel-id&#125;,
 ev: &#123;standard-event&#125;,
 cd: &#123;stringified-custom-data&#125;,
 dpo: &#123;data-processing-options&#125;, // Optional CCPA param
 dpoco: &#123;data-processing-option-country&#125;, // Optional CCPA param
 dpost: &#123;data-processing-option-state&#125;, // Optional CCPA param
 &#125;;
 nativeBridge.postMessage(JSON.stringify(postObj));
&#125;

#### Atributo sandbox

Si colocas tu píxel IMG dentro de un iframe que tiene el atributo sandbox debes agregar el valor allow-scripts o Facebook no recibirá tus datos de píxeles IMG.


### Habilitar la medición de eventos agregados en situaciones de redireccionamiento automático

Ampliamos la funcionalidad de la medición de eventos agregados para considerar las conversiones de todas las páginas web asociadas con anunciantes en las que se activan eventos de píxel optimizados por un anunciante (como en las situaciones específicas en las que los anunciantes usan URL acortadas o redireccionamientos basados en geolocalización, tienen varias líneas de negocios o dependen de agencias para sus campañas de publicidad). Si tu caso es uno de estos y quieres habilitar la medición de eventos agregados, te recomendamos hacer lo siguiente:

 - Usa el mismo píxel de Meta (es decir, el mismo identificador del píxel y el mismo par de nombres de evento del píxel) en todos los dominios relevantes de los que se quiere obtener conversaciones.
- Asegúrate de que los eventos de medición de eventos agregados de los que quieres obtener conversiones tengan prioridad en estos dominios.
 

## Seguimiento de clics en los botones

Cuando un visitante hace clic en un botón, el código de JavaScript del píxel de Meta detecta automáticamente los campos del formulario relevantes y los transmite a Meta.

Imagina que tienes un sitio web de comercio en línea y el botón "Agregar al carrito" no conduce a una página nueva. Puede que quieras que se active un evento cuando se haga clic en el botón.

En este ejemplo, activaremos un evento ViewContent estándar cuando se carga la página. Cuando se haga clic en el botón "Agregar al carrito", activaremos un evento estándar AddToCart.

Para esto, primero carga el código del píxel de Meta que quieres que se active cuando se carga la página:

<!-- Facebook Pixel Code --> <script> fbq(&#039;track&#039;, &#039;ViewContent&#039;, &#123; content_name: &#039;Really Fast Running Shoes&#039;, content_category: &#039;Apparel & Accessories > Shoes&#039;, content_ids: [&#039;1234&#039;], content_type: &#039;product&#039;, value: 0.50, currency: &#039;USD&#039; &#125;); </script> <!-- End Facebook Pixel Code --> Luego, activa AddToCart cuando se cargue una página nueva o cuando se haga clic en el botón "Agregar al carrito". Existen varias maneras de controlar los clics en los botones. A continuación, se muestra un ejemplo de cómo agregar eventListener a un botón.

<!-- Somewhere there is a button that performs Add to Cart --> <button id="addToCartButton">Add To Cart</button> <!-- Add Pixel Events to the button&#039;s click handler --> <script type="text/javascript"> var button = document.getElementById(&#039;addToCartButton&#039;); button.addEventListener( &#039;click&#039;, function() &#123; fbq(&#039;track&#039;, &#039;AddToCart&#039;, &#123; content_name: &#039;Really Fast Running Shoes&#039;, content_category: &#039;Apparel & Accessories > Shoes&#039;, content_ids: [&#039;1234&#039;], content_type: &#039;product&#039;, value: 4.99, currency: &#039;USD&#039; &#125;); &#125;, false ); </script> Hay muchas formas de gestionar los eventos de clic; solo asegúrate de llamar siempre a la función fbq después del clic.

Dependiendo de cómo haya implementado el píxel, el asistente de píxeles puede mostrar un error antes de que se haga clic en el botón. Puedes verificar que tu píxel se está disparando correctamente haciendo clic en el botón, lo que descarta el error del asistente.

 

## Activación de eventos según la visibilidad

Para este ejemplo, imagina que tienes un blog y quieres realizar un seguimiento de los usuarios que leen todo el contenido de un artículo. El usuario no realiza ninguna acción además de desplazarse hasta el final de la página.

A continuación, se muestra un ejemplo del HTML de una página donde se carga el píxel:

<!DOCTYPE html> <html> <head> <!-- Facebook Pixel Code --> <script> !function(f,b,e,v,n,t,s)&#123;if(f.fbq)return;n=f.fbq=function()&#123;n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)&#125;;if(!f._fbq)f._fbq=n; n.push=n;n.loaded=!0;n.version=&#039;2.0&#039;;n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)&#125;(window, document,&#039;script&#039;,&#039;https://connect.facebook.net/en_US/fbevents.js&#039;); fbq(&#039;init&#039;, &#039;<FB_PIXEL_ID>&#039;); fbq(&#039;track&#039;, "PageView"); </script> <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=<FB_PIXEL_ID>&ev=PageView&noscript=1" /></noscript> <!-- End Facebook Pixel Code --> </head> <body> <h1>Scroll Page until the Lead event is fired</h1> <div style="height: 120vh; width: 100vw; background-color: #00f;"></div> <h1 id="fb-fire-pixel">Lead event will fire when this phrase enters the screen</h1> <div style="height: 120vh; width: 100vw; background-color: #000;"></div> </body> </html> Cuando aparece el elemento h1 con id=fb-fire-pixel, debemos activar el evento estándar Lead. Para verificar que un elemento aparece en pantalla, agregamos el siguiente código a la página:

// This code should be loaded together with Meta Pixel

var executeWhenElementIsVisible = function(dom_element, callback) &#123;

 if (!(dom_element instanceof HTMLElement)) &#123;
 console.error(&#039;dom_element must be a valid HTMLElement&#039;);
 &#125;

 if (typeof callback !== &#039;function&#039;) &#123;
 console.error(
 &#039;Second parameter must be a function, got&#039;,
 typeof callback,
 &#039;instead&#039;,
 );
 &#125;

 function isOnViewport(elem) &#123;
 var rect = elem.getBoundingClientRect();
 var docElem = document.documentElement;
 return (
 rect.top >= 0 &&
 rect.left >= 0 &&
 rect.bottom <= (window.innerHeight || docElem.clientHeight) &&
 rect.right <= (window.innerWidth || docElem.clientWidth)
 );
 &#125;

 var executeCallback = (function() &#123;
 var wasExecuted = false;
 return function() &#123;
 if (!wasExecuted && isOnViewport(dom_element)) &#123;
 wasExecuted = true;
 callback();
 &#125;
 &#125;;
 &#125;)();

 window.addEventListener(&#039;scroll&#039;, executeCallback, false);
&#125;;Después de esto, debemos definir cómo activar el píxel cuando el elemento aparece en pantalla:

// Get the element that should be visible to trigger the pixel fire
var element = document.getElementById(&#039;fb-fire-pixel&#039;);

// Then, set the event to be tracked when element is visible
// Note that second parameter is a function, not a function call
executeWhenElementIsVisible(element, function() &#123;
 fbq(&#039;track&#039;, &#039;Lead&#039;);
&#125;);

## Activación de eventos según la longitud o el porcentaje de la página

Para este ejemplo, imagina que quieres realizar un seguimiento de los usuarios que leen hasta una longitud o un porcentaje de la página. El usuario no realiza ninguna acción además de desplazarse hasta la longitud o el porcentaje deseados de la página.

En este primer ejemplo, realizamos un seguimiento de la longitud de la página que el usuario leyó. En el ejemplo, activamos el píxel Lead cuando el usuario leyó hasta 500 px de longitud de la página.

var executeWhenReachedPageLength = function(length, callback) &#123;
 if (typeof length !== &#039;number&#039;) &#123;
 console.error(
 &#039;First parameter must be a number, got&#039;,
 typeof length,
 &#039;instead&#039;,
 );
 &#125;

 if (typeof callback !== &#039;function&#039;) &#123;
 console.error(
 &#039;Second parameter must be a function, got&#039;,
 typeof callback,
 &#039;instead&#039;,
 );
 &#125;

 function getWindowLength() &#123;
 return window.innerHeight || 
 (document.documentElement || document.body).clientHeight;
 &#125;

 function getCurrentScrolledLengthPosition() &#123;
 return window.pageYOffset || 
 (document.documentElement || document.body.parentNode || document.body).scrollTop;
 &#125;

 var executeCallback = (function() &#123;
 var wasExecuted = false;
 return function() &#123;
 if (!wasExecuted && getCurrentScrolledLengthPosition() > length) &#123;
 wasExecuted = true;
 callback();
 &#125;
 &#125;;
 &#125;)();

 if (getWindowLength() >= length) &#123;
 callback();
 &#125; else &#123;
 window.addEventListener(&#039;scroll&#039;, executeCallback, false);
 &#125;
&#125;;

executeWhenReachedPageLength(10, function() &#123;
 fbq(&#039;track&#039;, &#039;Lead&#039;);
&#125;);En el segundo ejemplo, realizamos un seguimiento del porcentaje de la página que el usuario leyó. En el ejemplo, activamos el píxel Lead cuando el usuario leyó el 75% de la página.

var executeWhenReachedPagePercentage = function(percentage, callback) &#123;
 if (typeof percentage !== &#039;number&#039;) &#123;
 console.error(
 &#039;First parameter must be a number, got&#039;,
 typeof percentage,
 &#039;instead&#039;,
 );
 &#125;

 if (typeof callback !== &#039;function&#039;) &#123;
 console.error(
 &#039;Second parameter must be a function, got&#039;,
 typeof callback,
 &#039;instead&#039;,
 );
 &#125;

 function getDocumentLength() &#123;
 var D = document;
 return Math.max(
 D.body.scrollHeight, D.documentElement.scrollHeight,
 D.body.offsetHeight, D.documentElement.offsetHeight,
 D.body.clientHeight, D.documentElement.clientHeight
 )
 &#125;

 function getWindowLength() &#123;
 return window.innerHeight || 
 (document.documentElement || document.body).clientHeight;
 &#125;

 function getScrollableLength() &#123;
 if (getDocumentLength() > getWindowLength()) &#123;
 return getDocumentLength() - getWindowLength();
 &#125; else &#123;
 return 0;
 &#125;
 &#125;

 var scrollableLength = getScrollableLength();

 window.addEventListener("resize", function()&#123;
 scrollableLength = getScrollableLength();
 &#125;, false)

 function getCurrentScrolledLengthPosition() &#123;
 return window.pageYOffset || 
 (document.documentElement || document.body.parentNode || document.body).scrollTop;
 &#125;

 function getPercentageScrolled() &#123;
 if (scrollableLength == 0) &#123;
 return 100;
 &#125; else &#123;
 return getCurrentScrolledLengthPosition() / scrollableLength * 100;
 &#125;
 &#125;

 var executeCallback = (function() &#123;
 var wasExecuted = false;
 return function() &#123;
 if (!wasExecuted && getPercentageScrolled() > percentage) &#123;
 wasExecuted = true;
 callback();
 &#125;
 &#125;;
 &#125;)();

 if (getDocumentLength() == 0 ||
 (getWindowLength()/getDocumentLength() * 100 >= percentage)) &#123;
 callback();
 &#125; else &#123;
 window.addEventListener(&#039;scroll&#039;, executeCallback, false);
 &#125;
&#125;;

executeWhenReachedPagePercentage(75, function() &#123;
 fbq(&#039;track&#039;, &#039;Lead&#039;);
&#125;);

## Activaciones demoradas de píxeles

Imagina que quieres realizar un seguimiento de los usuarios que interactúan con tu sitio web unos segundos antes de activar un evento del píxel. Puedes hacerlo con la función setTimeout.

// Delay pixel fire by 3 seconds
var seconds = 3;
setTimeout(function() &#123;
 fbq(&#039;track&#039;, &#039;Lead&#039;);
&#125;, seconds * 1000);Puede utilizarse para realizar un seguimiento de las visitas “de interacción” a una página, donde las personas no abandonen rápidamente la página, sino que realmente leen el contenido.

 

## Activación de eventos según los artículos vistos por sesión

Si quieres saber quién vio una determinada cantidad de artículos de tu sitio, puedes tener un contador de sesiones y cargar código del píxel de Meta cuando esto sucede.

Sabemos que una sesión es un grupo de interacciones del usuario con tu sitio web que pueden realizarse en un marco de tiempo determinado por solicitud del sitio. Puedes aumentar la cantidad de visitas a la página siempre que detectes actividades del usuario en un marco de tiempo.

Imagina que tienes la variable sessionCountViews por site_request; puedes agregar el código del píxel de Meta según la cantidad de visitas a la página que hayas contado.

Ejemplo de recuento solo para el sexto artículo visto

if (site_request.sessionCountViews == 6) &#123;
 fbq(&#039;track&#039;, "ViewContent", &#123;
 sessionCountViews: site_request.sessionCountViews,
 &#125;);
&#125;

## Seguimiento de evento selectivo con varios píxeles

Si hay varios píxeles en la misma página y quieres activar eventos de manera selectiva en cada píxel en particular, debes usar las capacidades trackSingle y trackSingleCustom.

Al usar la función track en las páginas donde hay varios píxeles inicializados (ya sea mediante una serie de códigos base o mediante la combinación en un solo código base), se puede generar una sobreactivación o un comportamiento inesperado. Por lo tanto, esta función debe aplicarse solo en situaciones específicas.

Ejemplo de activación de un evento PageView en ambos píxeles inicializados, y de activación selectiva de un evento estándar (Purchase) en un píxel y de un evento personalizado en un segundo píxel.

fbq(&#039;init&#039;, &#039;<PIXEL_A>&#039;);
fbq(&#039;init&#039;, &#039;<PIXEL_B>&#039;);
fbq(&#039;track&#039;, &#039;PageView&#039;); //fire PageView for both initialized pixels

// only fire the Purchase event for Pixel A
fbq(&#039;trackSingle&#039;, &#039;<PIXEL_A>&#039;, &#039;Purchase&#039;, &#123;
 value: 4,
 currency: &#039;GBP&#039;,
&#125;);

// only fire the custom event Step4 for Pixel B
fbq(&#039;trackSingleCustom&#039;, &#039;<PIXEL_B>&#039;, &#039;Step4&#039;,&#123;
 //optional parameters
&#125;);

## Seguimiento de eventos para píxeles individuales

En casos inusuales, es posible que desees enviar eventos a solo uno de los píxeles instalados en tu sitio web; por ejemplo, para restringir los datos enviados a uno de los píxeles de su sitio web. Estos métodos rastrean los disparos de píxeles para un solo píxel. Se llaman usando lo siguiente:

fbq(&#039;trackSingle&#039;, &#039;FB_PIXEL_ID&#039;, &#039;Purchase&#039;, customData);
fbq(&#039;trackSingleCustom&#039;, &#039;FB_PIXEL_ID&#039;, &#039;CustomEvent&#039;, customData);

## Configuración automática

El píxel de Meta enviará datos de clics de botones y metadatos de la página (como datos estructurados según formatos de Schema.org u Opengraph) desde tu sitio web para mejorar la entrega y la medición de los anuncios y automatizar la configuración del píxel. Para configurar el píxel de Meta a fin de que no envíe esta información adicional, en el código base del píxel de Meta, agrega fbq(&#039;set&#039;, &#039;autoConfig&#039;, &#039;false&#039;, &#039;FB_PIXEL_ID&#039;) arriba de la llamada init.

<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)&#123;
if(f.fbq)return;n=f.fbq=function()&#123;n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)&#125;;if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version=&#039;2.0&#039;;n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)&#125;(window,
document,&#039;script&#039;,&#039;https://connect.facebook.net/en_US/fbevents.js&#039;); 
// Line to enable Manual Only mode.
fbq(&#039;set&#039;, &#039;autoConfig&#039;, false, &#039;FB_PIXEL_ID&#039;); 
//Insert Your Facebook Pixel ID below. 
fbq(&#039;init&#039;, &#039;FB_PIXEL_ID&#039;); 
fbq(&#039;track&#039;, &#039;PageView&#039;);
</script>
<noscript>
<img height="1" width="1" style="display:none"src="https://www.facebook.com/tr?id=FB_PIXEL_ID ev=PageView noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->

## Política de seguridad de contenido

Si tu sitio web tiene una Política de seguridad de contenido, debes permitir que JavaScript cargue desde https://connect.facebook.net. Nota: El píxel carga scripts desde dos recorridos: /en_US/fbevents.js y /signals/config/&#123;pixelID&#125;?v=&#123;version&#125;.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Asistente para píxeles - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/support/pixel-helper

Asistente para píxeles - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Asistente para píxeles de Meta


## Información general

El asistente para píxeles es una extensión del navegador Chrome que se ejecuta en segundo plano y revisa automáticamente si los sitios web incluyen código del píxel de Meta.

 Cuando se instala la extensión, aparece el ícono a continuación (ícono del asistente para píxeles) en la esquina superior derecha del navegador, junto a la barra de direcciones.

Cuando un sitio web tiene un píxel de Meta instalado, aparece una pequeña insignia con un punto o un número que indica la cantidad de eventos de píxel activados en la página web actual. Si el ícono no tiene una insignia, no se instalaron píxeles de Meta en la página web. Cuando hagas clic en el ícono del asistente para píxeles, aparecerá una pequeña ventana emergente con información que podrás utilizar para verificar y mejorar el píxel, así como solucionar problemas relacionados.

 

## Instalar el asistente para píxeles


### Requisitos

Para usar el asistente para píxeles de Meta, debes hacer lo siguiente:

 - Usa el navegador web Chrome.
- Instala la extensión del asistente para píxeles desde Chrome Store.
- Inicia sesión en Facebook para acceder.
 

## Verificar la implementación del píxel

Accede al sitio web en el navegador Chrome y haz clic en el ícono del asistente para píxeles. El panel lateral te informará qué píxeles se encontraron en la página web y si se cargaron correctamente.

 

## Solución de problemas

El asistente para píxeles de Meta informa de errores y sugerencias con el objetivo de mejorar el rendimiento. Se verán en la página principal donde se muestran los píxeles, o bien podrán consultarse haciendo clic en un píxel o evento específico.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Tagging SPAs - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/implementation/tag_spa

Tagging SPAs - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Meta Pixel Implementation for Single Page Applications


Single Page Applications (SPA) does not require a page to be reloaded when the URL changes therefore a different approach to event tracking with the Meta Pixel has to be followed.


### Requirements


 
- The Pixel&#039;s base code must already be installed on the webpage where you will be tracking events.

 

Note: You can set disablePushState to true to stop sending PageView events on history state changes but it is not recommended.


 

## Track a an Action


Track a specific area where an action it taking place using the History State API. There is no one one-size fits all solution to this as it highly depends on the framework and the implementation details. The general idea is to track the event whenever there is a URL change in the SPA. Hooking it into the routing system of the framework or application is required.


#### Example Code


 ...
<body>
 <ul id="menu" class="clearfix">
 <li><a href="link1">Link 1</a></li> //Link to ViewContent
 <li><a href="link2">Link 2</a></li> //Link to AddPaymentInfo
 <li><a href="link3">Link 3</a></li> //Link to CompleteRegistration
 </ul>
...
 <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js"></script> 
 <script>
 (function($) &#123;
 var loadContent = function(href) &#123; // Simulates an AJAX call to the server to grab new content
 $.ajax(href + ".html", &#123;
 success: function(data) &#123;
 history.pushState(&#123; &#039;url&#039;: href &#125;, &#039;New URL: &#039; + href, href); // Called to the the URL on link click
 $(&#039;#content&#039;).html(data + new Date());

 var eventname = null; //Optional Section - Demonstrates that additional 
 switch (href) &#123; // events can be tracked on particular path changes
 case &#039;link1&#039;:
 eventname = &#039;ViewContent&#039;;
 break;
 case &#039;link2&#039;:
 eventname = &#039;AddPaymentInfo&#039;;
 break;
 case &#039;link3&#039;:
 eventname = &#039;CompleteRegistration&#039;;
 break;
 default:
 &#125;

 fbq(&#039;track&#039;, eventname) //Tracking event function is called
 &#125;,
 error: function() &#123;
 console.log(&#039;An error occurred&#039;);
 &#125;
 &#125;);
 &#125;;

 var init = function() &#123;
 $(&#039;#menu a&#039;).click(function(e) &#123;
 e.preventDefault();
 loadContent($(this).attr("href"));
 &#125;);
 &#125;;

 $(document).ready(function() &#123;
 init();
 &#125;);
 &#125;)(jQuery);
 </script>
</body>
... 

## Learn More


 
- Visit Google&#039;s Tag Manager documentation to track events using a tag manager

- Debug using DataLayer plugins or the Meta Pixel Helper to see event tracking

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Track Multiple Events - Píxel de Meta - Documentación - Meta for Developers
> https://developers.facebook.com/docs/facebook-pixel/implementation/accurate_event_tracking

Track Multiple Events - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Track Multiple Events with Meta Pixels


Implementing a Pixel is one of the cornerstones of Meta Marketing to help you measure, optimize your ads and create the most relevant audiences for your business. Quite often, planning the optimal setup for your site may simply be getting the base Pixel code on to your site and tagging key elements or critical parts of your funnel. But in some cases, you may legitimately need to have multiple Pixels on the site to satisfy business realities.


 

## Multiple Pixels


There are instances where multiple Pixels could be a viable option to manage your marketing needs—especially when there are multiple stakeholders involved.


Imagine your large organization deals with one agency (Agency A) for performance marketing and another agency for branding activity (Agency B). Agency A and B have different processes to update their tags (for example, tag managers/containers and ownership) and plan all their activity separately.


In this scenario, what would be the best recommendation to consolidate these multiple codes to reduce the maintenance burden, ensure the most accurate tracking and minimize the possibility of technical errors?


 

## Unexpected Behavior


The two following examples demonstrate instances where there may be unexpected behavior or extraneous Pixel events firing. This firing could skew reporting and yield undesirable results when working with multiple codes.


Consider the scenario where Agency A wants to track a Purchase in Pixel A and Agency B wants to track a custom event (Step4) on Pixel B. They&#039;ve installed two base codes on the same page to fire when it loads.


### Example: Two Pixels in Two Base Codes


The following code is installed:


<script>
 //... base code truncated
 &#039;https://connect.facebook.net/en_US/fbevents.js&#039;);
 fbq(&#039;init&#039;, &#039;PIXEL-A&#039;);
 fbq(&#039;track&#039;, &#039;PageView&#039;);
 fbq(&#039;track&#039;, &#039;Purchase&#039;, &#123;
 &#039;value&#039;: 4,
 &#039;currency&#039;: &#039;GBP&#039;
 &#125;);
</script>

<script>
 // ... base code truncated
 &#039;https://connect.facebook.net/en_US/fbevents.js&#039;);
 fbq(&#039;init&#039;, &#039;PIXEL-B&#039;);
 fbq(&#039;track&#039;, &#039;PageView&#039;);
 fbq(&#039;trackCustom&#039;, &#039;Step4&#039;); //fires for both Pixel A and B
</script>You expect Purchase events to be captured in Pixel A and Step4 to be captured in Pixel B; however, this isn&#039;t the case. The end result is summarized in the table:


 Pixel PageView Event Purchase Event Step4 Event Pixel A


 Fired


 Fired


 Fired (Why?)


 Pixel B


 Fired


 -


 Fired


 Even if there are two base Pixel codes, the fbevents.js code only downloads or loads once.


### Example: Two Pixel IDs in a Single Base Code


The following (modified) code is installed:


<script>
 // ... base code truncated
 &#039;https://connect.facebook.net/en_US/fbevents.js&#039;);
 fbq(&#039;init&#039;, &#039;PIXEL-A&#039;);
 fbq(&#039;track&#039;, &#039;PageView&#039;);
 fbq(&#039;track&#039;, &#039;Purchase&#039;, &#123;
 &#039;value&#039;: 4,
 &#039;currency&#039;: &#039;GBP&#039;
 &#125;);

 fbq(&#039;init&#039;, &#039;PIXEL-B&#039;);
 fbq(&#039;track&#039;, &#039;PageView&#039;);
 fbq(&#039;trackCustom&#039;, &#039;Step4&#039;); //fires for both Pixel A and B
</script>Nevertheless, the above code still yields the exact same overfiring behavior as above.


### Why do the above snippets yield unexpected results?


When the init function is called against a Pixel ID, it stores it in a global queue structure where any subsequent call to track or trackCustom is fired for any Pixel that was previously initialized.


In the previous example, this is why the Step4 custom event is fired for Pixel A, even when the trackCustom call is inserted after the initialization call for Pixel B. If unaware of this behavior, you may be firing extra events that may inadvertently affect reporting.


### New Capabilities—trackSingle and trackSingleCustom


In early November 2017, two new capabilities (trackSingle and trackSingleCustom) were added to the Pixel. These options enable you to selectively fire events for a specific Pixel—even when multiple Pixels are initialized on the page—without unexpected consequences.


For example, to fire the Purchase standard event only on Pixel A and Step4 custom event only on Pixel B, you can use the trackSingle or trackSingleCustom feature.


The following snippet selectively fires events on each Pixel by specifying the specific Pixel ID and the events or parameters required:


<script>
 //... base code truncated
 &#039;https://connect.facebook.net/en_US/fbevents.js&#039;);
 fbq(&#039;init&#039;, &#039;PIXEL-A&#039;);
 fbq(&#039;init&#039;, &#039;PIXEL-B&#039;);
 fbq(&#039;track&#039;, &#039;PageView&#039;); //fire PageView for both initialized pixels

 // only fire the Purchase event for Pixel A
 fbq(&#039;trackSingle&#039;, &#039;PIXEL-A&#039;, &#039;Purchase&#039;, &#123;
 value: 4,
 currency: &#039;GBP&#039;,
 &#125;);

 // only fire the custom event Step4 for Pixel B
 fbq(&#039;trackSingleCustom&#039;, &#039;PIXEL-B&#039;, &#039;Step4&#039;,&#123;
 //optional parameters
 &#125;);

</script>PixelPageView EventPurchase EventStep4 EventPixel A


 Fired


 Fired


 -


 Pixel B


 Fired


 -


 Fired


 

## Takeaways


Understanding the behavioral differences among track, trackSingle or trackSingleCustom is important when there&#039;s a possibility of multiple Pixels interacting on your page.


Using these new capabilities allows accurate tracking for multiple Pixels and ensures there&#039;s no conflicting or unexpected behavior when events are defined to fire.


 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->