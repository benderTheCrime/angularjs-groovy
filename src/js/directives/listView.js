(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'ngGroovyListView',
        [
            '$s',
            'baseView',
            'scope',
            function($s, baseView) {
                return angular.extend(null, baseView, {
                    scope: {
                        groovyListView: '='
                    },
                    template: Handlebars.templates.listView({
                        settings: $s,
                        scope: this.scope
                    })
                });
            }
        ]
    );
})(angular);
