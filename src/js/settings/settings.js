(function(a) {
    'use strict';

    var u = require('../misc/util');

    var keyMap = {
            mD: 'masterDetail',
            sV: 'singleView',
            pB: 'pageBased',
            t: 'tabbed',
            h: 'header',
            uL: 'useLogin',
            fW: 'forWeb',
            n: 'appName'
        },
        types = [ 'masterDetail', 'tabbed', 'pageBased'],
        type,
        key;

    module.exports = function(g) {
        type = g.type;
        delete g.type;

        // Check for shorthand from the CLI
        for (key in g) {
            if (key in keyMap) {
                g[keyMap[key]] = g[key];
                if (!type && ~types.indexOf(keyMap[key])) {
                    type = keyMap[key];
                }
                delete g[key];
            }
        }

        // Resolve type
        if (~types.indexOf(type)) {
            g[type] = typeof g[type] === 'object' ? g[type] : {};
        } else {
            g.singleView = typeof g.singleView === 'object' ? g.singleView : {};
            g = u.trashKeys(g, [ 'masterDetail', 'tabbed', 'pageBased' ]);
        }

        // Resolve appName
        if (g.header && typeof g.header !== 'object') {
            g.header = {};
        }
        if (g.appName && g.header && !g.header.title) {
            g.header.title = g.appName;
        }

        a.module('g', []).constant('$s', g);
    };
})(angular);
