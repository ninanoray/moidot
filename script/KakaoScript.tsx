"use client";

import Script from "next/script";

const KEY = `${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`;

function KakaoScript() {
  const kakaoInit = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(KEY);
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
