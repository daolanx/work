"use client";

import { MagicCard } from "./ui/magic-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export default function SiteCard(props: {
  siteTitle: string;
  sitePreviewUrl: string;
  siteDesciption: string;
  siteWebUrl: string;
  siteSourceUrl: string;
}) {
  const { theme } = useTheme();
  const t = useTranslations('profile');
  const { siteTitle, sitePreviewUrl, siteDesciption, siteWebUrl, siteSourceUrl } = props;

  return (
    <MagicCard
      className="p-6 mb-6 rounded-xl  hover:shadow-sm transition-all duration-300 "
      gradientColor={theme === "dark" ? "#000" : "#fff"}
    >
      <h3 className="font-bold font-sans text-xl mb-2 border-b-1 pb-2 mb-4">
        {siteTitle}
      </h3>

      {/* 添加 items-start 防止图片在垂直方向被拉伸 */}
      <div className="md:flex md:items-start space-x-4">
        <div className="w-3/5 mb-4 md:w-[40%] shrink-0 ">
          {" "}
          {/* 使用 shrink-0 确保图片容器宽度固定 */}
          <Image
            src={sitePreviewUrl}
            width={300}
            height={200}
            alt="Landing Page Preview"
            // object-cover 是保持比例的关键，rounded-lg 增加美观
            className="w-full h-auto object-cover shadow rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-between">
          <p>
            {siteDesciption}
          </p>
          <div className="pt-4 space-x-2 md:text-right">
            <Button variant="outline">
              <Link target="_blank" href={siteWebUrl}>{t('view-site')}</Link>
            </Button>

            <Button variant="outline">
              <Link target="_blank" href={siteSourceUrl}>{t('view-source')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </MagicCard>
  );
}
