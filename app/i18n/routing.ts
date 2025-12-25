
import { defineRouting } from "next-intl/routing";

export type Locale = 'en' | 'zh';
 
export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en"
});
 

