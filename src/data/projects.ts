export interface Project {
  title: string;
  category: string;
  tools: string;
  description: string;
  image: string;
  link: string;
  appStoreLink?: string;
}

export const projects: Project[] = [
  {
    title: "PinballVision",
    category: "visionOS · Spatial Game",
    tools: "Swift, RealityKit, visionOS, Spatial Audio, Game Center",
    description:
      "A fully spatial pinball game for Apple Vision Pro. Built a custom Blender → USDZ → RealityKit pipeline with physics, spatial audio, and Game Center leaderboards.",
    image: "/images/projects/pinballvision.webp",
    link: "https://github.com/pruthvirajsinhpunada/PinballVision",
  },
  {
    title: "SignBridge",
    category: "Accessibility AI · Swift Student Challenge 2026",
    tools: "Swift, CoreML, Vision Framework, SpriteKit, AVFoundation",
    description:
      "An on-device sign-language interpreter using CoreML and the Vision framework to make communication more accessible. My Swift Student Challenge 2026 submission.",
    image: "/images/projects/signbridge.webp",
    link: "https://github.com/pruthvirajsinhpunada/signbridge",
  },
  {
    title: "ShiftBook",
    category: "iOS · Restaurant Shift Management",
    tools: "SwiftUI, Firebase Auth, Firestore, FCM, Cloud Functions",
    description:
      "A shift-management iOS app for restaurant teams. SwiftUI front end, Firebase back end with push notifications and Cloud Functions for scheduling logic.",
    image: "/images/projects/shiftbook.webp",
    link: "https://github.com/pruthvirajsinhpunada/ShiftBook",
    appStoreLink: "https://apps.apple.com/app/shiftbook", // TODO: paste real App Store URL
  },
  {
    title: "BetterFinder",
    category: "macOS · Open Source Contribution",
    tools: "Swift, SwiftUI, Smart Rename Module, 14 Unit Tests",
    description:
      "Open-source contribution to BetterFinder — designed and shipped a Smart Rename module in SwiftUI backed by 14 unit tests.",
    image: "/images/projects/betterfinder.webp",
    link: "https://github.com/Hardin22/BetterFinder",
  },
  {
    title: "Inshorts Italia",
    category: "iOS · Published on App Store",
    tools: "SwiftUI, Async Networking, RSS / JSON / XML Parsing",
    description:
      "An Italian-language short-news reader, published on the App Store. SwiftUI interface with async networking and multi-format feed parsing.",
    image: "/images/projects/inshorts.webp",
    link: "https://github.com/pruthvirajsinhpunada/InShorts-News-App",
    appStoreLink: "https://apps.apple.com/app/inshorts-italia", // TODO: paste real App Store URL
  },
  {
    title: "Supply Chain Optimization",
    category: "Data Science · MLOps",
    tools: "Python, SQL, dbt, Docker, LP Optimization, Mesa ABM",
    description:
      "End-to-end supply-chain optimization pipeline — dbt models, LP optimization and an agent-based Mesa simulation, containerized with Docker.",
    image: "/images/projects/supplychain.webp",
    link: "https://github.com/pruthvirajsinhpunada/supply-chain-optimization",
  },
  {
    title: "CityCircle",
    category: "iOS · Social App",
    tools: "SwiftUI, Firebase, MapKit, Real-time Messaging",
    description:
      "A location-aware social iOS app. SwiftUI + MapKit for discovery, Firebase for auth, storage, and real-time messaging.",
    image: "/images/projects/citycircle.webp",
    link: "https://github.com/pruthvirajsinhpunada/CityCircle",
  },
];
