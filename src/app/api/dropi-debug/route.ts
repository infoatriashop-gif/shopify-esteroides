import { NextResponse } from "next/server";

const BASE = "https://api.dropi.co/integrations";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email") || "";
  const password = url.searchParams.get("password") || "";

  const results: Record<string, unknown> = {};

  // Test 1: Login con email/password
  if (email && password) {
    try {
      const r = await fetch(`${BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: JSON.stringify({ email, password, white_brand_id: 1 }),
      });
      const text = await r.text();
      results.login = { status: r.status, body: text.slice(0, 500) };

      // Si el login funciona, intentar llamar products con el Bearer token
      if (r.status === 200) {
        try {
          const data = JSON.parse(text);
          const bearerToken = data.access_token || data.token || data.objects?.access_token || data.objects?.token;
          if (bearerToken) {
            results.bearer_token = `${String(bearerToken).slice(0, 30)}...`;

            // Test products con Bearer
            const r2 = await fetch(`${BASE}/products/index`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${bearerToken}`,
              },
              body: JSON.stringify({ page: 1, perpage: 1 }),
            });
            const t2 = await r2.text();
            results.products_bearer = { status: r2.status, body: t2.slice(0, 500) };

            // Test products con dropi-integration-key usando el token del login
            const r3 = await fetch(`${BASE}/products/index`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "dropi-integration-key": bearerToken,
              },
              body: JSON.stringify({ page: 1, perpage: 1 }),
            });
            const t3 = await r3.text();
            results.products_integration_key = { status: r3.status, body: t3.slice(0, 500) };
          } else {
            results.bearer_token = "No token found in response";
          }
        } catch {
          results.parse_error = "Could not parse login response";
        }
      }
    } catch (e) {
      results.login = { error: String(e) };
    }
  } else {
    results.usage = "Agrega ?email=TU_EMAIL&password=TU_PASSWORD a la URL";
  }

  return NextResponse.json(results);
}
