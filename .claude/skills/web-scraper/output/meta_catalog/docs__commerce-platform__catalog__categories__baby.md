# Baby &amp; Kids - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/categories/baby

---

Baby & Kids - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Baby & Kids


 This category also supports additional attributes.


For Google Product Category mapping, see Baby & Toddler.


 

## Recommended Attributes


Include these attributes to enrich your product details page (PDP) and help buyers during purchase consideration. We advise providing all of them for improved buyer experience.


 Attribute and Type Categories (Note, for some attributes not all sub-categories apply.) Description material


string


 Baby carriers, Baby bathing, Feeding, Bath tubs, Nursery, Strollers & Accessories


 Primary material(s) of your item. Sample values: Cotton, Linen, Cashmere, Silk.


Provide this attribute for all products where a color, size or material variation exists


 size


string


 Baby & Kids


 Size as it appears on the label. Includes generic sizes, such as Small and One Size. Includes numeric sizes, such as 2, 4. Sample Values: Small, Medium, Large, 2, 4, 6, One Size.


 pattern


string


 Baby carriers, Nursery


 Recurring design, pattern, or motif on your item. Sample values: Plaid, Polka Dot, Gingham, Chevron.


 decor_style


string


 Nursery


 Decorative style in which the product was made. Sample values: Bohemian, Contemporary, Industrial, Mid-Century, Modern, Rustic, Vintage.


 finish


string


 Nursery


 External treatment to the product that usually includes a change in appearance or texture to the item. Commonly used for furniture include wood, metal, and fabric. Sample values: Natural/Unfinished, Walnut, Pewter, Antiqued.
.


 
 

## Additional Attributes


This category supports additional attributes for nursery, toys, baby feeding, baby transport, diapering & potty training.


For Google Product Category mapping, see Baby & Toddler.


 

### Nursery


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample values: Waterproof, Personalized, Vintage.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Personalized&#039;, &#039;Vintage&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as additional_features[0], additional_features[1]. For example, the acceptable attribute value input format for fields, such as Waterproof.

 
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

- To provide multiple values with one value per feed field, use feed field names, such as fabric_care_instructions[0], fabric_care_instructions[1]. For example, the acceptable attribute value input format for fields such as this is Dry Clean Only.

 
 fill_material


Type: list of strings


 Material(s) used to fill the item; usually in cushions, pillows, mattresses, and bean bags. Sample values: Polyester, Foam, Latex, Down, Cotton.


 
- To provide multiple values using a single feed fill_material field, the acceptable input format is &#039;Polyester&#039;, &#039;Foam&#039;, &#039;Latex&#039;, &#039;Down&#039;, &#039;Cotton&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as fill_material[0], fill_material[1]. For example, the acceptable attribute value input format for fields such as this is Polyester.

 
 is_assembly_required


Type: boolean


 Indicates if the product arrives unassembled and must be put together before use. Sample values: Yes, No.


 mattress_thickness


Type: string


 Measure from the bottom of the mattress to the crown. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 12 in, 15 in, 30 cm, 38 cm.


 number_of_drawers


Type: integer


 Number of drawers included in the product. Sample values: 2, 4, 8.


 number_of_shelves


Type: integer


 Number of shelves included in the product. Sample values: 2, 4, 8.


 shape


Type: string


 General shape of the product. Often used to describe furniture and home furnishings. Sample values: Rectangle, Square, Oval, Round.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Foldable, Wheeled, Antique.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Foldable&#039;, &#039;Wheeled&#039;, &#039;Antique&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as Foldable.

 
 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Toys


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample values: Waterproof, Personalized, Vintage.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Personalized&#039;, &#039;Vintage&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as additional_features[0], additional_features[1]. For example, the acceptable attribute value input format for fields, such as Waterproof.

 
 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 educational_focus


Type: list of strings


 Determines if the item intended to improve a particular educational skill. Sample values: Shape Identification, Language, Motor Skills, Pretend Play, Color Identification, Science, Nature, Math, Counting, Music, Reading, Writing, Creativity.


 
- To provide multiple values using a single feed educational_focus field, the acceptable input format is &#039;Language&#039;, &#039;Math&#039;, &#039;Reading&#039;, &#039;Music.

- To provide multiple values with one value per feed field, use feed field names, such as educational_focus[0],educational_focus[1]. For example, the acceptable attribute value input format for fields such as this is Language.

 
 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Baby Feeding


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample values: Waterproof, Personalized, Vintage.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Personalized&#039;, &#039;Vintage&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as additional_features[0], additional_features[1]. For example, the acceptable attribute value input format for fields, such as Waterproof.

 
 allergens


