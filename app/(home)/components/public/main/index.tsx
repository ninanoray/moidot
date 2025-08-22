import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { WritingText } from "@/components/animate-ui/text/writing";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

interface PublicHomeMainProps {
  scroll: number;
}

const PublicHomeMain = ({ scroll: scrollPosition }: PublicHomeMainProps) => {
  return (
    <main className="p-2 flex-auto flex flex-col gap-2">
      <div className="size-full shrink-0 mb-1 flex flex-col justify-end gap-2">
        <WritingText
          text="Connect the Dots, draw the Dules, and gather into the Moim"
          split=","
          spacing={8}
          className="md:text-3xl text-2xl text-foreground/60 font-semibold mb-2"
        />
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className={cn(
            "size-full rounded-lg shadow-lg overflow-hidden mobile [&_div]:size-full",
            "[&_section]:size-full [&_section]:p-6 [&_section]:flex-center [&_section]:flex-col [&_section]:justify-around [&_section]:break-keep [&_section]:trans-300",
            "[&_h1]:sm:text-4xl [&_h1]:text-3xl [&_h1]:text-inherit",
            "[&_h2]:sm:text-3xl [&_h2]:text-2xl [&_h2]:text-inherit"
          )}
          style={{ height: `calc(100% - ${scrollPosition}px)` }}
        >
          <CarouselContent className="max-w-[calc(100vw-16px)] m-0 ">
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
        </Carousel>
      </div>
      <div className="w-full h-60 pb-2 shrink-0 flex gap-2.5 md:flex-row flex-col">
        <RippleButton
          size="lg"
          className="flex-auto h-full p-0 md:text-3xl text-2xl rounded-lg shadow-lg active:scale-98"
        >
          <a href="/dotmap" className="size-full grid items-center">
            닷맵
          </a>
        </RippleButton>
        <RippleButton
          variant="secondary"
          size="lg"
          className="flex-auto h-full p-0 md:text-3xl text-2xl rounded-lg shadow-lg active:scale-98"
        >
          <a href="#" className="size-full grid items-center">
            마이닷
          </a>
        </RippleButton>
      </div>
    </main>
  );
};

export default PublicHomeMain;
