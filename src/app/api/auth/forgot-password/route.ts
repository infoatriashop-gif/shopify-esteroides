import { NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/services/auth";

// Rate limit in-memory for forgot-password
const attempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: "Demasiadas solicitudes. Intenta en 15 minutos." },
      { status: 429 }
    );
  }

  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ success: false, message: "Email requerido" }, { status: 400 });
  }

  const result = await createPasswordResetToken(email);

  // Always return success to avoid email enumeration
  if (!result.found) {
    return NextResponse.json({ success: true });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:2000";
  const resetLink = `${appUrl}/reset-password?token=${result.token}`;

  // In production, send email. For now, return the link (admin use only)
  return NextResponse.json({
    success: true,
    // Only include link in dev mode (in production, this would be sent via email)
    ...(process.env.NODE_ENV !== "production" && { resetLink }),
  });
}
