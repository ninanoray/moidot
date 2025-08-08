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
    <div className="bg-layout gap-2 md:flex-col flex-col-reverse">
      <Forms
        schema={DotmapSchema}
        className="h-fit flex-row"
        onSubmit={(value: typeof DotmapSchema._type) => {
          setSearch(value.keyword);
        }}
      >
        <FormsInput ref={inputRef} name="keyword" />
        <RippleButton className="w-20" onClick={() => setSearch(undefined)}>
          검색
        </RippleButton>
      </Forms>
      <KakaoMap keyword={search} onClick={() => inputRef.current?.blur()} />
    </div>
  );
};

export default Dotmap;
