const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css');

gulp.task('style',function(){
    return gulp.src('scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(prefix())
      .pipe(cssmin({compatibility: 'ie8'}))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
    });
gulp.task('serve',gulp.parallel('style',function(){
    browserSync.init({
        server: "."
    });
    gulp.watch('scss/*.scss', gulp.parallel('style'));
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/*.js').on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('serve'));