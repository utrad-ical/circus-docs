import * as yaml from 'js-yaml';
import { z } from 'zod';

/**
 * Front matter block at the top of each `*.md`/`*.mdx` article.
 */
export const frontMatterSchema = z.strictObject({
  title: z.string().optional(),
  sidebar_label: z.string().optional()
});

export type OrderItem = string | { title: string; items: OrderItem[] };

const orderItemSchema: z.ZodType<OrderItem> = z.union([
  z.string(),
  z.strictObject({
    title: z.string(),
    items: z.array(z.lazy(() => orderItemSchema))
  })
]);

/**
 * `meta.yml` placed in each content directory.
 */
export const metaSchema = z.strictObject({
  /** The label of this directory in the sidebar. */
  title: z.string().optional(),
  /**
   * The order of the entries in the sidebar.
   * An item is the name of an article/directory,
   * or a group that bundles some of them under a label.
   * Entries not listed here come last.
   */
  order: z.array(orderItemSchema).optional(),
  /** Builds the articles but hides the directory from the sidebar. */
  hidden: z.boolean().optional()
});

export type Meta = z.infer<typeof metaSchema>;

/**
 * Parses a YAML document and validates it against the given schema.
 * `filePath` is only used to make the error message actionable.
 */
export const parseYaml = <T extends z.ZodType>(
  schema: T,
  source: string,
  filePath: string
): z.infer<T> => {
  const data = source.trim() === '' ? {} : yaml.load(source);
  const result = schema.safeParse(data ?? {});
  if (!result.success)
    throw new Error(
      `Invalid YAML in ${filePath}\n${z.prettifyError(result.error)}`
    );
  return result.data;
};
