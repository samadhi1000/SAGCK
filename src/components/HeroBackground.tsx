"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const HERO_IMAGES = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.png",
  "/images/hero/hero-5.jpg",
];

export default function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Smooth transition every 6 seconds
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-secondary">
      
      {/* 1. Academic Grid Overlay (Underneath the images) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-10" 
        aria-hidden="true" 
      />

      {/* 2. Cross-fading Background Images */}
      {HERO_IMAGES.map((src, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              isActive ? "opacity-35" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="St. Anthony's Girls' College Kandy Campus Life"
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        );
      })}
      
      {/* 3. Constant Premium Dark Gradient Overlay (Guarantees constant text legibility and WCAG AA contrast) */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/70 to-secondary/95 z-20" 
        aria-hidden="true" 
      />
    </div>
  );
}
