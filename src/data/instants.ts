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
    title: "Launch Distribution Engine",
    image: "/instants/distribution.png",
    caption: "Turn your opinions into high-engagement platform-native post => engine.theadroitdev.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Learning Vectorless RAG",
    image: "/instants/vectorlessrag.png",
    caption: "Brainstorming with Vectorless RAG",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Purchased VPS 😍",
    image: "/instants/vps.png",
    caption: "Excited about my new VPS! Will post my learnings soon.",
    createdAt: new Date().toISOString(),
  },
];
