"use client";

import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import {
  Map,
  useKakaoLoader as useKakaoLoaderOrigin,
} from "react-kakao-maps-sdk";

const Dotmap = () => {
  useKakaoLoaderOrigin({
    appkey: KAKAO_JAVASCRIPT_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });
  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "350px",
      }}
      level={3} // 지도의 확대 레벨
    />
  );
};

export default Dotmap;
