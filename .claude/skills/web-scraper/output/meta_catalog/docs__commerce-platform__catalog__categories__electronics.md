# Electronics - Commerce Platform - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/commerce-platform/catalog/categories/electronics/

---

Electronics - Commerce Platform - Documentación - Meta for Developers - Commerce PlatformConcepts
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
 

# Electronics


 This category supports cell phones & smart watches, accessories, computers & tablets, video game consoles & video games, printers & scanners, TVs & monitors, projectors, and cameras.


For additional attributes, see cell phones & smart watches, accessories, computers & tablets, video game consoles & video games, printers & scanners, TVs & monitors, projectors, and cameras.


For Google Product Category mapping, see Electronics, Camera & Optics, and Software.


 

## Recommended Attributes


These recommended attributes are optional. See also Additional Attributes.


### Cell Phones & Smart Watches


 Attribute and Type Description color


Type: list of strings


 Primary color(s) of your item. Sample values: Beige, Black, Blue, Bronze, Brown, Gold, Gray.


 
- To provide multiple values using a single feed color field, the acceptable input format is &#039;Beige&#039;, &#039;Black&#039;, &#039;Blue&#039;, &#039;Bronze&#039;, &#039;Brown&#039;, &#039;Gold&#039;, &#039;Gray&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as color[0], color[1]. For example, the acceptable attribute value input format for fields, such as Beige.

 
 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 model


Type: string


 Common name of the product model. Does not include model numbers. Sample values: iPhone 6, Galaxy S8.


 operating_system


Type: string


 Type of preloaded operating system software installed on the device. Sample values: Android, iOS, Windows.


 screen size


Type: string


 Measurement of the device&#039;s screen, typically measured diagonally. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in, 100 cm.


 storage_capacity


Type: string


 Amount of storage space on the item&#039;s hard drive, typically measured in megabytes, gigabytes, or terabytes. The first part is the number. The second part is one of the accepted units: KB, MB, GB, TB. Sample values: 1 TB, 16 GB.


 For additional attributes, see Cell Phones & Smart Watches.


 

### Accessories


 Attribute and Type Description color


Type: list of strings


 Item color, described by the manufacturer. Sample values: Blue, White.


 
- To provide multiple values using a single feed color field, the acceptable input format is &#039;Blue&#039;, &#039;White&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as color[0], color[1]. For example, the acceptable attribute value input format for fields, such as Blue.

 
 compatible_devices


Type: list of strings


 Devices compatible with the item. Sample values: iPad, Tablet Computers, Windows Desktop Computers, Apple Computers.


 
- To provide multiple values using a single feed compatible_devices field, the acceptable input format is &#039;iPad&#039;, &#039;Tablet Computers&#039;, &#039;Windows Desktop Computers&#039;, &#039;Apple Computers&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as compatible_devices[0], compatible_devices[1]. For example, the acceptable attribute value input format for fields such as this is iPad.

 
 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 For additional attributes, see Accessories.


 

### Computers & Tablets


 Attribute and Type Description model


Type: string


 Common name of the product model. Does not include model numbers. Sample values: Lenovo, Thinkpad, Macbook Pro.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 operating_system


Type: string


 Type of preloaded operating system software installed on the device. Sample values: Android, iOS, Windows.


 screen size


Type: string


 Measurement of the device&#039;s screen, typically measured diagonally in inches. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in, 100 cm.


 storage_capacity


Type: string


 Amount of storage space on the item&#039;s hard drive, typically measured in megabytes, gigabytes, or terabytes. The first part is the number. The second part is one of the accepted units: KB, MB, GB, TB. Sample values: 1 TB, 16 GB.


 For additional attributes, see Computers & Tablets.


 

### Video Game Consoles & Video Games


 Attribute and Type Description model


Type: string


 Common name of the product model. Does not include model numbers. Sample values: Sony Playstation 4, Nintendo Wii, Microsoft Xbox 360.


 video_game_platform


Type: string


 Type of platform on which video game software is capable of running. Sample values: Xbox 360, Nintendo Wii, PC.


 age_group


Type: string


 Age group associated with the item. Sample values: adult, all ages, teen, kids, toddler, infant, newborn.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 For additional attributes, see Video Game Consoles & Video Games.


 

### Software


 Attribute and Type Description number_of_licenses


Type: integer


 Maximum number of users or installations allowed under the terms of the software licensing agreement. Sample values: 1, 3, 5.


 software_system_requirements


