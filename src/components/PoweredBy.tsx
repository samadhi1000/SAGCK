"use client";

import React from "react";

interface PoweredByProps {
  /**
   * 'brand' uses Stack Unleash's signature orange/cyan gradients and animations.
   * 'adaptive' matches the host website's text color using Tailwind's text utilities.
   */
  theme?: "brand" | "adaptive";
  /**
   * Optional custom URL for click tracking or custom navigation.
   */
  href?: string;
  /**
   * Layout alignment. Defaults to 'center'.
   */
  align?: "left" | "center" | "right";
  /**
   * Additional CSS classes for styling adjustments.
   */
  className?: string;
}

export default function PoweredBy({
  theme = "brand",
  href = "https://stackunleash.com",
  align = "center",
  className = "",
}: PoweredByProps) {
  // Setup wrapper styles based on alignment
  const alignmentClass =
    align === "left"
      ? "justify-start text-left"
      : align === "right"
      ? "justify-end text-right"
      : "justify-center text-center";

  // Setup theme-based class name maps
  const isBrand = theme === "brand";

  return (
    <div className={`flex flex-col items-center py-6 ${className}`}>
      {/* CSS Styles to bundle animations inside the component so it is 100% self-contained */}
      <style jsx global>{`
        @keyframes su-gradient-flow {
          0% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        @keyframes su-text-shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        
        .su-brand-stack {
          background: linear-gradient(to right, #FF6B00 0%, #FFB800 25%, #FF6B00 50%, #FFB800 75%, #FF6B00 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: su-gradient-flow 4s linear infinite;
        }

        .su-brand-unleash {
          background: linear-gradient(to right, #06B6D4 0%, #8B5CF6 25%, #06B6D4 50%, #8B5CF6 75%, #06B6D4 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: su-gradient-flow 4s linear infinite;
        }

        .su-brand-shine {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(255, 255, 255, 0.45) 30%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0.45) 70%,
            rgba(255, 255, 255, 0.45) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: su-text-shine 3.5s linear infinite;
        }
        
        .su-adaptive-shine {
          background: linear-gradient(
            to right,
            currentColor 0%,
            currentColor 30%,
            rgba(255, 255, 255, 0.9) 50%,
            currentColor 70%,
            currentColor 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: su-text-shine 3.5s linear infinite;
        }
      `}</style>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-3 group transition-opacity duration-300 hover:opacity-95 ${alignmentClass}`}
        aria-label="Powered by Stack Unleash"
      >
        {/* Powered By Text Label */}
        <span className="text-xs uppercase tracking-widest text-slate-500 group-hover:text-slate-400 transition-colors">
          Powered By
        </span>

        <div className="flex items-start">
          {/* Reusable Inline SVG Logo Icon (Self-contained, premium, 3D style stack) */}
          <div className="transition-transform duration-300 group-hover:scale-105 flex-shrink-0 mr-1.5 mt-0.5">
            <svg 
              className={`w-9 h-9 ${isBrand ? "text-cyan" : "text-current"}`} 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="su-cyan-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="su-orange-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF6B00" />
                  <stop offset="100%" stopColor="#FFB800" />
                </linearGradient>
              </defs>
              
              {/* Layered Hex-Stack */}
              <path 
                d="M50 15 L80 30 L50 45 L20 30 Z" 
                fill={isBrand ? "#334155" : "rgba(100, 116, 139, 0.2)"} 
                stroke={isBrand ? "#475569" : "currentColor"} 
                strokeWidth="0.8" 
              />
              <path 
                d="M20 38 L50 53 L80 38 V46 L50 61 L20 46 Z" 
                fill={isBrand ? "#1E293B" : "rgba(71, 85, 105, 0.3)"} 
                stroke={isBrand ? "#334155" : "currentColor"} 
                strokeWidth="0.8" 
              />
              <path 
                d="M20 54 L50 69 L80 54 V62 L50 77 L20 62 Z" 
                fill={isBrand ? "#0F172A" : "rgba(30, 41, 59, 0.4)"} 
                stroke={isBrand ? "#1E293B" : "currentColor"} 
                strokeWidth="0.8" 
              />
              
              {/* Central Breakout Arrow Burst */}
              <path 
                d="M38 58 L54 42 H46 L62 26 L58 46 H66 L38 58 Z" 
                fill={isBrand ? "url(#su-cyan-gradient)" : "currentColor"} 
              />
            </svg>
          </div>

          {/* Typography details */}
          <div className="flex flex-col items-start leading-none pt-0.5">
            <div className="flex flex-col w-full leading-none">
              {/* STACK text block */}
              <div
                className={`w-full flex justify-between text-[11px] font-black leading-[0.85] tracking-widest ${
                  isBrand ? "su-brand-stack" : "text-current"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span>S</span><span>T</span><span>A</span><span>C</span><span>K</span>
              </div>
              
              {/* UNLEASH text block */}
              <span
                className={`text-[10px] font-black tracking-tight leading-[0.85] mt-[1.5px] block whitespace-nowrap ${
                  isBrand ? "su-brand-unleash" : "text-current opacity-90"
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                UNLEASH
              </span>
            </div>

            {/* Subtitle taglines */}
            <div
              className={`w-full flex justify-between text-[3.8px] font-black uppercase mt-1 ${
                isBrand ? "su-brand-shine" : "su-adaptive-shine"
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span>BUILD</span>
              <span>&bull;</span>
              <span>AUTOMATE</span>
              <span>&bull;</span>
              <span>SCALE</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
