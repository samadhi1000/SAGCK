"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "History", href: "#history" },
  { label: "Clubs & Societies", href: "#clubs" },
  { label: "Sports", href: "#sports" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 90; // offset for sticky header
      
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.href.replace("#", ""));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href.replace("#", ""));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-primary/10 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo / School Brand */}
          <a
            href="#home"
            className="flex items-center focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="St. Anthony's Girls' College Kandy - Home"
          >
            <div className="flex items-center space-x-3 filter drop-shadow-[0_2px_5px_rgba(10,37,64,0.35)] md:drop-shadow-[0_2px_8px_rgba(10,37,64,0.45)]">
              <Image
                src="/images/logo.png"
                alt="St. Anthony's Girls' College Kandy Crest"
                width={64}
                height={64}
                priority
                className="h-12 w-12 md:h-16 md:w-16 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg md:text-2xl font-black tracking-tight text-gradient-logo leading-tight">
                  St. Anthony's Girls' College
                </span>
                <span className="font-sans text-[9px] md:text-xs font-bold tracking-widest text-secondary uppercase opacity-75">
                  Kandy
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-sans text-sm font-semibold tracking-wide transition-colors duration-200 relative py-2 focus-visible:outline-2 focus-visible:outline-accent ${
                    active
                      ? "text-primary font-bold"
                      : "text-secondary hover:text-primary"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {active && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent rounded-full motion-safe:animate-fade-in"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}

          </nav>

          {/* Mobile Hamburger Menu Trigger */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded text-secondary hover:text-primary hover:bg-neutral-light focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        id="mobile-menu"
        className={`lg:hidden transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "max-h-[400px] border-b border-primary/10 opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white sm:px-3">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-semibold transition-colors ${
                  active
                    ? "bg-primary/5 text-primary border-l-4 border-accent font-bold"
                    : "text-secondary hover:bg-neutral-light hover:text-primary"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
