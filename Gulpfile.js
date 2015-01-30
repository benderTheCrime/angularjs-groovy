(function(){
    'use strict';

    var gulp =          require('gulp'),
        argv =          require('yargs').argv,
        chalk =         require('chalk'),
        browserify =    require('gulp-browserify'),
        handlebars =    require('gulp-handlebars'),
        wrap =          require('gulp-wrap'),
        concat =        require('gulp-concat'),
        declare =       require('gulp-declare'),
        less =          require('gulp-less'),
        path =          require('path'),
        rename =        require('gulp-rename'),
        uglify =        require('gulp-uglify'),
        cssmin =        require('gulp-cssmin'),
        jshint =        require('gulp-jshint'),
        jscs =          require('gulp-jscs'),
        ngdoc =         require('gulp-ngdocs'),
        browserSync =   require('browser-sync');

    var src = 'src/',
        dest = 'dist/',
        nodeSrc = 'lib/',
        docSrc = 'doc';

    gulp.task('browserify', [ 'handlebars' ], function() {
        return gulp.src(src + '/js/index.js')
            .pipe(browserify({
                browserifyOptions: {
                    debug: argv.env === 'dev'
                }
            }).on('error', onErr))
            .pipe(rename('angularjs-groovy.js'))
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
    gulp.task('less', function() {
        return gulp.src(src + 'css/index.less')
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }).on('error', onErr))
            .pipe(rename('angularjs-groovy.css'))
            .pipe(gulp.dest(dest));
    });
    gulp.task('uglify', [ 'browserify' ], function() {
        gulp.src(dest + 'angularjs-groovy.js')
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(dest));
    });
    gulp.task('cssmin', [ 'less' ], function() {
        gulp.src(dest + 'angularjs-groovy.css')
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(dest));
    });
    gulp.task('jshint', function() {
        return gulp.src([
                src + 'js/**/!(templates)*.js',
                nodeSrc + 'js/**/*.js',
                'examples/groovy-app/app/js/**/*.js'
            ])
            .pipe(jshint())
            .pipe(jshint.reporter('default', { verbose: true }));
    });
    gulp.task('jscs', [ 'jshint' ], function() {
        gulp.src([
            src + 'js/**/!(templates)*.js',
            nodeSrc + 'js/**/*.js',
            'examples/groovy-app/app/js/**/*.js'
        ])
        .pipe(jscs());
    });
    gulp.task('ngdoc', function() {
        gulp.src(src + 'js/**/*.js')
            .pipe(ngdoc.process({
                html5Mode: true,
                startPage: '/index',
                title: 'angularjs-groovy documentation'
            }))
            .pipe(gulp.dest(docSrc));
    });
    gulp.task('build', [ 'uglify', 'cssmin' ]);
    gulp.task('server', function() {
        return browserSync({
            server: {
                baseDir: './examples/groovy-app/app/',
                index: 'index.html',
                files: [ dest + '**', 'examples/**' ],
                https: true,
                browser: 'google chrome'
            }
        });
    });
    gulp.task('watch', [ 'build', 'server' ], function() {
        gulp.watch(src + '**', [ 'build', browserSync.reload ]);
    });
    gulp.task('test', [ 'ngdoc', 'jscs' ]);
    gulp.task('default', [ 'watch' ]);

    function onErr(err) {
        console.log(chalk.red(chalk.bold('ERROR: ') + err.message));
    }

    module.exports = function(cb) {
        gulp.start('test', function() {
            cb();
        });
    };
})();
