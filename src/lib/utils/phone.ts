/**
 * Normalize phone to E.164 format for Colombia
 * Examples:
 *   "3001234567"    → "+573001234567"
 *   "573001234567"  → "+573001234567"
 *   "+573001234567" → "+573001234567"
 */
export function normalizePhoneE164(phone: string, countryCode = "CO"): string {
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, "");

  const prefixes: Record<string, string> = {
    CO: "+57",
    MX: "+52",
    CL: "+56",
    EC: "+593",
    PE: "+51",
    AR: "+54",
    PA: "+507",
    ES: "+34",
    PT: "+351",
  };

  const prefix = prefixes[countryCode] || "+57";
  const prefixDigits = prefix.replace("+", "");

  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith(prefixDigits)) return "+" + cleaned;
  return prefix + cleaned;
}

/**
 * Validate Colombian phone number
 * Must be 10 digits starting with 3
 */
export function isValidCOPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\.+57]/g, "");
  return /^3\d{9}$/.test(cleaned);
}
