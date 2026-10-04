import type { MetadataRoute } from "next"
import { SITE_NAME, SITE_TAGLINE, absoluteUrl } from "@/lib/site-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description:
      "Portfolio of Mutuku Joshua, a fullstack developer in Nairobi, Kenya building fast, scalable web applications.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["portfolio", "business", "productivity"],
  }
}