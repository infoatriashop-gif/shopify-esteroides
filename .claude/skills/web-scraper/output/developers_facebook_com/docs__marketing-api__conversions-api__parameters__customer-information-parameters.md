# Parámetros de información del cliente - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters

---

Parámetros de información del cliente - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros de información del cliente

Los parámetros de información del cliente son un conjunto de identificadores de usuario que se comparten con la información de eventos. Para obtener más información sobre los parámetros obligatorios y recomendados, consulta Prácticas recomendadas; API de conversiones: Enviar parámetros requeridos y recomendados.

 En la API Graph v13.0, hay nuevos requisitos relacionados con las combinaciones de parámetros de información del cliente que se consideran válidos. Repasa las prácticas recomendadas para asegurarte de que no se interrumpan las integraciones de la API de conversiones.

 Consulta la Guía sobre privacidad y uso de datos de Meta para conocer qué datos se envían cuando se usa la API de conversiones.

Nuestros sistemas están diseñados para no admitir datos de clientes que representen información de contacto sin cifrar, excepto en los casos que se indican a continuación. La información de contacto es información que identifica a las personas, como nombres, direcciones de correo electrónico y números de teléfono, y que usamos únicamente con el fin de buscar coincidencias. Si usas el SDK de Meta para empresas, el formato hash se aplica automáticamente.

 

## Diferencias con el píxel

Puedes enviar muchos de los parámetros de información del cliente a través del píxel de Meta, aunque algunos (p. ej., client_user_agent) se envían de forma automática como parte del mecanismo de funcionamiento de internet. Por ejemplo, para enviar external_id a través del píxel, usa el siguiente código:

