import React from "react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-black/30 px-4 py-3 backdrop-blur-md ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black font-black">
              {"</>"}
            </div>
            <div className="text-white font-semibold tracking-wide">Birol</div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-white/70">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
