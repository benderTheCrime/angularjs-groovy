(function() {
    'use strict';

    var exec =      require('child_process').exec,
        term =      require('../misc/terminal'),
        chalk =     require('chalk');

    module.exports = function(cmd, cb) {
        return exec(cmd, function(err, stdout, stderr) {
            term.out(chalk.gray(stdout));
            term.out(chalk.red(stderr));
            if (err) {
                term.err('an error has prevented Groovy from continuing: ' + err);
            } else {
                cb();
            }
        });
    };
})();
