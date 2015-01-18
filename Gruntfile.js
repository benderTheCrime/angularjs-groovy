(function() {
    'use strict';

    module.exports = function(grunt) {
        var env = grunt.option('env') ? grunt.option('env').toLowerCase() : 'prod',
            src = 'src/',
            dest = 'dist/',
            nodeSrc = 'lib/';

        grunt.initConfig({
            wrap: {
                app: {
                    src: src + 'bower_components/bootstrap/dist/js/bootstrap.js',
                    dest: src + 'bower_components/bootstrap/dist/js/bootstrap.js',
                    options: {
                        wrapper: [ 'module.exports = function($j) { var jQuery = $j;\n', '};' ]
                    }
                }
            },
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
                            handlebars: '../../node_modules/handlebars/dist/handlebars.runtime.js',
                            jquery: '../../bower_components/jquery/dist/jquery.js',
                            bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap.js',
                            checkbox: '../../bower_components/drunken-parrot-flat-ui/js/checkbox.js',
                            radio: '../../bower_components/drunken-parrot-flat-ui/js/radio.js',
                            'switch': '../../bower_components/drunken-parrot-flat-ui/js/bootstrap-switch.js',
                            toolbar: '../../bower_components/drunken-parrot-flat-ui/js/toolbar.js',
                            application: '../../bower_components/drunken-parrot-flat-ui/js/application.js'
                        },
                        preBundleCB: function() {
                            grunt.task.run([ 'wrap' ]);
                        },
                        postBundleCB: function(err, src, next) {
                            grunt.task.run([ 'uglify' ]);
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
            browserSync: {
                app: {
                    bsFiles: {
                        src: dest + '**'
                    },
                    options: {
                        server: {
                            baseDir: './examples/groovy-app/app/',
                            index: 'index.html',
                            files: [ dest + '**', 'examples/**' ],
                            https: true,
                            browser: 'google chrome'
                        },
                        watchTask: true
                    }
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
        grunt.loadNpmTasks('grunt-browser-sync');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-jscs-checker');
        grunt.registerTask('build', [
            'handlebars',
            'browserify',
            'less',
            'cssmin'
        ]);
        grunt.registerTask('test', [
            'jshint',
            'jscs'
        ]);
        grunt.registerTask('default', [
            'build',
            'browserSync',
            'watch'
        ]);
    };
})();
