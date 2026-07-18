"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface IndexItem {
  id: string;
  label: string;
  num: string;
}

const INDEX_ITEMS: IndexItem[] = [
  { id: "about-intro", label: "Introduction", num: "01" },
  { id: "about-vision", label: "Vision & Mission", num: "02" },
  { id: "about-principal", label: "Principal's Message", num: "03" },
  { id: "history", label: "Historical Timeline", num: "04" },
];

const DEPUTY_PRINCIPALS = [
  {
    name: "Mrs. M. H. Hettiarachchi",
    role: "Deputy Principal - Administration",
    quote: "Our goal is to maintain a seamless, safe, and resource-rich environment that supports our educators and students in their daily pursuits.",
    color: "border-l-accent",
    image: "/images/deputy/hettiarachchi.png",
  },
  {
    name: "Mrs. K. L. Gunawardena",
    role: "Deputy Principal - Academics",
    quote: "We strive to implement an engaging, modern curriculum that cultivates critical thinking, analytical depth, and academic brilliance in every student.",
    color: "border-l-primary",
    image: "/images/deputy/deputy-2.png",
  },
  {
    name: "Mrs. S. Rajapakse",
    role: "Deputy Principal - Co-Curricular",
    quote: "Extracurricular activities build character. We offer over 50 sports and societies to develop holistic leadership and teamwork in every Antonian.",
    color: "border-l-accent",
    image: "/images/deputy/deputy-3.png",
  },
  {
    name: "Mrs. J. M. Wijesinghe",
    role: "Deputy Principal - Discipline & Welfare",
    quote: "Character and discipline are the foundations of science. We foster a culture of mutual respect, civic responsibility, and high moral integrity.",
    color: "border-l-primary",
    image: "/images/deputy/deputy-4.png",
  },
];

