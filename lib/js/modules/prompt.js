(function() {
    'use strict';

    var prompt = require('cli-prompt'),
        out = require('../misc/out'),
        util = require('../misc/util'),
        chalk = require('chalk'),
        cyan = chalk.cyan,
        white = chalk.white,
        blue = chalk.blue,
        green = chalk.green,
        red = chalk.red;

    var startPrompt = chalk.bold('Groovy: '),
        args = {},
        prompts = [
            {
                name: 'header',
                q: '\n' + startPrompt + cyan('Does your application require a header? (Y/n): '),
                type: 'bool',
                cond: 'true',
                r: '\n' + startPrompt + blue('Application requires header: ')
            },
            {
                parent: 'header',
                name: 'color',
                q: startPrompt + cyan('What color scheme would you like?\n') +
                white('Choices: ') +
                chalk.gray('Lagoon, Strawberry, Banana, Bruise, Emerald Cove, Nassau Sunset') + white(': '),
                cond: 'args.header',
                type: 'text',
                r: startPrompt + blue('Header color scheme: ')
            },
            {
                name: 'masterDetail',
                q: startPrompt + cyan('Are you building a master/detail application? (Y/n): '),
                type: 'bool',
                cond: 'true',
                r: startPrompt + blue('Master/detail application: ')
            }
        ];

    function basePrompt(obj, cb) {

        // TODO figure out a better way to do this
        if (eval(obj.cond)) {
            prompt(obj.q, function(v) {
                var val;
                if (obj.type === 'bool') {
                    var response = util.toBool(v);
                    val = response ? {} : false;
                    out(obj.r + (response ? green(response) : red(response)));
                } else {
                    val = !!v ? v : '';
                    out(obj.r + (!!v ? green(v) : red(v)));
                }
                out('\n');
                if (obj.parent) {
                    args[obj.parent][obj.name] = val;
                } else {
                    args[obj.name] = val;
                }
                return cb();
            });
        } else {
            return cb();
        }

    }

    module.exports = {
        args: args,
        prompt: basePrompt,
        all: function(cb) {
            var fn = function(i) {
                if (prompts[i]) {
                    return basePrompt(prompts[i], fn.bind(null, i + 1));
                }
                return cb();
            };
            return fn(0);
        }
    };
})();
