// src/components/forms/CreatorRegistrationForm.tsx
"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { IoCheckmarkCircle } from "react-icons/io5";
import FileUpload from "@/components/ui/FileUpload";
import { useToast } from "@/contexts/ToastContext";

type Platform = "FACEBOOK" | "INSTAGRAM" | "KICK" | "TIKTOK" | "TWITCH" | "YOUTUBE";
type Discovery = "FRIEND_RECOMMENDATION" | "COMMUNITY_MESSAGES" | "SOCIAL_MEDIA_POSTS" | "MONSTER_EVENTS";
type Attendance = "YES" | "SOMETIMES" | "NO";

const PLATFORMS: { value: Platform; labelEn: string; labelAr: string }[] = [
  { value: "FACEBOOK",  labelEn: "Facebook",  labelAr: "فيسبوك"  },
  { value: "INSTAGRAM", labelEn: "Instagram", labelAr: "انستجرام"},
  { value: "KICK",      labelEn: "Kick",      labelAr: "كيك"     },
  { value: "TIKTOK",    labelEn: "TikTok",    labelAr: "تيك توك" },
  { value: "TWITCH",    labelEn: "Twitch",    labelAr: "تويتش"   },
  { value: "YOUTUBE",   labelEn: "YouTube",   labelAr: "يوتيوب"  },
];

const DISCOVERY: { value: Discovery; labelEn: string; labelAr: string }[] = [
  { value: "FRIEND_RECOMMENDATION", labelEn: "Friend Recommendation", labelAr: "ترشيح صديق"          },
  { value: "COMMUNITY_MESSAGES",    labelEn: "Community Messages",    labelAr: "رسائل الكوميونتي"    },
  { value: "SOCIAL_MEDIA_POSTS",    labelEn: "Social Media Posts",    labelAr: "منشورات سوشيال ميديا" },
  { value: "MONSTER_EVENTS",        labelEn: "Attending Monster Events", labelAr: "حضور ايفنتات مونستر"},
];

const ATTENDANCE: { value: Attendance; labelEn: string; labelAr: string }[] = [
  { value: "YES",       labelEn: "Yes",       labelAr: "أستطيع"   },
  { value: "SOMETIMES", labelEn: "Sometimes", labelAr: "احيانا"   },
  { value: "NO",        labelEn: "No",        labelAr: "لا أستطيع"},
];

type Props = { onSuccess: () => void };

