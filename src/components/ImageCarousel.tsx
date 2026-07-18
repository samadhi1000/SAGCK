"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
}

const carouselImages: CarouselImage[] = [
  {
    src: "/images/carousel/student-portrait.jpg",
    alt: "Primary student in St. Anthony's Girls' College school uniform with braids",
    category: "Antonian Legacy",
    title: "Nurturing Virtue & Knowledge",
    description: "Our younger students start their journey grounded in core values and academic curiosity."
  },
  {
    src: "/images/carousel/traditional-dance.jpg",
    alt: "Students performing traditional Sri Lankan dance on the college field",
    category: "Culture & Aesthetics",
    title: "Rhythm of Heritage",
    description: "Preserving and celebrating rich Sri Lankan cultural traditions through classical dance."
  },
  {
    src: "/images/carousel/achievers.jpg",
    alt: "Two students wearing blue blazers with academic medals holding the college flag",
    category: "Student Pride",
    title: "Championship Leaders",
    description: "Empowered daughters of St. Anthony's representing the college with outstanding achievements."
  },
  {
    src: "/images/carousel/school-band.jpg",
    alt: "School band in blue and white checked uniforms playing wind instruments in formation",
    category: "Music & Synergy",
    title: "The Sound of Unity",
    description: "The collegiate band performs at national events, exhibiting harmony and dedication."
  },
  {
    src: "/images/carousel/gymnastics.jpg",
    alt: "Students creating a human pyramid gymnastics formation on the field",
    category: "Sports & Athletics",
    title: "Strength & Balance",
    description: "Showcasing teamwork, physical agility, and discipline in athletic demonstrations."
  },
  {
    src: "/images/carousel/teachers.jpg",
    alt: "Two teachers in sarees wearing sunglasses coordinating sports events on the field",
    category: "Staff & Guidance",
    title: "Dedication in Leadership",
    description: "Our teachers and administrative staff coordinating events and guiding students on sports day."
  },
  {
    src: "/images/carousel/team-hug.jpg",
    alt: "A group of students in school blazers embracing in a team hug on the field",
    category: "Sportsmanship",
    title: "Sisterhood & Celebration",
    description: "Students sharing a warm, emotional victory hug representing unit cohesion and sports meet success."
  },
  {
    src: "/images/carousel/cheerleaders.jpg",
    alt: "Students with blue and yellow face paint cheering and screaming with joy",
    category: "Antonian Spirit",
    title: "Vibrant House Pride",
    description: "Students cheer enthusiastically with house face paint, manifesting support and camaraderie."
  },
  {
    src: "/images/carousel/parade-guests.jpg",
    alt: "Distinguished guests walking in parade with flowers and formal attire",
    category: "Ceremonial Events",
    title: "Guests of Honor Parade",
    description: "Distinguished guests, alumni, and school board members welcomed to the annual athletic meet."
  }
];

