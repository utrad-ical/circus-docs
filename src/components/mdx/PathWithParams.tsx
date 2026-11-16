import type { ReactNode } from 'react';

/**
 * Shows the path of an endpoint with its parameters (`:caseId`) highlighted.
 */
const PathWithParams = (props: { path: string }) => {
  const { path } = props;
  const children: ReactNode[] = [];
  let pos = 0;
  for (const match of path.matchAll(/:[a-zA-Z]+\+?/g)) {
    children.push(path.slice(pos, match.index));
    children.push(<var key={match.index}>{match[0]}</var>);
    pos = match.index + match[0].length;
  }
  children.push(path.slice(pos));
  return <>{children}</>;
};

export default PathWithParams;
