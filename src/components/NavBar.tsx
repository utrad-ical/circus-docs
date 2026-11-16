import { Link } from 'waku';
import NavLink from './NavLink.tsx';
import Search from './Search.tsx';
import ThemeToggle from './ThemeToggle.tsx';
import styles from './NavBar.module.css';

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
    />
  </svg>
);

const NavBar = () => {
  return (
    <header className={styles.navBar}>
      <Link to="/" className={styles.brand} aria-label="CIRCUS">
        <img src="/img/logo.svg" alt="" width="34" height="34" />
      </Link>
      <nav className={styles.links} aria-label="Main">
        <NavLink
          to="/docs"
          active="^/docs(?!/admin/installation|/releases)(/|$)"
        >
          Docs
        </NavLink>
        <NavLink
          to="/docs/admin/installation"
          active="^/docs/admin/installation"
        >
          Install
        </NavLink>
        <NavLink to="/docs/releases" active="^/docs/releases">
          Releases
        </NavLink>
      </nav>
      <div className={styles.right}>
        <Search />
        <a
          href="https://github.com/utrad-ical/circus"
          className={`${styles.iconButton} ${styles.github}`}
          title="GitHub"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default NavBar;
