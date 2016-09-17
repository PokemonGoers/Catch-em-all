var gulp = require('gulp');
var webpack = require('ionic-gulp-webpack');
var argv = process.argv;

var outputDir = '../server/app';
var webpackConf = require('./webpack.config.js');

var release = argv.indexOf('--release') > -1;
process.env['BUILD_ENV'] = release ? 'release' : 'develop';

gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

gulp.task('build', ['webpack']);

gulp.task('watch', function(done) {
  webpack({
    config: webpackConf,
    watch: true
  }).then(done);
});

gulp.task('webpack', function(done) {
  webpack({
    config: webpackConf
  }).then(done);
});
