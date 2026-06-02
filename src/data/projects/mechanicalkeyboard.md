---
title: "Mechanical Keyboard | Interactive Simulator"
description: "An interactive, highly realistic mechanical keyboard simulator built with React, TypeScript, and Tailwind CSS. Features realistic audio feedback, multiple keycap themes, and web haptics."
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

An interactive, high-fidelity mechanical keyboard simulator developed with React, TypeScript, and Tailwind CSS. This application allows users to explore different mechanical switch sounds (clicky, tactile, linear), swap keycap colorways, and enjoy a rich, responsive tactile experience directly in their web browser.

---

## Key Features

*   **Interactive Virtual Layout:** A fully interactive, responsive QWERTY layout matching standard 60%/65% mechanical keyboards.
*   **Realistic Audio Engine:** Leveraging the **HTML5 Audio Context** to pre-decode and stream high-quality switch clacks, minimizing trigger latency.
*   **Aesthetic Keycap Themes:** Instantly swap between multiple custom premium colorways (Classic, Mint, Royal, Dolch, Sand, Scarlet).
*   **Tactile Haptic Feedback:** Integration of `web-haptics` to deliver subtle vibration feedback on compatible mobile browsers.
*   **Dual Input Mapping:** Automatically highlights virtual keycaps on physical keyboard keydown events while supporting smooth touch-and-click actions.

---

## Tech Stack & Architecture

*   **Core:** React 19, TypeScript, Vite.
*   **Audio Engine:** HTML5 AudioContext, Web Audio API buffers.
*   **Styling:** Tailwind CSS (utility classes, flex/grid layouts, responsive scaling).
*   **Haptics:** Native Vibration API with fallback wrappers.
*   **Icons:** Lucide React.
