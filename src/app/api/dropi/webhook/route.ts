import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { readStore, writeStore } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import { orders as ordersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { DROPI_STATUS_MAP } from "@/lib/constants/dropi-status-map";
import type { Order } from "@/types/product";

const WEBHOOK_SECRET = process.env.DROPI_WEBHOOK_SECRET;

function verifySignature(rawBody: string, signature: string | null): boolean {
  if (!WEBHOOK_SECRET) return true; // No secret = allow (dev mode)
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(signature)
    );
  } catch {
    return false;
  }
}

/**
 * Webhook endpoint for Dropi status updates.
 * Dropi sends POST requests when order status changes.
 */
export async function POST(request: NextRequest) {
  try {
    // Read raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("x-dropi-signature");

    // Verify webhook signature
    if (!verifySignature(rawBody, signature)) {
      console.warn("[DROPI WEBHOOK] Invalid signature - request rejected");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (!WEBHOOK_SECRET) {
      console.warn(
        "[DROPI WEBHOOK] DROPI_WEBHOOK_SECRET not set - processing without verification (dev mode)"
      );
    }

    const body = JSON.parse(rawBody);

    console.log("[DROPI WEBHOOK] Received:", JSON.stringify(body));

    // Dropi sends: { order_id, status, guide_number, ... }
    const { order_id, status, guide_number, shop_order_id } = body;

    if (!order_id && !shop_order_id) {
      return NextResponse.json(
        { error: "Missing order identifier" },
        { status: 400 }
      );
    }

    // Map Dropi status to our internal statuses
    const statusMap = status ? DROPI_STATUS_MAP[status.toUpperCase()] : null;

    if (hasDatabase()) {
      const db = getDb();

      // Find order in database
      let order: (typeof ordersTable.$inferSelect) | undefined;

      if (shop_order_id) {
        const [found] = await db
          .select()
          .from(ordersTable)
          .where(eq(ordersTable.id, Number(shop_order_id)));
        order = found;
      } else if (guide_number) {
        const [found] = await db
          .select()
          .from(ordersTable)
          .where(eq(ordersTable.dropiGuideNumber, guide_number));
        order = found;
      }

      if (!order) {
        console.log("[DROPI WEBHOOK] Order not found for:", {
          order_id,
          shop_order_id,
        });
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }

      // Build update payload
      const updateData: Record<string, unknown> = {
        dropiStatus: status || order.dropiStatus,
      };

      if (guide_number) {
        updateData.dropiGuideNumber = guide_number;
      }

      if (statusMap) {
        if (statusMap.paymentStatus) {
          updateData.paymentStatus = statusMap.paymentStatus;
        }
        updateData.shipmentStatus = statusMap.shipmentStatus;
      }

      await db
        .update(ordersTable)
        .set(updateData)
        .where(eq(ordersTable.id, order.id));

      console.log(
        "[DROPI WEBHOOK] Updated order:",
        order.orderNumber,
        "->",
        status
      );

      return NextResponse.json({ success: true });
    }

    // Fallback: file-based store
    const orders = await readStore<Order[]>("orders", []);

    // Find order by our internal ID (shop_order_id) or by dropi guide number
    const orderIndex = orders.findIndex((o) => {
      if (shop_order_id) return o.id === Number(shop_order_id);
      if (guide_number) return o.dropiGuideNumber === guide_number;
      return false;
    });

    if (orderIndex === -1) {
      console.log("[DROPI WEBHOOK] Order not found for:", {
        order_id,
        shop_order_id,
      });
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (statusMap) {
      if (statusMap.paymentStatus) {
        orders[orderIndex].paymentStatus = statusMap.paymentStatus;
      }
      orders[orderIndex].shipmentStatus = statusMap.shipmentStatus;
    }

    // Update Dropi-specific fields
    orders[orderIndex].dropiStatus = status || orders[orderIndex].dropiStatus;
    if (guide_number) {
      orders[orderIndex].dropiGuideNumber = guide_number;
    }

    await writeStore("orders", orders);

    console.log(
      "[DROPI WEBHOOK] Updated order:",
      orders[orderIndex].orderNumber,
      "->",
      status
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DROPI WEBHOOK] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Also handle GET for Dropi health checks
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "shopify-esteroides-dropi-webhook",
  });
}
