import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.businessName} | Mobile Welding in Cedar Rapids, IA`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description:
    "Owner-operated mobile welding out of Cedar Rapids, Iowa. Ben Bjornsen comes to your site for farm, trailer, and structural repairs, or takes drop-off work at the shop — within a 2-hour radius of Cedar Rapids.",
  keywords: [
    "mobile welding Cedar Rapids",
    "welder Cedar Rapids Iowa",
    "farm equipment repair welding",
    "trailer repair welding Iowa",
    "on-site welding services",
    "BB's Mobile Welding",
  ],
  authors: [{ name: siteConfig.ownerName }],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.domain,
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} | Mobile Welding in Cedar Rapids, IA`,
    description:
      "Owner-operated mobile welding out of Cedar Rapids, Iowa. On-site or in-shop, within a 2-hour radius.",
    images: [{ url: "/logo.jpg", width: 1500, height: 1500, alt: siteConfig.businessName }],
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.businessName} | Mobile Welding in Cedar Rapids, IA`,
    description:
      "Owner-operated mobile welding out of Cedar Rapids, Iowa. On-site or in-shop, within a 2-hour radius.",
    images: ["/logo.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.domain}/#business`,
  name: siteConfig.businessName,
  image: `${siteConfig.domain}/logo.jpg`,
  url: siteConfig.domain,
  telephone: siteConfig.phoneHref.replace("tel:", ""),
  email: siteConfig.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.addressLocality,
    addressRegion: siteConfig.addressRegion,
    postalCode: siteConfig.postalCode,
    addressCountry: "US",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 41.9779,
      longitude: -91.6656,
    },
    geoRadius: "120 mi",
  },
  founder: {
    "@type": "Person",
    name: siteConfig.ownerName,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
