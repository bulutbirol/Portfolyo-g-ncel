import React, { useMemo, useState } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValueEvent } from "framer-motion";

export function AuroraBackground({ children, className = "", strength = 120 }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1400], [0, strength]);

  const rawV = useVelocity(scrollY);
  const v = useSpring(rawV, { stiffness: 220, damping: 40 });

  const [dir, setDir] = useState("normal");
  const [dur, setDur] = useState(14);
  const [ax, setAx] = useState(0);
  const [ay, setAy] = useState(0);

  const clamp = useMemo(() => (n, a, b) => Math.max(a, Math.min(b, n)), []);

  useMotionValueEvent(v, "change", (latest) => {
    const nextDir = latest < 0 ? "reverse" : "normal";
    if (nextDir !== dir) setDir(nextDir);

    const speed = Math.abs(latest);
    const nextDur = clamp(14 - speed / 140, 4, 14);
    setDur(nextDur);

    const px = clamp((latest / 2400) * 18, -18, 18);
    const py = clamp((latest / 2400) * 10, -10, 10);
    setAx(px);
    setAy(py);
  });

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-zinc-950 ${className}`}
      style={{
        "--auroraDur": `${dur}s`,
        "--auroraDir": dir,
        "--auroraX": `${ax}%`,
        "--auroraY": `${ay}%`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <div
            className={`
              auroraDyn
              absolute -inset-[10px] opacity-60
              [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
              [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
              [background-image:var(--white-gradient),var(--aurora)]
              [background-size:300%_200%]
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