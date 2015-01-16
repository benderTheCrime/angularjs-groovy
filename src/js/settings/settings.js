(function(a) {
    'use strict';

    var u = require('../misc/util');

    function defaultType(g) {
        g.singleView = g.singleView || {};
        g = u.trashKeys(g, [ 'masterDetail', 'tabbed', 'pageBased' ]);
        return g;
    }

    module.exports = function(g) {

        // Check for shorthand from the CLI
        a.extend(g, {
            masterDetail: g.mD || g.masterDetail,
            singleView: g.sV || g.singleView,
            pageBased: g.pB || g.pageBased,
            tabbed: g.t || g.tabbed,
            header: g.h || g.header,
            useLogin: g.uL || g.useLogin,
            forWeb: g.fW || g.forWeb
        });

        // Trash the shorthand keys
        g = u.trashKeys(g, [ 'mD', 'sV', 'pB', 't', 'h', 'uL', 'fW' ]);

        // Resolve type
        if (g.type) {
            switch(g.type) {
                case 'masterDetail':
                    g.masterDetail = g.masterDetail || {};
                    g = u.trashKeys(g, [ 'tabbed', 'pageBased', 'singleView' ]);
                    break;
                case 'tabbed':
                    g.tabbed = g.tabbed || {};
                    g = u.trashKeys(g, [ 'masterDetail', 'pageBased', 'singleView' ]);
                    break;
                case 'pageBased':
                    g.pageBased = g.pageBased || {};
                    g = u.trashKeys(g, [ 'masterDetail', 'tabbed', 'singleView' ]);
                    break;
                default:
                    g = defaultType(g);
            }
        } else {
            g = defaultType(g);
        }
        delete g.type;

        a.module('g', []).constant('$s', g);
    };
})(angular);
