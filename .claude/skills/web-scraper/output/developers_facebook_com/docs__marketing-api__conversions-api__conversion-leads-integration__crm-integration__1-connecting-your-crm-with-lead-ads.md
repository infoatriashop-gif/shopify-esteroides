# 1: Conectar tu CRM para descargar clientes potenciales - API de conversiones - Documentación - Meta for Developers

> Source: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration/crm-integration/1-connecting-your-crm-with-lead-ads

---

1: Conectar tu CRM para descargar clientes potenciales - API de conversiones - Documentación - Meta for Developers - API de conversionesEmpezar
- Uso de la API
- Verificación de la configuración
- Parámetros
- Biblioteca del administrador de parámetros
- API de conversiones para eventos de la app
- API de conversiones para eventos offline
- API de conversiones para mensajes comerciales
- Integración de clientes potenciales de conversión
- Dataset Quality API
- Manejo de eventos duplicados
- Guías
- Asistente de carga
- Prácticas recomendadas
- Solución de problemas
 Volver al documento en español Se actualizó este documento.
La traducción en español no está disponible todavía. Actualización del documento en inglés: 8 dic. 2025 
Actualización del documento en español: 4 abr. 2025 

# 1: Connecting Your CRM to Download Leads


This guide will help you connect your customer relationship management (CRM) system and ensure it is downloading your leads from Meta.


 

## Connect your CRM to Meta


As mentioned in the introduction, this guide assumes that you already have an integration to automatically download your leads from Meta to your CRM system (highlighted in green in the figure below). This section will provide an overview of the Meta to CRM integration methods for Lead Ads. For each of these integration methods, ensure that the 15-17 digit Meta Lead ID is included in the downloaded data. Refer to About CRM System Integrations for Lead Ads for more information.


 

### Partner integrations


Learn how to integrate your CRM with Meta to optimize the quality of your lead ads. 
 
 
 This is a good method to download your leads data if your CRM system or third-party vendor is supported. You can check if your preferred partner is supported by searching the Available CRM System Integrations for Lead Ads help center article.

 - Follow the directions in the Available CRM System Integrations for Lead Ads help center article or the general directions in the Connect Your CRM System to Facebook help center article.
- If you decide to remove or change partner integrations for any reason, follow the directions in the Remove Your CRM System Integration from Facebook help center article.
 

### Webhooks Custom Integration


You may also create a custom Webhooks integration to automatically receive new leads if your CRM system is not supported or you would prefer more control over the integration. Developer resources will be required for this method.


This method will require your developer to create a Webhook endpoint, a Meta developer app ID, and a subscription to your app, then link it to your Page.


Refer to the Webhooks CRM integration guide for more information on implementing this method. You can also refer to the Lead Ads Webhook code sample on GitHub to get started.


### Graph API Bulk Read


Similarly as with Webhooks, you can use the Graph API to download leads from Meta. Developer resources will be required for this method.


The main difference between the two integrations is that Webhooks is a push/pull method that can give you leads close to real time, whereas the Graph API bulk read is a pull method that will give you lead data upon a call from your code. There are also rate limits for these API calls.

Refer to the Retrieving Leads: Bulk Read documentation for more information on implementing this method.


### Manual Download (not recommended)


This method is not recommended, especially if you have a CRM system and are intending to implement a CRM integration to upload events. However, this could be used as a temporary solution if any of the previous methods have issues.


 ← Anterior Introduction → Siguiente Getting Started With the CRM 


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 


 

 


 
 -->
