import { APPLE_ICONS, META, STARTUP_IMAGES } from "@/constants/metadata";
import NextAuthProvider from "@/providers/nexthAuthProvider";
import QueryProvider from "@/providers/reactQuery/queryProvider";
import { ThemeProvider } from "@/providers/themeProvider";
import JsonLdScript from "@/script/JsonLdScript";
import KakaoScript from "@/script/KakaoScript";
import { BeforeInstallPromptEvent } from "@/types/BeforeInstallPromptEvent";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SidebarWrapper } from "./sidebar/sidebarWrapper";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(META.base),
  title: META.title,
  description: META.description,
  keywords: [...META.keywords],
  applicationName: META.siteName,
  icons: {
    icon: META.favicon,
    apple: APPLE_ICONS,
  },
  openGraph: {
    title: META.title,
    description: META.description,
    siteName: META.siteName,
    locale: "ko_KR",
    type: "website",
    url: META.url,
    images: [{ url: META.ogImage, alt: META.title }],
  },
  twitter: {
    card: "summary",
    images: [{ url: META.ogImage, alt: META.title }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    startupImage: STARTUP_IMAGES,
  },
  verification: {
    google: "2BOUz65gs1f9_eR-sFrM1pSVBwWzG5dpIBJvkefNtt0",
    other: {
      "naver-site-verification": "2db1528ec78dfc8e3acf3290937f74ae7428d414",
    },
  },
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  userScalable: false,
  viewportFit: "cover",
  // Also supported but less commonly used
  // interactiveWidget: "resizes-visual",
  themeColor: META.color,
};

declare global {
  interface Window {
    Kakao: any; //Kakao script 관련
  }
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent; //PWA 설치 유도 관련
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* <meta name="mobile-web-app-capable" content="yes" /> */}
        <link
          rel="manifest"
          href={META.base + "/manifest.webmanifest"}
          crossOrigin="use-credentials"
        ></link>
      </head>
      <body
        className={`${notoSansKr.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <QueryProvider>
            <ThemeProvider>
              <SidebarWrapper>{children}</SidebarWrapper>
            </ThemeProvider>
          </QueryProvider>
        </NextAuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      <JsonLdScript />
      <KakaoScript />
      <GoogleTagManager gtmId={`${process.env.GTM_ID}`} />
      <GoogleAnalytics gaId={`${process.env.GA_ID}`} />
    </html>
  );
}
