import { NextResponse } from "next/server";
import { readStore } from "@/lib/services/store";

type Settings = Record<string, Record<string, unknown>>;

export async function GET() {
  const allSettings = await readStore<Settings>("settings", {});
  const dropi = allSettings.dropi || {};
  const apiKey = (dropi.apiKey as string) || process.env.DROPI_API_KEY || "";

  const base = "https://api.dropi.co/integrations";
  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "dropi-integration-key": apiKey,
  };

  const results: Record<string, unknown> = {
    apiKey: apiKey ? `${apiKey.slice(0, 30)}...` : "(vacío)",
  };

  const tests: Array<{ key: string; url: string; method: string; body?: unknown }> = [
    { key: "products_index", url: `${base}/products/index`, method: "POST", body: { page: 1, perpage: 1 } },
    { key: "orders_myorders_GET", url: `${base}/orders/myorders`, method: "GET" },
    { key: "orders_myorders_POST", url: `${base}/orders/myorders`, method: "POST", body: { page: 1, perpage: 1 } },
    { key: "woocommerce_orders", url: `https://api.dropi.co/woocommerce/orders`, method: "GET" },
    { key: "api_root", url: `https://api.dropi.co/`, method: "GET" },
    { key: "integrations_root", url: `${base}/`, method: "GET" },
  ];

  for (const t of tests) {
    try {
      const r = await fetch(t.url, {
        method: t.method,
        headers,
        body: t.body ? JSON.stringify(t.body) : undefined,
      });
      const text = await r.text();
      results[t.key] = { status: r.status, body: text.slice(0, 300) };
    } catch (e) {
      results[t.key] = { error: String(e) };
    }
  }

  return NextResponse.json(results);
}
