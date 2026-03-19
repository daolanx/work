'use client';

import { getCookie, setCookie } from 'cookies-next';
import { Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { defaultLocale, LOCALE_COOKIE_NAME, locales } from '@/i18n/config';

export default function LocaleSwitch() {
  const locale = getCookie(LOCALE_COOKIE_NAME);
  const router = useRouter();

  return (
    <button
      className="cursor-pointer p-1 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
      onClick={handleLocaleSwitch}
      type="button"
      aria-label="Switch language"
    >
      <Languages size={20} />
    </button>
  );

  function handleLocaleSwitch() {
    const newLoacle = locales.find((temp) => temp !== locale) || defaultLocale;
    setCookie(LOCALE_COOKIE_NAME, newLoacle);
    router.refresh();
  }
}
