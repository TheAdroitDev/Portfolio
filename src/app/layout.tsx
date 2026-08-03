import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Schibsted_Grotesk, Baloo_Bhaijaan_2, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
});

const baloo = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  variable: "--font-baloo",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Shivam Verma | Software Engineer",
  description:
    "Software builder and fullstack developer crafting robust applications for the web and mobile. Explore my projects, blog, and open-source contributions.",
  openGraph: {
    title: "Shivam Verma | Software Engineer",
    description:
      "Software builder and fullstack developer crafting robust applications for the web and mobile.",
    type: "website",
    url: "https://theadroitdev.com",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@theadroitdev",
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
      className={cn(inter.variable, schibstedGrotesk.variable, baloo.variable, instrumentSerif.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d92f05f0-3cf6-4d7e-b7f2-7066eef3dcad"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
