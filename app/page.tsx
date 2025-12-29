
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from 'next'
import Image from "next/image";
import ThemeSwitch from "@/components/profile/themeSwitch";
import LocaleSwitch from "@/components/profile/localeSwitch";
import { Badge } from "@/components/ui/badge";
import SiteCard from "@/components/profile/site-card";


import { getSites, type Site } from "@/app/api/site";

export const metadata: Metadata = {
  title: 'Dax\'s Profile',
  description: 'Freelance Frontend Developer',
}
export default async function Home() {
  const t = await getTranslations("profile");
  const sites: Site[] = await getSites();

  return (
    <>
      <header className="mx-auto max-w-2xl flex justify-between mt-4 mb-4 px-2">
        <h1 className="text-xl md:text-2xl font-bold  ">{t("title")}</h1>
        <div className="flex items-center justify-between space-x-4 ">
          <LocaleSwitch />
          <ThemeSwitch />
        </div>
      </header>
      <main className="mx-auto max-w-2xl ">
        <section className="pt-10 md:flex items-center gap-x-2 font-mono md:text-xl">
          <Image
            className=" rounded-full w-1/4 mx-auto md:w-[30%]  p-1 border-4 border-r-amber-600 border-l-blue-500"
            width={628}
            height={628}
            src="/profile/avatar.webp"
            alt="Dax's avatar"
          />
          <div>
            <p className="w-full p-4">{t("intro")}</p>
            <p className="w-full p-4">
              {" "}
              {t.rich("contact", {
                blog: (children) => (
                  <Link
                    target="_blank"
                    href="https://www.daolanx.me/"
                    className="text-blue-500 underline"
                  >
                    {children}
                  </Link>
                ),
                github: (children) => (
                  <Link
                    target="_blank"
                    href="https://github.com/daolanx"
                    className="text-blue-500 underline"
                  >
                    {children}
                  </Link>
                ),
                twitter: (children) => (
                  <Link
                    target="_blank"
                    href="https://x.com/daolanx"
                    className="text-blue-500 underline"
                  >
                    {children}
                  </Link>
                ),
                email: (children) => (
                  <Link
                    href="mailto:daolanx@hotmail.com"
                    className="text-blue-500 underline"
                  >
                    {children}
                  </Link>
                ),
              })}
            </p>
          </div>
        </section>
        <section className="border-t border-slate-100 mt-8  p-4">
          <h2 className="font-bold   text-xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent pb-6">
            {t('my-skills')}
          </h2>

          <ul className="flex flex-wrap gap-3">
            {[
              {
                name: "HTML",
                color: "hover:border-orange-400  hover:text-orange-600",
              },

              {
                name: "CSS",
                color: "hover:border-blue-400  hover:text-blue-600",
              },

              {
                name: "JavaScript",
                color: "hover:border-amber-400  hover:text-amber-700",
              },

              {
                name: "React",
                color: "hover:border-cyan-400  hover:text-cyan-600",
              },

              {
                name: "TailwindCSS",
                color: "hover:border-sky-400  hover:text-sky-600",
              },

              {
                name: "Next.js",
                color: "hover:border-indigo-400  hover:text-indigo-600",
              },
            ].map((skill) => (
              <li key={skill.name}>
                <Badge
                  variant="outline"
                  className={`
            md:px-4 md:py-1.5 font-medium transition-all duration-300 text-sm md:text-base
           
            hover:-translate-y-0.5 hover:shadow-sm
            ${skill.color}
          `}
                >
                  {skill.name}
                </Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-slate-100 mt-8 p-4">
          <h2 className="font-bold  text-xl bg-gradient-to-r from-orange-600 to-purple-500 bg-clip-text text-transparent pb-6">
            {t('my-projects')}
          </h2>
          {

            sites.map((site: Site) => <SiteCard 
              key={site.title}
              {...site}
          />)
          }
        </section>
      </main>
    </>
  );
}
