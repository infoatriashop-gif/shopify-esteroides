# Clothing, Shoes &amp; Accessories - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/categories/cloth-access

---

Clothing, Shoes & Accessories - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Clothing, Shoes & Accessories


 This category supports clothing, shoes and footwear, and clothing accessories. See also additional supported attributes.


For Google Product Category mapping, see Apparel & Accessories.


 

## Recommended Attributes


Include these attributes to enrich your product details page (PDP) and help buyers during purchase consideration. We advise providing all of them for improved buyer experience.


 Attribute and Type Categories (Note, for some attributes, all sub-categories do not apply. ) Description material


string


 Clothing & Accessories, Sporting Goods


 Primary material(s) of your item. Sample values: Cotton, Linen, Cashmere, Silk.


Provide this attribute for all products where a color, size or material variation exists


 size


string


 Clothing & Accessories, Sporting Goods


 Size as it appears on the label. Includes generic sizes, such as Small and One Size. Includes numeric sizes, such as 2, 4. Sample Values: Small, Medium, Large, 2, 4, 6, One Size.


 height


string


 Boots


 Height of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 length


string


 Socks, Socks & Tights, Casual shirts, Dress shirts, Sporting Goods


 Length of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 width


string


 Belts, Ties, Men’s shoes, Women’s shoes, Sporting Goods


 Width of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 pattern


string


 Women’s clothing, Men&#039;s clothing, Boys’ Accessories, Unisex Accessories & Clothing, Shoes


 Recurring design, pattern, or motif on your item. Sample values: Plaid, Polka Dot, Gingham, Chevron.


 
 

## Additional Attributes


This category also supports additional attributes for Clothing, Shoes & Footwear, Clothing Accessories.


For Google Product Category mapping, see Apparel & Accessories.


### Clothing


 Attribute and Type Description activity


list of strings


 Particular activity for which your item is intended. Multiple values accepted. Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.


 bra_band_size


integer


 Band size of the bra. Sample values: 32, 34, 36.


 bra_cup_size


string


 Cup size of the bra. Sample values: A, B, DD, F.


 character


string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 chest_size


string


 Numeric size of the chest measurement for the item. Does not include generic size; for example, Small. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 47 cm, 16.9 in, 50 cm, 19.7 in.


 closure


string


 Type of fastener used to close your item. Sample values: Zipper, Button, Snap, Drawstring.


 clothing_size_type


string


 General grouping of different sizes based on age and gender. Sample values: Big & Tall, Regular, Big Boys, Big Girls, Full Size, Little Boys, Little Girls, Petite, Plus, Maternity, Baby Boy, Baby Girls, Toddler Boys, Toddler Girls.


 collar_style


string


 Style of collar on your item. Sample values: Banded, Cutaway, Clifford, Tuxedo.


 denim_features


list of strings


 Features, embellishments, and finishes, specific to jeans. Sample values: Distressed, Wrinkled, Ripped, Embroidered, Raw Hem.


 
- To provide multiple values using a single feed denim_features field, the acceptable input format is &#039;Distressed&#039;, &#039;Wrinkled&#039;, &#039;Ripped&#039;, &#039;Embroidered&#039;, &#039;Raw Hem&#039;.

 
 inseam


string


 Numeric size of the inseam for items, such as pants, jeans, and leggings. Does not include generic sizes, such as Small. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 30 in, 34 in, 80 cm, 86 cm.


 is_costume


boolean


 Indicates if the item is intended to be worn as a costume. Sample values: Yes, No.


 is_outfit_set


boolean


 Indicates if the product has 2 or more different items that come as part of a matching or outfit set, such as "matching shirt & pants" or "bra & underwear set". Sample values: Yes, No.


 jean_wash


string


 Post-process wash treatment that may alter color or texture of denim products. Sample values: Acid Wash, Dark Wash, Vintage Wash.


 neckline


string


 Neckline or neck style of the item. Sample values: Crew Neck, Sweetheart, V-Neck, Boat Neck, Turtleneck.


 pant_fit


string


 General fit style of pants. Also applies to jeans. Sample values: Relaxed, Slim, Curvy, Cigarette, Boyfriend.


 sheerness


string


 Amount of sheerness or opacity of an item. Typically used for hosiery items. Sample values: Opaque, Sheer, Semi-Opaque, Semi-Sheer, Ultra Sheer.


 size_system


string


 Size system used by your item; usually corresponds to the country. Sample Values: US, UK, EU, &#039;DE&#039;, FR, CN, IT, BR, MEX, AU.


 skirt_length


string


 Numeric length value of skirts from waist to bottom. Does not include style values, such as Maxi. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 35, 86 cm, 44 in, 140 cm.


 sleeve_length


string


 Numeric length of shirt sleeves. Does not include shirt style, such as 3/4 Sleeve. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 25 in, 63 cm, 29 in, 73 cm.


 sleeve_length_style


string


 Style of sleeve length. Does not include sleeve styles. See sleeve_style attribute. Sample values: 3/4 Sleeve, Long Sleeve, Short Sleeve, &#039;Sleeveless&#039;.


 sleeve_style


string


 Style of sleeves. Does not include sleeve length styles. See sleeve_length_style attribute. Sample values: Flutter, Rolled, Puffed.


 sock_rise


string


 Height style of socks. Sample values: Ankle, Crew, Knee High, Mid Calf, No Show, Over the Knee, Thigh High.


 sport


list of strings


 Particular sport or activity for which your item is intended. Multiple values accepted. Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Tennis&#039;, &#039;Soccer&#039;, &#039;Hiking&#039;, &#039;Running&#039;, &#039;Yoga&#039;, &#039;Basketball&#039;.

 
 sports_league


