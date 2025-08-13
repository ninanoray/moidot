import { BASE_URL } from "@/constants/keys";
import { META } from "@/constants/metadata";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [BASE_URL + META.ogImage],
    },
  ];
}
