import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 文章集合 —— 在 src/content/blog/ 下新增 .md 或 .mdx 文件即可发布。
 * 所有字段都有合理默认值，写作时只需填写 title / description / pubDate。
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover: z.string().default('/covers/cover-01.svg'),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('随笔'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    accent: z.string().default('ember'),
  }),
});

/**
 * 笔记集合 —— 更短、更轻量的想法碎片，位于 src/content/notes/。
 */
const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    mood: z.string().default('思考'),
    accent: z.string().default('indigo'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, notes };
