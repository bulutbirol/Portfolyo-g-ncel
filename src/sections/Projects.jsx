import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { useLanguage } from "../LanguageContext";
import { Reveal } from "../components/Reveal";
import { SectionLabel } from "../components/SectionLabel";
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
    ? `group/link inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-white/85 ${focusRing}`
    : `group/link inline-flex items-center gap-1.5 text-sm text-white transition hover:text-fog ${focusRing}`;
  const sourceClass = prominent
    ? `inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/40 ${focusRing}`
    : `inline-flex items-center gap-1.5 text-sm text-fog transition hover:text-white ${focusRing}`;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
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

  return (
    <Reveal as="section" id="projects" variants={stagger(0.1)} className="relative scroll-mt-28 py-20 md:py-32">
      <SectionLabel index={2}>{text.eyebrow}</SectionLabel>
      <motion.div variants={fadeUp} className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="text-5xl font-semibold tracking-[-0.05em] text-white md:text-7xl">
          {text.heading}
          <span className="text-mute">.</span>
        </h2>
        <p className="max-w-sm text-fog">{text.description}</p>
      </motion.div>

      <motion.article
        variants={fadeUp}
        className="grid gap-10 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-500 hover:border-white/20 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
      >
        <div className="flex flex-col items-start">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-fog">{text.featured}</p>
          <h3 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">ServiceFlow</h3>
          <p className="mt-5 max-w-xl leading-7 text-fog">{text.serviceFlowDescription}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["React", "Spring Boot", "PostgreSQL", "Flyway", "JWT"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-fog">{item}</span>
            ))}
          </div>
          <div className="mt-auto pt-10">
            <ProjectLinks title="ServiceFlow" live="https://serviceflow-web-ten.vercel.app/" source="https://github.com/bulutbirol/FSM-Platform-Project" prominent />
          </div>
        </div>

        <div aria-hidden="true" className="rounded-2xl border border-white/[0.08] bg-ink p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 font-mono text-[11px] tracking-[0.15em]">
            <span className="text-mute">{text.workflowLabel}</span>
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {text.live}
            </span>
          </div>
          <p className="mt-6 max-w-[18ch] text-2xl font-medium leading-tight tracking-[-0.03em] text-white">{text.workflowTitle}</p>
          <motion.ol variants={stagger(0.12)} className="mt-6 space-y-2">
            {text.steps.map((step, index) => (
              <motion.li key={step} variants={fadeUp} className="flex items-center gap-3 rounded-xl border border-white/[0.08] px-4 py-3">
                <span className="font-mono text-xs text-mute">0{index + 1}</span>
                <span className="flex-1 text-sm text-white/85">{step}</span>
                {index === text.steps.length - 1 ? (
                  <span className="font-mono text-[11px] text-emerald-400">{text.done}</span>
                ) : (
                  <span className="h-px w-6 bg-white/20" />
                )}
              </motion.li>
            ))}
          </motion.ol>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-mute">{text.roles.join(" · ")}</p>
        </div>
      </motion.article>

      <motion.ul variants={stagger(0.06)} className="mt-6 border-b border-white/[0.08]">
        {projects.map((project, index) => (
          <motion.li
            key={project.id}
            data-project-row
            variants={fadeUp}
            className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-4 border-t border-white/[0.08] py-6 md:grid-cols-[3.5rem_1fr_auto] md:items-start md:py-8"
          >
            <span className="pt-1 font-mono text-xs text-mute md:pt-3">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <h3 className="text-2xl font-medium tracking-[-0.03em] text-white/80 transition duration-500 group-focus-within:translate-x-2 group-focus-within:text-white group-hover:translate-x-2 group-hover:text-white motion-reduce:transform-none md:text-4xl">
                {project.title}
              </h3>
              <div className="grid transition-[grid-template-rows] duration-500 md:grid-rows-[0fr] md:group-focus-within:grid-rows-[1fr] md:group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-3 text-sm leading-6 text-fog md:max-w-xl">{text.descriptions[project.id]}</p>
                  <p className="pt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-mute">{project.stack.join(" / ")}</p>
                </div>
              </div>
            </div>
            <div className="col-start-2 md:col-start-auto md:pt-3">
              <ProjectLinks title={project.title} live={project.live} source={project.source} />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Reveal>
  );
}
