---
# Catalog and Inventory - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog

Catalog and Inventory - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Catalog and Inventory


Before people can buy products in your Facebook shop or Instagram Shopping account, you need to upload them in a Facebook catalog.


 

## Guides


Use these guides to manage your catalog, including the inventory field requirements.


Learn more about Catalogs, Business Help Center and Catalog, Marketing API.


 

### Product Catalog


Learn more about catalog, attributes, data sources, real-time updates and diagnostics.


### Catalog Fields


Learn more about the catalog fields that describe the type or category of commerce products in your listing.


### Product Categories


Learn about product categories, tax calculation and purchase protection.


### Product Variants


Learn more about product variants.


### Product Set Collection API


Learn how to use this API to create collections used in Shops.


### Inventory


Learn how to manage your catalog inventory. Note: See Quantity to Sell


 

### Feed API Reference


Learn now to schedule data feed uploads and fetches.


### Catalog Diagnostics API


Learn how to implement the Catalog Diagnostics API.


### Batch API Reference


Learn how to use Batch API and real-time updates.


### Best Practices


Learn more about best practices.


### Localized Catalog for International Shopping


Learn how to set up your catalog for localized shopping with multiple languages and countries.


### Update Ads Catalog to Commerce Catalog


Learn how to upgrade your ads catalog to commerce use case.


 

## See Also


 
- Localized Catalog Setup

- Localized Catalog for Advantage+ Catalog Ads

- Localized Catalog for Instagram Shopping

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Inventario - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/inventory

Inventario - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
La traducción en español no está disponible todavía. Actualización del documento en inglés: 3 de mar. 
Actualización del documento en español: 19 ago. 2022 

# Inventory


Note: This field has been replaced with the Quantity to Sell field.


The inventory field in your Product Catalog represents the stock level for each product available to sell on your Facebook Shop or Instagram Shopping account. This value is reflected in the Product Details Page (PDP) and helps buyers understand how many items are available. Keeping it accurate and up-to-date is instrumental to the experience, as it dictates when your products are out-of-stock or can lead to overselling if incorrect.


 NOTE: The inventory field is being deprecated and replaced with a new quantity_to_sell_on_facebook field. While we will support the old field name for the near term, we recommend that you use the new name. See Supported Fields for Products - Advantage+ Catalog Ads & Commerce for more about this update.


 Note: An item without inventory setup cannot be tagged or purchased. However, you still can use it for Advantage+ catalog ads without checkout.


 

## Inventory Fluctuation


The inventory field is dynamic, which means that its value fluctuates as people buy products from your Facebook Shop or Instagram Shopping account. Whenever a user places an order, the inventory level of the corresponding products is decremented.


The Commerce Platform automatically increment this value or re-stocks the product in case of user-initiated cancellations.
In the case of seller-initiated cancellations, you can re-stock a product at cancellation time and increment the corresponding inventory level, by setting the restock_items field of the cancellations API endpoint.


 The value that you provide through product catalog uploads or other techniques (see Inventory Update Strategies for more information) is considered the source of truth, and is always used to overwrite the value cached on our backend.


 We keep the following types of inventory counts on our end:


 
- The provided inventory is the value that you provide through product catalog uploads or other techniques (see Inventory Update Strategies for more information).

- The available inventory is the value that customers can purchase and it takes under consideration not processed orders.

 

Learn more about these inventory types; see Product Life Cycle.


 

## Out-Of-Stock Products


As people purchase products on your Facebook Shop or Instagram Shopping account, the inventory value is decremented. When this value reaches 0, we mark the product as &#039;Out-Of-Stock&#039; and restrict anyone from purchasing additional units. You should do a best-effort attempt at restocking your products regularly as &#039;Out-Of-Stock&#039; products negatively affect the user experience and your brand perception.


If a buyer finds an Out-Of-Stock product, we try our best to switch the Product Details page to a variant that has units &#039;In-Stock&#039; based on the inventory value of the product&#039;s variant in your product catalog.


 

## Discontinued Products


When a product is discontinued, you may be tempted to simply delete it from your product catalog. We don&#039;t recommend this.


Deleting products from your catalog may cause undesirable effects, such as product tags and images disappearing. We strongly recommend that you only delete products after a significant time has passed (months).


Instead of deleting products, you should set the visibility field of a discontinued product to staging. This ensures that the Commerce Platform can link your product back to a known entity and manage different situations gracefully.


 

## Product Life Cycle


Every time you update inventory, we update the provided inventory. This number does not correspond to the number of items available for customer purchase. We track incoming orders (which may be in different states) and subtract unacknowledged orders to calculate a final available inventory. This number may not be exposed outside of our platform.


 Available Inventory = Provided Inventory - Not Acknowledged Orders.


 After orders are acknowledged, there is a 30 minute buffer to allow you to process orders and update inventory numbers (through the catalog) before we remove those acknowledged orders from our counter.


 

## Over-selling


To scale the Commerce Platform to thousands of merchants, we&#039;ve made a conscious decision to not support synchronous inventory management. As a consequence, we don&#039;t support making atomic purchase transactions coupled with decrementing stock levels in your warehouse. If your inventory is shared across multiple channels, you may unexpectedly over-sell products on Facebook or Instagram. This could happen for fast-selling products available in limited quantity.


 When you cannot fulfill orders due to over-selling situations, you should initiate a cancellation and set the reason_code to OUT_OF_STOCK.


 If you are frequently faced with over-selling, you can process orders at a more frequent basis, and adjust the inventory level of your products accordingly.


 

## Inventory Integration Strategy


You can update inventory in a different way depending on the type of integration you are doing:


 
- By using the Commerce Manager UI (small product set, testing, and so on)

- A feed with scheduled or manual upload

- Using the Feed API

- Using the Batch API

 
 

## Inventory Update Strategies


Because of the asynchronous nature of distributed systems, the inventory value in your product catalog may go out-of-sync, regardless how fast you update your inventory levels. Below are some techniques that you may want to consider, to minimize race-conditions.


### Pre-allocated Inventory


The most effective way to avoid over-selling is to pre-allocate inventory to your Facebook Shop or Instagram Shopping channels. Dedicating inventory for each of your sales channel guarantees that sales happening on any individual channel do not interfere with each other. This strategy can be applied to part or the totality of your product catalog.


### Slow-Selling Products


For products that sell at a normal pace, or those with deep inventory, the risk of over-selling is relatively low. In this situation, you can keep your product catalog update strategy simple:


 
- Configure a scheduled feed for daily/hourly updates. This feed should contain all fields, including the most up-to-date inventory value.

 


### Fast-Selling Products


For fast-selling products, with shallow or very dynamic inventory, you may want to update volatile fields such as inventory in a more timely basis. You can use the Real-Time Batch API for this purpose. Here&#039;s a general strategy that you can follow:


 
- Configure a scheduled feed for daily/hourly updates. This feed should contain all mandatory Product Catalog fields, and omit volatile fields such as inventory. The purpose of this feed is to update fields that are more static in nature, and defer the updates of volatile fields using the Real-Time API.

- Use the Real-Time Batch API to update volatile fields such as inventory when the value changes in your backend, or at a fixed frequency. It is important that the fields updated using this technique are not included in your feed for consistency reasons.

 

Here&#039;s an example of updates using the Real-Time Batch API:


curl \
 -d &#064;body.json \
 -H "Content-Type: application/json"
 &#123;
 "access_token": "<ACCESS_TOKEN>",
 "item_type": "PRODUCT_ITEM",
 "requests": [ 
 &#123;
 "method": "UPDATE",
 "retailer_id": "SKU1234567",
 "data": &#123;
 "inventory": "1337",
 &#125;
 &#125;
 ]
 &#125; https://graph.facebook.com/<CATALOG_ID/batchBatch API requests are asynchronous. You should check for the request status and its result to make sure that all your updates are successful. See the Batch API documentation for more information.


If you are managing a small number of products, you can also update each product individually using the Graph API directly in lieu of the Real-Time Batch API. Because of Graph API rate-limiting and throttling, this approach is only applicable to a small number of products. The exact number of products you can update using this approach depends on the quota applied to your Facebook app, a good rule of thumb is that you should use the Real-Time Batch API if you are updating more than a dozen of products at a time.


To update specific fields inside a product, you can make the following API call:


curl -d "inventory=1337" -X POST 
https://graph.facebook.com/<FACEBOOK_PRODUCT_ID>
access_token: PAGE_ACCESS_TOKENIf using the Graph API, use a Facebook product ID. If using the batch API, use your own ID, a.k.a. the retailer_id.


 

### Inventory Thresholds


Another common technique to mitigate against over-selling is to take a cautious approach to inventory allocation. For example, when a particular item is close to running Out-Of-Stock as identified in your warehouse, you can set the inventory level in your Product Catalog to zero. This is effectively an optimization for under-selling, but can help if over-selling is a concern.


If you know how fast each of your products sell, you can partition them into different buckets and apply a different threshold for each bucket depending on its selling profile. Fast selling products will typically need a higher threshold value, while slow selling products can probably use a lower threshold value for being marked Out-Of-Stock.


 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Product Catalog - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/overview

Product Catalog - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Catalog Overview


Before buyers can purchase items from you, you&#039;ll need to upload your product information into a catalog. If you advertise with Advantage+ catalog ads (dynamic ads), you already have a catalog and should augment your existing catalog. If you do not have a catalog or do not want to reuse an existing one, you can create a new E-Commerce catalog using the Commerce Manager.


Catalogs are managed within your Meta Business Manager. Your Marketing department may already have set up a Business on Facebook to manage their ads campaigns on behalf of your organization and should be able to provide you access. If you do not have a Business Manager, you can create one now by following the instructions from our Help Center.


 

## Manage Catalogs


Products are created, updated, and deleted using the following approaches:


 
- In bulk by uploading a Product Feed file, manually or scheduled in Commerce Manager

- For existing products: 


Update product quantity_to_sell_on_facebook (the field representing inventory count) using the Catalog Product Catalog Items Batch API

- In bulk by uploading a Supplementary Feed manually, scheduled in Commerce Manager, or by using the Product Feed API.

 
 

