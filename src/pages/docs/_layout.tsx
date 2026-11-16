import type { ReactNode } from 'react';
import SideBar, { type SideBarEntry } from '../../components/SideBar.tsx';
import scanArticles, {
  articleHref,
  type TocEntry
} from '../../utils/scanArticles.ts';
import styles from './_layout.module.css';

const toSideBarEntries = (entries: TocEntry[]): SideBarEntry[] =>
  entries.flatMap((e): SideBarEntry[] => {
    if (e.type === 'article')
      return [{ type: 'article', href: articleHref(e.path), label: e.label }];
    if (e.hidden) return [];
    return [
      {
        type: 'group',
        key: e.key,
        title: e.title,
        childEntries: toSideBarEntries(e.childEntries)
      }
    ];
  });

const DocsLayout = async (props: { children: ReactNode }) => {
  const { children } = props;
  const entries = toSideBarEntries(await scanArticles());
  return (
    <div className={styles.docs}>
      <SideBar entries={entries} />
      {children}
    </div>
  );
};

export default DocsLayout;

export const getConfig = async () => ({ render: 'static' }) as const;
