
import { getLocale } from 'next-intl/server';
import { type Locale } from '@/app/i18n/config'

type SiteContent = {
  title: string;
  keywords: string[];
  description: string;
};

type SiteMeta= {
  previewUrl: string;
  webUrl: string;
  sourceUrl: string;
  en: SiteContent;
  zh: SiteContent;
};

export type Site = {
  title: string;
  keywords: string[];
  description: string;
  previewUrl: string;
  webUrl: string;
  sourceUrl: string;
};

const sites: SiteMeta[] = [
  {
    previewUrl: "/images/landing-page.webp",
    webUrl: "/landing",
    sourceUrl: "https://github.com/daolanx/work",
    en: {
      title: "Landing Page",
      keywords: ["Responsive", "Speed", "Motion", "SEO"],
      description: "Highly polished landing page featuring smooth scroll animations and pixel-perfect UI implementation. SEO-optimized landing page with high-speed loading performance and interactive storytelling elements."
    },
    zh: {
      title: "品牌落地页",
      keywords: ["响应式", "极致性能", "动效", "SEO"],
      description: "高度打磨的落地页，具备平滑的滚动动画和像素级 UI 实现。针对搜索引擎优化的同时，提供高速加载性能和互动式叙事体验。"
    }
  },
  {
    previewUrl: "/images/ai-chat-page.webp",
    webUrl: "x",
    sourceUrl: "x",
    en: {
      title: "AI Chat Page",
      keywords: ["LLM", "Streaming", "Prompts", "Context"],
      description: "Intelligent conversational interface featuring real-time stream response and multi-turn context management. Optimized for seamless human-AI interaction with markdown rendering and code highlighting."
    },
    zh: {
      title: "AI 对话页",
      keywords: ["大模型", "流式响应", "提示词", "上下文"],
      description: "智能对话界面，支持实时流式响应和多轮对话上下文管理。针对人机交互进行了深度优化，集成 Markdown 解析与代码高亮显示。"
    }
  },
  {
    previewUrl: "/images/e-commerce-page.webp",
    webUrl: "x",
    sourceUrl: "x",
    en: {
      title: "E-commerce Page",
      keywords: ["State Logic", "API", "Components"],
      description: "A high-performance storefront featuring complex state management and seamless shopping cart interactions. Responsive e-commerce interface optimized for core web vitals and conversion-driven UX."
    },
    zh: {
      title: "电商页",
      keywords: ["状态逻辑", "API 交互", "组件化"],
      description: "高性能电商前端，具备复杂的购物车状态管理和无缝交互。响应式界面针对核心 Web 指标优化，助力高转化率的交互体验。"
    }
  },
  {
    previewUrl: "/images/social-page.webp",
    webUrl: "x",
    sourceUrl: "x",
    en: {
      title: "Social Media Page",
      keywords: ["Real-time", "Infinite Scroll", "Engagement"],
      description: "Dynamic social feed with features like infinite scrolling, real-time notifications, and media lazy loading. Interactive community platform emphasizing component reusability and real-time user engagement."
    },
    zh: {
      title: "社交媒体页",
      keywords: ["实时通信", "无限滚动", "高参与度"],
      description: "动态社交动态流，支持无限滚动、实时通知和媒体懒加载。强调组件复用性的互动社区平台，专注于实时用户参与。"
    }
  },
  {
    previewUrl: "/images/console-page.webp",
    webUrl: "x",
    sourceUrl: "x",
    en: {
      title: "Console Page",
      keywords: ["Data Viz", "RBAC", "DDD", "Scalable"],
      description: "Advanced data visualization dashboard with real-time analytics and customizable widget layouts. Role-based access control (RBAC) management system built with scalable component architecture."
    },
    zh: {
      title: "控制台页面",
      keywords: ["数据可视化", "权限控制", "DDD", "可扩展"],
      description: "高级数据可视化仪表盘，具备实时分析和可定制的组件布局。基于领域驱动设计（DDD）构建的权限管理系统，具备可扩展的组件架构。"
    }
  }
];

export async function getSites(): Promise<Site[]> {
  const locale = (await getLocale()) as Locale;
  return sites.map((site) => ({
    previewUrl: site.previewUrl,
    webUrl: site.webUrl,
    sourceUrl: site.sourceUrl,
    ...site[locale],
  }));
}