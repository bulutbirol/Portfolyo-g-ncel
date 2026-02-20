import React from "react";
import { AuroraBackground } from "./components/background/AuroraBackground";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/hero/Hero";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { Work } from "./sections/Work";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <AuroraBackground strength={140}>
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-6xl px-10 pt-32 md:pt-36">
          <Hero />
          <About />
          <Projects />
          <Work />
          <Contact />
        </main>
      </div>
    </AuroraBackground>
  );
}
