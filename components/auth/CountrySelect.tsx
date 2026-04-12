// components/auth/CountrySelect.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

type Country = { code: string; flag: string; callingCode: string; name: string };

const COUNTRIES: Country[] = [
  { code: "SA", flag: "sa", callingCode: "+966", name: "Saudi Arabia"   },
  { code: "EG", flag: "eg", callingCode: "+20",  name: "Egypt"          },
  { code: "AE", flag: "ae", callingCode: "+971", name: "UAE"            },
  { code: "KW", flag: "kw", callingCode: "+965", name: "Kuwait"         },
  { code: "QA", flag: "qa", callingCode: "+974", name: "Qatar"          },
  { code: "BH", flag: "bh", callingCode: "+973", name: "Bahrain"        },
  { code: "OM", flag: "om", callingCode: "+968", name: "Oman"           },
  { code: "JO", flag: "jo", callingCode: "+962", name: "Jordan"         },
  { code: "IQ", flag: "iq", callingCode: "+964", name: "Iraq"           },
  { code: "LB", flag: "lb", callingCode: "+961", name: "Lebanon"        },
  { code: "MA", flag: "ma", callingCode: "+212", name: "Morocco"        },
  { code: "DZ", flag: "dz", callingCode: "+213", name: "Algeria"        },
  { code: "TN", flag: "tn", callingCode: "+216", name: "Tunisia"        },
  { code: "LY", flag: "ly", callingCode: "+218", name: "Libya"          },
  { code: "SD", flag: "sd", callingCode: "+249", name: "Sudan"          },
  { code: "GB", flag: "gb", callingCode: "+44",  name: "United Kingdom" },
  { code: "US", flag: "us", callingCode: "+1",   name: "United States"  },
  { code: "DE", flag: "de", callingCode: "+49",  name: "Germany"        },
  { code: "FR", flag: "fr", callingCode: "+33",  name: "France"         },
  { code: "TR", flag: "tr", callingCode: "+90",  name: "Turkey"         },
];

type Props = {
  value:    string; // callingCode e.g. "+20"
  onChange: (country: Country) => void;
};

export default function CountrySelect({ value, onChange }: Props) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected = COUNTRIES.find((c) => c.callingCode === value) ?? COUNTRIES[0];
  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.callingCode.includes(search)
  );

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 h-full px-3 py-3.5 bg-black border border-zinc-700 
          rounded-lg text-white hover:border-zinc-500 transition-colors duration-200 whitespace-nowrap"
      >
        <span className={`fi fi-${selected.flag} txt-larger rounded-sm`} />
        <span className="txt-small text-zinc-400">{selected.callingCode}</span>
        <IoChevronDown className={`size-3 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full inset-s-0 mt-1 z-50 w-56 bg-[#111] border border-zinc-800 rounded-lg overflow-hidden shadow-xl">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md text-white txt-small outline-none placeholder:text-zinc-600 focus:border-[#78be20] transition-colors"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto">
            {filtered.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 txt-small hover:bg-zinc-800 transition-colors text-start ${
                    c.code === selected.code ? "text-[#78be20]" : "text-zinc-300"
                  }`}
                >
                  <span className={`fi fi-${c.flag} txt-larger rounded-sm shrink-0`} />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-zinc-500 shrink-0">{c.callingCode}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}