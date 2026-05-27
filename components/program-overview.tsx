"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SITE_CONTENT } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const { programOverview } = SITE_CONTENT;
const ITEM_COUNT = programOverview.items.length;

export default function ProgramOverview() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  );

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap() % ITEM_COUNT);
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section id="program-overview" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mb-10 px-6 text-center">
        <h2 className="text-2xl font-black uppercase tracking-wide text-[#0070C0] sm:text-3xl">
          {programOverview.title}
        </h2>
      </div>

      <div className="relative mx-auto max-w-[1200px] px-12 lg:px-14">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{ loop: true, align: "start" }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {programOverview.items.map((item, i) => (
              <CarouselItem
                key={i}
                className="pl-4 basis-[80%] sm:basis-[48%] lg:basis-[27%]"
              >
                <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[340px] lg:h-[380px]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-sm font-black uppercase tracking-wide text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="h-10 w-10 border-0 bg-white shadow-md hover:bg-gray-50" />
          <CarouselNext className="h-10 w-10 border-0 bg-white shadow-md hover:bg-gray-50" />
        </Carousel>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: ITEM_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current ? "w-4 bg-[#3176e4]" : "w-2 bg-gray-300",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