string


 Particular sports league that your item represents or is associated with. Sample values: NFL, NBA, NASCAR.


 sports_team


string


 Particular sports team that your item represents or is associated with. Sample values: Golden State Warriors, San Francisco Giants.


 standard_features


list of strings


 Standard features related to the item. Sample values: Waterproof, Water Resistant.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Water Resistant&#039;, &#039;Waterproof&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 theme


string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 upper_body_strap_configuration


string


 Strap style for items, such as tops, bras, and swimsuits. Sample values: Racerback, Halter, Strapless.


 waist_rise


string


 Height where the waistline of the item lies on the body. Sample values: Ultra High, Mid, Low.


 waist_style


string


 Style of the waist for the item. Can apply to pants or dresses. Sample values: Banded, Dropped, Empire, Paper Bag.


 

### Shoes & Footwear


 Attribute and Type Description character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 closure


Type: string


 Type of fastener used to close your item. Sample values: Zipper, Button, Snap, Drawstring.


 fabric_care_instructions


Type: list of strings


 Specific care instructions for how the fabric of your item should be cleaned. Instructions are on the item label. Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand Wash.


 
- To provide multiple values using a single feed fabric_care_instructions field, the acceptable input format is &#039;Dry Clean Only&#039;, &#039;Machine Washable&#039;, &#039;Do Not Iron&#039;, &#039;Hand Wash&#039;.

 
 heel_height


Type: string


 Numeric height of the heel on the shoes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 0.5 in, 2 in, 7 cm, 11 cm.


 heel_style


Type: string


 Style of heel on the shoes. Sample values: Wedge, Block, Stiletto, Kitten.


 shoe_type


Type: string


 Type of shoes. Sample values: Flats, Boots, Heels, Sandals, Slippers, Athletic Shoes, Fashion Sneakers.


 shoe_width


Type: string


 Width of shoes. Sample values: A, B, EE, Narrow, Wide.


 size_system


Type: string


 Size system used by your item, usually corresponds to country. Sample values: US, UK, EU,DE, FR, JP, CN, IT, BR, MEX, AU.


 sport


Type: list of strings


 Particular sport or activity for which your item is intended. Multiple values accepted. Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Tennis&#039;, &#039;Soccer&#039;, &#039;Hiking&#039;, &#039;Running&#039;, &#039;Yoga&#039;, &#039;Basketball&#039;.

 
 sports_league


Type: string


 Particular sports league that your item represents or is associated with. Sample values: NFL, NBA, NASCAR.


 sports_team


Type: string


 Particular sports team that your item represents or is associated with. Sample values: Golden State Warriors, San Francisco Giants.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Orthopedic, Waterproof, Water Resistant.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Water Resistant&#039;, &#039;Orthopedic&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 

### Clothing Accessories


 Attribute and Type Description character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 closure


Type: string


 Type of fastener used to close your item. Sample values: Zipper, Button, Snap, Drawstring.


 fabric_care_instructions


Type: list of strings


 Specific care instructions for how the fabric of your item should be cleaned. Instructions are on the item label. Sample values: Dry Clean Only, Machine Washable, Do Not Iron, Hand Wash.


 
- To provide multiple values using a single feed fabric_care_instructions field, the acceptable input format is &#039;Dry Clean Only&#039;, &#039;Machine Washable&#039;, &#039;Do Not Iron&#039;, &#039;Hand Wash&#039;.

 
 is_costume


Type: boolean


 Indicates if the item is intended to be worn as a costume. Sample values: Yes, No.


 size_system


Type: string


 Size system used by your item, usually corresponds to country. Samples values: US, UK, EU, DE, FR, JP, CN, IT, BR, MEX, AU.


 sport


Type: list of strings


 Particular sport or activity for which your item is intended. Multiple values accepted. Sample values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Tennis&#039;, &#039;Soccer&#039;, &#039;Hiking&#039;, &#039;Running&#039;, &#039;Yoga&#039;, &#039;Basketball&#039;.

 
 sports_league


Type: string


 Particular sports league that your item represents or is associated with. Sample values: NFL, NBA, NASCAR.


 sports_team


Type: string


 Particular sports team that your item represents or is associated with. Sample values: Golden State Warriors, San Francisco Giants.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Waterproof, Water Resistant.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Waterproof&#039;, Water Resistant&#039;.

 

Note: The value inputs listed for standard_features are not sample values. They are the only inputs that are accepted.


 sunglasses_lens_color


Type: string


 Color of sunglasses lenses. Sample values: Beige, Black, Blue, Bronze, Brown, Gold, Gray, Green, Multi-Color, Orange, Pink, Purple, Red, Silver, White, Yellow.


 sunglasses_lens_technology


Type: list of strings


 Technology or treatment of sunglass lenses. Multiple values accepted. Sample values: Anti-Reflective, Gradient, Polarized, Photochromatic.


 
- To provide multiple values using a single feed sunglasses_lens_technology field, the acceptable input format is &#039;Anti-Reflective&#039;, &#039;Gradient&#039;, &#039;Polarized&#039;, &#039;Photochromatic&#039;.

 
 sunglasses_width


Type: string


 Width of the sunglasses frame. Sample values: Narrow, Medium, Wide.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 tie_width


Type: string


 Width of tie. Sample values: Classic, Skinny, Wide.


 

## Learn More


 
- Home Decor & Furniture, Product Categories

- Jewelry & Watches, Product Categories

- Health & Beauty, Product Categories

- Baby & Kids Products, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
