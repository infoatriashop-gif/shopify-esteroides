import { DROPI_BASE_URLS, DROPI_COUNTRY_URLS, DROPI_RETRY_DELAYS } from "@/lib/constants/dropi-status-map";
import { hasDatabase, getDb } from "@/lib/db";
import { dropiOrderSync } from "@/lib/db/schema";
import { eq, and, lt } from "drizzle-orm";
import { readStore, writeStore } from "@/lib/services/store";

export type DropiSettings = {
  enabled: boolean;
  environment: string;
  apiKey: string;
  autoSync: boolean;
  countryCode?: string;
};

type DropiResponse = {
  isSuccess: boolean;
  message?: string;
  objects?: unknown;
};

type DropiOrderPayload = {
  total_order: number;
  notes: string;
  name: string;
  surname: string;
  dir: string;
  country: string;
  state: string;
  city: string;
  phone: string;
  client_email: string;
  payment_method_id: number;
  status: string;
  type: string;
  rate_type: string;
  products: { id: number; name: string; quantity: number; stock: number; price: number }[];
  calculate_costs_and_shiping: boolean;
  shop_order_id: number;
  create_product_if_not_exist: boolean;
};

export type DropiSyncRecord = {
  orderId: number;
  orderNumber: string;
  dropiOrderId: number | null;
  status: "pending" | "sent" | "failed";
  requestPayload: string;
  responsePayload: string | null;
  errorMessage: string | null;
  retryCount: number;
  lastAttempt: string;
  createdAt: string;
};

export type DropiLogEntry = {
  timestamp: string;
  method: string;
  endpoint: string;
  statusCode?: number;
  success: boolean;
  message?: string;
  durationMs: number;
};

async function getSettings(): Promise<DropiSettings> {
  const allSettings = await readStore<Record<string, DropiSettings>>("settings", {} as Record<string, DropiSettings>);
  return allSettings.dropi || { enabled: false, environment: "production", apiKey: "", autoSync: true, countryCode: "CO" };
}

function getBaseUrl(settings: DropiSettings): string {
  if (settings.environment === "test") return DROPI_BASE_URLS.test;
  const countryCode = settings.countryCode || "CO";
  return DROPI_COUNTRY_URLS[countryCode] || DROPI_BASE_URLS.production;
}

async function logApiCall(entry: DropiLogEntry): Promise<void> {
  const logs = await readStore<DropiLogEntry[]>("dropi-logs", []);
  logs.push(entry);
  // Keep last 500 logs
  if (logs.length > 500) logs.splice(0, logs.length - 500);
  await writeStore("dropi-logs", logs);
}

async function dropiRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT",
  body?: unknown,
  settings?: DropiSettings
): Promise<DropiResponse & { statusCode?: number }> {
  const config = settings || await getSettings();
  const baseUrl = getBaseUrl(config);
  const url = `${baseUrl}${endpoint}`;
  const start = Date.now();

  const headers: Record<string, string> = {
    "Content-Type": "application/json;charset=UTF-8",
    "dropi-integration-key": config.apiKey,
  };

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    const duration = Date.now() - start;

    await logApiCall({
      timestamp: new Date().toISOString(),
      method, endpoint,
      statusCode: res.status,
      success: data.isSuccess ?? res.ok,
      message: data.message,
      durationMs: duration,
    });

    return { ...data, statusCode: res.status } as DropiResponse & { statusCode?: number };
  } catch (err) {
    const duration = Date.now() - start;
    await logApiCall({
      timestamp: new Date().toISOString(),
      method, endpoint,
      success: false,
      message: err instanceof Error ? err.message : "Network error",
      durationMs: duration,
    });
    throw err;
  }
}

async function dropiRequestWithRetry(
  endpoint: string,
  method: "GET" | "POST" | "PUT",
  body?: unknown
): Promise<DropiResponse> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= DROPI_RETRY_DELAYS.length; attempt++) {
    try {
      const res = await dropiRequest(endpoint, method, body);
      if (res.isSuccess) return res;
      const shouldRetry = attempt < DROPI_RETRY_DELAYS.length;
      if (!shouldRetry) return res;
      await new Promise((r) => setTimeout(r, DROPI_RETRY_DELAYS[attempt]));
    } catch (err) {
      lastError = err;
      if (attempt < DROPI_RETRY_DELAYS.length) {
        await new Promise((r) => setTimeout(r, DROPI_RETRY_DELAYS[attempt]));
      }
    }
  }
  return { isSuccess: false, message: lastError instanceof Error ? lastError.message : "Error después de reintentos" };
}

// ─── PUBLIC API ────────────────────────────────────────────────

