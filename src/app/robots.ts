import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = BASE_URL;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin-login", "/order", "/find-order", "/api"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}