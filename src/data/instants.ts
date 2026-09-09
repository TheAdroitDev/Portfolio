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
];
