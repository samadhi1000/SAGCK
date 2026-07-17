"use client";

import React from "react";

const SPORTS = [
  {
    name: "Cricket",
    achievement: "U19 District Champions",
    description: "Developing top-tier skills in batting, bowling, and teamwork. Antonian cricketers represent the school at prestigious national tournaments.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm-8 8a6 6 0 1112 0 6 6 0 01-12 0z" />
      </svg>
    ),
  },
  {
    name: "Athletics",
    achievement: "12+ National Gold Medals",
    description: "Our track & field team has a rich history of sprinting, relay, and high-jump victories at provincial and national school sports meets.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "Basketball & Netball",
    achievement: "Provincial Runners-Up",
    description: "Instilling tactical agility, fast reflexes, and deep coordination. Our court sports teams are highly competitive in zonal leagues.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.47 3.47 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.47 3.47 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.47 3.47 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.47 3.47 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    name: "Swimming",
    achievement: "State-of-the-Art Pool",
    description: "Hosted in our own campus swimming complex. The team trains in individual strokes, water safety, and long-distance competitive relay races.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    name: "Chess",
    achievement: "National Rating Awards",
    description: "Fostering logical deduction, foresight, and tactical planning. Antonian chess players regularly win in both individual and group categories.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12V5a2 2 0 012-2h2a2 2 0 012 2v7m-6 0a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 00-2-2m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Scouting & Cadet",
    achievement: "All-Island President's Badge",
    description: "Promoting character development, physical endurance, outdoor survival, first aid, and civic discipline through strict cadet training.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
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
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Background gradient decorative glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/10 rounded-xl shadow-sm group-hover:scale-110 group-hover:bg-white/20 transition-transform duration-300">
                    {sport.icon}
                  </div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent px-2.5 py-1 rounded-full border border-accent/20">
                    {sport.achievement}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-accent transition-colors duration-200">
                  {sport.name}
                </h3>
                <p className="font-sans text-sm text-neutral-light/75 leading-relaxed">
                  {sport.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
