import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { useLanguage } from "../../LanguageContext";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { copy } = useLanguage();
  const text = copy.hero;
  const [step, setStep] = useState(0);

  return (
    <section id="home" className="relative flex scroll-mt-28 items-center pb-16 pt-8 md:min-h-[88svh] md:pb-24 md:pt-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-4xl text-center"
      >
        <div className="liquidGlassInner mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/80 sm:mb-8 sm:px-5">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-200 shadow-[0_0_12px_rgba(186,230,253,0.8)]" />
          {text.greeting}
        </div>

        <h1 className="text-[clamp(2.15rem,8.5vw,5rem)] font-semibold leading-[1.09] tracking-[-0.045em] text-white">
          {text.title} <span className="bg-gradient-to-r from-white via-sky-100 to-violet-200 bg-clip-text text-transparent">{text.titleAccent}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 sm:mt-7 sm:text-lg sm:leading-8">
          {text.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9">
          <a href="#projects" className="liquidGlassInner inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition hover:border-white/35 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-200">
            {text.explore} <FiArrowUpRight aria-hidden="true" />
          </a>
          <a href="https://github.com/bulutbirol" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 font-medium text-white/75 backdrop-blur-lg transition hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-200">
            <FiGithub aria-hidden="true" /> GitHub
          </a>
        </div>

        <button type="button" onClick={() => setStep((current) => (current + 1) % 3)} aria-label={text.playfulLabel} className="liquidGlassInner mx-auto mt-8 flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white/75 transition hover:border-sky-200/45 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 sm:mt-10">
          {text.playfulSteps.map((label, index) => (
            <span key={label} className={index === step ? "text-sky-100" : "text-white/45"}>
              {index > 0 && <span aria-hidden="true" className="mr-2 text-white/35">→</span>}{label}
            </span>
          ))}
          <span className="sr-only" aria-live="polite">{text.playfulSteps[step]}</span>
        </button>

        <a href="#projects" className="liquidGlassInner mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl px-5 py-4 text-sm text-white/70 transition hover:border-white/30 hover:bg-white/10 sm:mt-10">
          <span className="font-medium text-white/90">{text.latest}</span>
          <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-white/50 sm:block" />
          <span>{text.latestDescription}</span>
          <FiArrowUpRight aria-hidden="true" className="text-sky-200" />
        </a>
      </motion.div>
    </section>
  );
}
