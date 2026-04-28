import { motion, AnimatePresence, Easing } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { REWARD_PACKS } from "@/lib/data/program";
import { hexToRgba } from "@/lib/utils/colors";
import { FaBoltLightning } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { FaTrophy } from "react-icons/fa";

const EASE = [0.22, 1, 0.36, 1] as Easing;

interface PackSectionProps {
  pack: (typeof REWARD_PACKS)[number];
  color: string;
  images: string[];
  index: number;
  isAr: boolean;
  t: ReturnType<typeof useTranslations>;
}

function PackSection({ pack, color, images, index, isAr }: PackSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const items = isAr ? pack.itemsAr : pack.itemsEn;
  const activeImage = images[activeIdx] ?? images[0];

  // Refs to each row so we can measure their offsetTop + height
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  
  // Track dynamic image height for centering math (135px for lg, 240px for xl)
  const [imgHeight, setImgHeight] = useState(135);

  useEffect(() => {
    const handleResize = () => {
      // Tailwind's 'xl' breakpoint is 1280px.
      // 240px is approx 5 rows. 135px is approx 3 rows.
      setImgHeight(window.innerWidth >= 1280 ? 240 : 135);
    };

    handleResize(); // Set on initial client load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute the pixel top for the floating image:
  // center of the active row, clamped so the image never overflows the list
  const getImageTop = (): string => {
    const list = listRef.current;
    const row = rowRefs.current[activeIdx];
    if (!list || !row) return "0px";

    const listHeight = list.offsetHeight;
    const rowTop = row.offsetTop;
    const rowCenter = rowTop + row.offsetHeight / 2;

    // Ideal: center image on the active row's center
    const ideal = rowCenter - imgHeight / 2;

    // Clamp: never above 0, never below listHeight - imgHeight
    const clamped = Math.max(0, Math.min(ideal, listHeight - imgHeight));

    return `${clamped}px`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: EASE }}
      className="w-full"
    >
      {/* ── Section header ──────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <FaTrophy className="size-5" style={{ color }} />
        <h3
          className="font-display font-black uppercase tracking-widest header-small"
          style={{ color }}
        >
          {isAr ? pack.titleAr : pack.titleEn}
        </h3>
      </div>

      {/* ── Rewards list ────────────────────────────────────────── */}
      <div ref={listRef} className="relative flex flex-col lg:w-full max-w-180">
        {items.map((item, i) => {
          const isActive = i === activeIdx;
          const isFirstAndActive = isActive && i === 0;
          const isLastAndActive = isActive && i === items.length - 1;

          return (
            <div
              key={item}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="relative"
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
            >
              {/* ── Mobile inline image ── */}
              <div className="lg:hidden">
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key={`mob-img-${i}`}
                      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                      animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                      exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                      transition={{ duration: 0.38, ease: EASE }}
                      className="relative w-full aspect-video"
                    >
                      <Image
                        src={activeImage}
                        alt={item}
                        fill
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${hexToRgba(color, 0.18)} 0%, transparent 60%)`,
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Row ── */}
              <div
                className={`flex items-center gap-3 py-3 px-4 cursor-pointer transition-all duration-300
                  relative bg-black lg:border-0
                  ${isActive ? "border-b lg:border-b-0 z-2" : "border-b border-b-white/10"}
                `}
                style={isActive ? { borderBottomColor: color } : undefined}
              >
                {/* ── Active Border Overlay ── */}
                <div
                  className={`hidden lg:block absolute inset-0 border-s-2 border-y pointer-events-none transition-all duration-300
                    rounded-s-lg ${isActive ? "opacity-100" : "opacity-0"}`}
                  style={{ borderColor: color }}
                />

                <FaBoltLightning
                  className="shrink-0 size-3.5 transition-colors duration-300 z-10"
                  style={{ color: isActive ? color : "rgba(255,255,255,0.4)" }}
                />

                <span
                  className="font-proxima txt-large transition-colors duration-300 z-10"
                  style={{ color: isActive ? color : "rgba(255,255,255,0.75)" }}
                >
                  {item}
                </span>
              </div>
            </div>
          );
        })}

        {/* ── Desktop floating image — lives on the list container, not a row ── */}
        <div className="hidden lg:block">
            <AnimatePresence>
                <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: isAr ? 12 : -12, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: isAr ? 8 : -8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute z-1" 
                style={{
                    insetInlineStart: "100%", 
                    marginInlineStart: "-1px", 
                    top: getImageTop(),
                    transition: "top 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                >
                <div
                    className={`transition-all duration-300 flex items-center justify-center
                        w-60 xl:w-106.5 aspect-video p-3 xl:px-4 xl:py-3 bg-black
                        rounded-lg
                        ${activeIdx === 0 ? "rounded-ss-none!" : ""}
                        ${activeIdx === items.length - 1 ? "rounded-es-none!" : ""}
                    `}
                    style={{
                      border: `1px solid ${color}`,
                      background: hexToRgba(color, 0.05),
                    }}
                >
                    {/* Inner wrapper shrinks due to padding but maintains shape */}
                    <div className="relative w-full h-full rounded-sm overflow-hidden transition-all duration-300 shadow-lg">
                      <Image
                          src={activeImage}
                          alt={items[activeIdx]}
                          fill
                          className="object-cover"
                      />
                      <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(160deg, ${hexToRgba(color, 0.22)} 0%, transparent 55%)`,
                          }}
                      />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default PackSection;