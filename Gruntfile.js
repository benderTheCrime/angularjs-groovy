(function() {
    'use strict';

    module.exports = function(grunt) {
        var env = grunt.option('env') ? grunt.option('env').toLowerCase() : 'dev',
            src = 'app/',
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
                        'app/js/templates.js': [ src + 'templates/**/*.hbs' ]
                    },
                    options: {
                        //returnTemplates: true,
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
            bower: {
                install: {}
            }
        });
        grunt.loadNpmTasks('grunt-browserify');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-handlebars-compiler');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-bower-task');
        grunt.registerTask('build', [
            'bower:install',
            'browserify:app',
            'handlebars:app',
            'less:app'
        ]);
        grunt.registerTask('default', [
            'watch:app'
        ]);
    };
})();
