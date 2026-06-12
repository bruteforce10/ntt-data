"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function pad(n: number, digits: number = 2) {
  return String(n).padStart(digits, "0");
}

const UNITS = [
  { key: "days" as const, label: "DAYS", digits: 3 },
  { key: "hours" as const, label: "HRS", digits: 2 },
  { key: "minutes" as const, label: "MIN", digits: 2 },
  { key: "seconds" as const, label: "SEC", digits: 2 },
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>(() => getTimeLeft());

  React.useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="relative overflow-hidden py-16">
      <div className="relative flex min-h-70 items-center justify-center sm:min-h-115 lg:min-h-110">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={countdown.video.src} type={countdown.video.type} />
        </video>

        <div className="relative z-10 px-6  text-center">
          <div className="rounded-2xl border border-white/10 bg-[#0a1a3a]/50 px-8 py-10 backdrop-blur-md sm:px-14 sm:py-12 lg:px-36 lg:py-14">
            <p className="mb-8 text-md font-bold uppercase tracking-[0.25em] text-white/70 sm:text-xl">
              {countdown.title}
            </p>

            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 max-sm:px-12">
              {UNITS.map(({ key, label, digits }, i) => (
                <React.Fragment key={key}>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black tabular-nums text-white sm:text-5xl lg:text-7xl">
                      {timeLeft ? pad(timeLeft[key], digits) : pad(0, digits)}
                    </span>
                    <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/50 sm:text-xs">
                      {label}
                    </span>
                  </div>
                  {i < UNITS.length - 1 && (
                    <span className="mb-5 text-2xl font-black text-white/40 sm:text-3xl lg:text-5xl">
                      :
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                nativeButton={false}
                render={<Link href="/startup-registration" />}
                className="min-h-12 rounded-2xl bg-[#3176e4] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_rgba(49,118,228,0.26)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#2560c8] focus-visible:ring-2 focus-visible:ring-white/80"
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
