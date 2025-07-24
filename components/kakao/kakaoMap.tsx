"use client";

import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import { cn } from "@/lib/utils";
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

interface CurrentPosition {
  center: Position;
  errMsg: string | null;
  isLoading: boolean;
}

interface KakaoMapProps {
  className?: string | undefined;
}

const KakaoMap = ({ className }: KakaoMapProps) => {
  useKakaoLoader({
    appkey: KAKAO_JAVASCRIPT_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });

  const [currentPosition, setCurrentPosition] = useState<CurrentPosition>({
    center: {
      // 지도의 중심좌표
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  }>();

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
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
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={currentPosition.center}
      className={cn("size-full my-1 rounded-lg", className)}
      level={3} // 지도의 확대 레벨
      onClick={(target, mouseEvent) => {
        const latlng = mouseEvent.latLng;
        setPosition({
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        });
      }}
    >
      <MapTypeControl position={"TOPRIGHT"} />
      <ZoomControl position={"RIGHT"} />
      <ClickMarker
        position={position ?? currentPosition.center}
        loading={currentPosition.isLoading}
      />
    </Map>
  );
};

export default KakaoMap;

interface ClickMarkerProps {
  position: Position;
  loading: boolean;
}

const ClickMarker = ({ position, loading }: ClickMarkerProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {!loading && (
        <MapMarker
          position={position}
          clickable
          onMouseOver={() => setOpen(true)}
          onClick={() => setOpen(!open)}
        />
      )}
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
