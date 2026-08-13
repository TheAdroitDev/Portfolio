"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ImagesBadgeProps {
  text: string;
  images: string[];
  className?: string;
  /** Optional link URL */
  href?: string;
  /** Link target attribute (e.g., "_blank" for new tab) */
  target?: string;
  /** Folder dimensions { width, height } in pixels */
  folderSize?: { width: number; height: number };
  /** Image dimensions when teased (peeking) { width, height } in pixels */
  teaserImageSize?: { width: number; height: number };
  /** Image dimensions when hovered { width, height } in pixels */
  hoverImageSize?: { width: number; height: number };
  /** How far images translate up on hover in pixels */
  hoverTranslateY?: number;
  /** How far images spread horizontally on hover in pixels */
  hoverSpread?: number;
  /** Rotation angle for fanned images on hover in degrees */
  hoverRotation?: number;
  /** Callback when an image is clicked */
  onImageClick?: (index: number) => void;
  /** Callback when the badge itself is clicked */
  onBadgeClick?: () => void;
}

export function ImagesBadge({
  text,
  images,
  className,
  href,
  target,
  folderSize = { width: 32, height: 24 },
  teaserImageSize = { width: 20, height: 14 },
  hoverImageSize = { width: 48, height: 32 },
  hoverTranslateY = -35,
  hoverSpread = 20,
  hoverRotation = 15,
  onImageClick,
  onBadgeClick,
}: ImagesBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Limit to max 3 images
  const displayImages = images.slice(0, 3);

  // Calculate folder tab dimensions proportionally
  const tabWidth = folderSize.width * 0.375;
  const tabHeight = folderSize.height * 0.25;

  const Component = href ? "a" : "div";

  return (
    <Component
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 perspective-[1000px] transform-3d",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        if (!href && onBadgeClick) {
          e.preventDefault();
          onBadgeClick();
        }
      }}
    >
      {/* Folder Container */}
      <motion.div
        className="relative"
        style={{
          width: folderSize.width,
          height: folderSize.height,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glass Card Stack Back */}
        <div className="absolute inset-0 rounded-lg bg-muted/60 dark:bg-neutral-800/60 border border-border/50 shadow-sm backdrop-blur-sm" />

        {/* Images that pop out */}
        {displayImages.map((image, index) => {
          const totalImages = displayImages.length;

          // Calculate rotation based on index
          const baseRotation =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * hoverRotation
                : (index - 1) * hoverRotation;

          // Hover positions - fan out
          const hoverY = hoverTranslateY - (totalImages - 1 - index) * 3;
          const hoverX =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * hoverSpread
                : (index - 1) * hoverSpread;

          // Teaser positions - slight peek from glass sleeve
          const teaseY = -4 - (totalImages - 1 - index) * 2;
          const teaseRotation =
            totalImages === 1
              ? 0
              : totalImages === 2
                ? (index - 0.5) * 4
                : (index - 1) * 4;

          return (
            <motion.div
              key={index}
              onClick={(e) => {
                if (onImageClick) {
                  e.stopPropagation();
                  onImageClick(index);
                }
              }}
              className="absolute top-0.5 left-1/2 origin-bottom overflow-hidden rounded-md bg-card border border-border/60 shadow-md ring-1 ring-black/5 dark:ring-white/10 cursor-pointer"
              animate={{
                x: `calc(-50% + ${isHovered ? hoverX : 0}px)`,
                y: isHovered ? hoverY : teaseY,
                rotate: isHovered ? baseRotation : teaseRotation,
                width: isHovered ? hoverImageSize.width : teaserImageSize.width,
                height: isHovered
                  ? hoverImageSize.height
                  : teaserImageSize.height,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: index * 0.03,
              }}
              style={{
                zIndex: 10 + index,
              }}
            >
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          );
        })}

        {/* Front Frosted Glass Sleeve (tilts open on hover) */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-card/80 dark:bg-neutral-900/80 backdrop-blur-md border border-border/70 shadow-md flex items-center justify-center"
          animate={{
            rotateX: isHovered ? -40 : -10,
            scaleY: isHovered ? 0.85 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          style={{
            transformStyle: "preserve-3d",
            zIndex: 20,
          }}
        >
          {/* Subtle Glass Shine Line */}
          <div className="absolute top-1 right-1 left-1 h-px bg-white/40 dark:bg-white/10" />
        </motion.div>
      </motion.div>

      {/* Text */}
      {text ? (
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          {text}
        </span>
      ) : null}
    </Component>
  );
}
