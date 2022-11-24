import React, { ReactNode } from 'react';

export const highlightPathParam = (path: string) => {
  const children: ReactNode[] = [];
  const matches = Array.from(path.matchAll(/:[a-zA-z]+\+?/g));
  let len = 0;
  const pushStr = (pos: number) => {
    children.push(path.slice(len, pos));
    len = pos;
  };
  for (const match of matches) {
    pushStr(match.index!);
    children.push(<var>{match[0]}</var>);
    len = match.index! + match[0].length;
  }
  pushStr(path.length);
  return React.createElement(React.Fragment, {}, ...children);
};
