import { NextResponse } from "next/server";
import { addDomain, getDomain, verifyDomain, removeDomain } from "@/lib/services/dns-verify";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Dominio requerido" }, { status: 400 });
  }

  const record = await getDomain(domain);
  if (!record) {
    return NextResponse.json({ error: "Dominio no encontrado" }, { status: 404 });
  }

  return NextResponse.json(record);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { domain, action } = body;

  if (!domain) {
    return NextResponse.json({ error: "Dominio requerido" }, { status: 400 });
  }

  const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");

  if (action === "add") {
    const record = await addDomain(cleanDomain);
    return NextResponse.json(record);
  }

  if (action === "verify") {
    try {
      const record = await verifyDomain(cleanDomain);
      return NextResponse.json(record);
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, { status: 400 });
    }
  }

  if (action === "remove") {
    await removeDomain(cleanDomain);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Accion invalida. Use: add, verify, remove" }, { status: 400 });
}