Type: list of strings


 Statement regarding any ingredients that may be food allergens, often written as "Contains X" or "Manufactured in a facility which processes Y". Sample values: Contains Peanuts, Soy, Manufactured in a facility that processes tree nuts, milk, and eggs.


 
- To provide multiple values using a single feed allergens field, the acceptable input format is &#039;Contains Peanuts, Soy&#039;, &#039;Manufactured in a facility that processes tree nuts, milk, and eggs&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as allergens[0], allergens[1]. For example, the acceptable attribute value input format for fields, such as Contains Peanuts, Soy.

 
 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 color


Type: list of strings


 Primary color(s) of your item. Sample values: Beige, Black, Blue, Bronze, Brown, Gold, Gray.


 
- To provide multiple values using a single feed color field, the acceptable input format is &#039;Beige&#039;, &#039;Black&#039;, &#039;Blue&#039;, &#039;Bronze&#039;, &#039;Brown&#039;, &#039;Gold&#039;, &#039;Gray&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as allergens[0], allergens[1]. For example, the acceptable attribute value input format for fields, such as Beige.

 
 flavor


Type: list of strings


 Describes the taste or flavor of the item, as described by the manufacturer. May be an important attribute for shoppers for items, such as dental products or medicine. Multiple values accepted. Samples values: Cinnamon, Peppermint, Bubble Gum, Citrus, Chocolate, Berry.


 
- To provide multiple values using a single feed flavor field, the acceptable input format is &#039;Cinnamon&#039;, &#039;Peppermint&#039;, &#039;Bubble Gum&#039;, &#039;Citrus&#039;, &#039;Chocolate&#039;, &#039;Berry&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as flavor[0], flavor[1]. For example, the acceptable attribute value input format for fields such as this is Cinnamon.

 
 ingredients


Type: list of strings


 List of active ingredients as shown on the item label. Active ingredients usually perform a specific purpose, such as hydration, anti-acne, and so on. Sample values: Vitamin C, Benzoyl Peroxide, Alpha Hydroxy Acid, Hyaluronic Acid, Hydroquinone.


 
- To provide multiple values using a single feed ingredients field, the acceptable input format is &#039;Vitamin C&#039;, &#039;Benzoyl Peroxide&#039;, &#039;Alpha Hydroxy Acidm&#039;, &#039;Hyaluronic Acid&#039;, &#039;Hydroquinone&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as ingredients[0], ingredients[1]. For example, the acceptable attribute value input format for fields such as this is Vitamin C.

 
 life_stage


Type: string


 Life stage of a child. Sample values: Newborn, Infant, Toddler.


 maximum_weight


Type: string


 Upper weight limit or capability of an item, often used in conjunction with minimum_weight. The meaning varies with context of the product. For example, when used with minimum_weight, this attribute provides weight ranges for a range of products including pet medicine, baby carriers, and outdoor play structures. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 35 lb, 45 lb, 15 kg, 20 kg.


 minimum_weight


Type: string


 Lower weight limit or capability of an item, often used in conjunction with maximum_weight. The meaning varies with context of the product. For example, when used with maximum_weight, this attribute provides weight ranges for a range of products including pet medicine, baby carriers, and outdoor play structures. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 35 lb, 45 lb, 15 kg, 20 kg.


 package_quantity


Type: integer


 Total number of items included in the package or box. Sample values: 12, 24, 36.


 product_form


Type: string


 Consistency, texture, or formulation of the item and the way it can be consumed or dispensed. Sample values: Oil, Gel, Spray, Cream, Powder, Serum, Liquid, Frozen, Granules, Liquid, Bars, Fresh, Whole, Stewed, Sliced, Chopped, Diced, Blended, Powders.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Baby Transport


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample values: Waterproof, Personalized, Vintage.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Personalized&#039;, &#039;Vintage&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as additional_features[0], additional_features[1]. For example, the acceptable attribute value input format for fields, such as Waterproof.

 
 baby_carrier_position


Type: string


 Applies to wearable baby carriers. Describes the part of the body against which the child is placed along with the direction the child faces (where applicable) while in the wearable baby carrier. Sample values: front carry - facing in, front carry - facing out, back carry, hip carry, side carry.


 baby_carrier_style


Type: string


 Which direction the car seat faces. Sample values: Forward-Facing, Rear-Facing, Convertible.


 car_seat_facing_direction


Type: string


 Prominent wearable baby carrier styles. Sample values: sling, skin-to-skin, wrap, frame carrier.


 car_seat_max_child_height


Type: string


 Maximum height of the child occupant as given by the manufacturer, measured in inches or centimeters. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 57 in, 145 cm.


 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 child_car_seat_style


Type: string


 Prominent car seat styles. Sample values: Backless Booster, Combination Seat, Convertible Car Seats, 5-Point Convertible, High-back Booster, Infant Seat, Overhead Shield Convertible.


 number_of_seats


