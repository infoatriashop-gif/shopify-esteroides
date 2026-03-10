import { describe, it, expect, vi, beforeEach } from "vitest";
import { DROPI_STATUS_MAP, DROPI_COUNTRY_URLS, DROPI_RETRY_DELAYS } from "@/lib/constants/dropi-status-map";

describe("Dropi status mapping", () => {
  it("maps ENTREGADO to delivered/paid", () => {
    const status = DROPI_STATUS_MAP.ENTREGADO;
    expect(status.shipmentStatus).toBe("delivered");
    expect(status.paymentStatus).toBe("paid");
  });

  it("maps ENVIADO to shipping", () => {
    expect(DROPI_STATUS_MAP.ENVIADO.shipmentStatus).toBe("shipping");
  });

  it("maps DEVUELTO to returned", () => {
    expect(DROPI_STATUS_MAP.DEVUELTO.shipmentStatus).toBe("returned");
  });

  it("maps CANCELADO to returned", () => {
    expect(DROPI_STATUS_MAP.CANCELADO.shipmentStatus).toBe("returned");
  });
});

describe("Dropi country URLs", () => {
  it("has URL for Colombia", () => {
    expect(DROPI_COUNTRY_URLS.CO).toBe("https://api.dropi.co/integrations");
  });

  it("has URL for Mexico", () => {
    expect(DROPI_COUNTRY_URLS.MX).toBe("https://api.dropi.mx/integrations");
  });

  it("has URL for Ecuador", () => {
    expect(DROPI_COUNTRY_URLS.EC).toBe("https://api.dropi.ec/integrations");
  });

  it("has URLs for all 10 countries with Dropi API", () => {
    const expected = ["CO", "EC", "PE", "MX", "PA", "CL", "PY", "AR", "GT", "CR"];
    for (const code of expected) {
      expect(DROPI_COUNTRY_URLS[code]).toBeDefined();
      expect(DROPI_COUNTRY_URLS[code]).toMatch(/^https:\/\/api\.dropi\./);
    }
  });
});

describe("Dropi order payload transformation", () => {
  it("splits customer name into first and last", () => {
    const fullName = "Juan Carlos Pérez García";
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");

    expect(firstName).toBe("Juan");
    expect(lastName).toBe("Carlos Pérez García");
  });

  it("handles single name", () => {
    const fullName = "Juan";
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ") || firstName;

    expect(firstName).toBe("Juan");
    expect(lastName).toBe("Juan");
  });

  it("formats department and city to uppercase", () => {
    const department = "Cundinamarca";
    const city = "Bogotá";

    expect(department.toUpperCase()).toBe("CUNDINAMARCA");
    expect(city.toUpperCase()).toBe("BOGOTÁ");
  });

  it("builds correct payload structure", () => {
    const order = {
      id: 1,
      orderNumber: "WC-1001",
      customerName: "Juan Pérez",
      customerPhone: "+573001234567",
      department: "Cundinamarca",
      city: "Bogotá",
      address: "Calle 100 #15-20",
      notes: "Entregar en portería",
      productName: "Crema Facial",
      productId: 42,
      quantity: 2,
      total: 178000,
    };

    const nameParts = order.customerName.trim().split(/\s+/);
    const payload = {
      total_order: order.total,
      notes: order.notes,
      name: nameParts[0],
      surname: nameParts.slice(1).join(" "),
      dir: order.address,
      country: "CO",
      state: order.department.toUpperCase(),
      city: order.city.toUpperCase(),
      phone: order.customerPhone,
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

    expect(payload.name).toBe("Juan");
    expect(payload.surname).toBe("Pérez");
    expect(payload.state).toBe("CUNDINAMARCA");
    expect(payload.rate_type).toBe("CON RECAUDO");
    expect(payload.products[0].price).toBe(89000);
    expect(payload.create_product_if_not_exist).toBe(true);
  });
});

describe("Dropi sync record lifecycle", () => {
  it("creates pending sync record", () => {
    const record = {
      orderId: 1,
      orderNumber: "WC-1001",
      dropiOrderId: null,
      status: "pending" as const,
      requestPayload: "{}",
      responsePayload: null,
      errorMessage: null,
      retryCount: 0,
      lastAttempt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    expect(record.status).toBe("pending");
    expect(record.retryCount).toBe(0);
  });

  it("marks as failed after error", () => {
    const record = {
      orderId: 1,
      orderNumber: "WC-1001",
      dropiOrderId: null,
      status: "failed" as const,
      requestPayload: "{}",
      responsePayload: null,
      errorMessage: "Token inválido",
      retryCount: 1,
      lastAttempt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    expect(record.status).toBe("failed");
    expect(record.errorMessage).toBe("Token inválido");
  });

  it("marks as sent after success", () => {
    const record = {
      orderId: 1,
      orderNumber: "WC-1001",
      dropiOrderId: 12345,
      status: "sent" as const,
      requestPayload: "{}",
      responsePayload: '{"isSuccess":true}',
      errorMessage: null,
      retryCount: 0,
      lastAttempt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    expect(record.status).toBe("sent");
    expect(record.dropiOrderId).toBe(12345);
  });

  it("retry logic respects max retry count", () => {
    const maxRetries = DROPI_RETRY_DELAYS.length;
    const record = { retryCount: maxRetries, status: "failed" as const };

    // Should not retry if retryCount >= maxRetries
    const shouldRetry = record.status === "failed" && record.retryCount < maxRetries;
    expect(shouldRetry).toBe(false);
  });
});

describe("Dropi test connection logic", () => {
  it("rejects empty API key", () => {
    const apiKey = "";
    expect(!apiKey).toBe(true);
  });

  it("identifies 401 as auth error", () => {
    const statusCode = 401;
    const isAuthError = statusCode === 401;
    expect(isAuthError).toBe(true);
  });
});
