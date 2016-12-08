'use strict';

let gulp        = require('gulp');
let browserSync = require('browser-sync');
let sass        = require('gulp-sass');
let child       = require('child_process');
let gutil       = require('gulp-util');


gulp.task('default', ['jekyll', 'browser-sync', 'watch'], function () {
});

gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('jekyll', function () {
    let jekyll = child.spawn('jekyll', ['serve',
        '--watch',
        '--incremental',
        '--drafts'
    ]);

    let jekyllLogger = function (buffer) {
        buffer.toString()
            .split(/\n/)
            .forEach(function (message) {
                gutil.log('Jekyll: ' + message);
            });
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});


gulp.task('styles', function () {
    gulp.src('scss/css-layout.scss')
        .pipe(sass({
            includePaths: ['./node_modules/']
        }).on('error', sass.logError))
        .pipe(gulp.dest('./site/css/'));

    gulp.src('scss/layout.scss')
        .pipe(sass({
            includePaths: ['./node_modules/']
        }).on('error', sass.logError))
        .pipe(gulp.dest('./site/css/'));
});

gulp.task('browser-sync', [], function () {
    browserSync.init(null, {
        files: ["_site/**/*.*"],
        port: 7000,
        server: {
            baseDir: "_site"
        }
    });
});
