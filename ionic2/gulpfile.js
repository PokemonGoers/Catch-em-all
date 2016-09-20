var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('ionic-gulp-webpack');
var path = require('path');
var del = require('del');
var argv = process.argv;

var serverDir = path.join(__dirname, '../server/app');
var outputDir = path.join(__dirname, 'www');

var shouldWatch = argv.includes('-l') || argv.includes('--livereload');
var releaseBuild = argv.includes('--release') || argv.includes('build');
var browserBuild = argv.includes('browser');
var androidBuild = argv.includes('android');
var iosBuild = argv.includes('ios');

gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

if (browserBuild) {
  gulp.task('build:after', ['server-deploy']);
}

gulp.task('build', ['environment', 'clean', 'assets', 'webpack']);

gulp.task('watch', ['environment', 'clean', 'assets'], function(done) {
  var webpackConf = require('./webpack.config.js');

  gulp.watch('app/assets/**/*', gulp.start.bind(gulp, 'assets'));
  webpack({
    config: webpackConf,
    watch: true
  }).then(done);
});

// Runs webpack to Transpiles, bundles and optimizes the sources.
gulp.task('webpack', function(done) {
  var webpackConf = require('./webpack.config.js');

  webpack({
    config: webpackConf
  }).then(done);
});

// Sets environment variables.
gulp.task('environment', function() {
  process.env['BUILD_ENV'] = releaseBuild ? 'release' : 'develop';
  process.env['BUILD_TARGET'] = browserBuild ? 'web' : androidBuild ? 'android' :
    iosBuild ? 'ios' : process.env['BUILD_TARGET'];

  gutil.log('BUILD_ENV=' + process.env['BUILD_ENV']);
  gutil.log('BUILD_TARGET=' + process.env['BUILD_TARGET']);
});

// Cleans the output directory
gulp.task('clean', function() {
  del.sync([outputDir + '/**/*']);
});

// Copies static assets (images, css, ...) to the output directory.
gulp.task('assets', function() {
  gulp.src('app/assets/**/*').pipe(gulp.dest(outputDir));
});

// Copies the final sources to the node server directory.
gulp.task('server-deploy', function() {
  del.sync([serverDir], {force: true});
  gulp.src('platforms/browser/www/**/*').pipe(gulp.dest(serverDir));
});
