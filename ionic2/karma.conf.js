module.exports = function(config) {
  config.set({
 
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      'ionic2/node_modules/es6-shim/es6-shim.js',        // TypeError: undefined is not a constructor (evaluating 'new exports.Map()')
      'ionic2/node_modules/reflect-metadata/Reflect.js', // 'Uncaught reflect-metadata shim is required when using class decorators'
      'ionic2/node_modules/zone.js/dist/zone.js',        // Zone.js dependencies (Zone undefined)
      'ionic2/node_modules/zone.js/dist/jasmine-patch.js',
      'ionic2/node_modules/zone.js/dist/async-test.js',
      'ionic2/node_modules/zone.js/dist/fake-async-test.js',
      {pattern: 'ionic2/node_modules/reflect-metadata/Reflect.js.map', included: false, served: true}, // 404 on the same
      {pattern: 'server/app/**/*', included: false},
      'ionic2/app/**/*.spec.ts'
    ],
 
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': ['browserify']
    },
 
    browserify: {
      debug: true,
      transform: [
        [require('browserify-istanbul'), {
          instrumenter: require('isparta'),
          ignore: ['**/*.spec.ts','**/*.d.ts'],
        }]
      ],
      plugin: [
        require('tsify')
      ]
    },

    customLaunchers: {
      ChromeTravis: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,
 
    proxies: {
      '/app': '/base/server/app',
      '/app/api': 'http://pokedata.c4e3f8c7.svc.dockerapp.io:65014/api'
    },
 
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
 
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
 
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: process.env.TRAVIS ? ['ChromeTravis'] : ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
 
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
