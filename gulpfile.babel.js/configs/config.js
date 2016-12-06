const cssSrcPath = './src/client/styles/main.scss';
const staticFilePath = './dist/static/css';

const config = {
  clean: [
    'docs',
    'node_modules',
    'dist',
    'logs/**/*.log'
  ],
  dest: 'dist',
  nodemon: {
    ignore: [
      'dist/client/**',
      'src/**',
      'test/**',
      '.git',
      'node_modules/**'
    ],
    watch: [
      'dist/'
    ],
    script: 'dist/server',
    ext: 'js',
    env: {
      NODE_ENV: 'development'
    },
    nodeArgs: [
      '--debug'
      // Uncomment to insert debugger on script initialization
      // '--debug-brk'
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
          'test/server/unit/**/*.js'
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
    autoprefixerBrowsers: [
      'last 2 versions'
    ],
    main: {
      stylesSrc: cssSrcPath,
      cssDest: staticFilePath,
      scssWatch: [
        'src/**/*.scss'
      ]
    }
  },
  stylelint: {
    src: [
      './src/**/*.scss',
      '!./src/client/styles/framework/_foundation_settings.scss'
    ]
  },
  server: {
    src: [
      'src/**/*',
      '!src/assets/**/*',
      '!src/**/*.scss'
    ]
  },
  babel: {
    sourceMaps: 'inline'
  },
  vendorJS: {
    src: [
      'bower_components/modernizer/modernizr.js'
    ],
    dest: 'dist/static/js'
  },
  assets: {
    src: [
      'src/assets/**/*'
    ],
    dest: 'dist/static/assets'
  },
  doc: {
    src: 'src'
  }
};

export default config;
