"use client";

import { Languages } from "lucide-react";
import { locales, defaultLocale, LOCALE_COOKIE_NAME } from "@/app/i18n/config";
import { setCookie, getCookie } from 'cookies-next';
import { useRouter } from "next/navigation";

export default function LanguageToggle() {

  const locale = getCookie(LOCALE_COOKIE_NAME);
  const router = useRouter();

  return (
    <Languages className="cursor-pointer" onClick={handleLocaleSwitch} />
  );

  function handleLocaleSwitch() {
     const newLoacle = locales.find((temp) => temp !== locale) || defaultLocale;
     setCookie(LOCALE_COOKIE_NAME, newLoacle);
    router.refresh();
  }
}
