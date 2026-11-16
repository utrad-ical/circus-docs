import type { ReactNode } from 'react';
import { Link } from 'waku';
import {
  CsIllustration,
  DbIllustration,
  RsIllustration
} from '../components/illustrations/illustrations.tsx';
import styles from './index.module.css';

type FeatureProps = {
  title: string;
  illustration: ReactNode;
  link?: string;
  children: ReactNode;
};

const Feature = (props: FeatureProps) => {
  const { title, illustration, link, children } = props;
  return (
    <div className={styles.feature}>
      {illustration}
      <h2>{title}</h2>
      <p>{children}</p>
      {link && (
        <p className={styles.more}>
          <Link to={link}>Learn more ›</Link>
        </p>
      )}
    </div>
  );
};

const HomePage = () => {
  return (
    <main className={styles.home}>
      <title>CIRCUS - Platform for Computer-aided Diagnosis Research</title>
      <meta name="description" content="The home of CIRCUS Project" />
      <header className={styles.hero}>
        <img
          className={styles.logo}
          src="/img/circus-main-logo.svg"
          alt="CIRCUS"
          width="485"
          height="375"
        />
        <p className={styles.tagline}>
          Platform for Computer-aided Diagnosis Research
        </p>
        <Link to="/docs" className={styles.button}>
          Get Started
        </Link>
      </header>
      <section className={styles.features}>
        <Feature
          title="CIRCUS DB"
          illustration={<DbIllustration />}
          link="/docs/users/case-search"
        >
          CIRCUS DB (database) is a clinical image database application for
          collecting datasets used to develop CAD software. Users can on stored
          DICOM images in various formats including voxel-based painting.
        </Feature>
        <Feature
          title="CIRCUS CS"
          illustration={<CsIllustration />}
          link="/docs/users/login"
        >
          CIRCUS CS (clinical server) is a CAD execution platform based on
          Docker plug-ins. Users can request to execute a plug-in as a job on
          selected DICOM series, and each job is sequentially processed by Job
          Manager. The results are either displayed as a web page or fetched via
          RESTful API.
        </Feature>
        <Feature title="CIRCUS RS" illustration={<RsIllustration />}>
          CIRCUS DB/CS is powered by CIRCUS RS, a lightweight medical image
          server and a viewer component, written in TypeScript. You can develop
          a custom viewer application on top of CIRCUS RS.
        </Feature>
      </section>
    </main>
  );
};

export default HomePage;

export const getConfig = async () => ({ render: 'static' }) as const;
