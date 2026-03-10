import type { GalleryProps } from "@/types/editor";

export default function GalleryBlock({ images, layout }: GalleryProps) {
  if (!images.length) {
    return (
      <div data-testid="block-gallery" className="p-4 text-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg mx-4">
        Arrastra imágenes aquí o agrega URLs
      </div>
    );
  }

  if (layout === "grid-2" || layout === "grid-3") {
    const cols = layout === "grid-2" ? "grid-cols-2" : "grid-cols-3";
    return (
      <div data-testid="block-gallery" className={`grid ${cols} gap-1`}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Imagen ${i + 1}`}
            className="w-full h-auto block object-cover"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    );
  }

  // carousel / slider — full width, each image natural height
  return (
    <div data-testid="block-gallery" className="flex overflow-x-auto gap-0 snap-x snap-mandatory scrollbar-none">
      {images.map((src, i) => (
        <div key={i} className="snap-center flex-shrink-0 w-full">
          <img
            src={src}
            alt={`Imagen ${i + 1}`}
            className="w-full h-auto block"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
