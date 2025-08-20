import ExpandToggleButton from "@/components/animate-ui/buttons/expandToggleButton";
import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/animate-ui/radix/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/animate-ui/radix/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  MapPin,
  MapPlus,
  Phone,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { getLocalDistanceString } from "../util";
import { Marker, MarkerCardLabelContent, placeToMarker } from "./kakaoMap";

interface SearchInterfaceProps {
  keyword: string | undefined;
  mapRef: RefObject<kakao.maps.Map | null>;
  currentPos?: kakao.maps.LatLng;
}

const SearchInterface = ({
  keyword,
  mapRef,
  currentPos,
}: SearchInterfaceProps) => {
  const map = mapRef.current;

  const isMobile = useIsMobile();
  // For Map Markers
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [pagination, setPagination] = useState<kakao.maps.Pagination>();
  const [page, setPage] = useState(1);
  // For Marker List
  const markerRef = useRef<HTMLButtonElement[] | null[]>([]);
  const radioRef = useRef<HTMLButtonElement[] | null[]>([]);
  const [radioValue, setRadioValue] = useState<string>("");
  const [isListOpen, setIsListOpen] = useState<boolean>(true);

  const search = useCallback(
    (
      keyword: string | undefined,
      page: number,
      map: kakao.maps.Map | null,
      currentPosition: kakao.maps.LatLng | undefined
    ) => {
      // 초기화
      if (!keyword || !map) {
        setMarkers([]);
        setPagination(undefined);
        setPage(1);
        setRadioValue("");
        return;
      }

      const kakaoPlaces = new kakao.maps.services.Places(map);
      const isExpanded = map.getLevel() < 3;
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

              searchedMarkers.push(
                placeToMarker(
                  place,
                  currentPosition && {
                    lat: currentPosition.getLat(),
                    lng: currentPosition.getLng(),
                  }
                )
              );

              if (map) bounds.extend(new kakao.maps.LatLng(lat, lng));
            });

            setMarkers((prev) => [...prev, ...searchedMarkers]);
            setPagination(pagination);

            // 지도의 중심이 검색 영역 범위를 벗어나면 지도 범위를 재설정합니다
            if (map && !bounds.contain(map.getCenter())) map.panTo(bounds);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            if (isExpanded) {
              const ok = confirm(
                "현재 영역 내에 검색 결과가 존재하지 않습니다.\n지도를 원래대로 되돌릴까요?"
              );
              if (ok) map.setLevel(3);
            } else alert("검색 결과가 존재하지 않습니다.");
            setMarkers([
              {
                name: "검색 결과가 존재하지 않습니다.",
                position: { lat: 0, lng: 0 },
              },
            ]);
            return;
          } else if (status === kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
            return;
          }
        },
        {
          page,
          useMapBounds: isExpanded,
          useMapCenter: !isExpanded,
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
      <Collapsible
        open={isListOpen}
        onOpenChange={setIsListOpen}
        className={cn(
          "md:w-60 w-40 absolute md:top-1.5 bottom-16 left-2 z-1 trans-300",
          keyword ? "not-sr-only" : "sr-only"
        )}
      >
        <CollapsibleContent>
          <ScrollArea
            aria-label="scroll area"
            className="mb-1.5 p-2 bg-card/40 backdrop-blur-xs shadow-md rounded-md md:[&>*]:max-h-[50vh] [&>*]:max-h-[25vh]"
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
                  disabled={marker.position.lat === 0}
                  className="max-w-full flex data-[state='checked']:[&_p]:text-primary-foreground data-[state='checked']:bg-primary"
                  onClick={() => {
                    setTimeout(() => {
                      markerRef.current[index]?.click();
                    }, 300);
                  }}
                >
                  <p className="text-card-foreground text-start whitespace-nowrap truncate">
                    {marker.name}
                  </p>
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </ScrollArea>
        </CollapsibleContent>
        <CollapsibleTrigger asChild className="w-full">
          <ExpandToggleButton
            label={isListOpen ? "닫기" : "펼치기"}
            icon={!isMobile ? ArrowDownFromLine : ArrowUpFromLine}
            isExpanded={isListOpen}
            maxWidth={!isMobile ? "100%" : "fit-content"}
            className="bg-card/40 backdrop-blur-xs shadow-md"
          />
        </CollapsibleTrigger>
      </Collapsible>
      {pagination && (
        <SearchMoreButton
          currentPage={page}
          total={pagination.last}
          updatePage={() => setPage((prev) => prev + 1)}
          refresh={() => {
            setMarkers([]);
            setPage(1);
          }}
        />
      )}
      <SearchedMarkers
        markers={markers}
        markerRef={markerRef}
        listItemRef={radioRef}
        updateListItem={setRadioValue}
      />
    </>
  );
};

