# Home Decor &amp; Furniture - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/categories/home

---

Home Decor & Furniture - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Home Decor & Furniture


 This category supports home goods, furniture, bedding, large appliances, and cleaning supplies. See also additional supported attributes.


For Google Product Category mapping, see Home & Garden and Furniture.


 

## Recommended Attributes


Include these attributes to enrich your product details page (PDP) and help buyers during purchase consideration. We advise providing all of them for improved buyer experience.


 Attribute and Type Categories (Note, for some attributes not all sub-categories apply.) Description height


string


 Garden & Outdoors, Home improvement, Furniture, Home decor, Lamps & Lighting, Pet supplies


 Height of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 length


string


 Garden & Outdoor, Home improvement, Home Decor


 Length of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 width


string


 Garden & Outdoor, Furniture, Home Decor, Pet supplies


 Width of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 pattern


string


 Bath, Bedding, Home Decor, Kitchen & Dining


 Recurring design, pattern, or motif on your item. Sample values: Plaid, Polka Dot, Gingham, Chevron.


 finish


string


 Garden & Outdoor, Bathe Furniture, Home Decor, Lamps & Lighting, Major appliances


 External treatment to the product that usually includes a change in appearance or texture to the item. Commonly used for furniture include wood, metal, and fabric. Sample values: Natural/Unfinished, Walnut, Pewter, Antiqued.
.


 volume


string


 Outdoor power equipment


 Capacity or volume of your item. Samples values: 12 oz, 8 oz, 1 Litre.


 material


string


 Antiques & Collectibles, Arts & Crafts, Garden & Outdoor, Home improvement, Bath, Bedding, Furniture, Home Decor, Kitchen & Dining, Lamps & Lighting, Storage, Pet Supplies


 Primary material(s) of your item. Sample values: Cotton, Linen, Cashmere, Silk.


Provide this attribute for all products where a color, size or material variation exists


 size


string


 Home improvement, Bedding, Furniture, Home Decor, Kitchen & Dining, Pet supplies


 Size of a bed, bed parts, mattresses, or bed linens in standard sizes. Does not include baby and toddler furniture sizes. Sample values: Twin, Twin XL, Full, Full XL, Queen, King, California King.


 scent


string


 Home Decor


 Scent(s) or fragrance(s) of your item, including items labeled as "unscented". Multiple values accepted. Sample values: Lavender, Vanilla, Lemon, Coconut, Jasmine, Pine.


To provide multiple values using a single feed scent field, the acceptable input format is &#039;Lavender&#039;, &#039;Vanilla&#039;, &#039;Lemon&#039;, &#039;Coconut&#039;, &#039;Jasmine&#039;, &#039;Pine&#039;.


To provide multiple values with one value per feed field, use feed field names, such as scent[0], scent[1]. For example, the acceptable attribute value input format for fields such as this is Lavender.


 decor_style


string


 Antiques & Collectibles, Nursery, Garden & Outdoor, Bath, Bedding, Furniture, Home Decor, Lamps & Lighting


 Decorative style in which the product was made. Sample values: Bohemian, Contemporary, Industrial, Mid-Century, Modern, Rustic, Vintage.


 

 

## Additional Attributes


This category supports additional attributes for home goods, furniture, bedding, large appliances, and cleaning supplies.


For Google Product Category mapping, see Home & Garden and Furniture.


 

### Home Goods


 Attribute and Type Description capacity


Type: string


 Maximum amount that something can contain. The first part is the number. The second part is one of the accepted units: ml, l, oz, cu_ft, cu_m. Sample values: 500 ml, 1 l.


 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 is_assembly_required


Type: boolean


 Indicates if the product arrives unassembled and must be put together before use. Sample values: Yes, No.


 is_powered


Type: boolean


 Indicates if the item uses electricity (power cord or batteries). Sample values: Yes, No.


 light_bulb_type


