"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LIST_NAVBAR } from "@/constant/listNavbar";
import EachUtils from "@/utils/eachUtils";

type NavLink = { title: string; url: string };
type NavItem = NavLink & { opt?: NavLink[]; positionSideLeft?: boolean };

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
  {
    title: "Register",
    href: "/register?type=startup",
    external: false,
    disabled: false,
  },
];

const PRIMARY_ACTION = NAVBAR_ACTIONS[3];
const SECONDARY_ACTIONS: NavbarAction[] = [
  NAVBAR_ACTIONS[0],
  NAVBAR_ACTIONS[1],
  NAVBAR_ACTIONS[2],
  // {
  //   title: "NTT Open Innovation Week",
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
        "sticky top-0 z-50 w-full border-b-[4px] border-blue-500 transition-all duration-200",
        scrolled
          ? "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "bg-white",
      )}
    >
      <div className="container mx-auto flex h-20 items-center gap-4 px-4 lg:gap-8">
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
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 xl:flex xl:items-center">
          <NavigationMenu>
            <NavigationMenuList className="justify-start gap-1">
              <EachUtils
                of={LIST_NAVBAR as NavItem[]}
                render={(item: NavItem) => {
                  if (!item.opt) {
                    return (
                      <NavigationMenuItem key={item.title}>
                        <NavigationMenuLink
                          render={<Link href={item.url} />}
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.title}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }

                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[220px] gap-1 p-2">
                          <EachUtils
                            of={item.opt}
                            render={(opt: NavLink) => (
                              <ListItem
                                key={opt.url}
                                href={opt.url}
                                title={opt.title}
                              />
                            )}
                          />
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }}
              />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Actions */}
        <div className="hidden xl:flex xl:items-center">
          <DesktopNavbarActions />
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="ml-auto h-11 w-11 rounded-full border border-blue-ntt/15 bg-white text-blue-ntt shadow-sm hover:bg-blue-ntt/5 xl:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            }
          />
          <SheetContent
            side="right"
            className="w-[320px] max-w-[calc(100vw-1rem)] overflow-y-auto overscroll-y-contain border-l border-blue-ntt/10 bg-white sm:w-[400px]"
          >
            <SheetHeader>
              <SheetTitle className="text-left text-lg text-blue-ntt-700">
                Navigation
              </SheetTitle>
              <SheetDescription className="text-left text-sm leading-6 text-slate-600">
                Explore NTT Startup Challenge pages and take the next step from
                here.
              </SheetDescription>
            </SheetHeader>

            <div className="px-4 pb-6">
              <Accordion multiple={false} className="mt-2">
                <EachUtils
                  of={LIST_NAVBAR as NavItem[]}
                  render={(item: NavItem) => {
                    if (!item.opt) {
                      return (
                        <Link
                          key={item.title}
                          href={item.url}
                          className="block rounded-2xl px-3 py-4 text-sm font-medium text-slate-800 transition-colors hover:bg-blue-ntt/5 hover:text-blue-ntt"
                        >
                          {item.title}
                        </Link>
                      );
                    }

                    return (
                      <AccordionItem
                        key={item.title}
                        value={item.title.toLowerCase().replace(/\s+/g, "-")}
                      >
                        <AccordionTrigger className="px-3 text-sm font-medium text-slate-800">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          <div className="flex flex-col space-y-1">
                            <EachUtils
                              of={item.opt}
                              render={(opt: NavLink) => (
                                <Link
                                  href={opt.url}
                                  key={opt.url}
                                  className="rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-blue-ntt/5 hover:text-blue-ntt"
                                >
                                  {opt.title}
                                </Link>
                              )}
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  }}
                />
              </Accordion>

              <div className="mt-8">
                <MobileNavbarActions />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function DesktopNavbarActions() {
  return (
    <div className="flex items-center gap-3">
      <NavbarActionButton
        {...PRIMARY_ACTION}
        className="min-h-11 min-w-[10rem] rounded-2xl bg-[#3176e4] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-[0_18px_40px_rgba(49,118,228,0.26)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#2560c8] motion-reduce:hover:translate-y-0"
      />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              className="min-h-11 rounded-2xl border-blue-ntt/20 bg-white px-4 py-3 text-[0.95rem] font-semibold text-slate-800 shadow-[0_10px_28px_rgba(8,41,71,0.08)] transition-all duration-200 hover:border-blue-ntt/40 hover:bg-blue-ntt/5 hover:text-blue-ntt"
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
    </div>
  );
}

function MobileNavbarActions() {
  return (
    <div className="flex flex-col gap-3">
      <NavbarActionButton
        {...PRIMARY_ACTION}
        mobile
        className="min-h-12 w-full rounded-2xl bg-[#3176e4] px-5 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(49,118,228,0.22)] transition-colors duration-200 hover:bg-[#2560c8]"
      />
      <NavbarActionButton
        {...SECONDARY_ACTIONS[0]}
        mobile
        className="min-h-12 w-full rounded-2xl border border-blue-ntt/25 bg-blue-ntt/5 px-5 py-3 text-base font-semibold text-blue-ntt transition-colors duration-200 hover:bg-blue-ntt/10"
      />
      <a
        href={SECONDARY_ACTIONS[3].href}
        target="_blank"
        rel="noreferrer"
        className="rounded-xl px-1 py-2 text-sm font-medium text-slate-600 underline-offset-4 transition-colors hover:text-blue-ntt hover:underline"
      >
        {SECONDARY_ACTIONS[3].title}
      </a>
    </div>
  );
}

function NavbarActionButton({
  title,
  href,
  className,
  external = false,
  mobile = false,
  disabled = false,
  badge,
}: NavbarAction & { className?: string; mobile?: boolean }) {
  const content = (
    <>
      <span className="text-balance">{title}</span>
      {badge ? (
        <span className="text-[0.45rem] font-medium tracking-[0.18em] uppercase opacity-90">
          {badge}
        </span>
      ) : null}
    </>
  );

  return (
    <Button
      nativeButton={false}
      render={
        disabled ? (
          <span aria-disabled="true" className="cursor-default" />
        ) : (
          <a href={href} {...getActionProps({ href, external })} />
        )
      }
      className={cn(
        "touch-manipulation text-center leading-tight whitespace-normal",
        badge && "h-auto flex-col gap-1",
        mobile ? "w-full justify-center" : "justify-center",
        className,
      )}
    >
      {content}
    </Button>
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

function ListItem({
  title,
  href,
  children,
  className,
}: {
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <li>
      <NavigationMenuLink
        render={<Link href={href} />}
        className={cn(
          "flex-col items-start gap-1 rounded-md p-3 text-slate-900 hover:bg-blue-ntt/5 hover:text-blue-ntt",
          className,
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        {children ? (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        ) : null}
      </NavigationMenuLink>
    </li>
  );
}
