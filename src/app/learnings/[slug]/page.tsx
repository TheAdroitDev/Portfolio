import { notFound } from "next/navigation";
import { learnings } from "@/data/learnings";
import { Navbar } from "@/components/navbar";
import { LearningContent } from "@/components/learning-content";

export function generateStaticParams() {
  return learnings.map((item) => ({ slug: item.slug }));
}

export default async function LearningDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const learning = learnings.find((item) => item.slug === slug);

  if (!learning) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <LearningContent learning={learning} />
    </>
  );
}
