import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Providers from "./providers";
import "./globals.css";
import { siteConfig } from "./siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eulerpulse.com"),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "euler",
    "finance",
    "swap",
    "market",
    "maker",
    "liquidity",
    "providers",
    "lending",
    "leverage",
    "just-in-time",
    "lending",
    "valuts",
    "dynamic",
    "hedging",
  ],
  authors: [
    {
      name: "Ivan Molto",
      url: "https://www.ivanmolto.com",
    },
  ],
  creator: "Ivan Molto",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    /* images: [
       {
         url: siteConfig.ogImage,
       },
     ], */
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@ivanmolto",
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "64x64", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.png" sizes="64x64" />
      </head>
      <body
        className={`${GeistSans.className} min-h-screen overflow-x-hidden overflow-y-scroll scroll-auto bg-gray-50 dark:bg-gray-950 antialiased selection:bg-orange-100 selection:text-amber-600`}
      >
        <ThemeProvider defaultTheme="system" attribute="class">
          <NuqsAdapter>
            <Providers>{children}</Providers>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
