import type { ReactNode } from 'react';
import styles from './illustrations.module.css';

/*
 * Line illustrations in two tones:
 * the text color for the subject and the theme color for what CIRCUS adds.
 * They are rendered into the HTML at build time.
 */

const Illustration = (props: { children: ReactNode }) => (
  <svg
    className={styles.illustration}
    viewBox="0 0 200 150"
    fill="none"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {props.children}
  </svg>
);

/** A stack of images with a painted label, stored in a database. */
export const DbIllustration = () => (
  <Illustration>
    <g className={styles.line}>
      <rect x="62" y="12" width="92" height="92" rx="8" opacity="0.3" />
      <rect x="48" y="24" width="92" height="92" rx="8" opacity="0.6" />
      <rect
        className={styles.paper}
        x="34"
        y="36"
        width="92"
        height="92"
        rx="8"
      />
      <path d="M50 84c0-17 13-32 32-32 17 0 29 11 29 27 0 19-14 33-33 33-17 0-28-11-28-28z" />
      <path d="M64 76c5-7 14-9 21-5" opacity="0.6" />
    </g>
    <g className={styles.theme}>
      <path
        className={styles.tint}
        d="M72 86c2-6 9-9 15-6s9 9 6 15-10 8-16 5-7-8-5-14z"
      />
      <path
        className={styles.paper}
        d="M130 96v32a26 9 0 0 0 52 0V96a26 9 0 0 0-52 0z"
      />
      <path
        className={styles.tint}
        d="M130 96a26 9 0 0 0 52 0 26 9 0 0 0-52 0z"
      />
      <path d="M130 112a26 9 0 0 0 52 0" />
    </g>
  </Illustration>
);

/** Queued jobs go through a plug-in container and turn into results. */
export const CsIllustration = () => (
  <Illustration>
    <g className={styles.line}>
      <rect x="10" y="40" width="42" height="18" rx="4" />
      <rect x="10" y="66" width="42" height="18" rx="4" />
      <rect x="10" y="92" width="42" height="18" rx="4" opacity="0.4" />
      <path d="M18 49h4M28 49h16M18 75h4M28 75h16" />
      <path d="M60 75h12m-5-5 5 5-5 5M130 75h12m-5-5 5 5-5 5" />
      <rect x="150" y="42" width="40" height="66" rx="5" />
      <path d="M158 54h24M158 63h16" />
    </g>
    <g className={styles.theme}>
      <path className={styles.tint} d="m101 44 24 13-24 13-24-13z" />
      <path d="M77 57v32l24 13 24-13V57M101 70v32" />
      <path d="m85 72 8 4.5M85 81l8 4.5" />
      <circle className={styles.tint} cx="170" cy="88" r="11" />
      <path d="m164.5 88 4 4 7-8" />
    </g>
  </Illustration>
);

/** A viewer with three sections of a volume and crosshairs. */
export const RsIllustration = () => (
  <Illustration>
    <g className={styles.line}>
      <rect x="26" y="20" width="148" height="110" rx="8" />
      <path d="M26 38h148M116 38v92M116 84h58" />
      <path d="M36 29h.01M44 29h.01M52 29h.01" strokeWidth="4" />
      <ellipse cx="71" cy="84" rx="30" ry="26" />
      <path d="M57 78c3-6 9-8 14-5s11 1 14 6" opacity="0.6" />
      <ellipse cx="145" cy="61" rx="17" ry="13" />
      <path d="M135 96c0-6 4-9 10-9s10 3 10 9v22h-20z" />
    </g>
    <g className={styles.theme}>
      <path d="M34 92h74M79 46v76" strokeDasharray="5 5" />
      <circle className={styles.tint} cx="79" cy="92" r="5" />
      <path d="M122 65h46M141 90v34" strokeDasharray="5 5" />
    </g>
  </Illustration>
);
