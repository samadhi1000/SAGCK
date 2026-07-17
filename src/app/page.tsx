"use client";

import Image from "next/image";
import Particles from "@/components/Particles";
import HistoryTimeline from "@/components/HistoryTimeline";
import ImageCarousel from "@/components/ImageCarousel";
import AboutSection from "@/components/AboutSection";
import HeroBackground from "@/components/HeroBackground";
import ClubsSection from "@/components/ClubsSection";
import SportsSection from "@/components/SportsSection";
import NewsSection from "@/components/NewsSection";

export default function Home() {
  return (
    <main id="main-content" className="flex-grow">
      
      {/* 1. Hero Section */}
      <section
        id="home"
        className="relative min-h-[90vh] md:min-h-[95vh] flex items-center justify-center bg-secondary text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
        aria-label="Welcome Banner"
      >
        {/* Randomized Background Image Overlay */}
        <HeroBackground />

        {/* Background Particles */}
        <Particles />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Motto Display */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse motion-reduce:animate-none" aria-hidden="true" />
            <span className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-accent">
              Virtus et Scientia
            </span>
            <span className="text-white/60 text-xs px-1" aria-hidden="true">|</span>
            <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-neutral-light">
              Power & Knowledge
            </span>
          </div>

          {/* Glowing Headings */}
          <div className="space-y-4 hero-glow-container">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-gradient-hero leading-tight pb-3">
              St. Anthony's <br className="sm:hidden" />
              <span>Girls' College</span>
            </h1>
            <p className="max-w-2xl mx-auto font-sans text-base sm:text-xl text-neutral-light leading-relaxed text-glow-hero">
              Nurturing virtuous, resilient, and educated female leaders in the hill capital of Kandy for over 137 years.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a
              href="#clubs"
              className="w-full sm:w-auto px-8 py-4 rounded bg-accent hover:bg-accent-hover text-secondary font-sans text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 motion-reduce:transform-none"
            >
              Explore Student Life
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 rounded border-2 border-white/40 hover:border-white bg-white/5 hover:bg-white/10 text-white font-sans text-base font-bold transition-all text-center focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Explore Our History
            </a>
          </div>
        </div>

        {/* Scroll Guide Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 text-white/50 hover:text-white/90 transition-colors pointer-events-none" aria-hidden="true">
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-light">Scroll</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 2. Unified About Section */}
      <AboutSection />

      {/* 2.5 History Section */}
      <HistoryTimeline />

      {/* 2.75 Antonian Life Showcase Gallery */}
      <ImageCarousel />

      {/* 3. Stat Counters Section */}
      <section
        className="relative bg-secondary text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-label="Key school statistics"
      >
        {/* Dynamic design: Gold accent border lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" aria-hidden="true" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {/* Stat 1 */}
            <div className="space-y-2 group">
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-accent group-hover:scale-105 transition-transform duration-200 motion-reduce:transform-none">
                137+
              </div>
              <div className="font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-light/75">
                Years of Excellence
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2 group">
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-accent group-hover:scale-105 transition-transform duration-200 motion-reduce:transform-none">
                3,500+
              </div>
              <div className="font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-light/75">
                Enrolled Students
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2 group">
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-accent group-hover:scale-105 transition-transform duration-200 motion-reduce:transform-none">
                120+
              </div>
              <div className="font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-light/75">
                Expert Educators
              </div>
            </div>

            {/* Stat 4 */}
            <div className="space-y-2 group">
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-accent group-hover:scale-105 transition-transform duration-200 motion-reduce:transform-none">
                100%
              </div>
              <div className="font-sans text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-light/75">
                University Admission
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Clubs & Societies Section */}
      <ClubsSection />

      {/* 5. Sports & Athletics Section */}
      <SportsSection />

      {/* 6. News & Announcements Section */}
      <NewsSection />

      {/* 7. Contact and Inquiry Section */}
      <section
        id="contact"
        className="py-24 bg-neutral-light text-neutral-dark px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Info & Vector Map */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-primary">
                  Get in Touch
                </span>
                <h2 id="contact-heading" className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-secondary">
                  Contact Information
                </h2>
                <div className="w-16 h-1 bg-accent rounded" aria-hidden="true" />
              </div>

              {/* Text Contact Details */}
              <div className="space-y-4 font-sans text-sm sm:text-base text-neutral-600">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    St. Anthony’s Girls’ College, <br />
                    Wattaranthenna, Kandy, Sri Lanka.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+94 81 222 3456 / +94 81 222 7890</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@stanthonysgirls.edu.lk</span>
                </div>
              </div>

              {/* Premium Google Map Container */}
              <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md border border-neutral-200 bg-white group/map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2687595304677!2d80.62768567586523!3d7.323659492684704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae36636aa9d6b99%3A0xe54d39f99eb6d649!2sSt.%20Anthony&#39;s%20Girls&#39;%20College!5e0!3m2!1sen!2slk!4v1715874281537!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 grayscale hover:grayscale-0 opacity-90 hover:opacity-100 transition-all duration-700"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="St. Anthony's Girls' College Kandy Location Map"
                />
                
                {/* Floating Map Action Badge */}
                <a 
                  href="https://maps.google.com/?q=St.+Anthony's+Girls'+College,+Kandy,+Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 flex items-center space-x-2 bg-secondary/90 hover:bg-secondary text-white font-sans text-xs font-bold px-3 py-2 rounded shadow-md backdrop-blur-sm border border-white/10 hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Right: Accessible Form */}
            <div className="lg:col-span-7 bg-white rounded p-8 border border-neutral-200 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-secondary mb-6">
                Send a Message to the Administration
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="inquiry-name" className="block text-sm font-semibold text-neutral-700">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      aria-required="true"
                      className="w-full px-4 py-2.5 rounded border border-neutral-300 focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="inquiry-email" className="block text-sm font-semibold text-neutral-700">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      aria-required="true"
                      className="w-full px-4 py-2.5 rounded border border-neutral-300 focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="inquiry-phone" className="block text-sm font-semibold text-neutral-700">
                      Phone Number
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      className="w-full px-4 py-2.5 rounded border border-neutral-300 focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="inquiry-subject" className="block text-sm font-semibold text-neutral-700">
                      Subject <span className="text-primary">*</span>
                    </label>
                    <select
                      id="inquiry-subject"
                      required
                      aria-required="true"
                      className="w-full px-4 py-2.5 rounded border border-neutral-300 focus:outline-none focus:border-accent text-sm bg-white"
                    >
                      <option value="">Select Inquiry Topic</option>
                      <option value="general">General Inquiries</option>
                      <option value="clubs-sports">Clubs & Sports Activities</option>
                      <option value="transcripts">Transcripts & Certificates</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="inquiry-message" className="block text-sm font-semibold text-neutral-700">
                    Message Details <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={5}
                    required
                    aria-required="true"
                    className="w-full px-4 py-2.5 rounded border border-neutral-300 focus:outline-none focus:border-accent text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded bg-primary hover:bg-primary-dark text-white font-sans text-sm font-bold shadow-md hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-accent"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-neutral-dark text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/10">
            {/* Left: About Snippet & History */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo.png"
                  alt="St. Anthony's Girls' College Kandy Crest"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain bg-white p-1 rounded"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-sm md:text-base font-black tracking-tight leading-tight text-white">
                    St. Anthony's Girls' College
                  </span>
                  <span className="font-sans text-[8px] md:text-[9px] font-bold tracking-widest text-accent uppercase">
                    Kandy
                  </span>
                </div>
              </div>
              <p className="font-sans text-xs text-neutral-light/75 leading-relaxed max-w-sm">
                Founded in 1889 by the Sisters of the Good Shepherd, St. Anthony's Girls' College has been a cornerstone of quality education in Kandy for over 137 years. We remain dedicated to character, academics, and female leadership.
              </p>
            </div>

            {/* Center: Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-accent">Quick Links</h4>
              <ul className="space-y-2 font-sans text-xs text-neutral-light/80">
                <li><a href="#home" className="hover:text-accent transition-colors focus:outline-none">Home Landing</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors focus:outline-none">About Our Legacy</a></li>
                <li><a href="#clubs" className="hover:text-accent transition-colors focus:outline-none">Clubs & Societies</a></li>
                <li><a href="#sports" className="hover:text-accent transition-colors focus:outline-none">Sports & Athletics</a></li>
                <li><a href="#news" className="hover:text-accent transition-colors focus:outline-none">News & Achievements</a></li>
                <li><a href="#facilities" className="hover:text-accent transition-colors focus:outline-none">School Facilities</a></li>
              </ul>
            </div>

            {/* Right: Contact Details */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-accent">Office Hours</h4>
              <p className="font-sans text-xs text-neutral-light/75 leading-relaxed">
                Monday to Friday: 7:30 AM – 3:30 PM <br />
                Saturday & Sunday: Closed
              </p>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] sm:text-xs text-neutral-light/60">
            <p>© {new Date().getFullYear()} St. Anthony's Girls' College Kandy. All Rights Reserved.</p>
            <p>Designed with excellence for Antonian daughters.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