Type: integer


 Seating capacity of the furniture. Sample values: 1, 2, 4, 6, 8.


 safety_harness_style


Type: string


 Style of the occupant restraint harness included with the car seat, stroller, carrier, and so on. Sample values: 3-point harness, 5-point harness, no harness.


 standard_features


Type: list of strings


 Standard features related to the item. Sample value: Foldable.


 stroller_type


Type: string


 Prominent stroller styles. Sample values: jogging, lightweight, umbrella, full-size, sit and stand, all-terrain.


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

### Diapering & Potty Training


 Attribute and Type Description additional_features


Type: list of strings


 Special features related to your item that might be important for buyers. Sample values: Waterproof, Personalized, Vintage.


 
- To provide multiple values using a single feed additional_features field, the acceptable input format is &#039;Waterproof&#039;, &#039;Personalized&#039;, &#039;Vintage&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as additional_features[0], additional_features[1]. For example, the acceptable attribute value input format for fields, such as Waterproof.

 
 character


Type: string


 Particular character, person, or entity that the item represents or is associated with. Sample values: Chewbacca, Spongebob.


 diaper_type


Type: string


 Type of diaper. Sample values: Cloth, Disposable, Training Pants.


 ingredients


Type: list of strings


 List of active ingredients as shown on the item label. Active ingredients usually perform a specific purpose, such as hydration, anti-acne, and so on. Sample values: Vitamin C, Benzoyl Peroxide, Alpha Hydroxy Acid, Hyaluronic Acid, Hydroquinone.


 
- To provide multiple values using a single feed ingredients field, the acceptable input format is &#039;Vitamin C&#039;, &#039;Benzoyl Peroxide&#039;, &#039;Alpha Hydroxy Acidm&#039;, &#039;Hyaluronic Acid&#039;, &#039;Hydroquinone&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as ingredients[0], ingredients[1]. For example, the acceptable attribute value input format for fields such as this is Vitamin C.

 
 instructions


Type: list of strings


 Information that describes how the item should be assembled, consumed, or used. Sample values: Spray directly on floors and then wipe away with a damp mop, Dilute a bit of the all purpose cleaner in water and use the solution to mop your floors.


 
- To provide multiple values using a single feed instructions field, the acceptable input format is &#039;Spray directly on floors and then wipe away with a damp mop&#039;, &#039;Dilute a bit of the all purpose cleaner in water and use the solution to mop your floors&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as instructions[0], instructions[1]. For example, the acceptable attribute value input format for fields such as this is Spray directly on floors and then wipe away with a damp mop.

 
 life_stage


Type: string


 Life stage of a child. Sample values: Newborn, Infant, Toddler.


 maximum_weight


Type: string


 Upper weight limit or capability of an item, often used in conjunction with minimum_weight. The meaning varies with context of the product. For example, when used with minimum_weight, this attribute provides weight ranges for a range of products including pet medicine, baby carriers, and outdoor play structures. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 35 lb, 45 lb, 15 kg, 20 kg.


 minimum_weight


Type: string


 Lower weight limit or capability of an item, often used in conjunction with maximum_weight. The meaning varies with context of the product. For example, when used with maximum_weight, this attribute provides weight ranges for a range of products including pet medicine, baby carriers, and outdoor play structures. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 35 lb, 45 lb, 15 kg, 20 kg.


 product_form


Type: string


 Consistency, texture, or formulation of the item and the way it can be consumed or dispensed. Sample values: Oil, Gel, Spray, Cream, Powder, Serum, Liquid, Frozen, Granules, Liquid, Bars, Fresh, Whole, Stewed, Sliced, Chopped, Diced, Blended, Powders.


 scent


Type: list of strings


 Scent(s) or fragrance(s) of your item, including items labeled as "unscented". Multiple values accepted. Sample values: Lavender, Vanilla, Lemon, Coconut, Jasmine, Pine.


 
- To provide multiple values using a single feed scent field, the acceptable input format is &#039;Lavender&#039;, &#039;Vanilla&#039;, &#039;Lemon&#039;, &#039;Coconut&#039;, &#039;Jasmine&#039;, &#039;Pine&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as scent[0], scent[1]. For example, the acceptable attribute value input format for fields such as this is Lavender.

 
 stop_use_indications


Type: list of strings


 Information that describes symptoms or reactions that indicate when to stop taking medicine. Sample values: Stop using if you experience swelling, rash, or fever….


 theme


Type: string


 Particular subject, theme, or idea that your item represents or is associated with. Sample values: Space, Super Heroes, Automobiles.


 

## Learn More


 
- Home Decor & Furniture, Product Categories

- Jewelry & Watches, Product Categories

- Health & Beauty, Product Categories

- Clothing, Shoes & Accessories, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->
