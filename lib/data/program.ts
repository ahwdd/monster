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

export type RemovalReason = { en: string; ar: string };

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
  size:       string;
  textSize:   string;
  ring:       string;
  orderBadge: string;
};

export type KpiRow = {
  labelEn:        string;
  labelAr:        string;
  unranked:       string;
  rookie:         string;
  rising:         string;
  cold:           string;
};

export type ScoreCategory = {
  titleEn:  string;
  titleAr:  string;
  points:   number;
  itemsEn:  string[];
  itemsAr:  string[];
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
    id: "unranked", key: "UNRANKED",
    nameEn: "UNRANKED", nameAr: "غير مصنّف",
    tagEn:  "The Starting Point", tagAr: "نقطة البداية",
    reachEn: "50K+ monthly views", reachAr: "50K+ مشاهدة شهرية",
    monthsEn: "First 3 months", monthsAr: "أول 3 أشهر",
    color: "#6b7280", glow: "rgba(107,114,128,0.2)",
    descEn: "Every creator starts here. Deliver 8 streams / 2 reels / 10 stories per month, hit 50K+ views, and prove you belong. Unranked rewards last 3 months only.",
    descAr: "كل صانع محتوى يبدأ هنا. سلّم 8 بثوث / 2 ريلز / 10 ستوريز شهرياً، حقق 50K+ مشاهدة، وأثبت جدارتك. مكافآت Unranked تستمر 3 أشهر فقط.",
    requirementsEn: [
      "8 streams / 2 reels / 10 stories per month",
      "50K+ monthly views",
      "0.5% quarterly engagement rate",
      "Active for 1 quarter",
    ],
    requirementsAr: [
      "8 بثوث / 2 ريلز / 10 ستوريز شهرياً",
      "50K+ مشاهدة شهرية",
      "0.5% معدل تفاعل ربعي",
      "نشط لمدة ربع سنة",
    ],
    rewardsEn: ["1 Monster Energy can/month (3 months only)", "Program onboarding & access"],
    rewardsAr: ["1 علبة مونستر شهرياً (3 أشهر فقط)", "الانضمام للبرنامج والوصول إليه"],
  },
  {
    id: "rookie", key: "ROOKIE",
    nameEn: "ROOKIE MONSTER", nameAr: "مبتدئ مونستر",
    tagEn:  "The Beginning", tagAr: "البداية",
    reachEn: "75K+ monthly views", reachAr: "75K+ مشاهدة شهرية",
    monthsEn: "Min 1 quarter (3 months)", monthsAr: "ربع سنة على الأقل (3 أشهر)",
    color: "#78be20", glow: "rgba(120,190,32,0.3)",
    descEn: "You've proven you belong. Scale your content, hit 75K+ monthly views, and earn your first real gear rewards. 2 collabs with other Rookies required per quarter.",
    descAr: "أثبتت أنك تستحق. طوّر محتواك، حقق 75K+ مشاهدة شهرية، واكسب أولى مكافآت المعدات الحقيقية. مطلوب 2 تعاون مع Rookies آخرين ربعياً.",
    requirementsEn: [
      "12 streams / 4 reels / 16 stories per month",
      "75K+ monthly views",
      "1% quarterly engagement rate",
      "+50 quarter score",
      "2 collabs with other Rookies",
      "1 quarter loyalty",
    ],
    requirementsAr: [
      "12 بثاً / 4 ريلز / 16 ستوري شهرياً",
      "75K+ مشاهدة شهرية",
      "1% معدل تفاعل ربعي",
      "50+ نقطة ربعية",
      "2 تعاون مع Rookies آخرين",
      "ولاء لمدة ربع سنة",
    ],
    rewardsEn: [
      "1 Monster Energy shrink/month",
      "Monthly meetup at AHW Studios",
      "$50 end-of-program credit",
      "Mouse + Mousepad + Keyboard",
      "Rookie Certificate",
    ],
    rewardsAr: [
      "1 Monster Shrink شهرياً",
      "لقاء شهري في استوديوهات AHW",
      "$50 رصيد نهاية البرنامج",
      "ماوس + ماوس باد + كيبورد",
      "شهادة Rookie",
    ],
  },
  {
    id: "rising", key: "RISING",
    nameEn: "RISING MONSTER", nameAr: "صاعد مونستر",
    tagEn:  "The Ascent", tagAr: "الصعود",
    reachEn: "150K+ monthly views", reachAr: "150K+ مشاهدة شهرية",
    monthsEn: "Min 2 quarters (6 months)", monthsAr: "ربعان على الأقل (6 أشهر)",
    color: "#a3e635", glow: "rgba(163,230,53,0.3)",
    descEn: "Real momentum. 150K+ monthly views, bigger collabs, public recognition. Rising Monsters are announced on official channels and earn serious gear.",
    descAr: "زخم حقيقي. 150K+ مشاهدة شهرية، تعاونات أكبر، اعتراف عام. صاعد مونستر يُعلَن عنه على القنوات الرسمية ويحصل على معدات احترافية.",
    requirementsEn: [
      "16 streams / 8 reels / 24 stories per month",
      "150K+ monthly views",
      "2% quarterly engagement rate",
      "+70 quarter score",
      "2 collabs with Rookies + 2 with Rising",
      "2 quarter loyalty",
    ],
    requirementsAr: [
      "16 بثاً / 8 ريلز / 24 ستوري شهرياً",
      "150K+ مشاهدة شهرية",
      "2% معدل تفاعل ربعي",
      "70+ نقطة ربعية",
      "2 تعاون مع Rookies + 2 مع Rising",
      "ولاء لمدة ربعين",
    ],
    rewardsEn: [
      "2 Monster Energy shrinks/month",
      "Monthly meetup at AHW Studios",
      "$250 end-of-program credit",
      "Headset + Camera + Mic + Custom Fridge",
      "2 tickets to local event",
      "Rising Trophy",
    ],
    rewardsAr: [
      "2 Monster Shrink شهرياً",
      "لقاء شهري في استوديوهات AHW",
      "$250 رصيد نهاية البرنامج",
      "سماعة + كاميرا + مايك + ثلاجة مخصصة",
      "2 تذكرة لحدث محلي",
      "كأس Rising",
    ],
  },
  {
    id: "cold", key: "COLD",
    nameEn: "COLD MONSTER", nameAr: "كولد مونستر",
    tagEn:  "The Elite", tagAr: "النخبة",
    reachEn: "650K+ monthly views", reachAr: "650K+ مشاهدة شهرية",
    monthsEn: "Min 3 quarters (9 months)", monthsAr: "3 أرباع على الأقل (9 أشهر)",
    color: "#38bdf8", glow: "rgba(56,189,248,0.3)",
    descEn: "The pinnacle. 650K+ monthly views, elite gear, and a shot at the Grand Prize. Top 2 Cold Monsters after Q2 earn a trip to a global gaming event.",
    descAr: "القمة. 650K+ مشاهدة شهرية، معدات نخبة، وفرصة للجائزة الكبرى. أفضل 2 Cold Monsters بعد الربع الثاني يحصلون على رحلة لحدث ألعاب عالمي.",
    requirementsEn: [
      "20 streams / 16 reels / 36 stories per month",
      "650K+ monthly views",
      "3% quarterly engagement rate",
      "+90 quarter score",
      "4 collabs with Rookies + 2 with Rising",
      "3 quarter loyalty",
    ],
    requirementsAr: [
      "20 بثاً / 16 ريلز / 36 ستوري شهرياً",
      "650K+ مشاهدة شهرية",
      "3% معدل تفاعل ربعي",
      "90+ نقطة ربعية",
      "4 تعاون مع Rookies + 2 مع Rising",
      "ولاء لمدة 3 أرباع",
    ],
    rewardsEn: [
      "3 Monster Energy shrinks/month",
      "Monthly meetup at AHW Studios",
      "$750 end-of-program credit",
      "Gaming Lights + Gaming Chair + Joystick",
      "1 trip to global gaming event (top 2 only, after Q2)",
      "Cold Monster Trophy / Plaque",
    ],
    rewardsAr: [
      "3 Monster Shrink شهرياً",
      "لقاء شهري في استوديوهات AHW",
      "$750 رصيد نهاية البرنامج",
      "إضاءة ألعاب + كرسي ألعاب + جويستيك",
      "رحلة لحدث ألعاب عالمي (أفضل 2 فقط، بعد الربع الثاني)",
      "كأس / لوحة شرف كولد مونستر",
    ],
  },
];

