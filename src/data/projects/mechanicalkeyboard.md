---
title: "Mechanical Keyboard: Interactive Simulator"
description: "A browser-based mechanical keyboard with real switch sounds, several keycap colorways, haptics on mobile, and a volume slider. Built with React and the HTML5 Audio Context API."
image: "/projects/keyui.avif"
technologies:
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Lucide Icons
  - Web Haptics API
  - HTML5 Audio Context
github: "https://github.com/sahilcodexx/MechanicalKeyboard"
live: "https://keyui.vercel.app/"
timeline: "2 Weeks"
role: "Frontend & Audio Engineer"
team: "Solo"
status: "Completed"
featured: true
challenges:
  - Low-Latency Sound Mapping with HTML5 Audio Context
  - High-Fidelity Responsive Keyboard Grid Layout
  - Mobile Vibration and Tactile Haptics Syncing
learnings:
  - Audio Buffering & Prefetching in React
  - Web Haptics integration for mobile tactile feeling
  - Handling simultaneous hardware and touch events
---

# Mechanical Keyboard Simulator

An interactive, high-fidelity mechanical keyboard simulator built with React, TypeScript, and Tailwind CSS. The app lets users explore different mechanical switch sounds (clicky, tactile, linear), swap keycap colorways, and get a tactile experience directly in the browser.

I built it because I couldn’t decide between keycap sets without hearing the switches, and there wasn’t a single tool that did both.

---

## Key features

- **Interactive virtual layout.** A fully interactive, responsive QWERTY layout matching standard 60%/65% mechanical keyboards.
- **Realistic audio engine.** Uses the HTML5 Audio Context to pre-decode and stream switch clacks, minimizing trigger latency.
- **Aesthetic keycap themes.** Swap between multiple colorways: Classic, Mint, Royal, Dolch, Sand, Scarlet.
- **Tactile haptic feedback.** Uses `web-haptics` to deliver vibration on compatible mobile browsers.
- **Dual input mapping.** Highlights virtual keycaps on physical keyboard keydown events while supporting touch and click.

---

## Tech stack and architecture

- **Core.** React 19, TypeScript, Vite.
- **Audio engine.** HTML5 AudioContext, Web Audio API buffers.
- **Styling.** Tailwind CSS (utility classes, flex/grid layouts, responsive scaling).
- **Haptics.** Native Vibration API with fallback wrappers.
- **Icons.** Lucide React.
