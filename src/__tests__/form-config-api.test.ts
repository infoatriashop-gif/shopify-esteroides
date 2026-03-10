import { describe, it, expect, vi, beforeEach } from "vitest";
import { DEFAULT_EXTENDED_FORM_CONFIG } from "@/types/form-config";
import type { ExtendedFormConfig } from "@/types/form-config";

// Mock the store module
vi.mock("@/lib/services/store", () => {
  let store: Record<string, unknown> = {};
  return {
    readStore: vi.fn((key: string, defaultValue: unknown) => {
      return store[key] ?? defaultValue;
    }),
    writeStore: vi.fn((key: string, data: unknown) => {
      store[key] = data;
    }),
    // Helper to reset store between tests
    __resetStore: () => {
      store = {};
    },
  };
});

// Import after mock
import { readStore, writeStore } from "@/lib/services/store";

describe("Form Config API logic", () => {
  beforeEach(() => {
    // Reset mock store
    (
      readStore as unknown as { __resetStore?: () => void }
    ).__resetStore?.call(null);
    vi.mocked(readStore).mockClear();
    vi.mocked(writeStore).mockClear();
  });

  it("returns default global config when store is empty", () => {
    const store = readStore("form-configs", {
      global: DEFAULT_EXTENDED_FORM_CONFIG,
      products: {},
    });

    expect(store.global.id).toBe("global");
    expect(store.global.fields.length).toBe(9);
    expect(store.global.visual.primaryColor).toBe("#16a34a");
  });

  it("saves global config", () => {
    const config: ExtendedFormConfig = {
      ...DEFAULT_EXTENDED_FORM_CONFIG,
      visual: { ...DEFAULT_EXTENDED_FORM_CONFIG.visual, primaryColor: "#ff0000" },
    };

    writeStore("form-configs", {
      global: config,
      products: {},
    });

    expect(writeStore).toHaveBeenCalledWith("form-configs", {
      global: expect.objectContaining({
        visual: expect.objectContaining({ primaryColor: "#ff0000" }),
      }),
      products: {},
    });
  });

  it("saves product-specific config", () => {
    const productConfig: ExtendedFormConfig = {
      ...DEFAULT_EXTENDED_FORM_CONFIG,
      id: "product-42",
      name: "Config Producto 42",
      visual: { ...DEFAULT_EXTENDED_FORM_CONFIG.visual, buttonText: "Comprar Producto" },
    };

    const store = {
      global: DEFAULT_EXTENDED_FORM_CONFIG,
      products: { "42": productConfig },
    };

    writeStore("form-configs", store);

    expect(writeStore).toHaveBeenCalledWith("form-configs", expect.objectContaining({
      products: expect.objectContaining({
        "42": expect.objectContaining({
          id: "product-42",
          visual: expect.objectContaining({ buttonText: "Comprar Producto" }),
        }),
      }),
    }));
  });

  it("product config inherits from global when not overridden", () => {
    const globalConfig = DEFAULT_EXTENDED_FORM_CONFIG;
    const store = {
      global: globalConfig,
      products: {} as Record<string, ExtendedFormConfig>,
    };

    // When product has no override, return global
    const productId = "99";
    const result = store.products[productId] ?? store.global;

    expect(result.id).toBe("global");
    expect(result.visual.primaryColor).toBe(globalConfig.visual.primaryColor);
  });

  it("product config overrides global when set", () => {
    const store = {
      global: DEFAULT_EXTENDED_FORM_CONFIG,
      products: {
        "42": {
          ...DEFAULT_EXTENDED_FORM_CONFIG,
          id: "product-42",
          visual: {
            ...DEFAULT_EXTENDED_FORM_CONFIG.visual,
            primaryColor: "#ff5500",
            buttonText: "Pedir con COD",
          },
        },
      },
    };

    const result = store.products["42"] ?? store.global;
    expect(result.id).toBe("product-42");
    expect(result.visual.primaryColor).toBe("#ff5500");
    expect(result.visual.buttonText).toBe("Pedir con COD");
  });
});