export const LANDING_RANKS = RANK_DETAILS.filter((r) => ["rookie", "rising", "cold"].includes(r.id));

export const KPI_TABLE: KpiRow[] = [
  {
    labelEn:  "Monthly Content",
    labelAr:  "المحتوى الشهري",
    unranked: "8 stream / 2 reel / 10 story",
    rookie:   "12 stream / 4 reels / 16 story",
    rising:   "16 stream / 8 reels / 24 story",
    cold:     "20 stream / 16 reels / 36 story",
  },
  {
    labelEn:  "Monthly View KPI",
    labelAr:  "الهدف الشهري للمشاهدات",
    unranked: "50K+ Views",
    rookie:   "75K+ Views",
    rising:   "150K+ Views",
    cold:     "650K+ Views",
  },
  {
    labelEn:  "Quarterly Engagement Rate",
    labelAr:  "معدل التفاعل الربعي",
    unranked: "0.5%",
    rookie:   "1%",
    rising:   "2%",
    cold:     "3%",
  },
  {
    labelEn:  "Quarter Score",
    labelAr:  "نقاط الربع",
    unranked: "N/A",
    rookie:   "+50 points",
    rising:   "+70 points",
    cold:     "+90 points",
  },
  {
    labelEn:  "Program Loyalty",
    labelAr:  "الولاء للبرنامج",
    unranked: "1st quarter",
    rookie:   "1 quarter",
    rising:   "2 quarters",
    cold:     "3 quarters",
  },
  {
    labelEn:  "Collaborations",
    labelAr:  "التعاونات",
    unranked: "N/A",
    rookie:   "2 with other Rookies",
    rising:   "2 Rookies + 2 Rising",
    cold:     "4 Rookies + 2 Rising",
  },
  {
    labelEn:  "Monthly Reward",
    labelAr:  "المكافأة الشهرية",
    unranked: "1 Monster can (3 months)",
    rookie:   "1 Monster shrink",
    rising:   "2 Monster shrinks",
    cold:     "3 Monster shrinks",
  },
  {
    labelEn:  "Monthly AHW Meetup",
    labelAr:  "لقاء AHW الشهري",
    unranked: "No",
    rookie:   "Yes",
    rising:   "Yes",
    cold:     "Yes",
  },
  {
    labelEn:  "End-of-Program Credit",
    labelAr:  "رصيد نهاية البرنامج",
    unranked: "—",
    rookie:   "$50",
    rising:   "$250",
    cold:     "$750",
  },
  {
    labelEn:  "Assets & Gear",
    labelAr:  "الأصول والمعدات",
    unranked: "—",
    rookie:   "Mouse + Mousepad + Keyboard",
    rising:   "Headset + Cam + Mic + Fridge",
    cold:     "Lights + Chair + Joystick",
  },
  {
    labelEn:  "Events Access",
    labelAr:  "الوصول للفعاليات",
    unranked: "—",
    rookie:   "—",
    rising:   "2 tickets to local event",
    cold:     "1 global trip (top 2 after Q2)",
  },
  {
    labelEn:  "Certificate / Trophy",
    labelAr:  "الشهادة / الكأس",
    unranked: "—",
    rookie:   "Rookie Certificate",
    rising:   "Rising Trophy",
    cold:     "Cold Trophy / Plaque",
  },
];

