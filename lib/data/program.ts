// src/lib/data/program.ts
export type RankKey = "UNRANKED" | "ROOKIE" | "MEGA" | "RISING" | "ELITE" | "COLD";

export type RankConfig = {
  color:   string;
  label:   string;
  labelAr: string;
  glow:    string;
};

export type RankDetail = {
  id:             string;
  key:            RankKey;
  nameEn:         string;
  nameAr:         string;
  tagEn:          string;
  tagAr:          string;
  reachEn:        string;
  reachAr:        string;
  monthsEn:       string;
  monthsAr:       string;
  color:          string;
  glow:           string;
  descEn:         string;
  descAr:         string;
  requirementsEn: string[];
  requirementsAr: string[];
  rewardsEn:      string[];
  rewardsAr:      string[];
};

export type RewardPack = {
  titleEn: string;
  titleAr: string;
  color:   string;
  itemsEn: string[];
  itemsAr: string[];
};

export type TimelineItem = {
  month:   string;
  titleEn: string;
  titleAr: string;
  descEn:  string;
  descAr:  string;
};

export type ContentApprovalType = {
  en:     string;
  ar:     string;
  descEn: string;
  descAr: string;
};

export type Requirement = {
  icon:    "heart" | "shield" | "video";
  titleEn: string;
  titleAr: string;
  descEn:  string;
  descAr:  string;
  color:   string;
};

export type RemovalReason = {
  en: string;
  ar: string;
};

export type HowItWorksStep = {
  numEn:   string;
  titleEn: string;
  titleAr: string;
  descEn:  string;
  descAr:  string;
  icon:    "document" | "checkmark" | "trophy";
};

export type ProgramStat = {
  valEn:   string;
  valAr:   string;
  labelEn: string;
  labelAr: string;
};

export type LeaderboardPositionStyle = {
  size:        string;
  textSize:    string;
  ring:        string;
  orderBadge:  string;
};

export const RANK_CONFIG: Record<RankKey, RankConfig> = {
  UNRANKED: { color: "#6b7280", label: "Unranked",       labelAr: "غير مصنّف",    glow: "rgba(107,114,128,0.2)" },
  ROOKIE:   { color: "#78be20", label: "Rookie Monster", labelAr: "مبتدئ مونستر", glow: "rgba(120,190,32,0.3)"  },
  MEGA:     { color: "#9ce63a", label: "Mega Monster",   labelAr: "ميقا مونستر",  glow: "rgba(156,230,58,0.3)"  },
  RISING:   { color: "#a3e635", label: "Rising Monster", labelAr: "صاعد مونستر",  glow: "rgba(163,230,53,0.35)" },
  ELITE:    { color: "#bef264", label: "Elite Monster",  labelAr: "نخبة مونستر",  glow: "rgba(190,242,100,0.3)" },
  COLD:     { color: "#38bdf8", label: "Cold Monster",   labelAr: "كولد مونستر",  glow: "rgba(56,189,248,0.35)" },
};

export function getRankConfig(rank: string): RankConfig {
  return RANK_CONFIG[rank as RankKey] ?? RANK_CONFIG.UNRANKED;
}

export const LEADERBOARD_POSITION_STYLES: LeaderboardPositionStyle[] = [
  { size: "h-28 w-28", textSize: "text-5xl", ring: "ring-4 ring-yellow-400/60", orderBadge: "bg-yellow-400 text-black"  },
  { size: "h-20 w-20", textSize: "text-3xl", ring: "ring-2 ring-zinc-400/50",   orderBadge: "bg-zinc-400 text-black"    },
  { size: "h-20 w-20", textSize: "text-3xl", ring: "ring-2 ring-amber-600/50",  orderBadge: "bg-amber-600 text-white"   },
  { size: "h-16 w-16", textSize: "text-2xl", ring: "ring-1 ring-zinc-700",      orderBadge: "bg-zinc-800 text-zinc-300" },
  { size: "h-16 w-16", textSize: "text-2xl", ring: "ring-1 ring-zinc-700",      orderBadge: "bg-zinc-800 text-zinc-300" },
];

