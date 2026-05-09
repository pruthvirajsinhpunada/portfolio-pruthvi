export interface CaseStudy {
  problem: string;
  approach: string;
  outcome: string;
  techNotes?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  status: "live" | "shipped" | "in-development";
  tools: string;
  summary: string;
  description: string;
  image: string;
  hero: string;
  monolith: string;
  gallery: string[];
  liveUrl?: string;
  link: string;
  appStoreLink?: string;
  accent: string;
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "pizzart-caserta",
    title: "Pizz'Art Caserta",
    category: "Web · Restaurant Brand",
    year: "2026",
    role: "Design + build · Solo",
    status: "live",
    tools: "Next.js, Tailwind, Vercel, Resend, Cloudflare",
    summary: "Pizzeria d'autore in Corso Trieste, online.",
    description:
      "Production website for Pizz'Art Caserta — a signature pizzeria in Corso Trieste, Caserta. Designed and shipped end-to-end: bilingual content, reservation flow with email confirmations, Cloudflare-fronted Vercel deploy. Real customers, real reservations.",
    image: "/images/projects/pizzart-caserta/hero.webp",
    hero: "/images/projects/pizzart-caserta/hero.webp",
    monolith: "/images/projects/pizzart-caserta/monolith.webp",
    gallery: [
      "/images/projects/pizzart-caserta/gallery/01-home.webp",
      "/images/projects/pizzart-caserta/gallery/02-menu.webp",
      "/images/projects/pizzart-caserta/gallery/03-contatti.webp",
      "/images/projects/pizzart-caserta/gallery/04-prenota.webp",
      "/images/projects/pizzart-caserta/gallery/05-home-mobile.webp",
      "/images/projects/pizzart-caserta/gallery/06-menu-mobile.webp",
    ],
    liveUrl: "https://pizzartcaserta.it",
    link: "https://pizzartcaserta.it",
    accent: "#ff8a3d",
    caseStudy: {
      problem:
        "A signature pizzeria with a strong in-person identity and zero web presence. Customers couldn't see the menu, book a table, or find opening hours without calling. The brand needed an online surface that read as carefully as the food is plated.",
      approach:
        "Designed a single, focused site around three jobs — read the menu, book a table, get in touch — rather than a generic restaurant template. Wrote the copy in formal Italian (Lei form), built a reservation flow with Resend-backed email pipeline so the owner gets every booking immediately, and wired a Cloudflare front so robots/redirects can be tweaked without redeploying.",
      outcome:
        "Live at pizzartcaserta.it, taking real reservations daily. Owner approved on first review and the site became the de-facto contact channel — phone bookings dropped, online bookings ramped. Shipped as a paid client engagement.",
      techNotes:
        "Next.js App Router on Vercel, Cloudflare in front for caching + robots overrides. Resend + Gmail for the reservation email pipeline. Italian copy uses Lei (Sua/Le/contatti) throughout — never tu — to match the brand register.",
    },
  },
  {
    slug: "pinball-vision",
    title: "PinballVision",
    category: "visionOS · Spatial Game",
    year: "2026",
    role: "Solo dev",
    status: "in-development",
    tools: "Swift, RealityKit, visionOS, Spatial Audio, Game Center",
    summary: "Spatial pinball for Apple Vision Pro.",
    description:
      "A fully spatial pinball game for Apple Vision Pro. Built a custom Blender → USDZ → RealityKit pipeline with physics, spatial audio, and Game Center leaderboards.",
    image: "/images/projects/pinball-vision/hero.webp",
    hero: "/images/projects/pinball-vision/hero.webp",
    monolith: "/images/projects/pinball-vision/monolith.webp",
    gallery: [],
    link: "https://github.com/pruthvirajsinhpunada/PinballVision",
    accent: "#c14dff",
    caseStudy: {
      problem:
        "Pinball is a tactile, physics-driven game — translating it to a headset means re-thinking input, scale, and audio cues without losing the kinetic feel.",
      approach:
        "Authored the table in Blender, exported to USDZ, drove physics + collisions in RealityKit, and used spatial audio so the ball is locatable by ear alone. Game Center wired in for leaderboards.",
      outcome:
        "Working spatial prototype with full physics, spatial audio, and leaderboard plumbing. Active development.",
    },
  },
  {
    slug: "signbridge",
    title: "SignBridge",
    category: "Accessibility AI · Swift Student Challenge 2026",
    year: "2026",
    role: "Solo · WWDC submission",
    status: "shipped",
    tools: "Swift, CoreML, Vision Framework, SpriteKit, AVFoundation",
    summary: "On-device sign language interpreter.",
    description:
      "An on-device sign-language interpreter using CoreML and the Vision framework to make communication more accessible. My Swift Student Challenge 2026 submission.",
    image: "/images/projects/signbridge/hero.webp",
    hero: "/images/projects/signbridge/hero.webp",
    monolith: "/images/projects/signbridge/monolith.webp",
    gallery: [],
    link: "https://github.com/pruthvirajsinhpunada/signbridge",
    accent: "#4ea0ff",
    caseStudy: {
      problem:
        "Real-time sign-language recognition typically requires server round-trips, which kills both privacy and latency for the use case (live conversation).",
      approach:
        "Pose-estimation via Vision, classification via a CoreML model, all on-device. SpriteKit for the playful tutorial layer, AVFoundation for camera plumbing.",
      outcome:
        "Submitted to Swift Student Challenge 2026; runs at interactive frame rates on a stock iPhone with no network.",
    },
  },
  {
    slug: "shiftbook",
    title: "ShiftBook",
    category: "iOS · Restaurant Shift Management",
    year: "2025",
    role: "Solo",
    status: "shipped",
    tools: "SwiftUI, Firebase Auth, Firestore, FCM, Cloud Functions",
    summary: "Shift management for restaurant teams.",
    description:
      "A shift-management iOS app for restaurant teams. SwiftUI front end, Firebase back end with push notifications and Cloud Functions for scheduling logic.",
    image: "/images/projects/shiftbook/hero.webp",
    hero: "/images/projects/shiftbook/hero.webp",
    monolith: "/images/projects/shiftbook/monolith.webp",
    gallery: [],
    link: "https://github.com/pruthvirajsinhpunada/ShiftBook",
    appStoreLink: "https://apps.apple.com/app/shiftbook",
    accent: "#39d29a",
    caseStudy: {
      problem:
        "Restaurant shift schedules live in WhatsApp groups and printouts. Swaps get missed. Nobody has a single source of truth.",
      approach:
        "SwiftUI + Firebase. Firestore for the schedule, FCM for push, Cloud Functions for shift-swap logic and conflict checks. Built with the actual restaurant team in the loop.",
      outcome:
        "Live in TestFlight with a real team using it weekly. The push-notification + swap flow replaced the WhatsApp chaos.",
    },
  },
  {
    slug: "betterfinder",
    title: "BetterFinder",
    category: "macOS · Open Source Contribution",
    year: "2025",
    role: "Open-source contributor",
    status: "shipped",
    tools: "Swift, SwiftUI, AppKit, Smart Rename Module, 14 Unit Tests",
    summary: "Power-user Finder replacement, contributor.",
    description:
      "Open-source contribution to BetterFinder — designed and shipped a Smart Rename module in SwiftUI backed by 14 unit tests.",
    image: "/images/projects/betterfinder/hero.webp",
    hero: "/images/projects/betterfinder/hero.webp",
    monolith: "/images/projects/betterfinder/monolith.webp",
    gallery: [],
    link: "https://github.com/Hardin22/BetterFinder",
    accent: "#7d8cff",
    caseStudy: {
      problem:
        "Renaming dozens of files in Finder is a one-by-one slog. The community fork BetterFinder needed a Smart Rename module that didn't feel grafted on.",
      approach:
        "SwiftUI-first module with live preview of the rename pattern, undo support, and 14 unit tests covering the token engine.",
      outcome:
        "Merged into BetterFinder and shipped to all users; the rename UI is now part of the standard release.",
    },
  },
  {
    slug: "inshorts-italia",
    title: "Inshorts Italia",
    category: "iOS · Published on App Store",
    year: "2024",
    role: "Solo",
    status: "shipped",
    tools: "SwiftUI, Async Networking, RSS / JSON / XML Parsing",
    summary: "Italian short-news reader, on the App Store.",
    description:
      "An Italian-language short-news reader, published on the App Store. SwiftUI interface with async networking and multi-format feed parsing.",
    image: "/images/projects/inshorts-italia/hero.webp",
    hero: "/images/projects/inshorts-italia/hero.webp",
    monolith: "/images/projects/inshorts-italia/monolith.webp",
    gallery: [],
    link: "https://github.com/pruthvirajsinhpunada/InShorts-News-App",
    appStoreLink: "https://apps.apple.com/app/inshorts-italia",
    accent: "#ffb84a",
    caseStudy: {
      problem:
        "Italian news apps are heavy and ad-laden. I wanted a clean, glanceable short-news reader that just lets you skim the day.",
      approach:
        "SwiftUI feed, async networking, parsers for RSS/JSON/XML so any Italian source can be plugged in. No tracking, no autoplay.",
      outcome:
        "Published on the App Store, used daily by a small but real audience.",
    },
  },
  {
    slug: "supply-chain-optimization",
    title: "Supply Chain Optimization",
    category: "Data Science · MLOps",
    year: "2024",
    role: "Solo",
    status: "shipped",
    tools: "Python, SQL, dbt, Docker, LP Optimization, Mesa ABM",
    summary: "End-to-end supply-chain pipeline.",
    description:
      "End-to-end supply-chain optimization pipeline — dbt models, LP optimization and an agent-based Mesa simulation, containerized with Docker.",
    image: "/images/projects/supply-chain-optimization/hero.webp",
    hero: "/images/projects/supply-chain-optimization/hero.webp",
    monolith: "/images/projects/supply-chain-optimization/monolith.webp",
    gallery: [
      "/images/projects/supply-chain-optimization/gallery/01.webp",
      "/images/projects/supply-chain-optimization/gallery/02.webp",
    ],
    link: "https://github.com/pruthvirajsinhpunada/supply-chain-optimization",
    accent: "#3ad6c5",
    caseStudy: {
      problem:
        "Classroom supply-chain LP problems are toy-sized. I wanted to build the whole loop — ingest → transform → optimize → simulate — the way a real team would.",
      approach:
        "dbt models on top of a synthetic warehouse dataset; LP solver for the cost-minimizing routing; Mesa agent-based simulation to stress-test the LP solution under stochastic demand. All Dockerized.",
      outcome:
        "Reproducible pipeline from raw CSVs to charts. Used as a portfolio piece for the data-science track.",
    },
  },
  {
    slug: "citycircle",
    title: "CityCircle",
    category: "iOS · Social App",
    year: "2024",
    role: "Solo",
    status: "shipped",
    tools: "SwiftUI, Firebase, MapKit, Real-time Messaging",
    summary: "Location-aware social discovery.",
    description:
      "A location-aware social iOS app. SwiftUI + MapKit for discovery, Firebase for auth, storage, and real-time messaging.",
    image: "/images/projects/citycircle/hero.webp",
    hero: "/images/projects/citycircle/hero.webp",
    monolith: "/images/projects/citycircle/monolith.webp",
    gallery: [],
    link: "https://github.com/pruthvirajsinhpunada/CityCircle",
    accent: "#ff5d8f",
    caseStudy: {
      problem:
        "Meeting people in a new city is hard if the only options are dating apps or Meetup. CityCircle is a smaller-radius, interest-based discovery loop.",
      approach:
        "SwiftUI + MapKit for the discovery surface, Firebase for auth/storage and real-time chat. Built around proximity rather than swiping.",
      outcome:
        "Working iOS build with map discovery, profiles, and real-time messaging end-to-end.",
    },
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
