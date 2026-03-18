# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16.1.6 web application with React 19.2.3, TypeScript, and Tailwind CSS v4. The project uses shadcn/ui component patterns and is styled with the "base-nova" theme.

## Commands

```bash
# Development
pnpm dev          # Start development server (http://localhost:3000)

# Building
pnpm build        # Production build
pnpm start        # Start production server

# Linting & Formatting
pnpm lint         # Run ESLint
pnpm format       # Format with Biome (write)
pnpm lint:fix     # Fix lint issues with Biome (write)
pnpm check        # Biome check + fix (format + lint)
```

## Architecture

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout (Outfit font, globals.css)
│   ├── page.tsx      # Home page
│   └── globals.css   # Tailwind CSS + CSS variables
├── components/
│   ├── ui/           # shadcn/ui components (button, sheet, etc.)
│   └── *.tsx         # Page sections (Hero, Services, Reviews, etc.)
└── lib/
    └── utils.ts      # cn() utility for className merging
```

## Key Conventions

- **Path alias**: `@/*` maps to `./src/*`
- **Styling**: Tailwind CSS v4 (no tailwind.config.ts - uses CSS-based config)
- **Component patterns**: Uses `cva` for variants, `cn` for className merging
- **Icons**: Lucide React
- **Animations**: motion/react for scroll animations, Embla Carousel for carousels

## Reusable UI Components

The project includes shared components in `src/components/ui/`:

- **FadeIn** - Fade-in on scroll animation with configurable delay
- **SocialLinks** - Social media link icons with hover effects

## Image Assets

Static images are organized in `/public/images/` subdirectories by section (e.g., `/images/footer/`, `/images/contact/`, `/images/service/`)

## Configuration

- **shadcn/ui**: Style "base-nova", uses CSS variables in `src/app/globals.css`
- **Biome**: Single quotes, 2-space indent, ES5 trailing commas
- **TypeScript**: Strict mode enabled, bundler module resolution

## Adding shadcn Components

Use the shadcn CLI to add new components:
```bash
npx shadcn@latest add [component-name]
```
