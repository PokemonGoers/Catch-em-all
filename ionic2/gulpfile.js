var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('ionic-gulp-webpack');
var path = require('path');
var del = require('del');
var argv = process.argv;

var webpackConf = require('./webpack.config.js');
var serverDir = path.join(__dirname, '../server/app');
var outputDir = path.join(__dirname, 'www');

var release = argv.includes('--release');
process.env['BUILD_ENV'] = release ? 'release' : 'develop';

gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

var browserBuild = argv.includes('browser');
if (browserBuild) {
  gulp.task('build:after', ['server-deploy']);
}

var shouldWatch = argv.includes('-l') || argv.includes('--livereload');
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

gulp.task('build', ['clean', 'assets', 'webpack']);

gulp.task('watch', ['clean', 'assets'], function(done) {
  gulp.watch('app/assets/**/*', gulp.start.bind(gulp, 'assets'));

  printBuildEnvironment();

  webpack({
    config: webpackConf,
    watch: true
  }).then(done);
});

gulp.task('webpack', function(done) {
  printBuildEnvironment();

  webpack({
    config: webpackConf
  }).then(done);
});

gulp.task('clean', function() {
  del.sync([outputDir + '/**/*']);
});

gulp.task('assets', function() {
  gulp.src('app/assets/**/*').pipe(gulp.dest(outputDir));
});

gulp.task('server-deploy', function() {
  del.sync([serverDir], {force: true});
  gulp.src('platforms/browser/www/**/*').pipe(gulp.dest(serverDir));
});

function printBuildEnvironment() {
  gutil.log('Build environment: '+process.env['BUILD_ENV']);
}
