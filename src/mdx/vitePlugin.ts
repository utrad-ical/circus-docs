import mdx from '@mdx-js/rollup';
import rehypeShikiFromHighlighter, {
  type RehypeShikiCoreOptions
} from '@shikijs/rehype/core';
import type { Root } from 'hast';
import rehypeSlug from 'rehype-slug';
import remarkDeflist from 'remark-deflist';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import type { Plugin } from 'vite';
import rehypeTocExport from './rehypeTocExport.ts';
import remarkDocImages from './remarkDocImages.ts';

// The JavaScript engine is used because the WebAssembly one
// fails to load in the dev server.
const highlighter = createHighlighterCore({
  engine: createJavaScriptRegexEngine(),
  themes: [
    import('shiki/themes/github-light.mjs'),
    import('shiki/themes/github-dark.mjs')
  ],
  langs: [
    import('shiki/langs/bash.mjs'),
    import('shiki/langs/docker.mjs'),
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/json.mjs'),
    import('shiki/langs/jsx.mjs'),
    import('shiki/langs/python.mjs'),
    import('shiki/langs/shellsession.mjs'),
    import('shiki/langs/tsx.mjs'),
    import('shiki/langs/typescript.mjs')
  ],
  langAlias: { 'shell-session': 'shellsession' }
});

const shikiOptions: RehypeShikiCoreOptions = {
  themes: { light: 'github-light', dark: 'github-dark' },
  defaultColor: 'light-dark()',
  defaultLanguage: 'text',
  // ```js title="index.js"
  parseMetaString: meta => ({
    title: /\btitle=(?:"([^"]*)"|(\S+))/.exec(meta)?.slice(1).find(Boolean)
  }),
  transformers: [
    {
      pre(node) {
        const title = (this.options.meta as { title?: string })?.title;
        if (title) node.properties['data-title'] = title;
      }
    }
  ]
};

/**
 * Highlights the code blocks at build time.
 */
const rehypeHighlight = () => async (tree: Root) => {
  const transform = rehypeShikiFromHighlighter(await highlighter, shikiOptions);
  await transform(tree, undefined as never, () => {});
};

/**
 * Compiles the documents under `docs/` (both `*.md` and `*.mdx`) as MDX.
 */
const docsMdx = (): Plugin => ({
  enforce: 'pre',
  // The plugin is typed for Rollup
  ...(mdx({
    format: 'mdx',
    mdExtensions: [],
    mdxExtensions: ['.md', '.mdx'],
    remarkPlugins: [
      remarkFrontmatter,
      remarkGfm,
      remarkDeflist,
      [remarkGithub, { repository: 'utrad-ical/circus' }],
      remarkDocImages
    ],
    rehypePlugins: [rehypeSlug, rehypeHighlight, rehypeTocExport]
  }) as Plugin)
});

export default docsMdx;