export default function CreatorRegistrationForm({ onSuccess }: Props) {
  const locale = useLocale();
  const isAr   = locale === "ar";
  const toast  = useToast();

  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState<Record<string, string>>({});

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

  function togglePlatform(v: Platform) {
    set("platforms", form.platforms.includes(v)
      ? form.platforms.filter((p) => p !== v)
      : [...form.platforms, v]
    );
  }

  function toggleDiscovery(v: Discovery) {
    set("discoverySources", form.discoverySources.includes(v)
      ? form.discoverySources.filter((d) => d !== v)
      : [...form.discoverySources, v]
    );
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.realName.trim())        e.realName        = isAr ? "مطلوب" : "Required";
    if (!form.nickname.trim())        e.nickname        = isAr ? "مطلوب" : "Required";
    if (!form.email.includes("@"))    e.email           = isAr ? "بريد غير صحيح" : "Invalid email";
    if (!form.birthDate)              e.birthDate       = isAr ? "مطلوب" : "Required";
    if (!form.phone.trim())           e.phone           = isAr ? "مطلوب" : "Required";
    if (!form.nationality.trim())     e.nationality     = isAr ? "مطلوب" : "Required";
    if (form.platforms.length === 0)  e.platforms       = isAr ? "اختر منصة واحدة على الأقل" : "Select at least one";
    if (!form.channelLogo)            e.channelLogo     = isAr ? "الرجاء رفع اللوجو" : "Logo required";
    if (!form.contentType.trim())     e.contentType     = isAr ? "مطلوب" : "Required";
    if (!form.socialMediaLink.trim()) e.socialMediaLink = isAr ? "مطلوب" : "Required";
    if (!form.followers.trim())       e.followers       = isAr ? "مطلوب" : "Required";
    if (!form.eventAttendance)        e.eventAttendance = isAr ? "اختر خيارًا" : "Select one";
    if (!form.whyJoin.trim())         e.whyJoin         = isAr ? "مطلوب" : "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/profile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          followers: parseInt(form.followers, 10) || 0,
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(isAr ? "تم تقديم الطلب بنجاح!" : "Registration submitted successfully!");
        onSuccess();
      } else if (res.status === 409) {
        toast.info(isAr ? "لقد قدّمت الطلب من قبل." : "You've already submitted.");
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="font-proxima"
    >
      {/* Intro text */}
      <div className="bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 mb-6">
        {isAr ? (
          <div className="space-y-3 txt-small text-zinc-300 leading-relaxed" dir="rtl">
            <p className="header-smaller font-semibold text-white">أهلا بيك في المرحلة الأولى من برنامج مونستر!</p>
            <p>شكرًا على رغبتك في الانضمام إلى برنامجنا لدعم صناع المحتوى! نحن متحمسون للعمل معك.</p>
            <p>يرجى ملء الاستمارة أدناه وإرفاق روابط جميع منصات التواصل الاجتماعي الفعالة لديك.</p>
            <div className="mt-3 pt-3 border-t border-zinc-700">
              <p className="font-semibold text-white mb-2">قواعد المشاركة:</p>
              <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                <li>أن تكون من المملكة العربية السعودية أو جمهورية مصر العربية</li>
                <li>يجب ألا تكون متعاقدًا مع شركة منافسة</li>
                <li>اللغة الأساسية يجب أن تكون العربية</li>
              </ol>
            </div>
            <p className="text-zinc-500 txt-smaller">سينتهي التسجيل بمجرد اختيار 5 صناع محتوى من المتقدمين.</p>
          </div>
        ) : (
          <div className="space-y-3 txt-small text-zinc-300 leading-relaxed">
            <p className="header-smaller font-semibold text-white">Welcome to Monster Creators Program — Phase 1!</p>
            <p>Thank you for your interest in joining our content creator support program. We're excited to work with you.</p>
            <p>Please fill out the form below and include links to all your active social media platforms.</p>
            <div className="mt-3 pt-3 border-t border-zinc-700">
              <p className="font-semibold text-white mb-2">Participation Rules:</p>
              <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                <li>You must be from Saudi Arabia or Egypt</li>
                <li>You must not be contracted with a competing brand</li>
                <li>Your primary content language must be Arabic</li>
              </ol>
            </div>
            <p className="text-zinc-500 txt-smaller">Registration closes once 5 content creators have been selected.</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Real name */}
        <Field label={isAr ? "الاسم الحقيقي" : "Real Name"} error={errors.realName} required>
          <input type="text" value={form.realName}
            onChange={(e) => set("realName", e.target.value)}
            className={inputCls(errors.realName)} placeholder={isAr ? "اسمك الكامل" : "Full name"} />
        </Field>

        {/* Nickname */}
        <Field label={isAr ? "الاسم الحركي" : "Nickname"} error={errors.nickname} required>
          <input type="text" value={form.nickname}
            onChange={(e) => set("nickname", e.target.value)}
            className={inputCls(errors.nickname)} placeholder={isAr ? "الاسم الحركي" : "Your channel/nick name"} />
        </Field>

        {/* Email */}
        <Field label={isAr ? "البريد الإلكتروني" : "Email"} error={errors.email} required>
          <input type="email" value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls(errors.email)} placeholder="you@example.com" />
        </Field>

        {/* Birth date */}
        <Field label={isAr ? "تاريخ الميلاد" : "Birth Date"} error={errors.birthDate} required>
          <input type="date" value={form.birthDate}
            onChange={(e) => set("birthDate", e.target.value)}
            className={inputCls(errors.birthDate)}
            max={new Date().toISOString().split("T")[0]} />
        </Field>

        {/* Phone */}
        <Field label={isAr ? "رقم الهاتف" : "Phone Number"} error={errors.phone} required>
          <input type="tel" value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls(errors.phone)} placeholder="+966 5x xxx xxxx" />
        </Field>

        {/* Nationality */}
        <Field label={isAr ? "الجنسية ودولة الإقامة" : "Nationality & Residency"} error={errors.nationality} required>
          <input type="text" value={form.nationality}
            onChange={(e) => set("nationality", e.target.value)}
            className={inputCls(errors.nationality)} placeholder={isAr ? "مثال: سعودي - المملكة العربية السعودية" : "e.g. Saudi - Saudi Arabia"} />
        </Field>

        {/* Platforms — multiple */}
        <Field label={isAr ? "المنصات الخاصة بك" : "Your Platforms"} error={errors.platforms} required>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button key={p.value} type="button"
                onClick={() => togglePlatform(p.value)}
                className={`px-4 py-2 rounded-lg txt-small font-medium border transition-colors duration-200 ${
                  form.platforms.includes(p.value)
                    ? "border-[#78be20] bg-[#78be20]/10 text-[#78be20]"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                {isAr ? p.labelAr : p.labelEn}
              </button>
            ))}
          </div>
        </Field>

        {/* Channel logo */}
        <FileUpload
          label={isAr ? "لوجو قناتك" : "Channel Logo"}
          value={form.channelLogo}
          onChange={(url) => set("channelLogo", url)}
          folder="monster-creators/logos"
          maxMB={10}
          error={errors.channelLogo}
          required
        />

        {/* Content type */}
        <Field label={isAr ? "نوع المحتوى" : "Content Type"} error={errors.contentType} required>
          <input type="text" value={form.contentType}
            onChange={(e) => set("contentType", e.target.value)}
            className={inputCls(errors.contentType)}
            placeholder={isAr ? "مثال: ألعاب، كوميدي، تقنية..." : "e.g. Gaming, Comedy, Tech..."} />
        </Field>

        {/* Social media link */}
        <Field label={isAr ? "رابط قنواتك" : "Social Media Link"} error={errors.socialMediaLink} required>
          <input type="url" value={form.socialMediaLink}
            onChange={(e) => set("socialMediaLink", e.target.value)}
            className={inputCls(errors.socialMediaLink)} placeholder="https://" />
        </Field>

        {/* Followers */}
        <Field label={isAr ? "عدد المتابعين" : "Followers"} error={errors.followers} required>
          <input type="number" min="0" value={form.followers}
            onChange={(e) => set("followers", e.target.value)}
            className={inputCls(errors.followers)} placeholder="0" />
        </Field>

        {/* Event attendance — single */}
        <Field label={isAr ? "حضور الايفنتات" : "Events Attending"} error={errors.eventAttendance} required>
          <div className="flex flex-wrap gap-2">
            {ATTENDANCE.map((a) => (
              <button key={a.value} type="button"
                onClick={() => set("eventAttendance", a.value)}
                className={`px-4 py-2 rounded-lg txt-small font-medium border transition-colors duration-200 ${
                  form.eventAttendance === a.value
                    ? "border-[#78be20] bg-[#78be20]/10 text-[#78be20]"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                {isAr ? a.labelAr : a.labelEn}
              </button>
            ))}
          </div>
        </Field>

        {/* Discovery — multiple */}
        <Field label={isAr ? "كيف عرفت عن البرنامج؟" : "How did you hear about us?"} error={errors.discoverySources}>
          <div className="flex flex-wrap gap-2">
            {DISCOVERY.map((d) => (
              <button key={d.value} type="button"
                onClick={() => toggleDiscovery(d.value)}
                className={`px-4 py-2 rounded-lg txt-small font-medium border transition-colors duration-200 ${
                  form.discoverySources.includes(d.value)
                    ? "border-[#78be20] bg-[#78be20]/10 text-[#78be20]"
                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
                }`}
              >
                {isAr ? d.labelAr : d.labelEn}
              </button>
            ))}
          </div>
        </Field>

        {/* Why join */}
        <Field label={isAr ? "لماذا تريد الانضمام للبرنامج؟" : "Why do you want to join the program?"} error={errors.whyJoin} required>
          <textarea value={form.whyJoin}
            onChange={(e) => set("whyJoin", e.target.value)}
            rows={4}
            className={`${inputCls(errors.whyJoin)} resize-none`}
            placeholder={isAr ? "أخبرنا عن نفسك وسبب رغبتك في الانضمام..." : "Tell us about yourself and why you want to join..."} />
        </Field>

        {/* Submit */}
        <button type="submit" disabled={loading}
          className="w-full py-4 bg-[#78be20] hover:bg-[#8fd428] text-black font-display font-bold uppercase tracking-wider header-smaller rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading
            ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            : <><IoCheckmarkCircle className="size-5" />{isAr ? "إرسال الطلب" : "Submit Application"}</>
          }
        </button>

      </form>
    </motion.div>
  );
}

// ── Helpers ──────────────────────────────────────────────────
function Field({ label, error, required, children }: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
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

function inputCls(error?: string) {
  return `w-full px-4 py-3 bg-black border rounded-lg text-white txt-regular placeholder:text-zinc-600 outline-none transition-colors duration-200 ${
    error ? "border-red-500 focus:border-red-400" : "border-zinc-700 focus:border-[#78be20]"
  }`;
}