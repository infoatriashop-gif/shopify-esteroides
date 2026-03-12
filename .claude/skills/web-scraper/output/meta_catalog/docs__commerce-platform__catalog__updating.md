# Actualizar catálogos de anuncios - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/updating

---

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
