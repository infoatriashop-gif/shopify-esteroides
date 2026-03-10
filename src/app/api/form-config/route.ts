import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/services/store";
import type { ExtendedFormConfig } from "@/types/form-config";
import { DEFAULT_EXTENDED_FORM_CONFIG } from "@/types/form-config";

const STORE_KEY = "form-configs";

type FormConfigStore = {
  global: ExtendedFormConfig;
  products: Record<string, ExtendedFormConfig>;
};

async function getStore(): Promise<FormConfigStore> {
  return await readStore<FormConfigStore>(STORE_KEY, {
    global: DEFAULT_EXTENDED_FORM_CONFIG,
    products: {},
  });
}

// GET /api/form-config?productId=123 — returns product config or global
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  const store = await getStore();

  if (productId && store.products[productId]) {
    return NextResponse.json(store.products[productId]);
  }

  return NextResponse.json(store.global);
}

// PUT /api/form-config — save global or product-specific config
export async function PUT(req: Request) {
  const body = await req.json();
  const { productId, config } = body as {
    productId?: string;
    config: ExtendedFormConfig;
  };

  if (!config || !config.fields || !config.visual) {
    return NextResponse.json(
      { error: "Invalid form config" },
      { status: 400 }
    );
  }

  const store = await getStore();
  config.updatedAt = new Date().toISOString();

  if (productId) {
    config.id = `product-${productId}`;
    store.products[productId] = config;
  } else {
    config.id = "global";
    store.global = config;
  }

  await writeStore(STORE_KEY, store);
  return NextResponse.json(config);
}

// DELETE /api/form-config?productId=123 — remove product override (revert to global)
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "Cannot delete global config" },
      { status: 400 }
    );
  }

  const store = await getStore();
  delete store.products[productId];
  await writeStore(STORE_KEY, store);

  return NextResponse.json({ success: true });
}
