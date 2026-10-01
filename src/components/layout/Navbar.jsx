import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../../LanguageContext";

export function Navbar() {
    const [open, setOpen] = useState(false);
    const { language, setLanguage, copy } = useLanguage();
    const text = copy.nav;

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-10">
                <div className="mt-3 flex items-center justify-between gap-2 rounded-2xl bg-black/30 px-2 py-2.5 backdrop-blur-md ring-1 ring-white/10 sm:mt-5 sm:px-6 sm:py-4">
                    <a href="#home" className="flex min-w-0 items-center gap-1 group sm:gap-3">
                        <div className="hidden text-white text-xl font-bold tracking-widest sm:block">
                            &lt;/&gt;
                        </div>

                        <div className="relative rounded-2xl">
                            <div
                                className="
      pointer-events-none absolute inset-0 rounded-2xl
      opacity-0 group-hover:opacity-100 transition duration-300
      p-[1.5px]
      bg-gradient-to-r from-white/90 via-gray-400/70 via-blue-300/70 via-gray-500/70 to-white/90
      [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
      [-webkit-mask-composite:xor]
      [mask-composite:exclude]
    "
                            />

                            <div
                                className="
      pointer-events-none absolute inset-0 rounded-2xl
      opacity-0 group-hover:opacity-100 transition duration-300
      shadow-[0_0_22px_rgba(147,197,253,0.45)]
    "
                            />

                            <div className="relative px-2 py-1.5 rounded-2xl sm:px-4">
                                <span className="text-sm text-white/60 group-hover:text-white transition duration-300 sm:text-base">
                                    birolweb.dev
                                </span>
                            </div>
                        </div>

                    </a>
                      <div className="flex shrink-0 items-center gap-1 md:gap-5">
                      <nav className="hidden md:flex items-center gap-5 text-white/60 font-medium lg:gap-8">
                        <a href="#home" className="hover:text-white transition-colors">{text.home}</a>
                        <a href="#about" className="hover:text-white transition-colors">{text.about}</a>
                        <a href="#projects" className="hover:text-white transition-colors">{text.projects}</a>
                        <a href="#work" className="hover:text-white transition-colors">{text.work}</a>
                        <a href="#contact" className="hover:text-white transition-colors">{text.contact}</a>
                      </nav>
                      <div role="group" aria-label={text.language} className="flex shrink-0 items-center rounded-xl border border-white/15 bg-white/[0.07] p-1 text-xs font-semibold text-white/70 backdrop-blur-xl">
                        {["en", "tr"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            lang={option}
                            aria-pressed={language === option}
                            onClick={() => setLanguage(option)}
                            className={`grid min-h-9 min-w-9 place-items-center rounded-lg px-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 ${language === option ? "bg-white/20 text-white shadow-sm" : "hover:bg-white/10 hover:text-white"}`}
                          >
                            {option.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-2xl ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition"
                        aria-label={open ? text.closeMenu : text.openMenu}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-white"
                        >
                            {open ? (
                                <path
                                    d="M6 6L18 18M18 6L6 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            ) : (
                                <path
                                    d="M4 7H20M4 12H20M4 17H20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            )}
                        </svg>
                      </button>
                    </div>
                </div>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -8 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -8 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            className="md:hidden mt-3 rounded-2xl bg-black/40 backdrop-blur-md ring-1 ring-white/10 overflow-hidden"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.18 }}
                                className="flex flex-col py-2 text-white/70 font-medium"
                            >
                                <a
                                    href="#home"
                                    className="px-6 py-3 hover:bg-white/5 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    {text.home}
                                </a>
                                <a
                                    href="#about"
                                    className="px-6 py-3 hover:bg-white/5 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    {text.about}
                                </a>
                                <a
                                    href="#projects"
                                    className="px-6 py-3 hover:bg-white/5 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    {text.projects}
                                </a>
                                <a
                                    href="#work"
                                    className="px-6 py-3 hover:bg-white/5 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    {text.work}
                                </a>
                                <a
                                    href="#contact"
                                    className="px-6 py-3 hover:bg-white/5 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    {text.contact}
                                </a>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
