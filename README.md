# Portfolio

> A modern, interactive portfolio website for a Full Stack Developer built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**. Showcases projects, blog posts, work experience, and skills with smooth animations and a clean design.

---

## Features

- **Theme Support** — Dark and light mode with system preference detection, persisted in local storage
- **Smooth Animations** — Fluid transitions using Motion (Framer Motion v12) for UI elements
- **Responsive Design** — Mobile-first approach ensuring perfect display on all devices
- **Blog System** — Technical articles rendered from markdown with syntax highlighting using react-markdown, remark-gfm, and rehype-highlight
- **Project Showcase** — Detailed project pages with live demo links, GitHub repositories, technology stacks, and project timelines
- **Contact Form** — Fully functional form with Zod validation, integrated with Appwrite backend for message storage
- **SEO Optimized** — Native Next.js Metadata API for automatic meta tags, Open Graph, and sitemap generation
- **Spotify Integration** — Live "Now Playing" widget via Spotify API with Appwrite caching
- **GitHub Activity** — GitHub contribution calendar integration
- **Toast Notifications** — User feedback with Sonner for success/error messages
- **Auto Sitemap** — Dynamically generated `sitemap.xml` and `robots.txt` via Next.js route handlers
- **Server Components** — Leverages Next.js App Router and React Server Components for optimal performance

---

## Tech Stack

| Category          | Technologies                                               |
| ----------------- | ---------------------------------------------------------- |
| **Framework**     | Next.js 15 (App Router), React 19                         |
| **Language**      | TypeScript                                                |
| **Styling**       | Tailwind CSS v4, @tailwindcss/postcss                     |
| **Animations**    | Motion (Framer Motion v12)                                |
| **Forms**         | React Hook Form, Zod v4, @hookform/resolvers              |
| **Backend**       | Appwrite, node-appwrite (server-side)                     |
| **Markdown**      | react-markdown, remark-gfm, rehype-highlight, gray-matter |
| **Icons**         | Lucide React, Custom SVG components                       |
| **Analytics**     | Vercel Analytics                                          |
| **Utilities**     | clsx, tailwind-merge, class-variance-authority            |
| **UI Primitives** | Radix UI, shadcn/ui                                       |

---

## Project Structure

```
.
├── app/                          # Next.js App Router (pages & API routes)
│   ├── layout.tsx               # Root layout (fonts, providers, analytics)
│   ├── page.tsx                 # Homepage
│   ├── sitemap.ts               # Dynamic sitemap generation
│   ├── robots.ts                # robots.txt generation
│   │
│   ├── blogs/
│   │   ├── page.tsx             # All blogs listing page
│   │   └── [slug]/page.tsx      # Individual blog post (dynamic route)
│   │
│   ├── projects/
│   │   ├── page.tsx             # All projects listing page
│   │   └── [slug]/page.tsx      # Individual project page (dynamic route)
│   │
│   ├── work/page.tsx            # Work experience page
│   ├── contact/page.tsx         # Contact page
│   ├── gear/page.tsx            # Equipment/tools showcase
│   ├── resume/page.tsx          # Resume viewer
│   ├── bookmarks/page.tsx       # Bookmarks page
│   │
│   └── api/
│       └── spotify/             # Spotify Now Playing API route
│
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── common/              # Shared components (Navbar, Footer, etc.)
│   │   ├── landing/             # Homepage sections (Hero, Bio, Skills, etc.)
│   │   ├── layouts/             # Layout wrappers (Container, etc.)
│   │   ├── blog/                # Blog-specific components
│   │   ├── projects/            # Project-specific components
│   │   ├── contact/             # Contact form components
│   │   ├── experience/          # Work experience components
│   │   ├── gear/                # Gear page components
│   │   ├── bookmarks/           # Bookmarks components
│   │   ├── icons/               # SVG icon components
│   │   │   ├── tech/            # 30+ technology icons
│   │   │   └── social/          # Social media icons
│   │   └── ui/                  # shadcn/ui base components
│   │
│   ├── config/                  # Static configuration & data
│   │   ├── projects/            # Project card data
│   │   ├── blog/                # Blog card data
│   │   ├── resume.js            # Resume URL config
│   │   ├── Quote.js             # Random quotes
│   │   ├── Footer.js            # Footer config
│   │   └── Gear.jsx             # Gear/equipment data
│   │
│   ├── data/                    # Static markdown content
│   │   ├── projects/            # Project detail pages (.md)
│   │   └── blogs/               # Blog posts (.md)
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── appwrite.js          # Appwrite client config
│   │   ├── techIcons.js         # Tech icon exports
│   │   └── utils.js             # Utility functions (cn helper)
│   │
│   ├── api/                     # Server-side API helpers
│   ├── hooks/                   # Custom React hooks
│   └── index.css                # Global styles & Tailwind imports
│
├── public/                      # Static assets
├── next.config.mjs              # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── postcss.config.js            # PostCSS configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or higher
- **npm**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd sahilcodex
```

