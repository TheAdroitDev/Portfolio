import { Bug } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-dashed border-border/40 py-8">
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
