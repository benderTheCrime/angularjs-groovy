(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'ngGroovySettingsView',
        [
            'ngGroovyListViewDirective',
            function(ngGroovyListViewDirective) {
                var listView = ngGroovyListViewDirective[0];

                return {
                    restrict: listView.restrict,
                    priority: listView.priority,
                    Controller: listView.Controller,
                    link: function(scope, element, attrs) {
                        listView.link(scope, element, attrs, true);
                    }
                };
            }
        ]
    );
})(angular);
