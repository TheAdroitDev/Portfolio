export interface Instant {
  id: string;
  title: string;
  image: string;
  caption: string;
  date?: string;
  createdAt: string; // ISO Date String
}

const now = Date.now();
const hour = 60 * 60 * 1000;

export const INSTANTS: Instant[] = [
  {
    id: "1",
    title: "Advanced RAG Patterns Revision",
    image: "/instants/advanced-rag-patterns.png",
    caption: "Revising advanced RAG architectures: Query Translation, HyDE, Step-back prompting, Query Routing, Reciprocal Rank Fusion (RRF), and Corrective RAG (C-RAG).",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Vertical Slice Architecture",
    image: "/instants/vertical-slice-architecture.png",
    caption: "Why I'm choosing Vertical Slice Architecture over traditional Layered & Clean Architecture.",
    createdAt: new Date(now - 2 * hour).toISOString(),
  },
];
