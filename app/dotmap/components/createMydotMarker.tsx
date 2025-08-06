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
} from "@/components/kakao/map/kakaoMap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useCallback, useEffect, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import z from "zod";

interface CreateMydotMarkerProps {
  marker: Marker;
  updateMarker: (marker: Marker) => void;
}

const CreateMydotMarker = ({
  marker,
  updateMarker,
}: CreateMydotMarkerProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [searchedMarkers, setSearchedMarkers] = useState<Marker[]>([]);
  const [pagination, setPagination] = useState<kakao.maps.Pagination>();
  const [page, setPage] = useState(1);

  const markerSelection = searchedMarkers.map((marker) => ({
    value: JSON.stringify(marker),
    label: marker.name,
  }));
  const markerEnum = markerSelection.map(
    (marker) => marker.value
  ) as unknown as readonly [string, ...string[]];

  const MydotMarkerSchema = z.object({
    marker: z.enum(markerEnum, {
      required_error: "장소를 선택해주세요.",
    }),
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
          <PopoverContent
            side="top"
            sideOffset={4}
            className="w-fit p-2 flex flex-col gap-2 whitespace-nowrap cursor-auto select-text"
          >
            <MarkerCardLabelContent label="지번" content={marker.address} />
            <MarkerCardLabelContent
              label="도로명"
              content={marker.roadAddress}
            />
            <Forms schema={MydotMarkerSchema}>
              <FormsSelect
                message={false}
                name="marker"
                items={searchedMarkers.map((marker) => ({
                  value: JSON.stringify(marker),
                  label: marker.name,
                }))}
                placeholder={
                  searchedMarkers.length > 0
                    ? `장소를 선택해주세요`
                    : "검색된 결과가 없습니다"
                }
                onValueChange={(value) => {
                  updateMarker(JSON.parse(value));
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
              <RippleButton>{`${marker.name}에 마이닷`}</RippleButton>
            </Forms>
          </PopoverContent>
        </Popover>
      </CustomOverlayMap>
    );
  }
};
export default CreateMydotMarker;
