"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SkewBtn from "../ui/SkewBtn";
import { flavorItems } from "@/lib/data/flavors";

export default function FlavorsSection() {
  const tf = useTranslations("flavors");
  const tn = useTranslations("nav");

  return (
    <section className="w-full bg-[#050505] py-8 sm:py-12 overflow-hidden">
      {/* ── Header ── */}
      <div className="text-center mb-6 px-4">
        <h2 className="font-black header-huge uppercase leading-none mb-4 sm:mb-6 text-white">
          {tf("monsterEnergy").split(" ").slice(0, 2).join(" ")}{" "}
          <span className="text-accent">
            {tn("energyDrinks").split(" ").slice(-1)[0]}
          </span>
        </h2>
        <SkewBtn href="/flavors" text={tn("shopAllFlavors")} />
      </div>

      {/* ── Grid: 3 cols mobile → 6 cols desktop ── */}
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
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
      className="relative flex flex-col items-stretch pb-4 sm:pb-5">
      <Link
        href={`/flavors/${item.nameKey}`}
        className="flex flex-col items-center no-underline group">
        {/* Text */}
        <div className="text-center px-1 sm:px-2 mb-2 sm:mb-3">
          <h3 className="font-medium txt-small sm:txt-regular md:header-small uppercase text-white mb-0.5 leading-tight">
            {tf(item.nameKey)}
          </h3>
          <p
            className="txt-smaller sm:txt-regular m-0 leading-tight"
            style={{ color: item.color }}>
            {tf(item.subKey)}
          </p>
        </div>

        {/* Image */}
        <div className="relative flex items-end justify-center w-full">
          <span
            style={{ backgroundSize: "80%" }}
            className="absolute -bottom-7 inset-x-0 mx-auto w-full h-16 z-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(.47,1.64,.41,.8)] bg-[url('/assets/textures/suggested-flavors-shadow.png')] bg-no-repeat bg-bottom"
          />
          <Image
            src={item.img}
            alt={tf(item.nameKey)}
            width={160}
            height={270}
            className="relative z-3 max-h-40 sm:max-h-52 lg:max-h-67.5 w-auto object-contain mx-auto transition-all duration-300 ease-[cubic-bezier(.47,1.64,.41,.8)] group-hover:-translate-y-3"
          />
        </div>
      </Link>
    </motion.div>
  );
}
