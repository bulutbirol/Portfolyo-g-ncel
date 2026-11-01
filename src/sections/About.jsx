import React from "react";
import { useLanguage } from "../LanguageContext";

const STACK = [
  "React",
  "Redux",
  "HTML",
  "CSS",
  "JS",
  "Java",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "Cypress",
  "Hibernate",
  "React Query",
  "TailwindCSS",
  "Git",
  "Vite",
  "Spring Boot",
];

export function About() {
  const { copy } = useLanguage();
  const text = copy.about;
  return (
    <section id="about" className="scroll-mt-28 py-16 md:py-24">
      <h2 className="text-white text-4xl md:text-5xl font-semibold mb-10">{text.heading}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md overflow-hidden">
            <div className="p-7">
              <div className="text-white/90 text-2xl font-semibold">{text.greeting}</div>
              <p className="mt-3 text-white/60 leading-relaxed">
                {text.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">React</span>
                <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">Spring Boot</span>
                <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">PostgreSQL</span>
                <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">{text.productThinking}</span>
              </div>

              <a
                href="/cv.pdf"
                download="Birol-Bulut-CV.pdf"
                className="inline-flex mt-7 items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-medium"
              >
                {text.downloadCv} <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md p-7">
            <div className="text-white/90 text-xl font-semibold">{text.ctaHeading}</div>
            <p className="mt-2 text-white/60">{text.ctaDescription}</p>
            <a
              href="#contact"
              className="inline-flex mt-5 items-center justify-center px-4 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 text-white hover:bg-white/15 transition"
            >
              {text.ctaButton}
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md p-7">
            <div className="text-white/90 text-xl font-semibold">{text.principles}</div>
            <p className="mt-2 text-white/60">{text.principlesDescription}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">SOLID</span>
              <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">{text.testing}</span>
              <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">{text.performance}</span>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md p-7">
            <div className="text-white/90 text-xl font-semibold">{text.location}</div>
            <p className="mt-2 text-white/60">{text.locationDescription}</p>
            <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-white/70">Bursa · UTC+3</div>
          </div>
          <div className="relative rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md p-7 md:col-span-2 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="techStackTextArea min-w-0 max-w-[560px]">
                <div className="text-white/90 text-xl font-semibold">{text.stack}</div>
                <p className="mt-2 text-white/60 leading-relaxed">
                  {text.stackDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {STACK.map((item) => (
                  <span key={item} className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
