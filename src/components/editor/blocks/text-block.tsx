import type { TextProps } from "@/types/editor";

export default function TextBlock({ content, alignment }: TextProps) {
  return (
    <div
      data-testid="block-text"
      className="prose dark:prose-invert max-w-none px-4 py-3"
      style={{ textAlign: alignment }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
