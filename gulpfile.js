var source = require ('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    p = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    notify = require('gulp-notify');

var allStyles = ['./styles/main.scss'],
    allScripts = ['./scripts/**'],
    buildDest = './build/';

var browserSync = require('browser-sync');
var reload = browserSync.reload;

/*
  Images
*/
gulp.task('images',function() {
  gulp.src('styles/images/**')
    .pipe(gulp.dest(buildDest + '/images'))
});

/*
  Styles
*/
gulp.task('styles', function() {
  // move fonts
  gulp.src('./styles/fonts/**.*')
    .pipe(gulp.dest(buildDest + 'fonts'))

  // compile css
  gulp.src(allStyles)
    .pipe(p.sourcemaps.init())
    .pipe(p.concat('main.min.css'))
    .pipe(p.sass())
    .pipe(p.autoprefixer())
    .pipe(p.cssnano())
    .pipe(p.sourcemaps.write('.'))
    .pipe(gulp.dest(buildDest))
    .pipe(reload({ stream : true }))
});

/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: '.'
        }
    });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: ['./scripts/' + file],
    debug : true,
    cache: {},
    packageCache: {},
    transform:  [babelify.configure({
      presets: ["es2015", "stage-0", "react"],
      plugins: ["transform-decorators-legacy"]
    })]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
      return bundler
          .bundle()
          .on('error', handleErrors)
          .pipe(source(file))
          .pipe(buffer())
          // .pipe(p.uglify())
          // .pipe(p.rename('main.min.js'))
          .pipe(gulp.dest(buildDest))
          .pipe(reload({ stream:true }));
  }


  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('scripts', function() {
  return buildScript('main.js', false); // this will run once because we set watch to false
});

// run 'scripts' task first, then watch for future changes
gulp.task('default',
  [
    'images',
    'styles',
    'scripts',
    'browser-sync'
    ], function() {
      gulp.watch(allStyles, ['styles']); // gulp watch for style changes
      return buildScript('main.js', true); // browserify watch for JS changes
});