Type: string


 Type of light bulb. Sample values: Fluorescent, Halogen, Incandescent, LED.


 mount_type


Type: string


 Method by which the item is attached or anchored. Used for products, such as shelving and other fixtures. Sample values: Wall Mount, Ceiling Mount.


 number_of_lights


Type: integer


 Number of lights or bulbs contained within a light or light fixture. Sample values: 1, 2, 5.


 occasion


Type: list of strings


 Type of special occasion(s) for which your item is intended or specialized. Sample values: Wedding, Graduation, Halloween, Thanksgiving.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Bridesmaid&#039;, &#039;Wedding&#039;, &#039;Graduation&#039;, &#039;Halloween&#039;, &#039;Work&#039;.

 
 power_type


Type: string


 Indicates the type of power source used by the item (power cord or batteries). Sample values: Battery, Hardwired, Plug-In.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 45 lb, 120 lb, 54 kg, 80 kg.


 recommended_rooms


Type: list of strings


 Rooms where the item is likely or recommended to be used. Sample values: Family Room, Home Office, Kitchen, Dining Room, Bedroom.


 
- To provide multiple values using a single feed recommended_rooms field, the acceptable input format is &#039;Family Room&#039;, &#039;Home Office&#039;, &#039;Kitchen&#039;, &#039;Dining Room&#039;, &#039;Bedroom&#039;.

 
 shape


Type: string


 General shape of the product. Often used to describe furniture and home furnishings. Sample values: Rectangle, Square, Oval, Circle, Triangle.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Automatic Shut Off, Energy Star-Certified.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Automatic Shut Off&#039;, &#039;Energy Star-Certified&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Furniture


 Attribute and Type Description bed_frame_type


Type: string


 Type or style of the bed. Does not include Futons, Day Beds, or Sleepers. Sample values: Canopy Bed, Platform Bed, Storage Bed, Bunk Bed, Four Poster Bed.


 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 comfort_level


Type: string


 Firmness or softness of a mattress. Sample values: Extra Plush, Plush, Medium, Firm, Extra Firm, Adjustable.


 fabric_care_instructions


Type: list of strings


 Specific care instructions for how the fabric of your item should be cleaned. Instructions are on the item label. Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand Wash.


 
- To provide multiple values using a single feed fabric_care_instructions field, the acceptable input format is &#039;Dry Clean Only&#039;, &#039;Machine Washable&#039;, &#039;Do Not Iron&#039;, &#039;Hand Wash&#039;.

 
 fill_material


Type: list of strings


 Material(s) used to fill the item; usually in cushions, pillows, mattresses, and bean bags. Sample values: Polyester, Foam, Latex, Down, Cotton.


 
- To provide multiple values using a single feed fill_material field, the acceptable input format is &#039;Polyester&#039;, &#039;Foam&#039;, &#039;Latex&#039;, &#039;Down&#039;, &#039;Cotton&#039;.

 
 is_assembly_required


Type: boolean


 Indicates if the product arrives unassembled and must be put together before use. Sample values: Yes, No.


 indoor_outdoor


Type: string


 Indicates if the item is indoor only, outdoor only, or intended for both. Sample values: Indoor Only, Outdoor Only, Indoor/Outdoor.


 mattress_thickness


Type: string


 Measure from the bottom of the mattress to the crown. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 12 in, 15 in, 30 cm, 38 cm.


 mount_type


Type: string


 Method by which the item is attached or anchored. Used for products, such as shelving and other fixtures. Sample values: Wall Mount, Ceiling Mount.


 number_of_drawers


Type: integer


 Number of drawers included in the product. Sample values: 2, 4, 8.


 number_of_seats


Type: integer


 Seating capacity of the furniture. Sample values: 1, 2, 4, 6, 8.


 number_of_shelves


Type: integer


 Number of shelves included in the product. Sample values: 2, 4, 8.


 power_type


