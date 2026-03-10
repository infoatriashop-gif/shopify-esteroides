import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock store before importing auth
vi.mock("@/lib/services/store", () => {
  let data: Record<string, unknown> = {};
  return {
    readStore: (key: string, defaultValue: unknown) => data[key] ?? defaultValue,
    writeStore: (key: string, value: unknown) => { data[key] = value; },
    __resetStore: () => { data = {}; },
  };
});

// Mock jose to avoid Uint8Array issues in jsdom
vi.mock("jose", () => {
  const tokens = new Map<string, Record<string, unknown>>();
  let counter = 0;
  return {
    SignJWT: class {
      private payload: Record<string, unknown>;
      constructor(payload: Record<string, unknown>) { this.payload = payload; }
      setProtectedHeader() { return this; }
      setExpirationTime() { return this; }
      setIssuedAt() { return this; }
      async sign() {
        const id = `mock-token-${++counter}`;
        tokens.set(id, this.payload);
        return id;
      }
    },
    jwtVerify: async (token: string) => {
      const payload = tokens.get(token);
      if (!payload) throw new Error("Invalid token");
      return { payload };
    },
  };
});

import { register, login, verifyToken, getUserById, hasUsers, checkOrderRateLimit } from "@/lib/services/auth";
import { __resetStore } from "@/lib/services/store";

declare module "@/lib/services/store" {
  function __resetStore(): void;
}

describe("Auth Service", () => {
  beforeEach(() => {
    __resetStore();
  });

  describe("register", () => {
    it("should register first user as admin", async () => {
      const result = await register("admin@test.com", "password123", "Admin");
      expect(result.success).toBe(true);
      expect(result.user?.role).toBe("admin");
      expect(result.user?.email).toBe("admin@test.com");
      expect(result.user?.name).toBe("Admin");
    });

    it("should not return passwordHash", async () => {
      const result = await register("admin@test.com", "password123", "Admin");
      expect(result.user).not.toHaveProperty("passwordHash");
    });

    it("should reject duplicate email", async () => {
      await register("admin@test.com", "password123", "Admin");
      const result = await register("admin@test.com", "password456", "Admin2");
      expect(result.success).toBe(false);
      expect(result.message).toContain("Ya existe");
    });

    it("should be case-insensitive for email", async () => {
      await register("Admin@Test.com", "password123", "Admin");
      const result = await register("admin@test.com", "password456", "Admin2");
      expect(result.success).toBe(false);
    });
  });

  describe("login", () => {
    beforeEach(async () => {
      await register("user@test.com", "correctpassword", "Test User");
    });

    it("should login with correct credentials", async () => {
      const result = await login("user@test.com", "correctpassword");
      expect(result.success).toBe(true);
      expect(result.token).toBeDefined();
      expect(result.user?.email).toBe("user@test.com");
    });

    it("should reject wrong password", async () => {
      const result = await login("user@test.com", "wrongpassword");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Credenciales inválidas");
    });

    it("should reject non-existent email", async () => {
      const result = await login("nobody@test.com", "password");
      expect(result.success).toBe(false);
      expect(result.message).toBe("Credenciales inválidas");
    });
  });

  describe("verifyToken", () => {
    it("should verify a valid token", async () => {
      await register("user@test.com", "password123", "User");
      const loginResult = await login("user@test.com", "password123");
      const verified = await verifyToken(loginResult.token!);
      expect(verified.valid).toBe(true);
      expect(verified.email).toBe("user@test.com");
      expect(verified.userId).toBe(1);
    });

    it("should reject invalid token", async () => {
      const result = await verifyToken("invalid-token-string");
      expect(result.valid).toBe(false);
    });
  });

  describe("getUserById", () => {
    it("should return user without passwordHash", async () => {
      await register("user@test.com", "password123", "User");
      const user = getUserById(1);
      expect(user).not.toBeNull();
      expect(user?.email).toBe("user@test.com");
      expect(user).not.toHaveProperty("passwordHash");
    });

    it("should return null for non-existent user", () => {
      const user = getUserById(999);
      expect(user).toBeNull();
    });
  });

  describe("hasUsers", () => {
    it("should return false when no users", () => {
      expect(hasUsers()).toBe(false);
    });

    it("should return true after registration", async () => {
      await register("user@test.com", "password123", "User");
      expect(hasUsers()).toBe(true);
    });
  });

  describe("checkOrderRateLimit", () => {
    it("should allow requests within limit", () => {
      for (let i = 0; i < 10; i++) {
        expect(checkOrderRateLimit("192.168.1.1")).toBe(true);
      }
    });

    it("should block after exceeding limit", () => {
      for (let i = 0; i < 10; i++) {
        checkOrderRateLimit("192.168.1.2");
      }
      expect(checkOrderRateLimit("192.168.1.2")).toBe(false);
    });

    it("should track IPs independently", () => {
      for (let i = 0; i < 10; i++) {
        checkOrderRateLimit("10.0.0.1");
      }
      expect(checkOrderRateLimit("10.0.0.1")).toBe(false);
      expect(checkOrderRateLimit("10.0.0.2")).toBe(true);
    });
  });
});
