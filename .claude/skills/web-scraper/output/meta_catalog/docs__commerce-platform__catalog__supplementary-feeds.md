# Supplementary Feeds - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/supplementary-feeds

---

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
