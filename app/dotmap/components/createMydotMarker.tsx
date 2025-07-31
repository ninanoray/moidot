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
} from "@/components/kakao/map/kakaoMap";
import { searchMarkers } from "@/components/kakao/map/searchedMarkers";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import z from "zod";

interface CreateMydotMarkerProps {
  marker: Marker;
}

const CreateMydotMarker = ({ marker }: CreateMydotMarkerProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [searchedMarkers, setSearchedMarkers] = useState<Marker[]>([]);

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

  useEffect(() => {
    const _ = undefined;
    if (marker.roadAddress)
      searchMarkers(marker.roadAddress, _, _, _, setSearchedMarkers);
    else {
      if (marker.address)
        searchMarkers(marker.address, _, _, _, setSearchedMarkers);
    }
  }, [marker.address, marker.roadAddress]);

  if (marker.position) {
    return (
      <CustomOverlayMap clickable position={marker.position}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            onMouseOver={() => setOpen(true)}
            className="rounded-full cursor-pointer focus-visible:ring-0"
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
            {marker.roadAddress && (
              <MarkerCardLabelContent
                label="도로명"
                content={marker.roadAddress}
              />
            )}
            <Forms schema={MydotMarkerSchema}>
              <FormsSelect
                name="marker"
                items={markerSelection}
                placeholder={
                  searchedMarkers.length > 0
                    ? "장소를 선택해주세요"
                    : "검색된 결과가 없습니다"
                }
                message={false}
              />
              <RippleButton>{marker.name}</RippleButton>
            </Forms>
          </PopoverContent>
        </Popover>
      </CustomOverlayMap>
    );
  }
};
export default CreateMydotMarker;
