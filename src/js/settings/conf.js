(function(a) {
    'use strict';

    var conf = {

        // Required stylesheets
        requiredStyles: [
            'angularjs-groovy.min.css',
            'https://rawgit.com/hoarrd/drunken-parrot-flat-ui/master/' +
                'css/font-awesome.min.css',
            'https://rawgit.com/hoarrd/drunken-parrot-flat-ui/' +
                'master/css/drunken-parrot.css'
        ]
    };

    a.module('conf', []).constant('conf', conf);

    module.exports = conf;
})(angular);
