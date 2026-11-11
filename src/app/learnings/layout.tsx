import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Learnings", template: "%s | Shivam Verma" },
  description:
    "Short, opinionated learnings by Shivam Verma on architecture, ORMs, distribution, getting users and building products.",
  alternates: { canonical: "/learnings" },
  openGraph: { url: "/learnings", title: "Learnings | Shivam Verma", description: "Short, opinionated learnings by Shivam Verma on architecture, ORMs, distribution, getting users and building products." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