export const RANK_DETAILS: RankDetail[] = [
  {
    id:      "unranked",
    key:     "UNRANKED",
    nameEn:  "UNRANKED",
    nameAr:  "غير مصنّف",
    tagEn:   "The Starting Point",
    tagAr:   "نقطة البداية",
    reachEn: "0 – 100K reach",
    reachAr: "0 – 100K وصول",
    monthsEn:"Min 1 month",
    monthsAr:"شهر واحد كحد أدنى",
    color:   "#6b7280",
    glow:    "rgba(107,114,128,0.2)",
    descEn:  "Every creator starts here. Build consistency, grow your reach, prove your commitment. Once you hit 100K reach, the admin reviews your eligibility for Rookie status.",
    descAr:  "كل صانع محتوى يبدأ هنا. ابنِ ثباتك، وسّع وصولك، أثبت التزامك. حين تبلغ 100K وصول، يراجع الفريق أهليتك لتصنيف Rookie.",
    requirementsEn: ["8+ total pieces of content", "1+ month in program", "100K reach"],
    requirementsAr: ["8+ قطعة محتوى إجمالاً", "شهر+ في البرنامج", "100K وصول"],
    rewardsEn: ["Monthly Monster Products", "Access to program benefits"],
    rewardsAr: ["منتجات مونستر شهرية", "الوصول إلى مزايا البرنامج"],
  },
  {
    id:      "rookie",
    key:     "ROOKIE",
    nameEn:  "ROOKIE MONSTER",
    nameAr:  "مبتدئ مونستر",
    tagEn:   "The Beginning",
    tagAr:   "البداية",
    reachEn: "100K – 500K reach",
    reachAr: "100K – 500K وصول",
    monthsEn:"Min 1 month",
    monthsAr:"شهر واحد كحد أدنى",
    color:   "#78be20",
    glow:    "rgba(120,190,32,0.3)",
    descEn:  "You've proven you belong. Now build on it. Reach 500K and hit your content minimums to become eligible for Rising status.",
    descAr:  "أثبتت أنك تستحق. الآن ابنِ على ذلك. اصل إلى 500K واحقق الحد الأدنى من المحتوى لتكون مؤهلاً لتصنيف Rising.",
    requirementsEn: ["32+ total pieces of content", "1+ month as Rookie", "500K reach"],
    requirementsAr: ["32+ قطعة محتوى إجمالاً", "شهر+ كـ Rookie", "500K وصول"],
    rewardsEn: ["Monthly Monster Products", "Custom Stream Layout", "$100 AHW Store Credit", "Jersey", "Pin & Stickers", "Cup + Coaster"],
    rewardsAr: ["منتجات مونستر شهرية", "تصميم بث خاص", "$100 رصيد متجر AHW", "جيرسي", "دبابيس وملصقات", "كوب + كوستر"],
  },
  {
    id:      "rising",
    key:     "RISING",
    nameEn:  "RISING MONSTER",
    nameAr:  "صاعد مونستر",
    tagEn:   "The Ascent",
    tagAr:   "الصعود",
    reachEn: "500K – 1M reach",
    reachAr: "500K – 1M وصول",
    monthsEn:"Min 4 months",
    monthsAr:"4 أشهر كحد أدنى",
    color:   "#a3e635",
    glow:    "rgba(163,230,53,0.3)",
    descEn:  "You're building real momentum. Bigger rewards, public recognition, and the path to Cold status opens up.",
    descAr:  "تبني زخماً حقيقياً. مكافآت أكبر، اعتراف عام، وطريق Cold Monster يفتح.",
    requirementsEn: ["56+ total pieces of content", "4+ months as Rising", "1M reach"],
    requirementsAr: ["56+ قطعة محتوى إجمالاً", "4+ أشهر كـ Rising", "1M وصول"],
    rewardsEn: ["All Rookie Pack rewards", "Giveaway Codes", "$250 AHW Store Credit", "Public Recognition", "Announced on official channels"],
    rewardsAr: ["جميع مزايا حزمة Rookie", "أكواد هدايا", "$250 رصيد متجر AHW", "اعتراف عام", "إعلان على القنوات الرسمية"],
  },
  {
    id:      "cold",
    key:     "COLD",
    nameEn:  "COLD MONSTER",
    nameAr:  "كولد مونستر",
    tagEn:   "The Elite",
    tagAr:   "النخبة",
    reachEn: "1M+ reach (never resets)",
    reachAr: "1M+ وصول (لا يُعاد تعيينه)",
    monthsEn:"7+ months in program",
    monthsAr:"7+ أشهر في البرنامج",
    color:   "#38bdf8",
    glow:    "rgba(56,189,248,0.3)",
    descEn:  "The pinnacle of the Monster Ambassadors program. Your reach never resets. Hit 3M views to unlock the Grand Prize.",
    descAr:  "قمة برنامج سفراء مونستر. وصولك لا يُعاد تعيينه أبداً. اصل إلى 3M مشاهدة لفتح الجائزة الكبرى.",
    requirementsEn: ["Ongoing content accumulation", "7+ months total in program", "3M views = Grand Prize"],
    requirementsAr: ["تراكم مستمر للمحتوى", "7+ أشهر إجمالية في البرنامج", "3M مشاهدة = الجائزة الكبرى"],
    rewardsEn: ["All Rising Pack rewards", "$900 AHW Store Credit", "Grand Prize Eligible", "3M Views = Full PC Credit from AHW Store"],
    rewardsAr: ["جميع مزايا حزمة Rising", "$900 رصيد متجر AHW", "مؤهل للجائزة الكبرى", "3M مشاهدة = كريدت PC كامل من AHW"],
  },
];

