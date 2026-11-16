import { valueToEstree } from 'estree-util-value-to-estree';
import type { Root } from 'hast';
import { headingRank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

export interface TocItem {
  rank: number;
  id: string;
  title: string;
}

/**
 * Collects all headings of an MDX document and injects them into the compiled
 * module as a named `toc` export, so that pages can read the table of contents
 * by simply importing the MDX file.
 * Must come after rehype-slug.
 */
const rehypeTocExport = () => (tree: Root) => {
  const toc: TocItem[] = [];
  visit(tree, 'element', node => {
    const rank = headingRank(node);
    if (typeof rank === 'number') {
      toc.push({
        rank,
        id: String(node.properties.id ?? ''),
        title: toString(node)
      });
    }
  });

  tree.children.unshift({
    type: 'mdxjsEsm',
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            specifiers: [],
            attributes: [],
            source: null,
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name: 'toc' },
                  init: valueToEstree(toc)
                }
              ]
            }
          }
        ]
      }
    }
  } as never);
};

export default rehypeTocExport;
