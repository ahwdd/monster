// src/components/program/KpiTable.tsx
"use client";
import { useLocale, useTranslations } from "next-intl";
import { KPI_TABLE } from "@/lib/data/program";
import { RANK_CONFIG } from "@/lib/data/program";

const RANK_COLS = [
  { key: "UNRANKED" as const, colKey: "unranked" as const },
  { key: "ROOKIE" as const, colKey: "rookie" as const },
  { key: "RISING" as const, colKey: "rising" as const },
  { key: "COLD" as const, colKey: "cold" as const },
];

export default function KpiTable() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = useTranslations("program");

  return (
    <div className="w-full overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
      <table className="w-full min-w-160 border-collapse">
        <thead>
          <tr style={{ borderBottom: "1px solid #707070" }}>
            <th
              className="text-start py-3 px-4 txt-smaller text-zinc-500 uppercase tracking-wider
              font-semibold w-1/4 bg-[#0a0a0a]">
              {isAr ? "المعيار" : "Criteria"}
            </th>
            {RANK_COLS.map(({ key }) => {
              const cfg = RANK_CONFIG[key];
              return (
                <th
                  key={key}
                  className="py-3 px-4 text-center txt-small font-display font-black
                  uppercase tracking-wide bg-[#0a0a0a]"
                  style={{ color: cfg.color }}>
                  {isAr ? cfg.labelAr : cfg.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {KPI_TABLE.map((row, i) => (
            <tr
              key={row.labelEn}
              className={i % 2 === 0 ? "bg-[#050505]" : "bg-[#0a0a0a]"}
              style={{ borderBottom: "1px solid #1a1a1a" }}>
              {/* Label */}
              <td className="py-3 px-4 txt-smaller text-zinc-400 font-semibold">
                {isAr ? row.labelAr : row.labelEn}
              </td>
              {RANK_COLS.map(({ colKey, key }) => {
                const cfg = RANK_CONFIG[key];
                const val = row[colKey];
                const isNA = val === "N/A" || val === "—";
                return (
                  <td
                    key={colKey}
                    className="py-3 px-4 text-center txt-smaller">
                    <span
                      style={{ color: isNA ? "#52525b" : cfg.color }}
                      className="font-medium">
                      {val}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
