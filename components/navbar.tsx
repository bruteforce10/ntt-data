"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavbarAction = {
  title: string;
  href: string;
  external?: boolean;
  disabled?: boolean;
  badge?: string;
};

const NAVBAR_ACTIONS: NavbarAction[] = [
  {
    title: "Contact Us",
    href: "https://wa.me/6281130804004?text=Hello%20NTT%20Startup%20Challenge%2C%20I%20am%20interested%20in%20contacting%20you.%20Please%20let%20me%20know%20how%20we%20can%20connect.",
  },
  {
    title: "Partner With Us",
    href: "/register?type=partner",
  },
  {
    title: "Subscribe to Our Newsletter",
    href: "mailto:info@ntt-startupchallenge.com?subject=Newsletter%20Subscription",
  },
];

const SECONDARY_ACTIONS: NavbarAction[] = [
  NAVBAR_ACTIONS[0],
  NAVBAR_ACTIONS[1],
  NAVBAR_ACTIONS[2],
  // {
  //   title: "NTT Open Innovation Program",
  //   href: "https://oiw.ntt-startupchallenge.com",
  // },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b-[4px] border-blue-500 transition duration-200",
        scrolled
          ? "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "bg-white",
      )}
    >
      <div className="container mx-auto flex h-20 items-center gap-2 px-4 sm:gap-4 lg:gap-8">
        {/* Logo */}
        <Link
          href="https://ntt-startupchallenge.com"
          className="shrink-0"
          aria-label="NTT Startup Challenge"
        >
          <Image
            src="/Logo/logo-navbar-top.webp"
            alt="NTT Startup Challenge"
            width={1920}
            height={674}
            priority
            className="h-12 w-auto shrink-0 object-contain sm:h-16 md:h-24"
          />
        </Link>

        {/* Actions */}
        <div className="ml-auto flex items-center">
          <NavbarActions />
        </div>
      </div>
    </header>
  );
}

function NavbarActions() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              className="min-h-11 rounded-2xl border-blue-ntt/20 bg-white px-3 py-3 text-sm font-semibold text-slate-800 shadow-[0_10px_28px_rgba(8,41,71,0.08)] transition-colors duration-200 hover:border-blue-ntt/40 hover:bg-blue-ntt/5 hover:text-blue-ntt sm:px-4 sm:text-[0.95rem]"
            >
              More
              <ChevronDown className="size-4" aria-hidden="true" />
            </Button>
          }
        />
        <DropdownMenuContent
          align="end"
          className="w-[19rem] rounded-3xl border border-blue-ntt/10 bg-white p-2 shadow-[0_24px_60px_rgba(8,41,71,0.14)]"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-3 pt-3 pb-2 text-[0.72rem] font-semibold tracking-[0.18em] text-blue-ntt-700 uppercase">
              More Ways to Connect
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mx-3 bg-blue-ntt/10" />
            {SECONDARY_ACTIONS.map((action) => (
              <DropdownMenuItem
                key={action.title}
                render={<a href={action.href} {...getActionProps(action)} />}
                className="group mt-1 cursor-pointer rounded-2xl px-4 py-3 transition-colors hover:bg-blue-ntt/5 focus:bg-blue-ntt/5"
              >
                <span className="block text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-ntt">
                  {action.title}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link
        href="/"
        aria-label="Open Innovation"
        className="flex min-h-11 items-center rounded-2xl bg-[#154284] px-3 py-2 shadow-[0_12px_30px_rgba(21,66,132,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0f3263] motion-reduce:hover:translate-y-0 sm:px-4"
      >
        <Image
          src="/Logo/oi-logo.png"
          alt="Open Innovation"
          width={200}
          height={50}
          className="h-5 w-auto object-contain sm:h-6"
        />
      </Link>
    </div>
  );
}

function getActionProps(action: Pick<NavbarAction, "href" | "external">) {
  const isMailto = action.href.startsWith("mailto:");

  if (action.external || isMailto) {
    return {
      target: isMailto ? undefined : "_blank",
      rel: isMailto ? undefined : "noreferrer",
    };
  }

  return {};
}
