import { NextResponse } from "next/server";
import crypto from "crypto";
import { readStore, writeStore } from "@/lib/services/store";

type Settings = Record<string, Record<string, unknown>>;

export async function POST() {
  const consumer_key = "ck_" + crypto.randomBytes(20).toString("hex");
  const consumer_secret = "cs_" + crypto.randomBytes(20).toString("hex");

  const allSettings = await readStore<Settings>("settings", {});
  allSettings.dropi = {
    ...(allSettings.dropi || {}),
    wc_consumer_key: consumer_key,
    wc_consumer_secret: consumer_secret,
  };
  await writeStore("settings", allSettings);

  return NextResponse.json({ consumer_key, consumer_secret });
}

export async function GET() {
  const allSettings = await readStore<Settings>("settings", {});
  const dropi = allSettings.dropi || {};
  return NextResponse.json({
    consumer_key: dropi.wc_consumer_key || null,
    consumer_secret: dropi.wc_consumer_secret || null,
  });
}
