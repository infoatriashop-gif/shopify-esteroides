"use client";

import React from "react";
import type { EditorBlock } from "@/types/editor";

// Lazy block components for code splitting
const HeroBlock = React.lazy(() => import("./hero-block"));
const TextBlock = React.lazy(() => import("./text-block"));
const GalleryBlock = React.lazy(() => import("./gallery-block"));
const VideoBlock = React.lazy(() => import("./video-block"));
const TestimonialsBlock = React.lazy(() => import("./testimonials-block"));
const BenefitsBlock = React.lazy(() => import("./benefits-block"));
const CountdownBlock = React.lazy(() => import("./countdown-block"));
const PriceBlock = React.lazy(() => import("./price-block"));
const CtaBlock = React.lazy(() => import("./cta-block"));
const SeparatorBlock = React.lazy(() => import("./separator-block"));
const FaqBlock = React.lazy(() => import("./faq-block"));
const HtmlBlock = React.lazy(() => import("./html-block"));
const TrustBlock = React.lazy(() => import("./trust-block"));
const BuyNowBlock = React.lazy(() => import("./buynow-block"));

type BlockRendererProps = {
  block: EditorBlock;
  isPreview?: boolean;
};

export function BlockRenderer({ block, isPreview }: BlockRendererProps) {
  const fallback = (
    <div className="h-12 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
  );

  return (
    <React.Suspense fallback={fallback}>
      {block.type === "hero" && <HeroBlock {...block.props} />}
      {block.type === "text" && <TextBlock {...block.props} />}
      {block.type === "gallery" && <GalleryBlock {...block.props} />}
      {block.type === "video" && <VideoBlock {...block.props} />}
      {block.type === "testimonials" && <TestimonialsBlock {...block.props} />}
      {block.type === "benefits" && <BenefitsBlock {...block.props} />}
      {block.type === "countdown" && <CountdownBlock {...block.props} isPreview={isPreview} />}
      {block.type === "price" && <PriceBlock {...block.props} />}
      {block.type === "cta" && <CtaBlock {...block.props} isPreview={isPreview} />}
      {block.type === "separator" && <SeparatorBlock {...block.props} />}
      {block.type === "faq" && <FaqBlock {...block.props} />}
      {block.type === "html" && <HtmlBlock {...block.props} />}
      {block.type === "trust" && <TrustBlock {...block.props} />}
      {block.type === "buynow" && <BuyNowBlock {...block.props} isPreview={isPreview} />}
    </React.Suspense>
  );
}
