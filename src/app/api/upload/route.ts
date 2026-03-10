import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import {
  optimizeImage,
  optimizeGif,
  optimizeVideo,
  optimizeAudio,
  optimizeSvg,
  detectMediaType,
} from "@/lib/services/media-optimizer";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Per-type limits
const SIZE_LIMITS: Record<string, number> = {
  image: 20 * 1024 * 1024,  // 20MB
  gif:   20 * 1024 * 1024,  // 20MB
  video: 500 * 1024 * 1024, // 500MB
  audio: 50 * 1024 * 1024,  // 50MB
  svg:   2 * 1024 * 1024,   // 2MB
};

const ALLOWED_EXTENSIONS = new Set([
  // Images
  "jpg", "jpeg", "png", "webp", "avif", "bmp", "tiff", "gif", "svg",
  // Videos
  "mp4", "webm", "mov", "avi", "mkv", "wmv", "flv", "m4v",
  // Audio
  "mp3", "wav", "ogg", "flac", "aac", "m4a", "opus", "wma",
]);

async function ensureDir() {
  try { await fs.access(UPLOAD_DIR); }
  catch { await fs.mkdir(UPLOAD_DIR, { recursive: true }); }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No se recibieron archivos" }, { status: 400 });
    }

    await ensureDir();

    const results: {
      url: string;
      thumbUrl?: string;
      originalName: string;
      format: string;
      size: number;
      originalSize: number;
      savedPercent: number;
      width?: number;
      height?: number;
      duration?: number;
      mediaType: string;
    }[] = [];

    const errors: string[] = [];

    for (const file of files) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      const mediaType = detectMediaType(file.type, file.name);

      // Validate extension
      if (!ALLOWED_EXTENSIONS.has(ext) && mediaType === "unknown") {
        errors.push(`${file.name}: formato no soportado`);
        continue;
      }

      // Validate size per type
      const limit = SIZE_LIMITS[mediaType] ?? SIZE_LIMITS.image;
      if (file.size > limit) {
        const limitMB = Math.round(limit / 1024 / 1024);
        errors.push(`${file.name}: excede el límite de ${limitMB}MB para ${mediaType}`);
        continue;
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const hash = crypto.createHash("md5").update(buffer).digest("hex").slice(0, 10);
      const baseName = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
      const uniqueBase = `${hash}-${baseName}`;

      try {
        let optimized;

        if (mediaType === "svg") {
          optimized = await optimizeSvg(buffer, uniqueBase, UPLOAD_DIR);
        } else if (mediaType === "gif") {
          optimized = await optimizeGif(buffer, uniqueBase, UPLOAD_DIR);
        } else if (mediaType === "image") {
          optimized = await optimizeImage(buffer, uniqueBase, UPLOAD_DIR);
        } else if (mediaType === "video") {
          optimized = await optimizeVideo(buffer, ext, uniqueBase, UPLOAD_DIR);
        } else if (mediaType === "audio") {
          optimized = await optimizeAudio(buffer, ext, uniqueBase, UPLOAD_DIR);
        } else {
          // Unknown: save as-is
          const outName = `${uniqueBase}.${ext}`;
          await fs.writeFile(path.join(UPLOAD_DIR, outName), buffer);
          optimized = {
            outputName: outName,
            format: ext,
            size: buffer.length,
            originalSize: buffer.length,
            savedPercent: 0,
          };
        }

        const thumbName = `${uniqueBase}-thumb.${optimized.format}`;
        const thumbExists = await fs.access(path.join(UPLOAD_DIR, thumbName)).then(() => true).catch(() => false);

        results.push({
          url: `/uploads/${optimized.outputName}`,
          thumbUrl: thumbExists ? `/uploads/${thumbName}` : undefined,
          originalName: file.name,
          format: optimized.format,
          size: optimized.size,
          originalSize: optimized.originalSize,
          savedPercent: optimized.savedPercent,
          width: optimized.width,
          height: optimized.height,
          duration: optimized.duration,
          mediaType,
        });

      } catch (err) {
        console.error(`Error optimizing ${file.name}:`, err);
        errors.push(`${file.name}: error al optimizar`);
      }
    }

    if (results.length === 0) {
      return NextResponse.json(
        { error: errors.join(", ") || "Ningún archivo válido" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      images: results.filter((r) => ["image", "gif", "svg"].includes(r.mediaType)),
      videos: results.filter((r) => r.mediaType === "video"),
      audios: results.filter((r) => r.mediaType === "audio"),
      all: results,
      ...(errors.length > 0 && { warnings: errors }),
    });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Error al procesar los archivos" }, { status: 500 });
  }
}

// List uploaded media
export async function GET() {
  try {
    await ensureDir();
    const files = await fs.readdir(UPLOAD_DIR);
    const media = files
      .filter((f) => !f.includes("-thumb.") && !f.includes("-input."))
      .map((f) => `/uploads/${f}`);
    return NextResponse.json({ images: media.filter(f => /\.(avif|webp|svg|jpg|png)$/i.test(f)), media });
  } catch {
    return NextResponse.json({ images: [], media: [] });
  }
}
