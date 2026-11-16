'use client';

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

export type TocHeading = { rank: number; id: string; title: string };

/**
 * The headings of the page, with the one being read highlighted.
 */
const TableOfContents = (props: { headings: TocHeading[] }) => {
  const { headings } = props;
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      // The last heading that has passed the top of the viewport
      const threshold = 100;
      let active: string | null = null;
      for (const { id } of headings) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top > threshold) break;
        active = id;
      }
      setActiveId(active);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [headings]);

  // Keeps the column so that the article stays where it is
  if (headings.length === 0) return <div className={styles.placeholder} />;

  return (
    <nav className={styles.toc} aria-label="On this page">
      <div className={styles.title}>On this page</div>
      <ul>
        {headings.map(h => (
          <li key={h.id} className={h.rank > 2 ? styles.nested : undefined}>
            <a
              href={`#${h.id}`}
              className={h.id === activeId ? styles.active : undefined}
            >
              {h.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
