"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MorphingText } from "@/components/ui/morphing-text";
import { Instants } from "@/components/instants";

const heroTexts = [
  "Software Engineer for Web & Mobile",
  "Full Stack Developer",
  "Polymath",
  "Open Source Contributor",
  "Freelancer",
  "Otaku",
  "Product Engineer",
];

export function Hero() {
  return (
    <motion.section
      id="home"
      className="flex items-center justify-between gap-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-5 min-w-0 flex-1">
        <div className="relative shrink-0">
          <Image
            src="/pfp.png"
            alt="Shivam Verma"
            width={96}
            height={96}
            className="rounded-full object-cover ring-1 ring-border transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-(family-name:--font-schibsted)">
            Shivam Verma
          </h1>
          <div className="h-6 relative overflow-hidden">
            <MorphingText
              texts={heroTexts}
              className="h-6 text-sm text-muted-foreground font-medium text-left mx-0 max-w-none filter-[url(#threshold)_blur(0.3px)] leading-6"
            />
          </div>
        </div>
      </div>
      <Instants />
    </motion.section>
  );
}
