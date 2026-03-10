"use client";

import { useState } from "react";
import type { FaqProps } from "@/types/editor";

export default function FaqBlock({ items, schemaMarkup }: FaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div data-testid="block-faq" className="p-4 space-y-2">
      {items.map((item) => (
        <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {item.question}
            <span className={`transition-transform ${openId === item.id ? "rotate-180" : ""}`}>▼</span>
          </button>
          {openId === item.id && (
            <div className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400">
              {item.answer}
            </div>
          )}
        </div>
      ))}
      {schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((i) => ({
                "@type": "Question",
                name: i.question,
                acceptedAnswer: { "@type": "Answer", text: i.answer },
              })),
            }),
          }}
        />
      )}
    </div>
  );
}
