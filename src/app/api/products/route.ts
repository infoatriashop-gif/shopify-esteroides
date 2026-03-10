import { NextResponse } from "next/server";
import { readStore, writeStore, nextId } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import { products as productsTable } from "@/lib/db/schema";
import { eq, isNull } from "drizzle-orm";
import type { Product } from "@/types/product";

function generateSlug(name: string, existingSlug?: string): string {
  return (
    existingSlug ||
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

export async function GET() {
  if (hasDatabase()) {
    const db = getDb();
    const rows = await db
      .select()
      .from(productsTable)
      .where(isNull(productsTable.deletedAt));
    return NextResponse.json(rows);
  }

  const products = await readStore<Product[]>("products", []);
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const slug = generateSlug(body.name, body.slug);

  if (hasDatabase()) {
    const db = getDb();

    // Check unique slug
    const [existing] = await db
      .select({ id: productsTable.id })
      .from(productsTable)
      .where(eq(productsTable.slug, slug));
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe un producto con ese slug" },
        { status: 400 }
      );
    }

    const [product] = await db
      .insert(productsTable)
      .values({
        name: body.name,
        slug,
        description: body.description || "",
        price: Math.round(Number(body.price) || 0),
        compareAtPrice: body.compareAtPrice
          ? Math.round(Number(body.compareAtPrice))
          : null,
        sku: body.sku || `SKU-${Date.now()}`,
        stock: Number(body.stock) || 100,
        isActive: body.isActive !== false,
        imageUrl: body.imageUrl || null,
        images: body.images || [],
        sellingPoints: body.sellingPoints || [],
        category: body.category || "General",
        quantityOffers: body.quantityOffers || [],
        upsells: body.upsells || [],
        downsells: body.downsells || [],
        formConfig: body.formConfig || {
          showNotes: true,
          showEmail: false,
          urgencyMinutes: 15,
          showSocialProof: true,
          showTrustBadges: true,
          showSavingsBadge: true,
          ctaText: "Confirmar Pedido COD",
          ctaColor: "green",
          headerColor: "gradient",
        },
      })
      .returning();

    return NextResponse.json(product, { status: 201 });
  }

  // JSON fallback
  const products = await readStore<Product[]>("products", []);

  if (products.find((p) => p.slug === slug)) {
    return NextResponse.json(
      { error: "Ya existe un producto con ese slug" },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const product: Product = {
    id: nextId(products),
    name: body.name,
    slug,
    description: body.description || "",
    price: Math.round(Number(body.price) || 0),
    compareAtPrice: body.compareAtPrice
      ? Math.round(Number(body.compareAtPrice))
      : null,
    sku: body.sku || `SKU-${Date.now()}`,
    stock: Number(body.stock) || 100,
    isActive: body.isActive !== false,
    imageUrl: body.imageUrl || null,
    images: body.images || [],
    sellingPoints: body.sellingPoints || [],
    category: body.category || "General",
    quantityOffers: body.quantityOffers || [],
    upsells: body.upsells || [],
    downsells: body.downsells || [],
    formConfig: body.formConfig || {
      showNotes: true,
      showEmail: false,
      urgencyMinutes: 15,
      showSocialProof: true,
      showTrustBadges: true,
      showSavingsBadge: true,
      ctaText: "Confirmar Pedido COD",
      ctaColor: "green",
      headerColor: "gradient",
    },
    createdAt: now,
    updatedAt: now,
  };

  products.push(product);
  await writeStore("products", products);
  return NextResponse.json(product, { status: 201 });
}
