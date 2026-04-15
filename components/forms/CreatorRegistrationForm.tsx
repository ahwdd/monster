// src/components/forms/CreatorRegistrationForm.tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import FileUpload from "@/components/ui/FileUpload";
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/hooks/useAuth";

type Platform = | "FACEBOOK" | "INSTAGRAM" | "KICK" | "TIKTOK" | "TWITCH" | "YOUTUBE";
type Discovery = | "FRIEND_RECOMMENDATION" | "COMMUNITY_MESSAGES" | "SOCIAL_MEDIA_POSTS" | "MONSTER_EVENTS";
type Attendance = "YES" | "SOMETIMES" | "NO";

type Props = {
  initialData?: any;
  onSuccess: () => void;
};

export default function CreatorRegistrationForm({
  initialData,
  onSuccess,
}: Props) {
  const t = useTranslations("registration");
  const toast = useToast();
  const { user } = useAuth();

  const PLATFORMS: { value: Platform; label: string }[] = [
    { value: "FACEBOOK", label: t("platformFacebook") },
    { value: "INSTAGRAM", label: t("platformInstagram") },
    { value: "KICK", label: t("platformKick") },
    { value: "TIKTOK", label: t("platformTiktok") },
    { value: "TWITCH", label: t("platformTwitch") },
    { value: "YOUTUBE", label: t("platformYoutube") },
  ];

  const ATTENDANCE: { value: Attendance; label: string }[] = [
    { value: "YES", label: t("attendanceYes") },
    { value: "SOMETIMES", label: t("attendanceSometimes") },
    { value: "NO", label: t("attendanceNo") },
  ];

  const DISCOVERY: { value: Discovery; label: string }[] = [
    { value: "FRIEND_RECOMMENDATION", label: t("discoveryFriend") },
    { value: "COMMUNITY_MESSAGES", label: t("discoveryCommunity") },
    { value: "SOCIAL_MEDIA_POSTS", label: t("discoverySocial") },
    { value: "MONSTER_EVENTS", label: t("discoveryEvents") },
  ];

  // Build platform links map from existing data (edit mode)
  const initLinks: Record<Platform, string> = {
    FACEBOOK: "",
    INSTAGRAM: "",
    KICK: "",
    TIKTOK: "",
    TWITCH: "",
    YOUTUBE: "",
  };
  if (initialData?.platformLinks) {
    (
      initialData.platformLinks as { platform: Platform; url: string }[]
    ).forEach((pl) => {
      initLinks[pl.platform] = pl.url;
    });
  }

  // Auth user's email/phone as fallback — only if not a fake Hub-generated address
  const userEmail =
    user?.email &&
    !user.email.includes("@temp.monster") &&
    !user.email.startsWith("+")
      ? user.email
      : "";
  const userPhone = user?.phone ?? "";

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    realName: initialData?.realName ?? "",
    nickname: initialData?.nickname ?? "",
    // contactEmail/contactPhone live on the profile — pre-fill from profile data in edit mode,
    // then fall back to the authenticated user's credentials as a starting suggestion.
    contactEmail: initialData?.contactEmail ?? userEmail,
    contactPhone: initialData?.contactPhone ?? userPhone,
    birthDate: initialData?.birthDate ?? "",
    nationality: initialData?.nationality ?? "",
    residency: initialData?.residency ?? "",
    platforms: (initialData?.platforms ?? []) as Platform[],
    platformLinks: initLinks,
    primarySocialLink: initialData?.primarySocialLink ?? "",
    channelLogo: initialData?.channelLogo ?? "",
    contentType: initialData?.contentType ?? "",
    followers: String(initialData?.followers ?? ""),
    eventAttendance: (initialData?.eventAttendance ?? "") as Attendance | "",
    discoverySources: (initialData?.discoverySources ?? []) as Discovery[],
    whyJoin: initialData?.whyJoin ?? "",
  });

  function set(key: keyof typeof form, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      const n = { ...e };
      delete n[key];
      return n;
    });
  }

  function setPlatformLink(platform: Platform, url: string) {
    setForm((f) => ({
      ...f,
      platformLinks: { ...f.platformLinks, [platform]: url },
    }));
    setErrors((e) => {
      const n = { ...e };
      delete n[`link_${platform}`];
      return n;
    });
  }

  function togglePlatform(v: Platform) {
    const next = form.platforms.includes(v)
      ? form.platforms.filter((p) => p !== v)
      : [...form.platforms, v];
    set("platforms", next);
    if (!next.includes(v) && form.primarySocialLink === form.platformLinks[v]) {
      set("primarySocialLink", "");
    }
  }

  function toggleDiscovery(v: Discovery) {
    const arr = form.discoverySources;
    set(
      "discoverySources",
      arr.includes(v) ? arr.filter((d) => d !== v) : [...arr, v],
    );
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    const req = t("errorRequired");

    if (!form.realName.trim()) e.realName = req;
    if (!form.nickname.trim()) e.nickname = req;
    if (!form.contactEmail.includes("@")) e.contactEmail = t("errorEmail");
    if (form.contactPhone.trim().length < 7) e.contactPhone = t("errorPhone");
    if (!form.birthDate) e.birthDate = req;
    if (!form.nationality.trim()) e.nationality = req;
    if (!form.residency.trim()) e.residency = req;
    if (form.platforms.length === 0) e.platforms = t("errorPlatforms");
    form.platforms.forEach((p) => {
      if (!(form.platformLinks[p] ?? "").trim())
        e[`link_${p}`] = t("errorPlatformLink");
    });
    if (!form.primarySocialLink.trim()) e.primarySocialLink = req;
    if (!form.channelLogo) e.channelLogo = t("errorLogo");
    if (!form.contentType.trim()) e.contentType = req;
    if (!form.followers.trim()) e.followers = req;
    if (!form.eventAttendance) e.eventAttendance = t("errorAttendance");
    if (form.discoverySources.length === 0)
      e.discoverySources = t("errorDiscovery");

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const platformLinks = form.platforms.map((p) => ({
      platform: p,
      url: form.platformLinks[p],
    }));

    try {
      const res = await fetch("/api/profile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          realName: form.realName,
          nickname: form.nickname,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone,
          birthDate: form.birthDate,
          nationality: form.nationality,
          residency: form.residency,
          platforms: form.platforms,
          platformLinks,
          primarySocialLink: form.primarySocialLink,
          channelLogo: form.channelLogo || null,
          contentType: form.contentType,
          followers: parseInt(form.followers, 10) || 0,
          eventAttendance: form.eventAttendance,
          discoverySources: form.discoverySources,
          whyJoin: form.whyJoin || null,
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(t("successMsg"));
        onSuccess();
      } else if (data.error === "ALREADY_APPROVED") {
        toast.info(t("alreadyApproved"));
      } else {
        toast.error(data.error || "Error");
      }
    } catch {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  }

  const availableLinks = form.platforms
    .filter((p) => form.platformLinks[p]?.trim())
    .map((p) => ({ platform: p, url: form.platformLinks[p] }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      {/* Intro block */}
      <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 mb-6 space-y-3">
        <p className="header-smaller font-semibold text-white">
          {t("welcomeTitle")}
        </p>
        <p className="txt-small text-zinc-300 leading-relaxed">
          {t("welcomeBody")}
        </p>
        <div className="pt-2 border-t border-zinc-800">
          <p className="txt-small font-semibold text-white mb-2">
            {t("rulesTitle")}
          </p>
          <ol className="list-decimal list-inside space-y-1 txt-smaller text-zinc-400">
            <li>{t("rule1")}</li>
            <li>{t("rule2")}</li>
            <li>{t("rule3")}</li>
          </ol>
        </div>
        <p className="txt-smaller text-zinc-600">{t("rulesFooter")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label={t("realName")} error={errors.realName} required>
          <input
            type="text"
            value={form.realName}
            onChange={(e) => set("realName", e.target.value)}
            className={input(errors.realName)}
            placeholder={t("realNamePlaceholder")}
          />
        </Field>

        <Field label={t("nickname")} error={errors.nickname} required>
          <input
            type="text"
            value={form.nickname}
            onChange={(e) => set("nickname", e.target.value)}
            className={input(errors.nickname)}
            placeholder={t("nicknamePlaceholder")}
          />
        </Field>

        {/* Contact info — separate from login credentials */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 space-y-4">

          <Field label={t("contactEmail")} error={errors.contactEmail} required>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => set("contactEmail", e.target.value)}
              className={input(errors.contactEmail)}
              placeholder="you@example.com"
            />
          </Field>

          <Field label={t("contactPhone")} error={errors.contactPhone} required>
            <input
              type="tel"
              value={form.contactPhone}
              onChange={(e) => set("contactPhone", e.target.value)}
              className={input(errors.contactPhone)}
              placeholder="+966 5x xxx xxxx"
            />
          </Field>
        </div>

        <Field label={t("birthDate")} error={errors.birthDate} required>
          <input
            type="date"
            value={form.birthDate}
            onChange={(e) => set("birthDate", e.target.value)}
            className={input(errors.birthDate)}
            max={new Date().toISOString().split("T")[0]}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label={t("nationality")} error={errors.nationality} required>
            <input
              type="text"
              value={form.nationality}
              onChange={(e) => set("nationality", e.target.value)}
              className={input(errors.nationality)}
              placeholder={t("nationalityPlaceholder")}
            />
          </Field>
          <Field label={t("residency")} error={errors.residency} required>
            <input
              type="text"
              value={form.residency}
              onChange={(e) => set("residency", e.target.value)}
              className={input(errors.residency)}
              placeholder={t("residencyPlaceholder")}
            />
          </Field>
        </div>

        {/* Platforms + per-platform links */}
        <Field label={t("platforms")} error={errors.platforms} required>
          <div className="flex flex-wrap gap-2 mb-3">
            {PLATFORMS.map((p) => (
              <ToggleBtn
                key={p.value}
                active={form.platforms.includes(p.value)}
                onClick={() => togglePlatform(p.value)}>
                {p.label}
              </ToggleBtn>
            ))}
          </div>
          <AnimatePresence>
            {form.platforms.map((p) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden">
                <Field
                  label={`${PLATFORMS.find((pl) => pl.value === p)?.label ?? p} ${t("platformLinkLabel")}`}
                  error={errors[`link_${p}`]}
                  required>
                  <input
                    type="url"
                    value={form.platformLinks[p] ?? ""}
                    onChange={(e) => setPlatformLink(p, e.target.value)}
                    className={input(errors[`link_${p}`])}
                    placeholder="https://"
                  />
                </Field>
              </motion.div>
            ))}
          </AnimatePresence>
        </Field>

        {/* Primary social link picker */}
        {availableLinks.length > 0 && (
          <Field
            label={t("primarySocialLink")}
            error={errors.primarySocialLink}
            required>
            <div className="flex flex-wrap gap-2">
              {availableLinks.map(({ platform, url }) => (
                <ToggleBtn
                  key={platform}
                  active={form.primarySocialLink === url}
                  onClick={() => set("primarySocialLink", url)}>
                  {PLATFORMS.find((p) => p.value === platform)?.label ??
                    platform}
                </ToggleBtn>
              ))}
            </div>
            {form.primarySocialLink && (
              <p className="txt-smaller text-zinc-500 mt-1 truncate">
                {form.primarySocialLink}
              </p>
            )}
          </Field>
        )}

        <FileUpload
          label={t("channelLogo")}
          value={form.channelLogo}
          onChange={(url) => set("channelLogo", url)}
          folder="monster-creators/logos"
          maxMB={10}
          error={errors.channelLogo}
          required
        />

        <Field label={t("contentType")} error={errors.contentType} required>
          <input
            type="text"
            value={form.contentType}
            onChange={(e) => set("contentType", e.target.value)}
            className={input(errors.contentType)}
            placeholder={t("contentTypePlaceholder")}
          />
        </Field>

        <Field label={t("followers")} error={errors.followers} required>
          <input
            type="number"
            min="0"
            value={form.followers}
            onChange={(e) => set("followers", e.target.value)}
            className={input(errors.followers)}
            placeholder="0"
          />
        </Field>

        <Field
          label={t("eventAttendance")}
          error={errors.eventAttendance}
          required>
          <div className="flex flex-wrap gap-2">
            {ATTENDANCE.map((a) => (
              <ToggleBtn
                key={a.value}
                active={form.eventAttendance === a.value}
                onClick={() => set("eventAttendance", a.value)}>
                {a.label}
              </ToggleBtn>
            ))}
          </div>
        </Field>

        <Field
          label={t("discoverySource")}
          error={errors.discoverySources}
          required>
          <div className="flex flex-wrap gap-2">
            {DISCOVERY.map((d) => (
              <ToggleBtn
                key={d.value}
                active={form.discoverySources.includes(d.value)}
                onClick={() => toggleDiscovery(d.value)}>
                {d.label}
              </ToggleBtn>
            ))}
          </div>
        </Field>

        {/* Why join — optional */}
        <Field label={t("whyJoin")}>
          <textarea
            value={form.whyJoin}
            onChange={(e) => set("whyJoin", e.target.value)}
            rows={4}
            className={`${input()} resize-none`}
            placeholder={t("whyJoinPlaceholder")}
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#78be20] hover:bg-[#8fd428] text-black font-display font-bold uppercase tracking-wider header-smaller rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {loading ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <IoCheckmarkCircle className="size-5" />
              {t("submit")}
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

// ── Helpers ───────────────────────────────────────────────────

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
      <label className="txt-small font-medium text-white">
        {label}
        {required && <span className="text-red-400 ms-1">*</span>}
      </label>
      {children}
      {error && <p className="txt-smaller text-red-400">{error}</p>}
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
      className={`px-4 py-2 rounded-lg txt-small font-medium border transition-colors duration-200 ${
        active
          ? "border-[#78be20] bg-[#78be20]/10 text-[#78be20]"
          : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
      }`}>
      {children}
    </button>
  );
}

function input(error?: string) {
  return `w-full px-4 py-3 bg-black border rounded-lg text-white txt-regular placeholder:text-zinc-600 outline-none transition-colors duration-200 ${
    error
      ? "border-red-500 focus:border-red-400"
      : "border-zinc-700 focus:border-[#78be20]"
  }`;
}
