import { matchRoutes } from 'react-router-config'
import { push } from 'react-router-redux';

let routes = false;

export function setRoutes(currentRoutes) {
  routes = currentRoutes;
}

export function navigate(dispatch, url) {
  const branch = matchRoutes(routes, url);
  branch.map(({ route, match }) => {
    return route.loadData
      ? route.loadData(match)
      : P.resolve(null)
  });
  dispatch(push(url));
}
