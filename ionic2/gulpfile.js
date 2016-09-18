var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('ionic-gulp-webpack');
var path = require('path');
var del = require('del');
var argv = process.argv;

var webpackConf = require('./webpack.config.js');
var serverDir = path.join(__dirname, '../server/app');
var outputDir = path.join(__dirname, 'www');

var release = argv.includes('--release') || argv.includes('build');
var shouldWatch = argv.includes('-l') || argv.includes('--livereload');

process.env['BUILD_ENV'] = release ? 'release' : 'develop';
gutil.log('Build environment: '+process.env['BUILD_ENV']);

gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

var browserBuild = argv.includes('browser');
if (browserBuild) {
  gulp.task('build:after', ['server-deploy']);
}

gulp.task('build', ['clean', 'assets', 'webpack']);

gulp.task('watch', ['clean', 'assets'], function(done) {
  gulp.watch('app/assets/**/*', gulp.start.bind(gulp, 'assets'));
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
