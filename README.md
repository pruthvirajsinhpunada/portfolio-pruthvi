# Pruthvirajsinh Punada — Portfolio

Interactive developer portfolio. Particle-text hero with cursor physics,
bento-grid project showcase with FLIP-animated detail view, 3D tech stack
with Rapier physics, and a site-wide ambient layer with drifting orbs and
canvas particles.

**Live:** https://portfolio-pruthvi-rosy.vercel.app

## Stack

- **Frontend:** React 18 + TypeScript + Vite
- **3D / animation:** Three.js, React Three Fiber, drei, @react-three/rapier, @react-three/postprocessing
- **Scroll & motion:** GSAP, ScrollTrigger, Lenis
- **Deploy:** Vercel

## Sections

- **Particle Hero** — name rendered as GPU particles sampled from canvas, cursor repulsion with spring-back physics, tech logos floating behind with depth blur
- **About** — profile photo with accent glow + bio
- **What I Do** — three 3D flip cards covering iOS & SwiftUI, Spatial & visionOS, On-Device AI
- **Career Timeline** — scroll-scrubbed timeline with glowing dot
- **My Work** — bento grid of 7 shipped projects; click expands the source card into a cinematic detail modal via a FLIP-style transition
- **My Tech Stack** — 42 floating physics-simulated balls with 28 unique textures (Apple platforms, project tech, and this site's stack)
- **Contact** — three-column layout with magnetic social icons

## Local development

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

