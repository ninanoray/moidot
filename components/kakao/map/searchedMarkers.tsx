import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/animate-ui/radix/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MapPin, Phone } from "lucide-react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { getLocalDistanceString } from "../util";
import { Marker, MarkerCardLabelContent, placeToMarker } from "./kakaoMap";

interface SearchedMarkersProps {
  keyword: string | undefined;
  mapRef: RefObject<kakao.maps.Map | null>;
  currentPos?: kakao.maps.LatLng;
}

const SearchedMarkers = ({
  keyword,
  mapRef,
  currentPos,
}: SearchedMarkersProps) => {
  const map = mapRef.current;
  // For Map Markers
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [pagination, setPagination] = useState<kakao.maps.Pagination>();
  const [page, setPage] = useState(1);
  // For Marker List
  const markerRef = useRef<HTMLButtonElement[] | null[]>([]);
  const radioRef = useRef<HTMLButtonElement[] | null[]>([]);
  const [radioValue, setRadioValue] = useState<string>("");

  const search = useCallback(
    (
      keyword: string | undefined,
      page: number,
      map: kakao.maps.Map | null,
      currentPosition: kakao.maps.LatLng | undefined
    ) => {
      if (!keyword || !map) {
        setMarkers([]);
        setPagination(undefined);
        setPage(1);
        setRadioValue("");
        return;
      }
      const kakaoPlaces = new kakao.maps.services.Places(map);
      kakaoPlaces.keywordSearch(
        keyword,
        (places, status, pagination) => {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          const searchedMarkers = [] as Marker[];

          if (status === kakao.maps.services.Status.OK) {
            places.map((place) => {
              const lat = Number(place.y);
              const lng = Number(place.x);

              if (currentPosition)
                searchedMarkers.push(
                  placeToMarker(place, {
                    lat: currentPosition.getLat(),
                    lng: currentPosition.getLng(),
                  })
                );
              if (map) bounds.extend(new kakao.maps.LatLng(lat, lng));
            });

            setMarkers((prev) => [...prev, ...searchedMarkers]);
            setPagination(pagination);

            // 지도의 중심이 검색 영역 범위를 벗어나면 지도 범위를 재설정합니다
            if (map && !bounds.contain(map.getCenter())) map.panTo(bounds);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
            return;
          } else if (status === kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
            return;
          }
        },
        {
          page: page,
          // useMapBounds: true,
          useMapCenter: true,
        }
      );
    },
    []
  );

  useEffect(() => {
    search(keyword, page, map, currentPos);
  }, [currentPos, keyword, map, page, search]);

  return (
    <>
      {/* 검색 List */}
      <div className="absolute top-2 left-2 z-1">
        <ScrollArea
          aria-label="scroll area"
          className={cn(
            "w-68 bg-card/65 backdrop-blur-xs shadow-md rounded-md trans-300",
            markers.length > 10 ? "h-120" : "h-auto",
            keyword ? "not-sr-only p-4" : "sr-only"
          )}
        >
          <RadioGroup
            value={radioValue}
            onValueChange={(value) => {
              setRadioValue(value);
              if (map) {
                const markerLatLng = new kakao.maps.LatLng(
                  Number(value.split(",")[1]),
                  Number(value.split(",")[2])
                );
                map.panTo(markerLatLng);
              }
            }}
          >
            {markers.map((marker, index) => (
              <RadioGroupItem
                key={`list_${index}-${marker.id}`}
                ref={(el) => {
                  radioRef.current[index] = el;
                }}
                value={`${marker.id},${marker.position.lat},${marker.position.lng}`}
                className="w-60 block"
                onClick={() => {
                  setTimeout(() => {
                    markerRef.current[index]?.click();
                  }, 300);
                }}
              >
                <p className="text-inherit text-start whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {marker.name}
                </p>
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </ScrollArea>
        {pagination &&
          pagination.last > 1 &&
          (page < pagination.last ? (
            <RippleButton
              className="w-full mt-1"
              onClick={() => {
                if (page < pagination.last) setPage((prev) => prev + 1);
              }}
            >{`더보기(${page}/${pagination.last})`}</RippleButton>
          ) : (
            <RippleButton
              variant="secondary"
              className="w-full mt-1"
              onClick={() => {
                setMarkers([]);
                setPage(1);
              }}
            >
              초기화
            </RippleButton>
          ))}
      </div>
      {/* 검색 Markers */}
      {markers.map((marker, index) => (
        <CustomOverlayMap
          key={`marker_${index}-${marker.id}`}
          position={marker.position}
          clickable
        >
          <Popover
            onOpenChange={(open) => {
              if (open) {
                setRadioValue(
                  `${marker.id},${marker.position.lat},${marker.position.lng}`
                );
                radioRef.current[index]?.scrollIntoView({
                  block: "nearest",
                  behavior: "smooth",
                }); // 해당 요소가 목록에서 보이도록 목록을 스크롤
              } else setRadioValue("");
            }}
          >
            <PopoverTrigger
              ref={(el) => {
                markerRef.current[index] = el;
              }}
              className="group/popover absolute bottom-1/2 right-1/2 translate-x-1/2 cursor-pointer"
            >
              <MapPin className="size-7 fill-secondary stroke-1 stroke-primary hover:animate-jello group-data-[state='open']/popover:fill-primary group-data-[state='open']/popover:stroke-secondary group-data-[state='open']/popover:animate-jello" />
            </PopoverTrigger>
            <PopoverContent
              side="top"
              className="w-fit p-4 flex flex-col gap-1 whitespace-nowrap cursor-auto select-text"
            >
              <div className="flex justify-between items-center gap-2">
                <h2>
                  {marker.name}
                  {marker.distance && (
                    <span className="mx-1.5 text-xs font-light text-card-foreground/80">
                      {getLocalDistanceString(marker.distance)}
                    </span>
                  )}
                </h2>
                {marker.group && (
                  <p className="m-0 px-1.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-sm">
                    {marker.group}
                  </p>
                )}
              </div>
              <MarkerCardLabelContent label="지번" content={marker.address} />
              <MarkerCardLabelContent
                label="도로명"
                content={marker.roadAddress}
              />
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
      ))}
    </>
  );
};

export default SearchedMarkers;
