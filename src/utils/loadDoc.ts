import type { ComponentType } from 'react';
import type { MDXComponents } from 'mdx/types';
import type { TocItem } from '../mdx/rehypeTocExport.ts';

type DocModule = {
  default: ComponentType<{ components?: MDXComponents }>;
  toc: TocItem[];
};

const modules = import.meta.glob<DocModule>('../../docs/**/*.{md,mdx}');

/**
 * Loads the compiled document.
 * @param file Path relative to the content root, like `users/login.md`.
 */
const loadDoc = async (file: string) => {
  const load = modules[`../../docs/${file}`];
  if (!load) throw new Error(`Document not found: ${file}`);
  return await load();
};

export default loadDoc;
