import { getCollection, getEntry } from 'astro:content';
import { marked } from 'marked';

export const md = (text?: string) => (text ? (marked.parse(text, { async: false }) as string) : '');
export const mdInline = (text?: string) => (text ? (marked.parseInline(text, { async: false }) as string) : '');

export const CATEGORY_LABEL: Record<string, string> = {
  publication: '논문',
  project: '과제',
  award: '수상',
  members: '구성원',
  presentation: '발표',
  etc: '소식',
};

export const GROUPS = [
  { key: 'professor', label: 'Professor' },
  { key: 'researcher', label: 'Researcher' },
  { key: 'staff', label: 'Staff' },
  { key: 'alumni', label: 'Alumni' },
] as const;

export async function getSettings() {
  const home = (await getEntry('settings', 'home'))?.data ?? {};
  const site = (await getEntry('settings', 'site'))?.data ?? {};
  return { home, site };
}

export const doiUrl = (doi: string) => `https://doi.org/${doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')}`;

export async function getPublications() {
  const all = await getCollection('publications');
  return all
    .map((e) => e.data)
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
}

export type FeedItem = {
  date: Date;
  title: string;
  link?: string;
  html: string;
  category: string;
};

/** 뉴스 = 직접 작성한 뉴스 + "홈 뉴스에 표시"가 켜진 논문 */
export async function getNewsFeed(): Promise<FeedItem[]> {
  const news = await getCollection('news');
  const items: FeedItem[] = news.map((e) => ({
    date: e.data.date,
    title: e.data.title,
    link: e.data.link || undefined,
    html: md(e.body),
    category: e.data.category,
  }));

  for (const p of await getPublications()) {
    if (!p.news || !p.date || !p.title) continue;
    const parts: string[] = [];
    if (p.news_title) parts.push(`“${escapeHtml(p.title)}”`);
    if (p.journal) parts.push(`<span class="journal">${escapeHtml(p.journal)}</span> 게재`);
    items.push({
      date: p.date,
      title: p.news_title || p.title,
      link: doiUrl(p.doi),
      html: parts.length ? `<p>${parts.join(' — ')}</p>` : '',
      category: 'publication',
    });
  }
  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getMembers() {
  const all = await getCollection('members');
  return all.map((e) => e.data).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'ko'));
}

export async function getResearch() {
  const all = await getCollection('research');
  return all.map((e) => e.data).sort((a, b) => a.order - b.order);
}

export const fmtDate = (d: Date) =>
  `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}`;

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
