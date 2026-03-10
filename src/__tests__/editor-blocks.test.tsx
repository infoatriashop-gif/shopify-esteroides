import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { EditorBlock } from "@/types/editor";
import { BLOCK_CATALOG } from "@/types/editor";

// Import blocks directly (not lazy)
import HeroBlock from "@/components/editor/blocks/hero-block";
import TextBlock from "@/components/editor/blocks/text-block";
import GalleryBlock from "@/components/editor/blocks/gallery-block";
import VideoBlock from "@/components/editor/blocks/video-block";
import TestimonialsBlock from "@/components/editor/blocks/testimonials-block";
import BenefitsBlock from "@/components/editor/blocks/benefits-block";
import CountdownBlock from "@/components/editor/blocks/countdown-block";
import PriceBlock from "@/components/editor/blocks/price-block";
import CtaBlock from "@/components/editor/blocks/cta-block";
import SeparatorBlock from "@/components/editor/blocks/separator-block";
import FaqBlock from "@/components/editor/blocks/faq-block";
import HtmlBlock from "@/components/editor/blocks/html-block";
import TrustBlock from "@/components/editor/blocks/trust-block";

describe("Block catalog", () => {
  it("has 13 block types", () => {
    expect(BLOCK_CATALOG).toHaveLength(13);
  });

  it("each block type has label, icon and defaultProps", () => {
    for (const block of BLOCK_CATALOG) {
      expect(block.label).toBeTruthy();
      expect(block.icon).toBeTruthy();
      expect(block.defaultProps).toBeDefined();
    }
  });
});

describe("HeroBlock", () => {
  it("renders with default props", () => {
    render(<HeroBlock imageUrl="" overlayPosition="center" height="md" />);
    expect(screen.getByTestId("block-hero")).toBeInTheDocument();
  });

  it("renders overlay text", () => {
    render(<HeroBlock imageUrl="" overlayText="Test Title" overlayPosition="center" height="md" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
});

describe("TextBlock", () => {
  it("renders HTML content", () => {
    render(<TextBlock content="<p>Hello World</p>" alignment="left" />);
    expect(screen.getByTestId("block-text")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});

describe("GalleryBlock", () => {
  it("renders empty state", () => {
    render(<GalleryBlock images={[]} layout="carousel" showLightbox={true} />);
    expect(screen.getByTestId("block-gallery")).toBeInTheDocument();
  });
});

describe("VideoBlock", () => {
  it("renders empty state", () => {
    render(<VideoBlock url="" autoplay={false} muted={true} />);
    expect(screen.getByTestId("block-video")).toBeInTheDocument();
  });
});

describe("TestimonialsBlock", () => {
  it("renders testimonials", () => {
    render(
      <TestimonialsBlock
        items={[{ id: "1", name: "Juan", rating: 5, text: "Excelente!" }]}
        layout="grid"
      />
    );
    expect(screen.getByTestId("block-testimonials")).toBeInTheDocument();
    expect(screen.getByText("Juan")).toBeInTheDocument();
    expect(screen.getByText("Excelente!")).toBeInTheDocument();
  });
});

describe("BenefitsBlock", () => {
  it("renders benefits", () => {
    render(
      <BenefitsBlock
        items={[{ id: "1", icon: "✅", title: "Fast", description: "Very fast" }]}
        layout="horizontal"
      />
    );
    expect(screen.getByTestId("block-benefits")).toBeInTheDocument();
    expect(screen.getByText("Fast")).toBeInTheDocument();
  });
});

describe("CountdownBlock", () => {
  it("renders inline countdown", () => {
    render(<CountdownBlock mode="evergreen" hours={2} style="inline" label="Sale ends!" isPreview />);
    expect(screen.getByTestId("block-countdown")).toBeInTheDocument();
    expect(screen.getByText("Sale ends!")).toBeInTheDocument();
  });
});

describe("PriceBlock", () => {
  it("renders price with discount", () => {
    render(<PriceBlock price={89000} compareAtPrice={129000} currency="COP" showBadge={true} badgeText="-31%" />);
    expect(screen.getByTestId("block-price")).toBeInTheDocument();
    expect(screen.getByText("-31%")).toBeInTheDocument();
  });
});

describe("CtaBlock", () => {
  it("renders CTA button", () => {
    render(<CtaBlock text="Buy Now" color="#16a34a" size="lg" action="scroll-form" animation="pulse" isPreview />);
    expect(screen.getByTestId("block-cta")).toBeInTheDocument();
    expect(screen.getByText("Buy Now")).toBeInTheDocument();
  });
});

describe("SeparatorBlock", () => {
  it("renders space separator", () => {
    render(<SeparatorBlock type="space" height={24} />);
    expect(screen.getByTestId("block-separator")).toBeInTheDocument();
  });

  it("renders line separator", () => {
    render(<SeparatorBlock type="line" height={16} />);
    expect(screen.getByTestId("block-separator")).toBeInTheDocument();
  });
});

describe("FaqBlock", () => {
  it("renders FAQ items", () => {
    render(
      <FaqBlock
        items={[{ id: "1", question: "How?", answer: "Like this." }]}
        schemaMarkup={false}
      />
    );
    expect(screen.getByTestId("block-faq")).toBeInTheDocument();
    expect(screen.getByText("How?")).toBeInTheDocument();
  });
});

describe("HtmlBlock", () => {
  it("renders empty state", () => {
    render(<HtmlBlock code="" />);
    expect(screen.getByTestId("block-html")).toBeInTheDocument();
  });
});

describe("TrustBlock", () => {
  it("renders trust badges", () => {
    render(
      <TrustBlock
        badges={[{ id: "1", icon: "🔒", label: "Secure" }]}
        layout="row"
      />
    );
    expect(screen.getByTestId("block-trust")).toBeInTheDocument();
    expect(screen.getByText("Secure")).toBeInTheDocument();
  });
});
