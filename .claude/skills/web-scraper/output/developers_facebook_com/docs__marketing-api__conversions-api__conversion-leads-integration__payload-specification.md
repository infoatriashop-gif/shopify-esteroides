# Especificación de la carga útil - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/payload-specification

---

Especificación de la carga útil - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Especificación de la carga útil

Integrar el sistema CRM con la API de conversiones de Meta y usar el objetivo de optimización para la conversión de clientes potenciales ofrece resultados de mejor calidad. En estos momentos, esta optimización solo admite anuncios para clientes potenciales nativos (formularios instantáneos) que se generan en Facebook o Instagram.

 Esta guía proporciona la especificación de carga de los eventos del CRM que se subieron solo con el fin de optimizar los clientes potenciales de conversión. No uses esta especificación si se trata de eventos que no estén relacionados con esta optimización.

 Consulta la documentación sobre la API de conversiones para obtener más información sobre cómo empezar a usar la API y otros recursos útiles.

 

## Carga útil de evento


### Parámetros obligatorios

 Nombre Descripción user_data

 objeto Mapa que contiene información de los clientes. Consulta Parámetros de información de los clientes para ver las opciones. Consulta Coincidencias avanzadas para obtener información sobre las opciones comparables disponibles en caso de que se envíen los datos mediante el píxel de Meta.

 event_name

 cadena Obligatorio. Campo sin formato para capturar las etapas que usas en el CRM. Asegúrate de enviar todas las etapas, porque se actualizaron, incluso la etapa inicial de clientes potenciales. Por ejemplo, es posible que tus etapas incluyan los siguientes tipos. Si un cliente potencial llega a la etapa "Convertido", es necesario que ya se hayan enviado todas las etapas anteriores.

 - Cliente inicial de Facebook
- Cliente potencial calificado en marketing
- Oportunidad de venta
- Convertido
 Usa una variable para pasarlas en las etapas de tu CRM. De manera alternativa, puedes realizar una llamada a la API separada por cada etapa.

 event_time

 entero Obligatorio. Una marca de tiempo Unix en segundos que indica cuándo tu CRM actualiza el evento de actualización de la etapa de cliente potencial. Usa una variable para pasar los valores de la marca de tiempo Unix de tu base de datos. Nota: El valor del parámetro event_time puede ser de hasta 7 días antes de enviar un evento a Meta. Además, la marca de tiempo debe ocurrir después de la hora de generación del cliente potencial, de lo contrario, el evento podría ser descartado.

 action_source

 cadena Obligatorio. Configura este parámetro al valor system_generated para todos los eventos de conversión de clientes potenciales. En el caso de las integraciones de clientes potenciales de conversión, esto especifica dónde se generan las conversiones del sistema.

 lead_event_source

 cadena Obligatorio. Configura este parámetro con el nombre de la herramienta de la que provienen los clientes potenciales (por ejemplo, Hubspot, SAP, Oracle, Dynamics, CRM propio, etc.), que se incluye en el parámetro custom_data.

 event_source

 cadena Obligatorio. Configura este parámetro en el valor crm para todos los eventos de conversiones de clientes potenciales. En el caso de la integración de clientes potenciales de conversión, esto especifica el origen del evento como tu CRM en el parámetro custom_data.

 

### Parámetros de información del cliente

La información de los clientes permite que Meta coordine los eventos de tu servidor con las cuentas de Meta. Si se envían varios de estos parámetros, se pueden obtener datos de eventos más precisos y un mejor rendimiento publicitario.

Nota: Debes enviar al menos un parámetro de información del cliente. Si envías lead_id, usa un lead_id válido o el sistema rechazará el evento. Si decides enviar un correo electrónico o número de teléfono, los datos deben estar cifrados. Por el momento, el identificador de clic no cuenta con un error de rechazo en la API, pero una gran cantidad de click_id inválidos desencadenarán una alerta en el sistema.

 Parámetro Prioridad Descripción Identificador de clientes potenciales (recomendado) Cómo encontrar el identificador de clientes potenciales

 Principal

 El identificador generado por Facebook para cada cliente potencial. Es un número de 15 a 17 dígitos que se obtiene del campo leadgen_id del webhook de generación de clientes potenciales y se incluye en el parámetro user_data.

Consulta Encontrar el identificador de clientes potenciales para obtener más información.

 Identificador de clic

 Principal

 Correo electrónico cifrado

 Principal

 Número de teléfono cifrado

 Alta

 Otra información de contacto cifrada

 Media

 Nota: Además de los parámetros de correo electrónico y número de teléfono cifrados, puedes enviarle a Meta parámetros cifrados de género, fecha de nacimiento, apellido, nombre, ciudad, estado y código postal, entre otros.

 

### Ejemplo:

El siguiente ejemplo brinda información sobre el formato de la carga del evento que se envía en la llamada a la API.

 
&#123;
 "event_name": "my lead stage",
 "event_time": 1617693833,
 "user_data": &#123;
 "lead_id": 1234567890123456
 &#125;,
 "action_source": "system_generated",
 "custom_data": &#123;
 "lead_event_source": "Salesforce",
 "event_source": "crm"
 &#125;
&#125;
 

## Más información

 - Servicio de ayuda para empresas: Configurar tu CRM para la optimización "Clientes potenciales de conversión"
- Servicio de ayuda para empresas: Información sobre la optimización de la entrega de anuncios para clientes potenciales
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->
