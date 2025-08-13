import { BASE_URL } from "@/constants/keys";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      priority: 1,
    },
    {
      url: BASE_URL + "/login",
      priority: 0.8,
    },
  ];
}
