import React from "react";
import TypewriterWord from "./TypewriterWord";

export default function Hero() {
  return (
   <section
  id="home"
  className="relative min-h-[100svh] flex items-center"
>
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-[900px]">
          <div className="text-white/80 text-base sm:text-lg font-medium">
            Hi, I'm Birol Bulut
          </div>

          <h1 className="mt-4 heroTitleBase text-white font-semibold tracking-[-0.02em]">
            Engineering clean &amp; maintainable code for
          </h1>

          <div className="heroTypeLine mt-3">
            <TypewriterWord />
          </div>

          <p className="mt-5 text-white/65 text-base sm:text-lg leading-relaxed max-w-[52ch]">
            Secure. Scalable. Performance-driven.
          </p>
        </div>
      </div>
    </section>
  );
}