// Small helpers used by ArticleFooterBar to normalize slugs/paths and build prev/next hrefs.

/** Normalize a slug to remove surrounding slashes and whitespace. Returns null if invalid. */
export function normalizeSlug(s?: string | null): string | null {
  if (!s) return null;
  let v = String(s).trim();
  if (!v) return null;
  return v.replace(/^\/+|\/+$/g, '');
}

/** Normalize a base path by trimming and removing trailing slash */
export function normalizeBase(b?: string | null): string | null {
  if (!b) return null;
  let v = String(b).trim();
  if (!v) return null;
  return v.replace(/\/+$/g, '');
}

/** Build href from base and slug; returns undefined if not possible */
export function buildHref(base?: string | null, slug?: string | null): string | undefined {
  const b = normalizeBase(base);
  const s = normalizeSlug(slug);
  return b && s ? `${b}/${s}` : undefined;
}

export function readingLabel(minutes?: number | null) {
  return minutes ? `${minutes} min left` : '1 min left';
}
