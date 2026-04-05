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

export async function loadArticlesFromGlob(globPattern: Record<string, any>) {
  const storyPromises = Object.entries(globPattern).map(async ([path, resolver]) => {
    const mod = await (resolver as () => Promise<any>)();
    const frontmatter = (mod as { frontmatter: any }).frontmatter;
    const slug = path?.split('/')?.pop()?.replace('.md', '') ?? '';
    return { ...frontmatter, slug };
  });
  return Promise.all(storyPromises);
}

export async function loadCinemaFromGlob(globPattern: Record<string, any>) {
  return Promise.all(
    Object.entries(globPattern).map(async ([path, resolver]) => {
      const mod = await (resolver as () => Promise<any>)();
      const { frontmatter = {} } = mod || {};
      const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
      return {
        ...frontmatter,
        slug,
        url: `./reviews/${slug}`
      };
    })
  );
}

export async function createSlugStaticPaths(globPattern: Record<string, any>) {
  const slugs = Object.keys(globPattern).map(path => path.split("/").pop()?.replace(".md", "") || "");
  return slugs.map(slug => ({ params: { slug } }));
}

export async function loadSlugContent(globPattern: Record<string, any>, slug: string) {
  const slugs = Object.keys(globPattern)
    .map(path => path.split('/').pop()?.replace('.md', '') ?? '')
    .filter(Boolean)
    .sort();

  const currentIndex = slugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null;

  const mod = await globPattern[`./${slug}.md`]();
  const Content = (mod as any).default;
  const frontmatter = (mod as any).frontmatter;

  return { Content, frontmatter, prevSlug, nextSlug };
}