Type: list of strings


 Basic requirements (necessary of any system) to satisfactorily run the software. Sample values: Windows 7 or later, Intel Core 2 Duo 1.8 Ghz, 15 GB Free Hard Drive Space.


 
- To provide multiple values using a single feed software_system_requirements field, the acceptable input format is &#039;Windows 7 or later&#039;, &#039;Intel Core 2 Duo 1.8 Ghz&#039;, &#039;15 GB Free Hard Drive Space&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as software_system_requirements[0], software_system_requirements[1]. For example, the acceptable attribute value input format for fields such as this is Windows 7 or later.

 
 For additional attributes, see Software.


 

### Printers & Scanners


 Attribute and Type Description model


Type: string


 Common name of the product model. Does not include model numbers. Sample values: Lenovo Thinkpad, Macbook Pro.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 resolution


Type: integer


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_depth


Type: string


 Depth of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 For additional attributes, see Printers & Scanners.


 

### TVs & Monitors


 Attribute and Type Description display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: LED, LCD, OLED.


 resolution


Type: integer


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 screen_size


Type: integer


 Measurement of the device&#039;s screen, typically measured diagonally in inches. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 model


Type: string


 Common name of the product model. Does not include model numbers.


 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_depth


Type: string


 Depth of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 For additional attributes, see TVs & Monitors.


 

### Projectors


 Attribute and Type Description resolution


Type: integer


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: LED, LCD, OLED.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 model


Type: string


 Common name of the product model. Does not include model numbers.


 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_depth


Type: string


 Depth of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 2 ft, 2.5 ft, 40 cm, 60 cm.


 For additional attributes, see Projectors.


 

### Cameras


 Attribute and Type Description model


Type: string


 Common name of the product model. Does not include model numbers.


 brand


Type: string


 Brand name, unique manufacturer part number (MPN), or Global Trade Item Number (GTIN) of the item.


 digital_zoom


Type: number/float


 Magnification power provided by a feature that electronically enlarges the image area. Sample values must be numbers (containing only numerals or a decimal point). Measurement is multiples. Sample values: 6, 160, 200. Values, such as 20X or 20.4 MP, are rejected.


 megapixels


Type: number/float


 Resolution at which this item records images. Measured in megapixels (MP). Sample values: 16.0, 24.2.


 optical_zoom


Type: number/float


 Magnification power of a physical optical zoom lens. Measurement is multiples. Sample values: 10, 20, 24.


 For additional attributes, see Cameras.


 

## Additional Attributes


This category supports cell phones & smart watches, accessories, computers & tablets, video game consoles & video games, printers & scanners, TVs & monitors, projectors, and cameras.


For Google Product Category mapping, see Electronics, Camera & Optics, and Software.


### Cell Phones & Smart Watches


 Attribute and Type Description battery_life


Type: number/float


 Maximum run time or life of the item&#039;s battery, measured in hours. Sample values: 8, 12, 24.


 bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 cell_phone_service_provider


Type: string


 Describes the company that provides the phone&#039;s cellular service (if not unlocked). Sample values: Verizon, AT&T, Sprint.


 cellular_band


Type: string


 Describes the cellular band or network technology used by the device. Sample values: CDMA, GSM, LTE, EVDO.


 cellular_generation


Type: string


 Describes the communications network generation of the cell phone. Sample values: 3G,4G, 5G.


 connector_type


Type: list of strings


 Describes the types of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: OLED, LED, LCD.


 front_facing_camera_megapixel


Type: number/float


 Maximum resolution of the item&#039;s front facing camera, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample value: 24.


 material


Type: list of strings


 Primary material(s) of the item. Sample values: Rubber, Wood, Steel, Plastic.


 
- To provide multiple values using a single feed material field, the acceptable input format is &#039;Rubber&#039;, &#039;Wood&#039;, &#039;Steel&#039;, &#039;Plastic&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as material[0], material[1]. For example, the acceptable attribute value input format for fields such as this is Rubber.

 
 number_of_sim_card_slots


Type: integer


 Describes the number of SIM card slots designated for the product. Sample values: 1, 2.


 rear_facing_camera_megapixel


Type: integer


 Maximum resolution of the item&#039;s rear facing camera, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample value: 24.


 resolution


Type: integer


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 sim_type_supported


Type: list of strings


 Describes the type of SIM compatible with the product, such as Mini-SIM, Dual SIM. Multiple values accepted. Sample values: Standard SIM, Micro SIM, Nano SIM.


 
