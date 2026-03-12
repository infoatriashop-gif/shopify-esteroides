# Parámetros estándar - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data

---

Parámetros estándar - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
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
 

# Parámetros estándar

En esta tabla, figuran todos los parámetros estándar que los usuarios pueden enviar a Meta.

 Parámetros estándar del sitio web Parámetros estándar de la app Parámetros estándar offline Descripción availability

 fb_availability

 availability

 El valor debe ser available_soon, for_rent, for_sale, off_market, recently_sold o sale_pending.

 body_style

 fb_body_style

 body_style

 Estilo de carrocería del vehículo: CONVERTIBLE, COUPE, HATCHBACK, MINIVAN, TRUCK, SUV, SEDAN, VAN, WAGON, CROSSOVER y OTHER.

 checkin_date

 fb_checkin_date

 checkin_date

 Fecha en que el usuario desea registrar su llegada al hotel, en la zona horaria del hotel. Aceptamos fechas en los formatos YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD y YYYY-MM-DDThh:mm:ssTZD.

 city

 fb_city

 city

 Proporciona la ciudad de la ubicación a partir de la intención del usuario.

 condition_of_vehicle

 fb_condition_of_vehicle

 condition_of_vehicle

 Condición del vehículo.

 content_ids

 fb_content_ids

 content_ids

 Los identificadores de contenido asociados con el evento, como los SKU de los artículos de un evento AddToCart.

 content_type

 fb_content_type

 content_type

 Deberá configurarse en product o product_group:

 - Utiliza product si las claves que envías representan productos. Las claves que envías pueden ser content_ids o contents.
- Utiliza product_group si las claves que envías en content_ids representan grupos de productos. Los grupos de productos se utilizan para distinguir productos que son idénticos salvo por diferencias de color, material, tamaño o diseño.
 contents

 fb_contents

 contents

 Una lista de objetos JSON que contiene los identificadores del producto asociados con el evento y, además, información sobre los productos. Campos disponibles: id, quantity, item_price y delivery_category.

 country

 fb_country

 country

 Proporciona el país de la ubicación a partir de la intención del usuario.

 currency

 fb_currency

 currency

 Obligatorio para los eventos de compra. La divisa del value especificado, si corresponde. La divisa debe ser un código de divisa válido de tres dígitos según ISO 4217.

 delivery_category

 fb_delivery_category

 delivery_category

 Opcional para los eventos de compra. Tipo de entrega de un evento de compra. Los valores admitidos son los siguientes:

 - in_store: el cliente debe ingresar a la tienda para obtener el producto comprado.
