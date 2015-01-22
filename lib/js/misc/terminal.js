(function() {
    'use strict';

    var p =         process,
        fs =        require('fs'),
        chalk =     require('chalk'),
        bold =      chalk.bold,
        white =     chalk.white;

    var groovyData = JSON.parse(fs.readFileSync(__dirname + '/../../../package.json')),
        prefix = bold('Groovy: '),
        output = '';

    function clear() {
        p.stdout.write('\x1B[2J\x1B[0;0H');
    }

    module.exports = {
        out: function(string, pre, persist) {
            output += (pre ? prefix : '') + string + '\n';
            if (!persist) {
                clear();
            }
            p.stdout.write(output);
            return this;
        },
        err: function(string) {
            p.stdout.write(prefix + chalk.red(string) + '\n');
            p.exit(1);
        },
        help: function() {
            this.out(
                bold(groovyData.description) + '\n' +
                white('version: ' + groovyData.version) + '\n\n' +
                bold('Usage:\n') +
                white('    groovy [ app name ] [ target directory ] [ options ]\n\n') +
                bold('Options:\n') +
                white('    --help, --h    Display this help text\n') +
                white('    --debug, --d   Run debugger processes\n'),
                true,
                true
            );
            p.exit(1);
        }
    };
})();
