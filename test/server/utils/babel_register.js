// eslint-disable-next-line global-require
require('babel-register')({
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    'react'
  ],
  plugins: [
    'dynamic-import-node',
    'syntax-dynamic-import',
    'transform-react-jsx-source'
  ]
});
