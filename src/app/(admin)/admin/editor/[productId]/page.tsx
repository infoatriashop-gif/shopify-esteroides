"use client";

import { use } from "react";
import dynamic from "next/dynamic";

const PageEditor = dynamic(
  () => import("@/components/editor/page-editor").then((m) => ({ default: m.PageEditor })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="space-y-3 w-64">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
        </div>
      </div>
    ),
  }
);

export default function EditorPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  return <PageEditor productId={productId} />;
}
