---
title: "Bookmrk: Privacy-First Bookmark Manager"
description: "A Chrome extension and web dashboard for managing bookmarks. Everything is stored locally in IndexedDB, no server, no account. Boards, Cmd-K search, keyboard shortcuts."
image: "/projects/bookmrkit.avif"
technologies:
  - React / Next.js
  - TypeScript
  - Tailwind CSS
  - Chrome Extension API
  - LocalStorage / IndexedDB
  - CMD K Command Palette
github: "https://github.com/sahilcodexx/Bookmrk"
live: "https://bookmrkit.vercel.app/"
timeline: "Active Development"
role: "Lead Developer"
team: "Solo"
status: "Building"
featured: true
challenges:
  - Designing a highly-performant local search across thousands of bookmarks
  - Integrating smoothly with browser native bookmark storage structures
  - Providing a keyboard-first user experience using visual hotkeys
learnings:
  - Modern Chrome Extension structure & service worker communication
  - Local-first architecture and instant data sync
  - Building robust command palettes & board configurations
---

# Bookmrk (Bookmark Manager)

A keyboard-first, local-first bookmark manager and tab organizer. Built with React, TypeScript, Next.js, and Tailwind CSS. Designed to help developers and power users organize, explore, and access their bookmarks instantly without leaving the keyboard.

I built it because I had four thousand bookmarks across three browsers and no way to find any of them.

---

## Key features

- **Keyboard-first navigation.** Open boards, switch tabs, search bookmarks, and edit links using shortcuts and a Cmd-K command palette.
- **Visual board workspaces.** Group bookmarks in clean visual cards and grids, with workspaces for different projects, clients, or topics.
- **Local-first architecture.** Bookmarks are stored locally in IndexedDB and LocalStorage for instant loads and zero server round-trips.
- **Smart tagging and search.** Customizable labels, tags, and fuzzy search to retrieve links in milliseconds.
- **Chrome extension sync.** One click to save tabs or links from the companion Chrome extension.

---

## Tech stack and architecture

- **Frontend.** Next.js, React, TypeScript, Tailwind CSS.
- **Storage.** LocalStorage and IndexedDB.
- **Components.** Custom Cmd-K command bar, visual card grids, custom modal systems.
- **Design philosophy.** Minimalist layout, dark mode, high-contrast focus states.
