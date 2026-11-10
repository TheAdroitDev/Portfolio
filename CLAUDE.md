@AGENTS.md

# Shivam Verma's portfolio (theadroitdev.com)

Personal site of Shivam Verma (@theadroitdev): a software engineer for web and mobile, full-stack, freelancer, open-source contributor, and otaku. The site is meant to work like a product, not a resume. Before writing any UI or copy, read this file and match the taste described here. When unsure, look at an existing component and copy its patterns rather than inventing new ones.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 (`@theme inline` in `src/app/globals.css`), and shadcn on top of `@base-ui/react`. Note that Tooltip triggers use the `render={<a .../>}` prop, not `asChild`.
- Motion: `framer-motion` (most components) and `motion/react` (projects.tsx).
- Icons: `lucide-react`, `@hugeicons/react`, and hand-written brand SVGs in `src/components/icons.tsx` and the top of `projects.tsx`. Brand SVGs use `fill="currentColor"` and pick up their brand color only on hover.
- Theme: `next-themes`. Pressing `D` toggles it. pnpm is the package manager. Umami handles analytics.
- Content lives in **TypeScript data files** in `src/data/` (blogs, learnings, projects, books, instants, socials). There is no CMS and no MDX. Blog and learning bodies are markdown template strings, rendered by a custom parser in `blog-content.tsx` and `learning-content.tsx`. Blocks are split on `\n\n`, and `##` and `###` headings feed the ScrollProgress table of contents. Escape backticks inside these strings (`` \` ``).

## Layout

- Single column: `mx-auto w-full max-w-3xl px-6`, main `pb-24 pt-10`, footer in its own wrapper `pb-20`.
- Every page has the same shell: `<Navbar />`, then main, then `<Footer />`, then `<ProgressiveBlur className="fixed bottom-0 left-0 right-0 z-30" position="bottom" height="80px" />`.
- Home order: Hero, About, Socials (intro block, `space-y-6`), a dashed `<hr>`, Projects, GitHub graph, a dashed `<hr>`, Learnings, Blogs. Sections use `space-y-16`.
- Separators are dashed and faint: `border-dashed border-border/15`. The footer uses `border-border/40`.

## Design taste

The overall feel is **quiet, monochrome, and refined, with one touch of personality per section.** The work of Emil Kowalski, Ram (ramx.in), Manu Arora, and Akash Bhadange inspires it. Shivam writes about this himself in his "Taste Can't Be Prompted" and "How to Make Your Portfolio a Success" posts. Those posts are the design brief.

**Color**
- Neutral grayscale only: background `#fafafa` / `#100f0f`, foreground `#171717` / `#ededed`. Use color for meaning or delight, never decoration: brand colors on icon hover, a yellow star badge for GitHub stars, sparkle colors on "New and Live".
- Get hierarchy from opacity steps on tokens: `text-foreground/90` for body copy, `text-muted-foreground` for secondary text, `text-muted-foreground/60–/70` for metadata. Hover usually *dims* the text (`hover:text-foreground/60–/80`) instead of brightening it.
- Borders are faint (`border-border/40`, `/50`). Avoid heavy borders and hard shadows. Elevation is a soft layered shadow or `hover:bg-muted/40–/50`.

**Typography**
- Inter is the default. Use Schibsted Grotesk only for the name in the hero. Use Cormorant Garamond (600) for the closing quote. Use Caveat for handwritten margin notes, such as "what I'm up to" with a hand-drawn SVG arrow. Instrument Serif and Baloo are loaded and available for accents.
- Keep sizes small and precise: body `text-[15px] leading-relaxed`, section titles `text-lg`/`text-xl font-semibold tracking-tight`, list titles `text-[15px] font-medium tracking-tight`, metadata `text-xs`, labels `text-[11px] uppercase tracking-widest font-semibold`. Pixel values like `text-[13px]` and `text-[10px]` are normal here.
- Pair each section title with a short, plain subtitle (`mt-1 text-md text-muted-foreground`).

**Motion**
- Entrance: `initial={{ opacity: 0, y: 12–16 }}`, `animate`/`whileInView={{ opacity: 1, y: 0 }}`, `duration: 0.4–0.5, ease: "easeOut"`, `viewport={{ once: true }}`. Stagger lists with `delay: i * 0.06–0.08`.
- Micro-interactions should be subtle and purposeful: icons `hover:scale-110 active:scale-95`, `ArrowUpRight` nudging `translate-x-0.5 -translate-y-0.5`, segmented tab pill with `layoutId` and a spring (`bounce: 0.2, duration: 0.4`), tooltips on every icon button (`delay={100}`, `side="bottom"`, `text-xs`).
- Use signature focus effects: hovering one list item blurs and fades its siblings (`opacity-35 blur-[2.5px]`) and shows a floating thumbnail. Project cards expand Aceternity-style into a shared-layout modal.
- **Don't stack library animations.** He says this outright in his writing: "Don't overdo motion by blindly pasting component library animations everywhere." Use one special effect per area (MorphingText in the hero, SparklesText on the newest project, AnimatedShinyText "✨ Latest" on the newest blog, confetti on copying a link).

**Personality details** (keep and extend in this spirit)
- Navbar labels are playful: "3000" for home, "Brainchildren" for projects. He calls his own projects "brainchildren".
- About opens with "Konnichiwa". The hero rotates "Otaku" and "Polymath" alongside job titles.
- Instants are story-like 24-hour updates in a folder badge, with casual captions ("Lol found out pm2 was running from last 7 days").
- The footer ends with a Swami Vivekananda quote. The Books page lists the Bhagavad Gītā first. Spiritual, self-growth, and Indian roots are part of his identity.
- Keyboard support everywhere: `D` for theme, `Esc` to close, arrow keys in carousels.

**Components and code style**
- Write a `"use client"` component per section, as a named export (`export function Projects()`). Keep data in `src/data`, not in components.
- Use `cn()` from `@/lib/utils`. Put utility classes inline. Mark sections with comments like `{/* Separator */}` and `/* ── Tech Icons ── */`.
- Use `next/image` for images. Thumbnails go in `public/<section>/<slug>/thumbnail.png`.

## Writing voice (blogs, learnings, UI copy)

Write in the first person and talk to the reader as "you". Sound like a friend who has shipped things and is giving you the straight version.

- **Very short paragraphs.** Often one sentence per line, with a blank line between. Use line breaks for rhythm and punchlines ("It got 4 likes.").
- **Open with a hook or a contrarian claim**, then ask a question ("What exactly is your job?"), then answer in bold ("The answer is **taste**.").
- Structure: `##` sections, numbered `### 1.` steps, bullet lists with **bold lead-ins** ("- **Empathy:** ..."), comparison tables (the Modem vs Router, Prisma vs Drizzle, and VSA tables), and `---` dividers.
- Quote famous people as blockquotes with attribution: `> Simplicity is the ultimate sophistication. - Leonardo da Vinci`. Quote his own one-liners the same way.
- Use metaphors for technical ideas: Modem is "The Translator", Router is "The Traffic Police", Hub is "The Megaphone", Load Balancer is "The Toll Booth Director".
- Be opinionated and practical: "Raw Developer Take", "Final Verdict", "Decision Matrix", "That is the entire method." Bring it back to shipping and real impact.
- Recurring themes: taste over AI slop, providing value, distribution and consistency, positioning and niching down, treating work like a product, simplicity (KISS, YAGNI).
- Keep it casual and human: "btw Thx everyone", "Lol", "All the best :)". Credit his inspirations at the top when relevant.
- Sign off with `> Thank you for reading 💖`. Sometimes add a line asking readers to share and follow him first.
- Learnings are shorter and punchier than blogs: problem, solution, takeaway.
- UI copy is short and plain, with a little wit ("A selection of ideas I've brought to life.", "All the books I have read till now.").
- When editing his drafts, fix grammar and typos but **keep his voice and rhythm**. Don't turn it into polished corporate prose, and don't add em-dash-heavy, AI-sounding phrasing.

## Content conventions

- Blog: `{ title, slug, subtitle, description, date: "YYYY-MM-DD", url, readTime: "N min read", thumbnail, content }`. Newest goes first in the array (the home page shows `slice(0, 3)`, and the first gets "✨ Latest").
- Learning: `{ title, slug, summary, date, thumbnail?, content }`. It is auto-sorted by date.
- Project: `status: "live" | "building" | "coming-soon"`. Longer modal copy lives in `projectDetails` inside `projects.tsx`. Personal projects go in `projects` and client work goes in `freelanceProjects` (`public/works/`). Freelance descriptions lead with business outcomes (for example "₹6L+ monthly turnover").
- A new tech in a `techStack` needs an entry in `techIcons` in `projects.tsx`. Without one, it falls back to a muted pill.
