import { blogs } from "@/data/blogs";
import { learnings } from "@/data/learnings";
import { projects, freelanceProjects } from "@/data/projects";
import { books } from "@/data/books";
import { site, absoluteUrl } from "@/lib/site";

/* ── llms.txt builders (https://llmstxt.org) for AI answer engines ── */

const dedent = (text: string) =>
  text
    .split("\n")
    .map((line) => line.replace(/^\t+/, "").replace(/^ {4}(?=\S)/, ""))
    .join("\n")
    .replace(/\\`/g, "`")
    .trim();

function header() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} (@${site.handle}) is a ${site.jobTitle.toLowerCase()} for web and mobile, full-stack developer, freelancer and open-source contributor based in India.`,
    `Focus areas: ${site.knowsAbout.join(", ")}.`,
    "",
    "## Contact",
    "",
    `- Website: ${site.url}`,
    `- Book a call: ${site.calLink}`,
    `- Email: ${site.email}`,
    ...site.sameAs.map((u) => `- ${u}`),
    "",
    "## Projects",
    "",
    ...projects.map(
      (p) => `- [${p.title}](${p.liveUrl ?? p.githubUrl ?? site.url}): ${p.description} (${p.status}; ${p.techStack.join(", ")})`
    ),
    "",
    "## Freelance & client work",
    "",
    ...freelanceProjects.map(
      (p) => `- [${p.title}](${p.liveUrl ?? site.url}): ${p.description} (${p.techStack.join(", ")})`
    ),
  ];
}

export function buildLlmsTxt() {
  return [
    ...header(),
    "",
    "## Blogs",
    "",
    ...blogs.map((b) => `- [${b.title}](${absoluteUrl(`/blog/${b.slug}`)}): ${b.description}`),
    "",
    "## Learnings",
    "",
    ...learnings.map((l) => `- [${l.title}](${absoluteUrl(`/learnings/${l.slug}`)}): ${l.summary}`),
    "",
    "## Optional",
    "",
    `- [Full content](${absoluteUrl("/llms-full.txt")}): every blog and learning in plain markdown`,
    `- [Books read](${absoluteUrl("/books")}): ${books.map((b) => b.title).join(", ")}`,
    "",
  ].join("\n");
}

export function buildLlmsFullTxt() {
  const posts = [
    ...blogs.map((b) => ({ kind: "Blog", url: `/blog/${b.slug}`, title: b.title, summary: b.description, date: b.date, content: b.content })),
    ...learnings.map((l) => ({ kind: "Learning", url: `/learnings/${l.slug}`, title: l.title, summary: l.summary, date: l.date, content: l.content })),
  ];

  return [
    ...header(),
    "",
    ...posts.flatMap((p) => [
      "---",
      "",
      `# ${p.title}`,
      "",
      `${p.kind} by ${site.name} · ${p.date} · ${absoluteUrl(p.url)}`,
      "",
      `> ${p.summary}`,
      "",
      dedent(p.content).replace(/\]\(\//g, `](${site.url}/`),
      "",
    ]),
  ].join("\n");
}
