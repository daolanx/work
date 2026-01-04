# Personal profile and portfolio

[中文版本](README.zh.md) | **English Version**

Websites containing personal profiles and portfolios.


## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 
- **Styling**: Tailwind CSS
- **UI Components**:  shadcn/ui
- **Internationalization**: next-intl 
- **State Management**: React Hooks
- **Authentication**: Clerk
- **Animation**: Motion One
- **Development Tools**: ESLint, Husky, TypeScript

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes and data fetching
│   ├── config/            # Configuration files
│   ├── i18n/              # Internationalization setup
│   ├── landing/           # Landing page routes
│   ├── messages/          # Translation files (EN/ZH)
│   ├── sign-in/           # Authentication pages
│   └── page.tsx           # Main portfolio page
├── components/
│   ├── landing/           # Landing page components
│   ├── profile/           # Portfolio components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
└── public/                # Static assets
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build & Production

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Code Quality

```bash
# Lint code
pnpm lint
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```


## 🚀 Deployment

This project is optimized for deployment on:

- Vercel

## 🙏 Acknowledgments

- [Shreyas-29/linkify](https://github.com/Shreyas-29/linkify) - Used for Landing Page

## � License

This project is open source and available under the [MIT License](LICENSE).