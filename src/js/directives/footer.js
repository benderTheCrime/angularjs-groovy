(function(a) {
    'use strict';

    var H = require('handlebars');

    a.module('angularjs-groovy').directive(
        'groovyFooter',
        [
            '$s',
            function($s) {
                return {
                    restrict: 'E',
                    template: H.templates.footer($s)
                };
            }
        ]
    );
})(angular);
