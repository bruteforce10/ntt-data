"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { STARTUP_REGISTRATION_FORM_ID } from "@/components/startup-registration-form";
import { SITE_CONTENT } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const { navbar } = SITE_CONTENT;

// #2560c8 keeps white bold text WCAG-AA readable (5.86:1); #3176e4 is the
// brand hover highlight, same pair the shared dock/hero already use.
const SUBMIT_BUTTON_CLASSNAME = cn(
  buttonVariants({ variant: "default" }),
  "h-10 shrink-0 rounded-full border-0 bg-[#2560c8] px-3 text-[0.6rem] font-bold uppercase tracking-wide text-white shadow-lg shadow-[#3176e4]/25 transition-all hover:bg-[#3176e4] sm:h-11 sm:px-7 sm:text-xs sm:tracking-widest",
);

/**
 * Registration-page replacement for the shared FloatingDock: a full-width
 * fixed bottom bar with the site logo, the main navigation, and an
 * always-visible SUBMIT REGISTRATION button. The button submits the
 * registration form from anywhere on the page via the native `form`
 * attribute — no scrolling down to the in-form submit button needed.
 */
export default function StartupRegistrationDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/85 pb-[env(safe-area-inset-bottom)] shadow-2xl shadow-black/50 backdrop-blur-md">
      <div className="flex h-24 items-center justify-between gap-2 px-3 sm:gap-3 sm:px-6 lg:px-32">
        <a
          href={navbar.logo.href}
          className="shrink-0 transition-transform hover:scale-105"
        >
          <Image
            src={navbar.logo.src}
            alt={navbar.logo.alt}
            width={120}
            height={32}
            className="h-5 w-auto object-contain sm:h-8"
            priority
            quality={100}
          />
        </a>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Main navigation"
        >
          {navbar.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <details className="group relative lg:hidden">
            <summary
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "list-none rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 [&::-webkit-details-marker]:hidden",
              )}
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" aria-hidden />
            </summary>
            <div className="absolute right-0 bottom-full mb-3 w-64 rounded-2xl border border-white/10 bg-black/90 p-5 shadow-2xl backdrop-blur-xl">
              <nav
                className="flex flex-col gap-2"
                aria-label="Mobile navigation"
              >
                {navbar.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-3 text-xs font-semibold uppercase tracking-widest text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </details>

          <button
            type="submit"
            form={STARTUP_REGISTRATION_FORM_ID}
            className={SUBMIT_BUTTON_CLASSNAME}
          >
            Submit Registration
          </button>
        </div>
      </div>
    </div>
  );
}
