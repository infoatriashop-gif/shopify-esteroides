"use client";

import { useState, useRef, useCallback } from "react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  /** Allow multiple images, returns URLs joined by newline */
  multiple?: boolean;
  onMultipleChange?: (urls: string[]) => void;
};

export function ImageUpload({ value, onChange, label = "Imagen", multiple, onMultipleChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      const fileArr = Array.from(files);
      for (const file of fileArr) {
        formData.append("files", file);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al subir");
        return;
      }

      const urls: string[] = data.images.map((img: { url: string }) => img.url);

      if (multiple && onMultipleChange) {
        onMultipleChange(urls);
      } else if (urls.length > 0) {
        onChange(urls[0]);
      }
    } catch {
      setError("Error de conexion");
    } finally {
      setUploading(false);
    }
  }, [onChange, onMultipleChange, multiple]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  }, [uploadFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
    }
  }, [uploadFiles]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const files: File[] = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) files.push(file);
      }
    }
    if (files.length > 0) {
      e.preventDefault();
      uploadFiles(files);
    }
  }, [uploadFiles]);

  return (
    <div className="space-y-2">
      <label className="block text-xs text-gray-600 dark:text-gray-400">{label}</label>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onPaste={handlePaste}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
        }`}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Optimizando...</span>
          </div>
        ) : value ? (
          <div className="relative group">
            <img
              src={value}
              alt=""
              className="max-h-24 mx-auto rounded object-contain"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
              <span className="text-white text-xs">Click para cambiar</span>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <svg className="w-6 h-6 mx-auto text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Arrastra imagen o click para seleccionar
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
              Auto-optimiza a AVIF/WebP
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* URL input fallback */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="o pega URL de imagen"
        className="w-full px-2 py-1.5 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

/**
 * Multi-image upload component for galleries
 */
export function MultiImageUpload({
  images,
  onChange,
  label = "Imagenes",
}: {
  images: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    setUploading(true);
    try {
      const formData = new FormData();
      for (const file of Array.from(files)) {
        formData.append("files", file);
      }

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok && data.images) {
        const newUrls = data.images.map((img: { url: string }) => img.url);
        onChange([...images, ...newUrls]);
      }
    } catch {
      // ignore
    } finally {
      setUploading(false);
    }
  }, [images, onChange]);

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs text-gray-600 dark:text-gray-400">{label}</label>

      {/* Thumbnails grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-1.5">
          {images.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] leading-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files.length > 0) uploadFiles(e.dataTransfer.files); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-2 text-center cursor-pointer transition-all ${
          dragOver ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
        }`}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 py-1">
            <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] text-gray-500">Optimizando...</span>
          </div>
        ) : (
          <p className="text-[10px] text-gray-500 dark:text-gray-400 py-1">
            + Agregar imagenes (drag & drop)
          </p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => { if (e.target.files) uploadFiles(e.target.files); }}
          className="hidden"
        />
      </div>
    </div>
  );
}
