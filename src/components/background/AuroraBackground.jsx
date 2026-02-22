import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValueEvent } from "framer-motion";
import { useHardwareAccel } from "../../hooks/useHardwareAccel";

export function AuroraBackground({ children, className = "", strength = 120 }) {
  const wrapRef = useRef(null);
  const { hwAccel } = useHardwareAccel();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1400], [0, strength]);

  const rawV = useVelocity(scrollY);
  const v = useSpring(rawV, { stiffness: 220, damping: 40 });

  const [dir, setDir] = useState("normal");
  const lastDirRef = useRef("normal");

  const pendingRef = useRef({ dur: 14, ax: 0, ay: 0 });
  const rafRef = useRef(0);

  const clamp = useMemo(() => (n, a, b) => Math.max(a, Math.min(b, n)), []);

  useMotionValueEvent(v, "change", (latest) => {
    if (!hwAccel) return;

    const nextDir = latest < 0 ? "reverse" : "normal";
    if (nextDir !== lastDirRef.current) {
      lastDirRef.current = nextDir;
      setDir(nextDir);
    }

    const speed = Math.abs(latest);
    const nextDur = clamp(14 - speed / 140, 4, 14);
    const px = clamp((latest / 2400) * 18, -18, 18);
    const py = clamp((latest / 2400) * 10, -10, 10);

    pendingRef.current = { dur: nextDur, ax: px, ay: py };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const el = wrapRef.current;
        if (!el) return;
        el.style.setProperty("--auroraDur", `${pendingRef.current.dur}s`);
        el.style.setProperty("--auroraX", `${pendingRef.current.ax}%`);
        el.style.setProperty("--auroraY", `${pendingRef.current.ay}%`);
      });
    }
  });

  return (
    <div
      ref={wrapRef}
      className={`relative min-h-screen overflow-hidden bg-zinc-950 ${className}`}
      style={{
        "--auroraDur": "14s",
        "--auroraDir": dir,
        "--auroraX": "0%",
        "--auroraY": "0%",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
          {hwAccel ? (
            <div
              className={`
                auroraDyn auroraMax
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
              style={{ "--auroraDir": dir }}
            />
          ) : (
            <div className="auroraStaticBg absolute -inset-[10px] opacity-60" />
          )}
        </motion.div>
      </div>

      <div className="relative z-10 text-white">{children}</div>
    </div>
  );
}