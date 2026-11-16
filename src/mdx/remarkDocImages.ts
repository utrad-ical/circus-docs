import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

const isRelative = (url: string) => !/^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(url);

/**
 * Turns `![alt](./image.png)` into an `<img>` whose `src` is an import,
 * so that images next to the documents go through the bundler.
 */
const remarkDocImages = () => (tree: Root) => {
  const imports: string[] = [];
  visit(tree, 'image', (node, index, parent) => {
    if (!isRelative(node.url)) return;
    const source = /^\.\.?\//.test(node.url) ? node.url : `./${node.url}`;
    if (!imports.includes(source)) imports.push(source);
    const name = `__image${imports.indexOf(source)}`;
    const attributes = [
      {
        type: 'mdxJsxAttribute' as const,
        name: 'src',
        value: {
          type: 'mdxJsxAttributeValueExpression' as const,
          value: name,
          data: {
            estree: {
              type: 'Program' as const,
              sourceType: 'module' as const,
              body: [
                {
                  type: 'ExpressionStatement' as const,
                  expression: { type: 'Identifier' as const, name }
                }
              ]
            }
          }
        }
      },
      { type: 'mdxJsxAttribute' as const, name: 'alt', value: node.alt ?? '' }
    ];
    if (node.title)
      attributes.push({
        type: 'mdxJsxAttribute',
        name: 'title',
        value: node.title
      });
    parent!.children[index!] = {
      type: 'mdxJsxTextElement',
      name: 'img',
      attributes,
      children: []
    };
  });

  tree.children.unshift(
    ...imports.map((source, i) => ({
      type: 'mdxjsEsm' as const,
      value: '',
      data: {
        estree: {
          type: 'Program' as const,
          sourceType: 'module' as const,
          body: [
            {
              type: 'ImportDeclaration' as const,
              specifiers: [
                {
                  type: 'ImportDefaultSpecifier' as const,
                  local: { type: 'Identifier' as const, name: `__image${i}` }
                }
              ],
              source: { type: 'Literal' as const, value: source },
              attributes: []
            }
          ]
        }
      }
    }))
  );
};

export default remarkDocImages;
