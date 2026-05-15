# My Work - Demo Gallery

**English Version** | [中文版本](README.zh.md)

A modern full-stack demo showcase built with Next.js 16, featuring an admin dashboard, AI chat, task management, and analytics.

**Live Demo**: [https://demo.daolanx.com/](https://demo.daolanx.com/)

[![Unit Tests](https://github.com/daolanx/work/actions/workflows/unit-tests.yml/badge.svg?branch=main)](https://github.com/daolanx/work/actions/workflows/unit-tests.yml)
[![E2E Tests](https://github.com/daolanx/work/actions/workflows/e2e-tests.yml/badge.svg?branch=main)](https://github.com/daolanx/work/actions/workflows/e2e-tests.yml)
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/work-chi-three)

---

## Tech Stack

### Core Framework
- **Next.js 16.1.1** (App Router) - Server components, React Compiler
- **React 19.2.3** - Latest React with hooks
- **TypeScript** - Strict mode, bundler module resolution

### UI & Styling
- **Tailwind CSS v4** - CSS-based config (no tailwind.config.ts)
- **shadcn/ui** - 40+ accessible UI components
- **Radix UI** - Headless primitives
- **Lucide React / Tabler Icons** - Icon libraries

### Database & ORM
- **PostgreSQL** (Neon Serverless) - Relational database
- **Drizzle ORM** - Type-safe SQL ORM
- **Drizzle Kit** - Migrations & tooling

### Authentication & Payments
- **Better Auth** - Modern auth with admin plugin
- **OAuth** - GitHub & Google providers
- **Creem.io** - Subscription billing (Hobby/Pro/Studio)

### AI Integration
- **Vercel AI SDK** - AI model integration
- **OpenRouter** - Multi-model provider
- **Streaming Responses** - Real-time AI chat

### State & Data
- **SWR** - Client-side data fetching & caching
- **Zustand** - Global client state
- **Zod** - Schema validation (前后端统一)

### Internationalization
- **next-intl** - i18n for Next.js
- **Multi-language** - English & Chinese support

### Testing & Quality
- **Vitest** - Unit & component testing
- **Playwright** - E2E testing
- **Biome** - Linting & formatting
- **Husky** - Git hooks with lint-staged

---

## Quick Start

### Installation
```bash
git clone https://github.com/daolanx/work.git
cd work
pnpm install
```

### Environment Setup
Create `.env.local`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
OPENROUTER_API_KEY=your-openrouter-key
```

### Database
```bash
pnpm db:gen    # Generate migrations
pnpm db:mi     # Run migrations
```

### Development
```bash
pnpm dev       # Start dev server (http://localhost:3000)
```

---

## Project Structure

```
app/                          # Routes (page-level)
├── api/                      # API endpoints
├── auth/                     # Login, register, reset-password
├── console/                  # Dashboard, tasks, admin, billing, profile
├── ai-chat/                  # AI chat interface
├── landing/                  # Marketing page
└── flower-shop/              # E-commerce demo

features/                     # Business logic modules
├── console/                  #   auth, dashboard, payments, task, user
├── ai-chat/                  #   chat service, hooks, components
├── landing/                  #   page sections
└── flower-shop/              #   page sections

components/                   # Shared UI (shadcn/ui + custom)
db/                           # Schema definitions (Drizzle)
lib/                          # Shared utilities
```

---

## Key Features

### Admin Dashboard
- **Summary Cards** - MRR, Retention, Conversion, MAU (Server Component)
- **Visitor Analytics** - Interactive charts with Recharts
- **User Management** - Ban/Unban, role switching (admin only)
- **Task Management** - Full CRUD with pagination, filtering, sorting

### AI Chat Interface
- **Streaming Responses** - Real-time conversation via OpenRouter
- **Message History** - Persistent sessions
- **Multiple Models** - Switch between AI models

### Authentication
- **Login/Register** - Email/password auth
- **OAuth** - GitHub & Google providers
- **Password Reset** - Email-based flow via Resend
- **Session Tracking** - IP and device info

### Payments
- **Subscription Tiers** - Hobby / Pro / Studio
- **Checkout Flow** - Creem.io integration
- **Billing Management** - Customer portal

---

## Architecture Patterns

### Feature-based Module Structure
Each feature module (`features/console/task/`, etc.) contains:
- `service.ts` - Server Actions for mutations
- `hooks/` - SWR hooks for client data fetching
- `components/` - Feature-specific UI components
- `schemas.ts` - Zod validation schemas
- `constants.ts` - Enum mappings and config

### Data Flow
- **Reads**: Client Component → SWR Hook → API Route → Service → DB
- **Writes**: Client Component → SWR Mutation → Server Action → DB → revalidatePath

### Error Handling
- `api-handler.ts` wraps all API routes with `withErrorHandler`
- `authApi` injects session validation for protected routes
- Custom `ValidationError` for business logic errors

---

## Scripts

### Development
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm type-check   # TypeScript check
```

### Linting & Formatting
```bash
pnpm lint         # Run Biome check
pnpm format       # Format with Biome
pnpm lint:fix     # Fix lint issues
```

### Testing
```bash
pnpm test         # All tests (vitest + playwright)
pnpm test:unit    # Unit tests only
pnpm test:e2e     # E2E tests only
pnpm test:api     # API tests
pnpm test:ui      # Component tests
```

### Database
```bash
pnpm db:gen       # Generate migrations
pnpm db:mi        # Run migrations
pnpm db:push      # Push schema to DB
pnpm db:studio    # Open Drizzle Studio
```

---

## Environment Variables

```env
# Database (required)
DATABASE_URL=postgresql://...

# Auth (required)
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=https://your-app.com

# AI (required for chat)
OPENROUTER_API_KEY=your-key
OPENROUTER_MODEL=anthropic/claude-3-5-sonnet

# Email (optional)
RESEND_API_KEY=your-key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Storage (optional, for avatar upload)
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket.r2.dev
```

---

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [Better Auth](https://www.better-auth.com/) - Authentication
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [Next.js](https://nextjs.org/) - Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shreyas-29/linkify](https://github.com/Shreyas-29/linkify) - Used for Landing Page

---

**Built with Next.js 16, React 19, and modern web technologies**
