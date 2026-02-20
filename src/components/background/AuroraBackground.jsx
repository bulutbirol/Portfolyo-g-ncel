import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AuroraBackground({ children, className = "", strength = 120 }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1400], [0, strength]);

  return (
    <div className={`relative min-h-screen overflow-hidden bg-zinc-950 ${className}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <div
            className={`
              absolute -inset-[10px] opacity-60
              [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
              [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
              [background-image:var(--white-gradient),var(--aurora)]
              [background-size:300%_200%]
              [background-position:50%_50%,50%_50%]
              blur-[10px] invert
              after:content-[''] after:absolute after:inset-0
              after:[background-image:var(--white-gradient),var(--aurora)]
              after:[background-size:200%_100%]
              after:animate-aurora
              after:[background-attachment:fixed]
              after:mix-blend-difference
              will-change-transform
              [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]
            `}
          />
        </motion.div>
      </div>

      <div className="relative z-10 text-white">{children}</div>
    </div>
  );
}
