import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

export const metadata: Metadata = {
  title: 'Code & Experiments',
  description:
    'A collection of interactive web experiments, components, and MVP prototypes built with modern technologies.',
  keywords: [
    'web development',
    'Next.js demos',
    'React experiments',
    'frontend showcase',
    'code experiments',
  ],
  openGraph: {
    title: 'Code & Experiments',
    description:
      'A collection of interactive web experiments and prototypes.',
    type: 'website',
  },
};

interface Demo {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  tags: string[];
}

const demos: Demo[] = [
  {
    id: 'flower-shop',
    title: 'Kyiv LuxeBouquets',
    description:
      'Luxury flower shop landing page with hero carousel, services showcase, and customer reviews.',
    href: '/flower-shop',
    image: '/images/flower-shop/hero/hero.jpg',
    tags: ['Next.js', 'Tailwind CSS v4', 'Framer Motion', 'Embla Carousel'],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-primary/5">
      {/* Minimal Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link
          href="https://daolanx.me"
          className="text-sm text-primary-muted hover:text-primary transition-colors"
        >
          ← Return to Base
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/daolanx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-muted hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://x.com/daolanx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-muted hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        {/* Hero */}
        <FadeIn delay={0} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-semibold text-primary mb-6 tracking-tight">
            Code & Experiments
          </h1>
          <p className="text-lg md:text-xl text-primary-muted max-w-2xl mx-auto leading-relaxed">
            A collection of component libraries, MVP prototypes, and AI-assisted
            experiments built with modern technologies.
          </p>
        </FadeIn>

        {/* Demo Cards */}
        <div className="space-y-8">
          {demos.map((demo, index) => (
            <FadeIn key={demo.id} delay={0.1 + index * 0.1}>
              <Link
                href={demo.href}
                className="group relative block bg-white overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-[21/9] overflow-hidden">
                  <Image
                    src={demo.image}
                    alt={demo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={index === 0}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* View Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-white text-primary px-8 py-3 font-medium text-sm tracking-wider uppercase">
                      View Project
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative px-8 py-8 border-x border-b border-primary/10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium uppercase tracking-widest text-primary/50">
                          0{index + 1}
                        </span>
                        <div className="w-8 h-px bg-primary/20" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-3 group-hover:text-primary/80 transition-colors">
                        {demo.title}
                      </h2>
                      <p className="text-primary-muted leading-relaxed max-w-xl">
                        {demo.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex items-center justify-center w-12 h-12 border border-primary/20 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-primary/5">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-primary/5 text-primary/70 text-xs font-medium tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Footer */}
        <FadeIn delay={0.4}>
          <footer
            className="mt-20 pt-8 border-t border-primary/10"
            role="contentinfo"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center justify-center flex-wrap gap-x-3 text-sm text-primary-muted">
                <span>Dax © 2026</span>
                <span aria-hidden="true" className="text-primary/20">|</span>
                <nav aria-label="Footer Links" className="flex gap-x-3">
                  {[
                    { href: 'https://github.com/daolanx', label: 'GitHub' },
                    { href: 'https://x.com/daolanx', label: 'Twitter' },
                    { href: 'https://work.daolanx.me', label: 'Profile' },
                    { href: 'mailto:daolanx.dev@gmail.com', label: 'Email' },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </footer>
        </FadeIn>
      </div>
    </main>
  );
}
