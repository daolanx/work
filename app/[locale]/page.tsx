import { useTranslations } from "next-intl";
import ThemeSwitch from '@/app/components/themeSwitch';
import LocaleSwitch from "../components/localeSwitch";

export default function Home() {
   const t = useTranslations("home");

  return (
    <div>
      <main>  <ThemeSwitch /><LocaleSwitch />
          <div className='flex items-center justify-between space-x-4 '>
 
    
        {t('title')}</div>
      </main></div>
    
  );
}
