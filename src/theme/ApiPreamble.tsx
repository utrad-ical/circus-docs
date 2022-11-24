import React, { FC } from 'react';
import data from './api-data';
import { highlightPathParam } from './utils';

export const ApiPreamble: FC<{ verb?: string; path: string }> = props => {
  const { path, verb = 'get' } = props;
  const allRoutes = data.map(c => c.routes).flat();
  const route = allRoutes.find(r => r.verb === verb && r.path === path);
  if (!route)
    return (
      <div>
        <code>
          {verb} {path}
        </code>{' '}
        Not found
      </div>
    );
  return (
    <div>
      <h2>
        <span>
          <span className="verb">{verb.toUpperCase()}</span>{' '}
          {highlightPathParam(route.path)}
        </span>
      </h2>
      <p>{route.description}</p>
      {/* <pre>{JSON.stringify(route)}</pre> */}
      {route.expectedContentType && (
        <dl>
          <dt>Expected Content-Type</dt>
          <dd>{route.expectedContentType}</dd>
        </dl>
      )}
    </div>
  );
};
