import dns from "dns";
import crypto from "crypto";
import { readStore, writeStore } from "./store";

export const FIREBASE_CNAME_TARGET = "shopify-esteroides--shopify-esteroides-2026.us-central1.hosted.app";

export type DnsStatus = "pending" | "txt_verified" | "active" | "error";

export type DomainRecord = {
  domain: string;
  txtToken: string;
  status: DnsStatus;
  errorMessage?: string;
  createdAt: string;
  verifiedAt?: string;
};

async function getDomainRecords(): Promise<Record<string, DomainRecord>> {
  return await readStore<Record<string, DomainRecord>>("domain-records", {});
}

async function saveDomainRecords(records: Record<string, DomainRecord>): Promise<void> {
  await writeStore("domain-records", records);
}

export function generateTxtToken(): string {
  return `shopify-verify=${crypto.randomBytes(12).toString("hex")}`;
}

export async function addDomain(domain: string): Promise<DomainRecord> {
  const records = await getDomainRecords();
  if (records[domain]) return records[domain];

  const record: DomainRecord = {
    domain,
    txtToken: generateTxtToken(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  records[domain] = record;
  await saveDomainRecords(records);
  return record;
}

export async function getDomain(domain: string): Promise<DomainRecord | null> {
  const records = await getDomainRecords();
  return records[domain] || null;
}

export async function removeDomain(domain: string): Promise<void> {
  const records = await getDomainRecords();
  delete records[domain];
  await saveDomainRecords(records);
}

export async function resolveTxt(domain: string): Promise<string[]> {
  return new Promise((resolve) => {
    dns.resolveTxt(domain, (err, records) => {
      if (err) { resolve([]); return; }
      resolve(records.map((r) => r.join("")));
    });
  });
}

export async function resolveCname(domain: string): Promise<string[]> {
  return new Promise((resolve) => {
    dns.resolveCname(domain, (err, records) => {
      if (err) { resolve([]); return; }
      resolve(records);
    });
  });
}

export async function resolveA(domain: string): Promise<string[]> {
  return new Promise((resolve) => {
    dns.resolve4(domain, (err, addresses) => {
      if (err) { resolve([]); return; }
      resolve(addresses);
    });
  });
}

/**
 * Verifica el dominio en dos pasos:
 * 1. TXT: confirma propiedad del dominio
 * 2. CNAME: confirma que apunta a Firebase App Hosting
 */
export async function verifyDomain(domain: string): Promise<DomainRecord> {
  const records = await getDomainRecords();
  const record = records[domain];

  if (!record) throw new Error("Dominio no registrado");

  // Paso 1: Verificar TXT de propiedad
  if (record.status === "pending") {
    const txtRecords = await resolveTxt(domain);
    const found = txtRecords.some((txt) => txt === record.txtToken);

    if (!found) {
      record.errorMessage = `Registro TXT no encontrado en ${domain}. Asegurate de haberlo agregado y espera la propagacion DNS (5-30 min).`;
      records[domain] = record;
      await saveDomainRecords(records);
      return record;
    }

    record.status = "txt_verified";
    record.verifiedAt = new Date().toISOString();
  }

  // Paso 2: Verificar CNAME apuntando a Firebase
  if (record.status === "txt_verified") {
    const cnameRecords = await resolveCname(domain);
    const cnameOk = cnameRecords.some(
      (r) => r.replace(/\.$/, "").toLowerCase() === FIREBASE_CNAME_TARGET.toLowerCase()
    );

    if (cnameOk) {
      record.status = "active";
      record.errorMessage = undefined;
    } else {
      const found = cnameRecords.length > 0
        ? `Encontrado CNAME: ${cnameRecords[0]}`
        : "No se encontro ningun registro CNAME";
      record.errorMessage = `CNAME incorrecto. ${found}. Debe apuntar exactamente a: ${FIREBASE_CNAME_TARGET}`;
    }
  }

  records[domain] = record;
  await saveDomainRecords(records);
  return record;
}
