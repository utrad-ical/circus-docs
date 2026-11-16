import type { ComponentProps } from 'react';
import CopyButton from './CopyButton.tsx';
import styles from './CodeBlock.module.css';

type CodeBlockProps = ComponentProps<'pre'> & { 'data-title'?: string };

/**
 * A code block with an optional title (```js title="index.js")
 * and a button to copy the code.
 */
const CodeBlock = (props: CodeBlockProps) => {
  const { 'data-title': title, className, style: _style, ...rest } = props;
  return (
    <div className={styles.codeBlock}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.body}>
        <pre className={className} {...rest} />
        <CopyButton />
      </div>
    </div>
  );
};

export default CodeBlock;
