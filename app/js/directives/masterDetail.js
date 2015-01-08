(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'masterDetail',
        [
            '$s',
            'Handlebars',
            function($s, Handlebars) {
                return {
                    restrict: 'E',
                    template: Handlebars.templates.masterDetail($s)
                };
            }
        ]
    );
})(angular);
