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
  const [imageOpacity, setImageOpacity] = useState("opacity-50");
  const [overlayOpacity, setOverlayOpacity] = useState("opacity-95");

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;

    // Reset to initial dark state whenever the active index changes
    setImageOpacity("opacity-50");
    setOverlayOpacity("opacity-95");

    // 1.2s: Fade overlay out to 15% and bring image to 85% opacity (image shines clear!)
    t1 = setTimeout(() => {
      setOverlayOpacity("opacity-15");
      setImageOpacity("opacity-85");
    }, 1200);

    // 4.8s: Fade overlay back to 95% and bring image down to 45% (dimmed for text reading)
    t2 = setTimeout(() => {
      setOverlayOpacity("opacity-95");
      setImageOpacity("opacity-45");
    }, 4800);

    // 7.2s: Fade out active image completely to reveal background grid
    t3 = setTimeout(() => {
      setImageOpacity("opacity-0");
    }, 7200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeIndex]);

  useEffect(() => {
    // Increment active index every 8.2 seconds (allowing 1 second of dark space between slides)
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 8200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-secondary">
      
      {/* 1. Academic Grid Overlay (Underneath the images) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-10" 
        aria-hidden="true" 
      />

      {/* 2. Cross-fading Background Images */}
      {HERO_IMAGES.map((src, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? imageOpacity : "opacity-0"
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
      
      {/* 3. Dark Tint overlay (Fades in and out to highlight image vs text) */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-secondary via-secondary/60 to-primary/80 transition-opacity duration-[1200ms] ease-in-out z-20 ${overlayOpacity}`} 
        aria-hidden="true" 
      />
    </div>
  );
}
