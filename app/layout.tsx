import { META } from "@/constants/metadata";
import QueryProvider from "@/providers/queryProvider";
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
  metadataBase: new URL(META.base),
  title: META.title,
  description: META.description,
  keywords: [...META.keywords],
  openGraph: {
    title: META.title,
    description: META.description,
    siteName: META.siteName,
    locale: "ko_KR",
    type: "website",
    url: META.url,
    images: [{ url: META.ogImage, alt: META.title }],
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
  themeColor: "#B72621",
};

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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
