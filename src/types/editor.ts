/**
 * Types for the Elementor-style page editor (Phase 2)
 */

export type BlockType =
  | "hero"
  | "text"
  | "gallery"
  | "video"
  | "testimonials"
  | "benefits"
  | "countdown"
  | "price"
  | "cta"
  | "separator"
  | "faq"
  | "html"
  | "trust"
  | "buynow";

export type HeroProps = {
  imageUrl: string;
  videoUrl?: string;
  overlayText?: string;
  overlayPosition: "top" | "center" | "bottom";
  height: "sm" | "md" | "lg" | "full" | "auto";
  objectFit?: "cover" | "contain";
};

export type TextProps = {
  content: string; // HTML string from WYSIWYG
  alignment: "left" | "center" | "right";
};

export type GalleryProps = {
  images: string[];
  layout: "carousel" | "grid-2" | "grid-3" | "slider";
  showLightbox: boolean;
};

export type VideoProps = {
  url: string; // YouTube, Vimeo, or MP4
  autoplay: boolean;
  muted: boolean;
  thumbnailUrl?: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  photo?: string;
  rating: number; // 1-5
  text: string;
};

export type TestimonialsProps = {
  items: TestimonialItem[];
  layout: "grid" | "carousel" | "list";
};

export type BenefitItem = {
  id: string;
  icon: string; // emoji or icon name
  title: string;
  description: string;
};

export type BenefitsProps = {
  items: BenefitItem[];
  layout: "horizontal" | "vertical" | "grid";
};

export type CountdownProps = {
  mode: "fixed" | "evergreen";
  endDate?: string; // ISO string for fixed mode
  hours?: number; // hours from visit for evergreen
  style: "inline" | "banner" | "floating";
  label: string;
};

export type PriceProps = {
  price: number;
  compareAtPrice?: number;
  currency: string;
  showBadge: boolean;
  badgeText: string;
};

export type CtaProps = {
  text: string;
  color: string;
  size: "sm" | "md" | "lg";
  icon?: string;
  action: "scroll-form" | "open-popup" | "link";
  linkUrl?: string;
  animation: "none" | "pulse" | "shake" | "glow";
};

export type SeparatorProps = {
  type: "line" | "space" | "wave" | "zigzag";
  height: number; // px
  color?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqProps = {
  items: FaqItem[];
  schemaMarkup: boolean;
};

export type HtmlProps = {
  code: string;
};

export type TrustProps = {
  badges: { id: string; icon: string; label: string }[];
  layout: "row" | "grid";
};

export type BuyNowAnimation =
  | "none"
  | "heartbeat"
  | "shake"
  | "bounce"
  | "glow"
  | "breathe"
  | "rubber"
  | "flash";

export type BuyNowProps = {
  text: string;
  subtext: string;
  colorFrom: string;
  colorTo: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animation: BuyNowAnimation;
};

export type BlockProps =
  | { type: "hero"; props: HeroProps }
  | { type: "text"; props: TextProps }
  | { type: "gallery"; props: GalleryProps }
  | { type: "video"; props: VideoProps }
  | { type: "testimonials"; props: TestimonialsProps }
  | { type: "benefits"; props: BenefitsProps }
  | { type: "countdown"; props: CountdownProps }
  | { type: "price"; props: PriceProps }
  | { type: "cta"; props: CtaProps }
  | { type: "separator"; props: SeparatorProps }
  | { type: "faq"; props: FaqProps }
  | { type: "html"; props: HtmlProps }
  | { type: "trust"; props: TrustProps }
  | { type: "buynow"; props: BuyNowProps };

export type EditorBlock = {
  id: string;
  order: number;
} & BlockProps;

export type PageEditorState = {
  productId: string;
  blocks: EditorBlock[];
  updatedAt: string;
};

// Block catalog with defaults
export const BLOCK_CATALOG: { type: BlockType; label: string; icon: string; defaultProps: BlockProps["props"] }[] = [
  { type: "hero", label: "Hero Image/Video", icon: "🖼️", defaultProps: { imageUrl: "", overlayPosition: "center", height: "auto", objectFit: "contain" } as HeroProps },
  { type: "text", label: "Texto", icon: "📝", defaultProps: { content: "<p>Escribe tu texto aquí...</p>", alignment: "left" } as TextProps },
  { type: "gallery", label: "Galería", icon: "🖼️", defaultProps: { images: [], layout: "carousel", showLightbox: true } as GalleryProps },
  { type: "video", label: "Video", icon: "🎬", defaultProps: { url: "", autoplay: false, muted: true } as VideoProps },
  { type: "testimonials", label: "Testimonios", icon: "⭐", defaultProps: { items: [{ id: "1", name: "Cliente", rating: 5, text: "Excelente producto!" }], layout: "grid" } as TestimonialsProps },
  { type: "benefits", label: "Beneficios", icon: "✅", defaultProps: { items: [{ id: "1", icon: "✅", title: "Beneficio", description: "Descripción del beneficio" }], layout: "horizontal" } as BenefitsProps },
  { type: "countdown", label: "Countdown", icon: "⏰", defaultProps: { mode: "evergreen", hours: 2, style: "inline", label: "¡Oferta termina en!" } as CountdownProps },
  { type: "price", label: "Precio", icon: "💰", defaultProps: { price: 89000, compareAtPrice: 129000, currency: "COP", showBadge: true, badgeText: "-31%" } as PriceProps },
  { type: "cta", label: "Botón CTA", icon: "🔘", defaultProps: { text: "¡Comprar ahora!", color: "#16a34a", size: "lg", action: "scroll-form", animation: "pulse" } as CtaProps },
  { type: "separator", label: "Separador", icon: "➖", defaultProps: { type: "space", height: 24 } as SeparatorProps },
  { type: "faq", label: "FAQ", icon: "❓", defaultProps: { items: [{ id: "1", question: "¿Pregunta?", answer: "Respuesta aquí." }], schemaMarkup: true } as FaqProps },
  { type: "html", label: "HTML", icon: "🧩", defaultProps: { code: "" } as HtmlProps },
  { type: "trust", label: "Trust Badges", icon: "🛡️", defaultProps: { badges: [{ id: "1", icon: "🔒", label: "Pago Seguro" }, { id: "2", icon: "🚚", label: "Envío Rápido" }, { id: "3", icon: "✅", label: "Garantía" }], layout: "row" } as TrustProps },
  { type: "buynow", label: "Botón de Pago", icon: "🛒", defaultProps: { text: "Comprar ahora", subtext: "Pago contra entrega · Envío gratis", colorFrom: "#16a34a", colorTo: "#059669", textColor: "#ffffff", borderColor: "#15803d", borderWidth: 0, borderRadius: "xl", animation: "heartbeat" } as BuyNowProps },
];
