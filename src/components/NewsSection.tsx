"use client";

import React from "react";

const NEWS_ARTICLES = [
  {
    title: "Annual Prize Giving Ceremony 2026",
    category: "College Event",
    date: "July 15, 2026",
    description: "Celebrating the academic accomplishments, leadership milestones, and outstanding extracurricular performances of our student leaders. Chief Guest speech and award distribution ceremony details.",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Antonian Athletic Team Triumphs at National Sports Meet",
    category: "Sports Achievement",
    date: "July 02, 2026",
    description: "Our track & field champions secured multiple gold medals in the 100m, 200m sprint, and high-jump events, bringing glory to St. Anthony's Girls' College Kandy at the All-Island school arena.",
    badgeColor: "bg-green-600/10 text-green-700 border-green-600/20",
  },
  {
    title: "Olcott Commemoration & Interfaith Alms Giving Program",
    category: "Community & Cultural",
    date: "June 28, 2026",
    description: "Teachers, student parliamentarians, and alumni associations joined hands to conduct our annual interfaith alms giving and mindfulness seminar, honoring our founders and culture.",
    badgeColor: "bg-accent/15 text-yellow-800 border-accent/30",
  },
];

export default function NewsSection() {
  return (
    <section
      id="news"
      className="py-24 bg-neutral-light text-neutral-dark px-4 sm:px-6 lg:px-8 relative scroll-mt-20"
      aria-labelledby="news-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-sm font-bold uppercase tracking-widest text-primary">
            School Updates
          </span>
          <h2 id="news-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-secondary">
            News & Achievements
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded" aria-hidden="true" />
          <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed">
            Stay informed with the latest announcements, academic achievements, sports accomplishments, and cultural celebrations at St. Anthony's Girls' College Kandy.
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_ARTICLES.map((article, idx) => (
            <article
              key={idx}
              className="group p-8 rounded-2xl bg-white border border-primary/5 hover:border-accent/40 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${article.badgeColor}`}>
                    {article.category}
                  </span>
                  <time className="text-neutral-500 font-medium flex items-center">
                    <svg className="w-4.5 h-4.5 mr-1 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {article.date}
                  </time>
                </div>

                <h3 className="font-serif text-xl font-bold text-secondary group-hover:text-primary transition-colors duration-200 leading-tight">
                  {article.title}
                </h3>
                
                <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                  {article.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6 border-t border-neutral-light mt-6">
                <a
                  href="#contact"
                  className="font-sans text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-dark inline-flex items-center group/link focus:outline-none"
                >
                  Read Full Announcement
                  <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