export const LANDING_RANKS = RANK_DETAILS.filter((r) =>
  ["rookie", "rising", "cold"].includes(r.id)
);

export const REWARD_PACKS: RewardPack[] = [
  {
    titleEn: "Rookie Pack",
    titleAr: "حزمة المبتدئ",
    color:   "#78be20",
    itemsEn: ["Monthly Monster Products", "Stream Layout", "$100 AHW Store Credit", "Jersey", "Pin & Stickers", "Cup + Coaster"],
    itemsAr: ["منتجات مونستر شهرية", "تصميم بث خاص", "$100 رصيد AHW", "جيرسي", "دبابيس وملصقات", "كوب + كوستر"],
  },
  {
    titleEn: "Rising Pack",
    titleAr: "حزمة الصاعد",
    color:   "#a3e635",
    itemsEn: ["Everything from Rookie Pack", "Giveaway Codes", "$250 AHW Store Credit"],
    itemsAr: ["كل مزايا حزمة المبتدئ", "أكواد هدايا", "$250 رصيد AHW"],
  },
  {
    titleEn: "Cold Pack",
    titleAr: "حزمة الكولد",
    color:   "#38bdf8",
    itemsEn: ["Everything from Rising Pack", "$900 AHW Store Credit", "Grand Prize Eligible", "3M Views = Full PC Credit"],
    itemsAr: ["كل مزايا حزمة الصاعد", "$900 رصيد AHW", "مؤهل للجائزة الكبرى", "3M مشاهدة = كريدت PC كامل"],
  },
];

// ── Program timeline — used on /program ──────────────────────

export const PROGRAM_TIMELINE: TimelineItem[] = [
  { month: "APR", titleEn: "Planning & Launching",    titleAr: "التخطيط والإطلاق",   descEn: "Content planning, KOL promotion, filtration",                          descAr: "تخطيط المحتوى، ترويج KOL، التصفية" },
  { month: "MAY", titleEn: "First 5 Ambassadors",     titleAr: "أول 5 سفراء",         descEn: "Accept first 5 Monsters, website launch, contracts",                   descAr: "قبول أول 5 سفراء، إطلاق الموقع، العقود" },
  { month: "JUN", titleEn: "Reviewing Phase",          titleAr: "مرحلة المراجعة",      descEn: "Monthly challenges, reward system, content collabs",                   descAr: "التحديات الشهرية، نظام المكافآت، تعاونات المحتوى" },
  { month: "JUL", titleEn: "Recruitment & Rewards",   titleAr: "التوظيف والمكافآت",   descEn: "Monthly program at AHW Studios begins",                               descAr: "يبدأ البرنامج الشهري في استوديوهات AHW" },
  { month: "AUG", titleEn: "COD × EWC",               titleAr: "COD × EWC",           descEn: "COD Black Ops 7 finals at EWC — top creators invited",                 descAr: "نهائيات COD Black Ops 7 في EWC — دعوة أبرز صناع المحتوى" },
  { month: "SEP", titleEn: "Welcome Rising Monsters", titleAr: "أهلاً بالصاعدين",    descEn: "Rising Monsters get recognised, rewarded and announced",               descAr: "تكريم وإعلان صناع المحتوى الصاعدين" },
  { month: "DEC", titleEn: "Cold Monsters Arise",     titleAr: "ظهور الكولد مونستر", descEn: "Grand rewards, announcements, special collabs",                        descAr: "الجوائز الكبرى، الإعلانات، تعاونات خاصة" },
];

