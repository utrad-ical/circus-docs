import data from '../../utils/apiData.ts';
import PathWithParams from './PathWithParams.tsx';
import styles from './Api.module.css';

/**
 * The heading and the description of an endpoint,
 * taken from the route definitions of CIRCUS API.
 */
const ApiPreamble = (props: { verb?: string; path: string }) => {
  const { path, verb = 'get' } = props;
  const route = data
    .flatMap(c => c.routes)
    .find(r => r.verb === verb && r.path === path);
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
          <span className={styles.verb}>{verb.toUpperCase()}</span>{' '}
          <PathWithParams path={route.path} />
        </span>
      </h2>
      <p>{route.description}</p>
      {route.expectedContentType && (
        <dl>
          <dt>Expected Content-Type</dt>
          <dd>{route.expectedContentType}</dd>
        </dl>
      )}
    </div>
  );
};

export default ApiPreamble;
