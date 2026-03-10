/**
 * media-optimizer.ts
 *
 * Optimiza automáticamente imágenes, videos, GIFs y audio al subir.
 * - Imágenes: AVIF vs WebP → elige el más liviano
 * - GIF animados: WebP animado vs MP4 → elige el más liviano
 * - Videos: H.264 MP4 vs WebM VP9 → elige el más liviano
 * - Audio: convierte a AAC/Opus según el caso de uso
 * - SVG: minifica
 */

import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import crypto from "crypto";
import ffmpeg from "fluent-ffmpeg";

export type OptimizedResult = {
  outputPath: string;
  outputName: string;
  format: string;
  size: number;
  originalSize: number;
  savedPercent: number;
  width?: number;
  height?: number;
  duration?: number;
};

// ─── Image optimization ────────────────────────────────────────

export async function optimizeImage(
  buffer: Buffer,
  baseName: string,
  outputDir: string
): Promise<OptimizedResult> {
  const sharp = (await import("sharp")).default;
  const meta = await sharp(buffer).metadata();
  const width = meta.width || 0;
  const height = meta.height || 0;

  // Resize if too large (max 2000px, preserve aspect ratio)
  const base = width > 2000 || height > 2000
    ? sharp(buffer).resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
    : sharp(buffer);

  // Compete: AVIF vs WebP
  const [avif, webp] = await Promise.all([
    base.clone().avif({ quality: 72, effort: 5 }).toBuffer(),
    base.clone().webp({ quality: 78, effort: 5 }).toBuffer(),
  ]);

  const useAvif = avif.length <= webp.length;
  const output = useAvif ? avif : webp;
  const ext = useAvif ? "avif" : "webp";
  const outputName = `${baseName}.${ext}`;
  const outputPath = path.join(outputDir, outputName);

  await fs.writeFile(outputPath, output);

  // Generate thumbnail
  const thumbBuffer = await sharp(output)
    .resize(300, 300, { fit: "inside", withoutEnlargement: true })
    [useAvif ? "avif" : "webp"]({ quality: 55 })
    .toBuffer();
  await fs.writeFile(path.join(outputDir, `${baseName}-thumb.${ext}`), thumbBuffer);

  const finalMeta = await sharp(output).metadata();

  return {
    outputPath,
    outputName,
    format: ext,
    size: output.length,
    originalSize: buffer.length,
    savedPercent: Math.round((1 - output.length / buffer.length) * 100),
    width: finalMeta.width || width,
    height: finalMeta.height || height,
  };
}

// ─── GIF optimization ──────────────────────────────────────────

export async function optimizeGif(
  buffer: Buffer,
  baseName: string,
  outputDir: string
): Promise<OptimizedResult> {
  const sharp = (await import("sharp")).default;

  // Try animated WebP
  let webpBuffer: Buffer;
  try {
    webpBuffer = await sharp(buffer, { animated: true })
      .webp({ quality: 75, effort: 5 })
      .toBuffer();
  } catch {
    webpBuffer = buffer; // fallback to original
  }

  // Try converting to silent MP4 via ffmpeg
  const mp4Path = path.join(outputDir, `${baseName}-gif.mp4`);
  const gifTempPath = path.join(outputDir, `${baseName}-temp.gif`);

  await fs.writeFile(gifTempPath, buffer);

  let mp4Size = Infinity;
  try {
    await convertToMp4(gifTempPath, mp4Path, { silent: true, gifInput: true });
    const stat = await fs.stat(mp4Path);
    mp4Size = stat.size;
  } catch {
    // ffmpeg failed for this GIF
  }
  await fs.unlink(gifTempPath).catch(() => {});

  let outputName: string;
  let outputPath: string;
  let ext: string;
  let size: number;

  if (mp4Size < webpBuffer.length && existsSync(mp4Path)) {
    // MP4 wins
    outputName = `${baseName}-anim.mp4`;
    outputPath = path.join(outputDir, outputName);
    await fs.rename(mp4Path, outputPath);
    ext = "mp4";
    size = mp4Size;
  } else {
    // WebP wins
    await fs.unlink(mp4Path).catch(() => {});
    outputName = `${baseName}-anim.webp`;
    outputPath = path.join(outputDir, outputName);
    await fs.writeFile(outputPath, webpBuffer);
    ext = "webp";
    size = webpBuffer.length;
  }

  return {
    outputPath,
    outputName,
    format: ext,
    size,
    originalSize: buffer.length,
    savedPercent: Math.round((1 - size / buffer.length) * 100),
  };
}

// ─── Video optimization ────────────────────────────────────────

type FfmpegOptions = {
  silent?: boolean;
  gifInput?: boolean;
};

function convertToMp4(
  inputPath: string,
  outputPath: string,
  opts: FfmpegOptions = {}
): Promise<void> {
  return new Promise((resolve, reject) => {
    const cmd = ffmpeg(inputPath)
      .outputOptions([
        "-c:v libx265",
        "-crf 24",
        "-preset medium",
        "-tag:v hvc1",       // compatibility with Apple/Safari
        "-movflags +faststart",
        "-pix_fmt yuv420p",
        ...(opts.silent ? ["-an"] : ["-c:a aac", "-b:a 128k"]),
        ...(opts.gifInput ? ["-vf", "fps=15,scale=trunc(iw/2)*2:trunc(ih/2)*2"] : []),
      ])
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", reject);
    cmd.run();
  });
}

function convertToWebm(inputPath: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        "-c:v libvpx-vp9",
        "-crf 33",
        "-b:v 0",
        "-deadline good",
        "-cpu-used 2",
        "-c:a libopus",
        "-b:a 96k",
      ])
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", reject)
      .run();
  });
}

