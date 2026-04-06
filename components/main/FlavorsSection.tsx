"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import SkewBtn from "../ui/SkewBtn";
import { flavorItems } from "@/utils/data/flavors";

export default function FlavorsSection() {
  const t = useLocale();
  const tf = useTranslations("flavors");
  const tn = useTranslations("nav");

  return (
    <section className="w-full bg-[#050505] py-12 overflow-hidden">

      {/* ── Header ── */}
      <div className="text-center mb-6">
        <h2 className="font-black header-huge uppercase leading-none mb-6 text-white">
          {tf("monsterEnergy").split(" ").slice(0, 2).join(" ")}{" "}
          <span className="text-accent">{tn("energyDrinks").split(" ").slice(-1)[0]}</span>
        </h2>

        <SkewBtn href="/flavors" text={tn("shopAllFlavors")} />
      </div>

      {/* ── Slider ── */}
      <div
        className="relative mx-auto max-w-325 px-0 flex flex-row items-center justify-center overflow-hidden z-1 touch-pan-y"
      >
        <div className="flex w-full transition-none">
          {flavorItems.map((item, i) => (
            <FlavorCard key={item.nameKey} item={item} index={i} />
          ))}
        </div>
      </div>

    </section>
  );
}

function FlavorCard({
  item,
  index,
}: {
  item: (typeof flavorItems)[number];
  index: number;
}) {
  const tf = useTranslations("flavors");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.3,
        delay: index * 0.07,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative flex flex-col items-stretch justify-center no-underline w-[16.66%] shrink-0 pb-5 backface-hidden transition-all"
    >
      <Link href={`/flavors/${item.nameKey}`} className="flex flex-col items-center no-underline group">

        {/* Text */}
        <div className="text-center px-2 mb-3">
          <h3
            className="header-small font-medium text-[22px]! uppercase text-white mb-0.5"
          >
            {tf(item.nameKey)}
          </h3>
          <p
            className="txt-regular m-0 leading-tight"
            style={{ color: item.color }}
          >
            {tf(item.subKey)}
          </p>
        </div>

        {/* Image wrapper */}
        <div className="relative flex items-end justify-center w-full">
          {/* shadow — shown on hover, pushes image up */}
          <span style={{backgroundSize: '80%'}}
            className="absolute -bottom-7 -left-5.25 right-0 mx-auto w-64.5 h-16 z-2 opacity-0 group-hover:opacity-100 
            transition-all duration-300 ease-[cubic-bezier(.47,1.64,.41,.8)] 
            bg-[url('/assets/textures/suggested-flavors-shadow.png')] bg-no-repeat bg-bottom"
          />
          <Image
            src={item.img}
            alt={tf(item.nameKey)}
            width={160}
            height={270}
            className="relative z-3 max-h-67.5 w-auto object-contain mx-auto transition-all duration-300 
            ease-[cubic-bezier(.47,1.64,.41,.8)] group-hover:-translate-y-3"
          />
        </div>

      </Link>
    </motion.div>
  );
}