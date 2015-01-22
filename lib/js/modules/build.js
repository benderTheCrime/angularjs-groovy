(function() {
    'use strict';

    var p =         process,
        args =      p.argv,
        chalk =     require('chalk'),
        prompt =    require('./prompt'),
        term =      require('../misc/terminal'),
        exec =      require('./process'),
        bold =      chalk.bold,
        green =     chalk.green;

    var name = args[1],
        dest = args[2];

    module.exports = function() {
        prompt.args.name = name;
        if (prompt.args.header) {
            prompt.args.header.title = name;
        }
        if (!prompt.args.mD && !prompt.args.t && !prompt.args.pB) {
            prompt.args.sV = {};
        }

        var fs = require('./files')(dest, prompt.args),
            cmd = 'cd ' + p.cwd() + '/' + dest + ' && ',
            cmds = [
                cmd + 'npm install',
                cmd + 'bower install'
            ];

        for (var key in fs) {
            fs[key]();
        }

        term.out(green('OK! Your files are all set up.'));
        term.out(bold('\nNext, let\'s install Bower components and NPM modules...'));
        term.out(bold('NPM...'));

        exec(cmds[0], function() {
            term.out(bold('and Bower...'));
            exec(cmds[1], function() {
                term.out(green('Done!'));
                term.out(green('\nYour application is ready! Enjoy!'));
                p.exit(0);
            });
        });
    };
})();