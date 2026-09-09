"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { learnings } from "@/data/learnings";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

import { GooeyInput } from "@/components/ui/gooey-input";

export default function LearningsListPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLearnings = [...learnings]
    .filter((item) => {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        Boolean(item.tags?.some((tag) => tag.toLowerCase().includes(q)))
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-10">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Quick Learnings
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Raw technical takes, architectural comparisons, and fast notes.
              </p>
            </div>

            {/* Gooey Search Input */}
            <div className="shrink-0">
              <GooeyInput
                placeholder="Search notes..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                collapsedWidth={115}
                expandedWidth={220}
                expandedOffset={48}
                gooeyBlur={3}
              />
            </div>
          </motion.div>

          <div className="space-y-3">
            {filteredLearnings.map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: "easeOut",
                }}
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
                    <h2 className="text-[15px] font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-foreground/90">
                      {item.title}
                    </h2>
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

            {filteredLearnings.length === 0 && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No quick learnings found matching “{searchQuery}”.
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="mx-auto w-full max-w-3xl px-6 pb-20">
        <Footer />
      </div>

      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />
    </>
  );
}
