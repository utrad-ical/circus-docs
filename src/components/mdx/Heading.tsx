import type { ComponentProps } from 'react';
import styles from './Heading.module.css';

const createHeading = (Tag: 'h2' | 'h3' | 'h4') => {
  const Heading = (props: ComponentProps<'h2'>) => {
    const { id, children, ...rest } = props;
    return (
      <Tag id={id} {...rest}>
        <span>{children}</span>
        {id && (
          <a
            href={`#${id}`}
            className={styles.hashLink}
            aria-label="Direct link to this section"
            data-pagefind-ignore
          >
            #
          </a>
        )}
      </Tag>
    );
  };
  return Heading;
};

export const H2 = createHeading('h2');
export const H3 = createHeading('h3');
export const H4 = createHeading('h4');
