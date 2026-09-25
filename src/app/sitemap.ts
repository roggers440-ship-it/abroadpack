import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BASE_URL;
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/build`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/guide`, changeFrequency: "monthly", priority: 0.9 },
  ];
}