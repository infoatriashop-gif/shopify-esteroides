import type { SeparatorProps } from "@/types/editor";

export default function SeparatorBlock({ type, height, color }: SeparatorProps) {
  if (type === "space") {
    return <div data-testid="block-separator" style={{ height: `${height}px` }} />;
  }

  if (type === "wave") {
    return (
      <div data-testid="block-separator" className="overflow-hidden" style={{ height: `${height}px` }}>
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,30 Q300,0 600,30 T1200,30 L1200,60 L0,60 Z" fill={color || "#e5e7eb"} />
        </svg>
      </div>
    );
  }

  if (type === "zigzag") {
    return (
      <div data-testid="block-separator" className="overflow-hidden" style={{ height: `${height}px` }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,20 L50,0 L100,20 L150,0 L200,20 L250,0 L300,20 L350,0 L400,20 L450,0 L500,20 L550,0 L600,20 L650,0 L700,20 L750,0 L800,20 L850,0 L900,20 L950,0 L1000,20 L1050,0 L1100,20 L1150,0 L1200,20" stroke={color || "#e5e7eb"} strokeWidth="2" fill="none" />
        </svg>
      </div>
    );
  }

  // line
  return (
    <div data-testid="block-separator" className="px-4" style={{ paddingTop: `${height / 2}px`, paddingBottom: `${height / 2}px` }}>
      <hr style={{ borderColor: color || undefined }} className="border-gray-200 dark:border-gray-700" />
    </div>
  );
}
