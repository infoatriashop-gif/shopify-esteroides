# Integración de clientes potenciales de conversión - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/guides/crm-integration

---

Integración de clientes potenciales de conversión - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Integración de API de conversiones para CRM

Es posible que ya tengas configurada la API de conversiones de Meta para que el negocio pueda cargar los eventos de servidor de tu tráfico web. Si usas Facebook o Instagram para generar clientes potenciales a fin de que tu negocio convierta ventas, también puedes usar la API de conversiones para cargar eventos offline desde tu sistema de administración de relaciones con los clientes (CRM). Generalmente, se trata de una integración distinta de la configuración actual de la API de conversiones, porque los parámetros obligatorios son diferentes y los datos provienen del sistema de CRM, en vez de los servidores web.

Si integras el CRM y usas el objetivo de rendimiento de clientes potenciales de conversión, puedes obtener clientes potenciales de mayor calidad y con mayores probabilidades de conversión. Por el momento, este objetivo de optimización solo es compatible con los anuncios para clientes potenciales de Facebook e Instagram (formularios instantáneos).

Es necesario que ya cuentes con una integración establecida para descargar clientes potenciales de Meta en tu CRM (se resaltan en verde en la imagen que se muestra a continuación). En esta guía completa, se explica el proceso de integración de CRM para volver a enviar datos de eventos de la porción inferior del embudo de CRM a Meta (se resaltan en rojo en la imagen que se muestra a continuación).

 

## Comprueba si tu negocio es una buena opción

Antes de comenzar a trabajar en la integración de la API de conversiones para CRM, debes comprobar si el negocio se adaptará bien al modelo de optimización. A continuación, encontrarás algunas normas que deberán cumplir las integraciones.

 - Usa los anuncios para clientes potenciales (formularios instantáneos) de Facebook/Instagram.
- Para obtener mejores resultados, asegúrate de que el identificador de clientes potenciales de Meta de entre 15 y 17 dígitos esté almacenado en tu CRM. Se recomienda enviar identificadores de clientes potenciales para cada evento. Si no tienes uno, sugerimos que envíes parámetros del cliente, como identificador de clic, número de teléfono o correo electrónico.
- Genera al menos 200 clientes potenciales por mes.
- La integración debe poder cargar datos con regularidad, al menos una vez al día.
- La etapa de cliente potencial que deseas optimizar se produce en un plazo de 28 días desde que se genera el cliente potencial.
- La etapa de cliente potencial que deseas optimizar tiene un porcentaje de conversiones que oscila entre 1% y 40%.
 

## Planifica la línea de tiempo del proyecto

Si crees que tu negocio se adapta bien a la optimización, puedes usar esta línea de tiempo estimada para planificar el proyecto. El tiempo estimado para evaluar el proyecto es, según los datos históricos, de 1 mes. Sin embargo, el calendario real puede variar para todos los anunciantes. La línea de tiempo dependerá de los recursos disponibles en lo que respecta a la toma de decisiones y la resolución de problemas en el marco de la integración.

 Sección Descripción Propietario de la tarea Duración estimada 1: Conectar el CRM con los anuncios para clientes potenciales

 Descargar automáticamente clientes potenciales de Facebook

 Anunciante

 Requisitos previos

 2: Primeros pasos con la integración del CRM

 Crear o seleccionar un píxel de Meta para los eventos del CRM

 Anunciante

 <1 día

 3: Implementar la integración de CRM (desarrollador)

 Conectar el CRM mediante la API de conversiones

 Anunciante

 Meta Business Partner <1 día

Entre 3 y 4 semanas﹡

 4: Verificar tus datos (no requiere acción del anunciante)

 Esperar la validación de los datos

 Meta

 Aprox. 1 a 2 días

 5: Configurar el embudo de ventas

 Configurar los eventos del embudo de ventas dentro del CRM

 Anunciante

 <1 día

 6: Fase de aprendizaje (no requiere acción del anunciante)

 Esperar el análisis del embudo y el período de entrenamiento ﹡﹡

 Meta

 2 a 4 semanas

 —

 Ejecutar campañas de optimización de clientes potenciales de conversión a pleno rendimiento

 Anunciante

 Tiempo total

 Aprox. 3 a 4 semanas

 ﹡ Se puede reducir la duración de este paso si se utiliza la integración con socios. ﹡﹡ Es posible realizar campañas de rendimiento de clientes potenciales durante el período de entrenamiento, pero no se verá el aumento del rendimiento hasta que el entrenamiento haya finalizado.

 

## Roles y responsabilidades

A continuación, se describen los roles que deben incluirse en el proyecto. Ten en cuenta que algunos roles pueden consolidarse o dividirse según la organización.

 Rol Responsabilidades Equipo de ventas y marketing

 - Suele ser el rol que inicia el proyecto e identifica el personal que requiere la organización para finalizar la integración.
- Tiene conocimiento detallado del proceso de ventas y de marketing, lo que le permite definir el embudo.
- Cuenta con los permisos necesarios para realizar las tareas en el administrador de anuncios y el administrador de eventos de Meta.
- Crea la integración entre el CRM y Meta, si se incluye una integración con socios, como Zapier.
 Administrador del CRM

 - Tiene conocimiento detallado de los campos y las funciones del CRM.
- Crea nuevos campos y procesos dentro del CRM, de ser necesario.
- Brinda asistencia a los especialistas en marketing y desarrolladores durante todo el proceso de integración.
 Desarrollador

 - Crea la integración entre el CRM y Meta, si se incluye una integración manual.
- Se asegura de que la integración manual funcione correctamente.
 → Siguiente 1: Connecting Your CRM With Lead Ads 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
