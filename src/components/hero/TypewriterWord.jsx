import React, { useEffect, useState } from "react";

const words = [
  "secure web apps",
  "scalable platforms",
  "high-performance UI",
  "production-ready systems",
];



export function TypewriterWord() {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex];
        const typingSpeed = isDeleting ? 45 : 85;
        const pauseAfterTyped = 900;
        const pauseAfterDeleted = 250;

        let t;

        if (!isDeleting && text === current) {
            t = setTimeout(() => setIsDeleting(true), pauseAfterTyped);
        } else if (isDeleting && text === "") {
            t = setTimeout(() => {
                setIsDeleting(false);
                setWordIndex((i) => (i + 1) % words.length);
            }, pauseAfterDeleted);
        } else {
            t = setTimeout(() => {
                const next = isDeleting
                    ? current.slice(0, text.length - 1)
                    : current.slice(0, text.length + 1);
                setText(next);
            }, typingSpeed);
        }

        return () => clearTimeout(t);
    }, [text, isDeleting, wordIndex]);

    return (
        <div className="relative h-[1.05em] overflow-hidden">
            <span className="whitespace-nowrap">
                {text}
                <span className="inline-block w-[0.12em] translate-y-[0.05em] animate-pulse">
                    |
                </span>
            </span>
        </div>
    );
}
