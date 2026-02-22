import React from "react";
import { motion } from "framer-motion";
import TypewriterWord from "./TypewriterWord";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-start justify-center pt-[18vh] md:pt-[22vh]"
    >
      <div className="mx-auto max-w-6xl px-5 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[900px] mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/80 text-base sm:text-lg font-medium"
          >
            Hi, I'm Birol Bulut
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 heroTitleBase text-white font-semibold tracking-[-0.02em]"
          >
            Engineering clean &amp; maintainable code for
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="heroTypeLine mt-3"
          >
            <TypewriterWord />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-white/65 text-base sm:text-lg leading-relaxed max-w-[52ch] mx-auto"
          >
            Secure. Scalable. Performance-driven.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}