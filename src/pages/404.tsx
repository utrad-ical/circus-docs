import { Link } from 'waku';
import styles from './404.module.css';

const NotFoundPage = () => {
  return (
    <main className={styles.notFound}>
      <title>Page Not Found | CIRCUS</title>
      <h1>Page Not Found</h1>
      <p>We could not find what you were looking for.</p>
      <p>
        <Link to="/docs">Go to the docs</Link>
      </p>
    </main>
  );
};

export default NotFoundPage;

export const getConfig = async () => ({ render: 'static' }) as const;
