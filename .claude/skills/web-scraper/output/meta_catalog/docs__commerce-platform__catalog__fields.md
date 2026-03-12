# Campos del catálogo - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/fields

---

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
