"use client";

import { MagicCard } from "./ui/magic-card";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { type Site } from "@/app/api/site";
import { motion } from "motion/react";
import Link from "next/link";

export default function SiteCard(props: Site) {
  const { theme } = useTheme();
  const t = useTranslations("profile");
  const {
    title,
    previewUrl,
    description,
    webUrl,
    sourceUrl,
    keywords
  } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // 初始状态：透明且向下位移
      whileInView={{ opacity: 1, y: 0 }} // 进入视口后的状态
      viewport={{ once: true, amount: 0.2 }} // once: true 表示只执行一次；amount 表示进入 20% 时触发
      transition={{ duration: 0.5, ease: "easeOut" }} // 动画曲线
    >
 <MagicCard
      className="p-6 mb-6 rounded-xl  hover:shadow-sm transition-all duration-300 "
      gradientColor={theme === "dark" ? "#000" : "#fff"}
    >
      <h3 className="font-bold font-sans text-xl mb-2 border-b-1 pb-2 mb-4 flex justify-between">
       <span>{title}</span> <Badge variant={'secondary'}>Mock Data</Badge>
      </h3>

      <div className="md:flex space-x-4 relative">
        <div className="w-3/5 mb-4 md:w-[40%] shrink-0 ">
          <Image
            src={previewUrl}
            width={300}
            height={200}
            alt="Landing Page Preview"

            className="w-full h-auto object-cover shadow rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <p>{description}</p>
          <div className="space-x-2 mt-2 md:pb-16">
            {
              keywords.map(keyword => <Badge variant="secondary" key={keyword} className=" rounded-sm">{keyword}</Badge>)
            }
          </div>
          <div className="pt-4 space-x-2 md:text-right md:absolute md:bottom-0 md:right-0">
            <Button asChild  className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/60 dark:hover:text-blue-300">
              <Link target="_blank" href={webUrl}>
                {t("view-site")}
              </Link>
            </Button>

            <Button asChild  className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/60 dark:hover:text-blue-300">
             
              <Link target="_blank" href={sourceUrl}>
                {t("view-source")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MagicCard>
    </motion.div>
   
  );
}
