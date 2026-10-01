import { FiArrowRight, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { useLanguage } from "../LanguageContext";

const projects = [
  {
    title: "Shortlink",
    stack: ["Java", "React", "Neon", "Cloudflare"],
    live: "https://shortlink-web-eight.vercel.app/",
    source: "https://github.com/bulutbirol/Link-Shortener",
  },
  {
    title: "Pizza Web App",
    stack: ["React", "Redux", "Router", "Tailwind"],
    live: "https://pizza-web-kappa.vercel.app/",
    source: "https://github.com/bulutbirol/fsweb-s8-challenge-pizza",
  },
  {
    title: "Redux Movies App",
    stack: ["React", "Redux", "Axios"],
    live: "https://fsweb-s10g2-redux-filmler-solutio.vercel.app",
    source: "https://github.com/bulutbirol/fsweb-s10g2-redux-filmler-solution",
  },
  {
    title: "E-Commerce Platform",
    stack: ["React", "Node.js", "MongoDB"],
    live: "https://e-commerce-birol.vercel.app/",
  },
  {
    title: "Redux Watchlist App",
    stack: ["React", "Redux", "State management"],
    live: "https://fsweb-s10g3-redux-watchlist-solutio-ashen-one.vercel.app/",
    source: "https://github.com/bulutbirol/fsweb-s10g3-redux-watchlist-solution",
  },
];

function ProjectLinks({ title, live, source, prominent = false }) {
  const { copy } = useLanguage();
  const text = copy.projects;
  const liveClass = prominent
    ? "liquidGlassInner inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-200"
    : "inline-flex items-center gap-1.5 text-sm font-semibold text-sky-200 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-200";
  const sourceClass = prominent
    ? "inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-lg transition hover:border-white/35 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-200"
    : "inline-flex items-center gap-1.5 text-sm font-medium text-white/65 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-200";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={live} target="_blank" rel="noopener noreferrer" aria-label={text.openDemo.replace("{title}", title)} className={liveClass}>
        {text.liveDemo} <FiArrowUpRight aria-hidden="true" />
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
    <section id="projects" className="relative scroll-mt-28 py-20 md:py-28">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sky-200/75">{text.eyebrow}</p>
        <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{text.heading}</h2>
        <p className="mt-4 text-base leading-7 text-white/65">{text.description}</p>
      </div>

      <article className="liquidGlass rounded-[2rem]">
        <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:p-12">
          <div className="flex flex-col items-start">
            <div className="liquidGlassInner mb-7 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-sky-100">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-200" /> {text.featured}
            </div>
            <h3 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">ServiceFlow</h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/65">
              {text.serviceFlowDescription}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["React", "Spring Boot", "PostgreSQL", "Flyway", "JWT"].map((item) => (
                <span key={item} className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/75 backdrop-blur-md">{item}</span>
              ))}
            </div>
            <div className="mt-9">
              <ProjectLinks title="ServiceFlow" live="https://serviceflow-web-ten.vercel.app/" source="https://github.com/bulutbirol/FSM-Platform-Project" prominent />
            </div>
          </div>

          <div aria-hidden="true" className="liquidGlassInner self-center rounded-[1.5rem] p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-semibold tracking-[0.18em] text-white/45">{text.workflowLabel}</span>
              <span className="flex items-center gap-2 text-xs text-sky-200"><span className="h-1.5 w-1.5 rounded-full bg-sky-200" /> {text.live}</span>
            </div>
            <p className="mt-7 max-w-[18ch] text-2xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-3xl">{text.workflowTitle}</p>
            <div className="mt-8 space-y-2.5">
              {text.steps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3 backdrop-blur-md">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-xs font-bold text-sky-100">0{index + 1}</span>
                  <span className="flex-1 text-sm font-medium text-white/80">{step}</span>
                  {index < 3 ? <FiArrowRight className="text-white/40" /> : <span className="text-xs font-semibold text-sky-200">{text.done}</span>}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
              <span>{text.roles[0]}</span><span>·</span><span>{text.roles[1]}</span><span>·</span><span>{text.roles[2]}</span>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <article key={project.title} className="liquidGlass flex flex-col rounded-[1.5rem] p-6 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.09] sm:p-8">
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">{project.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-white/60">{text.cardDescriptions[index]}</p>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-sky-200/80">
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="mt-7 border-t border-white/10 pt-5">
              <ProjectLinks title={project.title} live={project.live} source={project.source} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
