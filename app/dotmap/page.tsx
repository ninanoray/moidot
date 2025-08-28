import { META } from "@/constants/metadata";
import KakaoMapScript from "@/script/KakaoMapScript";
import { Metadata } from "next";
import Dotmap from ".";

export const metadata: Metadata = {
  title: "모이닷 - 닷맵",
  description: "닷맵에서 마이닷",
  metadataBase: new URL(META.base),
  alternates: {
    canonical: "/",
  },
};

const dotmap = () => {
  return (
    <>
      <KakaoMapScript />
      <Dotmap />
    </>
  );
};

export default dotmap;
