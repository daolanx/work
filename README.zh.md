# My Work - 个人作品集与管理后台

**中文版本** | [English Version](README.md)

一个基于 Next.js 16 构建的现代化全栈作品集和管理后台，集成了 AI 聊天、任务管理和数据分析功能。

**在线演示**: [https://demo.daolanx.com/](https://demo.daolanx.com/)

[![单元测试](https://github.com/daolanx/work/actions/workflows/unit-tests.yml/badge.svg?branch=main)](https://github.com/daolanx/work/actions/workflows/unit-tests.yml)
[![端到端测试](https://github.com/daolanx/work/actions/workflows/e2e-tests.yml/badge.svg?branch=main)](https://github.com/daolanx/work/actions/workflows/e2e-tests.yml)
![Vercel 部署](https://deploy-badge.vercel.app/vercel/work-chi-three)

---

## 技术栈

### 核心框架
- **Next.js 16.1.1** (App Router) - 服务器组件，React Compiler
- **React 19.2.3** - 最新 React 与 Hooks
- **TypeScript** - 严格模式，bundler 模块解析

### UI 与样式
- **Tailwind CSS v4** - CSS 配置（无 tailwind.config.ts）
- **shadcn/ui** - 40+ 可访问 UI 组件
- **Radix UI** - 无头 UI 原语
- **Lucide React / Tabler Icons** - 图标库

### 数据库与 ORM
- **PostgreSQL** (Neon Serverless) - 关系型数据库
- **Drizzle ORM** - 类型安全的 SQL ORM
- **Drizzle Kit** - 迁移与工具

### 认证与支付
- **Better Auth** - 现代化认证方案，支持 Admin 插件
- **OAuth** - GitHub & Google 第三方登录
- **Creem.io** - 订阅付费（Hobby/Pro/Studio 三档）

### AI 集成
- **Vercel AI SDK** - AI 模型集成
- **OpenRouter** - 多模型提供商
- **流式响应** - 实时 AI 聊天

### 状态与数据
- **SWR** - 客户端数据获取与缓存
- **Zustand** - 全局客户端状态
- **Zod** - Schema 校验（前后端统一）

### 国际化
- **next-intl** - Next.js i18n
- **多语言** - 英文与中文支持

### 测试与质量
- **Vitest** - 单元测试与组件测试
- **Playwright** - 端到端测试
- **Biome** - 代码检查与格式化
- **Husky** - Git Hooks + lint-staged

---

## 快速开始

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
pnpm dev       # 启动开发服务器 (http://localhost:3000)
```

---

## 项目结构

```
app/                          # Next.js App Router
├── (profile)/                # 路由组：Demo Gallery 首页
├── ai-chat/                  # AI 聊天界面
├── api/                      # API 路由
│   ├── ai-chat/              #   AI 流式端点
│   ├── auth/[...all]/        #   Better Auth 全捕获
│   ├── console/tasks/        #   任务 CRUD API
│   └── console/user/         #   用户资料、上传、访客统计
├── auth/                     # 认证页面（登录、注册、重置密码）
├── console/                  # 管理后台
│   ├── admin/                #   用户管理（仅管理员）
│   ├── plans/                #   订阅与定价
│   ├── profile/              #   用户资料编辑
│   └── tasks/                #   任务列表与详情
├── flower-shop/              # Demo：花卉电商
├── landing/                  # 营销落地页
└── legal/                    # 法律页面（隐私、退款、条款）

features/                     # 基于功能模块的架构
├── console/                  # 核心控制台功能
│   ├── auth/                 #   认证 schemas、service、组件
│   ├── components/           #   布局（header、sidebar）、providers
│   ├── dashboard/            #   数据分析（MAU、留存、图表）
│   ├── email/                #   邮件模板（Resend + React Email）
│   ├── payments/             #   Creem.io 支付集成
│   ├── profile/              #   作品集展示组件
│   ├── task/                 #   任务 CRUD、CardTable、hooks
│   └── user/                 #   用户管理、R2 上传、hooks
├── ai-chat/                  # AI 聊天功能
├── landing/                  # 落地页组件
└── flower-shop/              # 花卉电商组件

components/
├── ui/                       # shadcn/ui 组件（40+）
├── ai-elements/              # AI 聊天 UI 原语
└── forms/                    # 基于 Schema 的表单组件

db/
├── auth.schema.ts            # 用户、会话、账户、验证码
├── biz.schema.ts             # 任务、访问统计、订阅
└── index.ts                  # 数据库连接（Neon + Drizzle）

lib/
├── api-handler.ts            # 类型化 API 处理器（含认证与错误包装）
├── errors.ts                 # 自定义 ValidationError 类
├── session.ts                # 会话工具
└── utils.ts                  # cn() className 合并工具
```

---

## 核心功能

### 管理后台
- **摘要卡片** - MRR、留存率、转化率、MAU（Server Component）
- **访问者分析** - Recharts 交互式图表
- **用户管理** - 封禁/解封、角色切换（仅管理员）
- **任务管理** - 完整 CRUD，支持分页、筛选、排序

### AI 聊天界面
- **流式响应** - 通过 OpenRouter 实时对话
- **消息历史** - 持久化会话
- **多模型** - 切换不同 AI 模型

### 认证系统
- **登录/注册** - 邮箱密码认证
- **OAuth** - GitHub & Google 第三方登录
- **密码重置** - 通过 Resend 发送验证邮件
- **会话追踪** - IP 和设备信息

### 支付系统
- **订阅套餐** - Hobby / Pro / Studio
- **结账流程** - Creem.io 集成
- **账单管理** - 客户门户

---

## 架构模式

### 基于功能模块的目录结构
每个功能模块（`features/console/task/` 等）包含：
- `service.ts` - Server Actions 处理写操作
- `hooks/` - SWR hooks 处理客户端数据获取
- `components/` - 功能特定的 UI 组件
- `schemas.ts` - Zod 校验 schemas
- `constants.ts` - 枚举映射与配置

### 数据流
- **读取**: Client Component → SWR Hook → API Route → Service → DB
- **写入**: Client Component → SWR Mutation → Server Action → DB → revalidatePath

### 错误处理
- `api-handler.ts` 包装所有 API 路由，提供 `withErrorHandler`
- `authApi` 注入 session 校验用于受保护路由
- 自定义 `ValidationError` 用于业务逻辑错误

---

## 命令

### 开发
```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm type-check   # TypeScript 检查
```

### 代码质量
```bash
pnpm lint         # Biome 检查
pnpm format       # Biome 格式化
pnpm lint:fix     # 自动修复问题
```

### 测试
```bash
pnpm test         # 所有测试（vitest + playwright）
pnpm test:unit    # 仅单元测试
pnpm test:e2e     # 仅端到端测试
pnpm test:api     # API 测试
pnpm test:ui      # 组件测试
```

### 数据库
```bash
pnpm db:gen       # 生成迁移
pnpm db:mi        # 运行迁移
pnpm db:push      # 推送 schema 到数据库
pnpm db:studio    # 打开 Drizzle Studio
```

---

## 环境变量

```env
# 数据库（必需）
DATABASE_URL=postgresql://...

# 认证（必需）
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=https://your-app.com

# AI（聊天功能必需）
OPENROUTER_API_KEY=your-key
OPENROUTER_MODEL=anthropic/claude-3-5-sonnet

# 邮件（可选）
RESEND_API_KEY=your-key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# 存储（可选，头像上传）
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_URL=https://your-bucket.r2.dev
```

---

## 致谢

- [shadcn/ui](https://ui.shadcn.com/) - UI 组件
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI 集成
- [Better Auth](https://www.better-auth.com/) - 认证
- [Drizzle ORM](https://orm.drizzle.team/) - 数据库 ORM
- [Next.js](https://nextjs.org/) - 框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式
- [Shreyas-29/linkify](https://github.com/Shreyas-29/linkify) - 用于落地页

---

**使用 Next.js 16、React 19 和现代 Web 技术精心打造**
