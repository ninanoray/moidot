"use client";

import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Currency } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeControl,
  useKakaoLoader,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { RippleButton } from "../animate-ui/buttons/ripple";

interface Position {
  lat: number;
  lng: number;
}

interface KakaoMapProps {
  className?: string | undefined;
}

const CENTER_INIT = {
  lat: 33.450701,
  lng: 126.570667,
} as Position;

const KakaoMap = ({ className }: KakaoMapProps) => {
  useKakaoLoader({
    appkey: KAKAO_JAVASCRIPT_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });

  const [centerPostion, setCenterPosition] = useState(CENTER_INIT);

  const [clickedPosition, setClickedPosition] = useState<Position>();

  return (
    <Map
      level={3} // 지도의 확대 레벨
      isPanto // 지도 부드럽게 이동
      center={centerPostion}
      onCenterChanged={(map) => {
        const centerPos = map.getCenter();
        setCenterPosition({ lat: centerPos.getLat(), lng: centerPos.getLng() });
      }}
      onClick={(_, mouseEvent) => {
        const mousePos = mouseEvent.latLng;
        setClickedPosition({
          lat: mousePos.getLat(),
          lng: mousePos.getLng(),
        });
      }}
      className={cn("size-full my-1 rounded-lg", className)}
    >
      <MapTypeControl position="TOPRIGHT" />
      <ZoomControl position="RIGHT" />
      <CurrentMarker setCenterPos={setCenterPosition} />
      <ClickedMarker position={clickedPosition} />
    </Map>
  );
};

export default KakaoMap;

interface CurrentPosition {
  position: Position;
  errMsg: string | null;
  isLoading: boolean;
}

interface CurrentMarkerProps {
  setCenterPos: (pos: Position) => void;
}

const CurrentMarker = ({ setCenterPos }: CurrentMarkerProps) => {
  const [currentPosition, setCurrentPosition] = useState<CurrentPosition>({
    position: CENTER_INIT,
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setCurrentPosition((prev) => ({
            ...prev,
            position: { lat, lng },
            isLoading: false,
          }));
          // 지도 중앙 위치 업데이트
          setCenterPos({ lat, lng });
        },
        (err) => {
          setCurrentPosition((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setCurrentPosition((prev) => ({
        ...prev,
        errMsg: "현위치를 찾을 수 없습니다.",
        isLoading: true,
      }));
    }
  }, [setCenterPos]);

  if (!currentPosition.isLoading)
    return (
      <>
        <RippleButton
          size="icon"
          variant="outline"
          className="absolute z-1 right-3 bottom-3"
          onClick={() => {
            setCenterPos(currentPosition.position);
          }}
        >
          <Currency className="rotate-45" />
        </RippleButton>
        <CustomOverlayMap position={currentPosition.position}>
          <div className="w-16 flex-center rounded-full">
            <DotLottieReact
              src="images/kakao-map/current-location.lottie"
              loop
              autoplay
              className="h-16 shrink-0"
            />
          </div>
        </CustomOverlayMap>
      </>
    );
};

interface MarkerProps {
  position: Position | undefined;
}

const ClickedMarker = ({ position }: MarkerProps) => {
  const [open, setOpen] = useState<boolean>(false);

  if (position)
    return (
      <>
        <MapMarker
          position={position}
          clickable
          onMouseOver={() => setOpen(true)}
          onClick={() => setOpen(!open)}
        />
        {open && (
          <CustomOverlayMap position={position} clickable>
            <RippleButton className="absolute -top-20 right-1/2 translate-x-1/2">
              여기닷
            </RippleButton>
          </CustomOverlayMap>
        )}
      </>
    );
};
