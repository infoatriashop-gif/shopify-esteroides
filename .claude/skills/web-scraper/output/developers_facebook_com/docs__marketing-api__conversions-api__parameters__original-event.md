# Datos de eventos originales - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/original-event

---

Datos de eventos originales - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros de datos de eventos originales

Usa estos parámetros para compartir información de eventos originales que quieras asociar con la API de conversiones.

 Parámetro Descripción `event_name` Cadena Obligatorio. Nombre del evento estándar o del evento personalizado.

 `event_time` Número entero Obligatorio. Marca de tiempo UNIX en segundos que indica cuándo ocurrió realmente el evento. La hora especificada puede ser anterior a la hora a la que envías el evento a Facebook. Debes enviar esta fecha en la zona horaria GMT.

 `order_id` Cadena Opcional. El identificador del pedido de esta transacción, expresado como cadena.

 `event_id` Cadena Opcional. Este indicador puede ser cualquier cadena única que haya elegido el anunciante. Los parámetros event_id y event_name se usan para deduplicar los eventos que enviaron tanto la página web (a través del píxel de Meta) o la app (a través del SDK o API de eventos de la app) como la API de conversiones. Ten en cuenta que, si bien event_id está marcado como opcional, se recomienda usarlo para deduplicar eventos.

A los fines de la deduplicación, el valor eventID del evento del navegador o de la app debe coincidir con el valor de event_id del evento correspondiente del servidor. Obtén más información acerca del Manejo de eventos de píxel y de API de conversiones duplicados.

Se pueden usar como identificadores potenciales de event_id un número de orden o un identificador de la transacción. Por ejemplo, si un cliente realiza dos compras en el sitio web con los números de orden 123 y 456, las llamadas a la API de conversiones deberán incluir el correspondiente número de orden en el parámetro event_id. Esto nos permite distinguir correctamente estos dos eventos de compra como pedidos distintos. Es necesario que los dos eventos de compra correspondientes del píxel del navegador también envíen los mismos números de pedido en el parámetro eventID para que podamos comprender que solo ocurrieron dos eventos y no cuatro compras distintas.

En cuanto a los otros eventos que no cuentan con un número de identificación intrínseco, se puede usar un número aleatorio (siempre que se envíe el mismo número aleatorio en el evento del navegador y en el del servidor).

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
