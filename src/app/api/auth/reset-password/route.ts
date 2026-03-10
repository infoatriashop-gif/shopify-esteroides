import { NextResponse } from "next/server";
import { resetPasswordWithToken } from "@/lib/services/auth";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ success: false, message: "Token y contraseña son requeridos" }, { status: 400 });
  }

  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json({ success: false, message: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 });
  }

  const result = await resetPasswordWithToken(token, password);

  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Contraseña actualizada exitosamente" });
}
