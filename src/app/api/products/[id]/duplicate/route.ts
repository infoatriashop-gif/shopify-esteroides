import { NextResponse } from "next/server";
import { readStore, writeStore, nextId } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import { products as productsTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Product } from "@/types/product";

type Params = Promise<{ id: string }>;

export async function POST(_req: Request, { params }: { params: Params }) {
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

    const [original] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, numId));

    if (!original) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Generate unique slug
    let baseSlug = `${original.slug}-copia`;
    let slug = baseSlug;
    let counter = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const [existing] = await db
        .select({ id: productsTable.id })
        .from(productsTable)
        .where(eq(productsTable.slug, slug));
      if (!existing) break;
      slug = `${baseSlug}-${counter++}`;
    }

    const [duplicate] = await db
      .insert(productsTable)
      .values({
        name: `${original.name} (Copia)`,
        slug,
        description: original.description,
        price: original.price,
        compareAtPrice: original.compareAtPrice,
        sku: original.sku ? `${original.sku}-COPY` : null,
        stock: original.stock,
        isActive: original.isActive,
        imageUrl: original.imageUrl,
        images: original.images,
        sellingPoints: original.sellingPoints,
        category: original.category,
        quantityOffers: original.quantityOffers,
        upsells: original.upsells,
        downsells: original.downsells,
        formConfig: original.formConfig,
        metaTitle: original.metaTitle,
        metaDescription: original.metaDescription,
      })
      .returning();

    return NextResponse.json(duplicate, { status: 201 });
  }

  // JSON fallback
  const products = await readStore<Product[]>("products", []);
  const original = products.find((p) => p.id === Number(id));

  if (!original) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }

  let baseSlug = `${original.slug}-copia`;
  let slug = baseSlug;
  let counter = 1;
  while (products.find((p) => p.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const now = new Date().toISOString();
  const duplicate: Product = {
    ...original,
    id: nextId(products),
    name: `${original.name} (Copia)`,
    slug,
    createdAt: now,
    updatedAt: now,
  };

  products.push(duplicate);
  await writeStore("products", products);
  return NextResponse.json(duplicate, { status: 201 });
}
