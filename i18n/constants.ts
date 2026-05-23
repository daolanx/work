export type Locale = (typeof LOCALES)[number];
export const LOCALES = ["en", "zh"] as const;
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";
