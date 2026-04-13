// Centralized SVG icon library — no emojis, no third-party icon deps
// Each icon returns a React SVG element. Size prop accepts Tailwind w-* values or px strings.

const defaults = { width: 20, height: 20, strokeWidth: 1.7 }

const Svg = ({ size = 20, children, className = '', ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={defaults.strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...rest}
  >
    {children}
  </svg>
)

export const IconHome = (p) => <Svg {...p}><path d="M3 12L12 3l9 9"/><path d="M9 21V12h6v9"/><path d="M3 12v9h18V12"/></Svg>
export const IconBarChart = (p) => <Svg {...p}><rect x="3" y="13" width="4" height="8"/><rect x="10" y="8" width="4" height="13"/><rect x="17" y="3" width="4" height="18"/></Svg>
export const IconTarget = (p) => <Svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Svg>
export const IconSword = (p) => <Svg {...p}><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M2 2l20 20"/></Svg>
export const IconList = (p) => <Svg {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Svg>
export const IconUser = (p) => <Svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></Svg>
export const IconBell = (p) => <Svg {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Svg>
export const IconTrendingUp = (p) => <Svg {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></Svg>
export const IconTrendingDown = (p) => <Svg {...p}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></Svg>
export const IconArrowRight = (p) => <Svg {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Svg>
export const IconArrowLeft = (p) => <Svg {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></Svg>
export const IconChevronRight = (p) => <Svg {...p}><polyline points="9 18 15 12 9 6"/></Svg>
export const IconPlus = (p) => <Svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>
export const IconCheck = (p) => <Svg {...p}><polyline points="20 6 9 17 4 12"/></Svg>
export const IconX = (p) => <Svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>
export const IconEye = (p) => <Svg {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Svg>
export const IconEyeOff = (p) => <Svg {...p}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></Svg>
export const IconStar = (p) => <Svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Svg>
export const IconZap = (p) => <Svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Svg>
export const IconShield = (p) => <Svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Svg>
export const IconCoin = (p) => <Svg {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v2"/><path d="M12 16v2"/><path d="M9.5 9.5A2.5 2.5 0 0 1 12 8c1.4 0 2.5.9 2.5 2s-.8 2-2.5 2-2.5.9-2.5 2 1.1 2 2.5 2a2.5 2.5 0 0 0 2.5-1.5"/></Svg>
export const IconFire = (p) => <Svg {...p}><path d="M12 2c0 0-5 5-5 10a5 5 0 0 0 10 0C17 7 12 2 12 2z"/><path d="M12 12c0 0-2 2-2 4a2 2 0 0 0 4 0c0-2-2-4-2-4z"/></Svg>
export const IconAward = (p) => <Svg {...p}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></Svg>
export const IconSearch = (p) => <Svg {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Svg>
export const IconFilter = (p) => <Svg {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Svg>
export const IconSettings = (p) => <Svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Svg>
export const IconLogOut = (p) => <Svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Svg>
export const IconCreditCard = (p) => <Svg {...p}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></Svg>
export const IconPiggyBank = (p) => <Svg {...p}><path d="M19 8a2 2 0 0 0-2-2h-1.5A4.5 4.5 0 0 0 7 9.5V10H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1l1 4h2l.5-2h5l.5 2h2l1-4h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1"/><circle cx="9" cy="10" r="1"/><path d="M18 8V6"/></Svg>
export const IconActivity = (p) => <Svg {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Svg>
export const IconBook = (p) => <Svg {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></Svg>
export const IconShoppingBag = (p) => <Svg {...p}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></Svg>
export const IconMusic = (p) => <Svg {...p}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></Svg>
export const IconBus = (p) => <Svg {...p}><rect x="2" y="3" width="20" height="16" rx="2"/><path d="M2 10h20"/><path d="M7 19v2M17 19v2"/><circle cx="7" cy="14" r="1"/><circle cx="17" cy="14" r="1"/></Svg>
export const IconBriefcase = (p) => <Svg {...p}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></Svg>
export const IconGift = (p) => <Svg {...p}><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></Svg>
export const IconMonitor = (p) => <Svg {...p}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></Svg>
export const IconCar = (p) => <Svg {...p}><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11l4 4v4a2 2 0 0 1-2 2h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></Svg>
export const IconPlane = (p) => <Svg {...p}><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 21 4s-2 0-3.5 1.5L14 9 5.8 7.2"/><path d="M5.8 7.2L4 10l5.5 1.5L8 14l-2 1 1 3 3-1 1-2 1.5 5.5 3-1.8L12.8 12"/></Svg>
