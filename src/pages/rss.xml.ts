import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site.config';
import { entrySlug } from '../utils/format';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/writing/${entrySlug(post)}`,
      categories: post.data.tags,
      content: post.body ?? '',
    })),
    customData: `<language>${siteConfig.locale}</language><managingEditor>${siteConfig.author.email} (${siteConfig.author.name})</managingEditor>`,
  });
}
