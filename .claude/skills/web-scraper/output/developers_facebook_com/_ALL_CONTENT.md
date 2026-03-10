---
# API de conversiones - Documentación - Meta for Developers
> https://developers.facebook.com/docs/marketing-api/conversions-api

API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# API de conversiones

La API de conversiones está diseñada para crear una conexión entre los datos de marketing de un anunciante (como los eventos del sitio web, de la app y de mensajes comerciales y conversiones offline) provenientes del servidor, la plataforma del sitio web, la app para celulares o el sistema CRM del anunciante, y los sistemas de Meta que optimizan la segmentación de los anuncios, reducen el costo por resultado y miden los resultados.

En lugar de mantener puntos de conexión separados por cada origen de datos, los anunciantes pueden aprovechar la API de conversiones para enviar múltiples tipos de eventos y simplificar su pila de tecnología. En el caso de integraciones directas, esto implica establecer una conexión entre el servidor del anunciante y el extremo de la API de conversiones de Meta.

Los eventos del servidor se vinculan a un identificador de conjunto de datos y se procesan como eventos enviados a través del píxel de Meta, el SDK de Facebook para iOS o Android, el SDK del socio de mediciones para celulares, el conjunto de eventos offline o la carga de un archivo .csv. Esto significa que los eventos del servidor se pueden usar en la medición, la creación de informes o la optimización de manera similar a como se lo hace en otros canales de conexión. Los eventos offline se pueden usar para la medición de eventos offline atribuidos, la creación de públicos personalizados offline o la medición.

Para lograr un rendimiento y una medición óptimos de los anuncios, recomendamos que los anunciantes sigan las prácticas recomendadas de la API de conversiones.


### Pasos recomendados

 - Primeros pasos: selecciona el método de integración que mejor se adapte a tus necesidades, consulta los requisitos para usar la API y averigua por dónde empezar.
- Implementa la API y empieza a enviar solicitudes: comienza a hacer solicitudes POST y obtén más información sobre los eventos omitidos, las solicitudes por lotes y la fecha de transacción del evento.
- Verifica la configuración: asegúrate de que hayamos recibido los eventos y de que dichos eventos están deduplicados y asociados correctamente.
 

## Documentación

 

### Parámetros de la API

Parámetros obligatorios y opcionales que puedes usar para mejorar la atribución de los anuncios y la optimización de la entrega.

 

### Asistente de carga

Obtén información sobre cómo estructurar la carga al enviarla a Facebook desde tu servidor.

 

### Solución de problemas

Descubre cómo gestionar los códigos de error que devuelve la API de conversiones.

 

## Recursos

 

### Eventos de píxel de Meta

Obtén más información sobre los eventos estándar y los eventos personalizados del píxel de Meta.

 

### Servicio de ayuda para empresas

En el servicio de ayuda, consulta Información sobre la API de conversiones y Probar eventos del servidor.

 

### Manual

Consulta el Manual de integración directa para desarrolladores (PDF).

 

### Opciones de procesamiento de datos

Obtén más información sobre la función de uso limitado de datos y cómo implementarla para la API de conversiones.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->