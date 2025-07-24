import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import Script from "next/script";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
};

export default layout;
