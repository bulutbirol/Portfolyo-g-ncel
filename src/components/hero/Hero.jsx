import React from "react";
import { TypewriterWord } from "./TypewriterWord";

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-start pt-28 md:pt-36">
            <div className="max-w-[820px]">
                <div className="text-white/85 text-xl md:text-3xl font-medium leading-tight">
                    Hi, I'm Birol Bulut
                </div>

                <div className="mt-4 text-white/70 text-3xl md:text-5xl font-medium leading-tight">
                    Engineering clean & maintainable code for
                </div>


                <div className="mt-6 text-white text-5xl md:text-7xl font-extrabold leading-none">
                    <TypewriterWord />
                </div>

                <div className="mt-4 text-white/60 text-xl md:text-2xl font-medium tracking-wide">
                    Secure. Scalable. Performance-driven.
                </div>
            </div>
        </section>
    );
}
