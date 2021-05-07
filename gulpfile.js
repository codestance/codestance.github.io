const { task, src, dest, watch, parallel } = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css'),
    jsmin = require('gulp-minify');

task('style', function(){
    return src('scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(prefix())
      .pipe(cssmin({compatibility: 'ie8'}))
      .pipe(dest('css'))
      .pipe(browserSync.stream());
});

task('js', function(){
    return src('js/js.js')
      .pipe(jsmin({
        ext: {
            min: '.min.js'
        },
        noSource: true,
        ignoreFiles: ['*.min.js','icons.js']
      }))
      .pipe(dest('js'));
});

task('serve', parallel('style',function(){
    browserSync.init({
        server: "."
    });
    watch('scss/*.scss', task('style')).on('change', browserSync.reload);
    watch('js/js.js', task('js')).on('change', browserSync.reload);
    watch('*.html').on('change', browserSync.reload);
}));

task('default', parallel('serve'));