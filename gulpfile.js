var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var del = require('del');
var eslint = require('gulp-eslint');
var git = require('git-rev-sync');
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereactload = require('livereactload');
var package = require('./package.json');
var path = require('path');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var isDevelopment = process.env.NODE_ENV !== 'production' || git.branch() !== 'master';

gutil.log('isDevelopment:', isDevelopment);

var paths = {
    BUILD_DIR: __dirname + '/build',
    ENTRY_POINT: package.main, //__dirname + '/src/index.js',
    OUT_FILENAME: 'application.js',
    OUT_FILENAME_MIN: 'application.min.js',
    JS_SRC: __dirname + '/src/**/*.{js,jsx}',
    HTML_SRC: __dirname + '/src/**/*.html',
    CSS_SRC: __dirname + '/src/**/*.css'
};

var bundler = browserify({
    entries: [paths.ENTRY_POINT],
    transform: isDevelopment ? [babelify, livereactload] : [babelify],
    debug: isDevelopment,
    cache: {}, packageCache: {} // required for watchify
});


// cleans the build directory
gulp.task('clean', del.bind(null, [paths.BUILD_DIR]));

gulp.task('html', function() {
    gulp.src(paths.HTML_SRC)
        .pipe(gulp.dest(paths.BUILD_DIR));
});

gulp.task('css', function() {
    gulp.src(paths.CSS_SRC)
        .pipe(gulp.dest(paths.BUILD_DIR));
});

// lints all js files and reports errors to stdout
gulp.task('lint', function() {
    return /*gulp.src(paths.JS_SRC)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());*/
});

// serves development bundle to browser
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: paths.BUILD_DIR,
            directory: true
        },
        host: 'localhost.espn.go.com',
        open: 'external'
    });
});

// bundles js and watches for changes
gulp.task('watch', ['clean'], function() {
    livereactload.monitor(path.join(paths.BUILD_DIR, paths.OUT_FILENAME), { displayNotification: true });

    var watcher = watchify(bundler);

    gulp.start('html');
    gulp.watch(paths.HTML_SRC, ['html', browserSync.reload]);

    gulp.start('css');
    gulp.watch(paths.CSS_SRC, ['css', browserSync.reload]);

    return watcher.on('update', function() {
        watcher.bundle()
            .on('error', function(e) { gutil.log(e.message); this.emit('end'); })
            .pipe(source(paths.OUT_FILENAME))
            .pipe(gulp.dest(paths.BUILD_DIR))
            // .pipe(browserSync.reload({ stream: true, once: true }))
    }).on('log', gutil.log)
        .bundle()
        .pipe(source(paths.OUT_FILENAME))
        .pipe(gulp.dest(paths.BUILD_DIR));
});

// builds production ready bundle
gulp.task('build', ['clean'], function() {
    return bundler.bundle()
        .on('error', function(e) { gutil.log(e.message); })
        .pipe(source(paths.OUT_FILENAME_MIN))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.BUILD_DIR));
});

gulp.task('default', ['watch'], function() {
    gulp.start('serve');
});
