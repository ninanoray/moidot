import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

const PublicHomeMain = () => {
  return (
    <main className="p-2 flex-auto flex flex-col gap-2">
      <Carousel
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
        className={cn(
          "shrink-0 size-full my-0.5 bg-card rounded-lg shadow-lg [&_div]:size-full",
          "[&_section]:size-full [&_section]:p-6 [&_section]:flex-center [&_section]:flex-col [&_section]:break-keep",
          "[&_h1]:sm:text-4xl [&_h1]:text-3xl",
          "[&_h2]:sm:text-3xl [&_h2]:text-2xl [&_h2]:text-secondary"
        )}
      >
        <CarouselContent>
          <CarouselItem>
            <section>
              <h2>모임</h2>
              <h1>잇고 모여서, 계속 이어지는 모임</h1>
            </section>
          </CarouselItem>
          <CarouselItem>
            <section>
              <h2>줄</h2>
              <h1>순간과 순간을 잇는 스케-줄</h1>
            </section>
          </CarouselItem>
          <CarouselItem>
            <section>
              <h2>닷</h2>
              <h1>모든 순간의 시작</h1>
            </section>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="w-full h-60 pb-2 shrink-0 flex gap-2.5">
        <RippleButton
          size="lg"
          className="flex-auto h-full text-3xl rounded-lg shadow-lg active:scale-98"
        >
          닷맵
        </RippleButton>
        <RippleButton
          variant="secondary"
          size="lg"
          className="flex-auto h-full text-3xl rounded-lg shadow-lg active:scale-98"
        >
          줄릿
        </RippleButton>
      </div>
    </main>
  );
};

export default PublicHomeMain;
