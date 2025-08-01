import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/animate-ui/radix/popover";
import { Phone } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
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

  useEffect(() => {
    searchMarkers(
      keyword,
      page,
      map,
      currentPos,
      (searchedMarkers, pagination) => {
        setMarkers([...markers, ...searchedMarkers]);
        setPagination(pagination);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPos, keyword, map, page]);

  return (
    <>
      {markers.map((marker, index) => (
        <Fragment key={`marker_${index}-${marker.id}`}>
          <MapMarker position={marker.position} />
          <CustomOverlayMap position={marker.position} clickable>
            <Popover>
              <PopoverTrigger className="w-7 h-10 bg-transparent absolute bottom-1/2 right-1/2 translate-x-1/2 rounded-full cursor-pointer" />
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
        </Fragment>
      ))}
      {pagination &&
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
              setPage(1);
              setMarkers([]);
            }}
          >
            초기화
          </RippleButton>
        ))}
    </>
  );
};

export default SearchedMarkers;

export function searchMarkers(
  keyword: string,
  page?: number | undefined,
  map?: kakao.maps.Map | undefined,
  currentPosition?: Position | undefined,
  callback?: (markers: Marker[], pagination?: kakao.maps.Pagination) => void
) {
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
      }

      if (callback) callback(searchedMarkers, pagination);

      // 지도의 중심이 검색 영역 범위를 벗어나면 지도 범위를 재설정합니다
      if (map && !bounds.contain(map.getCenter())) map.setBounds(bounds);

      return searchedMarkers;
    },
    {
      useMapCenter: true, // 지도의 중심 기준으로 검색
      page: page,
    }
  );

  function placeToMarker(
    place: kakao.maps.services.PlacesSearchResultItem,
    currentPosition: Position | undefined
  ) {
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
}
