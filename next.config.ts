import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
  //basePath: "/moidot",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async rewrites() {
    return [
      // {
      //   source: "/api/:path*", // api 요청
      //   destination: `${API_SERVER}/:path*`, // 프록시할 서버의 주소
      // },
    ];
  },
};

export default nextConfig;
