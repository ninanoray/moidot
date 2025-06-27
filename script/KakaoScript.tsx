"use client";

import { KAKAO_API_KEY } from "@/constants/keys";
import Script from "next/script";

function KakaoScript() {
  const kakaoInit = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(KAKAO_API_KEY);
  };

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
      integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
      crossOrigin="anonymous"
      async
      onLoad={kakaoInit}
    />
  );
}

export default KakaoScript;
