# Cantidad para vender - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/quantity-to-sell

---

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
