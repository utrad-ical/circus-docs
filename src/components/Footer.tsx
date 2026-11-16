import styles from './Footer.module.css';

const columns = [
  {
    title: 'CIRCUS Project',
    links: [
      ['GitHub', 'https://github.com/utrad-ical/circus'],
      ['Improve Docs', 'https://github.com/utrad-ical/circus-docs']
    ]
  },
  {
    title: 'UT Radiology ICAL Team',
    links: [
      ['ICAL', 'http://www.ut-radiology.umin.jp/ical/'],
      ['UT Radiology', 'http://www.ut-radiology.umin.jp/'],
      ['The University of Tokyo Hospital', 'https://www.h.u-tokyo.ac.jp/']
    ]
  },
  {
    title: 'The University of Tokyo',
    links: [
      ['The University of Tokyo', 'https://www.u-tokyo.ac.jp/'],
      [
        'Code of Conduct',
        'https://www.u-tokyo.ac.jp/ja/research/ethics/index.html'
      ]
    ]
  }
] as const;

const Footer = () => {
  // oxlint-disable-next-line react/purity -- rendered once at build time
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        {columns.map(column => (
          <div key={column.title}>
            <div className={styles.title}>{column.title}</div>
            <ul>
              {column.links.map(([label, href]) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.copyright}>Copyright © {year} CIRCUS Project.</div>
    </footer>
  );
};

export default Footer;
