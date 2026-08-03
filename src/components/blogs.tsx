"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { blogs } from "@/data/blogs";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

export function Blogs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="blogs" className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Blogs
        </h2>
        <p className="mt-1 text-md text-muted-foreground">
          Writing about code, architecture, and lessons learned.
        </p>
      </motion.div>

      <div className="space-y-3">
        {blogs.slice(0, 3).map((blog, i) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            className="relative"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link
              href={`/blog/${blog.slug}`}
              className={`group flex flex-col gap-2 rounded-xl p-5 transition-all duration-300 ${
                hoveredIndex !== null && hoveredIndex !== i
                  ? "opacity-35 blur-[2.5px]"
                  : "hover:bg-muted/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-foreground/80">
                    {blog.title}
                  </h3>
                  {i === 0 && (
                    <div className="flex items-center justify-center rounded-full border border-border/50 bg-muted/30 px-2 py-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <AnimatedShinyText className="inline-flex items-center justify-center text-[10px] uppercase font-bold tracking-wider transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                        ✨ Latest
                      </AnimatedShinyText>
                    </div>
                  )}
                </div>
                <ArrowUpRight
                  size={16}
                  className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {blog.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span>·</span>
                <span>{blog.readTime}</span>
              </div>
            </Link>

            {/* Floating thumbnail on hover — positioned between middle and slightly above bottom */}
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="pointer-events-none absolute bottom-3 right-4 z-20 overflow-hidden rounded-lg border border-border shadow-lg"
                >
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
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
    </section>
  );
}
