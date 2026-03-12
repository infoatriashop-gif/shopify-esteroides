import { readStore } from "@/lib/services/store";

type Settings = Record<string, Record<string, unknown>>;

/**
 * Verifica las credenciales WooCommerce (consumer_key + consumer_secret).
 * Dropi envía estas credenciales como query params o Basic Auth.
 */
export async function verifyWcCredentials(req: Request): Promise<boolean> {
  const allSettings = await readStore<Settings>("settings", {});
  const dropi = allSettings.dropi || {};
  const storedKey = (dropi.wc_consumer_key as string) || process.env.WC_CONSUMER_KEY || "";
  const storedSecret = (dropi.wc_consumer_secret as string) || process.env.WC_CONSUMER_SECRET || "";

  if (!storedKey || !storedSecret) return false;

  // Method 1: Query params (WooCommerce standard)
  const url = new URL(req.url);
  const qKey = url.searchParams.get("consumer_key");
  const qSecret = url.searchParams.get("consumer_secret");
  if (qKey && qSecret) {
    return qKey === storedKey && qSecret === storedSecret;
  }

  // Method 2: Basic Auth
  const authHeader = req.headers.get("authorization") || "";
  if (authHeader.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString();
    const [user, pass] = decoded.split(":");
    return user === storedKey && pass === storedSecret;
  }

  return false;
}
