export async function resolveGlobEntries(globObject: Record<string, any>) {
  const entries = Object.entries(globObject || {});
  return Promise.all(
    entries.map(async ([filePath, resolver]) => {
      const mod = await (resolver as any)();
      const frontmatter = mod?.frontmatter ?? {};
      const file = filePath.split('/').pop() ?? '';
      const slug = file.replace(/\.md$/, '');
      return {
        ...frontmatter,
        slug,
        __path: filePath,
      };
    }),
  );
}

export function slugFromPath(p: string) {
  return (p?.split('/')?.pop() || '').replace(/\.md$/, '');
}
