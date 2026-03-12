import { NextResponse } from "next/server";
import { readStore } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import { orders as ordersTable } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { verifyWcCredentials } from "@/lib/services/wc-auth";
import type { Order } from "@/types/product";

/** Map our status to WooCommerce status */
function toWcStatus(shipmentStatus: string, paymentStatus: string): string {
  if (shipmentStatus === "delivered") return "completed";
  if (shipmentStatus === "shipping") return "shipped";
  if (shipmentStatus === "returned") return "cancelled";
  if (paymentStatus === "paid") return "processing";
  return "processing"; // Default: new orders as "processing" for Dropi to pick up
}

/** Map our Order to WooCommerce order format */
function toWcOrder(o: Order) {
  const nameParts = o.customerName.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || firstName;

  return {
    id: o.id,
    number: o.orderNumber,
    order_key: `wc_order_${o.id}`,
    status: toWcStatus(o.shipmentStatus, o.paymentStatus),
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
    line_items: [
      {
        id: o.id,
        name: o.productName,
        product_id: o.productId,
        quantity: o.quantity,
        total: String(o.total),
        price: o.quantity > 0 ? Math.round(o.total / o.quantity) : o.total,
      },
    ],
    shipping_lines: [
      {
        method_title: "Envío estándar",
        total: String(o.shipping || 0),
      },
    ],
    customer_note: o.notes || "",
  };
}

export async function GET(req: Request) {
  const authenticated = await verifyWcCredentials(req);
  if (!authenticated) {
    return NextResponse.json(
      { code: "woocommerce_rest_cannot_view", message: "Credenciales inválidas" },
      { status: 401 }
    );
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const perPage = parseInt(url.searchParams.get("per_page") || "50");
  const page = parseInt(url.searchParams.get("page") || "1");

  let allOrders: Order[];

  if (hasDatabase()) {
    const db = getDb();
    const rows = await db.select().from(ordersTable).orderBy(desc(ordersTable.id));
    allOrders = rows as unknown as Order[];
  } else {
    allOrders = await readStore<Order[]>("orders", []);
    allOrders.sort((a, b) => b.id - a.id);
  }

  // Filter by WC status if requested
  let filtered = allOrders;
  if (status) {
    filtered = allOrders.filter((o) => toWcStatus(o.shipmentStatus, o.paymentStatus) === status);
  }

  // Paginate
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  const wcOrders = paged.map(toWcOrder);

  const response = NextResponse.json(wcOrders);
  response.headers.set("X-WP-Total", String(filtered.length));
  response.headers.set("X-WP-TotalPages", String(Math.ceil(filtered.length / perPage)));
  return response;
}
