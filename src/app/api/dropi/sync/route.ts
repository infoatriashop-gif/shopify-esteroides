import { NextResponse } from "next/server";
import { sendOrderToDropi } from "@/lib/services/dropi";
import { readStore, writeStore } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import { orders as ordersTable, dropiOrderSync } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Order } from "@/types/product";

// GET: Retrieve sync records
export async function GET() {
  if (hasDatabase()) {
    const db = getDb();
    const records = await db
      .select()
      .from(dropiOrderSync)
      .orderBy(desc(dropiOrderSync.createdAt));
    return NextResponse.json(records);
  }

  const records = await readStore("dropi-sync", []);
  return NextResponse.json(records);
}

// POST: Manually send a specific order to Dropi
export async function POST(req: Request) {
  const body = await req.json();
  const { orderId } = body;

  if (!orderId) {
    return NextResponse.json({ error: "orderId requerido" }, { status: 400 });
  }

  if (hasDatabase()) {
    const db = getDb();
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, Number(orderId)));

    if (!order) {
      return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });
    }

    const result = await sendOrderToDropi({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      department: order.department ?? "",
      city: order.city ?? "",
      address: order.address ?? "",
      notes: order.notes ?? "",
      productName: order.productName ?? "",
      productId: order.productId ?? 0,
      quantity: order.quantity,
      total: order.total,
    });

    // Update order with Dropi status
    if (result.success && result.dropiOrderId) {
      await db
        .update(ordersTable)
        .set({
          dropiStatus: "PENDIENTE",
          dropiGuideNumber: String(result.dropiOrderId),
        })
        .where(eq(ordersTable.id, order.id));
    }

    return NextResponse.json(result);
  }

  // Fallback: file-based store
  const orders = await readStore<Order[]>("orders", []);
  const order = orders.find((o) => o.id === Number(orderId));

  if (!order) {
    return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });
  }

  const result = await sendOrderToDropi({
    id: order.id,
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    department: order.department,
    city: order.city,
    address: order.address,
    notes: order.notes,
    productName: order.productName,
    productId: order.productId,
    quantity: order.quantity,
    total: order.total,
  });

  // Update order with Dropi status
  if (result.success && result.dropiOrderId) {
    const updatedOrders = await readStore<Order[]>("orders", []);
    const idx = updatedOrders.findIndex((o) => o.id === order.id);
    if (idx !== -1) {
      updatedOrders[idx].dropiStatus = "PENDIENTE";
      updatedOrders[idx].dropiGuideNumber = String(result.dropiOrderId);
      await writeStore("orders", updatedOrders);
    }
  }

  return NextResponse.json(result);
}
