import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import NavBaR from "@/components/NavBaR";
import StructuredData from "@/components/StructuredData";
import { Providers } from "@/components/Providers";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300","400","600","700"], // whenever tailwind class "font-semibold" or "font-bold" is used they will pick the nearest downloaded font weight text from this provided options array. By default tailwind uses font weights normal -> "400", semibold -> "600", bold -> "700". And that is why i provided the exact matching font weight texts.
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Land's End Resort | Sumiran Forest - Eco Resort Bhopal",
    template: "%s | Land's End Resort"
  },
  description: "Experience nature at Land's End Resort in Sumiran Forest, Bhopal. 600 acres of pristine forest, AQI <10, naturally alkaline water. Book your eco-friendly stay today.",
  keywords: ["eco resort", "Bhopal resort", "nature resort", "Sumiran Forest", "Land's End Resort", "sustainable tourism", "forest resort", "wildlife resort", "eco-friendly accommodation", "Madhya Pradesh resort"],
  authors: [{ name: "Land's End Resort" }],
  creator: "Land's End Resort",
  publisher: "Land's End Resort",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://landsend.bharatstorytellers.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Land's End Resort | Sumiran Forest - Eco Resort Near Bhopal",
    description: "Experience nature at its finest. 600 acres of pristine forest with AQI <10, naturally alkaline water, and sustainable living.",
    url: 'https://landsend.bharatstorytellers.com',
    siteName: "Land's End Resort",
    images: [
      {
        url: '/gallery/room1.jpeg',
        width: 1200,
        height: 630,
        alt: "Land's End Resort - Sumiran Forest",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Land's End Resort | Sumiran Forest",
    description: "Experience nature at its finest. 600 acres of pristine forest with AQI <10 near Bhopal, Madhya Pradesh.",
    images: ['/gallery/room1.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`${urbanist.className} relative`}>
        <Providers>
          <Analytics />
          <NavBaR />
          {children}
          {/* <Fotter /> */}
        </Providers>
      </body>
    </html>
  );
}
