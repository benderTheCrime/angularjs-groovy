(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'groovyFooter',
        [
            '$s',
            'Handlebars',
            function($s, Handlebars) {
                return {
                    restrict: 'E',
                    template: Handlebars.templates.footer($s)
                };
            }
        ]
    );
})(angular);
