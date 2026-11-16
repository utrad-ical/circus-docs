'use client';

import { useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from '../icons.tsx';
import styles from './CodeBlock.module.css';

/**
 * Copies the text of the `<pre>` next to this button.
 */
const CopyButton = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const pre = ref.current?.parentElement?.querySelector('pre');
    if (!pre) return;
    await navigator.clipboard.writeText(pre.textContent ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const label = copied ? 'Copied' : 'Copy code';

  return (
    <button
      ref={ref}
      type="button"
      className={styles.copyButton}
      onClick={handleClick}
      title={label}
      aria-label={label}
      data-pagefind-ignore
    >
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
    </button>
  );
};

export default CopyButton;
