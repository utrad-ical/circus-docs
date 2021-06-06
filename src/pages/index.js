import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'CIRCUS DB',
    // imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        CIRCUS DB (database) is a clinical image database application for
        collecting datasets used to develop CAD software. Users can on stored
        DICOM images in various formats including voxel-based painting.
      </>
    ),
    link: '/docs/users/case-search',
  },
  {
    title: 'CIRCUS CS',
    // imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        CIRCUS CS (clinical server) is a CAD execution platform based on Docker
        plug-ins. Users can request to execute a plug-in as a job on selected
        DICOM series, and each job is sequentially processed by Job Manager. The
        results are either displayed as a web page or fetched via RESTful API.
      </>
    ),
    link: '/docs/users/login',
  },
  {
    title: 'CIRCUS RS',
    // imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        CIRCUS DB/CS is powered by CIRCUS RS, a lightweight medical image server
        and a viewer component, written in TypeScript. You can develop a custom
        viewer application on top of CIRCUS RS.
      </>
    ),
  },
];

const Feature = props => {
  const { imageUrl, title, description, link } = props;
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      {link && (
        <p className="text--right">
          <a href={link}>&gt; Learn More</a>
        </p>
      )}
    </div>
  );
};

const Home = () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title="Home" description="The home of CIRCUS Project">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img
            className="hero__title"
            src="img/circus-main-logo.svg"
            alt={siteConfig.title}
          />
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('docs/')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features?.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
};

export default Home;
