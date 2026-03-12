# Solución de problemas - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/support

---

Solución de problemas - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Solución de problemas

Todas las API de Facebook comparten la misma infraestructura. Si buscas en el sitio web de los desarrolladores de Facebook, puedes encontrar información más relevante que se relacione con tu situación específica. También puedes visitar la página de ayuda para desarrolladores, verificar abrir errores y consultar el foro de la comunidad de desarrolladores de Facebook.

 

## Depuración

La API de conversiones devuelve datos mínimos para conservar el ancho de banda de la red. Si la carga útil del evento es válida, se devuelve un código de respuesta 2xx HTTP. Si no es válido, se devuelve un código de respuesta 4xx HTTP, con detalles mínimos del error en el cuerpo de respuesta.

 

## Errores de la API

Los errores de red o las solicitudes con formato incorrecto pueden provocar que se omitan los eventos. Recomendamos volver a realizar la solicitud en los casos en los que la respuesta indique un error no relacionado con el cliente, como tiempo de espera. A fin de considerar los diversos retrasos en la red, recomendamos configurar un tiempo de espera de 1.500 milisegundos en la solicitud. Para la mayoría de las solicitudes, el tiempo de respuesta será inferior a 600 milisegundos.

 

## Servicio de ayuda para empresas

 - Prácticas recomendadas relacionadas con la API de conversiones
 

## Meta Blueprint

 - Solucionar problemas de la API de conversiones
 

## Más información

 - Preguntas frecuentes y prácticas recomendadas del administrador comercial
- Extensión para Chrome del asistente para píxeles
- Preguntas frecuentes para desarrolladores
- Grupo de la comunidad de desarrolladores de Facebook
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
