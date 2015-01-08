(function() {
    'use strict';

    module.exports = function(grunt) {
        var env = grunt.option('env') ? grunt.option('env').toLowerCase() : 'dev',
            src = 'src/',
            dest = 'dist/';

        grunt.initConfig({
            browserify: {
                app: {
                    files: [
                        {
                            src: src + 'js/index.js',
                            dest: dest + 'angularjs-groovy.js'
                        }
                    ],
                    options: {
                        debug: env === 'dev',
                        alias: {
                            handlebars: '../../node_modules/handlebars/dist/handlebars.runtime.js'
                        }
                    }
                }
            },
            handlebars: {
                app: {
                    files: {
                        'src/js/templates.js': [ src + 'templates/**/*.hbs' ]
                    },
                    options: {
                        exportCommonJS: 'Handlebars'
                    }
                }
            },
            less: {
                app: {
                    files: [
                        {
                            src: src + 'css/index.less',
                            dest: dest + 'angularjs-groovy.css'
                        }
                    ]
                }
            },
            watch: {
                app: {
                    files: [ src + '**' ],
                    tasks: [ 'build', 'watch:app' ],
                    options: {
                        debounceDelay: 1000
                    }
                }
            },
            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                app: {
                    src: [
                        src + 'js/**/!(templates)*.js',
                        'examples/groovy-app/app/js/**/*.js'
                    ]
                }
            },
            jscs: {
                src: [
                    src + 'js/**/!(templates)*.js',
                    'examples/groovy-app/app/js/**/*.js'
                ]
            },
            bower: {
                install: {}
            }
        });
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-handlebars-compiler');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-jscs-checker');
        grunt.loadNpmTasks('grunt-bower-task');
        grunt.registerTask('build', [
            'bower:install',
            'browserify:app',
            'handlebars:app',
            'less:app'
        ]);
        grunt.registerTask('default', [
            'build',
            'watch:app'
        ]);
        grunt.registerTask('test', [
            'jshint:app',
            'jscs'
        ]);
    };
})();
