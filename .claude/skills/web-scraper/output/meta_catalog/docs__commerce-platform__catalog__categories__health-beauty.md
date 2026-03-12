# Health &amp; Beauty - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/categories/health-beauty/

---

Health & Beauty - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Health & Beauty


 This category supports health and beauty products. See also additional supported attributes.


For Google Product Category mapping, see Health & Beauty.


 

## Recommended Attributes


Include these attributes to enrich your product details page (PDP) and help buyers during purchase consideration. We advise providing all of them for improved buyer experience.


 Attribute and Type Categories (Note, for some attributes not all sub-categories apply.) Description ingredients


List of strings


 Skin care, Hair care & Styling


 List of active ingredients as shown on the item label. Active ingredients usually perform a specific purpose, such as hydration, anti-acne, and so on. Sample values: Vitamin C, Benzoyl Peroxide, Alpha Hydroxy Acid, Hyaluronic Acid, Hydroquinone.


To provide multiple values using a single feed ingredients field, the acceptable input format is &#039;Vitamin C&#039;, &#039;Benzoyl Peroxide&#039;, &#039;Alpha Hydroxy Acid&#039;, &#039;Hyaluronic Acid&#039;, &#039;Hydroquinone&#039;


To provide multiple values with one value per feed field, use feed field names, such as ingredients[0], ingredients[1]. For example, the acceptable attribute value input format for fields such as this is Vitamin C.


 capacity/volume


string


 Skin care, Hair care, Make-up, Fragrance, Bath/body


 Capacity or volume of your item. This is important for buyers to know the amount of product they are receiving and is important for skin care, beauty, and hair care products. Samples values: 12 oz, 8 oz, 1 Litre.


 scent


string


 Bath/body, Health Care, Home Fragrances & Accessories, Personal Care


 Scent(s) or fragrance(s) of your item, including items labeled as "unscented". Multiple values accepted. Sample values: Lavender, Vanilla, Lemon, Coconut, Jasmine, Pine.


To provide multiple values using a single feed scent field, the acceptable input format is &#039;Lavender&#039;, &#039;Vanilla&#039;, &#039;Lemon&#039;, &#039;Coconut&#039;, &#039;Jasmine&#039;, &#039;Pine&#039;.


To provide multiple values with one value per feed field, use feed field names, such as scent[0], scent[1]. For example, the acceptable attribute value input format for fields such as this is Lavender.


 length


string


 Hair extension


 Length of the product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 2.5 ft.


 material


string


 Hair Care & Styling, Makeup, First Aid, Massage


 Primary material(s) of your item. Sample values: Cotton, Linen, Cashmere, Silk.


Provide this attribute for all products where a color, size or material variation exists


 size


string


 Hair Care & Styling, Feminine Care


 Size as it appears on the label. Includes generic sizes, such as Small and One Size. Includes numeric sizes, such as 2, 4. Sample Values: Small, Medium, Large, 2, 4, 6, One Size.


 
 

## Additional Attributes


This category also supports additional attributes for health and beauty.


For Google Product Category mapping, see Apparel & Accessories.


### Health


 Attribute and Type Description absorbency


Type: string


 Term describing the ability of a product to absorb moisture. Used in personal care products, such as pads and liners. Sample values: Heavy, Light, Maximum, Moderate, Overnight, Regular, Super, Ultra Thin.


 batteries_required


Type: boolean


 Indicates if batteries are required to use this item. Samples values: Yes, No.


 body_part


Type: list of strings


 Describes the particular body part(s) for which the item is intended. Samples values: Eyes, Face, Nose, Ankle, Wrist, Thumb.


 
- To provide multiple values using a single feed body_part field, the acceptable input format is &#039;Eyes&#039;, &#039;Face&#039;, &#039;Nose&#039;, &#039;Ankle&#039;, &#039;Wrist&#039;, &#039;Thumb&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as body_part[0], body_part[1]. For example, the acceptable attribute value input format for fields such as this is Eyes.

 
 dosage


Type: list of strings


 Amount of a medication, drug, or supplement that is directed to be taken, or applied at one time or regularly during a period of time, as specified by the manufacturer. Samples values: 1 teaspoon every 6 hours, 0.5 ml every 30 days, For adults - 400 to 800 mg every 6 to 8 hours is recommended, not to exceed 3200 mg per day.


 
- To provide multiple values using a single feed dosage field, the acceptable input format is &#039;1 teaspoon every 6 hours&#039;, &#039;0.5 ml every 30 days&#039;, &#039;For adults - 400 to 800 mg every 6 to 8 hours is recommended, not to exceed 3200 mg per day&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as dosage[0], dosage[1]. For example, the acceptable attribute value input format for fields such as this is 1 teaspoon every 6 hours.

 
 eyewear_rim


