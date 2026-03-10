import type { HtmlProps } from "@/types/editor";

export default function HtmlBlock({ code }: HtmlProps) {
  if (!code) {
    return (
      <div data-testid="block-html" className="p-4 text-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg m-4">
        Agrega código HTML personalizado
      </div>
    );
  }

  return (
    <div data-testid="block-html" className="px-4 py-2" dangerouslySetInnerHTML={{ __html: code }} />
  );
}
