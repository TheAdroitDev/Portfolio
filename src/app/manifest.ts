import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#100f0f",
    theme_color: "#100f0f",
    icons: [{ src: "/pfp.png", sizes: "400x400", type: "image/png" }],
  };
}
