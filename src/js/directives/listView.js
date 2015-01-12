(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'ngGroovyListView',
        [
            '$s',
            '$compile',
            'Handlebars',
            'baseView',
            function($s, $compile, Handlebars, baseView) {
                var baseLink = baseView.link;
                return {
                    restrict: baseView.restrict,
                    Controller: baseView.Controller,
                    link: function(scope, element, attrs) {
                        element.addClass('groovy-list-view');
                        if (!attrs.ngGroovyNoClear) {
                            element.html('');
                        }
                        element.append(
                            $compile(Handlebars.templates.listView({
                                name: attrs.ngGroovyViewName
                            }))(scope)
                        );
                        baseLink(scope, element, attrs);
                    }

                };
            }
        ]
    );
})(angular);
