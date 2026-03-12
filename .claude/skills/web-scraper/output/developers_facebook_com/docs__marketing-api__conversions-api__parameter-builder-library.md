# Biblioteca del administrador de parámetros - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/parameter-builder-library

---

Biblioteca del administrador de parámetros - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Biblioteca del administrador de parámetros

La biblioteca del administrador de parámetros es una lista de SDK tanto en el lado del cliente (JavaScript del navegador) como en el lado del servidor (PHP, Java, Python, NodeJS, Ruby). Puedes implementar la biblioteca del administrador de parámetros para mejorar la calidad de la integración de la API de conversiones. La biblioteca puede ayudarte a crear, administrar y enviar determinados parámetros de información de los clientes, lo que puede generar mejoras en el rendimiento a través de mayores puntuaciones de calidad de coincidencia de eventos (EMQ). La biblioteca optimiza la administración de parámetros de eventos mediante lo siguiente:

 - Maximizar la calidad de coincidencia: genera automáticamente claves de coincidencia de la API de conversión de alta prioridad según las prácticas recomendadas de Meta.
- Mejorar la cobertura de parámetros: aumenta la cobertura de parámetros de eventos importantes, como fbc (identificador de clic de Meta), fbp (identificador de navegador de Meta) y direcciones IP.
- Garantizar un formato correcto: garantiza que la información de los clientes que compartes, como el correo electrónico y el número de teléfono, tenga el formato correcto para maximizar la probabilidad de coincidencia con los usuarios de Meta.
- Reducir el esfuerzo manual: minimiza el trabajo manual y el potencial de errores asociados a la administración de los parámetros de eventos por cuenta propia.
 

## Información general sobre las bibliotecas

Lado del cliente: la biblioteca y los eventos residen en el front-end del lado del navegador. Las bibliotecas se implementan en JavaScript. Los desarrolladores pueden integrarlas directamente en su página web.

Lado del servidor: las bibliotecas y los eventos residen en el back-end del lado del servidor. Según el lenguaje que se use en el back-end, Meta proporciona bibliotecas en diferentes lenguajes (PHP, Java, Python, NodeJS y Ruby).

 

## Funciones admitidas

Los parámetros admitidos son los siguientes:

 Parámetro admitido SDK admitido Descripción `fbc` (identificador de clic) cadena JavaScript en el lado del cliente

PHP

NodeJS

Java

Python

Ruby

 El valor del identificador de clics de Meta se almacena en la cookie del navegador _fbc en tu dominio. Consulta Administrar los parámetros fbc y fbp para averiguar cómo obtener o generar este valor a partir de un parámetro de consulta fbclid.

El formato es: fb.$&#123;subdomain_index&#125;.$&#123;creation_time&#125;.$&#123;fbclid&#125;.$&#123;appendix&#125;

Ejemplo: fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890.ABcDEFGh

 `fbp` (identificador de navegador) cadena JavaScript en el lado del cliente

PHP

NodeJS

Java

Python

Ruby

 El valor del identificador del navegador de Meta se almacena en la cookie del navegador _fbp en tu dominio. Consulta Administrar los parámetros fbc y fbp para obtener información sobre cómo obtener o generar este valor.

El formato es: fb.$&#123;subdomain_index&#125;.$&#123;creation_time&#125;.$&#123;random_number&#125;.$&#123;appendix&#125;

Ejemplo: fb.1.1596403881668.1116446470.ABcDEFGh

 `client_ip_address` (dirección IP del cliente) cadena

 JavaScript en el lado del cliente

PHP

NodeJS

Java (próximamente)

Python (próximamente)

Ruby (próximamente)

 La dirección IP del navegador correspondiente al evento debe ser una dirección IPV4 o IPV6 válida. En el caso de los usuarios que pueden usar una dirección IPV6, esta es preferible a la IPV4. El parámetro de datos de usuario client_ip_address nunca debe estar en formato hash.

Ejemplo:

IPV4: 168.212.226.204.ABcDEFGh

IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.ABcDEFGh

 Parámetros normalizados

 cadena - Correo electrónico (em)
