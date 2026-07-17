"use client";

import React from "react";

const CLUBS = [
  {
    title: "ICT & Robotics Society",
    description: "Empowering future leaders in coding, software development, and modern robotics systems. Antonians regularly participate and win in national hacking & coding arenas.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Astronomical Association",
    description: "Introducing students to space exploration and physics through regular sky-watching camps, telescope handling sessions, and astronomical research workshops.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.77-.57-.371-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Broadcasting & Media Club",
    description: "The core journalism hub of SAGCK, managing live school radio broadcasts, photography archives, public speaking tournaments, and digital design.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: "Interact & Social Service Club",
    description: "Fostering community service, volunteerism, and youth leadership through projects that help local orphanages, environmental campaigns, and health camps.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Sinhala & English Literary Unions",
    description: "Encouraging a love for literature, creative writing, poetry, and active debating tournaments. The unions publish the annual school magazine 'Excelsior'.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Buddhist & Spiritual Association",
    description: "Guiding moral growth and emotional well-being. Organizes daily morning mindfulness sessions, spiritual seminars, and the annual Vesak alms-giving program.",
    icon: (
      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
];

export default function ClubsSection() {
  return (
    <section
      id="clubs"
      className="py-24 bg-white text-neutral-dark px-4 sm:px-6 lg:px-8 relative scroll-mt-20"
      aria-labelledby="clubs-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-sm font-bold uppercase tracking-widest text-primary">
            Student Life
          </span>
          <h2 id="clubs-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-secondary">
            Clubs & Societies
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded" aria-hidden="true" />
          <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
            Extracurricular activities at St. Anthony's Girls' College inspire students to build leadership skills, pursue unique scientific interests, and cultivate deep community values.
          </p>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLUBS.map((club, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl bg-neutral-light/50 border border-primary/5 hover:border-accent/40 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Background gradient decorative glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

              <div className="space-y-4 relative z-10">
                <div className="p-3 bg-white rounded-xl shadow-sm inline-block group-hover:scale-110 group-hover:shadow-md transition-transform duration-300">
                  {club.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary group-hover:text-primary transition-colors duration-200">
                  {club.title}
                </h3>
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                  {club.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
