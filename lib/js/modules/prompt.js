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
                name: 'uL',
                q: '\n' + startPrompt + cyan('Does your application require login support? (Y/n): '),
                type: 'bool',
                cond: 'true',
                r: '\n' + startPrompt + blue('Application requires login: ')
            },
            {
                name: 'h',
                q: startPrompt + cyan('Does your application require a header? (Y/n): '),
                type: 'boolObj',
                cond: 'true',
                r: startPrompt + blue('Application requires header: ')
            },
            {
                parent: 'h',
                name: 'color',
                q: startPrompt + cyan('What color scheme would you like?\n') +
                white('Choices: ') +
                chalk.gray('Lagoon, Strawberry, Banana, Bruise, Emerald Cove, Nassau Sunset') + white(': '),
                cond: 'args.h',
                type: 'text',
                r: startPrompt + blue('Header color scheme: ')
            },
            {
                name: 'mD',
                q: startPrompt + cyan('Are you building a master/detail application? (Y/n): '),
                type: 'boolObj',
                cond: 'true',
                r: startPrompt + blue('Master/detail application: ')
            },
            {
                name: 't',
                q: startPrompt + cyan('Are you building a tabbed application? (Y/n): '),
                type: 'boolObj',
                cond: 'args.mD === false',
                r: startPrompt + blue('Tabbed application: ')
            },
            {
                name: 'pB',
                q: startPrompt + cyan('Are you building a page based application? (Y/n): '),
                type: 'boolObj',
                cond: 'args.t === false',
                r: startPrompt + blue('Page based application: ')
            },
            {
                name: 'fW',
                q: startPrompt + cyan('Is this application designed for web use? (Y/n): '),
                type: 'bool',
                cond: 'true',
                r: startPrompt + blue('Web application: ')
            }
        ];

    function basePrompt(obj, cb) {
        if (eval(obj.cond)) { // jshint ignore:line
            prompt(obj.q, function(v) {
                var response = util.toBool(v),
                    defOut = out.bind(null, obj.r + (response ? green(response) : red(response))),
                    val;
                switch (obj.type) {
                    case 'bool':
                        val = response;
                        defOut();
                        break;
                    case 'boolObj':
                        val = response ? {} : false;
                        defOut();
                        break;
                    default:
                        val = !!v ? v : '';
                        out(obj.r + (!!v ? green(v) : red(v)));
                }
                out('\n');
                if ((obj.type === 'boolObj' && typeof val !== 'undefined') ||
                    (obj.type === 'bool' && val)) {
                    if (obj.parent) {
                        args[obj.parent][obj.name] = val;
                    } else {
                        args[obj.name] = val;
                    }
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
