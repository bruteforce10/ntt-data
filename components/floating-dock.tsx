"use client";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { SITE_CONTENT } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const { navbar } = SITE_CONTENT;

function getActionClassName(
  variant: (typeof navbar.actions)[number]["variant"],
) {
  return cn(
    buttonVariants({ variant: variant === "primary" ? "default" : "outline" }),
    "h-10 rounded-full px-5 text-[0.68rem] font-bold tracking-widest uppercase transition-all",
    variant === "primary"
      ? "border-0 bg-[#3176e4] text-white hover:bg-[#2560c8] shadow-lg shadow-[#3176e4]/20"
      : "border-white/20 bg-transparent text-white hover:bg-white/10",
  );
}

function ActionButton({
  action,
  fullWidth = false,
}: {
  action: (typeof navbar.actions)[number];
  fullWidth?: boolean;
}) {
  const className = cn(
    getActionClassName(action.variant),
    fullWidth && "flex w-full justify-center",
  );

  if (action.comingSoon) {
    return (
      <span
        aria-disabled="true"
        className={cn(className, "pointer-events-none flex-col gap-0 leading-tight")}
      >
        <span>{action.label}</span>
        <span className="text-[0.5rem] font-light tracking-[0.15em] opacity-80">
          Coming Soon
        </span>
      </span>
    );
  }

  return (
    <a href={action.href} className={className}>
      {action.label}
    </a>
  );
}

export default function FloatingDock() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed left-1/2 bottom-6 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 transition-all duration-500 ease-out rounded-full border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-md",
        scrolled ? "bg-black/80" : "bg-black/40",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href={navbar.logo.href}
          className="shrink-0 transition-transform hover:scale-105"
        >
          <Image
            src={navbar.logo.src}
            alt={navbar.logo.alt}
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
            quality={100}
          />
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          <nav className="flex items-center gap-6" aria-label="Main navigation">
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

          <div className="h-5 w-px bg-white/20" aria-hidden />

          <div className="flex items-center gap-3">
            {navbar.actions.map((action) => (
              <ActionButton key={action.href} action={action} />
            ))}
          </div>
        </div>

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
          <div className="absolute right-0 bottom-20 w-64 rounded-2xl border border-white/10 bg-black/90 p-5 shadow-2xl backdrop-blur-xl">
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
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
            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
              {navbar.actions.map((action) => (
                <ActionButton key={action.href} action={action} fullWidth />
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
