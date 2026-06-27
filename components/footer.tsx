import { Fragment } from "react";
import Image from "next/image";
import { SITE_CONTENT } from "@/lib/site-content";

const { navbar, footer } = SITE_CONTENT;

const footerLinks = navbar.links.filter((link) => link.label !== "FAQ'S");

export default function Footer() {
  return (
    <footer className="bg-[#154284] py-12 sm:pt-16 sm:pb-45">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
          <a
            href={navbar.logo.href}
            className="flex-shrink-0 lg:justify-self-start"
          >
            <Image
              src={navbar.logo.src}
              alt={navbar.logo.alt}
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </a>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 lg:w-full lg:flex-nowrap  lg:gap-x-4">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:justify-self-end">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-white/70">
              Program Partner
            </span>
            <Image
              src="/Logo/EXEO Logo.png"
              alt="EXEO Global Logo"
              width={144}
              height={58}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start">
            {footer.legal.map((link, index) => (
              <Fragment key={link.label}>
                {index > 0 && (
                  <span className="text-white/30" aria-hidden="true">
                    |
                  </span>
                )}
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </Fragment>
            ))}
          </nav>

          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} NTT DATA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
