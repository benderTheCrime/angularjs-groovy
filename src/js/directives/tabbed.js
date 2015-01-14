(function(a) {
    'use strict';

    var H = require('handlebars');

    a.module('angularjs-groovy').directive(
        'groovyTabbed',
        [
            '$s',
            function($s) {
                return {
                    restrict: 'E',
                    template: H.templates.tabbed($s)
                };
            }
        ]
    );
})(angular);
