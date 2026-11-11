import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Every book Shivam Verma has read, from the Bhagavad Gita to Atomic Habits, Deep Work and Zero to One.",
  alternates: { canonical: "/books" },
  openGraph: { url: "/books", images: [{ url: "/home.png", width: 1630, height: 730 }], title: "Books | Shivam Verma", description: "Every book Shivam Verma has read, from the Bhagavad Gita to Atomic Habits, Deep Work and Zero to One." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
