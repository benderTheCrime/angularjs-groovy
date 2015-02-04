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
        prompt.args.n = name;
        if (prompt.args.header) {
            prompt.args.header.title = name;
        }

        var fs = require('./files')(p.cwd() + '/' + dest, prompt.args),
            cmd = 'cd ' + p.cwd() + '/' + dest + ' & ',
            cmds = [
                cmd + 'npm install',
                cmd + 'bower install',
                p.cwd() + '/' + dest + '/node_modules/gulp/bin/gulp.js build'
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
                term.out(bold('Finally, let\'s run the new Gulp script...'));
                term.out(p.cwd() + '/' + dest + '/node_modules/gulp/bin/gulp.js build');
                exec(cmds[3], function() {
                    term.out(green('Done!'));
                    term.out(green('\nYour application is ready! Enjoy!'));
                    p.exit(0);
                });

            });
        });
    };
})();
