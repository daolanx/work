# Demo Project

A Next.js 16 web application showcasing various UI demos with React 19, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS v4 with "base-nova" theme
- **Components**: shadcn/ui patterns
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Biome |
| `pnpm check` | Biome check + fix |

## Demos

- **Flower Shop** (`/flower-shop`) - A modern floral studio landing page with carousel, animations, and responsive design

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page (demo gallery)
│   ├── globals.css      # Tailwind CSS + CSS variables
│   └── flower-shop/    # Demo modules
├── components/
│   ├── ui/              # Reusable UI components
│   └── flower-shop/     # Demo-specific components
└── lib/
    └── utils.ts         # Utilities (cn, animation configs)
```

## Deployment

Build and start the production server:

```bash
pnpm build
pnpm start
```

The app can be deployed to any platform supporting Next.js (Vercel, Netlify, Docker, etc.).
