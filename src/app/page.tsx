import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/ui/fade-in';

export const metadata: Metadata = {
  title: 'Demo Gallery — Web Development Portfolio',
  description:
    'A curated collection of interactive web experiences built with Next.js, React, and modern technologies. View live demos and source code.',
  keywords: [
    'web development portfolio',
    'Next.js demos',
    'React examples',
    'frontend showcase',
    'web design examples',
  ],
  openGraph: {
    title: 'Demo Gallery — Web Development Portfolio',
    description:
      'A curated collection of interactive web experiences built with Next.js, React, and modern technologies.',
    type: 'website',
  },
};

const demos = [
  {
    id: 'flower-shop',
    title: 'Flower Shop',
    description: 'E-commerce landing page for a luxury flower shop with hero section, services, reviews, contact form, and newsletter footer.',
    href: '/flower-shop',
    image: '/images/hero/hero.jpg',
    tags: ['Next.js', 'Tailwind CSS', 'Motion', 'Embla Carousel'],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-primary/5">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        {/* Header */}
        <FadeIn delay={0} className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 border border-primary/30">
            <span className="text-xs font-medium uppercase tracking-widest text-primary/70">
              Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold text-primary mb-6 tracking-tight">
            Demo Gallery
          </h1>
          <p className="text-lg md:text-xl text-primary-muted max-w-2xl mx-auto leading-relaxed">
            A curated collection of interactive web experiences crafted with modern technologies and thoughtful design.
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
          <footer className="mt-20 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-primary-muted">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Built with Next.js 16 · React 19 · Tailwind CSS v4</span>
            </div>
          </footer>
        </FadeIn>
      </div>
    </main>
  );
}
