# Empezar - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/get-started

---

Empezar - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Empezar

En esta página, se describe el proceso de implementación de la API de conversiones y se detallan los requisitos previos para la implementación. Si eres un socio externo que ofrece las funcionalidades de la API de conversiones a los anunciantes, tienes diferentes requisitos para empezar

 Si tu empresa tiene un firewall de solicitudes salientes, consulta Direcciones IP del rastreador y agentes de usuario para obtener las direcciones IP de Facebook. Ten presente que la lista de direcciones cambia con frecuencia.

 Los eventos de la web, las apps y los negocios físicos compartidos mediante la API de conversiones requieren parámetros específicos. La lista de parámetros obligatorios está disponible aquí.

 

## Información general del proceso

El proceso de configuración de una integración de la API de conversiones consta de los siguientes pasos de alto nivel:

 - Elegir el método de integración adecuado para tu caso.
- Completar los requisitos previos necesarios para ese método de implementación.
- Realizar la implementación siguiendo ese método de integración.
- Verificar la configuración y seguir las prácticas recomendadas que ayuden a mejorar el rendimiento del anuncio.
 

## Métodos de integración

Existen varios métodos de integración con la API de conversiones, que varían según el nivel de esfuerzo, el costo y las funciones que permiten activar. Consulta este artículo para obtener información sobre las opciones de configuración de la API de conversiones.

El enfoque principal de esta documentación para desarrolladores es compilar integraciones directas.

 

## Requisitos


### Identificador del píxel

Debes obtener un identificador del píxel para usar la API de conversiones. Si ya configuraste un píxel en tu sitio web, te recomendamos que uses el mismo identificador del píxel para tu navegador y los eventos del servidor.


### Administrador comercial

Para usar la API, también necesitas un administrador comercial. El administrador comercial ayuda a los anunciantes a integrar sus iniciativas de marketing de Facebook en sus empresas y con socios externos. Consulta el artículo del servicio de ayuda sobre cómo crear un administrador comercial si aún no tienes uno.


### Token de acceso

Para usar la API de conversiones, necesitas un token de acceso. Puedes obtener el token de acceso de dos maneras:

 - Usar el administrador de eventos (recomendado)
- Usar tu propia app
 

#### Usar el administrador de eventos (recomendado)

Para usar la API de conversiones, debes generar un token de acceso, que se pasa como un parámetro en cada llamada a la API. En el administrador de eventos, sigue estos pasos:

Paso 1: elige el píxel que quieres implementar.

Paso 2: selecciona la pestaña "Configuración".

 
Paso 3. busca la sección de la API de conversiones y haz clic en Generar token de acceso en "Configurar manualmente" y sigue las instrucciones de la ventana emergente:

Nota: El enlace para generar el token de acceso solo está visible para los usuarios de la empresa que tienen privilegios de desarrollador. No se muestra el enlace a otros usuarios.

 
Una vez que tengas el token, haz clic en el botón Administrar integraciones en la pestaña "Resumen" del administrador de eventos. En la pantalla de la ventana emergente, haz clic en el botón Administrar, que se ubica al lado de la API de conversiones. Esto crea automáticamente una app de la API de conversiones y un usuario del sistema de la API de conversiones para ti. No es necesario realizar una revisión de la app ni solicitar permisos.

 


#### Usar tu propia app

Si ya tienes tu propia app y tu propio usuario en el sistema, puedes generar el token en el administrador comercial. Sigue estos pasos:

Paso 1: accede a la Configuración de tu negocio.

Paso 2: asigna un píxel a tu usuario del sistema (también tienes la opción de crear un usuario del sistema nuevo en esta etapa).

Paso 3: selecciona el usuario del sistema asignado y haz clic en Generar token.

No es necesario someter tu app a revisión. No necesitas solicitar ningún permiso.

 Los tokens de acceso que se generaron en la pestaña de configuración de la API de conversiones en el administrador de eventos dejaron de estar restringidos a usarlos con la versión más nuevas de la API Graph que estaba disponible al momento de generarse el token. A partir de la versión 12.0, se pueden usar los tokens de acceso recientemente creados con todas las versiones de la API Graph disponibles.

 

## Recursos

 - Servicio de ayuda para empresas: Información sobre el administrador comercial
- Servicio de ayuda para empresas: Información sobre el Píxel de Meta
- Meta Blueprint: primeros pasos con la API de conversiones
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
