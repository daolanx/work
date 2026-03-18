# My Work - 个人作品集与管理后台

**中文版本** | [English Version](README.en.md)

一个基于 Next.js 16 构建的现代化全栈作品集和管理后台，集成了 AI 聊天、任务管理和数据分析功能。

**在线演示**: [https://work.daolanx.me/](https://work.daolanx.me/)

[![单元测试](https://github.com/daolanx/work/actions/workflows/unit-tests.yml/badge.svg?branch=main)](https://github.com/daolanx/work/actions/workflows/unit-tests.yml)
[![端到端测试](https://github.com/daolanx/work/actions/workflows/e2e-tests.yml/badge.svg?branch=main)](https://github.com/daolanx/work/actions/workflows/e2e-tests.yml)
![Vercel 部署](https://deploy-badge.vercel.app/vercel/work-chi-three)

---

## 🛠️ 技术栈

### 核心框架
- **Next.js 16** (App Router) - 服务器组件
- **React 19** - 最新 React 与 Hooks
- **TypeScript** - 类型安全开发

### UI 与样式
- **Tailwind CSS** - 实用优先的 CSS
- **shadcn/ui** - 可访问的 UI 组件
- **Radix UI** - 无头 UI 原语
- **Lucide React** - 图标库

### 数据库与 ORM
- **PostgreSQL** - 关系型数据库
- **Drizzle ORM** - 类型安全的 SQL ORM
- **Drizzle Kit** - 迁移与工具

### 认证
- **Better Auth** - 现代化认证方案
- **会话管理** - 安全会话与 IP 追踪
- **OAuth** - GitHub 等第三方登录

### AI 集成
- **Vercel AI SDK** - AI 模型集成
- **OpenRouter** - AI 提供商
- **流式响应** - 实时 AI 聊天

### 国际化
- **next-intl** - Next.js i18n
- **多语言** - 英文与中文支持

### 测试
- **Vitest** - 单元测试
- **Playwright** - 端到端测试
- **Testing Library** - 组件测试

### 开发工具
- **Biome** - 代码检查与格式化
- **Husky** - Git Hooks
- **TypeScript** - 类型检查

## 🚀 快速开始

### 安装
```bash
git clone https://github.com/daolanx/work.git
cd work
pnpm install
```

### 环境配置
创建 `.env.local`：
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
OPENROUTER_API_KEY=your-openrouter-key
```

### 数据库
```bash
pnpm db:gen    # 生成迁移
pnpm db:mi     # 运行迁移
```

### 开发
```bash
pnpm dev       # 启动开发服务器
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 构建与生产
```bash
pnpm build     # 构建生产版本
pnpm start     # 启动生产服务器
```

## 📊 核心功能

### 个人作品集
- 个人资料与技能展示
- 项目展示
- 联系方式
- 主题切换（浅色/深色）
- 语言切换（中/英）

### 管理后台
- **摘要卡片** - 关键指标概览
- **访问者分析** - 交互式图表（Recharts）
- **任务管理** - 完整 CRUD 操作
- **实时更新** - SWR 数据获取

### AI 聊天界面
- **流式响应** - 实时对话
- **消息历史** - 持久化会话
- **文件支持** - 上传附件
- **多模型** - 通过 OpenRouter

### 认证系统
- **登录/注册** - 邮箱密码认证
- **OAuth** - GitHub 集成
- **会话追踪** - IP 和设备信息
- **密码重置** - 邮件验证流程

## 📁 项目结构

```
app/
├── api/           # API 路由 (ai-chat, auth, console)
├── auth/          # 认证页面
├── console/       # 管理后台
├── landing/       # 营销页面
├── ai-chat/       # AI 聊天界面
├── (profile)/     # 个人资料
└── layout.tsx     # 根布局

components/
├── ui/            # shadcn/ui 组件
├── auth/          # 认证组件
├── ai-elements/   # AI 聊天组件
└── forms/         # 表单组件

db/
├── auth.schema.ts # 用户、会话、账户
├── biz.schema.ts  # 任务、访问统计
└── index.ts       # 数据库连接

lib/
├── auth/          # 认证工具
├── validations/   # Zod 模式
└── utils.ts       # 通用工具

i18n/
├── config.ts      # 语言配置
├── locale.ts      # 语言工具
└── request.ts     # i18n 处理

messages/
├── en.json        # 英文翻译
└── zh.json        # 中文翻译
```

## 🧪 测试

```bash
pnpm test        # 所有测试
pnpm test:unit   # 单元测试
pnpm test:e2e    # 端到端测试
pnpm test:api    # API 测试
```

## 📦 数据库模式

### 用户与认证
- **user** - 用户账户 (id, email, name, OAuth)
- **session** - 活动会话 (IP 追踪)
- **account** - OAuth 提供商连接

### 业务逻辑
- **tasks** - 任务管理
  - 分类: PERSONAL, WORK, STUDY, OTHER
  - 优先级: URGENT, HIGH, MEDIUM, LOW
  - 状态: To Do, In Process, Done, Canceled
- **visit_stats** - 流量分析 (桌面/移动)

## 🚀 部署

### Vercel (推荐)
1. 推送到 GitHub
2. 将仓库连接到 Vercel
3. 添加环境变量
4. 自动部署

### 环境变量
```env
# 数据库
DATABASE_URL=postgresql://...

# 认证
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=https://your-app.com

# AI
OPENROUTER_API_KEY=your-key
OPENROUTER_MODEL=anthropic/claude-3-5-sonnet

# 邮件 (可选)
RESEND_API_KEY=your-key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# 分析 (可选)
UMAMI_WEBSITE_ID=your-id
```

## 📝 脚本

### 开发
- `pnpm dev` - 启动开发服务器
- `pnpm lint` - 检查代码质量
- `pnpm lint:fix` - 自动修复问题
- `pnpm format` - 格式化代码
- `pnpm type-check` - TypeScript 检查

### 数据库
- `pnpm db:gen` - 生成迁移
- `pnpm db:mi` - 运行迁移
- `pnpm db:push` - 推送模式
- `pnpm db:studio` - 打开 Drizzle Studio

### 测试
- `pnpm test` - 运行所有测试
- `pnpm test:unit` - 单元测试
- `pnpm test:e2e` - 端到端测试

### Git Hooks
- `pnpm prepare` - 设置 Husky
- `pnpm pre-commit` - 提交前检查

## 🙏 致谢

- [shadcn/ui](https://ui.shadcn.com/) - UI 组件
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI 集成
- [Better Auth](https://www.better-auth.com/) - 认证
- [Drizzle ORM](https://orm.drizzle.team/) - 数据库 ORM
- [Next.js](https://nextjs.org/) - 框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式
- [Shreyas-29/linkify](https://github.com/Shreyas-29/linkify) - 用于落地页

---

**使用 Next.js、TypeScript 和现代 Web 技术精心打造**
