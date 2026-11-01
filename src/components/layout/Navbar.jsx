import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "../../LanguageContext";
import { ease } from "../../motion";

const SECTIONS = ["home", "about", "projects", "work", "contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const menuButton = useRef(null);
  const { language, setLanguage, copy } = useLanguage();
  const text = copy.nav;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        solid ? "border-white/[0.08] bg-ink/80 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 md:h-20 lg:px-10">
        <a href="#home" className="group flex items-center gap-2 font-mono text-sm text-white/80 transition hover:text-white">
          <span className="text-mute transition group-hover:text-white">&lt;/&gt;</span>
          birolweb.dev
        </a>

        <div className="flex items-center gap-2 md:gap-8">
          <nav className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative px-3 py-2 text-sm transition-colors ${active === id ? "text-white" : "text-fog hover:text-white"}`}
              >
                {text[id]}
                {active === id && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ duration: 0.45, ease }}
                    className="absolute inset-x-3 -bottom-px h-px bg-white"
                  />
                )}
              </a>
            ))}
          </nav>

          <div role="group" aria-label={text.language} className="flex items-center rounded-full border border-white/10 p-0.5 font-mono text-[11px]">
            {["en", "tr"].map((option) => (
              <button
                key={option}
                type="button"
                lang={option}
                aria-pressed={language === option}
                onClick={() => setLanguage(option)}
                className={`relative grid min-h-8 min-w-9 place-items-center rounded-full px-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  language === option ? "text-ink" : "text-fog hover:text-white"
                }`}
              >
                {language === option && <span className="absolute inset-0 rounded-full bg-white" />}
                <span className="relative">{option.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <button
            ref={menuButton}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition hover:border-white/30 md:hidden"
            aria-label={open ? text.closeMenu : text.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
                className="absolute left-0 top-0 h-px w-4 bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
                className="absolute bottom-0 left-0 h-px w-4 bg-current"
              />
            </span>
          </button>
        </div>
      </div>

      <motion.div
        data-scroll-progress
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-white/0 via-white/70 to-white"
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="border-t border-white/[0.08] px-4 pb-6 pt-2 md:hidden"
          >
            {SECTIONS.map((id, index) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.04 * index }}
                className="flex items-baseline gap-4 border-b border-white/[0.06] py-4 text-2xl tracking-tight text-white"
              >
                <span className="font-mono text-xs text-mute">0{index + 1}</span>
                {text[id]}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
