import { NextResponse } from "next/server";
import { readStore, writeStore, nextId } from "@/lib/services/store";
import type { Product } from "@/types/product";
import { DEFAULT_FORM_CONFIG } from "@/types/product";

/**
 * POST /api/dropi/import-product
 * Body: { dropiProductId: number } — o datos completos del producto Dropi
 *
 * Importa un producto de Dropi a nuestra plataforma.
 * Acepta dos modos:
 *   1. Solo ID: { dropiProductId: 12345 } — se guarda como placeholder para completar
 *   2. Datos completos: { dropiProductId, name, price, description, images, ... }
 *      (para cuando el usuario pega la info desde Dropi o desde el frontend)
 */
export async function POST(req: Request) {
  const body = await req.json();
  const dropiProductId = Number(body.dropiProductId);

  if (!dropiProductId || isNaN(dropiProductId)) {
    return NextResponse.json({ error: "dropiProductId es requerido" }, { status: 400 });
  }

  // Verificar si ya existe un producto con ese dropiProductId
  const products = await readStore<Product[]>("products", []);
  const existing = products.find((p) => p.dropiProductId === dropiProductId);
  if (existing) {
    return NextResponse.json({ error: "Ya existe un producto con ese ID de Dropi", product: existing }, { status: 409 });
  }

  // Construir nombre y slug
  const name = body.name || `Producto Dropi #${dropiProductId}`;
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Extraer imágenes
  let images: string[] = [];
  let imageUrl: string | null = null;
  if (body.images && Array.isArray(body.images)) {
    images = body.images;
    imageUrl = images[0] || null;
  } else if (body.url_image) {
    imageUrl = body.url_image;
    images = [body.url_image];
  } else if (body.gallery && Array.isArray(body.gallery)) {
    images = body.gallery
      .filter((g: { url_image?: string }) => g.url_image)
      .map((g: { url_image: string }) => g.url_image);
    imageUrl = images[0] || null;
  }

  const now = new Date().toISOString();
  const product: Product = {
    id: nextId(products),
    dropiProductId,
    name,
    slug,
    description: body.description || body.short_description || "",
    price: Math.round(Number(body.price || body.sale_price || body.suggested_price) || 0),
    compareAtPrice: body.compareAtPrice ? Math.round(Number(body.compareAtPrice)) : null,
    sku: body.sku || body.reference || `DROPI-${dropiProductId}`,
    stock: Number(body.stock ?? body.total_stock ?? 100),
    isActive: true,
    imageUrl,
    images,
    sellingPoints: body.sellingPoints || [],
    category: body.category || body.category_name || "Dropi",
    quantityOffers: body.quantityOffers || [],
    upsells: body.upsells || [],
    downsells: body.downsells || [],
    formConfig: body.formConfig || DEFAULT_FORM_CONFIG,
    createdAt: now,
    updatedAt: now,
  };

  products.push(product);
  await writeStore("products", products);

  return NextResponse.json(product, { status: 201 });
}
