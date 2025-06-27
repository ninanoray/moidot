import SidebarWrapper from "@/components/sidebarWrapper";
import { META } from "@/constants/metadata";
import QueryProvider from "@/providers/reactQuery/queryProvider";
import KakaoScript from "@/script/KakaoScript";
import { BeforeInstallPromptEvent } from "@/types/BeforeInstallPromptEvent";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

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
  //metadataBase: new URL(META.base),
  title: META.title,
  description: META.description,
  keywords: [...META.keywords],
  openGraph: {
    title: META.title,
    description: META.description,
    siteName: META.siteName,
    locale: "ko_KR",
    type: "website",
    //url: META.url,
    //images: [{ url: META.ogImage, alt: META.title }],
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
    <html lang="ko">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="manifest"
          href={"/" + "/manifest.webmanifest"}
          crossOrigin="use-credentials"
        ></link>
      </head>
      <body
        className={`${notoSansKr.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <SidebarWrapper>{children}</SidebarWrapper>
        </QueryProvider>
      </body>
      <KakaoScript />
    </html>
  );
}
