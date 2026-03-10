"use client";

import React, { Suspense } from "react";
import type { EditorBlock } from "@/types/editor";
import { BlockRenderer } from "./blocks/block-renderer";

export function LandingPageRenderer({ blocks }: { blocks: EditorBlock[] }) {
  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="w-full">
      {sorted.map((block) => (
        <Suspense key={block.id} fallback={<div className="h-12 bg-gray-100 animate-pulse" />}>
          <BlockRenderer block={block} isPreview={false} />
        </Suspense>
      ))}
    </div>
  );
}
