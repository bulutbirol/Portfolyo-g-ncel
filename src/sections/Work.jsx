import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../LanguageContext";
import { Reveal } from "../components/Reveal";
import { SplitText } from "../components/SplitText";
import { fadeUp, stagger } from "../motion";

export function Work() {
  const ref = useRef(null);
  const { copy } = useLanguage();
  const text = copy.work;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const items = useMemo(
    () => [
      {
        ...text.entries[0],
        company: "Workintech",
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
        ...text.entries[1],
        company: "BBROZ",
        stack: ["JavaScript", "HTML", "CSS", "PHP", "jQuery"],
      },
    ],
    [text.entries]
  );

  return (
    <Reveal as="section" id="work" variants={stagger(0.1)} className="relative scroll-mt-28 py-14 md:py-28">
      <motion.div variants={fadeUp} className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
        <h2 className="text-5xl font-semibold tracking-[-0.04em] text-white md:text-7xl">
          <SplitText text={text.heading} after={<span className="text-ember">.</span>} />
        </h2>
        <p className="max-w-sm text-fog">{text.description}</p>
      </motion.div>

      <div ref={ref} className="relative">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.08] md:left-[200px]" />
        <motion.div
          style={{ scaleY: lineScale, transformOrigin: "top" }}
          className="absolute bottom-0 left-0 top-0 w-px bg-ember md:left-[200px]"
        />

        <div className="space-y-12 md:space-y-16">
          {items.map((it) => (
            <Reveal
              key={it.company}
              variants={stagger(0.06)}
              className="relative grid gap-4 pl-8 md:grid-cols-[200px_1fr] md:gap-0 md:pl-0"
            >
              <span className="absolute left-0 top-2 h-2 w-2 -translate-x-[3.5px] rounded-full bg-ember md:left-[200px]" />
              <motion.div variants={fadeUp} className="text-sm tabular-nums text-mute md:pr-8 md:pt-1.5">
                <p className="text-fog">{it.period}</p>
                <p className="mt-2">{it.location}</p>
              </motion.div>

              <div className="md:pl-12">
                <motion.h3 variants={fadeUp} className="text-2xl font-medium tracking-[-0.03em] text-white md:text-4xl">
                  {it.role}
                </motion.h3>
                <motion.p variants={fadeUp} className="mt-1 text-fog">{it.company}</motion.p>

                <ul className="mt-6 space-y-3">
                  {it.highlights.map((h) => (
                    <motion.li key={h} variants={fadeUp} className="flex gap-3 text-[0.9375rem] leading-[1.75] text-white/80 sm:text-base">
                      <span className="mt-3 h-px w-3 shrink-0 bg-white/30" />
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.ul variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
                  {it.stack.map((s) => (
                    <li key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-fog">{s}</li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
