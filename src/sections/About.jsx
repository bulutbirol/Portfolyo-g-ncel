import { motion } from "framer-motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "../LanguageContext";
import { Reveal } from "../components/Reveal";
import { SectionLabel } from "../components/SectionLabel";
import { fadeUp, stagger } from "../motion";

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
    <Reveal as="section" id="about" variants={stagger(0.1)} className="scroll-mt-28 py-20 md:py-32">
      <SectionLabel index={1}>{text.heading}</SectionLabel>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <motion.div variants={fadeUp}>
          <p className="text-lg text-fog">{text.greeting}</p>
          <p className="mt-4 text-3xl font-medium leading-[1.15] tracking-[-0.03em] text-white md:text-5xl">{text.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["React", "Spring Boot", "PostgreSQL", text.productThinking].map((item) => (
              <span key={item} className={chip}>{item}</span>
            ))}
          </div>
          <a
            href="/cv.pdf"
            download="Birol-Bulut-CV.pdf"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-white/85"
          >
            {text.downloadCv}
            <FiArrowDown aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        <motion.div variants={stagger(0.08)} className="grid gap-3 sm:grid-cols-2">
          <motion.div variants={fadeUp} className={tile}>
            <h3 className="font-medium text-white">{text.principles}</h3>
            <p className="mt-2 text-sm leading-6 text-fog">{text.principlesDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["SOLID", text.testing, text.performance].map((item) => (
                <span key={item} className={chip}>{item}</span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className={tile}>
            <h3 className="font-medium text-white">{text.location}</h3>
            <p className="mt-2 text-sm leading-6 text-fog">{text.locationDescription}</p>
            <p className="mt-4 font-mono text-xs text-mute">Bursa · UTC+3</p>
          </motion.div>

          <motion.div variants={fadeUp} className={`${tile} sm:col-span-2`}>
            <h3 className="font-medium text-white">{text.stack}</h3>
            <p className="mt-2 text-sm leading-6 text-fog">{text.stackDescription}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {STACK.map((item) => (
                <li key={item} className={`${chip} transition-colors hover:border-white/30 hover:text-white`}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.a
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
          </motion.a>
        </motion.div>
      </div>
    </Reveal>
  );
}
