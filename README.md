# 留白 · Lumen

一个用 **Astro 7** 打造的高级静态数字花园 / 博客。零前端框架、SVG 原生封面、系统字体栈，兼顾极速加载与细腻交互。

---

## ✨ 特性一览

**访客体验**
- 极光渐变 Hero + 细颗粒质感 + 逐行入场动画
- 深浅主题切换（带圆形扩散动画，记忆偏好，防止首屏闪白）
- 全站搜索 `⌘/Ctrl + K`，支持标题 / 标签 / 正文加权匹配与方向键操作
- 文章列表：标签筛选、网格 / 列表视图切换
- 文章页：阅读进度条、滚动高亮目录、代码块一键复制、分享、作者卡片、相关阅读
- 笔记页：心情筛选与独立详情页
- 标签云、关于页、创意 404、RSS、Sitemap、robots.txt
- 主题切换使用 View Transition 双层圆形揭幕（从按钮位置扩散，无橙色遮罩），客户端换页后自动恢复已选主题
- 页面标题跨页形变过渡、卡片鼠标跟随光晕、按钮磁吸微动、精选卡片旋转渐变描边、Hero / 封面视差
- 文章标题支持悬停显示锚点链接；返回顶部按钮带环形滚动进度
- 完整支持 `prefers-reduced-motion`，移动端深度适配

**站长友好**
- `src/data/site.config.ts` 单一配置文件管理站名、作者、导航、社交、首页文案、统计数字
- 内容集合（Content Collections）带类型校验：写错字段构建时报错
- Markdown 与 MDX 共存，MDX 内置 `<Callout>` / `<Figure>` 组件
- 所有视觉 token 集中在 `src/styles/global.css` 顶部，改一处即可换肤
- 组件化结构，页面与内容完全解耦

**性能**
- 构建产物约 1.2 MB（含全部 SVG 与 32 个页面）
- 站点交互脚本 gzip 后约 **3.8 KB**，路由脚本约 5.3 KB
- 无 Web 字体请求、无图片请求（封面均为内联友好的 SVG）
- 静态输出，可部署到任何静态托管平台

---

## 🚀 快速开始

```bash
npm install       # 安装依赖
npm run dev       # 本地开发，默认 http://localhost:4321
npm run build     # 生成 dist/ 静态站点
npm run preview   # 预览构建产物
```

> 本项目使用 Astro 7，需要 **Node.js ≥ 22.23.4**（本机 `D:/nodejs` 为 v24.11.1，已验证构建通过）。
> 注意：WorkBuddy 内置终端的默认 Node 是 v22.22.2，若在内置终端运行命令，请先执行
> `export PATH="/d/nodejs:$PATH"`；使用系统终端且已指向 Node 24 时无需此步。

---

## 📁 目录结构

```
Lumen-Blog/
├── astro.config.mjs          # Astro 配置（ integrations / SEO / 构建 ）
├── src/
│   ├── content.config.ts     # 内容集合 schema（文章 / 笔记的字段定义）
│   ├── data/site.config.ts   # ⭐ 站点唯一配置文件
│   ├── styles/global.css     # ⭐ 全站设计 token 与基础样式
│   ├── components/           # 可复用组件（Header / 卡片 / 搜索 / 动画…）
│   │   └── mdx/              # MDX 专用组件
│   ├── layouts/              # BaseLayout / PostLayout
│   ├── pages/                # 所有页面与 RSS / 搜索索引 / robots
│   ├── content/
│   │   ├── blog/             # ⭐ 文章放这里（.md / .mdx）
│   │   └── notes/            # ⭐ 笔记放这里（.md / .mdx）
│   └── utils/                # 日期、阅读时长、MDX 映射等工具
└── public/
    ├── covers/               # 文章封面 SVG（可直接替换）
    ├── favicon.svg
    ├── avatar.svg            # 作者头像
    └── og-default.svg        # 默认社交分享图
```

---

## ✍️ 发布一篇文章

在 `src/content/blog/` 新建 `my-post.md`：

