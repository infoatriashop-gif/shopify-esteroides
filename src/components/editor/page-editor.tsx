"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  DragOverlay,
  MeasuringStrategy,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import type { EditorBlock, BlockType, PageEditorState } from "@/types/editor";
import { BLOCK_CATALOG } from "@/types/editor";
import { BlockRenderer } from "./blocks/block-renderer";
import { BlockProperties } from "./block-properties";

// ── Constants ────────────────────────────────────────────────────────
const MAX_HISTORY = 50;
const CATALOG_PREFIX = "catalog:";
const DROP_ZONE_PREFIX = "dropzone:";

// ── History ──────────────────────────────────────────────────────────
type HistoryEntry = {
  blocks: EditorBlock[];
  savedAt: number;
  label: string;
};

// ── Catalog drag item ─────────────────────────────────────────────────
function CatalogItem({ type, label, icon }: { type: BlockType; label: string; icon: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `${CATALOG_PREFIX}${type}`,
    data: { type, source: "catalog" },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`flex flex-col items-center gap-0.5 p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 transition-all text-center hover:shadow-sm cursor-grab active:cursor-grabbing select-none ${isDragging ? "opacity-40 scale-95" : ""}`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">{label}</span>
    </div>
  );
}

// ── Drop zone between blocks ──────────────────────────────────────────
function DropZone({ id, isOver }: { id: string; isOver: boolean }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`relative h-2 mx-2 transition-all duration-150 ${isOver ? "h-10" : ""}`}
    >
      <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
        isOver
          ? "h-1.5 bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]"
          : "h-px bg-transparent"
      }`} />
      {isOver && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-3 h-3 rounded-full bg-blue-500 shadow-md" />
      )}
    </div>
  );
}

// ── Sortable block wrapper ────────────────────────────────────────────
function SortableBlock({
  block, isSelected, onSelect, onDuplicate, onDelete, onMoveUp, onMoveDown, isFirst, isLast,
}: {
  block: EditorBlock;
  isSelected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isSorting ? transition : undefined,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 50 : "auto" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      className={`relative group transition-shadow duration-200 ${isDragging ? "shadow-2xl" : ""} ${
        isSelected
          ? "ring-2 ring-blue-500 ring-offset-1 rounded-lg"
          : "hover:ring-1 hover:ring-blue-300 hover:rounded-lg"
      }`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-gradient-to-r from-gray-200/90 to-transparent dark:from-gray-700/90 rounded-l-lg z-10"
        title="Arrastra para reordenar"
      >
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      </div>

      {/* Block toolbar */}
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-0.5 bg-white/95 dark:bg-gray-800/95 rounded-md shadow-sm border border-gray-200 dark:border-gray-600 px-1 py-0.5">
        <span className="text-[10px] text-blue-600 dark:text-blue-300 px-1 font-medium">{block.type}</span>
        <div className="w-px h-3 bg-gray-200 dark:bg-gray-600" />
        {!isFirst && (
          <button onClick={(e) => { e.stopPropagation(); onMoveUp(); }} className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer" title="Subir">
            <svg className="w-3 h-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
          </button>
        )}
        {!isLast && (
          <button onClick={(e) => { e.stopPropagation(); onMoveDown(); }} className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer" title="Bajar">
            <svg className="w-3 h-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          </button>
        )}
        <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer" title="Duplicar">
          <svg className="w-3 h-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" /></svg>
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-0.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded cursor-pointer" title="Eliminar">
          <svg className="w-3 h-3 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
        </button>
      </div>

      <BlockRenderer block={block} isPreview />
    </div>
  );
}

// ── Empty canvas drop zone ────────────────────────────────────────────
function EmptyCanvasDropZone({ isOver }: { isOver: boolean }) {
  const { setNodeRef } = useDroppable({ id: `${DROP_ZONE_PREFIX}empty` });
  return (
    <div ref={setNodeRef} className={`flex flex-col items-center justify-center h-64 rounded-xl transition-all duration-200 ${isOver ? "bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-400 ring-dashed" : "text-gray-400 dark:text-gray-500"}`}>
      {isOver ? (
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Suelta aquí para agregar</p>
        </div>
      ) : (
        <>
          <svg className="w-12 h-12 mb-3 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <p className="text-sm font-medium">Arrastra bloques desde el panel izquierdo</p>
          <p className="text-xs mt-1 text-gray-400">Suéltalos en la posición que quieras</p>
        </>
      )}
    </div>
  );
}

// ── History panel ─────────────────────────────────────────────────────
function HistoryPanel({ history, currentIndex, onRestore, onClose }: {
  history: HistoryEntry[];
  currentIndex: number;
  onRestore: (index: number) => void;
  onClose: () => void;
}) {
  const fmt = (ms: number) =>
    new Date(ms).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="absolute right-0 bottom-full mb-2 w-72 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 dark:border-gray-700">
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Historial de cambios</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="max-h-72 overflow-y-auto">
        {history.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-6">Sin historial aún</p>
        ) : (
          [...history].reverse().map((entry, ri) => {
            const realIdx = history.length - 1 - ri;
            const isCurrent = realIdx === currentIndex;
            return (
              <button key={ri} onClick={() => onRestore(realIdx)}
                className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${isCurrent ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isCurrent ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${isCurrent ? "text-blue-700 dark:text-blue-300" : "text-gray-700 dark:text-gray-300"}`}>{entry.label}</p>
                  <p className="text-[10px] text-gray-400">{fmt(entry.savedAt)} · {entry.blocks.length} bloques</p>
                </div>
                {isCurrent && <span className="text-[10px] text-blue-500 font-medium">actual</span>}
              </button>
            );
          })
        )}
      </div>
      <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-[10px] text-gray-400">Clic en cualquier versión para restaurarla</p>
      </div>
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────
export function PageEditor({ productId }: { productId: string }) {
  const [blocks, setBlocks] = useState<EditorBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "autosaved" | "error">("idle");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overDropZone, setOverDropZone] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const isRestoringRef = useRef(false);
  const initialLoadRef = useRef(true);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editHistoryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActionRef = useRef<string>("cambio");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
  const isDraggingFromCatalog = activeId?.startsWith(CATALOG_PREFIX) ?? false;

  // ── Push history ────────────────────────────────────────────────
  const pushHistory = useCallback((newBlocks: EditorBlock[], label: string) => {
    if (isRestoringRef.current) return;
    setHistory((prev) => {
      const base = historyIndex >= 0 ? prev.slice(0, historyIndex + 1) : prev;
      const entry: HistoryEntry = { blocks: JSON.parse(JSON.stringify(newBlocks)), savedAt: Date.now(), label };
      return [...base, entry].slice(-MAX_HISTORY);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIndex]);

  // ── Load ────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`/api/pages/${productId}`)
      .then((r) => r.json())
      .then((data: PageEditorState) => {
        if (data.blocks?.length) {
          setBlocks(data.blocks);
          setHistory([{ blocks: JSON.parse(JSON.stringify(data.blocks)), savedAt: Date.now(), label: "Estado inicial" }]);
          setHistoryIndex(0);
        }
        initialLoadRef.current = false;
      })
      .catch(() => { initialLoadRef.current = false; });
  }, [productId]);

  // ── Track changes & autosave ─────────────────────────────────────
  useEffect(() => {
    if (initialLoadRef.current || isRestoringRef.current) return;
    setHasChanges(true);
    setSaveStatus("idle");
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await fetch(`/api/pages/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blocks }),
        });
        setSaveStatus("autosaved");
        setHasChanges(false);
        setTimeout(() => setSaveStatus("idle"), 3000);
      } catch { setSaveStatus("error"); }
    }, 8000);
    return () => { if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  // ── Debounced history on edit ────────────────────────────────────
  useEffect(() => {
    if (initialLoadRef.current || isRestoringRef.current) return;
    if (editHistoryTimerRef.current) clearTimeout(editHistoryTimerRef.current);
    editHistoryTimerRef.current = setTimeout(() => {
      pushHistory(blocks, lastActionRef.current);
    }, 1500);
    return () => { if (editHistoryTimerRef.current) clearTimeout(editHistoryTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  // ── Save ────────────────────────────────────────────────────────
  const save = useCallback(async () => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    setSaveStatus("saving"); setSaving(true);
    try {
      await fetch(`/api/pages/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks }),
      });
      setSaveStatus("saved"); setHasChanges(false);
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch { setSaveStatus("error"); }
    finally { setSaving(false); }
  }, [productId, blocks]);

  // ── Restore history ─────────────────────────────────────────────
  const restoreHistory = useCallback((index: number) => {
    const entry = history[index];
    if (!entry) return;
    isRestoringRef.current = true;
    setBlocks(JSON.parse(JSON.stringify(entry.blocks)));
    setHistoryIndex(index);
    setSelectedBlockId(null);
    setShowHistory(false);
    setHasChanges(true);
    setSaveStatus("idle");
    setTimeout(() => { isRestoringRef.current = false; }, 50);
  }, [history]);

  // ── Keyboard shortcuts ───────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); save(); }
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "z") { e.preventDefault(); if (historyIndex > 0) restoreHistory(historyIndex - 1); }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.shiftKey && e.key === "z"))) { e.preventDefault(); if (historyIndex < history.length - 1) restoreHistory(historyIndex + 1); }
      if (e.key === "Delete" && selectedBlockId && !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) deleteBlock(selectedBlockId);
      if (e.key === "Escape") setSelectedBlockId(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  // ── Block ops ───────────────────────────────────────────────────
  const insertBlockAt = useCallback((type: BlockType, insertIndex: number) => {
    const catalog = BLOCK_CATALOG.find((b) => b.type === type);
    if (!catalog) return;
    const newBlock: EditorBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      order: insertIndex,
      props: JSON.parse(JSON.stringify(catalog.defaultProps)),
    } as EditorBlock;
    const next = [...blocks];
    next.splice(insertIndex, 0, newBlock);
    const reordered = next.map((b, i) => ({ ...b, order: i }));
    lastActionRef.current = `Agregar bloque ${type}`;
    setBlocks(reordered);
    setSelectedBlockId(newBlock.id);
    pushHistory(reordered, `Agregar bloque ${type}`);
  }, [blocks, pushHistory]);

  const updateBlock = useCallback((updated: EditorBlock) => {
    lastActionRef.current = `Editar bloque ${updated.type}`;
    setBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    const block = blocks.find((b) => b.id === id);
    const next = blocks.filter((b) => b.id !== id);
    if (selectedBlockId === id) setSelectedBlockId(null);
    setBlocks(next);
    pushHistory(next, `Eliminar bloque ${block?.type ?? ""}`);
  }, [blocks, selectedBlockId, pushHistory]);

  const duplicateBlock = useCallback((id: string) => {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx === -1) return;
    const duplicate: EditorBlock = { ...JSON.parse(JSON.stringify(blocks[idx])), id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    const arr = [...blocks];
    arr.splice(idx + 1, 0, duplicate);
    const next = arr.map((b, i) => ({ ...b, order: i }));
    setBlocks(next);
    pushHistory(next, "Duplicar bloque");
  }, [blocks, pushHistory]);

  const moveBlock = useCallback((id: string, direction: "up" | "down") => {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx === -1) return;
    const newIdx = direction === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= blocks.length) return;
    const next = arrayMove(blocks, idx, newIdx).map((b, i) => ({ ...b, order: i }));
    setBlocks(next);
    pushHistory(next, `Mover bloque ${direction === "up" ? "arriba" : "abajo"}`);
  }, [blocks, pushHistory]);

  // ── Drag handlers ────────────────────────────────────────────────
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const overId = event.over?.id as string | null;
    if (overId?.startsWith(DROP_ZONE_PREFIX) || overId === `${DROP_ZONE_PREFIX}empty`) {
      setOverDropZone(overId);
    } else {
      setOverDropZone(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverDropZone(null);

    if (!over) return;

    const activeIdStr = active.id as string;
    const overIdStr = over.id as string;

    // ── Catalog item dropped onto canvas ──
    if (activeIdStr.startsWith(CATALOG_PREFIX)) {
      const type = activeIdStr.replace(CATALOG_PREFIX, "") as BlockType;

      if (overIdStr === `${DROP_ZONE_PREFIX}empty`) {
        insertBlockAt(type, 0);
        return;
      }

      if (overIdStr.startsWith(DROP_ZONE_PREFIX)) {
        // dropzone:INDEX — insert before that index
        const idx = parseInt(overIdStr.replace(DROP_ZONE_PREFIX, ""), 10);
        insertBlockAt(type, isNaN(idx) ? blocks.length : idx);
        return;
      }

      // Dropped directly on a block — insert before it
      const targetIdx = blocks.findIndex((b) => b.id === overIdStr);
      if (targetIdx !== -1) {
        insertBlockAt(type, targetIdx);
      }
      return;
    }

    // ── Existing block reordered ──
    if (activeIdStr !== overIdStr) {
      const oldIndex = blocks.findIndex((b) => b.id === activeIdStr);
      const newIndex = blocks.findIndex((b) => b.id === overIdStr);
      if (oldIndex !== -1 && newIndex !== -1) {
        const next = arrayMove(blocks, oldIndex, newIndex).map((b, i) => ({ ...b, order: i }));
        setBlocks(next);
        pushHistory(next, "Reordenar bloques");
      }
    }
  };

  // ── Save button helpers ──────────────────────────────────────────
  const saveBtnLabel = () => {
    if (saveStatus === "saving") return "Guardando...";
    if (saveStatus === "saved") return "Guardado ✓";
    if (saveStatus === "autosaved") return "Autoguardado ✓";
    if (saveStatus === "error") return "Error, reintentar";
    if (hasChanges) return "Guardar";
    return "Guardado";
  };
  const saveBtnColor = () => {
    if (saveStatus === "saved" || saveStatus === "autosaved") return "bg-green-600 hover:bg-green-700 text-white";
    if (saveStatus === "error") return "bg-red-600 hover:bg-red-700 text-white";
    if (hasChanges) return "bg-blue-600 hover:bg-blue-700 text-white";
    return "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400";
  };

  const DEVICE_WIDTHS = { desktop: "100%", tablet: "768px", mobile: "375px" };

  // ── Preview mode ─────────────────────────────────────────────────
  if (isPreviewMode) {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col bg-gray-100 dark:bg-gray-950">
        <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <button onClick={() => setIsPreviewMode(false)}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
            ← Volver al editor
          </button>
          <div className="flex gap-1 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            {(["desktop", "tablet", "mobile"] as const).map((d) => (
              <button key={d} onClick={() => setPreviewDevice(d)}
                className={`px-3 py-1.5 text-xs font-medium cursor-pointer ${previewDevice === d ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                {d === "desktop" ? "Desktop" : d === "tablet" ? "Tablet" : "Mobile"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto flex justify-center p-4">
          <div style={{ width: DEVICE_WIDTHS[previewDevice], maxWidth: "100%" }}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
            {blocks.map((block) => <BlockRenderer key={block.id} block={block} />)}
          </div>
        </div>
      </div>
    );
  }

  const activeBlock = activeId && !isDraggingFromCatalog
    ? blocks.find((b) => b.id === activeId)
    : null;
  const activeCatalogType = isDraggingFromCatalog
    ? (activeId!.replace(CATALOG_PREFIX, "") as BlockType)
    : null;
  const activeCatalogItem = activeCatalogType
    ? BLOCK_CATALOG.find((b) => b.type === activeCatalogType)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="h-[calc(100vh-64px)] flex" onClick={() => setSelectedBlockId(null)}>

        {/* ── Left sidebar — Block palette ── */}
        <div className="w-56 flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-3">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Bloques</h3>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-2">Arrastra al canvas para agregar</p>
            <div className="grid grid-cols-2 gap-1.5">
              {BLOCK_CATALOG.map((item) => (
                <CatalogItem key={item.type} type={item.type} label={item.label} icon={item.icon} />
              ))}
            </div>
          </div>
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 space-y-0.5">
              <span className="block"><kbd className="px-1 bg-gray-100 dark:bg-gray-800 rounded text-[9px]">Ctrl+S</kbd> Guardar</span>
              <span className="block"><kbd className="px-1 bg-gray-100 dark:bg-gray-800 rounded text-[9px]">Ctrl+Z</kbd> Deshacer</span>
              <span className="block"><kbd className="px-1 bg-gray-100 dark:bg-gray-800 rounded text-[9px]">Ctrl+Y</kbd> Rehacer</span>
              <span className="block"><kbd className="px-1 bg-gray-100 dark:bg-gray-800 rounded text-[9px]">Del</kbd> Eliminar bloque</span>
              <span className="block"><kbd className="px-1 bg-gray-100 dark:bg-gray-800 rounded text-[9px]">Esc</kbd> Deseleccionar</span>
            </p>
          </div>
        </div>

        {/* ── Center — Canvas ── */}
        <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-950 p-4 pb-24">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Editor de página ({blocks.length} bloques)
              {hasChanges && saveStatus === "idle" && (
                <span className="ml-2 text-[10px] text-yellow-600 dark:text-yellow-400">● sin guardar</span>
              )}
              {saveStatus === "autosaved" && (
                <span className="ml-2 text-[10px] text-green-600 dark:text-green-400">● autoguardado</span>
              )}
            </h2>
            <div className="flex gap-2 items-center">
              <button onClick={() => historyIndex > 0 && restoreHistory(historyIndex - 1)} disabled={historyIndex <= 0}
                title="Deshacer (Ctrl+Z)"
                className="p-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
              </button>
              <button onClick={() => historyIndex < history.length - 1 && restoreHistory(historyIndex + 1)} disabled={historyIndex >= history.length - 1}
                title="Rehacer (Ctrl+Y)"
                className="p-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" /></svg>
              </button>
              <button onClick={() => setIsPreviewMode(true)}
                className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                Vista previa
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className={`max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm border-2 min-h-[400px] transition-colors duration-150 ${isDraggingFromCatalog ? "border-blue-300 dark:border-blue-600 border-dashed" : "border-gray-200 dark:border-gray-700"}`}>
            {blocks.length === 0 ? (
              <EmptyCanvasDropZone isOver={overDropZone === `${DROP_ZONE_PREFIX}empty`} />
            ) : (
              <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                {/* Drop zone at the very top */}
                {isDraggingFromCatalog && (
                  <DropZone id={`${DROP_ZONE_PREFIX}0`} isOver={overDropZone === `${DROP_ZONE_PREFIX}0`} />
                )}

                {blocks.map((block, idx) => (
                  <div key={block.id}>
                    <SortableBlock
                      block={block}
                      isSelected={block.id === selectedBlockId}
                      onSelect={() => setSelectedBlockId(block.id)}
                      onDuplicate={() => duplicateBlock(block.id)}
                      onDelete={() => deleteBlock(block.id)}
                      onMoveUp={() => moveBlock(block.id, "up")}
                      onMoveDown={() => moveBlock(block.id, "down")}
                      isFirst={idx === 0}
                      isLast={idx === blocks.length - 1}
                    />
                    {/* Drop zone after each block */}
                    {isDraggingFromCatalog && (
                      <DropZone
                        id={`${DROP_ZONE_PREFIX}${idx + 1}`}
                        isOver={overDropZone === `${DROP_ZONE_PREFIX}${idx + 1}`}
                      />
                    )}
                  </div>
                ))}
              </SortableContext>
            )}
          </div>
        </div>

        {/* ── Right sidebar — Properties ── */}
        <div className="w-72 flex-shrink-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {selectedBlock ? (
            <BlockProperties block={selectedBlock} onChange={updateBlock} onDelete={() => deleteBlock(selectedBlock.id)} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 p-4">
              <svg className="w-8 h-8 mb-2 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <p className="text-sm text-center">Selecciona un bloque para editar</p>
            </div>
          )}
        </div>

        {/* ── Floating save + history ── */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          {showHistory && (
            <div className="relative">
              <HistoryPanel history={history} currentIndex={historyIndex} onRestore={restoreHistory} onClose={() => setShowHistory(false)} />
            </div>
          )}
          <div className="flex items-center gap-2">
            <button onClick={() => setShowHistory((v) => !v)} title="Historial de versiones"
              className={`h-10 px-3 rounded-xl shadow-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium ${showHistory ? "bg-purple-600 text-white border-purple-700" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">Versiones</span>
              {history.length > 1 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${showHistory ? "bg-white/20" : "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300"}`}>
                  {history.length}
                </span>
              )}
            </button>
            <button onClick={save} disabled={saving}
              className={`h-10 px-4 rounded-xl shadow-lg font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 disabled:opacity-70 ${saveBtnColor()}`}>
              {saving ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              )}
              {saveBtnLabel()}
            </button>
          </div>
        </div>
      </div>

      {/* ── Drag overlay ── */}
      <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>
        {activeBlock && (
          <div className="opacity-90 shadow-2xl rounded-lg overflow-hidden ring-2 ring-blue-500 scale-[1.02]">
            <BlockRenderer block={activeBlock} isPreview />
          </div>
        )}
        {activeCatalogItem && (
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-2 border-blue-500 cursor-grabbing">
            <span className="text-xl">{activeCatalogItem.icon}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{activeCatalogItem.label}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