export const SCORING_SYSTEM: ScoreCategory[] = [
  {
    titleEn: "Commitment",
    titleAr: "الالتزام",
    points: 20,
    itemsEn: [
      "Submission discipline (on time each Friday) — 10 pts",
      "Monthly meeting attendance — 5 pts",
      "Responsiveness / Communication — 5 pts",
    ],
    itemsAr: [
      "الالتزام بالتسليم (كل جمعة في الوقت المحدد) — 10 نقاط",
      "حضور الاجتماع الشهري — 5 نقاط",
      "سرعة الاستجابة / التواصل — 5 نقاط",
    ],
  },
  {
    titleEn: "Performance & Impact",
    titleAr: "الأداء والتأثير",
    points: 40,
    itemsEn: [
      "Achieving engagement rate per division — 20 pts",
      "Achieving needed views per division — 10 pts",
      "Collaborations — 10 pts",
    ],
    itemsAr: [
      "تحقيق معدل التفاعل المطلوب لكل فئة — 20 نقطة",
      "تحقيق المشاهدات المطلوبة لكل فئة — 10 نقاط",
      "التعاونات — 10 نقاط",
    ],
  },
  {
    titleEn: "Content Quality & Output",
    titleAr: "جودة المحتوى والإنتاج",
    points: 40,
    itemsEn: [
      "Content output — 20 pts",
      "Compliance (no cursing, no controversial content, brand-safe) — 5 pts",
      "Brand integration (Monster visibility, messaging) — 5 pts",
      "Creativity & originality — 5 pts",
      "Production quality (visual / audio / editing) — 5 pts",
    ],
    itemsAr: [
      "حجم إنتاج المحتوى — 20 نقطة",
      "الامتثال (لا ألفاظ نابية، لا محتوى مثير للجدل، ملائم للعلامة) — 5 نقاط",
      "تكامل العلامة التجارية (ظهور مونستر والرسائل) — 5 نقاط",
      "الإبداع والأصالة — 5 نقاط",
      "جودة الإنتاج (مرئي / صوت / مونتاج) — 5 نقاط",
    ],
  },
];

