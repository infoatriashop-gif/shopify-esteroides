import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import { products as productsTable } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import type { Product } from "@/types/product";

type Params = Promise<{ id: string }>;

export async function GET(_req: Request, { params }: { params: Params }) {
  const { id } = await params;

  if (hasDatabase()) {
    const db = getDb();
    const numId = Number(id);
    const conditions = isNaN(numId)
      ? eq(productsTable.slug, id)
      : or(eq(productsTable.id, numId), eq(productsTable.slug, id));

    const [product] = await db
      .select()
      .from(productsTable)
      .where(conditions);
    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  }

  const products = await readStore<Product[]>("products", []);
  const product = products.find((p) => p.id === Number(id) || p.slug === id);
  if (!product) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const body = await req.json();

  if (hasDatabase()) {
    const db = getDb();
    const numId = Number(id);
    if (isNaN(numId)) {
      return NextResponse.json(
        { error: "ID invalido" },
        { status: 400 }
      );
    }

    // Only update known fields to prevent prototype pollution
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    const allowedFields = [
      "name",
      "slug",
      "description",
      "price",
      "compareAtPrice",
      "sku",
      "stock",
      "isActive",
      "imageUrl",
      "images",
      "sellingPoints",
      "category",
      "quantityOffers",
      "upsells",
      "downsells",
      "formConfig",
      "metaTitle",
      "metaDescription",
      "country",
      "dropiProductId",
    ] as const;

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Sanitize slug: trim whitespace and lowercase
    if (typeof updateData.slug === "string") {
      updateData.slug = updateData.slug.trim().toLowerCase().replace(/\s+/g, "-");
    }

    // Ensure price fields are integers
    if (updateData.price !== undefined) {
      updateData.price = Math.round(Number(updateData.price) || 0);
    }
    if (updateData.compareAtPrice !== undefined && updateData.compareAtPrice !== null) {
      updateData.compareAtPrice = Math.round(Number(updateData.compareAtPrice));
    }

    const [updated] = await db
      .update(productsTable)
      .set(updateData)
      .where(eq(productsTable.id, numId))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(updated);
  }

  // JSON fallback
  const products = await readStore<Product[]>("products", []);
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }

  products[index] = {
    ...products[index],
    ...body,
    id: products[index].id,
    createdAt: products[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  await writeStore("products", products);
  return NextResponse.json(products[index]);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Params }
) {
  const { id } = await params;

  if (hasDatabase()) {
    const db = getDb();
    const numId = Number(id);
    if (isNaN(numId)) {
      return NextResponse.json(
        { error: "ID invalido" },
        { status: 400 }
      );
    }

    const [deleted] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, numId))
      .returning({ id: productsTable.id });

    if (!deleted) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true });
  }

  // JSON fallback
  const products = await readStore<Product[]>("products", []);
  const filtered = products.filter((p) => p.id !== Number(id));
  if (filtered.length === products.length) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }
  await writeStore("products", filtered);
  return NextResponse.json({ ok: true });
}
