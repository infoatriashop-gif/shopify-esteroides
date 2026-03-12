# Parámetros - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters

---

Parámetros - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros

Incluyen todos los parámetros de datos de eventos obligatorios y los parámetros de datos adicionales que la API de conversiones necesita utilizar para la optimización de la entrega de anuncios o la atribución de anuncios.

 Ahora, la API de conversiones admite eventos del sitio web, de la app, offline y de mensajes comerciales.

Los eventos de sitios web compartidos con la API de conversiones requieren los parámetros client_user_agent, action_source y event_source_url, mientras que los eventos que no corresponden a sitios web requieren únicamente action_source. Estos parámetros mejoran la calidad de los eventos que se utilizan para entregar anuncios y pueden mejorar el rendimiento de las campañas.

Si usas la API de conversiones, aceptas que el parámetro action_source es preciso, según tus conocimientos.

 

### Parámetros principales del cuerpo

 - data
- test_event_code
 

### Parámetros de información de los clientes

 - em: Correo electrónico — Se debe aplicar formato hash.
- ph: Número de teléfono — Se debe aplicar formato hash.
- fn: Nombre — Se debe aplicar formato hash.
- ln: Apellido — Se debe aplicar formato hash.
- ge: Género — Se debe aplicar formato hash.
- db: Fecha de nacimiento — Se debe aplicar formato hash.
- ct: Ciudad — Se debe aplicar formato hash.
- st: Estado — Se debe aplicar formato hash.
- zp: Código postal — Se debe aplicar formato hash.
- country: País — Se debe aplicar formato hash.
- external_id: Identificador externo — Se recomienda aplicar formato hash.
- client_ip_address: Dirección IP del cliente — No aplicar formato hash.
- client_user_agent: Agente de usuario del cliente — No aplicar formato hash.
- fbc: Identificador de clic — No aplicar formato hash.
- fbp: Identificador de navegador — No aplicar formato hash.
- subscription_id: Identificador de suscripción — No aplicar formato hash.
- fb_login_id: Identificador de inicio de sesión con Facebook — No aplicar formato hash.
- lead_id: Identificador de cliente potencial — No aplicar formato hash.
- anon_id: Identificador de instalación — No aplicar formato hash. (Nota: Este parámetro solo se aplica a eventos de la app).
- madid: Identificador de anunciante en celulares — No aplicar formato hash. (Nota: Este parámetro solo se aplica a eventos de la app).
- page_id: Identificador de la página — No aplicar formato hash.
- page_scoped_user_id: identificador de usuario específico de la página — No aplicar formato hash.
- ctwa_clid: Identificador de clic a WhatsApp — No aplicar formato hash.
- ig_account_id: Identificador de la cuenta de Instagram — No aplicar formato hash.
- ig_sid: Identificador de clic a Instagram — No aplicar formato hash.
 

### Parámetros de eventos del servidor

 - event_name
- event_time
- user_data
- custom_data
- event_source_url
- opt_out
- event_id
- action_source
- data_processing_options
- data_processing_options_country
- data_processing_options_state
- referrer_url
- customer_segmentation
 

### Parámetros de datos de la app

 - advertiser_tracking_enabled
- application_tracking_enabled
- extinfo
- campaign_ids
- install_referrer
- installer_package
- url_schemes
- windows_attribution_id
- anon_id
- madid
- vendor_id
 Nota: Consulta el documento API de conversiones para eventos de la app si necesitas orientación sobre cómo integrar los eventos de la app.


### Parámetros estándar

Consulta una lista de todos los parámetros estándar que los usuarios pueden enviar a Meta.


### Parámetros de datos de eventos originales

 - event_name
- event_time
- order_id
- event_id
 


### API de conversiones para la optimización de clientes potenciales

Si integras tu sistema de administración de relaciones con los clientes (CRM) con la API de conversiones para los eventos de clientes potenciales, consulta la guía de integración de CRM para obtener más información sobre los campos obligatorios.


### Más información

 - Información general: parámetros fbp y fbc
 

## Más información

 - API de conversiones: documentación
- Uso de la API de conversiones
- Guía sobre privacidad y uso de datos de Meta
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
