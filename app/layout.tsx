import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "NTT Open Innovation Program",
  description:
    "We are looking at innovative Startup solutions that address business challenges and solve societal issues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${nulshockBd.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
