import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Work() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.2"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);

  const items = useMemo(
    () => [
      {
        role: "Software Engineer Intern",
        company: "Workintech",
        url: "https://www.workintech.com.tr/",
        period: "Sep 2025 — Present",
        location: "Bursa, Türkiye · Remote",
        highlights: [
          "Contributing to both front-end and back-end development in real-world projects.",
          "Writing clean, maintainable, and scalable code following best practices.",
          "Collaborating within an agile workflow and structured delivery cycles.",
        ],
        stack: [
          "React",
          "TailwindCSS",
          "Redux",
          "Redux Toolkit",
          "React Query",
          "Cypress",
          "Java",
          "Hibernate",
          "SQL",
          "Spring Boot",
          "MongoDB",
          "Vite.js",
          "Node.js",
          "PostgreSQL",
        ],
      },
      {
        role: "Front-End Developer",
        company: "bbroz.com",
        url: "https://bbroz.com",
        period: "Feb 2022 — Present",
        location: "Bursa, Türkiye · In-site",
        highlights: [
          "Building responsive and performance-oriented user interfaces.",
          "Developing reusable component-based UI architectures.",
          "Maintaining scalable and maintainable front-end codebases.",
        ],
        stack: ["JavaScript", "HTML", "CSS", "PHP", "jQuery"],
      },
    ],
    []
  );

  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 md:mb-14">
          <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
            Work Experience
          </h2>
          <p className="mt-3 text-white/65 max-w-[62ch]">
            Roles, impact, and the technologies I’ve worked with.
          </p>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-[14px] top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />

          <motion.div
            style={{ scaleY: lineScale, opacity: glowOpacity, transformOrigin: "top" }}
            className="absolute left-[14px] top-0 bottom-0 w-[2px] rounded-full bg-white/70"
          />

          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute left-[14px] top-0 bottom-0 w-[14px] -translate-x-[6px] blur-xl bg-white/20"
          />

          <div className="space-y-8 md:space-y-10">
            {items.map((it, idx) => (
              <motion.div
                key={`${it.company}-${it.period}-${idx}`}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-6">
                  <div className="h-7 w-7 rounded-full bg-zinc-950 border border-white/20 grid place-items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/80" />
                  </div>
                </div>

                <div className="workCard rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-6 py-5 md:px-7 md:py-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="text-white text-xl md:text-2xl font-semibold tracking-[-0.015em]">
                        {it.role}
                      </div>
                      <div className="mt-1 text-white/70">
                        <a
                          href={it.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-white/80 hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/30 hover:decoration-white"
                        >
                          {it.company}
                        </a>
                        <span className="text-white/40"> · </span>
                        <span className="text-white/60">{it.location}</span>
                      </div>
                    </div>

                    <div className="text-white/55 text-sm md:text-base md:text-right">
                      {it.period}
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-white/70 leading-relaxed">
                    {it.highlights.map((h, i) => (
                      <motion.li
                        key={`${it.company}-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.45,
                          delay: 0.06 * i,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex gap-3"
                      >
                        <span className="mt-[9px] h-[5px] w-[5px] rounded-full bg-white/55 shrink-0" />
                        <span>{h}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {it.stack.map((s) => (
                      <span
                        key={`${it.company}-${s}`}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}