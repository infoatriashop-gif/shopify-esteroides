# Manejo de eventos duplicados - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events

---

Manejo de eventos duplicados - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Manejo de eventos de píxel y de API de conversiones duplicados

Para lograr un rendimiento óptimo de los anuncios, recomendamos a los anunciantes que implementen la API de conversiones junto con el píxel de Meta. Podrás encontrar aquí detalles y más información sobre este enfoque recomendado que denominamos "configuración redundante".

Cuando los anunciantes usan una configuración redundante, deben configurar un método de deduplicación para garantizar que el sistema de entrega de anuncios pueda diferenciar entre eventos diferentes y superpuestos. En este documento se describen varias opciones de métodos de deduplicación que ayudan a Facebook a deduplicar eventos.

Los anunciantes que no envían el mismo evento dos veces a través de la API de conversiones y el píxel de Meta no necesitan configurar la deduplicación para esos eventos.

 La API de conversiones ahora permite a los anunciantes enviar eventos de tiendas web, de apps y físicas a Meta a través de un único punto de conexión en lugar de varios. Obtén más información sobre la API de conversiones.

 

## Opciones de deduplicación de eventos

Facebook intenta deduplicar los eventos idénticos enviados mediante el píxel de Meta y la API de conversiones. Podemos deduplicar los eventos de dos maneras:


### Identificador del evento y nombre del evento (recomendada)


#### Parámetros obligatorios

En este enfoque, se agrega el parámetro event_id a los eventos desde la API de conversiones y el píxel del navegador. El parámetro event_id es un identificador que puede distinguir con precisión eventos similares. Obtén más información sobre el parámetro event_id.


#### Descripción del enfoque

Determinamos si los eventos son idénticos en función del identificador y el nombre. Entonces, para que se deduplique un evento:

 - En los eventos correspondientes, el valor de eventID del píxel de Meta debe coincidir con el valor de event_id de la API de conversiones.
- En los eventos correspondientes, el valor de event del píxel de Meta debe coincidir con el valor de event_name de la API de conversiones.
 Una vez que se reciben los eventos, empleamos una serie de estrategias para la desduplicación entre los eventos que pueden ayudar a mejorar la optimización y la medición. Si los contenidos de los eventos del servidor y del navegador no difieren considerablemente, por lo general preferimos el evento que se recibe primero.

Ten en cuenta que el parámetro eventID del píxel es el cuarto argumento de la llamada de seguimiento fbq.

Ejemplo

fbq(&#039;track&#039;, &#039;Purchase&#039;, &#123;value: 12, currency: &#039;USD&#039;&#125;, &#123;eventID: &#039;EVENT_ID&#039;&#125;);


### FBP o identificador externo


#### Parámetros obligatorios

En este enfoque, debes usar event_name, fbp y/o external_id de manera coherente en los eventos de navegador y servidor. Consulta Parámetros de información de los clientes para obtener más detalles sobre los parámetros external_id y fbp.


#### Descripción del enfoque

Si configuraste los parámetros external_id y/o fbp para que se pasen a través del navegador y el servidor, nos ocuparemos de eliminar automáticamente los eventos duplicados. El proceso funciona del siguiente modo:

 - Nos envías un evento de navegador con event_name, fbp y/o external_id.
- Luego, nos envías un evento de servidor con event_name, fbp y/o external_id.
- Comparamos el evento de servidor con el evento de navegador que enviaste primero. Más específicamente, comparamos las combinaciones de event_name y fbp y/o external_id.
- Empleamos una serie de estrategias para la desduplicación entre los eventos que pueden ayudar a mejorar la optimización y la medición. Si los contenidos de los eventos del servidor y del navegador no difieren considerablemente, por lo general preferimos el evento que se recibe primero.
 

#### Límites del enfoque

Este método de deduplicación tiene las siguientes características:

 - Generalmente, solo funciona para desduplicar eventos enviados primero desde el navegador y luego a través del servidor. No se descartan eventos de servidor si no se recibió un evento de navegador en las últimas 48 horas, incluso si se recibe un evento de navegador idéntico después del evento de servidor.
- No deduplica eventos cuando se utiliza un solo origen de eventos, es decir, solo de navegador o solo de servidor. Si nos envías dos eventos de navegador consecutivos con la misma información, no descartamos ninguno. Si nos envías dos eventos de servidor consecutivos con la misma información, no descartamos ninguno.
 

## Configuración de deduplicación en el píxel del navegador

Para mejorar las coincidencias, necesitamos información precisa de tus eventos provenientes tanto del píxel de Meta como de la API de conversiones:

 - El valor de eventID dentro del parámetro opcional eventData debe ser único. Según la implementación del píxel de Meta, puedes usar lo siguiente:
 track: envía el evento de todos los píxeles de la página
 fbq(&#039;track&#039;, &#039;Purchase&#039;, &#123;value: 12, currency: &#039;USD&#039;&#125;, &#123;eventID: &#039;EVENT_ID&#039;&#125;);
- trackSingle: envía el evento de un píxel
 fbq(&#039;trackSingle&#039;, &#039;SPECIFIC_PIXEL_ID&#039;, &#039;Purchase&#039;, &#123;value: 12, currency: &#039;USD&#039;&#125;, &#123;eventID: &#039;EVENT_ID&#039;&#125;);
- Una etiqueta de píxel de imagen con el parámetro eid<img src="https://www.facebook.com/tr?id=PIXEL_ID&ev=Purchase&eid=EVENT_ID"/>
 
 
 Si el evento que compartes no contiene parámetros como valor y divisa, puedes configurarlo de la siguiente manera:
 
 fbq(&#039;track&#039;, &#039;Lead&#039;, &#123;&#125;, &#123;eventID: &#039;EVENT_ID&#039;&#125;);- El valor de eventID del píxel de Meta debe coincidir con el valor de event_id en el evento correspondiente proveniente de la API de conversiones.
- Si detectamos que se envió la misma combinación de clave de servidor (event_id y event_name) y de clave de navegador (eventID y event) al mismo identificador del píxel en un plazo de 48 horas, descartamos los eventos subsiguientes.
- Si nos envías tus eventos a través del navegador y de la API de conversiones junto con event_ids similares, ten en cuenta que los eventos solo se deduplican si se reciben dentro de un plazo de 48 horas después de que recibimos el primer evento con un event_id determinado.


## Verificar la configuración de deduplicación

Obtén información sobre cómo verificar la configuración de deduplicación y combinación de eventos en la documentación sobre cómo verificar la configuración.

 

## Más información

 - Parámetros
- Asistente de carga
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
