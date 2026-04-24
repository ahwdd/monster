// src/utils/data/navLinks.ts
export const navLinks = [
  { labelKey: "nav.program",     href: "/program"     },
  { labelKey: "nav.news",        href: "/news"        },
  { labelKey: "nav.leaderboard", href: "/leaderboard" },
] as const;

export const rankLinks = [
  {
    href:     "/ranks#rookie",
    labelKey: "nav.rookie",
    subKey:   "nav.rookieReach",
    img:      "/assets/program/monster-hall1.png",
    bg:       "bg-monster-texture",
    color:    "#78be20",
  },
  {
    href:     "/ranks#rising",
    labelKey: "nav.rising",
    subKey:   "nav.risingReach",
    img:      "/assets/program/monster-hall2.png",
    bg:       "bg-juice-texture",
    color:    "#a3e635",
  },
  {
    href:     "/ranks#cold",
    labelKey: "nav.cold",
    subKey:   "nav.coldReach",
    img:      "/assets/program/monster-hall3.png",
    bg:       "bg-ultra-texture",
    color:    "#38bdf8",
  },
] as const;

export const footerLinks = [
  {
    titleKey: "footer.program",
    links: [
      { labelKey: "nav.overview",      href: "/#overview"     },
      { labelKey: "nav.levels",        href: "/#levels"     },
      { labelKey: "nav.rewards",       href: "/#rewards"       },
      { labelKey: "nav.leaderboard",   href: "/#leaderboard" },
    ],
  },
  {
    titleKey: "footer.join",
    links: [
      { labelKey: "nav.register",  href: "/submissions/register" },
      { labelKey: "nav.submit",    href: "/submissions/submit"   },
      { labelKey: "nav.myProfile", href: "/auth/profile"         },
    ],
  },
] as const;