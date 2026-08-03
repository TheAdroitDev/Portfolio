export interface Project {
  title: string;
  description: string;
  thumbnail: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  status: "live" | "building" | "coming-soon";
}

export const projects: Project[] = [
  {
    title: "WisePoll",
    description: "Smart Polling Made Simple - Create, share, and analyze polls with real-time results and rich analytics.",
    thumbnail: "/projects/wisepoll.png",
    githubUrl: "https://github.com/TheAdroitDev/WISE-Poll",
    liveUrl: "https://wisepoll.theadroitdev.com/",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Axios",
      "Socket.io",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Zod"
    ],
    status: "live",
  },
  {
    title: "AnimeKun",
    description: "Your ultimate anime discovery and tracking platform. (Work in Progress)",
    thumbnail: "/projects/animekun2.png",
    liveUrl: "https://animekun/",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ],
    status: "building",
  }
];
