"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import FileUpload from "@/components/ui/FileUpload";
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  Field,
  input,
  ToggleBtn,
  FormStepper,
  NavButtons,
} from "./Helpers";
import OutlinedParaBtn from "@/components/ui/OutlinedParaBtn";
import TermsCheckbox from "./TermsCheckbox";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Platform   = "FACEBOOK" | "INSTAGRAM" | "KICK" | "TIKTOK" | "TWITCH" | "YOUTUBE";
type Discovery  = "FRIEND_RECOMMENDATION" | "COMMUNITY_MESSAGES" | "SOCIAL_MEDIA_POSTS" | "MONSTER_EVENTS";
type Attendance = "YES" | "SOMETIMES" | "NO";
type Props      = { initialData?: any; onSuccess: () => void };

// ─────────────────────────────────────────────────────────────────────────────
// Slide variants (shared by all steps)
// ─────────────────────────────────────────────────────────────────────────────

const slide = {
  enterFromRight: { opacity: 0, x: 40 },
  enterFromLeft:  { opacity: 0, x: -40 },
  center:         { opacity: 1, x: 0 },
  exitToLeft:     { opacity: 0, x: -40 },
  exitToRight:    { opacity: 0, x: 40 },
};

const motionProps = (dir: "forward" | "back") => ({
  variants:   slide,
  initial:    dir === "forward" ? "enterFromRight" : "enterFromLeft",
  animate:    "center" as const,
  exit:       dir === "forward" ? "exitToLeft"     : "exitToRight",
  transition: { duration: 0.25, ease: "easeInOut" as Easing },
});

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function CreatorRegistrationForm({ initialData, onSuccess }: Props) {
  const t      = useTranslations("registration");
  const tc     = useTranslations("common");
  const toast  = useToast();
  const locale = useLocale();
  const router = useRouter();
  const { user } = useAuth();

  // ── Static option lists ────────────────────────────────────────────────
  const PLATFORMS: { value: Platform; label: string }[] = [
    { value: "FACEBOOK",  label: t("platformFacebook") },
    { value: "INSTAGRAM", label: t("platformInstagram") },
    { value: "KICK",      label: t("platformKick") },
    { value: "TIKTOK",    label: t("platformTiktok") },
    { value: "TWITCH",    label: t("platformTwitch") },
    { value: "YOUTUBE",   label: t("platformYoutube") },
  ];
  const ATTENDANCE: { value: Attendance; label: string }[] = [
    { value: "YES",       label: t("attendanceYes") },
    { value: "SOMETIMES", label: t("attendanceSometimes") },
    { value: "NO",        label: t("attendanceNo") },
  ];
  const DISCOVERY: { value: Discovery; label: string }[] = [
    { value: "FRIEND_RECOMMENDATION", label: t("discoveryFriend") },
    { value: "COMMUNITY_MESSAGES",    label: t("discoveryCommunity") },
    { value: "SOCIAL_MEDIA_POSTS",    label: t("discoverySocial") },
    { value: "MONSTER_EVENTS",        label: t("discoveryEvents") },
  ];

  // ── Stepper config ─────────────────────────────────────────────────────
  const STEPS = [
    { num: 1, label: t("stepYourInfo") },
    { num: 2, label: t("stepSocialMedia") },
    { num: 3, label: t("stepContent") },
  ] as const;

  // ── Init platform links ────────────────────────────────────────────────
  const initLinks: Record<Platform, string> = {
    FACEBOOK: "", INSTAGRAM: "", KICK: "", TIKTOK: "", TWITCH: "", YOUTUBE: "",
  };
  if (initialData?.platformLinks) {
    (initialData.platformLinks as { platform: Platform; url: string }[])
      .forEach((pl) => { initLinks[pl.platform] = pl.url; });
  }

  const userEmail =
    user?.email && !user.email.includes("@temp.monster") && !user.email.startsWith("+")
      ? user.email : "";
  const userPhone = user?.phone ?? "";

  // ── State ──────────────────────────────────────────────────────────────
  const [step,      setStep]      = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [agreed,    setAgreed]    = useState(false);

  const [form, setForm] = useState({
    realName:          initialData?.realName          ?? "",
    nickname:          initialData?.nickname          ?? "",
    contactEmail:      initialData?.contactEmail      ?? userEmail,
    contactPhone:      initialData?.contactPhone      ?? userPhone,
    birthDate:         initialData?.birthDate         ?? "",
    nationality:       initialData?.nationality       ?? "",
    residency:         initialData?.residency         ?? "",
    platforms:         (initialData?.platforms        ?? []) as Platform[],
    platformLinks:     initLinks,
    primarySocialLink: initialData?.primarySocialLink ?? "",
    channelLogo:       initialData?.channelLogo       ?? "",
    contentType:       initialData?.contentType       ?? "",
    followers:         String(initialData?.followers  ?? ""),
    eventAttendance:   (initialData?.eventAttendance  ?? "") as Attendance | "",
    discoverySources:  (initialData?.discoverySources ?? []) as Discovery[],
    whyJoin:           initialData?.whyJoin           ?? "",
  });

  // ── Field helpers ──────────────────────────────────────────────────────
  function set(key: keyof typeof form, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }
  function setPlatformLink(platform: Platform, url: string) {
    setForm((f) => ({ ...f, platformLinks: { ...f.platformLinks, [platform]: url } }));
    setErrors((e) => { const n = { ...e }; delete n[`link_${platform}`]; return n; });
  }
  function togglePlatform(v: Platform) {
    const next = form.platforms.includes(v)
      ? form.platforms.filter((p) => p !== v)
      : [...form.platforms, v];
    set("platforms", next);
    if (!next.includes(v) && form.primarySocialLink === form.platformLinks[v])
      set("primarySocialLink", "");
  }
  function toggleDiscovery(v: Discovery) {
    const arr = form.discoverySources;
    set("discoverySources", arr.includes(v) ? arr.filter((d) => d !== v) : [...arr, v]);
  }

  // ── Validation ─────────────────────────────────────────────────────────
  function validateStep1(): boolean {
    const e: Record<string, string> = {};
    const req = t("errorRequired");
    if (!form.realName.trim())               e.realName     = req;
    if (!form.nickname.trim())               e.nickname     = req;
    if (!form.contactEmail.includes("@"))    e.contactEmail = t("errorEmail");
    if (form.contactPhone.trim().length < 7) e.contactPhone = t("errorPhone");
    if (!form.birthDate)                     e.birthDate    = req;
    if (!form.nationality.trim())            e.nationality  = req;
    if (!form.residency.trim())              e.residency    = req;
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function validateStep2(): boolean {
    const e: Record<string, string> = {};
    if (form.platforms.length === 0) e.platforms = t("errorPlatforms");
    form.platforms.forEach((p) => {
      if (!(form.platformLinks[p] ?? "").trim()) e[`link_${p}`] = t("errorPlatformLink");
    });
    if (!form.primarySocialLink) e.primarySocialLink = t("errorRequired");
    if (!form.channelLogo) e.channelLogo = t("errorLogo");
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function validateStep3(): boolean {
    const e: Record<string, string> = {};
    const req = t("errorRequired");
    if (!form.contentType.trim())           e.contentType      = req;
    if (!form.followers.trim())             e.followers        = req;
    if (!form.eventAttendance)              e.eventAttendance  = t("errorAttendance");
    if (form.discoverySources.length === 0) e.discoverySources = t("errorDiscovery");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Navigation ─────────────────────────────────────────────────────────
  function goForward(to: 2 | 3, validate: () => boolean) {
    if (validate()) { setDirection("forward"); setStep(to); }
  }
  function goBack(to: 1 | 2) {
    setErrors({});
    setDirection("back");
    setStep(to);
  }

  // ── Submit ─────────────────────────────────────────────────────────────
  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validateStep3()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/profile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          realName:          form.realName,
          nickname:          form.nickname,
          contactEmail:      form.contactEmail,
          contactPhone:      form.contactPhone,
          birthDate:         form.birthDate,
          nationality:       form.nationality,
          residency:         form.residency,
          platforms:         form.platforms,
          platformLinks:     form.platforms.map((p) => ({ platform: p, url: form.platformLinks[p] })),
          primarySocialLink: form.primarySocialLink,
          channelLogo:       form.channelLogo || null,
          contentType:       form.contentType,
          followers:         parseInt(form.followers, 10) || 0,
          eventAttendance:   form.eventAttendance,
          discoverySources:  form.discoverySources,
          whyJoin:           form.whyJoin || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(t("successMsg"));
        setSubmitted(true);
        onSuccess()
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

  // ── Success screen ─────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-16 text-center gap-6"
      >
        <div className="size-20 rounded-full text-[#6bd41a] overflow-hidden flex items-center justify-center">
          <IoCheckmarkCircle className="size-full " />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
            {t("successTitle")}
          </h2>
          <p className="text-sm text-[#b6b6b6] max-w-sm leading-relaxed">
            {t("successBody")}
          </p>
        </div>
        <OutlinedParaBtn onClick={() => router.push(`/${locale}/auth/profile`)} withBorder>
          {t("successCta")}
        </OutlinedParaBtn>
      </motion.div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormStepper currentStep={step} steps={STEPS} />

      <AnimatePresence mode="wait">

        {/* ── STEP 1 — Personal Info ──────────────────────────────────── */}
        {step === 1 && (
          <motion.div key="step1" {...motionProps(direction)} className="space-y-5">

            <div className="grid grid-cols-2 gap-4">
              <Field label={t("realName")} error={errors.realName} required>
                <input type="text" value={form.realName}
                  onChange={(e) => set("realName", e.target.value)}
                  className={input(errors.realName)}
                  placeholder={t("realNamePlaceholder")} />
              </Field>
              <Field label={t("nickname")} error={errors.nickname} required>
                <input type="text" value={form.nickname}
                  onChange={(e) => set("nickname", e.target.value)}
                  className={input(errors.nickname)}
                  placeholder={t("nicknamePlaceholder")} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label={t("contactEmail")} error={errors.contactEmail} required>
                <input type="email" value={form.contactEmail}
                  onChange={(e) => set("contactEmail", e.target.value)}
                  className={input(errors.contactEmail)}
                  placeholder="name@example.com" />
              </Field>
              <Field label={t("contactPhone")} error={errors.contactPhone} required>
                <input type="tel" value={form.contactPhone}
                  onChange={(e) => set("contactPhone", e.target.value)}
                  className={input(errors.contactPhone)}
                  placeholder={t("phonePlaceholder") ?? "Phone Number"} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label={t("birthDate")} error={errors.birthDate} required>
                <input type="date" value={form.birthDate}
                  onChange={(e) => set("birthDate", e.target.value)}
                  className={input(errors.birthDate)}
                  max={new Date().toISOString().split("T")[0]} />
              </Field>
              <Field label={t("nationality")} error={errors.nationality} required>
                <input type="text" value={form.nationality}
                  onChange={(e) => set("nationality", e.target.value)}
                  className={input(errors.nationality)}
                  placeholder={t("nationalityPlaceholder")} />
              </Field>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Field label={t("residency")} error={errors.residency} required>
                <input type="text" value={form.residency}
                  onChange={(e) => set("residency", e.target.value)}
                  className={input(errors.residency)}
                  placeholder={t("residencyPlaceholder")} />
              </Field>
            </div>

            <div className="w-full flex justify-end items-center">
              <NavButtons
                nextLabel={t("next")}
                onNext={() => goForward(2, validateStep1)}
              />
            </div>

          </motion.div>
        )}

        {/* ── STEP 2 — Social Media ───────────────────────────────────── */}
        {step === 2 && (
          <motion.div key="step2" {...motionProps(direction)} className="space-y-5">

            <Field label={t("platforms")} error={errors.platforms} required>
              <div className="flex flex-wrap gap-2 mb-3">
                {PLATFORMS.map((p) => (
                  <ToggleBtn key={p.value}
                    active={form.platforms.includes(p.value)}
                    onClick={() => togglePlatform(p.value)}>
                    {p.label}
                  </ToggleBtn>
                ))}
              </div>

              <AnimatePresence>
                {form.platforms.map((p) => (
                  <motion.div key={p}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden w-full">
                    <Field
                      label={`${PLATFORMS.find((pl) => pl.value === p)?.label ?? p} ${t("platformLinkLabel")}`}
                      error={errors[`link_${p}`]} required>
                      <input type="url" value={form.platformLinks[p] ?? ""}
                        onChange={(e) => setPlatformLink(p, e.target.value)}
                        className={`${input(errors[`link_${p}`])}`}
                        placeholder="https://" />
                    </Field>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Field>

            {form.platforms.length > 0 && (
            <Field label={t("primarySocialLink")} error={errors.primarySocialLink} required>
              <select
                value={form.primarySocialLink}
                onChange={(e) => set("primarySocialLink", e.target.value)}
                className={input(errors.primarySocialLink)}
              >
                <option value="">{t("primarySocialLinkPlaceholder")}</option>
                {form.platforms
                  .filter((p) => form.platformLinks[p]?.trim())
                  .map((p) => (
                    <option key={p} value={form.platformLinks[p]}>
                      {PLATFORMS.find((pl) => pl.value === p)?.label} — {form.platformLinks[p]}
                    </option>
                  ))}
              </select>
            </Field>
          )}

            <FileUpload label={t("channelLogo")} value={form.channelLogo}
              onChange={(url) => set("channelLogo", url)}
              folder="monster-creators/logos" maxMB={10}
              error={errors.channelLogo} required />

            <NavButtons
              backLabel={t("back")}  onBack={() => goBack(1)}
              nextLabel={t("next")}  onNext={() => goForward(3, validateStep2)}
            />
          </motion.div>
        )}

        {/* ── STEP 3 — Content ────────────────────────────────────────── */}
        {step === 3 && (
          <motion.form key="step3" {...motionProps(direction)}
            onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-2 gap-4">
              <Field label={t("contentType")} error={errors.contentType} required>
                <input type="text" value={form.contentType}
                  onChange={(e) => set("contentType", e.target.value)}
                  className={input(errors.contentType)}
                  placeholder={t("contentTypePlaceholder")} />
              </Field>
              <Field label={t("followers")} error={errors.followers} required>
                <input type="number" min="0" value={form.followers}
                  onChange={(e) => set("followers", e.target.value)}
                  className={input(errors.followers)} placeholder="0" />
              </Field>
            </div>

            <Field label={t("eventAttendance")} error={errors.eventAttendance} required>
              <div className="flex flex-wrap gap-2">
                {ATTENDANCE.map((a) => (
                  <ToggleBtn key={a.value}
                    active={form.eventAttendance === a.value}
                    onClick={() => set("eventAttendance", a.value)}>
                    {a.label}
                  </ToggleBtn>
                ))}
              </div>
            </Field>

            <Field label={t("discoverySource")} error={errors.discoverySources} required>
              <div className="flex flex-wrap gap-2">
                {DISCOVERY.map((d) => (
                  <ToggleBtn key={d.value}
                    active={form.discoverySources.includes(d.value)}
                    onClick={() => toggleDiscovery(d.value)}>
                    {d.label}
                  </ToggleBtn>
                ))}
              </div>
            </Field>

            <Field label={t("whyJoin")}>
              <textarea value={form.whyJoin} maxLength={250}
                onChange={(e) => set("whyJoin", e.target.value)}
                rows={4} className={`${input()} h-16! resize-none`}
                placeholder={t("whyJoinPlaceholder")} />
            </Field>

            <TermsCheckbox
              checked={agreed}
              onChange={setAgreed}
              locale={locale}
              prefix={t("termsPrefix")}
              conditionsWord={t("termsConditionsWord")}
              andWord={t("termsAndWord")}
              termsWord={t("termsWord")}
              modalTitle={t("welcomeTitle")}
              modalBody={t("welcomeBody")}
              modalRulesTitle={t("rulesTitle")}
              modalRules={[t("rule1"), t("rule2"), t("rule3")]}
              modalFooter={t("rulesFooter")}
              modalClose={tc("close")}
            />

            <NavButtons
              backLabel={t("back")}   onBack={() => goBack(2)}
              nextLabel={t("submit")} isSubmit
              loading={loading}       disabled={!agreed}
            />
          </motion.form>
        )}

      </AnimatePresence>
    </motion.div>
  );
}