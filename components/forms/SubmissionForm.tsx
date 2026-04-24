"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import FileUpload from "@/components/ui/FileUpload";
import { useToast } from "@/contexts/ToastContext";

type Platform = "FACEBOOK" | "INSTAGRAM" | "KICK" | "TIKTOK" | "TWITCH" | "YOUTUBE";
type ContentType = "PICTURE" | "STORY" | "REEL" | "LONG_VIDEO" | "POST";
type Appearance = "MONSTER_THEME" | "LAYOUT" | "LOGO" | "MONSTER_PRODUCTS";

type Props = {
  nickname: string;
  rank: string;
  initialData?: any;
  onSuccess: () => void;
};

export default function SubmissionForm({
  nickname,
  rank,
  initialData,
  onSuccess,
}: Props) {
  const t = useTranslations("submitForm");
  const toast = useToast();

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
    setErrors((e) => {
      const n = { ...e };
      delete n[key];
      return n;
    });
  }

  function toggle<T extends string>(
    key: "contentTypes" | "monsterAppearances",
    v: T,
  ) {
    const arr = form[key] as T[];
    set(key, arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.platform) e.platform = t("errorPlatform");
    if (!form.contentLink.trim()) e.contentLink = t("errorLink");
    if (form.contentTypes.length === 0) e.contentTypes = t("errorContentType");
    if (form.monsterAppearances.length === 0)
      e.monsterAppearances = t("errorAppearance");
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
      const url = isEditMode
        ? `/api/submissions/${initialData.id}`
        : "/api/submissions";
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Read-only identity row */}
        <div className="grid grid-cols-2 gap-4">
          <Field label={t("nickname")}>
            <div className={`${readonlyInput}`}>{nickname}</div>
          </Field>
          <Field label={t("rank")}>
            <div className={`${readonlyInput}`}>{rank.replace(/_/g, " ")}</div>
          </Field>
        </div>

        <Field label={t("platform")} error={errors.platform} required>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <ToggleBtn
                key={p.value}
                active={form.platform === p.value}
                onClick={() => set("platform", p.value)}>
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
              <ToggleBtn
                key={c.value}
                active={form.contentTypes.includes(c.value)}
                onClick={() => toggle("contentTypes", c.value)}>
                {c.label}
              </ToggleBtn>
            ))}
          </div>
        </Field>

        <Field
          label={t("monsterAppearance")}
          error={errors.monsterAppearances}
          required>
          <div className="flex flex-wrap gap-2">
            {APPEARANCES.map((a) => (
              <ToggleBtn
                key={a.value}
                active={form.monsterAppearances.includes(a.value)}
                onClick={() => toggle("monsterAppearances", a.value)}>
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
              {t("currentAccepted")}:{" "}
              {Number(initialData.acceptedReach).toLocaleString()}
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
          className="w-full h-12 bg-[#6bd41a] hover:bg-[#7ee520] text-black font-display font-bold uppercase tracking-widest text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            clipPath:
              "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
          }}>
          {loading ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <IoCheckmarkCircle className="size-5" />
              {isEditMode ? t("editSubmit") : t("submit")}
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const readonlyInput =
  "w-full px-4 h-12 bg-[#0d0d0d] border border-[#272727] text-[#555] text-sm flex items-center opacity-70 cursor-not-allowed";

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-400 ms-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium border transition-colors duration-200 ${
        active
          ? "border-[#6bd41a] bg-[#6bd41a]/10 text-[#6bd41a]"
          : "border-[#272727] text-[#b6b6b6] hover:border-[#444] bg-[#171717]"
      }`}>
      {children}
    </button>
  );
}

function input(error?: string) {
  return `w-full px-4 h-12 bg-[#171717] border text-white text-sm placeholder:text-[#ccccd0]/40 outline-none transition-colors duration-200 ${
    error
      ? "border-red-500 focus:border-red-400"
      : "border-[#272727] focus:border-[#6bd41a]"
  }`;
}
