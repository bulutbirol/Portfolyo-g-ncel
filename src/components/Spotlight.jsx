import { motion } from "framer-motion";

export function Spotlight({ as = "div", className = "", children, ...rest }) {
  const Tag = motion[as];

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag data-spotlight onMouseMove={onMouseMove} className={`group/spot relative overflow-hidden [&>:not(:first-child)]:relative ${className}`} {...rest}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--x) var(--y), rgba(255,255,255,0.07), transparent 60%)" }}
      />
      {children}
    </Tag>
  );
}
