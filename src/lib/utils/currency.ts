import { getCountry } from "@/lib/constants/countries";

/**
 * Format a price for a given country code.
 * Automatically uses the correct currency symbol, locale, and decimal places.
 * Example (CO): 159000 → "$159.000"
 * Example (PE): 59.90  → "S/59,90"
 */
export function formatPrice(amount: number, countryCode = "CO"): string {
  const country = getCountry(countryCode);
  const formatted = amount.toLocaleString(country.locale, {
    minimumFractionDigits: country.decimals,
    maximumFractionDigits: country.decimals,
  });
  return `${country.currencySymbol}${formatted}`;
}

/**
 * @deprecated Use formatPrice(amount, "CO") instead.
 * Kept for backward compatibility.
 */
export function formatCOP(amount: number): string {
  return formatPrice(amount, "CO");
}

/**
 * Ensure integer price (for zero-decimal currencies like COP, CLP, PYG).
 */
export function toCOPInteger(amount: number): number {
  return Math.round(amount);
}
