"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BookProps {
  title?: string;
  author?: string;
  image?: string;
  color?: string; // Top banner color for default style (e.g. #f5a623)
  width?: number; // width in px
  height?: number; // height in px
  className?: string;
  onClick?: () => void;
}

export function Book({
  title = "The user experience of the Frontend Cloud",
  author,
  image,
  color = "#f5a623",
  width = 180,
  height = 260,
  className,
  onClick,
}: BookProps) {
  // Page block depth in pixels
  const depth = 16;

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative select-none cursor-pointer py-4 px-2 [perspective:1000px]",
        className
      )}
      style={{
        width: width + 28,
        height: height + 24,
      }}
    >
      {/* Dynamic Floor Shadow */}
      <div className="absolute -bottom-2 left-2 right-2 h-4 rounded-full bg-black/30 dark:bg-black/60 blur-md transition-all duration-500 ease-out group-hover:scale-x-105 group-hover:bg-black/55 group-hover:blur-lg group-hover:translate-y-1 group-hover:-translate-x-1" />

      {/* 3D Book Container — Pinned to the left binding so the spine does NOT move */}
      <div
        className="relative mx-auto [transform-style:preserve-3d] [transform-origin:left_center] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:[transform:rotateY(-24deg)_rotateX(1deg)]"
        style={{
          width,
          height,
        }}
      >
        {/* 1. Back Cover (Behind the pages) */}
        <div
          className="absolute inset-0 rounded-r-[4px] rounded-l-[2px] bg-[#121214] shadow-2xl border-r border-y border-neutral-800/80"
          style={{
            transform: `translateZ(-${depth}px)`,
          }}
        />

        {/* 2. Solid White Pages Block (Full white 3D page block) */}
        {/* White Inner Core to guarantee 100% full white from all angles */}
        <div
          className="absolute top-[2px] bottom-[2px] left-[6px] right-0 bg-white"
          style={{
            transform: `translateZ(-${depth / 2}px)`,
          }}
        />

        {/* Right Face: Stack of 100% solid white paper pages visible on hover */}
        <div
          className="absolute top-[2px] bottom-[2px] right-0 rounded-r-[1px] [transform-origin:right_center] border-l border-neutral-200"
          style={{
            width: depth,
            transform: `rotateY(-90deg)`,
            background:
              "repeating-linear-gradient(to bottom, #ffffff 0px, #ffffff 2px, #f2f2f2 2px, #f2f2f2 3px)",
          }}
        />

        {/* Top Face: Full white top trim of the pages */}
        <div
          className="absolute top-0 right-0 left-[8px] [transform-origin:top_center]"
          style={{
            height: depth,
            transform: `rotateX(90deg)`,
            background:
              "linear-gradient(to right, #e8e8e8 0%, #f7f7f7 15%, #ffffff 85%, #e8e8e8 100%)",
          }}
        />

        {/* Bottom Face: Bottom trim of the pages */}
        <div
          className="absolute bottom-0 right-0 left-[8px] [transform-origin:bottom_center]"
          style={{
            height: depth,
            transform: `rotateX(-90deg)`,
            background:
              "linear-gradient(to right, #e0e0e0 0%, #f0f0f0 15%, #fbfbfb 85%, #e0e0e0 100%)",
          }}
        />

        {/* 3. Front Cover (The outside cover — sits on top, angled in 3D on hover) */}
        <div
          className="relative w-full h-full rounded-r-[4px] rounded-l-[2px] overflow-hidden shadow-md"
          style={{
            transform: `translateZ(0px)`,
          }}
        >
          {/* Custom Cover Image OR Default Vercel Geist Style */}
          {image ? (
            <div className="relative w-full h-full bg-neutral-900">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 200px, 240px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="flex flex-col w-full h-full bg-[#141416]">
              {/* Upper Colored Banner */}
              <div
                className="w-full h-[46%] transition-colors duration-300"
                style={{ backgroundColor: color }}
              />

              {/* Lower Section with Title and Vercel Logo */}
              <div className="flex flex-col justify-between flex-1 p-4 bg-[#161618] border-t border-black/20">
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-[14px] sm:text-[15px] leading-snug tracking-tight line-clamp-4">
                    {title}
                  </h3>
                  {author && (
                    <p className="text-neutral-400 text-xs font-medium tracking-wide">
                      {author}
                    </p>
                  )}
                </div>

                {/* Vercel Triangle Logo */}
                <div className="pt-2">
                  <svg
                    viewBox="0 0 75 65"
                    className="w-4 h-4 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M37.5 0L75 65H0L37.5 0Z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Spine Crease & Curve Overlay (Soft & Light) */}
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.06) 0%, rgba(255,255,255,0.14) 3%, rgba(255,255,255,0.03) 6%, rgba(0,0,0,0.15) 8.5%, rgba(0,0,0,0.22) 9.5%, rgba(255,255,255,0.1) 10.5%, transparent 14%)",
            }}
          />

          {/* Subtle Sheen / Gloss across the cover */}
          <div
            className="pointer-events-none absolute inset-0 z-20 opacity-20 mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.1) 50%, transparent 55%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
