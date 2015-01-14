(function(a) {
    'use strict';

    var conf = {

        // Required stylesheets
        requiredStyles: [
            'https://rawgit.com/hoarrd/drunken-parrot-flat-ui/master/' +
                'css/font-awesome.min.css',
            'https://rawgit.com/hoarrd/drunken-parrot-flat-ui/' +
                'master/css/drunken-parrot.css',
            'angularjs-groovy.min.css'
        ]
    };

    a.module('conf', []).constant('conf', conf);
})(angular);
