# Prácticas recomendadas - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices

---

Prácticas recomendadas - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Prácticas recomendadas: API de conversiones

Sigue estas prácticas recomendadas a fin de integrar correctamente la API de conversiones. Estas recomendaciones están diseñadas para ayudarte a usar la API de conversiones de la forma más efectiva. Sigue las recomendaciones de implementación y posimplementación para asegurarte de que la integración sea fluida y de obtener resultados óptimos cuando compartes datos con Meta.

Además de las siguientes prácticas recomendadas, te recomendamos que mires este video para ver un tutorial práctico sobre cómo usar la API de conversiones. En este video, aprenderás lo siguiente:

 - Enviar solicitudes
- Manejar eventos omitidos, fechas de transacción del evento y solicitudes por lotes
- Verificar eventos
- Usar la herramienta "Probar eventos"
 Los eventos de la web, las apps y los negocios físicos compartidos mediante la API de conversiones requieren parámetros específicos. La lista de parámetros obligatorios está disponible aquí.

 

## Implementación

Al configurar tu campaña, simplifica la estructura de la cuenta y utiliza las siguientes prácticas recomendadas establecidas para campañas:

 - Implementa las prácticas recomendadas de la fase de aprendizaje
- Evita realizar ediciones de campaña significativas
- Minimiza la superposición en la subasta
- Selecciona ubicaciones automáticas y optimización del presupuesto de la campaña
- Elige la estrategia de puja adecuada según tus objetivos comerciales
 

### Configurar eventos redundantes

Recomendamos que uses la API de conversiones además del píxel de Meta y que compartas los mismos eventos con ambas herramientas. A esta acción la denominamos configuración de evento redundante. Por ejemplo: si compartes los eventos Purchase, Initiate Checkout y Contact con el píxel de Meta, también deberías compartir esos mismos eventos desde tu servidor con la API de conversiones.

La API de conversiones te permite compartir eventos del sitio web que el píxel puede haber perdido por problemas de conectividad de la red o por errores que se produjeron al cargar la página. También se puede utilizar la API de conversiones para compartir otros tipos de información o eventos importantes que se producen offline o con posterioridad y que no se pueden compartir con el píxel.


### Asegurarse de duplicar los eventos redundantes

Al enviar eventos redundantes mediante el píxel de Meta y la API de conversiones, asegúrate de que ambos eventos tengan el mismo event_name y de incluir el event_id o una combinación de external_id y fbp. Recomendamos incluir todos estos parámetros para ayudar a que Meta deduplique de manera correcta los eventos y que reduzca los informes duplicados de eventos idénticos. Obtén más información sobre la deduplicación, cuándo es necesaria y cómo configurarla.


### Enviar parámetros requeridos y recomendados

Se requieren los siguientes parámetros para el evento del servidor y para la información del cliente:

 Parámetro Tipo Cuando se requiere action_source

 Evento del servidor

 Todos los eventos

 event_source_url

 Evento del servidor

 Todos los eventos del sitio web

 client_user_agent

 Información de clientes

 Todos los eventos del sitio web

 Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos. También recomendamos incluir los parámetros external_id y event_id en todos los eventos.

Enviar parámetros de información del cliente adicionales puede ayudar a aumentar la calidad de coincidencias de eventos. Solo se pueden utilizar eventos coincidentes para la atribución y la optimización de la entrega de los anuncios y, cuanto mayor sea la calidad de la coincidencia, mejor. Aunque no se puedan utilizar los eventos no coincidentes para la atribución y la optimización de la entrega de los anuncios, sí pueden usarse para mediciones básicas. Ejemplos de parámetros de información del cliente de alta calidad:

 - dirección de correo electrónico (em)
- dirección IP (client_ip_address)
- nombre (fn y ln)
- número de teléfono (ph)
 

### Requisitos de referencia para las coincidencias

Después del lanzamiento de la versión 13.0 de la API Graph, actualizaremos los requisitos de referencia sobre qué combinaciones de parámetros de información de los clientes se consideran válidas en un evento de la API de conversiones. Estos cambios nos ayudarán a brindar mejores comentarios cuando un evento tenga una combinación de parámetros de información de los clientes tan amplia que sea poco probable que sirva para mostrar coincidencias.

Un evento se considera no válido si solo incluye parámetros de información de los clientes que consisten en una de las siguientes combinaciones (o un subconjunto de ellas).

 - ct + country + st + zp + ge + client_user_agent
- db + client_user_agent
- fn + ge
- ln + ge
 Por ejemplo, si un evento tuviera solo los parámetros de información de los clientes ge, ct, st y country (que podrían corresponder a un hombre en Menlo Park, California, EE. UU.), se rechazaría porque esos parámetros de información de los clientes son un subconjunto de una de las combinaciones anteriores.


### Asegurarse de actualizar los parámetros fbp y fbc

Los parámetros fbp y fbc son valores de cookie que se establecen normalmente en los navegadores de los visitantes del sitio junto con la solución de cookies de origen de Meta, y pueden sufrir cambios. Si los envías como parámetros de usuarios, deberías actualizar con frecuencia los valores.

Estos valores se configurarán como cookies de origen cuando el píxel de Meta esté implementado en tu sitio web y pueden recuperarse para usarse en las solicitudes de la API de conversiones.


