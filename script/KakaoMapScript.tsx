import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import Script from "next/script";

function KakaoMapScript() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
      strategy="beforeInteractive"
    />
  );
}

export default KakaoMapScript;
