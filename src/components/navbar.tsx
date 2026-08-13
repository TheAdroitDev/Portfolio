"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useCallback } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navLinks = [
  { label: "3000", href: "/" },
  { label: "Brainchildren", href: "/#projects" },
  { label: "Learnings", href: "/learnings" },
  { label: "Blogs", href: "/blog" },
];

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key === "d" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        toggleTheme();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleTheme]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[768px] items-center justify-between px-6">
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          {mounted && (
            <TooltipProvider delay={300}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <div className="cursor-pointer" />
                  }
                >
                  <AnimatedThemeToggler
                    theme={resolvedTheme === "dark" ? "dark" : "light"}
                    onThemeChange={setTheme}
                    className="text-muted-foreground transition-colors duration-200 hover:text-foreground/70"
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs" sideOffset={6}>
                  Toggle Theme (D)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </nav>
  );
}
