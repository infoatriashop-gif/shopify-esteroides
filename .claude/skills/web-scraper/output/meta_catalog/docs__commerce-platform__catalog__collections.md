# API de colección de conjunto de productos - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/collections

---

API de colección de conjunto de productos - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
- Get Started
- API Integration Setup
- App Dashboard
- Seller Integration
- Integración con socios
- Migrate to Simplified Shops Ads API
- Set Up Checkout URL
- Enable Subscriptions
- Shops Ads Lightweight BOPIS Experience
- Shops Ads Heavyweight BOPIS Experience
- Catalog and Inventory
- Order Management
- Finance Reporting
- Best Practices
- Customer Communication
 Volver al documento en español Se actualizó este documento.
La traducción en español no está disponible todavía. Actualización del documento en inglés: 28 oct. 2021 
 

# API de colección de conjunto de productos

Puedes usar esta API para crear las colecciones que se usan en las tiendas y agregar metadatos a un conjunto de productos, como una imagen de portada y una descripción. Posteriormente, estos conjuntos de productos estarán listos para usarse como colecciones en el administrador de ventas y, de esta manera, podrás personalizar tu tienda de Facebook o de Instagram (de lo contrario, las colecciones se crean de forma manual). También puedes publicar directamente los conjuntos de productos que ya están listos si proporcionas los identificadores de la tienda. Puedes obtener estos identificadores mediante las API de comercio.

Obtén información sobre cómo crear una colección en el administrador comercial, servicio de ayuda para empresas.

 

## POST (API de creación/actualización)

El proceso de creación y de actualización de los conjuntos de producto es el mismo. Sin embargo, se incluyeron algunos nuevos campos opcionales:

 Campo Descripción metadata

 Opcional.

Parámetro principal del bloque de metadatos para las colecciones.

 publish_to_shops

 Opcional.

Parámetro para proporcionar los "shop_id" y crear/actualizar directamente un conjunto de productos y publicarlo en las tiendas.

 

#### Campos de metadatos


 Campo Descripción cover_image_url

 Opcional.

URL de la imagen de portada de la colección

 description

 Opcional.

Descripción que verán los clientes del conjunto de productos.

 external_url

 Opcional.

URL de la colección. No se muestra esta URL a los clientes, pero es la predeterminada cuando se crean anuncios que promocionan tu conjunto de productos.

 

#### Campo "publish_to_shops"

El campo publish_to_shops admite una matriz vacía o una matriz con los parámetros que se muestran a continuación. Si se proporciona una matriz vacía, se eliminará la publicación del conjunto de productos en cuestión de todas las tiendas (si ya se había publicado).


 Campo Descripción shop_id

 Se espera que "shop_id" se encuentre aquí y se puede obtener con las API de comercio.

 Ejemplo: carga

