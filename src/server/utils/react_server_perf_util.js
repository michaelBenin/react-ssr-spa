if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  require('react/dist/react.min.js');
  // eslint-disable-next-line global-require, max-len
  require.cache[require.resolve('react')] =
    require.cache[require.resolve('react/dist/react.min.js')];
  // eslint-disable-next-line global-require
  require('react-dom/dist/react-dom-server.min.js');
  // eslint-disable-next-line global-require, max-len
  require.cache[require.resolve('react-dom/server')] =
    require.cache[require.resolve('react-dom/dist/react-dom-server.min.js')];
}
