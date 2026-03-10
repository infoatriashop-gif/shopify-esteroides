import { NextResponse } from "next/server";
import { testConnection } from "@/lib/services/dropi";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await testConnection({
    enabled: true,
    environment: body.environment || "production",
    apiKey: body.apiKey,
    autoSync: true,
  });

  return NextResponse.json(result);
}
