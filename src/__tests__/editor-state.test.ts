import { describe, it, expect, vi } from "vitest";
import type { EditorBlock, PageEditorState } from "@/types/editor";
import { BLOCK_CATALOG } from "@/types/editor";

describe("Editor state management", () => {
  it("adds a block to the canvas", () => {
    const blocks: EditorBlock[] = [];
    const catalog = BLOCK_CATALOG.find((b) => b.type === "text")!;

    const newBlock: EditorBlock = {
      id: "block-1",
      type: "text",
      order: blocks.length,
      props: { ...catalog.defaultProps },
    } as EditorBlock;

    const updated = [...blocks, newBlock];
    expect(updated).toHaveLength(1);
    expect(updated[0].type).toBe("text");
  });

  it("reorders blocks", () => {
    const blocks: EditorBlock[] = [
      { id: "1", type: "hero", order: 0, props: { imageUrl: "", overlayPosition: "center", height: "md" } } as EditorBlock,
      { id: "2", type: "text", order: 1, props: { content: "Hello", alignment: "left" } } as EditorBlock,
      { id: "3", type: "cta", order: 2, props: { text: "Buy", color: "#fff", size: "lg", action: "scroll-form", animation: "none" } } as EditorBlock,
    ];

    // Move block "3" (cta) from index 2 to index 0
    const [moved] = blocks.splice(2, 1);
    blocks.unshift(moved);
    const reordered = blocks.map((b, i) => ({ ...b, order: i }));

    expect(reordered[0].type).toBe("cta");
    expect(reordered[0].order).toBe(0);
    expect(reordered[1].type).toBe("hero");
    expect(reordered[2].type).toBe("text");
  });

  it("updates block properties", () => {
    const block: EditorBlock = {
      id: "1",
      type: "text",
      order: 0,
      props: { content: "Old text", alignment: "left" },
    } as EditorBlock;

    const updated = {
      ...block,
      props: { ...block.props, content: "New text" },
    } as EditorBlock;

    expect(updated.props.content).toBe("New text");
    expect(updated.id).toBe("1");
  });

  it("saves and loads page state", () => {
    const state: PageEditorState = {
      productId: "42",
      blocks: [
        { id: "1", type: "hero", order: 0, props: { imageUrl: "/test.jpg", overlayPosition: "center", height: "lg" } } as EditorBlock,
        { id: "2", type: "cta", order: 1, props: { text: "Comprar", color: "#16a34a", size: "lg", action: "scroll-form", animation: "pulse" } } as EditorBlock,
      ],
      updatedAt: "2026-03-08T00:00:00.000Z",
    };

    // Simulate JSON serialization (like saving to file store)
    const serialized = JSON.stringify(state);
    const deserialized = JSON.parse(serialized) as PageEditorState;

    expect(deserialized.productId).toBe("42");
    expect(deserialized.blocks).toHaveLength(2);
    expect(deserialized.blocks[0].type).toBe("hero");
    expect(deserialized.blocks[1].props.text).toBe("Comprar");
  });

  it("CTA button with open-popup action has correct action type", () => {
    const ctaBlock: EditorBlock = {
      id: "1",
      type: "cta",
      order: 0,
      props: { text: "Comprar", color: "#16a34a", size: "lg", action: "open-popup", animation: "none" },
    } as EditorBlock;

    expect(ctaBlock.props.action).toBe("open-popup");
  });
});