export async function testConnection(settings?: DropiSettings): Promise<{
  success: boolean;
  message: string;
  userInfo?: unknown;
}> {
  try {
    const config = settings || await getSettings();
    if (!config.apiKey) return { success: false, message: "No hay API Key configurada" };

    const res = await dropiRequest("/products/index", "POST", { page: 1, perpage: 1 }, config);

    if (res.isSuccess) {
      return { success: true, message: "Conexión exitosa con Dropi", userInfo: res.objects };
    }

    if (res.statusCode === 401) {
      const ipInfo = (res as unknown as Record<string, string>).ip ? ` IP del servidor: ${(res as unknown as Record<string, string>).ip}` : "";
      return { success: false, message: `Integration Key inválida o acceso denegado.${ipInfo} Verifica que la key sea correcta en Dropi → Mis Integraciones.` };
    }

    return { success: false, message: res.message || "Error de autenticación con Dropi" };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : "Error de conexión con Dropi" };
  }
}

export async function sendOrderToDropi(order: {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  department: string;
  city: string;
  address: string;
  notes: string;
  productName: string;
  productId: number;
  quantity: number;
  total: number;
  countryCode?: string;
}): Promise<{ success: boolean; dropiOrderId?: number; message?: string }> {
  const settings = await getSettings();
  if (!settings.enabled || !settings.apiKey) {
    return { success: false, message: "Dropi no está habilitado o falta API Key" };
  }

  const nameParts = order.customerName.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || firstName;

  const payload: DropiOrderPayload = {
    total_order: order.total,
    notes: order.notes || "",
    name: firstName,
    surname: lastName,
    dir: order.address,
    country: order.countryCode || settings.countryCode || "CO",
    state: order.department.toUpperCase(),
    city: order.city.toUpperCase(),
    phone: order.customerPhone,
    client_email: order.customerEmail || "",
    payment_method_id: 1,
    status: "PENDIENTE CONFIRMACION",
    type: "FINAL_ORDER",
    rate_type: "CON RECAUDO",
    products: [{
      id: order.productId,
      name: order.productName,
      quantity: order.quantity,
      stock: 100,
      price: Math.round(order.total / order.quantity),
    }],
    calculate_costs_and_shiping: true,
    shop_order_id: order.id,
    create_product_if_not_exist: true,
  };

  if (hasDatabase()) {
    const db = getDb();

    // Insert initial sync record
    const [syncRow] = await db
      .insert(dropiOrderSync)
      .values({
        orderId: order.id,
        dropiOrderId: null,
        status: "pending",
        requestPayload: payload as unknown as Record<string, unknown>,
        retryCount: 0,
        createdAt: new Date(),
      })
      .returning();

    try {
      const res = await dropiRequestWithRetry("/orders/myorders", "POST", payload);

      if (res.isSuccess && res.objects) {
        const dropiOrderId = typeof res.objects === "object" && res.objects !== null && "id" in res.objects
          ? (res.objects as { id: number }).id : null;

        await db
          .update(dropiOrderSync)
          .set({
            status: "synced",
            dropiOrderId,
            responsePayload: res as unknown as Record<string, unknown>,
            syncedAt: new Date(),
          })
          .where(eq(dropiOrderSync.id, syncRow.id));

        return { success: true, dropiOrderId: dropiOrderId ?? undefined, message: "Orden enviada a Dropi exitosamente" };
      }

      await db
        .update(dropiOrderSync)
        .set({
          status: "failed",
          errorMessage: res.message || "Error desconocido",
          responsePayload: res as unknown as Record<string, unknown>,
        })
        .where(eq(dropiOrderSync.id, syncRow.id));

      return { success: false, message: res.message || "Error al enviar orden a Dropi" };
    } catch (err) {
      await db
        .update(dropiOrderSync)
        .set({
          status: "failed",
          errorMessage: err instanceof Error ? err.message : "Error de conexión",
        })
        .where(eq(dropiOrderSync.id, syncRow.id));

      return { success: false, message: err instanceof Error ? err.message : "Error de conexión con Dropi" };
    }
  }

  // JSON fallback
  const syncRecords = await readStore<DropiSyncRecord[]>("dropi-sync", []);
  const syncRecord: DropiSyncRecord = {
    orderId: order.id,
    orderNumber: order.orderNumber,
    dropiOrderId: null,
    status: "pending",
    requestPayload: JSON.stringify(payload),
    responsePayload: null,
    errorMessage: null,
    retryCount: 0,
    lastAttempt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  try {
    const res = await dropiRequestWithRetry("/orders/myorders", "POST", payload);
    syncRecord.responsePayload = JSON.stringify(res);
    syncRecord.lastAttempt = new Date().toISOString();

    if (res.isSuccess && res.objects) {
      const dropiOrderId = typeof res.objects === "object" && res.objects !== null && "id" in res.objects
        ? (res.objects as { id: number }).id : null;

      syncRecord.status = "sent";
      syncRecord.dropiOrderId = dropiOrderId;
      syncRecords.push(syncRecord);
      await writeStore("dropi-sync", syncRecords);
      return { success: true, dropiOrderId: dropiOrderId ?? undefined, message: "Orden enviada a Dropi exitosamente" };
    }

    syncRecord.status = "failed";
    syncRecord.errorMessage = res.message || "Error desconocido";
    syncRecords.push(syncRecord);
    await writeStore("dropi-sync", syncRecords);
    return { success: false, message: res.message || "Error al enviar orden a Dropi" };
  } catch (err) {
    syncRecord.status = "failed";
    syncRecord.errorMessage = err instanceof Error ? err.message : "Error de conexión";
    syncRecords.push(syncRecord);
    await writeStore("dropi-sync", syncRecords);
    return { success: false, message: err instanceof Error ? err.message : "Error de conexión con Dropi" };
  }
}

export async function fetchDropiProducts(page = 0, pageSize = 20, keywords = ""): Promise<{
  success: boolean;
  products?: unknown[];
  message?: string;
}> {
  try {
    const res = await dropiRequest("/products/index", "POST", {
      startData: page * pageSize, pageSize,
      order_type: "desc", order_by: "id",
      keywords, active: true, no_count: true,
      integration: true, get_stock: false,
      userVerified: true, stockmayor: 1, notNulldescription: true,
    });

    if (res.isSuccess && Array.isArray(res.objects)) {
      return { success: true, products: res.objects };
    }
    return { success: false, message: res.message || "Error al obtener productos de Dropi" };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : "Error de conexión" };
  }
}

