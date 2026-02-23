import React from "react";

function OrbitRing({ items, size = "320px", duration = 18, reverse = false, startDeg = -30 }) {
  const step = 360 / items.length;

  return (
    <div className={`aboutOrbitRing ${reverse ? "reverse" : ""}`} style={{ "--size": size, "--duration": `${duration}s` }}>
      {items.map((it, i) => {
        const angle = startDeg + i * step;
        return (
          <div key={`${it.alt}-${i}`} className="aboutOrbitSlot" style={{ "--angle": `${angle}deg` }}>
            <div className="aboutOrbitItem" title={it.alt}>
              <img src={it.src} alt={it.alt} draggable="false" loading="lazy" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const SQL_ICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect x="10" y="10" width="44" height="44" rx="14" fill="#0b1220" opacity="0.65"/>
    <text x="32" y="40" text-anchor="middle" font-family="Arial" font-size="20" font-weight="800" fill="#60A5FA">SQL</text>
  </svg>
`);

const HIBERNATE_ICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect x="10" y="10" width="44" height="44" rx="14" fill="#0b1220" opacity="0.65"/>
    <text x="32" y="40" text-anchor="middle" font-family="Arial" font-size="14" font-weight="900" fill="#BCA352">HIB</text>
  </svg>
`);

const REACT_QUERY_ICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect x="10" y="10" width="44" height="44" rx="14" fill="#0b1220" opacity="0.65"/>
    <text x="32" y="40" text-anchor="middle" font-family="Arial" font-size="16" font-weight="900" fill="#FF4154">RQ</text>
  </svg>
`);

const SPRING_ICON =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
    <text x="50%" y="55%" text-anchor="middle"
      font-family="Arial"
      font-size="16"
      font-weight="900"
      fill="#6DB33F">Spring</text>
  </svg>
`);

const STACK = [
  { src: "https://skillicons.dev/icons?i=react", alt: "React" },
  { src: "https://skillicons.dev/icons?i=redux", alt: "Redux" },
  { src: "https://skillicons.dev/icons?i=html", alt: "HTML" },
  { src: "https://skillicons.dev/icons?i=css", alt: "CSS" },
  { src: "https://skillicons.dev/icons?i=js", alt: "JS" },
  { src: "https://skillicons.dev/icons?i=java", alt: "Java" },
  { src: SQL_ICON, alt: "SQL" },
  { src: "https://skillicons.dev/icons?i=mongodb", alt: "MongoDB" },
  { src: "https://skillicons.dev/icons?i=postgres", alt: "PostgreSQL" },
  { src: "https://skillicons.dev/icons?i=cypress", alt: "Cypress" },
  { src: HIBERNATE_ICON, alt: "Hibernate" },
  { src: REACT_QUERY_ICON, alt: "React Query" },
  { src: "https://skillicons.dev/icons?i=tailwind", alt: "TailwindCSS" },
  { src: "https://skillicons.dev/icons?i=git", alt: "Git" },
  { src: "https://skillicons.dev/icons?i=vite", alt: "Vite" },
  { src: SPRING_ICON, alt: "Spring Boot" },
];

const outer = STACK.slice(0, 7);
const inner = STACK.slice(7);

export function About() {
  return (
    <section id="about" className="py-24">
      <h2 className="text-white text-4xl md:text-5xl font-semibold mb-10">About Me</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md overflow-hidden">
            <div className="p-7">
              <div className="text-white/90 text-2xl font-semibold">Hi, I'm Birol Bulut</div>
              <p className="mt-3 text-white/60 leading-relaxed">
                I build clean, maintainable web applications with a focus on performance, scalability, and real-world usability.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">Frontend</span>
                <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">Backend</span>
                <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">SEO</span>
                <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">Performance</span>
              </div>

              <a
                href="/cv.pdf"
                download="cv.pdf"
                className="inline-flex mt-7 items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-medium"
              >
                Download CV <span aria-hidden>↓</span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md p-7">
            <div className="text-white/90 text-xl font-semibold">Let’s build something</div>
            <p className="mt-2 text-white/60">Have a project idea? I can help you turn it into a production-ready product.</p>
            <a
              href="#contact"
              className="inline-flex mt-5 items-center justify-center px-4 py-2 rounded-xl bg-white/10 ring-1 ring-white/10 text-white hover:bg-white/15 transition"
            >
              Start a project
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md p-7">
            <div className="text-white/90 text-xl font-semibold">Principles</div>
            <p className="mt-2 text-white/60">I prefer predictable systems: clear structure, testable code, and stable delivery.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">SOLID</span>
              <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">Testing-first</span>
              <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-sm">Performance</span>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md p-7">
            <div className="text-white/90 text-xl font-semibold">Time Zone</div>
            <p className="mt-2 text-white/60">Always available for collaboration and quick iterations.</p>
            <div className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-white/70">Always-on: 24/7</div>
          </div>
          <div className="relative rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md p-7 md:col-span-2 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="techStackTextArea min-w-0 max-w-[560px]">
                <div className="text-white/90 text-xl font-semibold">Tech Stack</div>
                <p className="mt-2 text-white/60 leading-relaxed">
                  I use a modern set of technologies and tools to build fast, reliable, and scalable products end-to-end.
                </p>
              </div>

              <div className="orbitPeekWrapper" aria-hidden="true" style={{ "--item": "40px", "--stroke": "1px" }}>
                <OrbitRing items={outer} size={"340px"} duration={20} startDeg={-30} />
                <OrbitRing items={inner} size={"240px"} duration={14} reverse startDeg={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}