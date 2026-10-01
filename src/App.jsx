import React from "react";
import { AuroraBackground } from "./components/background/AuroraBackground";
import { Navbar } from "./components/layout/Navbar";
import Hero from "./components/hero/Hero";
import { About } from "./sections/About";
import Projects from "./sections/Projects";
import { Work } from "./sections/Work";
import Contact from "./sections/Contact";
import { ToastContainer } from "react-toastify";
import Footer from "./sections/Footer";
import { LanguageProvider } from "./LanguageProvider";
import "react-toastify/dist/ReactToastify.css";

export default function App({ initialLanguage = "en" }) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <ToastContainer position="bottom-right" newestOnTop />
      <AuroraBackground strength={140}>
        <div className="min-h-screen">
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 md:pt-36 lg:px-10">
            <Hero />
            <About />
            <Projects />
            <Work />
            <Contact />
            <Footer />
          </main>
        </div>
      </AuroraBackground>
    </LanguageProvider>
  );
}
