import type { BenefitsProps } from "@/types/editor";

export default function BenefitsBlock({ items, layout }: BenefitsProps) {
  const containerClass =
    layout === "horizontal" ? "flex flex-wrap gap-4 justify-center" :
    layout === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" :
    "space-y-4";

  return (
    <div data-testid="block-benefits" className={`p-4 ${containerClass}`}>
      {items.map((b) => (
        <div
          key={b.id}
          className={`flex gap-3 p-3 rounded-lg ${
            layout === "vertical" ? "flex-col items-center text-center" : "items-start"
          }`}
        >
          <span className="text-2xl flex-shrink-0">{b.icon}</span>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{b.title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{b.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
