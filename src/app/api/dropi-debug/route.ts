import { NextResponse } from "next/server";
import { readStore } from "@/lib/services/store";

type Settings = Record<string, Record<string, unknown>>;

/**
 * Debug endpoint — llama a Dropi y retorna la respuesta completa.
 * Probar en: GET /api/dropi-debug
 * ELIMINAR en producción final.
 */
export async function GET() {
  const allSettings = await readStore<Settings>("settings", {});
  const dropi = allSettings.dropi || {};
  const apiKey = (dropi.apiKey as string) || "";
  const countryCode = (dropi.countryCode as string) || "CO";

  const URLS: Record<string, string> = {
    CO: "https://api.dropi.co/integrations",
    PY: "https://api.dropi.com.py/integrations",
  };
  const baseUrl = URLS[countryCode] || URLS.CO;

  const results: Record<string, unknown> = {
    apiKey: apiKey ? `${apiKey.slice(0, 20)}...` : "(vacío)",
    countryCode,
    baseUrl,
  };

  // Test 1: products/index
  try {
    const r1 = await fetch(`${baseUrl}/products/index`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "dropi-integration-key": apiKey,
      },
      body: JSON.stringify({ page: 1, perpage: 1 }),
    });
    const text1 = await r1.text();
    results.products_index = { status: r1.status, body: text1.slice(0, 500) };
  } catch (e) {
    results.products_index = { error: String(e) };
  }

  // Test 2: sin /integrations
  try {
    const r2 = await fetch(`https://api.dropi.co/products/index`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "dropi-integration-key": apiKey,
      },
      body: JSON.stringify({ page: 1, perpage: 1 }),
    });
    const text2 = await r2.text();
    results.products_no_integrations = { status: r2.status, body: text2.slice(0, 500) };
  } catch (e) {
    results.products_no_integrations = { error: String(e) };
  }

  // Test 3: Authorization Bearer
  try {
    const r3 = await fetch(`${baseUrl}/products/index`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ page: 1, perpage: 1 }),
    });
    const text3 = await r3.text();
    results.bearer_auth = { status: r3.status, body: text3.slice(0, 500) };
  } catch (e) {
    results.bearer_auth = { error: String(e) };
  }

  return NextResponse.json(results);
}
