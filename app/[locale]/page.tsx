"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "@/app/components/themeSwitch";
import LocaleSwitch from "../components/localeSwitch";
import { MagicCard } from "@/components/ui/magic-card";
import { Badge } from "@/components/ui/badge";


import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Home() {
  const t = useTranslations("home");
  const { theme } = useTheme();

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
        <section className="border-t border-slate-100 mt-10 pt-8">
          <h2 className="font-bold  text-xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent pb-6">
            My Skills
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

        <section className="border-t border-slate-100 mt-10 pt-8">
          <h2 className="font-bold  text-xl bg-gradient-to-r from-orange-600 to-purple-500 bg-clip-text text-transparent pb-6">
            My Projects
          </h2>

          <MagicCard
            className="p-4 mb-6 rounded-xl hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 "
            gradientColor={theme === "dark" ? "#000" : "#fff"}
          >
            <h3 className="font-bold font-sans text-xl mb-2 border-b-1 pb-2 mb-4">
              Landing Page
            </h3>

            {/* 添加 items-start 防止图片在垂直方向被拉伸 */}
            <div className="md:flex md:items-start space-x-4">
              <div className="w-3/5 mb-4 md:w-[40%] shrink-0 ">
                {" "}
                {/* 使用 shrink-0 确保图片容器宽度固定 */}
                <Image
                  src="/images/landing-page.webp"
                  width={300}
                  height={200}
                  alt="Landing Page Preview"
                  // object-cover 是保持比例的关键，rounded-lg 增加美观
                  className="w-full h-auto object-cover shadow rounded-lg"
                />
              </div>

              <div className="flex flex-col justify-between">
                <p >
                  Some text Some textSome textSome textSome texome textSome
                  text...e text Some textSome textSome textSome texome textSome
                  texe text Some textSome textSome textSome texome textSome texe
                  text Some textSome textSome textSome texome textSome texe text
                  Some textSome textSome textSome texome textSome texe text Some
                  textSome textSome textSome texome textSome tex
                </p>
                <div className="pt-4 space-x-2 md:text-right">
                  <Button variant="outline">
                    <Link href="x">View Site</Link>
                  </Button>

                  <Button variant="outline">
                    <Link href="x">View Source</Link>
                  </Button>
                </div>
              </div>
            </div>
          </MagicCard>
        </section>
      </main>
    </>
  );
}
