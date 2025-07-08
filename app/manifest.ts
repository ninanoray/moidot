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
    background_color: META.bgclor,
    display: "fullscreen",
    orientation: "portrait",
    dir: "ltr",
    lang: "ko-KR",
    prefer_related_applications: true,
    icons: [
      {
        src: "assets/android/android-launchericon-512-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "assets/android/android-launchericon-192-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "assets/android/android-launchericon-144-144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "assets/android/android-launchericon-96-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "assets/android/android-launchericon-72-72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "assets/android/android-launchericon-48-48.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "assets/screenshot/screenshot.png",
        sizes: "320X222",
        type: "image/png",
        platform: "android",
      },
      {
        src: "assets/screenshot/screenshot-wide.png",
        sizes: "640X445",
        type: "image/png",
        form_factor: "wide",
      },
    ],
  };
}
