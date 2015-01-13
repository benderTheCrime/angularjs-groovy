(function(){
    'use strict';

    var gulp =          require('gulp'),
        argv =          require('yargs').argv,
        browserify =    require('gulp-browserify'),
        handlebars =    require('gulp-handlebars'),
        wrap =          require('gulp-wrap'),
        concat =        require('gulp-concat'),
        declare =       require('gulp-declare'),
        less =          require('gulp-less'),
        rename =        require('gulp-rename'),
        uglify =        require('gulp-uglify'),
        cssmin =        require('gulp-cssmin'),
        jshint =        require('gulp-jshint'),
        jscs =          require('gulp-jscs');

    var src = 'src/',
        dest = 'dist/',
        nodeSrc = 'lib/';

    gulp.task('browserify', [ 'handlebars' ], function() {
        return gulp.src(src + '/js/index.js')
            .pipe(browserify({
                debug: argv.env === 'dev',
                alias: {
                    handlebars: '../../node_modules/handlebars/dist/handlebars.runtime.js'
                }
            }))
            .pipe(rename('angularjs-groovy.js'))
            .pipe(gulp.dest(dest))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(dest));
    });
    gulp.task('handlebars', function() {
        return gulp.src(src + 'templates/**/*.hbs')
            .pipe(handlebars({
                handlebars: require('handlebars')
            }))
            .pipe(wrap('Handlebars.template(<%= contents %>)'))
            .pipe(declare({
                root: 'Handlebars.templates',
                noRedeclare: true,
                processName: function(filePath) {
                    return declare.processNameByPath(filePath.replace(src + 'templates/', ''));
                }
            }))
            .pipe(concat('templates.js'))
            .pipe(
                wrap(
                    'var Handlebars = require(\'handlebars\');var template = Handlebars.template, ' +
                    'templates = Handlebars.templates = Handlebars.templates || {};<%= contents %>'
                )
            )
            .pipe(gulp.dest(src + 'js/'));
    });
    gulp.task('less', function () {
        return gulp.src(src + 'css/index.less')
            .pipe(less())
            .pipe(rename('angularjs-groovy.css'))
            .pipe(gulp.dest(dest));
    });
    gulp.task('uglify', [ 'browserify' ], function(){
        gulp.src(dest + 'angularjs-groovy.js')
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(dest));
    });
    gulp.task('cssmin', [ 'less' ], function () {
        gulp.src(dest + 'angularjs-groovy.css')
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(dest));
    });
    gulp.task('jshint', function() {
        gulp.src(src)
            .pipe(jshint())
            .pipe(jshint.reporter('default', { verbose: true }));
    });
    gulp.task('jscs', function () {
        gulp.src([
                src + 'js/**/!(templates)*.js',
                nodeSrc + 'js/**/*.js',
                'examples/groovy-app/app/js/**/*.js'
            ])
            .pipe(jscs());
    });
    gulp.task('build', [
        'uglify',
        'cssmin'
    ]);
    gulp.task('watch', function() {
        gulp.watch(src + '**', { debounceDelay: 1000 }, [ 'build' ]);
    });
    gulp.task('test', [ 'jshint', 'jscs' ]);
    gulp.task('default', [ 'watch' ]);
})();
