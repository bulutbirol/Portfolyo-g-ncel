import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import { FiArrowDownRight, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { useLanguage } from "../../LanguageContext";
import { ease, fadeUp, stagger } from "../../motion";
import Marquee from "./Marquee";

const STACK = ["React", "Redux", "React Query", "Spring Boot", "Java", "Hibernate", "PostgreSQL", "MongoDB", "Node.js", "TailwindCSS", "Cypress", "Vite"];

const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};

export default function Hero() {
  const { copy } = useLanguage();
  const text = copy.hero;
  const [step, setStep] = useState(0);

  const words = [
    ...text.title.split(" ").map((w) => ({ w, accent: false })),
    ...text.titleAccent.split(" ").map((w) => ({ w, accent: true })),
  ];

  return (
    <section id="home" className="relative flex scroll-mt-28 flex-col justify-center pb-12 pt-6 md:min-h-[86svh] md:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-40 -top-40 bottom-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_30%_30%,#000,transparent_70%)]"
      />

      <motion.div initial="hidden" animate="show" variants={stagger(0.12)}>
        <motion.p variants={fadeUp} className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fog">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {text.greeting}
        </motion.p>

        <h1 className="max-w-[14ch] text-[clamp(2.6rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
          <span className="sr-only">{`${text.title} ${text.titleAccent}`}</span>
          <motion.span aria-hidden="true" variants={stagger(0.06)} className="block">
            {words.map(({ w, accent }, i) => (
              <Fragment key={`${w}-${i}`}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span variants={word} className={`inline-block ${accent ? "text-mute" : ""}`}>
                    {w}
                  </motion.span>
                </span>
                {i < words.length - 1 && " "}
              </Fragment>
            ))}
          </motion.span>
        </h1>

        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-8 border-t border-white/[0.08] pt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[52ch] text-base leading-7 text-fog sm:text-lg sm:leading-8">{text.description}</p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {text.explore}
              <FiArrowDownRight aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-[-45deg]" />
            </a>
            <a
              href="https://github.com/bulutbirol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <FiGithub aria-hidden="true" /> GitHub
            </a>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setStep((current) => (current + 1) % 3)}
            aria-label={text.playfulLabel}
            className="flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-xs text-fog transition hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {text.playfulSteps.map((label, index) => (
              <span key={label} className={`transition-colors duration-300 ${index === step ? "text-white" : "text-mute"}`}>
                {index > 0 && <span aria-hidden="true" className="mr-2 text-mute">→</span>}
                {label}
              </span>
            ))}
            <span className="sr-only" aria-live="polite">{text.playfulSteps[step]}</span>
          </button>

          <a
            href="#projects"
            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-fog transition hover:border-white/30 hover:text-white"
          >
            <span className="font-medium text-white">{text.latest}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/30" />
            {text.latestDescription}
            <FiArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="mt-16 md:mt-24">
        <Marquee items={STACK} />
      </motion.div>
    </section>
  );
}
