import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Schibsted_Grotesk, Baloo_Bhaijaan_2, Instrument_Serif, Caveat, Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";
import { site, personSchema, jsonLd } from "@/lib/site";

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

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: site.keywords,
  alternates: {
    canonical: "/",
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    url: "/",
    siteName: site.name,
    locale: site.locale,
    images: [{ url: site.ogImage, width: 1630, height: 730, alt: `${site.name}'s portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: `@${site.handle}`,
    site: `@${site.handle}`,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

const rootJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      author: { "@id": `${site.url}/#person` },
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      mainEntity: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, schibstedGrotesk.variable, baloo.variable, instrumentSerif.variable, caveat.variable, cormorantGaramond.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Structured data: Person + WebSite (SEO / AEO / GEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(rootJsonLd) }}
        />
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
