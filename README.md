# ECOPHA Website Prototype

A futuristic sustainability website prototype for **ECOPHA**, an Australian company partnered with **RMIT** for a comprehensive marketing campaign.

## About ECOPHA

ECOPHA is committed to driving sustainable innovation and environmental responsibility. This website prototype showcases the company's vision, technology, and impact through an interactive and visually engaging digital experience. Developed in partnership with RMIT University, this marketing initiative establishes ECOPHA's digital presence and communicates their sustainability-focused mission to stakeholders, partners, and the broader community.

## Project Overview

This prototype was created as part of a marketing campaign to establish ECOPHA's digital presence and engage their audience through an interactive, futuristic design that emphasizes modern aesthetics combined with environmental themes.

## Tech Stack

### Frontend Framework
- **React 18** with **TypeScript** — Type-safe component development
- **Vite 6** — Lightning-fast build tool and dev server with HMR

### Styling & UI
- **Tailwind CSS v4** — Utility-first CSS framework (via `@tailwindcss/vite` plugin)
- **shadcn/ui** — High-quality, unstyled UI components (Radix primitives + class-variance-authority)
- **CSS Custom Properties** — Custom design tokens for brand consistency

### Animations & Interactions
- **Motion** (`motion/react`) — Smooth, declarative animations for page transitions and interactive elements

### Routing & Navigation
- **React Router v7** — Client-side routing for multi-page experience

### Package Management
- **pnpm** — Fast, reliable Node.js package manager

### Data Visualization
- **Recharts** — React-based charting library for impact metrics and analytics

### Design Integration
- **Figma** — Original design source with automated asset resolution via custom Vite plugin

## Getting Started

### Installation

```bash
npm i
```

or with pnpm:

```bash
pnpm install
```

### Development

```bash
npm run dev
```

Starts a local Vite dev server with hot module replacement (HMR) for rapid development and testing.

### Production Build

```bash
npm run build
```

Generates an optimized production build in the `dist/` directory.

## Project Structure

```
src/
  main.tsx                    # Entry point, mounts App
  app/
    App.tsx                   # Router setup, dark mode support, page transitions
    pages/                    # Route components for each page
    components/               # Reusable React components
      ui/                     # shadcn/ui primitives
      figma/                  # Figma-generated components
  styles/
    theme.css                 # Design tokens & dark mode configuration
    index.css                 # Global styles and base utilities
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Home page |
| `/about` | About ECOPHA & company mission |
| `/technology` | Technology & Innovation overview |
| `/innovation` | Innovation Initiatives & projects |
| `/impact` | Design Impact & Sustainability metrics |

## Design Highlights

- **Brand Character**: Animated HoneyCat mascot for engaging storytelling and community engagement
- **Interactive Experiences**: Gamified elements like CatCupGame for lifecycle tracking demonstrations
- **Data Visualizations**: Recharts-powered metrics dashboards showcasing ECOPHA's impact
- **Dark Mode**: Full dark mode support with seamless theme switching
- **Responsive Design**: Mobile-first approach using Tailwind CSS utilities
- **Smooth Transitions**: Page transitions powered by Motion library for polished user experience

## Design Tokens

All colors and typography are defined as CSS custom properties in `src/styles/theme.css`:

- **Primary Blue** (`--primary`): `#0B72CC` — Ocean blue for CTAs and key interactions
- **Secondary Green** (`--secondary`): `#2E9E4F` — Leaf green for sustainability accents
- **Accent Amber** (`--accent`): `#F5A623` — Highlights and emphasis elements
- **Typography**: 
  - Fraunces (display font) — Elegant headings
  - Plus Jakarta Sans (body font) — Clean, readable body text
  - JetBrains Mono (code font) — Technical content

## Figma Integration

This project was originally designed in Figma and includes automated asset resolution via a custom Vite plugin (`figmaAssetResolver`), enabling seamless synchronization between design and development.

## Key Features

- Type-safe React development with TypeScript
- Hot Module Replacement (HMR) for instant feedback during development
- Optimized build output for production deployment
- Fully accessible UI components via shadcn/ui and Radix primitives
- Custom dark mode implementation
- Performance-optimized animations

---



**Partnership**: Developed in collaboration with RMIT University
