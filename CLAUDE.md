# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16.1.1 web application with React 19.2.3, TypeScript, and Tailwind CSS v4. The project uses shadcn/ui component patterns, Drizzle ORM for database, Better Auth for authentication, and Vercel AI SDK for AI chat integration.

**Live Demo**: https://demo.daolanx.com/


## Commands

```bash
# Development
pnpm dev          # Start development server (http://localhost:3000)

# Building
pnpm build        # Production build
pnpm start        # Start production server
pnpm type-check   # TypeScript check

# Linting & Formatting
pnpm lint         # Run Biome check
pnpm format       # Format with Biome (write)
pnpm lint:fix     # Fix lint issues with Biome (write)

# Testing
pnpm test         # Run all tests (vitest + playwright)
pnpm test:unit    # Unit tests only (vitest)
pnpm test:e2e     # E2E tests only (playwright)
pnpm test:api     # API tests (vitest)
pnpm test:ui      # Component tests (vitest)

# Database
pnpm db:gen       # Generate migrations (drizzle-kit)
pnpm db:mi        # Run migrations
pnpm db:push      # Push schema to DB
pnpm db:studio    # Open Drizzle Studio

# Git Hooks
pnpm prepare      # Setup Husky hooks
```

## Architecture

```
app/                    # Next.js App Router (root directory)
├── (profile)/          # Route group: Demo Gallery homepage
├── ai-chat/            # AI chat interface
├── api/                # API routes (ai-chat, auth, console, upload)
├── auth/               # Authentication pages (login, register, reset-password)
├── console/            # Admin dashboard (tasks/, admin/, profile/, plans/)
├── flower-shop/        # Demo project: flower shop e-commerce
├── landing/            # Marketing page
└── legal/              # Legal pages (privacy, refund, terms)

components/
├── ui/                 # shadcn/ui components (40+ components)
├── auth/               # Auth components (login, register, oauth)
├── ai-elements/        # AI chat components (conversation, message, prompt-input)
├── forms/              # Schema-based form components
└── creem/              # Payment integration (checkout, billing)

db/
├── auth.schema.ts       # User, session, account tables (Better Auth)
├── biz.schema.ts        # Tasks, visit_stats tables
└── index.ts            # DB connection (Drizzle)

lib/
├── auth/               # Auth utilities (client, server, paths, schemas)
├── validations/        # Zod schemas (task validation)
├── utils.ts            # cn() utility for className merging
├── api-handler.ts      # Typed API handler wrapper
├── email.tsx           # React Email templates
├── r2.ts               # AWS S3/R2 file storage
└── fetcher.ts          # Data fetching utilities

messages/               # i18n translation files
├── en.json             # English
└── zh.json             # Chinese

i18n/                   # i18n configuration
├── config.ts          # Locale configuration
├── locale.ts          # Locale utilities
└── request.ts         # Request-time i18n handling
```

## Key Conventions

- **Path alias**: `@/*` maps to project root
- **Styling**: Tailwind CSS v4 (CSS-based config, no tailwind.config.ts)
- **Component patterns**: Uses `cva` for variants, `cn` for className merging
- **Icons**: Lucide React (also `@tabler/icons-react` and `react-icons` available)
- **Animations**: `motion/react` for animations, Embla Carousel for carousels
- **Data fetching**: SWR for client-side data fetching
- **State management**: Zustand for global client state
- **Charts**: Recharts for analytics charts
- **Tables**: `@tanstack/react-table` for data tables
- **Drag & drop**: `@dnd-kit/core`, `@dnd-kit/sortable`
- **Toasts**: Sonner for toast notifications

## Database Schema

- **Users & Auth**: `user`, `session`, `account` tables (via Better Auth)
- **Business Logic**: `tasks` (categories: PERSONAL/WORK/STUDY/OTHER, priorities, status), `visit_stats`

## Configuration

- **shadcn/ui**: Components in `components/ui/`, uses CSS variables in `app/globals.css`
- **Biome**: Single quotes, 2-space indent, ES5 trailing commas
- **TypeScript**: Strict mode enabled, bundler module resolution
- **i18n**: next-intl for English/Chinese support

## Testing

Tests are organized in `tests/` directory:
- `tests/unit/` - Unit tests (vitest)
- `tests/e2e/` - E2E tests (playwright)
- `tests/api/` - API tests (vitest)
- `tests/components/` - Component tests (vitest)
