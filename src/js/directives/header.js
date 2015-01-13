(function(a) {
    'use strict';

    var H = require('handlebars');

    a.module('angularjs-groovy').directive(
        'groovyHeader',
        [
            '$s',
            function($s) {
                return {
                    restrict: 'E',
                    template: H.templates.header($s)
                };
            }
        ]
    );
})(angular);
