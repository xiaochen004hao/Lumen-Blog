import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { plainText } from '../utils/format';
import { entrySlug } from '../utils/format';

/** Generated at build time. Kept tiny so ⌘K search stays instant and dependency-free. */
export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const notes = await getCollection('notes', ({ data }) => !data.draft);

  const items = [
    ...posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      url: `/writing/${entrySlug(post)}`,
      type: '文章',
      tags: post.data.tags,
      date: post.data.pubDate.toISOString().slice(0, 10),
      text: plainText(post.body, 600),
    })),
    ...notes.map((note) => ({
      title: note.data.title,
      description: note.data.description ?? '',
      url: `/notes/${entrySlug(note)}`,
      type: '笔记',
      tags: note.data.tags,
      date: note.data.pubDate.toISOString().slice(0, 10),
      text: plainText(note.body, 600),
    })),
  ];

  return new Response(JSON.stringify(items), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
