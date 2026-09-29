import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-[80svh] scroll-mt-28 items-center pb-24 pt-10 md:min-h-[88svh]">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-4xl text-center"
      >
        <div className="liquidGlassInner mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-200 shadow-[0_0_12px_rgba(186,230,253,0.8)]" />
          Hi, I'm Birol Bulut
        </div>

        <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.07] tracking-[-0.045em] text-white">
          Building software that <span className="bg-gradient-to-r from-white via-sky-100 to-violet-200 bg-clip-text text-transparent">keeps work moving.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
          I turn complex workflows into clear, useful products. My work spans React interfaces, Spring Boot APIs, and PostgreSQL-backed systems.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#projects" className="liquidGlassInner inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition hover:border-white/35 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-200">
            Explore projects <FiArrowUpRight aria-hidden="true" />
          </a>
          <a href="https://github.com/bulutbirol" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 font-medium text-white/75 backdrop-blur-lg transition hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-200">
            <FiGithub aria-hidden="true" /> GitHub
          </a>
        </div>

        <a href="#projects" className="liquidGlassInner mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl px-5 py-4 text-sm text-white/70 transition hover:border-white/30 hover:bg-white/10">
          <span className="font-medium text-white/90">Latest work</span>
          <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-white/50 sm:block" />
          <span>ServiceFlow · Field service management</span>
          <FiArrowUpRight aria-hidden="true" className="text-sky-200" />
        </a>
      </motion.div>
    </section>
  );
}
