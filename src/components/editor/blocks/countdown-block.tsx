"use client";

import { useState, useEffect } from "react";
import type { CountdownProps } from "@/types/editor";

export default function CountdownBlock({ mode, endDate, hours, style, label, isPreview }: CountdownProps & { isPreview?: boolean }) {
  const [timeLeft, setTimeLeft] = useState({ h: hours || 2, m: 0, s: 0 });

  useEffect(() => {
    if (isPreview) return; // Don't tick in editor preview

    const target = mode === "fixed" && endDate
      ? new Date(endDate).getTime()
      : Date.now() + (hours || 2) * 3600000;

    const timer = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
      if (diff <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, endDate, hours, isPreview]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const timerDisplay = (
    <span className="font-mono font-bold text-lg">
      {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
    </span>
  );

  if (style === "banner") {
    return (
      <div data-testid="block-countdown" className="w-full bg-red-600 text-white py-3 px-4 text-center">
        <span className="text-sm font-medium mr-2">{label}</span>
        {timerDisplay}
      </div>
    );
  }

  if (style === "floating") {
    return (
      <div data-testid="block-countdown" className="fixed bottom-4 right-4 bg-red-600 text-white py-2 px-4 rounded-full shadow-lg z-40">
        <span className="text-xs mr-2">{label}</span>
        {timerDisplay}
      </div>
    );
  }

  return (
    <div data-testid="block-countdown" className="text-center py-3 px-4">
      <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg">
        <span className="text-sm font-medium">{label}</span>
        {timerDisplay}
      </div>
    </div>
  );
}
