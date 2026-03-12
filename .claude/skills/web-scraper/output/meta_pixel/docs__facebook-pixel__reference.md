# Referencia - Píxel de Meta - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/facebook-pixel/reference

---

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
