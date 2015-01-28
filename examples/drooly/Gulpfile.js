(function() {
    'use strict';

    var fs =        require('fs'),
        gulp =      require('gulp'),
        less =      require('gulp-less'),
        path =      require('path'),
        rename =    require('gulp-rename'),
        cssmin =    require('gulp-cssmin');

    var src = fs.existsSync('www/') ? 'www/' : 'app/';

    gulp.task('less', function() {
        return gulp.src(src + 'css/index.less')
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }))
            .pipe(rename('index.css'))
            .pipe(gulp.dest(src + 'css'));
    });
    gulp.task('cssmin', [ 'less' ], function() {
        gulp.src(src + 'css/index.css')
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(src + 'css'));
    });
    gulp.task('build', [ 'cssmin' ]);
    gulp.task('default', function() {
        return gulp.watch(src + '**', [ 'build' ]);
    });
})();
