"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SITE_CONTENT } from "@/lib/site-content";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

const { problemOverview } = SITE_CONTENT;

export default function ProblemOverview() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const selected =
    selectedIndex !== null ? problemOverview.items[selectedIndex] : null;

  function handleSelectProblem() {
    if (selectedIndex === null) return;
    router.push(`/startup-registration?problem=${selectedIndex}`);
    setSelectedIndex(null);
  }

  return (
    <section
      id="problem-statements"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-16"
    >
      <div className="pointer-events-none absolute -right-0 -top-2 h-[340px] w-[340px] sm:h-[420px] sm:w-[420px]">
        <Image
          src={problemOverview.ornament.src}
          alt={problemOverview.ornament.alt}
          fill
          className="object-contain object-top"
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6">
        <h2 className="mb-10 text-center text-2xl font-black capitalize tracking-wide text-[#0070C0] sm:text-3xl">
          {problemOverview.title}
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {problemOverview.items.map((item, i) => (
            <article
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedIndex(i)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedIndex(i);
                }
              }}
              className="group flex h-full cursor-pointer flex-col rounded-2xl border border-white/5 bg-gradient-to-br from-[#1a3a6b]/80 to-[#04101e]/50 p-6 backdrop-blur-sm transition duration-200 ease-out hover:border-white/20 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3176e4]"
            >
              <Image
                src={item.logo.src}
                alt={item.logo.alt}
                width={item.logo.width}
                height={item.logo.height}
                className="object-contain object-left flex-shrink-0"
              />
              <p className="mt-5 flex-1 text-sm leading-relaxed text-white">
                {item.description}
              </p>
              <div className="mt-6 flex flex-col items-center gap-3">
                <span className="text-xs font-semibold text-white transition-colors duration-200 group-hover:underline">
                  View detail...
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3176e4] text-white transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <DialogContent className="sm:max-w-5xl gap-0 overflow-hidden p-0 sm:rounded-2xl">
          <div className="flex flex-col sm:flex-row">
            {/* Left panel */}
            <div className="flex flex-col justify-between bg-white p-8 sm:w-[40%] sm:p-10">
              <div>
                {selected && (
                  <div className="mb-8 inline-flex items-center justify-center rounded-xl bg-[#154284] px-5 py-3">
                    <Image
                      src={selected.logo.src}
                      alt={selected.logo.alt}
                      width={selected.logo.width}
                      height={selected.logo.height}
                      className="object-contain object-left h-10 w-auto"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-black leading-tight text-gray-900 sm:text-3xl">
                  {selected?.title}
                </h3>
              </div>
              <div className="mt-10">
                <button
                  type="button"
                  onClick={handleSelectProblem}
                  className="w-full rounded-xl bg-[#154284] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0d2d6b]"
                >
                  Select the
                  <br />
                  Problem Statement
                </button>
              </div>
            </div>

            {/* Right panel */}
            <div className="flex-1 overflow-y-auto border-l border-gray-100 bg-white px-8 py-10 max-h-[360px] sm:px-10 sm:pt-12">
              <div className="space-y-4 text-sm leading-relaxed text-justify text-gray-700">
                {selected?.fullDescription.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
