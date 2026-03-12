# Integración de Zapier - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/guides/zapier-integration

---

Integración de Zapier - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Integración de Zapier

Puedes aprovechar la plataforma de automatización de Zapier para enviar eventos a nuestra API de conversiones. Usa la app de Zapier de Facebook para enviar eventos automáticamente cada vez que algo cambie en tu origen de datos.

 

## Información general

Zapier es una herramienta de automatización en línea que puedes usar para conectar dos o más apps. En este caso, estamos conectando dos apps. Seleccionas en la primera app un evento de activación que hace que un evento de acción suceda en la segunda app. La primera app puede ser cualquier origen de datos que uses. La segunda app debe ser conversiones de Facebook.

Una vez configurada la conexión, cada vez que se activa tu origen de datos, nuestra app envía un evento a la API de conversiones. Por ejemplo, cuando se agrega una nueva compra a tu origen de datos, este evento se publica en nuestra API.

 

## Cómo se usa


#### Paso 1:

Visita zapier.com. Luego, regístrate o inicia sesión con las credenciales creadas anteriormente. En el menú del lado izquierdo, haz clic en Hacer un Zap.


#### Paso 2: Selecciona el origen de datos y el activador

A continuación, Zapier te pide que configures tu activador. En Cuando esto suceda, elige App y Evento de activación.

En este caso, la app es el origen de datos. Un ejemplo de esto sería Hojas de cálculo de Google.

El evento de activación se refiere a la acción que debe ocurrir en tu origen de datos para que se active la automatización. Volviendo al ejemplo de Hojas de cálculo de Google, algunos de los posibles activadores de Zapier son los siguientes:

 - Fila de hoja de cálculo nueva: se activa cuando se agrega una nueva fila a la parte inferior de una hoja de cálculo.
- Fila de hoja de cálculo nueva o actualizada: se activa cuando se agrega o se modifica una nueva fila en una hoja de cálculo.
 Selecciona el evento de activación de Zapier que tenga más sentido en función de tus necesidades publicitarias.

 Debes configurar tu origen de datos para que coincida con el esquema de eventos de Facebook. En lo que respecta a las hojas de cálculo de Google, configura los campos de la hoja de cálculo para que se correspondan a nuestros campos de eventos.

 

#### Paso 3: Selecciona los eventos que deseas publicar

Después de haber terminado con Cuando esto suceda, puedes configurar la segunda parte de la automatización en Hacer esto. De nuevo, debes seleccionar App y Evento de acción.

Aquí, la app debería ser conversiones de Facebook. Aquí es donde quieres enviar la información que viene de tu origen de datos.

Los eventos de acción son aquellos que quieres enviar a nuestra API. Algunos ejemplos de eventos de acción son compra, clientes potenciales y otros eventos. Aquí encuentras una lista de eventos estándar del píxel de Meta; también puedes enviarnos eventos personalizados.


#### Paso 4: Activa Zap

Ahora puedes activar tu Zap. Una vez hecho esto, es necesario publicar un evento en la API de conversiones cada vez que se produzca de tu parte un evento de activación.

Para finalizar el ejemplo de hojas de cálculo de Google, considera que creamos un Zap con estas características:

 - Usa hojas de cálculo de Google como fuente de datos.
- Tiene "Fila de hojas de cálculo nueva" como evento activador.
- Tiene Purchase como evento de acción.
 Una vez activado este Zap, se publica un evento de compra en nuestra API cada vez que se agrega una nueva fila a la hoja de cálculo de origen.

 

## Recursos

 - Primeros pasos con Zapier
- Consejos relativos a la app de Zapier
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->
