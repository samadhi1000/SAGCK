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

  // Combine images to create a seamless infinite loop track
  const doubledImages = [...carouselImages, ...carouselImages];

  const handleOpenLightbox = (index: number) => {
    // We map the doubled image index back to the original index
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

  return (
    <section 
      id="gallery" 
      className="py-20 bg-neutral-light overflow-hidden"
      aria-labelledby="gallery-heading"
    >
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
      <div className="relative w-full overflow-hidden group/marquee py-6">
        
        {/* Soft edge blur using transparent gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-neutral-light to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-neutral-light to-transparent z-10 pointer-events-none" aria-hidden="true" />

        {/* The moving track */}
        <div 
          className="flex flex-row w-max gap-6 animate-marquee"
          role="region"
          aria-label="Image Loop. Hover to pause, click an image to enlarge."
        >
          {doubledImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleOpenLightbox(index)}
              className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[380px] flex flex-col rounded-xl overflow-hidden shadow-md border border-neutral-200 bg-white group/card text-left transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 focus-visible:outline focus-visible:outline-3 focus-visible:outline-accent"
              aria-label={`View full screen details for ${image.title}: ${image.description}`}
            >
              {/* Image wrapper with fixed height */}
              <div className="relative w-full h-52 sm:h-64 md:h-72 overflow-hidden bg-neutral-100 flex-shrink-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                />
                
                {/* Subtle gradient overlay to darken the bottom slightly for the zoom-in icon contrast */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />

                {/* Enlarge icon on hover */}
                <div 
                  className="absolute top-3 right-3 bg-secondary/80 backdrop-blur-sm p-2 rounded-full border border-white/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>

              {/* Text Content below the image */}
              <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between space-y-3 bg-gradient-to-b from-white to-neutral-50/50">
                <div className="space-y-1">
                  <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary">
                    {image.category}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-secondary leading-snug group-hover/card:text-primary transition-colors">
                    {image.title}
                  </h3>
                </div>
                
                <p className="font-sans text-[11px] sm:text-xs text-neutral-600 leading-relaxed line-clamp-2">
                  {image.description}
                </p>
                
                {/* Visual Indicator link decoration at the bottom */}
                <div className="pt-1 flex items-center text-[10px] font-bold uppercase tracking-wider text-accent group-hover/card:text-accent-hover transition-colors">
                  <span>View Photo</span>
                  <svg className="w-3 h-3 ml-1 transform transition-transform group-hover/card:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
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
