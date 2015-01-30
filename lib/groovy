(function() {
    'use strict';

    var p =         process,
        args =      p.argv,
        chalk =     require('chalk'),
        gulp =      require('../Gulpfile'),
        term =      require('./js/misc/terminal');

    var debug;

    if (/-(|-)h($|elp)/i.test(args)) {
        term.help();
    } else if (/-(|-)d($|ebug)/i.test(args)) {
        debug = true;
    } else if (~args.indexOf('node')) {
        args.splice(args.indexOf('node'), 1);
    }

    if (debug) {
        gulp(function() {
            p.exit(1);
        });
    } else if (args.length < 3) {
        term.err('requires two arguments: application name and target directory.');
    } else {
        term.out(
            chalk.bold('Thank you for using Groovy\'s Boilerplate!\n') + chalk.white('Let\'s get started...\n')
        );
        require('./js/index')();
    }
})();