Type: string


 Indicates the type of power source used by the item (power cord or batteries). Sample values: Battery, Hardwired, Plug-In.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 45 lb, 120 lb, 54 kg, 80 kg.


 recommended_rooms


Type: list of strings


 Rooms where the item is likely or recommended to be used. Sample values: Family Room, Home Office, Kitchen, Dining Room, Bedroom.


 
- To provide multiple values using a single feed recommended_rooms field, the acceptable input format is &#039;Family Room&#039;, &#039;Home Office&#039;, &#039;Kitchen&#039;, &#039;Dining Room&#039;, &#039;Bedroom&#039;.

 
 seat_back_height


Type: string


 Indicates the seat back height from the base of the seat to the top of the back. This may be separate from the assembled_product_height and seat_height attributes. Sample values: 20 in, 20 cm, 2 ft, 60 cm.


 seat_height


Type: string


 Indicates height from the floor to the top of the seat. This may be separate from the assembled_product_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 20 in, 20 cm, 2 ft, 60 cm.


 seat_material


Type: string


 Material of the item&#039;s seat cushion. This may be separate from the item&#039;s main material composition (see material attribute). Sample values: Leather, Upholstered, Wood.


 shape


Type: string


 General shape of the product. Often used to describe furniture and home furnishings. Sample values: Rectangle, Square, Oval, Circle, Triangle.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Foldable, Inflatable, Pump Included, Wheeled, Antique.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Foldable&#039;, &#039;Inflatable&#039;, &#039;Pump Included&#039;, &#039;Wheeled&#039;, &#039;Antique&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with.


Sample values: Space, Super Heroes, Automobiles.


 

### Bedding


 Attribute and Type Description bed_frame_type


Type: string


 Type or style of the bed. Does not include Futons, Day Beds, or Sleepers. Sample values: Canopy Bed, Platform Bed, Storage Bed, Bunk Bed, Four Poster Bed.


 closure


Type: string


 Type of fastener used to close your item. Sample values: Zipper, Button, Snap, Drawstring, Lace Up, Slip On, Buckle.


 fabric_care_instructions


Type: list of strings


 Specific care instructions for how the fabric of your item should be cleaned. Instructions are on the item label. Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand Wash.


 
- To provide multiple values using a single feed fabric_care_instructions field, the acceptable input format is &#039;Dry Clean Only&#039;, &#039;Machine Washable&#039;, &#039;Do Not Iron&#039;, &#039;Hand Wash&#039;.

 
 fill_material


Type: list of strings


 Material(s) used to fill the item; usually in cushions, pillows, mattresses, and bean bags. Sample values: Polyester, Foam, Latex, Down, Cotton.


 
- To provide multiple values using a single feed fill_material field, the acceptable input format is &#039;Polyester&#039;, &#039;Foam&#039;, &#039;Latex&#039;, &#039;Down&#039;, &#039;Cotton&#039;.

 
 is_set


Type: boolean


 Indicates if the product contains 2 or more different items that are sold as part of a set. Sample values: Yes, No.


 pieces_in_set


Type: integer


 Number of items included in the set. If the item contains matching fitted sheets, flat sheets, and 2 pillowcases - the number is 4. Sample values: 3, 4, 6.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Hypoallergenic, Reversible, Stain Resistant, Water Resistant, Organic, Sustainably Sourced.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Hypoallergenic&#039;, &#039;Reversible&#039;, &#039;Reversible&#039;, &#039;Stain Resistant&#039;, &#039;Water Resistant&#039;, &#039;Organic&#039;, &#039;Sustainably Sourced&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Appliances


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;LED Lighting&#039;, &#039;Built-in Lock&#039;, &#039;WiFi Connect&#039;, &#039;Customizable Shelving&#039;.

 
Sample values: LED Lighting, Built-in Lock, WiFi Connect, Customizable Shelving.


 btu


Type: number/float


 Number of British Thermal Units (BTUs) for heating and cooling appliances. Sample value: 10,200.


 fuel_type


