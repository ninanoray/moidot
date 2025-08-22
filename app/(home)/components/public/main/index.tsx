import { RippleButton } from "@/components/animate-ui/buttons/ripple";
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
      <div className="size-full shrink-0 my-0.5 grid items-end">
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className={cn(
            "size-full bg-card rounded-lg shadow-lg overflow-hidden mobile [&_div]:size-full",
            "[&_section]:size-full [&_section]:p-6 [&_section]:flex-center [&_section]:flex-col [&_section]:break-keep [&_section]:rounded-lg [&_section]:trans-300",
            "[&_h1]:sm:text-4xl [&_h1]:text-3xl [&_h1]:text-inherit",
            "[&_h2]:sm:text-3xl [&_h2]:text-2xl [&_h2]:text-inherit"
          )}
          style={{ height: `calc(100% - ${scrollPosition}px)` }}
        >
          <CarouselContent className="max-w-[calc(100vw-16px)] m-0">
            <CarouselItem className="p-0">
              <section className="bg-tertiary text-tertiary-foreground">
                <h2>모임</h2>
                <h1>잇고 모여서, 계속 이어지는 모임</h1>
              </section>
            </CarouselItem>
            <CarouselItem className="p-0">
              <section className="bg-secondary text-secondary-foreground">
                <h2>줄</h2>
                <h1>순간과 순간을 잇는 스케-줄</h1>
              </section>
            </CarouselItem>
            <CarouselItem className="p-0">
              <section className="bg-primary text-primary-foreground">
                <h2>닷</h2>
                <h1>모든 순간의 시작</h1>
              </section>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div className="w-full h-60 pb-2 shrink-0 flex gap-2.5 md:flex-row flex-col">
        <RippleButton
          size="lg"
          className="flex-auto h-full p-0 text-3xl rounded-lg shadow-lg active:scale-98"
        >
          <a href="/dotmap" className="size-full grid items-center">
            닷맵
          </a>
        </RippleButton>
        <RippleButton
          variant="secondary"
          size="lg"
          className="flex-auto h-full p-0 text-3xl rounded-lg shadow-lg active:scale-98"
        >
          <a href="#" className="size-full grid items-center">
            줄릿
          </a>
        </RippleButton>
      </div>
    </main>
  );
};

export default PublicHomeMain;
