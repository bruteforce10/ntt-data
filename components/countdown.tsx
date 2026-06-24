import * as React from "react";
import { SITE_CONTENT } from "@/lib/site-content";

const { countdown } = SITE_CONTENT;

export default function Countdown() {
  return (
    <section id="countdown" className="bg-white">
      <h2 className="px-6 py-8 text-center text-2xl font-bold tracking-wide text-[#0070C0] sm:py-10 sm:text-3xl lg:text-4xl">
        {countdown.title}
      </h2>

      <div className="relative overflow-hidden border-y-2 border-[#3176e4]/60">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={countdown.video.src} type={countdown.video.type} />
        </video>
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex items-center justify-center px-4 py-16 sm:py-24 lg:py-28">
          <h3 className="whitespace-nowrap text-center font-sans text-[clamp(2rem,11vw,9.5rem)] font-bold uppercase leading-none tracking-tight text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.5)] sm:tracking-normal">
            Coming Soon
          </h3>
        </div>
      </div>
    </section>
  );
}
