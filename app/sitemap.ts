import { BASE_URL } from "@/constants/keys";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: BASE_URL + "/login",
      lastModified: new Date(),
    },
  ];
}
