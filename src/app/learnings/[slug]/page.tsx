import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { learnings } from "@/data/learnings";
import { Navbar } from "@/components/navbar";
import { LearningContent } from "@/components/learning-content";
import { site, absoluteUrl, jsonLd } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return learnings.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const learning = learnings.find((item) => item.slug === slug);
  if (!learning) return {};

  const url = `/learnings/${learning.slug}`;
  const image = learning.thumbnail ?? site.ogImage;
  return {
    title: learning.title,
    description: learning.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: learning.title,
      description: learning.summary,
      publishedTime: learning.date,
      authors: [site.url],
      tags: learning.tags,
      images: [{ url: image, alt: learning.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: learning.title,
      description: learning.summary,
      images: [image],
    },
  };
}

export default async function LearningDetailPage({ params }: Props) {
  const { slug } = await params;
  const learning = learnings.find((item) => item.slug === slug);

  if (!learning) {
    notFound();
  }

  const url = absoluteUrl(`/learnings/${learning.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: learning.title,
        description: learning.summary,
        image: absoluteUrl(learning.thumbnail ?? site.ogImage),
        datePublished: learning.date,
        dateModified: learning.date,
        url,
        mainEntityOfPage: url,
        inLanguage: "en",
        keywords: learning.tags,
        author: { "@id": `${site.url}/#person`, name: site.name, url: site.url },
        publisher: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Learnings", item: absoluteUrl("/learnings") },
          { "@type": "ListItem", position: 3, name: learning.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <Navbar />
      <LearningContent learning={learning} />
    </>
  );
}
