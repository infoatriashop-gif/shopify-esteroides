import { NextResponse } from "next/server";
import { readStore } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import { orders as ordersTable } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import type { Order } from "@/types/product";

export async function GET() {
  let orders: Order[];

  if (hasDatabase()) {
    const db = getDb();
    const rows = await db
      .select()
      .from(ordersTable)
      .orderBy(desc(ordersTable.id));
    // Map DB rows to Order shape (createdAt is Date from DB)
    orders = rows.map((r) => ({
      ...r,
      productId: r.productId ?? 0,
      productName: r.productName ?? "Producto",
      department: r.department ?? "",
      city: r.city ?? "",
      address: r.address ?? "",
      notes: r.notes ?? "",
      createdAt: r.createdAt.toISOString(),
    }));
  } else {
    orders = await readStore<Order[]>("orders", []);
  }

  const headers = [
    "Numero",
    "Fecha",
    "Cliente",
    "Telefono",
    "Ciudad",
    "Departamento",
    "Direccion",
    "Producto",
    "Cantidad",
    "Subtotal",
    "Envio",
    "Recaudo COD",
    "Total",
    "Estado Pago",
    "Estado Envio",
    "Dropi",
  ];

  const rows = orders.map((o) => [
    o.orderNumber || `ORD-${o.id}`,
    o.createdAt
      ? new Date(o.createdAt).toLocaleDateString("es-CO")
      : "",
    escapeCsv(o.customerName || ""),
    o.customerPhone || "",
    escapeCsv(o.city || ""),
    escapeCsv(o.department || ""),
    escapeCsv(o.address || ""),
    escapeCsv(o.productName || ""),
    String(o.quantity || 1),
    String(o.subtotal || 0),
    String(o.shipping || 0),
    String(o.codFee || 0),
    String(o.total || 0),
    o.paymentStatus || "pending",
    o.shipmentStatus || "unfulfilled",
    o.dropiGuideNumber || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Add BOM for Excel to detect UTF-8
  const bom = "\uFEFF";

  return new NextResponse(bom + csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pedidos-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