- To provide multiple values using a single feed sim_type_supported field, the acceptable input format is &#039;Standard SIM&#039;, &#039;Micro SIM&#039; &#039;Nano SIM&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as sim_type_supported[0], sim_type_supported[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 stand-by_time


Type: number/float


 Describes the total stand-by time in hours of the phone, typically measured in hours. Sample values: 12, 24.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: 35mm Jack, Bluetooth, GPS, SIM, Touch Screen, USB Connectivity, WLAN, Unlocked.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;35mm Jack&#039;, &#039;Bluetooth&#039;, &#039;GPS&#039;, &#039;SIM&#039;, &#039;Touch Screen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;Unlocked&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as 35mm Jack.

 
 talk_time


Type: number/float


 Describes the total talk time in hours of the phone, typically measured in hours. Sample values: 12, 20.


 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 video_resolution


Type: float


 Describes the resolution of the video recordings of the product. Measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample values: 2, 4, 24.


 watch_band_length


Type: string


 Length of the watch band. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 240 mm, 8.27 in.


 watch_band_material


Type: list of strings


 Primary material(s) from which the band of the watch is made. Sample values: Leather, Silicone, Stainless Steel.


 
- To provide multiple values using a single feed watch_band_material field, the acceptable input format is &#039;Leather&#039;, &#039;Silicone&#039; &#039;Stainless Steel&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as watch_band_material[0], watch_band_material[1]. For example, the acceptable attribute value input format for fields such as this is Leather.

 
 watch_band_width


Type: string


 Width of the watch band. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 22 mm, 0.87 in.


 watch_case_shape


Type: string


 Shape of the watch case or enclosure which contains the face and inner workings of the watch. Sample values: Round, Square, Tonneau, Cushion.


 watch_style


Type: string


 Style of the watch. Sample values: Wristwatch, Pocket Watch, Nursing Watch, Diving Watch, Military Watch.


 

### Accessories


 Attribute and Type Description cable_length


Type: string


 Total length of electronics cable. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 2 ft, 60 cm, 36 in.


 connector_type


Type: list of strings


 Types of connections supported for the item. Sample values: HDMI, RCS.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 headphone_features


Type: list of strings


 List features specific to headphones. Sample values: In-Ear, Over-Ear, On-Ear, Ear-Clip, Behind-the-Neck, Microphone, Memory Foam.


 
- To provide multiple values using a single feed headphone_features field, the acceptable input format is &#039;In-Ear&#039;, &#039;Over-Ear, &#039;On-Ear&#039;, &#039;Ear-Clip&#039;, &#039;Behind-the-Neck&#039;, &#039;Microphone&#039;, &#039;Memory Foam&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as headphone_features[0], headphone_features[1]. For example, the acceptable attribute value input format for fields such as this is In-Ear.

 
 material


Type: list of strings


 Primary material(s) of the item. Sample values: Rubber, Wood, Steel, Plastic.


 
- To provide multiple values using a single feed material field, the acceptable input format is &#039;Rubber&#039;, &#039;Wood&#039;, &#039;Steel&#039;, &#039;Plastic&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as material[0], material[1]. For example, the acceptable attribute value input format for fields such as this is Rubber.

 
 maximum_load_weight


Type: string


 Amount of weight that the TV/Monitor mount can support as certified by the manufacturer. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 45 lb, 20.5 kg.


 maximum_screen_size


Type: string


 Maximum size of the TV/Monitor that the mount can accommodate. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 55 in, 140 cm.


 minimum_screen_size


Type: string


 Minimum size of the TV/Monitor that the mount can accommodate. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 40 in, 101 cm.


 mount_type


Type: string


 Method by which the item is attached or anchored. Used for products, such as shelving and other fixtures. Sample values: Wall Mount, Ceiling Mount.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 45 lb, 120 lb, 54 kg, 80 kg.


 standard_features


Type: list of strings


 Standard features related to the item. Sample value: USB Connectivity.


 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 wireless_technologies


Type: list of strings


 Types of wireless technologies that the product can use. Sample values: Bluetooth, WiFi.


 
- To provide multiple values using a single feed wireless_technologies field, the acceptable input format is &#039;Bluetooth&#039;, &#039;WiFi&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as wireless_technologies[0], wireless_technologies[1]. For example, the acceptable attribute value input format for fields such as this is Bluetooth.

 
 

### Computers & Tablets


 Attribute and Type Description battery_life