### Compartir eventos casi en tiempo real

Compartir eventos cuando ocurren puede contribuir a que tus campañas obtengan los mejores resultados. Puedes compartir eventos del servidor si utilizas la API de conversiones en tiempo real o en lotes casi en tiempo real.


### Utilizar "Probar eventos"

Recomendamos utilizar la herramienta "Probar eventos" para validar la conexión de la API de conversiones. En general, los desarrolladores deben utilizar sus propios parámetros de información del cliente (por ejemplo, nombre, dirección de correo electrónico, número de teléfono) para probar eventos, ya que es posible que se descarten dichos eventos si no coinciden con una cuenta de Facebook o Meta.

Puedes usar la herramienta "Probar eventos" para hacer lo siguiente:

 - Verificar que hayas configurado correctamente los eventos del servidor y que los hayamos recibido.
- Comprobar que hayas deduplicado correctamente los eventos. Para ello, debes ver qué eventos se procesaron y cuáles se deduplicaron.
- Depurar la actividad inusual.
 Obtén información acerca de cómo probar tus eventos del servidor con la herramienta "Probar eventos".


### Usar el Asistente de carga

Completa los campos de parámetros de datos recomendados y requeridos en la herramienta Asistente de carga a fin de ver cómo debería estructurarse tu carga para obtener recomendaciones de qué parámetros incluir.


### Usar nuestro SDK para empresas

Los ejemplos de código que se encuentran en nuestra documentación incluyen ejemplos de SDK para empresas en Python, Java, Ruby, PHP y Node. Pueden ayudar a ahorrar un poco de esfuerzo a la hora de desarrollar, por ejemplo, a la hora de convertir los parámetros de usuario a formato hash, lo que se hace de manera automática en el SDK para empresas.

 Si no estás pensando en usar el SDK para empresas, te recomendamos que implementes la conversión a formato hash.

 

### Usar la API de conversiones para eventos offline

La API de conversiones es compatible con todos los eventos offline y debería usarse como contenedor global para esos tipos de eventos. Ejemplos: ventas en tiendas físicas, llamadas telefónicas, acciones realizadas en dispositivos (como televisores inteligentes o consolas de juegos) y suscripciones offline.

Al enviar eventos offline, asegúrate de incluir el parámetro de evento action_source y selecciona el valor apropiado (en caso de que no sea website). Se requiere el origen de la acción a fin de determinar los objetivos de la campaña para la que se prevé el evento.

 Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos.

 

## Prácticas recomendadas para socios adicionales


### Agencias: enviar cadena partner_agent

Los socios o las agencias que comparten eventos en nombre de sus anunciantes deberían enviar una cadena partner_agent única, incluso el nombre de la plataforma como se señala en el documento. Si corresponde, trabaja con el representante específico de Meta para decidir cuál es la cadena de agente indicada.


### Plataformas de sitios web: anunciantes dedicados al registro

De forma predeterminada, los socios de la plataforma del sitio web pueden decidir si ofrecer API de conversiones de manera selectiva o activar anunciantes. El píxel de Meta y la API de conversiones comparten las mismas condiciones. Te recomendamos que actives tus clientes para compartir también sus datos usando la API de conversiones cuando configuren el píxel de Meta. Aunque consideremos que usar ambas herramientas te ayudará a fortalecer y asegurar el uso compartido de datos a largo plazo, también te sugerimos que les proporciones a tus clientes información sobre la API de conversiones y el píxel de Meta para que puedan tomar una decisión informada.

 

## Posimplementación


### Verificar la calidad de coincidencias de eventos

Si compartes eventos del servidor mediante la API de conversiones, puedes ver la calidad de coincidencias de eventos (EMQ) para cada evento en el administrador de eventos. La puntuación de la EMQ (sobre una base de 10) indica qué tan eficaz puede ser la información del cliente relacionada con el evento del servidor a la hora de asociarla con una cuenta de Facebook o Meta. Obtén más información sobre las prácticas recomendadas EMQ aquí.

La calidad de las coincidencias de eventos actualmente se encuentra disponible solo para eventos web. Para otros tipos de eventos, como los eventos offline y en tiendas físicas, los clientes potenciales de conversiones o cualquier integración en etapa alfa o beta, comunícate con tu representante de Meta a fin de recibir orientación sobre cómo mejorar la calidad de coincidencia de eventos.


### Realizar una prueba

Cuando uses la API de conversiones, te recomendamos que realices una prueba de la estrategia publicitaria de Meta y que la optimices. Las siguientes son algunas de las opciones de prueba:

 - Estudio del aumento de conversiones: entender el impacto incremental del rendimiento al usar eventos del servidor.
- Pruebas A/B: entender qué estrategia de campaña logra el mejor resultado y el más eficiente para optimizar el rendimiento.
 

## Más información

 - API de conversiones
- Implementación de extremo a extremo de la API de conversiones
- Parámetros fbp y fbc, API de conversiones
- Asistente de carga, API de conversiones
- Parámetros, API de conversiones
- API de conversiones offline
- Cadena partner_agent de la API de conversiones
- Deduplicación de eventos del píxel de Meta y de la API de conversiones, servicio de ayuda
- Solicitudes por lotes
- Probar eventos del servidor con la herramienta "Probar eventos", Servicio de ayuda
- SDK de Meta para empresas
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
