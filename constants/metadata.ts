import { AppleImage } from "next/dist/lib/metadata/types/extra-types";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { BASE_URL } from "./keys";

export const META = {
  title: "모이닷 | Moidot",
  siteName: "모이닷",
  description:
    "잇고 모여서, 계속 이어지는 모임. | Connect the Dots, draw the Dules, and gather into the Moim.",
  keywords: ["모이닷", "moidot"],
  base: BASE_URL,
  url: BASE_URL,
  favicon: BASE_URL + "/favicon.ico",
  ogImage: "/images/moidot/moidot.png",
  color: "#085E51",
  bgclor: "#F8F6F1",
} as const;

export const APPLE_ICONS = [
  {
    url: META.base + "assets/ios/58.png",
    type: "image/png",
    sizes: "58x58",
  },
  {
    url: META.base + "assets/ios/152.png",
    type: "image/png",
    sizes: "152x152",
  },
  {
    url: META.base + "assets/ios/167.png",
    type: "image/png",
    sizes: "167x167",
  },
  {
    url: META.base + "assets/ios/180.png",
    type: "image/png",
    sizes: "180x180",
  },
  {
    url: META.base + "assets/ios/192.png",
    type: "image/png",
    sizes: "192x192",
  },
  {
    url: META.base + "assets/ios/512.png",
    type: "image/png",
    sizes: "512x512",
  },
] as Icon[];

export const STARTUP_IMAGES = [
  {
    url: META.base + "assets/ios/splash-screens/iPhone_16_Pro_Max_portrait.png",
    media:
      "screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url: META.base + "assets/ios/splash-screens/iPhone_16_Pro_portrait.png",
    media:
      "screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url:
      META.base +
      "assets/ios/splash-screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
    media:
      "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url:
      META.base +
      "assets/ios/splash-screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
    media:
      "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url:
      META.base +
      "assets/ios/splash-screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
    media:
      "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url:
      META.base +
      "assets/ios/splash-screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
    media:
      "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url:
      META.base +
      "assets/ios/splash-screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
    media:
      "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url:
      META.base +
      "assets/ios/splash-screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
    media:
      "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url:
      META.base + "assets/ios/splash-screens/iPhone_11__iPhone_XR_portrait.png",
    media:
      "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url:
      META.base +
      "assets/ios/splash-screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
    media:
      "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url:
      META.base +
      "assets/ios/splash-screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
    media:
      "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: META.base + "assets/ios/splash-screens/13__iPad_Pro_M4_portrait.png",
    media:
      "screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: META.base + "assets/ios/splash-screens/12.9__iPad_Pro_portrait.png",
    media:
      "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: META.base + "assets/ios/splash-screens/11__iPad_Pro_M4_portrait.png",
    media:
      "screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url:
      META.base +
      "assets/ios/splash-screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
    media:
      "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: META.base + "assets/ios/splash-screens/10.9__iPad_Air_portrait.png",
    media:
      "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: META.base + "assets/ios/splash-screens/10.5__iPad_Air_portrait.png",
    media:
      "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: META.base + "assets/ios/splash-screens/10.2__iPad_portrait.png",
    media:
      "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url:
      META.base +
      "assets/ios/splash-screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
    media:
      "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: META.base + "assets/ios/splash-screens/8.3__iPad_Mini_portrait.png",
    media:
      "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
] as AppleImage[];
