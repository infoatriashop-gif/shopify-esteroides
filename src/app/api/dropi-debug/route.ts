import { NextResponse } from "next/server";

const BASE = "https://api.dropi.co";

export async function GET() {
  const email = process.env.DROPI_EMAIL || "";
  const password = process.env.DROPI_PASSWORD || "";
  if (!email || !password) return NextResponse.json({ error: "Sin credenciales" });

  // Login
  const loginRes = await fetch(`${BASE}/integrations/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ email, password, white_brand_id: 1 }),
  });
  const loginData = await loginRes.json();
  if (!loginData.isSuccess) return NextResponse.json({ login_failed: loginData.message });

  const token = loginData.access_token || loginData.token || loginData.objects?.access_token || loginData.objects?.token || loginData.objects;
  const bearer = { "Content-Type": "application/json;charset=UTF-8", "Authorization": `Bearer ${token}` };

  const results: Record<string, unknown> = { login: "OK" };

  // /api/products POST (devolvió 405 en GET = existe!)
  try {
    const r = await fetch(`${BASE}/api/products`, {
      method: "POST", headers: bearer,
      body: JSON.stringify({ startData: 0, pageSize: 1, order_type: "desc", order_by: "id", active: true }),
    });
    const t = await r.text();
    results.api_products_POST = { status: r.status, body: t.slice(0, 400) };
  } catch (e) { results.api_products_POST = { error: String(e) }; }

  // /api/orders/cancellationReasons (documentado en Swagger)
  try {
    const r = await fetch(`${BASE}/api/orders/cancellationReasons`, { headers: bearer });
    const t = await r.text();
    results.cancellation_reasons = { status: r.status, body: t.slice(0, 300) };
  } catch (e) { results.cancellation_reasons = { error: String(e) }; }

  // /api/orders POST
  try {
    const r = await fetch(`${BASE}/api/orders`, { method: "POST", headers: bearer, body: "{}" });
    const t = await r.text();
    results.api_orders_POST = { status: r.status, body: t.slice(0, 300) };
  } catch (e) { results.api_orders_POST = { error: String(e) }; }

  // /api/orders/myorders POST
  try {
    const r = await fetch(`${BASE}/api/orders/myorders`, { method: "POST", headers: bearer, body: "{}" });
    const t = await r.text();
    results.api_orders_myorders = { status: r.status, body: t.slice(0, 300) };
  } catch (e) { results.api_orders_myorders = { error: String(e) }; }

  // /api/orders/create POST
  try {
    const r = await fetch(`${BASE}/api/orders/create`, { method: "POST", headers: bearer, body: "{}" });
    const t = await r.text();
    results.api_orders_create = { status: r.status, body: t.slice(0, 300) };
  } catch (e) { results.api_orders_create = { error: String(e) }; }

  // /api/users/{sub} GET (sub from token)
  try {
    const r = await fetch(`${BASE}/api/users/20865`, { headers: bearer });
    const t = await r.text();
    results.api_user = { status: r.status, body: t.slice(0, 300) };
  } catch (e) { results.api_user = { error: String(e) }; }

  // /api/users/warehouses/1 GET
  try {
    const r = await fetch(`${BASE}/api/users/warehouses/1`, { headers: bearer });
    const t = await r.text();
    results.api_warehouses = { status: r.status, body: t.slice(0, 300) };
  } catch (e) { results.api_warehouses = { error: String(e) }; }

  return NextResponse.json(results);
}
