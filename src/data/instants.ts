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
    title: "New Freelance Section",
    image: "/instants/freelance.png",
    caption: "Shows all of my freelance work till now",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Claude doing AEO, SEO and GEO of this website 👽",
    image: "/instants/claude-seo.jpg",
    caption: "Did the most important thing; SEO",
    createdAt: new Date().toISOString(),
  },
];
