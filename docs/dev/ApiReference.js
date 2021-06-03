import React, { useState, useEffect } from 'react';
// import apiData from '../../static/api.json';

const Route = ({ route }) => {
  return (
    <div className="route">
      <div className="route-name">
        {route.verb.toUpperCase()} {route.path}
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
        {category.routes.map(route => (
          <Route route={route} />
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
      console.log(data);
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
        <Category category={c} key={i} />
      ))}
    </>
  );
};
