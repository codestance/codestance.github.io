const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css'),
    jsmin = require('gulp-minify');

gulp.task('style',function(){
    return gulp.src('scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(prefix())
      .pipe(cssmin({compatibility: 'ie8'}))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
});
gulp.task('js',function(){
    return gulp.src('js/js.js')
      .pipe(jsmin({
        ext: {
            min: '.min.js'
        },
        noSource: true,
        ignoreFiles: ['*.min.js','icons.js']
      }))
      .pipe(gulp.dest('js'));
});
gulp.task('serve',gulp.parallel('style',function(){
    browserSync.init({
        server: "."
    });
    gulp.watch('scss/*.scss', gulp.task('style')).on('change', browserSync.reload);
    gulp.watch('js/js.js', gulp.task('js')).on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('serve'));