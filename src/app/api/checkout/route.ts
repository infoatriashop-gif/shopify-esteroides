import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore, nextId } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import {
  products as productsTable,
  orders as ordersTable,
} from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { sendOrderToDropi } from "@/lib/services/dropi";
import type { Product, Order, QuantityOffer } from "@/types/product";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, department, city, address, productSlug, quantity, notes } = body;

    if (!name || !phone || !department || !city || !address || !productSlug) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben estar llenos" },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!/^3\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Numero de celular invalido" },
        { status: 400 }
      );
    }

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const qty = Number(quantity) || 1;
    const customerPhone = `+57${cleanPhone}`;

    // Load settings for shipping/codFee
    const settings = await readStore<Record<string, Record<string, unknown>>>(
      "settings",
      {}
    );
    const shipping = Number(settings.checkout?.shipping) || 12000;
    const codFee = Number(settings.checkout?.codFee) || 5000;

    if (hasDatabase()) {
      const db = getDb();

      const result = await db.transaction(async (tx) => {
        // Read product by slug
        const [product] = await tx
          .select()
          .from(productsTable)
          .where(eq(productsTable.slug, productSlug));

        if (!product || !product.isActive) {
          return { error: "Producto no encontrado o inactivo", status: 404 };
        }

        if ((product.stock ?? 0) < qty) {
          return { error: "Stock insuficiente", status: 400 };
        }

        // Calculate price using quantity offers
        const unitPrice = product.price;
        let discountPercent = 0;
        const offers = (product.quantityOffers as QuantityOffer[]) || [];
        const matchedOffer = offers.find(
          (o) => o.quantity === qty && o.isActive !== false
        );
        if (matchedOffer) {
          if (matchedOffer.discountType === "percent") {
            discountPercent = matchedOffer.discountValue;
          }
        } else {
          // Fallback defaults
          if (qty === 2) discountPercent = 10;
          if (qty >= 3) discountPercent = 20;
        }

        const subtotal = unitPrice * qty;
        const discount = Math.round(subtotal * (discountPercent / 100));
        const total = subtotal - discount + shipping + codFee;

        const orderNumber = `WC-${Date.now().toString(36).toUpperCase()}`;

        // Create order
        const [order] = await tx
          .insert(ordersTable)
          .values({
            orderNumber,
            productId: product.id,
            productName: product.name,
            quantity: qty,
            customerName: name,
            customerPhone,
            department,
            city,
            address,
            notes: notes || "",
            subtotal,
            shipping,
            codFee,
            total,
            paymentStatus: "pending",
            shipmentStatus: "unfulfilled",
            ipAddress,
          })
          .returning();

        // Decrement stock atomically
        await tx
          .update(productsTable)
          .set({ stock: sql`${productsTable.stock} - ${qty}` })
          .where(eq(productsTable.id, product.id));

        return { order, product };
      });

      // Check if transaction returned an error
      if ("error" in result) {
        return NextResponse.json(
          { error: result.error },
          { status: result.status }
        );
      }

      const { order, product } = result;

      console.log("[CHECKOUT]", {
        orderNumber: order.orderNumber,
        productSlug,
        qty,
        total: order.total,
      });

      // Auto-sync with Dropi (non-blocking)
      if (settings.dropi?.enabled && settings.dropi?.autoSync) {
        sendOrderToDropi({
          id: order.id,
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          department: order.department ?? "",
          city: order.city ?? "",
          address: order.address ?? "",
          notes: order.notes ?? "",
          productName: product.name,
          productId: product.id,
          quantity: order.quantity,
          total: order.total,
        })
          .then(async (dropiResult) => {
            if (dropiResult.success && dropiResult.dropiOrderId) {
              const dbInner = getDb();
              await dbInner
                .update(ordersTable)
                .set({
                  dropiStatus: "PENDIENTE",
                  dropiGuideNumber: String(dropiResult.dropiOrderId),
                })
                .where(eq(ordersTable.id, order.id));
            }
          })
          .catch((err: unknown) =>
            console.error("[DROPI AUTO-SYNC] Error:", err)
          );
      }

      return NextResponse.json({
        success: true,
        orderNumber: order.orderNumber,
        message: "Pedido creado exitosamente",
      });
    }

    // ─── JSON fallback ─────────────────────────────────────────────
    const products = await readStore<Product[]>("products", []);
    const product = products.find((p) => p.slug === productSlug && p.isActive);

    const productName = product?.name || "Producto";
    const unitPrice = product?.price || 89000;

    // Calculate discount based on quantity offers or defaults
    let discountPercent = 0;
    const offers = product?.quantityOffers || [];
    const matchedOffer = offers.find(
      (o) => o.quantity === qty && o.isActive !== false
    );
    if (matchedOffer) {
      if (matchedOffer.discountType === "percent") {
        discountPercent = matchedOffer.discountValue;
      }
    } else {
      if (qty === 2) discountPercent = 10;
      if (qty >= 3) discountPercent = 20;
    }

    const subtotal = unitPrice * qty;
    const discount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discount + shipping + codFee;

    const orders = await readStore<Order[]>("orders", []);
    const order: Order = {
      id: nextId(orders),
      orderNumber: `WC-${String(1000 + orders.length + 1)}`,
      productId: product?.id || 0,
      productName,
      quantity: qty,
      customerName: name,
      customerPhone,
      department,
      city,
      address,
      notes: notes || "",
      subtotal,
      shipping,
      codFee,
      total,
      paymentStatus: "pending",
      shipmentStatus: "unfulfilled",
      dropiStatus: null,
      dropiGuideNumber: null,
      createdAt: new Date().toISOString(),
    };

    orders.push(order);
    await writeStore("orders", orders);

    // Decrease stock
    if (product) {
      product.stock = Math.max(0, product.stock - qty);
      await writeStore("products", products);
    }

    console.log("[CHECKOUT]", {
      orderNumber: order.orderNumber,
      productSlug,
      qty,
      total,
    });

    // Auto-sync with Dropi (non-blocking)
    if (settings.dropi?.enabled && settings.dropi?.autoSync) {
      sendOrderToDropi({
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
      })
        .then(async (dropiResult) => {
          if (dropiResult.success && dropiResult.dropiOrderId) {
            const currentOrders = await readStore<Order[]>("orders", []);
            const idx = currentOrders.findIndex((o) => o.id === order.id);
            if (idx !== -1) {
              currentOrders[idx].dropiStatus = "PENDIENTE";
              currentOrders[idx].dropiGuideNumber = String(
                dropiResult.dropiOrderId
              );
              await writeStore("orders", currentOrders);
            }
          }
        })
        .catch((err: unknown) =>
          console.error("[DROPI AUTO-SYNC] Error:", err)
        );
    }

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      message: "Pedido creado exitosamente",
    });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
