"use client";

import { useCallback, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Undo2 } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Share01Icon, Tick01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import type { Blog } from "@/data/blogs";
import { CodeBlock } from "@/components/ui/code-block";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import confetti from "canvas-confetti";
import { Footer } from "@/components/footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseInlineContent(text: string) {
  const regex = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\_[^_]+\_)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // Markdown link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkUrl = linkMatch[2];
      return (
        <a
          key={index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted decoration-blue-500 underline-offset-4 text-foreground hover:text-blue-500 dark:hover:text-blue-400 font-medium transition-colors duration-200"
        >
          {linkText}
        </a>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded-[4px] bg-[#222222]/90 border border-neutral-700/50 px-2 py-0.5 text-[13px] font-mono text-neutral-200 dark:text-neutral-100 shadow-sm"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold text: **bold**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic text: *italic* or _italic_
    if (
      (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) ||
      (part.startsWith("_") && part.endsWith("_"))
    ) {
      return <em key={index} className="italic">{part.slice(1, -1)}</em>;
    }

    return <span key={index}>{part}</span>;
  });
}

export function BlogContent({ blog }: { blog: Blog }) {
  const [copied, setCopied] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

  const copyLink = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    
    // Confetti!
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    confetti({
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
      particleCount: 50,
      spread: 60,
    });
    
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Extract h2 sections for ScrollProgress
  const sections = useMemo(() => {
    return blog.content
      .split("\n\n")
      .filter((block) => block.startsWith("## ") || block.startsWith("### "))
      .map((block) => {
        const label = block.replace(/^#+\s/, "");
        return { id: slugify(label), label };
      });
  }, [blog.content]);

  const renderContent = (content: string) => {
    const blocks = content.split("\n\n");
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      // Empty lines, <br/>, or &nbsp;: render a vertical spacer
      if (!block.trim() || block.trim() === "<br>" || block.trim() === "<br />" || block.trim() === "&nbsp;") {
        elements.push(<div key={i} className="h-6" />);
        continue;
      }

      // Code blocks: ```language ... ```
      if (block.startsWith("```")) {
        const langMatch = block.match(/^```(\w+)?/);
        const lang = langMatch?.[1] || "text";
        let codeContent = block.replace(/^```\w*\n?/, "");
        if (codeContent.endsWith("```")) {
          codeContent = codeContent.slice(0, -3).trimEnd();
        } else {
          while (i + 1 < blocks.length && !blocks[i + 1].endsWith("```")) {
            i++;
            codeContent += "\n\n" + blocks[i];
          }
          if (i + 1 < blocks.length) {
            i++;
            codeContent += "\n\n" + blocks[i].replace(/```$/, "").trimEnd();
          }
        }
        elements.push(
          <div key={i} className="my-6">
            <CodeBlock
              code={codeContent}
              language={lang}
              accent="#39d353"
              showFrame={false}
              showHeader={false}
              showLineNumbers
              showCopyButton
            />
          </div>
        );
        continue;
      }

      // Headings — add id for scroll-progress linking
      if (block.startsWith("## ")) {
        const rawText = block.replace(/^##\s+/, "").trim();
        const text = rawText.replace(/^\*\*(.*?)\*\*$/, "$1").replace(/\*\*/g, "");
        elements.push(
          <h2
            key={i}
            id={slugify(text)}
            className="mt-12 mb-8 text-xl sm:text-[22px] font-semibold tracking-tight text-foreground scroll-mt-20"
          >
            {text}
          </h2>
        );
        continue;
      }
      if (block.startsWith("### ")) {
        const rawText = block.replace(/^###\s+/, "").trim();
        const text = rawText.replace(/^\*\*(.*?)\*\*$/, "$1").replace(/\*\*/g, "");
        elements.push(
          <h3
            key={i}
            id={slugify(text)}
            className="mt-10 mb-6 text-lg sm:text-xl font-semibold tracking-tight text-foreground scroll-mt-20"
          >
            {text}
          </h3>
        );
        continue;
      }

      // Lists
      if (block.startsWith("1. ") || block.startsWith("- ") || block.startsWith("* ")) {
        const items = block.split("\n");
        const isOrdered = block.startsWith("1. ");

        if (isOrdered) {
          elements.push(
            <ol key={i} className="my-6 space-y-4.5 pl-6 list-decimal text-foreground/80">
              {items.map((item, j) => {
                const text = item.replace(/^\d+\.\s+|^[-\*]\s+/, "");
                return (
                  <li key={j} className="text-[15px] leading-relaxed">
                    {parseInlineContent(text)}
                  </li>
                );
              })}
            </ol>
          );
        } else {
          elements.push(
            <ul key={i} className="my-6 space-y-4.5 text-foreground/80">
              {items.map((item, j) => {
                const text = item.replace(/^\d+\.\s+|^[-\*]\s+/, "");
                return (
                  <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed">
                    <span className="mt-[5px] shrink-0 select-none text-foreground/90">
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1.5"
                          y="1.5"
                          width="13"
                          height="13"
                          rx="4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <circle cx="8" cy="8" r="1.8" fill="currentColor" />
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0">{parseInlineContent(text)}</div>
                  </li>
                );
              })}
            </ul>
          );
        }
        continue;
      }

      // Horizontal rules: * * *, * *, or ---
      if (/^(\*\s*){2,}\*?$/.test(block.trim()) || block.trim() === "---") {
        elements.push(<hr key={i} className="my-10 border-t border-border/30" />);
        continue;
      }

      // Markdown Images: ![alt](url)
      const imgMatch = block.trim().match(/^!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const src = imgMatch[2].split(" ")[0];
        elements.push(
          <figure
            key={i}
            className="my-12 overflow-hidden rounded-xl border border-border/40 bg-muted/10 p-1.5 shadow-sm cursor-zoom-in group transition-all hover:border-border/80"
            onClick={() => setZoomedImage({ src, alt: alt || "Blog diagram" })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt || "Blog diagram"}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
            />
            {alt && (
              <figcaption className="mt-2.5 text-center text-xs text-muted-foreground pb-1 font-sans">{alt}</figcaption>
            )}
          </figure>
        );
        continue;
      }

      // Tables: | header | header |
      if (block.trim().startsWith("|")) {
        const rows = block.trim().split("\n").filter((r) => r.trim().startsWith("|"));
        if (rows.length >= 2) {
          const parseRow = (row: string) =>
            row
              .split("|")
              .slice(1, -1)
              .map((cell) => cell.trim());
          const headers = parseRow(rows[0]);
          const bodyRows = rows.slice(2).map(parseRow);
          elements.push(
            <div key={i} className="my-6 overflow-x-auto rounded-lg border border-border/40">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border/40">
                    {headers.map((h, idx) => (
                      <th key={idx} className="px-4 py-2.5 font-semibold text-foreground border-r last:border-r-0 border-border/40">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((r, rIdx) => (
                    <tr key={rIdx} className="border-b last:border-b-0 border-border/40 hover:bg-muted/20">
                      {r.map((c, cIdx) => (
                        <td key={cIdx} className="px-4 py-2.5 text-foreground/80 border-r last:border-r-0 border-border/40">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // Blockquotes: > text
      if (block.trim().startsWith(">")) {
        const raw = block.trim().replace(/^>\s*/, "");
        let text = raw;
        let author = "";

        if (raw.includes(" - ")) {
          const parts = raw.split(" - ");
          text = parts[0].trim();
          author = parts.slice(1).join(" - ").trim();
        } else if (raw.includes(" -- ")) {
          const parts = raw.split(" -- ");
          text = parts[0].trim();
          author = parts.slice(1).join(" -- ").trim();
        }

        // Clean quotes wrapping
        let cleanText = text.replace(/^[“"]|[”"]$/g, "").trim();

        const renderQuoteSegments = (str: string) => {
          return str.split(/(\*[^*]+\*|\_[^_]+\_|\*\*[^*]+\*\*)/).map((seg, idx) => {
            if (
              (seg.startsWith("*") && seg.endsWith("*") && !seg.startsWith("**")) ||
              (seg.startsWith("_") && seg.endsWith("_"))
            ) {
              return <em key={idx} className="italic">{seg.slice(1, -1)}</em>;
            }
            if (seg.startsWith("**") && seg.endsWith("**")) {
              return <strong key={idx} className="font-semibold">{seg.slice(2, -2)}</strong>;
            }
            return <span key={idx}>{seg}</span>;
          });
        };

        elements.push(
          <blockquote key={i} className="my-12 space-y-4 px-2 sm:px-4">
            <div className="relative py-1">
              <span className="text-5xl sm:text-6xl text-foreground/40 font-[family-name:var(--font-instrument)] select-none leading-none inline-block align-top -mt-2 mr-1">
                “
              </span>
              <span className="text-2xl sm:text-3xl font-[family-name:var(--font-instrument)] leading-relaxed tracking-wide text-foreground/90 font-normal">
                {renderQuoteSegments(cleanText)}
              </span>
              <span className="text-5xl sm:text-6xl text-foreground/40 font-[family-name:var(--font-instrument)] select-none leading-none inline-block align-sub ml-1">
                ”
              </span>
            </div>
            {author && (
              <div className="flex items-center justify-end gap-3 pt-2">
                <div className="h-[1px] w-24 sm:w-48 bg-border/40" />
                <span className="text-xs sm:text-sm font-sans font-medium text-muted-foreground/80">
                  {author}
                </span>
              </div>
            )}
          </blockquote>
        );
        continue;
      }

      // Regular paragraphs — handle inline `code`, **bold**, and [links](url)
      elements.push(
        <p key={i} className="my-4 text-foreground/80 leading-[1.8]">
          {parseInlineContent(block)}
        </p>
      );
    }

    return elements;
  };

  return (
    <>
      {/* ScrollProgress with sections — z-[200] so it stays above progressive blur (z-30) */}
      <ScrollProgress className="z-200" sections={sections} />

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-14 sm:pt-16">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Back button — Undo2 icon */}
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground/70 mb-4"
            >
              <Undo2 size={16} />
              Back
            </Link>
          </div>

          {/* Thumbnail */}
          <div
            className="overflow-hidden rounded-xl cursor-zoom-in transition-all hover:opacity-95"
            onClick={() => setZoomedImage({ src: blog.thumbnail, alt: blog.title })}
          >
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              width={768}
              height={432}
              className="w-full object-cover"
              priority
            />
          </div>

          {/* Title + meta */}
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {blog.title}
            </h1>
            <p className="text-base text-muted-foreground">{blog.subtitle}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground/70">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {blog.readTime}
              </span>
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
              >
                {copied ? (
                  <>
                    <HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={Share01Icon} size={14} />
                    Share
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-dashed border-border/15" />

          {/* Blog content */}
          <article className="max-w-none text-[15px] leading-relaxed ">
            {renderContent(blog.content)}
          </article>
        </motion.div>
      </main>

      <div className="mx-auto w-full max-w-3xl px-6 pb-20">
        <Footer />
      </div>

      {/* Progressive blur at bottom — z-30 */}
      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />

      {/* Image Zoom Modal — z-[150] so backdrop blurs everything except ScrollProgress (z-200) */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-150 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
          >
            {/* Top-right close button */}
            <button
              type="button"
              onClick={() => setZoomedImage(null)}
              className="absolute top-6 right-6 z-160 flex items-center justify-center rounded-full bg-muted/80 p-2.5 text-foreground/80 hover:bg-muted hover:text-foreground transition-all duration-200 shadow-md border border-border/50"
              aria-label="Close zoomed image"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-border/60 bg-card p-2 shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={zoomedImage.src}
                alt={zoomedImage.alt}
                className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
