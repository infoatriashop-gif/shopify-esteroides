# API de la lista - Catálogo - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/feed-api

---

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
