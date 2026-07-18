import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sagck.vercel.app"),
  title: "St. Anthony’s Girls’ College | Kandy, Sri Lanka",
  description: "Official website of St. Anthony’s Girls’ College, Kandy. Empowering young women through quality education, academic excellence, and character development since 1938.",
  keywords: ["St. Anthony's Girls' College", "Kandy", "Sri Lanka", "School", "Education", "Girls School", "Admissions"],
  openGraph: {
    title: "St. Anthony’s Girls’ College | Kandy, Sri Lanka",
    description: "Official website of St. Anthony’s Girls’ College, Kandy. Empowering young women through quality education, academic excellence, and character development since 1938.",
    url: "https://sagck.vercel.app",
    siteName: "St. Anthony's Girls' College Kandy",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "St. Anthony's Girls' College Kandy Waving Flag and Crest",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "St. Anthony’s Girls’ College | Kandy, Sri Lanka",
    description: "Official website of St. Anthony’s Girls’ College, Kandy. Empowering young women through quality education, academic excellence, and character development since 1938.",
    images: ["/images/og-image.png"],
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
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-dark font-sans">
        {/* Skip to Content Link for WCAG AA compliance */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Global sticky navigation bar */}
        <Header />

        {/* Main layout wrapper */}
        <div className="flex-grow flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
