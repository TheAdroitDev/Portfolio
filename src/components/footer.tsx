import Link from "next/link";
import { Bug } from "lucide-react";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blog" },
  { label: "Learnings", href: "/learnings" },
  { label: "Books", href: "/books" },
  { label: "Projects", href: "/#projects" },
];

export function Footer() {
  return (
    <footer className="border-t border-dashed border-border/40 pt-10 pb-8">
      {/* Navigate Section */}
      <div className="mb-8 space-y-3 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Navigate
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors duration-200 hover:text-foreground font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="w-12 h-px bg-border/40 mx-auto mb-6" />

      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-xs text-muted-foreground/85">
          Built by{" "}
          <a
            href="https://github.com/theadroitdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium transition-colors duration-200 hover:text-foreground/80"
          >
            Shivam Verma
          </a>
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
          <p>© {new Date().getFullYear()} · All rights reserved.</p>
          <span>·</span>
          <a
            href="https://x.com/theadroitdev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors duration-200"
          >
            <Bug size={12} />
            Report a bug
          </a>
        </div>
        <p className="text-xs text-muted-foreground/80">
          Source code is available at{" "}
          <a
            className="text-foreground font-medium link-underline"
            href="https://github.com/TheAdroitDev/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
