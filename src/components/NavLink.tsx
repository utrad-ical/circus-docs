'use client';

import type { ReactNode } from 'react';
import { Link, useRouter } from 'waku';
import styles from './NavBar.module.css';

type NavLinkProps = {
  to: string;
  /** The item is highlighted while the path matches this. */
  active: string;
  children: ReactNode;
};

const NavLink = (props: NavLinkProps) => {
  const { to, active, children } = props;
  const { path } = useRouter();
  const current = new RegExp(active).test(path);
  return (
    <Link
      to={to}
      className={current ? `${styles.link} ${styles.current}` : styles.link}
      aria-current={current ? 'true' : undefined}
    >
      {children}
    </Link>
  );
};

export default NavLink;
