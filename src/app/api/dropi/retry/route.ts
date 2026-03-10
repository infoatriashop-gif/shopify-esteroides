import { NextResponse } from "next/server";
import { retryFailedSyncs } from "@/lib/services/dropi";

export async function POST() {
  const result = await retryFailedSyncs();
  return NextResponse.json(result);
}
