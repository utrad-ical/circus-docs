import styles from './misc.module.css';

/** An icon of CIRCUS (`rs-icon-brush`, `circus-icon-case`, ...). */
export const Icon = (props: { icon: string }) => <i className={props.icon} />;

/** The date of the build. */
export const Now = () => {
  // oxlint-disable-next-line react/purity -- rendered once at build time
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return <>{`${y}/${m}/${d}`}</>;
};

/** Marks a required option. */
export const Required = () => <span className={styles.required}>Required</span>;
