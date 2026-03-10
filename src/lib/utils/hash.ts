import { createHash } from "crypto";

/**
 * SHA256 hash for PII (Facebook CAPI / TikTok Events API)
 * Normalizes before hashing: lowercase, trim
 */
export function sha256(value: string): string {
  return createHash("sha256")
    .update(value.toLowerCase().trim())
    .digest("hex");
}

/**
 * Hash user data for Facebook Conversions API
 */
export function hashUserDataForCAPI(data: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  postcode?: string;
}) {
  return {
    em: data.email ? sha256(data.email) : undefined,
    ph: data.phone ? sha256(data.phone) : undefined,
    fn: data.firstName ? sha256(data.firstName) : undefined,
    ln: data.lastName ? sha256(data.lastName) : undefined,
    country: data.country ? sha256(data.country.toLowerCase()) : undefined,
    ct: data.city ? sha256(data.city) : undefined,
    zp: data.postcode ? sha256(data.postcode) : undefined,
  };
}
