export default function Marquee({ items }) {
  const row = (hidden) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/20" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex w-max animate-marquee font-mono text-xs uppercase tracking-[0.2em] text-mute hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
