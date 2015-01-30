(function() {
    'use strict';

    var chalk =     require('chalk'),
        prompt =    require('./modules/prompt'),
        term =      require('./misc/terminal'),
        build =     require('./modules/build'),
        exec =      require('./modules/process'),
        bold =      chalk.bold,
        white =     chalk.white;

    var dest = process.argv[2];

    module.exports = function() {
        prompt.all(function() {
            term.out(bold('\nJust a second while we get things set up for you...'));
            if (!prompt.args.fW) {
                term.out(white('You need Phonegap! The install may require permissions...'));
                exec('sudo npm install -g phonegap && phonegap create ' + dest +
                ' && rm -rf ' + dest + '/www/img ' +
                dest + '/www/css/index.css ' +
                dest + '/www/spec.html ' +
                dest + '/www/spec ' +
                dest + '/www/res',
                function() {
                    build();
                });
            } else {
                build();
            }
        });
    };
})();
