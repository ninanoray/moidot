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
    <div className="bg-layout md:p-2 p-0 gap-2 md:flex-col flex-col-reverse">
      <Forms
        schema={DotmapSchema}
        className="md:static absolute z-10 md:p-0 px-2 pb-4 h-fit flex-row"
        onSubmit={(value: typeof DotmapSchema._type) => {
          setSearch(value.keyword);
        }}
      >
        <FormsInput ref={inputRef} name="keyword" />
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
