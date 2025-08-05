"use client";

import CreateMydotMarker from "@/app/dotmap/components/createMydotMarker";
import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Locate, Minus, Plus } from "lucide-react";
import {
  Dispatch,
  RefObject,
  SetStateAction,
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
import SearchedMarkers from "./searchedMarkers";

type MapType = "ROADMAP" | "HYBRID";

export type Position = {
  lat: number;
  lng: number;
};

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
  group?: string;
  /**
   * 카테고리 이름
   * 예) 음식점 > 치킨
   */
  category?: string;
  /**
   * 현재 위치와 마커 사이의 거리
   */
  distance?: number;
}

interface KakaoMapProps {
  keyword?: string | undefined;
  className?: string | undefined;
}

const KakaoMap = ({ keyword, className }: KakaoMapProps) => {
  const CENTER_INIT = {
    lat: 33.450701,
    lng: 126.570667,
  } as Position;

  // const kakaoLoader = useKakaoLoader({
  //   appkey: KAKAO_JAVASCRIPT_KEY,
  //   libraries: ["clusterer", "services"],
  // });

  const mapRef = useRef<kakao.maps.Map>(null);
  const [mapType, setMapType] = useState<MapType>("ROADMAP");

  const [centerPostion, setCenterPosition] = useState(CENTER_INIT);

  const [currentPosition, setCurrentPosition] = useState<CurrentPosition>({
    position: CENTER_INIT,
    errMsg: null,
    isLoading: true,
  });

  const [clickedMarker, setClickedMaker] = useState<Marker>();
  const [longClick, setLongClick] = useState<boolean>(false);
  const onLongPress = useLongPress(() => {}, {
    onStart: () => setLongClick(false),
    onFinish: () => {
      setClickedMaker(undefined);
      setLongClick(true);
    },
    threshold: 300,
    cancelOnMovement: true,
  });

  const [searchedMap, setSearchedMap] = useState<kakao.maps.Map>();

  return (
    <div className="relative size-full rounded-lg overflow-hidden select-none">
      <Map
        ref={mapRef}
        level={3} // 지도의 확대 레벨
        isPanto // 지도 부드럽게 이동
        mapTypeId={mapType} // 맵뷰
        center={centerPostion}
        onCenterChanged={(map) => {
          const centerPos = map.getCenter();
          setCenterPosition({
            lat: centerPos.getLat(),
            lng: centerPos.getLng(),
          });
        }}
        onCreate={setSearchedMap}
        {...onLongPress()}
        disableDoubleClickZoom
        onClick={(_, mouseEvent) => {
          if (longClick) {
            const mousePosLat = mouseEvent.latLng.getLat();
            const mousePosLng = mouseEvent.latLng.getLng();

            // 좌표를 주소로 변환
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2Address(
              mousePosLng,
              mousePosLat,
              (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  setClickedMaker({
                    name: "마이닷",
                    position: {
                      lat: mousePosLat,
                      lng: mousePosLng,
                    },
                    address: result[0].address.address_name,
                    roadAddress: result[0].road_address?.address_name,
                  });
                }
              }
            );
          }
        }}
        className={cn("size-full", className)}
      >
        <MapController ref={mapRef} type={mapType} setType={setMapType} />
        <SearchedMarkers
          map={searchedMap}
          keyword={keyword}
          currentPos={currentPosition.position}
        />
        {clickedMarker && <CreateMydotMarker marker={clickedMarker} />}
        <CurrentMarker
          currentPos={currentPosition}
          setCurrentPos={setCurrentPosition}
          setCenterPos={setCenterPosition}
        />
      </Map>
    </div>
  );
};

export default KakaoMap;

interface MapControllerProps {
  ref: RefObject<kakao.maps.Map | null>;
  type: MapType;
  setType: (type: MapType) => void;
}

const MapController = ({ ref, type, setType }: MapControllerProps) => {
  const zoomIn = () => {
    const map = ref.current;
    if (!map) return;
    map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    const map = ref.current;
    if (!map) return;
    map.setLevel(map.getLevel() + 1);
  };

  return (
    <div className="absolute top-1.5 right-1.5 z-1 flex flex-col items-end gap-2">
      {/* 맵뷰 타입 */}
      <ToggleGroup
        type="single"
        className="bg-white dark:bg-input p-1 border-1 border-input rounded-lg"
        value={type}
        onValueChange={setType}
      >
        <ToggleGroupItem value="ROADMAP">지도</ToggleGroupItem>
        <ToggleGroupItem value="HYBRID">스카이뷰</ToggleGroupItem>
      </ToggleGroup>
      {/* 확대/축소 */}
      <div className="flex flex-col bg-white dark:bg-input border-1 border-input rounded-lg">
        <RippleButton
          size="icon"
          variant="ghost"
          onClick={zoomIn}
          className="border-0 rounded-b-none"
        >
          <Plus />
        </RippleButton>
        <RippleButton
          size="icon"
          variant="ghost"
          onClick={zoomOut}
          className="border-0 rounded-t-none"
        >
          <Minus />
        </RippleButton>
      </div>
    </div>
  );
};

interface CurrentPosition {
  position: Position;
  errMsg: string | null;
  isLoading: boolean;
}

interface CurrentMarkerProps {
  currentPos: CurrentPosition;
  setCurrentPos: Dispatch<SetStateAction<CurrentPosition>>;
  setCenterPos: (pos: Position) => void;
}

const CurrentMarker = ({
  currentPos,
  setCurrentPos,
  setCenterPos,
}: CurrentMarkerProps) => {
  const updateCurrentPostition = useCallback(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setCurrentPos((prev) => ({
            ...prev,
            position: { lat, lng },
            isLoading: false,
          }));
          // 지도 중앙 위치 업데이트
          setCenterPos({ lat, lng });
        },
        (err) => {
          setCurrentPos((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setCurrentPos((prev) => ({
        ...prev,
        errMsg: "현위치를 찾을 수 없습니다.",
        isLoading: true,
      }));
    }
  }, [setCenterPos, setCurrentPos]);

  useEffect(() => {
    updateCurrentPostition();
  }, [updateCurrentPostition]);

  if (!currentPos.isLoading)
    return (
      <>
        {/* 현위치로 이동하기 버튼 */}
        <RippleButton
          size="icon"
          className="absolute z-1 right-1.5 bottom-1.5"
          onClick={() => {
            setCenterPos(currentPos.position);
          }}
        >
          <Locate />
        </RippleButton>
        {/* 현위치 마커 */}
        <CustomOverlayMap position={currentPos.position}>
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
  content: string | undefined;
  className?: string | undefined;
}

export const MarkerCardLabelContent = ({
  label,
  content,
  className,
}: MarkerCardLabelContentProps) => {
  return (
    <div className="flex items-center gap-1">
      <div
        className={cn(
          "mr-1 w-12 py-0.5 flex-center bg-accent text-accent-foreground text-xs font-semibold rounded-sm",
          className
        )}
      >
        {label}
      </div>
      <p>{content}</p>
    </div>
  );
};
