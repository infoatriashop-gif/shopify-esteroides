# Skill: media-optimizer

## Description
Automatic multimedia optimization. Activates when:
- Any file is uploaded via `/api/upload`
- User says "optimiza", "comprime", "reduce peso", "imagen pesada", "video grande"
- User asks about media performance or file sizes

## What happens automatically on every upload

### Images (JPG, PNG, BMP, TIFF, WebP, AVIF)
- Competes AVIF (quality 72) vs WebP (quality 78)
- Picks the **smaller** format automatically
- Resizes if > 2000px (preserves aspect ratio)
- Generates thumbnail (300px) in the same format
- Typical savings: **40-70%**

### GIFs (animated)
- Competes: **WebP animated** vs **silent MP4 H.264**
- Picks the smaller format
- MP4 at 15fps, WebP with effort 5
- Typical savings: **60-80%**

### Videos (MP4, MOV, AVI, MKV, WebM, WMV, FLV)
- Competes: **MP4 H.265/HEVC** (CRF 24, medium preset, hvc1 tag for Safari) vs **WebM VP9** (CRF 33)
- MP4 wins ties (better compatibility)
- Audio: AAC 128k in MP4, Opus 96k in WebM
- Typical savings: **40-60%** (H.265 is ~50% smaller than H.264)
- Max upload size: **500MB**

### Audio (MP3, WAV, FLAC, OGG, WMA)
- Competes: **AAC 128k (.m4a)** vs **Opus 96k (.opus)**
- Picks the smaller
- Typical savings: **50-70%**

### SVG
- Strips comments, collapses whitespace
- Typical savings: **5-20%**

## File size limits
| Type    | Limit  |
|---------|--------|
| Image   | 20 MB  |
| GIF     | 20 MB  |
| Video   | 500 MB |
| Audio   | 50 MB  |
| SVG     | 2 MB   |

## API Response format

```json
{
  "success": true,
  "images": [
    {
      "url": "/uploads/abc123-nombre.avif",
      "thumbUrl": "/uploads/abc123-nombre-thumb.avif",
      "originalName": "foto.jpg",
      "format": "avif",
      "size": 45230,
      "originalSize": 180000,
      "savedPercent": 75,
      "width": 1200,
      "height": 800,
      "mediaType": "image"
    }
  ],
  "videos": [...],
  "audios": [...],
  "all": [...],
  "warnings": ["archivo.xyz: formato no soportado"]
}
```

## Key files
- `src/lib/services/media-optimizer.ts` — optimization logic
- `src/app/api/upload/route.ts` — upload API using the service
- `public/uploads/` — output directory

## Maintenance: when to update quality settings

| Scenario | Change in media-optimizer.ts |
|----------|------------------------------|
| Images too blurry | Increase AVIF quality (72→80) and WebP quality (78→85) |
| Images too heavy | Decrease AVIF quality (72→65) and WebP quality (78→70) |
| Videos too slow to process | Change `preset medium` → `preset fast` in convertToMp4() |
| Videos too heavy | Lower CRF 23 → 26 (higher = worse quality but smaller) |
| GIF too blurry | Increase fps from 15 to 24 in convertToMp4() |

## How to batch-optimize existing files

Run the batch optimizer on existing uploads:
```bash
node .claude/skills/media-optimizer/scripts/batch-optimize.mjs
```

This script scans `public/uploads/` and re-optimizes any non-optimized files (JPG, PNG, original MP4s, etc.)
