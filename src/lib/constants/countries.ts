export type CountryCode = "CO" | "PE" | "MX" | "EC" | "CL" | "AR" | "PA" | "GT" | "CR" | "PY";

export type CountryConfig = {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;      // ISO 4217
  currencySymbol: string;
  locale: string;        // BCP 47 for toLocaleString
  decimals: number;      // 0 for COP/CLP/PYG, 2 for others
  defaultShipping: number;
  defaultCodFee: number;
  phoneMinDigits: number;
  phoneMaxDigits: number;
  hasDepartments: boolean; // if true, uses fixed dropdown; else free text
};

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  CO: {
    code: "CO", name: "Colombia", flag: "🇨🇴",
    currency: "COP", currencySymbol: "$", locale: "es-CO", decimals: 0,
    defaultShipping: 12000, defaultCodFee: 3000,
    phoneMinDigits: 10, phoneMaxDigits: 10, hasDepartments: true,
  },
  PE: {
    code: "PE", name: "Perú", flag: "🇵🇪",
    currency: "PEN", currencySymbol: "S/", locale: "es-PE", decimals: 2,
    defaultShipping: 10, defaultCodFee: 3,
    phoneMinDigits: 9, phoneMaxDigits: 9, hasDepartments: false,
  },
  MX: {
    code: "MX", name: "México", flag: "🇲🇽",
    currency: "MXN", currencySymbol: "$", locale: "es-MX", decimals: 2,
    defaultShipping: 50, defaultCodFee: 20,
    phoneMinDigits: 10, phoneMaxDigits: 10, hasDepartments: false,
  },
  EC: {
    code: "EC", name: "Ecuador", flag: "🇪🇨",
    currency: "USD", currencySymbol: "$", locale: "es-EC", decimals: 2,
    defaultShipping: 3, defaultCodFee: 1,
    phoneMinDigits: 9, phoneMaxDigits: 10, hasDepartments: false,
  },
  CL: {
    code: "CL", name: "Chile", flag: "🇨🇱",
    currency: "CLP", currencySymbol: "$", locale: "es-CL", decimals: 0,
    defaultShipping: 2500, defaultCodFee: 1000,
    phoneMinDigits: 9, phoneMaxDigits: 9, hasDepartments: false,
  },
  AR: {
    code: "AR", name: "Argentina", flag: "🇦🇷",
    currency: "ARS", currencySymbol: "$", locale: "es-AR", decimals: 2,
    defaultShipping: 500, defaultCodFee: 200,
    phoneMinDigits: 10, phoneMaxDigits: 11, hasDepartments: false,
  },
  PA: {
    code: "PA", name: "Panamá", flag: "🇵🇦",
    currency: "USD", currencySymbol: "$", locale: "es-PA", decimals: 2,
    defaultShipping: 3, defaultCodFee: 1,
    phoneMinDigits: 8, phoneMaxDigits: 8, hasDepartments: false,
  },
  GT: {
    code: "GT", name: "Guatemala", flag: "🇬🇹",
    currency: "GTQ", currencySymbol: "Q", locale: "es-GT", decimals: 2,
    defaultShipping: 15, defaultCodFee: 5,
    phoneMinDigits: 8, phoneMaxDigits: 8, hasDepartments: false,
  },
  CR: {
    code: "CR", name: "Costa Rica", flag: "🇨🇷",
    currency: "CRC", currencySymbol: "₡", locale: "es-CR", decimals: 0,
    defaultShipping: 1500, defaultCodFee: 500,
    phoneMinDigits: 8, phoneMaxDigits: 8, hasDepartments: false,
  },
  PY: {
    code: "PY", name: "Paraguay", flag: "🇵🇾",
    currency: "PYG", currencySymbol: "₲", locale: "es-PY", decimals: 0,
    defaultShipping: 15000, defaultCodFee: 5000,
    phoneMinDigits: 9, phoneMaxDigits: 9, hasDepartments: false,
  },
};

export const COUNTRY_LIST = Object.values(COUNTRIES);

export function getCountry(code: string): CountryConfig {
  return COUNTRIES[(code as CountryCode) ?? "CO"] ?? COUNTRIES.CO;
}
