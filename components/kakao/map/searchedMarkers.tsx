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
import { MapPin, Phone } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { calcDistance, getLocalDistanceString } from "../util";
import { Marker, MarkerCardLabelContent, Position } from "./kakaoMap";

interface SearchedMarkersProps {
  keyword: string;
  map: kakao.maps.Map | undefined;
  currentPos?: Position;
}

const SearchedMarkers = ({
  keyword,
  map,
  currentPos,
}: SearchedMarkersProps) => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [pagination, setPagination] = useState<kakao.maps.Pagination>();
  const [page, setPage] = useState(1);

  const search = useCallback(
    (
      keyword: string,
      page: number,
      map: kakao.maps.Map | undefined,
      currentPosition: Position | undefined
    ) => {
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

              searchedMarkers.push(placeToMarker(place, currentPosition));
              if (map) bounds.extend(new kakao.maps.LatLng(lat, lng));
            });

            setMarkers((prev) => [...prev, ...searchedMarkers]);
            setPagination(pagination);

            // 지도의 중심이 검색 영역 범위를 벗어나면 지도 범위를 재설정합니다
            if (map && !bounds.contain(map.getCenter())) map.setBounds(bounds);
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
      <div className="absolute top-2 left-2 z-1">
        <ScrollArea className="h-120 p-4 bg-card/65 backdrop-blur-xs shadow-md rounded-md">
          <RadioGroup
            onValueChange={(value) => {
              if (map) {
                const bounds = map.getBounds();
                const markerLatLng = new kakao.maps.LatLng(
                  Number(value.split(",")[1]),
                  Number(value.split(",")[2])
                );
                if (!bounds.contain(markerLatLng)) map.setCenter(markerLatLng);
              }
              document.getElementById(`marker_${value.split(",")[0]}`)?.click();
            }}
          >
            {markers.map((marker, index) => (
              <div key={`list_${index}-${marker.id}`}>
                <RadioGroupItem
                  id={`${index}-${marker.id}`}
                  value={`${marker.id},${marker.position.lat},${marker.position.lng}`}
                  className="hidden data-[state='checked']:[&~label]:bg-card-foreground/50 data-[state='checked']:[&~label]:text-card"
                >
                  <p className="text-inherit text-start whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {marker.name}
                  </p>
                </RadioGroupItem>
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>
      </div>

      {markers.map((marker, index) => (
        <CustomOverlayMap
          key={`marker_${index}-${marker.id}`}
          position={marker.position}
          clickable
        >
          <Popover>
            <PopoverTrigger
              id={`marker_${marker.id}`}
              className="group/popover absolute bottom-1/2 right-1/2 translate-x-1/2 cursor-pointer"
            >
              <MapPin className="size-7 fill-secondary stroke-1 stroke-primary group-data-[state='open']/popover:fill-primary group-data-[state='open']/popover:stroke-secondary group-data-[state='open']/popover:animate-jello" />
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
      {pagination &&
        pagination.last > 1 &&
        (page < pagination.last ? (
          <RippleButton
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-1"
            onClick={() => {
              if (page < pagination.last) setPage(page + 1);
            }}
          >{`더보기(${page}/${pagination.last})`}</RippleButton>
        ) : (
          <RippleButton
            variant="secondary"
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-1"
            onClick={() => {
              setMarkers([]);
              setPage(1);
            }}
          >
            초기화
          </RippleButton>
        ))}
    </>
  );
};

export default SearchedMarkers;

export function placeToMarker(
  place: kakao.maps.services.PlacesSearchResultItem,
  currentPosition?: Position | undefined
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
    group: place.category_group_name,
    category: place.category_name,
    distance: calcDistance(currentPosition, { lat, lng }), // 현재 위치와 마커 사이의 거리
  };
}
