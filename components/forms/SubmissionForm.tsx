// src/components/forms/SubmissionForm.tsx
"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import FileUpload from "@/components/ui/FileUpload";
import { useToast } from "@/contexts/ToastContext";

type Platform    = "FACEBOOK" | "INSTAGRAM" | "KICK" | "TIKTOK" | "TWITCH" | "YOUTUBE";
type ContentType = "STREAM" | "SHORT" | "REEL";
type Appearance  = "MONSTER_THEME" | "LAYOUT" | "LOGO" | "MONSTER_PRODUCTS";

const PLATFORMS: { value: Platform; labelEn: string; labelAr: string }[] = [
  { value: "FACEBOOK",  labelEn: "Facebook",  labelAr: "فيسبوك"  },
  { value: "INSTAGRAM", labelEn: "Instagram", labelAr: "انستجرام"},
  { value: "KICK",      labelEn: "Kick",      labelAr: "كيك"     },
  { value: "TIKTOK",    labelEn: "TikTok",    labelAr: "تيك توك" },
  { value: "TWITCH",    labelEn: "Twitch",    labelAr: "تويتش"   },
  { value: "YOUTUBE",   labelEn: "YouTube",   labelAr: "يوتيوب"  },
];

const CONTENT_TYPES: { value: ContentType; labelEn: string; labelAr: string }[] = [
  { value: "STREAM", labelEn: "Stream", labelAr: "بث مباشر" },
  { value: "SHORT",  labelEn: "Short",  labelAr: "شورت"     },
  { value: "REEL",   labelEn: "Reel",   labelAr: "ريل"      },
];

const APPEARANCES: { value: Appearance; labelEn: string; labelAr: string }[] = [
  { value: "MONSTER_THEME",    labelEn: "Monster Theme",    labelAr: "نمط مونستر"    },
  { value: "LAYOUT",           labelEn: "Layout",           labelAr: "إطار البث"     },
  { value: "LOGO",             labelEn: "Logo",             labelAr: "لوجو"          },
  { value: "MONSTER_PRODUCTS", labelEn: "Monster Products", labelAr: "منتجات مونستر" },
];

type Props = {
  creatorName: string;
  rank:        string;
  onSuccess:   () => void;
};

