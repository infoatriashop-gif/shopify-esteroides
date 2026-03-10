"use client";

import type { BuyNowProps } from "@/types/editor";

const RADIUS_CSS: Record<string, string> = {
  none: "0px", sm: "4px", md: "8px", lg: "12px", xl: "16px", full: "9999px",
};

const ANIM_CLASS: Record<string, string> = {
  none:      "",
  heartbeat: "btn-anim-heartbeat",
  shake:     "btn-anim-shake",
  bounce:    "btn-anim-bounce",
  glow:      "btn-anim-glow",
  breathe:   "btn-anim-breathe",
  rubber:    "btn-anim-rubber",
  flash:     "btn-anim-flash",
};

export default function BuyNowBlock({
  text,
  subtext,
  colorFrom,
  colorTo,
  textColor,
  borderColor,
  borderWidth,
  borderRadius,
  animation = "none",
  isPreview,
}: BuyNowProps & { isPreview?: boolean }) {
  const hasGradient = colorTo && colorTo !== colorFrom;
  const bgStyle = hasGradient
    ? { background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }
    : { backgroundColor: colorFrom };
  const borderStyle = borderWidth > 0
    ? { borderWidth, borderColor, borderStyle: "solid" as const }
    : {};

  const handleClick = () => {
    if (isPreview) return;
    const btn = document.querySelector<HTMLButtonElement>("#checkout-form button");
    if (btn) btn.click();
  };

  return (
    <button
      data-testid="block-buynow"
      onClick={handleClick}
      className={`w-full font-bold text-base cursor-pointer ${ANIM_CLASS[animation] ?? ""}`}
      style={{
        ...bgStyle,
        ...borderStyle,
        color: textColor,
        borderRadius: RADIUS_CSS[borderRadius] ?? "16px",
        padding: "1rem 1.5rem",
        display: "block",
        transition: "opacity 0.15s",
      }}
    >
      <span className="block leading-tight">{text || "Comprar ahora"}</span>
      {subtext && (
        <span className="block text-xs font-normal opacity-80 mt-0.5">{subtext}</span>
      )}
    </button>
  );
}
