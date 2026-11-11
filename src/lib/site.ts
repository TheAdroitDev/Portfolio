import { socials } from "@/data/socials";

/* ── Site config: single source of truth for SEO / AEO / GEO ── */

export const site = {
  url: "https://theadroitdev.com",
  name: "Shivam Verma",
  handle: "theadroitdev",
  title: "Shivam Verma | Software Engineer for Web & Mobile",
  description:
    "Shivam Verma (@theadroitdev) is a full-stack software engineer and freelancer building fast, well-crafted products for web and mobile with Next.js, React, React Native, Node.js and PostgreSQL. Projects, blogs and learnings.",
  jobTitle: "Software Engineer",
  locale: "en_US",
  ogImage: "/home.png",
  avatar: "/pfp.png",
  email: "theadroitdev@gmail.com",
  calLink: "https://cal.com/theadroitdev",
  keywords: [
    "Shivam Verma",
    "theadroitdev",
    "Software Engineer",
    "Full Stack Developer",
    "Freelance Developer India",
    "Next.js Developer",
    "React Developer",
    "React Native Developer",
    "Product Engineer",
    "Web Developer Portfolio",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "React Native",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "System Design",
    "Web Performance",
    "UI Engineering",
  ],
  sameAs: socials.filter((s) => s.url.startsWith("http")).map((s) => s.url),
};

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Safe JSON-LD serializer (escapes `<` to prevent script injection). */
export const jsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export const personSchema = {
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  alternateName: site.handle,
  url: site.url,
  image: absoluteUrl(site.avatar),
  jobTitle: site.jobTitle,
  email: `mailto:${site.email}`,
  knowsAbout: site.knowsAbout,
  sameAs: [...site.sameAs, site.calLink],
};
