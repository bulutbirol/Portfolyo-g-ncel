import { useEffect, useRef } from "react";

export default function SnowDotsBackground({
  className = "",
  count = 110,
  speed = 0.04,
  parallax = 28,
  windStrength = 1.4,
  opacity = 0.35,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let w = 0;
    let h = 0;

    const dots = [];

    const createDots = () => {
      dots.length = 0;
      for (let i = 0; i < count; i++) {
        const z = 0.3 + (i % 17) / 17;
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.15,
          vy: 0.08 + Math.random() * 0.2,
          z,
        });
      }
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createDots();
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const handleMove = (e) => {
      if (!w || !h) return;
      tx = (e.clientX / w - 0.5) * 2;
      ty = (e.clientY / h - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    let last = performance.now();
    let raf;

    const animate = (now) => {
      const dt = Math.min(40, now - last);
      last = now;
      const t = dt / 16.67;

      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];
        const depth = 1 - p.z;

        const windX = mx * windStrength * depth;
        const windY = my * (windStrength * 0.5) * depth;

        p.x += (p.vx + windX) * speed * 30 * t;
        p.y += (p.vy + windY) * speed * 30 * t;

        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }

        if (p.x > w + 40) p.x = -40;
        if (p.x < -40) p.x = w + 40;

        const px = p.x + mx * parallax * depth;
        const py = p.y + my * parallax * depth;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", handleMove);
    };
  }, [count, speed, parallax, windStrength, opacity]);

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
    </div>
  );
}