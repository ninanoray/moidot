"use client";

import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { Forms, FormsInput } from "@/components/forms";
import KakaoMap from "@/components/kakao/kakaoMap";
import { useState } from "react";
import { DotmapSchema } from "./schema";

const Dotmap = () => {
  const [search, setSearch] = useState<string>();
  return (
    <div className="bg-layout flex flex-col">
      <Forms
        schema={DotmapSchema}
        className="h-fit flex-row"
        onSubmit={(value: typeof DotmapSchema._type) =>
          setSearch(value.keyword)
        }
      >
        <FormsInput name="keyword" label="검색" hidelabel />
        <RippleButton>검색</RippleButton>
      </Forms>
      <KakaoMap keyword={search} />
    </div>
  );
};

export default Dotmap;