export const REWARD_PACKS: RewardPack[] = [
  {
    titleEn: "Rookie Pack",
    titleAr: "حزمة المبتدئ",
    color:   "#78be20",
    itemsEn: ["1 Monster shrink/month", "Monthly AHW meetup", "$50 end-of-program credit", "Mouse + Mousepad + Keyboard", "Rookie Certificate"],
    itemsAr: ["1 Monster Shrink شهرياً", "لقاء شهري في AHW", "$50 رصيد نهاية البرنامج", "ماوس + ماوس باد + كيبورد", "شهادة Rookie"],
  },
  {
    titleEn: "Rising Pack",
    titleAr: "حزمة الصاعد",
    color:   "#a3e635",
    itemsEn: ["2 Monster shrinks/month", "Monthly AHW meetup", "$250 end-of-program credit", "Headset + Camera + Mic + Custom Fridge", "2 tickets to local event", "Rising Trophy"],
    itemsAr: ["2 Monster Shrink شهرياً", "لقاء شهري في AHW", "$250 رصيد نهاية البرنامج", "سماعة + كاميرا + مايك + ثلاجة مخصصة", "2 تذكرة لحدث محلي", "كأس Rising"],
  },
  {
    titleEn: "Cold Pack",
    titleAr: "حزمة الكولد",
    color:   "#38bdf8",
    itemsEn: ["3 Monster shrinks/month", "Monthly AHW meetup", "$750 end-of-program credit", "Gaming Lights + Chair + Joystick", "Global event trip (top 2, after Q2)", "Cold Trophy / Plaque"],
    itemsAr: ["3 Monster Shrink شهرياً", "لقاء شهري في AHW", "$750 رصيد نهاية البرنامج", "إضاءة + كرسي ألعاب + جويستيك", "رحلة عالمية (أفضل 2، بعد الربع الثاني)", "كأس / لوحة شرف كولد مونستر"],
  },
];

// ── Program timeline — from PDF page 14 ──────────────────────
// APR through JAN

