"use client";

import { useState, useMemo, useCallback } from "react";
import type { ExtendedFormConfig } from "@/types/form-config";
import { getDivisions, getCities, getCountryByCode } from "@/data/countries";

type PreviewMode = "inline" | "popup";
type DeviceSize = "desktop" | "tablet" | "mobile";

const DEVICE_WIDTHS: Record<DeviceSize, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

const BORDER_RADIUS_MAP: Record<string, string> = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
};

const BUTTON_PADDING: Record<string, string> = {
  sm: "8px 16px",
  md: "12px 24px",
  lg: "16px 32px",
};

type FormPreviewProps = {
  config: ExtendedFormConfig;
};

export function FormPreview({ config }: FormPreviewProps) {
  const [device, setDevice] = useState<DeviceSize>("desktop");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("inline");
  const [darkPreview, setDarkPreview] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const visibleFields = useMemo(
    () => [...config.fields].filter((f) => f.visible).sort((a, b) => a.order - b.order),
    [config.fields]
  );

  const divisions = useMemo(() => getDivisions(config.countryCode), [config.countryCode]);
  const cities = useMemo(() => getCities(config.countryCode, selectedDepartment), [config.countryCode, selectedDepartment]);
  const country = useMemo(() => getCountryByCode(config.countryCode), [config.countryCode]);

  const borderRadius = BORDER_RADIUS_MAP[config.visual.borderRadius] || "12px";
  const buttonPadding = BUTTON_PADDING[config.visual.buttonSize] || "12px 24px";

  const fontFamily =
    config.visual.fontFamily === "system"
      ? "-apple-system, BlinkMacSystemFont, sans-serif"
      : `"${config.visual.fontFamily}", sans-serif`;

  const renderField = useCallback(
    (field: typeof visibleFields[0]) => {
      const baseInputStyle: React.CSSProperties = {
        width: "100%",
        padding: "10px 14px",
        borderRadius,
        border: darkPreview ? "1px solid #374151" : "1px solid #d1d5db",
        backgroundColor: darkPreview ? "#1f2937" : "#ffffff",
        color: darkPreview ? "#f3f4f6" : "#111827",
        fontSize: "14px",
        fontFamily,
        outline: "none",
      };

      if (field.id === "country") {
        return (
          <select style={baseInputStyle} defaultValue={config.countryCode}>
            <option value={config.countryCode}>{country?.name || config.countryCode}</option>
          </select>
        );
      }

      if (field.id === "department") {
        return (
          <select
            style={baseInputStyle}
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">{field.placeholder}</option>
            {divisions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        );
      }

      if (field.id === "city") {
        return (
          <select style={baseInputStyle}>
            <option value="">{field.placeholder}</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        );
      }

      if (field.type === "textarea") {
        return (
          <textarea
            style={{ ...baseInputStyle, minHeight: "80px", resize: "vertical" }}
            placeholder={field.placeholder}
            readOnly
          />
        );
      }

      if (field.type === "select") {
        return (
          <select style={baseInputStyle}>
            <option value="">{field.placeholder}</option>
          </select>
        );
      }

      return (
        <input
          type={field.type}
          style={baseInputStyle}
          placeholder={field.placeholder}
          readOnly
        />
      );
    },
    [darkPreview, borderRadius, fontFamily, config.countryCode, country, divisions, cities, selectedDepartment]
  );

  const formContent = (
    <div
      style={{
        backgroundColor: darkPreview ? "#111827" : config.visual.backgroundColor,
        color: darkPreview ? "#f3f4f6" : "#111827",
        fontFamily,
        padding: "24px",
        borderRadius,
      }}
    >
      {/* Logo */}
      {config.visual.logoUrl && (
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <img
            src={config.visual.logoUrl}
            alt="Logo"
            style={{ maxHeight: "48px", margin: "0 auto" }}
          />
        </div>
      )}

      {/* Product summary placeholder */}
      {config.visual.showProductSummary && (
        <div
          style={{
            padding: "12px",
            marginBottom: "16px",
            borderRadius,
            border: darkPreview ? "1px solid #374151" : "1px solid #e5e7eb",
            backgroundColor: darkPreview ? "#1f2937" : "#f9fafb",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "8px",
                backgroundColor: darkPreview ? "#374151" : "#e5e7eb",
              }}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>Producto ejemplo</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: config.visual.primaryColor }}>
                $89.000
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Urgency timer */}
      {config.visual.showUrgencyTimer && (
        <div
          style={{
            textAlign: "center",
            padding: "8px",
            marginBottom: "12px",
            borderRadius,
            backgroundColor: darkPreview ? "#7f1d1d" : "#fef2f2",
            color: darkPreview ? "#fca5a5" : "#dc2626",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          ⏰ Oferta expira en {config.visual.urgencyMinutes}:00 minutos
        </div>
      )}

      {/* Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {visibleFields.map((field) => (
          <div key={field.id}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "4px",
                color: darkPreview ? "#d1d5db" : "#374151",
              }}
            >
              {field.label}
              {field.required && (
                <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>
              )}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>

      {/* Social proof */}
      {config.visual.showSocialProof && (
        <div
          style={{
            marginTop: "12px",
            padding: "8px",
            borderRadius,
            backgroundColor: darkPreview ? "#1e3a5f" : "#eff6ff",
            color: darkPreview ? "#93c5fd" : "#1d4ed8",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          🔥 15 personas están viendo este producto ahora
        </div>
      )}

      {/* Submit button */}
      <button
        style={{
          width: "100%",
          padding: buttonPadding,
          marginTop: "16px",
          borderRadius,
          backgroundColor: config.visual.primaryColor,
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
          fontFamily,
        }}
      >
        {config.visual.buttonText}
      </button>

      {/* Trust badges */}
      {config.visual.showTrustBadges && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginTop: "12px",
            fontSize: "11px",
            color: darkPreview ? "#9ca3af" : "#6b7280",
          }}
        >
          <span>🔒 Pago seguro</span>
          <span>🚚 Envío rápido</span>
          <span>✅ Garantía</span>
        </div>
      )}

      {/* Savings badge */}
      {config.visual.showSavingsBadge && (
        <div
          style={{
            textAlign: "center",
            marginTop: "8px",
            fontSize: "12px",
            color: darkPreview ? "#86efac" : "#16a34a",
            fontWeight: 600,
          }}
        >
          💰 ¡Ahorras $40.000 con esta oferta!
        </div>
      )}
    </div>
  );

  const popupContent = (
    <>
      {/* Trigger button */}
      <div style={{ textAlign: "center", padding: "40px" }}>
        <button
          onClick={() => setPopupOpen(true)}
          style={{
            padding: "16px 32px",
            borderRadius: "12px",
            backgroundColor: config.popup.triggerColor,
            color: "#fff",
            fontWeight: 700,
            fontSize: "18px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          {config.popup.triggerText}
        </button>
      </div>

      {/* Modal overlay */}
      {popupOpen && (
        <div
          data-testid="popup-overlay"
          onClick={() => setPopupOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            data-testid="popup-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxHeight: "90%",
              overflow: "auto",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              animation:
                config.popup.animation === "slide-up"
                  ? "slideUp 0.3s ease-out"
                  : config.popup.animation === "fade"
                  ? "fadeIn 0.3s ease-out"
                  : "scaleIn 0.3s ease-out",
            }}
          >
            {/* Close button */}
            <div
              style={{
                textAlign: "right",
                padding: "8px 12px",
                backgroundColor: darkPreview ? "#111827" : config.visual.backgroundColor,
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              <button
                onClick={() => setPopupOpen(false)}
                data-testid="popup-close"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: darkPreview ? "#9ca3af" : "#6b7280",
                }}
              >
                ✕
              </button>
            </div>
            {formContent}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-950">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Vista previa</h3>
        <div className="flex gap-2 flex-wrap">
          {/* Device toggle */}
          <div className="flex rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            {(["desktop", "tablet", "mobile"] as DeviceSize[]).map((d) => (
              <button
                key={d}
                onClick={() => setDevice(d)}
                className={`px-2 py-1 text-xs transition-colors ${
                  device === d
                    ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {d === "desktop" ? "🖥️" : d === "tablet" ? "📱" : "📲"}
              </button>
            ))}
          </div>

          {/* Inline/Popup toggle */}
          <div className="flex rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setPreviewMode("inline")}
              className={`px-2 py-1 text-xs transition-colors ${
                previewMode === "inline"
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Inline
            </button>
            <button
              onClick={() => {
                setPreviewMode("popup");
                setPopupOpen(false);
              }}
              className={`px-2 py-1 text-xs transition-colors ${
                previewMode === "popup"
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Popup
            </button>
          </div>

          {/* Dark/light toggle */}
          <button
            onClick={() => setDarkPreview(!darkPreview)}
            className="px-2 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {darkPreview ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto flex justify-center p-4">
        <div
          data-testid="preview-container"
          style={{
            width: DEVICE_WIDTHS[device],
            maxWidth: "100%",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            backgroundColor: darkPreview ? "#030712" : "#ffffff",
            border: darkPreview ? "1px solid #1f2937" : "1px solid #e5e7eb",
          }}
        >
          {previewMode === "popup" && config.popup.enabled
            ? popupContent
            : formContent}
        </div>
      </div>
    </div>
  );
}