Type: number/float


 Maximum run time or life of the item&#039;s battery, measured in hours. Sample values: 8, 12, 24.


 bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 computer_case_form_factor


Type: string


 One of the standard physical sizes to which the computer case conforms. Sample values: Full Tower, Mid Tower, Mini Tower, Slim Line, Small Form Factor.


 connector_type


Type: list of strings


 Type(s) of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 cpu_socket_type


Type: string


 Interface of, or required by, the central processing unit. Sample values: AM3, LGA 1150.


 display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: OLED, LED, LCD.


 front_facing_camera_megapixel


Type: number/float


 Maximum resolution of the item&#039;s front facing camera, in megapixels. Measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample value: 24.


 graphics_card_model


Type: string


 Model name of the graphics card included with the product. Sample values: Nvidia GeForce RTX 2080, AMD Radeon RX 590.


 hard_drive_type


Type: string


 Determins whether the hard drives of the product are internal or external. Sample values: Internal, External.


 maximum_supported_ram


Type: string


 Maximum amount of RAM memory that can be supported by the product. The first part is the number. The second part is one of the accepted units: KB, MB, GB, TB. Sample values: 16 GB, 1 TB.


 motherboard_form_factor


Type: string


 Describes one of the standard physical sizes to which the computer motherboard conforms. Sample values: ATX, Mini ATX, Micro ATX, Flex ATX, Mini ITX, DTX.


 optical_drive


Type: list of strings


 Type of optical drives included with the product. Sample values: CD ROM, CD RW, DVD ROM.


 
- To provide multiple values using a single feed optical_drive field, the acceptable input format is &#039;CD ROM&#039;, &#039;CD RW.

- To provide multiple values with one value per feed field, use feed field names, such as optical_drive[0], optical_drive[1]. For example, the acceptable attribute value input format for fields such as this is CD ROM.

 
 processor_speed


Type: integer


 Operational frequency of the computer&#039;s CPU. The first part is the number. The second part is one of the accepted units: Hz, KHz, MHz, GHz. Sample values: 3.00 GHz, 66 MHz.


 processor_type


Type: string


 Commonly used name of the computer&#039;s CPU. Sample values: Intel Core i7, ARM Coretex A7, AMD Ryzen 7.


 ram_memory


Type: string


 Amount of RAM memory preinstalled designated for the product. The first part is the number. The second part is one of the accepted units: KB, MB, GB, TB. Sample values: 16 GB, 1 TB.


 rear_facing_camera_megapixel


Type: number/float


 Maximum resolution of the item&#039;s rear facing camera, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample value: 24.


 resolution


Type: number


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: 35mm Jack, Bluetooth, Touch Screen, USB Connectivity, WLAN, Portable.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;35mm Jack&#039;, &#039;Bluetooth&#039;, &#039;GPS&#039;, &#039;SIM&#039;, &#039;Touch Screen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;Portable&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as 35mm Jack.

 
 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 video_resolution


Type: number/float


 Resolution of the video recordings of the product. Measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample values: 24.


 wireless_technologies


Type: list of strings


 Types of wireless technologies that the product can use. Sample values: Bluetooth, WiFi.


 
- To provide multiple values using a single feed wireless_technologies field, the acceptable input format is &#039;Bluetooth&#039;, &#039;WiFi&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as wireless_technologies[0], wireless_technologies[1]. For example, the acceptable attribute value input format for fields such as this is Bluetooth.

 
 

### Video Game Consoles & Video Games


 Attribute and Type Description battery_life


Type: number/float


 Maximum run time or life of the item&#039;s battery, measured in hours. Sample values: 8, 12, 24.


 bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 connector_type


Type: list of strings


 Type(s) of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed wireless_technologies field, the acceptable input format is &#039;Bluetooth&#039;, &#039;WiFi&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as wireless_technologies[0], wireless_technologies[1]. For example, the acceptable attribute value input format for fields such as this is Bluetooth.

 
 display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: OLED, LED, LCD.


 operating_system


Type: string


 Type of preloaded operating system software installed on the device. Sample values: Android, iOS, Windows.


 physical_media_format


Type: string


 Standard media format for the product. Sample value: CD, DVD, Blu-Ray.


 processor_speed


Type: string


 Operational frequency of the computer&#039;s CPU. Sample value: 3.00 GHz, 66 MHz.


 release_date


Type: string


 Specific date that marks when the product was made available for public distribution, provided in the format MM-DD-YYYY. Sample value: 9/19/2019.


 required_peripherals


