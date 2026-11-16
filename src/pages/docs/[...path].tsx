import type { PageProps } from 'waku/router';
import DocPage from '../../components/DocPage.tsx';
import scanArticles, { flattenEntries } from '../../utils/scanArticles.ts';

const Page = (props: PageProps<'/docs/[...path]'>) => {
  return <DocPage routePath={props.path.join('/')} />;
};

export default Page;

export const getConfig = async () => {
  const articles = flattenEntries(await scanArticles(), {
    includeHidden: true
  });
  return {
    render: 'static',
    staticPaths: articles.filter(a => a.path !== '').map(a => a.path.split('/'))
  } as const;
};
