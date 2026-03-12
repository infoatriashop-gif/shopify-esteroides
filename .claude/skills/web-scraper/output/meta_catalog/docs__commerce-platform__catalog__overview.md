# Product Catalog - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/overview

---

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