// ── Content approval types — used on /program ────────────────

export const CONTENT_APPROVAL_TYPES: ContentApprovalType[] = [
  { en: "Layout",          ar: "إطار البث",    descEn: "Using Monster's special layout throughout your stream",                               descAr: "استخدام تصميم مونستر الخاص في بثك المباشر" },
  { en: "Monster Theme",   ar: "نمط مونستر",   descEn: "Green light background, dark themed room, green/black chair",                        descAr: "خلفية ضوء أخضر، غرفة بنمط داكن، كرسي أخضر/أسود" },
  { en: "Monster Logo",    ar: "لوجو مونستر",  descEn: "Monster neon light or logo/fabric clearly visible in background",                    descAr: "لمبة نيون أو لوجو مونستر ظاهر في الخلفية" },
  { en: "Monster Product", ar: "منتج مونستر",  descEn: "Monster can, fridge, bag with logo, or branded headset visible during content",      descAr: "علبة مونستر، ثلاجة، حقيبة بشعار، أو سماعة بصيمة العلامة ظاهرة" },
];

export const PROGRAM_REQUIREMENTS: Requirement[] = [
  {
    icon:    "heart",
    titleEn: "Loyalty",
    titleAr: "الولاء",
    descEn:  "You cannot promote a direct competitor product (e.g. RedBull) across any of your platforms while in the program.",
    descAr:  "لا يمكنك الترويج لمنتج منافس مباشر (مثل RedBull) على أي من منصاتك خلال فترة انضمامك للبرنامج.",
    color:   "#78be20",
  },
  {
    icon:    "shield",
    titleEn: "Keep It Clean",
    titleAr: "حافظ على النظافة",
    descEn:  "Content branded under Monster Energy must be free of profanity, smoking, religious talk, or political talk.",
    descAr:  "المحتوى الذي يحمل علامة مونستر إنرجي يجب أن يخلو من الألفاظ النابية والتدخين والحديث الديني أو السياسي.",
    color:   "#a3e635",
  },
  {
    icon:    "video",
    titleEn: "Content",
    titleAr: "المحتوى",
    descEn:  "25 pieces of content required per rank period. Weekly submission of verified content links required.",
    descAr:  "25 قطعة محتوى مطلوبة لكل فترة تصنيف. إرسال أسبوعي لروابط المحتوى الموثّق.",
    color:   "#38bdf8",
  },
];

export const REMOVAL_REASONS: RemovalReason[] = [
  { en: "Missing 2 consecutive months",       ar: "التغيب شهرين متتاليين" },
  { en: "Completion drops below 70%",         ar: "انخفاض الإنجاز إلى ما دون 70%" },
  { en: "Promoting competitor brands",        ar: "الترويج لعلامات منافسة" },
  { en: "Submitting fake or misleading data", ar: "تقديم بيانات مزيفة أو مضللة" },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    numEn:   "01",
    icon:    "document",
    titleEn: "Apply",
    titleAr: "قدّم طلبك",
    descEn:  "Fill out the registration form with your platform links and stats. Selection based on content consistency, gaming relevance, and brand fit.",
    descAr:  "أكمل استمارة التسجيل بروابط منصاتك وإحصائياتك. الاختيار يعتمد على ثبات المحتوى والملاءمة مع العلامة التجارية.",
  },
  {
    numEn:   "02",
    icon:    "checkmark",
    titleEn: "Get Selected",
    titleAr: "احصل على القبول",
    descEn:  "Top 10 creators are shortlisted. The first 5 to complete and submit verified Rookie KPIs are officially onboarded.",
    descAr:  "أفضل 10 صناع محتوى يُختارون. أول 5 ينجزون KPIs الـ Rookie بشكل موثّق يُضمّون رسمياً للبرنامج.",
  },
  {
    numEn:   "03",
    icon:    "trophy",
    titleEn: "Level Up",
    titleAr: "ارتقِ بمستواك",
    descEn:  "Prove consistency, hit your reach targets, and earn admin rank-ups. Every level unlocks bigger rewards.",
    descAr:  "أثبت ثباتك، حقق أهداف وصولك، واكسب ترقية تصنيفك. كل مستوى يفتح مكافآت أكبر.",
  },
];

