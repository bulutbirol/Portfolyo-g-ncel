import React from "react";
import TypewriterWord from "./TypewriterWord";

export default function Hero() {
    return (
        <section id="home" className="relative pt-20 sm:pt-24 md:pt-28">
            <div className="mx-auto max-w-6xl px-5">
                <div className="max-w-[720px]">
                    <div className="text-white/80 text-base sm:text-lg font-medium">
                        Hi, I'm Birol Bulut
                    </div>

                    <h1 className="heroTitle mt-4 text-white font-semibold tracking-[-0.02em]">
                        Engineering clean & maintainable{" "}
                        <span className="heroTitleStrong block mt-2">
                            <TypewriterWord />
                        </span>
                    </h1>

                    <p className="mt-5 text-white/65 text-base sm:text-lg leading-relaxed max-w-[52ch]">
                        Secure. Scalable. Performance-driven.
                    </p>
                </div>
            </div>
        </section>
    );
}