import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto max-w-6xl px-10">
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-black/30 px-6 py-4 backdrop-blur-md ring-1 ring-white/10">
                    <a href="#home" className="flex items-center gap-3 group">
                        <div className="text-white text-xl font-bold tracking-widest">&lt;/&gt;</div>

                        <div className="relative rounded-xl px-3 py-1">
                            <span
                                className="
        pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300
        [background:conic-gradient(from_0deg,rgba(255,255,255,0.95),rgba(190,190,190,0.7),rgba(147,197,253,0.75),rgba(160,160,160,0.7),rgba(255,255,255,0.95))]
        animate-[spin_5s_linear_infinite]
        p-[1.5px]
        [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
        [-webkit-mask-composite:xor]
        [mask-composite:exclude]
      "
                            />

                            <span
                                className="
        pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300
        [background:conic-gradient(from_0deg,rgba(255,255,255,0.85),rgba(190,190,190,0.6),rgba(147,197,253,0.7),rgba(160,160,160,0.6),rgba(255,255,255,0.85))]
        animate-[spin_5s_linear_infinite]
        blur-[10px]
      "
                            />

                            <span className="relative text-white/60 group-hover:text-white transition duration-300">
                                birolweb.dev
                            </span>
                        </div>
                    </a>



                    <nav className="hidden md:flex items-center gap-8 text-white/60 font-medium">
                        <a href="#home" className="hover:text-white transition-colors">Home</a>
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                        <a href="#work" className="hover:text-white transition-colors">Work</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    </nav>

                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition"
                        aria-label="Open menu"
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
                                    Home
                                </a>
                                <a
                                    href="#about"
                                    className="px-6 py-3 hover:bg-white/5 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    About
                                </a>
                                <a
                                    href="#projects"
                                    className="px-6 py-3 hover:bg-white/5 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    Projects
                                </a>
                                <a
                                    href="#work"
                                    className="px-6 py-3 hover:bg-white/5 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    Work
                                </a>
                                <a
                                    href="#contact"
                                    className="px-6 py-3 hover:bg-white/5 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    Contact
                                </a>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
