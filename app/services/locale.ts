'use server';

import {cookies} from 'next/headers';
import { defaultLocale, LOCALE_COOKIE_NAME, type Locale } from '@/app/i18n/config';

export async function getUserLocale() {
  return (await cookies()).get(LOCALE_COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(LOCALE_COOKIE_NAME, locale);
}