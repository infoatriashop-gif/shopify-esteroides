# General Data Protection Regulation - Píxel de Meta - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/facebook-pixel/implementation/gdpr

---

General Data Protection Regulation - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# General Data Protection Regulation


The General Data Protection Regulation (GDPR) creates consistent data protection rules across Europe. It applies to companies (regardless of where they are based) who process personal data about individuals in the EU.


While many of the principles build on current EU data protection rules, the GDPR has a wider scope, more prescriptive standards and substantial fines. For example, it requires a higher standard of consent for using some types of data and broadens individuals&#039; rights with respect to accessing and porting their data.


Businesses who advertise with the Facebook companies can continue to use Facebook platforms and solutions in the same way they do today. Each company is responsible for ensuring their own compliance with the GDPR, just as they are responsible for compliance with the laws that apply to them today.


## Cookie Consent


Businesses may want to implement code that creates a banner and requires affirmative consent (for example, an “I agree” checkbox at the top of the page) to use the Pixel. If you already have a system in place that addresses this need, such as a tag manager, you can make this code optional.


Use the following API to pause sending Pixel fires to Facebook, and once cookie consent is granted, send Pixel fires to Facebook. You need to call revoke on every page.


fbq(&#039;consent&#039;, &#039;revoke&#039;);
fbq(&#039;consent&#039;, &#039;grant&#039;);For example:


// Revoke consent before &#039;init&#039; is called
fbq(&#039;consent&#039;, &#039;revoke&#039;);
fbq(&#039;init&#039;, &#039;<your pixel ID>&#039;);
fbq(&#039;track&#039;, &#039;PageView&#039;);// Once affirmative consent has been granted
fbq(&#039;consent&#039;, &#039;grant&#039;);See our Cookie Policy for details about the cookies used and the data received. The Meta Pixel receives these types of data:


 
- Http Headers – Anything that is generally present in HTTP headers, a standard web protocol sent between any browser request and any server on the internet. This information may include data like IP addresses, information about the web browser, page location, document, referrer and person using the website.

- Pixel-specific Data – Includes Pixel ID and the Facebook Cookie.

- Button Click Data – Includes any buttons clicked by site visitors, the labels of those buttons and any pages visited as a result of the button clicks.

- Optional Values – Developers and marketers can optionally choose to send additional information about the visit through conversion tracking. Example custom data events are conversion value, page type, and more.

- Form Field Names – Includes website field names like ‘email’, ‘address’, ‘quantity’ for when you purchase a product or service. We don&#039;t capture field values unless you include them as part of Advanced Matching, or conversion tracking.

 
 

## Learn more


 
- Advertiser Help

- Facebook&#039;s GDPR microsite

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