export default function SubmissionForm({ creatorName, rank, onSuccess }: Props) {
  const locale = useLocale();
  const isAr   = locale === "ar";
  const toast  = useToast();

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

  function toggle<T extends string>(key: "contentTypes" | "monsterAppearances", v: T) {
    const arr = form[key] as T[];
    set(key, arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    const req = isAr ? "مطلوب" : "Required";
    if (!form.platform)                  e.platform           = isAr ? "اختر منصة" : "Select a platform";
    if (!form.contentLink.trim())        e.contentLink        = req;
    if (form.contentTypes.length === 0)  e.contentTypes       = isAr ? "اختر نوعًا واحدًا على الأقل" : "Select at least one";
    if (form.monsterAppearances.length === 0) e.monsterAppearances = isAr ? "اختر خيارًا واحدًا على الأقل" : "Select at least one";
    if (!form.totalReach.trim())         e.totalReach         = req;
    if (!form.totalViews.trim())         e.totalViews         = req;
    if (!form.statsScreenshotUrl)        e.statsScreenshotUrl = isAr ? "الرجاء رفع الصورة" : "Screenshot required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform:           form.platform,
          contentLink:        form.contentLink,
          contentTypes:       form.contentTypes,
          monsterAppearances: form.monsterAppearances,
          totalReach:         parseInt(form.totalReach, 10) || 0,
          totalViews:         parseInt(form.totalViews, 10) || 0,
          statsScreenshotUrl: form.statsScreenshotUrl || null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(isAr ? "تم إرسال المشاركة! سيتم مراجعتها قريبًا." : "Submission sent! It will be reviewed shortly.");
        // Reset form
        setForm({ platform: "", contentLink: "", contentTypes: [], monsterAppearances: [], totalReach: "", totalViews: "", statsScreenshotUrl: "" });
        onSuccess();
      } else {
        toast.error(data.error || (isAr ? "حدث خطأ" : "Something went wrong"));
      }
    } catch {
      toast.error(isAr ? "حدث خطأ" : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="font-proxima"
    >
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Creator name — read only */}
        <Field label={isAr ? "اسم صانع المحتوى" : "Content Creator Name"}>
          <input type="text" value={creatorName} disabled
            className={`${inputCls()} opacity-60 cursor-not-allowed`} />
        </Field>

        {/* Rank — read only */}
        <Field label={isAr ? "التصنيف" : "Rank"}>
          <input type="text"
            value={rank.replace(/_/g, " ")}
            disabled
            className={`${inputCls()} opacity-60 cursor-not-allowed`} />
        </Field>

        {/* Platform — single */}
        <Field label={isAr ? "المنصة" : "Platform"} error={errors.platform} required>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button key={p.value} type="button"
                onClick={() => set("platform", p.value)}
                className={`px-4 py-2 rounded-lg txt-small font-medium border transition-colors duration-200 ${
                  form.platform === p.value
                    ? "border-[#78be20] bg-[#78be20]/10 text-[#78be20]"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                {isAr ? p.labelAr : p.labelEn}
              </button>
            ))}
          </div>
        </Field>

        {/* Content link */}
        <Field label={isAr ? "رابط المحتوى" : "Content Link"} error={errors.contentLink} required>
          <input type="url" value={form.contentLink}
            onChange={(e) => set("contentLink", e.target.value)}
            className={inputCls(errors.contentLink)} placeholder="https://" />
        </Field>

        {/* Content types — multiple */}
        <Field label={isAr ? "نوع المحتوى" : "Content Type"} error={errors.contentTypes} required>
          <div className="flex flex-wrap gap-2">
            {CONTENT_TYPES.map((c) => (
              <button key={c.value} type="button"
                onClick={() => toggle("contentTypes", c.value)}
                className={`px-4 py-2 rounded-lg txt-small font-medium border transition-colors duration-200 ${
                  form.contentTypes.includes(c.value)
                    ? "border-[#78be20] bg-[#78be20]/10 text-[#78be20]"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                {isAr ? c.labelAr : c.labelEn}
              </button>
            ))}
          </div>
        </Field>

        {/* Monster appearances — multiple */}
        <Field label={isAr ? "طريقة ظهور مونستر" : "Monster Appearance"} error={errors.monsterAppearances} required>
          <div className="flex flex-wrap gap-2">
            {APPEARANCES.map((a) => (
              <button key={a.value} type="button"
                onClick={() => toggle("monsterAppearances", a.value)}
                className={`px-4 py-2 rounded-lg txt-small font-medium border transition-colors duration-200 ${
                  form.monsterAppearances.includes(a.value)
                    ? "border-[#78be20] bg-[#78be20]/10 text-[#78be20]"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                {isAr ? a.labelAr : a.labelEn}
              </button>
            ))}
          </div>
        </Field>

        {/* Stats numbers */}
        <div className="grid grid-cols-2 gap-4">
          <Field label={isAr ? "عدد الوصول" : "Total Reach"} error={errors.totalReach} required>
            <input type="number" min="0" value={form.totalReach}
              onChange={(e) => set("totalReach", e.target.value)}
              className={inputCls(errors.totalReach)} placeholder="0" />
          </Field>
          <Field label={isAr ? "عدد المشاهدات" : "Total Views"} error={errors.totalViews} required>
            <input type="number" min="0" value={form.totalViews}
              onChange={(e) => set("totalViews", e.target.value)}
              className={inputCls(errors.totalViews)} placeholder="0" />
          </Field>
        </div>

        {/* Screenshot — 5MB */}
        <FileUpload
          label={isAr ? "صورة الإحصائيات" : "Statistics Screenshot"}
          value={form.statsScreenshotUrl}
          onChange={(url) => set("statsScreenshotUrl", url)}
          folder="monster-creators/stats"
          maxMB={5}
          error={errors.statsScreenshotUrl}
          required
        />

        {/* Submit */}
        <button type="submit" disabled={loading}
          className="w-full py-4 bg-[#78be20] hover:bg-[#8fd428] text-black font-display font-bold uppercase tracking-wider header-smaller rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading
            ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            : <><IoCheckmarkCircle className="size-5" />{isAr ? "إرسال المشاركة" : "Submit"}</>
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

function inputCls(error?: string) {
  return `w-full px-4 py-3 bg-black border rounded-lg text-white txt-regular placeholder:text-zinc-600 outline-none transition-colors duration-200 ${
    error ? "border-red-500 focus:border-red-400" : "border-zinc-700 focus:border-[#78be20]"
  }`;
}