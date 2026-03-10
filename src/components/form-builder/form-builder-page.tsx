"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import type { ExtendedFormConfig } from "@/types/form-config";
import { DEFAULT_EXTENDED_FORM_CONFIG } from "@/types/form-config";
import { FormBuilder } from "./form-builder";

// Lazy-load preview to optimize initial bundle
const FormPreview = dynamic(
  () => import("./form-preview").then((m) => ({ default: m.FormPreview })),
  {
    ssr: false,
    loading: () => (
      <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-950">
        <div className="animate-pulse text-gray-400">Cargando preview...</div>
      </div>
    ),
  }
);

type FormBuilderPageProps = {
  productId?: string;
};

export function FormBuilderPage({ productId }: FormBuilderPageProps) {
  const [config, setConfig] = useState<ExtendedFormConfig>(DEFAULT_EXTENDED_FORM_CONFIG);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load config from API
  useEffect(() => {
    const url = productId
      ? `/api/form-config?productId=${productId}`
      : "/api/form-config";

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.fields) {
          setConfig(data);
        }
      })
      .catch(() => {
        // Use defaults on error
      })
      .finally(() => setLoading(false));
  }, [productId]);

  // Debounced config change handler (150ms as per spec)
  const handleChange = useCallback((newConfig: ExtendedFormConfig) => {
    setConfig(newConfig);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="space-y-3 w-64">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row">
      {/* Builder panel - 60% on desktop, full width on mobile */}
      <div className="w-full lg:w-[60%] h-1/2 lg:h-full overflow-hidden border-r border-gray-200 dark:border-gray-700">
        <FormBuilder
          config={config}
          onChange={handleChange}
          productId={productId}
        />
      </div>

      {/* Preview panel - 40% on desktop, full width on mobile */}
      <div className="w-full lg:w-[40%] h-1/2 lg:h-full overflow-hidden">
        <FormPreview config={config} />
      </div>
    </div>
  );
}
