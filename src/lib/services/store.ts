import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { hasDatabase, getDb } from "@/lib/db";
import { kvStore } from "@/lib/db/schema/settings";
import { eq } from "drizzle-orm";
import { getFirestoreDb, hasFirestore } from "@/lib/firebase-admin";

const DATA_DIR = join(process.cwd(), ".data");

function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(name: string) {
  return join(DATA_DIR, `${name}.json`);
}

// ─── JSON file helpers (fallback for dev without DATABASE_URL) ──────

function readJson<T>(name: string, defaultValue: T): T {
  ensureDir();
  const path = filePath(name);
  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify(defaultValue, null, 2));
    return defaultValue;
  }
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return defaultValue;
  }
}

function writeJson<T>(name: string, data: T): void {
  ensureDir();
  writeFileSync(filePath(name), JSON.stringify(data, null, 2));
}

// ─── Firestore helpers ──────────────────────────────────────────────

const FIRESTORE_COLLECTION = "kv_store";

async function readFirestore<T>(name: string, defaultValue: T): Promise<T> {
  const db = getFirestoreDb();
  const doc = await db.collection(FIRESTORE_COLLECTION).doc(name).get();
  if (!doc.exists) return defaultValue;
  const data = doc.data();
  return (data?.value ?? defaultValue) as T;
}

async function writeFirestore<T>(name: string, data: T): Promise<void> {
  const db = getFirestoreDb();
  await db.collection(FIRESTORE_COLLECTION).doc(name).set({
    value: data,
    updatedAt: new Date().toISOString(),
  });
}

// ─── Async KV Store (Firestore > PostgreSQL > JSON fallback) ────────

/**
 * Read a value from the KV store.
 * Priority: Firestore → PostgreSQL → JSON files
 */
export async function readStore<T>(name: string, defaultValue: T): Promise<T> {
  // 1. Firestore (Firebase native — works on App Hosting)
  if (hasFirestore()) {
    try {
      return await readFirestore(name, defaultValue);
    } catch {
      // Fall through to next option
    }
  }

  // 2. PostgreSQL (if DATABASE_URL is set)
  if (hasDatabase()) {
    const db = getDb();
    const [row] = await db
      .select()
      .from(kvStore)
      .where(eq(kvStore.key, name));
    if (!row) return defaultValue;
    return row.value as T;
  }

  // 3. JSON files (local dev fallback)
  return readJson(name, defaultValue);
}

/**
 * Write a value to the KV store.
 * Priority: Firestore → PostgreSQL → JSON files
 */
export async function writeStore<T>(name: string, data: T): Promise<void> {
  // 1. Firestore
  if (hasFirestore()) {
    try {
      await writeFirestore(name, data);
      return;
    } catch {
      // Fall through
    }
  }

  // 2. PostgreSQL
  if (hasDatabase()) {
    const db = getDb();
    await db
      .insert(kvStore)
      .values({
        key: name,
        value: data as Record<string, unknown>,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: kvStore.key,
        set: {
          value: data as Record<string, unknown>,
          updatedAt: new Date(),
        },
      });
    return;
  }

  // 3. JSON files
  writeJson(name, data);
}

// ─── Sync versions (JSON-only, for backwards compatibility in tests) ─

export function readStoreSync<T>(name: string, defaultValue: T): T {
  return readJson(name, defaultValue);
}

export function writeStoreSync<T>(name: string, data: T): void {
  writeJson(name, data);
}

// ─── Helpers ────────────────────────────────────────────────────────

export function nextId(items: { id: number }[]): number {
  return items.length === 0 ? 1 : Math.max(...items.map((i) => i.id)) + 1;
}