```markdown
---
title: 文章标题
description: 一句话摘要，会显示在卡片和 SEO 描述中
pubDate: 2026-11-20
updatedDate: 2026-11-21          # 可选
cover: /covers/cover-01.svg      # 可选，默认 cover-01
coverAlt: 封面描述               # 可选
tags: [设计, 前端, 思考]          # 可选
category: 设计                   # 可选，默认「随笔」
featured: true                   # 可选，设为首页精选
draft: false                     # 可选，true 则不会生成页面
accent: ember                    # 可选：ember / indigo / mint / rose
---

正文从这里开始。支持标准 Markdown， headings 会自动进入文章目录。
```

保存后即可在 `/writing/my-post` 看到文章。无需注册路由。

### MDX 组件

把文件后缀改为 `.mdx` 即可使用内置组件：

```mdx
<Callout type="tip" title="小提示">
这里是一段提示内容。type 可选 note / tip / warning / quote。
</Callout>

<Figure src="/covers/cover-03.svg" alt="描述" caption="图注文字" />
```

---

## 📝 发布一条笔记

在 `src/content/notes/` 新建文件，字段更少：

```markdown
---
title: 笔记标题
description: 可选摘要
pubDate: 2026-11-20
tags: [灵感, 设计]
mood: 思考          # 可选，用于筛选，默认「思考」
accent: indigo      # 可选
draft: false
---

简短的想法正文。
```

---

## 🎨 修改界面

| 想改什么 | 改哪里 |
| --- | --- |
| 站名 / 作者 / 邮箱 / 导航 / 社交链接 | `src/data/site.config.ts` |
| 首页大标题、按钮文案、统计数字 | `src/data/site.config.ts` → `hero` / `stats` |
| 配色（浅色 / 深色） | `src/styles/global.css` → `:root` 与 `[data-theme='dark']` |
| 圆角 / 阴影 / 动画节奏 | `src/styles/global.css` → `--radius-*` / `--shadow-*` / `--t-*` |
| 正文字体与行高 | `src/styles/global.css` → `.prose` |
| 卡片 / 页头等局部样式 | 对应 `.astro` 组件底部的 `<style>` |
| 封面图 | 替换 `public/covers/` 下的同名 SVG，或在 frontmatter 指定新路径 |

---

## 🌐 部署前必做

1. 把 `src/data/site.config.ts` 里的 `url` 改成你的真实域名（ RSS / Sitemap / SEO 依赖它 ）。
2. 把 `socials`、`author.email`、`newsletter.action` 换成真实信息。
3. 新闻订阅目前是**演示表单**：填写真实邮件列表服务地址后，提交会自动走正常表单流程。
4. 执行 `npm run build`，将 `dist/` 目录上传到任意静态托管服务（Vercel / Netlify / Cloudflare Pages / GitHub Pages 等）。

---

## 🧩 交互脚本说明

全站只有一个约 3.8 KB（gzip）的交互脚本，位于 `src/layouts/BaseLayout.astro` 底部。它负责：
主题切换与记忆、搜索弹层、滚动揭示、统计数字滚动、阅读进度与目录高亮、
代码复制、列表筛选 / 视图切换、分享链接复制、背景网格辉光追踪、移动端菜单、订阅表单演示。

脚本监听 Astro 的 `astro:page-load` 事件，因此在客户端路由切换页面后依然正常工作。

---

## 💬 评论区（Waline）

文章页与笔记页内置 [Waline](https://waline.js.org) 评论，服务地址配置在
`src/data/site.config.ts` 的 `walineServer` 字段（当前为 `https://waline.xc4h.qzz.io/`）。

- 懒加载：读者滚动到评论区附近才初始化，不影响首屏速度；
- 深浅主题自动跟随站点 `data-theme`；
- 客户端换页时自动销毁重建，不泄漏监听器；
- 换成自己的服务：改 `walineServer` 一个字段即可，或部署一个免费的 [Waline 服务端](https://waline.js.org/guide/get-started/)。

---

## 🔗 分享接口

文章与笔记页各有一组分享按钮（文章右栏 + 文末）：
**系统分享**（支持 Web Share API 的浏览器自动显示）、**复制链接**、**微博**、**QQ 空间**、**X**、**Telegram**、**邮件**。

---

## 📄 许可

自由使用、修改与商用。如果它帮你省了时间，欢迎在文末保留一行「Made with 留白 · Lumen」。
