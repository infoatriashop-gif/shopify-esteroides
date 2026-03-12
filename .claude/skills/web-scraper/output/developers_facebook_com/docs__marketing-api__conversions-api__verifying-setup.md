# Verificación de la configuración - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/verifying-setup

---

Verificación de la configuración - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Verificar tu configuración

Esta página detalla formas de verificar que tu configuración funcione correctamente y está diseñada para ayudarte a mejorar el rendimiento de las publicidades. El proceso para verificar tu configuración consiste en lo siguiente:

 - Verificar que los eventos se reciben correctamente
- Verificar que los eventos se envíen lo más cercano al tiempo real como sea posible
- Verificar que los eventos se dedupliquen correctamente
- Verificar que los eventos se corresponden con usuarios con alta precisión
 

## Verificar que los eventos se reciben correctamente


### Eventos de supervisión recibidos

Después de que envía tus eventos, confirmamos que los recibimos en el administrador de eventos. Puedes verificarlos dentro de los 20 minutos después de enviarlos.

 Curso de Meta Blueprint: Configurar, implementar y verificar la API de conversiones

 Para supervisar eventos recibidos en el administrador de eventos, en la página "Orígenes de datos", haz clic en el píxel que corresponde al PIXEL_ID de tu solicitud POST. Para obtener más información, consulta el Servicio de ayuda para empresas: Navegar por el administrador de eventos.

Luego, haz clic en Información general. Aquí verás el número de eventos que recibimos antes de deduplicarlos, descartarlos debido a controles de consentimiento y por aplicación de otras políticas, o procesarlos. En Método de conexión, puedes ver el canal a través del que se envió el evento. Puedes hacer clic en el tipo de evento para obtener información más específica.


### Supervisar la actualización de eventos

Para ayudar a Facebook a optimizar tus anuncios, recomendamos que minimices el tiempo que transcurre entre que se produce un evento (representado por el parámetro event_time) y se comparte con Facebook, para que sea lo más cercano al tiempo real posible.

Puedes utilizar el administrador de eventos para supervisar la actualización de los eventos. En la página de Información general de un píxel determinado, haz clic en el botón Detalles del evento para obtener información más específica sobre el evento. En esta página, ve a la pestaña de Actualización de eventos. En esta pestaña, puedes ver el tiempo de retraso promedio de los eventos en una escala de tiempo real a semanal.

 

## Verificar que los eventos se dedupliquen correctamente

Para lograr un rendimiento óptimo de los anuncios, recomendamos a los anunciantes que implementen la API de conversiones junto con el píxel de Meta. Si los anunciantes lo hacen de esta manera, es necesario que configuren un método de deduplicación que permita garantizar que el sistema de entrega de anuncios es capaz de diferenciar entre eventos diferentes y superpuestos. Obtén más información sobre deduplicación.

Puedes utilizar el administrador de eventos para supervisar el porcentaje de eventos que se deduplicaron. En la página de Información general de un píxel determinado, haz clic en el botón de Detalles del evento para obtener información más específica sobre el tipo de evento. En esta página, ve a la pestaña de Deduplicación de eventos.

Esta pestaña muestra la siguiente información:

 - Tasa de eventos deduplicados: este es el porcentaje de eventos que se deduplicaron de los orígenes de eventos. A mayor porcentaje, mejor es, y se mostrará una advertencia cuando tu tasa de deduplicación sea demasiado baja. Puede mejorar las tasas de deduplicación agregando más parámetros de deduplicación al evento.
- Tasa de uso de claves de deduplicación: este es el porcentaje de eventos de cada origen que contenían cada clave de deduplicación. "Superposición" es el porcentaje de eventos con una clave de deduplicación determinada que se reciben de ambos orígenes (como un porcentaje del origen con la menor cantidad de eventos recibidos). Tener una "superposición" bajo significa que la implementación envía claves de deduplicación no únicas desde un origen o algún origen, o bien envía eventos con una clave de deduplicación desde un solo origen.
 

## Verificar que los eventos se corresponden con usuarios con alta precisión

Cuando tus eventos se corresponden con personas con una cuenta de Facebook, tus eventos se pueden usar mejor atribuir y optimizar anuncios. En el administrador de eventos, puedes supervisar la calidad de las coincidencias de eventos, una medida que indica qué tan eficaces son los parámetros de la información del cliente relacionada con el evento del servidor a la hora de asociarla con una cuenta de Facebook.

La puntuación de calidad de las coincidencias de eventos va del 1 al 10. Puedes supervisar la calidad de las coincidencias de eventos de dos maneras:

 - Ir a la página Información general de un píxel de Meta determinado con la API de conversiones
- Usar la API de calidad de configuración
 Tener una puntuación de calidad alta de las coincidencias de eventos puede ayudar a disminuir tu costo por acción. Cuando sea posible, recomendamos que intentes obtener una puntuación de calidad de las coincidencias de eventos de 6,0 o superior. Puedes hacer clic en el puntaje de calidad de las coincidencias de eventos para ver detalles adicionales y recomendaciones para mejorar la calidad de las coincidencias de eventos. Obtén más información sobre las prácticas recomendadas en relación con la calidad de las coincidencias de eventos.

 

## Consulta también

 - API de calidad de configuración
- Meta Blueprint: Configurar, implementar y verificar la API de conversiones
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
