(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'groovyBase',
        [
            '$s',
            'Handlebars',
            function($s, Handlebars) {
                return {
                    restrict: 'AECM', // DO WHAT YOU DO!!!
                    template: Handlebars.templates.base($s)
                };
            }
        ]
    );
})(angular);
