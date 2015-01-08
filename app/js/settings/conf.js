(function(a) {
    'use strict';

    var conf = {

        // Required stylesheets
        requiredStyles: [
            'angularjs-groovy.css' //,
            //'https://rawgit.com/hoarrd/drunken-parrot-flat-ui/' +
            //    'master/css/drunken-parrot.css'
        ]
    };

    a.module('conf', []).constant('conf', conf);

    module.exports = conf;
})(angular);
