import React, { useEffect, useMemo, useState } from "react";

export default function TypewriterWord() {
  const words = useMemo(() => ["production-ready", "scalable", "performant", "robust"], []);

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    const typeSpeed = 90;
    const deleteSpeed = 60;
    const holdAfterType = 900;
    const holdAfterDelete = 220;

    const speed = deleting ? deleteSpeed : typeSpeed;

    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), holdAfterType);
        }
      } else {
        const next = current.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next.length === 0) {
          setTimeout(() => {
            setDeleting(false);
            setWordIndex((p) => (p + 1) % words.length);
          }, holdAfterDelete);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className="typewriterWrap">
      <span className="typewriterText">{text}</span>
      <span className="typewriterCaret" aria-hidden="true">
        |
      </span>
    </span>
  );
}