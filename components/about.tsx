import Image from "next/image";
import Link from "next/link";
import { SITE_CONTENT } from "@/lib/site-content";

const { about } = SITE_CONTENT;

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="relative min-h-[280px] sm:min-h-[560px] lg:min-h-[240px]">
        <Image
          src={about.background.src}
          alt={about.background.alt}
          fill
          className="object-cover object-left -ml-45 "
        />
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative z-10 mx-auto flex min-h-[280px] max-w-[840px] flex-col items-center justify-center px-6 py-20 text-center sm:min-h-[560px] lg:min-h-[240px]">
          <h2 className="mb-8 text-2xl font-black titlecase tracking-wide text-[#0070C0] sm:text-3xl lg:text-4xl">
            {about.title}
          </h2>
          <p className="text-sm leading-relaxed text-gray-800 sm:text-base lg:text-lg">
            {about.description}
          </p>
          <Link
            href={about.cta.href}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-white to-gray-100 px-9 py-3.5 text-base font-bold text-[#0070C0] shadow-md shadow-black/15 ring-1 ring-black/5 transition hover:to-gray-200 hover:text-[#3176E4] sm:text-lg"
          >
            {about.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