Type: string


 Whether eyewear has rims, partial rims, or no rim at all. Samples values: Full-Rim; Rimless; Semi-Rimless, Half-Rim.


 flavor


Type: list of strings


 Describes the taste or flavor of the item, as described by the manufacturer. May be an important attribute for shoppers for items, such as dental products or medicine. Samples values: Cinnamon, Peppermint, Bubble Gum, Citrus, Chocolate, Berry.


 
- To provide multiple values using a single feed flavor field, the acceptable input format is &#039;Cinnamon&#039;, &#039;Peppermint&#039;, &#039;Bubble Gum&#039;, &#039;Citrus&#039;, &#039;Chocolate&#039;, &#039;Berry&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as flavor[0], flavor[1]. For example, the acceptable attribute value input format for fields such as this is Cinnamon.

 
 inactive_ingredients


Type: list of strings


 Describes the list of inactive ingredients as shown on the item label. Sample values: Beeswax, Red 27, Iron Oxide.


 
- To provide multiple values using a single feed inactive_ingredients field, the acceptable input format is &#039;Beeswax&#039;, &#039;Red 27&#039;, &#039;Iron Oxide&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as inactive_ingredients[0], inactive_ingredients[1]. For example, the acceptable attribute value input format for fields such as this is Beeswax.

 
 ingredient_composition


Type: list of objects


 Ingredients with the corresponding composition value. The ingredients represent a list of properties separated by commas. Each property has a name followed by a colon and a value.


Sample values: Pyrithione zinc: 1%, Salicylic Acid: 1%, Aloe Vera Extract: 5%.


Example:


