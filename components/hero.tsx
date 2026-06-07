import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { SITE_CONTENT } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const { hero } = SITE_CONTENT;

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <Image
        src={hero.background.src}
        alt={hero.background.alt}
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#060c1a]/95 via-[#060c1a]/65 to-[#060c1a]/15" />

      {/* Ornament — inset-y-0 ensures height so fill works at all breakpoints */}
      {/* <div className="pointer-events-none absolute inset-y-0 right-[-35%] w-[120%] translate-y-[10%] opacity-30 sm:right-[-20%] sm:w-[95%] sm:opacity-45 lg:right-0 lg:w-[55%] lg:opacity-70">
        <Image
          src={hero.ornament.src}
          alt={hero.ornament.alt}
          fill
          className="object-contain object-bottom"
          aria-hidden
        />
      </div> */}

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1280px] flex-col justify-center px-5 pt-[72px] sm:px-8 lg:px-10">
        <div className="max-w-[min(800px,100%)]">
          <div className="mb-5 sm:mb-6">
            <Image
              src="/Logo/oi-logo.png"
              alt="Open Innovation Logo"
              width={720}
              height={180}
              className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[640px] h-auto object-contain object-left"
              priority
            />
          </div>
          <p className="mb-8 max-w-[520px] text-sm leading-relaxed text-white/88 sm:mb-10 sm:text-base md:text-lg">
            {hero.description}
          </p>
          <a
            href={hero.action.href}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 w-48 rounded-md border-0 bg-[#3176e4] text-xs font-bold uppercase tracking-widest text-white hover:bg-[#2560c8] sm:h-14 sm:w-56",
            )}
          >
            {hero.action.label}
          </a>
        </div>
      </div>
    </section>
  );
}
