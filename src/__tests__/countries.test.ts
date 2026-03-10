import { describe, it, expect } from "vitest";
import {
  SUPPORTED_COUNTRIES,
  getCountryByCode,
  getDivisions,
  getCities,
  validatePhone,
} from "@/data/countries";

describe("Countries data", () => {
  it("should have 14 supported countries", () => {
    expect(SUPPORTED_COUNTRIES).toHaveLength(14);
  });

  it("should have all Dropi countries", () => {
    const codes = SUPPORTED_COUNTRIES.map((c) => c.code);
    expect(codes).toContain("CO");
    expect(codes).toContain("MX");
    expect(codes).toContain("PA");
    expect(codes).toContain("EC");
    expect(codes).toContain("PE");
    expect(codes).toContain("CL");
    expect(codes).toContain("PY");
    expect(codes).toContain("VE");
    expect(codes).toContain("AR");
    expect(codes).toContain("GT");
    expect(codes).toContain("ES");
    expect(codes).toContain("PT");
    expect(codes).toContain("CR");
    expect(codes).toContain("DO");
  });

  it("each country should have divisions with children", () => {
    for (const country of SUPPORTED_COUNTRIES) {
      expect(country.divisions.length).toBeGreaterThan(0);
      for (const div of country.divisions) {
        expect(div.children?.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("getCountryByCode", () => {
  it("returns Colombia for CO", () => {
    const co = getCountryByCode("CO");
    expect(co).toBeDefined();
    expect(co!.name).toBe("Colombia");
    expect(co!.phonePrefix).toBe("+57");
  });

  it("returns undefined for invalid code", () => {
    expect(getCountryByCode("XX")).toBeUndefined();
  });
});

describe("getDivisions", () => {
  it("returns departments for Colombia", () => {
    const deps = getDivisions("CO");
    expect(deps.length).toBeGreaterThan(0);
    expect(deps).toContain("ANTIOQUIA");
    expect(deps).toContain("CUNDINAMARCA");
  });

  it("returns states for Mexico", () => {
    const states = getDivisions("MX");
    expect(states).toContain("JALISCO");
    expect(states).toContain("CIUDAD DE MEXICO");
  });

  it("returns empty for invalid country", () => {
    expect(getDivisions("XX")).toEqual([]);
  });
});

describe("getCities", () => {
  it("returns cities for Antioquia, Colombia", () => {
    const cities = getCities("CO", "ANTIOQUIA");
    expect(cities).toContain("MEDELLIN");
    expect(cities).toContain("ENVIGADO");
  });

  it("returns cities for Cundinamarca, Colombia", () => {
    const cities = getCities("CO", "CUNDINAMARCA");
    expect(cities).toContain("BOGOTA");
    expect(cities).toContain("SOACHA");
  });

  it("returns empty for invalid division", () => {
    expect(getCities("CO", "INVALID")).toEqual([]);
  });
});

describe("validatePhone", () => {
  // Colombia
  it("validates Colombian phone: 3001234567", () => {
    expect(validatePhone("3001234567", "CO")).toBe(true);
  });
  it("validates Colombian phone with prefix: +573001234567", () => {
    expect(validatePhone("+573001234567", "CO")).toBe(true);
  });
  it("rejects invalid Colombian phone: 1234567890", () => {
    expect(validatePhone("1234567890", "CO")).toBe(false);
  });
  it("rejects short Colombian phone: 30012", () => {
    expect(validatePhone("30012", "CO")).toBe(false);
  });

  // Mexico
  it("validates Mexican phone: 5512345678", () => {
    expect(validatePhone("5512345678", "MX")).toBe(true);
  });

  // Chile
  it("validates Chilean phone: 912345678", () => {
    expect(validatePhone("912345678", "CL")).toBe(true);
  });

  // Spain
  it("validates Spanish phone: 612345678", () => {
    expect(validatePhone("612345678", "ES")).toBe(true);
  });

  // Invalid country
  it("rejects phone for invalid country", () => {
    expect(validatePhone("3001234567", "XX")).toBe(false);
  });
});
