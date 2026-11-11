import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Blogs", template: "%s | Shivam Verma" },
  description:
    "Blogs by Shivam Verma on software engineering, design taste, portfolios, system design and lessons learned shipping real products.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", images: [{ url: "/home.png", width: 1630, height: 730 }], title: "Blogs | Shivam Verma", description: "Blogs by Shivam Verma on software engineering, design taste, portfolios, system design and lessons learned shipping real products." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
