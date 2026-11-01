import { Fragment } from "react";
import { motion } from "framer-motion";
import { stagger, word } from "../motion";

export function SplitText({ text, after, className = "" }) {
  const words = text.split(" ");

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden="true" variants={stagger(0.05)} className={className}>
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span data-word variants={word} className="inline-block">
                {w}
                {i === words.length - 1 && after}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </motion.span>
    </>
  );
}
