(function() {
    'use strict';

    var exec = require('child_process').exec,
        out = require('../misc/out'),
        chalk = require('chalk');

    module.exports = function(cmd, cb) {
        return exec(cmd, function(err, stdOut, stdErr) {
            out(chalk.gray(stdOut));
            out(chalk.red(stdErr));
            if (!err) {
                return cb();
            }
        });
    };
})();