Type: list of strings


 Any type of required accessory or peripheral necessary to operate the item (or play the video game). Sample values: PlayStation Move, Kinect, Wii Balance Board, Flatbed Scanner, Microphone.


 
- To provide multiple values using a single feed required_peripherals field, the acceptable input format is &#039;PlayStation Move&#039;, &#039;Kinect&#039;, &#039;Wii Balance Board&#039;, &#039;Flatbed Scanner&#039;, &#039;Microphone&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as required_peripherals[0],required_peripherals[1]. For example, the acceptable attribute value input format for fields such as this is PlayStation Move.

 
 resolution


Type: integer


 Resolution of the product screen, measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP.


 The value should include only a number, not a unit of measure; otherwise, it won&#039;t pass our validation.


 Sample values: 2, 4, 33.


 screen size


Type: string


 Measurement of the device&#039;s screen. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in, 100 cm.


 sport


Type: list of strings


 Particular sport or activity for which your item is intended. Sample Values: Tennis, Soccer, Hiking, Running, Yoga, Basketball.


 
- To provide multiple values using a single feed occasion field, the acceptable input format is &#039;Tennis&#039;, &#039;Soccer&#039;, &#039;Hiking&#039;, &#039;Running&#039;, &#039;Yoga&#039;, &#039;Basketball&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as sport[0], sport[1]. For example, the acceptable attribute value input format for fields such as this is Tennis.

 
 sports_league


Type: string


 Particular sports league that your item represents or is associated with. Sample Values: NFL, NBA, NASCAR.


 sports_team


Type: string


 Particular sports team that your item represents or is associated with. Sample Values: Golden State Warriors, San Francisco Giants.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: 35mm Jack, Bluetooth, Downloadable Content, Online Multiplayer, Touchscreen, USB Connectivity, WLAN, Portable.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;35mm Jack&#039;, &#039;Bluetooth&#039;, &#039;Downloadable Content&#039;, &#039;Online Multiplayer&#039;, &#039;Touchscreen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;Portable&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as 35mm Jack.

 
 storage_capacity


Type: string


 Amount of storage space on the item&#039;s hard drive, typically measured in megabytes, gigabytes, or terabytes. The first part is the number. The second part is one of the accepted units: KB, MB, GB, TB. Sample values: 1 TB, 16 GB.


 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 video_game_genre


Type: string


 Genre, style, or type of video game available for purchase. Sample values: Shooter, Role Playing, MMO, Racing.


 video_game_rating


Type: string


 Standard rating of the content of the video game. Can be important for violent games or games intended only for mature audiences. Sample values: E - Everyone, PEGI 12, T - Teen, PG.


 video_game_series


Type: string


 Name of the video game series this game belongs to. Sample values: Fallout, Grand Theft Auto, Call of Duty, Halo.


 video_resolution


Type: number/float


 Resolution of the video recordings of the product. Measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample values: 2, 4, 24.


 

### Software


 Attribute and Type Description age_group


Type: string


 Age group associated with the item. Sample values: adult, all ages, teen, kids, toddler, infant, newborn.


 educational_focus


Type: list of strings


 Describes what educational skill(s) the software is intended to improve. Sample values: Language, Math, Reading, Music.


 
- To provide multiple values using a single feed educational_focus field, the acceptable input format is &#039;Language&#039;, &#039;Math&#039;, &#039;Reading&#039;, &#039;Music.

- To provide multiple values with one value per feed field, use feed field names, such as educational_focus[0],educational_focus[1]. For example, the acceptable attribute value input format for fields such as this is Language.

 
 physical_media_format


Type: string


 Standard media format for the product. Sample values: CD, DVD, Blu-Ray.


 release_date


Type: string


 Specific date that marks when the product was made available for public distribution, provided in the format MM-DD-YYYY. Sample value: 9/19/2019.


 required_peripherals


Type: list of strings


 Any type of required accessory or peripheral necessary to operate the item (or play the video game). Sample values: PlayStation Move, Kinect, Wii Balance Board, Flatbed Scanner, Microphone.


 
- To provide multiple values using a single feed required_peripherals field, the acceptable input format is &#039;PlayStation Move&#039;, &#039;Kinect&#039;, &#039;Wii Balance Board&#039;, &#039;Flatbed Scanner&#039;, &#039;Microphone&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as required_peripherals[0],required_peripherals[1]. For example, the acceptable attribute value input format for fields such as this is PlayStation Move.

 
 software_category


