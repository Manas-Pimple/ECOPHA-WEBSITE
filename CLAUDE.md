# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # start dev server (Vite)
pnpm build      # production build → dist/
```

No test suite or linter configured.

## Stack

- **React 18** + **TypeScript** via **Vite 6**
- **Tailwind CSS v4** (configured via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- **shadcn/ui** components in `src/app/components/ui/` (Radix primitives + `class-variance-authority`)
- **Motion** (`motion/react`) for animations and page transitions
- **React Router v7** (`react-router`, not `react-router-dom`)
- **pnpm** as package manager

## Path Alias

`@` → `src/` (configured in `vite.config.ts`)

## Project Structure

```
src/
  main.tsx                    # entry, mounts App
  app/
    App.tsx                   # BrowserRouter, AnimatePresence page transitions, dark mode state, Footer
    pages/                    # one file per route
    components/               # feature components
      ui/                     # shadcn/ui primitives (do not modify manually)
      figma/                  # Figma Make–generated components
  styles/
    theme.css                 # CSS custom properties — brand tokens + dark mode + global keyframes
    index.css                 # style entry point
```

## Routing

Five routes defined in `App.tsx`:

| Path | Component |
|------|-----------|
| `/` | `HomePage` |
| `/about` | `AboutPage` |
| `/technology` | `TechnologyPage` |
| `/innovation` | `InnovationPage` |
| `/impact` | `DesignImpactPage` |

Page transitions use `AnimatePresence` with `mode="wait"`. Each route change also triggers `window.scrollTo({ top: 0 })`.

## Brand / Design Tokens

All tokens live in `src/styles/theme.css` as CSS custom properties — do not hardcode colors.

| Token | Value | Purpose |
|-------|-------|---------|
| `--primary` / `--ocean` | `#0B72CC` | Ocean blue — CTAs, links |
| `--secondary` / `--leaf` | `#2E9E4F` | Leaf green — sustainability accents |
| `--accent` / `--amber` | `#F5A623` | Amber — highlights |
| `--background` | `#FAF8F4` (light) / `#0A1628` (dark) | |

Fonts: `--font-display` = Fraunces (headings), `--font-body` = Plus Jakarta Sans, `--font-mono` = JetBrains Mono.

Dark mode toggled via `document.documentElement.classList.add('dark')` in `App.tsx` — no CSS media query dependency.

## Key Custom Components

- **`HoneyCat`** — animated SVG cat mascot (brand character)
- **`HoneyChatbot`** — floating chatbot using `HoneyCat` + rule-based keyword matching (`kb` array in `HoneyCatbot.tsx`); no external AI API
- **`CatCupGame`** / **`CupTrace`** — interactive lifecycle tracking feature
- **`LifecycleJourney`** / **`LiveMetrics`** — data-driven sections using Recharts

## Figma Integration

Project originated from Figma Make. `vite.config.ts` includes a custom `figmaAssetResolver` plugin that maps `figma:asset/<filename>` imports to `src/assets/<filename>`. The `react()` and `tailwindcss()` plugins must remain in config even if Tailwind is unused locally.

## pnpm Store Note

If you see `ERR_PNPM_UNEXPECTED_STORE`, run:
```bash
pnpm config set store-dir /Users/admin/Library/pnpm/store/v11 --global
```
