/**
 * Extended form configuration types for the configurable checkout form builder.
 */

export type FormFieldType = "text" | "tel" | "email" | "select" | "textarea";

export type FormFieldConfig = {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  visible: boolean;
  order: number;
  placeholder: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    patternMessage?: string;
  };
};

export type FormVisualConfig = {
  primaryColor: string;
  backgroundColor: string;
  borderRadius: "none" | "sm" | "md" | "lg" | "xl" | "full";
  fontFamily: "Inter" | "Poppins" | "Roboto" | "Open Sans" | "system";
  buttonSize: "sm" | "md" | "lg";
  buttonText: string;
  showProductSummary: boolean;
  logoUrl: string | null;
  showTrustBadges: boolean;
  showUrgencyTimer: boolean;
  urgencyMinutes: number;
  showSocialProof: boolean;
  showSavingsBadge: boolean;
};

export type FormPopupConfig = {
  enabled: boolean;
  triggerText: string;
  triggerSubtext: string;
  triggerColor: string;
  triggerColorTo: string;        // gradient end color (empty = solid)
  triggerTextColor: string;
  triggerBorderColor: string;
  triggerBorderWidth: number;    // 0 = no border
  triggerBorderRadius: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animation: "slide-up" | "fade" | "scale";
};

export type ExtendedFormConfig = {
  id: string;
  name: string;
  countryCode: string;
  fields: FormFieldConfig[];
  visual: FormVisualConfig;
  popup: FormPopupConfig;
  updatedAt: string;
};

// Default fields for a new form config
export const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  { id: "fullName", label: "Nombre completo", type: "text", required: true, visible: true, order: 0, placeholder: "Tu nombre completo", validation: { minLength: 2, maxLength: 100 } },
  { id: "phone", label: "Teléfono", type: "tel", required: true, visible: true, order: 1, placeholder: "300 123 4567" },
  { id: "email", label: "Correo electrónico", type: "email", required: false, visible: false, order: 2, placeholder: "tu@email.com" },
  { id: "country", label: "País", type: "select", required: true, visible: true, order: 3, placeholder: "Selecciona tu país" },
  { id: "department", label: "Departamento", type: "select", required: true, visible: true, order: 4, placeholder: "Selecciona departamento" },
  { id: "city", label: "Ciudad", type: "select", required: true, visible: true, order: 5, placeholder: "Selecciona ciudad" },
  { id: "address", label: "Dirección", type: "text", required: true, visible: true, order: 6, placeholder: "Calle, número, barrio", validation: { minLength: 5, maxLength: 500 } },
  { id: "addressComplement", label: "Dirección complementaria", type: "text", required: false, visible: true, order: 7, placeholder: "Apto, torre, interior (opcional)" },
  { id: "notes", label: "Notas del pedido", type: "textarea", required: false, visible: true, order: 8, placeholder: "Instrucciones especiales (opcional)", validation: { maxLength: 500 } },
];

export const DEFAULT_VISUAL_CONFIG: FormVisualConfig = {
  primaryColor: "#16a34a",
  backgroundColor: "#ffffff",
  borderRadius: "lg",
  fontFamily: "Inter",
  buttonSize: "lg",
  buttonText: "Confirmar Pedido COD",
  showProductSummary: true,
  logoUrl: null,
  showTrustBadges: true,
  showUrgencyTimer: true,
  urgencyMinutes: 15,
  showSocialProof: true,
  showSavingsBadge: true,
};

export const DEFAULT_POPUP_CONFIG: FormPopupConfig = {
  enabled: true,
  triggerText: "Comprar ahora",
  triggerSubtext: "Pago contra entrega · Envío a todo Colombia",
  triggerColor: "#16a34a",
  triggerColorTo: "#059669",
  triggerTextColor: "#ffffff",
  triggerBorderColor: "#15803d",
  triggerBorderWidth: 0,
  triggerBorderRadius: "xl",
  animation: "slide-up",
};

export const DEFAULT_EXTENDED_FORM_CONFIG: ExtendedFormConfig = {
  id: "global",
  name: "Configuración Global",
  countryCode: "CO",
  fields: DEFAULT_FORM_FIELDS,
  visual: DEFAULT_VISUAL_CONFIG,
  popup: DEFAULT_POPUP_CONFIG,
  updatedAt: new Date().toISOString(),
};