The product feed (inventory) should be provided in one of the supported formats (CSV, TSV, RSS XML, ATOM XML, as well as Google Sheets.


Learn more about how to manage your catalog and the field requirements in our inventory documentation.


 

## Product Attributes


A catalog is a structured data file that holds information about the items in your inventory. Each row in your catalog represents an individual product (unique size/color variant). Each column in your catalog represents product attributes such as title, description and image You can see the full list of attributes and their requirements here.


 id title gender size color inventory price item_group_id 0475-S


 T-Shirt


 Unisex


 S


 Black


 35


 7.43


 0475


 0475-M


 T-Shirt


 Unisex


 M


 Black


 125


 7.43


 0475


 0475-L


 T-Shirt


 Unisex


 L


 Black


 12


 7.43


 0475


 0883


 Shorts


 Unisex


 3


 26.55


 0883


 

## Product Data Sources


There are multiple ways to populate your catalog. The most common approach is to list all your products and attributes into a flat file using one of the supported formats (CSV, TSV, RSS XML, ATOM XML, as well as Google Sheets, and upload it as a catalog Feed.


After you&#039;ve created your catalog, you can create one or many Product Feeds to update or replace product items in your catalog. Product Feeds can be uploaded manually or automatically using a schedule (hourly, daily or weekly). Two types of schedules are supported for a given Product Feed:


 
- Replace Schedule: to refresh your entire feed. Items not present in the feed file will be deleted.

- Update Schedule: to make changes to selected items in your feed.

 

Most businesses will set-up a Replace Schedule once a day, and configure an Update Schedule more frequently to make incremental catalog updates.


 A catalog supports one or multiple Product Feeds. However, a given product (identified by the id field) can only exist in one Product Feed at any time (product IDs are unique to feeds).


 Read more about how to set-up your Product Feed in the Catalog Set-Up section.


 

## Real-time Updates


In addition to manual or scheduled uploads, we support live updates of specific product fields using the catalog Batch API for near real-time updates. This approach is programmatic, and mostly used to update stock-related information for fast-selling product items.


If you have a fast-selling inventory and feel that the hourly update cadence of Product Feeds is insufficient for your particular case, you can de-couple updating general product attributes from volatile fields such as inventory and availability. Read more about the different inventory update strategies currently supported.


 

## Diagnostics


Because Product Feed and batch uploads are both asynchronous operations, there may be situations where one or many products fail to be updated without you knowing it. Errors may be caused by various reasons such as missing or incorrect product attributes in your data source. It is important to regularly check the status of your Product Feed upload or batch sessions, and fix any potential errors.


You can check for upload errors using two different approaches:


 
- Manually: regularly check the Diagnostics view of your catalog. This view will show warnings and errors for each Product Feed upload sessions. You can also download error reports for offline analysis.

- Programmatically: build an API integration to automatically report warning and errors based on your Product Feed upload sessions. Read the Handling Product Feed errors section in the Feed API for more information.

 


### Diagnostics for Product Item Errors


Whether they are uploaded using product feed or batch sessions, once product items have been ingested, there could be important visibility or checkout blocking issues that come up during validations that are run on a regular basis. You can check for those errors in two ways:


 
- Manually: you can check individual products in the ‘Items’ section in your Product Catalog. You will find any errors with a product under the ‘Issues’ tab of that product item.

- Programmatically: you can automatically check any errors in two ways:


Product Item API: For each uploaded product item id, the Product Item API can be used to retrieve all non-fatal errors associated with it (Note that fatal errors would have prevented the ingestion from happening). The errors field in the Product Item API contains a list of errors associated with the item.

- Product Search API: The list of affected product items can be requested via the Product Search API. In the parameters, you need to add ‘errors’ to the field list to see the list of errors affecting each item and filter by either error type or error priority to fetch only items affected matching those filters.

 
 


#### Catalog All Errors


You may want to fetch the list of all the possible errors with product items. The Catalog All Errors API will help to fetch the list of all possible errors. You may use this list as reference for different error types and use these error types to filter errors in other diagnostic APIs as described above.


### Product Catalog Diagnostics


You may want to fetch the list of all the possible errors associated with the product set or catalog. The Product Catalog Diagnostics API will help to fetch the list of all possible errors with counters. You may use this list as reference for different error types and use these error types to filter errors in other diagnostic APIs as described above.


 

## Next Steps


 
- Learn more about the supported catalog fields that describe the type or category of commerce products in your listing.

- Learn more about the universal basic attributes to use in your product feed.

- Learn more about the product categories to use to enhance your catalog.

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Campos del catálogo - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/fields

Campos del catálogo - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Campos del catálogo

Un catálogo de productos es un contenedor de información sobre tus productos. Los productos se describen usando un conjunto de campos que se utilizan de manera diferente según cómo usas el catálogo.

Es posible que ya cuentes con un catálogo de productos para los anuncios de catálogo Advantage+. Este catálogo contiene un conjunto de los campos obligatorios que pueden usarse como la base de tu catálogo de comercio.

Usa esta guía para obtener más información sobre las recomendaciones relacionadas con los campos adicionales y sus requisitos:

 - Atributos básicos universales
- Campos específicos de categoría
 

## Cómo usar los campos del catálogo

Los campos del catálogo contribuyen a la calidad de la experiencia que tienen los clientes cuando compran productos en los canales de las tiendas de Facebook o Instagram:

 - Detalles de producto: se usan los campos del catálogo para que la página de detalles del producto del artículo se complete automáticamente. Se incluye información importante, como imágenes, variantes de color y tamaño, precio, inventario y descripción del producto. El hecho de que falten datos o que estos sean imprecisos puede repercutir de manera negativa en la experiencia de usuario, afectar el paso de conversión a compra, o incluso podría resultar engañoso y deteriorar la confianza.
- Lógica comercial: algunos campos se usan como información de entrada para la lógica comercial en nuestro backend. Por ejemplo, el campo google_product_category identifica la tasa impositiva de tu producto. También se usa para determinar si el producto cumple con los requisitos de protección de compra. Una categoría de producto errónea puede afectar los cálculos impositivos y, en consecuencia, dar importes impositivos incorrectos.
 En relación con las tiendas de Facebook, los clientes deben cargar en una tienda una cantidad mínima de información sobre sus productos. El mismo requisito rige para una campaña de anuncios del catálogo Advantage+. Si tu empresa utiliza la finalización de compra en el sitio, es necesario contar con más campos obligatorios, como quantity_to_sell_on_fb. Obtén más información sobre los campos de catálogo admitidos.

 - Información específica para las categorías: proporcionar información precisa y de gran calidad sobre tus productos ayuda a que los clientes descubran tus artículos y tomen decisiones de compras bien informados. De esta manera, se mejora el catálogo, ya que se proporciona información específica para las categorías de los productos y se garantiza que la información de cada campo sea precisa y esté actualizada.
 Cuando usas campos específicos de categorías, debes proporcionar un identificador de categorías, es decir, una categoría de producto de Google o una de Facebook. Cuando proporcionas uno de los campos de categoría, puedes usar campos adicionales específicos para esa categoría con el fin de proporcionar información más detallada sobre tus artículos.

 A medida que expandamos las funciones de la plataforma, verás que agregaremos más compatibilidad con más casos de uso de campos del catálogo.

 

## Atributos básicos universales

Los productos de tu lista de productos admiten los siguientes atributos básicos universales.

 
- Required Fields (for Ads and Commerce)

- Additional Required Fields for Checkout on Facebook and Instagram (US Only)

- Optional Fields

- Additional Required Fields for Selling in India

 


### Required Fields (for Ads and Commerce)


Each field in your data feed represents information about your products. All field names and certain supported values must be in US English. The following fields are required for each product in your catalog. Note: If any required fields are missing or formatted incorrectly, products may not upload to your catalog.


 
Attribute and Type
 Description id


Type: string


 Max character limit: 100


A unique content ID for the item. Use the item&#039;s SKU if possible. Each content ID must appear only once in your catalog. If there are multiple instances of the same ID, we ignore all instances.


Note: For dynamic ads, this ID must exactly match the content ID for the same item in your Meta Pixel.


Example: 12345


 This field is required for supplementary feeds. Each item’s content ID must exactly match in the supplementary feed and the main feed it’s linked to. This indicates it’s the same item in both feeds.


 title


Type: string


 Character limit: 200, but we recommend a maximum of 65 to avoid longer titles being cut off.


A specific, relevant title for the item. See product title specifications.


Example: Blue Cotton T-Shirt


 This field is supported by supplementary feeds.


 description


type: string


 Max character limit: 9999


A relevant description of the item. Include specific and unique product features, such as material or color. Use plain text (not HTML) and don&#039;t enter text in all capital letters or include any links. The description should be different than the title. See product description specifications.


Example: A comfortable royal blue women&#039;s T-shirt in organic cotton. Cap sleeves and relaxed fit. Perfect for warm summer days.


 This field is supported by supplementary feeds.


 availability


Type: string


 The current availability of the item. Must be written in U.S. English. Supported values:


 
- in stock

- out of stock

 
Items that are out of stock display as "sold out" in your shop. They don&#039;t display at all in your ads.


Example: in stock


 condition


Type: string


 The condition of the item. Supported values: new, refurbished, used.


Example: new


 price


type: string


 The price of the item. Format the price as a number, followed by a space and then the 3-letter ISO 4217 currency code (ISO 4217 standards). Always use a period (.) as the decimal point, not a comma (,). Don&#039;t include currency symbols such as $, € or £.


 To add product information and prices that will display for other countries or languages, upload a country feed or language feed to your catalog.


 Example: 9.99 USD, 7.99 EUR


 link


Type: string


 The URL to the specific product page for the item on your business&#039;s website where people can learn more about or buy that exact item. Links must begin with http:// or https://, be valid and be hosted on your business’s website domain. Don&#039;t provide a link to a Facebook domain (such as your business&#039;s Facebook Page) or somewhere else.


Example: http://www.jaspersmarket.com/products/shirt


 image_link


Type: string


 The URL for the main image of your item. Images must be in JPEG or PNG format, at least 500 x 500 pixels and up to 8 MB. See product image specifications.


Example: http://www.jaspersmarket.com/products/shirt.jpg


Note: If you change the image later, the new image must use a different URL or the change won&#039;t be recognized.


 This field is supported by supplementary feeds.


 brand


Type: string


 Max characters: 100


The brand name of the item.


Example: Jasper&#039;s Market


 

### Additional Required Fields for Checkout on Facebook and Instagram (US Only)


Checkout on Facebook and Instagram (US only) allows customers to complete purchases directly on Facebook and Instagram. To sell items with this checkout method, provide the following additional fields for each product in your catalog. If items are missing these fields, people won&#039;t be able to buy them or they may not show in your shop at all.


 
Attribute and Type
 Description quantity_to_sell_on_facebook


Type: integer


 The quantity of this item that you have available to sell on Facebook and Instagram. Enter a whole number. To prevent overselling, the item&#039;s quantity will be automatically reduced each time a purchase order is confirmed through checkout.


Note: To display as in stock for checkout, an item&#039;s quantity_to_sell_on_facebook must be 1 or higher and its availability must also be set to in stock.


Example: 150


 This field was previously called inventory. While we still support the old field name, we recommend that you use the new name.


 size


Type: string


 Required for items in specific product categories including clothing and shoes.


Max character limit: 200


The size of the item. Enter the size as a word, abbreviation or number, such as "Small", "XL", "12" or "One Size".


Example: Medium


 This field is supported by supplementary feeds.


 

### Optional Fields


You can also include many optional fields to share more product information with customers or control how items are displayed.


 
Attribute and Type
 Description sale_price


Type: string


 If the item is on sale, enter its discounted price. Use the same formatting as the price field.


Example: 7.99 USD


 sale_price_effective_date


Type: two ISO-8601 timestamp


 The date, time and time zone when your sale starts and ends. If you don&#039;t add this field, any items with a sale_price remain on sale until you remove their sale price. Use this format:


YYYY-MM-DDT23:59+00:00/YYYY-MM-DDT23:59+00:00


 
- Enter the sale start date as YYYY-MM-DD followed by a "T".

- Enter the start time in 24-hour format (00:00 to 23:59) followed by the UTC time zone (-12:00 to +14:00).

- Enter a "/". Then, repeat the same format for the date and time when your sale ends.

 

Example (using PST time zone -08:00):


2020-04-30T09:30-08:00/2020-05-30T23:59-08:00


 item_group_id


Type: string


 Max character limit: 100


Allows you to set up variants of the same product, such as different sizes, colors or patterns. Enter the same group ID in this field for all variants of the same product to indicate they&#039;re part of a group. Learn more about product variants.


Example: Shirt_1


 status


Type: string


 Controls whether the item is active or archived in your catalog. Only active items can be seen by people in your ads, shops or any other channels. Supported values: active, archived. Items are active by default. Learn more about archiving items.


Example: active


Note: Some partner platforms such as Shopify may sync items to your catalog with a status called staging, which behaves the same as archived.


 This field was previously called visibility. While we still support the old field name, we recommend that you use the new name.


 additional_image_link


Type: string


 Maximum character limit: 2000


URLs for up to 20 additional images of your item, separated by a comma (,), semicolon (;), space ( ) or vertical bar (|). Follow the same image specifications as image_link.


Since this field takes a string, the entire list of URLs must be formatted with double quotes. For example: "http://www.jaspersmarket.com/products/shirt2.jpg, http://www.jaspersmarket.com/products/shirt3.jpg"


To display additional images in your ads, see Dynamic Ads, Ad Template


 This field is supported by supplementary feeds.


 google_product_category


Type: string


 Provide the most specific Google product category possible from this list: Excel (.xls) or Plain text (.txt). Enter either the category name (not case sensitive) or its ID number.


Example: Apparel & Accessories > Clothing > Shirts & Tops or 212


Learn more about product categories (Business Help Center article).


Note: The category lists above are in US English. You can download other languages from Google Merchant Help Center.


 This field is supported by supplementary feeds.


 fb_product_category


Type: string


 Provide the most specific Facebook product category possible from this list: Spreadsheet (.csv) or Plain text (.txt). Enter either the category name (not case sensitive) or its ID number.


Example: Clothing & Accessories > Clothing > Women&#039;s Clothing > Tops & T-Shirts or 430


Learn more about product categories (Business Help Center article).


Note: The category lists above are in US English. You can download other languages here.


 This field is supported by supplementary feeds.


 Category-specific fields


 When you provide a Google or Facebook product category (google_product_category or fb_product_category), we recommend that you add more fields that are specific to that category. This gives people more information to make a purchase decision. For example, for beauty products, you could provide ingredients. View the list of category-specific fields.


 This field is supported by supplementary feeds.


 color


Type: string


 Max character limit: 200


The main color of the item. Describe the color in words, not a hex code.


Example: Royal Blue


 This field is supported by supplementary feeds.


 gender


Type: string


 The gender your item is targeted towards. Supported values: female, male, unisex.


Example: unisex


 This field is supported by supplementary feeds.


 size


Type: string


 Max character limit: 200


The size of the item. Enter the size as a word, abbreviation or number, such as "Small", "XL", "12" or "One Size".


Example: Medium


 This field is supported by supplementary feeds.


 age_group


Type: string


 The age group the item is targeted towards. Accepted values: adult, all ages, teen, kids, toddler, infant, newborn.


Example: adult


 This field is supported by supplementary feeds.


 material


Type: string


 Character limit: 200
The material the item is made from, such as cotton, polyester, denim or leather.


Example: Organic Cotton


 This field is supported by supplementary feeds.


 pattern


Type: string


 Max character limit: 100


The pattern or graphic print on the item.


Example: Flannel, Gingham, Polka dots, stripes


 This field is supported by supplementary feeds.


 shipping


Type: string


 This allows you to use a shipping-related overlay in your ads.


Shipping details for the item, formatted as: Country:Region:Service:Price


 
- Enter the country as a 2-letter ISO 3166 country code.

- Enter the region, state or province. If shipping information is the same for an entire country, you can leave out the region but keep the :: as shown in the Philippines (PH) example below.

- Enter a description of the shipping service such as Ground or Air.

- Enter the price as a number followed by a space and then the 3-letter ISO 4217 currency code. Note: To use the "Free Shipping" overlay for ads, enter the price as 0.0.

- If you offer different shipping details by region or country, separate them with a comma (,) as shown in the example.

 

Example: US:NY:Ground:9.99 USD, PH::Air:300 PHP


 shipping_weight


Type: string


 Shipping weight of the item in lb, oz, g, or kg.


Example: 10 kg


 internal_label


Type: string


 Add internal labels to help filter items when you create product sets. For example, you could add a “summer” label to all items that are part of a summer promotion and then filter those items into a set. Labels are only visible to you.


Enclose each label in single quotes (&#039;) and separate multiple labels with commas (,). Don’t include white spaces at the beginning or end of a label. Character limit: Up to 5,000 labels per product and 110 characters per label.


#### TSV, XLSX, Google Sheets:


Examples:


 
- One label: [&#039;summer&#039;]

- Multiple labels: [&#039;summer&#039;,&#039;trending&#039;]

 


#### CSV format requires enclosing the list in double quotes.


Examples:


 
- One label: “[&#039;summer&#039;]”

- Multiple labels: “[&#039;summer&#039;,&#039;trending&#039;]”

 


#### The Atom XML format requires to wrap each label:


<internal_label>summer</internal_label>
<internal_label>trending</internal_label>


Internal labels are case insensitive and will be stored lowercased. For example, providing the internal label ‘Summer’, with capital ‘s’, will result in storing ‘summer’, with lowercase ‘s’. To reduce confusion, we suggest using only lowercase characters.


When used in product sets, internal labels are made to be matched as a whole, so please refrain from using the “contains” condition on internal labels. 
Example: 
Given an item with internal label ‘summer_clothes”:


Set filter internal_label is any of ‘‘summer_clothes’ will match the item.


Set filter internal_label contains ‘clothes’ is NOT guaranteed to match the item.


For the best results, we recommend using ASCII lowercase characters and, if needed the following token separators &#039;#&#039; , &#039;_&#039; , &#039; : &#039;.


Note: If you’re currently using custom labels (custom_label_0 to custom_label_4) for filtering product sets, switching to internal labels (internal_label) instead is recommended. Unlike custom labels, you can add or update internal labels as often as needed without sending items through policy review each time, which can impact ad delivery.


 This field was previously called product_tags. While we still support the old field name, we recommend that you use the new name.


 custom_label_[0-4]


Type: string


 Max character limit: 100


Up to five custom fields for any additional information you want to filter items by when you create sets. For example, you could use a custom field to indicate all items that are part of a summer sale, and then filter those items into a set. This field supports any text value, including numbers.


Example: Summer Sale


 This field is supported by supplementary feeds.


 custom_number_[0-4]


Type: int


 Up to five custom fields for any additional number-related information you want to filter items by when you create sets. This field allows you to filter by number ranges (is greater than and is less than) when you create a set. For example, you could use this field to indicate the year an item was produced, and then filter a certain year range into a set.


These fields support whole numbers between 0 and 4294967295. They don&#039;t support decimals or commas, such as 5.5 or 10,000.


Example: 2025


 rich_text_description


Type: string


 Max characters: 9999


The rich text (HTML) description for item. Note: If this field is provided, we use it instead of description; however, the description field is still required because it&#039;s a fallback.


Supported tags include:


 
- <form>, <fieldset>, <div>, <span>, <section>

- All Header tags: <header>, <h1> thru <h6>

- Table tags: <table>, <tbody>, <tfoot>, <thead>, <td>, <th>, <tr>

- List tags: <ul>, <li>, <ol>, <dl>, <dd>, <dt>

- Other formatting tags: <b>, <u>, <i>, <em>, <strong>, <title>, <small>, <br>, <p>, <div>, <sub>, <sup>, <pre>, <q>, <s>

 

Note: Any attributes of the html tags such as <style> will be stripped off from the field.


Example:


<html>
<p>Unisex cotton T-shirt with 3/4 length sleeves in royal blue. Great for everyday casual wear. Features graphic print of logo in white on upper left sleeve.</p>
<ul>
<li>100% Cotton</li>
<li>Relaxed Fit</li>
</ul>
</html>This field is supported by supplementary feeds.


 product_type


Type: string


 Max character limit: 750


Category the item belongs to, according to your business&#039;s product categorization system, if you have one. You can also enter a Google product category. For commerce, represents the product category in your internal system. Learn more about product categories for commerce.


Example: Home & Garden > Kitchen & Dining > Appliances > Refrigerators


 video[0].url


video[1].url


video[2].url


video[3].url ... up to


video[19].url


Type: string


 Up to 20 fields each containing a link to a video of your item. Must be a direct link to download the video file, not a link to a video player such as YouTube.


The maximum video file size is 200 MB. Supported formats include: .3g2, .3gp, .3gpp, .asf, .avi, .dat, .divx, .dv, .f4v, .flv, .gif, .m2ts, .m4v, .mkv, .mod, .mov, .mp4, .mpe, .mpeg, .mpeg4, .mpg, .mts, .nsv, .ogm, .ogv, .qt, .tod, .ts, .vob and .wmv


Example:


http://www.jaspersmarket.com/product_video.avi


 This field is supported by supplementary feeds.


 additional_variant_attribute


Type: string


 Additional attributes that are not core attributes (size, color, gender, pattern, and so on). Do not use a core attribute as an additional attribute. Learn more about Product Variants.


Example: Scent:Fruity, Flavor:Strawberry


 This field is supported by supplementary feeds.


 unit_price


Type: string


 Provide this information for any products customarily sold by a unit of measurement (for example "$10 / pound"). To specify this information, provide the following:


Amount value: this is a float
Currency: any supported currency
Unit type: any of the following measurements:


Centiliters: cl
Centimeters: cm
Count: ct
Cubic Meters: cbm
Feet: ft
Fluid Ounces: fl oz
Gallons: gal
Grams: g
Inches: in
Kilograms: kg
Liters: l
Meters: m
Milligrams: mg
Milliliters: ml
Ounces: oz
Pints: pt
Pounds: lb
Quarts: qt
Square Feet: sqft
Square meters: sqm
Yards: yd


This information is uploaded via feed uploads in the unit_price field in a JSON format as follows:


&#123;value: 10.0, currency: "USD", unit: "lb"&#125;It can also be uploaded via XML as follows:


<unit_price>
 <value>10</value>
 <currency>USD</currency>
 <unit>lb</unit>
</unit_price>Example: Download a sample CSV file with an example of adding unit_price to products.

 gtin


Type: string


 The item’s Global Trade Item Number (GTIN). Providing a GTIN is recommended to help classify the item. The GTIN may appear on the barcode, packaging or book cover. Not all items have a GTIN. Only provide one if you’re sure it’s correct. Don’t include dashes or spaces.


GTIN types:


 
- UPC (North America / GTIN-12): 12-digit number.

- EAN (Europe / GTIN-13): 13-digit number.

- JAN (Japan / GTIN-13): 8 or 13-digit number.

- ISBN (for books / ISBN-13): 13-digit number. Convert any 10-digit ISBN-10 numbers to ISBN-13.

- ITF-14 (for multipacks / GTIN-14): 14-digit number.

 
Example: 4011200296908


 This field is supported by supplementary feeds.


 mpn


Type: string


 Max characters: 100.


The item’s manufacturer part number (MPN), a unique alphanumeric code assigned by the manufacturer in some industries to identify a specific item or part. It may appear on the packaging, label or etched directly onto the item. Providing a MPN is recommended to help classify the item if there is no GTIN. Not all items have a MPN. Only provide one if you’re sure it’s correct.


Example: JAS12345PER


 expiration_date


Type: date


 Product expiration. If the product is expired, it won&#039;t be shown on Facebook. This date should follow the ISO‑8601 (YYYY‑MM‑DD) format.


 return_policy_info


Type: string


 Specify a return window for this item, which overrides your shop&#039;s default return window. Using this field in your data feed is an alternative to setting up a custom return window manually in Commerce Manager. Learn more about return windows.


Indicate whether the item is final sale (true or false) and the number of days of the the return window (for final sale, enter 0 days).


Example of an item with a 30 day return window: &#123;is_final_sale: "false", return_policy_days: "30"&#125;


Example of a final sale item:


&#123;is_final_sale: "true", return_policy_days: "0"&#125;


 mobile_link


Type: string


 Link to mobile-optimized page for item on the merchant&#039;s website.


 applink


Type: string


 Provide deep links in feed following the App Links specification. Deep link information in feed takes precedence over any information we collect with App Links metadata with our web crawler.


If you already have deep link information from App Links, you don&#039;t need to specify this data. Information from App Links is used to display the correct deep link. To display deep links in your ads, see Dynamic Ads, Ad Template.


Supported applinks: applink.ios_url, applink.ios_app_store_id, applink.ios_app_name, applink.android_url, applink.android_package, applink.android_app_name, applink.windows_phone_url, applink.windows_phone_app_id, applink.windows_phone_app_name, applink.ipad_url, applink.ipad_app_store_id, applink.ipad_app_name.


 For Android, we require applink.android_package and url is optional. For other applinks, a valid url is required.


 Learn more about product deep links.


 disabled_capabilities


 Used to control the channel visibility of each specific product in your catalog. With this feature, you can enable or disable your products from being displayed in Shops, Marketplace Shops, Instagram Product Tagging, Dynamic Ads, and Mini Shops.


Learn more about disabled_capabilities.


 

### Additional Required Fields for Selling in India


 
Attribute and Type
 Description origin_country
Type: ISOCountryCode (2 letter country code)


 The item&#039;s country of origin. Enter the two-letter ISO country code


Example value: US


 This field is supported by supplementary feeds.


 importer_name
Type: string


 If the country of origin is not India, provide the legal entity name of the item&#039;s importer


Example value: Jasper&#039;s Market Inc.


 This field is supported by supplementary feeds.


 importer_address
Type: JSON structure


 If the country of origin is not India, provide the operational address of the importer. This field uses a JSON structure, which contains the following fields:


street1 - string, required. The first line of the street address
street2 - string, optional. The second line of the street address.
city - string, required. The city name.
region - string, optional. The region, state or province. (In the US this is to be used for US State)
postal_code - string, optional (in the US this is to be used for Zip Code)
country - required. Enter the ISO Country code (2-letter country code)


The overall address will be displayed to users in the following format:
street1, street2 (if present), city, region (if present) postal_code (if present), country (full name, localized for the user).


This example value:


&#123; street1: "1 Hacker Way", street2: "Building 18", city: "Menlo Park", region: "CA", postal_code: "94025", country: "US" &#125;will be rendered as "1 Hacker Way, Building 18, Menlo Park, CA 94025 United States of America"


 This field is supported by supplementary feeds.


 manufacturer_info
Type: string


 Required for Shops only.


Information about the product&#039;s manufacturer, such as the manufacturer name and address.


Example: The Manufacturer Co. - 1 Hacker Way, Menlo Park, CA 94025 USA


 This field is supported by supplementary feeds.


 wa_compliance_category
Type: string


 Required for selling on WhatsApp only.


If the item is a non-physical good sold in India, such as a service, use this field to indicate that the item is exempt from providing the country of origin (origin_country), importer name (importer_name) and importer address (importer_address).


Supported values (case sensitive):


COUNTRY_ORIGIN_EXEMPT: The item is exempt.


DEFAULT: The item is not exempt. This is the default value if you leave the field blank.


 

## Formatos de lista admitidos

Obtén más información sobre los formatos de lista admitidos.


### Lista CSV de ejemplo

id,title,description,rich_text_description,availability,condition,price,link,image_link,brand,additional_image_link,age_group,color,gender,item_group_id,google_product_category,product_type,sale_price,sale_price_effective_date,size,status,inventory
FB_product_1234,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,blue,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,small,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
FB_product_1235,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,blue,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,medium,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
FB_product_1236,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,blue,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,large,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
FB_product_1237,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,black,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,small,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
FB_product_1238,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,black,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,medium,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200
FB_product_1239,Facebook T-Shirt (Unisex),A vibrant crewneck for all shapes and sizes. Made from 100% cotton.,"<p>A vibrant crewneck for all shapes and sizes. Made from 100% cotton.</p> <p> Made of 52% combed and ringspun cotton, 48% polyester.</p>",in stock,new,9.99 USD,https://www.facebookswagstore.com/American-Apparel-T-Shirt-P395.aspx,https://www.facebookswagstore.com/GetImage.ashx?Path=%7e%2fAssets%2fFB00-0967-Group_Full.jpg&maintainAspectRatio=true&maxHeight=400&maxWidth=400,Facebook,https://www.facebookswagstore.com/Assets/ProductImages/FB00-0475.jpg,adult,black,unisex,FB1234_shirts,Apparel & Accessories > Clothing > Shirts & Tops,Apparel & Accessories > Clothing > Shirts,4.99 USD,2017-12-01T0:00-23:59/2017-12-31T0:00-23:59,large,2.99 USD,2018-11-01T12:00-0300/2018-12-01T00:00-0300,published,200

### Ejemplo de lista XML (Atom)

El prefijo "g" es obligatorio para los atributos en el espacio de nombres de Google Merchant Center: xmlns:g="http://base.google.com/ns/1.0". Para los atributos que no se mencionan aquí, no incluyas el prefijo, como en video, additional_image_link, etc.

 <?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel> 
 <title>My Deal Shop Products</title>
 <description>Product Feed for Facebook</description> 
 <link>https://www.mydealsshop.foo</link>
 <atom:link href="https://www.mydealsshop.foo/pages/test-feed" rel="self" type="application/rss+xml" />
 
 
 <item>
 <g:item_group_id>SKU-123123</g:item_group_id>
 <g:gtin>12345678912345</g:gtin>
 <g:google_product_category>Toys Games > Toys > Executive Toys > Magnet Toys</g:google_product_category> 
 <g:id>SKU-123123-RED</g:id>
 <g:title>WidgetThing</g:title> 
 <g:description>This product is the product you need to do the thing</g:description>
 <g:link>https://www.mydealsshop.foo/products/widgetthing</g:link>
 <g:image_link>https://cdn.mycdn.foo/files/123123123.jpg</g:image_link> 
 
 <additional_image_link>https://cdn.mycdn.foo/files/123123123_image2.jpg</additional_image_link> 
 <additional_image_link>https://cdn.mycdn.foo/files/123123123_image3.jpg</additional_image_link>
 
 <color>Red</color> 
 
 <additional_variant_attribute>
 <label>Style</label>
 <value>Cool</value>
 </additional_variant_attribute>
 
 <g:brand>AcmeCo</g:brand>
 <g:condition>New</g:condition> 
 
 <g:availability>in stock</g:availability>
 
 <g:price>19.99 USD</g:price>
 <g:sale_price>9.99 USD</g:sale_price>
 
 </item> 

 <item>
 <g:item_group_id>SKU-123123</g:item_group_id>
 <g:gtin>12345678912346</g:gtin>
 <g:google_product_category>Toys Games > Toys > Executive Toys > Magnet Toys</g:google_product_category> 
 <g:id>SKU-123123-GREEN</g:id>
 <g:title>WidgetThing</g:title> 
 <g:description>This product is the product you need to do the thing</g:description>
 <g:link>https://www.mydealsshop.foo/products/widgetthing</g:link>
 <g:image_link>https://cdn.mycdn.foo/files/123123123.jpg</g:image_link> 
 
 <additional_image_link>https://cdn.mycdn.foo/files/123123123_image2.jpg</additional_image_link> 
 <additional_image_link>https://cdn.mycdn.foo/files/123123123_image3.jpg</additional_image_link>
 
 <color>Green</color> 
 
 <additional_variant_attribute>
 <label>Style</label>
 <value>Cool</value>
 </additional_variant_attribute>
 
 <g:brand>AcmeCo</g:brand>
 <g:condition>New</g:condition> 
 
 <g:availability>in stock</g:availability>
 
 <g:price>19.99 USD</g:price>
 <g:sale_price>9.99 USD</g:sale_price>
 
 </item> 
 

 </channel>
</rss> 

## Más información

 - Categoría de producto de Google para los artículos del catálogo, Servicio de ayuda
- Prácticas recomendadas, Catálogo comercial
- Categorías de productos
- Campos específicos de categorías
- Campos admitidos, Catálogo
- Campos específicos de categorías, Atributos adicionales
- Especificaciones de las imágenes de productos, Campos admitidos
- Especificaciones de los títulos de productos, Campos admitidos
- Especificaciones de las descripciones de productos, Campos admitidos
- Crear un archivo de lista de datos para artículos del catálogo
- Especificaciones de listas de datos para catálogos
- Información sobre la finalización de compra en Facebook e Instagram, Servicio de ayuda para empresas
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Product Categories - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/categories

Product Categories - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Product Categories


Providing high quality information about your products helps customers discover your items and make well-informed purchase decisions.


 

## When to Use Product Categories


A product category is a taxonomy that describes the specific type of items you sell. For example, Apparel & Accessories > Clothing > Shirts & Tops. There are two types of optional categories you can add for items in your catalog: Google product category (GPC) or Facebook product category (FPC).


In general, we recommend adding a GPC for each product. GPC may contribute to improving your ad performance and can be used to:


 
- Create product sets by filtering categories

- Determine whether items require a size (US only)

- Set up custom return windows per category (US only)

 

As an alternative, FPC can be used to:


 
- Determine whether items require a size (US only)

- Override the tax category automatically assigned to an item by Meta (US only)

 

Learn more about how to add a Google or Facebook product category for items in your catalog (Help Center article).


 Product category is only relevant for products (ecommerce), not for other types of catalog inventory.


 

## Product Category Taxonomies


To enhance your catalog and help customers discover your items online, enter a Google product category (GPC) or Facebook product category (FPC) for your items and then add more information specific to each category. FPC and GPC are taxonomies that organize items for sale into categories and subcategories. You can use FPC, GPC, or both. Provide the most specific category possible for each item.


### Google Product Category


The Google product category (GPC) (google_product_category) represents the item according to the Google&#039;s product taxonomy.


Use the category&#039;s taxonomy path or its category ID number, listed here.


Example: Apparel & Accessories > Clothing > Shirts & Tops or 212


 

### Facebook Product Category


The Facebook product category represents the item according to the Facebook product taxonomy. This taxonomy organizes products for sale into categories and subcategories. For example, Health & Beauty > Beauty > Makeup > Eye Makeup > Mascara.


To provide a Facebook product category for your items:


 
- Add the fb_product_category field in your data feed file.

- In this field, enter a supported category from the list below. Facebook product categories are available in multiple languages.

- Download the list of categories in your language below; for example, U.S. English (Plain text (.txt) | Spreadsheet (.csv)).

 

For each category, you can provide either the taxonomy path (such as Health & Beauty > Beauty > Makeup > Eye Makeup > Mascara) or the category ID number (such as 281). Category names are not case sensitive.


When you provide a Facebook product category, you can also use additional fields specific to that category to provide more detailed information about your items.


 

## Tax Calculations


We automatically assign a category to each item in your catalog based on its title, description and other details. Alternatively, you can provide a Facebook product category for each item yourself, which overrides our automatic category assignment. Tax rates and taxability for specific product categories vary based on state laws.


Learn more about how we determine sales tax (Help Center article).


 

## Category-Specific Fields


We recommend providing more information about your products to help customers discover your products and make purchase decisions.


 When using category-specific fields, sellers must provide a category identifier — a Google product category or a Facebook product category.


 The recommended category-specific fields are all optional. You can also use additional attributes by category.


 Recommended Additional Apparel & Accessories


 Apparel & Accessories


 Home


 Home


 Jewelry & Watches


 Jewelry & Watches


 Health & Beauty


 Health & Beauty


 Electronics


 Electronics


 Baby Products


 Baby Products


 

## Learn More


 

### Policies and Requirements


 
- Purchase Protection policies and requirements

 


### About Tax


 
- Tax calculations

- About tax settings in Commerce Manager, Help Center

 


### Enhance Your Catalog


 
- Best Practices, Commerce Catalog

- How to Use Catalog Fields

- Supported Fields, Catalog

- Universal Attributes

- Create a Data Feed File for Catalog Items, Help Center

- Data Feed Specifications for Catalogs, Help Center

- Checkout on Facebook and Instagram, Help Center

 
 

### Taxonomies and Categories


 
- Google&#039;s product taxonomy

- Facebook product categories, in multiple languages

- Google product category for catalog items, Help Center

 


### About Checkout


 
- About Checkout on Facebook and Instagram, Business Help Center

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Product Variants - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/variants

Product Variants - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Product Variants


Product variants are created by adding multiple products grouped by the same item_group_id field. This field typically corresponds to the parent SKU, although you can use any other ID to group variants together.


 All variants for a given product item_group_id must have populated every variant field (for example, size, color, gender, and pattern). For custom variants, you can use the additional_variant_attribute field.


Make sure the item_group_id has the same value across all sizes and colors, and that images and external links match the color of the item.


 
Incorrect — “CoolShirt123” is sent as a parent SKU and the color field is not populated. Because each line item in the field spec needs to be its own product, this is an incorrect way of setting up products.


 ID
 Name
 Color
 Price
 item_group_id
 CoolShirt123


 Cool shirt (parent)


 $9.99


 CoolShirt123


 CoolShirt123_red


 Cool Shirt - Red


 red


 $9.99


 CoolShirt123


 CoolShirt123_blue


 Cool Shirt - Blue


 blue


 $9.99


 CoolShirt123


 Correct — This example shows the correct way to set up products. The name of the product and the item_group_id fields match (so that the name does not change when variants are selected, but images do). Both of the items below would roll into one “virtual” parent item.


 ID 
 Name 
 Color 
 Price 
 item_group_id 
 CoolShirt123_red


 Cool Shirt


 red


 $9.99


 CoolShirt123


 CoolShirt123_blue


 Cool Shirt


 blue


 $9.99


 CoolShirt123


 For details about the fields, see Reference.


 

## Product Group Variants Example


You can specify variants for a product in the form of a product group. An example of variants is a tee-shirt with 3 sizes (S, M, L) and 4 colors (Red, Yellow, Blue, Green). In this case, we can create a product group (with retailer id as tee-shirt and 12 individual products consisting of the variant options (S+Red, M+Red, L+Red, S+Yellow, M+Yellow, L+Yellow, S+Blue, M+Blue, L+Blue, S+Green, M+Green, L+Green).


Include these columns for the product_group in the product feed. The other required columns are excluded from this example for simplicity&#039;s sake, but you need to specify them in the actual feed file.


 ID 
 item_group_id 
 Size 
 Color 
 tee-shirt-S-Red


 tee-shirt


 S


 Red


 tee-shirt-M-Red


 tee-shirt


 M


 Red


 tee-shirt-L-Red


 tee-shirt


 L


 Red


 tee-shirt-S-Yellow


 tee-shirt


 S


 Yellow


 tee-shirt-M-Yellow


 tee-shirt


 M


 Yellow


 tee-shirt-L-Yellow


 tee-shirt


 L


 Yellow


 tee-shirt-S-Blue


 tee-shirt


 S


 Blue


 tee-shirt-M-Blue


 tee-shirt


 M


 Blue


 tee-shirt-L-Blue


 tee-shirt


 L


 Blue


 tee-shirt-S-Green


 tee-shirt


 S


 Green


 tee-shirt-M-Green


 tee-shirt


 M


 Green


 tee-shirt-L-Green


 tee-shirt


 L


 Green


 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# API de colección de conjunto de productos - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/collections

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

---
# Cantidad para vender - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/quantity-to-sell

Cantidad para vender - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
La traducción en español no está disponible todavía. Actualización del documento en inglés: 26 abr. 2024 
Actualización del documento en español: 26 oct. 2022 

# Quantity to Sell


The quantity_to_sell_on_facebook field in your catalog represents the stock level for each product available to sell on your Facebook Shop or Instagram Shopping account. This value is reflected in the Product Details Page (PDP) and helps buyers understand how many items are available. Keeping it accurate and up-to-date is instrumental to the experience, as it dictates when your products are out-of-stock or can lead to overselling if incorrect.


 NOTE: The quantity_to_sell_on_facebook field is replacing the inventory field, which is being deprecated. While we will support the old field name in the near term, we recommend that you use the new name. See Supported Fields for Products - Advantage+ Catalog Ads & Commerce for more about this update.


 Note: An item without quantity to sell setup cannot be tagged or purchased. However, you still can use it for Advantage+ catalog ads without checkout.


 

## Quantity to Sell Fluctuation


The quantity_to_sell_on_facebook field is dynamic, which means that its value fluctuates as people buy products from your Facebook Shop or Instagram Shopping account. Whenever a user places an order, the quantity level of the corresponding products is decremented.


The Commerce Platform automatically increment this value or re-stocks the product in case of user-initiated cancellations.
In the case of seller-initiated cancellations, you can re-stock a product at cancellation time and increment the corresponding quantity level by setting the restock_items field of the cancellations API endpoint.


 The value that you provide via catalog uploads or other techniques (see Quantity Update Strategies for more information) is considered the source of truth, and is always used to overwrite the value cached on our backend.


 We keep the following types of quantity counts on our end:


 
- The quantity to sell is the value that you provide via product catalog uploads or other techniques (see Quantity Update Strategies for more information).

- The available quantity is the value that customers can purchase and it takes into consideration unconfirmed orders.

 

To learn more about these quantity types, see Product Life Cycle.


 

## Out-of-Stock Products


As people purchase products on your Facebook Shop or Instagram Shopping account, the quantity value is decremented. When this value reaches 0, we mark the product as &#039;Out-of-Stock&#039; and restrict anyone from purchasing additional units. You should do a best-effort attempt at restocking your products regularly as &#039;Out-of-Stock&#039; products negatively affect the user experience and your brand perception.


If a buyer finds an Out-of-Stock product, we try our best to switch the Product Details page to a variant that has units &#039;In-Stock&#039; based on the quantity value of the product&#039;s variant in your catalog.


 

## Discontinued Products


When a product is discontinued, you may be tempted to simply delete it from your catalog. We don&#039;t recommend this.


Deleting products from your catalog may cause undesirable effects, such as product tags and images disappearing. We strongly recommend that you only delete products after a significant time has passed (months).


Instead of deleting products, you should set the visibility field of a discontinued product to staging. This ensures that the Commerce Platform can link your product back to a known entity and manage different situations gracefully.


 

## Product Life Cycle


Every time you update quantity, we update the quantity to sell. This number does not correspond to the number of items available for customer purchase. We track incoming orders (which may be in different states) and subtract unconfirmed orders to calculate a final available quantity. This number may not be exposed outside of our platform.


 Available Quantity = Quantity to Sell - Unconfirmed Orders.


 After orders are acknowledged, there is a 30 minute buffer to allow you to process orders and update quantity numbers (via the catalog) before we remove those acknowledged orders from our counter.


 

## Over-selling


To scale the Commerce Platform to thousands of merchants, we&#039;ve made a conscious decision to not support synchronous quantity management. As a consequence, we don&#039;t support making atomic purchase transactions coupled with decrementing stock levels in your warehouse. If your quantity to sell is shared across multiple channels, you may unexpectedly over-sell products on Facebook or Instagram. This could happen for fast-selling products available in limited quantity.


 When you cannot fulfill orders due to over-selling situations, you should initiate a cancellation and set the reason_code to OUT_OF_STOCK.


 If you are frequently faced with over-selling, you can process orders at a more frequent basis, and adjust the quantity level of your products accordingly.


 

## Quantity Integration Strategy


You can update quantity in a different way depending on the type of integration you are doing:


 
- Via Commerce Manager UI (small product set, testing, and so on)

- A feed with scheduled or manual upload

- Using the Feed API

- Using the Items Batch API

 
 

## Quantity Update Strategies


Because of the asynchronous nature of distributed systems, the quantity value in your product catalog may go out-of-sync, regardless how fast you update your quantity levels. Below are some techniques that you may want to consider, to minimize race-conditions.


### Pre-allocated Quantity


The most effective way to avoid over-selling is to pre-allocate quantity to your Facebook Shop or Instagram Shopping channels. Dedicating quantity for each of your sales channels guarantees that sales happening on any individual channel do not interfere with each other. This strategy can be applied to part or the totality of your catalog.


### Slow-Selling Products


For products that sell at a normal pace, or those with deep quantity, the risk of over-selling is relatively low. In this situation, you can keep your catalog update strategy simple:


 
- Configure a scheduled feed for daily/hourly updates. This feed should contain all fields, including the most up-to-date quantity_to_sell_on_facebook value.

 


### Fast-Selling Products


For fast-selling products, with shallow or very dynamic quantity, you may want to update volatile fields such as quantity_to_sell_on_facebook in a more timely basis. You can use the Items Batch API for this purpose. Here&#039;s a general strategy that you can follow:


 
- Configure a scheduled feed for daily/hourly updates. This feed should contain all mandatory catalog fields, and omit volatile fields such as quantity_to_sell_on_facebook. The purpose of this feed is to update fields that are more static in nature, and defer the updates of volatile fields using the Items Batch API.

- Use the Items Batch API to update volatile fields such as quantity_to_sell_on_facebook when the value changes in your backend, or at a fixed frequency. It is important that the fields updated using this technique are not included in your feed for consistency reasons.

 

Here&#039;s an example of updates using the Items Batch API:


curl \
 -H "Content-Type: application/json" \
 -X POST \
 -d &#039;&#123;
 "access_token": "<ACCESS_TOKEN>",
 "item_type": "PRODUCT_ITEM",
 "requests": [ 
 &#123;
 "method": "UPDATE",
 "data": &#123;
 "id":"SKU1234567",
 "quantity_to_sell_on_facebook": "1337",
 &#125;
 &#125;
 ]
 &#125;&#039; \
 https://graph.facebook.com/v9.0/<CATALOG_ID>/items_batchItems Batch API requests are asynchronous. You should check for the request status and its result to make sure that all your updates are successful. See the Items Batch API documentation for more information.


If you are managing a small number of products, you can also update each product individually using the Graph API directly in lieu of the Items Batch API. Because of Graph API rate-limiting and throttling, this approach is only applicable to a small number of products. The exact number of products you can update using this approach depends on the quota applied to your Facebook app, a good rule of thumb is that you should use the Items Batch API if you are updating more than a dozen products at a time.


To update specific fields inside a product, you can make the following API call:


curl \
 -H "Content-Type: application/json" \
 -X POST \
 -d &#039;&#123;
 "access_token": "<ACCESS_TOKEN>",
 "quantity_to_sell_on_facebook": "1337"
 &#125;&#039; \
 https://graph.facebook.com/v9.0/<FACEBOOK_PRODUCT_ID>If using the Graph API, use a Facebook product ID. If using the Items Batch API, use your own ID, also known as the retailer_id.


 

### Quantity Thresholds


Another common technique to mitigate against over-selling is to take a cautious approach to quantity allocation. For example, when a particular item is close to running Out-of-Stock, as identified in your warehouse, you can set the quantity level in your catalog to zero. This is effectively an optimization for under-selling, but can help if over-selling is a concern.


If you know how fast each of your products sell, you can partition them into different buckets and apply a different threshold for each bucket depending on its selling profile. Fast selling products will typically need a higher threshold value, while slow selling products can probably use a lower threshold value for being marked Out-of-Stock.


 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Batch API Reference - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/batch-api

Batch API Reference - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Catalog Batch API - Commerce


Use the Catalog Batch API for these use cases:


 
- If you have large catalogs, such as a catalog containing millions of items with quickly changing inventory. You can create, update, and delete multiple items in a single HTTP request.

- If you need to create and update product information more often than once an hour (otherwise, use the Feed API). You can update multiple items in a single HTTP request.

 
 

## How It Works


The Catalog Batch API for Commerce consists of the following endpoints:


 
Endpoint
 
Description
 
See Guide
 POST /&#123;catalog_id&#125;/batch


 Sends a batch of requests (create, update, delete) for an ecommerce catalog. Used only for product items.


 Send Item Updates


 POST /&#123;catalog_id&#125;/items_batch


 Sends a batch of requests (create, update, delete) for a catalog. Used for a variety of different objects, such as products, hotels, hotel rooms, flights, destination, home listings, vehicle, and vehicle offers.


 Send Product Updates


 GET /&#123;catalog_id&#125;/check_batch_request_status


 Checks the status of a batch request. Use a handle (returned from a call to &#123;catalog_id&#125;/batch) and make a GET call.


 Check Batch Request Status


 The parameter names for /&#123;catalog_id&#125;/batch and /&#123;catalog_id&#125;/items_batch may appear to be similar, but they are distinctly different.


 

## Next Steps


Use the Catalog Batch API guides to help you perform common actions with the Catalog Batch API.


 
- Send Item Updates - /&#123;catalog_id&#125;/batch


Overview

- Supported Fields

- Product Catalog Batch, Reference

 
- Send Product Updates - /&#123;catalog_id&#125;/items_batch


Overview

- Supported Fields

- Product Catalog Items Batch, Reference

 
- Check Batch Request Status - /&#123;catalog_id&#125;/check_batch_request_status


Overview

- Supported Fields

- Product Catalog Check Batch Request Status, Reference

 
 
 

## Learn More


 
- Catalog

- Product Catalog, Reference

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Best Practices - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/best-practices

Best Practices - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Best Practices


We recommend that you use this checklist to maximize the quality of your commerce catalog:


 
- Store the product feed ID

- Create inventory with the Catalog Batch API support

- Schedule feeds

- Set up catalog during seller onboarding

- Ensure that fields are visible

- Ensure that the format is accurate for specific fields

- Check for timely and accurate responsiveness

- Selecting products for ads and/or commerce

 
 

## Product Feed ID


The product feed is used as the primary source for updating product catalogs on Facebook, and fetched by Facebook periodically according to the configured interval. You should store the product feed ID, and use it to get upload status, errors, and to change upload schedule.


 

## Catalog Batch API Support


Batch API is a great way to update items more than once an hour. You can update up to 5,000 items with up to 100 calls per hour. To create inventory, use the Feed API, Reference, Advantage+ Catalog Ads or Feed API, Reference, Commerce Platform.


 

## Scheduled Feeds


Scheduled feeds don&#039;t support uploads more frequently than once per hour. If you need to update inventory faster, use the Direct Upload API or Batch API.


Schedule replace feed outside of working hours to avoid product update lag.


 

## Seller Onboarding


Set up your catalog during seller onboarding and upload or configure your products using the Product Feed API. Reuse ads catalog to get benefits of using offsite and onsite signals.


 

## Visibility


 
- The id, title, description, price, quantity_to_sell_on_facebook, link, image_link fields should be visible.

- The gtin or mpn plus brand fields should be visible.

- The rich_text_description (preferably) or description fields should be visible, well formatted (no extra spacing, punctuation is correct), and informative (may contain information on item size, volume, origin, and so on).

- Ensure that the variant field&#039;s (such as size or color) value is visible for every product variant sharing a common item_group_id, even those that are out of stock.

 
 

## Format


 
- Ensure that the description does not contain HTML tags or character entities.

- Ensure that the price is in the correct format and currency.

- Ensure that the sale_price is provided for items on sale.

 
 
- Ensure that the google_product_category is (at minimum) 2 levels deep. Alternatively, use fb_product_category. Note that fb_product_category must be at least 3 levels deep (if a third level exists) to override our automatic tax calculation Learn about How to add a Google or Facebook product category for items in your catalog (Help Center article).

- Ensure that product variants are sharing the same item_group_id.

- Ensure that the availability and quantity_to_sell_on_facebook fields are populated according to an agreed upon strategy.

- Use additional_image_link to add more product images (up to 10).

- Make sure that product images satisfy catalog requirements.

- Make sure that product titles satisfy catalog requirements.

- Make sure that product descriptions satisfy catalog requirements.

 
 

## Responsiveness


 
- Ensure that the link URL responds with HTTP 200 OK.

- Check the product catalog diagnostics tool for the following information each time you upload a new product feed:


Fix all upload errors, a product marked with an error will be rejected from your catalog.

- Verify all warnings, some of warnings may affect product ingestion and prevent your product from being tagged or available for purchase.

- Ensure that each product complies with the Facebook Commerce Policies. Product that violate the policy will be marked as rejected and will not be available for tagging or purchase.

 
 
 

## Select Products for Ads or Commerce


For products that are used for Advantage+ catalog ads, create product sets which include only relevant products.


For Facebook Marketplace or Instagram Shopping with Checkout add quantity_to_sell_on_facebook only for checkout products. Products that do not have a quantity_to_sell_on_facebook set will not appear on checkout surfaces.


 

## Localized Catalog Setup


When using localized catalog make sure that the main catalog feed has US as default country and the main currency is USD, otherwise the checkout would not work.


 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Localized Catalog for Instagram Shopping - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/localized

Localized Catalog for Instagram Shopping - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Catálogo localizado para etiquetado de productos en Instagram


## Información general

Usa esta guía para configurar tu catálogo localizado para etiquetado de productos con varios idiomas y países.

Un catálogo es un objeto (o contenedor) con información sobre tus productos, al que puedes subir el inventario.

 

## Cómo funciona

Facebook proporciona funcionalidad de catálogos localizados, lo que te permite configurar tu catálogo de productos para mostrar artículos en anuncios o tiendas de artículos en diferentes países. La localización de la divisa, el precio, el nombre traducido o la descripción son casos comunes. También puedes proporcionar la URL de un producto localizada para que el cliente pueda navegar al sitio web del producto específico de su país o idioma.

Si agregas información de localización a tu catálogo, puedes mostrar información localizada de productos a los usuarios en función de su país o idioma, por ejemplo:

 - En una sola publicación de Instagram: mostrar inglés/USD a las personas en los EE. UU. e italiano/euros a los usuarios de Italia. Consulta el ejemplo a continuación.
- Mostrar solo las etiquetas de compras de Instagram en países para los que tu catálogo tiene información de precios.
 
 

## Configurar el catálogo localizado

Si deseas configurar tu catálogo localizado para "Comprar en Instagram", te recomendamos que leas lo siguiente:

 - Configuración del catálogo localizado
- Catálogo localizado de anuncios de catálogo Advantage+
- Configurar un catálogo para varios idiomas y países, servicio de ayuda de anuncios
 

## Comenzar a crear publicaciones de compras en Instagram


### Antes de empezar

 - Trabaja con tu contacto de Instagram para confirmar que leíste nuestra política y que aceptaste las Condiciones del servicio (el acuerdo estándar).
- Selecciona un catálogo de productos para usarlo en tus publicaciones de compras en Instagram.
- Agrega etiquetas de productos en publicaciones o historias de Instagram ¡y compártelas!
- Vista previa de la información localizada del producto en el administrador de ventas; consulta Configurar un catálogo para varios idiomas y países.
- Localiza tu catálogo por nombre y cambia de catálogo, si es necesario. En la app de Instagram, toca Configuración > Compras.
 

### Qué puedes esperar

Cuando agregas productos en Instagram, puedes ver la información del producto en tu propio país o idioma. Una vez que la publicación se comparte con el público, puedes ver la información del producto en su propio país o idioma, tal como lo especificaste al configurar tu catálogo. El idioma se determina según la configuración del idioma de su teléfono o app, mientras que su país se define en función de la ubicación.


### ¿Quién verá mis etiquetas de "Comprar en Instagram"?

Si subiste una lista de países a tu catálogo o estableciste el país predeterminado de tu catálogo mediante la página Configuración del administrador de ventas, solo las personas de los países para los que tienes precios en tu catálogo podrán ver tus etiquetas. Si tomas las siguientes medidas:

 - Eliges EE. UU. como país predeterminado de tu catálogo
- Subes los precios en USD a tu lista principal
- Subes los precios en GBP a tu lista de reemplazo de Reino Unido
 Entonces:

 - En EE. UU., tus etiquetas se verán con los precios en USD.
- En el Reino Unido, tus etiquetas se verán con los precios en GBP.
- En otros países, tus etiquetas se verán con los precios en USD.
 Los artículos de tu lista principal son visibles en todo el mundo, excepto que se cuente con el correspondiente reemplazo en relación con un país específico.

 Ten en cuenta que si subes artículos a tu lista principal en varias divisas, es posible que los artículos aparezcan en tu publicación etiquetada en distintas divisas cuando se los vea desde cualquier lugar del mundo.

 

## Prácticas recomendadas

 - Asegúrate de que las imágenes de los productos cumplan los requisitos del catálogo.
- Asegúrate de que los títulos de los productos cumplan los requisitos del catálogo.
- Asegúrate de que las descripciones de los productos cumplan los requisitos del catálogo.
 

## Más información

 - Para obtener todos los detalles, consulta Configurar un catálogo para varios idiomas y países, servicio de ayuda para anunciantes.
- Agregar etiquetas de producto en publicaciones de Instagram
- Configuración del catálogo localizado
- Catálogo localizado de anuncios de catálogo Advantage+
- Crear un anuncio de catálogo Advantage+ en varios idiomas y países, servicio de ayuda de anuncios
- Crear una plantilla de contenido
- Catálogo de productos, API de marketing
- Listas programadas, catálogo
- Campos admitidos para anuncios de catálogo Advantage+
- Anuncios de catálogo Advantage+: crear anuncios
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Actualizar catálogos de anuncios - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/updating

Actualizar catálogos de anuncios - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
La traducción en español no está disponible todavía. Actualización del documento en inglés: 11 oct. 2023 
Actualización del documento en español: 17 ago. 2022 

# Updating Ads Catalog to Commerce Catalog


We recommend using a single catalog to advertise and sell on Facebook. Using one catalog helps build your audience more effectively, resulting in better product ranking for your users and improving your ads and sales performance. You can also manage inventory more efficiently, as all your items will be in one place. Finally, using one catalog is more convenient because it ensures that all the items used in your ads are also accessible to sell in your shop, keeping the information in your catalog consistent across both use cases.


To use an existing ads catalog for commerce, we require certain additional fields. We also recommend adding richer product information such as variants and additional images to help customers discover your products and make purchase decisions.


This document outlines the steps required to:


 
- Onboard your ads catalog to Shops

- Add variants

- Add additional fields for commerce

- Create a new catalog

 
 

## 1. Steps to Onboard Your Ads Catalog to Shops


 
- Find your most high-performing ads catalog: If you have multiple catalogs already, we recommend you use the one that is used the most. This will likely be the catalog with a full inventory and up-to-date information and pricing. To view all your catalogs, go to Business Manager > Business Settings > Catalogs

- Identify whether your ads catalog already has variants: Variants represent stock keeping units (SKUs). If you sell clothing and accessories, you likely keep stock by size and color (for example, Winter Coat Small Black). You can check this by looking at your feeds and seeing if each record represents an SKU.


If you have multiple records for Winter Coat, then you have variants

- If you only have one record for Winter Coat, then you do not have variants. If this is the case, then you need to update your feeds to contain variants before you use this catalog for Shops (see the Add Variants section below).

 
 

 
- Update your catalog items to include additional fields for commerce: See the Add Additional Fields for Commerce section below for more details on the fields required

 
 If you face issues that block you from using your ads catalog for Shops, please contact your Facebook representative to discuss options. If no other option suits your needs, you may create a new catalog now and look to migrate to one catalog at a later stage. Please see the Create a New Catalog section for more details.


 

## 2. Add Variants


Variants represent product SKUs, that is, the unit at which you keep stock. If you sell clothing and accessories, then you likely keep stock in sizes and colors. Some other categories also keep stock in other variants such as capacity, style, and so on. You can find out if your catalog has variants by looking at the records of your existing feeds:


### Example A: Feed without variant


 ID
 Title
 Item_Group_ID
 Price
 Quantity_to_Sell
 _on_Facebook
 10024


 Winter Coat


 ABC


 $299


 40


 10025


 Winter Jacket


 DEF


 $159


 10


 

### Example B: Feed with variants


 ID
 Title
 Item_Group_ID
 Size
 Color
 Price
 Quantity_to_Sell
 _on_Facebook
 10024_1_000


 Winter Coat


 ABC


 S


 BLACK


 $299


 4


 10024_2_000


 Winter Coat


 ABC


 M


 BLACK


 $299


 4


 10024_3_000


 Winter Coat


 ABC


 L


 BLACK


 $299


 0


 10024_1_00F


 Winter Coat


 ABC


 S


 BLUE


 $299


 5


 10024_2_00F


 Winter Coat


 ABC


 M


 BLUE


 $299


 1


 10024_3_00F


 Winter Coat


 ABC


 L


 BLUE


 $299


 0


 Important: Unfortunately, you can’t simply replace your feed A with feed B, because this will cause your item with ID 10024 to be deleted from your catalog. Doing so will negatively impact your existing Advantage+ catalog ads performance, as we will need to rebuild product ranking for your new IDs. Doing this could take a few days or a few weeks (timing mostly dependent on your Facebook pixel).


Please note: A Facebook pixel is required for Advantage+ catalog ads. Your pixel sends an event to Facebook when a user views a product, adds it to cart or purchases it. It sends this event with either content_type=”product” (ID: 10024) or content_type=”product_group” (ITEM_GROUP_ID ABC).


fbq(&#039;track&#039;, &#039;AddToCart&#039;, &#123;
 value: 299,
 currency: &#039;USD&#039;,
 contents: [
 &#123;
 id: &#039;10024&#039;,
 quantity: 1
 &#125;],
 content_type: &#039;product&#039;,
&#125;);OR


fbq(&#039;track&#039;, &#039;AddToCart&#039;, &#123;
 value: 299,
 currency: &#039;USD&#039;,
 contents: [
 &#123;
 id: &#039;ABC&#039;,
 quantity: 1
 &#125;],
 content_type: &#039;product_group&#039;,
&#125;);

### How long would it take to rebuild product rankings if the item information in your catalog was completely replaced?


- If your pixel sends events with content_type="product", then when upgrading from A to B, it will never rebuild product ranking. You will need to update your pixel to send events with content_type="product_group" before upgrading, or change the content ID to match the new IDs.

- If your pixel sends events with content_type="product_group", then it depends on the number of daily events matching your products. You can see this by going to Commerce Manager > Catalog > Events > Select the Event Source (pixel) > See All Website Conversions > Click on “Purchase” events and then look at the graph below. The number of events matched should be greater than zero and potentially constant for the past few days


### Is there a way to avoid the performance degradation?


Yes, you can make the B feed as follows:


 ID
 Title
 Item_Group_ID
 Size
 Color
 Price
 Quantity_to_Sell
 _on_Facebook
 10024


 Winter Coat


 ABC


 S


 BLACK


 $299


 4


 10024_2_000


 Winter Coat


 ABC


 M


 BLACK


 $299


 4


 10024_3_000


 Winter Coat


 ABC


 L


 BLACK


 $299


 0


 10024_1_00F


 Winter Coat


 ABC


 S


 BLUE


 $299


 5


 10024_2_00F


 Winter Coat


 ABC


 M


 BLUE


 $299


 1


 10024_3_00F


 Winter Coat


 ABC


 L


 BLUE


 $299


 0


 Notice the first record’s ID is kept as 10024 to be consistent with Feed A. This means that your existing product ranking for the product “Winter Coat” will remain in our system and your Advantage+ catalog ads performance will not be impacted.


### The above solution doesn’t work for me, is there any other solution?


We are aware that this solution may not work for you if you use platforms such as Magento which auto-generate feeds with IDs that map 1:1 with SKUs. If that’s the case, then we are working on an alternative solution which involves adding a new field in Feed B as follows:


 ID
 Title
 Item_Group_ID
 Size
 Color
 Price
 Quantity_to_Sell
 _on_Facebook
 Previous_Retailer_ID
 10024_1_000


 Winter Coat


 ABC


 S


 BLACK


 $299


 4


 10024


 10024_2_000


 Winter Coat


 ABC


 M


 BLACK


 $299


 4


 10024_3_000


 Winter Coat


 ABC


 L


 BLACK


 $299


 0


 10024_1_00F


 Winter Coat


 ABC


 S


 BLUE


 $299


 5


 10024_2_00F


 Winter Coat


 ABC


 M


 BLUE


 $299


 1


 10024_3_00F


 Winter Coat


 ABC


 L


 BLUE


 $299


 0


 Please contact your Facebook representative to be part of the early stages of this solution


 

## 3. Add Additional Fields for Commerce


If your catalog already has variants or if you don’t need to add variants, then the next step is to add the following fields for commerce.


Please see below for considerations when adding these additional fields, as adding them incorrectly may have a temporary negative impact on the performance of your Advantage+ catalog ads.


 
- (Required for checkout only) Add quantity_to_sell_on_facebook

- (Required for checkout only but recommended for all commerce catalogs) Add either fb_product_category or google_product_category, or both, to make your products more discoverable and enable correct tax calculations for checkout, if applicable

- (Optional) Add additional_image_link to provide multiple images

- (Optional) Add sale_price and sale_price_effective_date

- (Optional) Add category-specific attributes such as gender, age_group, material, pattern, and so on

- (Optional) Add rich_text_description if description is over 200 characters

 

More information about all the available fields can be found here.


Important: We do not support multi-country checkout on Facebook and Instagram yet. If your ads catalog is a localized catalog, only the main feed will be used for checkout.


 

## 4. Create a New Catalog


If any of the above solutions do not work for you, please let your Facebook representative know. You can still create a new commerce catalog and onboard to checkout with it. If later on you wish to take advantage of using one catalog, you will need to start running Advantage+ catalog ads with your commerce catalog. Before doing that, please go through the following checklist:


 
- Make sure your pixel events match products in your catalog. You can do this by going to Commerce Manager > Catalog > Events > Select the Event Source (pixel) > See All Website Conversions > “Purchase” events. The number of events matched should be greater than zero and constant for the past few days.

- Run a Advantage+ catalog ads split test between your ads and commerce catalogs. Keep all other variables the same and monitor your key metrics.

- If performance is equal or better, then slowly shift ad spend towards your commerce catalog.

- Over time, you can stop using your other catalogs completely and use your commerce catalog for ads.

 

Please note: It is not possible to connect a new catalog to an existing commerce account. If you created a new catalog for checkout and want to connect it to your commerce account instead of an old catalog, you will have to delete your commerce account and set it up again, connecting the new catalog during the setup process. This may impact your commerce account’s historical orders, payouts, and financial reports.


 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# disabled_capabilities - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/fields/product-visibility-per-channel

disabled_capabilities - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Product Visibility Per Channel


Use the disabled_capabilities field to control the channel visibility of each specific product in your catalog.


With this feature, you can disable certain products from being displayed in Shops, Marketplace, Instagram product tagging, and Advantage+ catalog ads (formerly known as dynamic ads).


By default, all products in a catalog have the capabilities their seller has been onboarded to. Each capability directly corresponds to a particular channel your products can be displayed in.


For example, if you have been onboarded to Shops, your catalog’s products have mini_shops as their default capability. This means your products are displayed in Shops, by default.


To override the default behavior for each product, specify the capability you want to disable in your feed. The disabled_capabilities field takes an array of strings, and each string represents a capability you want to disable.


Currently, you can disable the following capabilities:


 
- mini_shops - Shops on Facebook or Instagram

- marketplace_shops - Marketplace

- ig_product_tagging - Product tagging on Instagram

- da - Advantage+ catalog ads (formerly known as dynamic ads)

 
 

## Feed Example


To hide a product from Facebook or Instagram Shops.


id title description disabled_capabilities ...
1234 Product Title Awesome Product [&#039;mini_shops&#039;]To hide a product from Facebook or Instagram Shops and Advantage+ catalog ads.


id title description disabled_capabilities ...
1234 Product Title Awesome Product [&#039;mini_shops&#039;,&#039;da&#039;]To add a capability to a product:


 id title description disabled_capabilities ...
1234 Product Title Awesome Product "" 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Clothing, Shoes &amp; Accessories - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/categories/cloth-access

Clothing, Shoes & Accessories - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Clothing, Shoes & Accessories


 This category supports clothing, shoes and footwear, and clothing accessories. See also additional supported attributes.


For Google Product Category mapping, see Apparel & Accessories.


 

## Recommended Attributes


Include these attributes to enrich your product details page (PDP) and help buyers during purchase consideration. We advise providing all of them for improved buyer experience.


 Attribute and Type Categories (Note, for some attributes, all sub-categories do not apply. ) Description material


string


 Clothing & Accessories, Sporting Goods


 Primary material(s) of your item. Sample values: Cotton, Linen, Cashmere, Silk.


Provide this attribute for all products where a color, size or material variation exists


 size


string


 Clothing & Accessories, Sporting Goods


 Size as it appears on the label. Includes generic sizes, such as Small and One Size. Includes numeric sizes, such as 2, 4. Sample Values: Small, Medium, Large, 2, 4, 6, One Size.


 height


string


 Boots


 Height of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 length


string


 Socks, Socks & Tights, Casual shirts, Dress shirts, Sporting Goods


 Length of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 width


string


 Belts, Ties, Men’s shoes, Women’s shoes, Sporting Goods


 Width of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 pattern


string


 Women’s clothing, Men&#039;s clothing, Boys’ Accessories, Unisex Accessories & Clothing, Shoes


 Recurring design, pattern, or motif on your item. Sample values: Plaid, Polka Dot, Gingham, Chevron.


 
 

## Additional Attributes


This category also supports additional attributes for Clothing, Shoes & Footwear, Clothing Accessories.


For Google Product Category mapping, see Apparel & Accessories.


### Clothing


 Attribute and Type Description activity


list of strings


 Particular activity for which your item is intended. Multiple values accepted. Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.


 bra_band_size


integer


 Band size of the bra. Sample values: 32, 34, 36.


 bra_cup_size


string


 Cup size of the bra. Sample values: A, B, DD, F.


 character


string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 chest_size


string


 Numeric size of the chest measurement for the item. Does not include generic size; for example, Small. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 47 cm, 16.9 in, 50 cm, 19.7 in.


 closure


string


 Type of fastener used to close your item. Sample values: Zipper, Button, Snap, Drawstring.


 clothing_size_type


string


 General grouping of different sizes based on age and gender. Sample values: Big & Tall, Regular, Big Boys, Big Girls, Full Size, Little Boys, Little Girls, Petite, Plus, Maternity, Baby Boy, Baby Girls, Toddler Boys, Toddler Girls.


 collar_style


string


 Style of collar on your item. Sample values: Banded, Cutaway, Clifford, Tuxedo.


 denim_features


list of strings


 Features, embellishments, and finishes, specific to jeans. Sample values: Distressed, Wrinkled, Ripped, Embroidered, Raw Hem.


 
- To provide multiple values using a single feed denim_features field, the acceptable input format is &#039;Distressed&#039;, &#039;Wrinkled&#039;, &#039;Ripped&#039;, &#039;Embroidered&#039;, &#039;Raw Hem&#039;.

 
 inseam


string


 Numeric size of the inseam for items, such as pants, jeans, and leggings. Does not include generic sizes, such as Small. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 30 in, 34 in, 80 cm, 86 cm.


 is_costume


boolean


 Indicates if the item is intended to be worn as a costume. Sample values: Yes, No.


 is_outfit_set


boolean


 Indicates if the product has 2 or more different items that come as part of a matching or outfit set, such as "matching shirt & pants" or "bra & underwear set". Sample values: Yes, No.


 jean_wash


string


 Post-process wash treatment that may alter color or texture of denim products. Sample values: Acid Wash, Dark Wash, Vintage Wash.


 neckline


string


 Neckline or neck style of the item. Sample values: Crew Neck, Sweetheart, V-Neck, Boat Neck, Turtleneck.


 pant_fit


string


 General fit style of pants. Also applies to jeans. Sample values: Relaxed, Slim, Curvy, Cigarette, Boyfriend.


 sheerness


string


 Amount of sheerness or opacity of an item. Typically used for hosiery items. Sample values: Opaque, Sheer, Semi-Opaque, Semi-Sheer, Ultra Sheer.


 size_system


string


 Size system used by your item; usually corresponds to the country. Sample Values: US, UK, EU, &#039;DE&#039;, FR, CN, IT, BR, MEX, AU.


 skirt_length


string


 Numeric length value of skirts from waist to bottom. Does not include style values, such as Maxi. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 35, 86 cm, 44 in, 140 cm.


 sleeve_length


string


 Numeric length of shirt sleeves. Does not include shirt style, such as 3/4 Sleeve. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 25 in, 63 cm, 29 in, 73 cm.


 sleeve_length_style


string


 Style of sleeve length. Does not include sleeve styles. See sleeve_style attribute. Sample values: 3/4 Sleeve, Long Sleeve, Short Sleeve, &#039;Sleeveless&#039;.


 sleeve_style


string


 Style of sleeves. Does not include sleeve length styles. See sleeve_length_style attribute. Sample values: Flutter, Rolled, Puffed.


 sock_rise


string


 Height style of socks. Sample values: Ankle, Crew, Knee High, Mid Calf, No Show, Over the Knee, Thigh High.


 sport


list of strings


 Particular sport or activity for which your item is intended. Multiple values accepted. Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Tennis&#039;, &#039;Soccer&#039;, &#039;Hiking&#039;, &#039;Running&#039;, &#039;Yoga&#039;, &#039;Basketball&#039;.

 
 sports_league


string


 Particular sports league that your item represents or is associated with. Sample values: NFL, NBA, NASCAR.


 sports_team


string


 Particular sports team that your item represents or is associated with. Sample values: Golden State Warriors, San Francisco Giants.


 standard_features


list of strings


 Standard features related to the item. Sample values: Waterproof, Water Resistant.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Water Resistant&#039;, &#039;Waterproof&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 theme


string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 upper_body_strap_configuration


string


 Strap style for items, such as tops, bras, and swimsuits. Sample values: Racerback, Halter, Strapless.


 waist_rise


string


 Height where the waistline of the item lies on the body. Sample values: Ultra High, Mid, Low.


 waist_style


string


 Style of the waist for the item. Can apply to pants or dresses. Sample values: Banded, Dropped, Empire, Paper Bag.


 

### Shoes & Footwear


 Attribute and Type Description character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 closure


Type: string


 Type of fastener used to close your item. Sample values: Zipper, Button, Snap, Drawstring.


 fabric_care_instructions


Type: list of strings


 Specific care instructions for how the fabric of your item should be cleaned. Instructions are on the item label. Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand Wash.


 
- To provide multiple values using a single feed fabric_care_instructions field, the acceptable input format is &#039;Dry Clean Only&#039;, &#039;Machine Washable&#039;, &#039;Do Not Iron&#039;, &#039;Hand Wash&#039;.

 
 heel_height


Type: string


 Numeric height of the heel on the shoes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 0.5 in, 2 in, 7 cm, 11 cm.


 heel_style


Type: string


 Style of heel on the shoes. Sample values: Wedge, Block, Stiletto, Kitten.


 shoe_type


Type: string


 Type of shoes. Sample values: Flats, Boots, Heels, Sandals, Slippers, Athletic Shoes, Fashion Sneakers.


 shoe_width


Type: string


 Width of shoes. Sample values: A, B, EE, Narrow, Wide.


 size_system


Type: string


 Size system used by your item, usually corresponds to country. Sample values: US, UK, EU,DE, FR, JP, CN, IT, BR, MEX, AU.


 sport


Type: list of strings


 Particular sport or activity for which your item is intended. Multiple values accepted. Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Tennis&#039;, &#039;Soccer&#039;, &#039;Hiking&#039;, &#039;Running&#039;, &#039;Yoga&#039;, &#039;Basketball&#039;.

 
 sports_league


Type: string


 Particular sports league that your item represents or is associated with. Sample values: NFL, NBA, NASCAR.


 sports_team


Type: string


 Particular sports team that your item represents or is associated with. Sample values: Golden State Warriors, San Francisco Giants.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Orthopedic, Waterproof, Water Resistant.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Water Resistant&#039;, &#039;Orthopedic&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 

### Clothing Accessories


 Attribute and Type Description character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 closure


Type: string


 Type of fastener used to close your item. Sample values: Zipper, Button, Snap, Drawstring.


 fabric_care_instructions


Type: list of strings


 Specific care instructions for how the fabric of your item should be cleaned. Instructions are on the item label. Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand Wash.


 
- To provide multiple values using a single feed fabric_care_instructions field, the acceptable input format is &#039;Dry Clean Only&#039;, &#039;Machine Washable&#039;, &#039;Do Not Iron&#039;, &#039;Hand Wash&#039;.

 
 is_costume


Type: boolean


 Indicates if the item is intended to be worn as a costume. Sample values: Yes, No.


 size_system


Type: string


 Size system used by your item, usually corresponds to country. Samples values: US, UK, EU, DE, FR, JP, CN, IT, BR, MEX, AU.


 sport


Type: list of strings


 Particular sport or activity for which your item is intended. Multiple values accepted. Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Tennis&#039;, &#039;Soccer&#039;, &#039;Hiking&#039;, &#039;Running&#039;, &#039;Yoga&#039;, &#039;Basketball&#039;.

 
 sports_league


Type: string


 Particular sports league that your item represents or is associated with. Sample values: NFL, NBA, NASCAR.


 sports_team


Type: string


 Particular sports team that your item represents or is associated with. Sample values: Golden State Warriors, San Francisco Giants.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Waterproof, Water Resistant.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Waterproof&#039;, Water Resistant&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 sunglasses_lens_color


Type: string


 Color of sunglasses lenses. Sample values: Beige, Black, Blue, Bronze, Brown, Gold, Gray, Green, Multi-Color, Orange, Pink, Purple, Red, Silver, White, Yellow.


 sunglasses_lens_technology


Type: list of strings


 Technology or treatment of sunglass lenses. Multiple values accepted. Sample values: Anti-Reflective, Gradient, Polarized, Photochromatic.


 
- To provide multiple values using a single feed sunglasses_lens_technology field, the acceptable input format is &#039;Anti-Reflective&#039;, &#039;Gradient&#039;, &#039;Polarized&#039;, &#039;Photochromatic&#039;.

 
 sunglasses_width


Type: string


 Width of the sunglasses frame. Sample values: Narrow, Medium, Wide.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 tie_width


Type: string


 Width of tie. Sample values: Classic, Skinny, Wide.


 

## Learn More


 
- Home Decor & Furniture, Product Categories

- Jewelry & Watches, Product Categories

- Health & Beauty, Product Categories

- Baby & Kids Products, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Home Decor &amp; Furniture - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/categories/home

Home Decor & Furniture - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Home Decor & Furniture


 This category supports home goods, furniture, bedding, large appliances, and cleaning supplies. See also additional supported attributes.


For Google Product Category mapping, see Home & Garden and Furniture.


 

## Recommended Attributes


Include these attributes to enrich your product details page (PDP) and help buyers during purchase consideration. We advise providing all of them for improved buyer experience.


 Attribute and Type Categories (Note, for some attributes not all sub-categories apply.) Description height


string


 Garden & Outdoors, Home improvement, Furniture, Home decor, Lamps & Lighting, Pet supplies


 Height of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 length


string


 Garden & Outdoor, Home improvement, Home Decor


 Length of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 width


string


 Garden & Outdoor, Furniture, Home Decor, Pet supplies


 Width of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 pattern


string


 Bath, Bedding, Home Decor, Kitchen & Dining


 Recurring design, pattern, or motif on your item. Sample values: Plaid, Polka Dot, Gingham, Chevron.


 finish


string


 Garden & Outdoor, Bathe Furniture, Home Decor, Lamps & Lighting, Major appliances


 External treatment to the product that usually includes a change in appearance or texture to the item. Commonly used for furniture include wood, metal, and fabric. Sample values: Natural/Unfinished, Walnut, Pewter, Antiqued.
.


 volume


string


 Outdoor power equipment


 Capacity or volume of your item. Samples values: 12 oz, 8 oz, 1 Litre.


 material


string


 Antiques & Collectibles, Arts & Crafts, Garden & Outdoor, Home improvement, Bath, Bedding, Furniture, Home Decor, Kitchen & Dining, Lamps & Lighting, Storage, Pet Supplies


 Primary material(s) of your item. Sample values: Cotton, Linen, Cashmere, Silk.


Provide this attribute for all products where a color, size or material variation exists


 size


string


 Home improvement, Bedding, Furniture, Home Decor, Kitchen & Dining, Pet supplies


 Size of a bed, bed parts, mattresses, or bed linens in standard sizes. Does not include baby and toddler furniture sizes. Sample values: Twin, Twin XL, Full, Full XL, Queen, King, California King.


 scent


string


 Home Decor


 Scent(s) or fragrance(s) of your item, including items labeled as "unscented". Multiple values accepted. Sample values: Lavender, Vanilla, Lemon, Coconut, Jasmine, Pine.


To provide multiple values using a single feed scent field, the acceptable input format is &#039;Lavender&#039;, &#039;Vanilla&#039;, &#039;Lemon&#039;, &#039;Coconut&#039;, &#039;Jasmine&#039;, &#039;Pine&#039;.


To provide multiple values with one value per feed field, use feed field names, such as scent[0], scent[1]. For example, the acceptable attribute value input format for fields such as this is Lavender.


 decor_style


string


 Antiques & Collectibles, Nursery, Garden & Outdoor, Bath, Bedding, Furniture, Home Decor, Lamps & Lighting


 Decorative style in which the product was made. Sample values: Bohemian, Contemporary, Industrial, Mid-Century, Modern, Rustic, Vintage.


 

 

## Additional Attributes


This category supports additional attributes for home goods, furniture, bedding, large appliances, and cleaning supplies.


For Google Product Category mapping, see Home & Garden and Furniture.


 

### Home Goods


 Attribute and Type Description capacity


Type: string


 Maximum amount that something can contain. The first part is the number. The second part is one of the accepted units: ml, l, oz, cu_ft, cu_m. Sample values: 500 ml, 1 l.


 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 is_assembly_required


Type: boolean


 Indicates if the product arrives unassembled and must be put together before use. Sample values: Yes, No.


 is_powered


Type: boolean


 Indicates if the item uses electricity (power cord or batteries). Sample values: Yes, No.


 light_bulb_type


Type: string


 Type of light bulb. Sample values: Fluorescent, Halogen, Incandescent, LED.


 mount_type


Type: string


 Method by which the item is attached or anchored. Used for products, such as shelving and other fixtures. Sample values: Wall Mount, Ceiling Mount.


 number_of_lights


Type: integer


 Number of lights or bulbs contained within a light or light fixture. Sample values: 1, 2, 5.


 occasion


Type: list of strings


 Type of special occasion(s) for which your item is intended or specialized. Sample values: Wedding, Graduation, Halloween, Thanksgiving.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Bridesmaid&#039;, &#039;Wedding&#039;, &#039;Graduation&#039;, &#039;Halloween&#039;, &#039;Work&#039;.

 
 power_type


Type: string


 Indicates the type of power source used by the item (power cord or batteries). Sample values: Battery, Hardwired, Plug-In.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 45 lb, 120 lb, 54 kg, 80 kg.


 recommended_rooms


Type: list of strings


 Rooms where the item is likely or recommended to be used. Sample values: Family Room, Home Office, Kitchen, Dining Room, Bedroom.


 
- To provide multiple values using a single feed recommended_rooms field, the acceptable input format is &#039;Family Room&#039;, &#039;Home Office&#039;, &#039;Kitchen&#039;, &#039;Dining Room&#039;, &#039;Bedroom&#039;.

 
 shape


Type: string


 General shape of the product. Often used to describe furniture and home furnishings. Sample values: Rectangle, Square, Oval, Circle, Triangle.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Automatic Shut Off, Energy Star-Certified.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Automatic Shut Off&#039;, &#039;Energy Star-Certified&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Furniture


 Attribute and Type Description bed_frame_type


Type: string


 Type or style of the bed. Does not include Futons, Day Beds, or Sleepers. Sample values: Canopy Bed, Platform Bed, Storage Bed, Bunk Bed, Four Poster Bed.


 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 comfort_level


Type: string


 Firmness or softness of a mattress. Sample values: Extra Plush, Plush, Medium, Firm, Extra Firm, Adjustable.


 fabric_care_instructions


Type: list of strings


 Specific care instructions for how the fabric of your item should be cleaned. Instructions are on the item label. Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand Wash.


 
- To provide multiple values using a single feed fabric_care_instructions field, the acceptable input format is &#039;Dry Clean Only&#039;, &#039;Machine Washable&#039;, &#039;Do Not Iron&#039;, &#039;Hand Wash&#039;.

 
 fill_material


Type: list of strings


 Material(s) used to fill the item; usually in cushions, pillows, mattresses, and bean bags. Sample values: Polyester, Foam, Latex, Down, Cotton.


 
- To provide multiple values using a single feed fill_material field, the acceptable input format is &#039;Polyester&#039;, &#039;Foam&#039;, &#039;Latex&#039;, &#039;Down&#039;, &#039;Cotton&#039;.

 
 is_assembly_required


Type: boolean


 Indicates if the product arrives unassembled and must be put together before use. Sample values: Yes, No.


 indoor_outdoor


Type: string


 Indicates if the item is indoor only, outdoor only, or intended for both. Sample values: Indoor Only, Outdoor Only, Indoor/Outdoor.


 mattress_thickness


Type: string


 Measure from the bottom of the mattress to the crown. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 12 in, 15 in, 30 cm, 38 cm.


 mount_type


Type: string


 Method by which the item is attached or anchored. Used for products, such as shelving and other fixtures. Sample values: Wall Mount, Ceiling Mount.


 number_of_drawers


Type: integer


 Number of drawers included in the product. Sample values: 2, 4, 8.


 number_of_seats


Type: integer


 Seating capacity of the furniture. Sample values: 1, 2, 4, 6, 8.


 number_of_shelves


Type: integer


 Number of shelves included in the product. Sample values: 2, 4, 8.


 power_type


Type: string


 Indicates the type of power source used by the item (power cord or batteries). Sample values: Battery, Hardwired, Plug-In.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 45 lb, 120 lb, 54 kg, 80 kg.


 recommended_rooms


Type: list of strings


 Rooms where the item is likely or recommended to be used. Sample values: Family Room, Home Office, Kitchen, Dining Room, Bedroom.


 
- To provide multiple values using a single feed recommended_rooms field, the acceptable input format is &#039;Family Room&#039;, &#039;Home Office&#039;, &#039;Kitchen&#039;, &#039;Dining Room&#039;, &#039;Bedroom&#039;.

 
 seat_back_height


Type: string


 Indicates the seat back height from the base of the seat to the top of the back. This may be separate from the assembled_product_height and seat_height attributes. Sample values: 20 in, 20 cm, 2 ft, 60 cm.


 seat_height


Type: string


 Indicates height from the floor to the top of the seat. This may be separate from the assembled_product_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 20 in, 20 cm, 2 ft, 60 cm.


 seat_material


Type: string


 Material of the item&#039;s seat cushion. This may be separate from the item&#039;s main material composition (see material attribute). Sample values: Leather, Upholstered, Wood.


 shape


Type: string


 General shape of the product. Often used to describe furniture and home furnishings. Sample values: Rectangle, Square, Oval, Circle, Triangle.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Foldable, Inflatable, Pump Included, Wheeled, Antique.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Foldable&#039;, &#039;Inflatable&#039;, &#039;Pump Included&#039;, &#039;Wheeled&#039;, &#039;Antique&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with.


Sample values: Space, Super Heroes, Automobiles.


 

### Bedding


 Attribute and Type Description bed_frame_type


Type: string


 Type or style of the bed. Does not include Futons, Day Beds, or Sleepers. Sample values: Canopy Bed, Platform Bed, Storage Bed, Bunk Bed, Four Poster Bed.


 closure


Type: string


 Type of fastener used to close your item. Sample values: Zipper, Button, Snap, Drawstring, Lace Up, Slip On, Buckle.


 fabric_care_instructions


Type: list of strings


 Specific care instructions for how the fabric of your item should be cleaned. Instructions are on the item label. Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand Wash.


 
- To provide multiple values using a single feed fabric_care_instructions field, the acceptable input format is &#039;Dry Clean Only&#039;, &#039;Machine Washable&#039;, &#039;Do Not Iron&#039;, &#039;Hand Wash&#039;.

 
 fill_material


Type: list of strings


 Material(s) used to fill the item; usually in cushions, pillows, mattresses, and bean bags. Sample values: Polyester, Foam, Latex, Down, Cotton.


 
- To provide multiple values using a single feed fill_material field, the acceptable input format is &#039;Polyester&#039;, &#039;Foam&#039;, &#039;Latex&#039;, &#039;Down&#039;, &#039;Cotton&#039;.

 
 is_set


Type: boolean


 Indicates if the product contains 2 or more different items that are sold as part of a set. Sample values: Yes, No.


 pieces_in_set


Type: integer


 Number of items included in the set. If the item contains matching fitted sheets, flat sheets, and 2 pillowcases - the number is 4. Sample values: 3, 4, 6.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Hypoallergenic, Reversible, Stain Resistant, Water Resistant, Organic, Sustainably Sourced.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Hypoallergenic&#039;, &#039;Reversible&#039;, &#039;Reversible&#039;, &#039;Stain Resistant&#039;, &#039;Water Resistant&#039;, &#039;Organic&#039;, &#039;Sustainably Sourced&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Appliances


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;LED Lighting&#039;, &#039;Built-in Lock&#039;, &#039;WiFi Connect&#039;, &#039;Customizable Shelving&#039;.

 
Sample values: LED Lighting, Built-in Lock, WiFi Connect, Customizable Shelving.


 btu


Type: number/float


 Number of British Thermal Units (BTUs) for heating and cooling appliances. Sample value: 10,200.


 fuel_type


Type: string


 Type of fuel used to power certain appliances. Sample values: Electric, Gas, Dual.


 is_set


Type: boolean


 Indicates if the product contains 2 or more different items that are sold as part of a set. Sample values: Yes, No.


 load_position


Type: string


 Type of load position for washers and dryers. Sample values: Top Load, Front Load.


 number_of_burners


Type: integer


 Number of burners included in the product. Sample values: 2, 3, 4.


 number_of_doors


Type: integer


 Number of doors included in the product. Sample values: 1, 2, 4.


 number_of_shelves


Type: integer


 Number of shelves included in the product. Sample values: 2, 4, 8.


 power_type


Type: string


 Indicates the type of power source used by the item (power cord or batteries). Sample values: Battery, Hardwired, Plug-In.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 45 lb, 120 lb, 54 kg, 80 kg.


 smart_home_compatibility


Type: string


 Type of Smart Home devices that the product is compatible with. Sample values: Amazon Alexa, Google Assistant, Nest, Samsung SmartThings, WeMo, Philips Hue, Apple HomeKit, Logitech Harmony.


 sound_rating


Type: integer


 Sound decibel rating for the noise level of the appliance. Sample values: 44, 46, 48, 50.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Automatic Shut Off, Energy Star-Certified, Bluetooth Compatible, Industrial, Remote Control Included, Wi-Fi Compatible.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Automatic Shut Off&#039;, &#039;Energy Star-Certified&#039;, &#039;Bluetooth Compatible&#039;, &#039;Industrial&#039;, &#039;Remote Control Included&#039;, &#039;Wi-Fi Compatible&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 volts


Type: string


 Number of volts the product produces or requires. Also known as "Voltage". The first part is the number. The second part is one of the accepted units: V, KV. Sample values: 220 V, Input 100 VAC, Output 12VDC.


 watts


Type: number/float


 Number of watts the product process or requires. Also known as "Wattage". The first part is the number. The second part is one of the accepted units: W, KW, MW, GW. Sample values: 400 W, 1500 W.


 

### Cleaning Supplies


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample value: Unscented.


 bag_type


Type: string


 Indicates whether the vacuum cleaner is bag or bagless. Sample values: Bag, Bagless.


 capacity


Type: string


 Maximum amount that something can contain. The first part is the number. The second part is one of the accepted units: ml, l, oz, cu_ft, cu_m. Sample values: 12 oz, 18 ml.


 instructions


Type: list of strings


 Information that describes how the item should be assembled, consumed, or used. Sample values: Spray directly on floors and then wipe away with a damp mop, Dilute a bit of the all purpose cleaner in water and use the solution to mop your floors.


 
- To provide multiple values using a single feed instructions field, the acceptable input format is &#039;Spray directly on floors and then wipe away with a damp mop&#039;, &#039;Dilute a bit of the all purpose cleaner in water and use the solution to mop your floors&#039;.

 
 product_form


Type: string


 Consistency, texture or formulation of the item and the way it will be consumed or dispensed. Sample values: liquid, gel, aerosol spray.


 shelf_life


Type: integer


 Length of time that the product can be stored without spoiling or losing quality, measured in days. Sample values: 15, 30, 100.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Biodegradable, Recyclable.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Biodegradable&#039;, &#039;Recyclable&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 vacuum_type


Type: string


 Type of vacuum cleaner. Sample values: Canister, Handheld, Robotic, Stick, Upright.


 warnings


Type: list of strings


 Warnings associated with the product. Sample values: Chemical, Combustible, Flammable.


 
- To provide multiple values using a single feed warnings field, the acceptable input format is &#039;Chemical&#039;, &#039;Combustible&#039;, &#039;Flammable.

 
 

## Learn More


 
- Clothing, Shoes & Accessories, Product Categories

- Jewelry & Watches, Product Categories

- Health & Beauty, Product Categories

- Baby & Kids Products, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Jewelry &amp; Watches - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/categories/jewelry/

Jewelry & Watches - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Jewelry & Watches


 This category supports jewelry and watches. See also additional supported attributes.


For Google Product Category mapping, see Apparel & Accessories.


 

## Recommended Attributes


Include these attributes to enrich your product details page (PDP) and help buyers during purchase consideration. We advise providing all of them for improved buyer experience.


 Attribute and Type Categories (Note, for some attributes not all sub-categories apply.) Description material


string


 Jewelry, Watches & Accessories


 Primary material(s) of your item. Sample values: Leather, Silicone, Stainless steel, and so on.


Provide this attribute for all products where a color, size or material variation exists


 size


string


 Engagement jewelry, Fine & Fashion Jewelry


 Overall dimensions of the item. Used only for products that don&#039;t have a more specific size attribute, such as ring_size or chain_length. Sample values: 6, 7, 8, Small, Medium, Large.


 gemstone


List of strings


 Jewelry & Watches


 Type of gemstone(s) in your item. Sample values: Diamond, Turquoise, Ruby, Emerald, Sapphire.


To provide multiple values using a single feed scent field, the acceptable input format is &#039;Diamond&#039;, &#039;Turquoise&#039;, &#039;Ruby&#039;, &#039;Emerald&#039;, &#039;Sapphire&#039;.


 
 

## Additional Attributes


This category supports additional attributes for jewelry and watches.


For Google Product Category mapping, see Apparel & Accessories.


### Jewelry


 Attribute and Type Description chain_length


Type: string


 Length of the jewelry chain. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 12 in, 20 cm.


 clasp_type


Type: string


 Type of clasp or closure method of your item. Sample values: Lobster Clasp, Toggle Clasp, Barrel Clasp, Fishhook Clasp.


 earring_back_finding


Type: string


 Type of fastening method for the backs of earrings. Sample values: Clip-On, FishHook, Snap Posts, Screw Back, Shepherds Hook.


 earring_drop_length


Type: string


 Numeric length value of an earring from the top to the bottom, including the clasp. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 1.5 in, 3.8 cm. .


 gemstone_clarity


Type: string


 Quality and clarity of the visual aspect of the gemstone, particularly important for diamonds. Indicates visual and internal characteristics and surface defects of blemishes. Sample values: FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2.


 gemstone_color


Type: string


 Color of the gemstone(s) in your item that accounts for hue, tone, and saturation. Sample values: Colorless, Near-Colorless, Color-Changing.


 gemstone_creation_method


Type: string


 Method by which the stone was created. Indicates if the stone is natural or manmade. Sample values: Natural, Simulated, Synthetic, Lab-Created.


 gemstone_cut


Type: string


 Style in which the gemstone(s) of your item have been cut and their general shape. Sample values: Asscher, Heart, Baguette, Marquis, Oval, Brilliant, Round, Square, Princess.


 gemstone_height


Type: number/float


 Height measurement of the gemstone. Measured in millimeters. Sample values: 5.


 gemstone_length


Type: number/float


 Length measurement of the gemstone.Measured in millimeters. Sample values: 5.


 gemstone_treatment


Type: list of strings


 Indicates any treatments or processing of the stone to change its color, clarity, or durability. Sample values: Dyed, Heat Treated, Coated, Reconstituted, Bleached, Not-Treated, Filled.


 
- To provide multiple values using a single feed gemstone_treatment field, the acceptable input format is &#039;Dyed&#039;, &#039;Heat Treated&#039;, &#039;Coated&#039;, &#039;Reconstituted&#039;, &#039;Bleached&#039;, &#039;Not-Treated&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as gemstone_treatment[0], gemstone_treatment[1]. For example, the acceptable attribute value input format for fields such as this is Dyed.

 
 gemstone_weight


Type: number/float


 Total weight or mass of the individual gemstone. Measured in carats. Sample values: 1.29, 0.70.


 gemstone_width


Type: number/float


 Width measurement of the gemstone. Measured in millimeters. Sample values: 5 mm.


 inscription


Type: list of strings


 Text of what is engraved on the item. Multiple values accepted. Sample values: Best Friends Forever, I love you, M & T.


 
- To provide multiple values using a single feed inscription field, the acceptable input format is &#039;Best Friends Forever&#039;, &#039;I love you&#039;, &#039;M & T.

- To provide multiple values with one value per feed field, use feed field names, such as inscription[0], inscription[1]. For example, the acceptable attribute value input format for fields such as this is Best Friends Forever.

 
 jewelry_setting_style


Type: string


 Style in which stones are set within or attached to a piece of jewelry. Sample values: 2 prong, 3 stone, Solitaire, Pave, Waterfall, Illusion.


 metal_stamp_or_purity


Type: string


 Metal purity of your item. Sometimes this is indicated or stamped directly onto jewelry items. Sample values: 14k, 22k, 925 Sterling.


 occasion


Type: list of strings


 Type of special occasion(s) for which your item is intended or specialized. Sample values: Anniversary, Wedding, Graduation.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Bridesmaid&#039;, &#039;Wedding&#039;, &#039;Graduation&#039;, &#039;Halloween&#039;, &#039;Work&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as occasion[0], occasion[1]. For example, the acceptable attribute value input format for fields such as this is Bridesmaid.

 
 plating_material


Type: string


 Type of metal or material which your item is plated or covered with. Sample values: Silver, Gold, Platinum.


 size_system


Type: string


 Size system used by your item; usually corresponds to the country. Sample values: US, UK, EU, &#039;DE&#039;, FR, CN, IT, BR, MEX, AU.


 standard_features


Type: list of strings


 Standard features related to the item. Sample value: Resizable.


 total_gemstone_weight


Type: integer


 Total combined weight or mass of all stones in the piece of jewelry. Measured in carats. Sample values: 1.29, 0.70.


 

### Watches


 Attribute and Type Description activity


Type: list of strings


 Particular sport or activity for which your item is intended. Multiple values accepted. Sample values: Yoga, Sailing, Diving, Running.


 
- To provide multiple values using a single feed activity field, the acceptable input format is &#039;Yoga&#039;, &#039;Sailing&#039;, &#039;Diving&#039;, &#039;Running&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as activity[0], activity[1]. For example, the acceptable attribute value input format for fields such as this is Yoga.

 
 battery_life


Type: string


 Maximum run time or life of the item&#039;s battery. The first part is the number. The second part is one of the accepted units: s, m, h, d. Sample values: 8 d, 12 h, 24 h.


 display_technology


Type: string


 Type of technology that powers the display. Sample values: Analog, Digital, LED, LCD.


 gemstone_cut


Type: list of strings


 Style in which the gemstone(s) of your item have been cut and their general shape. Sample values: Asscher, Heart, Baguette, Marquis, Oval, Brilliant, Round, Square, Princess.


 
- To provide multiple values using a single feed gemstone_cut field, the acceptable input format is &#039;Asscher&#039;, &#039;Heart&#039;, &#039;Baguette&#039;, &#039;Marquis&#039;, &#039;Oval&#039;, &#039;Brilliant&#039;, &#039;Round&#039;, &#039;Square&#039;, &#039;Princess&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as gemstone_cut[0], gemstone_cut[1]. For example, the acceptable attribute value input format for fields such as this is Asscher.

 
 gemstone_weight


Type: float


 Total weight or mass of the individual gemstone. Measured in carats. Sample values: 1.29, 0.70.


 metal_stamp_or_purity


Type: string


 Metal purity of your item. Sometimes this is indicated or stamped directly onto jewelry items. Sample values: 14k, 22k, 925 Sterling.


 plating_material


Type: string


 Type of metal or material which your item is plated or covered with. Sample values: Silver, Gold, Platinum.


 power_type


Type: string


 The method by which the item is powered. Sample values: Battery Powered.


 standard_features


Type: list of strings


 Standard features related to the item. Sample value: Water Resistant.


 total_gemstone_weight


Type: number/float


 Total combined weight or mass of all stones in the piece of jewelry. Measured in carats. Sample values: 1.29, 0.70.


 watch_band_width


Type: string


 Width of the watch band. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 22 mm, 0.87 in.


 watch_case_thickness


Type: string


 Thickness of the watch case or or dial. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 12 mm, 0.47 in.


 watch_movement_type


Type: string


 Type of movement within the watch. Sample values: Quartz, Mechanical, Automatic.


 

## Learn More


 
- Clothing, Shoes & Accessories, Product Categories

- Health & Beauty, Product Categories

- Home Decor & Furniture, Product Categories

- Baby & Kids Products, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Health &amp; Beauty - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/categories/health-beauty/

Health & Beauty - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Health & Beauty


 This category supports health and beauty products. See also additional supported attributes.


For Google Product Category mapping, see Health & Beauty.


 

## Recommended Attributes


Include these attributes to enrich your product details page (PDP) and help buyers during purchase consideration. We advise providing all of them for improved buyer experience.


 Attribute and Type Categories (Note, for some attributes not all sub-categories apply.) Description ingredients


List of strings


 Skin care, Hair care & Styling


 List of active ingredients as shown on the item label. Active ingredients usually perform a specific purpose, such as hydration, anti-acne, and so on. Sample values: Vitamin C, Benzoyl Peroxide, Alpha Hydroxy Acid, Hyaluronic Acid, Hydroquinone.


To provide multiple values using a single feed ingredients field, the acceptable input format is &#039;Vitamin C&#039;, &#039;Benzoyl Peroxide&#039;, &#039;Alpha Hydroxy Acid&#039;, &#039;Hyaluronic Acid&#039;, &#039;Hydroquinone&#039;


To provide multiple values with one value per feed field, use feed field names, such as ingredients[0], ingredients[1]. For example, the acceptable attribute value input format for fields such as this is Vitamin C.


 capacity/volume


string


 Skin care, Hair care, Make-up, Fragrance, Bath/body


 Capacity or volume of your item. This is important for buyers to know the amount of product they are receiving and is important for skin care, beauty, and hair care products. Samples values: 12 oz, 8 oz, 1 Litre.


 scent


string


 Bath/body, Health Care, Home Fragrances & Accessories, Personal Care


 Scent(s) or fragrance(s) of your item, including items labeled as "unscented". Multiple values accepted. Sample values: Lavender, Vanilla, Lemon, Coconut, Jasmine, Pine.


To provide multiple values using a single feed scent field, the acceptable input format is &#039;Lavender&#039;, &#039;Vanilla&#039;, &#039;Lemon&#039;, &#039;Coconut&#039;, &#039;Jasmine&#039;, &#039;Pine&#039;.


To provide multiple values with one value per feed field, use feed field names, such as scent[0], scent[1]. For example, the acceptable attribute value input format for fields such as this is Lavender.


 length


string


 Hair extension


 Length of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 material


string


 Hair Care & Styling, Makeup, First Aid, Massage


 Primary material(s) of your item. Sample values: Cotton, Linen, Cashmere, Silk.


Provide this attribute for all products where a color, size or material variation exists


 size


string


 Hair Care & Styling, Feminine Care


 Size as it appears on the label. Includes generic sizes, such as Small and One Size. Includes numeric sizes, such as 2, 4. Sample Values: Small, Medium, Large, 2, 4, 6, One Size.


 
 

## Additional Attributes


This category also supports additional attributes for health and beauty.


For Google Product Category mapping, see Apparel & Accessories.


### Health


 Attribute and Type Description absorbency


Type: string


 Term describing the ability of a product to absorb moisture. Used in personal care products, such as pads and liners. Sample values: Heavy, Light, Maximum, Moderate, Overnight, Regular, Super, Ultra Thin.


 batteries_required


Type: boolean


 Indicates if batteries are required to use this item. Samples values: Yes, No.


 body_part


Type: list of strings


 Describes the particular body part(s) for which the item is intended. Samples values: Eyes, Face, Nose, Ankle, Wrist, Thumb.


 
- To provide multiple values using a single feed body_part field, the acceptable input format is &#039;Eyes&#039;, &#039;Face&#039;, &#039;Nose&#039;, &#039;Ankle&#039;, &#039;Wrist&#039;, &#039;Thumb&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as body_part[0], body_part[1]. For example, the acceptable attribute value input format for fields such as this is Eyes.

 
 dosage


Type: list of strings


 Amount of a medication, drug, or supplement that is directed to be taken, or applied at one time or regularly during a period of time, as specified by the manufacturer. Samples values: 1 teaspoon every 6 hours, 0.5 ml every 30 days, For adults - 400 to 800 mg every 6 to 8 hours is recommended, not to exceed 3200 mg per day.


 
- To provide multiple values using a single feed dosage field, the acceptable input format is &#039;1 teaspoon every 6 hours&#039;, &#039;0.5 ml every 30 days&#039;, &#039;For adults - 400 to 800 mg every 6 to 8 hours is recommended, not to exceed 3200 mg per day&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as dosage[0], dosage[1]. For example, the acceptable attribute value input format for fields such as this is 1 teaspoon every 6 hours.

 
 eyewear_rim


Type: string


 Whether eyewear has rims, partial rims, or no rim at all. Samples values: Full-Rim; Rimless; Semi-Rimless, Half-Rim.


 flavor


Type: list of strings


 Describes the taste or flavor of the item, as described by the manufacturer. May be an important attribute for shoppers for items, such as dental products or medicine. Samples values: Cinnamon, Peppermint, Bubble Gum, Citrus, Chocolate, Berry.


 
- To provide multiple values using a single feed flavor field, the acceptable input format is &#039;Cinnamon&#039;, &#039;Peppermint&#039;, &#039;Bubble Gum&#039;, &#039;Citrus&#039;, &#039;Chocolate&#039;, &#039;Berry&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as flavor[0], flavor[1]. For example, the acceptable attribute value input format for fields such as this is Cinnamon.

 
 inactive_ingredients


Type: list of strings


 Describes the list of inactive ingredients as shown on the item label. Sample values: Beeswax, Red 27, Iron Oxide.


 
- To provide multiple values using a single feed inactive_ingredients field, the acceptable input format is &#039;Beeswax&#039;, &#039;Red 27&#039;, &#039;Iron Oxide&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as inactive_ingredients[0], inactive_ingredients[1]. For example, the acceptable attribute value input format for fields such as this is Beeswax.

 
 ingredient_composition


Type: list of objects


 Ingredients with the corresponding composition value. The ingredients represent a list of properties separated by commas. Each property has a name followed by a colon and a value.


Sample values: Pyrithione zinc: 1%, Salicylic Acid: 1%, Aloe Vera Extract: 5%.


Example:


[&#123;
 "name": "Pyrithione zinc",
 "value": 10
&#125;, &#123;
 "name": "Salicylic Acid",
 "value": 10

&#125;]is_powered


Type: boolean


 Indicates if the item uses electricity (power cord or batteries). Sample values: Yes, No.


 keywords


Type: list of strings


 Keywords that might be used to search for this term, including synonyms and related terms. Sample values: Sensitive Skin, Scent Free.


 
- To provide multiple values using a single feed keywords field, the acceptable input format is &#039;Sensitive Skin&#039;, &#039;Scent Free&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as keywords[0], keywords[1]. For example, the acceptable attribute value input format for fields such as this is Sensitive Skin.

 
 lens_material


Type: list of strings


 Substance(s) an optical lens is made out of. Sample values: Plastic, Glass, Trivex.


 
- To provide multiple values using a single feed lens_material field, the acceptable input format is &#039;Plastic&#039;, &#039;Glass&#039;, &#039;Trivex&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as lens_material[0], lens_material[1]. For example, the acceptable attribute value input format for fields such as this is Plastic.

 
 lens_tint


Type: string


 Color of lense tint. Sample values: Blue, Yellow.


 lens_type


Type: string


 Whether the lens is single, multifocal, or tinted. Sample values: Single Vision, Bifocal, Progressive, Trifocal, Sunglasses.


 nutrient_amount


Type: float


 Amount of the nutrient present in one serving. This attribute is used in conjunction with nutrient_name and nutrient_percentage_daily_value. Sample values: 56 (for Energy in kCal), 9.4 (for Protein in grams).


 nutrient_name


Type: string


 Name of additional nutrient(s). This attribute is used in conjunction with nutrient_amount and nutrient_percentage_daily_value. Sample values: Vitamin A, Dietary Fiber.


 
- To provide multiple values using a single feed nutrient_name field, the acceptable input format is &#039;Vitamin A&#039;, &#039;Dietary Fiber&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as nutrient_name[0], nutrient_name[1]. For example, the acceptable attribute value input format for fields such as this is Vitamin A.

 
 nutrient_percentage_daily_value


Type: float


 Name of additional nutrient, measured in percentages. This attribute is used in conjunction with nutrient_amount and nutrient_name. Sample values: 15, 25.


 package_quantity


Type: integer


 Total number of items included in the package or box. Samples values: 12, 24, 36.


 power_type


Type: string


 Method by which the item is powered. Sample values: Electric, Batteries.


 product_form


Type: string


 Consistency, texture, or formulation of the item and the way it can be consumed or dispensed. Sample values: Oil, Gel, Spray, Cream, Powder, Serum, Liquid.


 result_time


Type: string


 Duration of time necessary to see the outcome from using a product. Typically used for medical and personal care test kits and monitors. Sample values: 2 min, 3 to 5 hours.


 serving_size


Type: string


 Measurement value specifying the amount of the item typically used as a reference on the label of that item to list per serving information (nutrients, calories, total fat). Applicable for a wide variety of products including food, beverages, and nutritional supplements. The first part is the number. The second part is one of the accepted units: ml, l, oz, cu_ft, cu_m. Sample values: 0.4 ml, 40 ml.


 skin_care_concerns


Type: list of strings


 Indicates if the item is meant to alleviate a particular skin care issue. For general health concerns, such as obesity or blood pressure, use the health_concern attribute. Values may be similar to the skin_type attribute - "dry cracked skin" may be a concern, but "dry" is a skin type. Multiple values accepted. Sample values: Dry Skin, Cellulite, Wrinkles, Eczema, Rosacea, Blemishes, Blackheads.


 
- To provide multiple values using a single feed skin_care_concerns field, the acceptable input format is &#039;Dry Skin&#039;, &#039;Cellulite&#039;, &#039;Wrinkles&#039;, &#039;Eczema&#039;, &#039;Rosacea&#039;, &#039;Blemishes&#039;, &#039;Blackheads&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as skin_care_concerns[0], skin_care_concerns[1]. For example, the acceptable attribute value input format for fields such as this is Dry Skin.

 
 skin_type


Type: string


 Indicates the general skin type that the product is intended for on the oily/dry spectrum. Sample values: Oily, Dry, Combination, Sensitive.


 spf_value


Type: integer


 Indicates the strength of Sun Protection Factor (SPF) in an item. Describes how well the product can block out harmful rays from the run. Commonly found in sunscreen and makeup products. Sample values: 15, 30, 45.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Automatic Shut Off, Cordless, Polarized, Latex-Free, Portable, Reusable, Scratch-Resistant, Travel Size, Adaptive Lenses.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Automatic Shut Off&#039;, &#039;Cordless&#039;, &#039;Polarized&#039;, &#039;Latex-Free&#039;, &#039;Portable&#039;, &#039;Reusable&#039;, &#039;Scratch-Resistant&#039;, &#039;Travel Size&#039;, &#039;Adaptive Lenses&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as Water Resistant.

 
 stop_use_indications


Type: list of strings


 Information that describes symptoms or reactions that indicate when to stop taking medicine. Sample value: Stop using if you experience swelling, rash, or fever.


 uv_rating


Type: number/float


 Ultraviolet rating for eyewear. Sample values: 400, 300.


 

### Beauty


 Attribute and Type Description batteries_required


Type: boolean


 Indicates if batteries are required to use this item. Samples values: Yes, No.


 body_part


Type: list of strings


 Describes the particular body part(s) for which the item is intended. Samples values: Eyes, Face, Nose, Ankle, Wrist, Thumb.


 
- To provide multiple values using a single feed body_part field, the acceptable input format is &#039;Eyes&#039;, &#039;Face&#039;, &#039;Nose&#039;, &#039;Ankle&#039;, &#039;Wrist&#039;, &#039;Thumb&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as body_part[0], body_part[1]. For example, the acceptable attribute value input format for fields such as this is Eyes.

 
 care_instructions


Type: list of strings


 Describes how the item should be cleaned, cared for, or maintained. Samples value: Wash with warm water & soap.


 hair_type


Type: list of strings


 Indicates the general hair type(s) that the product is intended for relating to texture, coarseness, oiliness, thickness, and curliness. Samples values: Coarse, Color Treated, Curly, Damaged, Dry, Fine, Oily.


 
- To provide multiple values using a single feed hair_type field, the acceptable input format is &#039;Coarse&#039;, &#039;Color Treated&#039;, &#039;Curly&#039;, &#039;Damaged&#039;, &#039;Dry&#039;, &#039;Fine&#039;, &#039;Oily&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as hair_type[0], hair_type[1]. For example, the acceptable attribute value input format for fields such as this is Coarse.

 
 health_concern


Type: list of strings


 Indicates if the item is meant to alleviate a particular health issue, illness, or life stage. For concerns specific to skin care, use the skin_care_concern attribute. Multiple values accepted. Sample values: Fever, Allergies, Cholesterol, Blood Sugar.


 
- To provide multiple values using a single feed health_concern field, the acceptable input format is &#039;Fever&#039;, &#039;Allergies&#039;, &#039;Cholesterol&#039;, &#039;Blood Sugar&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as health_concern[0], health_concern[1]. For example, the acceptable attribute value input format for fields such as this is Fever.

 
 inactive_ingredients


Type: list of strings


 Describes the list of inactive ingredients as shown on the item label. Sample values: Beeswax, Red 27, Iron Oxide.


 
- To provide multiple values using a single feed inactive_ingredients field, the acceptable input format is &#039;Beeswax&#039;, &#039;Red 27&#039;, &#039;Iron Oxide&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as inactive_ingredients[0], inactive_ingredients[1]. For example, the acceptable attribute value input format for fields such as this is Beeswax.

 
 ingredient_composition


Type: list of objects


 Ingredients with the corresponding composition value. Sample values: Pyrithione zinc: 1%, Salicylic Acid: 1%, Aloe Vera Extract: 5%.


 is_powered


Type: boolean


 Indicates if the item uses electricity (power cord or batteries). Sample values: Yes, No.


 keywords


Type: list of strings


 Keywords that might be used to search for this term, including synonyms and related terms. Sample values: Sensitive Skin, Scent Free.


 
- To provide multiple values using a single feed keywords field, the acceptable input format is &#039;Sensitive Skin&#039;, &#039;Scent Free&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as keywords[0], keywords[1]. For example, the acceptable attribute value input format for fields such as this is Sensitive Skin.

 
 power_type


Type: string


 Method by which the item is powered. Sample values: Electric, Batteries.


 product_form


Type: string


 Consistency, texture, or formulation of the item and the way it can be consumed or dispensed. Sample values: Oil, Gel, Spray, Cream, Powder, Serum, Liquid.


 result_time


Type: string


 Duration of time necessary to see the outcome from using a product. Typically used for medical and personal care test kits and monitors. Sample values: 2 min, 3 to 5 hours.


 skin_care_concern


Type: list of strings


 Indicates if the item is meant to alleviate a particular skin care issue. For general health concerns, such as obesity or blood pressure, use the health_concern attribute. Values may be similar to the skin_type attribute - "dry cracked skin" may be a concern, but "dry" is a skin type. Sample values: Dry Skin, Cellulite, Wrinkles, Eczema, Rosacea, Blemishes, Blackheads.


 
- To provide multiple values using a single feed skin_care_concerns field, the acceptable input format is &#039;Dry Skin&#039;, &#039;Cellulite&#039;, &#039;Wrinkles&#039;, &#039;Eczema&#039;, &#039;Rosacea&#039;, &#039;Blemishes&#039;, &#039;Blackheads&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as skin_care_concerns[0], skin_care_concerns[1]. For example, the acceptable attribute value input format for fields such as this is Dry Skin.

 
 skin_tone


Type: string


 Describes the color or shade of skin that a product is targeted for. This is separate from Color Name of the product. Olive may be a color name from the manufacturer and the type of skin tone the product is targeting. Allowed values: Fair, Light, Medium, Neutral, Olive, Dark.


 skin_type


Type: string


 Indicates the general skin type that the product is intended for on the oily/dry spectrum. Sample values: Oily, Dry, Combination, Sensitive.


 spf_value


Type: integer


 Indicates the strength of Sun Protection Factor (SPF) in an item. Describes how well the product can block out harmful rays from the run. Commonly found in sunscreen and makeup products. Sample values: 15, 30, 45.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Automatic Shut Off, Cordless, Foldable, Industrial, Latex-Free, Non-Comedogenic, Portable, Reusable, Self-Tanning, Tinted, Travel Size, Waterproof, Wheeled.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Automatic Shut Off&#039;, &#039;Cordless&#039;, &#039;Foldable&#039;, &#039;Industrial&#039;, &#039;Latex-Free&#039;, &#039;Non-Comedogenic&#039;, &#039;Portable&#039;, &#039;Reusable&#039;, &#039;Self-Tanning&#039;, &#039;Tinted&#039;, &#039;Travel Size&#039;, &#039;Waterproof&#039;, &#039;Wheeled&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as Automatic Shut Off.

 
 stop_use_indications


Type: list of strings


 Information that describes symptoms or reactions that indicate when to stop taking medicine. Sample value: Stop using if you experience swelling, rash, or fever.


 wig_cap_type


Type: string


 Construction style of the wig cap (also called the "wig base"), affecting the wig&#039;s appearance, durability, and styling options. Sample values: 100% Hand-Tied, Lace Front, Full Lace, Traditional, Monofilament, Capless, Thin Skin.


 

## Learn More


 
- Clothing, Shoes & Accessories, Product Categories

- Home Decor & Furniture, Product Categories

- Jewelry & Watches, Product Categories

- Baby & Kids Products, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Electronics - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/categories/electronics/

Electronics - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Electronics


 This category supports cell phones & smart watches, accessories, computers & tablets, video game consoles & video games, printers & scanners, TVs & monitors, projectors, and cameras.


For additional attributes, see cell phones & smart watches, accessories, computers & tablets, video game consoles & video games, printers & scanners, TVs & monitors, projectors, and cameras.


For Google Product Category mapping, see Electronics, Camera & Optics, and Software.


 

## Recommended Attributes


These recommended attributes are optional. See also Additional Attributes.


### Cell Phones & Smart Watches


 Attribute and Type Description color


Type: list of strings


 Primary color(s) of your item. Sample values: Beige, Black, Blue, Bronze, Brown, Gold, Gray.


 
- To provide multiple values using a single feed color field, the acceptable input format is &#039;Beige&#039;, &#039;Black&#039;, &#039;Blue&#039;, &#039;Bronze&#039;, &#039;Brown&#039;, &#039;Gold&#039;, &#039;Gray&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as color[0], color[1]. For example, the acceptable attribute value input format for fields, such as Beige.

 
 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 model


Type: string


 Common name of the product model. Does not include model numbers. Sample values: iPhone 6, Galaxy S8.


 operating_system


Type: string


 Type of preloaded operating system software installed on the device. Sample values: Android, iOS, Windows.


 screen size


Type: string


 Measurement of the device&#039;s screen, typically measured diagonally. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in, 100 cm.


 storage_capacity


Type: string


 Amount of storage space on the item&#039;s hard drive, typically measured in megabytes, gigabytes, or terabytes. The first part is the number. The second part is one of the accepted units: KB, MB, GB, TB. Sample values: 1 TB, 16 GB.


 For additional attributes, see Cell Phones & Smart Watches.


 

### Accessories


 Attribute and Type Description color


Type: list of strings


 Item color, described by the manufacturer. Sample values: Blue, White.


 
- To provide multiple values using a single feed color field, the acceptable input format is &#039;Blue&#039;, &#039;White&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as color[0], color[1]. For example, the acceptable attribute value input format for fields, such as Blue.

 
 compatible_devices


Type: list of strings


 Devices compatible with the item. Sample values: iPad, Tablet Computers, Windows Desktop Computers, Apple Computers.


 
- To provide multiple values using a single feed compatible_devices field, the acceptable input format is &#039;iPad&#039;, &#039;Tablet Computers&#039;, &#039;Windows Desktop Computers&#039;, &#039;Apple Computers&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as compatible_devices[0], compatible_devices[1]. For example, the acceptable attribute value input format for fields such as this is iPad.

 
 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 For additional attributes, see Accessories.


 

### Computers & Tablets


 Attribute and Type Description model


Type: string


 Common name of the product model. Does not include model numbers. Sample values: Lenovo, Thinkpad, Macbook Pro.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 operating_system


Type: string


 Type of preloaded operating system software installed on the device. Sample values: Android, iOS, Windows.


 screen size


Type: string


 Measurement of the device&#039;s screen, typically measured diagonally in inches. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in, 100 cm.


 storage_capacity


Type: string


 Amount of storage space on the item&#039;s hard drive, typically measured in megabytes, gigabytes, or terabytes. The first part is the number. The second part is one of the accepted units: KB, MB, GB, TB. Sample values: 1 TB, 16 GB.


 For additional attributes, see Computers & Tablets.


 

### Video Game Consoles & Video Games


 Attribute and Type Description model


Type: string


 Common name of the product model. Does not include model numbers. Sample values: Sony Playstation 4, Nintendo Wii, Microsoft Xbox 360.


 video_game_platform


Type: string


 Type of platform on which video game software is capable of running. Sample values: Xbox 360, Nintendo Wii, PC.


 age_group


Type: string


 Age group associated with the item. Sample values: adult, all ages, teen, kids, toddler, infant, newborn.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 For additional attributes, see Video Game Consoles & Video Games.


 

### Software


 Attribute and Type Description number_of_licenses


Type: integer


 Maximum number of users or installations allowed under the terms of the software licensing agreement. Sample values: 1, 3, 5.


 software_system_requirements


Type: list of strings


 Basic requirements (necessary of any system) to satisfactorily run the software. Sample values: Windows 7 or later, Intel Core 2 Duo 1.8 Ghz, 15 GB Free Hard Drive Space.


 
- To provide multiple values using a single feed software_system_requirements field, the acceptable input format is &#039;Windows 7 or later&#039;, &#039;Intel Core 2 Duo 1.8 Ghz&#039;, &#039;15 GB Free Hard Drive Space&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as software_system_requirements[0], software_system_requirements[1]. For example, the acceptable attribute value input format for fields such as this is Windows 7 or later.

 
 For additional attributes, see Software.


 

### Printers & Scanners


 Attribute and Type Description model


Type: string


 Common name of the product model. Does not include model numbers. Sample values: Lenovo Thinkpad, Macbook Pro.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 resolution


Type: integer


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_depth


Type: string


 Depth of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 For additional attributes, see Printers & Scanners.


 

### TVs & Monitors


 Attribute and Type Description display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: LED, LCD, OLED.


 resolution


Type: integer


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 screen_size


Type: integer


 Measurement of the device&#039;s screen, typically measured diagonally in inches. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 model


Type: string


 Common name of the product model. Does not include model numbers.


 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_depth


Type: string


 Depth of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 For additional attributes, see TVs & Monitors.


 

### Projectors


 Attribute and Type Description resolution


Type: integer


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: LED, LCD, OLED.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 model


Type: string


 Common name of the product model. Does not include model numbers.


 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_depth


Type: string


 Depth of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 2 ft, 2.5 ft, 40 cm, 60 cm.


 For additional attributes, see Projectors.


 

### Cameras


 Attribute and Type Description model


Type: string


 Common name of the product model. Does not include model numbers.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 digital_zoom


Type: number/float


 Magnification power provided by a feature that electronically enlarges the image area. Sample values must be numbers (containing only numerals or a decimal point). Measurement is multiples. Sample values: 6, 160, 200. Values, such as 20X or 20.4 MP, are rejected.


 megapixels


Type: number/float


 Resolution at which this item records images. Measured in megapixels (MP). Sample values: 16.0, 24.2.


 optical_zoom


Type: number/float


 Magnification power of a physical optical zoom lens. Measurement is multiples. Sample values: 10, 20, 24.


 For additional attributes, see Cameras.


 

## Additional Attributes


This category supports cell phones & smart watches, accessories, computers & tablets, video game consoles & video games, printers & scanners, TVs & monitors, projectors, and cameras.


For Google Product Category mapping, see Electronics, Camera & Optics, and Software.


### Cell Phones & Smart Watches


 Attribute and Type Description battery_life


Type: number/float


 Maximum run time or life of the item&#039;s battery, measured in hours. Sample values: 8, 12, 24.


 bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 cell_phone_service_provider


Type: string


 Describes the company that provides the phone&#039;s cellular service (if not unlocked). Sample values: Verizon, AT&T, Sprint.


 cellular_band


Type: string


 Describes the cellular band or network technology used by the device. Sample values: CDMA, GSM, LTE, EVDO.


 cellular_generation


Type: string


 Describes the communications network generation of the cell phone. Sample values: 3G,4G, 5G.


 connector_type


Type: list of strings


 Describes the types of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: OLED, LED, LCD.


 front_facing_camera_megapixel


Type: number/float


 Maximum resolution of the item&#039;s front facing camera, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample value: 24.


 material


Type: list of strings


 Primary material(s) of the item. Sample values: Rubber, Wood, Steel, Plastic.


 
- To provide multiple values using a single feed material field, the acceptable input format is &#039;Rubber&#039;, &#039;Wood&#039;, &#039;Steel&#039;, &#039;Plastic&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as material[0], material[1]. For example, the acceptable attribute value input format for fields such as this is Rubber.

 
 number_of_sim_card_slots


Type: integer


 Describes the number of SIM card slots designated for the product. Sample values: 1, 2.


 rear_facing_camera_megapixel


Type: integer


 Maximum resolution of the item&#039;s rear facing camera, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample value: 24.


 resolution


Type: integer


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 sim_type_supported


Type: list of strings


 Describes the type of SIM compatible with the product, such as Mini-SIM, Dual SIM. Multiple values accepted. Sample values: Standard SIM, Micro SIM, Nano SIM.


 
- To provide multiple values using a single feed sim_type_supported field, the acceptable input format is &#039;Standard SIM&#039;, &#039;Micro SIM&#039; &#039;Nano SIM&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as sim_type_supported[0], sim_type_supported[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 stand-by_time


Type: number/float


 Describes the total stand-by time in hours of the phone, typically measured in hours. Sample values: 12, 24.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: 35mm Jack, Bluetooth, GPS, SIM, Touch Screen, USB Connectivity, WLAN, Unlocked.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;35mm Jack&#039;, &#039;Bluetooth&#039;, &#039;GPS&#039;, &#039;SIM&#039;, &#039;Touch Screen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;Unlocked&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as 35mm Jack.

 
 talk_time


Type: number/float


 Describes the total talk time in hours of the phone, typically measured in hours. Sample values: 12, 20.


 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 video_resolution


Type: float


 Describes the resolution of the video recordings of the product. Measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample values: 2, 4, 24.


 watch_band_length


Type: string


 Length of the watch band. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 240 mm, 8.27 in.


 watch_band_material


Type: list of strings


 Primary material(s) from which the band of the watch is made. Sample values: Leather, Silicone, Stainless Steel.


 
- To provide multiple values using a single feed watch_band_material field, the acceptable input format is &#039;Leather&#039;, &#039;Silicone&#039; &#039;Stainless Steel&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as watch_band_material[0], watch_band_material[1]. For example, the acceptable attribute value input format for fields such as this is Leather.

 
 watch_band_width


Type: string


 Width of the watch band. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 22 mm, 0.87 in.


 watch_case_shape


Type: string


 Shape of the watch case or enclosure which contains the face and inner workings of the watch. Sample values: Round, Square, Tonneau, Cushion.


 watch_style


Type: string


 Style of the watch. Sample values: Wristwatch, Pocket Watch, Nursing Watch, Diving Watch, Military Watch.


 

### Accessories


 Attribute and Type Description cable_length


Type: string


 Total length of electronics cable. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 2 ft, 60 cm, 36 in.


 connector_type


Type: list of strings


 Types of connections supported for the item. Sample values: HDMI, RCS.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 headphone_features


Type: list of strings


 List features specific to headphones. Sample values: In-Ear, Over-Ear, On-Ear, Ear-Clip, Behind-the-Neck, Microphone, Memory Foam.


 
- To provide multiple values using a single feed headphone_features field, the acceptable input format is &#039;In-Ear&#039;, &#039;Over-Ear, &#039;On-Ear&#039;, &#039;Ear-Clip&#039;, &#039;Behind-the-Neck&#039;, &#039;Microphone&#039;, &#039;Memory Foam&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as headphone_features[0], headphone_features[1]. For example, the acceptable attribute value input format for fields such as this is In-Ear.

 
 material


Type: list of strings


 Primary material(s) of the item. Sample values: Rubber, Wood, Steel, Plastic.


 
- To provide multiple values using a single feed material field, the acceptable input format is &#039;Rubber&#039;, &#039;Wood&#039;, &#039;Steel&#039;, &#039;Plastic&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as material[0], material[1]. For example, the acceptable attribute value input format for fields such as this is Rubber.

 
 maximum_load_weight


Type: string


 Amount of weight that the TV/Monitor mount can support as certified by the manufacturer. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 45 lb, 20.5 kg.


 maximum_screen_size


Type: string


 Maximum size of the TV/Monitor that the mount can accommodate. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 55 in, 140 cm.


 minimum_screen_size


Type: string


 Minimum size of the TV/Monitor that the mount can accommodate. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 40 in, 101 cm.


 mount_type


Type: string


 Method by which the item is attached or anchored. Used for products, such as shelving and other fixtures. Sample values: Wall Mount, Ceiling Mount.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 45 lb, 120 lb, 54 kg, 80 kg.


 standard_features


Type: list of strings


 Standard features related to the item. Sample value: USB Connectivity.


 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 wireless_technologies


Type: list of strings


 Types of wireless technologies that the product can use. Sample values: Bluetooth, WiFi.


 
- To provide multiple values using a single feed wireless_technologies field, the acceptable input format is &#039;Bluetooth&#039;, &#039;WiFi&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as wireless_technologies[0], wireless_technologies[1]. For example, the acceptable attribute value input format for fields such as this is Bluetooth.

 
 

### Computers & Tablets


 Attribute and Type Description battery_life


Type: number/float


 Maximum run time or life of the item&#039;s battery, measured in hours. Sample values: 8, 12, 24.


 bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 computer_case_form_factor


Type: string


 One of the standard physical sizes to which the computer case conforms. Sample values: Full Tower, Mid Tower, Mini Tower, Slim Line, Small Form Factor.


 connector_type


Type: list of strings


 Type(s) of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 cpu_socket_type


Type: string


 Interface of, or required by, the central processing unit. Sample values: AM3, LGA 1150.


 display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: OLED, LED, LCD.


 front_facing_camera_megapixel


Type: number/float


 Maximum resolution of the item&#039;s front facing camera, in megapixels. Measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample value: 24.


 graphics_card_model


Type: string


 Model name of the graphics card included with the product. Sample values: Nvidia GeForce RTX 2080, AMD Radeon RX 590.


 hard_drive_type


Type: string


 Determins whether the hard drives of the product are internal or external. Sample values: Internal, External.


 maximum_supported_ram


Type: string


 Maximum amount of RAM memory that can be supported by the product. The first part is the number. The second part is one of the accepted units: KB, MB, GB, TB. Sample values: 16 GB, 1 TB.


 motherboard_form_factor


Type: string


 Describes one of the standard physical sizes to which the computer motherboard conforms. Sample values: ATX, Mini ATX, Micro ATX, Flex ATX, Mini ITX, DTX.


 optical_drive


Type: list of strings


 Type of optical drives included with the product. Sample values: CD ROM, CD RW, DVD ROM.


 
- To provide multiple values using a single feed optical_drive field, the acceptable input format is &#039;CD ROM&#039;, &#039;CD RW.

- To provide multiple values with one value per feed field, use feed field names, such as optical_drive[0], optical_drive[1]. For example, the acceptable attribute value input format for fields such as this is CD ROM.

 
 processor_speed


Type: integer


 Operational frequency of the computer&#039;s CPU. The first part is the number. The second part is one of the accepted units: Hz, KHz, MHz, GHz. Sample values: 3.00 GHz, 66 MHz.


 processor_type


Type: string


 Commonly used name of the computer&#039;s CPU. Sample values: Intel Core i7, ARM Coretex A7, AMD Ryzen 7.


 ram_memory


Type: string


 Amount of RAM memory preinstalled designated for the product. The first part is the number. The second part is one of the accepted units: KB, MB, GB, TB. Sample values: 16 GB, 1 TB.


 rear_facing_camera_megapixel


Type: number/float


 Maximum resolution of the item&#039;s rear facing camera, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample value: 24.


 resolution


Type: number


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: 35mm Jack, Bluetooth, Touch Screen, USB Connectivity, WLAN, Portable.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;35mm Jack&#039;, &#039;Bluetooth&#039;, &#039;GPS&#039;, &#039;SIM&#039;, &#039;Touch Screen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;Portable&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as 35mm Jack.

 
 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 video_resolution


Type: number/float


 Resolution of the video recordings of the product. Measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample values: 24.


 wireless_technologies


Type: list of strings


 Types of wireless technologies that the product can use. Sample values: Bluetooth, WiFi.


 
- To provide multiple values using a single feed wireless_technologies field, the acceptable input format is &#039;Bluetooth&#039;, &#039;WiFi&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as wireless_technologies[0], wireless_technologies[1]. For example, the acceptable attribute value input format for fields such as this is Bluetooth.

 
 

### Video Game Consoles & Video Games


 Attribute and Type Description battery_life


Type: number/float


 Maximum run time or life of the item&#039;s battery, measured in hours. Sample values: 8, 12, 24.


 bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 connector_type


Type: list of strings


 Type(s) of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed wireless_technologies field, the acceptable input format is &#039;Bluetooth&#039;, &#039;WiFi&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as wireless_technologies[0], wireless_technologies[1]. For example, the acceptable attribute value input format for fields such as this is Bluetooth.

 
 display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: OLED, LED, LCD.


 operating_system


Type: string


 Type of preloaded operating system software installed on the device. Sample values: Android, iOS, Windows.


 physical_media_format


Type: string


 Standard media format for the product. Sample value: CD, DVD, Blu-Ray.


 processor_speed


Type: string


 Operational frequency of the computer&#039;s CPU. Sample value: 3.00 GHz, 66 MHz.


 release_date


Type: string


 Specific date that marks when the product was made available for public distribution, provided in the format MM-DD-YYYY. Sample value: 9/19/2019.


 required_peripherals


Type: list of strings


 Any type of required accessory or peripheral necessary to operate the item (or play the video game). Sample values: PlayStation Move, Kinect, Wii Balance Board, Flatbed Scanner, Microphone.


 
- To provide multiple values using a single feed required_peripherals field, the acceptable input format is &#039;PlayStation Move&#039;, &#039;Kinect&#039;, &#039;Wii Balance Board&#039;, &#039;Flatbed Scanner&#039;, &#039;Microphone&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as required_peripherals[0],required_peripherals[1]. For example, the acceptable attribute value input format for fields such as this is PlayStation Move.

 
 resolution


Type: integer


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 screen size


Type: string


 Measurement of the device&#039;s screen. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in, 100 cm.


 sport


Type: list of strings


 Particular sport or activity for which your item is intended. Sample Values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Tennis&#039;, &#039;Soccer&#039;, &#039;Hiking&#039;, &#039;Running&#039;, &#039;Yoga&#039;, &#039;Basketball&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as sport[0], sport[1]. For example, the acceptable attribute value input format for fields such as this is Tennis.

 
 sports_league


Type: string


 Particular sports league that your item represents or is associated with. Sample Values: NFL, NBA, NASCAR.


 sports_team


Type: string


 Particular sports team that your item represents or is associated with. Sample Values: Golden State Warriors, San Francisco Giants.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: 35mm Jack, Bluetooth, Downloadable Content, Online Multiplayer, Touchscreen, USB Connectivity, WLAN, Portable.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;35mm Jack&#039;, &#039;Bluetooth&#039;, &#039;Downloadable Content&#039;, &#039;Online Multiplayer&#039;, &#039;Touchscreen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;Portable&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as 35mm Jack.

 
 storage_capacity


Type: string


 Amount of storage space on the item&#039;s hard drive, typically measured in megabytes, gigabytes, or terabytes. The first part is the number. The second part is one of the accepted units: KB, MB, GB, TB. Sample values: 1 TB, 16 GB.


 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 video_game_genre


Type: string


 Genre, style, or type of video game available for purchase. Sample values: Shooter, Role Playing, MMO, Racing.


 video_game_rating


Type: string


 Standard rating of the content of the video game. Can be important for violent games or games intended only for mature audiences. Sample values: E - Everyone, PEGI 12, T - Teen, PG.


 video_game_series


Type: string


 Name of the video game series this game belongs to. Sample values: Fallout, Grand Theft Auto, Call of Duty, Halo.


 video_resolution


Type: number/float


 Resolution of the video recordings of the product. Measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample values: 2, 4, 24.


 

### Software


 Attribute and Type Description age_group


Type: string


 Age group associated with the item. Sample values: adult, all ages, teen, kids, toddler, infant, newborn.


 educational_focus


Type: list of strings


 Describes what educational skill(s) the software is intended to improve. Sample values: Language, Math, Reading, Music.


 
- To provide multiple values using a single feed educational_focus field, the acceptable input format is &#039;Language&#039;, &#039;Math&#039;, &#039;Reading&#039;, &#039;Music.

- To provide multiple values with one value per feed field, use feed field names, such as educational_focus[0],educational_focus[1]. For example, the acceptable attribute value input format for fields such as this is Language.

 
 physical_media_format


Type: string


 Standard media format for the product. Sample values: CD, DVD, Blu-Ray.


 release_date


Type: string


 Specific date that marks when the product was made available for public distribution, provided in the format MM-DD-YYYY. Sample value: 9/19/2019.


 required_peripherals


Type: list of strings


 Any type of required accessory or peripheral necessary to operate the item (or play the video game). Sample values: PlayStation Move, Kinect, Wii Balance Board, Flatbed Scanner, Microphone.


 
- To provide multiple values using a single feed required_peripherals field, the acceptable input format is &#039;PlayStation Move&#039;, &#039;Kinect&#039;, &#039;Wii Balance Board&#039;, &#039;Flatbed Scanner&#039;, &#039;Microphone&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as required_peripherals[0],required_peripherals[1]. For example, the acceptable attribute value input format for fields such as this is PlayStation Move.

 
 software_category


Type: string


 General category of software to which the item is most closely associated with. Sample values: Antivirus & Security, Web & Desktop Publishing, Personal Finance, Tax & Legal, Operating Systems.


 software_version


Type: string


 Version number assigned to this specific release of the software. Sample values: 7.2, 10.1.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Orthopedic, Water Resistant.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Water Resistant&#039;, &#039;Orthopedic&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. The acceptable attribute value input format for fields, such as Water Resistant.

 
 

### Printers & Scanners


 Attribute and Type Description bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 color_pages_per_minute


Type: number/float


 Number of color pages that the imaging device is able to produce per minute. Sample values: 12, 23.


 connector_type


Type: list of strings


 Type of connection(s) supported on the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 monochrome_pages_per_minute


Type: number/float


 Number of monochrome pages that the imaging device is able to produce per minute. Sample values: 50, 36.


 monochrome_color


Type: string


 Determines if the imaging device is capable of color processing or monochrome only. Sample values: Monochrome, Color.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Auto Document Feeder, Auto Two-Sided Printing, Bluetooth, Touchscreen, USB Connectivity, WLAN, Portable, Energy Star Certified.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Auto Document Feeder&#039;, &#039;Auto Two-Sided Printing&#039;, &#039;Bluetooth&#039;, &#039;Touchscreen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;Portable&#039;, &#039;Energy Star Certified&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as Auto Document Feeder.

 
 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 

### TVs & Monitors


 Attribute and Type Description bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 aspect_ratio


Type: string


 Relationship between the product&#039;s width and its height. Sample values: 4:3, 16:9.


 audio_features


Type: list of strings


 Describes whether the product has certain special audio features. Sample values: Surround Sound, Noise Cancelling, High Fidelity.


 
- To provide multiple values using a single feed audio_features field, the acceptable input format is &#039;Surround Sound&#039;, &#039;Noise Cancelling&#039;, &#039;High Fidelity&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as audio_features[0],audio_features[1]. For example, the acceptable attribute value input format for fields such as this is Surround Sound.

 
 audio_power_output


Type: float


 Power of the audio output of the device&#039;s speakers, measured in watts. Sample values: 5, 7.5.


 backlight_technology


Type: float


 Power of the audio output of the device&#039;s speakers, measured in watts. Sample values: 5, 7.5.


 bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 connector_type


Type: list of strings


 Type(s) of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 is_assembly_required


Type: boolean


 Indicates if the product arrives unassembled and must be put together before use. Sample values: Yes, No.


 maximum_contrast_ratio


Type: string


 Ratio between the luminance of the brightest color to that of the darkest color capable of being displayed. Sample values: 20,000:1, 30,000,000:1.


 number_of_hdmi_ports


Type: integer


 Number of HDMI ports on the television or monitor. Sample values: 3,5, 8.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 5 lb, 3 kg.


 refresh_rate


Type: number/float


 Refresh rate of the display. This measures the number of times the picture is updated per second, measured in Hz. The first part is the number. The second part is one of the accepted units: Hz, KHz, MHz, GHz. Sample values: 60 Hz, 120 Hz.


 response_time


Type: number/float


 Amount of time it takes for the pixels in a display to change, measured in milliseconds (ms). Sample values: 5, 2.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Auto Document Feeder, Auto Two-Sided Printing, Bluetooth, Touchscreen, USB Connectivity, WLAN, Portable, Energy Star Certified.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Auto Document Feeder&#039;, &#039;Auto Two-Sided Printing&#039;, &#039;Bluetooth&#039;, &#039;Touchscreen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;Portable&#039;, &#039;Energy Star Certified&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as Auto Document Feeder.

 
 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 vesa_mounting_standard


Type: string


 VESA Standard defines the distance in millimeters between the four mounting holes on the back of a TV (distance horizontally x distance vertically). Sample values: 200 x 200, 400 x 400, 600 x 400.


 wireless_technologies


Type: list of strings


 Types of wireless technologies that the product can use. Sample values: Bluetooth, WiFi.


 
- To provide multiple values using a single feed wireless_technologies field, the acceptable input format is &#039;Bluetooth&#039;, &#039;WiFi&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as wireless_technologies[0], wireless_technologies[1]. For example, the acceptable attribute value input format for fields such as this is Bluetooth.

 
 

### Projectors


 Attribute and Type Description bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 aspect_ratio


Type: string


 Relationship between the product&#039;s width and its height. Sample values: 4:3, 16:9.


 audio_features


Type: list of strings


 Describes whether the product has certain special audio features. Sample values: Surround Sound, Noise Cancelling, High Fidelity.


 
- To provide multiple values using a single feed audio_features field, the acceptable input format is &#039;Surround Sound&#039;, &#039;Noise Cancelling&#039;, &#039;High Fidelity&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as audio_features[0],audio_features[1]. For example, the acceptable attribute value input format for fields such as this is Surround Sound.

 
 audio_power_output


Type: number/float


 Power of the audio output of the device&#039;s speakers, measured in watts. Sample values: 5, 7.5.


 backlight_technology


Type: string


 Power of the audio output of the device&#039;s speakers, measured in watts. Sample values: 5, 7.5.


 bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 brightness


Type: number/float


 Brightness per bulb measured in lumens. Sample values: 2000, 5000.


 connector_type


Type: list of strings


 Type(s) of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 is_assembly_required


Type: boolean


 Indicates if the product arrives unassembled and must be put together before use. Sample values: Yes, No.


 lamp_life


Type: number/float


 Expected life of the projection lamp in hours. Sample values: 6500, 10000.


 maximum_contrast_ratio


Type: string


 Ratio between the luminance of the brightest color to that of the darkest color capable of being displayed. Sample values: 20,000:1, 30,000,000:1.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 5 lb, 3 kg.


 refresh_rate


Type: float


 Refresh rate of the display. This measures the number of times the picture is updated per second, measured in Hz. The first part is the number. The second part is one of the accepted units: Hz, KHz, MHz, GHz. Sample values: 60 Hz, 120 Hz.


 response_time


Type: float


 Amount of time it takes for the pixels in a display to change, measured in milliseconds (ms). Sample values: 5, 2.


 screen_size


Type: string


 Measurement of the device&#039;s screen, typically measured diagonally in inches. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: 35mm Jack, Bluetooth, Integrated Speakers, Touchscreen, USB Connectivity, WLAN, 3D, Energy Star Certified, Portable, Smart.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;35mm Jack&#039;, &#039;Bluetooth&#039;, &#039;Integrated Speakers&#039;, &#039;Touchscreen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;3D&#039;, &#039;Energy Star Certified&#039;, &#039;Portable&#039;, &#039;Smart&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as 35mm Jack.

 
 throw_ratio


Type: string


 Number of times your monitor updates with new images each second. Sample values: 1.8:1, 2.0:1.


 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 video_resolution


Type: float


 Describes the resolution of the video recordings of the product. Measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample values: 24.


 wireless_technologies


Type: list of strings


 Types of wireless technologies that the product can use. Sample values: Bluetooth, WiFi.


 
- To provide multiple values using a single feed wireless_technologies field, the acceptable input format is &#039;Bluetooth&#039;, &#039;WiFi&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as wireless_technologies[0], wireless_technologies[1]. For example, the acceptable attribute value input format for fields such as this is Bluetooth.

 
 

### Cameras


 Attribute and Type Description battery_life


Type: integer


 Maximum run time or life of the item&#039;s battery, measured in hours. Sample values: 8, 12, 24.


 compatible_devices


Type: list of strings


 Devices compatible with the item. Sample values: iPad, Tablet Computers, Windows Desktop Computers, Apple Computers.


 
- To provide multiple values using a single feed compatible_devices field, the acceptable input format is &#039;iPad&#039;, &#039;Tablet Computers&#039;, &#039;Windows Desktop Computers&#039;, &#039;Apple Computers&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as compatible_devices[0], compatible_devices[1]. For example, the acceptable attribute value input format for fields such as this is iPad.

 
 connector_type


Type: list of strings


 Type(s) of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: OLED, LED, LCD.


 flash_type


Type: string


 Type of flash the camera has or can accommodate. Sample values: Built-in Camera, Hammerhead Flash, Macro Ring Light Flash, Pop-up Flash.


 focal_length


Type: number/float


 On a camera or lens, the distance between the image sensor and the lens when the subject is in focus, usually stated as a range in millimeters. Sample values: 18.


 focal_ratio


Type: string


 Ratio of the lens&#039;s focal length, to the diameter of the entrance pupil. Also known as the "f-number" or "f-stop", this number indicates lens speed. Sample values: f/5, f/6.


 lens_coating


Type: list of strings


 Type of thin layer of material applied to the surface of lenses or other optical elements that provide specific effects. Multiple values accepted. Sample values: Scratch-Resistant, Mirrored&#039;, Dielectric.


 
- To provide multiple values using a single feed lens_coating field, the acceptable input format is &#039;Scratch-Resistant&#039;, &#039;Mirrored&#039;, &#039;Dielectric&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as lens_coating[0], lens_coating[1]. For example, the acceptable attribute value input format for fields such as this is Scratch-Resistant.

 
 lens_diameter


Type: number/float


 Measurement of the diameter of the front portion of the lens, measured in "mm". Sample values: 49, 52.


 lens_filter


Type: string


 Kind of filter attached to a lens. Sample values: Cooling, Graduated Neutral Density, Polarizing, UV.


 maximum_aperture


Type: string


 Size of the largest aperture this item accommodates; typically expressed in f-numbers. Sample values: f/1.4, f/6.


 maximum_shutter_speed


Type: number/float


 Maximum shutter speed of the item. Measured in 1/seconds. For 1/4000, specify 4000. Sample values: 4000.


 minimum_aperture


Type: string


 Smallest aperture this item accommodates; typically expressed in f-numbers. Sample values: f/16.


 minimum_shutter_speed


Type: float


 Minimum shutter speed of the item, measured in seconds. Sample values: 250.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 screen size


Type: integer


 Measurement of the device&#039;s screen, typically measured diagonally in inches. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in, 100 cm.


 self-timer_delay


Type: number/float


 Length of time the self-timer allows before it takes a photo, measured in seconds. Sample values: 2, 10.


 sensor_resolution


Type: string


 One specification describing the smallest detectable incremental change of input parameter that can be detected in the output signal. For digital cameras, image sensor resolution is an important factor for image quality. Sample values: 1/2.3 in, 35.8 mm x 23.9 mm, 0.43 in, 1.69 in (units can be represented in megapixels, dots per square, pixels per inch, and so on).


 shooting_modes


Type: list of strings


 Available settings designed to accommodate different photographic situations. Sample values: Portrait, Landscape, Close Up, xfs, No Flash, Burst.


 
- To provide multiple values using a single feed shooting_modes field, the acceptable input format is &#039;Portrait&#039;, &#039;Landscape&#039;, &#039;Close Up&#039;, &#039;xfs&#039;, &#039;No Flash&#039;, &#039;Burst&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as shooting_modesg[0], shooting_modes[1]. For example, the acceptable attribute value input format for fields such as this is Portrait.

 
 

## Learn More


 
- Clothing & Accessories, Product Categories

- Home, Product Categories

- Jewelry & Watches, Product Categories

- Health & Beauty, Product Categories

- Baby Products, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Baby &amp; Kids - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/categories/baby

Baby & Kids - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Baby & Kids


 This category also supports additional attributes.


For Google Product Category mapping, see Baby & Toddler.


 

## Recommended Attributes


Include these attributes to enrich your product details page (PDP) and help buyers during purchase consideration. We advise providing all of them for improved buyer experience.


 Attribute and Type Categories (Note, for some attributes not all sub-categories apply.) Description material


string


 Baby carriers, Baby bathing, Feeding, Bath tubs, Nursery, Strollers & Accessories


 Primary material(s) of your item. Sample values: Cotton, Linen, Cashmere, Silk.


Provide this attribute for all products where a color, size or material variation exists


 size


string


 Baby & Kids


 Size as it appears on the label. Includes generic sizes, such as Small and One Size. Includes numeric sizes, such as 2, 4. Sample Values: Small, Medium, Large, 2, 4, 6, One Size.


 pattern


string


 Baby carriers, Nursery


 Recurring design, pattern, or motif on your item. Sample values: Plaid, Polka Dot, Gingham, Chevron.


 decor_style


string


 Nursery


 Decorative style in which the product was made. Sample values: Bohemian, Contemporary, Industrial, Mid-Century, Modern, Rustic, Vintage.


 finish


string


 Nursery


 External treatment to the product that usually includes a change in appearance or texture to the item. Commonly used for furniture include wood, metal, and fabric. Sample values: Natural/Unfinished, Walnut, Pewter, Antiqued.
.


 
 

## Additional Attributes


This category supports additional attributes for nursery, toys, baby feeding, baby transport, diapering & potty training.


For Google Product Category mapping, see Baby & Toddler.


 

### Nursery


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample values: Waterproof, Personalized, Vintage.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Personalized&#039;, &#039;Vintage&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as additional_features[0], additional_features[1]. For example, the acceptable attribute value input format for fields, such as Waterproof.

 
 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 comfort_level


Type: string


 Firmness or softness of a mattress. Sample values: Extra Plush, Plush, Medium, Firm, Extra Firm, Adjustable.


 fabric_care_instructions


Type: list of strings


 Specific care instructions for how the fabric of your item should be cleaned. Instructions are on the item label. Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand Wash.


 
- To provide multiple values using a single feed fabric_care_instructions field, the acceptable input format is &#039;Dry Clean Only&#039;, &#039;Machine Washable&#039;, &#039;Do Not Iron&#039;, &#039;Hand Wash&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as fabric_care_instructions[0], fabric_care_instructions[1]. For example, the acceptable attribute value input format for fields such as this is Dry Clean Only.

 
 fill_material


Type: list of strings


 Material(s) used to fill the item; usually in cushions, pillows, mattresses, and bean bags. Sample values: Polyester, Foam, Latex, Down, Cotton.


 
- To provide multiple values using a single feed fill_material field, the acceptable input format is &#039;Polyester&#039;, &#039;Foam&#039;, &#039;Latex&#039;, &#039;Down&#039;, &#039;Cotton&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as fill_material[0], fill_material[1]. For example, the acceptable attribute value input format for fields such as this is Polyester.

 
 is_assembly_required


Type: boolean


 Indicates if the product arrives unassembled and must be put together before use. Sample values: Yes, No.


 mattress_thickness


Type: string


 Measure from the bottom of the mattress to the crown. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 12 in, 15 in, 30 cm, 38 cm.


 number_of_drawers


Type: integer


 Number of drawers included in the product. Sample values: 2, 4, 8.


 number_of_shelves


Type: integer


 Number of shelves included in the product. Sample values: 2, 4, 8.


 shape


Type: string


 General shape of the product. Often used to describe furniture and home furnishings. Sample values: Rectangle, Square, Oval, Round.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Foldable, Wheeled, Antique.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Foldable&#039;, &#039;Wheeled&#039;, &#039;Antique&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as Foldable.

 
 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Toys


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample values: Waterproof, Personalized, Vintage.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Personalized&#039;, &#039;Vintage&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as additional_features[0], additional_features[1]. For example, the acceptable attribute value input format for fields, such as Waterproof.

 
 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 educational_focus


Type: list of strings


 Determines if the item intended to improve a particular educational skill. Sample values: Shape Identification, Language, Motor Skills, Pretend Play, Color Identification, Science, Nature, Math, Counting, Music, Reading, Writing, Creativity.


 
- To provide multiple values using a single feed educational_focus field, the acceptable input format is &#039;Language&#039;, &#039;Math&#039;, &#039;Reading&#039;, &#039;Music.

- To provide multiple values with one value per feed field, use feed field names, such as educational_focus[0],educational_focus[1]. For example, the acceptable attribute value input format for fields such as this is Language.

 
 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Baby Feeding


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample values: Waterproof, Personalized, Vintage.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Personalized&#039;, &#039;Vintage&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as additional_features[0], additional_features[1]. For example, the acceptable attribute value input format for fields, such as Waterproof.

 
 allergens


Type: list of strings


 Statement regarding any ingredients that may be food allergens, often written as "Contains X" or "Manufactured in a facility which processes Y". Sample values: Contains Peanuts, Soy, Manufactured in a facility that processes tree nuts, milk, and eggs.


 
- To provide multiple values using a single feed allergens field, the acceptable input format is &#039;Contains Peanuts, Soy&#039;, &#039;Manufactured in a facility that processes tree nuts, milk, and eggs&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as allergens[0], allergens[1]. For example, the acceptable attribute value input format for fields, such as Contains Peanuts, Soy.

 
 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 color


Type: list of strings


 Primary color(s) of your item. Sample values: Beige, Black, Blue, Bronze, Brown, Gold, Gray.


 
- To provide multiple values using a single feed color field, the acceptable input format is &#039;Beige&#039;, &#039;Black&#039;, &#039;Blue&#039;, &#039;Bronze&#039;, &#039;Brown&#039;, &#039;Gold&#039;, &#039;Gray&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as allergens[0], allergens[1]. For example, the acceptable attribute value input format for fields, such as Beige.

 
 flavor


Type: list of strings


 Describes the taste or flavor of the item, as described by the manufacturer. May be an important attribute for shoppers for items, such as dental products or medicine. Multiple values accepted. Samples values: Cinnamon, Peppermint, Bubble Gum, Citrus, Chocolate, Berry.


 
- To provide multiple values using a single feed flavor field, the acceptable input format is &#039;Cinnamon&#039;, &#039;Peppermint&#039;, &#039;Bubble Gum&#039;, &#039;Citrus&#039;, &#039;Chocolate&#039;, &#039;Berry&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as flavor[0], flavor[1]. For example, the acceptable attribute value input format for fields such as this is Cinnamon.

 
 ingredients


Type: list of strings


 List of active ingredients as shown on the item label. Active ingredients usually perform a specific purpose, such as hydration, anti-acne, and so on. Sample values: Vitamin C, Benzoyl Peroxide, Alpha Hydroxy Acid, Hyaluronic Acid, Hydroquinone.


 
- To provide multiple values using a single feed ingredients field, the acceptable input format is &#039;Vitamin C&#039;, &#039;Benzoyl Peroxide&#039;, &#039;Alpha Hydroxy Acidm&#039;, &#039;Hyaluronic Acid&#039;, &#039;Hydroquinone&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as ingredients[0], ingredients[1]. For example, the acceptable attribute value input format for fields such as this is Vitamin C.

 
 life_stage


Type: string


 Life stage of a child. Sample values: Newborn, Infant, Toddler.


 maximum_weight


Type: string


 Upper weight limit or capability of an item, often used in conjunction with minimum_weight. The meaning varies with context of the product. For example, when used with minimum_weight, this attribute provides weight ranges for a range of products including pet medicine, baby carriers, and outdoor play structures. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 35 lb, 45 lb, 15 kg, 20 kg.


 minimum_weight


Type: string


 Lower weight limit or capability of an item, often used in conjunction with maximum_weight. The meaning varies with context of the product. For example, when used with maximum_weight, this attribute provides weight ranges for a range of products including pet medicine, baby carriers, and outdoor play structures. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 35 lb, 45 lb, 15 kg, 20 kg.


 package_quantity


Type: integer


 Total number of items included in the package or box. Sample values: 12, 24, 36.


 product_form


Type: string


 Consistency, texture, or formulation of the item and the way it can be consumed or dispensed. Sample values: Oil, Gel, Spray, Cream, Powder, Serum, Liquid, Frozen, Granules, Liquid, Bars, Fresh, Whole, Stewed, Sliced, Chopped, Diced, Blended, Powders.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Baby Transport


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample values: Waterproof, Personalized, Vintage.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Personalized&#039;, &#039;Vintage&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as additional_features[0], additional_features[1]. For example, the acceptable attribute value input format for fields, such as Waterproof.

 
 baby_carrier_position


Type: string


 Applies to wearable baby carriers. Describes the part of the body against which the child is placed along with the direction the child faces (where applicable) while in the wearable baby carrier. Sample values: front carry - facing in, front carry - facing out, back carry, hip carry, side carry.


 baby_carrier_style


Type: string


 Which direction the car seat faces. Sample values: Forward-Facing, Rear-Facing, Convertible.


 car_seat_facing_direction


Type: string


 Prominent wearable baby carrier styles. Sample values: sling, skin-to-skin, wrap, frame carrier.


 car_seat_max_child_height


Type: string


 Maximum height of the child occupant as given by the manufacturer, measured in inches or centimeters. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 57 in, 145 cm.


 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 child_car_seat_style


Type: string


 Prominent car seat styles. Sample values: Backless Booster, Combination Seat, Convertible Car Seats, 5-Point Convertible, High-back Booster, Infant Seat, Overhead Shield Convertible.


 number_of_seats


Type: integer


 Seating capacity of the furniture. Sample values: 1, 2, 4, 6, 8.


 safety_harness_style


Type: string


 Style of the occupant restraint harness included with the car seat, stroller, carrier, and so on. Sample values: 3-point harness, 5-point harness, no harness.


 standard_features


Type: list of strings


 Standard features related to the item. Sample value: Foldable.


 stroller_type


Type: string


 Prominent stroller styles. Sample values: jogging, lightweight, umbrella, full-size, sit and stand, all-terrain.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Diapering & Potty Training


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample values: Waterproof, Personalized, Vintage.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Personalized&#039;, &#039;Vintage&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as additional_features[0], additional_features[1]. For example, the acceptable attribute value input format for fields, such as Waterproof.

 
 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 diaper_type


Type: string


 Type of diaper. Sample values: Cloth, Disposable, Training Pants.


 ingredients


Type: list of strings


 List of active ingredients as shown on the item label. Active ingredients usually perform a specific purpose, such as hydration, anti-acne, and so on. Sample values: Vitamin C, Benzoyl Peroxide, Alpha Hydroxy Acid, Hyaluronic Acid, Hydroquinone.


 
- To provide multiple values using a single feed ingredients field, the acceptable input format is &#039;Vitamin C&#039;, &#039;Benzoyl Peroxide&#039;, &#039;Alpha Hydroxy Acidm&#039;, &#039;Hyaluronic Acid&#039;, &#039;Hydroquinone&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as ingredients[0], ingredients[1]. For example, the acceptable attribute value input format for fields such as this is Vitamin C.

 
 instructions


Type: list of strings


 Information that describes how the item should be assembled, consumed, or used. Sample values: Spray directly on floors and then wipe away with a damp mop, Dilute a bit of the all purpose cleaner in water and use the solution to mop your floors.


 
- To provide multiple values using a single feed instructions field, the acceptable input format is &#039;Spray directly on floors and then wipe away with a damp mop&#039;, &#039;Dilute a bit of the all purpose cleaner in water and use the solution to mop your floors&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as instructions[0], instructions[1]. For example, the acceptable attribute value input format for fields such as this is Spray directly on floors and then wipe away with a damp mop.

 
 life_stage


Type: string


 Life stage of a child. Sample values: Newborn, Infant, Toddler.


 maximum_weight


Type: string


 Upper weight limit or capability of an item, often used in conjunction with minimum_weight. The meaning varies with context of the product. For example, when used with minimum_weight, this attribute provides weight ranges for a range of products including pet medicine, baby carriers, and outdoor play structures. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 35 lb, 45 lb, 15 kg, 20 kg.


 minimum_weight


Type: string


 Lower weight limit or capability of an item, often used in conjunction with maximum_weight. The meaning varies with context of the product. For example, when used with maximum_weight, this attribute provides weight ranges for a range of products including pet medicine, baby carriers, and outdoor play structures. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 35 lb, 45 lb, 15 kg, 20 kg.


 product_form


Type: string


 Consistency, texture, or formulation of the item and the way it can be consumed or dispensed. Sample values: Oil, Gel, Spray, Cream, Powder, Serum, Liquid, Frozen, Granules, Liquid, Bars, Fresh, Whole, Stewed, Sliced, Chopped, Diced, Blended, Powders.


 scent


Type: list of strings


 Scent(s) or fragrance(s) of your item, including items labeled as "unscented". Multiple values accepted. Sample values: Lavender, Vanilla, Lemon, Coconut, Jasmine, Pine.


 
- To provide multiple values using a single feed scent field, the acceptable input format is &#039;Lavender&#039;, &#039;Vanilla&#039;, &#039;Lemon&#039;, &#039;Coconut&#039;, &#039;Jasmine&#039;, &#039;Pine&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as scent[0], scent[1]. For example, the acceptable attribute value input format for fields such as this is Lavender.

 
 stop_use_indications


Type: list of strings


 Information that describes symptoms or reactions that indicate when to stop taking medicine. Sample values: Stop using if you experience swelling, rash, or fever….


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

## Learn More


 
- Home Decor & Furniture, Product Categories

- Jewelry & Watches, Product Categories

- Health & Beauty, Product Categories

- Clothing, Shoes & Accessories, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->

---
# API de la lista - Catálogo - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/feed-api

API de la lista - Catálogo - Documentación - Meta for Developers - CatálogoInformación general
- Primeros pasos
- Guías
- Referencia
- Prácticas recomendadas
- Ayuda
 

# Feed API Reference


Items you want to sell on Facebook and Instagram are uploaded and managed using a catalog. For each catalog, a data feed should be provided in one of the supported formats (CSV, TSV, RSS XML, ATOM XML).


Note, to supplement or modify existing catalog data without modifying the raw, underlying data source, use a supplementary feed. Supplementary feeds can only update items in a catalog; they cannot create or delete items.


 

## Uploading Your Products


You can manually create a product catalog in the Commerce Manager, or programmatically. Upload or configure your products using the Product Feed API.


The product feed will be used as the source of truth for updating product catalogs on Facebook, and fetched by Facebook periodically according to the configured interval. You should store the product feed ID, and use it to get upload status, errors and to change upload schedule.


curl -X POST \
 -F &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/v25.0/<PRODUCT_CATALOG_ID>/product_feeds


### Request


AttributeTypeRequiredDescriptionname


 string


 Required


 schedule


 schedule


 Required


 The configuration for fetching a feed in a recurrent manner. See schedule object below for more details.


 update_only


 bool


 Optional


 Default: false


Note, if value is set to false, the feed is treated as a replace feed. That means with every new incoming update, if we do not find the set of items created previously, they will be deleted.


When set to true, we create new items and update existing ones, but don&#039;t delete items from the feed. You only need to provide ID to update existing items. This reduces time to fetch and process your file.


 ingestion_source_type


 enum &#123;PRIMARY_FEED, SUPPLEMENTARY_FEED&#125;


 Optional (Required for Supplementary Feeds)


 See Product Feed documentation.


 primary_feed_ids


 list <numeric string>


 Optional (Required for Supplementary Feeds)


 See Product Feed documentation.


 

### schedule object


Read the Product Feed Schedule specification for more details.


 Attribute Type Required Description url


 string


 Required


 The location of the product feed to fetch.


 interval


 string


 Required


 The interval at which the product feed gets fetched.


 hour


 number


 Optional


 Hour of the day to fetch the product feed.


 Scheduled feeds do not support uploads more frequently than once per hour. If you need to update inventory faster, please use the Catalog Batch API.


 

### Response


&#123;
 "id": &#123;PRODUCT_FEED_ID&#125;
&#125;

## Perform One-Time Direct Upload


Along with scheduled feed fetches, you can manually perform one-time uploads.


Example — Feed files hosted on a public location


curl -X POST \
 -F &#039;url="<URL>"&#039; \
 -F &#039;access_token=<ACCESS_TOKEN>&#039; \
 https://graph.facebook.com/v25.0/<PRODUCT_FEED_ID>/uploads
Example — Uploading feed files directly from the local machine. The path to the file needs to be changed according to your use case.


curl -X POST \
 -F &#039;file=&#064;catalog.csv;type=text/csv&#039; \
 -F &#039;access_token=<ACCESS_TOKEN>&#039; \
 https://graph.facebook.com/v25.0/<PRODUCT_FEED_ID>/uploads
Optionally, you can set update_only to true. We create new items and update existing ones, but don&#039;t delete items from the feed. You only need to provide id to update existing items. This reduces time to fetch and process your file.


For example, to update only price and custom labels for 100 items in a feed, use direct upload. Provide a file with only id, price and custom_label_0 for those items and update_only set to true. We support all listed file formats; the most common ones are TSV and CSV. See Supported Feed Formats for more information.


If your feed file is hosted on a server with basic HTTP authentication, you have the option to send both username and password.


For more information, see:


 
- Manual Product Feed Uploads, Reference

- Product Feed Upload Errors, Reference

- Uploading Inventory, Commerce Platform.

 


### Feed Format per Use Case


 
Feed Format
 
Use Case
 
Sample Feed
 CSV


 Update price and availability for a subset of items.


 Download (Right-Click and Save Link As)


 TSV


 Reset sale_price and update custom_label_0 for a subset of items


 Download (Right-Click and Save Link As)


 

## Handling Product Feed Upload Errors


Read the Product Feed Upload Errors documentation.


We recommend that you check catalog upload errors and warnings after each upload session. You can achieve this by going to the Diagnostics section of your Commerce Manager, or use the Feed API to request a sampling of errors and warnings. Start by first querying for recent upload sessions.


### Request


curl -X GET -G \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/v25.0/<PRODUCT_FEED_ID>/uploads


### Sample Response


&#123;
 "data": [
 &#123;
 "id": "&#123;UPLOAD_SESSION_ID&#125;&#125;",
 "start_time": "2019-07-15T12:38:36+0000",
 "end_time": "2019-07-15T12:38:47+0000"
 &#125;
 ]
&#125;Then, use the value returned in the id field to retrieve a sampling of errors and warnings.


### Request


curl -X GET -G \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/v25.0/<UPLOAD_SESSION_ID>/errors


### Sample Response


A fatal severity here means the item cannot be ingested by Meta; a warning severity means the recommended attributes are missing or malformed. In the case of a warning, we will omit the problematic field and proceed with mutating the other fields.


&#123;
 "data": [
 &#123;
 "id": 1510567479166488,
 "summary": "A required field is missing: price.",
 "description": "Products need to have prices to run in ads. Include a price for each product in your data feed file and upload it again. Prices must include cost and an ISO currency code (for example: 10 USD instead of $10 for American dollars).",
 "severity": "fatal",
 "samples": &#123;
 "data": [
 &#123;
 "row_number": 2,
 "retailer_id": "yj9bpbpub5t8t22kgbq6",
 "id": "1677559492523068"
 &#125;,
 &#123;
 "row_number": 5,
 "retailer_id": "ujn33tvbyv2vmdpo7ecb",
 "id": "1529743440653137"
 &#125;
 ]
 &#125;
 &#125;,
 &#123;
 "id": 275241589314958,
 "summary": "GTIN is incorrectly formatted",
 "description": "Check that the GTIN (Global Trade Identification Number) for each of your products is in the correct format. Accepted types include UPC, EAN, JAN, and ISBN.",
 "severity": "warning",
 "samples": &#123;
 "data": [
 &#123;
 "row_number": 4,
 "retailer_id": "bxwb1pho9o43uxjxikcg",
 "id": "538700559625644"
 &#125;
 ]
 &#125;
 &#125;
 ]
&#125;

## Download a Full Product Feed Errors Report


Getting a sampling of errors and warnings is often sufficient to fix most Product Feed Upload issues. However, you may need the full list of errors to do deeper analysis. To download a full list of errors and warnings, you must first query the most recent upload session (see section above).


You can request the full error report to be generated for a given upload session ID.


### Request


curl -X POST \
 -F &#039;access_token=<ACCESS_TOKEN>&#039; https://graph.facebook.com/v25.0/<UPLOAD_SESSION_ID>/error_report


### Response


&#123;
 "success": true
&#125;In case the report is not ready, repeat the last call after a few seconds. You can then download the report itself.


### Request


curl -X GET -G \
 -d &#039;fields="error_report"&#039; \
 -d &#039;access_token=<ACCESS_TOKEN>&#039; \
https://graph.facebook.com/v25.0/<UPLOAD_SESSION_ID>


### Response


&#123;
 "error_report": &#123;
 "report_status": "WRITE_FINISHED",
 "file_handle": "&#123;link-to-the-file-location&#125;"
 &#125;,
 "id": "493476498092860"
&#125;You should find a URL that you can download (e.g with wget, curl, etc.). The downloaded file will contain the full error report.


If you get the error: "Cannot access an object not managed by the business owning this app", please make sure that the app you&#039;re using belongs to the business (Business Settings > Account > Apps).


 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Asignaciones de GPC a FPC - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/categories/google-product-category-to-facebook-product-category

Asignaciones de GPC a FPC - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
La traducción en español no está disponible todavía. Actualización del documento en inglés: 8 abr. 2024 
 

# Asignaciones de GPC a FPC

Recomendamos elegir la categoría que mejor se refiera a cada artículo. De esta manera, ayudarás a los clientes a comprender qué tipo de artículo vendes. Actualmente, puedes proporcionar la categoría de un artículo a partir de la categoría de producto de Google (GPC), la categoría de producto de Facebook (FPC) o ambas.

Consulta esta tabla para asignar nuestros subsectores del catálogo a las productos de Google. Ten en cuenta que los subsectores son una categoría de producto. Obtén más información sobre las categorías de productos.

 

## Ropa y accesorios

 Identificador de la GPC Categorías de productos de Google Categorías de productos de Facebook 1604

 Indumentaria y accesorios > Ropa

 Ropa y accesorios//Ropa

 1604

 Indumentaria y accesorios > Ropa

 Ropa y accesorios//Ropa//Ropa de hombre

 1604

 Indumentaria y accesorios > Ropa

 Ropa y accesorios//Ropa//Ropa de mujer

 1604

 Indumentaria y accesorios > Ropa

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños

 1604

 Indumentaria y accesorios > Ropa

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas

 5322

 Accesorios e indumentaria > Ropa > Ropa deportiva

 Ropa y accesorios//Ropa//Ropa de hombre//Ropa deportiva

 5322

 Accesorios e indumentaria > Ropa > Ropa deportiva

 Ropa y accesorios//Ropa//Ropa de mujer//Ropa deportiva

 182

 Accesorios e indumentaria > Ropa > Ropa para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños

 182

 Accesorios e indumentaria > Ropa > Ropa para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas

 5408

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Pantalones de bebé para niños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Pantalones

 5408

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Pantalones de bebé para niños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Pantalones

 5424

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Vestidos para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Vestidos

 5425

 Indumentaria y accesorios > Ropa para bebés y niños pequeños > Ropa de abrigo para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Abrigos

 5425

 Indumentaria y accesorios > Ropa para bebés y niños pequeños > Ropa de abrigo para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Abrigos

 5622

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Atuendos para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Atuendos y conjuntos

 5622

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Atuendos para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Atuendos y conjuntos

 5412

 Indumentaria y accesorios > Ropa para bebés y niños pequeños > Pijamas para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Pijamas

 5412

 Indumentaria y accesorios > Ropa para bebés y niños pequeños > Pijamas para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Pijamas

 5423

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Medias y calzas para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Medias

 5423

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Medias y calzas para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Medias

 5409

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Trajes de baño para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Trajes de baño

 5409

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Trajes de baño para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Trajes de baño

 5410

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Prendas superiores para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Prendas superiores

 5410

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Prendas superiores para bebés y niños pequeños

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Prendas superiores

 5411

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Prendas de una pieza para bebés

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Bodis

 5411

 Indumentaria y accesorios > Ropa > Ropa para bebés y niños pequeños > Prendas de una pieza para bebés

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Bodis

 2271

 Indumentaria y accesorios > Ropa > Vestidos

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Vestidos

 2271

 Indumentaria y accesorios > Ropa > Vestidos

 Ropa y accesorios//Ropa//Ropa de mujer//Vestidos

 5182

 Indumentaria y accesorios > Ropa > Prendas de una pieza

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Monos largos y cortos

 5182

 Indumentaria y accesorios > Ropa > Prendas de una pieza

 Ropa y accesorios//Ropa//Ropa de mujer//Monos largos y cortos

 5250

 Indumentaria y accesorios > Ropa > Prendas de una pieza > Monos largos y cortos

 Ropa y accesorios//Ropa//Ropa de mujer//Monos largos y cortos

 7132

 Indumentaria y accesorios > Ropa > Prendas de una pieza > Overoles

 Ropa y accesorios//Ropa//Ropa de mujer//Monos largos y cortos

 203

 Indumentaria y accesorios > Ropa > Ropa de abrigo

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Ropa de abrigo

 203

 Indumentaria y accesorios > Ropa > Ropa de abrigo

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Ropa de abrigo

 203

 Indumentaria y accesorios > Ropa > Ropa de abrigo

 Ropa y accesorios//Ropa//Ropa de hombre//Abrigos y chaquetas

 203

 Indumentaria y accesorios > Ropa > Ropa de abrigo

 Ropa y accesorios//Ropa//Ropa de mujer//Abrigos y chaquetas

 5598

 Indumentaria y accesorios > Ropa > Ropa de abrigo > Abrigos y chaquetas

 Ropa y accesorios//Ropa//Ropa de hombre//Blazers y abrigos deportivos

 5598

 Indumentaria y accesorios > Ropa > Ropa de abrigo > Abrigos y chaquetas

 Ropa y accesorios//Ropa//Ropa de hombre//Abrigos y chaquetas

 5598

 Indumentaria y accesorios > Ropa > Ropa de abrigo > Abrigos y chaquetas

 Ropa y accesorios//Ropa//Ropa de mujer//Abrigos y chaquetas

 5598

 Indumentaria y accesorios > Ropa > Ropa de abrigo > Abrigos y chaquetas

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Ropa de abrigo

 5598

 Indumentaria y accesorios > Ropa > Ropa de abrigo > Abrigos y chaquetas

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Ropa de abrigo

 5514

 Indumentaria y accesorios > Ropa > Ropa de abrigo > Pantalones de lluvia

 Ropa y accesorios//Ropa//Ropa de hombre//Pantalones

 5514

 Indumentaria y accesorios > Ropa > Ropa de abrigo > Pantalones de lluvia

 Ropa y accesorios//Ropa//Ropa de mujer//Pantalones

 7313

 Indumentaria y accesorios > Ropa > Conjuntos

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Atuendos y conjuntos

 7313

 Indumentaria y accesorios > Ropa > Conjuntos

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Atuendos y conjuntos

 204

 Indumentaria y accesorios > Ropa > Pantalones

 Ropa y accesorios//Ropa//Ropa de hombre//Pantalones

 204

 Indumentaria y accesorios > Ropa > Pantalones

 Ropa y accesorios//Ropa//Ropa de hombre//Jeans

 204

 Indumentaria y accesorios > Ropa > Pantalones

 Ropa y accesorios//Ropa//Ropa de mujer//Pantalones

 204

 Indumentaria y accesorios > Ropa > Pantalones

 Ropa y accesorios//Ropa//Ropa de mujer//Jeans

 204

 Indumentaria y accesorios > Ropa > Pantalones

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Pantalones

 204

 Indumentaria y accesorios > Ropa > Pantalones

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Jeans

 204

 Indumentaria y accesorios > Ropa > Pantalones

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Pantalones

 204

 Indumentaria y accesorios > Ropa > Pantalones

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Jeans

 212

 Indumentaria y accesorios > Ropa > Camisas y tops

 Ropa y accesorios//Ropa//Ropa de hombres//Camisas informales

 212

 Indumentaria y accesorios > Ropa > Camisas y tops

 Ropa y accesorios//Ropa//Ropa de hombre//Camisas de vestir

 212

 Indumentaria y accesorios > Ropa > Camisas y tops

 Ropa y accesorios//Ropa//Ropa de hombre//Camisetas

 212

 Indumentaria y accesorios > Ropa > Camisas y tops

 Ropa y accesorios//Ropa//Ropa de mujer//Tops y camisetas

 212

 Indumentaria y accesorios > Ropa > Camisas y tops

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Camisetas y tops

 212

 Indumentaria y accesorios > Ropa > Camisas y tops

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Camisetas y tops

 207

 Indumentaria y accesorios > Ropa > Pantalones cortos

 Ropa y accesorios//Ropa//Ropa de hombre//Pantalones cortos

 207

 Indumentaria y accesorios > Ropa > Pantalones cortos

 Ropa y accesorios//Ropa//Ropa de mujer//Pantalones cortos

 207

 Indumentaria y accesorios > Ropa > Pantalones cortos

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Pantalones cortos

 207

 Indumentaria y accesorios > Ropa > Pantalones cortos

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Pantalones cortos

 1581

 Indumentaria y accesorios > Ropa > Faldas

 Ropa y accesorios//Ropa//Ropa de mujer//Faldas

 1581

 Indumentaria y accesorios > Ropa > Faldas

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Faldas

 5344

 Indumentaria y accesorios > Ropa > Faldas pantalón

 Ropa y accesorios//Ropa//Ropa de mujer//Faldas

 5344

 Indumentaria y accesorios > Ropa > Faldas pantalón

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Faldas

 208

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Pijamas

 208

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Pijamas

 208

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir

 Ropa y accesorios//Ropa//Ropa de hombre//Pijama

 208

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y ropa de dormir

 5713

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir > Ropa de estar

 Ropa y accesorios//Ropa//Ropa de hombre//Pijama

 5713

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir > Ropa de estar

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y pijamas//Pijamas

 5513

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir > Camisones

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y pijamas//Pijamas

 2580

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir > Pijamas

 Ropa y accesorios//Ropa//Ropa de hombre//Pijama

 2580

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir > Pijamas

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y pijamas//Pijamas

 2302

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir > Batas

 Ropa y accesorios//Ropa//Ropa de hombre//Pijama

 2302

 Indumentaria y accesorios > Ropa > Pijamas y ropa de dormir > Batas

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y pijamas//Pijamas

 1594

 Indumentaria y accesorios > Ropa > Trajes

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Trajes

 1594

 Indumentaria y accesorios > Ropa > Trajes

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Trajes

 1594

 Indumentaria y accesorios > Ropa > Trajes

 Ropa y accesorios//Ropa//Ropa de hombre//Trajes

 1594

 Indumentaria y accesorios > Ropa > Trajes

 Ropa y accesorios//Ropa//Ropa de mujer//Trajes y blazers

 5183

 Indumentaria y accesorios > Ropa > Trajes > Trajes sastre

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Trajes

 5183

 Indumentaria y accesorios > Ropa > Trajes > Trajes sastre

 Ropa y accesorios//Ropa//Ropa de hombre//Trajes

 5183

 Indumentaria y accesorios > Ropa > Trajes > Trajes sastre

 Ropa y accesorios//Ropa//Ropa de mujer//Trajes y blazers

 1516

 Indumentaria y accesorios > Ropa > Trajes > Trajes de falda

 Ropa y accesorios//Ropa//Ropa de mujer//Trajes y blazers

 1580

 Indumentaria y accesorios > Ropa > Trajes > Esmoquin

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niños//Trajes

 1580

 Indumentaria y accesorios > Ropa > Trajes > Esmoquin

 Ropa y accesorios//Ropa//Ropa de hombre//Trajes

 1580

 Indumentaria y accesorios > Ropa > Trajes > Esmoquin

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Trajes

 211

 Indumentaria y accesorios > Ropa > Trajes de baño

 Ropa y accesorios//Ropa//Ropa de hombre//Trajes de baño

 211

 Indumentaria y accesorios > Ropa > Trajes de baño

 Ropa y accesorios//Ropa//Ropa de mujer//Trajes de baño

 211

 Indumentaria y accesorios > Ropa > Trajes de baño

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Trajes de baño

 211

 Indumentaria y accesorios > Ropa > Trajes de baño

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para Niños//Trajes de baño

 6031

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Dirndls

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Vestidos

 6031

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Dirndls

 Ropa y accesorios//Ropa//Ropa de mujer//Vestidos

 6031

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Dirndls

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Vestidos

 5674

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Pantalones hakama

 Ropa y accesorios//Ropa//Ropa de hombre//Pantalones

 5674

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Pantalones hakama

 Ropa y accesorios//Ropa//Ropa de mujer//Pantalones

 5673

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Kimonos y kimonos de vestir

 Ropa y accesorios//Ropa//Ropa de mujer//Abrigos y chaquetas

 5343

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Kimonos

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Vestidos

 5343

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Kimonos

 Ropa y accesorios//Ropa//Ropa de mujer//Vestidos

 5343

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Kimonos

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Vestidos

 8149

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Ropa para ceremonias religiosas > Vestidos de bautismo y comunión

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Vestidos

 8149

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Ropa para ceremonias religiosas > Vestidos de bautismo y comunión

 Ropa y accesorios//Ropa//Ropa de mujer//Vestidos

 8149

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Ropa para ceremonias religiosas > Vestidos de bautismo y comunión

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Vestidos

 8248

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Saris y lehengas

 Ropa y accesorios//Ropa//Ropa de mujer//Vestidos

 8248

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Saris y lehengas

 Ropa y accesorios//Ropa//Ropa de mujer//Faldas

 8248

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Saris y lehengas

 Ropa y accesorios//Ropa//Ropa de mujer//Tops y camisetas

 7281

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Pantalones de cuero tradicionales

 Ropa y accesorios//Ropa//Ropa de hombre//Pantalones

 7281

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Pantalones de cuero tradicionales

 Ropa y accesorios//Ropa//Ropa de mujer//Pantalones

 5676

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Pantalones de cuero tradicionales > Yukata

 Ropa y accesorios//Ropa//Ropa de bebé//Ropa de bebé para niñas//Vestidos

 5676

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Pantalones de cuero tradicionales > Yukata

 Ropa y accesorios//Ropa//Ropa de mujer//Vestidos

 5676

 Indumentaria y accesorios > Ropa > Vestimenta tradicional y ceremonial > Pantalones de cuero tradicionales > Yukata

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Vestidos

 213

 Indumentaria y accesorios > Ropa > Ropa interior y medias

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Medias

 213

 Indumentaria y accesorios > Ropa > Ropa interior y medias

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Ropa interior

 213

 Indumentaria y accesorios > Ropa > Ropa interior y medias

 Ropa y accesorios//Ropa//Ropa de niños//Ropa de niñas//Medias y calzas

 213

 Indumentaria y accesorios > Ropa > Ropa interior y medias

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niñas//Ropa interior

 213

 Indumentaria y accesorios > Ropa > Ropa interior y medias

 Ropa y accesorios//Ropa//Ropa de hombre//Medias

 213

 Indumentaria y accesorios > Ropa > Ropa interior y medias

 Ropa y accesorios//Ropa//Ropa de hombres//Ropa interior

 213

 Indumentaria y accesorios > Ropa > Ropa interior y medias

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y ropa de dormir//Ropa interior

 213

 Indumentaria y accesorios > Ropa > Ropa interior y medias

 Ropa y accesorios//Ropa//Ropa de mujer//Mallas, medias y calcetines//Medias

 214

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Sostenes

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y ropa de dormir//Sostenes

 215

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Calcetines

 Ropa y accesorios//Ropa//Ropa de mujer//Mallas, medias y calcetines

 215

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Calcetines

 Ropa y accesorios//Ropa//Ropa de Mujer//Mallas, medias y calcetines//Polainas

 215

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Calcetines

 Ropa y accesorios//Ropa//Ropa de Mujer//Mallas, medias y calcetines//Pantimedias y mallas para mujer

 215

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Calcetines

 Ropa y accesorios//Ropa//Ropa de mujer//Mallas, medias y calcetines//Medias

 215

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Calcetines

 Ropa y accesorios//Ropa//Ropa de mujer//Mallas, medias y calcetines//Calcetines y medias largas

 5327

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Protección deportiva para hombres

 Ropa y accesorios//Ropa//Ropa de hombres//Ropa interior

 1772

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Lencería

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y ropa de dormir

 2563

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Accesorios de lencería

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y ropa de dormir

 1807

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Calzoncillos largos

 Ropa y accesorios//Ropa//Ropa de hombres//Ropa interior

 1807

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Calzoncillos largos

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y ropa de dormir//Ropa interior

 2963

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Enaguas y enaguas pantalón

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y ropa de dormir//Enaguas

 1578

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Ropa modeladora

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y ropa de dormir//Ropa modeladora

 209

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Medias

 Ropa y accesorios//Ropa//Ropa de hombre//Medias

 209

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Medias

 Ropa y accesorios//Ropa//Ropa de mujer//Mallas, medias y calcetines//Medias

 209

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Medias

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Medias

 209

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Medias

 Ropa y accesorios//Ropa//Ropa de niños//Ropa de niñas//Medias y calzas

 2745

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Camisetas

 Ropa y accesorios//Ropa//Ropa de hombre//Camisetas

 2562

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Ropa interior

 Ropa y accesorios//Ropa//Ropa de hombres//Ropa interior

 2562

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Ropa interior

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y ropa de dormir//Ropa interior

 5834

 Indumentaria y accesorios > Ropa > Ropa interior y medias > Calzoncillos slip

 Ropa y accesorios//Ropa//Ropa de mujer//Lencería y ropa de dormir//Enaguas

 5441

 Indumentaria y accesorios > Ropa > Vestidos de boda y damas de honor

 Ropa y accesorios//Ropa//Ropa de mujer//Vestidos

 5330

 Indumentaria y accesorios > Ropa > Vestidos de boda y de damas de honor > Vestidos de damas de honor

 Ropa y accesorios//Ropa//Ropa de mujer//Vestidos

 5329

 Indumentaria y accesorios > Ropa > Vestidos de boda y de damas de honor > Vestidos de boda

 Ropa y accesorios//Ropa//Ropa de mujer//Vestidos

 167

 Indumentaria y accesorios > Accesorios de vestir

 Ropa y accesorios//Accesorios de vestir

 167

 Indumentaria y accesorios > Accesorios de vestir

 Ropa y accesorios//Accesorios de vestir//Accesorios para hombre

 167

 Indumentaria y accesorios > Accesorios de vestir

 Ropa y accesorios//Accesorios de vestir//Accesorios de mujer

 167

 Indumentaria y accesorios > Accesorios de vestir

 Indumentaria y accesorios/Accesorios de vestir/Accesorios para niños

 167

 Indumentaria y accesorios > Accesorios de vestir

 Ropa y accesorios//Accesorios de vestir//Accesorios para niñas

 1786

 Indumentaria y accesorios > Accesorios de vestir > Pasamontañas

 Ropa y accesorios//Accesorios de vestir//Accesorios para niños//Sombreros

 1786

 Indumentaria y accesorios > Accesorios de vestir > Pasamontañas

 Ropa y accesorios//Accesorios de vestir//Accesorios para niñas//Sombreros

 1786

 Indumentaria y accesorios > Accesorios de vestir > Pasamontañas

 Ropa y accesorios//Accesorios de vestir//Accesorios para hombres//Sombreros

 1786

 Indumentaria y accesorios > Accesorios de vestir > Pasamontañas

 Ropa y accesorios//Accesorios de vestir//Accesorios para mujer//Sombreros

 168

 Indumentaria y accesorios > Accesorios de vestir > Bandanas y paños africanos

 Ropa y accesorios//Accesorios de vestir//Accesorios para niños//Sombreros

 168

 Indumentaria y accesorios > Accesorios de vestir > Bandanas y paños africanos

 Ropa y accesorios//Accesorios de vestir//Accesorios para niñas//Sombreros

 168

 Indumentaria y accesorios > Accesorios de vestir > Bandanas y paños africanos

 Ropa y accesorios//Accesorios de vestir//Accesorios para hombres//Sombreros

 168

 Indumentaria y accesorios > Accesorios de vestir > Bandanas y paños africanos

 Ropa y accesorios//Accesorios de vestir//Accesorios para mujer//Sombreros

 169

 Indumentaria y accesorios > Accesorios de vestir > Cinturones

 Ropa y accesorios//Accesorios de vestir//Accesorios para hombre//Cinturones

 169

 Indumentaria y accesorios > Accesorios de vestir > Cinturones

 Indumentaria y accesorios//Accesorios de vestir//Accesorios para mujer//Cinturones

 169

 Indumentaria y accesorios > Accesorios de vestir > Cinturones

 Ropa y accesorios//Accesorios de vestir//Accesorios para niños//Cinturones

 169

 Indumentaria y accesorios > Accesorios de vestir > Cinturones

 Ropa y accesorios//Accesorios de vestir//Accesorios para niñas//Cinturones

 5443

 Indumentaria y accesorios > Accesorios de vestir > Accesorios de novia

 Ropa y accesorios//Accesorios de vestir

 5443

 Indumentaria y accesorios > Accesorios de vestir > Accesorios de novia

 Ropa y accesorios//Accesorios de vestir//Accesorios de mujer

 170

 Indumentaria y accesorios > Accesorios de vestir > Guantes y mitones

 Ropa y accesorios//Accesorios de indumentaria//Accesorios para hombre//Guantes y mitones

 170

 Indumentaria y accesorios > Accesorios de vestir > Guantes y mitones

 Ropa y accesorios//Accesorios de vestir//Accesorios para mujer//Guantes y mitones

 170

 Indumentaria y accesorios > Accesorios de vestir > Guantes y mitones

 Ropa y accesorios//Accesorios de vestir//Accesorios para niños//Guantes y mitones

 170

 Indumentaria y accesorios > Accesorios de vestir > Guantes y mitones

 Ropa y accesorios//Accesorios de vestir//Accesorios para niñas//Guantes y mitones

 171

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello

 8451

 Indumentaria y accesorios > Accesorios de vestir > Accesorios para cabello > Moldeadores de volumen y rodete

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Accesorios de peluquería y coleteros

 2477

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabello > Peines para el cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Cepillos y peines

 1948

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabello > Horquillas y palillos para el cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Accesorios de peluquería y coleteros

 6183

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabello > Redes para el cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Accesorios de peluquería y coleteros

 502988

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabello > Invisibles, broches y hebillas para el cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Accesorios de peluquería y coleteros

 5915

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabello > Corona para el cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Accesorios de peluquería y coleteros

 1662

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabello > Vinchas

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Accesorios de peluquería y coleteros

 1483

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabello > Bandas elásticas para el cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Accesorios de peluquería y coleteros

 7133

 Indumentaria y accesorios > Accesorios para vestir > Manguitos de piel

 Ropa y accesorios//Accesorios de indumentaria//Accesorios para hombre//Guantes y mitones

 7133

 Indumentaria y accesorios > Accesorios para vestir > Manguitos de piel

 Ropa y accesorios//Accesorios de vestir//Accesorios para mujer//Guantes y mitones

 7133

 Indumentaria y accesorios > Accesorios para vestir > Manguitos de piel

 Ropa y accesorios//Accesorios de vestir//Accesorios para niños//Guantes y mitones

 7133

 Indumentaria y accesorios > Accesorios para vestir > Manguitos de piel

 Ropa y accesorios//Accesorios de vestir//Accesorios para niñas//Guantes y mitones

 173

 Indumentaria y accesorios > Accesorios para vestir > Sombreros

 Ropa y accesorios//Accesorios de vestir//Accesorios para hombres//Sombreros

 173

 Indumentaria y accesorios > Accesorios para vestir > Sombreros

 Ropa y accesorios//Accesorios de vestir//Accesorios para mujer//Sombreros

 173

 Indumentaria y accesorios > Accesorios para vestir > Sombreros

 Ropa y accesorios//Accesorios de vestir//Accesorios para niños//Sombreros

 173

 Indumentaria y accesorios > Accesorios para vestir > Sombreros

 Ropa y accesorios//Accesorios de vestir//Accesorios para niñas//Sombreros

 2020

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabeza

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Accesorios de peluquería y coleteros

 7054

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabeza > Tocados

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Accesorios de peluquería y coleteros

 5939

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabeza > Turbantes

 Ropa y accesorios//Accesorios de vestir//Accesorios para hombres//Sombreros

 5939

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabeza > Turbantes

 Ropa y accesorios//Accesorios de vestir//Accesorios para mujer//Sombreros

 5939

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabeza > Turbantes

 Ropa y accesorios//Accesorios de vestir//Accesorios para niños//Sombreros

 5939

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para cabeza > Turbantes

 Ropa y accesorios//Accesorios de vestir//Accesorios para niñas//Sombreros

 5941

 Indumentaria y accesorios > Accesorios para vestir > Polainas

 Ropa y accesorios//Ropa//Ropa de Mujer//Mallas, medias y calcetines//Polainas

 176

 Indumentaria y accesorios > Accesorios para vestir > Corbatas

 Ropa y accesorios//Accesorios para vestir//Accesorios para hombre//Corbatas

 176

 Indumentaria y accesorios > Accesorios para vestir > Corbatas

 Ropa y accesorios//Accesorios para vestir//Accesorios para niños//Corbatas

 178

 Indumentaria y accesorios > Accesorios para vestir > Lentes de sol

 Ropa y accesorios//Accesorios para vestir//Accesorios para hombres//Lentes de sol

 178

 Indumentaria y accesorios > Accesorios para vestir > Lentes de sol

 Ropa y accesorios//Accesorios para vestir//Accesorios para mujer//Lentes de sol

 178

 Indumentaria y accesorios > Accesorios para vestir > Lentes de sol

 Ropa y accesorios//Accesorios para vestir//Accesorios para niñas//Lentes de sol

 178

 Indumentaria y accesorios > Accesorios para vestir > Lentes de sol

 Ropa y accesorios//Accesorios para vestir//Accesorios para niños//Lentes de sol

 179

 Indumentaria y accesorios > Accesorios para vestir > Suspensores

 Ropa y accesorios//Accesorios para vestir//Accesorios para hombres//Suspensores

 179

 Indumentaria y accesorios > Accesorios para vestir > Suspensores

 Ropa y accesorios//Accesorios para vestir//Accesorios para niños//Suspensores

 5687

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para ropa tradicional > Obis

 Ropa y accesorios//Accesorios de vestir//Accesorios para hombre//Cinturones

 5687

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para ropa tradicional > Obis

 Indumentaria y accesorios//Accesorios de vestir//Accesorios para mujer//Cinturones

 5685

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para ropa tradicional > Calcetines tabi

 Ropa y accesorios//Ropa//Ropa de hombre//Medias

 5685

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para ropa tradicional > Calcetines tabi

 Ropa y accesorios//Ropa//Ropa de mujer//Mallas, medias y calcetines//Medias

 5685

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para ropa tradicional > Calcetines tabi

 Ropa y accesorios//Ropa//Ropa de niños//Ropa para niños//Medias

 5685

 Indumentaria y accesorios > Accesorios para vestir > Accesorios para ropa tradicional > Calcetines tabi

 Ropa y accesorios//Ropa//Ropa de niños//Ropa de niñas//Medias y calzas

 5122

 Indumentaria y accesorios > Joyas > Accesorios para relojes

 Joyería y relojes//Relojes//Accesorios para relojes

 7471

 Indumentaria y accesorios > Joyas > Accesorios para relojes > Stickers y calcomanías para relojes

 Joyería y relojes//Relojes//Accesorios para relojes

 201

 Indumentaria y accesorios > Joyas > Relojes

 Joyería y relojes//Relojes

 5567

 Indumentaria y accesorios > Accesorios para el calzado > Forros para botas

 Ropa y accesorios//Zapatos y calzado//Calzado de hombre//Botas

 5567

 Indumentaria y accesorios > Accesorios para el calzado > Forros para botas

 Ropa y accesorios//Zapatos y calzado//Calzado de mujer//Botas

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado

 187

 Indumentaria y accesorios > Zapatos

 Indumentaria y accesorios//Zapatos y calzado//Calzado de hombre

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de hombre//Calzado deportivo

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de hombre//Botas

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de hombre//Calzado informal y de vestir

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de hombre//Calzado deportivo de moda

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de hombre//Sandalias

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de hombre//Pantuflas

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de mujer

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de mujer//Calzado deportivo

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de mujer//Botas

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de mujer//Calzado deportivo de moda

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de mujer//Zapatos bajos

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de mujer//Zapatos altos

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de mujer//Sandalias

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado de mujer//Pantuflas

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado para bebés

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado para bebés//Calzado de bebé para niño

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado para bebés//Calzado de bebé para niña

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado para niños

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado para niños//Calzado de bebé para niño

 187

 Indumentaria y accesorios > Zapatos

 Ropa y accesorios//Zapatos y calzado//Calzado para niñas//Calzado de bebé para niña

 

## Bebé y niño pequeño

 Identificador de las categorías de producto de Google Categorías de productos de Google Categorías de productos de Facebook 2847

 Bebé y niño pequeño > Equipamiento de actividades y juguetes para bebés

 Productos para bebés//Juguetes//Juguetes para bebés

 7198

 Bebé y niño pequeño > Equipamiento de actividades y juguetes para bebés > Juguetes de actividades para bebés

 Productos para bebés//Juguetes//Centros de actividades y entretenimiento

 2764

 Bebé y niño pequeño > Transporte de bebés

 Productos para bebés//Transporte de bebés

 2764

 Bebé y niño pequeño > Transporte de bebés

 Productos para bebés//Transporte de bebés//Portabebés

 2764

 Bebé y niño pequeño > Transporte de bebés

 Productos para bebés//Transporte de bebés//Sillas de auto y accesorios

 2764

 Bebé y niño pequeño > Transporte de bebés

 Productos para bebés//Transporte de bebés//Cochecitos y accesorios

 4916

 Bebé y niño pequeño > Accesorios para transportes de bebés > Accesorios para portabebés

 Productos para bebés//Transporte de bebés

 4916

 Bebé y niño pequeño > Accesorios para transportes de bebés > Accesorios para portabebés

 Productos para bebés//Transporte de bebés//Portabebés

 548

 Bebé y niño pequeño > Cambio de pañales

 Productos para bebés//Artículos para el cambio de pañales y para dejar los pañales

 561

 Bebé y niño pequeño > Lactancia y alimentación

 Productos para bebés//Alimentación del bebé

 

## Cámaras y ópticas

 Identificador de las categorías de producto de Google Categorías de productos de Google Categorías de productos de Facebook 141

 Cámaras y ópticas

 Electrónica//Cámaras

 2096

 Cámaras y ópticas > Accesorios de cámaras y ópticas

 Electrónica//Cámaras//Accesorios de cámaras

 160

 Cámaras y ópticas > Accesorios de cámaras y ópticas > Accesorios de ópticas

 Electrónica//Cámaras//Accesorios de cámaras

 152

 Cámaras y ópticas > Cámaras > Cámaras digitales

 Electrónica//Cámaras//Cámaras digitales

 154

 Cámaras y ópticas > Cámaras > Cámaras analógicas

 Electrónica//Cámaras//Cámaras analógicas

 155

 Cámaras y ópticas > Cámaras > Cámaras de video

 Electrónica//Cámaras//Cámaras de video

 39

 Cámaras y ópticas > Fotografía

 Electrónica//Cámaras

 

## Electrónica

 Identificador de las categorías de producto de Google Categorías de productos de Google Categorías de productos de Facebook 264

 Electrónica > Comunicaciones > Telefonía > Accesorios para teléfonos móviles

 Electrónica//Celulares y relojes inteligentes//Accesorios para relojes inteligentes y celulares

 8111

 Electrónica > Comunicaciones > Telefonía > Accesorios para teléfonos celulares > Accesorios para cámara de teléfono celular

 Electrónica//Celulares y relojes inteligentes//Accesorios para relojes inteligentes y celulares

 5566

 Electrónica > Comunicaciones > Telefonía > Accesorios para teléfonos celulares > Soportes para teléfonos celulares

 Electrónica//Celulares y relojes inteligentes//Accesorios para relojes inteligentes y celulares

 267

 Electrónica > Comunicaciones > Telefonía > Teléfonos móviles

 Electrónica//Celulares y relojes inteligentes//Celulares

 1924

 Electrónica > Comunicaciones > Telefonía > Teléfonos satelitales

 Electrónica//Celulares y relojes inteligentes//Celulares

 1801

 Electrónica > Componentes

 Electrónica//Computadoras y tabletas//Componentes y hardware para computadoras

 278

 Electrónica > Computadoras

 Electrónica//Computadoras y tabletas

 278

 Electrónica > Computadoras

 Electrónica//Computadoras y tabletas//Computadoras de escritorio

 5254

 Electrónica > Computadoras > Computadoras básicas

 Electrónica//Computadoras y tabletas//Computadoras de escritorio

 325

 Electrónica > Computadoras > Computadoras de escritorio

 Electrónica//Computadoras y tabletas//Computadoras de escritorio

 3539

 Electrónica > Computadoras > Dispositivos portátiles > Lectores de libros electrónicos

 Electrónica//Computadoras y tabletas//Tabletas y lectores de libros electrónicos

 328

 Electrónica > Computadoras > Computadora portátil

 Electrónica//Computadoras y Tabletas//Computadora portátil

 4745

 Electrónica > Computadoras > Tabletas

 Electrónica//Computadoras y tabletas//Tabletas y lectores de libros electrónicos

 367

 Electrónica > Accesorios electrónicos > Dispositivos de almacenamiento multimedia vacíos

 Electrónica//Accesorios//Dispositivos de almacenamiento multimedia vacíos

 259

 Electrónica > Accesorios electrónicos > Cables

 Electrónica//Accesorios//Cables, cargadores y adaptadores

 279

 Electrónica > Accesorios electrónicos > Accesorios de computadora

 Electrónica//Accesorios

 279

 Electrónica > Accesorios electrónicos > Accesorios de computadora

 Electrónica//Accesorios//Periféricos de computadora

 285

 Electrónica > Accesorios electrónicos > Componentes informáticos

 Electrónica//Computadoras y tabletas//Componentes y hardware para computadoras

 6475

 Electrónica > Accesorios electrónicos > Componentes informáticos > Accesorios para dispositivos de entrada

 Electrónica//Accesorios

 6475

 Electrónica > Accesorios electrónicos > Componentes informáticos > Accesorios para dispositivos de entrada

 Electrónica//Accesorios//Periféricos de computadora

 1928

 Electrónica > Accesorios electrónicos > Componentes informáticos > Dispositivos de entrada

 Electrónica//Accesorios

 1928

 Electrónica > Accesorios electrónicos > Componentes informáticos > Dispositivos de entrada

 Electrónica//Accesorios//Periféricos de computadora

 302

 Electrónica > Accesorios electrónicos > Componentes informáticos > Dispositivos de entrada > Tabletas gráficas

 Electrónica//Computadoras y tabletas//Tabletas y lectores de libros electrónicos

 276

 Electrónica > Accesorios electrónicos > Energía > Baterías

 Electrónica//Accesorios//Baterías y fuentes de alimentación

 7166

 Electrónica > Accesorios de Electrónica > Energía > Accesorios de Batería

 Electrónica//Accesorios

 7166

 Electrónica > Accesorios de Electrónica > Energía > Accesorios de Batería

 Electrónica//Accesorios//Baterías y fuentes de alimentación

 345

 Electrónica > Impresora, fotocopiadora, escáner y máquina de fax

 Electrónica//Impresoras y escáneres

 305

 Electrónica > Video > Monitores de computadora

 Electrónica//Televisores y monitores

 305

 Electrónica > Video > Monitores de computadora

 Electrónica//Televisores y monitores//Monitores de computadora

 404

 Electrónica > Video > Televisores

 Electrónica//Televisores y monitores

 404

 Electrónica > Video > Televisores

 Electrónica//Televisores y monitores//Televisores

 283

 Electrónica > Video > Accesorios de video > Accesorios para monitor de computadora

 Electrónica//Accesorios

 283

 Electrónica > Video > Accesorios de video > Accesorios para monitor de computadora

 Electrónica//Accesorios//Periféricos de computadora

 1270

 Electrónica > Accesorios de consolas de videojuegos

 Electrónica//Consolas de videojuegos y videojuegos//Accesorios de videojuegos

 1505

 Electrónica > Accesorios de consolas de videojuegos > Accesorios de consolas de videojuegos para el hogar

 Electrónica//Consolas de videojuegos y videojuegos//Accesorios de videojuegos

 2070

 Electrónica > Accesorios de consolas de videojuegos > Accesorios para consolas de videojuegos portátiles

 Electrónica//Consolas de videojuegos y videojuegos//Accesorios de videojuegos

 1294

 Electrónica > Consolas de videojuegos

 Electrónica//Consolas de videojuegos y videojuegos//Consolas de videojuegos

 

## Muebles

 Identificador de las categorías de producto de Google Categorías de productos de Google Categorías de productos de Facebook 436

 Muebles

 Hogar//Muebles

 554

 Muebles > Muebles para bebés y niños pequeños

 Productos para bebés//Cuarto de bebé//Muebles para cuartos de bebé

 7070

 Muebles > Muebles para bebés y niños pequeños > Accesorios para camas de niños pequeños y cunas

 Productos para bebés//Cuarto de bebé//Muebles para cuartos de bebé

 7071

 Muebles > Muebles para bebés y niños > Accesorios para camas de niños pequeños y cunas > Kits de conversión de cunas

 Productos para bebés//Cuarto de bebé//Muebles para cuartos de bebé

 441

 Muebles > Bancos

 Hogar//Muebles

 6356

 Muebles > Armarios y almacenamiento

 Hogar//Muebles

 6345

 Muebles > Conjuntos de muebles

 Hogar//Muebles

 6362

 Muebles > Muebles de oficina

 Hogar//Muebles//Muebles de oficina

 503765

 Muebles > Accesorios para muebles de oficina

 Hogar//Muebles//Muebles de oficina

 6369

 Muebles > Mesas > Mesitas esquineras

 Hogar//Muebles//Muebles para sala de estar

 6351

 Muebles > Mesas > Mesas de actividades

 Hogar//Muebles//Muebles para sala de estar

 4080

 Muebles > Mesas > Mesas plegables

 Hogar//Muebles//Muebles para sala de estar

 

## Salud y belleza

 Identificador de las categorías de producto de Google Categorías de productos de Google Categorías de productos de Facebook 491

 Salud y belleza > Atención médica

 Salud y belleza//Salud

 508

 Salud y belleza > Atención médica > Primeros auxilios

 Salud y belleza//Salud//Primeros auxilios

 2915

 Salud y belleza > Cuidado personal

 Salud y belleza//Salud

 473

 Salud y belleza > Cuidado personal > Cosméticos

 Salud y belleza//Belleza//Maquillaje

 474

 Salud y belleza > Cuidado personal > Cosméticos > Baño y cuerpo

 Salud y belleza//Belleza//Baño y cuerpo

 2503

 Salud y belleza > Cuidado personal > Cosméticos > Baño y cuerpo > Jabón en barra

 Salud y belleza//Belleza//Baño y cuerpo//Jabones y geles para el cuerpo

 2522

 Salud y belleza > Cuidado personal > Cosméticos > Baño y cuerpo > Aditivos para baño

 Salud y belleza//Belleza//Baño y cuerpo

 2522

 Salud y belleza > Cuidado personal > Cosméticos > Baño y cuerpo > Aditivos para baño

 Salud y belleza//Belleza//Baño y cuerpo//Aceites para baño

 2522

 Salud y belleza > Cuidado personal > Cosméticos > Baño y cuerpo > Aditivos para baño

 Salud y belleza//Belleza//Baño y cuerpo//Sales de baño

 2522

 Salud y belleza > Cuidado personal > Cosméticos > Baño y cuerpo > Aditivos para baño

 Salud y belleza//Belleza//Baño y cuerpo//Jabones y geles para el cuerpo

 2522

 Salud y belleza > Cuidado personal > Cosméticos > Baño y cuerpo > Aditivos para baño

 Salud y belleza//Belleza//Baños y Cuerpo//Baños de espuma

 2876

 Salud y belleza > Cuidado personal > Cosméticos > Baño y cuerpo > Cepillos para baño

 Salud y belleza//Belleza//Baño y cuerpo//Esponjas y cepillos

 2875

 Salud y belleza > Cuidado personal > Cosméticos > Baño y cuerpo > Esponjas normales y vegetales para baño

 Salud y belleza//Belleza//Baño y cuerpo//Esponjas y cepillos

 2747

 Salud y belleza > Cuidado personal > Cosméticos > Baño y cuerpo > Gel de baño

 Salud y belleza//Belleza//Baño y cuerpo//Jabones y geles para el cuerpo

 6069

 Salud y belleza > Cuidado personal > Cosméticos > Sets de cosméticos

 Salud y belleza//Belleza//Maquillaje//Estuches y kits de maquillaje

 2619

 Salud y belleza > Cuidado personal > Cosméticos > Herramientas cosméticas

 Salud y belleza//Belleza//Maquillaje//Herramientas y accesorios de maquillaje

 2548

 Salud y belleza > Cuidado personal > Cosméticos > Herramientas de maquillaje

 Salud y belleza//Belleza//Maquillaje//Herramientas y accesorios de maquillaje

 7356

 Salud y belleza > Cuidado personal > Cosméticos > Herramientas de maquillaje > Pegamento y cinta para párpado doble

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Pestañas postizas y adhesivos

 6555

 Salud y belleza > Cuidado personal > Cosméticos > Herramientas de maquillaje > Plantillas para cejas

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Productos para cejas

 502996

 Salud y belleza > Cuidado personal > Cosméticos > Herramientas de maquillaje > Accesorios de pestañas postizas

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Pestañas postizas y adhesivos

 7256

 Salud y belleza > Cuidado personal > Cosméticos > Herramientas de maquillaje > Accesorios de pestañas postizas > Adhesivo para pestañas postizas

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Pestañas postizas y adhesivos

 7493

 Salud y belleza > Cuidado personal > Cosméticos > Herramientas cosméticas > Herramientas de maquillaje > Accesorios de pestañas postizas > Aplicador de pestañas postizas

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Pestañas postizas y adhesivos

 502997

 Salud y belleza > Cuidado personal > Cosméticos > Herramientas de maquillaje > Accesorios de pestañas postizas > Removedor de pestañas postizas

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Pestañas postizas y adhesivos

 2975

 Salud y belleza > Cuidado personal > Cosméticos > Herramientas cosméticas > Instrumentos para manicura

 Salud y belleza//Belleza//Belleza de manos

 2958

 Salud y belleza > Cuidado personal > Cosméticos > Herramientas cosméticas > Instrumentos para el cuidado de la piel

 Salud y belleza//Belleza//Cuidado de la piel

 2511

 Salud y belleza > Cuidado personal > Cosméticos > Instrumentos para el cuidado de la piel > Piedras pómez

 Salud y belleza//Belleza//Belleza de manos//Piedras pómez

 6261

 Salud y belleza > Cuidado personal > Cosméticos > Instrumentos para el cuidado de la piel > Extractores para el cuidado de la piel

 Salud y belleza//Belleza//Cuidado de la piel//Tratamientos para el acné y las imperfecciones de la piel

 6260

 Cuidado de la piel y belleza > Cuidado personal > Cosméticos > Instrumentos para el cuidado de la piel > Sistemas y cepillos para la limpieza de la piel

 Salud y belleza//Belleza//Cuidado de la piel//Sistemas y cepillos para la limpieza de la piel

 477

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje

 Salud y belleza//Belleza//Maquillaje

 2779

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de ojos

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos

 8220

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Base para ojos

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Base para ojos

 2904

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de ojos > Sombras de ojos

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Sombras de ojos

 2686

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de ojos > Pomadas para cejas

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Productos para cejas

 2807

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de ojos > Delineador de ojos

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Delineador de ojos

 2761

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de ojos > Pestañas postizas

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Pestañas postizas y adhesivos

 2834

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de ojos > Rímel

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Rímel

 8219

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de ojos > Rímel

 Salud y belleza//Belleza//Maquillaje//Maquillaje de ojos//Rímel

 2571

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de rostro

 Salud y belleza//Belleza//Maquillaje//Maquillaje de rostro

 6305

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de rostro > Rubor y bronceador

 Salud y belleza//Belleza//Maquillaje//Maquillaje de rostro//Rubores

 6305

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de rostro > Rubor y bronceador

 Salud y belleza//Belleza//Maquillaje//Maquillaje de rostro//Rubor y bronceador

 2980

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de rostro > Polvo facial

 Salud y belleza//Belleza//Maquillaje//Maquillaje de rostro//Polvo facial

 8218

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de rostro > Base para rostro

 Salud y belleza//Belleza//Maquillaje//Maquillaje de rostro//Base para rostro

 2765

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de rostro > Bases y correctores

 Salud y belleza//Belleza//Maquillaje//Maquillaje de rostro//Correctores

 2765

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de rostro > Bases y correctores

 Salud y belleza//Belleza//Maquillaje//Maquillaje de rostro//Bases

 6304

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de rostro > Iluminadores y resaltadores

 Salud y belleza//Belleza//Maquillaje//Maquillaje de rostro//Rubor y bronceador

 2645

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de labios

 Salud y belleza//Belleza//Maquillaje//Maquillaje de labios

 6306

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de labios > Rubor y labial

 Salud y belleza//Belleza//Maquillaje//Maquillaje de labios//Labial en barra

 2858

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de labios > Brillo labial

 Salud y belleza//Belleza//Maquillaje//Maquillaje de labios//Brillo labial

 2589

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de labios > Delineador de labios

 Salud y belleza//Belleza//Maquillaje//Maquillaje de labios//Delineadores de labios

 3021

 Salud y belleza > Cuidado personal > Cosméticos > Maquillaje > Maquillaje de labios > Lápiz de labios

 Salud y belleza//Belleza//Maquillaje//Maquillaje de labios//Lápiz de labios

 478

 Salud y belleza > Cuidado personal > Cosméticos > Belleza de manos

 Salud y belleza//Belleza//Belleza de manos

 3009

 Salud y belleza > Cuidado personal > Cosméticos > Belleza de manos > Crema y aceite para cutículas

 Salud y belleza//Belleza//Belleza de manos

 4218

 Salud y belleza > Cuidado personal > Cosméticos > Belleza de manos > Uñas postizas

 Salud y belleza//Belleza//Belleza de manos//Uñas postizas y accesorios

 6893

 Salud y belleza > Cuidado personal > Cosméticos > Belleza de manos > Pegamento para manicura

 Salud y belleza//Belleza//Belleza de manos//Nail art y esmaltes

 5975

 Salud y belleza > Cuidado personal > Cosméticos > Belleza de manos > Kits y accesorios de nail art

 Salud y belleza//Belleza//Belleza de manos//Nail art y esmaltes

 233419

 Salud y belleza > Cuidado personal > Cosméticos > Belleza de manos > Gotas y aerosoles para secado de esmalte de uñas

 Salud y belleza//Belleza//Belleza de manos//Nail art y esmaltes

 2946

 Salud y belleza > Cuidado personal > Cosméticos > Belleza de manos > Quitaesmalte

 Salud y belleza//Belleza//Belleza de manos//Nail art y esmaltes

 7445

 Salud y belleza > Cuidado personal > Cosméticos > Belleza de manos > Diluyente de esmalte

 Salud y belleza//Belleza//Belleza de manos//Nail art y esmaltes

 2683

 Salud y belleza > Cuidado personal > Cosméticos > Belleza de manos > Esmalte para uñas

 Salud y belleza//Belleza//Belleza de manos//Nail art y esmaltes

 479

 Salud y belleza > Cuidado personal > Cosméticos > Perfumes y colonias

 Salud y belleza//Belleza//Fragancias

 479

 Salud y belleza > Cuidado personal > Cosméticos > Perfumes y colonias

 Salud y belleza//Belleza//Fragancias//Fragancias para niños

 479

 Salud y belleza > Cuidado personal > Cosméticos > Perfumes y colonias

 Salud y belleza//Belleza//Fragancias//Fragancias para hombre

 479

 Salud y belleza > Cuidado personal > Cosméticos > Perfumes y colonias

 Salud y belleza//Belleza//Fragancias//Fragancias para mujer

 567

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel

 Salud y belleza//Belleza//Cuidado de la piel

 481

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Kits y tratamientos para el acné

 Salud y belleza//Belleza//Cuidado de la piel//Tratamientos para el acné y las imperfecciones de la piel

 6104

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Aceite corporal

 Salud y belleza//Belleza//Cuidado de la piel//Loción y crema hidratante para el rostro

 8029

 Cuidado de la salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Mascarillas faciales de papel comprimidas para el cuidado de la piel

 Salud y belleza//Belleza//Cuidado de la piel//Máscaras y exfoliantes

 2526

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Limpiadores faciales

 Salud y belleza//Belleza//Cuidado de la piel//Limpiadores y tónicos

 7467

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Kits de limpieza facial

 Salud y belleza//Belleza//Cuidado de la piel//Limpiadores y tónicos

 6791

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Tiras limpiadoras de poros para rostro

 Salud y belleza//Belleza//Cuidado de la piel//Tiras de limpieza de poros

 482

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Tratamientos y bálsamos para labios

 Salud y belleza//Belleza//Cuidado de la piel//Tratamientos y bálsamos para labios

 2592

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Loción y crema hidratante para el rostro

 Salud & Belleza//Belleza//Baño y cuerpo//Cuerpo//Lociones y cremas hidratantes para el cuerpo

 2592

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Loción y crema hidratante para el rostro

 Salud y belleza//Belleza//Cuidado de la piel//Loción y crema hidratante para el rostro

 6753

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Vaselina

 Salud y belleza//Belleza//Cuidado de la piel

 6262

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Máscaras y exfoliantes para el cuidado de la piel

 Salud y belleza//Belleza//Cuidado de la piel//Máscaras y exfoliantes

 2844

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Protectores solares

 Salud y belleza//Belleza//Cuidado de la piel//Protectores solares

 2740

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Productos de bronceado

 Salud y belleza//Belleza//Cuidado de la piel//Loción y aceite bronceador

 5338

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Productos de bronceado > Autobronceadores

 Salud y belleza//Belleza//Cuidado de la piel//Loción y aceite bronceador

 5339

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Productos de bronceado > Loción y aceite bronceador

 Salud y belleza//Belleza//Cuidado de la piel//Loción y aceite bronceador

 5976

 Salud y belleza > Cuidado personal > Cosméticos > Cuidado de la piel > Tonificadores y astringentes

 Salud y belleza//Belleza//Cuidado de la piel//Limpiadores y tónicos

 485

 Salud y belleza > Cuidado personal > Productos de higiene femenina

 Salud y belleza//Salud//Cuidados femeninos

 486

 Salud y belleza > Cuidado personal > Cuidado del cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello

 8452

 Salud y belleza > Cuidado personal > Cuidado del cabello > Kits para el cuidado del cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Productos de peluquería

 2814

 Salud y belleza > Cuidado personal > Cuidado del cabello > Color de cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Tinturas y coloración para el cabello

 6053

 Cuidado personal > Cuidado del cabello > Decolorantes para el cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Tinturas y coloración para el cabello

 5977

 Salud y belleza > Cuidado personal > Cuidado del cabello > Accesorios para el teñido de cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Tinturas y coloración para el cabello

 3013

 Salud y belleza > Cuidado personal > Cuidado del cabello > Tijeras para el cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Tijeras de peluquería

 6429

 Salud y belleza > Cuidado personal > Cuidado del cabello > Vaporizadores para cabello y gorros térmicos

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Planchas y rizadores de pelo

 1901

 Salud y belleza > Cuidado personal > Cuidado del cabello > Productos de peluquería

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Productos de peluquería

 6018

 Salud y belleza > Cuidado personal > Cuidado del cabello > Accesorios de instrumentos de peluquería

 Salud y belleza//Belleza//Cuidado y peinado del cabello

 5317

 Salud y belleza > Cuidado personal > Cuidado de cabello > Accesorios de instrumentos de peluquería > Broches y pinzas para rodillos rizadores

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Ruleros y rizadores

 4475

 Salud y belleza > Cuidado personal > Cuidado del cabello > Accesorios de instrumentos de peluquería > Accesorios para secadores de cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Secadores de cabello

 4569

 Salud y belleza > Cuidado personal > Cuidado del cabello > Accesorios de instrumentos de peluquería > Accesorios de planchas para el cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Planchas y rizadores de pelo

 6019

 Salud y belleza > Cuidado personal > Cuidado del cabello > Instrumentos de peluquería

 Salud y belleza//Belleza//Cuidado y peinado del cabello

 487

 Salud y belleza > Cuidado personal > Cuidado del cabello > Instrumentos de peluquería > Peines y cepillos

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Cepillos y peines

 489

 Salud y belleza > Cuidado personal > Cuidado del cabello > Instrumentos de peluquería > Rizadores

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Planchas y rizadores de pelo

 488

 Salud y belleza > Cuidado personal > Cuidado del cabello > Instrumentos de peluquería > Rodillos rizadores

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Ruleros y rizadores

 490

 Salud y belleza > Cuidado personal > Cuidado del cabello > Instrumentos de peluquería > Secadoras de cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Secadores de cabello

 3407

 Salud y belleza > Cuidado personal > Cuidado del cabello > Instrumentos de peluquería > Planchas para cabello

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Planchas y rizadores de pelo

 499992

 Salud y belleza > Cuidado personal > Cuidado del cabello > Instrumentos de peluquería > Conjuntos de instrumentos de peluquería

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Productos de peluquería

 2441

 Salud y belleza > Cuidado personal > Cuidado del cabello > Champú y acondicionador

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Champú y acondicionador

 5663

 Salud y belleza > Cuidado personal > Masaje y relajación

 Salud y belleza//Salud//Masaje

 500060

 Salud y belleza > Cuidado personal > Masaje y relajación > Raspadores de espalda

 Salud y belleza//Salud//Masaje

 526

 Salud y belleza > Cuidado personal > Cuidado bucal

 Salud y belleza//Salud//Cuidado bucal

 528

 Salud y belleza > Cuidado personal > Afeitado y aseo

 Salud y belleza//Salud//Afeitado y depilación

 8214

 Salud y belleza > Cuidado personal > Afeitado y aseo > Decolorante de vello facial y corporal

 Salud y belleza//Belleza//Cuidado y peinado del cabello//Tinturas y coloración para el cabello

 4507

 Salud y belleza > Cuidado personal > Afeitado y aseo > Depilación

 Salud y belleza//Salud//Afeitado y depilación

 1380

 Salud y belleza > Cuidado personal > Cuidado de la vista

 Salud y belleza//Salud//Cuidado de la vista

 2521

 Salud y belleza > Cuidado personal > Cuidado de la vista > Accesorios para gafas

 Salud y belleza//Salud//Cuidado de la vista

 

## Hogar y jardinería

 Identificador de las categorías de producto de Google Categorías de productos de Google Categorías de productos de Facebook 536

 Hogar y jardinería

 Hogar//Artículos para el hogar

 574

 Hogar y jardinería > Accesorios para baños

 Hogar//Artículos para el hogar//Baño//Accesorios para baño

 696

 Hogar y jardinería > Decoración

 Hogar//Artículos para el hogar//Decoración para el hogar

 4456

 Hogar y jardinería > Decoración > Almohadas respaldo

 Hogar//Ropa de cama//Almohadas y posicionadores de cama

 3890

 Hogar y jardinería > Decoración > Relojes

 Hogar//Artículos para el hogar//Decoración para el hogar//Relojes

 500121

 Hogar y jardinería > Decoración > Accesorios aromatizantes para el hogar

 Hogar//Artículos para el hogar//Decoración para el hogar//Fragancias para el hogar

 592

 Hogar y jardinería > Decoración > Fragancias para el hogar

 Hogar//Artículos para el hogar//Decoración para el hogar//Fragancias para el hogar

 596

 Hogar y jardinería > Decoración > Decoraciones navideñas y de temporada

 Hogar//Artículos para el hogar//Decoración para el hogar//Decoraciones navideñas y de temporada

 6254

 Hogar y jardinería > Decoración > Accesorios para el tratamiento de ventanas

 Hogar//Artículos para el hogar//Decoración para el hogar//Tratamientos y herrajes para ventanas

 603

 Hogar y jardinería > Decoración > Tratamientos para ventanas

 Hogar//Artículos para el hogar//Decoración para el hogar//Tratamientos y herrajes para ventanas

 4548

 Hogar y jardinería > Accesorios para electrodomésticos > Accesorios para limpiadores de vapor y de suelo

 Hogar//Productos de limpieza//Aspiradoras y limpiadores de piso

 3456

 Hogar y jardinería > Aspiradoras y limpiadores de piso > Accesorios para aparatos de lavandería

 Hogar//Productos de limpieza//Productos de lavandería

 604

 Hogar y jardinería > Electrodomésticos

 Hogar//Artículos para el hogar//Cocina y comedor//Electrodomésticos de cocina pequeños

 604

 Hogar y jardinería > Electrodomésticos

 Hogar//Electrodomésticos grandes

 616

 Hogar y jardinería > Electrodomésticos > Limpiadores de vapor y de suelo para el hogar

 Hogar//Productos de limpieza//Aspiradoras y limpiadores de piso

 2706

 Hogar y jardinería > Electrodomésticos > Aparatos de lavandería

 Hogar//Electrodomésticos grandes//Lavadoras y secadoras

 630

 Hogar y jardinería > Artículos para el hogar

 Hogar//Productos de limpieza

 623

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar

 Hogar//Productos de limpieza

 4973

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 7330

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores de uso general

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 4974

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores de alfombras

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 500065

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores y descalcificadores

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 4975

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Jabón y detergente para vajilla

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 7510

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores de lavavajillas

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 8043

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores de tela y tapicería

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 4977

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores de piso

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 5825

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Productos para limpiar y pulir muebles

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 4976

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores de vidrio y superficies

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 6474

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Desinfectantes domésticos

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 4978

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores de horno y parrilla

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 4979

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Productos para quitar manchas y olores de mascotas

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 7552

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Abrillantadores

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 7426

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Pulidores y limpiadores de acero inoxidable

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 4980

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores de taza del inodoro

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 4981

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores de bañeras y azulejos

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 7462

 Hogar y jardinería > Artículos para el hogar > Artículos de limpieza para el hogar > Productos de limpieza para el hogar > Limpiadores de lavadoras

 Hogar//Productos de limpieza//Productos y químicos de limpieza

 627

 Hogar y jardinería > Artículos para el hogar > Productos de lavandería

 Hogar//Productos de limpieza//Productos de lavandería

 636

 Hogar y jardinería > Artículos para el hogar > Organización y almacenamiento

 Hogar//Artículos para el hogar//Organización y almacenamiento

 638

 Hogar y jardinería > Cocina y comedor

 Hogar//Artículos para el hogar//Cocina y comedor

 649

 Hogar y jardinería > Cocina y comedor > Artículos de coctelería

 Hogar//Artículos para el hogar//Cocina y comedor//Artículos de coctelería

 6070

 Hogar y jardinería > Cocina y comedor > Batería de cocina y horno

 Hogar//Artículos para el hogar//Cocina y comedor

 640

 Hogar y jardinería > Cocina y comedor > Batería de cocina y horno > Utensilios para hornear

 Hogar//Artículos para el hogar//Cocina y comedor//Utensilios para hornear

 654

 Hogar y jardinería > Cocina y comedor > Batería de cocina y horno > Batería de cocina

 Hogar//Artículos para el hogar//Cocina y comedor//Batería de cocina

 680

 Hogar y jardinería > Cocina y comedor > Electrodomésticos de cocina > Lavavajillas

 Hogar//Grandes electrodomésticos//Lavavajillas

 681

 Hogar y jardinería > Cocina y comedor > Electrodomésticos de cocina > Congeladores

 Hogar//Grandes electrodomésticos//Refrigeradores y freezers

 753

 Hogar y jardinería > Cocina y comedor > Electrodomésticos de cocina > Horno microondas

 Hogar//Grandes electrodomésticos//Horno microondas

 683

 Hogar y jardinería > Cocina y comedor > Electrodomésticos de cocina > Hornos

 Hogar//Grandes electrodomésticos//Cocinas y hornos

 685

 Hogar y jardinería > Cocina y comedor > Electrodomésticos de cocina > Estufas/cocinas

 Hogar//Grandes electrodomésticos//Cocinas y hornos

 686

 Hogar y jardinería > Cocina y comedor > Electrodomésticos de cocina > Refrigeradores

 Hogar//Grandes electrodomésticos//Refrigeradores y freezers

 668

 Hogar y jardinería > Cocina y comedor > Utensilios y herramientas de cocina

 Hogar//Artículos para el hogar//Cocina y comedor//Utensilios y herramientas de cocina

 673

 Hogar y jardinería > Cocina y comedor > Vajilla > Juegos de platos

 Hogar//Artículos para el hogar//Cocina y comedor//Juegos de platos

 674

 Hogar y jardinería > Cocina y comedor > Vajilla > Vasos y copas

 Hogar//Artículos para el hogar//Cocina y comedor///Vasos y copas

 675

 Hogar y jardinería > Cocina y comedor > Vajilla > Cubiertos

 Hogar//Artículos para el hogar//Cocina y comedor//Cubiertos

 4026

 Hogar y jardinería > Cocina y comedor > Vajilla > Vajilla de servicio

 Hogar//Artículos para el hogar//Cocina y comedor//Juegos de platos

 6425

 Hogar y jardinería > Cocina y comedor > Vajilla > Accesorios para vajilla de servicio

 Hogar//Artículos para el hogar//Cocina y comedor//Juegos de platos

 594

 Hogar y jardinería > Iluminación

 Hogar//Artículos para el hogar//Lámparas e iluminación

 500003

 Hogar y jardinería > Iluminación > Luces flotantes y sumergibles

 Hogar//Artículos para el hogar//Lámparas e iluminación

 3006

 Hogar y jardinería > Iluminación > Equipos de iluminación

 Hogar//Artículos para el hogar//Lámparas e iluminación

 2809

 Hogar y jardinería > Iluminación > Equipos de iluminación > Fijaciones para gabinetes de lámparas

 Hogar//Artículos para el hogar//Lámparas e iluminación

 2524

 Hogar y jardinería > Iluminación > Equipos de iluminación > Fijaciones para gabinetes de lámparas

 Hogar//Artículos para el hogar//Lámparas e iluminación

 4171

 Hogar y jardinería > Ropa blanca y ropa de cama

 Hogar//Ropa de cama

 569

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama

 Hogar//Ropa de cama

 2314

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Sábanas

 Hogar//Ropa de cama//Sábanas y almohadas

 2974

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Faldón

 Hogar//Ropa de cama//Faldón

 1985

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Mantas

 Hogar//Ropa de cama//Cobijas y mantas

 2541

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Fundas de edredón

 Hogar//Ropa de cama//Fundas de edredón

 4452

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Protectores de colchón

 Hogar//Ropa de cama//Fundas y protectores de colchón

 4420

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Protectores de colchón > Fundas para colchón

 Hogar//Ropa de cama//Fundas y protectores de colchón

 2991

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Protectores de colchón > Fundas de colchones

 Hogar//Ropa de cama//Fundas y protectores de colchón

 2927

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Fundas de almohada

 Hogar//Ropa de cama//Sábanas y almohadas

 2700

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Almohadas

 Hogar//Ropa de cama//Almohadas y posicionadores de cama

 505287

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Colchas y edredones

 Hogar//Ropa blanca//
Mantas, colchas y cubrecamas

 505287

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama > Colchas y edredones

 Hogar//Ropa de cama//Edredones

 

## Software

 Identificador de las categorías de producto de Google Categorías de productos de Google Categorías de productos de Facebook 2092

 Software

 Electrónica//Software

 313

 Software > Software de computadora

 Electrónica//Software

 5299

 Software > Programas informáticos > Antivirus y software de seguridad

 Electrónica//Software

 5300

 Software > Programas informáticos > Software y apps de negocios y productividad

 Electrónica//Software

 315

 Software > Programas informáticos > Herramientas de programación y compilación

 Electrónica//Software

 5301

 Software > Programas informáticos > Software informático de utilidades y mantenimiento

 Electrónica//Software

 5127

 Software > Programas informáticos > Software de diccionarios y traducción

 Electrónica//Software

 317

 Software > Programas informáticos > Software educativo

 Electrónica//Software

 5304

 Software > Programas informáticos > Software financiero, tributario y de contabilidad

 Electrónica//Software

 3283

 Software > Programas informáticos > Datos y software de mapas de GPS

 Electrónica//Software

 318

 Software > Programas informáticos > Software para dispositivos portátiles y agendas electrónicas

 Electrónica//Software

 319

 Software > Programas informáticos > Software de diseño y multimedia

 Electrónica//Software

 6027

 Software > Programas informáticos > Software de diseño y multimedia > Software de modelado 3D

 Electrónica//Software

 4950

 Software > Programas informáticos > Software de diseño y multimedia > Software de edición de animación

 Electrónica//Software

 4951

 Software > Programas informáticos > Software de diseño y multimedia > Software de ilustración y diseño gráfico

 Electrónica//Software

 6029

 Software > Programas informáticos > Software de diseño y multimedia > Software de diseño de interiores y del hogar

 Electrónica//Software

 4949

 Software > Programas informáticos > Software de diseño y multimedia > Software de edición en casa

 Electrónica//Software

 6028

 Software > Programas informáticos > Software de diseño y multimedia > Software de visualización de contenido multimedia

 Electrónica//Software

 5096

 Software > Programas informáticos > Software de diseño y multimedia > Software de composición musical

 Electrónica//Software

 4952

 Software > Programas informáticos > Software de diseño y multimedia > Software de edición de sonido

 Electrónica//Software

 4953

 Software > Programas informáticos > Software de diseño y multimedia > Software de edición de videos

 Electrónica//Software

 4954

 Software > Programas informáticos > Software de diseño y multimedia > Software de diseño web

 Electrónica//Software

 5302

 Software > Software de computadora > Software de red

 Electrónica//Software

 5303

 Software > Programas informáticos > Software de aplicaciones para oficina

 Electrónica//Software

 321

 Software > Programas informáticos > Sistemas operativos

 Electrónica//Software

 7225

 Software > Programas informáticos > Restauración de discos

 Electrónica//Software

 1279

 Software > Software de videojuegos

 Electrónica//Consolas de videojuegos y videojuegos//Videojuegos

 

## Subsector del catálogo a categoría de producto de Google

Ten en cuenta que los subsectores son una categoría de producto. Obtén más información sobre las categorías de productos.

 Subsector Categorías de productos de Google clothing

 Indumentaria y accesorios > Ropa

Indumentaria y accesorios > Accesorios y disfraces > Disfraces

 clothing_accessories

 Indumentaria y accesorios > Accesorios de vestir

Indumentaria y accesorios de bolsa > Accesorios para carteras y billeteras

Indumentaria y accesorios de bolsa > Accesorios para carteras, billeteras y estuches

Indumentaria y accesorios > Accesorios para el calzado

 shoes_and_footwear

 Indumentaria y accesorios > Zapatos

Indumentaria y accesorios > Accesorios y disfraces > Zapatos de disfraces

 jewelry

 Indumentaria y accesorios > Joyas

 watches

 Indumentaria y accesorios > Joyas > Relojes

 toys

 Juguetes y juegos

Bebé y niño pequeño > Equipamiento de actividades y juguetes para bebés

 baby_transport

 Bebé y niño pequeño > Transporte de bebés

Bebé y niño pequeño > Accesorios para transportes de bebés

 diapering_and_potty_training

 Bebé y niño pequeño > Cambio de pañales

Bebé y Niño > Control de esfínteres

 baby_feeding

 Bebé y niño pequeño > Lactancia y alimentación > Comida para bebés y niños pequeños

 cameras

 Cámaras y ópticas > Cámaras

Cámaras y ópticas > Ópticas

Cámaras y ópticas > Accesorios de cámaras y ópticas

 computers_and_tablets

 Electrónica > Computadoras

Electrónica > Componentes y tableros de circuitos > Tableros de circuitos impresos > Tableros de circuitos de computadora

Electrónica > Componentes y tableros de circuitos > Semiconductores

Electrónica > Accesorios electrónicos > Componentes informáticos

Electrónica > Redes

 cell_phones_and_smart_watches

 Electrónica > Comunicaciones > Telefonía > Teléfonos móviles

Electrónica > Comunicaciones > Telefonía > Accesorios para teléfonos móviles

 electronics_accessories

 Electrónica > Accesorios electrónicos

Electrónica > Video > Accesorios de video

 printers_and_scanners

 Electrónica > Impresora, fotocopiadora, escáner y máquina de fax

 tvs_and_monitors

 Electrónica > Video > Televisores

Electrónica > Video > Monitores de computadora

 projectors

 Electrónica > Video > Proyectores

 video_game_consoles_and_video_games

 Electrónica > Consolas de videojuegos

Electrónica > Accesorios de consolas de videojuegos

Software > Software de videojuegos

 nursery

 Muebles > Muebles para bebés y niños pequeños

 furniture

 Muebles

 health

 Salud y belleza > Atención médica

Salud y belleza > Cuidado personal > Cuidado de la espalda

Salud y belleza > Cuidado personal > Cuidado de oídos

Salud y belleza > Cuidado personal > Productos de higiene femenina

Salud y belleza > Cuidado personal > Cuidado de pies

Salud y belleza > Cuidado personal > Masaje y relajación

Salud y belleza > Cuidado personal > Cuidado bucal

Salud y belleza > Cuidado personal > Afeitado y aseo

Salud y belleza > Cuidado personal > Artículos para dormir

Salud y belleza > Cuidado personal > Cuidado de la vista

 beauty

 Salud y belleza > Cuidado personal > Cosméticos

Salud y belleza > Cuidado personal > Desodorantes y antitranspirantes

Salud y belleza > Cuidado personal > Cuidado del cabello

 home_goods

 Hogar y jardinería > Accesorios para baños

Hogar y jardinería > Decoración

Hogar y jardinería > Artículos para el hogar > Organización y almacenamiento

Hogar y jardinería > Cocina y comedor

Hogar y jardinería > Iluminación

Hogar y jardinería > Ropa blanca y ropa de cama

 appliances

 Hogar y jardinería > Electrodomésticos

Hogar y jardinería > Accesorios para electrodomésticos

 cleaning_supplies

 Hogar y jardinería > Artículos para el hogar

Hogar y jardinería > Accesorios para electrodomésticos > Accesorios para aspiradoras

Hogar y jardinería > Electrodomésticos > Limpiadores de vapor y de suelo para el hogar

Hogar y jardinería > Electrodomésticos > Limpiadores ultrasónicos

Hogar y jardinería > Electrodomésticos > Aspiradoras

 bedding

 Hogar y jardinería > Ropa blanca y ropa de cama > Ropa de cama

 software

 Software > Software de computadora

 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->

---
# Supplementary Feeds - Commerce Platform - Documentación - Meta for Developers
> https://developers.facebook.com/docs/commerce-platform/catalog/supplementary-feeds

Supplementary Feeds - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Supplementary Feeds


Supplementary Feeds are used to modify existing data sources by providing either new or updated product field values. They can only be used to update existing products, but cannot add or remove products.


This document outlines the steps required to build an API integration to enable Supplementary Feeds support in your applications.


For more high-level information about Supplementary Feeds and use cases, please see these Help Center articles:


 
- Create a Supplementary Feed for Your Facebook Catalog

- Add a Supplementary Feed to Your Facebook Catalog

 
 

## Requirements


Your application must have the catalog_management permission to create and read Supplementary Feeds.


 

## Set Up Your Integration


Supplementary Feeds are files that represent a list of products. Under the hood, they map to existing products by attaching the Supplementary Feed to the primary data source that originally added the product.


A typical flow when doing an integration might look like this:


Step 1: Authenticate by using Facebook Login with the catalog_management permission


Step 2: Create a catalog selection page for the user to choose which catalog to supplement. List catalogs functionality can be found here:


 
- For Commerce

- For Marketing

 

Step 3: Find the available primary data sources which populate the catalog:


GET https://graph.facebook.com/<API_VERSION>/<CATALOG_ID>/data_sources?ingestion_source_type=PRIMARYStep 4: Create a Supplementary Feed using the Feed API


 
- Supplementary Feeds require the fields ingestion_source_type and primary_feed_ids to be populated.

- The Supplementary Feed file requires all items to have the id attribute populated. Each id must match an existing product from the attached primary data source(s). Read more about Universal Basic Attributes and Category Specific Fields.

- The relationship between Supplementary feeds and Primary data sources is 1-to-many. In other words, a Supplementary Feed can be attached to multiple Primary data sources, but primary data source may only have up to 1 Supplementary Feed attached.

 

Step 5: Handle Feed Upload Errors


See the following docs to learn about handling upload errors:


 
- Handling Product Feed Upload Errors

- Download a Full Product Feed Errors Report

 
 

## Learn More


 
- Feed API Reference

- Create a Supplementary Feed for Your Facebook Catalog (Business Help Center)

- Add a Supplementary Feed to Your Facebook Catalog (Business Help Center)

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->