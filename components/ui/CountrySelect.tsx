// src/components/ui/CountrySelect.tsx
"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { IoChevronDown } from "react-icons/io5";
import { Country } from "@/lib/types/countries";
import { countriesList } from "@/lib/data/countries";

type Props = {
  value?: string;
  onChange: (country: Country) => void;
  disabled?: boolean;
  className?: string;
};

function resolve(value: string): Country {
  return (
    countriesList.find((c) => c.callingCode === value || c.key === value) ??
    countriesList.find((c) => c.key === "SA")!
  );
}

export default function CountrySelect({
  value = "SA",
  onChange,
  disabled,
  className,
}: Props) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [selected, setSelected] = useState<Country>(() => resolve(value));
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync if parent changes value
  useEffect(() => {
    setSelected(resolve(value));
  }, [value]);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Focus search on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const filtered = search
    ? countriesList.filter((c) => {
        const q = search.toLowerCase();
        const name = (isAr ? c.arLabel : c.label).toLowerCase();
        return (
          name.includes(q) ||
          c.callingCode.includes(q) ||
          c.key.toLowerCase().includes(q)
        );
      })
    : countriesList;

  function pick(country: Country) {
    setSelected(country);
    setOpen(false);
    setSearch("");
    onChange(country);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter" && filtered.length === 1) pick(filtered[0]);
  }

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 h-full px-3 py-3.5 bg-black border border-zinc-700
          rounded-lg text-white hover:border-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200 whitespace-nowrap">
        <span
          className={`fi fi-${selected.flag.toLowerCase()} txt-larger rounded-sm shrink-0`}
        />
        <span className="txt-small text-zinc-400">{selected.callingCode}</span>
        <IoChevronDown
          className={`size-3 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full mt-1 z-50 w-60 bg-[#111] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
          style={{ [isAr ? "right" : "left"]: 0 }}
          onKeyDown={handleKeyDown}>
          {/* Search */}
          <div className="p-2 border-b border-zinc-800">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? "بحث..." : "Search..."}
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg text-white txt-small
                outline-none focus:border-[#78be20] transition-colors placeholder:text-zinc-600"
            />
          </div>

          {/* List */}
          <ul className="max-h-52 overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-4 py-3 txt-small text-zinc-500 text-center">
                {isAr ? "لا نتائج" : "No results"}
              </li>
            )}
            {filtered.map((c) => (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={() => pick(c)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 txt-small hover:bg-zinc-800 transition-colors text-start ${
                    c.key === selected.key ? "text-[#78be20]" : "text-zinc-300"
                  }`}>
                  <span
                    className={`fi fi-${c.flag.toLowerCase()} txt-larger rounded-sm shrink-0`}
                  />
                  <span className="flex-1 truncate">
                    {isAr ? c.arLabel : c.label}
                  </span>
                  <span className="text-zinc-500 shrink-0 txt-smaller">
                    {c.callingCode}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
