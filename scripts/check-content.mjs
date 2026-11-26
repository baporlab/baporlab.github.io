// 사이트를 만들기 전에 흔한 입력 실수를 찾아 알려줍니다.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const errors = [];
const warnings = [];

function load(dir, exts = /\.ya?ml$/) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => exts.test(f)).map((f) => {
    const file = path.join(dir, f);
    try {
      const raw = fs.readFileSync(file, 'utf8');
      const text = f.endsWith('.md') ? (raw.match(/^---\n([\s\S]*?)\n---/) || [, ''])[1] : raw;
      return { file, data: parse(text) ?? {} };
    } catch (e) {
      errors.push(`${file}: 파일 형식 오류 — ${e.message.split('\n')[0]}`);
      return { file, data: {} };
    }
  });
}

const imageExists = (url) => !url || /^https?:/.test(url) || fs.existsSync(path.join('public', decodeURI(url)));

// 논문: 중복 DOI
const seen = new Map();
for (const { file, data } of load('src/content/publications')) {
  const doi = String(data.doi ?? '').trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').replace(/^doi:\s*/i, '').toLowerCase();
  if (!doi) { errors.push(`${file}: DOI가 비어 있습니다.`); continue; }
  if (!/^10\.\d{4,9}\/\S+$/.test(doi)) errors.push(`${file}: DOI 형식이 올바르지 않습니다 (${data.doi}). 예: 10.1007/s10877-026-01427-x`);
  if (seen.has(doi)) errors.push(`같은 DOI(${doi})가 두 번 등록되어 있습니다: ${seen.get(doi)} / ${file}`);
  seen.set(doi, file);
  if (!data.title) warnings.push(`${file}: 제목이 아직 없습니다 (DOI 자동 입력 전이면 정상입니다).`);
}

// 멤버: 사진 파일
for (const { file, data } of load('src/content/members')) {
  if (!data.name) errors.push(`${file}: 이름이 비어 있습니다.`);
  if (!imageExists(data.photo)) errors.push(`${file}: 사진 파일을 찾을 수 없습니다 (${data.photo}).`);
}

// 연구 이미지
for (const { file, data } of load('src/content/research')) {
  if (!imageExists(data.image)) errors.push(`${file}: 이미지 파일을 찾을 수 없습니다 (${data.image}).`);
}

// 홈 슬라이드
for (const { file, data } of load('src/content/settings')) {
  for (const s of data.slides ?? []) if (!imageExists(s.image)) errors.push(`${file}: 슬라이드 이미지를 찾을 수 없습니다 (${s.image}).`);
}

// 뉴스
for (const { file, data } of load('src/content/news', /\.md$/)) {
  if (!data.title) errors.push(`${file}: 뉴스 제목이 비어 있습니다.`);
  if (!data.date) errors.push(`${file}: 뉴스 날짜가 비어 있습니다.`);
}

warnings.forEach((w) => console.warn('⚠', w));
if (errors.length) {
  console.error('\n입력 내용에 문제가 있어 사이트를 갱신하지 않았습니다. 아래 항목을 고쳐 주세요:\n');
  errors.forEach((e) => console.error('✘', e));
  process.exit(1);
}
console.log('✔ 콘텐츠 검사 통과');
