import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { hasDatabase, getDb } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { readStore, writeStore } from "./store";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "JWT_SECRET no está configurado. Agrega JWT_SECRET a las variables de entorno."
      );
    }
    console.warn(
      "[auth] ⚠ JWT_SECRET no configurado. Usando clave de desarrollo. NO usar en producción."
    );
    return new TextEncoder().encode("dev-only-insecure-jwt-secret");
  }
  return new TextEncoder().encode(secret);
}

const TOKEN_EXPIRY = "7d";

export type UserRole = "admin" | "viewer";

export type User = {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  createdAt: string;
};

type UserPublic = Omit<User, "passwordHash">;

async function getUsers(): Promise<User[]> {
  if (hasDatabase()) {
    const db = getDb();
    const rows = await db.select().from(adminUsers);
    return rows.map((r) => ({
      id: r.id,
      email: r.email,
      passwordHash: r.passwordHash,
      name: r.name,
      role: (r.role || "admin") as UserRole,
      createdAt: r.createdAt.toISOString(),
    }));
  }
  return await readStore<User[]>("users", []);
}

// Rate limiting store (in-memory for both modes)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const orderAttempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(
  store: Map<string, { count: number; resetAt: number }>,
  key: string,
  maxAttempts: number,
  windowMs: number
): boolean {
  // Skip rate limiting in development or for unknown IPs (localhost)
  if (process.env.NODE_ENV !== "production" || key === "unknown") return true;

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count++;
  return true;
}

// ─── PUBLIC API ────────────────────────────────────────────────

export async function register(
  email: string,
  password: string,
  name: string,
  role: UserRole = "admin"
): Promise<{ success: boolean; user?: UserPublic; message?: string }> {
  const passwordHash = await bcrypt.hash(password, 12);

  if (hasDatabase()) {
    const db = getDb();

    // Check if email already exists
    const [existing] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email.toLowerCase().trim()));

    if (existing) {
      return { success: false, message: "Ya existe un usuario con ese email" };
    }

    const [newUser] = await db
      .insert(adminUsers)
      .values({
        email: email.toLowerCase().trim(),
        name,
        passwordHash,
        role,
      })
      .returning();

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: (newUser.role || "admin") as UserRole,
        createdAt: newUser.createdAt.toISOString(),
      },
    };
  }

  // JSON fallback
  const users = await readStore<User[]>("users", []);

  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: "Ya existe un usuario con ese email" };
  }

  const user: User = {
    id: users.length === 0 ? 1 : Math.max(...users.map((u) => u.id)) + 1,
    email: email.toLowerCase().trim(),
    passwordHash,
    name,
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeStore("users", users);

  const { passwordHash: _, ...publicUser } = user;
  return { success: true, user: publicUser };
}

export async function login(
  email: string,
  password: string,
  ip: string = "unknown"
): Promise<{ success: boolean; token?: string; user?: UserPublic; message?: string }> {
  // Rate limit: 5 attempts per 15 minutes per IP
  if (!checkRateLimit(loginAttempts, ip, 5, 15 * 60 * 1000)) {
    return { success: false, message: "Demasiados intentos. Intenta en 15 minutos." };
  }

  const users = await getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());

  if (!user) {
    return { success: false, message: "Credenciales inválidas" };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { success: false, message: "Credenciales inválidas" };
  }

  const JWT_SECRET = getJwtSecret();
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(TOKEN_EXPIRY)
    .setIssuedAt()
    .sign(JWT_SECRET);

  const { passwordHash: _, ...publicUser } = user;
  return { success: true, token, user: publicUser };
}

export async function verifyToken(token: string): Promise<{
  valid: boolean;
  userId?: number;
  email?: string;
  role?: UserRole;
}> {
  try {
    const JWT_SECRET = getJwtSecret();
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      valid: true,
      userId: payload.userId as number,
      email: payload.email as string,
      role: payload.role as UserRole,
    };
  } catch {
    return { valid: false };
  }
}

export function checkOrderRateLimit(ip: string): boolean {
  // 10 requests per minute per IP for public order creation
  return checkRateLimit(orderAttempts, ip, 10, 60 * 1000);
}

export async function getUserById(id: number): Promise<UserPublic | null> {
  if (hasDatabase()) {
    const db = getDb();
    const [row] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, id));
    if (!row) return null;
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      role: (row.role || "admin") as UserRole,
      createdAt: row.createdAt.toISOString(),
    };
  }

  const users = await readStore<User[]>("users", []);
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  const { passwordHash: _, ...publicUser } = user;
  return publicUser;
}

// ─── PASSWORD RESET ────────────────────────────────────────────

type ResetToken = {
  email: string;
  token: string;
  expiresAt: number;
};

export async function createPasswordResetToken(email: string): Promise<{ found: boolean; token?: string }> {
  const users = await getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) return { found: false };

  const token = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
  const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hora

  const tokens = await readStore<ResetToken[]>("password-resets", []);
  // Remove old tokens for this email
  const filtered = tokens.filter((t) => t.email !== email.toLowerCase());
  filtered.push({ email: email.toLowerCase().trim(), token, expiresAt });
  await writeStore("password-resets", filtered);

  return { found: true, token };
}

export async function resetPasswordWithToken(token: string, newPassword: string): Promise<{ success: boolean; message?: string }> {
  const tokens = await readStore<ResetToken[]>("password-resets", []);
  const entry = tokens.find((t) => t.token === token);

  if (!entry) return { success: false, message: "Token inválido o ya utilizado" };
  if (Date.now() > entry.expiresAt) return { success: false, message: "El enlace ha expirado. Solicita uno nuevo." };

  const passwordHash = await bcrypt.hash(newPassword, 12);

  if (hasDatabase()) {
    const db = getDb();
    await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.email, entry.email));
  } else {
    const users = await readStore<User[]>("users", []);
    const idx = users.findIndex((u) => u.email.toLowerCase() === entry.email);
    if (idx === -1) return { success: false, message: "Usuario no encontrado" };
    users[idx].passwordHash = passwordHash;
    await writeStore("users", users);
  }

  // Invalidate token
  const remaining = tokens.filter((t) => t.token !== token);
  await writeStore("password-resets", remaining);

  return { success: true };
}

export async function hasUsers(): Promise<boolean> {
  if (hasDatabase()) {
    const db = getDb();
    const [row] = await db
      .select({ id: adminUsers.id })
      .from(adminUsers)
      .limit(1);
    return !!row;
  }
  const users = await readStore<User[]>("users", []);
  return users.length > 0;
}
