(function(a) {
    'use strict';

    var loc = 'https://rawgit.com/hoarrd/drunken-parrot-flat-ui/master/';

    var conf = {

        // Required stylesheets
        requiredStyles: [
            {
                loc: loc + 'css/',
                filename: 'font-awesome.min.css'
            },
            {
                loc: loc + 'css/',
                filename: 'drunken-parrot.css'
            },
            {
                loc: false,
                filename: 'angularjs-groovy.min.css'
            }
        ]
    };

    a.module('conf', []).constant('conf', conf);
})(angular);
