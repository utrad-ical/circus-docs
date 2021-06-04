import React, { useState, useEffect } from 'react';

const highlightPathParam = path => {
  const children = [];
  const matches = Array.from(path.matchAll(/:[a-zA-z]+\+?/g));
  let len = 0;
  const pushStr = pos => {
    children.push(path.slice(len, pos));
    len = pos;
  };
  for (const match of matches) {
    pushStr(match.index);
    children.push(<var>{match[0]}</var>);
    len = match.index + match[0].length;
  }
  pushStr(path.length);
  return React.createElement(React.Fragment, {}, ...children);
};

const Route = ({ route }) => {
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

const Category = ({ category }) => {
  return (
    <>
      <hr />
      <h2>{category.category}</h2>
      {category.description && <p>{category.description}</p>}
      <div className="routes">
        {category.routes.map((route, i) => (
          <Route key={i} route={route} />
        ))}
      </div>
    </>
  );
};

export const ApiReference = props => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    let aborted = false;
    import('../../static/api.json').then(data => {
      if (!aborted) setData(Array.from(data));
    });
    return () => {
      aborted = true;
    };
  }, []);

  if (data instanceof Error) {
    <div>
      There is no API source data. Build the data using make-api-reference.js.
    </div>;
  }

  if (!data) return <div style={{ fontSize: '200%' }}>Loading...</div>;

  return (
    <>
      {data.map((c, i) => (
        <Category key={i} category={c} />
      ))}
    </>
  );
};
