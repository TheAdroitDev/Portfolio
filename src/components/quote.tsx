import React from "react";

export function Quote({ className = "" }: { className?: string }) {
  return (
    <div className={`text-center select-none ${className}`}>
      <blockquote className="space-y-2">
        <p className="text-2xl sm:text-3xl font-[family-name:var(--font-cormorant)]  leading-relaxed tracking-wide text-foreground/90">
          Arise, awake, and stop not till the goal is reached.
        </p>
        <cite className="block text-[11px] tracking-widest text-muted-foreground/60 not-italic font-medium">
          Swami Vivekananda
        </cite>
      </blockquote>
    </div>
  );
}
