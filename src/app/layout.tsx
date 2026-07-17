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
  title: "St. Anthony’s Girls’ College | Kandy, Sri Lanka",
  description: "Official website of St. Anthony’s Girls’ College, Kandy. Empowering young women through quality education, academic excellence, and character development since 1889.",
  keywords: ["St. Anthony's Girls' College", "Kandy", "Sri Lanka", "School", "Education", "Girls School", "Admissions"],
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
