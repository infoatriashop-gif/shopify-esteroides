"use client";

import { useCallback } from "react";
import type { FormFieldConfig } from "@/types/form-config";

type FieldsEditorProps = {
  fields: FormFieldConfig[];
  onChange: (fields: FormFieldConfig[]) => void;
};

export function FieldsEditor({ fields, onChange }: FieldsEditorProps) {
  const sortedFields = [...fields].sort((a, b) => a.order - b.order);

  const updateField = useCallback(
    (id: string, updates: Partial<FormFieldConfig>) => {
      onChange(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    },
    [fields, onChange]
  );

  const moveField = useCallback(
    (id: string, direction: "up" | "down") => {
      const sorted = [...fields].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((f) => f.id === id);
      if (
        (direction === "up" && idx === 0) ||
        (direction === "down" && idx === sorted.length - 1)
      )
        return;

      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      const updated = sorted.map((f, i) => {
        if (i === idx) return { ...f, order: swapIdx };
        if (i === swapIdx) return { ...f, order: idx };
        return { ...f, order: i };
      });
      onChange(updated);
    },
    [fields, onChange]
  );

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        Activa/desactiva campos y configura su orden de aparición.
      </p>
      {sortedFields.map((field) => (
        <div
          key={field.id}
          data-testid={`field-${field.id}`}
          className={`p-3 rounded-lg border transition-colors ${
            field.visible
              ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 opacity-60"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={field.visible}
                  onChange={(e) =>
                    updateField(field.id, { visible: e.target.checked })
                  }
                  className="sr-only peer"
                  aria-label={`Toggle ${field.label}`}
                />
                <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-600 rounded-full transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
              </label>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {field.label}
              </span>
              {field.required && (
                <span className="text-xs text-red-500 dark:text-red-400">*</span>
              )}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => moveField(field.id, "up")}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                title="Mover arriba"
              >
                ↑
              </button>
              <button
                onClick={() => moveField(field.id, "down")}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                title="Mover abajo"
              >
                ↓
              </button>
            </div>
          </div>

          {field.visible && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    updateField(field.id, { label: e.target.value })
                  }
                  placeholder="Label"
                  className="flex-1 px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="text"
                  value={field.placeholder}
                  onChange={(e) =>
                    updateField(field.id, { placeholder: e.target.value })
                  }
                  placeholder="Placeholder"
                  className="flex-1 px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) =>
                      updateField(field.id, { required: e.target.checked })
                    }
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  Obligatorio
                </label>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Tipo: {field.type}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
