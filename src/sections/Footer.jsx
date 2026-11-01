import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { FiArrowUp } from "react-icons/fi";
import { useLanguage } from "../LanguageContext";

const socials = [
  { name: "GitHub", href: "https://github.com/bulutbirol", icon: FaGithub },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/birol-bulut/", icon: FaLinkedinIn },
  { name: "Instagram", href: "https://www.instagram.com/bulutbiroll/", icon: FaInstagram },
];

export default function Footer() {
  const { copy } = useLanguage();

  return (
    <footer className="flex flex-col gap-6 border-t border-white/[0.08] py-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-mute">{copy.footer}</p>

      <div className="flex items-center gap-2">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-fog transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
            >
              <Icon aria-hidden="true" />
            </a>
          );
        })}
        <a
          href="/cv.pdf"
          download="Birol-Bulut-CV.pdf"
          className="ml-2 rounded-full border border-white/10 px-4 py-2 text-sm text-fog transition hover:border-white/30 hover:text-white"
        >
          {copy.about.downloadCv}
        </a>
        <a
          href="#home"
          aria-label={copy.nav.home}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-fog transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
        >
          <FiArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
