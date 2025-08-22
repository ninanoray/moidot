"use client";

import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Public = () => {
  return (
    <div className="bg-layout p-0 bg-moidot bg-size-[200px] bg-no-repeat">
      <header className="w-full px-3 sat sticky top-0 z-50 flex justify-between items-center bg-card shadow-md">
        <h1 className="text-primary dark:text-card-foreground">MOIDOT</h1>
        <RippleButton>
          <a href="/login">시작하기</a>
        </RippleButton>
      </header>
      <main className="p-2 flex-auto flex flex-col">
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="size-full shrink-0 [&_div]:size-full [&_section]:size-full [&_section]:flex-center [&_section]:flex-col [&_section]:rounded-lg [&_section]:shadow-lg"
        >
          <CarouselContent className="-ml-2">
            <CarouselItem className="py-1">
              <section className="bg-white">
                <h3 className="text-3xl font-bold">MOIDOT</h3>
                <h2 className="text-4xl font-semibold">
                  Connect the Dots, draw the Dules, and gather into a Moim
                </h2>
              </section>
            </CarouselItem>
            <CarouselItem className="py-1">
              <section className="bg-white">
                <h3 className="text-3xl font-bold">모임</h3>
                <h2 className="text-4xl font-semibold">
                  잇고 모여서, 계속 이어지는 모임
                </h2>
              </section>
            </CarouselItem>
            <CarouselItem className="py-1">
              <section className="bg-white">
                <h3 className="text-3xl font-bold">줄</h3>
                <h2 className="text-4xl font-semibold">
                  순간과 순간을 잇는 스케-줄
                </h2>
              </section>
            </CarouselItem>
            <CarouselItem className="py-1">
              <section className="bg-white">
                <h3 className="text-3xl font-bold">닷</h3>
                <h2 className="text-4xl font-semibold">모든 순간의 시작</h2>
              </section>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="w-full h-60 p-1.5 pb-2.5 shrink-0 flex gap-2">
          <RippleButton
            size="lg"
            className="flex-auto h-full text-3xl shadow-lg active:scale-98"
          >
            닷맵
          </RippleButton>
          <RippleButton
            variant="secondary"
            size="lg"
            className="flex-auto h-full text-3xl shadow-lg active:scale-98"
          >
            줄릿
          </RippleButton>
        </div>
      </main>
    </div>
  );
};

export default Public;
