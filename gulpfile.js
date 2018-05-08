var gulp = require('gulp'),
    htmlMin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    uglifyJs = require('gulp-uglifyjs'),
    BS = require('browser-sync');

gulp.task('default', ['html', 'js', 'css', 'watch', 'server'], function () {
    console.log('Gulp started!');
});

gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(BS.reload({stream: true}));
    gulp.src('app/products/*.html')
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/products'))
        .pipe(BS.reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src('app/*.js')
        .pipe(uglifyJs())
        .pipe(gulp.dest('dist'))
        .pipe(BS.reload({stream: true}));
});

gulp.task('css', function () {
    gulp.src('app/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'))
        .pipe(BS.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch(['app/*.html', 'app/products/*.html'], ['html']);
    gulp.watch('app/*.js', ['js']);
    gulp.watch('app/*.css', ['css']);
});

gulp.task('server', function () {
    BS({
        server: {
            baseDir: 'dist'
        }
    });
});