import { Fragment } from 'react';
import { Link } from 'waku';
import { unstable_notFound as notFound } from 'waku/router/server';
import loadDoc from '../utils/loadDoc.ts';
import scanArticles, {
  articleHref,
  findAncestors,
  flattenEntries
} from '../utils/scanArticles.ts';
import components from './mdx/components.tsx';
import TableOfContents from './TableOfContents.tsx';
import articleStyles from './Article.module.css';
import styles from './DocPage.module.css';

/**
 * Renders the document at the route path under `/docs`.
 */
const DocPage = async (props: { routePath: string }) => {
  const { routePath } = props;
  const entries = await scanArticles();
  const article = flattenEntries(entries, { includeHidden: true }).find(
    a => a.path === routePath
  );
  if (!article) return notFound();

  const { default: Content, toc } = await loadDoc(article.file);

  const breadcrumbs = findAncestors(entries, routePath) ?? [];
  const visible = flattenEntries(entries, { includeHidden: false });
  const index = visible.findIndex(a => a.path === routePath);
  const prev = index > 0 ? visible[index - 1] : undefined;
  const next = index >= 0 ? visible[index + 1] : undefined;

  return (
    <div className={styles.container}>
      <title>{`${article.title} | CIRCUS`}</title>
      <main className={styles.main}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
          <Link to="/docs">Docs</Link>
          {breadcrumbs.map(group => (
            <Fragment key={group.key}>
              <span aria-hidden="true">›</span>
              <span>{group.title}</span>
            </Fragment>
          ))}
        </nav>
        <article className={articleStyles.article} data-pagefind-body>
          {!toc.some(h => h.rank === 1) && <h1>{article.title}</h1>}
          <Content components={components} />
        </article>
        {(prev || next) && (
          <nav className={styles.pager} aria-label="Docs pages">
            {prev && (
              <Link to={articleHref(prev.path)} className={styles.prev}>
                <span className={styles.pagerLabel}>Previous</span>
                {prev.label}
              </Link>
            )}
            {next && (
              <Link to={articleHref(next.path)} className={styles.next}>
                <span className={styles.pagerLabel}>Next</span>
                {next.label}
              </Link>
            )}
          </nav>
        )}
      </main>
      <TableOfContents
        headings={toc.filter(h => h.rank === 2 || h.rank === 3)}
      />
    </div>
  );
};

export default DocPage;
