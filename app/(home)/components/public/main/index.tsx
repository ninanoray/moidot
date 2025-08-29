import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { WritingText } from "@/components/animate-ui/text/writing";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useState } from "react";

interface PublicHomeMainProps {
  scroll: number;
}

const PublicHomeMain = ({ scroll: scrollPosition }: PublicHomeMainProps) => {
  const [autoSlide, setAutoSlide] = useState(true);

  return (
    <main className="flex-auto">
      <div className="size-full p-2 flex flex-col justify-end gap-4">
        <WritingText
          text="Connect the Dots, draw the Dules, and gather into the Moim"
          split=","
          spacing={8}
          className="px-1 md:text-3xl text-2xl text-foreground/60 font-semibold"
        />
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: !autoSlide,
            }),
          ]}
          onMouseOver={() => setAutoSlide(false)}
          onMouseLeave={() => setAutoSlide(true)}
          className={cn(
            "relative size-full rounded-lg shadow-lg overflow-hidden mobile [&_div]:size-full",
            "[&_section]:size-full [&_section]:p-6 [&_section]:flex-center [&_section]:flex-col [&_section]:justify-around [&_section]:break-keep [&_section]:trans-100",
            "[&_h1]:md:text-4xl [&_h1]:text-3xl [&_h1]:text-inherit",
            "[&_h2]:md:text-3xl [&_h2]:text-2xl [&_h2]:text-inherit"
          )}
          style={{ height: `calc(100% - ${scrollPosition}px)` }}
        >
          <CarouselContent className="max-w-[calc(100vw-16px)] m-0 ">
            <CarouselItem className="p-0">
              <section className="relative bg-white">
                <Image
                  src="/images/moidot/moidot-bg-white.png"
                  alt="모이닷"
                  sizes="80vw"
                  fill
                  className="object-contain"
                />
              </section>
            </CarouselItem>
            <CarouselItem className="p-0">
              <section className="bg-tertiary text-tertiary-foreground">
                <h2>모임</h2>
                <h1>&quot;잇고 모여서, 계속 이어지는 모임&quot;</h1>
              </section>
            </CarouselItem>
            <CarouselItem className="p-0">
              <section className="bg-secondary text-secondary-foreground">
                <h2>줄</h2>
                <h1>&quot;순간과 순간을 잇는 스케줄&quot;</h1>
              </section>
            </CarouselItem>
            <CarouselItem className="p-0">
              <section className="bg-primary text-primary-foreground">
                <h2>닷</h2>
                <h1>&quot;모든 순간의 시작점&quot;</h1>
              </section>
            </CarouselItem>
          </CarouselContent>
          <CarouselIndicator />
        </Carousel>
      </div>
      <div className="w-full h-60 p-2 pt-0 flex gap-2 md:flex-row flex-col">
        <RippleButton
          size="lg"
          className="group/button relative flex-1 h-full p-0 md:text-4xl text-3xl rounded-lg shadow-lg hover:brightness-100 active:scale-98"
        >
          <a href="/dotmap" className="size-full grid items-center z-10">
            닷맵
          </a>
          <Image
            src="/images/banner/dotmap.png"
            alt="닷맵"
            sizes="50vw"
            fill
            className="absolute object-cover md:group-hover/button:scale-110 md:group-hover/button:brightness-50 group-active/button:scale-110 group-active/button:brightness-50 brightness-80 trans-300"
          />
        </RippleButton>
        <RippleButton
          variant="secondary"
          size="lg"
          className="group/button relative flex-1 h-full p-0 md:text-4xl text-3xl rounded-lg shadow-lg hover:brightness-100 active:scale-98"
        >
          <a href="#" className="size-full grid items-center z-10">
            마이닷
          </a>
          <Image
            src="/images/banner/mydot.png"
            alt="마이닷"
            sizes="50vw"
            fill
            className="absolute object-cover md:group-hover/button:scale-110 md:group-hover/button:brightness-50 group-active/button:scale-110 group-active/button:brightness-50 brightness-80 trans-300"
          />
        </RippleButton>
      </div>
    </main>
  );
};

export default PublicHomeMain;
