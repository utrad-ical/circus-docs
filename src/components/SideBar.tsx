'use client';

import { useState } from 'react';
import { Link, useRouter } from 'waku';
import { ChevronIcon, MenuIcon } from './icons.tsx';
import styles from './SideBar.module.css';

/** The subset of the scanned tree the sidebar needs. */
export type SideBarEntry =
  | { type: 'article'; href: string; label: string }
  | { type: 'group'; key: string; title: string; childEntries: SideBarEntry[] };

const normalize = (path: string) => path.replace(/\/+$/, '') || '/';

/** Returns the keys of the groups that contain the page. */
const findOpenKeys = (
  entries: SideBarEntry[],
  path: string
): string[] | null => {
  for (const e of entries) {
    if (e.type === 'article') {
      if (e.href === path) return [];
      continue;
    }
    const found = findOpenKeys(e.childEntries, path);
    if (found) return [e.key, ...found];
  }
  return null;
};

type EntryProps = {
  entry: SideBarEntry;
  path: string;
  openKeys: Set<string>;
  onToggle: (key: string) => void;
};

const Entry = (props: EntryProps) => {
  const { entry, path, openKeys, onToggle } = props;
  if (entry.type === 'article') {
    const current = entry.href === path;
    return (
      <li>
        <Link
          to={entry.href}
          className={current ? `${styles.link} ${styles.current}` : styles.link}
          aria-current={current ? 'page' : undefined}
        >
          {entry.label}
        </Link>
      </li>
    );
  }
  const open = openKeys.has(entry.key);
  return (
    <li>
      <button
        type="button"
        className={styles.groupButton}
        aria-expanded={open}
        onClick={() => onToggle(entry.key)}
      >
        {entry.title}
        <ChevronIcon size={16} />
      </button>
      <ul hidden={!open}>
        {entry.childEntries.map(e => (
          <Entry
            key={e.type === 'article' ? e.href : e.key}
            entry={e}
            path={path}
            openKeys={openKeys}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </li>
  );
};

const SideBar = (props: { entries: SideBarEntry[] }) => {
  const { entries } = props;
  const path = normalize(useRouter().path);
  const [openKeys, setOpenKeys] = useState(
    () => new Set(findOpenKeys(entries, path) ?? [])
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  // On navigation, reveal the current page and close the drawer
  const [prevPath, setPrevPath] = useState(path);
  if (path !== prevPath) {
    setPrevPath(path);
    setOpenKeys(new Set([...openKeys, ...(findOpenKeys(entries, path) ?? [])]));
    setDrawerOpen(false);
  }

  const handleToggle = (key: string) => {
    const next = new Set(openKeys);
    if (!next.delete(key)) next.add(key);
    setOpenKeys(next);
  };

  return (
    <>
      <div className={styles.mobileBar}>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <MenuIcon size={18} />
          Menu
        </button>
      </div>
      {drawerOpen && (
        <div className={styles.overlay} onClick={() => setDrawerOpen(false)} />
      )}
      <nav
        className={
          drawerOpen ? `${styles.sideBar} ${styles.open}` : styles.sideBar
        }
        aria-label="Docs"
      >
        <ul>
          {entries.map(e => (
            <Entry
              key={e.type === 'article' ? e.href : e.key}
              entry={e}
              path={path}
              openKeys={openKeys}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
