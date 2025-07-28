import KakaoMapScript from "@/script/KakaoMapScript";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <KakaoMapScript />
      {children}
    </>
  );
};

export default layout;
