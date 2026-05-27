import Image from "next/image";
import { SITE_CONTENT } from "@/lib/site-content";

const { about } = SITE_CONTENT;

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">
        <Image
          src={about.background.src}
          alt={about.background.alt}
          fill
          className="object-cover object-left -ml-45 grayscale"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 mx-auto flex min-h-[480px] max-w-[760px] flex-col items-center justify-center px-6 py-20 text-center sm:min-h-[560px] lg:min-h-[640px]">
          <h2 className="mb-8 text-2xl font-black uppercase tracking-wide text-[#0070C0] sm:text-3xl lg:text-4xl">
            {about.title}
          </h2>
          <p className="text-sm leading-relaxed text-gray-800 sm:text-base lg:text-lg">
            {about.description}
          </p>
        </div>
      </div>
    </section>
  );
}
