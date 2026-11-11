import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import { Navbar } from "@/components/navbar";
import { BlogContent } from "@/components/blog-content";
import { site, absoluteUrl, jsonLd } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};

  const url = `/blog/${blog.slug}`;
  return {
    title: blog.title,
    description: blog.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: blog.title,
      description: blog.description,
      publishedTime: blog.date,
      authors: [site.url],
      images: [{ url: blog.thumbnail, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.thumbnail],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const url = absoluteUrl(`/blog/${blog.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: blog.title,
        alternativeHeadline: blog.subtitle,
        description: blog.description,
        image: absoluteUrl(blog.thumbnail),
        datePublished: blog.date,
        dateModified: blog.date,
        url,
        mainEntityOfPage: url,
        inLanguage: "en",
        timeRequired: blog.readTime,
        author: { "@id": `${site.url}/#person`, name: site.name, url: site.url },
        publisher: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Blogs", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: blog.title, item: url },
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
      <BlogContent blog={blog} />
    </>
  );
}
