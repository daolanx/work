# My Work - Portfolio & Admin Dashboard

**English Version** | [中文版本](README.zh.md)

A modern full-stack portfolio and admin dashboard built with Next.js 16, featuring AI chat, task management, and analytics.

**Live Demo**: [https://work.daolanx.me/](https://work.daolanx.me/)

[![Unit Tests](https://github.com/daolanx/work/actions/workflows/unit-tests.yml/badge.svg?branch=main)](https://github.com/daolanx/work/actions/workflows/unit-tests.yml)
[![E2E Tests](https://github.com/daolanx/work/actions/workflows/e2e-tests.yml/badge.svg?branch=main)](https://github.com/daolanx/work/actions/workflows/e2e-tests.yml)
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/work-chi-three)

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16** (App Router) - Server components
- **React 19** - Latest React with hooks
- **TypeScript** - Type-safe development

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Accessible UI components
- **Radix UI** - Headless primitives
- **Lucide React** - Icon library

### Database & ORM
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe SQL ORM
- **Drizzle Kit** - Migrations & tooling

### Authentication
- **Better Auth** - Modern auth solution
- **Session Management** - Secure sessions with IP tracking
- **OAuth** - GitHub and other providers

### AI Integration
- **Vercel AI SDK** - AI model integration
- **OpenRouter** - AI provider
- **Streaming Responses** - Real-time AI chat

### Internationalization
- **next-intl** - i18n for Next.js
- **Multi-language** - English & Chinese support

### Testing
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Testing Library** - Component testing

### Development Tools
- **Biome** - Linting & formatting
- **Husky** - Git hooks
- **TypeScript** - Type checking

## 🚀 Quick Start

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
pnpm dev       # Start dev server
```

Open [http://localhost:3000](http://localhost:3000)

### Build & Production
```bash
pnpm build     # Build for production
pnpm start     # Start production server
```

## 📊 Key Features

### Portfolio Page
- Personal profile with skills
- Project showcase
- Contact information
- Theme switcher (light/dark)
- Language switcher (EN/ZH)

### Admin Dashboard
- **Summary Cards** - Key metrics overview
- **Visitor Analytics** - Interactive charts with Recharts
- **Task Management** - Full CRUD operations
- **Real-time Updates** - SWR data fetching

### AI Chat Interface
- **Streaming Responses** - Real-time conversation
- **Message History** - Persistent sessions
- **File Support** - Upload attachments
- **Multiple Models** - Via OpenRouter

### Authentication
- **Login/Register** - Email/password auth
- **OAuth** - GitHub integration
- **Session Tracking** - IP and device info
- **Password Reset** - Email-based flow

## 📁 Project Structure

```
app/
├── api/           # API routes (ai-chat, auth, console)
├── auth/          # Authentication pages
├── console/       # Admin dashboard
├── landing/       # Marketing page
├── ai-chat/       # AI chat interface
├── (profile)/     # Personal profile
└── layout.tsx     # Root layout

components/
├── ui/            # shadcn/ui components
├── auth/          # Auth components
├── ai-elements/   # AI chat components
└── forms/         # Form components

db/
├── auth.schema.ts # User, session, account
├── biz.schema.ts  # Tasks, visit_stats
└── index.ts       # DB connection

lib/
├── auth/          # Auth utilities
├── validations/   # Zod schemas
└── utils.ts       # General utilities

i18n/
├── config.ts      # Locale config
├── locale.ts      # Locale utils
└── request.ts     # i18n handling

messages/
├── en.json        # English translations
└── zh.json        # Chinese translations
```

## 🧪 Testing

```bash
pnpm test        # All tests
pnpm test:unit   # Unit tests
pnpm test:e2e    # End-to-end tests
pnpm test:api    # API tests
```

## 📦 Database Schema

### Users & Auth
- **user** - User accounts (id, email, name, OAuth)
- **session** - Active sessions (IP tracking)
- **account** - OAuth provider connections

### Business Logic
- **tasks** - Task management
  - Categories: PERSONAL, WORK, STUDY, OTHER
  - Priorities: URGENT, HIGH, MEDIUM, LOW
  - Status: To Do, In Process, Done, Canceled
- **visit_stats** - Traffic analytics (desktop/mobile)

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://...

# Auth
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=https://your-app.com

# AI
OPENROUTER_API_KEY=your-key
OPENROUTER_MODEL=anthropic/claude-3-5-sonnet

# Email (optional)
RESEND_API_KEY=your-key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Analytics (optional)
UMAMI_WEBSITE_ID=your-id
```

## 📝 Scripts

### Development
- `pnpm dev` - Start dev server
- `pnpm lint` - Check code quality
- `pnpm lint:fix` - Auto-fix issues
- `pnpm format` - Format code
- `pnpm type-check` - TypeScript check

### Database
- `pnpm db:gen` - Generate migrations
- `pnpm db:mi` - Run migrations
- `pnpm db:push` - Push schema
- `pnpm db:studio` - Open Drizzle Studio

### Testing
- `pnpm test` - Run all tests
- `pnpm test:unit` - Unit tests
- `pnpm test:e2e` - E2E tests

### Git Hooks
- `pnpm prepare` - Setup Husky
- `pnpm pre-commit` - Pre-commit checks

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [Better Auth](https://www.better-auth.com/) - Authentication
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [Next.js](https://nextjs.org/) - Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shreyas-29/linkify](https://github.com/Shreyas-29/linkify) - Used for Landing Page

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
