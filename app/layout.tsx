import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import localFont from "next/font/local";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nulshockBd = localFont({
  src: "../public/Nulshock Bd.otf",
  variable: "--font-nulshock",
});

const georgia = localFont({
  src: [
    { path: "../public/georgia/georgia.ttf", weight: "400", style: "normal" },
    { path: "../public/georgia/georgiai.ttf", weight: "400", style: "italic" },
    { path: "../public/georgia/georgiab.ttf", weight: "700", style: "normal" },
    { path: "../public/georgia/georgiaz.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-georgia-base",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "NTT DATA",
    "open innovation",
    "startup program",
    "startup challenge",
    "innovation program",
    "pitch deck",
  ],
  // No `url` here: child pages inherit this whole object, and Next.js metadata
  // merging is shallow — a per-page openGraph would wipe siteName/images.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${nulshockBd.variable} ${georgia.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
