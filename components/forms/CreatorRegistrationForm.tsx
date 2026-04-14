// src/components/forms/CreatorRegistrationForm.tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import FileUpload from "@/components/ui/FileUpload";
import { useToast } from "@/contexts/ToastContext";

type Platform  = "FACEBOOK"|"INSTAGRAM"|"KICK"|"TIKTOK"|"TWITCH"|"YOUTUBE";
type Discovery = "FRIEND_RECOMMENDATION"|"COMMUNITY_MESSAGES"|"SOCIAL_MEDIA_POSTS"|"MONSTER_EVENTS";
type Attendance= "YES"|"SOMETIMES"|"NO";

type Props = { onSuccess: () => void };

export default function CreatorRegistrationForm({ onSuccess }: Props) {
  const t     = useTranslations("registration");
  const toast = useToast();

  const PLATFORMS: { value: Platform; label: string }[] = [
    { value: "FACEBOOK",  label: t("platformFacebook")  },
    { value: "INSTAGRAM", label: t("platformInstagram") },
    { value: "KICK",      label: t("platformKick")      },
    { value: "TIKTOK",    label: t("platformTiktok")    },
    { value: "TWITCH",    label: t("platformTwitch")    },
    { value: "YOUTUBE",   label: t("platformYoutube")   },
  ];

  const ATTENDANCE: { value: Attendance; label: string }[] = [
    { value: "YES",       label: t("attendanceYes")       },
    { value: "SOMETIMES", label: t("attendanceSometimes") },
    { value: "NO",        label: t("attendanceNo")        },
  ];

  const DISCOVERY: { value: Discovery; label: string }[] = [
    { value: "FRIEND_RECOMMENDATION", label: t("discoveryFriend")    },
    { value: "COMMUNITY_MESSAGES",    label: t("discoveryCommunity") },
    { value: "SOCIAL_MEDIA_POSTS",    label: t("discoverySocial")    },
    { value: "MONSTER_EVENTS",        label: t("discoveryEvents")    },
  ];

  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    realName:        "",
    nickname:        "",
    email:           "",
    birthDate:       "",
    phone:           "",
    nationality:     "",
    platforms:       [] as Platform[],
    channelLogo:     "",
    contentType:     "",
    socialMediaLink: "",
    followers:       "",
    eventAttendance: "" as Attendance | "",
    discoverySources:[] as Discovery[],
    whyJoin:         "",
  });

  function set(key: keyof typeof form, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }

  function toggleMulti<T extends string>(key: "platforms" | "discoverySources", v: T) {
    const arr = form[key] as T[];
    set(key, arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    const req = t("errorRequired");
    if (!form.realName.trim())        e.realName        = req;
    if (!form.nickname.trim())        e.nickname        = req;
    if (!form.email.includes("@"))    e.email           = t("errorEmail");
    if (!form.birthDate)              e.birthDate       = req;
    if (!form.phone.trim())           e.phone           = t("errorPhone");
    if (!form.nationality.trim())     e.nationality     = req;
    if (form.platforms.length === 0)  e.platforms       = t("errorPlatforms");
    if (!form.channelLogo)            e.channelLogo     = t("errorLogo");
    if (!form.contentType.trim())     e.contentType     = t("errorContentType");
    if (!form.socialMediaLink.trim()) e.socialMediaLink = t("errorLink");
    if (!form.followers.trim())       e.followers       = t("errorFollowers");
    if (!form.eventAttendance)        e.eventAttendance = t("errorAttendance");
    if (!form.whyJoin.trim())         e.whyJoin         = t("errorWhyJoin");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res  = await fetch("/api/profile/register", {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, followers: parseInt(form.followers, 10) || 0 }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(t("successMsg"));
        onSuccess();
      } else if (res.status === 409) {
        toast.info(t("alreadySubmitted"));
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>
      {/* Intro */}
      <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 mb-6 space-y-3">
        <p className="header-smaller font-semibold text-white">{t("welcomeTitle")}</p>
        <p className="txt-small text-zinc-300 leading-relaxed">{t("welcomeBody")}</p>
        <div className="pt-2 border-t border-zinc-800">
          <p className="txt-small font-semibold text-white mb-2">{t("rulesTitle")}</p>
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
          <input type="text" value={form.realName} onChange={(e) => set("realName", e.target.value)}
            className={input(errors.realName)} placeholder={t("realNamePlaceholder")} />
        </Field>

        <Field label={t("nickname")} error={errors.nickname} required>
          <input type="text" value={form.nickname} onChange={(e) => set("nickname", e.target.value)}
            className={input(errors.nickname)} placeholder={t("nicknamePlaceholder")} />
        </Field>

        <Field label={t("email")} error={errors.email} required>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
            className={input(errors.email)} placeholder="you@example.com" />
        </Field>

        <Field label={t("birthDate")} error={errors.birthDate} required>
          <input type="date" value={form.birthDate} onChange={(e) => set("birthDate", e.target.value)}
            className={input(errors.birthDate)} max={new Date().toISOString().split("T")[0]} />
        </Field>

        <Field label={t("phone")} error={errors.phone} required>
          <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
            className={input(errors.phone)} placeholder="+20 5x xxx xxxx" />
        </Field>

        <Field label={t("nationality")} error={errors.nationality} required>
          <input type="text" value={form.nationality} onChange={(e) => set("nationality", e.target.value)}
            className={input(errors.nationality)} placeholder={t("nationalityPlaceholder")} />
        </Field>

        <Field label={t("platforms")} error={errors.platforms} required>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <ToggleBtn key={p.value} active={form.platforms.includes(p.value)}
                onClick={() => toggleMulti("platforms", p.value)}>{p.label}</ToggleBtn>
            ))}
          </div>
        </Field>

        <FileUpload label={t("channelLogo")} value={form.channelLogo}
          onChange={(url) => set("channelLogo", url)} folder="monster-creators/logos"
          maxMB={10} error={errors.channelLogo} required />

        <Field label={t("contentType")} error={errors.contentType} required>
          <input type="text" value={form.contentType} onChange={(e) => set("contentType", e.target.value)}
            className={input(errors.contentType)} placeholder={t("contentTypePlaceholder")} />
        </Field>

        <Field label={t("socialMediaLink")} error={errors.socialMediaLink} required>
          <input type="url" value={form.socialMediaLink} onChange={(e) => set("socialMediaLink", e.target.value)}
            className={input(errors.socialMediaLink)} placeholder="https://" />
        </Field>

        <Field label={t("followers")} error={errors.followers} required>
          <input type="number" min="0" value={form.followers} onChange={(e) => set("followers", e.target.value)}
            className={input(errors.followers)} placeholder="0" />
        </Field>

        <Field label={t("eventAttendance")} error={errors.eventAttendance} required>
          <div className="flex flex-wrap gap-2">
            {ATTENDANCE.map((a) => (
              <ToggleBtn key={a.value} active={form.eventAttendance === a.value}
                onClick={() => set("eventAttendance", a.value)}>{a.label}</ToggleBtn>
            ))}
          </div>
        </Field>

        <Field label={t("discoverySource")} error={errors.discoverySources}>
          <div className="flex flex-wrap gap-2">
            {DISCOVERY.map((d) => (
              <ToggleBtn key={d.value} active={form.discoverySources.includes(d.value)}
                onClick={() => toggleMulti("discoverySources", d.value)}>{d.label}</ToggleBtn>
            ))}
          </div>
        </Field>

        <Field label={t("whyJoin")} error={errors.whyJoin} required>
          <textarea value={form.whyJoin} onChange={(e) => set("whyJoin", e.target.value)}
            rows={4} className={`${input(errors.whyJoin)} resize-none`}
            placeholder={t("whyJoinPlaceholder")} />
        </Field>

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