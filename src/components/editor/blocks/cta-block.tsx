import type { CtaProps } from "@/types/editor";

const SIZE_CLASSES = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-base",
  lg: "py-4 px-8 text-lg",
};

const ANIMATION_CLASSES = {
  none: "",
  pulse: "animate-pulse",
  shake: "hover:animate-[shake_0.5s_ease-in-out]",
  glow: "shadow-[0_0_15px_rgba(22,163,74,0.5)]",
};

export default function CtaBlock({ text, color, size, icon, action, linkUrl, animation, isPreview }: CtaProps & { isPreview?: boolean }) {
  const handleClick = () => {
    if (isPreview) return;
    if (action === "scroll-form") {
      // Click the buy button inside #checkout-form to open the modal
      const buyBtn = document.querySelector<HTMLButtonElement>("#checkout-form button");
      if (buyBtn) buyBtn.click();
      else document.getElementById("checkout-form")?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "link" && linkUrl) {
      window.open(linkUrl, "_blank");
    }
  };

  return (
    <div data-testid="block-cta" className="text-center py-4 px-4">
      <button
        onClick={handleClick}
        className={`font-bold rounded-xl text-white transition-all hover:opacity-90 hover:scale-105 ${SIZE_CLASSES[size]} ${ANIMATION_CLASSES[animation]}`}
        style={{ backgroundColor: color }}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </button>
    </div>
  );
}