Type: string


 General category of software to which the item is most closely associated with. Sample values: Antivirus & Security, Web & Desktop Publishing, Personal Finance, Tax & Legal, Operating Systems.


 software_version


Type: string


 Version number assigned to this specific release of the software. Sample values: 7.2, 10.1.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Orthopedic, Water Resistant.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Water Resistant&#039;, &#039;Orthopedic&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. The acceptable attribute value input format for fields, such as Water Resistant.

 
 

### Printers & Scanners


 Attribute and Type Description bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 color_pages_per_minute


Type: number/float


 Number of color pages that the imaging device is able to produce per minute. Sample values: 12, 23.


 connector_type


Type: list of strings


 Type of connection(s) supported on the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 monochrome_pages_per_minute


Type: number/float


 Number of monochrome pages that the imaging device is able to produce per minute. Sample values: 50, 36.


 monochrome_color


Type: string


 Determines if the imaging device is capable of color processing or monochrome only. Sample values: Monochrome, Color.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Auto Document Feeder, Auto Two-Sided Printing, Bluetooth, Touchscreen, USB Connectivity, WLAN, Portable, Energy Star Certified.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Auto Document Feeder&#039;, &#039;Auto Two-Sided Printing&#039;, &#039;Bluetooth&#039;, &#039;Touchscreen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;Portable&#039;, &#039;Energy Star Certified&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as Auto Document Feeder.

 
 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 

### TVs & Monitors


 Attribute and Type Description bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 aspect_ratio


Type: string


 Relationship between the product&#039;s width and its height. Sample values: 4:3, 16:9.


 audio_features


Type: list of strings


 Describes whether the product has certain special audio features. Sample values: Surround Sound, Noise Cancelling, High Fidelity.


 
- To provide multiple values using a single feed audio_features field, the acceptable input format is &#039;Surround Sound&#039;, &#039;Noise Cancelling&#039;, &#039;High Fidelity&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as audio_features[0],audio_features[1]. For example, the acceptable attribute value input format for fields such as this is Surround Sound.

 
 audio_power_output


Type: float


 Power of the audio output of the device&#039;s speakers, measured in watts. Sample values: 5, 7.5.


 backlight_technology


Type: float


 Power of the audio output of the device&#039;s speakers, measured in watts. Sample values: 5, 7.5.


 bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 connector_type


Type: list of strings


 Type(s) of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 is_assembly_required


Type: boolean


 Indicates if the product arrives unassembled and must be put together before use. Sample values: Yes, No.


 maximum_contrast_ratio


Type: string


 Ratio between the luminance of the brightest color to that of the darkest color capable of being displayed. Sample values: 20,000:1, 30,000,000:1.


 number_of_hdmi_ports


Type: integer


 Number of HDMI ports on the television or monitor. Sample values: 3,5, 8.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 5 lb, 3 kg.


 refresh_rate


Type: number/float


 Refresh rate of the display. This measures the number of times the picture is updated per second, measured in Hz. The first part is the number. The second part is one of the accepted units: Hz, KHz, MHz, GHz. Sample values: 60 Hz, 120 Hz.


 response_time


Type: number/float


 Amount of time it takes for the pixels in a display to change, measured in milliseconds (ms). Sample values: 5, 2.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: Auto Document Feeder, Auto Two-Sided Printing, Bluetooth, Touchscreen, USB Connectivity, WLAN, Portable, Energy Star Certified.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;Auto Document Feeder&#039;, &#039;Auto Two-Sided Printing&#039;, &#039;Bluetooth&#039;, &#039;Touchscreen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;Portable&#039;, &#039;Energy Star Certified&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as Auto Document Feeder.

 
 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 vesa_mounting_standard


Type: string


 VESA Standard defines the distance in millimeters between the four mounting holes on the back of a TV (distance horizontally x distance vertically). Sample values: 200 x 200, 400 x 400, 600 x 400.


 wireless_technologies


Type: list of strings


 Types of wireless technologies that the product can use. Sample values: Bluetooth, WiFi.


 
- To provide multiple values using a single feed wireless_technologies field, the acceptable input format is &#039;Bluetooth&#039;, &#039;WiFi&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as wireless_technologies[0], wireless_technologies[1]. For example, the acceptable attribute value input format for fields such as this is Bluetooth.

 
 

### Projectors


 Attribute and Type Description bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 aspect_ratio


