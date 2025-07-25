"use client";

import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Currency, Minus, Phone, Plus } from "lucide-react";
import {
  Fragment,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import { useLongPress } from "use-long-press";
import { RippleButton } from "../animate-ui/buttons/ripple";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../animate-ui/radix/popover";
import { ToggleGroup, ToggleGroupItem } from "../animate-ui/radix/toggle-group";

type MapType = "ROADMAP" | "HYBRID";

interface Position {
  lat: number;
  lng: number;
}

interface KakaoMapProps {
  keyword?: string | undefined;
  className?: string | undefined;
}

const CENTER_INIT = {
  lat: 33.450701,
  lng: 126.570667,
} as Position;

const KakaoMap = ({ keyword, className }: KakaoMapProps) => {
  useKakaoLoader({
    appkey: KAKAO_JAVASCRIPT_KEY,
    libraries: ["clusterer"],
  });

  const mapRef = useRef<kakao.maps.Map>(null);
  const [mapType, setMapType] = useState<MapType>("ROADMAP");

  const [centerPostion, setCenterPosition] = useState(CENTER_INIT);

  const [clickedPosition, setClickedPosition] = useState<Position>();
  const [showClickedMarker, setShowClickedMarker] = useState<boolean>(false);
  const onLongPress = useLongPress(() => {}, {
    onStart: () => setShowClickedMarker(false),
    onFinish: () => setShowClickedMarker(true),
    threshold: 300, // press 시간 /ms 초 단위이다.
    cancelOnMovement: true, // 확실하진않지만 꾹 눌렀다가 옆으로 이동했을때 취소여부 옵션인것같다
  });

  const [searchedMap, setSearchedMap] = useState<kakao.maps.Map>();

  return (
    <div className="relative size-full my-1 rounded-lg overflow-hidden select-none">
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
        onClick={(_, mouseEvent) => {
          if (showClickedMarker) {
            const mousePos = mouseEvent.latLng;
            setClickedPosition({
              lat: mousePos.getLat(),
              lng: mousePos.getLng(),
            });
          }
        }}
        className={cn("size-full", className)}
      >
        <MapController ref={mapRef} type={mapType} setType={setMapType} />
        {clickedPosition && (
          <ClickedMarker position={clickedPosition} name="마이닷" />
        )}
        {keyword && <SearchedMarker map={searchedMap} keyword={keyword} />}
        <CurrentMarker setCenterPos={setCenterPosition} />
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

interface Marker {
  position: Position;
  id?: string;
  name: string;
  address?: string;
  roadAddress?: string;
  url?: string;
  phone?: string;
  group?: string;
  category?: string;
}

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

  const updateCurrentPostition = useCallback(() => {
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

  useEffect(() => {
    updateCurrentPostition();
  }, [updateCurrentPostition]);

  if (!currentPosition.isLoading)
    return (
      <>
        {/* 현위치로 이동하기 버튼 */}
        <RippleButton
          size="icon"
          className="absolute z-1 right-1.5 bottom-1.5"
          onClick={() => {
            setCenterPos(currentPosition.position);
          }}
        >
          <Currency className="rotate-45" />
        </RippleButton>
        {/* 현위치 마커 */}
        <CustomOverlayMap position={currentPosition.position}>
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

const ClickedMarker = ({ position, name }: Marker) => {
  const [open, setOpen] = useState<boolean>(false);

  if (position)
    return (
      <>
        <MapMarker
          position={position}
          clickable
          onMouseOver={() => setOpen(true)}
          onClick={() => setOpen(!open)}
          image={{
            src: "/images/kakao-map/clicked-location.gif",
            size: { width: 48, height: 48 },
          }}
        />
        {open && (
          <CustomOverlayMap position={position} clickable>
            <RippleButton className="absolute -top-20 right-1/2 translate-x-1/2">
              {name}
            </RippleButton>
          </CustomOverlayMap>
        )}
      </>
    );
};

interface SearchedMarkerProps {
  keyword: string;
  map: kakao.maps.Map | undefined;
}

const SearchedMarker = ({ keyword, map }: SearchedMarkerProps) => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        const list = [] as Marker[];

        data.map((item) => {
          const lat = Number(item.y);
          const lng = Number(item.x);
          list.push({
            position: {
              lat,
              lng,
            },
            id: item.id,
            name: item.place_name,
            address: item.address_name,
            roadAddress: item.road_address_name,
            url: item.place_url,
            phone: item.phone,
            group: item.category_group_name,
            category: item.category_name,
          });
          bounds.extend(new kakao.maps.LatLng(lat, lng));
        });
        setMarkers(list);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [keyword, map]);

  return (
    <>
      {markers.map((marker) => (
        <Fragment key={`marker-${marker.id}`}>
          <MapMarker position={marker.position} />
          <CustomOverlayMap position={marker.position} clickable>
            <Popover>
              <PopoverTrigger className="w-7 h-10 bg-transparent absolute bottom-1/2 right-1/2 translate-x-1/2 rounded-full cursor-pointer" />
              <PopoverContent
                side="top"
                className="w-fit flex flex-col gap-1 whitespace-nowrap"
              >
                <h2 className="flex items-center">
                  {marker.name}
                  {marker.group && (
                    <b className="ml-2 px-1.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-sm">
                      {marker.group}
                    </b>
                  )}
                </h2>
                <div className="flex items-center gap-1">
                  <div className="mr-1 w-12 py-0.5 flex-center bg-accent text-accent-foreground text-xs font-semibold rounded-sm">
                    지번
                  </div>
                  <p>{marker.address}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="mr-1 w-12 py-0.5 flex-center bg-accent text-accent-foreground text-xs font-semibold rounded-sm">
                    도로명
                  </div>
                  <p>{marker.roadAddress}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="size-3" />
                  <p>{marker.phone}</p>
                </div>
                <a
                  href={marker.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-card-foreground"
                >
                  카카오맵 바로가기
                </a>
              </PopoverContent>
            </Popover>
          </CustomOverlayMap>
        </Fragment>
      ))}
    </>
  );
};
