var gulp = require('gulp');
var webpack = require('webpack-stream');
var argv = process.argv;

var outputDir = '../server/app';

var release = argv.indexOf('--release') > -1;
var watch = false;
process.env['BUILD_ENV'] = release ? 'release' : 'develop';

gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

gulp.task('build', ['webpack']);

gulp.task('watch', ['webpack'], function() {
  watch = true;
  var watchFiles = ['app/**/*.{ts,html,scss}'];
  gulp.watch(watchFiles, ['webpack']);
});

gulp.task('webpack', function(done) {
  var webpackConf = require('./webpack.config.js');
  webpackConf.watch = watch;

  return webpack(webpackConf)
    .on('error', function(error) {
      this.emit('end');
    }).pipe(gulp.dest(outputDir));
});
