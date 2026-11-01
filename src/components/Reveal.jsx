import { motion } from "framer-motion";
import { fadeUp } from "../motion";

export function Reveal({ as = "div", variants = fadeUp, className, children, ...rest }) {
  const Tag = motion[as];

  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
