import { motion } from "framer-motion";
import { fadeUp } from "../motion";

export function SectionLabel({ index, children }) {
  return (
    <motion.p variants={fadeUp} className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mute">
      <span>{`${String(index).padStart(2, "0")} · ${children}`}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-white/[0.08]" />
    </motion.p>
  );
}
