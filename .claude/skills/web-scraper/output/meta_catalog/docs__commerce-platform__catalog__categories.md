# Product Categories - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/categories

---

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