[&#123;
 "name": "Pyrithione zinc",
 "value": 10
&#125;, &#123;
 "name": "Salicylic Acid",
 "value": 10

&#125;]is_powered


Type: boolean


 Indicates if the item uses electricity (power cord or batteries). Sample values: Yes, No.


 keywords


Type: list of strings


 Keywords that might be used to search for this term, including synonyms and related terms. Sample values: Sensitive Skin, Scent Free.


 
- To provide multiple values using a single feed keywords field, the acceptable input format is &#039;Sensitive Skin&#039;, &#039;Scent Free&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as keywords[0], keywords[1]. For example, the acceptable attribute value input format for fields such as this is Sensitive Skin.

 
 lens_material


Type: list of strings


 Substance(s) an optical lens is made out of. Sample values: Plastic, Glass, Trivex.


 
- To provide multiple values using a single feed lens_material field, the acceptable input format is &#039;Plastic&#039;, &#039;Glass&#039;, &#039;Trivex&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as lens_material[0], lens_material[1]. For example, the acceptable attribute value input format for fields such as this is Plastic.

 
 lens_tint


Type: string


 Color of lense tint. Sample values: Blue, Yellow.


 lens_type


Type: string


 Whether the lens is single, multifocal, or tinted. Sample values: Single Vision, Bifocal, Progressive, Trifocal, Sunglasses.


 nutrient_amount


Type: float


 Amount of the nutrient present in one serving. This attribute is used in conjunction with nutrient_name and nutrient_percentage_daily_value. Sample values: 56 (for Energy in kCal), 9.4 (for Protein in grams).


 nutrient_name


Type: string


 Name of additional nutrient(s). This attribute is used in conjunction with nutrient_amount and nutrient_percentage_daily_value. Sample values: Vitamin A, Dietary Fiber.


 
- To provide multiple values using a single feed nutrient_name field, the acceptable input format is &#039;Vitamin A&#039;, &#039;Dietary Fiber&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as nutrient_name[0], nutrient_name[1]. For example, the acceptable attribute value input format for fields such as this is Vitamin A.

 
 nutrient_percentage_daily_value


Type: float


 Name of additional nutrient, measured in percentages. This attribute is used in conjunction with nutrient_amount and nutrient_name. Sample values: 15, 25.


 package_quantity


Type: integer


 Total number of items included in the package or box. Samples values: 12, 24, 36.


 power_type


Type: string


 Method by which the item is powered. Sample values: Electric, Batteries.


 product_form


Type: string


 Consistency, texture, or formulation of the item and the way it can be consumed or dispensed. Sample values: Oil, Gel, Spray, Cream, Powder, Serum, Liquid.


 result_time


Type: string


 Duration of time necessary to see the outcome from using a product. Typically used for medical and personal care test kits and monitors. Sample values: 2 min, 3 to 5 hours.


 serving_size


Type: string


 Measurement value specifying the amount of the item typically used as a reference on the label of that item to list per serving information (nutrients, calories, total fat). Applicable for a wide variety of products including food, beverages, and nutritional supplements. The first part is the number. The second part is one of the accepted units: ml, l, oz, cu_ft, cu_m. Sample values: 0.4 ml, 40 ml.


 skin_care_concerns


Type: list of strings


 Indicates if the item is meant to alleviate a particular skin care issue. For general health concerns, such as obesity or blood pressure, use the health_concern attribute. Values may be similar to the skin_type attribute - "dry cracked skin" may be a concern, but "dry" is a skin type. Multiple values accepted. Sample values: Dry Skin, Cellulite, Wrinkles, Eczema, Rosacea, Blemishes, Blackheads.


 
- To provide multiple values using a single feed skin_care_concerns field, the acceptable input format is &#039;Dry Skin&#039;, &#039;Cellulite&#039;, &#039;Wrinkles&#039;, &#039;Eczema&#039;, &#039;Rosacea&#039;, &#039;Blemishes&#039;, &#039;Blackheads&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as skin_care_concerns[0], skin_care_concerns[1]. For example, the acceptable attribute value input format for fields such as this is Dry Skin.

 
 skin_type


Type: string


 Indicates the general skin type that the product is intended for on the oily/dry spectrum. Sample values: Oily, Dry, Combination, Sensitive.


 spf_value


Type: integer


 Indicates the strength of Sun Protection Factor (SPF) in an item. Describes how well the product can block out harmful rays from the run. Commonly found in sunscreen and makeup products. Sample values: 15, 30, 45.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Automatic Shut Off, Cordless, Polarized, Latex-Free, Portable, Reusable, Scratch-Resistant, Travel Size, Adaptive Lenses.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Automatic Shut Off&#039;, &#039;Cordless&#039;, &#039;Polarized&#039;, &#039;Latex-Free&#039;, &#039;Portable&#039;, &#039;Reusable&#039;, &#039;Scratch-Resistant&#039;, &#039;Travel Size&#039;, &#039;Adaptive Lenses&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as Water Resistant.

 
 stop_use_indications


Type: list of strings


 Information that describes symptoms or reactions that indicate when to stop taking medicine. Sample value: Stop using if you experience swelling, rash, or fever.


 uv_rating


Type: number/float


 Ultraviolet rating for eyewear. Sample values: 400, 300.


 

### Beauty


 Attribute and Type Description batteries_required


Type: boolean


 Indicates if batteries are required to use this item. Samples values: Yes, No.


 body_part


Type: list of strings


 Describes the particular body part(s) for which the item is intended. Samples values: Eyes, Face, Nose, Ankle, Wrist, Thumb.


 
- To provide multiple values using a single feed body_part field, the acceptable input format is &#039;Eyes&#039;, &#039;Face&#039;, &#039;Nose&#039;, &#039;Ankle&#039;, &#039;Wrist&#039;, &#039;Thumb&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as body_part[0], body_part[1]. For example, the acceptable attribute value input format for fields such as this is Eyes.

 
 care_instructions


Type: list of strings


 Describes how the item should be cleaned, cared for, or maintained. Samples value: Wash with warm water & soap.


 hair_type


Type: list of strings


 Indicates the general hair type(s) that the product is intended for relating to texture, coarseness, oiliness, thickness, and curliness. Samples values: Coarse, Color Treated, Curly, Damaged, Dry, Fine, Oily.


 
- To provide multiple values using a single feed hair_type field, the acceptable input format is &#039;Coarse&#039;, &#039;Color Treated&#039;, &#039;Curly&#039;, &#039;Damaged&#039;, &#039;Dry&#039;, &#039;Fine&#039;, &#039;Oily&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as hair_type[0], hair_type[1]. For example, the acceptable attribute value input format for fields such as this is Coarse.

 
 health_concern


Type: list of strings


 Indicates if the item is meant to alleviate a particular health issue, illness, or life stage. For concerns specific to skin care, use the skin_care_concern attribute. Multiple values accepted. Sample values: Fever, Allergies, Cholesterol, Blood Sugar.


 
- To provide multiple values using a single feed health_concern field, the acceptable input format is &#039;Fever&#039;, &#039;Allergies&#039;, &#039;Cholesterol&#039;, &#039;Blood Sugar&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as health_concern[0], health_concern[1]. For example, the acceptable attribute value input format for fields such as this is Fever.

 
 inactive_ingredients


Type: list of strings


 Describes the list of inactive ingredients as shown on the item label. Sample values: Beeswax, Red 27, Iron Oxide.


 
- To provide multiple values using a single feed inactive_ingredients field, the acceptable input format is &#039;Beeswax&#039;, &#039;Red 27&#039;, &#039;Iron Oxide&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as inactive_ingredients[0], inactive_ingredients[1]. For example, the acceptable attribute value input format for fields such as this is Beeswax.

 
 ingredient_composition


Type: list of objects


 Ingredients with the corresponding composition value. Sample values: Pyrithione zinc: 1%, Salicylic Acid: 1%, Aloe Vera Extract: 5%.


 is_powered


Type: boolean


 Indicates if the item uses electricity (power cord or batteries). Sample values: Yes, No.


 keywords


Type: list of strings


 Keywords that might be used to search for this term, including synonyms and related terms. Sample values: Sensitive Skin, Scent Free.


 
- To provide multiple values using a single feed keywords field, the acceptable input format is &#039;Sensitive Skin&#039;, &#039;Scent Free&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as keywords[0], keywords[1]. For example, the acceptable attribute value input format for fields such as this is Sensitive Skin.

 
 power_type


Type: string


 Method by which the item is powered. Sample values: Electric, Batteries.


 product_form


Type: string


 Consistency, texture, or formulation of the item and the way it can be consumed or dispensed. Sample values: Oil, Gel, Spray, Cream, Powder, Serum, Liquid.


 result_time


Type: string


 Duration of time necessary to see the outcome from using a product. Typically used for medical and personal care test kits and monitors. Sample values: 2 min, 3 to 5 hours.


 skin_care_concern


Type: list of strings


 Indicates if the item is meant to alleviate a particular skin care issue. For general health concerns, such as obesity or blood pressure, use the health_concern attribute. Values may be similar to the skin_type attribute - "dry cracked skin" may be a concern, but "dry" is a skin type. Sample values: Dry Skin, Cellulite, Wrinkles, Eczema, Rosacea, Blemishes, Blackheads.


 
- To provide multiple values using a single feed skin_care_concerns field, the acceptable input format is &#039;Dry Skin&#039;, &#039;Cellulite&#039;, &#039;Wrinkles&#039;, &#039;Eczema&#039;, &#039;Rosacea&#039;, &#039;Blemishes&#039;, &#039;Blackheads&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as skin_care_concerns[0], skin_care_concerns[1]. For example, the acceptable attribute value input format for fields such as this is Dry Skin.

 
 skin_tone


Type: string


 Describes the color or shade of skin that a product is targeted for. This is separate from Color Name of the product. Olive may be a color name from the manufacturer and the type of skin tone the product is targeting. Allowed values: Fair, Light, Medium, Neutral, Olive, Dark.


 skin_type


Type: string


 Indicates the general skin type that the product is intended for on the oily/dry spectrum. Sample values: Oily, Dry, Combination, Sensitive.


 spf_value


Type: integer


 Indicates the strength of Sun Protection Factor (SPF) in an item. Describes how well the product can block out harmful rays from the run. Commonly found in sunscreen and makeup products. Sample values: 15, 30, 45.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Automatic Shut Off, Cordless, Foldable, Industrial, Latex-Free, Non-Comedogenic, Portable, Reusable, Self-Tanning, Tinted, Travel Size, Waterproof, Wheeled.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Automatic Shut Off&#039;, &#039;Cordless&#039;, &#039;Foldable&#039;, &#039;Industrial&#039;, &#039;Latex-Free&#039;, &#039;Non-Comedogenic&#039;, &#039;Portable&#039;, &#039;Reusable&#039;, &#039;Self-Tanning&#039;, &#039;Tinted&#039;, &#039;Travel Size&#039;, &#039;Waterproof&#039;, &#039;Wheeled&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as Automatic Shut Off.

 
 stop_use_indications


Type: list of strings


 Information that describes symptoms or reactions that indicate when to stop taking medicine. Sample value: Stop using if you experience swelling, rash, or fever.


 wig_cap_type


Type: string


 Construction style of the wig cap (also called the "wig base"), affecting the wig&#039;s appearance, durability, and styling options. Sample values: 100% Hand-Tied, Lace Front, Full Lace, Traditional, Monofilament, Capless, Thin Skin.


 

## Learn More


 
- Clothing, Shoes & Accessories, Product Categories

- Home Decor & Furniture, Product Categories

- Jewelry & Watches, Product Categories

- Baby & Kids Products, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