2. **Install dependencies**

```bash
npm install
# or
bun install
```

3. **Set up environment variables**

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

```env
# Appwrite
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
NEXT_PUBLIC_APPWRITE_TABLE_ID=your_appwrite_table_id
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=your_project_name
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-endpoint.appwrite.io/v1

# GitHub
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here

# Spotify (server-side only)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# Discord / Spotify Cache
NEXT_PUBLIC_DISCORD_ID=your_discord_id
NEXT_PUBLIC_APPWRITE_SPOTIFY_COLLECTION_ID=spotify
```

> **Note:** The contact form requires Appwrite. Spotify and GitHub integrations are optional — the app gracefully handles missing credentials.

4. **Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

## Available Scripts

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Start Next.js development server with HMR |
| `npm run build` | Create an optimized production build      |
| `npm run start` | Start the production server               |
| `npm run lint`  | Run ESLint for code quality checks        |

---

## Configuration

### Adding a New Project

1. Create a markdown file in `src/data/projects/`:

```markdown
---
title: "Project Name"
description: "Short description"
image: "/projects/project-image.jpg"
technologies: ["Next.js", "TypeScript", "MongoDB"]
timeline: "2 months"
role: "Full Stack Developer"
status: "completed"
statusVariant: "default"
live: "https://project-demo.com"
github: "https://github.com/user/project"
---

# Your content here
```

2. Add project data to `src/config/projects/ProjectCardData.jsx`

### Adding a New Blog Post

1. Create a markdown file in `src/data/blogs/`:

```markdown
---
title: "Blog Post Title"
description: "Short description"
date: "2024-01-01"
image: "/blogimage/cover.jpg"
tags: ["Next.js", "Tutorial"]
---

# Your blog content here
```

2. Add blog data to `src/config/blog/BlogCardData.jsx`

### Customizing the Theme

- Global styles and CSS variables are defined in `src/index.css`
- Tailwind tokens are configured in `tailwind.config.js`
- The theme provider lives in `src/components/landing/theme-provider.tsx`
- Default theme is dark, stored in the `theme` key in localStorage

---

## Deployment

### Vercel (Recommended)

Next.js is built by Vercel — deploying here gives you zero-config SSR, ISR, and edge functions out of the box.

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

```bash
# Or deploy via Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

```bash
npm run build
npm run start
```

> **Note:** Unlike a static export, Next.js requires a Node.js server for API routes and Server Components. Use platforms like **Railway**, **Render**, **Fly.io**, or a self-hosted VPS if not using Vercel.

---

## Dependencies Overview

### Core

- `next` — Full-stack React framework with App Router
- `react` & `react-dom` — UI library (v19)
- `typescript` — Static type checking

### Styling

- `tailwindcss` v4 — Utility-first CSS framework
- `@tailwindcss/postcss` — PostCSS integration
- `lucide-react` — Icon library
- `class-variance-authority` — Component variant management

### Animations

- `motion` — React animation library (Framer Motion v12)

### Forms & Validation

- `react-hook-form` — Form state management
- `zod` — Schema validation (v4)
- `@hookform/resolvers` — Zod + React Hook Form bridge

### Markdown & Content

- `react-markdown` — Markdown renderer
- `remark-gfm` — GitHub Flavored Markdown
- `rehype-highlight` — Code syntax highlighting
- `gray-matter` — Markdown frontmatter parser
- `highlight.js` — Syntax highlighting engine

### Backend & Integrations

- `appwrite` — Client-side Appwrite SDK
- `node-appwrite` — Server-side Appwrite SDK (for API routes)
- `@vercel/analytics` — Vercel Analytics
- `react-github-calendar` — GitHub contribution graph
- `sonner` — Toast notifications

### UI Primitives

- `@radix-ui/react-label`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-tooltip` — Headless UI primitives
- `cmdk` — Command palette

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License — feel free to use this project for your own portfolio.

---

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [Motion](https://motion.dev/) for animations
- [Next.js](https://nextjs.org/) for the full-stack framework
- [Appwrite](https://appwrite.io/) for the backend services
- [Vercel](https://vercel.com/) for seamless deployment
