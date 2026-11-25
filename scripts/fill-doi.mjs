// DOI만 입력된 논문 파일에 Crossref 정보(제목, 저자, 저널, 날짜)를 자동으로 채웁니다.
// 이미 입력된 값은 덮어쓰지 않습니다.
import fs from 'node:fs';
import path from 'node:path';
import { parse, stringify } from 'yaml';

const DIR = 'src/content/publications';
const UA = 'BAPORLabWebsite/1.0 (+https://baporlab.github.io)';

export const normalizeDoi = (doi) =>
  String(doi ?? '')
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
    .replace(/^doi:\s*/i, '')
    .trim();

const clean = (s) => String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function lookup(doi) {
  const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
    headers: { 'User-Agent': UA },
  });
  if (!res.ok) throw new Error(`Crossref ${res.status}`);
  const m = (await res.json()).message;
  const parts = (m.published || m.issued || m['published-online'] || m['published-print'])?.['date-parts']?.[0] ?? [];
  const [y, mo = 1, d = 1] = parts;
  return {
    title: clean(m.title?.[0]),
    authors: (m.author ?? []).map((a) => clean([a.given, a.family].filter(Boolean).join(' ') || a.name)).filter(Boolean),
    journal: clean(m['container-title']?.[0] || m.publisher),
    date: y ? `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}` : undefined,
  };
}

const isEmpty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0);

let changed = 0;
let failed = 0;
for (const f of fs.readdirSync(DIR).filter((f) => /\.ya?ml$/.test(f))) {
  const file = path.join(DIR, f);
  const data = parse(fs.readFileSync(file, 'utf8')) ?? {};
  const doi = normalizeDoi(data.doi);
  const needs = ['title', 'authors', 'journal', 'date'].filter((k) => isEmpty(data[k]));
  if (doi === data.doi && needs.length === 0) continue;

  data.doi = doi;
  if (needs.length) {
    try {
      const meta = await lookup(doi);
      for (const k of needs) if (!isEmpty(meta[k])) data[k] = meta[k];
      console.log(`✔ ${f}: ${needs.join(', ')} 자동 입력`);
    } catch (e) {
      failed++;
      console.warn(`⚠ ${f}: DOI ${doi} 정보를 가져오지 못했습니다 (${e.message}). DOI가 정확한지 확인해 주세요.`);
    }
  }
  const ordered = Object.fromEntries(
    ['doi', 'title', 'authors', 'journal', 'date', 'news', 'news_title']
      .filter((k) => data[k] !== undefined)
      .map((k) => [k, data[k]])
      .concat(Object.entries(data).filter(([k]) => !['doi', 'title', 'authors', 'journal', 'date', 'news', 'news_title'].includes(k))),
  );
  fs.writeFileSync(file, stringify(ordered, { lineWidth: 0 }));
  changed++;
}
console.log(`DOI 자동 입력: ${changed}개 파일 갱신${failed ? `, ${failed}개 실패` : ''}`);