interface SearchMoreButtonProps {
  currentPage: number;
  total: number;
  updatePage: () => void;
  refresh: () => void;
}
/**
 * 장소 검색 더보기 버튼.
 * 마지막 페이지에서는 현재 화면에서 다시 검색 버튼으로 바뀜.
 */
const SearchMoreButton = ({
  currentPage,
  total,
  updatePage,
  refresh,
}: SearchMoreButtonProps) => {
  const isMobile = useIsMobile();

  const moreButtonContent = useCallback(
    (mobile: boolean) => {
      if (mobile) {
        return <>{`더보기(${currentPage}/${total})`}</>;
      } else {
        return (
          <>
            <MapPlus />
            {`(${currentPage}/${total})`}
          </>
        );
      }
    },
    [currentPage, total]
  );

  const refreshButtonContent = useCallback((mobile: boolean) => {
    if (mobile) {
      return <>다시 검색</>;
    } else {
      return <RefreshCw />;
    }
  }, []);

  if (total > 1)
    return (
      <div className="absolute z-1 md:bottom-1.5 bottom-16 left-1/2 -translate-x-1/2">
        <RippleButton
          variant="secondary"
          size={!isMobile ? "default" : "sm"}
          className="rounded-full"
          onClick={() => {
            if (currentPage < total) updatePage();
            else refresh();
          }}
        >
          {currentPage < total
            ? moreButtonContent(!isMobile)
            : refreshButtonContent(!isMobile)}
        </RippleButton>
      </div>
    );
};

interface SearchedMarkersProps {
  markers: Marker[];
  markerRef: RefObject<HTMLButtonElement[] | null[]>;
  listItemRef: RefObject<any>;
  updateListItem: (value: string) => void;
}
/**
 * 검색된 장소들의 맵 Markers.
 * 클릭하면 상세 정보 팝업 출력.
 */
