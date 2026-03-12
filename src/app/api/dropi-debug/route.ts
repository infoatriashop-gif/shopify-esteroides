import { NextResponse } from "next/server";

const BASE = "https://api.dropi.co/integrations";

export async function GET() {
  const email = process.env.DROPI_EMAIL || "";
  const password = process.env.DROPI_PASSWORD || "";

  const results: Record<string, unknown> = {
    hasCredentials: !!(email && password),
  };

  if (!email || !password) {
    results.error = "DROPI_EMAIL o DROPI_PASSWORD no configurados";
    return NextResponse.json(results);
  }

  // Step 1: Login
  try {
    const r = await fetch(`${BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ email, password, white_brand_id: 1 }),
    });
    const data = await r.json();
    results.login_status = r.status;
    results.login_success = data.isSuccess;
    results.login_message = data.message;

    if (!data.isSuccess) {
      return NextResponse.json(results);
    }

    // Extract token
    const token = data.access_token || data.token || data.objects?.access_token || data.objects?.token || data.objects;
    results.token_type = typeof token;
    results.token_preview = typeof token === "string" ? `${token.slice(0, 30)}...` : JSON.stringify(token).slice(0, 200);

    if (typeof token !== "string") {
      return NextResponse.json(results);
    }

    // Step 2: Test products with Bearer
    const r2 = await fetch(`${BASE}/products/index`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ startData: 0, pageSize: 1, order_type: "desc", order_by: "id", active: true, no_count: true, integration: true, get_stock: false, userVerified: true, stockmayor: 1 }),
    });
    const d2 = await r2.json();
    results.products_bearer = {
      status: r2.status,
      success: d2.isSuccess,
      count: Array.isArray(d2.objects) ? d2.objects.length : 0,
      firstProduct: Array.isArray(d2.objects) && d2.objects[0] ? { id: d2.objects[0].id, name: d2.objects[0].name } : null,
    };

    // Step 3: Test products with dropi-integration-key
    const r3 = await fetch(`${BASE}/products/index`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "dropi-integration-key": token,
      },
      body: JSON.stringify({ startData: 0, pageSize: 1, order_type: "desc", order_by: "id", active: true, no_count: true, integration: true, get_stock: false, userVerified: true, stockmayor: 1 }),
    });
    const d3 = await r3.json();
    results.products_integration_key = {
      status: r3.status,
      success: d3.isSuccess,
    };

  } catch (e) {
    results.error = String(e);
  }

  return NextResponse.json(results);
}
