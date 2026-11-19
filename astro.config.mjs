import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Single source of truth: edit src/data/site.config.ts to change the site URL.
import { siteConfig } from './src/data/site.config.ts';

export default defineConfig({
  site: siteConfig.url,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
