# Coincidencias avanzadas - Píxel de Meta - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching

---

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
