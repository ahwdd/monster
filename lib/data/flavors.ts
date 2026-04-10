
export type Flavor = {
  id: string; name: string; nameAr: string;
  img: string; desc: string; descAr: string;
};

export const flavors: Flavor[] = [
  { 
    id: "original",
    name: "Monster Energy 16oz",
    nameAr: "مونستر إنرجي 16 أوقية",
    img: "/assets/flavors/original.webp",
    desc: "Flavor: Sweet And Salty Citrus - Monster Energy packs a powerful punch with an Energy Drink that delivers a smooth, easy-drinking flavor.",
    descAr: "النكهة: حمضية حلوة ومالحة - مونستر إنرجي يمنحك طاقة قوية مع مشروب طاقة يوفر نكهة سلسة وسهلة الشرب."
  },
  { 
    id: "zero",
    name: "Monster Energy Ultra, Blue Hawaiian, Sugar...",
    nameAr: "مونستر ألترا، بلو هاواي، بدون سكر...",
    img: "/assets/flavors/zero.webp",
    desc: "Monster Ultra Blue Hawaiian – zero sugar, tropical flavor.",
    descAr: "مونستر ألترا بلو هاواي – بدون سكر، نكهة استوائية."
  },
  { 
    id: "juice",
    name: "Monster Energy Ultra, Vice Guava, Sugar Free...",
    nameAr: "مونستر ألترا، فايس جوافا، بدون سكر...",
    img: "/assets/flavors/juice.webp",
    desc: "Monster Ultra Vice Guava – a refreshing zero-sugar tropical blend.",
    descAr: "مونستر ألترا فايس جوافا – مزيج استوائي منعش بدون سكر."
  },
  {
    id: "top",
    name: "Monster Energy Zero Ultra 16oz",
    nameAr: "مونستر إنرجي زيرو ألترا 16 أوقية",
    img: "/assets/flavors/top.webp",
    desc: "Monster Zero Ultra – crisp, citrus-infused, zero sugar energy.",
    descAr: "مونستر زيرو ألترا – طاقة خفيفة بنكهة حمضيات بدون سكر."
  },
  {
    id: "coffee",
    name: "Monster Energy Ultra, Strawberry Dreams, Sugar...",
    nameAr: "مونستر ألترا، أحلام الفراولة، بدون سكر...",
    img: "/assets/flavors/coffee.webp",
    desc: "Monster Ultra Strawberry Dreams – dreamy, zero-sugar strawberry energy.",
    descAr: "مونستر ألترا أحلام الفراولة – طاقة فراولة حالمة بدون سكر."
  },
];

export const flavorItems = [
  { 
    img: "/assets/flavors/original.webp",
    nameKey: "monsterEnergy",
    subKey: "original",
    color: "#78be20",
    bg: "bg-monster-texture"
  },
  { 
    img: "/assets/flavors/zero.webp",
    nameKey: "monsterUltra",
    subKey: "zeroSugar",
    color: "#cccccc",
    bg: "bg-ultra-texture"
  },
  { 
    img: "/assets/flavors/coffee.webp",
    nameKey: "monsterCoffee",
    subKey: "coffeeEnergy",
    color: "#c8a03c",
    bg: "bg-coffee-texture"
  },
  { 
    img: "/assets/flavors/juice.webp",
    nameKey: "juiceMonster",
    subKey: "juiceEnergy",
    color: "#1dc8f0",
    bg: "bg-juice-texture"
  },
  { 
    img: "/assets/flavors/tea.webp",
    nameKey: "rehabMonster",
    subKey: "teaEnergy",
    color: "#f0c200",
    bg: "bg-rehab-texture"
  },
  { 
    img: "/assets/flavors/top.webp",
    nameKey: "fanFavorites",
    subKey: "topFlavors",
    color: "#78be20",
    bg: "bg-top-texture"
  },
] as const;