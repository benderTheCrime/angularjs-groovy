(function(a) {
    'use strict';

    var H = require('handlebars');

    a.module('angularjs-groovy').directive(
        'masterDetail',
        [
            '$s',
            function($s) {
                return {
                    restrict: 'E',
                    template: H.templates.masterDetail($s)
                };
            }
        ]
    );
})(angular);
