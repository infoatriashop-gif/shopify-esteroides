# Seguimiento de conversiones - Píxel de Meta - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking

---

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
