// src/components/admin/RepairTool.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoConstructOutline,
  IoClose,
  IoSearchOutline,
  IoCheckboxOutline,
  IoSquareOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoPersonOutline,
} from "react-icons/io5";

type Creator = {
  userId: string;
  name: string;
  nickname: string;
  contact: string;
};

type RepairResult = {
  success: boolean;
  repaired: number;
  results: any[];
  error?: string;
};

export default function RepairTool() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState<RepairResult | null>(null);
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load list when panel opens
  useEffect(() => {
    if (!panelOpen) return;
    setLoadingList(true);
    fetch("/api/admin/repair/list", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCreators(d.data);
      })
      .catch(() => {})
      .finally(() => setLoadingList(false));
  }, [panelOpen]);

  // Auto-dismiss countdown
  useEffect(() => {
    if (phase !== "done") return;
    setCountdown(3);
    timerRef.current = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) {
          clearInterval(timerRef.current!);
          setPhase("idle");
          setResult(null);
          return 3;
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  const filtered = creators.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.nickname.toLowerCase().includes(q) ||
      c.contact.toLowerCase().includes(q)
    );
  });

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((c) => selected.has(c.userId));

  function toggleSelectAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) {
        filtered.forEach((c) => next.delete(c.userId));
      } else {
        filtered.forEach((c) => next.add(c.userId));
      }
      return next;
    });
  }

  function toggle(userId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(userId) ? next.delete(userId) : next.add(userId);
      return next;
    });
  }

  async function runRepair() {
    if (selected.size === 0) return;
    setPanelOpen(false);
    setPhase("loading");

    try {
      const allResults: any[] = [];
      let anyFailed = false;

      for (const userId of Array.from(selected)) {
        const res = await fetch("/api/admin/repair", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        if (data.success) {
          allResults.push(...(data.results ?? []));
        } else {
          anyFailed = true;
        }
      }

      setResult({
        success: !anyFailed,
        repaired: allResults.length,
        results: allResults,
      });
    } catch {
      setResult({
        success: false,
        repaired: 0,
        results: [],
        error: "Network error",
      });
    } finally {
      setPhase("done");
      setSelected(new Set());
    }
  }

  return (
    <>
      {/* ── Sidebar trigger button — matches existing nav link style ── */}
      <button
        onClick={() => setPanelOpen(true)}
        className="w-full flex items-center gap-3 px-3 h-10 font-proxima txt-small
                   text-[#ccccd0] hover:text-white hover:bg-white/5 transition-colors rounded-sm">
        <IoConstructOutline className="size-4 shrink-0" />
        Repair Data
      </button>

      {/* ── Side panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPanelOpen(false)}
              className="fixed inset-0 bg-black/60 z-40"
            />

            <motion.div
              key="panel"
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 bottom-0 left-0 w-72 z-50 bg-[#050505]
                         border-r border-[#272727] flex flex-col shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-20 border-b border-[#272727] shrink-0">
                <div className="flex items-center gap-2">
                  <IoConstructOutline className="size-4 text-[#6bd41a]" />
                  <span className="font-proxima txt-small font-bold text-white">
                    Repair User Data
                  </span>
                </div>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="p-1 text-[#555] hover:text-white transition-colors">
                  <IoClose className="size-4" />
                </button>
              </div>

              {/* Search + select-all */}
              <div className="px-4 py-3 border-b border-[#272727] shrink-0 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <IoSearchOutline className="absolute inset-s-3 top-1/2 -translate-y-1/2 size-3.5 text-[#555] pointer-events-none" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search name or nickname..."
                      className="w-full ps-8 pe-3 py-2 bg-[#0a0a0a] border border-[#272727]
                                 text-white txt-smaller placeholder:text-[#444] outline-none
                                 focus:border-[#6bd41a] transition-colors font-proxima"
                    />
                  </div>
                  {/* Select-all icon button */}
                  <button
                    onClick={toggleSelectAll}
                    title={allFilteredSelected ? "Deselect all" : "Select all"}
                    className="p-2 border border-[#272727] hover:border-[#6bd41a]
                               text-[#555] hover:text-[#6bd41a] transition-colors shrink-0">
                    {allFilteredSelected ? (
                      <IoCheckboxOutline className="size-4" />
                    ) : (
                      <IoSquareOutline className="size-4" />
                    )}
                  </button>
                </div>
                {selected.size > 0 && (
                  <p className="txt-smaller text-[#6bd41a] font-proxima">
                    {selected.size} user{selected.size !== 1 ? "s" : ""}{" "}
                    selected
                  </p>
                )}
              </div>

              {/* User list */}
              <div className="flex-1 overflow-y-auto py-1">
                {loadingList ? (
                  <div className="space-y-1 px-3 py-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-3 py-3 bg-[#0a0a0a] animate-pulse">
                        <div className="w-4 h-4 bg-[#1a1a1a] shrink-0" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 bg-[#1a1a1a] w-28 rounded-sm" />
                          <div className="h-2.5 bg-[#1a1a1a] w-20 rounded-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-2 text-[#444]">
                    <IoPersonOutline className="size-7" />
                    <p className="txt-smaller font-proxima">
                      No creators found
                    </p>
                  </div>
                ) : (
                  <div className="px-3 py-1 space-y-0.5">
                    {filtered.map((c) => {
                      const isChecked = selected.has(c.userId);
                      return (
                        <button
                          key={c.userId}
                          onClick={() => toggle(c.userId)}
                          className={`w-full flex items-center gap-3 px-3 py-3 text-start
                            transition-colors duration-100 ${
                              isChecked
                                ? "bg-[#6bd41a]/8 border-s-2 border-[#6bd41a]"
                                : "hover:bg-white/3 border-s-2 border-transparent"
                            }`}>
                          {/* Custom checkbox */}
                          <div
                            className={`shrink-0 size-4 border flex items-center justify-center transition-colors ${
                              isChecked
                                ? "bg-[#6bd41a] border-[#6bd41a]"
                                : "border-[#444]"
                            }`}>
                            {isChecked && (
                              <svg viewBox="0 0 10 8" className="w-2.5 h-2.5">
                                <path
                                  d="M1 4l2.5 2.5L9 1"
                                  stroke="black"
                                  strokeWidth="1.8"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>

                          {/* Info */}
                          <div className="min-w-0 flex-1">
                            <p className="txt-smaller font-proxima font-semibold text-white truncate">
                              {c.name}
                            </p>
                            <p className="txt-smaller font-proxima text-[#555] truncate">
                              @{c.nickname}
                              {c.contact && (
                                <span className="ms-1.5 text-[#333]">
                                  · {c.contact}
                                </span>
                              )}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Run button */}
              <div className="px-4 py-4 border-t border-[#272727] shrink-0">
                <button
                  onClick={runRepair}
                  disabled={selected.size === 0}
                  className="w-full h-11 bg-[#6bd41a] hover:bg-[#7de020] text-black font-display
                             font-bold uppercase txt-smaller tracking-wider transition-colors
                             disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  <IoConstructOutline className="size-4" />
                  {selected.size > 0
                    ? `Repair ${selected.size} User${selected.size !== 1 ? "s" : ""}`
                    : "Select Users"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Loading / Result popup ──────────────────────────────────── */}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="popup-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-60 flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-[#050505] border border-[#272727] w-full max-w-xs
                         shadow-2xl flex flex-col items-center gap-5 text-center p-8">
              {phase === "loading" && (
                <>
                  <div className="w-12 h-12 border-2 border-[#6bd41a] border-t-transparent rounded-full animate-spin" />
                  <div>
                    <p className="font-proxima txt-small font-bold text-white mb-1">
                      Repairing data…
                    </p>
                    <p className="font-proxima txt-smaller text-[#555]">
                      Recalculating content counts and reach
                    </p>
                  </div>
                </>
              )}

              {phase === "done" && result && (
                <>
                  {result.success ? (
                    <IoCheckmarkCircle className="size-12 text-[#6bd41a]" />
                  ) : (
                    <IoCloseCircle className="size-12 text-red-400" />
                  )}

                  <div>
                    <p className="font-proxima txt-small font-bold text-white mb-1">
                      {result.success
                        ? `Repaired ${result.repaired} user${result.repaired !== 1 ? "s" : ""}`
                        : "Repair failed"}
                    </p>
                    <p className="font-proxima txt-smaller text-[#555]">
                      {result.success
                        ? "Content counts and reach have been recalculated from approved submissions."
                        : (result.error ??
                          "Something went wrong. Check server logs.")}
                    </p>
                  </div>

                  {/* Countdown ring */}
                  <div className="flex items-center gap-3">
                    <div className="relative size-9 shrink-0">
                      <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90">
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#1a1a1a"
                          strokeWidth="3"
                        />
                        <motion.circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#6bd41a"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 15}
                          animate={{
                            strokeDashoffset:
                              2 * Math.PI * 15 * (1 - countdown / 3),
                          }}
                          transition={{ duration: 0.5, ease: "linear" }}
                        />
                      </svg>
                      <span
                        className="absolute inset-0 flex items-center justify-center
                                       font-proxima txt-smaller font-bold text-white">
                        {countdown}
                      </span>
                    </div>
                    <p className="font-proxima txt-smaller text-[#444]">
                      Dismissing in {countdown}s
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
