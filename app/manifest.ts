import { META } from "@/constants/metadata";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: META.title,
    short_name: META.siteName,
    description: META.description,
    scope: "/",
    start_url: "/",
    theme_color: META.color,
    background_color: META.color,
    display: "fullscreen",
    orientation: "portrait",
    dir: "ltr",
    lang: "ko-KR",
    prefer_related_applications: true,
    icons: [],
  };
}
