import { NextResponse } from "next/server";
import { readStore } from "@/lib/services/store";

type DropiSettings = {
  wc_consumer_key?: string;
  wc_consumer_secret?: string;
};

/**
 * WooCommerce-compatible system_status endpoint.
 * Dropi calls this to verify the store is reachable and credentials are valid.
 */
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization") || "";

  if (authHeader.startsWith("Basic ")) {
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf-8");
    const [key, secret] = decoded.split(":");

    const allSettings = await readStore<Record<string, DropiSettings>>("settings", {});
    const dropi = allSettings.dropi || {};

    if (key !== dropi.wc_consumer_key || secret !== dropi.wc_consumer_secret) {
      return NextResponse.json({ code: "woocommerce_rest_cannot_view", message: "Sorry, you cannot list resources." }, { status: 401 });
    }
  }

  return NextResponse.json({
    environment: {
      site_url: process.env.NEXT_PUBLIC_APP_URL || "https://shopify-esteroides--shopify-esteroides-2026.us-central1.hosted.app",
      wc_version: "8.0.0",
      wp_version: "6.4.0",
    },
    database: { wc_database_version: "8.0.0" },
    active_plugins: [],
    theme: { name: "Shopify Esteroides" },
  });
}
