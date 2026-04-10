export type NewsArticle = {
  id: string;
  tag: string;
  tagAr: string;
  tagSub: string;
  tagSubAr: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  date: string;
  dateAr: string;
  dateCat: string;
  dateCatAr: string;
  img: string;
  href: string;
};

export const newsArticles: NewsArticle[] = [
  {
    id: "surf",
    tag: "ACTION",
    tagAr: "أكشن",
    tagSub: "SURF",
    tagSubAr: "ركوب الأمواج",
    title: "This Way In: Monster Energy's Preview of the 2026 Rip Curl Pro Bells Beach",
    titleAr: "هذا الطريق: معاينة مونستر إنرجي لبطولة ريب كيرل برو بيلز بيتش 2026",
    excerpt: "The Championship Tour kicks off at Bells Beach as fresh jerseys, shifting momentum, and a stacked Monster Energy roster set the tone for the 2026 surf season.",
    excerptAr: "انطلاق جولة البطولة في بيلز بيتش مع قمصان جديدة وزخم متصاعد وقائمة مونستر إنرجي القوية التي تحدد إيقاع موسم ركوب الأمواج 2026.",
    date: "4/2/2026",
    dateAr: "2/4/2026",
    dateCat: "Surfing",
    dateCatAr: "ركوب الأمواج",
    img: "/assets/news/riders.webp",
    href: "#",
  },
  {
    id: "downhill",
    tag: "RACING",
    tagAr: "سباقات",
    tagSub: "MTB",
    tagSubAr: "دراجات جبلية",
    title: "Pro Downhill Series 2025 — Season Highlights",
    titleAr: "سلسلة التحدر الاحترافي 2025 — أبرز أحداث الموسم",
    excerpt: "Monster Athletes dominated the podium across all five rounds of the Pro Downhill Series, pushing limits on some of the world's most treacherous tracks.",
    excerptAr: "هيمن رياضيو مونستر على منصة التتويج في جميع جولات سلسلة التحدر الاحترافي الخمس، متجاوزين الحدود على أكثر المسارات خطورة في العالم.",
    date: "3/28/2025",
    dateAr: "28/3/2025",
    dateCat: "MTB",
    dateCatAr: "دراجات جبلية",
    img: "/assets/news/pro-downhill-series.webp",
    href: "#",
  },
];