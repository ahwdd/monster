"use client";
import { useEffect, useRef, useState } from "react";


export default function HashtagMarquee() {
  const letters = "#MONSTERENERGY".split("");

  const [visible, setVisible] = useState<boolean[]>(letters.map(() => false));
  const ref     = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          letters.forEach((_, i) => {
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
  }, [letters]);

  return (
    <div className="opacity-100 translate3d-none font-teko" lang="en" style={{direction: "ltr"}}>
      <div ref={ref} className="text-center pt-7.5 border-t border-[#919191]">
        <p
          className="font-black text-[#808080] text-center tracking-[8px] header-large leading-10! mb-7.5"
          aria-label={"#MONSTERENERGY"}
        >
          {letters.map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-[opacity,transform] duration-300 ease-out ${
                visible[i]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}