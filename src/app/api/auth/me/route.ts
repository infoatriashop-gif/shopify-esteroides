import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, getUserById } from "@/lib/services/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const result = await verifyToken(token);
  if (!result.valid || !result.userId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = getUserById(result.userId);
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user });
}
