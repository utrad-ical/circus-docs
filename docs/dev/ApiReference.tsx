import React, { FC, ReactNode } from 'react';
import data from '../../static/api.json';

interface RouteDef {
  verb?: string;
  path: string;
  description: string;
}

interface CategoryDef {
  name: string;
  description?: string;
  routes: RouteDef[];
}

const highlightPathParam = (path: string) => {
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

const Route: FC<{ route: RouteDef }> = ({ route }) => {
  return (
    <div className="route">
      <div className="route-name">
        <span className="verb">{(route.verb ?? 'GET').toUpperCase()}</span>{' '}
        <span className="path">{highlightPathParam(route.path)}</span>
      </div>
      <div className="desc">{route.description}</div>
    </div>
  );
};

const Category: FC<{ category: CategoryDef }> = ({ category }) => {
  return (
    <>
      <hr />
      <h2>{category.name}</h2>
      {category.description && <p>{category.description}</p>}
      <div className="routes">
        {category.routes.map((route, i) => (
          <Route key={i} route={route} />
        ))}
      </div>
    </>
  );
};

export const ApiReference: FC = () => {
  return (
    <>
      {(data as CategoryDef[]).map((c, i) => (
        <Category key={i} category={c} />
      ))}
    </>
  );
};
