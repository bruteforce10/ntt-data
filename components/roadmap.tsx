import { Fragment } from "react";
import Image from "next/image";
import { SITE_CONTENT } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const { roadmap } = SITE_CONTENT;

// Every timeline icon ships on a 1920x1080 transparent canvas with the white
// glyph centered (~92% of the canvas height). We size by CSS height +
// `w-auto object-contain` so each glyph renders at a consistent height.
const ICON_W = 1920;
const ICON_H = 1080;

// Static column placement for the 3-phase desktop grid. Written as literal
// class strings so Tailwind's scanner emits them (no runtime-built classes).
const PILL_COL = ["col-start-1", "col-start-3", "col-start-5"] as const;
const CELL_COL = ["col-start-1", "col-start-3", "col-start-5"] as const;
const CHEV_COL = ["col-start-2", "col-start-4"] as const;

type Phase = (typeof roadmap.phases)[number];
type Step = Phase["steps"][number];

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function PhasePill({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-white/15 bg-gradient-to-b from-[#2e5494] to-[#12376e] px-6 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_16px_-6px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <span className="text-base font-bold tracking-wide text-white sm:text-lg">
        {label}
      </span>
    </div>
  );
}

function StepIcon({ step, className }: { step: Step; className?: string }) {
  return (
    <Image
      src={step.icon.src}
      alt={step.icon.alt}
      width={ICON_W}
      height={ICON_H}
      className={cn("w-auto object-contain", className)}
    />
  );
}

// A right-pointing chevron sized to the icon row so it lines up with the
// vertical center of the icons in the horizontal (desktop) layout.
function ChevronCell({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex h-20 items-center justify-center px-1", className)}
    >
      <Chevron className="h-8 w-7 text-white/70" />
    </div>
  );
}

// Icon + caption. `compact` tightens the caption width so the two steps of a
// multi-step phase (July) sit side by side within a single column.
function StepItem({
  step,
  compact = false,
}: {
  step: Step;
  compact?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center text-center">
      <div className="flex h-20 items-center justify-center">
        <StepIcon step={step} className="h-[72px]" />
      </div>
      <p
        className={cn(
          "mt-4 text-sm leading-relaxed text-white/95",
          compact ? "max-w-[8.5rem]" : "max-w-[15rem]",
        )}
      >
        {step.caption}
      </p>
    </div>
  );
}

export default function Roadmap() {
  const { phases } = roadmap;

  return (
    <section id="roadmap" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-12 text-center sm:pt-16 lg:pt-20">
        <h2 className="font-georgia text-2xl font-normal tracking-wide text-[#0070C0] sm:text-3xl lg:text-4xl">
          {roadmap.title}
        </h2>
      </div>

      <div className="bg-[#154284] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          {/* Desktop / large screens: horizontal timeline */}
          <div className="hidden grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-x-3 gap-y-8 lg:grid">
            {phases.map((phase, i) => (
              <PhasePill
                key={`pill-${i}`}
                label={phase.label}
                className={cn("row-start-1", PILL_COL[i])}
              />
            ))}

            {phases.slice(1).map((_, i) => (
              <ChevronCell
                key={`ichev-${i}`}
                className={cn("row-start-2 self-start", CHEV_COL[i])}
              />
            ))}

            {phases.map((phase, i) => (
              <div
                key={`cell-${i}`}
                className={cn(
                  "row-start-2 flex items-start justify-center gap-2 self-start",
                  CELL_COL[i],
                )}
              >
                {phase.steps.map((step, si) => (
                  <Fragment key={si}>
                    {si > 0 && <ChevronCell />}
                    <StepItem step={step} compact={phase.steps.length > 1} />
                  </Fragment>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile / tablet: vertical timeline with down chevrons */}
          <div className="flex flex-col items-center gap-5 lg:hidden">
            {phases.map((phase, pi) => (
              <Fragment key={pi}>
                {pi > 0 && (
                  <Chevron className="h-6 w-6 rotate-90 text-white/60" />
                )}
                <PhasePill label={phase.label} className="min-w-[200px]" />
                {phase.steps.map((step, si) => (
                  <Fragment key={si}>
                    {si > 0 && (
                      <Chevron className="h-6 w-6 rotate-90 text-white/60" />
                    )}
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-16 items-center justify-center">
                        <StepIcon step={step} className="h-14" />
                      </div>
                      <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-white/95">
                        {step.caption}
                      </p>
                    </div>
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
