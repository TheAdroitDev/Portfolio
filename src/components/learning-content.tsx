"use client";

import { useCallback, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Undo2 } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Share01Icon, Tick01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import type { Learning } from "@/data/learnings";
import { CodeBlock } from "@/components/ui/code-block";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import confetti from "canvas-confetti";
import { Footer } from "@/components/footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Scales } from "@/components/ui/scales";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseInlineContent(text: string) {
  const processedText = text.replace(/&nbsp;/g, "\u00A0");
  const regex = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\_[^_]+\_)/g;
  const parts = processedText.split(regex);

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
          className="rounded-lg bg-[#222222]/90 border border-neutral-700/50 px-2 py-0.5 text-[13px] font-mono text-neutral-200 dark:text-neutral-100 shadow-sm"
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

export function LearningContent({ learning }: { learning: Learning }) {
  const [copied, setCopied] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

  const copyLink = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);

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
    return learning.content
      .split("\n\n")
      .filter((block) => block.trim().startsWith("## ") || block.trim().startsWith("### "))
      .map((block) => {
        const line = block.trim().split("\n")[0];
        const label = line.replace(/^#+\s/, "");
        return { id: slugify(label), label };
      });
  }, [learning.content]);

  const renderContent = (content: string, prefixKey = "root") => {
    const codeBlockRegex = /(```[\s\S]*?```)/g;
    const rawParts = content.split(codeBlockRegex);
    const elements: React.ReactNode[] = [];

    rawParts.forEach((part, index) => {
      if (!part.trim()) return;

      // Is code block?
      if (part.startsWith("```")) {
        const match = part.match(/^```(\w+)?\n?([\s\S]*?)```$/);
        const lang = match?.[1] || "text";
        const code = match?.[2]?.trim() || "";

        elements.push(
          <div key={`${prefixKey}-code-${index}`} className="my-6 overflow-hidden">
            <CodeBlock
              code={code}
              language={lang}
              accent="#39d353"
              showFrame={false}
              showHeader={false}
              showLineNumbers
              showCopyButton
            />
          </div>
        );
        return;
      }

      // Non-code markdown blocks: split by double newlines
      const blocks = part.split("\n\n");
      blocks.forEach((block, bIdx) => {
        if (!block.trim() || block.trim() === "<br>" || block.trim() === "<br />" || block.trim() === "&nbsp;") {
          return;
        }

        const currentKey = `${prefixKey}-${index}-${bIdx}`;

        // Headings
        if (block.startsWith("## ") || block.startsWith("### ")) {
          const lines = block.split("\n");
          const headingLine = lines[0];
          const isH2 = headingLine.startsWith("## ");
          const rawText = headingLine.replace(/^#+\s+/, "").trim();
          const text = rawText.replace(/^\*\*(.*?)\*\*$/, "$1").replace(/\*\*/g, "");

          elements.push(
            isH2 ? (
              <h2
                key={currentKey}
                id={slugify(text)}
                className="mt-12 mb-8 text-xl sm:text-[22px] font-semibold tracking-tight text-foreground scroll-mt-20"
              >
                {parseInlineContent(text)}
              </h2>
            ) : (
              <h3
                key={currentKey}
                id={slugify(text)}
                className="mt-10 mb-6 text-lg sm:text-xl font-semibold tracking-tight text-foreground scroll-mt-20"
              >
                {parseInlineContent(text)}
              </h3>
            )
          );

          if (lines.length > 1) {
            const remaining = lines.slice(1).join("\n").trim();
            if (remaining) {
              elements.push(...renderContent(remaining, currentKey));
            }
          }
          return;
        }

        // Blockquotes
        if (block.trim().startsWith("> ")) {
          const quoteText = block.trim().replace(/^>\s+/, "");
          elements.push(
            <blockquote
              key={currentKey}
              className="my-8 border-l-2 border-border pl-5 italic text-[16px] leading-relaxed text-foreground/90 font-(family-name:--font-instrument-serif)"
            >
              {parseInlineContent(quoteText)}
            </blockquote>
          );
          return;
        }

        // Lists
        if (block.startsWith("1. ") || block.startsWith("- ") || block.startsWith("* ")) {
          const items = block.split("\n");
          const isOrdered = block.startsWith("1. ");

          if (isOrdered) {
            elements.push(
              <ol key={currentKey} className="my-6 space-y-4.5 pl-6 list-decimal text-foreground/80">
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
              <ul key={currentKey} className="my-6 space-y-4.5 text-foreground/80">
                {items.map((item, j) => {
                  const text = item.replace(/^\d+\.\s+|^[-\*]\s+/, "");
                  return (
                    <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed">
                      <span className="mt-1.25 shrink-0 select-none text-foreground/90">
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
          return;
        }

        // Horizontal rules
        if (/^(\*\s*){2,}\*?$/.test(block.trim()) || block.trim() === "---") {
          elements.push(<hr key={currentKey} className="my-10 border-dashed border-border/15" />);
          return;
        }

        // Markdown Images: ![alt](url)
        const imgMatch = block.trim().match(/^!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) {
          const alt = imgMatch[1];
          const src = imgMatch[2].split(" ")[0];
          elements.push(
            <figure
              key={currentKey}
              className="my-10 flex flex-col items-center justify-center cursor-zoom-in group select-none"
              onClick={() => setZoomedImage({ src, alt: alt || "Diagram" })}
            >
              {/* Image Card Container with subtle Scales pattern border */}
              <div className="relative w-full rounded-xl bg-card border border-border/40 p-1 shadow-sm transition-colors hover:border-border/70">
                {/* Left Scales Strip */}
                <div className="absolute -inset-y-3 -left-3 w-4 pointer-events-none opacity-50 overflow-hidden rounded-l-lg">
                  <Scales size={8} />
                </div>
                {/* Right Scales Strip */}
                <div className="absolute -inset-y-3 -right-3 w-4 pointer-events-none opacity-50 overflow-hidden rounded-r-lg">
                  <Scales size={8} />
                </div>
                {/* Top Scales Strip */}
                <div className="absolute -inset-x-3 -top-3 h-4 pointer-events-none opacity-50 overflow-hidden rounded-t-lg">
                  <Scales size={8} />
                </div>
                {/* Bottom Scales Strip */}
                <div className="absolute -inset-x-3 -bottom-3 h-4 pointer-events-none opacity-50 overflow-hidden rounded-b-lg">
                  <Scales size={8} />
                </div>

                {/* Image Frame */}
                <div className="relative z-10 overflow-hidden rounded-lg bg-muted/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt || "Diagram"}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>
              </div>

              {/* Separate Caption below card */}
              {alt && (
                <figcaption className="mt-2.5 text-center text-xs text-muted-foreground font-sans">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
          return;
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
              <div key={currentKey} className="my-6 overflow-x-auto rounded-lg border border-border/40">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border/40">
                      {headers.map((h, idx) => (
                        <th key={idx} className="px-4 py-2.5 font-semibold text-foreground border-r last:border-r-0 border-border/40">
                          {parseInlineContent(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyRows.map((r, rIdx) => (
                      <tr key={rIdx} className="border-b last:border-b-0 border-border/40 hover:bg-muted/20">
                        {r.map((c, cIdx) => (
                          <td key={cIdx} className="px-4 py-2.5 text-foreground/80 border-r last:border-r-0 border-border/40">
                            {parseInlineContent(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            return;
          }
        }

        // Standard Paragraph
        elements.push(
          <p key={currentKey} className="my-4 text-foreground/80 leading-[1.8]">
            {parseInlineContent(block.trim())}
          </p>
        );
      });
    });

    return elements;
  };

  return (
    <>
      {sections.length > 0 && <ScrollProgress sections={sections} />}

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Back button */}
          <div>
            <Link
              href="/learnings"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground/70 mb-4"
            >
              <Undo2 size={16} />
              Back
            </Link>
          </div>

          {/* Thumbnail */}
          {learning.thumbnail && (
            <div
              className="overflow-hidden rounded-xl cursor-zoom-in transition-all hover:opacity-95"
              onClick={() => setZoomedImage({ src: learning.thumbnail!, alt: learning.title })}
            >
              <Image
                src={learning.thumbnail}
                alt={learning.title}
                width={768}
                height={432}
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          {/* Title + meta */}
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {learning.title}
            </h1>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground/70">
                {new Date(learning.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
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

          {/* Learning content */}
          <article className="max-w-none text-[15px] leading-relaxed">
            {renderContent(learning.content)}
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

      {/* Image Zoom Modal — z-[150] */}
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
