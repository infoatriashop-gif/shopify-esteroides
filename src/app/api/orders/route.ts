import { NextResponse } from "next/server";
import { readStore, writeStore, nextId } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import { orders as ordersTable } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import type { Order } from "@/types/product";

export async function GET() {
  if (hasDatabase()) {
    const db = getDb();
    const rows = await db
      .select()
      .from(ordersTable)
      .orderBy(desc(ordersTable.id));
    return NextResponse.json(rows);
  }

  const orders = await readStore<Order[]>("orders", []);
  return NextResponse.json(orders.sort((a, b) => b.id - a.id));
}

export async function POST(req: Request) {
  const body = await req.json();

  if (hasDatabase()) {
    const db = getDb();

    // Generate orderNumber using a unique pattern
    const orderNumber =
      body.orderNumber || `WC-${Date.now().toString(36).toUpperCase()}`;

    const [order] = await db
      .insert(ordersTable)
      .values({
        orderNumber,
        productId: body.productId,
        productName: body.productName || "Producto",
        quantity: body.quantity || 1,
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        department: body.department,
        city: body.city,
        address: body.address,
        notes: body.notes || "",
        subtotal: body.subtotal || 0,
        shipping: body.shipping || 12000,
        codFee: body.codFee || 5000,
        total: body.total || 0,
        paymentStatus: "pending",
        shipmentStatus: "unfulfilled",
        dropiStatus: null,
        dropiGuideNumber: null,
        ipAddress: body.ipAddress || null,
      })
      .returning();

    return NextResponse.json(order, { status: 201 });
  }

  // JSON fallback
  const orders = await readStore<Order[]>("orders", []);

  const order: Order = {
    id: nextId(orders),
    orderNumber: `WC-${String(1000 + orders.length + 1)}`,
    productId: body.productId,
    productName: body.productName || "Producto",
    quantity: body.quantity || 1,
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    department: body.department,
    city: body.city,
    address: body.address,
    notes: body.notes || "",
    subtotal: body.subtotal || 0,
    shipping: body.shipping || 12000,
    codFee: body.codFee || 5000,
    total: body.total || 0,
    paymentStatus: "pending",
    shipmentStatus: "unfulfilled",
    dropiStatus: null,
    dropiGuideNumber: null,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  await writeStore("orders", orders);
  return NextResponse.json(order, { status: 201 });
}
