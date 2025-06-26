"use client";

import Script from "next/script";

const KEY = `${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`;

function KakaoScript() {
  const kakaoInit = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(KEY);
  };

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
      integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
      crossOrigin="anonymous"
      async
      onLoad={kakaoInit}
    />
  );
}

export default KakaoScript;
