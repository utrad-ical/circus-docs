import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as pagefind from 'pagefind';

// Runs after `waku build`:
// checks the links between the pages, and adds the sitemap and the search index.

const siteUrl = 'https://circus-project.net';
const publicDir = path.join(import.meta.dirname, '../dist/public');

type Page = { route: string; ids: Set<string>; links: string[] };

const decodeEntities = (s: string) =>
  s
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');

const readPages = async () => {
  const pages = new Map<string, Page>();
  for await (const file of fs.glob('**/*.html', { cwd: publicDir })) {
    const html = (await fs.readFile(path.join(publicDir, file), 'utf8'))
      // The page data for hydration repeats the markup
      .replace(/<script\b.*?<\/script>/gs, '');
    const route =
      '/' + file.replaceAll(path.sep, '/').replace(/(^|\/)index\.html$/, '');
    pages.set(route.replace(/(?<=.)\/$/, ''), {
      route,
      ids: new Set(
        [...html.matchAll(/\sid="([^"]+)"/g)].map(m => decodeEntities(m[1]!))
      ),
      links: [...html.matchAll(/<a\s[^>]*?href="([^"]+)"/g)].map(m =>
        decodeEntities(m[1]!)
      )
    });
  }
  return pages;
};

const checkLinks = async (pages: Map<string, Page>) => {
  const errors: string[] = [];
  for (const [route, page] of pages) {
    for (const link of new Set(page.links)) {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(link)) continue;
      if (!/^[/#]/.test(link)) {
        errors.push(`${route}: ${link} (write the path from the root)`);
        continue;
      }
      const [, pathname, hash] = /^([^#?]*)(?:\?[^#]*)?(?:#(.*))?$/.exec(link)!;
      const targetRoute = pathname ? pathname.replace(/(?<=.)\/$/, '') : route;
      const target = pages.get(targetRoute);
      if (!target) {
        const isFile = await fs.access(path.join(publicDir, targetRoute)).then(
          () => true,
          () => false
        );
        if (!isFile) errors.push(`${route}: ${link} (page not found)`);
        continue;
      }
      if (hash && !target.ids.has(decodeURIComponent(hash)))
        errors.push(`${route}: ${link} (anchor not found)`);
    }
  }
  if (errors.length > 0) {
    console.error(`Found ${errors.length} broken link(s):`);
    for (const error of errors) console.error(`  ${error}`);
    process.exit(1);
  }
  console.log(`Checked the links of ${pages.size} pages`);
};

const writeSitemap = async (pages: Map<string, Page>) => {
  const urls = [...pages.keys()]
    .filter(route => route !== '/404.html')
    .sort()
    .map(route => `  <url><loc>${siteUrl}${route}</loc></url>`);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    ''
  ].join('\n');
  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), xml);
  console.log(`Wrote sitemap.xml with ${urls.length} URLs`);
};

const writeSearchIndex = async () => {
  const { index, errors } = await pagefind.createIndex();
  if (!index) throw new Error(errors.join('\n'));
  const { page_count } = await index.addDirectory({ path: publicDir });
  await index.writeFiles({ outputPath: path.join(publicDir, 'pagefind') });
  await pagefind.close();
  console.log(`Wrote the search index of ${page_count} pages`);
};

const pages = await readPages();
await checkLinks(pages);
await writeSitemap(pages);
await writeSearchIndex();
