import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { cache } from 'react';
import {
  frontMatterSchema,
  metaSchema,
  parseYaml,
  type Meta,
  type OrderItem
} from './contentSchema.ts';

export const contentRoot = path.join(process.cwd(), 'docs');

export type ArticleEntry = {
  type: 'article';
  /** File name without the extension. */
  name: string;
  /** Path relative to the content root, like `users/login.md`. */
  file: string;
  /** Route path under `/docs`, like `users/login` (empty for the top). */
  path: string;
  title: string;
  /** Label in the sidebar. */
  label: string;
};

export type GroupEntry = {
  type: 'group';
  /** Unique key of this group in the whole tree. */
  key: string;
  title: string;
  hidden: boolean;
  childEntries: TocEntry[];
};

export type TocEntry = ArticleEntry | GroupEntry;

export const articleHref = (routePath: string) =>
  routePath === '' ? '/docs' : `/docs/${routePath}`;

const readArticle = async (relFile: string): Promise<ArticleEntry> => {
  const absPath = path.join(contentRoot, relFile);
  const content = await fs.readFile(absPath, 'utf-8');
  const fm = content.match(/^---\r?\n(.*?)\r?\n---/s)?.[1];
  const data = parseYaml(frontMatterSchema, fm ?? '', absPath);
  const title = data.title ?? content.match(/^# (.+)/m)?.[1] ?? 'Untitled';
  const name = path.basename(relFile, path.extname(relFile));
  const dir = path.dirname(relFile) === '.' ? '' : path.dirname(relFile);
  return {
    type: 'article',
    name,
    file: relFile,
    path: name === 'index' ? dir : path.posix.join(dir, name),
    title,
    label: data.sidebar_label ?? title
  };
};

const scanDirectory = async (relDir: string): Promise<GroupEntry> => {
  const absDir = path.join(contentRoot, relDir);
  const metaPath = path.join(absDir, 'meta.yml');
  const meta: Meta = await fs.readFile(metaPath, 'utf-8').then(
    source => parseYaml(metaSchema, source, metaPath),
    (e: NodeJS.ErrnoException) => {
      if (e.code === 'ENOENT') return {};
      throw e;
    }
  );

  // Entries in this directory, keyed by their names
  const found = new Map<string, TocEntry>();
  for (const dirent of await fs.readdir(absDir, { withFileTypes: true })) {
    if (dirent.name.startsWith('_')) continue;
    const rel = path.posix.join(relDir, dirent.name);
    const ext = path.extname(dirent.name);
    const name = dirent.isFile()
      ? path.basename(dirent.name, ext)
      : dirent.name;
    const entry =
      dirent.isFile() && ['.md', '.mdx'].includes(ext)
        ? await readArticle(rel)
        : dirent.isDirectory()
          ? await scanDirectory(rel)
          : null;
    if (!entry) continue;
    if (entry.type === 'group' && entry.childEntries.length === 0) continue;
    if (found.has(name))
      throw new Error(`Duplicate entry name "${name}" in ${absDir}`);
    found.set(name, entry);
  }

  const arrange = (items: OrderItem[], keyPrefix: string): TocEntry[] =>
    items.map((item, index) => {
      if (typeof item === 'object') {
        const key = `${keyPrefix}#${index}`;
        return {
          type: 'group',
          key,
          title: item.title,
          hidden: false,
          childEntries: arrange(item.items, key)
        };
      }
      const entry = found.get(item);
      if (!entry) throw new Error(`"${item}" in ${metaPath} does not exist`);
      found.delete(item);
      return entry;
    });

  const ordered = arrange(meta.order ?? [], relDir);
  const rest = [...found.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, entry]) => entry);

  return {
    type: 'group',
    key: relDir,
    title: meta.title ?? path.basename(relDir),
    hidden: meta.hidden ?? false,
    childEntries: [...ordered, ...rest]
  };
};

/**
 * Scans the content directory and builds the tree shown in the sidebar.
 */
const scanArticles = cache(async () => (await scanDirectory('')).childEntries);

export default scanArticles;

/**
 * Extracts all article entries, ignoring the group structure.
 */
export const flattenEntries = (
  entries: TocEntry[],
  options: { includeHidden: boolean }
): ArticleEntry[] =>
  entries.flatMap(e => {
    if (e.type === 'article') return e;
    if (e.hidden && !options.includeHidden) return [];
    return flattenEntries(e.childEntries, options);
  });

/**
 * Returns the groups that contain the article, from the outermost one.
 */
export const findAncestors = (
  entries: TocEntry[],
  routePath: string
): GroupEntry[] | null => {
  for (const e of entries) {
    if (e.type === 'article') {
      if (e.path === routePath) return [];
      continue;
    }
    const found = findAncestors(e.childEntries, routePath);
    if (found) return [e, ...found];
  }
  return null;
};
