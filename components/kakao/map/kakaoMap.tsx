"use client";

import { useLayoutContainer } from "@/app/container/layoutContainerProvider";
import CreateMydotMarker from "@/app/dotmap/components/createMydotMarker";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Locate, MapIcon, Minus, Plus, SwitchCamera } from "lucide-react";
import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { useLongPress } from "use-long-press";
import { RippleButton } from "../../animate-ui/buttons/ripple";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../animate-ui/radix/toggle-group";
import { calcDistance } from "../util";
import { SearchInterface } from "./searchInterface";

type MapType = "ROADMAP" | "HYBRID";

/**
 * WGS84 위치 좌표
 */
export interface Position {
  lat: number;
  lng: number;
}

/**
 * 카카오맵 위에 표시되는 위치 마커
 */
export interface Marker {
  position: Position;
  id?: string;
  name: string;
  address?: string;
  roadAddress?: string;
  url?: string;
  phone?: string;
  /**
   * 중요 카테고리만 그룹핑한 카테고리 그룹명
   * 예) 음식점
   */
  category?: string;
  categoryCode?:
    | `${kakao.maps.CategoryCode}`
    | `${Exclude<kakao.maps.CategoryCode, "">}`[];
  /**
   * 카테고리 이름
   * 예) 음식점 > 치킨
   */
  keywords?: string;
  /**
   * 현재 위치와 마커 사이의 거리
   */
  distance?: number;
}

interface KakaoMapProps extends React.ComponentProps<"div"> {
  keyword?: string | undefined;
}

const KakaoMap = ({ keyword, className, ...props }: KakaoMapProps) => {
  const CENTER_INIT = {
    lat: 33.450701,
    lng: 126.570667,
  } as Position;

  // const kakaoLoader = useKakaoLoader({
  //   appkey: KAKAO_JAVASCRIPT_KEY,
  //   libraries: ["clusterer", "services"],
  // });
  const isMobile = useIsMobile();
  const { disablePull2Refresh } = useLayoutContainer();

  const mapRef = useRef<kakao.maps.Map>(null);
  const [mapType, setMapType] = useState<MapType>("ROADMAP");

  // 현위치
  const [currentPosition, setCurrentPosition] = useState<kakao.maps.LatLng>();

  const [clickedMarker, setClickedMaker] = useState<Marker>();
  const [longClick, setLongClick] = useState<boolean>(false);
  const onLongPress = useLongPress(() => {}, {
    onStart: () => setLongClick(false),
    onFinish: () => setLongClick(true),
    threshold: 200,
    cancelOnMovement: true,
  });

  /**
   * 위치 좌표를 주소로 변환
   * @param latlng 카카오맵 WGS84 좌표
   * @param name 마커 이름
   */
  function positionToAdress(latlng: kakao.maps.LatLng, name = "여기") {
    const lat = latlng.getLat();
    const lng = latlng.getLng();
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setClickedMaker({
          name: name,
          position: { lat, lng },
          address: result[0].address.address_name,
          roadAddress: result[0].road_address?.address_name,
        });
      }
    });
  }

  return (
    <div
      className="relative size-full md:rounded-md overflow-hidden select-none"
      {...props}
    >
      <Map
        ref={mapRef}
        level={3} // 지도의 확대 레벨
        isPanto // 지도 부드럽게 이동
        mapTypeId={mapType} // 맵뷰
        center={CENTER_INIT}
        className={cn("size-full", className)}
        {...onLongPress()}
        disableDoubleClickZoom={!isMobile}
        onClick={(_, mouseEvent) => {
          if (longClick) {
            setClickedMaker(undefined);
            positionToAdress(mouseEvent.latLng);
          }
        }}
        onTouchStart={() => disablePull2Refresh(true)}
        onTouchEnd={() => disablePull2Refresh(false)}
      >
        <MapController mapRef={mapRef} type={mapType} setType={setMapType} />
        <SearchInterface
          mapRef={mapRef}
          keyword={keyword}
          currentPos={currentPosition}
        />
        {clickedMarker && (
          <CreateMydotMarker
            marker={clickedMarker}
            updateMarker={setClickedMaker}
          />
        )}
        <CurrentMarker
          mapRef={mapRef}
          currentPos={currentPosition}
          setCurrentPos={setCurrentPosition}
        />
      </Map>
    </div>
  );
};

export default KakaoMap;

interface MapControllerProps {
  mapRef: RefObject<kakao.maps.Map | null>;
  type: MapType;
  setType: (type: MapType) => void;
}

