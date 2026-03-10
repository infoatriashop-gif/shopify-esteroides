import { CheckoutModal } from "@/components/checkout/checkout-modal";
import { LandingPageRenderer } from "@/components/editor/landing-page-renderer";
import { readStore } from "@/lib/services/store";
import { hasDatabase, getDb } from "@/lib/db";
import { products as productsTable } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import type { Product } from "@/types/product";
import { DEFAULT_QUANTITY_OFFERS, DEFAULT_FORM_CONFIG } from "@/types/product";
import type { PageEditorState } from "@/types/editor";
import { DEFAULT_POPUP_CONFIG } from "@/types/form-config";
import type { ExtendedFormConfig } from "@/types/form-config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

async function getProductBySlug(slug: string): Promise<Product | null> {
  if (hasDatabase()) {
    const db = getDb();
    const [row] = await db
      .select()
      .from(productsTable)
      .where(
        and(
          eq(productsTable.slug, slug),
          eq(productsTable.isActive, true),
          isNull(productsTable.deletedAt)
        )
      );
    if (!row) return null;
    // Map DB row to Product shape
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description ?? "",
      price: row.price,
      compareAtPrice: row.compareAtPrice,
      sku: row.sku ?? "",
      stock: row.stock ?? 0,
      isActive: row.isActive ?? true,
      imageUrl: row.imageUrl,
      images: (row.images as string[]) ?? [],
      sellingPoints: (row.sellingPoints as string[]) ?? [],
      category: row.category ?? "General",
      quantityOffers: (row.quantityOffers as Product["quantityOffers"]) ?? [],
      upsells: (row.upsells as Product["upsells"]) ?? [],
      downsells: (row.downsells as Product["downsells"]) ?? [],
      formConfig: (row.formConfig as Product["formConfig"]) ?? DEFAULT_FORM_CONFIG,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }

  const products = await readStore<Product[]>("products", []);
  return products.find((p) => p.slug.trim() === slug.trim() && p.isActive) || null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const settings = await readStore<Record<string, Record<string, unknown>>>("settings", {});
  const storeName = (settings.general?.storeName as string) || "Mi Tienda COD";
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;
  const title = discount > 0
    ? `${product.name} - ${discount}% OFF | ${storeName}`
    : `${product.name} | ${storeName}`;

  return {
    title,
    description: product.description || `Compra ${product.name} con pago contra entrega. Envio a todo el pais.`,
    openGraph: {
      title: product.name,
      description: product.description || `Compra ${product.name} con pago contra entrega.`,
      images: product.imageUrl ? [{ url: product.imageUrl, width: 800, height: 800, alt: product.name }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description || `Compra ${product.name} con pago contra entrega.`,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ComprarProducto({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  const dbProduct = await getProductBySlug(slug);

  // Fallback to example product for demo
  const product = dbProduct
    ? {
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        description: dbProduct.description,
        price: dbProduct.price,
        compareAtPrice: dbProduct.compareAtPrice ?? Math.round(dbProduct.price * 1.5),
        imageUrl: dbProduct.imageUrl || "/images/placeholder-product.jpg",
        stock: dbProduct.stock,
        sellingPoints: dbProduct.sellingPoints || [],
        country: dbProduct.country || "CO",
      }
    : slug === "producto-ejemplo"
    ? {
        id: 0,
        name: "Producto de Ejemplo",
        slug,
        description: "Descripcion del producto de ejemplo",
        price: 89000,
        compareAtPrice: 129000,
        imageUrl: "/images/placeholder-product.jpg",
        stock: 50,
        sellingPoints: [] as string[],
      }
    : null;

  if (!product) {
    notFound();
  }

  // Get product-specific offers or defaults
  const quantityOffers = dbProduct?.quantityOffers?.length
    ? dbProduct.quantityOffers.filter((o) => o.isActive).map((o) => ({
        id: o.id,
        quantity: o.quantity,
        discountType: o.discountType,
        discountValue: o.discountValue,
        label: o.label,
        badgeText: o.badgeText,
      }))
    : DEFAULT_QUANTITY_OFFERS.map((o) => ({
        id: o.id,
        quantity: o.quantity,
        discountType: o.discountType,
        discountValue: o.discountValue,
        label: o.label,
        badgeText: o.badgeText,
      }));

  const formConfig = dbProduct?.formConfig
    ? { ...DEFAULT_FORM_CONFIG, ...dbProduct.formConfig }
    : DEFAULT_FORM_CONFIG;

  const upsells = dbProduct?.upsells?.filter((u) => u.isActive) || [];
  const downsells = dbProduct?.downsells?.filter((u) => u.isActive) || [];

  // Load landing page blocks and popup config from store
  const [pageData, globalFormConfig] = await Promise.all([
    dbProduct ? readStore<PageEditorState | null>(`pages-${dbProduct.id}`, null) : Promise.resolve(null),
    readStore<ExtendedFormConfig | null>("form-config-global", null),
  ]);
  const landingBlocks = pageData?.blocks ?? [];
  const popupConfig = { ...DEFAULT_POPUP_CONFIG, ...globalFormConfig?.popup };

  return (
    <>
      {landingBlocks.length > 0 && (
        <LandingPageRenderer blocks={landingBlocks} />
      )}
      <CheckoutModal
        product={product}
        quantityOffers={quantityOffers}
        formConfig={formConfig}
        popupConfig={popupConfig}
        upsells={upsells}
        downsells={downsells}
        hideProductCard={landingBlocks.length > 0}
      />
    </>
  );
}
