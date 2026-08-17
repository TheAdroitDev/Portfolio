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
    title: "Vertical Slice Architecture",
    image: "/instants/vertical-slice-architecture.png",
    caption: "Why I'm choosing Vertical Slice Architecture over traditional Layered & Clean Architecture.",
    createdAt: new Date().toISOString(),
  },
];
