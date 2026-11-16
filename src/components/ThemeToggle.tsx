'use client';

import { useSyncExternalStore } from 'react';
import {
  applyTheme,
  readTheme,
  subscribeTheme,
  type Theme
} from '../utils/theme.ts';
import { MoonIcon, SunIcon } from './icons.tsx';
import styles from './NavBar.module.css';

const ThemeToggle = () => {
  // The stored theme is only known in the browser
  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    readTheme,
    () => 'light'
  );

  const handleClick = () => applyTheme(theme === 'dark' ? 'light' : 'dark');

  const label =
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={handleClick}
      title={label}
      aria-label={label}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
