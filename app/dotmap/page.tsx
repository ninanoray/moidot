import KakaoMapScript from "@/script/KakaoMapScript";
import { Metadata } from "next";
import Dotmap from ".";

export const metadata: Metadata = {
  title: "모이닷 - 닷맵",
  description: "닷맵에서 마이닷",
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
