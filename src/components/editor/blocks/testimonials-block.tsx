import type { TestimonialsProps } from "@/types/editor";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsBlock({ items, layout }: TestimonialsProps) {
  const containerClass =
    layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" :
    layout === "carousel" ? "flex overflow-x-auto gap-4 snap-x" :
    "space-y-4";

  return (
    <div data-testid="block-testimonials" className={`p-4 ${containerClass}`}>
      {items.map((t) => (
        <div
          key={t.id}
          className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm snap-center min-w-[280px]"
        >
          <div className="flex items-center gap-3 mb-2">
            {t.photo ? (
              <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-sm">
                {t.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{t.name}</p>
              <Stars count={t.rating} />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.text}</p>
        </div>
      ))}
    </div>
  );
}
