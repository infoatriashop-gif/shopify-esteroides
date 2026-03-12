# disabled_capabilities - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/fields/product-visibility-per-channel

---

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
