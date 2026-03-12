import { NextResponse } from "next/server";
import crypto from "crypto";
import { readStore, writeStore } from "@/lib/services/store";

type Settings = Record<string, Record<string, unknown>>;

/**
 * WooCommerce OAuth Authorization endpoint.
 * Dropi llama a esta URL cuando el usuario hace click en "Autenticar Tienda".
 * Flow:
 * 1. Dropi redirige al usuario a GET /wc-auth/v1/authorize?callback_url=...&return_url=...
 * 2. Generamos consumer_key + consumer_secret
 * 3. Hacemos POST al callback_url de Dropi con las credenciales
 * 4. Redirigimos al usuario al return_url
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const callbackUrl = searchParams.get("callback_url") || "";
  const returnUrl = searchParams.get("return_url") || "";
  const userId = searchParams.get("user_id") || "1";

  const consumer_key = "ck_" + crypto.randomBytes(20).toString("hex");
  const consumer_secret = "cs_" + crypto.randomBytes(20).toString("hex");

  // Guardar credenciales para validar requests de Dropi
  const allSettings = await readStore<Settings>("settings", {});
  allSettings.dropi = {
    ...(allSettings.dropi || {}),
    wc_consumer_key: consumer_key,
    wc_consumer_secret: consumer_secret,
  };
  await writeStore("settings", allSettings);

  // Notificar a Dropi con las credenciales generadas
  if (callbackUrl) {
    try {
      await fetch(callbackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key_id: 1,
          user_id: parseInt(userId) || 1,
          consumer_key,
          consumer_secret,
          key_permissions: "read_write",
        }),
      });
    } catch {
      // Si falla el callback, igual continuamos
    }
  }

  // Redirigir al usuario de vuelta a Dropi
  if (returnUrl) {
    return NextResponse.redirect(returnUrl);
  }

  return NextResponse.json({ success: true, message: "Tienda autenticada correctamente con Dropi." });
}
