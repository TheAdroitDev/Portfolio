"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { learnings } from "@/data/learnings";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

export function Learnings() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="learnings" className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Quick Learnings
            </h2>
          </div>
          <p className="mt-1 text-md text-muted-foreground">
            Raw technical takes, quick takeaways, and fast notes.
          </p>
        </div>
      </motion.div>

      <div className="space-y-3">
        {learnings.slice(0, 3).map((item, i) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            className="relative"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link
              href={`/learnings/${item.slug}`}
              className={`group flex flex-col gap-2 rounded-xl p-5 transition-all duration-300 ${
                hoveredIndex !== null && hoveredIndex !== i
                  ? "opacity-35 blur-[2.5px]"
                  : "hover:bg-muted/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-foreground/90">
                    {item.title}
                  </h3>
                  {i === 0 && (
                    <div className="flex items-center justify-center rounded-full border border-border/50 bg-muted/30 px-2 py-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <AnimatedShinyText className="inline-flex items-center justify-center text-[10px] uppercase font-bold tracking-wider transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                        🔥 Hot
                      </AnimatedShinyText>
                    </div>
                  )}
                </div>
                <ArrowUpRight
                  size={16}
                  className="mt-0.5 shrink-0 text-muted-foreground opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.summary}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/70">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </Link>

            {/* Floating thumbnail on hover */}
            <AnimatePresence>
              {hoveredIndex === i && item.thumbnail && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="pointer-events-none absolute bottom-3 right-4 z-20 overflow-hidden rounded-lg border border-border shadow-lg"
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={200}
                    height={112}
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {learnings.length > 3 && (
        <div className="pt-1 text-right">
          <Link
            href="/learnings"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all Quick Learnings →
          </Link>
        </div>
      )}
    </section>
  );
}