export const PROGRAM_TIMELINE: TimelineItem[] = [
  { month: "APR", titleEn: "Planning & Launching",    titleAr: "التخطيط والإطلاق",      descEn: "Content planning, KOL promotion & creator filtration",              descAr: "تخطيط المحتوى، ترويج KOL وتصفية صناع المحتوى" },
  { month: "MAY", titleEn: "Reviewing Phase",          titleAr: "مرحلة المراجعة",         descEn: "Website main interface launches, contracts sent",                  descAr: "إطلاق الموقع الرئيسي، إرسال العقود" },
  { month: "JUN", titleEn: "Rewarding & Recruitment", titleAr: "المكافآت والتوظيف",      descEn: "Reward loop starts, recruitment of next creators",                 descAr: "بدء دورة المكافآت، تعيين الدفعة القادمة" },
  { month: "JUL", titleEn: "Shooting Content Phase",  titleAr: "مرحلة تصوير المحتوى",   descEn: "Monthly program at AHW Studios begins",                            descAr: "بدء البرنامج الشهري في استوديوهات AHW" },
  { month: "AUG", titleEn: "COD × EWC",               titleAr: "COD × EWC",               descEn: "COD Black Ops 7 finals at EWC — top creators invited (optional)",  descAr: "نهائيات COD Black Ops 7 في EWC — دعوة أبرز صناع المحتوى (اختياري)" },
  { month: "SEP", titleEn: "Welcome Rising Monsters", titleAr: "أهلاً بالصاعدين",        descEn: "Rising Monsters get recognised, rewarded and announced",            descAr: "تكريم وإعلان صناع المحتوى الصاعدين" },
  { month: "OCT", titleEn: "Usual Flow",               titleAr: "التدفق المعتاد",         descEn: "Program flow monitored, ensuring everything runs smoothly",        descAr: "متابعة سير البرنامج والتأكد من سلاسة كل شيء" },
  { month: "NOV", titleEn: "Cold Monsters Arise",     titleAr: "ظهور الكولد مونستر",     descEn: "Grand rewards, announcements, special collabs",                    descAr: "الجوائز الكبرى، الإعلانات، التعاونات الخاصة" },
  { month: "DEC", titleEn: "Usual Flow",               titleAr: "التدفق المعتاد",         descEn: "Program flow monitored, ensuring everything runs smoothly",        descAr: "متابعة سير البرنامج والتأكد من سلاسة كل شيء" },
  { month: "JAN", titleEn: "Usual Flow",               titleAr: "التدفق المعتاد",         descEn: "Program flow monitored, preparing final wrap-up",                  descAr: "متابعة سير البرنامج والتحضير للإنهاء النهائي" },
];

export const CONTENT_APPROVAL_TYPES: ContentApprovalType[] = [
  { en: "Layout",          ar: "إطار البث",    descEn: "Using Monster's special layout throughout your stream",                                              descAr: "استخدام تصميم مونستر الخاص في بثك المباشر" },
  { en: "Monster Theme",   ar: "نمط مونستر",   descEn: "Green light background, dark themed room, green/black chair",                                       descAr: "خلفية ضوء أخضر، غرفة بنمط داكن، كرسي أخضر/أسود" },
  { en: "Monster Logo",    ar: "لوجو مونستر",  descEn: "Monster neon light or logo/fabric clearly visible in background",                                   descAr: "لمبة نيون أو لوجو مونستر ظاهر بوضوح في الخلفية" },
  { en: "Monster Product", ar: "منتج مونستر",  descEn: "Monster can, fridge, bag with logo, branded jersey/headset visible during content",                 descAr: "علبة مونستر، ثلاجة، حقيبة بشعار، جيرسي أو سماعة بصيمة العلامة ظاهرة" },
];

export const CONTENT_APPROVAL_NOTE = {
  en: "Only 1 method is needed to validate your content.",
  ar: "يكفي أسلوب واحد فقط من الأساليب أعلاه للتحقق من المحتوى.",
};

export const PROGRAM_REQUIREMENTS: Requirement[] = [
  {
    icon:    "heart",
    titleEn: "Loyalty",
    titleAr: "الولاء",
    descEn:  "You cannot promote a direct competitor product (e.g. Red Bull) across any of your platforms while in the program.",
    descAr:  "لا يمكنك الترويج لمنتج منافس مباشر (مثل Red Bull) على أي من منصاتك خلال فترة انضمامك للبرنامج.",
    color:   "#78be20",
  },
  {
    icon:    "shield",
    titleEn: "Keep It Clean",
    titleAr: "حافظ على النظافة",
    descEn:  "Content must be respectful and family-friendly. No profanity, smoking, or religious/political topics.",
    descAr:  "يجب أن يكون المحتوى محترماً وملائماً للعائلة. لا ألفاظ نابية أو تدخين أو مواضيع دينية/سياسية.",
    color:   "#a3e635",
  },
  {
    icon:    "video",
    titleEn: "Content",
    titleAr: "المحتوى",
    descEn:  "Achieve your monthly KPIs. Submit content links weekly for validation. Insights screenshots required with each link.",
    descAr:  "حقق KPIs الشهرية. أرسل روابط المحتوى أسبوعياً للتحقق. لقطات الشاشة للإحصائيات مطلوبة مع كل رابط.",
    color:   "#38bdf8",
  },
];

