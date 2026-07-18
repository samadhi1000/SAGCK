"use client";

import { useState } from "react";

const ERAS = [
  {
    id: "era1",
    title: "1938 – 1965",
    sub: "Pioneers & Foundation",
    paragraph: "The glamorous and legendary history of St. Anthony’s Girls’ College has a great influence on its present achievements. The school was started on 10th May 1938, in the ancient region of hill country of Senkadagala by honourable father Corne Hyid. The principal of Good Shepherd Convent, honourable sister Ignatius was a pioneer in starting the school and assigned honourable sister Mary Andrew as the governor of the school. Miss Daisy Agnos and Miss Doris Bolin were assigned as the first staff members. At the beginning there was only one building in the school premises and there were 38 students. Although the Department heads wanted to cease the proceeding of the school, their effort was abolished in the face of the strong protest of the parents to establish the school as the only girls school in the area. Sister Bernard started O/L classes.",
    highlights: [
      { year: "1938", text: "Founded on May 10 by Father Corne Hyid & Sister Ignatius." },
      { year: "First Staff", text: "Sister Mary Andrew (Governor), Miss Daisy Agnos, and Miss Doris Bolin." },
      { year: "Overcoming Trials", text: "Protests by parents prevent authorities from closing down the school." },
      { year: "Academics", text: "Started with 38 students; Sister Bernard launches the first O/L classes." }
    ]
  },
  {
    id: "era2",
    title: "1966 – 1972",
    sub: "Aesthetic & Academic Milestones",
    paragraph: "In 1966 A/L art classes were started. Miss Pushpa Boyagoda was the first student who was selected to the university from this school. As a result of the development in the aesthetic section a school library was started. The first western band in the Kandy district was begun at St. Anthony’s Girls’ College. In 1967 school western band became the best band in the Kandy district and won the Bandaranaike memorial championship. Girl Guide course put forward a civilized and disciplinary group of girls from the school. Sister Mary Bernard was retired in 1973. In order to pay honor to former principals in the school the houses were named as Andrew, Madeline, Maurice and Bernard.",
    highlights: [
      { year: "1966", text: "Advanced Level classes begin; Miss Pushpa Boyagoda enters university." },
      { year: "Aesthetics", text: "Inauguration of the College Library and expansion of visual arts." },
      { year: "District Best Band", text: "Western Band established; wins the Bandaranaike Memorial Championship in 1967." },
      { year: "Guides & Houses", text: "Girl Guides program starts. School houses named in honor of pioneering principals." }
    ]
  },
  {
    id: "era3",
    title: "1973 – 1995",
    sub: "Science & Infrastructure Growth",
    paragraph: "In 1973 Mrs. N.K. Pilapitiya was assigned as the principal. She did a great service on behalf of the school. Mrs. N.K. Pilapitiya started A/L home Science and Bio sections reducing the number of school leavers after A/L. In 1981 N.K. Pilapitiya was transferred to Mahamaya Girls’ College. Mrs. P. Attanayake was assigned as the principal. She was a pioneer in getting the land for school play ground from Mahaweli Authority. In 1994 Mrs. I. Wijerathne was assigned as the principal. In 1996 she was transferred to some other area.",
    highlights: [
      { year: "1973", text: "Mrs. N.K. Pilapitiya appointed Principal, expanding academic choices." },
      { year: "Higher Education", text: "Introduced Biology and Home Science divisions, retaining advanced students." },
      { year: "Sports Fields", text: "Mrs. P. Attanayake secures the playground land from the Mahaweli Authority." },
      { year: "Transitions", text: "Mrs. I. Wijerathne assumes principalship in 1994, leading further updates." }
    ]
  },
  {
    id: "era4",
    title: "1996 – Present",
    sub: "Modernization & Excellence",
    paragraph: "In 1996 Mrs. H.K. Wijethunga started her work as the principal. She did a great service on behalf of the school. The school achieved a higher standard and a remarkable development. She started English medium classes from grade 6 and also developed the standard of the school playground. She became the president of the district hockey association for several years and brought honor to the school. After her retirement in 2006 the present principal Mrs. P. Lekamge received her post as the principal. Up to now she has been doing a great job on behalf of the development of the school. The students were given maximum opportunities in order to develop their abilities regarding school work as well as co-curricular and extra curricular work. By this time there are about 25 associations and students are training for 13 sports. Students have been gaining a lot of achievements bringing honor to the college. On 10th of May 2008 school celebrated her 70th anniversary grandly.",
    highlights: [
      { year: "1996", text: "Mrs. H.K. Wijethunga starts English Medium classes and sports development." },
      { year: "Hockey Honors", text: "Mrs. Wijethunga serves as District Hockey President, elevating sports stature." },
      { year: "2006", text: "Mrs. P. Lekamge becomes Principal, driving multi-disciplinary updates." },
      { year: "Current Stature", text: "25 student associations, 13 active sports, and celebrated 70th anniversary in 2008." }
    ]
  }
];

export default function HistoryTimeline() {
  const [activeEraId, setActiveEraId] = useState("era1");
  const activeEra = ERAS.find((era) => era.id === activeEraId) || ERAS[0];

  return (
    <section
      id="history"
      className="py-24 bg-secondary text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-labelledby="history-heading"
    >
      {/* Decorative background vectors representing historical scrolls/curves */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-sm font-bold uppercase tracking-wider text-accent">
            Our Legacy
          </span>
          <h2 id="history-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            The Glamorous History of the School
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded" aria-hidden="true" />
          <p className="font-sans text-sm sm:text-base text-neutral-light/80 leading-relaxed">
            Click through our historical milestones to discover the journey of St. Anthony’s Girls’ College from its humble beginnings in 1938 to its current status as a premier educational institution.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12" role="tablist" aria-label="School Eras">
          {ERAS.map((era) => {
            const isActive = era.id === activeEraId;
            return (
              <button
                key={era.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${era.id}`}
                id={`tab-${era.id}`}
                onClick={() => setActiveEraId(era.id)}
                className={`px-5 py-3.5 rounded font-sans text-xs md:text-sm font-bold tracking-wide uppercase transition-all focus-visible:outline-2 focus-visible:outline-accent ${
                  isActive
                    ? "bg-accent text-secondary shadow-lg scale-105"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {era.title}
              </button>
            );
          })}
        </div>

        {/* Selected Era Content Grid */}
        <div
          id={`panel-${activeEra.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeEra.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white/5 rounded-xl p-8 md:p-12 border border-white/10 shadow-sm transition-all duration-300 motion-reduce:transition-none"
        >
          {/* Left Block: Description Paragraph */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-accent">
                {activeEra.title} Era
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                {activeEra.sub}
              </h3>
            </div>
            
            <p className="font-sans text-sm md:text-base text-neutral-light/80 leading-relaxed min-h-[180px]">
              {activeEra.paragraph}
            </p>
          </div>

          {/* Right Block: Structured Highlights Timeline */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10 space-y-6">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-accent mb-4">
              Historical Highlights
            </h4>
            
            <ul className="space-y-4">
              {activeEra.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="mt-1 shrink-0 w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                  <div>
                    <span className="font-sans text-xs font-bold text-white uppercase block tracking-wider">
                      {highlight.year}
                    </span>
                    <span className="font-sans text-xs text-neutral-light/75">
                      {highlight.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
