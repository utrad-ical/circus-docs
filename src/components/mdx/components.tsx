import type { MDXComponents } from 'mdx/types';
import { Danger, Important, Info, Note, Tip, Warning } from './Admonition.tsx';
import Anchor from './Anchor.tsx';
import ApiPreamble from './ApiPreamble.tsx';
import ApiReference from './ApiReference.tsx';
import CodeBlock from './CodeBlock.tsx';
import { H2, H3, H4 } from './Heading.tsx';
import { Icon, Now, Required } from './misc.tsx';
import { ParamList } from './ParamList.tsx';
import { TabItem, Tabs } from './Tabs.tsx';

/**
 * Components available in every document without importing them.
 */
const components: MDXComponents = {
  a: Anchor,
  pre: CodeBlock,
  h2: H2,
  h3: H3,
  h4: H4,
  ApiPreamble,
  ApiReference,
  Danger,
  Icon,
  Important,
  Info,
  Note,
  Now,
  ParamList,
  Required,
  TabItem,
  Tabs,
  Tip,
  Warning
};

export default components;