export default function ImageCarousel() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  // Physics & Animation state refs (retains state across frames without triggering React re-renders)
  const scrollPosRef = useRef(0);
  const currentSpeedRef = useRef(-0.06); // pixels per millisecond (starts at default auto-scroll speed)
  const targetSpeedRef = useRef(-0.06);
  const isHoveredRef = useRef(false);
  const mouseXRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Dragging state refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastTouchXRef = useRef(0);
  const lastTouchTimeRef = useRef(0);
  const touchVelocityRef = useRef(0);
  const dragStartScrollPosRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const handleOpenLightbox = (index: number) => {
    if (dragDistanceRef.current > 10) {
      // Ignore click if the user was dragging/swiping
      return;
    }
    const originalIndex = index % carouselImages.length;
    setCurrentIndex(originalIndex);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  }, []);

  // Listen to keyboard controls for accessibility
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Focus close button on open
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, handleCloseLightbox, handleNext, handlePrev]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [lightboxOpen]);

  // Animation Loop & Drag Listeners
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!container || !track || !group) return;

    // Turn off pure CSS marquee animation to let JS take control
    track.style.setProperty("animation", "none", "important");

    let lastTime = performance.now();

    const update = (time: number) => {
      const dt = Math.min(time - lastTime, 100); // limit delta time to avoid jumps on tab switch
      lastTime = time;

      const halfWidth = group.getBoundingClientRect().width;
      if (halfWidth === 0) {
        animationFrameIdRef.current = requestAnimationFrame(update);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;

      if (isDraggingRef.current) {
        // Handle boundary wrap-around during drag
        if (scrollPosRef.current <= -halfWidth) {
          scrollPosRef.current += halfWidth;
          startXRef.current += halfWidth;
          lastTouchXRef.current += halfWidth;
        } else if (scrollPosRef.current > 0) {
          scrollPosRef.current -= halfWidth;
          startXRef.current -= halfWidth;
          lastTouchXRef.current -= halfWidth;
        }
        currentSpeedRef.current = 0;
        targetSpeedRef.current = 0;
      } else {
        if (isHoveredRef.current) {
          const relativeX = mouseXRef.current - containerRect.left;
          const center = containerWidth / 2;
          const distanceFromCenter = relativeX - center;
          const deadzone = containerWidth * 0.15;

          if (Math.abs(distanceFromCenter) < deadzone) {
            targetSpeedRef.current = 0;
          } else {
            const sign = distanceFromCenter > 0 ? -1 : 1;
            const activeRange = center - deadzone;
            const excess = Math.abs(distanceFromCenter) - deadzone;
            const ratio = Math.min(excess / activeRange, 1);
            
            // Limit max speed to 0.45px/ms (approx 7.5px/frame at 60fps)
            const maxSpeedMs = 0.45;
            targetSpeedRef.current = sign * ratio * maxSpeedMs;
          }
        } else {
          // Default auto-scroll speed (approx 1px/frame at 60fps)
          targetSpeedRef.current = -0.06;
        }

        // Lerp speed transition: frame-rate independent
        const lerpCoefficient = 1 - Math.exp(-0.005 * dt);
        currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * lerpCoefficient;

        scrollPosRef.current += currentSpeedRef.current * dt;

        // Wrap around boundaries
        if (scrollPosRef.current <= -halfWidth) {
          scrollPosRef.current += halfWidth;
        } else if (scrollPosRef.current > 0) {
          scrollPosRef.current -= halfWidth;
        }
      }

      track.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;

      animationFrameIdRef.current = requestAnimationFrame(update);
    };

    animationFrameIdRef.current = requestAnimationFrame(update);

    // Global mouseup event listener to handle drag releases outside the container
    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        currentSpeedRef.current = touchVelocityRef.current;
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  // Event handlers for desktop/mouse
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      currentSpeedRef.current = touchVelocityRef.current;
    }
    isHoveredRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseXRef.current = e.clientX;

    if (isDraggingRef.current) {
      const currentX = e.clientX;
      const currentTime = performance.now();
      const deltaX = currentX - startXRef.current;
      
      scrollPosRef.current = dragStartScrollPosRef.current + deltaX;
      dragDistanceRef.current = Math.abs(deltaX);

      const dt = currentTime - lastTouchTimeRef.current;
      if (dt > 0) {
        const dx = currentX - lastTouchXRef.current;
        const velocity = dx / dt;
        touchVelocityRef.current = Math.max(Math.min(velocity, 0.8), -0.8);
      }
      lastTouchXRef.current = currentX;
      lastTouchTimeRef.current = currentTime;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only left click triggers drag
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastTouchXRef.current = e.clientX;
    lastTouchTimeRef.current = performance.now();
    dragStartScrollPosRef.current = scrollPosRef.current;
    dragDistanceRef.current = 0;
    touchVelocityRef.current = 0;
    currentSpeedRef.current = 0;
    targetSpeedRef.current = 0;
  };

  // Event handlers for touch/mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    isHoveredRef.current = false;
    startXRef.current = e.touches[0].clientX;
    lastTouchXRef.current = e.touches[0].clientX;
    lastTouchTimeRef.current = performance.now();
    dragStartScrollPosRef.current = scrollPosRef.current;
    dragDistanceRef.current = 0;
    touchVelocityRef.current = 0;
    currentSpeedRef.current = 0;
    targetSpeedRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const currentX = e.touches[0].clientX;
    const currentTime = performance.now();
    const deltaX = currentX - startXRef.current;
    
    scrollPosRef.current = dragStartScrollPosRef.current + deltaX;
    dragDistanceRef.current = Math.abs(deltaX);

    const dt = currentTime - lastTouchTimeRef.current;
    if (dt > 0) {
      const dx = currentX - lastTouchXRef.current;
      const velocity = dx / dt;
      touchVelocityRef.current = Math.max(Math.min(velocity, 0.8), -0.8);
    }
    lastTouchXRef.current = currentX;
    lastTouchTimeRef.current = currentTime;
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      currentSpeedRef.current = touchVelocityRef.current;
    }
  };

  return (
    <section 
      id="gallery" 
      className="py-20 bg-neutral-light overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      {/* Inline styles to guarantee marquee animation execution, bypassing bundler/Tailwind v4 purging */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollMarqueeCustom {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-container-custom {
          width: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          padding: 1.5rem 0;
          user-select: none;
        }
        .marquee-track-custom {
          display: flex;
          width: max-content;
          animation: scrollMarqueeCustom 35s linear infinite;
          will-change: transform;
        }
        .marquee-group-custom {
          display: flex;
          gap: 1.5rem;
          padding-right: 1.5rem;
        }
        .marquee-card-custom {
          width: 280px;
          height: 360px;
          border-radius: 0.75rem;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.08);
          flex-shrink: 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          background: white;
        }
        @media (min-width: 640px) {
          .marquee-card-custom {
            width: 320px;
            height: 390px;
          }
        }
        .marquee-card-custom:hover {
          transform: scale(1.02) translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-sans text-sm font-bold uppercase tracking-wider text-primary">
            Life at St. Anthony's
          </span>
          <h2 id="gallery-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-secondary">
            Vibrant Moments of Our College
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded" aria-hidden="true" />
          <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
            Take a glimpse into the diverse experiences, cultural activities, and sporting events that define our daily academic and extracurricular landscape.
          </p>
        </div>
      </div>

      {/* Infinite scrolling marquee track container */}
      <div 
        ref={containerRef}
        className="marquee-container-custom cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Soft edge blur using transparent gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-neutral-light to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-neutral-light to-transparent z-10 pointer-events-none" aria-hidden="true" />

        {/* The moving track */}
        <div ref={trackRef} className="marquee-track-custom">
          
          {/* Group 1 */}
          <div ref={groupRef} className="marquee-group-custom">
            {carouselImages.map((image, index) => (
              <button
                key={`g1-${index}`}
                onClick={() => handleOpenLightbox(index)}
                className="group marquee-card-custom text-left focus-visible:outline focus-visible:outline-3 focus-visible:outline-accent"
                aria-label={`View full screen details for ${image.title}: ${image.description}`}
              >
                {/* Image wrapper */}
                <div className="relative w-full h-[180px] sm:h-[220px] overflow-hidden bg-neutral-100 flex-shrink-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </div>

                {/* Text Content */}
                <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-neutral-50/50">
                  <div className="space-y-1">
                    <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary">
                      {image.category}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-secondary leading-snug group-hover:text-primary transition-colors">
                      {image.title}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs text-neutral-600 leading-relaxed line-clamp-2 mt-1">
                      {image.description}
                    </p>
                  </div>
                  <div className="pt-1 flex items-center text-[10px] font-bold uppercase tracking-wider text-accent">
                    <span>View Photo</span>
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Group 2 (Duplicate for seamless loop) */}
          <div className="marquee-group-custom" aria-hidden="true">
            {carouselImages.map((image, index) => (
              <button
                key={`g2-${index}`}
                onClick={() => handleOpenLightbox(index)}
                className="group marquee-card-custom text-left focus-visible:outline focus-visible:outline-3 focus-visible:outline-accent"
                tabIndex={-1}
              >
                {/* Image wrapper */}
                <div className="relative w-full h-[180px] sm:h-[220px] overflow-hidden bg-neutral-100 flex-shrink-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </div>

                {/* Text Content */}
                <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-neutral-50/50">
                  <div className="space-y-1">
                    <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary">
                      {image.category}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-secondary leading-snug group-hover:text-primary transition-colors">
                      {image.title}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs text-neutral-600 leading-relaxed line-clamp-2 mt-1">
                      {image.description}
                    </p>
                  </div>
                  <div className="pt-1 flex items-center text-[10px] font-bold uppercase tracking-wider text-accent">
                    <span>View Photo</span>
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Full screen Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-neutral-dark/95 z-50 backdrop-blur-lg flex flex-col justify-between items-center p-4 transition-all duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox Viewer"
        >
          {/* Top bar control */}
          <div className="w-full max-w-6xl flex justify-between items-center py-2 text-white">
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-neutral-light/75">
              IMAGE {currentIndex + 1} OF {carouselImages.length}
            </span>
            <button
              ref={closeButtonRef}
              onClick={handleCloseLightbox}
              className="p-2 sm:p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close lightbox"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Content Area (Nav + Image + Nav) */}
          <div className="flex-grow w-full flex items-center justify-between max-w-6xl gap-4 my-4 relative">
            
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 z-10 p-2 sm:p-4 rounded-full bg-white/10 border border-white/25 hover:bg-white/20 text-white transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Enlarged Image */}
            <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center select-none">
              <Image
                src={carouselImages[currentIndex].src}
                alt={carouselImages[currentIndex].alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain max-w-full max-h-full transition-all duration-300"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 z-10 p-2 sm:p-4 rounded-full bg-white/10 border border-white/25 hover:bg-white/20 text-white transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>

          {/* Bottom Caption Card */}
          <div className="w-full max-w-4xl bg-secondary/80 backdrop-blur-md border border-white/10 p-6 rounded-xl text-white text-center space-y-2 mb-4 shadow-2xl transition-all duration-300">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">
              {carouselImages[currentIndex].category}
            </span>
            <h3 className="font-serif text-lg sm:text-2xl font-bold">
              {carouselImages[currentIndex].title}
            </h3>
            <p className="max-w-2xl mx-auto font-sans text-xs sm:text-sm text-neutral-light/95 leading-relaxed">
              {carouselImages[currentIndex].description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