Type: string


 Relationship between the product&#039;s width and its height. Sample values: 4:3, 16:9.


 audio_features


Type: list of strings


 Describes whether the product has certain special audio features. Sample values: Surround Sound, Noise Cancelling, High Fidelity.


 
- To provide multiple values using a single feed audio_features field, the acceptable input format is &#039;Surround Sound&#039;, &#039;Noise Cancelling&#039;, &#039;High Fidelity&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as audio_features[0],audio_features[1]. For example, the acceptable attribute value input format for fields such as this is Surround Sound.

 
 audio_power_output


Type: number/float


 Power of the audio output of the device&#039;s speakers, measured in watts. Sample values: 5, 7.5.


 backlight_technology


Type: string


 Power of the audio output of the device&#039;s speakers, measured in watts. Sample values: 5, 7.5.


 bluetooth_technology


Type: string


 Describes the version type of the compatible bluetooth. Sample values: Bluetooth 4.0.


 brightness


Type: number/float


 Brightness per bulb measured in lumens. Sample values: 2000, 5000.


 connector_type


Type: list of strings


 Type(s) of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 is_assembly_required


Type: boolean


 Indicates if the product arrives unassembled and must be put together before use. Sample values: Yes, No.


 lamp_life


Type: number/float


 Expected life of the projection lamp in hours. Sample values: 6500, 10000.


 maximum_contrast_ratio


Type: string


 Ratio between the luminance of the brightest color to that of the darkest color capable of being displayed. Sample values: 20,000:1, 30,000,000:1.


 product_weight


Type: string


 Weight of the fully assembled product. The first part is the number. The second part is one of the accepted units: mg, g, kg, oz, lb. Sample values: 5 lb, 3 kg.


 refresh_rate


Type: float


 Refresh rate of the display. This measures the number of times the picture is updated per second, measured in Hz. The first part is the number. The second part is one of the accepted units: Hz, KHz, MHz, GHz. Sample values: 60 Hz, 120 Hz.


 response_time


Type: float


 Amount of time it takes for the pixels in a display to change, measured in milliseconds (ms). Sample values: 5, 2.


 screen_size


Type: string


 Measurement of the device&#039;s screen, typically measured diagonally in inches. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in.


 standard_features


Type: list of strings


 Standard features related to the item. Sample values: 35mm Jack, Bluetooth, Integrated Speakers, Touchscreen, USB Connectivity, WLAN, 3D, Energy Star Certified, Portable, Smart.


 
- To provide multiple values using a single feed standard_features field, the acceptable input format is &#039;35mm Jack&#039;, &#039;Bluetooth&#039;, &#039;Integrated Speakers&#039;, &#039;Touchscreen&#039;, &#039;USB Connectivity&#039;, &#039;WLAN&#039;, &#039;3D&#039;, &#039;Energy Star Certified&#039;, &#039;Portable&#039;, &#039;Smart&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as standard_features[0], standard_features[1]. For example, the acceptable attribute value input format for fields, such as 35mm Jack.

 
 throw_ratio


Type: string


 Number of times your monitor updates with new images each second. Sample values: 1.8:1, 2.0:1.


 usb_technology


Type: string


 Describes the version of USB technology designated for the product. Sample values: USB 2.0, USB 3.0.


 usb_type


Type: string


 Describes the type of USB connector designated for the product. Sample values: USB-C, Micro USB.


 video_resolution


Type: float


 Describes the resolution of the video recordings of the product. Measured in megapixels (MP). 1080p is 2 MP, UHD and 4K is 8 MP. Sample values: 24.


 wireless_technologies


Type: list of strings


 Types of wireless technologies that the product can use. Sample values: Bluetooth, WiFi.


 
- To provide multiple values using a single feed wireless_technologies field, the acceptable input format is &#039;Bluetooth&#039;, &#039;WiFi&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as wireless_technologies[0], wireless_technologies[1]. For example, the acceptable attribute value input format for fields such as this is Bluetooth.

 
 

### Cameras


 Attribute and Type Description battery_life


Type: integer


 Maximum run time or life of the item&#039;s battery, measured in hours. Sample values: 8, 12, 24.


 compatible_devices


Type: list of strings


 Devices compatible with the item. Sample values: iPad, Tablet Computers, Windows Desktop Computers, Apple Computers.


 
- To provide multiple values using a single feed compatible_devices field, the acceptable input format is &#039;iPad&#039;, &#039;Tablet Computers&#039;, &#039;Windows Desktop Computers&#039;, &#039;Apple Computers&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as compatible_devices[0], compatible_devices[1]. For example, the acceptable attribute value input format for fields such as this is iPad.

 
 connector_type


