import { Link } from 'waku';
import data, { type CategoryDef, type RouteDef } from '../../utils/apiData.ts';
import PathWithParams from './PathWithParams.tsx';
import styles from './Api.module.css';

const Route = (props: { route: RouteDef }) => {
  const { route } = props;
  return (
    <div className={styles.route}>
      <div className={styles.routeName}>
        <span className={styles.verb}>
          {(route.verb ?? 'GET').toUpperCase()}
        </span>{' '}
        <PathWithParams path={route.path} />
      </div>
      <div className={styles.desc}>{route.description}</div>
      {route.hasExample && (
        <div className={styles.detailsLink}>
          <Link to={`/docs/dev/api-examples/${route.path.split('/')[1]}`}>
            Details
          </Link>
        </div>
      )}
    </div>
  );
};

const Category = (props: { category: CategoryDef }) => {
  const { category } = props;
  return (
    <>
      <hr />
      <h2>{category.name}</h2>
      {category.description && <p>{category.description}</p>}
      <div>
        {category.routes.map((route, i) => (
          <Route key={i} route={route} />
        ))}
      </div>
    </>
  );
};

/**
 * The list of all endpoints of CIRCUS API.
 */
const ApiReference = () => {
  return (
    <>
      {data.map(c => (
        <Category key={c.category} category={c} />
      ))}
    </>
  );
};

export default ApiReference;
