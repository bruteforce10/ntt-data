"use client";
import * as React from "react";
import { SITE_CONTENT } from "@/lib/site-content";

const { countdown } = SITE_CONTENT;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = new Date(countdown.targetDate).getTime() - Date.now();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function pad(n: number, digits: number = 2) {
  return String(n).padStart(digits, "0");
}

// Deterministic initial value so the server-rendered HTML matches the client's
// first render. The live value is computed on mount via requestAnimationFrame,
// which only runs in the browser. Avoids a hydration mismatch.
const ZERO_TIME: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const UNITS = [
  { key: "days" as const, label: "Days", digits: 3 },
  { key: "hours" as const, label: "Hours", digits: 2 },
  { key: "minutes" as const, label: "Minutes", digits: 2 },
  { key: "seconds" as const, label: "Seconds", digits: 2 },
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>(ZERO_TIME);

  React.useEffect(() => {
    let frame: number;
    const tick = () => {
      setTimeLeft(getTimeLeft());
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="countdown" className="bg-white">
      <h2 className="px-6 py-8 text-center font-georgia text-2xl font-normal tracking-wide text-[#0070C0] sm:py-10 sm:text-3xl lg:text-4xl">
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
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex justify-center px-4 py-10 sm:px-8 sm:py-14">
          <div className="w-full max-w-7xl rounded-full border border-white/30 bg-white/10 px-6 py-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:px-12 sm:py-8">
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 lg:gap-10">
              {UNITS.map(({ key, label, digits }, i) => (
                <React.Fragment key={key}>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-light leading-none tabular-nums text-white sm:text-4xl lg:text-6xl">
                      {pad(timeLeft[key], digits)}
                    </span>
                    <span className="mt-2 text-[10px] font-normal tracking-wide text-white/60 sm:mt-3 sm:text-sm">
                      {label}
                    </span>
                  </div>
                  {i < UNITS.length - 1 && (
                    <span className="mb-5 text-xl font-light leading-none text-white/50 sm:mb-7 sm:text-3xl lg:text-5xl">
                      :
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