const MapController = ({ mapRef, type, setType }: MapControllerProps) => {
  const isMobile = useIsMobile();

  const zoomIn = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() - 1, { animate: true });
  };

  const zoomOut = () => {
    const map = mapRef.current;
    if (!map) return;
    map.setLevel(map.getLevel() + 1, { animate: true });
  };

  if (!isMobile)
    return (
      <div className="absolute top-1.5 right-1.5 z-1 flex flex-col items-end gap-2">
        {/* 맵뷰 타입 */}
        <ToggleGroup
          type="single"
          className="p-1 bg-card/40 backdrop-blur-xs shadow-md rounded-md [&_span]:data-[state=on]:text-primary-foreground [&_span]:font-normal [&_span]:hover:text-card-foreground"
          activeClassName="bg-primary"
          value={type}
          onValueChange={setType}
        >
          <ToggleGroupItem value="ROADMAP">지도</ToggleGroupItem>
          <ToggleGroupItem value="HYBRID">스카이뷰</ToggleGroupItem>
        </ToggleGroup>
        {/* 확대/축소 */}
        <div className="flex flex-col bg-card/40 backdrop-blur-xs shadow-md rounded-md">
          <RippleButton
            size="icon"
            variant="ghost"
            onClick={zoomIn}
            className="rounded-b-none"
          >
            <Plus />
          </RippleButton>
          <RippleButton
            size="icon"
            variant="ghost"
            onClick={zoomOut}
            className="rounded-t-none"
          >
            <Minus />
          </RippleButton>
        </div>
      </div>
    );
  else
    return (
      <ToggleGroup
        type="single"
        size="sm"
        className="absolute bottom-28 right-1.5 z-1 p-1 flex-col bg-card/40 backdrop-blur-xs shadow-md rounded-md [&_span]:data-[state=on]:text-primary-foreground [&_span]:font-normal [&_span]:hover:text-card-foreground"
        activeClassName="bg-primary"
        value={type}
        onValueChange={setType}
      >
        <RippleButton
          size="sm"
          variant="ghost"
          onClick={zoomIn}
          className="aspect-square"
        >
          <Plus />
        </RippleButton>
        <RippleButton
          size="sm"
          variant="ghost"
          onClick={zoomOut}
          className="aspect-square"
        >
          <Minus />
        </RippleButton>
        <ToggleGroupItem value="HYBRID">
          {!isMobile ? "스카이뷰" : <SwitchCamera />}
        </ToggleGroupItem>
        <ToggleGroupItem value="ROADMAP">
          {!isMobile ? "지도" : <MapIcon />}
        </ToggleGroupItem>
      </ToggleGroup>
    );
};

interface CurrentMarkerProps {
  mapRef: RefObject<kakao.maps.Map | null>;
  currentPos: kakao.maps.LatLng | undefined;
  setCurrentPos: (latlng: kakao.maps.LatLng | undefined) => void;
}

const CurrentMarker = ({
  mapRef,
  currentPos,
  setCurrentPos,
}: CurrentMarkerProps) => {
  const map = mapRef.current;

  const updateCurrentPostition = useCallback(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setCurrentPos(new kakao.maps.LatLng(lat, lng));
          // 지도 중앙 위치 업데이트
          map?.setCenter(new kakao.maps.LatLng(lat, lng));
        },
        (err) => {
          setCurrentPos(undefined);
          alert(`${err.code}: ${err.message}`);
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setCurrentPos(undefined);
      alert("GeoLocation을 사용할 수 없습니다.");
    }
  }, [map, setCurrentPos]);

  useEffect(() => {
    updateCurrentPostition();
  }, [updateCurrentPostition]);

  if (map && currentPos)
    return (
      <>
        {/* 현위치로 이동하기 버튼 */}
        <RippleButton
          size="icon"
          className="absolute z-1 md:right-1.5 right-2 md:bottom-1.5 bottom-18"
          onClick={() => {
            map.panTo(currentPos);
            if (map.getLevel() !== 3)
              setTimeout(() => {
                map.setLevel(3, {
                  animate: true,
                  anchor: currentPos,
                });
              }, 300);
          }}
        >
          <Locate />
        </RippleButton>
        {/* 현위치 마커 */}
        <CustomOverlayMap
          position={{ lat: currentPos.getLat(), lng: currentPos.getLng() }}
        >
          <div className="size-16 flex-center rounded-full">
            <DotLottieReact
              src="images/kakao-map/current-location-secondary.lottie"
              loop
              autoplay
              className="size-16 shrink-0"
            />
            <div className="absolute size-3 bg-background rounded-full"></div>
          </div>
        </CustomOverlayMap>
      </>
    );
};

interface MarkerCardLabelContentProps {
  label: string;
  children: ReactNode;
  className?: string | undefined;
}

export const MarkerCardLabelContent = ({
  label,
  children,
  className,
}: MarkerCardLabelContentProps) => {
  return (
    <div className="flex items-center gap-1">
      <div
        className={cn(
          "shrink-0 mr-1 w-12 py-0.5 flex-center bg-accent text-accent-foreground text-xs font-semibold rounded-sm",
          className
        )}
      >
        {label}
      </div>
      {children}
    </div>
  );
};

/**
 * 카카오 장소 정보를 Marker 정보로 변환한다.
 * @param place 장소 정보
 * @param position 장소 정보와의 거리를 계산할 기준 Position
 */
export function placeToMarker(
  place: kakao.maps.services.PlacesSearchResultItem,
  position?: Position | undefined
): Marker {
  const lat = Number(place.y);
  const lng = Number(place.x);

  return {
    position: {
      lat,
      lng,
    },
    id: place.id,
    name: place.place_name,
    address: place.address_name,
    roadAddress: place.road_address_name,
    url: place.place_url,
    phone: place.phone,
    category: place.category_group_name,
    categoryCode: place.category_group_code,
    keywords: place.category_name,
    distance: calcDistance(position, { lat, lng }),
  };
}
