/** Shared formatting helpers used by cards, pages and feeds. */

export function formatDate(date: Date, style: 'long' | 'short' | 'iso' = 'long'): string {
  if (style === 'iso') return date.toISOString().slice(0, 10);
  if (style === 'short') {
    return new Intl.DateTimeFormat('zh-CN', { year: '2-digit', month: '2-digit', day: '2-digit' })
      .format(date)
      .replace(/\//g, '.');
  }
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

/** Rough reading time tuned for Chinese text (~400 chars/min). */
export function readingTime(body?: string | null): number {
  if (!body) return 3;
  const chars = body.replace(/[\s#*`>\[\]()!\-_]/g, '').length;
  return Math.max(1, Math.round(chars / 400));
}

/** Strip markdown syntax for search snippets and meta descriptions. */
export function plainText(body?: string | null, max = 180): string {
  if (!body) return '';
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

export function tagUrl(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}`;
}