export default function AboutSection() {
  const [activeSection, setActiveSection] = useState("about-intro");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up Intersection Observer for Scroll Spy
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find the entry that is currently intersecting the viewport
      const visibleEntry = entries.find(entry => entry.isIntersecting);
      if (visibleEntry) {
        setActiveSection(visibleEntry.target.id);
      }
    };

    // We set rootMargin to detect sections when they are around the center of the viewport
    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.1,
    });

    // Observe each sub-section
    INDEX_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // For history timeline, scroll to its section offset
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <section 
      id="about" 
      className="py-20 bg-neutral-light text-neutral-dark border-b border-primary/5 relative scroll-mt-16"
      aria-labelledby="about-main-heading"
    >
      {/* Abstract gold decorative circle in background */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Sticky Navigation Index */}
          <nav 
            className="lg:col-span-3 lg:sticky lg:top-28 z-20 p-4 bg-white/60 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none rounded-xl border border-neutral-200 lg:border-none shadow-sm lg:shadow-none"
            aria-label="About section index"
          >
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-extrabold uppercase tracking-widest text-secondary/60 hidden lg:block mb-6">
                Index
              </h3>
              
              {/* Index menu - turns into flex row on mobile, vertical list on desktop */}
              <ul className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 lg:gap-4 pb-2 lg:pb-0 scrollbar-none">
                {INDEX_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id} className="flex-shrink-0">
                      <button
                        onClick={() => handleScrollTo(item.id)}
                        className={`flex items-center space-x-3 px-3 py-2 lg:px-0 lg:py-1 rounded-md text-left transition-all font-sans text-xs sm:text-sm font-bold uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          isActive
                            ? "text-primary bg-primary/5 lg:bg-transparent translate-x-1 lg:translate-x-2"
                            : "text-neutral-500 hover:text-secondary hover:translate-x-1"
                        }`}
                      >
                        {/* Gold numbering marker */}
                        <span className={`text-[10px] md:text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                          isActive ? "bg-accent text-secondary" : "bg-neutral-200 text-neutral-600"
                        }`}>
                          {item.num}
                        </span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* RIGHT COLUMN: Scrolling Content Area */}
          <div className="lg:col-span-9 space-y-24">
            
            {/* SUB-SECTION 01: Introduction & Flag */}
            <div 
              id="about-intro" 
              className="space-y-8 scroll-mt-28"
            >
              <div className="space-y-4">
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-primary">
                  Welcome to St. Anthony’s Girls' College
                </span>
                <h2 id="about-main-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-secondary">
                  Empowering Minds, Shaping Generations
                </h2>
                <div className="w-20 h-1 bg-accent rounded" aria-hidden="true" />
              </div>

              <div className="space-y-4 text-neutral-600 font-sans text-base leading-relaxed">
                <p className="font-bold text-secondary text-lg">
                  Welcome!
                </p>
                <p>
                  Our school was started on 10th May 1938 by Rev. Fr. Corne Hyid in the ancient region of the hill country. Under the name of "Good Shepherd Convent", there had been only ten students then, and currently, it shelters nearly 4000 students of different nationalities and religions.
                </p>
                <p>
                  Today we are one of the leading schools named St. Anthony's Girls' College in the most beautiful and most sacred city of Kandy, bringing forth eminent daughters to strengthen the nation.
                </p>
              </div>

              {/* Grid with Flag & Alumni Quote */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
                <div className="md:col-span-6 flex flex-col items-center justify-center">
                  <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-xl overflow-hidden shadow-md border-2 border-accent p-1 bg-white">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src="/images/flag.jpg"
                        alt="Official Flag of St. Anthony's Girls' College - Light Blue, Navy Blue, and Gold"
                        fill
                        sizes="(max-width: 768px) 320px, 320px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <p className="mt-2 font-sans text-xs font-bold uppercase tracking-wider text-secondary text-center">
                    The College Flag: Double Blue & Gold
                  </p>
                </div>

                <div className="md:col-span-6 relative p-6 rounded-xl bg-white border border-neutral-200/60 shadow-sm flex flex-col justify-center">
                  <blockquote className="space-y-4 my-auto">
                    <p className="font-serif italic text-sm sm:text-base text-neutral-600 leading-relaxed">
                      "Virtue and knowledge represent the twin pillars on which we construct our lives. St. Anthony's teaches us not just how to perform in exams, but how to lead with grace."
                    </p>
                    <footer className="font-sans text-[10px] font-bold tracking-widest text-primary uppercase">
                      — Antonian Alumni Association
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>


            {/* SUB-SECTION 02: Vision & Mission (Staggered modern layout) */}
            <div 
              id="about-vision" 
              className="space-y-12 scroll-mt-28"
            >
              <div className="space-y-4">
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-primary">
                  Core Principles
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-secondary">
                  Vision & Mission
                </h2>
                <div className="w-16 h-1 bg-accent rounded" aria-hidden="true" />
              </div>

              {/* Staggered Diagonal Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Vision Card (Left - Normal align) */}
                <div className="group border-l-4 border-accent rounded-xl p-6 md:p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Modern SVG Telescope/Compass Icon */}
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-secondary transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-secondary">Our Vision</h3>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
                    To be the leading girls' college in Sri Lanka, recognized for developing global female leaders anchored in virtue, academic supremacy, and holistic personal development.
                  </p>
                </div>

                {/* Mission Card (Right - Offset down on desktop) */}
                <div className="group border-l-4 border-primary rounded-xl p-6 md:p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] md:translate-y-8">
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Modern SVG Target Icon */}
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-secondary">Our Mission</h3>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed">
                    To deliver high-quality, inclusive, and balanced education that fosters intellectual capacity, spiritual depth, creative expression, and ethical leadership in every daughter of St. Anthony's.
                  </p>
                </div>

              </div>
            </div>


            {/* SUB-SECTION 03: Principal's Message */}
            <div 
              id="about-principal" 
              className="space-y-8 scroll-mt-28"
            >
              <div className="space-y-4">
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-primary">
                  Leadership Greeting
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-secondary">
                  Message from the Principal
                </h2>
                <div className="w-16 h-1 bg-accent rounded" aria-hidden="true" />
              </div>

              {/* Grid layout containing Principal Portrait & Message */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Principal photo with gold border */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-xl overflow-hidden shadow-lg border-2 border-accent p-1 bg-white hover:rotate-1 transition-transform duration-300">
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src="/images/principal.png"
                        alt="Mrs. Udeni Dunuwila, the Principal of St. Anthony's Girls' College Kandy"
                        fill
                        sizes="(max-width: 768px) 260px, 260px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Principal Message text content */}
                <div className="md:col-span-8 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-secondary">
                      Mrs. Udeni Dunuwila
                    </h3>
                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-primary">
                      Principal, St. Anthony's Girls' College Kandy
                    </p>
                  </div>

                  <div className="relative pl-4 border-l-2 border-accent py-1">
                    <blockquote className="font-serif italic text-sm sm:text-base text-neutral-700 leading-relaxed">
                      "Virtue and knowledge represent the twin pillars on which we construct our lives. Our mission at St. Anthony's extends beyond academic instruction to nurture resilient, compassionate, and skilled global female leaders."
                    </blockquote>
                  </div>

                  <div className="space-y-3 font-sans text-sm text-neutral-600 leading-relaxed">
                    <p>
                      It is with immense pride and joy that I welcome you to St. Anthony’s Girls’ College, Kandy. Since our founding in 1938, this institution has stood as a beacon of academic excellence and moral character in the hill country.
                    </p>
                    <p>
                      We believe that every child is unique and possesses immense potential. Our dedicated faculty works tirelessly to cultivate an inclusive, safe, and motivating learning environment. By combining modern education with traditional values, we equip our girls to face the future with confidence and integrity.
                    </p>
                    <p>
                      I invite all parents, alumnae, and friends of the college to join hands with us as we continue to shape generations of leaders who bring honor to their families and the nation.
                    </p>
                  </div>
                </div>

              </div>

              {/* Deputy Principals' Messages Grid */}
              <div className="pt-12 border-t border-neutral-200 mt-12 relative z-10">
                <div className="space-y-2 mb-8">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary">
                    Administration & Academics
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-secondary">
                    Messages from the Deputy Principals
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 max-w-2xl">
                    Coordinating our curriculum, discipline, administration, and co-curricular programs to ensure Antonian excellence.
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-10">
                  {DEPUTY_PRINCIPALS.map((deputy, idx) => (
                    <div 
                      key={idx}
                      className={`group border-l-4 ${deputy.color} rounded-2xl p-6 md:p-8 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative z-10 flex flex-col sm:flex-row gap-6 items-center sm:items-start`}
                    >
                      {/* Deputy Portrait Frame (Slightly smaller than Principal's 260px) */}
                      <div className="relative w-full max-w-[140px] sm:max-w-[150px] aspect-[3/4] rounded-xl overflow-hidden shadow-md border-2 border-accent p-0.5 bg-white shrink-0">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                          <Image
                            src={deputy.image}
                            alt={`${deputy.name} - ${deputy.role}`}
                            fill
                            sizes="150px"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Deputy Text Block (Principal's Font Sizes) */}
                      <div className="space-y-4 flex-1 text-center sm:text-left">
                        <div className="space-y-1">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-secondary group-hover:text-primary transition-colors duration-200">
                            {deputy.name}
                          </h4>
                          <p className="font-sans text-xs font-bold uppercase tracking-wider text-primary">
                            {deputy.role}
                          </p>
                        </div>
                        
                        <div className="relative pl-0 sm:pl-3 border-l-0 sm:border-l border-neutral-200 py-0.5">
                          <p className="font-serif italic text-sm sm:text-base text-neutral-600 leading-relaxed">
                            "{deputy.quote}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
