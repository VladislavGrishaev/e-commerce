let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let autoprefixer = require('gulp-autoprefixer');
 
gulp.task('prefix', function(){
    
    return gulp.src('app/css/*.css')
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 16 versions'],
            cascade: false
        }))
        .pipe(autoprefixer({outputStyle: 'expanded'}))
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({stream: true}))
}) 




gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
    
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({stream: true}))
});



gulp.task('html', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});
gulp.task('script', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});
gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "app/"
        },
        browser: ['chrome']
    })
});
gulp.task('watch', function(){
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));

});
gulp.task('default', gulp.parallel('sass', 'prefix', 'html', 'script', 'browser-sync', 'watch'))