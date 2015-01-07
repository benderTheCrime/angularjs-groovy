(function(a) {
    'use strict';

    var conf = {

        // Required stylesheets
        requiredStyles: [
            'https://rawgit.com/hoarrd/drunken-parrot-flat-ui/' +
                'master/css/drunken-parrot.css',
            'angularjs-groovy.css'
        ]
    };

    a.module('conf', []).constant('conf', conf);

    module.exports = conf;
})(angular);
