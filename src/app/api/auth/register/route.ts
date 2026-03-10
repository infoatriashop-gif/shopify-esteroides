import { NextResponse } from "next/server";
import { register, hasUsers } from "@/lib/services/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name } = body;

  if (!email || !password || !name) {
    return NextResponse.json({ success: false, message: "Todos los campos son requeridos" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ success: false, message: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 });
  }

  // First user is always admin, subsequent ones need invitation (for now, allow open registration)
  const role = (await hasUsers()) ? "viewer" : "admin";
  const result = await register(email, password, name, role);

  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result, { status: 201 });
}
