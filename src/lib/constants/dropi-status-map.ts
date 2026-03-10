/**
 * Maps Dropi webhook statuses to our internal order statuses
 */
export const DROPI_STATUS_MAP: Record<
  string,
  { paymentStatus?: string; shipmentStatus: string }
> = {
  PENDIENTE: { shipmentStatus: "unfulfilled" },
  GUIA_GENERADA: { shipmentStatus: "unfulfilled" },
  EN_BODEGA: { shipmentStatus: "unfulfilled" },
  ENVIADO: { shipmentStatus: "shipping" },
  ENTREGADO: { paymentStatus: "paid", shipmentStatus: "delivered" },
  DEVUELTO: { shipmentStatus: "returned" },
  CANCELADO: { shipmentStatus: "returned" },
};

export const DROPI_BASE_URLS = {
  test: "https://test-api.dropi.co/integrations",
  production: "https://api.dropi.co/integrations",
} as const;

// Per-country Dropi API base URLs
export const DROPI_COUNTRY_URLS: Record<string, string> = {
  CO: "https://api.dropi.co/integrations",
  EC: "https://api.dropi.ec/integrations",
  PE: "https://api.dropi.pe/integrations",
  MX: "https://api.dropi.mx/integrations",
  PA: "https://api.dropi.pa/integrations",
  CL: "https://api.dropi.cl/integrations",
  PY: "https://api.dropi.com.py/integrations",
  AR: "https://api.dropi.ar/integrations",
  GT: "https://api.dropi.gt/integrations",
  CR: "https://api.dropi.cr/integrations",
};

export const DROPI_RETRYABLE_CODES = [429, 500, 502, 503, 504];
export const DROPI_NON_RETRYABLE_CODES = [400, 401, 403, 404, 422];
export const DROPI_RETRY_DELAYS = [5000, 15000, 30000]; // ms
