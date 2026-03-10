import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FieldsEditor } from "@/components/form-builder/fields-editor";
import { FormPreview } from "@/components/form-builder/form-preview";
import { PopupEditor } from "@/components/form-builder/popup-editor";
import { DEFAULT_FORM_FIELDS, DEFAULT_EXTENDED_FORM_CONFIG } from "@/types/form-config";
import type { ExtendedFormConfig, FormFieldConfig, FormPopupConfig } from "@/types/form-config";

describe("FieldsEditor", () => {
  it("renders all configured fields", () => {
    const onChange = vi.fn();
    render(<FieldsEditor fields={DEFAULT_FORM_FIELDS} onChange={onChange} />);

    // All 9 default fields should render
    expect(screen.getByTestId("field-fullName")).toBeInTheDocument();
    expect(screen.getByTestId("field-phone")).toBeInTheDocument();
    expect(screen.getByTestId("field-email")).toBeInTheDocument();
    expect(screen.getByTestId("field-country")).toBeInTheDocument();
    expect(screen.getByTestId("field-department")).toBeInTheDocument();
    expect(screen.getByTestId("field-city")).toBeInTheDocument();
    expect(screen.getByTestId("field-address")).toBeInTheDocument();
    expect(screen.getByTestId("field-addressComplement")).toBeInTheDocument();
    expect(screen.getByTestId("field-notes")).toBeInTheDocument();
  });

  it("calls onChange when toggling field visibility", () => {
    const onChange = vi.fn();
    render(<FieldsEditor fields={DEFAULT_FORM_FIELDS} onChange={onChange} />);

    // Toggle the email field (currently visible=false, click should make it visible)
    const toggles = screen.getAllByRole("checkbox", { name: /Toggle/i });
    fireEvent.click(toggles[2]); // email is 3rd field by order

    expect(onChange).toHaveBeenCalled();
    const updatedFields = onChange.mock.calls[0][0] as FormFieldConfig[];
    const emailField = updatedFields.find((f) => f.id === "email");
    expect(emailField?.visible).toBe(true);
  });
});

describe("FormPreview", () => {
  it("renders visible fields in the preview", () => {
    render(<FormPreview config={DEFAULT_EXTENDED_FORM_CONFIG} />);

    // Should show the submit button with default text
    expect(screen.getByText("Confirmar Pedido COD")).toBeInTheDocument();
  });

  it("shows product summary when enabled", () => {
    render(<FormPreview config={DEFAULT_EXTENDED_FORM_CONFIG} />);
    expect(screen.getByText("Producto ejemplo")).toBeInTheDocument();
  });

  it("shows trust badges when enabled", () => {
    render(<FormPreview config={DEFAULT_EXTENDED_FORM_CONFIG} />);
    expect(screen.getByText(/Pago seguro/)).toBeInTheDocument();
  });

  it("hides product summary when disabled", () => {
    const config: ExtendedFormConfig = {
      ...DEFAULT_EXTENDED_FORM_CONFIG,
      visual: { ...DEFAULT_EXTENDED_FORM_CONFIG.visual, showProductSummary: false },
    };
    render(<FormPreview config={config} />);
    expect(screen.queryByText("Producto ejemplo")).not.toBeInTheDocument();
  });

  it("updates button text when config changes", () => {
    const config: ExtendedFormConfig = {
      ...DEFAULT_EXTENDED_FORM_CONFIG,
      visual: { ...DEFAULT_EXTENDED_FORM_CONFIG.visual, buttonText: "Pedir ahora COD" },
    };
    render(<FormPreview config={config} />);
    expect(screen.getByText("Pedir ahora COD")).toBeInTheDocument();
  });

  it("shows urgency timer when enabled", () => {
    render(<FormPreview config={DEFAULT_EXTENDED_FORM_CONFIG} />);
    expect(screen.getByText(/Oferta expira en/)).toBeInTheDocument();
  });
});

describe("PopupEditor", () => {
  it("shows popup config when enabled", () => {
    const onChange = vi.fn();
    const popup: FormPopupConfig = {
      enabled: true,
      triggerText: "Comprar ahora",
      triggerColor: "#16a34a",
      animation: "slide-up",
    };
    render(<PopupEditor popup={popup} onChange={onChange} />);

    expect(screen.getByDisplayValue("Comprar ahora")).toBeInTheDocument();
  });

  it("hides popup config when disabled", () => {
    const onChange = vi.fn();
    const popup: FormPopupConfig = {
      enabled: false,
      triggerText: "Comprar ahora",
      triggerColor: "#16a34a",
      animation: "slide-up",
    };
    render(<PopupEditor popup={popup} onChange={onChange} />);

    // Trigger text input should NOT be visible when disabled
    expect(screen.queryByDisplayValue("Comprar ahora")).not.toBeInTheDocument();
  });
});

describe("FormPreview popup mode", () => {
  it("opens popup when trigger button is clicked", () => {
    const config: ExtendedFormConfig = {
      ...DEFAULT_EXTENDED_FORM_CONFIG,
      popup: {
        enabled: true,
        triggerText: "Comprar ahora",
        triggerColor: "#16a34a",
        animation: "slide-up",
      },
    };

    render(<FormPreview config={config} />);

    // Switch to popup mode
    const popupBtn = screen.getByText("Popup");
    fireEvent.click(popupBtn);

    // Click trigger button
    const triggerBtn = screen.getByText("Comprar ahora");
    fireEvent.click(triggerBtn);

    // Modal should appear
    expect(screen.getByTestId("popup-modal")).toBeInTheDocument();
  });

  it("closes popup when close button is clicked", () => {
    const config: ExtendedFormConfig = {
      ...DEFAULT_EXTENDED_FORM_CONFIG,
      popup: {
        enabled: true,
        triggerText: "Comprar",
        triggerColor: "#16a34a",
        animation: "fade",
      },
    };

    render(<FormPreview config={config} />);

    // Switch to popup mode and open
    fireEvent.click(screen.getByText("Popup"));
    fireEvent.click(screen.getByText("Comprar"));

    // Close
    fireEvent.click(screen.getByTestId("popup-close"));
    expect(screen.queryByTestId("popup-modal")).not.toBeInTheDocument();
  });
});