// ── Program stats — used on ProgramStatsStrip ────────────────

export const PROGRAM_STATS: ProgramStat[] = [
  { valEn: "9 Months",    valAr: "9 أشهر",       labelEn: "Program Duration",  labelAr: "مدة البرنامج"   },
  { valEn: "30 Creators", valAr: "30 صانع محتوى", labelEn: "Total Ambassadors", labelAr: "إجمالي السفراء" },
  { valEn: "1000+",       valAr: "+1000",          labelEn: "Content Posts",     labelAr: "منشور محتوى"    },
  { valEn: "15M+",        valAr: "+15M",           labelEn: "Online Reach",      labelAr: "وصول رقمي"      },
  { valEn: "3 Ranks",     valAr: "3 تصنيفات",     labelEn: "To Climb",          labelAr: "للتسلق"         },
];

export const TERMS: { en: string; ar: string }[] = [
  { en: "Creators must deliver all monthly content requirements as outlined",       ar: "يجب على صناع المحتوى تسليم جميع متطلبات المحتوى الشهرية كما هو محدد" },
  { en: "All content must be original and posted within the assigned month",        ar: "يجب أن يكون كل المحتوى أصلياً ومنشوراً خلال الشهر المحدد" },
  { en: "Monster branding must be clearly visible in all content",                  ar: "يجب أن تكون علامة مونستر ظاهرة بوضوح في جميع المحتوى" },
  { en: "Competitor brands are strictly prohibited",                                ar: "العلامات التجارية المنافسة محظورة تماماً" },
  { en: "Minimum 80% monthly completion required to remain in the program",         ar: "80% إنجاز شهري كحد أدنى للبقاء في البرنامج" },
  { en: "Each level can only be unlocked once — no going back",                     ar: "كل مستوى يُفتح مرة واحدة فقط — لا تراجع" },
  { en: "Views counter resets to 0 at each new level (except Cold)",                ar: "عداد المشاهدات يعود إلى الصفر عند كل مستوى جديد (ماعدا Cold)" },
];

export const SELECTION_PHASES: { phase: string; titleEn: string; titleAr: string; descEn: string; descAr: string }[] = [
  {
    phase:   "Phase 1",
    titleEn: "Application",
    titleAr: "التقديم",
    descEn:  "Apply via the form. Evaluated on content consistency, gaming/esports relevance, and brand fit.",
    descAr:  "قدّم عبر الاستمارة. يُقيَّم على ثبات المحتوى والصلة بالألعاب وملاءمة العلامة.",
  },
  {
    phase:   "Phase 2",
    titleEn: "Shortlist",
    titleAr: "القائمة المختصرة",
    descEn:  "Top 10 creators receive acceptance message with KPI requirements.",
    descAr:  "أفضل 10 صناع يتلقون رسالة قبول مع متطلبات KPI.",
  },
  {
    phase:   "Phase 3",
    titleEn: "Final Onboarding",
    titleAr: "الانضمام النهائي",
    descEn:  "First 5 to complete verified Rookie KPIs are officially onboarded. Remaining 5 encouraged to reapply.",
    descAr:  "أول 5 ينجزون KPIs الـ Rookie بشكل موثّق ينضمون رسمياً. الـ 5 الباقون يُشجَّعون على إعادة التقديم.",
  },
];

export const TRACKING_RULES: { en: string; ar: string }[] = [
  { en: "Weekly submission of content links required",                          ar: "إرسال روابط المحتوى أسبوعياً إلزامي" },
  { en: "Only submitted & verified content counts",                             ar: "المحتوى المُرسَل والمُتحقَّق منه فقط يُحتسَب" },
  { en: "Performance tracked: Reach, Engagement, Deliverables completion",     ar: "يُتتبَّع الأداء: الوصول، التفاعل، الإنجازات" },
  { en: "Minimum 80% monthly completion to stay in the program",               ar: "80% إنجاز شهري كحد أدنى للبقاء في البرنامج" },
];