(function() {
    'use strict';

    var fs = require('fs');

    var src = fs.existsSync('www/') ? 'www/' : 'app/';

    module.exports = function(grunt) {
        grunt.initConfig({
            less: {
                app: {
                    files: [
                        {
                            src: src + 'css/index.less',
                            dest: src + 'css/index.css'
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
                            src: src + 'css/index.css',
                            dest: src + 'css/index.min.css'
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
            }
        });

        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-watch');

        grunt.registerTask('build', [
            'less',
            'cssmin'
        ]);
        grunt.registerTask('default', [
            'build',
            'watch'
        ]);
    };
})();
