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
      <body>{children}</body>
    </html>
  );
}
