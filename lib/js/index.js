(function() {
    'use strict';

    var prompt = require('./modules/prompt'),
        out = require('./misc/out'),
        exec = require('./modules/process'),
        chalk = require('chalk'),
        bold = chalk.bold,
        white = chalk.white,
        green = chalk.green;

    var args = process.argv;

    process.argv.forEach(function(v, i) {
        if (v === 'node') {
            args.splice(i, 1);
        }
    });
    if (process.argv.length < 3) {
        out(white('Groovy:') + chalk.red(' Script requires two arguments: Name and Target Directory\n'));
        process.exit(1);
    }

    var appName = args[1];

    function init() {
        out(bold('Thank you for using Groovy\'s Boilerplate!\n') + white('Let\'s get started...\n'));
        prompt.all(checkAppTarget);
    }

    function checkAppTarget() {
        out(bold('\nJust a second while we get things set up for you...\n'));
        if (!prompt.args.fW) {
            out(white('You need Phonegap! The install may require permissions...\n'));
            exec('sudo npm install -g phonegap && phonegap create ' + args[2] +
                ' && rm -rf ' + args[2] + '/www/img ' +
                args[2] + '/www/css/index.css ' +
                args[2] + '/www/spec.html ' +
                args[2] + '/www/spec ' +
                args[2] + '/www/res',
                function() {
                    build();
                });
        } else {
            build();
        }
    }

    function build() {
        prompt.args.appName = appName;
        if (prompt.args.header) {
            prompt.args.header.title = appName;
        }
        if (!prompt.args.mD && !prompt.args.t && !prompt.args.pB) {
            prompt.args.sV = {};
        }

        var fs = require('./modules/files')(args[2], prompt.args),
            command = 'cd ' + process.cwd() + '/' + args[2] + ' && ',
            processes = [
                command + 'npm install',
                command + 'bower install'
            ];

        for (var key in fs) {
            fs[key]();
        }

        out(green('OK! Your files are all set up.\n'));
        out(bold('\nNext, let\'s install Bower components and NPM modules...\n'));
        out(bold('NPM...\n'));

        exec(processes[0], function() {
            out(bold('and Bower...\n'));
            exec(processes[1], function() {
                out(green('Done!\n'));
                out(green('\nYour application is ready! Enjoy!\n'));
                process.exit(0);
            });
        });
    }

    return init();
})();