export const REMOVAL_REASONS: RemovalReason[] = [
  { en: "Drop below 50% completion at Rookie level",  ar: "الانخفاض دون 50% إنجاز في مستوى Rookie" },
  { en: "Promote competitor brands",                   ar: "الترويج لعلامات منافسة" },
  { en: "Submit fake or misleading data",              ar: "تقديم بيانات مزيفة أو مضللة" },
  { en: "No exceptions",                               ar: "لا استثناءات" },
];

export const PROGRESSION_RULES = {
  levelUpEn:   "100% deliverables completed for the next level",
  levelUpAr:   "إكمال 100% من المتطلبات للمستوى التالي",
  stayEn:      "Minimum 80% deliverables completed monthly → stay at current level",
  stayAr:      "إنجاز 80% على الأقل شهرياً → البقاء في المستوى الحالي",
  levelDownEn: "Less than 80% of current level deliverables → level down",
  levelDownAr: "أقل من 80% من متطلبات المستوى الحالي → الهبوط لمستوى أدنى",
  resetNoteEn: "Counters reset to 0 at each new level (except Cold Monster)",
  resetNoteAr: "العدادات تعود إلى الصفر عند كل مستوى جديد (ماعدا Cold Monster)",
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    numEn:   "01",
    icon:    "document",
    titleEn: "Apply",
    titleAr: "قدّم طلبك",
    descEn:  "Fill out the registration form. Selection based on content consistency, gaming/esports relevance, brand fit, and live streaming.",
    descAr:  "أكمل استمارة التسجيل. الاختيار يعتمد على ثبات المحتوى، الصلة بالألعاب، ملاءمة العلامة، والبث المباشر.",
  },
  {
    numEn:   "02",
    icon:    "checkmark",
    titleEn: "Get Selected",
    titleAr: "احصل على القبول",
    descEn:  "Top creators are shortlisted. Accepted creators receive acceptance message + KPI requirements. Process repeats quarterly until 45 Monsters.",
    descAr:  "أفضل صناع المحتوى يُختارون. المقبولون يتلقون رسالة قبول + متطلبات KPI. تتكرر العملية ربعياً حتى الوصول لـ 45 سفيراً.",
  },
  {
    numEn:   "03",
    icon:    "trophy",
    titleEn: "Level Up",
    titleAr: "ارتقِ بمستواك",
    descEn:  "Deliver consistently, hit your KPIs, and earn admin rank-ups every quarter. Every level unlocks bigger rewards and gear.",
    descAr:  "سلّم بثبات، حقق KPIs، واكسب ترقية تصنيفك كل ربع سنة. كل مستوى يفتح مكافآت ومعدات أكبر.",
  },
];

export const PROGRAM_STATS: ProgramStat[] = [
  { valEn: "9 Months",     valAr: "9 أشهر",        labelEn: "Program Duration",  labelAr: "مدة البرنامج"   },
  { valEn: "45 Creators",  valAr: "45 صانع محتوى", labelEn: "Total Ambassadors", labelAr: "إجمالي السفراء" },
  { valEn: "1000+",        valAr: "+1000",           labelEn: "Content Posts",     labelAr: "منشور محتوى"    },
  { valEn: "15M+",         valAr: "+15M",            labelEn: "Online Reach",      labelAr: "وصول رقمي"      },
  { valEn: "3 Ranks",      valAr: "3 تصنيفات",      labelEn: "To Climb",          labelAr: "للتسلق"         },
];

