import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || (
    process.env.NODE_ENV === "production"
      ? (() => { throw new Error("JWT_SECRET is required in production"); })()
      : "dev-only-insecure-jwt-secret"
  )
);

// Routes that require authentication
const PROTECTED_PREFIXES = [
  "/admin",
  "/api/products",
  "/api/orders",
  "/api/settings",
  "/api/form-config",
  "/api/pages",
  "/api/dropi",
  "/api/domains",
  "/api/upload",
];

// Public API routes (no auth required)
const PUBLIC_API_ROUTES = ["/api/checkout", "/api/auth"];

// Public page routes
const PUBLIC_ROUTES = ["/login", "/register", "/product", "/", "/forgot-password", "/reset-password"];

function isProtected(pathname: string): boolean {
  for (const route of PUBLIC_API_ROUTES) {
    if (pathname.startsWith(route)) return false;
  }
  for (const route of PUBLIC_ROUTES) {
    if (pathname === route || (route !== "/" && pathname.startsWith(route))) return false;
  }
  for (const prefix of PROTECTED_PREFIXES) {
    if (pathname.startsWith(prefix)) return true;
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/uploads") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("auth-token", "", { maxAge: 0, path: "/" });
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
