(function() {
    'use strict';

    var args = process.argv;

    process.argv.forEach(function(v, i) {
        if (v === 'node') {
            args.splice(i, 1);
        }
    });

    var yesno = require('yesno'),
        fs = require('fs'),
        cwd = __dirname + '/../.bin/',
        appName = args[1],
        folders = [
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
            '/Gruntfile.js',
            '/bower.json',
            '/package.json',
            '/app/index.html',
            '/app/js/index.js'
        ],
        fileContent = {
            '/.jshintrc': fs.readFileSync(cwd + 'jshintrc.txt', 'utf8'),
            '/.jscsrc': fs.readFileSync(cwd + 'jscsrc.txt', 'utf8'),
            '/.bowerrc': fs.readFileSync(cwd + 'bowerrc.txt', 'utf8'),
            '/Gruntfile.js': fs.readFileSync(cwd + 'js/Gruntfile.js', 'utf8'),
            '/package.json': '',
            '/bower.json': fs.readFileSync(cwd + 'bower.txt', 'utf8'),
            '/app/index.html': fs.readFileSync(cwd + 'html/index.html', 'utf8'),
            '/app/js/index.js': fs.readFileSync(cwd + 'js/index.js', 'utf8')
        },
        type,
        header;

    function init() {
        console.log('Thank you for using Groovy\'s Bolierplate');
        console.log('ASCII here');

        return yesno.ask('Are you building a master/detail applicaiton? (Y/n)', true, function(r) {
            type = r;
            return yesno.ask('Would you like to include a header? (Y/n)', true, function(r) {
                header = r;
                return build();
            });
        });
    }

    function build() {
        console.log('Just a second while we get things set up for you...');
        createDirs();
        createFiles(0);
        console.log('OK! Your files are all set up.');
        console.log('Next, lets run bower/npm install...');
        return false;
    }

    function createDirs() {
        for (var i = 0; i < folders.length; ++i) {
            if (!fs.existsSync(args[2] + folders[i])) {
                fs.mkdir(args[2] + folders[i], onErr);
            }
        }
    }

    function createFiles(i) {
        fs.writeFile(
            args[2] + files[i],
            fileContent[files[i]],
            function(err) {
                if (err) {
                    throw new Error(err);
                } else if (i < files.length - 1) {
                    return createFiles(++i);
                }
                return;
            }
        );
    }

    function onErr(err) {
        if (err) {
            throw new Error(err);
        } else {
            return;
        }
    }
    
    // TODO npm and bower install
    // TODO run grunt script

    return init();
})();