&#123; 
 "name": "Best sellers",
 "filter": &#123;
 "retailer_id": &#123;
 "is_any": [
 "pid1",
 "pid2"
 ]
 &#125; 
 &#125;,
 "metadata": &#123;
 "cover_image_url": "https://foo.com/image.jpg" (https://foo.com/image.jpg%E2%80%9D),
 "external_url": "https://foo.com/best-sellers",
 "description":"Our best selling products"
 &#125;
 "publish_to_shops": [&#123;"shop_id": "shop_id1"&#125;, &#123;"shop_id": "shop_id2"&#125;]
&#125;

### Crear un conjunto de productos

Crear un conjunto de productos con los metadatos de la colección que coincida con los identificadores de productos específicos:

curl \
 -F "name=Best Sellers" \
 -F "filter=&#123;&#039;retailer_id&#039;: &#123;&#039;is_any&#039;: [&#039;pid1&#039;, &#039;pid2&#039;]&#125;&#125;" 
 -F "metadata=&#123;&#039;cover_image_url&#039;:&#039;https://foo.com/image.jpg&#039;, &#039;external_url&#039;:&#039;https://foo.com/best-sellers&#039;, &#039;description&#039;:&#039;Our best selling products&#039;&#125;" \
 -F "access_token=<ACCESS_TOKEN>" \
 https://graph.facebook.com/API_VERSION/PRODUCT_CATALOG_ID/product_sets

### Actualizar un conjunto de productos

Actualizar un conjunto de productos con los metadatos de la colección y publicarlo en las tiendas:

curl \
 -F "name=Updated Best Sellers" \
 -F "metadata=&#123;&#039;cover_image_url&#039;:&#039;https://foo.com/image_updated.jpg&#039;, &#039;external_url&#039;:&#039;https://foo.com/best-sellers-updated&#039;, &#039;description&#039;:&#039;Our updated best selling products&#039;&#125;" \
 -F "publish_to_shops=[&#123;&#039;shop_id&#039;:&#039;shop_id1&#039;&#125;, &#123;&#039;shop_id&#039;:&#039;shop_id2&#039;&#125;]"
 -F "access_token=<ACCESS_TOKEN>" \
 https://graph.facebook.com/API_VERSION/PRODUCT_SET_ID

## GET (Leer API)

En el nodo GET, el campo live_metadata devuelve metadatos que se publican y están activos en un conjunto de productos específico, mientras que el campo latest_metadata devuelve los últimos metadatos que se enviaron a la API. Es posible que estos campos sean diferentes si, por ejemplo, se cambió una imagen durante una actualización y se rechazó por cuestiones de integridad.

 Ningún campo está predeterminado, deben llamarse explícitamente como parámetros de campo en la API Graph.

 Campo Descripción latest_metadata

 Los últimos metadatos que se enviaron. Es posible que no sea igual que live_metadata (por ejemplo, si review_status es REJECTED).

 live_metadata

 Metadatos actuales activos de este conjunto de productos.

 

#### Campos de metadatos


 Campo Descripción cover_image_url

 URL de la imagen de portada de la colección que pertenece a este conjunto de productos.

 description

 Descripción que verán los clientes del conjuntos de productos.

 external_url

 URL de la colección. No se muestra esta URL a los clientes, pero es la predeterminada cuando se crean anuncios que promocionan tu conjunto de productos.

 integrity_review_status

 Estado de la revisión de integridad. Puede ser APPROVED, REJECTED o PENDING.

 Ejemplo: leer un conjunto de productos para ver si los metadatos están activos:

curl -G \
 -d "access_token=<ACCESS_TOKEN>" \
 https://graph.facebook.com/<API_VERSION>/<PRODUCT_SET_ID>/?fields=id,name,latest_metadata&#123;cover_image_url, description, review_status&#125;,live_metadata&#123;cover_image_url, description, review_status&#125;Respuesta:

&#123; 
 "id": 1234567890,
 "name": "Best sellers",
 "latest_metadata": &#123;
 "cover_image_url": "https://foo.com/some_new_image.jpg" (https://foo.com/image.jpg%E2%80%9D),
 "description":"Our best selling products",
 "integrity_review_status": "REJECTED"
 &#125;,
 "live_metadata": &#123;
 "cover_image_url": "https://foo.com/some_good_image.jpg", 
 "description":"Our best selling products",
 "integrity_review_status": "APPROVED"
 &#125;
&#125;

## Preguntas frecuentes


#### P: ¿cuál es la relación de aspecto mínima aceptable para la imagen de portada?

R: las imágenes deben ser de 600 x 600, como mínimo (aunque no está disponible en esta relación la posibilidad de editar el recorte). Si se sube una imagen de 800 x 800 o mayor, se selecciona de manera predeterminada una relación de aspecto cuadrada. Para obtener los mejores resultados, recomendamos que la relación de aspecto sea de 1080 x 1080.


#### P: ¿cuál es el tamaño máximo del archivo de la imagen de portada?

R: el tamaño máximo de archivo es de 8 MB.


#### P: ¿cuáles son los formatos de archivo de la imagen de portada que se admiten?

R: se admiten JPG y PNG.


#### P: ¿existen restricciones para la extensión de la descripción?

R: no existe ninguna extensión mínima para la descripción; sin embargo, la máxima es de 200 caracteres.


#### P: ¿cómo elimino la publicación de una colección (conjunto de productos) de las tiendas?

R: puedes usar la API de actualización y eliminar el campo shop_id de la lista publish_to_shop en la que se publicó anteriormente la colección. Si se proporciona una matriz vacía ([]), se eliminará la publicación del conjunto de productos de todas las tiendas.

 

## Más información

 - Crear una colección en el administrador comercial, servicio de ayuda para empresas
- Conjunto de productos, Referencia de la MAPI
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->
