import { motion } from "framer-motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "../LanguageContext";
import { Reveal } from "../components/Reveal";
import { SplitText } from "../components/SplitText";
import { Spotlight } from "../components/Spotlight";
import { fadeUp, stagger } from "../motion";
import { track } from "../track";

const STACK = [
  "React",
  "Redux",
  "HTML",
  "CSS",
  "JS",
  "Java",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "Cypress",
  "Hibernate",
  "React Query",
  "TailwindCSS",
  "Git",
  "Vite",
  "Spring Boot",
];

const tile = "rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/20";
const chip = "rounded-full border border-white/10 px-3 py-1 text-xs text-fog";

export function About() {
  const { copy } = useLanguage();
  const text = copy.about;

  return (
    <Reveal as="section" id="about" variants={stagger(0.1)} className="scroll-mt-28 py-14 md:py-28">
      <motion.h2 variants={fadeUp} className="mb-12 text-5xl font-semibold tracking-[-0.04em] text-white md:mb-16 md:text-7xl">
        <SplitText text={text.heading} after={<span className="text-ember">.</span>} />
      </motion.h2>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <motion.div variants={fadeUp}>
          <p data-about-lead className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-mute sm:text-5xl">
            {text.lead} <span className="text-ember">{text.leadAccent}</span>
          </p>
          <p data-about-detail className="mt-6 max-w-[46ch] leading-[1.75] text-fog sm:text-lg">{text.detail}</p>
          <ol className="mt-6 border-b border-white/[0.08]">
            {text.values.map((value, index) => (
              <li data-about-value key={value.title} className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-white/[0.08] py-4">
                <span className="pt-1 text-sm font-medium tabular-nums text-ember">0{index + 1}</span>
                <span>
                  <span className="block font-medium text-white">{value.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-fog">{value.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <a
            href="/cv.pdf"
            download="Birol-Bulut-CV.pdf"
            onClick={() => track("cv")}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-sm font-medium text-ink transition hover:bg-ember/85"
          >
            {text.downloadCv}
            <FiArrowDown aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        <motion.div variants={stagger(0.08)} className="grid gap-3 sm:grid-cols-2">
          <Spotlight variants={fadeUp} className={tile}>
            <h3 className="font-medium text-white">{text.principles}</h3>
            <p className="mt-2 text-sm leading-6 text-fog">{text.principlesDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["SOLID", text.testing, text.performance].map((item) => (
                <span key={item} className={chip}>{item}</span>
              ))}
            </div>
          </Spotlight>

          <Spotlight variants={fadeUp} className={tile}>
            <h3 className="font-medium text-white">{text.location}</h3>
            <p className="mt-2 text-sm leading-6 text-fog">{text.locationDescription}</p>
            <p className="mt-4 text-sm tabular-nums text-mute">Bursa · UTC+3</p>
          </Spotlight>

          <Spotlight variants={fadeUp} className={`${tile} sm:col-span-2`}>
            <h3 className="font-medium text-white">{text.stack}</h3>
            <p className="mt-2 text-sm leading-6 text-fog">{text.stackDescription}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {STACK.map((item) => (
                <li key={item} className={`${chip} transition-colors hover:border-white/30 hover:text-white`}>{item}</li>
              ))}
            </ul>
          </Spotlight>

          <Spotlight
            as="a"
            variants={fadeUp}
            href="#contact"
            className={`${tile} group flex items-center justify-between gap-4 sm:col-span-2`}
          >
            <span>
              <span className="block font-medium text-white">{text.ctaHeading}</span>
              <span className="mt-1 block text-sm text-fog">{text.ctaDescription}</span>
              <span className="mt-3 block text-sm text-white">{text.ctaButton}</span>
            </span>
            <FiArrowUpRight aria-hidden="true" className="shrink-0 text-2xl text-fog transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
          </Spotlight>
        </motion.div>
      </div>
    </Reveal>
  );
}
