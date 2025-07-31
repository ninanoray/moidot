import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import {
  Marker,
  MarkerCardLabelContent,
} from "@/components/kakao/map/kakaoMap";
import { searchMarkers } from "@/components/kakao/map/searchedMarkers";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";

interface ClickedMarkerProps {
  marker: Marker;
}

const ClickedMarker = ({ marker }: ClickedMarkerProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchedMarkers, setSearchedMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    if (marker.address)
      searchMarkers(marker.address, undefined, undefined, setSearchedMarkers);
  }, [marker.address]);

  if (marker.position) {
    return (
      <>
        <MapMarker
          position={marker.position}
          clickable
          onMouseOver={() => setOpen(true)}
          onClick={() => setOpen(!open)}
          image={{
            src: "/images/kakao-map/clicked-location.gif",
            size: { width: 48, height: 48 },
          }}
        />
        {open && (
          <CustomOverlayMap position={marker.position} clickable>
            <div className="absolute -top-40 right-1/2 translate-x-1/2 p-2 flex flex-col gap-2 bg-card rounded-lg cursor-auto select-text">
              <MarkerCardLabelContent label="지번" content={marker.address} />
              {marker.roadAddress && (
                <MarkerCardLabelContent
                  label="도로명"
                  content={marker.roadAddress}
                />
              )}
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      searchedMarkers.length > 0
                        ? "장소를 선택해주세요"
                        : "검색 결과가 없습니다"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {searchedMarkers.map((marker) => (
                    <SelectItem key={marker.id} value={JSON.stringify(marker)}>
                      {marker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <RippleButton>{marker.name}</RippleButton>
            </div>
          </CustomOverlayMap>
        )}
      </>
    );
  }
};
export default ClickedMarker;
