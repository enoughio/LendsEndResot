import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
    weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ],
  style: ["normal", "italic"],
  variable: "--font-urbanist",
})

export const metadata: Metadata = {
  title: "Land's End Resoat",
  description: "The last resoat with neture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
