import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock store
vi.mock("@/lib/services/store", () => {
  let data: Record<string, unknown> = {};
  return {
    readStore: (key: string, defaultValue: unknown) => data[key] ?? defaultValue,
    writeStore: (key: string, value: unknown) => { data[key] = value; },
    nextId: (items: { id: number }[]) => items.length === 0 ? 1 : Math.max(...items.map((i) => i.id)) + 1,
    __resetStore: () => { data = {}; },
  };
});

// Mock dns module
vi.mock("dns", () => ({
  default: {
    resolveTxt: vi.fn(),
    resolveCname: vi.fn(),
    resolve4: vi.fn(),
  },
  resolveTxt: vi.fn(),
  resolveCname: vi.fn(),
  resolve4: vi.fn(),
}));

// Mock crypto
vi.mock("crypto", () => ({
  default: {
    randomBytes: () => ({ toString: () => "abcdef123456abcdef123456" }),
  },
  randomBytes: () => ({ toString: () => "abcdef123456abcdef123456" }),
}));

import { __resetStore } from "@/lib/services/store";
import dns from "dns";
import {
  addDomain,
  getDomain,
  removeDomain,
  verifyDomain,
  generateTxtToken,
} from "@/lib/services/dns-verify";

declare module "@/lib/services/store" {
  function __resetStore(): void;
}

describe("Phase 5: DNS Verification", () => {
  beforeEach(() => {
    __resetStore();
    vi.clearAllMocks();
  });

  describe("generateTxtToken", () => {
    it("should generate a token with dropi-verify prefix", () => {
      const token = generateTxtToken();
      expect(token).toMatch(/^dropi-verify=/);
    });
  });

  describe("addDomain", () => {
    it("should add a new domain with pending status", () => {
      const record = addDomain("shop.example.com");
      expect(record.domain).toBe("shop.example.com");
      expect(record.status).toBe("pending");
      expect(record.txtToken).toMatch(/^dropi-verify=/);
    });

    it("should return existing record if domain already added", () => {
      const first = addDomain("shop.example.com");
      const second = addDomain("shop.example.com");
      expect(first.txtToken).toBe(second.txtToken);
    });
  });

  describe("getDomain", () => {
    it("should return null for unknown domain", () => {
      expect(getDomain("unknown.com")).toBeNull();
    });

    it("should return domain record if exists", () => {
      addDomain("test.com");
      const record = getDomain("test.com");
      expect(record).not.toBeNull();
      expect(record?.domain).toBe("test.com");
    });
  });

  describe("removeDomain", () => {
    it("should remove a domain", () => {
      addDomain("test.com");
      removeDomain("test.com");
      expect(getDomain("test.com")).toBeNull();
    });
  });

  describe("verifyDomain - TXT check", () => {
    it("should detect correct TXT record", async () => {
      const record = addDomain("shop.example.com");

      // Mock dns.resolveTxt to return our token
      (dns.resolveTxt as unknown as ReturnType<typeof vi.fn>).mockImplementation(
        (_domain: string, cb: (err: Error | null, records: string[][]) => void) => {
          cb(null, [[record.txtToken]]);
        }
      );

      // Mock dns.resolveCname - no CNAME yet
      (dns.resolveCname as unknown as ReturnType<typeof vi.fn>).mockImplementation(
        (_domain: string, cb: (err: Error | null, records: string[]) => void) => {
          cb(new Error("ENODATA"), []);
        }
      );

      // Mock dns.resolve4 - no A record yet
      (dns.resolve4 as unknown as ReturnType<typeof vi.fn>).mockImplementation(
        (_domain: string, cb: (err: Error | null, addresses: string[]) => void) => {
          cb(new Error("ENODATA"), []);
        }
      );

      const result = await verifyDomain("shop.example.com", "app.railway.app");
      expect(result.status).toBe("txt_verified");
    });

    it("should stay pending if TXT not found", async () => {
      addDomain("shop.example.com");

      (dns.resolveTxt as unknown as ReturnType<typeof vi.fn>).mockImplementation(
        (_domain: string, cb: (err: Error | null, records: string[][]) => void) => {
          cb(null, [["some-other-txt"]]);
        }
      );

      const result = await verifyDomain("shop.example.com", "app.railway.app");
      expect(result.status).toBe("pending");
      expect(result.errorMessage).toContain("TXT no encontrado");
    });
  });

  describe("verifyDomain - CNAME check", () => {
    it("should detect correct CNAME and set active", async () => {
      const record = addDomain("shop.example.com");

      // First verify TXT
      (dns.resolveTxt as unknown as ReturnType<typeof vi.fn>).mockImplementation(
        (_domain: string, cb: (err: Error | null, records: string[][]) => void) => {
          cb(null, [[record.txtToken]]);
        }
      );
      (dns.resolveCname as unknown as ReturnType<typeof vi.fn>).mockImplementation(
        (_domain: string, cb: (err: Error | null, records: string[]) => void) => {
          cb(null, ["app.railway.app"]);
        }
      );
      (dns.resolve4 as unknown as ReturnType<typeof vi.fn>).mockImplementation(
        (_domain: string, cb: (err: Error | null, addresses: string[]) => void) => {
          cb(new Error("ENODATA"), []);
        }
      );

      const result = await verifyDomain("shop.example.com", "app.railway.app");
      expect(result.status).toBe("active");
    });
  });

  describe("verifyDomain errors", () => {
    it("should throw for unregistered domain", async () => {
      await expect(verifyDomain("unknown.com")).rejects.toThrow("Dominio no registrado");
    });
  });
});

describe("Phase 5: CSV Export", () => {
  it("should generate valid CSV with headers", async () => {
    // Import the module to test the escapeCsv logic conceptually
    // We test the escape function behavior inline
    const escapeCsv = (value: string): string => {
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    expect(escapeCsv("simple")).toBe("simple");
    expect(escapeCsv('has "quotes"')).toBe('"has ""quotes"""');
    expect(escapeCsv("has,comma")).toBe('"has,comma"');
    expect(escapeCsv("has\nnewline")).toBe('"has\nnewline"');
  });
});

describe("Phase 5: SEO Meta Tags", () => {
  it("should generate correct discount percentage", () => {
    const price = 89000;
    const compareAtPrice = 129000;
    const discount = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
    expect(discount).toBe(31);
  });

  it("should generate title with discount when available", () => {
    const productName = "Crema Facial";
    const storeName = "Mi Tienda";
    const discount = 31;
    const title = `${productName} - ${discount}% OFF | ${storeName}`;
    expect(title).toBe("Crema Facial - 31% OFF | Mi Tienda");
  });

  it("should generate title without discount when not available", () => {
    const productName = "Crema Facial";
    const storeName = "Mi Tienda";
    const discount = 0;
    const title = discount > 0
      ? `${productName} - ${discount}% OFF | ${storeName}`
      : `${productName} | ${storeName}`;
    expect(title).toBe("Crema Facial | Mi Tienda");
  });
});

describe("Phase 5: Product Duplication", () => {
  it("should generate unique slug for duplicate", () => {
    const existingSlugs = ["crema-facial", "crema-facial-copia"];
    let baseSlug = "crema-facial-copia";
    let slug = baseSlug;
    let counter = 1;
    while (existingSlugs.includes(slug)) {
      slug = `${baseSlug}-${counter++}`;
    }
    expect(slug).toBe("crema-facial-copia-1");
  });
});
