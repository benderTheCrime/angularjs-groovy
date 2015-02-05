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
        dest = args[2],
        cwd = p.cwd();

    module.exports = function() {
        prompt.args.n = name;
        if (prompt.args.header) {
            prompt.args.header.title = name;
        }

        var fs = require('./files')(cwd + '/' + dest, prompt.args),
            cmds = [
                'npm install',
                'bower install',
                [ cwd, dest ].join('/') + '/node_modules/gulp/bin/gulp.js build'
            ];

        for (var key in fs) {
            fs[key]();
        }

        term.out(green('OK! Your files are all set up.'));
        term.out(bold('\nNext, let\'s install Bower components and NPM modules...'));
        term.out(bold('NPM...'));

        p.chdir([ cwd, dest ].join('/'));

        exec(cmds[0], function() {
            term.out(bold('and Bower...'));
            exec(cmds[1], function() {
                term.out(bold('Finally, let\'s run the new Gulp script...'));
                exec(cmds[2], function() {
                    term.out(green('Done!'));
                    term.out(green('\nYour application is ready! Enjoy!'));
                    p.chdir(cwd);
                    p.exit(0);
                });

            });
        });
    };
})();
