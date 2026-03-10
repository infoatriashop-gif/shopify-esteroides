import dns from "dns";
import crypto from "crypto";
import { readStore, writeStore } from "./store";

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
  return `dropi-verify=${crypto.randomBytes(12).toString("hex")}`;
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

// Resolve DNS records using Node.js dns module
export async function resolveTxt(domain: string): Promise<string[]> {
  return new Promise((resolve) => {
    dns.resolveTxt(domain, (err, records) => {
      if (err) {
        resolve([]);
        return;
      }
      // TXT records come as arrays of strings per record
      resolve(records.map((r) => r.join("")));
    });
  });
}

export async function resolveCname(domain: string): Promise<string[]> {
  return new Promise((resolve) => {
    dns.resolveCname(domain, (err, records) => {
      if (err) {
        resolve([]);
        return;
      }
      resolve(records);
    });
  });
}

export async function resolveA(domain: string): Promise<string[]> {
  return new Promise((resolve) => {
    dns.resolve4(domain, (err, addresses) => {
      if (err) {
        resolve([]);
        return;
      }
      resolve(addresses);
    });
  });
}

export async function verifyDomain(
  domain: string,
  expectedCname?: string,
  expectedIp?: string
): Promise<DomainRecord> {
  const records = await getDomainRecords();
  const record = records[domain];

  if (!record) {
    throw new Error("Dominio no registrado");
  }

  // Step 1: Verify TXT record
  if (record.status === "pending") {
    const txtRecords = await resolveTxt(domain);
    const found = txtRecords.some((txt) => txt === record.txtToken);

    if (found) {
      record.status = "txt_verified";
      record.verifiedAt = new Date().toISOString();
    } else {
      record.errorMessage = "Registro TXT no encontrado. Agrega el registro TXT y espera la propagacion DNS.";
      records[domain] = record;
      await saveDomainRecords(records);
      return record;
    }
  }

  // Step 2: Verify CNAME or A record
  if (record.status === "txt_verified") {
    const cnameRecords = await resolveCname(domain);
    const aRecords = await resolveA(domain);

    const cnameOk = expectedCname && cnameRecords.some((r) => r.includes(expectedCname));
    const aOk = expectedIp && aRecords.includes(expectedIp);

    if (cnameOk || aOk) {
      record.status = "active";
      record.errorMessage = undefined;
    } else {
      record.errorMessage = "TXT verificado, pero falta configurar CNAME o registro A apuntando al servidor.";
    }
  }

  records[domain] = record;
  await saveDomainRecords(records);
  return record;
}
