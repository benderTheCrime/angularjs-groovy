(function() {
    'use strict';

    var prompt = require('cli-prompt'),
        cli = require('./components/Node-CLI/node-cli.js'),
        fs = require('fs'),
        exec = require('child_process').exec,
        util = require('./misc/util'),
        chalk = require('chalk'),
        bold = chalk.bold,
        startPrompt = bold('Groovy: '),
        white = chalk.white,
        cyan = chalk.cyan,
        green = chalk.green,
        blue = chalk.blue,
        out = console.log;

    var args = process.argv;

    process.argv.forEach(function(v, i) {
        if (v === 'node') {
            args.splice(i, 1);
        }
    });

    var cwd = __dirname + '/../.bin/',
        appName = args[1],
        prompts = [
            startPrompt + cyan('Does your application require a header? (Y/n): '),
            startPrompt + cyan('Are you building a master/detail application? (Y/n): ')
        ],
        promptsResponse = [
            startPrompt + blue('Application requires header: '),
            startPrompt + blue('Master/detail application: ')
        ],
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
            '/.gitignore',
            '/Gruntfile.js',
            '/bower.json',
            '/package.json',
            '/app/index.html',
            '/app/js/conf.js',
            '/app/js/index.js'
        ],
        fileContent = {
            '/.jshintrc': fs.readFileSync(cwd + 'jshintrc.txt', 'utf8'),
            '/.jscsrc': fs.readFileSync(cwd + 'jscsrc.txt', 'utf8'),
            '/.bowerrc': fs.readFileSync(cwd + 'bowerrc.txt', 'utf8'),
            '/.gitignore': 'bower_components/\nnpm_modules/\n',
            '/Gruntfile.js': fs.readFileSync(cwd + 'js/Gruntfile.js', 'utf8'),
            '/package.json': fs.readFileSync(cwd + 'package.txt', 'utf8'),
            '/bower.json': fs.readFileSync(cwd + 'bower.txt', 'utf8'),
            '/app/js/index.js': fs.readFileSync(cwd + 'js/index.js', 'utf8')
        },
        groovyArgs = [
            'header', 'type'
        ],
        groovyArgsObj = {
            appName: appName
        };

    function init() {

        // TODO the only things that should be in this init are the console logs
        // and a functional call
        out(bold('Thank you for using Groovy\'s Bolierplate'));

        // TODO ASCII
        out(white('Let\'s get started...\n'));

        var fn = function(i) {
            prompt(prompts[i], function(v) {
                var response = util.toBool(v);
                groovyArgsObj[groovyArgs[i]] = response;

                cli.up(1).clearLine(1).clearNext(75);
                out(
                    promptsResponse[i] + (response ? green(response) : chalk.red(response))
                );
                return prompts[i + 1] ? fn(++i) : build();
            });
        };
        fn(0);
    }

    function build() {
        resolveIndex();
        resolveConf();

        out(bold('\nJust a second while we get things set up for you...'));

        createDirs();
        createFiles();

        out(green('OK! Your files are all set up.\n'));
        out(bold('Next, lets run bower/npm install...'));

        var child = exec('cd ' + process.cwd() + '/' + args[2] + ' && npm install');
        child.stdout.on('data', function(data) {
            out(data);
        });
        child.stdout.on('end', function() {
            out(bold('and Bower...'));
            var child = exec('cd ' + process.cwd() + '/' + args[2] + ' && bower install');
            child.stdout.on('data', function(data) {
                out(data);
            });
            child.stdout.on('end', function() {
                out(green('Done!\n'));
                out(green('Your application is ready! Enjoy!\n'));
                process.exit(0);
            });
        });
    }

    function resolveConf() {
        var content = fs.readFileSync(cwd + 'js/conf.js', 'utf8');
        fileContent['/app/js/conf.js'] = content.replace('{{code}}', JSON.stringify(groovyArgsObj));
    }

    function resolveIndex() {
        var content = fs.readFileSync(cwd + 'html/index.html', 'utf8'),
            code = '';
        if (groovyArgsObj.header) {
            code += '<groovy-header></groovy-header>';
        }
        if (groovyArgsObj.type) {
            code += '<groovy-master-detail></groovy-master-detail>';
        } else {
            code += '<groovy-footer></groovy-footer>';
        }
        fileContent['/app/index.html'] = content.replace('{{code}}', code);
    }

    function createDirs() {
        if (!fs.existsSync(args[2])) {
            fs.mkdir(args[2], util.onErr);
        }
        for (var i = 0; i < folders.length; ++i) {
            if (!fs.existsSync(args[2] + folders[i])) {
                fs.mkdir(args[2] + folders[i], util.onErr);
            }
        }
    }

    function createFiles() {
        for (var i = 0; i < files.length; ++i) {
            fs.writeFileSync(args[2] + files[i], fileContent[files[i]]);
        }
    }

    // TODO npm and bower install
    // TODO run grunt script

    // TODO this all has to be separated better

    return init();
})();
