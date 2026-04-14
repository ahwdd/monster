// src/components/forms/SubmissionForm.tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import FileUpload from "@/components/ui/FileUpload";
import { useToast } from "@/contexts/ToastContext";

type Platform   = "FACEBOOK"|"INSTAGRAM"|"KICK"|"TIKTOK"|"TWITCH"|"YOUTUBE";
type ContentType= "STREAM"|"SHORT"|"REEL";
type Appearance = "MONSTER_THEME"|"LAYOUT"|"LOGO"|"MONSTER_PRODUCTS";

type Props = {
  creatorName: string;
  rank:        string;
  onSuccess:   () => void;
};

export default function SubmissionForm({ creatorName, rank, onSuccess }: Props) {
  const t     = useTranslations("submitForm");
  const toast = useToast();

  const PLATFORMS: { value: Platform; label: string }[] = [
    { value: "FACEBOOK",  label: "Facebook"  },
    { value: "INSTAGRAM", label: "Instagram" },
    { value: "KICK",      label: "Kick"      },
    { value: "TIKTOK",    label: "TikTok"    },
    { value: "TWITCH",    label: "Twitch"    },
    { value: "YOUTUBE",   label: "YouTube"   },
  ];

  const CONTENT_TYPES: { value: ContentType; label: string }[] = [
    { value: "STREAM", label: t("streamLabel") },
    { value: "SHORT",  label: t("shortLabel")  },
    { value: "REEL",   label: t("reelLabel")   },
  ];

  const APPEARANCES: { value: Appearance; label: string }[] = [
    { value: "MONSTER_THEME",    label: t("themeLabel")    },
    { value: "LAYOUT",           label: t("layoutLabel")   },
    { value: "LOGO",             label: t("logoLabel")     },
    { value: "MONSTER_PRODUCTS", label: t("productsLabel") },
  ];

  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    platform:           "" as Platform | "",
    contentLink:        "",
    contentTypes:       [] as ContentType[],
    monsterAppearances: [] as Appearance[],
    totalReach:         "",
    totalViews:         "",
    statsScreenshotUrl: "",
  });

  function set(key: keyof typeof form, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }

  function toggle<T extends string>(key: "contentTypes"|"monsterAppearances", v: T) {
    const arr = form[key] as T[];
    set(key, arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.platform)                      e.platform           = t("errorPlatform");
    if (!form.contentLink.trim())            e.contentLink        = t("errorLink");
    if (form.contentTypes.length === 0)      e.contentTypes       = t("errorContentType");
    if (form.monsterAppearances.length === 0)e.monsterAppearances = t("errorAppearance");
    if (!form.totalReach.trim())             e.totalReach         = t("errorReach");
    if (!form.totalViews.trim())             e.totalViews         = t("errorViews");
    if (!form.statsScreenshotUrl)            e.statsScreenshotUrl = t("errorScreenshot");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res  = await fetch("/api/submissions", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          totalReach: parseInt(form.totalReach, 10) || 0,
          totalViews: parseInt(form.totalViews, 10) || 0,
          statsScreenshotUrl: form.statsScreenshotUrl || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(t("successMsg"));
        setForm({ platform: "", contentLink: "", contentTypes: [], monsterAppearances: [], totalReach: "", totalViews: "", statsScreenshotUrl: "" });
        onSuccess();
      } else {
        toast.error(data.error || "Error");
      }
    } catch {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
      <form onSubmit={handleSubmit} className="space-y-5">

        <Field label={t("creatorName")}>
          <input type="text" value={creatorName} disabled className={`${input()} opacity-60 cursor-not-allowed`} />
        </Field>

        <Field label={t("rank")}>
          <input type="text" value={rank.replace(/_/g, " ")} disabled className={`${input()} opacity-60 cursor-not-allowed`} />
        </Field>

        <Field label={t("platform")} error={errors.platform} required>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <ToggleBtn key={p.value} active={form.platform === p.value} onClick={() => set("platform", p.value)}>
                {p.label}
              </ToggleBtn>
            ))}
          </div>
        </Field>

        <Field label={t("contentLink")} error={errors.contentLink} required>
          <input type="url" value={form.contentLink} onChange={(e) => set("contentLink", e.target.value)}
            className={input(errors.contentLink)} placeholder="https://" />
        </Field>

        <Field label={t("contentType")} error={errors.contentTypes} required>
          <div className="flex flex-wrap gap-2">
            {CONTENT_TYPES.map((c) => (
              <ToggleBtn key={c.value} active={form.contentTypes.includes(c.value)}
                onClick={() => toggle("contentTypes", c.value)}>{c.label}</ToggleBtn>
            ))}
          </div>
        </Field>

        <Field label={t("monsterAppearance")} error={errors.monsterAppearances} required>
          <div className="flex flex-wrap gap-2">
            {APPEARANCES.map((a) => (
              <ToggleBtn key={a.value} active={form.monsterAppearances.includes(a.value)}
                onClick={() => toggle("monsterAppearances", a.value)}>{a.label}</ToggleBtn>
            ))}
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label={t("totalReach")} error={errors.totalReach} required>
            <input type="number" min="0" value={form.totalReach} onChange={(e) => set("totalReach", e.target.value)}
              className={input(errors.totalReach)} placeholder="0" />
          </Field>
          <Field label={t("totalViews")} error={errors.totalViews} required>
            <input type="number" min="0" value={form.totalViews} onChange={(e) => set("totalViews", e.target.value)}
              className={input(errors.totalViews)} placeholder="0" />
          </Field>
        </div>

        <FileUpload label={t("screenshot")} value={form.statsScreenshotUrl}
          onChange={(url) => set("statsScreenshotUrl", url)} folder="monster-creators/stats"
          maxMB={5} error={errors.statsScreenshotUrl} required />

        <button type="submit" disabled={loading}
          className="w-full py-4 bg-[#78be20] hover:bg-[#8fd428] text-black font-display font-bold uppercase tracking-wider header-smaller rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading
            ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            : <><IoCheckmarkCircle className="size-5" />{t("submit")}</>
          }
        </button>
      </form>
    </motion.div>
  );
}

function Field({ label, error, required, children }: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="txt-small font-medium text-white">
        {label}{required && <span className="text-red-400 ms-1">*</span>}
      </label>
      {children}
      {error && <p className="txt-smaller text-red-400">{error}</p>}
    </div>
  );
}

function ToggleBtn({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick}
      className={`px-4 py-2 rounded-lg txt-small font-medium border transition-colors duration-200 ${
        active ? "border-[#78be20] bg-[#78be20]/10 text-[#78be20]" : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
      }`}>{children}</button>
  );
}

function input(error?: string) {
  return `w-full px-4 py-3 bg-black border rounded-lg text-white txt-regular placeholder:text-zinc-600 outline-none transition-colors duration-200 ${
    error ? "border-red-500 focus:border-red-400" : "border-zinc-700 focus:border-[#78be20]"
  }`;
}