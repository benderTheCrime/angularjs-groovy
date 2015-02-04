(function() {
    'use strict';

    var fs = require('fs'),
        util = require('../misc/util'),
        resolve = require('./content');

    module.exports = function(dir, args) {
        var prefix = args.fW ? 'app' : 'www',
            folders = [
                '/',
                '/' + prefix,
                '/' + prefix + '/css',
                '/' + prefix + '/images',
                '/' + prefix + '/js'
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
                '/' + prefix + '/css/index.less',
                '/' + prefix + '/index.html',
                '/' + prefix + '/js/index.js',
                '/' + prefix + '/js/settings.js'
            ];

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
