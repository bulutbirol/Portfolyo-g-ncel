import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative flex min-h-[68svh] scroll-mt-28 items-center pb-20 pt-8 md:min-h-[74svh] md:pb-28 md:pt-12">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-5xl"
      >
        <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/90">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
          Birol Bulut <span className="text-white/35">/</span> Full-stack developer
        </div>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.5rem]">
          Building software that <span className="text-amber-200">keeps work moving.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
          I turn complex workflows into clear, useful products. My work spans React interfaces, Spring Boot APIs, and PostgreSQL-backed systems.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-amber-200 px-5 py-3 font-semibold text-slate-950 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber-200">
            Explore projects <FiArrowUpRight aria-hidden="true" />
          </a>
          <a href="https://github.com/bulutbirol" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 font-semibold text-white/85 transition hover:border-white/35 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber-200">
            <FiGithub aria-hidden="true" /> GitHub
          </a>
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-5 text-sm text-white/45">
          <span className="font-medium text-white/70">Latest work</span>
          <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-amber-300/80 sm:block" />
          <span>ServiceFlow · Field service management</span>
          <a href="#projects" className="text-amber-200/90 underline decoration-amber-200/40 underline-offset-4 hover:text-white">Explore ServiceFlow</a>
        </div>
      </motion.div>
    </section>
  );
}
