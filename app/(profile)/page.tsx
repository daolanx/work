import { Home as HomeIcon } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { DemoCard } from './_components/demo-card';
import { FadeIn } from './_components/fade-in';
import LocaleSwitch from './_components/locale-switch';
import ThemeSwitch from './_components/theme-switch';
import { getSites, type Site } from './config';

export async function generateMetadata() {
  const t = await getTranslations('profile');
  return {
    title: t('gallery-title'),
    description: t('intro'),
  };
}

export default async function Home() {
  const t = await getTranslations('profile');
  const sites: Site[] = await getSites();

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header - Fixed at top, full width */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
        <a
          href="https://www.daolanx.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          title={t('home-title')}
        >
          <HomeIcon size={20} />
        </a>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <LocaleSwitch />
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        {/* Hero */}
        <FadeIn delay={0} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 tracking-tight">
            {t('gallery-title')}
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            <span className="italic font-serif"> {t('intro')} 🛠️ ❤️ </span>
          </p>
        </FadeIn>

        {/* Demo Cards */}
        <div className="space-y-12">
          {sites.map((site, index) => (
            <FadeIn key={site.title} delay={0.1 + index * 0.1}>
              <DemoCard>
                {/* Title */}
                <div className="px-8 pt-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {site.title}
                  </h2>
                </div>

                {/* Image Container */}

                <div className="relative aspect-[21/9] mt-6 mx-8 overflow-hidden border border-neutral-200 dark:border-neutral-800">
                  <Image
                    src={site.previewUrl}
                    alt={site.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-top object-cover cursor-default transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={index === 0}
                    unoptimized
                  />
                </div>

                {/* Description */}
                <div className="px-8 mt-6">
                  <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">
                    {site.description}
                  </p>
                </div>

                {/* Tags & Actions */}
                <div className="px-8 pb-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex flex-wrap gap-2">
                      {site.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium tracking-wide"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={site.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors"
                      >
                        {t('view-source')}
                      </a>
                      <a
                        href={site.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors"
                      >
                        {t('view-site')}
                      </a>
                    </div>
                  </div>
                </div>
              </DemoCard>
            </FadeIn>
          ))}
        </div>

        {/* Footer */}
        <FadeIn delay={0.4}>
          <footer className="mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center justify-center flex-wrap gap-x-3 text-sm text-neutral-500 dark:text-neutral-400">
                <span>Dax © 2026</span>
                <span
                  aria-hidden="true"
                  className="text-neutral-300 dark:text-neutral-600"
                >
                  |
                </span>
                <nav aria-label="Footer Links" className="flex gap-x-3">
                  {[
                    {
                      href: 'https://github.com/daolanx',
                      label: 'GitHub',
                    },
                    {
                      href: 'https://x.com/daolanx',
                      label: 'Twitter',
                    },
                    {
                      href: 'https://work.daolanx.me',
                      label: 'Profile',
                    },
                    {
                      href: 'mailto:daolanx.dev@gmail.com',
                      label: 'Email',
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
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
