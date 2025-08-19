"use client";

import Image from "next/image";

const Public = () => {
  return (
    <div className="bg-layout">
      <div className="relative my-auto self-center size-1/3">
        <Image
          src="/images/moidot/icon.png"
          alt="icon"
          priority
          fill
          sizes="50vw"
          className="object-contain mobile"
        />
      </div>
    </div>
  );
};

export default Public;
