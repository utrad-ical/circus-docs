import type { ComponentProps } from 'react';
import { Link } from 'waku';

/**
 * Links between the pages go through the router,
 * and links to other sites open in a new tab.
 */
const Anchor = (props: ComponentProps<'a'>) => {
  const { href, children, ...rest } = props;
  if (href?.startsWith('/'))
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  if (href && /^https?:/.test(href))
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

export default Anchor;
