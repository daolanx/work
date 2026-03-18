import type { Metadata } from 'next';
import './globals.css';
import { Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: {
    default: 'Demo Gallery — Web Development Portfolio',
    template: '%s | Demo Gallery',
  },
  description:
    'A curated collection of interactive web experiences built with Next.js, React, and modern technologies.',
  metadataBase: new URL('https://demo.daolanx.com'),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-outfit', outfit.variable)}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