export const TERMS: { en: string; ar: string }[] = [
  { en: "Creators must deliver all monthly/quarterly requirements as outlined",                    ar: "يجب على صناع المحتوى تسليم جميع متطلبات المحتوى الشهرية/الربعية كما هو محدد" },
  { en: "All content must be original and posted within the assigned quarter to be evaluated",     ar: "يجب أن يكون كل المحتوى أصلياً ومنشوراً خلال الربع المحدد ليُحتسب" },
  { en: "Monster branding must be clearly visible in all content",                                 ar: "يجب أن تكون علامة مونستر ظاهرة بوضوح في جميع المحتوى" },
  { en: "Competitor brands are strictly prohibited",                                               ar: "العلامات التجارية المنافسة محظورة تماماً" },
  { en: "Minimum 50% completion required to remain in the program",                               ar: "50% إنجاز كحد أدنى للبقاء في البرنامج" },
  { en: "All content must be submitted weekly for validation",                                     ar: "يجب إرسال جميع المحتوى أسبوعياً للتحقق" },
  { en: "Rewards are performance-based",                                                           ar: "المكافآت تعتمد على الأداء" },
  { en: "Creators may only progress once they achieve the needed KPIs for each level",            ar: "لا يتقدم صناع المحتوى إلا بعد تحقيق KPIs المطلوبة لكل مستوى" },
  { en: "Terms and conditions are subject to change",                                              ar: "الشروط والأحكام قابلة للتغيير" },
  { en: "Monster reserves the right to remove any creator not meeting requirements",               ar: "تحتفظ مونستر بحق إقصاء أي صانع محتوى لا يستوفي المتطلبات" },
  { en: "Monster retains the right to use all content for marketing purposes",                     ar: "تحتفظ مونستر بحق استخدام جميع المحتوى لأغراض التسويق" },
  { en: "All active creators meeting monthly deliverables receive a standard monthly reward",      ar: "جميع صناع المحتوى النشطين الذين يستوفون المتطلبات يحصلون على المكافأة الشهرية" },
  { en: "A quarterly meeting with each creator is held to review their insights",                  ar: "يُعقد اجتماع ربعي مع كل صانع محتوى لمراجعة إحصائياته" },
  { en: "Insights must be submitted as screenshots with each submitted link",                      ar: "يجب إرفاق لقطات الشاشة للإحصائيات مع كل رابط مُرسَل" },
  { en: "Only 1 content approval method is required per submission",                              ar: "يكفي أسلوب واحد فقط للتحقق من المحتوى في كل مشاركة" },
];

export const SELECTION_PHASES: { phase: string; titleEn: string; titleAr: string; descEn: string; descAr: string }[] = [
  {
    phase:   "Phase 1",
    titleEn: "Application",
    titleAr: "التقديم",
    descEn:  "Apply via the website form. Selection based on content consistency, gaming/esports relevance, brand fit, and live streaming.",
    descAr:  "قدّم عبر نموذج الموقع. يُقيَّم على ثبات المحتوى، الصلة بالألعاب، ملاءمة العلامة، والبث المباشر.",
  },
  {
    phase:   "Phase 2",
    titleEn: "Shortlisting",
    titleAr: "القائمة المختصرة",
    descEn:  "Best applicants are selected. Accepted creators receive acceptance message + Rookie KPI requirements. Others: 'Not selected this round — re-apply next quarter.'",
    descAr:  "أفضل المتقدمين يُختارون. المقبولون يتلقون رسالة قبول + متطلبات KPI للـ Rookie. الباقون: 'لم تُختَر هذه الجولة — قدّم مجدداً الربع القادم.'",
  },
  {
    phase:   "Phase 3",
    titleEn: "Final Selection",
    titleAr: "الاختيار النهائي",
    descEn:  "Choose creators needed to complete 45 cumulative ambassadors. Remaining applicants are encouraged to re-apply. Process repeats quarterly.",
    descAr:  "اختيار صناع المحتوى اللازمين لاستكمال 45 سفيراً تراكمياً. يُشجَّع الباقون على التقديم مجدداً. تتكرر العملية ربعياً.",
  },
];

export const TRACKING_RULES: { en: string; ar: string }[] = [
  { en: "Weekly submission of content links is required",                           ar: "إرسال روابط المحتوى أسبوعياً إلزامي" },
  { en: "Only submitted & verified content counts",                                 ar: "المحتوى المُرسَل والمُتحقَّق منه فقط يُحتسَب" },
  { en: "Performance tracked: Monthly Views, Engagement Rate, Deliverables",       ar: "يُتتبَّع الأداء: المشاهدات الشهرية، معدل التفاعل، المتطلبات المُنجزة" },
  { en: "Collabs count, Quarter scoring, and Program loyalty also tracked",        ar: "يُتتبَّع أيضاً: عدد التعاونات، نقاط الربع، والولاء للبرنامج" },
];