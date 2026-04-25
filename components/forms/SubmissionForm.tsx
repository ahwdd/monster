"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import FileUpload from "@/components/ui/FileUpload";
import { useToast } from "@/contexts/ToastContext";
import { Field, input, ToggleBtn } from "./Helpers";
import OutlinedParaBtn from "@/components/ui/OutlinedParaBtn";

type Platform = "FACEBOOK" | "INSTAGRAM" | "KICK" | "TIKTOK" | "TWITCH" | "YOUTUBE";
type ContentType = "PICTURE" | "STORY" | "REEL" | "LONG_VIDEO" | "POST";
type Appearance = "MONSTER_THEME" | "LAYOUT" | "LOGO" | "MONSTER_PRODUCTS";

type Props = {
  nickname: string;
  rank: string;
  initialData?: any;
  onSuccess: () => void;
};

export default function SubmissionForm({ nickname, rank, initialData, onSuccess }: Props) {
  const t = useTranslations("submitForm");
  const toast = useToast();
  const locale = useLocale();
  const router = useRouter();

  const PLATFORMS: { value: Platform; label: string }[] = [
    { value: "FACEBOOK", label: "Facebook" },
    { value: "INSTAGRAM", label: "Instagram" },
    { value: "KICK", label: "Kick" },
    { value: "TIKTOK", label: "TikTok" },
    { value: "TWITCH", label: "Twitch" },
    { value: "YOUTUBE", label: "YouTube" },
  ];
  const CONTENT_TYPES: { value: ContentType; label: string }[] = [
    { value: "PICTURE", label: t("pictureLabel") },
    { value: "STORY", label: t("storyLabel") },
    { value: "REEL", label: t("reelLabel") },
    { value: "LONG_VIDEO", label: t("longVideoLabel") },
    { value: "POST", label: t("postLabel") },
  ];
  const APPEARANCES: { value: Appearance; label: string }[] = [
    { value: "MONSTER_THEME", label: t("themeLabel") },
    { value: "LAYOUT", label: t("layoutLabel") },
    { value: "LOGO", label: t("logoLabel") },
    { value: "MONSTER_PRODUCTS", label: t("productsLabel") },
  ];

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    platform: (initialData?.platform ?? "") as Platform | "",
    contentLink: initialData?.contentLink ?? "",
    contentTypes: (initialData?.contentTypes ?? []) as ContentType[],
    monsterAppearances: (initialData?.monsterAppearances ?? []) as Appearance[],
    submittedReach: String(initialData?.submittedReach ?? ""),
    statsScreenshotUrl: initialData?.statsScreenshotUrl ?? "",
  });

  const isEditMode = !!initialData?.id;

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
    if (!form.platform) e.platform = t("errorPlatform");
    if (!form.contentLink.trim()) e.contentLink = t("errorLink");
    if (form.contentTypes.length === 0) e.contentTypes = t("errorContentType");
    if (form.monsterAppearances.length === 0) e.monsterAppearances = t("errorAppearance");
    if (!form.submittedReach.trim()) e.submittedReach = t("errorReach");
    if (!form.statsScreenshotUrl) e.statsScreenshotUrl = t("errorScreenshot");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const payload = {
      platform: form.platform,
      contentLink: form.contentLink,
      contentTypes: form.contentTypes,
      monsterAppearances: form.monsterAppearances,
      submittedReach: parseInt(form.submittedReach, 10) || 0,
      statsScreenshotUrl: form.statsScreenshotUrl || null,
    };
    try {
      const url = isEditMode ? `/api/submissions/${initialData.id}` : "/api/submissions";
      const method = isEditMode ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isEditMode ? t("editSuccessMsg") : t("successMsg"));
        // Edit mode: no success screen, just call onSuccess (goes back to list)
        if (isEditMode) {
          onSuccess();
        } else {
          setSubmitted(true);
        }
      } else {
        toast.error(data.error || "Error");
      }
    } catch {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  }

  // ── Success screen (new submissions only) ──────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-16 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[#6bd41a] flex items-center justify-center">
          <IoCheckmarkCircle className="size-10 text-black" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
            {t("successTitle")}
          </h2>
          <p className="text-sm text-[#b6b6b6] max-w-sm leading-relaxed">
            {t("successBody")}
          </p>
        </div>

        <OutlinedParaBtn
          onClick={() => router.push(`/${locale}/auth/profile`)}
          withBorder>
          {t("successCta")}
        </OutlinedParaBtn>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <form onSubmit={handleSubmit} className="space-y-5">
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
          <input
            type="url"
            value={form.contentLink}
            onChange={(e) => set("contentLink", e.target.value)}
            className={input(errors.contentLink)}
            placeholder="https://"
          />
        </Field>

        <Field label={t("contentType")} error={errors.contentTypes} required>
          <div className="flex flex-wrap gap-2">
            {CONTENT_TYPES.map((c) => (
              <ToggleBtn key={c.value} active={form.contentTypes.includes(c.value)} onClick={() => toggle("contentTypes", c.value)}>
                {c.label}
              </ToggleBtn>
            ))}
          </div>
        </Field>

        <Field label={t("monsterAppearance")} error={errors.monsterAppearances} required>
          <div className="flex flex-wrap gap-2">
            {APPEARANCES.map((a) => (
              <ToggleBtn key={a.value} active={form.monsterAppearances.includes(a.value)} onClick={() => toggle("monsterAppearances", a.value)}>
                {a.label}
              </ToggleBtn>
            ))}
          </div>
        </Field>

        <Field label={t("totalReach")} error={errors.submittedReach} required>
          <input
            type="number"
            min="0"
            value={form.submittedReach}
            onChange={(e) => set("submittedReach", e.target.value)}
            className={input(errors.submittedReach)}
            placeholder="0"
          />
          {isEditMode && initialData?.acceptedReach > 0 && (
            <p className="text-xs text-[#555] mt-1">
              {t("currentAccepted")}: {Number(initialData.acceptedReach).toLocaleString()}
            </p>
          )}
        </Field>

        <FileUpload
          label={t("screenshot")}
          value={form.statsScreenshotUrl}
          onChange={(url) => set("statsScreenshotUrl", url)}
          folder="monster-creators/stats"
          maxMB={5}
          error={errors.statsScreenshotUrl}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-lg bg-[#6bd41a] hover:bg-[#7ee520] text-white capitalize font-bold tracking-widest text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {loading ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              {isEditMode ? t("editSubmit") : t("submit")}
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}