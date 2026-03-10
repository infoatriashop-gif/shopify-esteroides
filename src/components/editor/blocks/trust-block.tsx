import type { TrustProps } from "@/types/editor";

export default function TrustBlock({ badges, layout }: TrustProps) {
  const containerClass = layout === "grid"
    ? "grid grid-cols-2 md:grid-cols-3 gap-3"
    : "flex flex-wrap justify-center gap-4";

  return (
    <div data-testid="block-trust" className={`p-4 ${containerClass}`}>
      {badges.map((b) => (
        <div key={b.id} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-xl">{b.icon}</span>
          <span className="font-medium">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
