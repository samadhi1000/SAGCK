"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface PreloaderProps {
  onComplete: () => void;
}

// Interface defining the properties of a gold/silver particle
interface Particle {
  x: number;       // X position on canvas
  y: number;       // Y position on canvas
  size: number;    // Size/radius of the particle (0.5px to 2px)
  speedY: number;  // Vertical movement speed (drifts upwards)
  speedX: number;  // Base horizontal sway speed
  angle: number;   // Trigonometric angle for horizontal sine sway
  alpha: number;   // Opacity (starts at 1.0, decays to 0)
  decay: number;   // Opacity decay rate per frame
  color: string;   // Particle color (gold or silver)
}

export default function Preloader({ onComplete }: PreloaderProps) {
  // Motto text divided into two distinct lines for international standard typographic hierarchy
  const line1Text = "Virtus et Scientia";
  const line2Text = "Power & Knowledge";

  // States to control animations and sequencing
  const [logoVisible, setLogoVisible] = useState(false);
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // References for Canvas and particles
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Effect 1: Handle body scroll locking on mount and removal on cleanup
  useEffect(() => {
    document.documentElement.classList.add("lock-scroll");
    document.body.classList.add("lock-scroll");

    return () => {
      document.documentElement.classList.remove("lock-scroll");
      document.body.classList.remove("lock-scroll");
    };
  }, []);

  // Effect 2: Sequence the loading stages (Crest fade-in -> Start typing)
  useEffect(() => {
    // Stage A: Fade in the school crest after 300ms
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 300);

    // Stage B: Trigger typewriter start after 1100ms (once crest is fully visible and glowing)
    const typingStartTimer = setTimeout(() => {
      setIsTypingStarted(true);
    }, 1100);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(typingStartTimer);
    };
  }, []);

  // Effect 3: Two-Phase Typewriter Engine
  useEffect(() => {
    if (!isTypingStarted) return;

    let indexLine1 = 0;
    let indexLine2 = 0;
    let line1Finished = false;

    // Typing interval running at 45ms per character for an elegant, readable flow
    const typingInterval = setInterval(() => {
      if (!line1Finished) {
        // Phase 1: Type the Latin Motto (Line 1)
        if (indexLine1 < line1Text.length) {
          setTypedLine1(line1Text.slice(0, indexLine1 + 1));
          indexLine1++;
        } else {
          // Line 1 finished. Pause for 400ms before starting Line 2
          line1Finished = true;
          setTimeout(() => {
            // This timeout callback runs inside the context but handles phase shift
          }, 400);
        }
      } else {
        // Phase 2: Wait 400ms, then type the English Motto (Line 2)
        // We delay the index starting to create a pause between lines
        const delayFinished = indexLine1 >= line1Text.length;
        if (delayFinished) {
          // Delay offset counter
          staticDelayCount++;
          if (staticDelayCount < 8) return; // 8 ticks of ~45ms = ~360ms pause

          if (indexLine2 < line2Text.length) {
            setTypedLine2(line2Text.slice(0, indexLine2 + 1));
            indexLine2++;
          } else {
            // Typing completely finished! Clear interval and begin exit sequence
            clearInterval(typingInterval);
            setIsTypingComplete(true);

            // Wait 1200ms after typing finishes, then start fading out the preloader
            setTimeout(() => {
              setFadeOut(true);

              // Wait 800ms for CSS fadeout transition to complete, then call onComplete
              setTimeout(() => {
                document.documentElement.classList.remove("lock-scroll");
                document.body.classList.remove("lock-scroll");
                onComplete();

                // Dispatch global event so header and page sections animate their entrance
                window.dispatchEvent(new Event("site-loaded"));
              }, 800);
            }, 1200);
          }
        }
      }
    }, 45);

    let staticDelayCount = 0; // Local counter to implement delay between lines inside the interval loop

    return () => clearInterval(typingInterval);
  }, [isTypingStarted, onComplete]);

  // Effect 4: "Divine Look" Canvas Particle Dust System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    // Resize canvas to match screen viewport dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle color arrays
    const goldColors = [
      "rgba(212, 175, 55, ",  // Brand Gold #D4AF37
      "rgba(245, 230, 150, ", // Soft Champagne Gold
      "rgba(252, 211, 77, "   // Warm Light Amber
    ];
    const silverColors = [
      "rgba(243, 244, 246, ", // Pure Silver/White #F3F4F6
      "rgba(209, 213, 219, ", // Muted Silver
      "rgba(255, 255, 255, "  // White Glow
    ];

    // Helper to spawn a single premium particle
    const createParticle = (): Particle => {
      // Spawn area: Centered box around school crest and text (approx 400px wide, 250px tall)
      const spawnWidth = 350;
      const spawnHeight = 200;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2 - 20; // shifted slightly above absolute center

      return {
        x: centerX - spawnWidth / 2 + Math.random() * spawnWidth,
        y: centerY - spawnHeight / 2 + Math.random() * spawnHeight,
        size: 0.4 + Math.random() * 1.3, // very tiny: 0.4px to 1.7px for decent, non-intrusive look
        speedY: -(0.2 + Math.random() * 0.45), // slow upward drift
        speedX: -0.15 + Math.random() * 0.3, // slow base horizontal velocity
        angle: Math.random() * Math.PI * 2, // dynamic sway angle
        alpha: 0.1, // fade in slowly at spawn
        decay: 0.005 + Math.random() * 0.007, // slow opacity decay over time
        // 70% Gold particles, 30% Silver particles
        color: Math.random() > 0.3 
          ? goldColors[Math.floor(Math.random() * goldColors.length)] 
          : silverColors[Math.floor(Math.random() * silverColors.length)]
      };
    };

    // Animation loop using requestAnimationFrame for 60fps hardware-accelerated performance
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Low particle density (max 45 active) to preserve decent, professional international standard appearance
      const particles = particlesRef.current;
      if (particles.length < 45 && Math.random() < 0.15) {
        particles.push(createParticle());
      }

      // Update and draw active particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Let newly spawned particles fade-in to 0.7 max opacity, then decay
        if (p.alpha < 0.7 && p.decay > 0) {
          p.alpha += 0.02;
        } else {
          p.alpha -= p.decay;
        }

        // Apply physics: upward drift and horizontal sine-wave swaying
        p.y += p.speedY;
        p.angle += 0.015; // increment sway angle
        p.x += p.speedX + Math.sin(p.angle) * 0.25; // sine sway

        // Remove particle if opacity goes below 0 or leaves screen bounds
        if (p.alpha <= 0 || p.y < 0 || p.x < 0 || p.x > canvas.width) {
          particles.splice(i, 1);
          continue;
        }

        // Render particle with radial glow gradients
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.shadowColor = p.color.includes("212") ? "rgba(212, 175, 55, 0.4)" : "rgba(255, 255, 255, 0.4)";
        ctx.shadowBlur = p.size * 3; // soft glow effect
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow for next draw
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-secondary transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-live="polite"
      aria-label="Loading St. Anthony's Girls' College Kandy Website"
    >
      {/* 1. Canvas layer for HTML5 golden/silver particle dust */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. Dynamic Background Grid Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="flex flex-col items-center max-w-xl text-center px-6 space-y-10 z-10 select-none">
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
            className="h-24 w-24 md:h-32 md:w-32 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] filter"
          />
        </div>

        {/* 2-Line Motto Layout with Decent Typographic Hierarchy */}
        <div className="flex flex-col items-center justify-center space-y-3 min-h-[90px]">
          
          {/* Line 1: Latin Motto in Bold, Bright Gold Serif */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-accent drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] leading-tight h-[54px] flex items-center">
            {typedLine1}
            {/* Blinking cursor shows on Line 1 only while it is typing */}
            {!typedLine2 && typedLine1.length < line1Text.length && (
              <span className="inline-block w-1 h-8 ml-1 bg-accent/80 vertical-middle" aria-hidden="true" />
            )}
          </h2>

          {/* Line 2: English Motto in Uppercase, tracking-widest Warm White/Gold Sans-serif */}
          <h3 className="font-sans text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/75 h-[20px] flex items-center">
            {typedLine2}
            {/* Cursor moves to Line 2 once it starts typing and blinks on completion */}
            {typedLine1.length >= line1Text.length && (
              <span
                className={`inline-block w-0.5 h-4 ml-1 bg-white/70 vertical-middle ${
                  isTypingComplete ? "animate-cursor-blink" : "opacity-100"
                }`}
                aria-hidden="true"
              />
            )}
          </h3>

        </div>
      </div>
    </div>
  );
}
