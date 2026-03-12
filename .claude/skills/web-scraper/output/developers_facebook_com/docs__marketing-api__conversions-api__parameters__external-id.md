# Identificador externo - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/external-id

---

Identificador externo - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Identificador externo

Tipo de objeto: cadena o matriz de cadenas | Se recomienda cifrado

El identificador externo es una cadena que representa a un usuario en el sistema de un anunciante, como identificadores de programa de fidelización, identificadores de usuario e identificadores de cookies externos. Puedes enviar uno o varios external_id para un evento determinado, y tratamos de encontrar una coincidencia con alguien en Facebook.

Los identificadores externos se pueden enviar a través de varios canales, incluso el píxel del navegador, la API de conversiones y la API de conversiones offline (OCAPI). Debes ser consistente entre los distintos canales. Por ejemplo, si envías un evento de píxel del navegador con external_id configurado en 123, tu evento de la API de conversiones del mismo usuario también debe tener external_id configurado en 123.

Para verificar los external_id enviados por medio del píxel del navegador, busca el asistente del píxel en los Parámetros de coincidencias avanzadas enviados. Los external_id no están disponibles en la herramienta "Probar eventos".

 

## Por qué debes usar este recurso

Como anunciante, ya puedes asignar tu propio identificador a los usuarios que visitan tus propiedades. El campo external_id te permite aprovechar estos identificadores para lo siguiente:

 - Escala tu negocio: una vez que proporciones external_id, se puede utilizar de nuevo en diferentes canales y para crear diferentes públicos. Por tu parte, solo asigna external_id a tu sistema de identidad interna y ya no necesitas administrar una gran cantidad de información de identificación personal.
- Mejora el porcentaje de coincidencias y aprovecha las coincidencias en todos los canales: mejora los porcentajes de coincidencias en los canales en los que no tienes acceso a ciertos identificadores, y utiliza la información que proviene de otro canal. Consulta Ejemplo: utilizar el tipo de coincidencia en canales.
- Crear tus propios públicos: consulta Creación del público.
- Aumenta la seguridad y la privacidad: en lugar de subir varias veces información de identificación personal cifrada, puedes enviar tus external_id con la información de identificación personal una sola vez y puedes volver a utilizar esa coincidencia.
 

## Cómo funciona


### Paso 1

Nos envías un evento con external_id y varios otros parámetros de información de cliente. El evento puede enviarse a través de diferentes canales, incluso el píxel del navegador, la API de conversiones y la API de conversiones offline.


### Paso 2

Por nuestra parte, buscamos una coincidencia, para lo que usamos toda la información que nos proporcionaste. Si encontramos una coincidencia, asociamos el external_id que proporcionaste con ese usuario específico.


### Paso 3

En los eventos siguientes, puedes enviarnos un evento que contenga solo external_id. Por nuestra parte, mantenemos la asociación previamente configurada entre tu external_id y el usuario de Facebook con el que hubo coincidencia.

El external_id del usuario específico caduca periódicamente. Se recomienda que lo refresques tan seguido como sea posible.


### Ejemplo: utilizar el tipo de coincidencia en canales

 - Tienes un sitio web con el píxel del navegador.
- Un usuario ve un producto específico en tu sitio web.
- Nos envías un evento ViewContent mediante el píxel del navegador con información de cliente cifrada. Incluye el correo electrónico y el identificador externo de ese usuario, ambos cifrados. El píxel incluye automáticamente información de cookies.
- Usamos el correo electrónico cifrado para encontrar una coincidencia. Recordamos la asignación de external_id con dicho usuario de Facebook.
- Un par de días después, el mismo usuario realiza una compra en tu sitio web.
- Nos envías un nuevo evento. Esta vez, utilizas la API de conversiones. En el evento, incluye external_id.
- Recibimos tu external_id. Vemos que se estableció una coincidencia con los datos que se enviaron mediante el píxel. Podemos aprovechar la asignación previa en la API de conversiones.
 

### Ejemplo: caso de uso de socios

Utiliza external_id para reportar conversiones que ocurren en el sitio web de un socio. En ese caso, el proceso se ve así:

 - El usuario se encuentra en tu sitio web y hace clic en el sitio web del socio.
- Envías un evento de píxel y un external_id a Facebook. Envías a tu socio una solicitud de redireccionamiento que incluye external_id.
- El usuario completa una conversión en el sitio web del socio.
- Tu socio te envía información de conversión, que incluye external_id. Tu socio no debe compartir información confidencial.
- Nos envías otro evento, que incluye la nueva información de conversión y el external_id correspondiente.
 

## Creación de públicos

Es imperativo que seas coherente en el uso de los external_id entre el píxel del navegador, la API de conversiones y la API de conversiones offline y los eventos de la app. De esta manera, puedes utilizar los external_id para crear los siguientes tipos de públicos:

 - Públicos personalizados de sitio web
- Públicos personalizados de apps para celulares
- Públicos personalizados offline
- Públicos similares entrenados en públicos personalizados de sitio web, públicos personalizados de apps para celulares y públicos personalizados offline
 Ten en cuenta que los públicos personalizados de un archivo del cliente no figuran aquí. Este tipo de público utiliza políticas diferentes y no se puede crear únicamente con external_id ni extern_id a partir de los datos recibidos mediante la API de conversiones.

 

## Parámetro de FBP

Deberías agregar external_id a tus eventos siempre que puedas. Sin embargo, si tu sistema no está configurado para hacerlo, podemos solucionar el problema utilizando el parámetro fbp como identificador externo. Más información sobre el parámetro fbp.

 Situación Cómo se manejan los datos El evento incluye fbp, pero no external_id

 Usamos fbp como external_id, e intentamos encontrar una coincidencia. Como fbp es una cookie del navegador, tiene fecha de caducidad.

 El evento incluye fbp y external_id

 Guardamos ambos campos e intentamos encontrar una coincidencia. Siempre se prefiere external_id, ya que ofrece mejor rendimiento.

 El evento incluye external_id, pero no fbp

 Se procesa como evento regular que incluye external_id.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
