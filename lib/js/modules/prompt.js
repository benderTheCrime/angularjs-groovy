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
                name: 'useLogin',
                q: '\n' + startPrompt + cyan('Does your application require login support? (Y/n): '),
                type: 'bool',
                cond: 'true',
                r: '\n' + startPrompt + blue('Application requires login: ')
            },
            {
                name: 'header',
                q: startPrompt + cyan('Does your application require a header? (Y/n): '),
                type: 'boolObj',
                cond: 'true',
                r: startPrompt + blue('Application requires header: ')
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
                type: 'boolObj',
                cond: 'true',
                r: startPrompt + blue('Master/detail application: ')
            }
        ];

    function basePrompt(obj, cb) {
        if (eval(obj.cond)) { // jshint ignore:line
            prompt(obj.q, function(v) {
                var response = util.toBool(v),
                    defOut = out.bind(null, obj.r + (response ? green(response) : red(response))),
                    val;
                switch (obj.type) {
                    case ('bool'):
                        val = response;
                        defOut();
                        break;
                    case ('boolObj'):
                        val = response ? {} : false;
                        defOut();
                        break;
                    default:
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