- Número de teléfono (ph)
- Nombre (fn)
- Apellido (ln)
- Fecha de nacimiento (db)
- Género (ge)
- Ciudad (ct)
- Estado (st)
- Código postal (zp)
- País (country)
- Identificador externo (external_id)
 JavaScript en el lado del cliente

PHP

NodeJS

Java (próximamente)

Python (próximamente)

Ruby (próximamente)

 La dirección IP del navegador correspondiente al evento debe ser una dirección IPV4 o IPV6 válida. En el caso de los usuarios que pueden usar una dirección IPV6, esta es preferible a la IPV4. El parámetro de datos de usuario client_ip_address nunca debe estar en formato hash.

Ejemplo:

IPV4: 168.212.226.204.ABcDEFGh

IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.ABcDEFGh

 

## Formato admitido

Para todos los parámetros procesados por el administrador de parámetros, Meta agregará un campo de apéndice al final de cada parámetro para ayudar a evaluar el rendimiento de la biblioteca. El campo del apéndice tiene 8 caracteres que incluyen (1) la versión del SDK, (2) la incrementalidad y (3) el idioma del SDK.

Consulta Github para obtener información sobre la implementación. (ejemplo PHP)

Nota: Si ves el apéndice con solo dos caracteres, es un apéndice antiguo que solo contiene el idioma del SDK. Te recomendamos actualizar a la versión más reciente.

 

## Prácticas recomendadas

 - Implementar en todas las superficies: asegúrate de que las bibliotecas se apliquen a todas las superficies, como dispositivos móviles, computadoras y navegadores, y dominios de los que quieras hacer seguimiento.
- Bibliotecas del lado del cliente y del lado del servidor:

La biblioteca en el servidor es para la integración back-end del servidor. La biblioteca en el lado del servidor admite diferentes lenguajes (PHP, Java, Python, NodeJS y Ruby)
- La biblioteca en el lado del cliente se utiliza para la integración front-end en el navegador. Ten en cuenta que el lado del cliente solo está disponible en JavaScript.
 - Administración de cookies:

Captura las cookies cuanto antes. Asegúrate de guardar las cookies _fbp y _fbc cuanto antes en el recorrido del cliente en tu página web. Lo ideal sería obtener las cookies _fbp y _fbc cuando cargue la página de destino. No se recomienda recuperarlas solo de eventos de retención/fidelización o cuando se activan determinados eventos.
- Preserva el formato del valor de la cookie: no reemplaces ni modifiques las cookies _fbc ni _fbp. _fbc distingue mayúsculas de minúsculas, por lo que no hay que normalizar ni dar formato a _fbc en minúsculas.
 - Manejo de direcciones IP:

Prioriza el uso de IPv6 para getIpFn. Al implementar la funcionalidad getIpFn, recomendamos obtener primero la dirección IPv6 y, luego, recurrir a la dirección IPv4 si la capacidad de recuperación de la dirección IPv6 no está disponible en el lado del cliente del usuario.
- Se recomienda que integres tanto el administrador de parámetros en el lado del cliente como en el lado del servidor para lograr un rendimiento óptimo.

Usa el administrador de parámetros en el lado del cliente para recuperar el valor de client_ip_address y guardarlo en una cookie primero.
- Luego, usa el administrador de parámetros en el lado del servidor para obtener el mejor valor de "client_ip_address" disponible tanto de una cookie como de una solicitud para enviar a Meta usando la API de conversiones.
 - Normalización y hashing de datos:

Normaliza y hashea una sola vez. Recomendamos aplicar normalización y hashing a los parámetros de información de los clientes solo una vez, ya sea en el lado del cliente o en el lado del servidor, antes de enviarlos a Meta a través de la API de conversiones.
- El valor del parámetro distingue entre mayúsculas y minúsculas. Todos los valores de los campos de parámetros de información de los clientes que devuelve el administrador de parámetros distinguen entre mayúsculas y minúsculas. Puedes enviar estos valores a Meta a través de la API de conversiones sin realizar ninguna normalización (por ejemplo, uso de minúscula), ya que el SDK del administrador de parámetros lo hace automáticamente durante el proceso.
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
