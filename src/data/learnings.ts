export interface Learning {
	title: string;
	slug: string;
	summary: string;
	date: string;
	readTime?: string;
	tags?: string[];
	thumbnail?: string;
	content: string;
}

export const learnings: Learning[] = [
	{
		title: "Why I'm Choosing Vertical Slice Architecture",
		slug: "vertical-slice-architecture",
		summary:
			"After building with MVC, Factory patterns, and Clean Architecture, here is why Vertical Slice Architecture (VSA)",
		date: "2026-08-17",
		thumbnail: "/learnings/vertical-slice-architecture/thumbnail.png",
		content: `

I've built with almost every common architecture pattern:

- **MVC (Model-View-Controller)**: Fast to start, but controllers quickly turn into bloated "fat controller" messes.
- **Factory & Adapter Patterns**: Great in theory, but usually over-engineered when you only have one implementation.
- **Clean / Layered Architecture**: Separates everything into Controllers, Services, Repositories, and Entities. Changing a single feature means modifying 6+ different folders with endless boilerplate.

Layering your code by technical layers creates massive friction when shipping fast.

---

## What is Vertical Slice Architecture (VSA)?

Instead of slicing code **horizontally** (putting all controllers in one folder,
all services in another, and all queries in a third), VSA slices code **vertically by feature**.

Each self-contained **slice** holds everything needed for a single request:

- Route endpoint
- Input validation schema
- Business logic
- Database query

\`\`\`text
src/
├── features/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── route.ts
│   │   │   ├── schema.ts
│   │   │   └── handler.ts
│   │   └── register/
│   │       ├── route.ts
│   │       ├── schema.ts
│   │       └── handler.ts
│   └── billing/
│       ├── checkout/
│       │   ├── route.ts
│       │   └── handler.ts
│       └── webhook/
│           ├── route.ts
│           └── handler.ts
\`\`\`

---

## Why It Works

- **High Cohesion**: Everything for a feature lives in one place. No jumping between 6 folders to fix one bug.
- **Low Coupling**: Features don't touch each other. Editing or deleting \`register\` will never break \`billing\`.
- **Effortless Deletion**: Want to kill a feature? Just delete the folder. Zero leftover dead code across shared services.

---

## Keeping Principles Intact (Without Over-Engineering)

- **KISS (Keep It Simple, Stupid)**: Write straightforward code for each slice. No unnecessary abstraction layers.
- **Pragmatic DRY (Don't Repeat Yourself)**: A little duplicated code across two slices is way better than a bloated "shared service" that breaks both.
- **YAGNI (You Aren't Gonna Need It)**: Don't create generic helpers, wrappers, or interfaces until you actually need them.

---

## Avoiding AI Slop & Retaining Control

AI tools love generating boilerplate: complex interfaces, redundant repository layers, and endless wrapper classes.

VSA keeps your codebase simple and linear:

\`Request -> Validate -> Run Logic -> Database Query -> Response\`

Because each slice is completely isolated, my thought process is faster, code stays clean, and everything stays directly in my control.

---

## Quick Comparison

| Metric | Clean / Layered | MVC | Vertical Slice Architecture |
| :--- | :--- | :--- | :--- |
| **Organization** | By technical layer (6+ folders) | Model, View, Controller | By business feature (1 folder) |
| **Coupling** | High (shared services & repos) | Moderate | Very Low (slices are isolated) |
| **Refactoring / Deleting** | Painful & fragile | Moderate | Instant (delete 1 folder) |
| **Boilerplate** | Heavy (DTOs, mappers, interfaces) | Moderate | Minimal (only what the slice needs) |
| **Shipping Speed** | Slow | Moderate | Fast |

---

## Summary

Vertical Slice Architecture gives you the speed of raw scripting with the modularity of clean code.

Keep features isolated, avoid premature abstraction, and ship fast.

> Thank you for reading 💖
`,
	},
	{
		title: "Prisma vs Drizzle: Raw Developer Take",
		slug: "prisma-vs-drizzle",
		summary:
			"A raw, unvarnished comparison of Prisma vs Drizzle on setup, schema DX, query control, serverless cold starts, type safety, and a clear decision matrix.",
		date: "2026-08-13",
		thumbnail: "/learnings/prisma-drizzle/thumbnail.png",
		content: `

> Prisma is the "easier" tool. Drizzle is the "flexible" and "high-performance" tool.

## 1. Setup & Ease of Use

Prisma wins on day one.

You run \`npx prisma init\`, write your model, run \`prisma db push\`, and you are off to the races.

The setup is easy and beginner-friendly.

Drizzle requires a bit more boilerplate up front.

Because of its flexibility.

You have to configure your database driver (Postgres, Neon, PlanetScale, Turso) manually,
set up Drizzle Kit, and wire up client files.

It takes a few extra minutes, but you gain total control over your database connection pool.

## 2. Schema Definitions

With **Prisma**, your database schema lives in a custom \`.prisma\` DSL file.

It's a totally different language designed by Prisma.

It is clean, highly readable, and handles relations out of the box:

\`\`\`typescript
model User {
  id    String @id @default(cuid())
  email String @unique
  posts Post[]
}
\`\`\`

With **Drizzle**, your schema is 100% standard TypeScript.

No custom syntax or extra DSL language to learn:

\`\`\`typescript
import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
});
\`\`\`

Drizzle requires a few more lines to define models and relations.

However, avoiding a custom schema syntax is a major benefit for TypeScript purists.

---

## 3. Querying Data & Relational Control

**Prisma** excels at handling complex relations automatically with

\`prisma.user.findMany({ include: { posts: true } })\`.

You don't have to write manual joins.

But when you need custom SQL queries or window functions,
Prisma restricts you to its built-in API.

This is where **Drizzle** shines when you need raw SQL control while retaining complete type safety.

You can query using \`db.query\` for relational models
or use raw SQL builders (\`db.select().from(...)\`) for maximum query precision.

---

## 4. Performance & Serverless Cold Starts

This is where the architectural split becomes obvious.

Prisma compiles queries through a Rust query engine binary.

In traditional Node servers, it works great.

But in serverless environments (Vercel, AWS Lambda, Cloudflare Workers), that binary footprint can add noticeable cold start latency.

Your Vercel app might become slower because of its cold start nature.

Whereas Drizzle is designed for speed.

It creates a paper-thin abstraction layer over native database drivers.

Zero binary overhead means cold starts are virtually instant.

![Performance Stats](/learnings/prisma-drizzle/stats.png)

For example, you can visit their [Benchmarks](https://orm.drizzle.team/benchmarks) page for more clarity on how they have optimized it.

## 5. Type Safety

Both libraries provide top-tier TypeScript support, but their implementations differ slightly:

- Prisma generates static types from your \`.prisma\` file using \`prisma generate\`.
- Drizzle infers types directly from your TypeScript schema objects (\`InferSelectModel\`), eliminating code generation steps.

---

## Decision Matrix: Which one should you pick?

| Feature / Criteria | Prisma | Drizzle |
| :--- | :--- | :--- |
| **Best For** | Rapid prototyping, standard CRUD apps, easy setup | High performance, serverless/edge, SQL control |
| **Schema Definition** | Custom \`.prisma\` DSL | Pure TypeScript schemas |
| **Performance & Cold Starts** | Higher latency (Rust binary engine) | Instant cold starts (Zero binary overhead) |
| **Query Flexibility** | Built-in relational API (restricted raw SQL) | Complete SQL builder + relational queries |
| **Type Safety** | Code-generated (\`prisma generate\`) | Inferred directly from TypeScript |
| **Setup Experience** | Super easy (\`npx prisma init\`) | Manual driver & client setup |

## Final Verdict

Ultimately, Prisma is the **easier** tool for getting started fast, while Drizzle is the **flexible** and **high-performance** tool for long-term control.

Pick the right tool for your latency requirements and ship.

> Thank you for reading 💖
`,
	},
	{
		title: "Why Launch Posts Do Not Guarantee Distribution",
		slug: "why-launch-posts-do-not-guarantee-distribution",
		summary:
			"Shipping code is just the start. A recent project launch of mine pulled in only four likes. That quiet reality check proved distribution is a long game built on consistency, patience, and handling feedback. Analyze the data, fix the pain points, and iterate forever.",
		date: "2026-09-09",
		thumbnail: "/learnings/distribution/thumbnail.png",
		content: `

## Problem
I launched my project [Distribution Engine](https://engine.theadroitdev.com) recently and I was expecting a lot of traction because I had been working on it for a while and I was very excited to share it with the world. 

It got 4 likes.

And honestly, that taught me more about distribution than any marketing thread I've read.

Just like optimization is not a day one job, distribution is just like that.

It's not something you create a launch post and boom you got users.

Well that's not that case because distribution is won through consistency and persistence.

And to do that you must be patient and welcome criticism.

Don't worry if users are not there.

Don't worry if visitors are not coming.

Don't worry if they are not making purchases.

## Solution

How to deal with it?

> Data.

Analyze what people want,
what's their actual pain point,
and differentiate that from what you are solving.

Gather feedback,
solve it,
repeat forever.

That is the entire method.
`,
	},
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
