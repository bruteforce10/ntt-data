import Image from "next/image";
import { SITE_CONTENT } from "@/lib/site-content";

const { navbar } = SITE_CONTENT;

export default function Footer() {
  return (
    <footer className="bg-[#154284] py-12 sm:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <a href={navbar.logo.href} className="flex-shrink-0">
            <Image
              src={navbar.logo.src}
              alt={navbar.logo.alt}
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </a>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 sm:justify-end">
            {navbar.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} NTT DATA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
