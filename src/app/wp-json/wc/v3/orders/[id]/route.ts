import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import { orders as ordersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyWcCredentials } from "@/lib/services/wc-auth";
import type { Order } from "@/types/product";

function toWcOrder(o: Order) {
  const nameParts = o.customerName.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || firstName;

  const statusMap: Record<string, string> = {
    delivered: "completed", shipping: "shipped", returned: "cancelled",
  };
  const wcStatus = statusMap[o.shipmentStatus] || "processing";

  return {
    id: o.id,
    number: o.orderNumber,
    order_key: `wc_order_${o.id}`,
    status: wcStatus,
    date_created: o.createdAt,
    date_modified: o.createdAt,
    total: String(o.total),
    currency: "COP",
    payment_method: "cod",
    payment_method_title: "Pago contra entrega",
    billing: {
      first_name: firstName,
      last_name: lastName,
      address_1: o.address,
      city: o.city,
      state: o.department,
      country: "CO",
      email: "",
      phone: o.customerPhone,
    },
    shipping: {
      first_name: firstName,
      last_name: lastName,
      address_1: o.address,
      city: o.city,
      state: o.department,
      country: "CO",
    },
    line_items: [{
      id: o.id,
      name: o.productName,
      product_id: o.productId,
      quantity: o.quantity,
      total: String(o.total),
      price: o.quantity > 0 ? Math.round(o.total / o.quantity) : o.total,
    }],
    shipping_lines: [{ method_title: "Envío estándar", total: String(o.shipping || 0) }],
    customer_note: o.notes || "",
  };
}

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: RouteParams) {
  const authenticated = await verifyWcCredentials(req);
  if (!authenticated) {
    return NextResponse.json({ code: "woocommerce_rest_cannot_view", message: "Credenciales inválidas" }, { status: 401 });
  }

  const { id } = await params;
  const orderId = parseInt(id);

  if (hasDatabase()) {
    const db = getDb();
    const [row] = await db.select().from(ordersTable).where(eq(ordersTable.id, orderId));
    if (!row) return NextResponse.json({ code: "woocommerce_rest_order_invalid_id", message: "Orden no encontrada" }, { status: 404 });
    return NextResponse.json(toWcOrder(row as unknown as Order));
  }

  const orders = await readStore<Order[]>("orders", []);
  const order = orders.find((o) => o.id === orderId);
  if (!order) return NextResponse.json({ code: "woocommerce_rest_order_invalid_id", message: "Orden no encontrada" }, { status: 404 });
  return NextResponse.json(toWcOrder(order));
}

/** Dropi updates order status via PUT */
export async function PUT(req: Request, { params }: RouteParams) {
  const authenticated = await verifyWcCredentials(req);
  if (!authenticated) {
    return NextResponse.json({ code: "woocommerce_rest_cannot_edit", message: "Credenciales inválidas" }, { status: 401 });
  }

  const { id } = await params;
  const orderId = parseInt(id);
  const body = await req.json();

  // Map WC status back to our internal statuses
  const wcToShipment: Record<string, string> = {
    processing: "unfulfilled",
    shipped: "shipping",
    "on-hold": "unfulfilled",
    completed: "delivered",
    cancelled: "returned",
    refunded: "returned",
  };

  const updates: Partial<{ shipmentStatus: string; paymentStatus: string; dropiStatus: string; dropiGuideNumber: string }> = {};
  if (body.status) {
    updates.shipmentStatus = wcToShipment[body.status] || "unfulfilled";
    if (body.status === "completed") updates.paymentStatus = "paid";
  }
  if (body.meta_data) {
    const guideMeta = body.meta_data.find((m: { key: string; value: string }) => m.key === "_dropi_guide_number");
    if (guideMeta) updates.dropiGuideNumber = guideMeta.value;
    const statusMeta = body.meta_data.find((m: { key: string; value: string }) => m.key === "_dropi_status");
    if (statusMeta) updates.dropiStatus = statusMeta.value;
  }

  if (hasDatabase()) {
    const db = getDb();
    const [updated] = await db
      .update(ordersTable)
      .set(updates)
      .where(eq(ordersTable.id, orderId))
      .returning();
    if (!updated) return NextResponse.json({ code: "woocommerce_rest_order_invalid_id", message: "Orden no encontrada" }, { status: 404 });
    return NextResponse.json(toWcOrder(updated as unknown as Order));
  }

  const orders = await readStore<Order[]>("orders", []);
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx < 0) return NextResponse.json({ code: "woocommerce_rest_order_invalid_id", message: "Orden no encontrada" }, { status: 404 });
  Object.assign(orders[idx], updates);
  await writeStore("orders", orders);
  return NextResponse.json(toWcOrder(orders[idx]));
}
