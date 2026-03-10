"use client";

import { useState, useCallback } from "react";
import type { ExtendedFormConfig, FormFieldConfig, FormVisualConfig, FormPopupConfig } from "@/types/form-config";
import { DEFAULT_EXTENDED_FORM_CONFIG } from "@/types/form-config";
import { SUPPORTED_COUNTRIES } from "@/data/countries";
import { FieldsEditor } from "./fields-editor";
import { VisualEditor } from "./visual-editor";
import { PopupEditor } from "./popup-editor";

type Tab = "fields" | "visual" | "popup";

type FormBuilderProps = {
  config: ExtendedFormConfig;
  onChange: (config: ExtendedFormConfig) => void;
  productId?: string;
};

export function FormBuilder({ config, onChange, productId }: FormBuilderProps) {
  const [activeTab, setActiveTab] = useState<Tab>("fields");

  const handleFieldsChange = useCallback(
    (fields: FormFieldConfig[]) => {
      onChange({ ...config, fields });
    },
    [config, onChange]
  );

  const handleVisualChange = useCallback(
    (visual: FormVisualConfig) => {
      onChange({ ...config, visual });
    },
    [config, onChange]
  );

  const handlePopupChange = useCallback(
    (popup: FormPopupConfig) => {
      onChange({ ...config, popup });
    },
    [config, onChange]
  );

  const handleCountryChange = useCallback(
    (countryCode: string) => {
      const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
      if (!country) return;

      // Update labels for department/city fields based on country
      const updatedFields = config.fields.map((f) => {
        if (f.id === "department") {
          return { ...f, label: country.divisionLabels[0], placeholder: `Selecciona ${country.divisionLabels[0].toLowerCase()}` };
        }
        if (f.id === "city") {
          return { ...f, label: country.divisionLabels[1] || "Ciudad", placeholder: `Selecciona ${(country.divisionLabels[1] || "ciudad").toLowerCase()}` };
        }
        if (f.id === "phone") {
          return { ...f, placeholder: country.phoneValidation.placeholder };
        }
        return f;
      });

      onChange({ ...config, countryCode, fields: updatedFields });
    },
    [config, onChange]
  );

  const handleSave = useCallback(async () => {
    const body = productId
      ? { productId, config }
      : { config };

    await fetch("/api/form-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }, [config, productId]);

  const handleReset = useCallback(() => {
    onChange(DEFAULT_EXTENDED_FORM_CONFIG);
  }, [onChange]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "fields", label: "Campos" },
    { id: "visual", label: "Apariencia" },
    { id: "popup", label: "Popup" },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {productId ? "Config. del Producto" : "Config. Global del Formulario"}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Resetear
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>

        {/* Country selector */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            País
          </label>
          <select
            value={config.countryCode}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {SUPPORTED_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.phonePrefix})
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "fields" && (
          <FieldsEditor fields={config.fields} onChange={handleFieldsChange} />
        )}
        {activeTab === "visual" && (
          <VisualEditor visual={config.visual} onChange={handleVisualChange} />
        )}
        {activeTab === "popup" && (
          <PopupEditor popup={config.popup} onChange={handlePopupChange} />
        )}
      </div>
    </div>
  );
}
