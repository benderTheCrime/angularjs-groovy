(function() {
    'use strict';

    var fs =        require('fs'),
        gulp =      require('gulp'),
        chalk =     require('chalk'),
        less =      require('gulp-less'),
        path =      require('path'),
        rename =    require('gulp-rename'),
        cssmin =    require('gulp-cssmin');

    var src = fs.existsSync('www/') ? 'www' : 'app' + '/';

    gulp.task('less', function() {
        return gulp.src(src + 'css/index.less')
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }).on('error', onErr))
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
    gulp.task('watch', [ 'build' ], function() {
        return gulp.watch(src + '**', [ 'build' ]);
    });
    gulp.task('default', [ 'watch' ]);

    function onErr(err) {
        console.log(chalk.red(chalk.bold('ERROR: ') + err.message));
    }
})();
