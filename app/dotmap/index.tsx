"use client";

import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { Forms, FormsInput } from "@/components/forms";
import KakaoMap from "@/components/kakao/map/kakaoMap";
import { useRef, useState } from "react";
import { DotmapSchema } from "./schema";

const Dotmap = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState<string>();

  return (
    <div className="size-full md:p-2 p-0 flex gap-2 md:flex-col flex-col-reverse">
      <Forms
        schema={DotmapSchema}
        className="absolute z-10 p-2 pb-6 h-fit md:w-fit flex-row"
        onSubmit={(value: typeof DotmapSchema._type) => {
          setSearch(value.keyword);
        }}
      >
        <FormsInput
          ref={inputRef}
          name="keyword"
          className="md:w-60 bg-card/20 backdrop-blur-xs shadow-sm rounded-md border-0 [&_*]:bg-transparent dark:[&_*]:bg-transparent"
        />
        <RippleButton className="w-20" onClick={() => setSearch(undefined)}>
          검색
        </RippleButton>
      </Forms>
      <KakaoMap
        keyword={search}
        onClick={() => inputRef.current?.blur()}
        className="relative z-1"
      />
    </div>
  );
};

export default Dotmap;