function getVideoDuration(inputPath: string): Promise<number> {
  return new Promise((resolve) => {
    ffmpeg.ffprobe(inputPath, (err, meta) => {
      resolve(err ? 0 : (meta.format.duration || 0));
    });
  });
}

export async function optimizeVideo(
  buffer: Buffer,
  originalExt: string,
  baseName: string,
  outputDir: string
): Promise<OptimizedResult> {
  const tempInput = path.join(outputDir, `${baseName}-input.${originalExt}`);
  const mp4Out = path.join(outputDir, `${baseName}.mp4`);
  const webmOut = path.join(outputDir, `${baseName}.webm`);

  await fs.writeFile(tempInput, buffer);

  const duration = await getVideoDuration(tempInput);

  // Run both conversions in parallel
  const results = await Promise.allSettled([
    convertToMp4(tempInput, mp4Out),
    convertToWebm(tempInput, webmOut),
  ]);

  await fs.unlink(tempInput).catch(() => {});

  const mp4Size = results[0].status === "fulfilled" && existsSync(mp4Out)
    ? (await fs.stat(mp4Out)).size
    : Infinity;
  const webmSize = results[1].status === "fulfilled" && existsSync(webmOut)
    ? (await fs.stat(webmOut)).size
    : Infinity;

  let outputName: string;
  let outputPath: string;
  let ext: string;
  let size: number;

  if (mp4Size === Infinity && webmSize === Infinity) {
    // Both failed — keep original
    outputName = `${baseName}.${originalExt}`;
    outputPath = path.join(outputDir, outputName);
    await fs.writeFile(outputPath, buffer);
    ext = originalExt;
    size = buffer.length;
  } else if (mp4Size <= webmSize) {
    // MP4 wins (better compatibility)
    await fs.unlink(webmOut).catch(() => {});
    outputName = `${baseName}.mp4`;
    outputPath = mp4Out;
    ext = "mp4";
    size = mp4Size;
  } else {
    // WebM wins
    await fs.unlink(mp4Out).catch(() => {});
    outputName = `${baseName}.webm`;
    outputPath = webmOut;
    ext = "webm";
    size = webmSize;
  }

  return {
    outputPath,
    outputName,
    format: ext,
    size,
    originalSize: buffer.length,
    savedPercent: Math.round((1 - size / buffer.length) * 100),
    duration,
  };
}

// ─── Audio optimization ────────────────────────────────────────

function convertAudio(inputPath: string, outputPath: string, codec: string, bitrate: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([`-c:a ${codec}`, `-b:a ${bitrate}`, "-vn"])
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", reject)
      .run();
  });
}

export async function optimizeAudio(
  buffer: Buffer,
  originalExt: string,
  baseName: string,
  outputDir: string
): Promise<OptimizedResult> {
  const tempInput = path.join(outputDir, `${baseName}-audio-input.${originalExt}`);
  const aacOut = path.join(outputDir, `${baseName}.m4a`);
  const opusOut = path.join(outputDir, `${baseName}.opus`);

  await fs.writeFile(tempInput, buffer);

  const results = await Promise.allSettled([
    convertAudio(tempInput, aacOut, "aac", "128k"),
    convertAudio(tempInput, opusOut, "libopus", "96k"),
  ]);

  await fs.unlink(tempInput).catch(() => {});

  const aacSize = results[0].status === "fulfilled" && existsSync(aacOut)
    ? (await fs.stat(aacOut)).size : Infinity;
  const opusSize = results[1].status === "fulfilled" && existsSync(opusOut)
    ? (await fs.stat(opusOut)).size : Infinity;

  let ext: string;
  let outputPath: string;
  let outputName: string;
  let size: number;

  if (opusSize < aacSize) {
    await fs.unlink(aacOut).catch(() => {});
    ext = "opus"; outputPath = opusOut; size = opusSize;
  } else if (aacSize !== Infinity) {
    await fs.unlink(opusOut).catch(() => {});
    ext = "m4a"; outputPath = aacOut; size = aacSize;
  } else {
    ext = originalExt;
    outputPath = path.join(outputDir, `${baseName}.${ext}`);
    await fs.writeFile(outputPath, buffer);
    size = buffer.length;
  }

  outputName = path.basename(outputPath);
  return {
    outputPath, outputName, format: ext, size,
    originalSize: buffer.length,
    savedPercent: Math.round((1 - size / buffer.length) * 100),
  };
}

// ─── SVG minification ──────────────────────────────────────────

export async function optimizeSvg(buffer: Buffer, baseName: string, outputDir: string): Promise<OptimizedResult> {
  let svgText = buffer.toString("utf-8");

  // Basic minification: remove comments, collapse whitespace, remove empty attributes
  svgText = svgText
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/>\s+</g, "><")
    .trim();

  const output = Buffer.from(svgText, "utf-8");
  const outputName = `${baseName}.svg`;
  const outputPath = path.join(outputDir, outputName);
  await fs.writeFile(outputPath, output);

  return {
    outputPath, outputName, format: "svg",
    size: output.length, originalSize: buffer.length,
    savedPercent: Math.round((1 - output.length / buffer.length) * 100),
  };
}

// ─── File type detection ───────────────────────────────────────

export type MediaType = "image" | "gif" | "video" | "audio" | "svg" | "unknown";

export function detectMediaType(mimeType: string, filename: string): MediaType {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  if (mimeType === "image/svg+xml" || ext === "svg") return "svg";
  if (mimeType === "image/gif" || ext === "gif") return "gif";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/") || ["mp4", "webm", "mov", "avi", "mkv", "wmv", "flv", "m4v"].includes(ext)) return "video";
  if (mimeType.startsWith("audio/") || ["mp3", "wav", "ogg", "flac", "aac", "m4a", "opus", "wma"].includes(ext)) return "audio";
  return "unknown";
}