const SearchedMarkers = ({
  markers,
  markerRef,
  listItemRef,
  updateListItem,
}: SearchedMarkersProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {markers.map((marker, index) => (
        <CustomOverlayMap
          key={`marker_${index}-${marker.id}`}
          position={marker.position}
          clickable
        >
          {!isMobile ? (
            <Popover
              onOpenChange={(open) => {
                if (open) {
                  updateListItem(
                    `${marker.id},${marker.position.lat},${marker.position.lng}`
                  );
                  listItemRef.current[index]?.scrollIntoView({
                    block: "nearest",
                    behavior: "smooth",
                  }); // 해당 요소가 목록에서 보이도록 목록을 스크롤
                } else updateListItem("");
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
                className="w-fit max-w-80 flex flex-col gap-1 whitespace-nowrap cursor-auto select-text"
              >
                <h2 className="my-0 whitespace-normal break-keep">
                  {marker.name}
                </h2>
                <div className="mb-1.5 flex items-center gap-2">
                  {marker.category && (
                    <p className="m-0 px-1.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-sm">
                      {marker.category}
                    </p>
                  )}
                  {marker.distance && (
                    <p className="text-xs font-light text-card-foreground/80">
                      {getLocalDistanceString(marker.distance)}
                    </p>
                  )}
                </div>
                <MarkerCardLabelContent label="지번">
                  <p>{marker.address}</p>
                </MarkerCardLabelContent>
                <MarkerCardLabelContent label="도로명">
                  <p>{marker.roadAddress}</p>
                </MarkerCardLabelContent>
                <div className="inline-flex items-center gap-1">
                  <Phone className="m-0.5 size-4" />
                  <p>{marker.phone}</p>
                </div>
                <a
                  href={marker.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit inline-flex items-center gap-1 text-xs text-card-foreground hover:font-semibold"
                >
                  <div className="relative size-5 rounded-sm overflow-hidden">
                    <Image
                      src="/images/kakao-map/kakaomap-logo.png"
                      alt="모이닷 닷맵 카카오맵 아이콘"
                      sizes="30px"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>카카오맵 바로가기</span>
                </a>
                <RippleButton className="mt-2">마이닷</RippleButton>
              </PopoverContent>
            </Popover>
          ) : (
            <Drawer
              onOpenChange={(open) => {
                if (open) {
                  updateListItem(
                    `${marker.id},${marker.position.lat},${marker.position.lng}`
                  );
                  listItemRef.current[index]?.scrollIntoView({
                    block: "nearest",
                    behavior: "smooth",
                  }); // 해당 요소가 목록에서 보이도록 목록을 스크롤
                } else updateListItem("");
              }}
            >
              <DrawerTrigger
                ref={(el) => {
                  markerRef.current[index] = el;
                }}
                className="group/popover absolute bottom-1/2 right-1/2 translate-x-1/2 cursor-pointer"
              >
                <MapPin className="size-7 fill-secondary stroke-1 stroke-primary hover:animate-jello group-data-[state='open']/popover:fill-primary group-data-[state='open']/popover:stroke-secondary group-data-[state='open']/popover:animate-jello" />
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <div className="flex justify-around items-center gap-4">
                      {marker.category && (
                        <DrawerDescription asChild>
                          <p className="m-0 px-1.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium whitespace-nowrap rounded-sm">
                            {marker.category}
                          </p>
                        </DrawerDescription>
                      )}
                      <DrawerTitle className="break-keep">
                        {marker.name}
                      </DrawerTitle>
                      <DrawerDescription asChild>
                        <p className="text-xs font-light whitespace-nowrap text-card-foreground/80">
                          {marker.distance
                            ? getLocalDistanceString(marker.distance)
                            : "???m"}
                        </p>
                      </DrawerDescription>
                    </div>
                  </DrawerHeader>
                  <div className="px-4 flex flex-col gap-1">
                    <MarkerCardLabelContent label="지번">
                      <p>{marker.address}</p>
                    </MarkerCardLabelContent>
                    <MarkerCardLabelContent label="도로명">
                      <p>{marker.roadAddress}</p>
                    </MarkerCardLabelContent>
                    <div className="inline-flex items-center gap-1">
                      <Phone className="m-0.5 size-4" />
                      <p>{marker.phone}</p>
                    </div>
                    <a
                      href={marker.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit inline-flex items-center gap-1 text-xs text-card-foreground hover:font-semibold"
                    >
                      <div className="relative size-5 rounded-sm overflow-hidden">
                        <Image
                          src="/images/kakao-map/kakaomap-logo.png"
                          alt="모이닷 닷맵 카카오맵 아이콘"
                          sizes="30px"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>카카오맵 바로가기</span>
                    </a>
                  </div>
                  <DrawerFooter>
                    <RippleButton>마이닷</RippleButton>
                    {/* <DrawerClose asChild>
                      <RippleButton variant="outline">닫기</RippleButton>
                    </DrawerClose> */}
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </CustomOverlayMap>
      ))}
    </>
  );
};

export { SearchInterface };
