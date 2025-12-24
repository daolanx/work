"use client";

import { Languages } from "lucide-react";
import { routing } from "@/app/i18n/routing";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function LanguageToggle() {
  const { locales, defaultLocale } = routing;
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const REG_LOCALE = /^\/([a-z]{2,3}(-[A-Z]{2})?)(?=\/|$)/;

  return (
    <Languages className="cursor-pointer" onClick={handleLocaleSwitch} />
  );

  function handleLocaleSwitch() {
     const newLoacle = locales.find((temp) => temp !== locale) || defaultLocale;
    router.replace(pathname.replace(REG_LOCALE, newLoacle));
  }
}
