import { NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/services/store";

type Settings = Record<string, Record<string, unknown>>;

async function getSettings(): Promise<Settings> {
  return await readStore<Settings>("settings", {
    general: {
      storeName: "Mi Tienda COD",
      currency: "COP",
      shippingFee: 12000,
      codFee: 5000,
    },
    dropi: {
      enabled: false,
      environment: "production",
      apiKey: "",
      autoSync: true,
    },
    pixels: {
      fbPixelId: "",
      fbAccessToken: "",
      fbEnabled: false,
      tiktokPixelId: "",
      tiktokAccessToken: "",
      tiktokEnabled: false,
    },
    fraud: {
      maxOrdersPerIpPerHour: 3,
      maxOrdersPerPhonePerDay: 5,
      maxOrdersPerEmailPerDay: 5,
      blockedUsers: [],
    },
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const namespace = searchParams.get("namespace");
  const settings = await getSettings();
  if (namespace && settings[namespace]) {
    return NextResponse.json(settings[namespace]);
  }
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { namespace, values } = body;
  const settings = await getSettings();
  settings[namespace] = { ...settings[namespace], ...values };
  await writeStore("settings", settings);
  return NextResponse.json(settings[namespace]);
}
