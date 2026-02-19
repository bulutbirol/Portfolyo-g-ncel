import React from "react";
import { AuroraBackground } from "./components/AuroraBackground";

export default function App() {
  return (
    <AuroraBackground strength={140}>
      <div className="min-h-screen">
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

        <main id="home" className="mx-auto max-w-6xl px-6 pt-32 md:pt-36">
          <div className="min-h-[70vh] flex items-center">
            <div className="max-w-2xl">
              <div className="text-white/80 text-2xl md:text-3xl font-medium leading-tight">
                Hi I'm Birol Bulut
              </div>

              <div className="mt-2 text-white/70 text-3xl md:text-5xl font-medium leading-tight">
                A Developer
              </div>

              <div className="mt-2 text-white/70 text-3xl md:text-5xl font-medium leading-tight">
                Dedicated to web development
              </div>

              <div className="mt-6 text-white text-6xl md:text-8xl font-extrabold leading-none">
                Modern
              </div>

              <div className="mt-2 text-white/70 text-2xl md:text-3xl font-medium">
                Web Solutions
              </div>
            </div>
          </div>

          <section id="about" className="min-h-screen py-24">
            <h2 className="text-white text-4xl font-semibold">About</h2>
          </section>

          <section id="projects" className="min-h-screen py-24">
            <h2 className="text-white text-4xl font-semibold">Projects</h2>
          </section>

          <section id="work" className="min-h-screen py-24">
            <h2 className="text-white text-4xl font-semibold">Work</h2>
          </section>

          <section id="contact" className="min-h-screen py-24">
            <h2 className="text-white text-4xl font-semibold">Contact</h2>
          </section>
        </main>
      </div>
    </AuroraBackground>
  );
}
