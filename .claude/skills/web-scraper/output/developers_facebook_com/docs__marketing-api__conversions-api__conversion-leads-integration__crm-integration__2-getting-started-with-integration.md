# 2: Comenzar con la integración - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/2-getting-started-with-integration

---

2: Comenzar con la integración - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# 2: Comenzar con la integración del CRM

Esta guía incluye lo siguiente:

 - Crear una nueva campaña de anuncios para clientes potenciales
- Crear un nuevo píxel de CRM de Meta o convertir un píxel existente
- Elegir un método de integración
 

## Paso 1: Crear una campaña de anuncios para clientes potenciales (opcional)

Esta sección es opcional si ya tienes campañas de anuncios para clientes potenciales existentes. Ten en cuenta que el objetivo de optimización no se puede cambiar en las campañas publicadas, pero puede duplicar las campañas existentes, y, luego, cambiar el objetivo de la optimización.

 - Inicia sesión en tu cuenta comercial del administrador de anuncios. (Los clientes potenciales de conversión no están disponibles a través de cuentas publicitarias personales ni a través de interfaces simplificadas).

- Haz clic en el botón + Crear para crear una nueva campaña. En la ventana Elegir un objetivo de campaña, selecciona el objetivo Clientes potenciales y, luego, haz clic en Continuar.

- En la configuración de nivel del conjunto de anuncios, selecciona formularios instantáneos en Ubicación de conversión.

- En Optimización y entrega del conjunto de anuncios, haz clic en el botón Editar para Optimizar para la entrega de anuncios y elige el objetivo Conversión de clientes potenciales en el menú desplegable. La API de conversiones para integración de CRM no es un requisito para empezar a ejecutar campañas con el objetivo de rendimiento de clientes potenciales de conversión. Sin embargo, verás mejores resultados si dicho objetivo está completamente integrado.
 

## Paso 2: Crear un conjunto de datos del CRM de Meta

Esta sección te mostrará píxel de Meta para tu CRM.

Nota: Necesitarás tener acceso de administrador para crear o convertir un píxel.

 - En el administrador de eventos, haz clic en Conectar orígenes de datos para conectar una nueva fuente de datos.

- Selecciona CRM y, luego, haz clic en Conectar.

- Puedes crear un conjunto de datos completamente nuevo o convertir uno existente. Tu decisión dependerá de cómo quieres organizar tus eventos y administrar el acceso de las cuentas publicitarias a los conjuntos de datos. Recomendamos crear un nuevo conjunto de datos para que los eventos de CRM no se superpongan con los eventos de conjuntos de datos actuales en el administrador de eventos, lo que facilitará la solución de problemas. Si conviertes un conjunto de datos preexistente, recomendamos dar a los eventos de CRM un nombre diferente en lugar de reutilizar los nombres de eventos que ya existen, ya que esto podría generar confusión entre los diferentes tipos de eventos. Convertir un conjunto de datos web actual no afectará los otros eventos que se subieron allí. Un conjunto de datos del CRM permite a Meta saber que los eventos de CRM se subirán allí y agrega el flujo de trabajo relacionado a la integración de la optimización de clientes potenciales de conversión al conjunto de datos.

 Para crear un nuevo conjunto de datos: haz clic en el enlace Crear un nuevo conjunto de datos y nombra el conjunto de datos en consecuencia.
- Para convertir un conjunto de datos: selecciona el conjunto de datos actual al que te gustaría subir eventos de CRM. Convertir un conjunto de datos web actual no afectará los otros eventos que se suban allí.
 - Asegúrate de que el ícono de tu conjunto de datos de CRM se haya actualizado. De no ser así, repite este paso.
 Nota: La integración se basa en píxeles. No cambies las integraciones completadas a un píxel diferente.


 

 
 

## Paso 3: Elegir un método de integración

Tendrás la opción de completar la configuración usando la integración manual o una integración con socios. Una integración manual es una gran opción para las empresas que tienen disponibles recursos de desarrolladores, acceso al código base de servidor y necesitan contar con la posibilidad de personalizar su configuración. De manera alternativa, las empresas que necesitan una integración con CRM más simple pueden usar alguna de las integraciones con socios disponibles.

 - Ingresa tu CRM en el cuadro de búsqueda. 
 Si una integración con socios admite tu CRM, puedes elegir la opción Usar un socio y seguir las instrucciones mencionadas en ese flujo de trabajo. 
 Selecciona tu socio preferido.
- Haz clic en Instrucciones abiertas para que el respectivo socio obtenga instrucciones para ese flujo de trabajo.
- Haz clic en Ir al socio para proceder al socio y comenzar la integración.

 
 - De lo contrario, pasa a elegir la opción código Manual o la opción Invitar a un desarrollador, y, luego, haz clic en Continuar.
 Nota: El desarrollador que realiza la integración necesitará acceso de administrador al administrador comercial para completar el proceso.
 ← Anterior 1: Connecting Your CRM With Lead Ads → Siguiente 3: Developer Implementation 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
