(function() {
    'use strict';

    var fs = require('fs'),
        util = require('../misc/util'),
        resolve = require('./content');

    var folders = [
            '/',
            '/app',
            '/app/css',
            '/app/images',
            '/app/js'
        ],
        files = [
            '/.jshintrc',
            '/.jscsrc',
            '/.bowerrc',
            '/.gitignore',
            '/Gruntfile.js',
            '/Gulpfile.js',
            '/bower.json',
            '/package.json',
            '/app/index.html',
            '/app/js/index.js'
        ];

    module.exports = function(dir, args) {
        return {
            createDirs: function() {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, util.onErr);
                }
                for (var i = 0; i < folders.length; ++i) {
                    if (!fs.existsSync(dir + folders[i])) {
                        fs.mkdirSync(dir + folders[i], util.onErr);
                    }
                }
            },
            writeFiles: function() {
                for (var i = 0; i < files.length; ++i) {
                    fs.writeFileSync(dir + files[i], resolve(files[i], args));
                }
            }
        };
    };
})();
