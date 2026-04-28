"use client";
import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, rgba } from "framer-motion";
import { LANDING_RANKS } from "@/lib/data/program";
import FadeInView from "../animation/FadeInView";
import { hexToRgba } from "@/lib/utils/colors";
import { FaStar } from "react-icons/fa";

const EASE = [0.22, 1, 0.36, 1] as const;

const XD_COLORS: Record<string, string> = {
  rookie: "#22bb39",
  rising: "#d4ff00",
  cold: "#00cfff",
};

function parseReq(text: string): { value: string; label: string } {
  if (/stream|reel|stor/i.test(text)) {
    const nums = (text.match(/\d+/g) ?? []).map(Number);
    const total = nums.reduce((a, b) => a + b, 0);
    return { value: String(total), label: "Content" };
  }
  if (/view/i.test(text)) {
    const val = text.match(/[\d]+[KkMm+]+/)?.[0] ?? text.split(" ")[0];
    return { value: val, label: "Views" };
  }
  if (/engagement/i.test(text)) {
    const val = text.match(/[\d.]+%/)?.[0] ?? "";
    return { value: val, label: "Engagement" };
  }
  if (/score/i.test(text)) {
    const val = text.match(/[+\d]+/)?.[0] ?? "";
    return { value: val, label: "Score" };
  }
  if (/collab/i.test(text)) {
    const val = text.match(/\d+/)?.[0] ?? "";
    return { value: val, label: "Collabs" };
  }
  if (/loyalty|quarter/i.test(text)) {
    const val = text.match(/\d+/)?.[0] ?? "1";
    return { value: val + "Q", label: "Loyalty" };
  }
  // fallback
  const words = text.split(" ");
  return { value: words[0], label: words.slice(1, 3).join(" ") };
}

function ReqCircle({
  value, label, fullText, color,
}: {
  value: string; label: string; fullText: string; color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-1.5 relative cursor-default w-[calc(20%-12px)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* Tooltip */}
      <div
        className="absolute bottom-full left-1/2 mb-2 z-10 pointer-events-none
                   font-proxima text-white text-center rounded px-2 py-1 whitespace-nowrap
                   transition-all duration-200"
        style={{
          fontSize: "clamp(0.6rem, 0.8vw, 0.72rem)",
          background: "rgba(30,30,30,0.95)",
          border: `1px solid ${color}40`,
          opacity: hovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${hovered ? "0px" : "4px"})`,
          width: "80px",
          whiteSpace: "normal",
          lineHeight: "1.4",
        }}>
        {fullText}
      </div>

      {/* Circle */}
      <div
        className={`flex items-center justify-center rounded-full transition-colors duration-200
          w-full aspect-square 
          ${hovered ? "bg-white text-black" : "bg-white/10 text-white"}`}>
        <span className="font-black leading-none txt-larger">
          {value}
        </span>
      </div>

      {/* Label */}
      <span
        className="text-center leading-tight txt-large"
        style={{
          color: "#9ca3af",
        }}>
        {label}
      </span>
    </div>
  );
}

export default function LevelingSection() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isAr = locale === "ar";

  return (
    <section
      className="w-screen py-16 lg:py-25 px-4 lg:px-35 relative">
      <div className="container">
        <div className="absolute w-screen h-full inset-x-0 top-10 z-1 lg:-mt-14 -mt-10 overflow-hidden">
          <div className="clip-skew w-full">
            <img
              src="/assets/textures/texture.webp"
              alt=""
              className="w-full h-full object-cover object-top grayscale saturate-50 opacity-30"
            />
          </div>
        </div>
        <FadeInView className="text-center mb-10 lg:mb-16 relative z-2">
          <h2 className="header-larger font-display font-black text-white tracking-wide uppercase mb-3 lg:mb-4">
            {t("levelingSystem")}
          </h2>
          <p className="font-proxima text-[#ccccd0] txt-larger max-w-xl mx-auto">
            {t("levelingDesc")}
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 relative z-2">
          {LANDING_RANKS.map((rank, i) => {
            const color = XD_COLORS[rank.id] ?? rank.color;
            const reqs = isAr ? rank.requirementsAr : rank.requirementsEn;

            return (
              <motion.div
                key={rank.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className={i === 2 ? "md:w-full md:max-w-112.5 md:col-span-2 md:justify-self-center xl:col-span-1" : ""}
              >
                <div
                  className="block p-6 lg:p-8 h-full overflow-hidden relative rounded-md"
                  style={{
                    border: `3px solid ${color}`,
                    background: `linear-gradient(to top, ${hexToRgba(color, 0.3)} 0%, ${hexToRgba(color, 0.2)} 10%, ${hexToRgba(color, 0)} 100%)`,
                  }}>
                  {/* Icon badge */}
                  <div
                    className="rounded-full w-fit p-3 mb-3"
                    style={{
                      color,
                      border: `1px solid ${color}`,
                      background: hexToRgba(color, 0.1),
                    }}>
                    <FaStar className="size-6" />
                  </div>

                  {/* Rank name */}
                  <h3
                    className="font-display font-black uppercase "
                    style={{
                      fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                      color,
                      letterSpacing: "0.05em",
                    }}>
                    {isAr ? rank.nameAr : rank.nameEn}
                  </h3>

                  {/* Requirements label */}
                  <p className="font-proxima text-white font-semibold txt-regular mb-3">
                    {t("requirements")}:
                  </p>

                  {/* Requirement circles */}
                  <div className="flex flex-wrap gap-x-3.5 gap-y-5 min-h-15">
                    {reqs.slice(0, 5).map((req) => {
                      const { value, label } = parseReq(req);
                      return (
                        <ReqCircle
                          key={req}
                          value={value}
                          label={label}
                          fullText={req}
                          color={color}
                        />
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
