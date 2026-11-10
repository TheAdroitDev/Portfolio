export interface Project {
    title: string;
    description: string;
    thumbnail: string;
    githubUrl?: string;
    liveUrl?: string;
    techStack: string[];
    status: "live" | "building" | "coming-soon";
    client?: string;
}

export const projects: Project[] = [
     {
        title: "Distribution Engine",
        description: "Turn your opinions into high-engagement platform-native posts. Distribution Engine helps turn one product or update into a repeatable distribution workflow",
        thumbnail: "/projects/distributionengine.png",
        liveUrl: "https://engine.theadroitdev.com/",
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "PostgreSQL",
            "Node.js",
            "Zod",
            "React Router"
        ],
        status: "live",
    },

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
    },
];

export const freelanceProjects: Project[] = [
    {
        title: "Vastu Mentor",
        description: "Full-stack e-commerce and consultation booking platform featuring crystal & remedy stores, automated billing pipeline, and custom admin dashboard.",
        thumbnail: "/works/vm.png",
        liveUrl: "https://vastmentor.com",
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "PostgreSQL",
            "Stripe",
            "Zod"
        ],
        status: "live",
    },
    {
        title: "Musky Snacks",
        description: "Vibrant product showcase and brand presence for a fast-scaling D2C healthy snacking brand with ₹6L+ monthly turnover, featuring flavoured makhanas.",
        thumbnail: "/works/ms.png",
        liveUrl: "https://muskysnax.in",
        techStack: [
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Vite",
            "Node.js"
        ],
        status: "live",
    },
    {
        title: "Jai Builders",
        description: "Modern showcase & portfolio platform built for a premier residential construction firm, featuring architectural home designs and floorplans.",
        thumbnail: "/works/jbs.png",
        liveUrl: "https://jaibuilders.online",
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS"
        ],
        status: "live",
    },
];
