(function() {
    'use strict';

    // TODO get content in here

    var fs = require('fs');

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
            code = '',
            path = '/' + (args.fW ? 'app/' : 'www') + '/';
        switch (filename) {
            case path + 'js/index.js':
                c = fs.readFileSync(cwd + 'js/index.js', 'utf8');
                code = JSON.stringify(args);
                break;
            case path + 'index.html':
                c = fs.readFileSync(cwd + 'html/index.html', 'utf8');
                code += '<ng-view></ng-view>';
                break;
            case '/.bowerrc':
                return '{ "directory": ".' + path + 'bower_components" }';
            default:
                return content[filename];
        }
        return c.replace('{{code}}', code);
    };
})();
