import type { APIRoute } from 'astro';
import { siteConfig } from '../data/site.config';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? siteConfig.url;
  const body = `User-agent: *
Allow: /
Disallow: /search-index.json

Sitemap: ${origin}/sitemap-index.xml
`;
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
