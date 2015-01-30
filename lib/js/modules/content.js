(function() {
    'use strict';

    // TODO get content in here

    var fs =        require('fs'),
        beautify =  require('js-beautify').js_beautify,
        u =         require('../misc/util');

    var cwd = __dirname + '/../../.bin/',
        content = {
            '/.jshintrc': fs.readFileSync(cwd + 'jshintrc.txt', 'utf8'),
            '/.jscsrc': fs.readFileSync(cwd + 'jscsrc.txt', 'utf8'),
            '/.gitignore': 'bower_components/\nnpm_modules/\n',
            '/Gruntfile.js': fs.readFileSync(cwd + 'js/Gruntfile.js', 'utf8'),
            '/Gulpfile.js': fs.readFileSync(cwd + 'js/Gulpfile.js', 'utf8'),
            '/package.json': fs.readFileSync(cwd + 'package.json', 'utf8'),
            '/bower.json': fs.readFileSync(cwd + 'bower.json', 'utf8')
        };

    module.exports = function(filename, args) {
        var c,
            path = '/' + (args.fW ? 'app' : 'www') + '/';
        switch (filename) {
            case path + 'js/settings.js':
                c = fs.readFileSync(cwd + 'js/settings.js', 'utf8');

                if (args.mD) {
                    u.trashKeys(args, [ 't', 'pB' ]);
                } else if (args.t) {
                    u.trashKeys(args, [ 'mD', 'pB' ]);
                } else if (args.pB) {
                    u.trashKeys(args, [ 'mD', 't' ]);
                } else {
                    args.sV = {};
                    u.trashKeys(args, [ 'mD', 't', 'pB']);
                }

                return beautify(c.replace('{{code}}', JSON.stringify(args)), { indent_size: 4 });
            case path + 'js/index.js':
                return fs.readFileSync(cwd + 'js/index.js', 'utf8');
            case path + 'index.html':
                c = fs.readFileSync(cwd + 'html/index.html', 'utf8');
                return c.replace('{{code}}', '<ng-view></ng-view>');
            case '/.bowerrc':
                return '{ "directory": ".' + path + 'bower_components" }';
            default:
                return content[filename];
        }
    };
})();
