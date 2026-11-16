import type { ReactNode } from 'react';
import styles from './Admonition.module.css';

type AdmonitionProps = {
  /** Replaces the default label, which is the type of the box. */
  title?: string;
  children: ReactNode;
};

const createAdmonition = (type: string) => {
  const Admonition = (props: AdmonitionProps) => {
    const { title, children } = props;
    return (
      <aside className={`${styles.admonition} ${styles[type] ?? ''}`}>
        <div className={styles.title}>{title ?? type}</div>
        {children}
      </aside>
    );
  };
  return Admonition;
};

export const Note = createAdmonition('note');
export const Tip = createAdmonition('tip');
export const Info = createAdmonition('info');
export const Important = createAdmonition('important');
export const Warning = createAdmonition('warning');
export const Danger = createAdmonition('danger');