Type: string


 Type of fuel used to power certain appliances. Sample values: Electric, Gas, Dual.


 is_set


Type: boolean


 Indicates if the product contains 2 or more different items that are sold as part of a set. Sample values: Yes, No.


 load_position


Type: string


 Type of load position for washers and dryers. Sample values: Top Load, Front Load.


 number_of_burners


Type: integer


 Number of burners included in the product. Sample values: 2, 3, 4.


 number_of_doors


Type: integer


 Number of doors included in the product. Sample values: 1, 2, 4.


 number_of_shelves


Type: integer


 Number of shelves included in the product. Sample values: 2, 4, 8.


 power_type


Type: string


 Indicates the type of power source used by the item (power cord or batteries). Sample values: Battery, Hardwired, Plug-In.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 45 lb, 120 lb, 54 kg, 80 kg.


 smart_home_compatibility


Type: string


 Type of Smart Home devices that the product is compatible with. Sample values: Amazon Alexa, Google Assistant, Nest, Samsung SmartThings, WeMo, Philips Hue, Apple HomeKit, Logitech Harmony.


 sound_rating


Type: integer


 Sound decibel rating for the noise level of the appliance. Sample values: 44, 46, 48, 50.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Automatic Shut Off, Energy Star-Certified, Bluetooth Compatible, Industrial, Remote Control Included, Wi-Fi Compatible.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Automatic Shut Off&#039;, &#039;Energy Star-Certified&#039;, &#039;Bluetooth Compatible&#039;, &#039;Industrial&#039;, &#039;Remote Control Included&#039;, &#039;Wi-Fi Compatible&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 volts


Type: string


 Number of volts the product produces or requires. Also known as "Voltage". The first part is the number. The second part is one of the accepted units: V, KV. Sample values: 220 V, Input 100 VAC, Output 12VDC.


 watts


Type: number/float


 Number of watts the product process or requires. Also known as "Wattage". The first part is the number. The second part is one of the accepted units: W, KW, MW, GW. Sample values: 400 W, 1500 W.


 

### Cleaning Supplies


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample value: Unscented.


 bag_type


Type: string


 Indicates whether the vacuum cleaner is bag or bagless. Sample values: Bag, Bagless.


 capacity


Type: string


 Maximum amount that something can contain. The first part is the number. The second part is one of the accepted units: ml, l, oz, cu_ft, cu_m. Sample values: 12 oz, 18 ml.


 instructions


Type: list of strings


 Information that describes how the item should be assembled, consumed, or used. Sample values: Spray directly on floors and then wipe away with a damp mop, Dilute a bit of the all purpose cleaner in water and use the solution to mop your floors.


 
- To provide multiple values using a single feed instructions field, the acceptable input format is &#039;Spray directly on floors and then wipe away with a damp mop&#039;, &#039;Dilute a bit of the all purpose cleaner in water and use the solution to mop your floors&#039;.

 
 product_form


Type: string


 Consistency, texture or formulation of the item and the way it will be consumed or dispensed. Sample values: liquid, gel, aerosol spray.


 shelf_life


Type: integer


 Length of time that the product can be stored without spoiling or losing quality, measured in days. Sample values: 15, 30, 100.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Biodegradable, Recyclable.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Biodegradable&#039;, &#039;Recyclable&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 vacuum_type


Type: string


 Type of vacuum cleaner. Sample values: Canister, Handheld, Robotic, Stick, Upright.


 warnings


Type: list of strings


 Warnings associated with the product. Sample values: Chemical, Combustible, Flammable.


 
- To provide multiple values using a single feed warnings field, the acceptable input format is &#039;Chemical&#039;, &#039;Combustible&#039;, &#039;Flammable.

 
 

## Learn More


 
- Clothing, Shoes & Accessories, Product Categories

- Jewelry & Watches, Product Categories

- Health & Beauty, Product Categories

- Baby & Kids Products, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
