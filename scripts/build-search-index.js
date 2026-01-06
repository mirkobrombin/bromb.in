const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

const PAGES_GLOB = 'src/pages/**/*.md';
const OUT = 'public/search-index.json';

function pageHrefFromPath(p) {
  let rel = path.relative('src/pages', p).replace(/\\/g, '/');
  rel = rel.replace(/\.md$/, '');
  if (rel.endsWith('/index')) rel = rel.replace(/\/index$/, '');
  if (rel === 'index') rel = '';
  return '/' + rel;
}

function excerpt(content, max = 240) {
  const cleaned = content.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned.length > max ? cleaned.slice(0, max) + '…' : cleaned;
}

const files = glob.sync(PAGES_GLOB);
const index = files.map(file => {
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const title = data && (data.title || data.name) ? (data.title || data.name) : path.basename(file, '.md');
  const description = (data && (data.description || data.excerpt)) ? (data.description || data.excerpt) : '';
  const href = pageHrefFromPath(file);
  return {
    title,
    description,
    href,
    content: excerpt(content, 1000),
  };
});

if (!fs.existsSync('public')) fs.mkdirSync('public');

fs.writeFileSync(OUT, JSON.stringify(index, null, 2), 'utf8');
console.log(`Wrote ${index.length} items to ${OUT}`);
