"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogs } from "@/data/blogs";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function BlogListPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-10">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Blogs
            </h1>
            <p className="mt-2 text-md text-muted-foreground">
              Writing about code, architecture, and lessons learned along the
              way.
            </p>
          </motion.div>

          <div className="space-y-3">
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.slug}
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
                  href={`/blog/${blog.slug}`}
                  className={`group flex flex-col gap-2 rounded-xl p-5 transition-all duration-300 ${
                    hoveredIndex !== null && hoveredIndex !== i
                      ? "opacity-35 blur-[2.5px]"
                      : "hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-[15px] font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-foreground/80">
                      {blog.title}
                    </h2>
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

                {/* Floating thumbnail — between middle and slightly above bottom */}
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
        </div>
      </main>
      <div className="mx-auto w-full max-w-[768px] px-6 pb-20">
        <Footer />
      </div>

      {/* Progressive blur at bottom */}
      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />
    </>
  );
}
