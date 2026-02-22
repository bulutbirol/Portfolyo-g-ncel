import { useMemo, useRef, useState } from "react";

export default function Projects() {
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Pizza Web App",
        stack: ["React", "Redux", "Router", "Tailwind"],
        href: "https://pizza-web-kappa.vercel.app/",
      },
      {
        id: 2,
        title: "Redux Movies App",
        stack: ["React", "Redux", "Axios", "API"],
        href: "https://fsweb-s10g2-redux-filmler-solutio.vercel.app",
      },
      {
        id: 3,
        title: "E-Commerce Platform",
        stack: ["React", "NodeJs", "MongoDB"],
        href: "https://e-commerce-birol.vercel.app/",
      },
      {
        id: 4,
        title: "Redux Watchlist App",
        stack: ["React", "Redux", "State Management"],
        href: "https://fsweb-s10g3-redux-watchlist-solutio-ashen-one.vercel.app/",
      },
    ],
    []
  );

  const wrapRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const active = hovered ? projects.find((p) => p.id === hovered) : null;

  const getScreenshotUrl = (url) => {
    const encoded = encodeURIComponent(url);
    return `https://s0.wp.com/mshots/v1/${encoded}?w=1200`;
  };

  return (
    <section
      id="projects"
      ref={wrapRef}
      onMouseMove={onMove}
      className="relative w-full px-6 py-14"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          My Selected Projects
        </h2>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              className="group block"
            >
              <div className="flex items-center justify-between gap-6 px-6 md:px-8 py-10 border-t border-white/10 first:border-t-0">
                <div className="min-w-0">
                  <div className="text-xl md:text-2xl font-medium text-white/95">
                    {p.title}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {p.stack.map((s) => (
                      <span key={s} className="text-amber-400/80">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 text-white/80 group-hover:text-white transition">
                  <span className="text-sm">Live Site</span>
                  <span className="text-lg translate-x-0 group-hover:translate-x-1 transition">
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div
        className={`pointer-events-none absolute z-20 hidden md:block transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"
          }`}
        style={{
          left: pos.x + 30,
          top: pos.y - 150,
        }}
      >
        {active && (
          <div className="w-[520px] rounded-2xl border border-white/15 bg-white/[0.05] backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)] overflow-hidden">
            <div className="relative aspect-[16/9]">
              <img
                src={getScreenshotUrl(active.href)}
                alt={active.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>

            <div className="px-4 py-3">
              <div className="text-sm font-medium text-white/90 truncate">
                {active.title}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}