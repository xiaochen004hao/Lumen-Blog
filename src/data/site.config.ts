/**
 * ============================================================
 *  站点唯一配置文件
 *  改这里即可替换站名、作者、导航、社交链接、首页文案与统计数字。
 *  无需改动任何组件代码。
 * ============================================================
 */
export const siteConfig = {
  /** 部署后的完整域名（结尾不要带斜杠），用于 RSS / Sitemap / SEO */
  url: 'https://blog.xc4h.qzz.io',
  locale: 'zh-CN',
  title: '留白 · Lumen',
  shortTitle: 'Lumen',
  tagline: '给思想留一点光',
  description:
    'xiaochen004hao 的数字花园。记录学习笔记、设计与代码的思考，以及那些值得被反复咀嚼的瞬间。',
  keywords: ['设计', '前端开发', 'Astro', '数字花园', '写作', '学习笔记'],
  themeColor: '#f6f5f1',

  author: {
    name: 'xiaochen004hao',
    englishName: 'xiaochen004hao',
    role: '正在学习一切新鲜事物',
    bio: '嗨，我是 xiaochen004hao，一个正在学习一切新鲜事物的小萌新。这里是我记录学习笔记、分享有趣东西的地方——我会把这个花园一点点打造成真正美观、有用的地方。',
    avatar: '/avatar.png',
    location: 'Earth',
    email: 'xiaochen004hao@users.noreply.github.com',
    status: '花园建设中',
  },

  hero: {
    eyebrow: 'A QUIET CORNER OF THE INTERNET',
    /** 每一行单独成段，方便做逐行入场动画 */
    lines: ['留一点白，', '让思想发光。'],
    highlight: '发光',
    description:
      '这里收藏我的文章、笔记与灵感碎片。不追热点，只记录那些经过时间沉淀后，依然值得被看见的东西。',
    primaryCta: { label: '开始阅读', href: '/writing' },
    secondaryCta: { label: '认识我', href: '/about' },
  },

  nav: [
    { label: '首页', href: '/' },
    { label: '文章', href: '/writing' },
    { label: '笔记', href: '/notes' },
    { label: '标签', href: '/tags' },
    { label: '关于', href: '/about' },
  ],

  socials: [
    { label: 'GitHub', href: 'https://github.com/xiaochen004hao', icon: 'github' },
    { label: 'Bilibili', href: 'https://space.bilibili.com/3546624408160947', icon: 'bilibili' },
    { label: 'RSS', href: '/rss.xml', icon: 'rss' },
  ],

  /** 首页数字动效，数值会在进入视口时滚动到目标值 */
  stats: [
    { value: 12, suffix: '+', label: '篇文字' },
    { value: 14, suffix: '', label: '个标签' },
    { value: 3, suffix: '', label: '年记录' },
    { value: 100, suffix: '%', label: '好奇心' },
  ],

  /** 关于页面的「现在」清单 */
  now: [
    { label: '正在做', value: '打造这座「留白」数字花园' },
    { label: '正在学', value: 'Astro / 前端工程 / 一切新鲜事物' },
    { label: '正在写', value: '学习笔记与踩坑记录' },
    { label: '正在玩', value: '开源项目与独立小工具' },
  ],

  newsletter: {
    title: '偶尔，写一封信给你',
    description: '每月一封，关于设计、代码与生活。不打扰，不贩卖焦虑，随时可以离开。',
    placeholder: '你的邮箱地址',
    buttonLabel: '订阅',
    /** 替换成你的邮件列表服务地址，或保留 # 作为演示 */
    action: '#',
    note: '已有 2,480 位朋友订阅',
  },

  footerNote: '用 Astro 与耐心搭建 · 保持好奇，保持温柔',

  /** Waline 评论服务地址（文章页与笔记页的评论区） */
  walineServer: 'https://waline.xc4h.qzz.io/',
} as const;

export type SiteConfig = typeof siteConfig;