- curbside: el cliente recoge su pedido conduciendo a un establecimiento y esperando dentro de su vehículo.
- home_delivery: la compra se entrega en el hogar del cliente.
 departing_arrival_date

 fb_departing_arrival_date

 departing_arrival_date

 Fecha y hora de la llegada al destino del trayecto de salida.

 departing_departure_date

 fb_departing_departure_date

 departing_departure_date

 Fecha y hora del inicio del trayecto de salida.

 destination_airport

 fb_destination_airport

 destination_airport

 Utiliza el código oficial de aeropuerto de destino de la IATA.

 destination_ids

 fb_destination_ids

 destination_ids

 Si tienes un catálogo de destinos, puedes asociar uno o más destinos del catálogo con un evento de hotel en particular.

 dma_code

 fb_dma_code

 dma_code

 El código de Designated Market Area (DMA) en el que el usuario busca ofertas.

 drivetrain

 fb_drivetrain

 drivetrain

 Tracción del vehículo: 4X2, 4X4, AWD, FWD, RWD, OTHER y NONE.

 exterior_color

 fb_exterior_color

 exterior_color

 Color exterior.

 fuel_type

 fb_fuel_type

 fuel_type

 Tipo de combustible del vehículo: DIESEL, ELECTRIC, FLEX, GASOLINE, HYBRID, PETROL, PLUGIN_HYBRID, OTHER y NONE.

 hotel_score

 fb_hotel_score

 hotel_score

 Indicador que representa el valor relativo de este hotel para el anunciante, en comparación con sus otros hoteles.

 interior_color

 fb_interior_color

 interior_color

 Color interior.

 lead_event_source

 lead_event_source

 lead_event_source

 Origen del evento de clientes potenciales.

 lease_end_date

 fb_lease_end_date

 lease_end_date

 Se especifica con el formato de fecha ISO 8601: YYYY-MM-DD.

 lease_start_date

 fb_lease_start_date

 lease_start_date

 Te permite recomendar propiedades según su disponibilidad de fechas (usando available_dates_price_config en el catálogo), y mejorar la experiencia del usuario en la página de destino (usando etiquetas de plantilla).

 listing_type

 fb_listing_type

 listing_type

 El valor debe ser for_rent_by_agent, for_rent_by_owner, for_sale_by_agent, for_sale_by_owner, foreclosed, new_construction o new_listing.

 make

 fb_make

 make

 Marca o fabricante del vehículo.

 mileage.unit

 fb_mileage.unit

 mileage.unit

 Unidad de kilometraje.

 mileage.value

 fb_mileage.value

 mileage.value

 Valor del kilometraje.

 model

 fb_model

 model

 Modelo del vehículo.

 neighborhood

 fb_neighborhood

 neighborhood

 Comunidad local de interés.

 net_revenue

 net_revenue

 net_revenue

 El valor del margen de un evento de conversión.

 num_adults

 fb_num_adults

 num_adults

 Número de adultos que se hospedarán.

 num_children

 fb_num_children

 num_children

 Número de niños que se hospedarán.

 num_infants

 fb_num_infants

 num_infants

 Número de bebés que se hospedarán.

 num_items

 fb_num_items

 num_items

 Se utiliza solo con eventos InitiateCheckout. El número de artículos que un usuario desea comprar durante la finalización de compra.

 order_id

 fb_order_id

 order_id

 El identificador del pedido de esta transacción como cadena.

 origin_airport

 fb_origin_airport

 origin_airport

 Se utiliza el código oficial de la IATA del aeropuerto de salida.

 postal_code

 fb_postal_code

 postal_code

 Código postal.

 predicted_ltv

 predicted_ltv

 predicted_ltv

 El valor a largo plazo predicho de un evento de conversión.

 preferred_baths_range

 fb_preferred_baths_range

 preferred_baths_range

 Número de baños seleccionado, expresado como un intervalo.

 preferred_beds_range

 fb_preferred_beds_range

 preferred_beds_range

 Número de habitaciones seleccionado, expresado como un intervalo.

 preferred_neighborhoods

 fb_preferred_neighborhoods

 preferred_neighborhoods

 Comunidades preferidas.

 preferred_num_stops

 fb_preferred_num_stops

 preferred_num_stops

 Indica el número preferido de paradas que busca el usuario.

 preferred_price_range

 fb_preferred_price_range

 preferred_price_range

 Rango de precio preferido para el vehículo. Mín/máx., hasta 2 decimales.

 preferred_star_ratings

 fb_preferred_star_ratings

 preferred_star_ratings

 Conjunto de calificaciones de hotel mínimas y máximas que filtra el usuario.

 price

 fb_price

 price

 Costo y divisa del vehículo. El formato del precio debe ser el costo seguido por el código de divisa ISO, con un espacio entre el costo y la divisa.

 product_catalog_id

 product_catalog_id

 product_catalog_id

 Identificador del catálogo de productos.

 property_type

 fb_property_type

 property_type

 Debe ser apartment, condo, house, land, manufactured, other o townhouse.

 region

 fb_region

 region

 Estado, distrito o región de interés.

 returning_arrival_date

 fb_returning_arrival_date

 returning_arrival_date

 Fecha y hora en que se completa el trayecto de regreso.

 returning_departure_date

 fb_returning_departure_date

 returning_departure_date

 Fecha y hora del inicio del trayecto de regreso.

 search_string

 fb_search_string

 search_string

 Se utiliza solo con el evento Search. Una consulta de búsqueda que realiza un usuario.

 state_of_vehicle

 fb_state_of_vehicle

 state_of_vehicle

 Estado del vehículo.

 suggested_destinations

 fb_suggested_destinations

 suggested_destinations

 Destinos sugeridos.

 suggested_home_listings

 fb_suggested_home_listings

 suggested_home_listings

 Sugerencias de anuncios de viviendas.

 suggested_hotels

 fb_suggested_hotels

 suggested_hotels

 Hoteles sugeridos.

 suggested_jobs

 fb_suggested_jobs

 suggested_jobs

 Empleos sugeridos.

 suggested_local_service_businesses

 fb_suggested_local_service_businesses

 suggested_local_service_businesses

 Servicios comerciales locales sugeridos.

 suggested_location_based_items

 fb_suggested_location_based_items

 suggested_location_based_items

 Artículos sugeridos basados en la ubicación.

 suggested_vehicles

 fb_suggested_vehicles

 suggested_vehicles

 Vehículos sugeridos.

 transmission

 fb_transmission

 transmission

 Transmisión del vehículo: AUTOMATIC, MANUAL, OTHER y NONE.

 travel_class

 fb_travel_class

 travel_class

 Debe ser economy, premium, business o first.

 travel_end

 fb_travel_end

 travel_end

 Fecha de finalización de viaje.

 travel_start

 fb_travel_start

 travel_start

 Fecha de inicio de viaje.

 trim

 fb_trim

 trim

 Máximo de caracteres: 50.

 user_bucket

 fb_user_bucket

 user_bucket

 Grupo de usuarios.

 value

 _valueToSum

 value

 Obligatorio en el caso de los eventos de compras o cualquier evento que utilice la optimización de valores.

Un valor numérico asociado con el evento. Debe representar un importe monetario.

 vin

 fb_vin

 vin

 Número de VIN.

 year

 fb_year

 year

 Año de lanzamiento del vehículo en formato yyyy.

 item_number

 Identificador único para distinguir eventos dentro del mismo pedido o transacción.

 ad_type

 Tipo de anuncio.

 fb_content

 Una lista de objetos JSON que contiene el número de artículo internacional (EAN), si corresponde, u otros identificadores de producto o contenido, además de las cantidades y los precios de los productos. Obligatorio: id, quantity.


Ejemplo: "[&#123;\"id\": \"1234\", \"quantity\": 2,&#125;, &#123;\"id\": \"5678\", \"quantity\": 1,&#125;]".

 fb_content_id

 Número de artículo internacional (EAN), si corresponde, u otros identificadores del producto o del contenido. Si hay varios identificadores de producto, puede ser, por ejemplo: "[\"1234\",\"5678\"]".

 fb_description

 La descripción de una cadena.

 fb_level

 Nivel de un juego.

 fb_max_rating_value

 Límites superiores de una escala de calificación, por ejemplo 5 en una escala de 5 estrellas.

 fb_payment_info_available

 1 indica sí, 0 indica no.

 fb_registration_method

 Facebook, correo electrónico, Twitter, etc.

 fb_success

 1 indica sí, 0 indica no.

 _valueToSum

 Valor numérico del evento individual que se debe sumar al informe.

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
