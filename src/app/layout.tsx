import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import NavBaR from "@/components/NavBaR";
import StructuredData from "@/components/StructuredData";
import ToastProvider from "@/components/ToastProvider";
import { headers } from "next/headers";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300","400","600","700"], // whenever tailwind class "font-semibold" or "font-bold" is used they will pick the nearest downloaded font weight text from this provided options array. By default tailwind uses font weights normal -> "400", semibold -> "600", bold -> "700". And that is why i provided the exact matching font weight texts.
  display: "swap",
});

const defaultSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://landsend.storyretreat.in";

const baseMetadata: Metadata = {
  title: {
    default: "Land's End | Home",
    template: "%s"
  },
  icons: {
    icon: '/lendsend.ico',
    shortcut: '/lendsend.ico',
    apple: '/lendsend.ico',
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
  openGraph: {
    title: "Land's End Resort | Sumiran Forest - Eco Resort Near Bhopal",
    description: "Experience nature at its finest. 600 acres of pristine forest with AQI <10, naturally alkaline water, and sustainable living.",
    siteName: "Land's End Resort",
    images: [
      {
        url: '/night sky.svg',
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

async function getRequestBaseUrl(): Promise<URL> {
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "https";

  if (!host) {
    return new URL(defaultSiteUrl);
  }

  return new URL(`${proto}://${host}`);
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getRequestBaseUrl();

  return {
    ...baseMetadata,
    metadataBase: baseUrl,
    alternates: {
      canonical: "./",
    },
    openGraph: {
      ...baseMetadata.openGraph,
      url: baseUrl.toString(),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="uhe6IQP9A2nK8QftgqSXA03aFExfUX-O7Z_h3kmhYpE" />
        <StructuredData />
      </head>
      <body className={`${urbanist.className} relative`}>
        <Analytics />
        <NavBaR />
        {children}
        <ToastProvider />
        {/* <Fotter /> */}
      </body>
    </html>
  );
}
