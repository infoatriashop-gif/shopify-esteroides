import { NextResponse } from "next/server";
import { getApiLogs } from "@/lib/services/dropi";

export async function GET() {
  const logs = await getApiLogs();
  return NextResponse.json(logs.slice(-100).reverse());
}
