const BASE = "https://ntt-startupchallenge.com";

export const LIST_NAVBAR = [
  { title: "Home", url: `${BASE}/` },
  {
    title: "Why Attend",
    url: `${BASE}/why-attend`,
    opt: [
      { title: "Startup", url: `${BASE}/why-attend#startup` },
      { title: "Investor", url: `${BASE}/why-attend#investor` },
      { title: "Media", url: `${BASE}/why-attend#media` },
      { title: "Partners", url: `${BASE}/why-attend#partners` },
    ],
  },
  {
    title: "Agenda",
    url: `${BASE}/agenda`,
    opt: [
      { title: "Program", url: `${BASE}/agenda#program` },
      { title: "Partner", url: `${BASE}/agenda#partner` },
      { title: "NTT Connect", url: `${BASE}/agenda#ntt-connect` },
      { title: "FAQ", url: `${BASE}/agenda#faq` },
    ],
  },
  {
    title: "About NTT",
    url: `${BASE}/about`,
    opt: [
      { title: "Group", url: `${BASE}/about#group` },
      { title: "Numbers", url: `${BASE}/about#number` },
      { title: "Open Innovation", url: `${BASE}/about#innovation` },
      { title: "NTTSC Team", url: `${BASE}/team` },
    ],
  },
  {
    title: "Previous Program",
    url: `${BASE}/`,
    positionSideLeft: true,
    opt: [
      { title: "NTTSC 2024", url: `${BASE}/nsc-2024` },
      { title: "NTTSC 2025", url: `${BASE}/nsc-2025` },
      { title: "Infographics", url: `${BASE}/infographics` },
    ],
  },
];
