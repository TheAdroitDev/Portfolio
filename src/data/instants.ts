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
    title: "GenAI Cohort Backlogs",
    image: "/instants/genai-cohort.png?v=2",
    caption: "Completing Backlogs Of GenAI Cohort Advanced Rag Patterns.",
    createdAt: new Date(now - 1 * hour).toISOString(),
  },
  {
    id: "2",
    title: "RAG Notes & Material",
    image: "/instants/rag-notes.png?v=2",
    caption: "Making notes on RAG and preparing blog material for it.",
    createdAt: new Date(now - 3 * hour).toISOString(),
  },
  {
    id: "3",
    title: "Portfolio Improvements",
    image: "/instants/portfolio-dev.png?v=2",
    caption: "New portfolio changes, adding more features and fixing things.",
    createdAt: new Date(now - 5 * hour).toISOString(),
  },
];
