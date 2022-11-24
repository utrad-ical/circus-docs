import React, { FC } from 'react';
import data, { CategoryDef, RouteDef } from './api-data';
import { highlightPathParam } from './utils';

const Route: FC<{ route: RouteDef }> = ({ route }) => {
  return (
    <div className="route">
      <div className="route-name">
        <span className="verb">{(route.verb ?? 'GET').toUpperCase()}</span>{' '}
        <span className="path">{highlightPathParam(route.path)}</span>
      </div>
      <div className="desc">{route.description}</div>
      {/* route.requestSchema && (
        <details>
          <summary>Request Schema</summary>
          {typeof route.requestSchema === 'object' ? (
            <pre>{JSON.stringify(route.requestSchema, null, 2)}</pre>
          ) : (
            <pre>{route.requestSchema}</pre>
          )}
        </details>
      ) */}
      {route.hasExample && (
        <div className="details-link">
          <a href={`api-examples/${route.path.split('/')[1]}`}>Details</a>
        </div>
      )}
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
