(function() {
    'use strict';

    module.exports = function(grunt) {
        var env = grunt.option('env') ? grunt.option('env').toLowerCase() : 'prod',
            src = 'src/',
            dest = 'dist/',
            nodeSrc = 'lib/';

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
                        },
                        postBundleCB: function(err, src, next) {
                            grunt.task.run([ 'uglify:app' ]);
                            next(err, src);
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
                    tasks: [ 'build' ],
                    options: {
                        debounceDelay: 1000
                    }
                }
            },
            uglify: {
                app: {
                    files: [
                        {
                            src: dest + 'angularjs-groovy.js',
                            dest: dest + 'angularjs-groovy.min.js'
                        }
                    ]
                }
            },
            cssmin: {
                options: {
                    noAdvanced: true
                },
                app: {
                    files: [
                        {
                            src: dest + 'angularjs-groovy.css',
                            dest: dest + 'angularjs-groovy.min.css'
                        }
                    ]
                }
            },
            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                app: {
                    src: [
                        src + 'js/**/!(templates)*.js',
                        nodeSrc + 'js/**/*.js',
                        'examples/groovy-app/app/js/**/*.js'
                    ]
                }
            },
            jscs: {
                src: [
                    src + 'js/**/!(templates)*.js',
                    nodeSrc + 'js/**/*.js',
                    'examples/groovy-app/app/js/**/*.js'
                ]
            }
        });
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-handlebars-compiler');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-jscs-checker');
        grunt.registerTask('build', [
            'handlebars:app',
            'browserify:app',
            'less:app',
            'cssmin'
        ]);
        grunt.registerTask('test', [
            'jshint:app',
            'jscs'
        ]);
        grunt.registerTask('default', [
            'build',
            'watch:app'
        ]);
    };
})();
