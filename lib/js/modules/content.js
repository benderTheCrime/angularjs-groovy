(function() {
    'use strict';

    // TODO get content in here

    var fs = require('fs');

    var cwd = __dirname + '/../../.bin/',
        content = {
            '/.jshintrc': fs.readFileSync(cwd + 'jshintrc.txt', 'utf8'),
            '/.jscsrc': fs.readFileSync(cwd + 'jscsrc.txt', 'utf8'),
            '/.bowerrc': '{ "directory"  : "app/bower_components" }',
            '/.gitignore': 'bower_components/\nnpm_modules/\n',
            '/Gruntfile.js': fs.readFileSync(cwd + 'js/Gruntfile.js', 'utf8'),
            '/package.json': fs.readFileSync(cwd + 'package.txt', 'utf8'),
            '/bower.json': fs.readFileSync(cwd + 'bower.txt', 'utf8'),
            '/app/js/index.js': fs.readFileSync(cwd + 'js/index.js', 'utf8')
        };

    module.exports = function(filename, args) {
        var c,
            code = '';
        if (filename === '/app/js/conf.js') {
            c = fs.readFileSync(cwd + 'js/conf.js', 'utf8');
            code = JSON.stringify(args);
        } else if (filename === '/app/index.html') {
            c = fs.readFileSync(cwd + 'html/index.html', 'utf8');
            if (args.header) {
                code += '<groovy-header></groovy-header>';
            }
            if (args.type) {
                code += '<groovy-master-detail></groovy-master-detail>';
            } else {
                code += '<groovy-footer></groovy-footer>';
            }
        } else {
            return content[filename];
        }
        return c.replace('{{code}}', code);
    };
})();
