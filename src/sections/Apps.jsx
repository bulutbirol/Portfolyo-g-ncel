import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "../LanguageContext";
import { Reveal } from "../components/Reveal";
import { SplitText } from "../components/SplitText";
import { Spotlight } from "../components/Spotlight";
import { fadeUp, stagger } from "../motion";

const apps = [
  {
    id: "blobnap",
    title: "Blobnap",
    stack: ["Capacitor", "JavaScript", "Supabase", "AdMob"],
    store: "App Store",
    url: "https://apps.apple.com/app/id6835477567",
  },
  {
    id: "nudgio",
    title: "Nudgio",
    stack: ["React", "Capacitor", "Supabase"],
    store: "App Store",
    url: "https://apps.apple.com/app/id6761790991",
  },
  {
    id: "setyra",
    title: "Setyra",
    stack: ["C#", ".NET", "WPF"],
    store: "Microsoft Store",
    url: "https://apps.microsoft.com/detail/9NLT1JT7R800",
  },
];

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function Apps() {
  const { copy } = useLanguage();
  const text = copy.apps;

  return (
    <Reveal as="section" id="apps" variants={stagger(0.1)} className="relative scroll-mt-28 py-14 md:py-36">
      <motion.div variants={fadeUp} className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
        <h2 className="text-5xl font-semibold tracking-[-0.04em] text-white md:text-7xl">
          <SplitText text={text.heading} after={<span className="text-ember">.</span>} />
        </h2>
        <p className="max-w-sm text-fog">{text.description}</p>
      </motion.div>

      <motion.ul variants={stagger(0.08)} className="grid gap-4 md:grid-cols-3">
        {apps.map((app) => (
          <Spotlight
            key={app.id}
            as="li"
            variants={fadeUp}
            className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/20 sm:p-8"
          >
            <div className="flex items-center gap-4">
              <img src={`/apps/${app.id}.png`} alt="" width="64" height="64" loading="lazy" decoding="async" className="h-16 w-16 rounded-[18px]" />
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.03em] text-white">{app.title}</h3>
                <p className="mt-1 text-xs text-mute">{text.kinds[app.id]}</p>
              </div>
            </div>
            <p className="mt-6 text-[0.9375rem] leading-[1.75] text-fog">{text.descriptions[app.id]}</p>
            <p className="mt-4 text-xs text-mute">{app.stack.join(" / ")}</p>
            <div className="mt-auto pt-8">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={text.openStore.replace("{title}", app.title).replace("{store}", app.store)}
                className={`group/link inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:border-ember hover:text-ember ${focusRing}`}
              >
                {app.store}
                <FiArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            </div>
          </Spotlight>
        ))}
      </motion.ul>
    </Reveal>
  );
}
