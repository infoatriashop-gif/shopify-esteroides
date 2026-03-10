import { NextResponse } from "next/server";
import { login } from "@/lib/services/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ success: false, message: "Email y contraseña son requeridos" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const result = await login(email, password, ip);

  if (!result.success) {
    return NextResponse.json(result, { status: 401 });
  }

  // Set httpOnly cookie
  const response = NextResponse.json({ success: true, user: result.user });
  response.cookies.set("auth-token", result.token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return response;
}
