import { join } from 'path';

const dir = __dirname;
const cssSrcPath = './src/client/styles/main.scss';
const staticFilePath = './dist/static/css';

const config = {
  clean: ['docs', 'node_modules', 'dist', 'logs/**/*.log'],
  dest: 'dist',
  nodemon: {
    ignore: [
      join(dir, '../../dist/client/**'),
      join(dir, '../../src/**'),
      join(dir, '../../test/**'),
      join(dir, '../../.git'),
      join(dir, '../../node_modules/**')
    ],
    watch: [
      join(dir, '../../dist/'),
      join(dir, '../../.env'),
      join(dir, '../../feature_flags.js')
    ],
    script: 'dist/server',
    ext: 'js env',
    env: {
      NODE_ENV: 'development'
    },
    nodeArgs: [
      // '--inspect'
    ]
  },
  test: {
    server: {
      integration: {
        src: [
          'test/server/utils/test_initializer_util.js',
          'test/server/integration/**/*.js',
          'test/server/utils/test_teardown_util.js'
        ]
      },
      unit: {
        src: [
          'test/server/utils/test_initializer_utils.js',
          'test/server/utils/enzyme_initializer.js',
          'test/server/unit/**/*.js',
          'test/server/shared/**/*.js'
        ]
      }
    }
  },
  eslint: {
    conf: {
      rules: {
        'comma-dangle': [2, 'never'],
        'react/jsx-filename-extension': [0, { extensions: ['.js'] }],
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }]
      }
    }
  },
  styles: {
    sassConf: {
      style: 'expanded'
    },
    autoprefixerBrowsers: ['last 2 versions'],
    main: {
      stylesSrc: cssSrcPath,
      cssDest: staticFilePath,
      scssWatch: ['src/**/*.scss']
    }
  },
  stylelint: {
    src: [
      './src/**/*.scss',
      '!./src/client/styles/framework/_foundation_settings.scss'
    ]
  },
  server: {
    src: ['src/**/*', '!src/assets/**/*', '!src/**/*.scss']
  },
  babel: {
    sourceMaps: 'inline'
  },
  // add external vendor js files here
  vendorJS: {
    src: [],
    dest: 'dist/static/js'
  },
  assets: {
    src: ['src/assets/**/*'],
    dest: 'dist/static/assets'
  },
  doc: {
    src: 'src'
  }
};

export default config;
