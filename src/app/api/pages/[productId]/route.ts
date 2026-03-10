import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/services/store";
import type { PageEditorState } from "@/types/editor";

type Params = Promise<{ productId: string }>;

export async function GET(_req: Request, { params }: { params: Params }) {
  const { productId } = await params;
  const page = await readStore<PageEditorState | null>(`pages-${productId}`, null);

  if (!page) {
    return NextResponse.json({
      productId,
      blocks: [],
      updatedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json(page);
}

export async function PUT(req: Request, { params }: { params: Params }) {
  const { productId } = await params;
  const body = await req.json();

  const state: PageEditorState = {
    productId,
    blocks: body.blocks || [],
    updatedAt: new Date().toISOString(),
  };

  await writeStore(`pages-${productId}`, state);
  return NextResponse.json(state);
}
