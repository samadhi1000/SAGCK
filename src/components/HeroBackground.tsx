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
  const [bgImage, setBgImage] = useState(HERO_IMAGES[0]);
  const [opacityClass, setOpacityClass] = useState("opacity-50");
  const [overlayOpacity, setOverlayOpacity] = useState("opacity-100");

  useEffect(() => {
    // Select a random starting image on mount if it's the first render
    const randomIndex = Math.floor(Math.random() * HERO_IMAGES.length);
    
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;
    let t4: NodeJS.Timeout;

    const startTransitionSequence = () => {
      // 0s: Image is visible (opacity-50) and overlay is fully active (opacity-100)
      setOpacityClass("opacity-50");
      setOverlayOpacity("opacity-100");

      // 1s: Fade overlay to 0% and increase image opacity to 85% for a solid, clear view
      t1 = setTimeout(() => {
        setOverlayOpacity("opacity-0");
        setOpacityClass("opacity-85");
      }, 1000);

      // 4s: Fade overlay back to 100% and return image to 50% opacity for text legibility
      t2 = setTimeout(() => {
        setOverlayOpacity("opacity-100");
        setOpacityClass("opacity-50");
      }, 4000);

      // 7s: Fade out the image completely (reveals the structural grid lines underneath)
      t3 = setTimeout(() => {
        setOpacityClass("opacity-0");
      }, 7000);

      // 8s: Swap image and trigger the next loop iteration
      t4 = setTimeout(() => {
        setBgImage((prevImage) => {
          const currentIndex = HERO_IMAGES.indexOf(prevImage);
          const nextIndex = (currentIndex + 1) % HERO_IMAGES.length;
          return HERO_IMAGES[nextIndex];
        });
      }, 8000);
    };

    startTransitionSequence();

    // Clean up all timeouts on unmount or when image transitions to prevent memory leaks
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [bgImage]);

  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden bg-secondary">
      
      {/* 1. Academic Grid Overlay (Underneath the images) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* 2. Dynamic Background Image (Middle layer) */}
      <Image
        src={bgImage}
        alt="St. Anthony's Girls' College Kandy Campus Life"
        fill
        priority
        className={`object-cover transition-opacity duration-1000 ease-in-out ${opacityClass}`}
      />
      
      {/* 3. Dark Tint overlay (Top-most layer, fades out and in smoothly) */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-secondary/85 via-secondary/45 to-primary/85 transition-opacity duration-1000 ease-in-out ${overlayOpacity}`} 
        aria-hidden="true" 
      />
    </div>
  );
}
