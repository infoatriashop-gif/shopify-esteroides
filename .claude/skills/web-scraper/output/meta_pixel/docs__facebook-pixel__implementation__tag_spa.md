# Tagging SPAs - Píxel de Meta - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/facebook-pixel/implementation/tag_spa

---

Tagging SPAs - Píxel de Meta - Documentación - Meta for Developers - Píxel de MetaGet Started
- Guías
- Support
- Referencia
 

# Meta Pixel Implementation for Single Page Applications


Single Page Applications (SPA) does not require a page to be reloaded when the URL changes therefore a different approach to event tracking with the Meta Pixel has to be followed.


### Requirements


 
- The Pixel&#039;s base code must already be installed on the webpage where you will be tracking events.

 

Note: You can set disablePushState to true to stop sending PageView events on history state changes but it is not recommended.


 

## Track a an Action


Track a specific area where an action it taking place using the History State API. There is no one one-size fits all solution to this as it highly depends on the framework and the implementation details. The general idea is to track the event whenever there is a URL change in the SPA. Hooking it into the routing system of the framework or application is required.


#### Example Code


 ...
<body>
 <ul id="menu" class="clearfix">
 <li><a href="link1">Link 1</a></li> //Link to ViewContent
 <li><a href="link2">Link 2</a></li> //Link to AddPaymentInfo
 <li><a href="link3">Link 3</a></li> //Link to CompleteRegistration
 </ul>
...
 <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js"></script> 
 <script>
 (function($) &#123;
 var loadContent = function(href) &#123; // Simulates an AJAX call to the server to grab new content
 $.ajax(href + ".html", &#123;
 success: function(data) &#123;
 history.pushState(&#123; &#039;url&#039;: href &#125;, &#039;New URL: &#039; + href, href); // Called to the the URL on link click
 $(&#039;#content&#039;).html(data + new Date());

 var eventname = null; //Optional Section - Demonstrates that additional 
 switch (href) &#123; // events can be tracked on particular path changes
 case &#039;link1&#039;:
 eventname = &#039;ViewContent&#039;;
 break;
 case &#039;link2&#039;:
 eventname = &#039;AddPaymentInfo&#039;;
 break;
 case &#039;link3&#039;:
 eventname = &#039;CompleteRegistration&#039;;
 break;
 default:
 &#125;

 fbq(&#039;track&#039;, eventname) //Tracking event function is called
 &#125;,
 error: function() &#123;
 console.log(&#039;An error occurred&#039;);
 &#125;
 &#125;);
 &#125;;

 var init = function() &#123;
 $(&#039;#menu a&#039;).click(function(e) &#123;
 e.preventDefault();
 loadContent($(this).attr("href"));
 &#125;);
 &#125;;

 $(document).ready(function() &#123;
 init();
 &#125;);
 &#125;)(jQuery);
 </script>
</body>
... 

## Learn More


 
- Visit Google&#039;s Tag Manager documentation to track events using a tag manager

- Debug using DataLayer plugins or the Meta Pixel Helper to see event tracking

 
 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 


 

 
 -->
