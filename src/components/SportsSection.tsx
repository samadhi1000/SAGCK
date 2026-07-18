"use client";

import React from "react";
import Image from "next/image";

const SPORTS = [
  {
    name: "Cricket",
    achievement: "U19 District Champions",
    description: "Developing top-tier skills in batting, bowling, and teamwork. Antonian cricketers represent the school at prestigious national tournaments.",
    image: "/images/sports/cricket.png",
  },
  {
    name: "Athletics",
    achievement: "12+ National Gold Medals",
    description: "Our track & field team has a rich history of sprinting, relay, and high-jump victories at provincial and national school sports meets.",
    image: "/images/sports/athletics.png",
  },
  {
    name: "Basketball & Netball",
    achievement: "Provincial Runners-Up",
    description: "Instilling tactical agility, fast reflexes, and deep coordination. Our court sports teams are highly competitive in zonal leagues.",
    image: "/images/sports/basketball_netball.png",
  },
  {
    name: "Swimming",
    achievement: "State-of-the-Art Pool",
    description: "Hosted in our own campus swimming complex. The team trains in individual strokes, water safety, and long-distance competitive relay races.",
    image: "/images/sports/swimming.png",
  },
  {
    name: "Chess",
    achievement: "National Rating Awards",
    description: "Fostering logical deduction, foresight, and tactical planning. Antonian chess players regularly win in both individual and group categories.",
    image: "/images/sports/chess.png",
  },
  {
    name: "Scouting & Cadet",
    achievement: "All-Island President's Badge",
    description: "Promoting character development, physical endurance, outdoor survival, first aid, and civic discipline through strict cadet training.",
    image: "/images/sports/scouting_cadet.png",
  },
];

export default function SportsSection() {
  return (
    <section
      id="sports"
      className="py-24 bg-secondary text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-20"
      aria-labelledby="sports-heading"
    >
      {/* Background decoration: Soft gold radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent)] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-sm font-bold uppercase tracking-widest text-accent">
            Athletic Legacy
          </span>
          <h2 id="sports-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Sports & Athletics
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded" aria-hidden="true" />
          <p className="font-sans text-sm sm:text-base text-neutral-light/80 leading-relaxed">
            St. Anthony's Girls' College Kandy stands for physical excellence, discipline, and grit, offering students an active framework to achieve national-level success in various sports.
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPORTS.map((sport, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full"
            >
              {/* Background gradient decorative glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

              {/* 1. Large Top Sports Illustration */}
              <div className="relative w-full h-52 overflow-hidden flex-shrink-0 flex items-center justify-center border-b border-white/5">
                <Image
                  src={sport.image}
                  alt={`${sport.name} illustration`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-1.5 transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* 2. Text Details */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between relative z-10 space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-accent transition-colors duration-200">
                      {sport.name}
                    </h3>
                    <span className="self-start sm:self-auto font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent px-2.5 py-1 rounded-full border border-accent/25">
                      {sport.achievement}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-neutral-light/75 leading-relaxed">
                    {sport.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
