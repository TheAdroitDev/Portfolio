"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { ImagesBadge } from "@/components/ui/images-badge";
import { INSTANTS, Instant } from "@/data/instants";

function formatInstantDate(instant: Instant) {
  if (instant.createdAt) {
    try {
      return format(new Date(instant.createdAt), "EEE, d MMM · h:mm a");
    } catch {
      return instant.date || "";
    }
  }
  return instant.date || "";
}

export function Instants() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Filter instants created within the last 24 hours
  const activeInstants = useMemo(() => {
    const twentyFourHoursMs = 24 * 60 * 60 * 1000;
    const now = Date.now();
    return INSTANTS.filter((item) => {
      if (!item.createdAt) return true;
      const createdAtMs = new Date(item.createdAt).getTime();
      return now - createdAtMs < twentyFourHoursMs;
    });
  }, []);

  const activeInstant: Instant | null =
    selectedIndex !== null && activeInstants[selectedIndex]
      ? activeInstants[selectedIndex]
      : null;

  const handleNext = useCallback(() => {
    if (selectedIndex !== null && activeInstants.length > 0) {
      setSelectedIndex((selectedIndex + 1) % activeInstants.length);
    }
  }, [selectedIndex, activeInstants.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null && activeInstants.length > 0) {
      setSelectedIndex(
        (selectedIndex - 1 + activeInstants.length) % activeInstants.length
      );
    }
  }, [selectedIndex, activeInstants.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  if (activeInstants.length === 0) return null;

  return (
    <>
      {/* Hero Section Position with Annotation Outside Main Layout */}
      <div className="relative shrink-0 select-none mt-3.5 translate-y-1">
        {/* ImagesBadge in Hero */}
        <ImagesBadge
          text=""
          images={activeInstants.map((item) => item.image)}
          folderSize={{ width: 36, height: 28 }}
          teaserImageSize={{ width: 24, height: 17 }}
          hoverImageSize={{ width: 84, height: 60 }}
          hoverTranslateY={-65}
          hoverSpread={28}
          onImageClick={(idx) => setSelectedIndex(idx)}
          onBadgeClick={() => setSelectedIndex(0)}
        />

        {/* Handwritten Annotation + Arrow OUTSIDE main layout (floats in the right margin/gutter) */}
        <div className="hidden lg:flex flex-col items-start absolute left-full top-1/2 -translate-y-1/2 ml-2.5 whitespace-nowrap shrink-0 pointer-events-none select-none">
          {/* Fine-line Arrow sitting above text pointing directly at the badge */}
          <svg
            className="w-8 h-8 text-zinc-400/80 dark:text-zinc-400/80 shrink-0 -mb-1.5 -ml-3"
            viewBox="0 0 44 44"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Smooth fine arc from bottom-right near text curving UP and LEFT down to folder */}
            <path d="M 38 36 C 36 14, 22 8, 6 14" />
            {/* Fine arrowhead pointing directly at glass badge */}
            <path d="M 14 8 L 6 14 L 14 20" />
          </svg>

          {/* Thin handwritten text */}
          <span className="font-(family-name:--font-caveat) text-lg sm:text-xl font-normal italic text-zinc-500/90 dark:text-zinc-400/90 whitespace-nowrap rotate-[-2deg] tracking-wide">
            what I&apos;m up to
          </span>
        </div>
      </div>

      {/* Full screen modal */}
      <AnimatePresence>
        {activeInstant && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-150 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top Right Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-160 flex items-center justify-center rounded-full bg-muted/80 p-2.5 text-foreground/80 hover:bg-muted hover:text-foreground transition-all duration-200 shadow-md border border-border/50 cursor-pointer"
              aria-label="Close instant view"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-w-3xl max-h-[85vh] w-full overflow-hidden rounded-2xl border border-border/60 bg-card p-3 sm:p-4 shadow-2xl cursor-default flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev / Next navigation arrows if multiple */}
              {activeInstants.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm text-foreground/80 hover:bg-background hover:text-foreground transition-colors border border-border/40 shadow-sm cursor-pointer"
                    aria-label="Previous instant"
                  >
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm text-foreground/80 hover:bg-background hover:text-foreground transition-colors border border-border/40 shadow-sm cursor-pointer"
                    aria-label="Next instant"
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                  </button>
                </>
              )}

              {/* Instant Image */}
              <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-muted/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeInstant.image}
                  alt={activeInstant.title}
                  className="max-h-[65vh] w-auto max-w-full rounded-xl object-contain shadow-sm"
                />
              </div>

              {/* Caption and Metadata */}
              <div className="mt-3.5 px-2 text-center max-w-xl">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {activeInstant.title}
                  </h3>
                  {formatInstantDate(activeInstant) && (
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/50">
                      {formatInstantDate(activeInstant)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {activeInstant.caption}
                </p>
              </div>

              {/* Pagination Dots */}
              {activeInstants.length > 1 && (
                <div className="mt-4 flex items-center gap-1.5">
                  {activeInstants.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === selectedIndex
                          ? "w-6 bg-foreground"
                          : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                      }`}
                      aria-label={`Go to instant ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
