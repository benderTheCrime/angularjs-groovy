(function(a) {
    'use strict';

    var H = require('handlebars');

    a.module('angularjs-groovy').directive(
        'groovyPageBased',
        [
        '$s',
            function($s) {
                return {
                    restrict: 'E',
                    template: H.templates.pageBased($s)
                };
            }
        ]
    );
})(angular);
