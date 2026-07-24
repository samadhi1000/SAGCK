"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  // Complete motto text to be typed out
  const mottoText = "Virtus et Scientia | Power & Knowledge";
  
  // States to control animations
  const [logoVisible, setLogoVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Effect 1: Handle scroll locking on the body when preloader is active
  useEffect(() => {
    // Lock scrolling immediately when component mounts
    document.documentElement.classList.add("lock-scroll");
    document.body.classList.add("lock-scroll");

    return () => {
      // Re-enable scrolling when component unmounts
      document.documentElement.classList.remove("lock-scroll");
      document.body.classList.remove("lock-scroll");
    };
  }, []);

  // Effect 2: Sequence the animations (Logo fade-in -> Start typing -> Complete -> Fade-out preloader)
  useEffect(() => {
    // Step A: Fade in the crest/logo after 300ms
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 300);

    // Step B: Trigger the start of typewriter animation after 1200ms (once logo is clearly visible)
    const typingStartTimer = setTimeout(() => {
      setIsTypingStarted(true);
    }, 1200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(typingStartTimer);
    };
  }, []);

  // Effect 3: Typewriter engine running character by character
  useEffect(() => {
    if (!isTypingStarted) return;

    let index = 0;
    // Typing speed: 45ms per character for an elegant, snappy feel
    const typingInterval = setInterval(() => {
      if (index < mottoText.length) {
        setTypedText(mottoText.slice(0, index + 1));
        index++;
      } else {
        // Typing finished! Clear interval and trigger completion sequence
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        
        // Wait 1000ms after text is fully shown, then start fading out the preloader
        setTimeout(() => {
          setFadeOut(true);
          
          // Wait 800ms for fadeout animation to complete, then call onComplete
          setTimeout(() => {
            // Remove scroll lock before layout shift
            document.documentElement.classList.remove("lock-scroll");
            document.body.classList.remove("lock-scroll");
            onComplete();
            
            // Dispatch a global event so that Header/Hero sections know to play their entry animations
            window.dispatchEvent(new Event("site-loaded"));
          }, 800); // matches the transition duration in JSX
        }, 1000);
      }
    }, 45);

    return () => clearInterval(typingInterval);
  }, [isTypingStarted, onComplete]);

  // Helper function to color code portions of the motto as they are typed:
  // "Virtus et Scientia" -> Bright Gold (#D4AF37)
  // " | "                 -> Subtle Gold / Off-white (opacity-40)
  // "Power & Knowledge"   -> Warm Gold (#FCD34D / accent-light)
  const renderStyledText = (text: string) => {
    if (text.length <= 18) {
      // Still typing "Virtus et Scientia"
      return <span className="text-accent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{text}</span>;
    } else if (text.length <= 21) {
      // Typed "Virtus et Scientia" + starting or completed the divider " | "
      return (
        <>
          <span className="text-accent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">Virtus et Scientia</span>
          <span className="text-white/40 font-light">{text.slice(18)}</span>
        </>
      );
    } else {
      // Completed Latin motto, divider, and typing English motto "Power & Knowledge"
      return (
        <>
          <span className="text-accent drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] font-black">Virtus et Scientia</span>
          <span className="text-white/40 font-light"> | </span>
          <span className="text-accent/90 drop-shadow-[0_0_10px_rgba(212,175,55,0.2)] font-medium">
            {text.slice(21)}
          </span>
        </>
      );
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-secondary transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-live="polite"
      aria-label="Loading St. Anthony's Girls' College Kandy Website"
    >
      {/* Dynamic Background Grid Pattern for premium aesthetics */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="flex flex-col items-center max-w-xl text-center px-6 space-y-8 z-10">
        {/* School Crest Logo with high-end fade and glow */}
        <div
          className={`transition-all duration-1000 transform ${
            logoVisible 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 translate-y-6 scale-95"
          }`}
        >
          <Image
            src="/images/logo.png"
            alt="St. Anthony's Girls' College Kandy Crest"
            width={128}
            height={128}
            priority
            className="h-24 w-24 md:h-32 md:w-32 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.65)] filter"
          />
        </div>

        {/* Motto Text typing zone */}
        <div className="h-16 flex items-center justify-center">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest leading-relaxed">
            {renderStyledText(typedText)}
            
            {/* Blinking typewriter cursor */}
            <span 
              className={`inline-block w-1.5 h-6 md:h-8 ml-1 bg-accent/80 vertical-middle transition-opacity ${
                isTypingComplete ? "animate-cursor-blink" : "opacity-100"
              }`}
              aria-hidden="true"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
