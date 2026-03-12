import { NextResponse } from "next/server";

const BASE = "https://api.dropi.co";

export async function GET() {
  const email = process.env.DROPI_EMAIL || "";
  const password = process.env.DROPI_PASSWORD || "";
  const results: Record<string, unknown> = {};

  if (!email || !password) {
    return NextResponse.json({ error: "Sin credenciales" });
  }

  // Login
  const loginRes = await fetch(`${BASE}/integrations/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ email, password, white_brand_id: 1 }),
  });
  const loginData = await loginRes.json();
  if (!loginData.isSuccess) {
    return NextResponse.json({ login_failed: loginData.message });
  }

  const token = loginData.access_token || loginData.token || loginData.objects?.access_token || loginData.objects?.token || loginData.objects;
  results.token_preview = typeof token === "string" ? `${token.slice(0, 40)}...` : "no string token";

  const bearer = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `Bearer ${token}` };

  // Test whoiam
  try {
    const r = await fetch(`${BASE}/integrations/whoiam`, { method: "POST", headers: bearer });
    const d = await r.json();
    results.whoiam = { status: r.status, success: d.isSuccess, data: JSON.stringify(d).slice(0, 300) };
  } catch (e) { results.whoiam = { error: String(e) }; }

  // Test /api/categories
  try {
    const r = await fetch(`${BASE}/api/categories`, { headers: bearer });
    const d = await r.json();
    results.api_categories = { status: r.status, success: d.isSuccess, count: Array.isArray(d.objects) ? d.objects.length : "n/a" };
  } catch (e) { results.api_categories = { error: String(e) }; }

  // Test products via /api/ path
  try {
    const r = await fetch(`${BASE}/api/products`, { headers: bearer });
    const t = await r.text();
    results.api_products = { status: r.status, body: t.slice(0, 200) };
  } catch (e) { results.api_products = { error: String(e) }; }

  // Test orders via /api/ path
  try {
    const r = await fetch(`${BASE}/api/orders`, { headers: bearer });
    const t = await r.text();
    results.api_orders = { status: r.status, body: t.slice(0, 200) };
  } catch (e) { results.api_orders = { error: String(e) }; }

  // Test products v2 individual
  try {
    const r = await fetch(`${BASE}/integrations/products/v2/1`, { headers: bearer });
    const t = await r.text();
    results.products_v2 = { status: r.status, body: t.slice(0, 200) };
  } catch (e) { results.products_v2 = { error: String(e) }; }

  // Test warehouses
  try {
    const r = await fetch(`${BASE}/integrations/warehouses/`, { headers: bearer });
    const t = await r.text();
    results.warehouses = { status: r.status, body: t.slice(0, 200) };
  } catch (e) { results.warehouses = { error: String(e) }; }

  // Test orders/myorders con Bearer
  try {
    const r = await fetch(`${BASE}/integrations/orders/myorders`, { method: "GET", headers: bearer });
    const t = await r.text();
    results.orders_myorders = { status: r.status, body: t.slice(0, 300) };
  } catch (e) { results.orders_myorders = { error: String(e) }; }

  return NextResponse.json(results);
}