Type: list of strings


 Type(s) of connections supported for the item. Sample values: HDMI, RCA.


 
- To provide multiple values using a single feed connector_type field, the acceptable input format is &#039;HDMI&#039;, &#039;RCA.

- To provide multiple values with one value per feed field, use feed field names, such as connector_type[0], connector_type[1]. For example, the acceptable attribute value input format for fields such as this is HDMI.

 
 display_technology


Type: string


 Type of technology that powers the display, such as LED or LCD. Sample values: OLED, LED, LCD.


 flash_type


Type: string


 Type of flash the camera has or can accommodate. Sample values: Built-in Camera, Hammerhead Flash, Macro Ring Light Flash, Pop-up Flash.


 focal_length


Type: number/float


 On a camera or lens, the distance between the image sensor and the lens when the subject is in focus, usually stated as a range in millimeters. Sample values: 18.


 focal_ratio


Type: string


 Ratio of the lens&#039;s focal length, to the diameter of the entrance pupil. Also known as the "f-number" or "f-stop", this number indicates lens speed. Sample values: f/5, f/6.


 lens_coating


Type: list of strings


 Type of thin layer of material applied to the surface of lenses or other optical elements that provide specific effects. Multiple values accepted. Sample values: Scratch-Resistant, Mirrored&#039;, Dielectric.


 
- To provide multiple values using a single feed lens_coating field, the acceptable input format is &#039;Scratch-Resistant&#039;, &#039;Mirrored&#039;, &#039;Dielectric&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as lens_coating[0], lens_coating[1]. For example, the acceptable attribute value input format for fields such as this is Scratch-Resistant.

 
 lens_diameter


Type: number/float


 Measurement of the diameter of the front portion of the lens, measured in "mm". Sample values: 49, 52.


 lens_filter


Type: string


 Kind of filter attached to a lens. Sample values: Cooling, Graduated Neutral Density, Polarizing, UV.


 maximum_aperture


Type: string


 Size of the largest aperture this item accommodates; typically expressed in f-numbers. Sample values: f/1.4, f/6.


 maximum_shutter_speed


Type: number/float


 Maximum shutter speed of the item. Measured in 1/seconds. For 1/4000, specify 4000. Sample values: 4000.


 minimum_aperture


Type: string


 Smallest aperture this item accommodates; typically expressed in f-numbers. Sample values: f/16.


 minimum_shutter_speed


Type: float


 Minimum shutter speed of the item, measured in seconds. Sample values: 250.


 product_height


Type: string


 Height of the fully assembled product. This may be separate from the seat_height and seat_back_height attributes. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_length


Type: string


 Length of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 product_width


Type: string


 Width of the fully assembled product. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 5 in, 2 ft, 60 cm.


 screen size


Type: integer


 Measurement of the device&#039;s screen, typically measured diagonally in inches. The first part is the number. The second part is one of the accepted units: mm, cm, m, in, ft. Sample values: 42 in, 5.5 in, 100 cm.


 self-timer_delay


Type: number/float


 Length of time the self-timer allows before it takes a photo, measured in seconds. Sample values: 2, 10.


 sensor_resolution


Type: string


 One specification describing the smallest detectable incremental change of input parameter that can be detected in the output signal. For digital cameras, image sensor resolution is an important factor for image quality. Sample values: 1/2.3 in, 35.8 mm x 23.9 mm, 0.43 in, 1.69 in (units can be represented in megapixels, dots per square, pixels per inch, and so on).


 shooting_modes


Type: list of strings


 Available settings designed to accommodate different photographic situations. Sample values: Portrait, Landscape, Close Up, xfs, No Flash, Burst.


 
- To provide multiple values using a single feed shooting_modes field, the acceptable input format is &#039;Portrait&#039;, &#039;Landscape&#039;, &#039;Close Up&#039;, &#039;xfs&#039;, &#039;No Flash&#039;, &#039;Burst&#039;.

- To provide multiple values with one value per feed field, use feed field names, such as shooting_modesg[0], shooting_modes[1]. For example, the acceptable attribute value input format for fields such as this is Portrait.

 
 

## Learn More


 
- Clothing & Accessories, Product Categories

- Home, Product Categories

- Jewelry & Watches, Product Categories

- Health & Beauty, Product Categories

- Baby Products, Product Categories

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
