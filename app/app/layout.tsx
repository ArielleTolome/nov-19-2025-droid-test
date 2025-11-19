import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dumpster Rental - Affordable & Reliable Waste Solutions",
    template: "%s | Dumpster Rental"
  },
  description: "Professional dumpster rental services for residential, commercial, and construction projects. Same-day delivery available. Get a free quote today!",
  keywords: ["dumpster rental", "roll-off dumpster", "waste management", "junk removal", "construction dumpster", "residential dumpster", "commercial dumpster"],
  authors: [{ name: "Dumpster Rental" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dumpsterrental.com",
    siteName: "Dumpster Rental",
    title: "Dumpster Rental - Affordable & Reliable Waste Solutions",
    description: "Professional dumpster rental services for residential, commercial, and construction projects. Same-day delivery available.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dumpster Rental Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dumpster Rental - Affordable & Reliable Waste Solutions",
    description: "Professional dumpster rental services for residential, commercial, and construction projects.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Dumpster Rental",
              "image": "https://dumpsterrental.com/logo.jpg",
              "@id": "https://dumpsterrental.com",
              "url": "https://dumpsterrental.com",
              "telephone": "+1-555-123-4567",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Main Street, Suite 100",
                "addressLocality": "City",
                "addressRegion": "ST",
                "postalCode": "12345",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.7128,
                "longitude": -74.0060
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "07:00",
                "closes": "19:00"
              },
              "sameAs": [
                "https://www.facebook.com/dumpsterrental",
                "https://www.twitter.com/dumpsterrental",
                "https://www.instagram.com/dumpsterrental"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
