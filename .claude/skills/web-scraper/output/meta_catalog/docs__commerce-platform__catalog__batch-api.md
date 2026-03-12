# Batch API Reference - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/batch-api

---

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
