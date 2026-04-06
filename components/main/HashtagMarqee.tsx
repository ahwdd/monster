"use client";

import { useEffect, useRef, useState } from "react";

// Always English — locked direction regardless of locale
const LETTERS = "#MONSTERENERGY".split("");

export default function HashtagMarquee() {
  const [visible, setVisible] = useState<boolean[]>(LETTERS.map(() => false));
  const ref     = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          LETTERS.forEach((_, i) => {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 60);
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    /* Force LTR + Teko regardless of page locale — it's always the English hashtag */
    <div className="font-teko" dir="ltr" lang="en">
      <div ref={ref} className="text-center pt-6 sm:pt-7.5 border-t border-[#919191]">
        <p
          className="font-black text-[#808080] text-center tracking-[4px] sm:tracking-[8px] text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] leading-10 mb-6 sm:mb-7.5"
          aria-label="#MONSTERENERGY"
        >
          {LETTERS.map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-[opacity,transform] duration-300 ease-out ${
                visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}