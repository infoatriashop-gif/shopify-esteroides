# Jewelry &amp; Watches - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/categories/jewelry/

---

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
