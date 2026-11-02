const RINGS = [260, 380, 520, 680, 860];

export function Backdrop() {
  return (
    <div data-backdrop aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-55vmax] h-[130vmax] w-[130vmax] -translate-x-1/2">
        <div
          className="h-full w-full animate-[spin_90s_linear_infinite] rounded-full blur-3xl will-change-transform"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.12) 50deg, transparent 110deg, rgba(255,255,255,0.06) 170deg, transparent 230deg, rgba(255,255,255,0.1) 290deg, transparent 360deg)",
          }}
        />
      </div>

      <svg
        viewBox="-450 -450 900 900"
        className="absolute left-1/2 top-[18vh] h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 animate-[spin_160s_linear_infinite_reverse] opacity-70 [mask-image:radial-gradient(circle,#000_20%,transparent_70%)]"
      >
        {RINGS.map((d, i) => (
          <circle
            key={d}
            r={d / 2}
            fill="none"
            stroke="white"
            strokeOpacity={0.12}
            strokeWidth="1"
            strokeDasharray={i % 2 ? "2 10" : "60 18"}
          />
        ))}
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#07080c_95%)]" />
    </div>
  );
}
