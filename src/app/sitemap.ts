import type { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";
import { learnings } from "@/data/learnings";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = (dates: string[]) =>
    new Date(Math.max(...dates.map((d) => new Date(d).getTime())));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/blog`, lastModified: latest(blogs.map((b) => b.date)), changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/learnings`, lastModified: latest(learnings.map((l) => l.date)), changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/books`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${site.url}/blog/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${site.url}${b.thumbnail}`],
  }));

  const learningRoutes: MetadataRoute.Sitemap = learnings.map((l) => ({
    url: `${site.url}/learnings/${l.slug}`,
    lastModified: new Date(l.date),
    changeFrequency: "monthly",
    priority: 0.6,
    ...(l.thumbnail ? { images: [`${site.url}${l.thumbnail}`] } : {}),
  }));

  return [...staticRoutes, ...blogRoutes, ...learningRoutes];
}
