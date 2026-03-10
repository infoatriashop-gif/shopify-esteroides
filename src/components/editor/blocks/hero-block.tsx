import type { HeroProps } from "@/types/editor";

const HEIGHTS: Record<string, string> = { sm: "200px", md: "350px", lg: "500px", full: "100vh" };

export default function HeroBlock({ imageUrl, videoUrl, overlayText, overlayPosition, height, objectFit = "contain" }: HeroProps) {
  // contain siempre usa altura automática para no recortar ni dejar espacios laterales
  const isAuto = height === "auto" || objectFit === "contain";
  const h = isAuto ? undefined : (HEIGHTS[height] || "350px");
  const posClass = overlayPosition === "top" ? "items-start pt-8" : overlayPosition === "bottom" ? "items-end pb-8" : "items-center";

  return (
    <div
      className="relative w-full overflow-hidden"
      style={isAuto ? undefined : { height: h }}
      data-testid="block-hero"
    >
      {videoUrl ? (
        <video src={videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      ) : imageUrl ? (
        isAuto ? (
          <img
            src={imageUrl}
            alt=""
            className="w-full h-auto block"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        )
      ) : (
        <div className={`bg-gradient-to-br from-blue-500 to-purple-600 ${isAuto ? "h-48" : "absolute inset-0"}`} />
      )}
      {overlayText && !isAuto && (
        <div className={`absolute inset-0 flex justify-center ${posClass} bg-black/30`}>
          <h2 className="text-white text-2xl md:text-4xl font-bold text-center px-4 drop-shadow-lg">
            {overlayText}
          </h2>
        </div>
      )}
      {overlayText && isAuto && (
        <div className="text-center py-2">
          <h2 className="text-2xl md:text-4xl font-bold px-4">{overlayText}</h2>
        </div>
      )}
    </div>
  );
}