export async function getSyncRecords(): Promise<DropiSyncRecord[]> {
  if (hasDatabase()) {
    const db = getDb();
    const rows = await db.select().from(dropiOrderSync);
    return rows.map((r) => ({
      orderId: r.orderId,
      orderNumber: `WC-${r.orderId}`,
      dropiOrderId: r.dropiOrderId,
      status: (r.status || "pending") as DropiSyncRecord["status"],
      requestPayload: JSON.stringify(r.requestPayload || {}),
      responsePayload: r.responsePayload ? JSON.stringify(r.responsePayload) : null,
      errorMessage: r.errorMessage,
      retryCount: r.retryCount ?? 0,
      lastAttempt: (r.syncedAt || r.createdAt).toISOString(),
      createdAt: r.createdAt.toISOString(),
    }));
  }
  return await readStore<DropiSyncRecord[]>("dropi-sync", []);
}

export async function getApiLogs(): Promise<DropiLogEntry[]> {
  return await readStore<DropiLogEntry[]>("dropi-logs", []);
}

/**
 * Retry failed sync records (called by polling/cron)
 */
export async function retryFailedSyncs(): Promise<{ retried: number; succeeded: number }> {
  if (hasDatabase()) {
    const db = getDb();
    const failed = await db
      .select()
      .from(dropiOrderSync)
      .where(
        and(
          eq(dropiOrderSync.status, "failed"),
          lt(dropiOrderSync.retryCount, 3)
        )
      );

    let succeeded = 0;

    for (const record of failed) {
      try {
        const payload = record.requestPayload as Record<string, unknown>;
        const res = await dropiRequest("/orders/myorders", "POST", payload);

        if (res.isSuccess && res.objects) {
          const dropiOrderId = typeof res.objects === "object" && res.objects !== null && "id" in res.objects
            ? (res.objects as { id: number }).id : null;

          await db
            .update(dropiOrderSync)
            .set({
              status: "synced",
              dropiOrderId,
              responsePayload: res as unknown as Record<string, unknown>,
              retryCount: (record.retryCount ?? 0) + 1,
              syncedAt: new Date(),
              errorMessage: null,
            })
            .where(eq(dropiOrderSync.id, record.id));

          succeeded++;
        } else {
          await db
            .update(dropiOrderSync)
            .set({
              retryCount: (record.retryCount ?? 0) + 1,
              errorMessage: res.message || "Retry failed",
              responsePayload: res as unknown as Record<string, unknown>,
            })
            .where(eq(dropiOrderSync.id, record.id));
        }
      } catch (err) {
        await db
          .update(dropiOrderSync)
          .set({
            retryCount: (record.retryCount ?? 0) + 1,
            errorMessage: err instanceof Error ? err.message : "Retry error",
          })
          .where(eq(dropiOrderSync.id, record.id));
      }
    }

    return { retried: failed.length, succeeded };
  }

  // JSON fallback
  const syncRecords = await readStore<DropiSyncRecord[]>("dropi-sync", []);
  const failed = syncRecords.filter((r) => r.status === "failed" && r.retryCount < 3);

  let succeeded = 0;

  for (const record of failed) {
    try {
      const payload = JSON.parse(record.requestPayload);
      const res = await dropiRequest("/orders/myorders", "POST", payload);

      record.retryCount++;
      record.lastAttempt = new Date().toISOString();
      record.responsePayload = JSON.stringify(res);

      if (res.isSuccess && res.objects) {
        record.status = "sent";
        const dropiOrderId = typeof res.objects === "object" && res.objects !== null && "id" in res.objects
          ? (res.objects as { id: number }).id : null;
        record.dropiOrderId = dropiOrderId;
        succeeded++;
      } else {
        record.errorMessage = res.message || "Retry failed";
      }
    } catch (err) {
      record.retryCount++;
      record.lastAttempt = new Date().toISOString();
      record.errorMessage = err instanceof Error ? err.message : "Retry error";
    }
  }

  await writeStore("dropi-sync", syncRecords);
  return { retried: failed.length, succeeded };
}
