# Avanzado - Píxel de Meta - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/facebook-pixel/advanced

---

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
