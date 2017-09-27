import glob from 'glob';

export default (globDir, router) => {
  glob
    .sync(globDir)
    .map(require)
    .forEach(function setRoute(routeFunc) {
      routeFunc.default(router);
    });
  return router;
};
