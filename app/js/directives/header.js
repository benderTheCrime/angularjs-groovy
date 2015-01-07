(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'groovyHeader',
        [
            '$s',
            'Handlebars',
            function($s, Handlebars) {
                return {
                    restrict: 'E',
                    template: Handlebars.templates.header($s)
                };
            }
        ]
    );
})(angular);