fbq(&#039;init&#039;, &#039;PIXEL_ID&#039;, &#123;&#039;external_id&#039;: 12345&#125;);Lee sobre los demás parámetros que puedes pasar con el píxel en la Documentación sobre coincidencias avanzadas.

A la inversa, asegúrate de aplicar al servidor el mismo conjunto de parámetros de información del cliente que tu sistema comparte con el navegador.

 

## Formato de los parámetros user_data

En tu solicitud, debes proporcionar al menos uno de los siguientes parámetros user_data con el formato correcto.

Nota: Si usas la biblioteca del administrador de parámetros, el formato contendrá un apéndice adicional al final de cada parámetro. Para obtener más información, consulta la página de la biblioteca del administrador de parámetros.

 Descarga este archivo CSV para ver ejemplos de datos normalizados y en formato hash de los parámetros que se indican a continuación.

 

 Descargar (hacer clic con el botón derecho > Guardar enlace como) Parámetro Descripción `em` Correo electrónico

 Cadena o lista <string> Se debe aplicar una función hash. Elimina los espacios iniciales y finales. Convierte todos los caracteres en minúsculas.

Ejemplo:

Entrada: John_Smith&#064;gmail.comFormato normalizado: john_smith&#064;gmail.comSalida de SHA256 esperada: 62a14e44f765419d10fea99367361a727c12365e2520f32218d505ed9aa0f62f

 `ph` Número de teléfono

 Cadena o lista <string> Se debe aplicar formato hash. Elimina los símbolos, las letras y los ceros iniciales. Los números de teléfono tienen que incluir un código de país para que podamos usarlos en la búsqueda de coincidencias (p. ej., si se trata de un número de teléfono de Estados Unidos, se debe anteponer un 1). Incluye siempre el código de país de los números de teléfono de los clientes aunque todos los datos correspondan al mismo país.

Ejemplo:

Entrada: Número de teléfono de EE. UU. (650)555-1212Formato normalizado: 16505551212Salida de SHA256 esperada:

e323ec626319ca94ee8bff2e4c87cf613be6ea19919ed1364124e16807ab3176

 `fn` Nombre

 Cadena o lista <string> Se debe usar cifrado. Se recomienda usar caracteres de la "a" a la "z" del alfabeto romano. No se pueden usar mayúsculas ni signos de puntuación. Si usas caracteres especiales, el texto se debe codificar en formato UTF-8.

Ejemplo:Entrada: MaryFormato normalizado: marySalida de SHA256 esperada: 6915771be1c5aa0c886870b6951b03d7eafc121fea0e80a5ea83beb7c449f4ec


Entrada: 정Formato normalizado: Carácter UTF-8 "정"Salida de SHA256 esperada: 8fa8cd9c440be61d0151429310034083132b35975c4bea67fdd74158eb51db14


Entrada: ValéryFormato normalizado: valérySalida de SHA256 esperada: 08e1996b5dd49e62a4b4c010d44e4345592a863bb9f8e3976219bac29417149c

 `ln` Apellido

 Cadena o lista <string> Se debe usar cifrado. Se recomienda usar caracteres de la "a" a la "z" del alfabeto romano. No se pueden usar mayúsculas ni signos de puntuación. Si usas caracteres especiales, el texto se debe codificar en formato UTF-8.


Consulta la sección sobre el parámetro "Nombre" (fn) para hallar ejemplos.

 `db` Fecha de nacimiento

 Cadena o lista <string> Se debe aplicar formato hash. Usamos el formato AAAAMMDD para unificar distintas combinaciones de mes, día y año con o sin puntuación.

 - Año: usa el formato AAAA desde 1900 hasta el año actual.
- Mes: usa el formato MM (del 01 al 12).
- Fecha: usa el formato DD (del 01 al 31).
 Ejemplo:

Entrada: 16/2/1997Formato normalizado: 19970216Salida de SHA256 esperada: 01acdbf6ec7b4f478a225f1a246e5d6767eeab1a7ffa17f025265b5b94f40f0c

 `ge` Género

 Cadena o lista <string> Se debe aplicar una función hash. Se debe indicar solo la inicial categoría de sexo, en minúscula.

Ejemplo:

 - "f" para femenino
- "m" para masculino
 `ct` Ciudad

 Cadena o lista <string> Se debe aplicar una función hash. Se recomienda usar caracteres de la "a" a la "z" del alfabeto romano. Solo puede contener minúsculas, no signos de puntuación, caracteres especiales ni espacios. Si usas caracteres especiales, el texto se debe codificar en formato UTF-8.

Ejemplo: paris london newyork

 `st` Estado

 Cadena o lista <string> Se debe aplicar formato hash. Usa el código de abreviatura ANSI de 2 caracteres, en minúscula. Normaliza los estados fuera de los EE. UU. en minúscula, sin puntuación, caracteres especiales ni espacios.

Ejemplo: az ca

 `zp` Código postal

 Cadena o lista <string> Se debe aplicar formato hash. Usa minúsculas sin espacios ni guion. Si se trata de un código postal de EE. UU., usa solo los 5 primeros dígitos. En el caso del Reino Unido, usa el formato de área, distrito y sector

Ejemplo: Código postal de EE. UU.: 94035 Código postal de Australia: 1987 Código postal de Francia: 75018 Código postal del Reino Unido: m11ae

 `country` País

 Cadena o lista <string> Se debe aplicar formato hash. Usa los códigos de país de 2 letras, en minúscula, en ISO 3166-1 alpha-2.Nota importante: Incluye siempre los países de tus clientes, incluso si todos los códigos son del mismo país. Buscamos coincidencias en una escala global, y este sencillo paso nos ayuda a asociar la mayor cantidad de cuentas del centro de cuentas posible de tu lista.

Ejemplo:Entrada: Estados UnidosFormato normalizado: usSalida de SHA256 esperada: 79adb2a2fce5c6ba215fe5f27f532d4e7edbac4b6a5e09e1ef3a08084a904621

 `external_id` Identificador externo

 Cadena o lista <string> Se recomienda aplicar formato hash. Cualquier identificador único del anunciante, como identificadores de membresías de fidelidad, identificadores de usuarios e identificadores de cookies externas. Puedes enviar uno o más identificadores externos para un evento determinado. Si un identificador externo se envía a través de otros canales, debe tener el mismo formato que cuando se envió a través de la API de conversiones.

 `client_ip_address` Dirección IP del cliente

 Cadena No aplicar formato hash. La dirección IP del navegador correspondiente al evento debe ser una dirección IPV4 o IPV6 válida. En el caso de los usuarios que pueden usar una dirección IPV6, esta es preferible a la IPV4. El parámetro de datos de usuario client_ip_address nunca se debe proteger con una función hash. Tampoco se deben incluir espacios. Proporciona siempre la dirección IP real para asegurarte de que los informes de eventos sean correctos.Nota: Esta información se agrega de forma automática a eventos enviados a través del navegador, pero se debe configurar manualmente en el caso de los eventos enviados a través del servidor.

Ejemplo:IPV4: 168.212.226.204IPV6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

 `client_user_agent` Agente de usuario del cliente

 Cadena No se debe cifrar. Agente de usuario del navegador correspondiente al evento. El parámetro client_user_agent es obligatorio si se trata de eventos de sitios web que se comparten mediante la API de conversiones.

Enviar los parámetros client_ip_address y client_user_agent para todos los eventos que envías a través de la API de conversiones podría ayudar a mejorar la coincidencia de eventos y también la entrega de anuncios de las campañas de anuncios, optimizando así los eventos que envías a través de la API de conversiones.Nota: Esta información se agrega de forma automática a eventos que se envían a través del navegador, pero se debe configurar manualmente para eventos que se envían a través del servidor.

Ejemplo: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36

 `fbc` Identificador de clic

 Cadena No se debe aplicar formato hash. El valor del identificador de clics de Facebook se almacena en la cookie del navegador _fbc en tu dominio. Consulta Administrar los parámetros fbc y fbp para averiguar cómo obtener o generar este valor a partir de un parámetro de consulta fbclid.

El formato es: fb.$&#123;subdomain_index&#125;.$&#123;creation_time&#125;.$&#123;fbclid&#125;.

Nota: Si usas la biblioteca del administrador de parámetros, el formato contendrá un apéndice adicional al final de cada parámetro. Para obtener más información, consulta la página de la biblioteca del administrador de parámetros.

Ejemplo:fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890

 `fbp` Identificador de navegador

 Cadena No se debe aplicar formato hash. El valor del identificador del navegador de Facebook se almacena en la cookie del navegador _fbc en tu dominio. Consulta Administrar los parámetros fbc y fbp para averiguar cómo obtener este valor.

El formato es fb.$&#123;subdomain_index&#125;.$&#123;creation_time&#125;.$&#123;fbclid&#125;.

Nota: Si usas la biblioteca del administrador de parámetros, el formato contendrá un apéndice adicional al final de cada parámetro. Para obtener más información, consulta la página de la biblioteca del administrador de parámetros.

Ejemplo: fb.1.1596403881668.1116446470

 `subscription_id` Identificador de suscripción

 Cadena No se debe cifrar. El identificador de suscripción del usuario de esta transacción; es similar al identificador del pedido de un producto.

 `fb_login_id` Identificador de inicio de sesión con Facebook

 Número entero No se debe aplicar formato hash. El identificador emitido por Meta cuando una persona inicia sesión por primera vez en una instancia de una app. También se conoce como identificador específico de la app.

 `lead_id` Identificador del cliente potencial

 Número entero No se debe aplicar formato hash. El identificador asociado a un cliente potencial generado por anuncios para clientes potenciales de Meta.

 `anon_id` Cadena No aplicar formato hash. El identificador de instalación. Este campo representa instancias de instalación de la app únicas.


Note: Este parámetro solo se usa en eventos de la app

 `madid` Cadena Tu identificador del anunciante y el identificador de publicidad de un dispositivo Android o el identificador de publicidad (IDFA) de un dispositivo Apple.

 `page_id` Cadena No se debe aplicar formato hash. El identificador de tu página. Especifica el identificador de la página asociado con el evento. Usa el identificador de la página de Facebook de la página asociada con el bot.

 `page_scoped_user_id` Cadena No se debe aplicar formato hash. Especifica el identificador de usuario específico de la página asociado con el bot de mensajes que registra el evento. Usa el identificador de usuario específico de la página suministrado a tu webhook.

 `ctwa_clid` Cadena No se debe aplicar formato hash. Identificador de clic generado por Meta para anuncios de clic a WhatsApp.

 `ig_account_id` Cadena No se debe aplicar formato hash.Identificador de la cuenta de Instagram que está asociada con el negocio.

 `ig_sid` Cadena No se debe aplicar formato hash. Los usuarios que interactúan con Instagram se identifican por identificadores de usuario específicos de Instagram (IGSID). El IGSID se puede obtener de este webhook.

 

## Más información

 - Parámetros de datos personalizados
- Guía sobre privacidad y uso de datos de Meta
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
