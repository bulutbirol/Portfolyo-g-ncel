import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { useLanguage } from "../LanguageContext";
import { Reveal } from "../components/Reveal";
import { SplitText } from "../components/SplitText";
import { fadeUp, stagger } from "../motion";

const projects = [
  {
    id: "shortlink",
    title: "Shortlink",
    stack: ["Java", "React", "Neon", "Cloudflare"],
    live: "https://shortlink-web-eight.vercel.app/",
    source: "https://github.com/bulutbirol/Link-Shortener",
  },
  {
    id: "pizza",
    title: "Pizza Web App",
    stack: ["React", "Redux", "Router", "Tailwind"],
    live: "https://pizza-web-kappa.vercel.app/",
    source: "https://github.com/bulutbirol/fsweb-s8-challenge-pizza",
  },
  {
    id: "movies",
    title: "Redux Movies App",
    stack: ["React", "Redux", "Axios"],
    live: "https://fsweb-s10g2-redux-filmler-solutio.vercel.app",
    source: "https://github.com/bulutbirol/fsweb-s10g2-redux-filmler-solution",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    stack: ["React", "Node.js", "MongoDB"],
    live: "https://e-commerce-birol.vercel.app/",
  },
  {
    id: "watchlist",
    title: "Redux Watchlist App",
    stack: ["React", "Redux", "State management"],
    live: "https://fsweb-s10g3-redux-watchlist-solutio-ashen-one.vercel.app/",
    source: "https://github.com/bulutbirol/fsweb-s10g3-redux-watchlist-solution",
  },
];

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function ProjectLinks({ title, live, source, prominent = false }) {
  const { copy } = useLanguage();
  const text = copy.projects;
  const liveClass = prominent
    ? `group/link inline-flex items-center gap-2 rounded-full bg-ember px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-ember/85 sm:px-5 sm:py-3 ${focusRing}`
    : `group/link inline-flex items-center gap-1.5 py-2 text-sm text-white md:py-0 transition hover:text-fog ${focusRing}`;
  const sourceClass = prominent
    ? `inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/40 sm:px-5 sm:py-3 ${focusRing}`
    : `inline-flex items-center gap-1.5 py-2 text-sm text-fog md:py-0 transition hover:text-white ${focusRing}`;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-5">
      <a href={live} target="_blank" rel="noopener noreferrer" aria-label={text.openDemo.replace("{title}", title)} className={liveClass}>
        {text.liveDemo}
        <FiArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </a>
      {source && (
        <a href={source} target="_blank" rel="noopener noreferrer" aria-label={text.viewSource.replace("{title}", title)} className={sourceClass}>
          <FiGithub aria-hidden="true" /> {text.sourceCode}
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const { copy } = useLanguage();
  const text = copy.projects;
  const sceneRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(12% 16% round 32px)", "inset(0% 0% round 24px)"]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <Reveal as="section" id="projects" variants={stagger(0.1)} className="relative scroll-mt-28 py-14 md:py-36">
      <motion.div variants={fadeUp} className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <h2 className="text-5xl font-semibold tracking-[-0.04em] text-white md:text-7xl">
          <SplitText text={text.heading} after={<span className="text-ember">.</span>} />
        </h2>
        <p className="max-w-sm text-fog">{text.description}</p>
      </motion.div>

      <motion.article variants={fadeUp} className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <h3 className="text-5xl font-semibold tracking-[-0.04em] text-white sm:text-7xl">ServiceFlow</h3>
          <p className="mt-6 max-w-xl text-lg leading-[1.75] text-fog">{text.serviceFlowDescription}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-ember/15 px-3 py-1 text-xs font-medium text-ember">{text.featured}</span>
            {["React", "Spring Boot", "PostgreSQL", "Flyway", "JWT"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-fog">{item}</span>
            ))}
          </div>
          <div className="mt-auto pt-10">
            <ProjectLinks title="ServiceFlow" live="https://serviceflow-web-ten.vercel.app/" source="https://github.com/bulutbirol/FSM-Platform-Project" prominent />
          </div>
        </div>

        <div aria-hidden="true" className="rounded-2xl border border-white/[0.08] bg-ink p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 text-xs tracking-[0.04em]">
            <span className="text-mute">{text.workflowLabel}</span>
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {text.live}
            </span>
          </div>
          <p className="mt-6 max-w-[18ch] text-2xl font-medium leading-tight tracking-[-0.03em] text-white">{text.workflowTitle}</p>
          <motion.ol variants={stagger(0.12)} className="mt-6 space-y-2">
            {text.steps.map((step, index) => (
              <motion.li key={step} variants={fadeUp} className="flex items-center gap-3 rounded-xl border border-white/[0.08] px-4 py-3">
                <span className="text-xs tabular-nums text-ember">0{index + 1}</span>
                <span className="flex-1 text-sm text-white/85">{step}</span>
                {index === text.steps.length - 1 ? (
                  <span className="text-xs text-emerald-400">{text.done}</span>
                ) : (
                  <span className="h-px w-6 bg-white/20" />
                )}
              </motion.li>
            ))}
          </motion.ol>
          <p className="mt-5 text-xs text-mute">{text.roles.join(" · ")}</p>
        </div>
      </motion.article>

      <div ref={sceneRef} data-project-scene className="relative left-1/2 mt-16 w-[min(94vw,1560px)] -translate-x-1/2 md:mt-24">
        <motion.figure style={{ clipPath: clip }} className="overflow-hidden bg-ink">
          <motion.img
            style={{ scale: zoom }}
            src="/projects/serviceflow.jpg"
            alt={text.serviceFlowShotAlt}
            width="1568"
            height="772"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </motion.figure>
      </div>

      <motion.ul variants={stagger(0.06)} className="mt-24 border-b border-white/[0.08] md:mt-32">
        {projects.map((project, index) => (
          <motion.li
            key={project.id}
            data-project-row
            variants={fadeUp}
            className="group grid gap-x-8 gap-y-5 border-t border-white/[0.08] py-8 md:grid-cols-[3.5rem_1fr_minmax(0,26rem)] md:py-10"
          >
            <span className="text-sm font-medium tabular-nums text-ember md:pt-3">{String(index + 1).padStart(2, "0")}</span>
            <div className="flex min-w-0 flex-col items-start">
              <h3 className="text-3xl font-medium tracking-[-0.03em] text-white/85 transition duration-500 group-hover:text-white md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.75] text-fog md:max-w-xl">{text.descriptions[project.id]}</p>
              <p className="mt-3 text-xs text-mute">{project.stack.join(" / ")}</p>
              <div className="mt-auto pt-6">
                <ProjectLinks title={project.title} live={project.live} source={project.source} />
              </div>
            </div>
            <img
              src={`/projects/${project.id}.jpg`}
              alt={text.shotAlt.replace("{title}", project.title)}
              width="776"
              height="386"
              loading="lazy"
              decoding="async"
              className="h-auto w-full rounded-xl border border-white/[0.08] transition duration-500 group-hover:-translate-y-1 group-hover:border-ember/50 md:col-start-3 md:row-start-1"
            />
          </motion.li>
        ))}
      </motion.ul>
    </Reveal>
  );
}
