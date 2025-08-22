"use client";

import PublicHomeHeader from "./components/public/header";
import PublicHomeMain from "./components/public/main";

const Public = () => {
  return (
    <div className="bg-layout p-0 bg-moidot bg-size-[200px] bg-no-repeat">
      <PublicHomeHeader />
      <PublicHomeMain />
    </div>
  );
};

export default Public;
