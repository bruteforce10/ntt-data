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
    "h-10 rounded-md px-5 text-[0.68rem] font-bold tracking-widest uppercase",
    variant === "primary"
      ? "border-0 bg-[#3176e4] text-white hover:bg-[#2560c8]"
      : "border-white bg-transparent text-white hover:bg-white hover:text-[#0e1421]",
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-20 w-full border-b transition-all duration-500 ease-out",
        scrolled
          ? "border-white/10 bg-[#0e1421]/88 shadow-lg shadow-black/20 backdrop-blur-md"
          : "border-transparent bg-[#0e1421] border-white/10",
      )}
    >
      <div className="mx-auto grid h-[72px] max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-8 px-5 sm:px-8 lg:px-10">
        <a href={navbar.logo.href} className="shrink-0">
          <Image
            src={navbar.logo.src}
            alt={navbar.logo.alt}
            width={160}
            height={40}
            className="h-9 w-auto object-contain sm:h-10"
            priority
          />
        </a>

        <div className="hidden justify-end gap-2 lg:flex">
          <nav
            className="flex min-w-0 justify-center"
            aria-label="Main navigation"
          >
            <div className="flex items-center px-5 py-3">
              {navbar.links.map((link, i) => (
                <div key={link.href} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-5 h-4 w-px bg-white/25" aria-hidden />
                  )}
                  <a
                    href={link.href}
                    className="whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-widest text-white transition-colors hover:text-white/75"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            {navbar.actions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className={getActionClassName(action.variant)}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        <details className="group relative justify-self-end lg:hidden">
          <summary
            className={cn(
              buttonVariants({ variant: "outline", size: "icon-lg" }),
              "list-none rounded-md border-white bg-transparent text-white hover:bg-white hover:text-[#0e1421] [&::-webkit-details-marker]:hidden",
            )}
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" aria-hidden />
          </summary>
          <div className="absolute right-0 top-12 w-[min(calc(100vw-2.5rem),22rem)] border border-white/10 bg-[#0e1421] p-5 shadow-2xl shadow-black/30">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navbar.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-5 grid gap-3">
              {navbar.actions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className={cn(getActionClassName(action.variant), "w-full")}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
