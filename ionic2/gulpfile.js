var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    runSequence = require('run-sequence'),
    argv = process.argv;


/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */

function applyOptions(options, fn) {
  return (callOptions) => fn(Object.assign(callOptions, options));
}

function handleError(error) {
  console.error(error.toString());
  process.exit(1);
}

var outputDir = '../server/app';

// Change output destination to server directory
var buildBrowserify = applyOptions({outputPath: outputDir + '/js', onError: handleError}, require('ionic-gulp-browserify-typescript'));
var buildSass = applyOptions({dest: outputDir + '/css'}, require('ionic-gulp-sass-build'));
var copyHTML = applyOptions({dest: outputDir}, require('ionic-gulp-html-copy'));
var copyFonts = applyOptions({dest: outputDir + '/fonts'}, require('ionic-gulp-fonts-copy'));
var copyScripts = applyOptions({dest: outputDir + '/js'}, require('ionic-gulp-scripts-copy'));
var tslint = require('ionic-gulp-tslint');

var isRelease = argv.indexOf('--release') > -1;

gulp.task('watch', ['clean'], function(done){
  runSequence(
    ['sass', 'html', 'fonts', 'scripts'],
    function(){
      gulpWatch('app/**/*.scss', function(){ gulp.start('sass'); });
      gulpWatch('app/**/*.html', function(){ gulp.start('html'); });
      buildBrowserify({ watch: true }).on('end', done);
    }
  );
});

gulp.task('build', ['clean'], function(done){
  runSequence(
    ['sass', 'html', 'fonts', 'scripts'],
    function(error){
      if (error) {
        handleError(error);
      }

      buildBrowserify({
        minify: isRelease,
        browserifyOptions: {
          debug: !isRelease
        },
        uglifyOptions: {
          mangle: false
        }
      }).on('end', done);
    }
  );
});

gulp.task('sass', buildSass);
gulp.task('html', copyHTML);
gulp.task('fonts', copyFonts);
gulp.task('scripts', copyScripts);
gulp.task('clean', function(){
  return del(outputDir, {force: true});
});
gulp.task('lint', tslint);
