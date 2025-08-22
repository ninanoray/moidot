import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/animate-ui/radix/popover";
import { Forms, FormsSelect } from "@/components/forms";
import {
  Marker,
  MarkerCardLabelContent,
  placeToMarker,
  Position,
} from "@/components/kakao/map/kakaoMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MapPinOff } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import z from "zod";

export type Dot = {
  id: string;
  kakaoMapId: string;
  name: string;
  position: Position;
  category: string;
  categoryCode: string;
  creator: User;
  dulitsCount: number;
  likesCount: number;
};

export enum CategoryCode {
  대형마트 = "MT1",
  편의점 = "CS2",
  "어린이집, 유치원" = "PS3",
  학교 = "SC4",
  학원 = "AC5",
  주차장 = "PK6",
  "주유소, 충전소" = "OL7",
  지하철역 = "SW8",
  은행 = "BK9",
  문화시설 = "CT1",
  중개업소 = "AG2",
  공공기관 = "PO3",
  관광명소 = "AT4",
  숙박 = "AD5",
  음식점 = "FD6",
  카페 = "CE7",
  병원 = "HP8",
  약국 = "PM9",
}

export enum CustomCategoryCode {
  전시회 = "XH1",
  방탈출 = "RX2",
  보드게임 = "BG3",
  레져 = "SP4",
}

interface CreateMydotMarkerProps {
  marker: Marker;
  updateMarker: (marker: Marker | undefined) => void;
}

const CreateMydotMarker = ({
  marker,
  updateMarker,
}: CreateMydotMarkerProps) => {
  const { data: session } = useSession();

  const [open, setOpen] = useState<boolean>(true);
  const [searchedMarkers, setSearchedMarkers] = useState<Marker[]>([]);
  const [pagination, setPagination] = useState<kakao.maps.Pagination>();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>();
  const [tab, setTab] = useState<string>("place");

  const markerSelection = searchedMarkers.map((marker) => ({
    value: JSON.stringify(marker),
    label: marker.name,
  }));
  const markerEnum = markerSelection.map(
    (marker) => marker.value
  ) as unknown as readonly [string, ...string[]];

  const categorySelection = Object.entries({
    ...CategoryCode,
    ...CustomCategoryCode,
  }).map((item) => ({
    value: item[1],
    label: item[0],
  }));

  const MydotMarkerSchema = z.object({
    marker: z.enum(markerEnum, {
      required_error: "장소를 선택해주세요.",
    }),
    category: z
      .nativeEnum({ ...CategoryCode, ...CustomCategoryCode })
      .optional(),
  });

  const search = useCallback(
    (
      keyword: string,
      page: number,
      callback: (markers: Marker[], pagination: kakao.maps.Pagination) => void
    ) => {
      const kakaoPlaces = new kakao.maps.services.Places();
      kakaoPlaces.keywordSearch(
        keyword,
        (places, status, pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            if (page > pagination.last) return;
            callback(
              places.map((place) => placeToMarker(place)),
              pagination
            );
          }
        },
        {
          page: page,
        }
      );
    },
    []
  );

  useEffect(() => {
    if (marker.roadAddress) {
      search(marker.roadAddress, page, (markers, pagination) => {
        setSearchedMarkers((prev) => [...prev, ...markers]);
        setPagination(pagination);
      });
    } else {
      if (marker.address) {
        search(marker.address, page, (markers, pagination) => {
          setSearchedMarkers((prev) => [...prev, ...markers]);
          setPagination(pagination);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  if (marker.position) {
    return (
      <CustomOverlayMap clickable position={marker.position}>
        <Popover
          open={open}
          onOpenChange={(open) => {
            setOpen(open);
          }}
        >
          <PopoverTrigger
            onMouseOver={() => setOpen(true)}
            className="-translate-y-[35%] rounded-full cursor-pointer focus-visible:ring-0"
          >
            <DotLottieReact
              src="images/kakao-map/clicked-location.lottie"
              loop
              autoplay
              className="size-12"
            />
          </PopoverTrigger>
          <PopoverContent side="top" sideOffset={4} className="w-auto p-2">
            <Forms
              schema={MydotMarkerSchema}
              onSubmit={(data: typeof MydotMarkerSchema._type) => {
                const marker = JSON.parse(data.marker) as Marker;
                const dot = {
                  kakaoMapId: marker.id,
                  name: marker.name,
                  position: marker.position,
                  category: marker.category || data.category,
                  categoryCode:
                    marker.categoryCode ||
                    categorySelection.find(
                      (item) => item.value === data.category
                    )?.label,
                  creator: session?.user,
                } as Dot;
                console.log(dot);
              }}
            >
              <Tabs
                value={tab}
                onValueChange={setTab}
                className="w-fit md:max-w-80 max-w-64"
              >
                <TabsContent
                  value="place"
                  className="flex flex-col gap-1 whitespace-nowrap cursor-auto select-text"
                >
                  <MarkerCardLabelContent label="지번">
                    <p>{marker.address}</p>
                  </MarkerCardLabelContent>
                  {marker.roadAddress && (
                    <MarkerCardLabelContent label="도로명">
                      <p>{marker.roadAddress}</p>
                    </MarkerCardLabelContent>
                  )}
                  {category && (
                    <MarkerCardLabelContent label="카테고리">
                      <p>{category}</p>
                    </MarkerCardLabelContent>
                  )}
                  <FormsSelect
                    message={false}
                    name="marker"
                    items={markerSelection}
                    placeholder={
                      searchedMarkers.length > 0
                        ? `장소를 선택해주세요`
                        : "검색된 결과가 없습니다"
                    }
                    onValueChange={(value) => {
                      const marker = JSON.parse(value) as Marker;
                      updateMarker(marker);
                      setCategory(marker.category);
                    }}
                  >
                    {pagination && page < pagination.last && (
                      <RippleButton
                        variant="outline"
                        className="w-full h-6 border-0 text-foreground/60 hover:bg-accent hover:text-accent-foreground/75"
                        onViewportEnter={() => {
                          if (page < pagination.last) setPage(page + 1);
                        }}
                      >
                        {`더보기(${page}/${pagination.last})`}
                      </RippleButton>
                    )}
                  </FormsSelect>
                </TabsContent>
                <TabsContent value="category">
                  <FormsSelect
                    label="카테고리를 동록하시겠습니까?"
                    message={false}
                    name="category"
                    items={categorySelection}
                    placeholder="카테고리를 선택해주세요"
                  />
                </TabsContent>
                <div className="flex gap-1">
                  <TabsList className="w-full">
                    <TabsTrigger
                      value="place"
                      onClick={() => setCategory(undefined)}
                      className={cn(
                        "cursor-pointer",
                        tab === "category"
                          ? "not-sr-only h-full"
                          : "sr-only h-full"
                      )}
                    >
                      뒤로
                    </TabsTrigger>
                    {category !== "" || tab === "category" ? (
                      <RippleButton className="flex-auto">
                        여기에 마이닷
                      </RippleButton>
                    ) : (
                      <TabsTrigger type="button" value="category" asChild>
                        <RippleButton className="w-full h-9 text-primary-foreground">
                          여기에 마이닷
                        </RippleButton>
                      </TabsTrigger>
                    )}
                  </TabsList>
                  <RippleButton
                    size="icon"
                    variant="destructive"
                    onClick={() => updateMarker(undefined)}
                  >
                    <MapPinOff />
                  </RippleButton>
                </div>
              </Tabs>
            </Forms>
          </PopoverContent>
        </Popover>
      </CustomOverlayMap>
    );
  }
};
export default CreateMydotMarker;
