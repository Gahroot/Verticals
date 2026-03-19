import { config } from "@/lib/vertical.config";

export function GET() {
  const manifest = {
    name: `${config.brandName} - ${config.tagline}`,
    short_name: config.brandName,
    description: config.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: config.theme.primary,
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    categories: ["business", "productivity"],
    lang: "en-US",
  };

  return Response.json(manifest);
}
