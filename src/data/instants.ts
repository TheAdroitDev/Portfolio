export interface Instant {
  id: string;
  title: string;
  image: string;
  caption: string;
  date?: string;
  createdAt: string; // ISO Date String
}


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
    title: "How to get users",
    image: "/instants/users.png",
    caption: "New writing is out: on how to get users and win.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Spiked the VPS",
    image: "/instants/spike.png",
    caption: "Lol found out pm2 was running from last 7 days",
    createdAt: new Date().toISOString(),
  },
];
